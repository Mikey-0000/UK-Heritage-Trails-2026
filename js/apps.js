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
        const rx = ((y / r.height) - 0.5) * -2;
        const ry = ((x / r.width) - 0.5) * 2;
        card.style.transition = "transform .12s, box-shadow .45s, border-color .3s";
        card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-5px)`;
      }
    });
    card.addEventListener("pointerleave", () => {
      card.style.transform = "";
      card.style.transition = "";
    });
  });

  // ---- Magnetic buttons + ripple
  document.querySelectorAll(".btn, .theme-toggle").forEach((btn) => {
    if (false) {
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
    const palettes = {
      autumn: ["#c7a56b", "#d98e3a", "#b5532a", "#8a3b1e", "#7a9a3c", "#4f7a45", "#e6b84d"],
      winter: ["#ffffff", "#eef5fb", "#d6e8f5", "#ffffff"],
      spring: ["#f7c6d3", "#f3a6bd", "#fde3ea", "#ffffff", "#c9e4a5"]
    };
    let season = "autumn";
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
        s: season === "winter" ? 1.5 + Math.random() * 3.5 : season === "spring" ? 5 + Math.random() * 6 : 7 + Math.random() * 11,
        c: palettes[season][(Math.random() * palettes[season].length) | 0],
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
    const flies = [];

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
      if (document.body.classList.contains("dark")) {
        while (flies.length < (W < 700 ? 16 : 34)) flies.push({ x: Math.random() * W, y: Math.random() * H, a: Math.random() * 6.28, s: 0.25 + Math.random() * 0.5, ph: Math.random() * 6.28, r: 1.6 + Math.random() * 1.8 });
        for (const f of flies) {
          f.a += (Math.random() - 0.5) * 0.18; f.x += Math.cos(f.a) * f.s; f.y += Math.sin(f.a) * f.s * 0.8;
          const fdx = f.x - mouse.x, fdy = f.y - mouse.y, fd = Math.hypot(fdx, fdy);
          if (fd < 90) { f.x += fdx / (fd || 1) * 1.6; f.y += fdy / (fd || 1) * 1.6; }
          if (f.x < -10) f.x = W + 10; if (f.x > W + 10) f.x = -10; if (f.y < -10) f.y = H + 10; if (f.y > H + 10) f.y = -10;
          const glow = 0.25 + 0.75 * Math.max(0, Math.sin(t * 1.6 + f.ph));
          ctx.globalAlpha = glow; ctx.shadowColor = "#d8ff7a"; ctx.shadowBlur = 16; ctx.fillStyle = "#f2ffb0";
          ctx.beginPath(); ctx.arc(f.x, f.y, f.r, 0, 6.283); ctx.fill();
        }
        ctx.shadowBlur = 0; ctx.globalAlpha = 1;
        mouse.vx *= 0.8; mouse.vy *= 0.8;
        requestAnimationFrame(frame);
        return;
      }
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
        if (season === "winter") {
          ctx.globalAlpha = l.a; ctx.fillStyle = l.c; ctx.shadowColor = "rgba(255,255,255,.9)"; ctx.shadowBlur = 6;
          ctx.beginPath(); ctx.arc(l.x, l.y, l.s, 0, 6.283); ctx.fill(); ctx.shadowBlur = 0;
          continue;
        }
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

    // season switcher: autumn -> winter -> spring -> off (remembered)
    const sw = document.createElement("button");
    sw.id = "leafToggle"; sw.type = "button"; sw.className = "theme-toggle";
    const hdr = document.getElementById("themeToggle");
    const SEASONS = ["autumn", "winter", "spring", "off"];
    const LABEL = { autumn: "🍂 Autumn", winter: "❄️ Winter", spring: "🌸 Spring", off: "🍃 Off" };
    let current = "autumn";
    function setSeason(name) {
      current = name;
      sw.textContent = LABEL[name];
      sw.setAttribute("aria-label", "Season effect: " + name + ". Click to change.");
      if (name === "off") { canvas.style.display = "none"; running = false; }
      else {
        season = name;
        leaves.length = 0;
        const n = (name === "winter" ? 1.7 : 1) * COUNT;
        for (let i = 0; i < n; i++) leaves.push(makeLeaf(true));
        canvas.style.display = ""; running = false; start();
      }
      try { localStorage.setItem("season", name); } catch (e) {}
      window.dispatchEvent(new CustomEvent("seasonchange", { detail: name }));
    }
    if (hdr && hdr.parentNode) hdr.parentNode.insertBefore(sw, hdr);
    sw.addEventListener("click", () => setSeason(SEASONS[(SEASONS.indexOf(current) + 1) % SEASONS.length]));
    let saved = "autumn"; try { saved = localStorage.getItem("season") || "autumn"; } catch (e) {}
    if (!SEASONS.includes(saved)) saved = "autumn";
    running = false; setSeason(saved);
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) running = false;
      else if (current !== "off") { running = false; start(); }
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


// =========================
// HOME PAGE SECTIONS: map, stats, timeline
// =========================
(function () {
  const anchor = document.querySelector(".destination-section");
  if (!anchor) return;

  // ---------- Interactive UK map ----------
  const GB = [[170,30],[235,22],[256,36],[246,80],[240,120],[218,168],[205,196],[210,226],[240,265],[256,296],[300,322],[302,356],[300,386],[306,406],[298,422],[250,426],[200,432],[160,440],[110,462],[75,478],[78,446],[115,420],[96,394],[46,376],[56,336],[72,288],[115,284],[130,268],[124,234],[126,204],[150,190],[120,174],[126,130],[96,104],[104,62]];
  const IE = [[60,190],[96,200],[102,240],[90,286],[56,300],[26,270],[20,226]];
  const smooth = (pts) => {
    // closed Catmull-Rom spline -> cubic beziers (curve passes through every point)
    const n = pts.length, t = 0.5 / 3 * 2 / 2;
    let d = `M${pts[0][0]},${pts[0][1]}`;
    for (let i = 0; i < n; i++) {
      const p0 = pts[(i - 1 + n) % n], p1 = pts[i], p2 = pts[(i + 1) % n], p3 = pts[(i + 2) % n];
      const c1 = [p1[0] + (p2[0] - p0[0]) * t, p1[1] + (p2[1] - p0[1]) * t];
      const c2 = [p2[0] - (p3[0] - p1[0]) * t, p2[1] - (p3[1] - p1[1]) * t];
      d += ` C${c1[0].toFixed(1)},${c1[1].toFixed(1)} ${c2[0].toFixed(1)},${c2[1].toFixed(1)} ${p2[0]},${p2[1]}`;
    }
    return d + "Z";
  };
  const PINS = [
    { id: "skye", name: "Isle of Skye", x: 96, y: 78, img: "images/isle-of-skye.jpg", href: "scotland.html", tag: "Scotland", txt: "Dramatic cliffs and rugged landscapes on Scotland's west coast." },
    { id: "ness", name: "Loch Ness", x: 150, y: 98, img: "images/loch-ness.jpg", href: "scotland.html", tag: "Scotland", txt: "A famous Highland lake, home of the Loch Ness Monster legend." },
    { id: "edin", name: "Edinburgh Castle", x: 206, y: 170, img: "images/edinburgh-castle.jpg", href: "scotland.html", tag: "Scotland", txt: "A historic fortress dominating the skyline of Edinburgh." },
    { id: "lon", name: "London", x: 286, y: 396, img: "images/london.jpg", href: "london.html", tag: "England", txt: "Iconic sights, museums and historic streets in the capital." },
    { id: "coast", name: "South West Coast Path", x: 108, y: 456, img: "images/coastal-path.jpg", href: "coastal.html", tag: "The Coast", txt: "Clifftop walking routes beside the sea with green hills." }
  ];
  const sec = document.createElement("section");
  sec.className = "container map-section";
  sec.setAttribute("aria-labelledby", "mapTitle");
  sec.innerHTML = `
    <div class="section-heading"><div><p class="eyebrow">FIND YOUR WAY</p><h2 id="mapTitle">Pick a place on <i>the map.</i></h2></div></div>
    <div class="map-grid">
      <div class="map-wrap">
        <svg viewBox="0 0 400 520" role="img" aria-label="Stylised map of the United Kingdom with five featured destinations">
          <defs><linearGradient id="landG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2a5a4a"/><stop offset="1" stop-color="#193b32"/></linearGradient></defs>
          <path d="${smooth(IE)}" class="land ie"/>
          <path d="${smooth(GB)}" class="land gb"/>
          <path id="routePath" class="route" d="M96,78 L150,98 L206,170 L250,290 L286,396 L108,456"/>
        </svg>
        ${PINS.map((p) => `<button type="button" class="pin" data-id="${p.id}" style="left:${p.x / 4}%;top:${p.y / 5.2}%" aria-label="${p.name}"><span class="pin-dot"></span><span class="pin-label">${p.name}</span></button>`).join("")}
      </div>
      <article class="map-card" aria-live="polite">
        <img alt="" loading="lazy"/>
        <div class="map-card-body"><span class="tag"></span><h3></h3><p></p><a class="btn primary" href="#">Explore <span aria-hidden="true">→</span></a></div>
      </article>
    </div>`;
  anchor.after(sec);

  const card = sec.querySelector(".map-card"), cImg = card.querySelector("img"), cTag = card.querySelector(".tag"),
        cH = card.querySelector("h3"), cP = card.querySelector("p"), cA = card.querySelector("a");
  const pins = [...sec.querySelectorAll(".pin")];
  let auto = true, ai = 3, timer;
  function show(id) {
    const p = PINS.find((x) => x.id === id);
    pins.forEach((b) => b.classList.toggle("active", b.dataset.id === id));
    card.classList.remove("swap"); void card.offsetWidth; card.classList.add("swap");
    cImg.src = p.img; cImg.alt = p.name; cTag.textContent = p.tag; cH.textContent = p.name; cP.textContent = p.txt; cA.href = p.href;
  }
  pins.forEach((b) => {
    ["pointerenter", "focus", "click"].forEach((ev) => b.addEventListener(ev, () => { auto = false; show(b.dataset.id); }));
  });
  show(PINS[ai].id);
  timer = setInterval(() => { if (!auto) return clearInterval(timer); ai = (ai + 1) % PINS.length; show(PINS[ai].id); }, 3800);

  // ---------- Animated stats ----------
  const stats = document.createElement("section");
  stats.className = "stats-strip";
  stats.innerHTML = `<div class="container stats-grid">
    <div><b data-count="18">0</b><span>Places featured</span></div>
    <div><b data-count="3">0</b><span>Gallery regions</span></div>
    <div><b data-count="8">0</b><span>Regions to follow</span></div>
    <div><b data-count="4">0</b><span>Ways to explore</span></div></div>`;
  sec.after(stats);
  const cio = new IntersectionObserver((es) => es.forEach((e) => {
    if (!e.isIntersecting) return; cio.unobserve(e.target);
    const el = e.target, end = +el.dataset.count, t0 = performance.now(), dur = 1700;
    (function step(now) {
      const k = Math.min(1, (now - t0) / dur), ease = 1 - Math.pow(1 - k, 3);
      el.textContent = Math.round(end * ease);
      if (k < 1) requestAnimationFrame(step);
    })(t0);
  }), { threshold: 0.6 });
  stats.querySelectorAll("b").forEach((b) => cio.observe(b));

  // ---------- Scrolling timeline ----------
  const EVENTS = [
    { when: "AD 122", title: "Hadrian's Wall begins", txt: "Rome starts marking the northern frontier of Britain, leaving ruins that still cross the landscape.", img: "images/history.jpg", href: "popular.html" },
    { when: "c. 1078", title: "The Tower of London rises", txt: "The White Tower is begun under William the Conqueror, anchoring London's skyline for nearly a thousand years.", img: "images/london.jpg", href: "london.html" },
    { when: "12th century", title: "Castles crown Scotland", txt: "Royal strongholds such as Edinburgh and Stirling grow into the symbols of a nation's story.", img: "images/edinburgh-castle.jpg", href: "scotland.html" },
    { when: "1894", title: "Tower Bridge opens", txt: "A Victorian feat of engineering opens over the Thames, still lifting for ships today.", img: "images/tower-bridge.jpg", href: "london.html" },
    { when: "2000", title: "Tate Modern opens", txt: "A former power station on the South Bank becomes one of the world's great modern art museums.", img: "images/tate.jpg", href: "london.html" }
  ];
  const tl = document.createElement("section");
  tl.className = "container timeline-section";
  tl.setAttribute("aria-labelledby", "tlTitle");
  tl.innerHTML = `<div class="section-heading"><div><p class="eyebrow">THROUGH THE AGES</p><h2 id="tlTitle">A journey through <i>British heritage.</i></h2></div></div>
    <ol class="timeline"><span class="tl-fill" aria-hidden="true"></span>
    ${EVENTS.map((e, i) => `<li class="tl-item ${i % 2 ? "right" : "left"}"><span class="tl-dot" aria-hidden="true"></span>
      <a class="tl-card" href="${e.href}"><img src="${e.img}" alt="" loading="lazy"/><div><span class="tl-when">${e.when}</span><h3>${e.title}</h3><p>${e.txt}</p></div></a></li>`).join("")}</ol>`;
  stats.after(tl);
  const tlEl = tl.querySelector(".timeline"), fill = tl.querySelector(".tl-fill"), items = [...tl.querySelectorAll(".tl-item")];
  function tlUpdate() {
    const r = tlEl.getBoundingClientRect(), mid = window.innerHeight * 0.55;
    const prog = Math.max(0, Math.min(1, (mid - r.top) / r.height));
    fill.style.height = prog * 100 + "%";
    items.forEach((it) => it.classList.toggle("on", it.getBoundingClientRect().top < mid));
  }
  window.addEventListener("scroll", tlUpdate, { passive: true });
  window.addEventListener("resize", tlUpdate);
  tlUpdate();
})();

// =========================
// Sticky "Plan your visit" bar
// =========================
(function () {
  if (/contact/i.test(location.pathname)) return;
  let dismissed = false;
  try { dismissed = sessionStorage.getItem("planBar") === "1"; } catch (e) {}
  if (dismissed) return;
  const onHome = !!document.getElementById("register");
  const bar = document.createElement("div");
  bar.id = "planBar";
  bar.innerHTML = `<span class="plan-ico" aria-hidden="true">✦</span><span class="plan-txt"><b>Plan your visit</b> — get route ideas &amp; event reminders</span><a class="btn primary" href="${onHome ? "#register" : "index.html#register"}">Sign up</a><button type="button" aria-label="Dismiss">✕</button>`;
  document.body.appendChild(bar);
  const reg = document.getElementById("register");
  let regVisible = false;
  if (reg && "IntersectionObserver" in window) new IntersectionObserver((es) => { regVisible = es[0].isIntersecting; update(); }, { threshold: 0.15 }).observe(reg);
  function update() { bar.classList.toggle("show", window.scrollY > 700 && !regVisible); }
  window.addEventListener("scroll", update, { passive: true });
  bar.querySelector("button").addEventListener("click", () => { bar.remove(); try { sessionStorage.setItem("planBar", "1"); } catch (e) {} });
  update();
})();

