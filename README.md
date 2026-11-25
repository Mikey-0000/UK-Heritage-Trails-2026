# UK-Heritage-Trails-2026
Revamped 


## Deploying to Cloudflare

The site is static HTML/CSS/JS plus one small Worker (`src/worker.js`) that handles the sign-up form at `/api/signup`.
Config lives in `wrangler.jsonc`; files that must not be public are listed in `.assetsignore`.

### Option A — connect the GitHub repo (auto-deploys on every push)
1. Cloudflare dashboard → **Workers & Pages** → **Create** → **Import a repository** → pick this repo.
2. Build command: *(leave empty)*. Deploy command: `npx wrangler deploy`.
3. Save and deploy. Wrangler creates the `SIGNUPS` KV namespace automatically on the first deploy.

### Option B — from your computer
```bash
npm install
npx wrangler login
npm run deploy
```
Local preview: `npm run dev`.

### Reading sign-ups
```bash
npx wrangler kv key list --binding SIGNUPS --remote
npx wrangler kv key get "<key>" --binding SIGNUPS --remote
```

### Notes
- Custom domain: Workers & Pages → your project → Settings → Domains & Routes.
- If `/api/signup` isn't available (e.g. GitHub Pages) the form still works and saves locally in the browser.
- Google Fonts need an internet connection; fallback fonts are provided.
