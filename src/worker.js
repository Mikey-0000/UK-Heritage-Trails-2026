// UK Heritage Trails – Cloudflare Worker
// Static files are served directly from the edge (see wrangler.jsonc).
// This Worker only runs for /api/* requests.

const REGIONS = [
  "London", "South East", "South West", "Midlands", "North", "Scotland", "Wales",
  "Northern Ireland", "Coastal UK", "National Parks", "Historic Cities",
];
const INTERESTS = [
  "Landmarks", "Museums", "Nature", "Historic Sites", "Walking Tours", "Castles", "Food & Markets",
];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      "x-content-type-options": "nosniff",
    },
  });

export function validateSignup(body) {
  const errors = [];
  const fullName = typeof body?.fullName === "string" ? body.fullName.trim() : "";
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  const region = typeof body?.region === "string" ? body.region : "";
  const interests = Array.isArray(body?.interests) ? body.interests : [];

  if (fullName.length < 3 || fullName.length > 100) errors.push("Please enter your full name.");
  if (email.length > 254 || !EMAIL_RE.test(email)) errors.push("Please enter a valid email address.");
  if (!REGIONS.includes(region)) errors.push("Please select a preferred region.");
  if (interests.length > 10 || interests.some((i) => !INTERESTS.includes(i))) errors.push("Invalid interests.");

  // Honeypot: real people never fill this hidden field
  const bot = typeof body?.website === "string" && body.website.length > 0;
  return { errors, bot, value: { fullName, email, region, interests: [...new Set(interests)] } };
}

async function handleSignup(request, env) {
  if (request.method !== "POST") return json({ ok: false, error: "method_not_allowed" }, 405);

  // Same-origin only
  const origin = request.headers.get("origin");
  if (origin && new URL(origin).host !== new URL(request.url).host) return json({ ok: false, error: "forbidden" }, 403);

  if (!(request.headers.get("content-type") || "").includes("application/json")) return json({ ok: false, error: "unsupported_media_type" }, 415);
  const raw = await request.text();
  if (raw.length > 4096) return json({ ok: false, error: "payload_too_large" }, 413);

  let body;
  try { body = JSON.parse(raw); } catch { return json({ ok: false, error: "invalid_json" }, 400); }

  const { errors, bot, value } = validateSignup(body);
  if (errors.length) return json({ ok: false, error: "validation", errors }, 422);
  if (bot) return json({ ok: true }); // silently drop bots

  if (!env.SIGNUPS) return json({ ok: false, error: "storage_not_configured" }, 503);

  const createdAt = new Date().toISOString();
  const key = `signup:${createdAt}:${crypto.randomUUID()}`;
  await env.SIGNUPS.put(key, JSON.stringify({ ...value, createdAt, country: request.cf?.country || null }));
  return json({ ok: true });
}

export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url);
    if (pathname === "/api/health") return json({ ok: true, storage: Boolean(env.SIGNUPS) });
    if (pathname === "/api/signup") {
      try { return await handleSignup(request, env); }
      catch (err) { console.error("signup failed", err); return json({ ok: false, error: "server_error" }, 500); }
    }
    if (pathname.startsWith("/api/")) return json({ ok: false, error: "not_found" }, 404);
    return env.ASSETS.fetch(request); // anything else: static site
  },
};