// =========================
// Ambient soundscape (generated in-browser: wind + soft birdsong)
// =========================
(function () {
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return;
  const btn = document.createElement("button");
  btn.id = "soundToggle"; btn.type = "button"; btn.className = "dock-btn";
  btn.setAttribute("aria-pressed", "false");
  btn.textContent = "🔇 Sound off";
  document.body.appendChild(btn);

  let ac, master, windGain, on = false, season = "autumn", timer;
  try { season = localStorage.getItem("season") || "autumn"; } catch (e) {}
  window.addEventListener("seasonchange", (e) => { season = e.detail; if (windGain) windGain.gain.setTargetAtTime(season === "winter" ? 0.9 : 0.45, ac.currentTime, 1.5); });

  function init() {
    ac = new AC();
    master = ac.createGain(); master.gain.value = 0; master.connect(ac.destination);
    const len = ac.sampleRate * 3, buf = ac.createBuffer(1, len, ac.sampleRate), d = buf.getChannelData(0);
    let last = 0; for (let i = 0; i < len; i++) { const w = Math.random() * 2 - 1; last = (last + 0.02 * w) / 1.02; d[i] = last * 3.5; }
    const src = ac.createBufferSource(); src.buffer = buf; src.loop = true;
    const lp = ac.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 520;
    windGain = ac.createGain(); windGain.gain.value = 0.45;
    const lfo = ac.createOscillator(), lfoG = ac.createGain(); lfo.frequency.value = 0.11; lfoG.gain.value = 0.22;
    lfo.connect(lfoG); lfoG.connect(windGain.gain);
    src.connect(lp); lp.connect(windGain); windGain.connect(master);
    src.start(); lfo.start();
  }
  function chirp() {
    if (!on || document.hidden) return schedule();
    if (season !== "winter") {
      let t = ac.currentTime + 0.05;
      const notes = 2 + ((Math.random() * 4) | 0), base = 2300 + Math.random() * 1700;
      for (let i = 0; i < notes; i++) {
        const o = ac.createOscillator(), g = ac.createGain();
        o.type = "sine";
        const f = base * (1 + Math.random() * 0.25);
        o.frequency.setValueAtTime(f, t); o.frequency.exponentialRampToValueAtTime(f * 1.45, t + 0.09);
        g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(0.045, t + 0.015); g.gain.linearRampToValueAtTime(0, t + 0.12);
        o.connect(g); g.connect(master); o.start(t); o.stop(t + 0.14);
        t += 0.15 + Math.random() * 0.05;
      }
    }
    schedule();
  }
  function schedule() {
    clearTimeout(timer);
    const f = season === "spring" ? 0.5 : 1;
    timer = setTimeout(chirp, (2500 + Math.random() * 6000) * f);
  }
  btn.addEventListener("click", () => {
    if (!ac) init();
    on = !on;
    ac.resume();
    master.gain.cancelScheduledValues(ac.currentTime);
    master.gain.setTargetAtTime(on ? 0.5 : 0, ac.currentTime, 0.6);
    btn.setAttribute("aria-pressed", String(on));
    btn.textContent = on ? "🔊 Sound on" : "🔇 Sound off";
    if (on) schedule(); else clearTimeout(timer);
  });
})();

