// =========================
// Shared helpers for all pages
// =========================

// Auto year in footer
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// =========================
// Mobile menu toggle
// =========================
const toggleBtn = document.querySelector(".nav-toggle");
const mobileMenu = document.getElementById("mobileMenu");

if (toggleBtn && mobileMenu) {
  toggleBtn.addEventListener("click", () => {
    const expanded = toggleBtn.getAttribute("aria-expanded") === "true";
    toggleBtn.setAttribute("aria-expanded", String(!expanded));
    mobileMenu.hidden = expanded;
  });
}

// =========================
// Registration / Contact form logic
// =========================
const form = document.getElementById("regForm");
const statusEl = document.getElementById("formStatus");
const signupList = document.getElementById("signupList");
const clearBtn = document.getElementById("clearSignups");

// Get saved signups from localStorage
function getStoredSignups() {
  try {
    return JSON.parse(localStorage.getItem("signups") || "[]");
  } catch {
    return [];
  }
}

// Save signups to localStorage
function storeSignups(signups) {
  localStorage.setItem("signups", JSON.stringify(signups));
}

// Show saved signups on page
function renderSignups() {
  if (!signupList) return;

  const signups = getStoredSignups();
  signupList.innerHTML = "";

  if (signups.length === 0) {
    const li = document.createElement("li");
    li.textContent = "No signups yet.";
    signupList.appendChild(li);
    return;
  }

  for (const s of signups.slice(-5).reverse()) {
    const li = document.createElement("li");
    li.textContent = `${s.fullName} (${s.email}) — ${s.region} — ${s.interests.join(", ") || "No interests selected"}`;
    signupList.appendChild(li);
  }
}

// Email validation
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Form submit
if (form) {
  renderSignups();

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const fullName = document.getElementById("fullName")?.value.trim() || "";
    const email = document.getElementById("email")?.value.trim() || "";
    const region = document.getElementById("region")?.value || "";

    const interests = [...document.querySelectorAll('input[name="interests"]:checked')]
      .map(cb => cb.value);

    // Validation
    const errors = [];
    if (fullName.length < 3) errors.push("Please enter your full name.");
    if (!isValidEmail(email)) errors.push("Please enter a valid email address.");
    if (!region) errors.push("Please select a preferred region.");

    if (errors.length > 0) {
      if (statusEl) {
        statusEl.textContent = errors.join(" ");
        statusEl.style.color = "crimson";
      }
      return;
    }

    // Save data
    const signups = getStoredSignups();
    signups.push({
      fullName,
      email,
      region,
      interests,
      createdAt: new Date().toISOString()
    });
    storeSignups(signups);

    // Success message
    if (statusEl) {
      statusEl.textContent = `Thank you, ${fullName}. Your demo signup was saved in this browser only. No email was sent.`;
      statusEl.style.color = "green";
      statusEl.style.opacity = "0";

      setTimeout(() => {
        statusEl.style.transition = "opacity 0.6s ease";
        statusEl.style.opacity = "1";
      }, 50);
    }

    form.reset();
    renderSignups();
  });
}

// Clear saved signups
if (clearBtn) {
  clearBtn.addEventListener("click", () => {
    localStorage.removeItem("signups");
    renderSignups();

    if (statusEl) {
      statusEl.textContent = "Stored signups cleared.";
      statusEl.style.color = "#111";
    }
  });
}

// =========================
// Fade-in scroll animation
// =========================
const fadeElements = document.querySelectorAll(".fade-in");

if (fadeElements.length > 0) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.2 });

  fadeElements.forEach(el => observer.observe(el));
}

// =========================
// Dark mode toggle
// =========================
const themeToggle = document.getElementById("themeToggle");

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    const isDark = document.body.classList.contains("dark");
    themeToggle.textContent = isDark ? "Light Mode" : "Dark Mode";

    localStorage.setItem("theme", isDark ? "dark" : "light");
  });

  // Load saved theme
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    themeToggle.textContent = "Light Mode";
  }
}

// =========================
// Gallery page: filters + lightbox
// =========================
const filterButtons = document.querySelectorAll(".chip[data-filter]");
const galleryItems = document.querySelectorAll(".gallery-item");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxCaption = document.getElementById("lightboxCaption");
const lightboxClose = document.getElementById("lightboxClose");

