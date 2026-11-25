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
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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