// =========================
// FAVOURITES + "MY TRAIL" PLANNER
// =========================
(function () {
  const KEY = "myTrail";
  const load = () => { try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch (e) { return []; } };
  const save = (a) => { try { localStorage.setItem(KEY, JSON.stringify(a)); } catch (e) {} };
  let trail = load();
  const page = location.pathname.split("/").pop() || "index.html";
  const toast = (m) => { const t = document.getElementById("toast"); if (!t) return; t.textContent = m; t.classList.add("show"); clearTimeout(toast._t); toast._t = setTimeout(() => t.classList.remove("show"), 2200); };

  // --- drawer + launcher
  const launch = document.createElement("button");
  launch.id = "trailBtn"; launch.type = "button"; launch.className = "dock-btn";
  launch.setAttribute("aria-haspopup", "dialog");
  document.body.appendChild(launch);
  const drawer = document.createElement("aside");
  drawer.id = "trailDrawer"; drawer.setAttribute("role", "dialog"); drawer.setAttribute("aria-label", "My trail");
  drawer.innerHTML = `<div class="td-head"><h2>My Trail <i>♥</i></h2><button type="button" class="td-close" aria-label="Close">✕</button></div>
    <p class="td-sub">Tap the ♡ on any photo to add a stop. Reorder them to plan your route.</p>
    <ol class="td-list"></ol>
    <div class="td-actions"><button class="btn primary" data-a="copy" type="button">Copy itinerary</button><button class="btn secondary" data-a="print" type="button">Print</button><button class="btn tertiary" data-a="clear" type="button">Clear</button></div>`;
  document.body.appendChild(drawer);
  const list = drawer.querySelector(".td-list");

  function render() {
    launch.textContent = `♥ My Trail (${trail.length})`;
    launch.classList.toggle("has", trail.length > 0);
    list.innerHTML = "";
    if (!trail.length) { const li = document.createElement("li"); li.className = "td-empty"; li.textContent = "No stops yet — explore the gallery and tap a heart."; list.appendChild(li); }
    trail.forEach((s, i) => {
      const li = document.createElement("li");
      li.innerHTML = `<img src="${s.img}" alt=""/><div class="td-info"><b></b><a href="${s.page}">${s.page.replace(".html", "")}</a></div><div class="td-ctl"><button type="button" data-m="up" aria-label="Move up">↑</button><button type="button" data-m="down" aria-label="Move down">↓</button><button type="button" data-m="del" aria-label="Remove">✕</button></div>`;
      li.querySelector("b").textContent = `${i + 1}. ${s.name}`;
      li.querySelectorAll("button").forEach((b) => b.addEventListener("click", () => {
        const m = b.dataset.m;
        if (m === "del") trail.splice(i, 1);
        if (m === "up" && i > 0) [trail[i - 1], trail[i]] = [trail[i], trail[i - 1]];
        if (m === "down" && i < trail.length - 1) [trail[i + 1], trail[i]] = [trail[i], trail[i + 1]];
        save(trail); render(); syncHearts();
      }));
      list.appendChild(li);
    });
  }
  function open() { drawer.classList.add("open"); drawer.querySelector(".td-close").focus(); }
  function close() { drawer.classList.remove("open"); launch.focus(); }
  launch.addEventListener("click", () => drawer.classList.contains("open") ? close() : open());
  drawer.querySelector(".td-close").addEventListener("click", close);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && drawer.classList.contains("open")) close(); });
  drawer.querySelector('[data-a="clear"]').addEventListener("click", () => { trail = []; save(trail); render(); syncHearts(); });
  drawer.querySelector('[data-a="print"]').addEventListener("click", () => { document.body.classList.add("print-trail"); window.print(); setTimeout(() => document.body.classList.remove("print-trail"), 500); });
  drawer.querySelector('[data-a="copy"]').addEventListener("click", async () => {
    const txt = "My UK Heritage Trail\n" + trail.map((s, i) => `${i + 1}. ${s.name}`).join("\n");
    try { await navigator.clipboard.writeText(txt); toast("Itinerary copied ✓"); } catch (e) { toast("Couldn't copy — select the list instead"); }
  });

  // --- hearts on every photo card
  const cards = [...document.querySelectorAll(".gallery-grid figure.card, .cards .card")].filter((c) => c.querySelector("img"));
  const hearts = [];
  cards.forEach((c) => {
    const img = c.querySelector("img");
    const nameEl = c.querySelector("strong, h2, h3");
    const name = nameEl ? nameEl.textContent.trim() : img.alt;
    const id = img.getAttribute("src") + "|" + name;
    const b = document.createElement("button");
    b.type = "button"; b.className = "heart"; b.setAttribute("aria-label", "Add " + name + " to My Trail");
    b.textContent = "♡";
    c.appendChild(b);
    b.addEventListener("click", (e) => {
      e.preventDefault(); e.stopPropagation();
      const k = trail.findIndex((s) => s.id === id);
      if (k >= 0) { trail.splice(k, 1); toast(name + " removed"); }
      else { trail.push({ id, name, img: img.getAttribute("src"), page }); toast(name + " added to My Trail ♥"); b.classList.add("pop"); setTimeout(() => b.classList.remove("pop"), 600); }
      save(trail); render(); syncHearts();
    });
    hearts.push({ b, id, name });
  });
  function syncHearts() {
    hearts.forEach(({ b, id, name }) => {
      const on = trail.some((s) => s.id === id);
      b.textContent = on ? "♥" : "♡"; b.classList.toggle("on", on);
      b.setAttribute("aria-pressed", String(on));
    });
  }
  render(); syncHearts();
})();