// Filters
if (filterButtons.length && galleryItems.length) {
  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      filterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.dataset.filter;

      galleryItems.forEach(item => {
        const category = item.dataset.category;
        const show = filter === "all" || category === filter;
        item.style.display = show ? "" : "none";
      });
    });
  });
}

// Lightbox open
document.querySelectorAll(".gallery-btn").forEach(button => {
  button.addEventListener("click", () => {
    if (!lightbox || !lightboxImg) return;

    const full = button.dataset.full;
    const alt = button.dataset.alt || "Gallery image";

    lightboxImg.src = full;
    lightboxImg.alt = alt;

    if (lightboxCaption) {
      const title = button.querySelector("strong")?.textContent || "";
      const tag = button.querySelector(".muted")?.textContent || "";
      lightboxCaption.textContent = [title, tag].filter(Boolean).join(" • ");
    }

    lightbox.hidden = false;
    lightboxClose?.focus();
  });
});

// Close lightbox
function closeLightbox() {
  if (!lightbox) return;
  lightbox.hidden = true;
  if (lightboxImg) lightboxImg.src = "";
}

if (lightboxClose) {
  lightboxClose.addEventListener("click", closeLightbox);
}

if (lightbox) {
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (e) => {
    if (!lightbox.hidden && e.key === "Escape") {
      closeLightbox();
    }
  });
}

// Additional navigation and theme accessibility fixes.
if (toggleBtn && mobileMenu) {
  toggleBtn.addEventListener('keydown', e => { if(e.key === 'Escape'){mobileMenu.hidden=true;toggleBtn.setAttribute('aria-expanded','false');toggleBtn.focus();} });
}
if(themeToggle){
  const updatePressed=()=>themeToggle.setAttribute('aria-pressed',String(document.body.classList.contains('dark')));
  themeToggle.addEventListener('click',updatePressed);
  updatePressed();
}

// =========================
// Visual polish: scroll progress, header shadow, reveal-on-scroll
// =========================
(function () {
  const bar = document.createElement("div");
  bar.id = "scrollBar";
  document.body.appendChild(bar);
  const header = document.querySelector(".site-header");
  const onScroll = () => {
    const h = document.documentElement;
    const max = h.scrollHeight - h.clientHeight;
    bar.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + "%";
    if (header) header.classList.toggle("scrolled", h.scrollTop > 8);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const targets = document.querySelectorAll(
    ".card, .destination-tile, .intro-grid, .section-heading, .section-head, .page-head"
  );
  if (!("IntersectionObserver" in window)) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  targets.forEach((el, i) => {
    el.classList.add("reveal");
    el.style.transitionDelay = (i % 3) * 90 + "ms";
    io.observe(el);
  });
})();

// =========================
// Interactive layer
// =========================
(function () {
  const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const reduce = false; // animations always on

  // ---- Toast helper
  const toast = document.createElement("div");
  toast.id = "toast";
  toast.setAttribute("role", "status");
  document.body.appendChild(toast);
  let toastTimer;
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
  }

  // ---- Card spotlight + 3D tilt
  document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("pointermove", (e) => {
      if (e.pointerType !== "mouse") return;
      const r = card.getBoundingClientRect();
      const x = e.clientX - r.left, y = e.clientY - r.top;
      card.style.setProperty("--mx", x + "px");
      card.style.setProperty("--my", y + "px");
      if (fine && !reduce && !card.matches("form, .form")) {
        const rx = ((y / r.height) - 0.5) * -7;
        const ry = ((x / r.width) - 0.5) * 7;
        card.style.transition = "transform .12s, box-shadow .45s, border-color .3s";
        card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-8px)`;
      }
    });
    card.addEventListener("pointerleave", () => {
      card.style.transform = "";
      card.style.transition = "";
    });
  });

  // ---- Magnetic buttons + ripple
  document.querySelectorAll(".btn, .theme-toggle").forEach((btn) => {
    if (fine && !reduce) {
      btn.addEventListener("pointermove", (e) => {
        const r = btn.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) * 0.25;
        const dy = (e.clientY - (r.top + r.height / 2)) * 0.35;
        btn.style.transform = `translate(${dx}px, ${dy}px)`;
      });
      btn.addEventListener("pointerleave", () => (btn.style.transform = ""));
    }
    btn.addEventListener("click", (e) => {
      const r = btn.getBoundingClientRect();
      const size = Math.max(r.width, r.height);
      const s = document.createElement("span");
      s.className = "ripple";
      s.style.width = s.style.height = size + "px";
      s.style.left = e.clientX - r.left - size / 2 + "px";
      s.style.top = e.clientY - r.top - size / 2 + "px";
      btn.style.position = btn.style.position || "relative";
      btn.appendChild(s);
      setTimeout(() => s.remove(), 700);
    });
  });

  // ---- Hero parallax
  const photo = document.querySelector(".editorial-photo");
  const heroInner = document.querySelector(".editorial-inner");
  if (photo && !reduce) {
    window.addEventListener("scroll", () => {
      const y = Math.min(window.scrollY, 900);
      photo.style.translate = `0 ${y * 0.25}px`;
      if (heroInner) heroInner.style.opacity = Math.max(0, 1 - y / 650);
    }, { passive: true });
  }

  // ---- Back to top
  const top = document.createElement("button");
  top.id = "toTop";
  top.type = "button";
  top.setAttribute("aria-label", "Back to top");
  top.textContent = "↑";
  document.body.appendChild(top);
  top.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  window.addEventListener("scroll", () => top.classList.toggle("show", window.scrollY > 500), { passive: true });

  // ---- Image lightbox (gallery pages, popular places)
  const imgs = [...document.querySelectorAll(".gallery-grid img, .cards .card > img")];
  if (imgs.length) {
    const lb = document.createElement("div");
    lb.id = "lightbox";
    lb.setAttribute("role", "dialog");
    lb.setAttribute("aria-modal", "true");
    lb.setAttribute("aria-label", "Image viewer");
    lb.innerHTML = '<button id="lbClose" aria-label="Close">✕</button><button id="lbPrev" aria-label="Previous image">‹</button><figure><img alt=""/><figcaption></figcaption></figure><button id="lbNext" aria-label="Next image">›</button>';
    document.body.appendChild(lb);
    const lbImg = lb.querySelector("img"), lbCap = lb.querySelector("figcaption");
    let idx = 0, lastFocus = null;

    function captionFor(img) {
      const card = img.closest(".card");
      const t = card && card.querySelector("strong, h2, h3");
      return t ? t.textContent.trim() : img.alt;
    }
    function show(i) {
      idx = (i + imgs.length) % imgs.length;
      lbImg.src = imgs[idx].src;
      lbImg.alt = imgs[idx].alt;
      lbCap.innerHTML = "";
      lbCap.append(captionFor(imgs[idx]));
      const sm = document.createElement("small");
      sm.textContent = `${idx + 1} / ${imgs.length}`;
      lbCap.appendChild(sm);
    }
    function open(i) { lastFocus = document.activeElement; show(i); lb.classList.add("open"); document.body.style.overflow = "hidden"; lb.querySelector("#lbClose").focus(); }
    function close() { lb.classList.remove("open"); document.body.style.overflow = ""; if (lastFocus) lastFocus.focus(); }

    imgs.forEach((img, i) => {
      img.classList.add("zoomable");
      img.tabIndex = 0;
      img.setAttribute("role", "button");
      img.addEventListener("click", () => open(i));
      img.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(i); } });
    });
    lb.querySelector("#lbClose").addEventListener("click", close);
    lb.querySelector("#lbPrev").addEventListener("click", () => show(idx - 1));
    lb.querySelector("#lbNext").addEventListener("click", () => show(idx + 1));
    lb.addEventListener("click", (e) => { if (e.target === lb) close(); });
    document.addEventListener("keydown", (e) => {
      if (!lb.classList.contains("open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") show(idx - 1);
      if (e.key === "ArrowRight") show(idx + 1);
    });
    let sx = 0;
    lb.addEventListener("touchstart", (e) => (sx = e.touches[0].clientX), { passive: true });
    lb.addEventListener("touchend", (e) => {
      const d = e.changedTouches[0].clientX - sx;
      if (Math.abs(d) > 50) show(idx + (d < 0 ? 1 : -1));
    });
  }

  // ---- Theme + form feedback toasts
  const tt = document.getElementById("themeToggle");
  if (tt) tt.addEventListener("click", () => setTimeout(() => showToast(document.body.classList.contains("dark") ? "Dark mode on 🌙" : "Light mode on ☀️"), 50));
  const rf = document.getElementById("regForm");
  if (rf) rf.addEventListener("submit", () => setTimeout(() => {
    const s = document.getElementById("formStatus");
    if (s && s.textContent.trim()) showToast(s.textContent.trim().slice(0, 80));
  }, 80));
})();

// =========================
// WOW layer: leaves, ticker, filters, cursor, transitions
// =========================
(function () {
  const reduce = false; // animations always on
  const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  // ---------- Falling leaves (canvas, reacts to mouse "wind")
  if (!reduce) {
    const canvas = document.createElement("canvas");
    canvas.id = "leafCanvas";
    canvas.setAttribute("aria-hidden", "true");
    document.body.appendChild(canvas);
    const ctx = canvas.getContext("2d");
    let W, H, dpr;
    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth; H = window.innerHeight;
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    const leafPath = new Path2D();
    leafPath.moveTo(0, -1);
    leafPath.bezierCurveTo(0.95, -0.5, 0.7, 0.65, 0, 1);
    leafPath.bezierCurveTo(-0.7, 0.65, -0.95, -0.5, 0, -1);
    const palette = ["#c7a56b", "#d98e3a", "#b5532a", "#8a3b1e", "#7a9a3c", "#4f7a45", "#e6b84d"];
    const COUNT = W < 700 ? 16 : 34;
    const mouse = { x: -999, y: -999, vx: 0, vy: 0 };
    window.addEventListener("pointermove", (e) => {
      mouse.vx = e.clientX - mouse.x; mouse.vy = e.clientY - mouse.y;
      mouse.x = e.clientX; mouse.y = e.clientY;
    }, { passive: true });

    function makeLeaf(initial) {
      return {
        x: Math.random() * W,
        y: initial ? Math.random() * H : -30 - Math.random() * 120,
        s: 7 + Math.random() * 11,
        c: palette[(Math.random() * palette.length) | 0],
        vy: 0.5 + Math.random() * 0.9,
        vx: 0,
        rot: Math.random() * Math.PI * 2,
        vr: (Math.random() - 0.5) * 0.04,
        ph: Math.random() * 6.28,
        sw: 0.6 + Math.random() * 1.1,
        flip: Math.random() * 6.28,
        a: 0.55 + Math.random() * 0.4
      };
    }
    const leaves = Array.from({ length: COUNT }, () => makeLeaf(true));
    let running = true, t = 0;

    // gold dust motes (twinkling, slowly rising)
    const motes = Array.from({ length: W < 700 ? 18 : 45 }, () => ({
      x: Math.random() * W, y: Math.random() * H, r: 0.8 + Math.random() * 1.8,
      v: 0.15 + Math.random() * 0.35, ph: Math.random() * 6.28
    }));

    // click anywhere = burst of leaves
    window.addEventListener("pointerdown", (e) => {
      if (e.target.closest("a, button, input, select, textarea, label, #lightbox")) return;
      for (let k = 0; k < 14 && leaves.length < 140; k++) {
        const l = makeLeaf(false);
        const ang = Math.random() * Math.PI * 2, sp = 2 + Math.random() * 5;
        l.x = e.clientX; l.y = e.clientY; l.vx = Math.cos(ang) * sp; l.vy = Math.sin(ang) * sp - 2;
        l.vr = (Math.random() - 0.5) * 0.25; l.burst = true; l.a = 0.9;
        leaves.push(l);
      }
    });

    function frame() {
      if (!running) return;
      t += 0.016;
      ctx.clearRect(0, 0, W, H);
      for (const m of motes) {
        m.y -= m.v; m.x += Math.sin(t + m.ph) * 0.25;
        if (m.y < -5) { m.y = H + 5; m.x = Math.random() * W; }
        ctx.globalAlpha = 0.25 + 0.55 * Math.abs(Math.sin(t * 1.4 + m.ph));
        ctx.fillStyle = "#f0d9a2"; ctx.shadowColor = "#e8c97f"; ctx.shadowBlur = 8;
        ctx.beginPath(); ctx.arc(m.x, m.y, m.r, 0, 6.283); ctx.fill();
      }
      ctx.shadowBlur = 0;
      const speed = Math.hypot(mouse.vx, mouse.vy);
      for (let li = leaves.length - 1; li >= 0; li--) {
        const l = leaves[li];
        // gentle sway + mouse gust
        l.vx += Math.sin(t * l.sw + l.ph) * 0.012;
        const dx = l.x - mouse.x, dy = l.y - mouse.y, d = Math.hypot(dx, dy);
        if (d < 130 && speed > 1) {
          const f = (1 - d / 130) * Math.min(speed, 40) * 0.05;
          l.vx += (dx / (d || 1)) * f + mouse.vx * 0.01;
          l.vy += (dy / (d || 1)) * f * 0.5 - 0.02;
          l.vr += (Math.random() - 0.5) * 0.01;
        }
        l.vx *= 0.97; l.vy += (0.5 + l.s * 0.04 - l.vy) * 0.01;
        l.x += l.vx + Math.sin(t * l.sw + l.ph) * 0.5;
        l.y += l.vy;
        l.rot += l.vr + l.vx * 0.01; l.flip += 0.03;
        if (l.y > H + 30 || l.x < -60 || l.x > W + 60) { if (l.burst) { leaves.splice(li, 1); continue; } Object.assign(l, makeLeaf(false)); }
        ctx.save();
        ctx.translate(l.x, l.y);
        ctx.rotate(l.rot);
        ctx.scale(l.s * (0.35 + 0.65 * Math.abs(Math.cos(l.flip))), l.s * 1.5);
        ctx.globalAlpha = l.a;
        ctx.fillStyle = l.c;
        ctx.fill(leafPath);
        ctx.globalAlpha = l.a * 0.5;
        ctx.strokeStyle = "rgba(60,30,10,.7)";
        ctx.lineWidth = 0.06;
        ctx.beginPath(); ctx.moveTo(0, -1); ctx.lineTo(0, 1); ctx.stroke();
        ctx.restore();
      }
      mouse.vx *= 0.8; mouse.vy *= 0.8;
      requestAnimationFrame(frame);
    }
    function start() { if (!running) { running = true; requestAnimationFrame(frame); } else requestAnimationFrame(frame); }

    // on/off switch (remembered)
    const sw = document.createElement("button");
    sw.id = "leafToggle"; sw.type = "button"; sw.className = "theme-toggle";
    const hdr = document.getElementById("themeToggle");
    function setLeaves(on) {
      sw.setAttribute("aria-pressed", String(on));
      sw.setAttribute("aria-label", on ? "Turn falling leaves off" : "Turn falling leaves on");
      sw.textContent = on ? "🍂 Leaves" : "🍃 Leaves off";
      canvas.style.display = on ? "" : "none";
      if (on) { running = false; start(); } else running = false;
      try { localStorage.setItem("leaves", on ? "on" : "off"); } catch (e) {}
    }
    if (hdr && hdr.parentNode) hdr.parentNode.insertBefore(sw, hdr);
    sw.addEventListener("click", () => setLeaves(sw.getAttribute("aria-pressed") !== "true"));
    let saved = "on"; try { saved = localStorage.getItem("leaves") || "on"; } catch (e) {}
    running = false; setLeaves(saved !== "off");
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) running = false;
      else if (sw.getAttribute("aria-pressed") === "true") { running = false; start(); }
    });
  }

  // ---------- Rotating hero word
  const word = document.querySelector(".editorial-hero h1 i");
  if (word && !reduce) {
    const words = ["story.", "secret.", "legend.", "journey.", "past."];
    word.textContent = "";
    const span = document.createElement("span");
    span.className = "rotor";
    word.appendChild(span);
    let wi = 0, ci = 0, del = false;
    (function tick() {
      const w = words[wi];
      span.textContent = w.slice(0, ci);
      let delay = del ? 55 : 120;
      if (!del && ci === w.length) { del = true; delay = 1800; }
      else if (del && ci === 0) { del = false; wi = (wi + 1) % words.length; delay = 350; }
      else ci += del ? -1 : 1;
      setTimeout(tick, delay);
    })();
  }

  // ---------- Ticker under hero (home page)
  const hero = document.querySelector(".editorial-hero");
  if (hero) {
    const places = ["London", "Edinburgh Castle", "Isle of Skye", "Tower Bridge", "Loch Ness", "Stirling Castle", "Tate Modern", "Eilean Donan", "South West Coast Path", "Scottish Highlands", "Lighthouses", "National Parks"];
    const items = places.flatMap((p) => [p, "✦"]);
    const tk = document.createElement("div");
    tk.className = "ticker";
    tk.setAttribute("aria-hidden", "true");
    const track = document.createElement("div");
    track.className = "ticker-track";
    [...items, ...items].forEach((txt) => { const s = document.createElement("span"); s.textContent = txt; track.appendChild(s); });
    tk.appendChild(track);
    hero.after(tk);
  }

  // ---------- Popular Places filter chips
  const grid = document.querySelector("main .cards");
  if (grid && /Popular/i.test(document.title)) {
    const map = [["London", "City"], ["Castle", "Castles"], ["Coastal", "Coast"], ["Historic", "Heritage"], ["Museum", "Culture"], ["National", "Nature"]];
    const cards = [...grid.querySelectorAll(".card")];
    cards.forEach((c) => {
      const h = (c.querySelector("h2") || {}).textContent || "";
      const m = map.find(([k]) => h.includes(k));
      c.dataset.cat = m ? m[1] : "Other";
    });
    const cats = ["All", ...new Set(cards.map((c) => c.dataset.cat))];
    const bar = document.createElement("div");
    bar.className = "chips";
    bar.setAttribute("role", "group");
    bar.setAttribute("aria-label", "Filter places");
    cats.forEach((cat) => {
      const b = document.createElement("button");
      b.type = "button"; b.className = "chip"; b.textContent = cat;
      b.setAttribute("aria-pressed", String(cat === "All"));
      b.addEventListener("click", () => {
        bar.querySelectorAll(".chip").forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
        cards.forEach((c) => {
          const show = cat === "All" || c.dataset.cat === cat;
          c.classList.toggle("filtered-out", !show);
          c.classList.remove("pop-in");
          if (show) { c.classList.add("in"); void c.offsetWidth; c.classList.add("pop-in"); }
        });
      });
      bar.appendChild(b);
    });
    grid.before(bar);
  }

  // ---------- Glowing cursor ring
  if (fine && !reduce) {
    const ring = document.createElement("div"), dot = document.createElement("div");
    ring.id = "cursorRing"; dot.id = "cursorDot";
    document.body.append(ring, dot);
    let tx = 0, ty = 0, rx = 0, ry = 0;
    window.addEventListener("pointermove", (e) => {
      tx = e.clientX; ty = e.clientY;
      ring.classList.add("on"); dot.classList.add("on");
      dot.style.transform = `translate(${tx}px,${ty}px)`;
      ring.classList.toggle("big", !!e.target.closest("a, button, .card, .zoomable, select, input, label"));
    }, { passive: true });
    document.addEventListener("pointerleave", () => { ring.classList.remove("on"); dot.classList.remove("on"); });
    (function loop() {
      rx += (tx - rx) * 0.18; ry += (ty - ry) * 0.18;
      ring.style.transform = `translate(${rx}px,${ry}px)`;
      requestAnimationFrame(loop);
    })();
  }

  // ---------- Smooth page transitions between internal pages
  document.addEventListener("click", (e) => {
    const a = e.target.closest("a[href]");
    if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    const href = a.getAttribute("href");
    if (a.target === "_blank" || !href || href.startsWith("#") || /^(https?:|mailto:|tel:)/.test(href)) return;
    e.preventDefault();
    document.body.classList.add("leaving");
    setTimeout(() => { window.location.href = a.href; }, 280);
  });
  window.addEventListener("pageshow", (e) => { if (e.persisted) document.body.classList.remove("leaving"); });
})();

// Hero: headline drifts with the mouse
(function () {
  const h1 = document.querySelector(".editorial-hero h1");
  const photo = document.querySelector(".editorial-photo");
  if (!h1) return;
  window.addEventListener("pointermove", (e) => {
    const x = (e.clientX / window.innerWidth - 0.5), y = (e.clientY / window.innerHeight - 0.5);
    h1.style.translate = `${x * -22}px ${y * -14}px`;
    if (photo) photo.style.rotate = `${x * 0.6}deg`;
  }, { passive: true });
})();