// =========================
// CONFETTI on successful sign-up
// =========================
(function () {
  const st = document.getElementById("formStatus");
  if (!st) return;
  function burst() {
    const c = document.createElement("canvas");
    c.style.cssText = "position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:10003";
    document.body.appendChild(c);
    const W = (c.width = innerWidth), H = (c.height = innerHeight), x = c.getContext("2d");
    const cols = ["#c7a56b", "#e6b84d", "#2a5a4a", "#b5532a", "#f7c6d3", "#ffffff"];
    const ps = Array.from({ length: 140 }, () => ({ x: W / 2 + (Math.random() - .5) * 200, y: H * 0.6, vx: (Math.random() - .5) * 16, vy: -8 - Math.random() * 12, w: 6 + Math.random() * 7, h: 4 + Math.random() * 6, r: Math.random() * 6, vr: (Math.random() - .5) * .4, c: cols[(Math.random() * cols.length) | 0] }));
    let f = 0;
    (function tick() {
      x.clearRect(0, 0, W, H);
      ps.forEach((p) => { p.vy += 0.32; p.vx *= 0.99; p.x += p.vx; p.y += p.vy; p.r += p.vr; x.save(); x.translate(p.x, p.y); x.rotate(p.r); x.fillStyle = p.c; x.globalAlpha = Math.max(0, 1 - f / 140); x.fillRect(-p.w / 2, -p.h / 2, p.w, p.h); x.restore(); });
      if (++f < 140) requestAnimationFrame(tick); else c.remove();
    })();
  }
  new MutationObserver(() => { if (/^Thank you/.test(st.textContent.trim())) burst(); }).observe(st, { childList: true, characterData: true, subtree: true });
})();

// =========================
// SWINGING NAME TAG (real pendulum physics: hover, drag, scroll and click all make it swing)
// =========================
(function () {
  const inner = document.querySelector(".site-footer .footer-inner");
  if (!inner) return;
  const wrap = document.createElement("div");
  wrap.className = "swing-tag";
  wrap.setAttribute("role", "group");
  wrap.setAttribute("aria-label", "Credit: @Mikey0000, Michael Dedeji, Programmer and Developer");
  wrap.innerHTML = `<span class="nail" aria-hidden="true"></span>
    <div class="rig"><span class="cord" aria-hidden="true"></span>
      <div class="tag-body"><span class="eyelet" aria-hidden="true"></span>
        <div class="paper"><span class="handle">@Mikey0000</span><span class="name">Michael Dedeji</span><span class="role">Programmer and Developer</span></div>
      </div>
    </div>`;
  inner.appendChild(wrap);

  const rig = wrap.querySelector(".rig"), body = wrap.querySelector(".tag-body");
  // main pendulum (rig) + secondary lag of the tag around its eyelet
  let th = 0, w = 0, ph = 0, pw = 0, lastW = 0;
  const G = 26, DAMP = 1.6, K2 = 70, D2 = 4.2;
  let visible = false, raf = 0, last = 0, drag = false, lastX = 0, gustAt = 0;

  function loop(now) {
    raf = 0;
    if (!visible && !drag) return;
    const dt = Math.min(0.033, (now - last) / 1000 || 0.016); last = now;
    if (!drag) {
      const acc = -G * Math.sin(th) - DAMP * w;
      w += acc * dt; th += w * dt;
      if (now > gustAt) { w += (Math.random() - 0.5) * 0.12; gustAt = now + 4000 + Math.random() * 5000; } // idle breeze
    }
    const angAcc = (w - lastW) / dt; lastW = w;
    const a2 = -K2 * ph - D2 * pw - angAcc * 0.012 * 57;
    pw += a2 * dt; ph += pw * dt;
    th = Math.max(-0.7, Math.min(0.7, th)); ph = Math.max(-0.45, Math.min(0.45, ph));
    rig.style.transform = `rotate(${th}rad)`;
    body.style.transform = `rotate(${ph}rad)`;
    raf = requestAnimationFrame(loop);
  }
  const wake = () => { if (!raf) { last = performance.now(); raf = requestAnimationFrame(loop); } };

  new IntersectionObserver((es) => {
    const was = visible; visible = es[0].isIntersecting;
    if (visible && !was) { w += (Math.random() < 0.5 ? -1 : 1) * 0.9; wake(); } // swings in when you reach the footer
  }, { threshold: 0.35 }).observe(wrap);

  // hover/move: brush it and it swings
  wrap.addEventListener("pointermove", (e) => {
    if (drag) return;
    w += Math.max(-1.2, Math.min(1.2, e.movementX * 0.012)); wake();
  });
  wrap.addEventListener("pointerdown", (e) => {
    drag = true; wrap.classList.add("drag"); wrap.setPointerCapture(e.pointerId); lastX = e.clientX; wake();
    pull(e);
  });
  function pull(e) {
    const r = wrap.getBoundingClientRect();
    const px = r.left + r.width / 2, py = r.top - 26;           // pivot position on screen
    const nt = Math.atan2(e.clientX - px, Math.max(40, e.clientY - py));
    w = (nt - th) / 0.016; th = nt;
  }
  wrap.addEventListener("pointermove", (e) => { if (drag) pull(e); });
  const release = () => { if (!drag) return; drag = false; wrap.classList.remove("drag"); w = Math.max(-3, Math.min(3, w)); wake(); };
  wrap.addEventListener("pointerup", release);
  wrap.addEventListener("pointercancel", release);

  // scrolling makes it sway a little
  let sy = window.scrollY;
  window.addEventListener("scroll", () => {
    const d = window.scrollY - sy; sy = window.scrollY;
    if (visible) { w += Math.max(-0.35, Math.min(0.35, d * 0.003)); wake(); }
  }, { passive: true });
})();
