@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500;1,600&display=swap');
/* =========
   Base / Reset
   ========= */
* { box-sizing: border-box; }
html, body { margin: 0; padding: 0; }
body {
  font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
  line-height: 1.5;
  color: #111;
  background: #fafafa;
}

img { max-width: 100%; height: auto; }
a { color: inherit; text-decoration: none; }
a:focus, button:focus, input:focus, select:focus, textarea:focus { outline: 3px solid #111; outline-offset: 2px; }

/* Accessibility feature: skip link only visible when focused */
.skip-link {
  position: absolute; left: -999px; top: 10px;
  background: #fff; padding: 10px 12px; border: 2px solid #111; border-radius: 10px;
}
.skip-link:focus { left: 10px; z-index: 9999; }

.container { width: min(1100px, 92%); margin: 0 auto; }

/* =========
   Header / Nav
   ========= */
.site-header {
  position: sticky; top: 0;
  background: #fff;
  border-bottom: 1px solid #e6e6e6;
  z-index: 100;
}
.header-inner {
  display: flex; align-items: center; justify-content: space-between;
  padding: 14px 0;
  gap: 14px;
}
.brand { font-weight: 800; letter-spacing: 0.2px; }

.site-nav .nav-list {
  list-style: none; padding: 0; margin: 0;
  display: flex; gap: 16px;
}
.nav-list a {
  padding: 8px 10px;
  border-radius: 10px;
}
.nav-list a:hover { background: #f0f0f0; }
.nav-list a.active { background: #111; color: #fff; }

/* Mobile nav */
.nav-toggle {
  display: none;
  padding: 8px 10px;
  border: 1px solid #e6e6e6;
  border-radius: 10px;
  background: #fff;
}
.mobile-menu {
  display: none;
  padding: 10px 0 16px 0;
}
.mobile-menu a {
  display: block;
  padding: 10px;
  border-radius: 10px;
}
.mobile-menu a:hover { background: #f0f0f0; }
.mobile-menu a.active { background: #111; color: #fff; }

/* =========
   Layout / Sections
   ========= */
.hero {
  background: #fff;
  border-bottom: 1px solid #e6e6e6;
  padding: 40px 0;
}
.hero-grid {
  display: grid;
  grid-template-columns: 1.4fr 0.9fr;
  gap: 22px;
  align-items: start;
}
h1 { margin: 0 0 10px 0; font-size: clamp(1.8rem, 3vw, 2.6rem); }
.lead { font-size: 1.05rem; max-width: 60ch; }
.muted { color: #555; }

.hero-actions { display: flex; gap: 10px; margin: 16px 0; flex-wrap: wrap; }
.hero-badges {
  list-style: none; padding: 0; margin: 14px 0 0;
  display: flex; gap: 10px; flex-wrap: wrap;
}
.hero-badges li {
  border: 1px solid #e6e6e6;
  padding: 6px 10px;
  border-radius: 999px;
  background: #fafafa;
}

.page { padding: 26px 0 40px; }
.page-head { margin: 10px 0 18px; }

.split { padding: 28px 0; }
.section-head { margin-bottom: 12px; }

.cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
}

/* =========
   Components
   ========= */
.card {
  background: #fff;
  border: 1px solid #e6e6e6;
  border-radius: 18px;
  padding: 16px;
}
.card h2, .card h3 { margin-top: 0; }

.btn {
  display: inline-block;
  border-radius: 12px;
  padding: 10px 12px;
  border: 1px solid #e6e6e6;
  background: #fff;
  font-weight: 600;
}
.btn.primary { background: #111; color: #fff; border-color: #111; }
.btn.secondary { background: #fff; }
.btn.tertiary { background: #fafafa; }

.meta { font-size: 0.9rem; color: #555; }

/* Form */
.form .field { margin-bottom: 12px; }
label { display: block; font-weight: 650; margin-bottom: 6px; }
input, select, textarea {
  width: 100%;
  padding: 10px 12px;
  border-radius: 12px;
  border: 1px solid #d9d9d9;
  background: #fff;
}
.hint { color: #555; display: block; margin-top: 6px; }
fieldset { border: 1px solid #e6e6e6; border-radius: 14px; padding: 12px; }
legend { font-weight: 700; padding: 0 6px; }
.check { display: flex; gap: 8px; align-items: center; margin: 6px 0; }
.check input { width: auto; }

.actions { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 10px; }
.form-status { margin: 10px 0 0; font-weight: 650; }

/* Signup list */
.signup-list { padding-left: 18px; }

/* =========
   Footer
   ========= */
.site-footer {
  padding: 22px 0;
  border-top: 1px solid #e6e6e6;
  background: #fff;
}
.footer-inner { display: flex; justify-content: space-between; gap: 10px; flex-wrap: wrap; }

/* =========
   Responsive
   ========= */
@media (max-width: 860px) {
  .hero-grid { grid-template-columns: 1fr; }
  .cards { grid-template-columns: 1fr; }

  .site-nav { display: none; }
  .nav-toggle { display: inline-block; }
  .mobile-menu { display: block; }
}
.fade-in {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}

.fade-in.visible {
  opacity: 1;
  transform: translateY(0);
}
.btn {
  transition: all 0.3s ease;
}

.btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.15);
}
.card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 25px rgba(0,0,0,0.08);
}
.nav-list a {
  position: relative;
}

.nav-list a::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -4px;
  width: 0%;
  height: 2px;
  background: #111;
  transition: width 0.3s ease;
}

.nav-list a:hover::after {
  width: 100%;
}
.hero h1 {
  animation: fadeUp 1s ease forwards;
  opacity: 0;
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
html {
  scroll-behavior: smooth;
}
.hero {
  background: linear-gradient(-45deg, #ffffff, #f5f5f5, #fafafa, #f0f0f0);
  background-size: 400% 400%;
  animation: gradientMove 12s ease infinite;
}

@keyframes gradientMove {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
  }
}
body.dark {
  background: #111;
  color: #f5f5f5;
}

body.dark .card,
body.dark .site-header,
body.dark .site-footer {
  background: #1a1a1a;
  border-color: #333;
}

body.dark .btn.primary {
  background: #fff;
  color: #111;
}
/* Screen-reader only text helper */
.sr-only {
  position: absolute;
  width: 1px; height: 1px;
  padding: 0; margin: -1px;
  overflow: hidden; clip: rect(0,0,0,0);
  white-space: nowrap; border: 0;
}

/* Breadcrumb */
.breadcrumb { margin: 10px 0 14px; }
.breadcrumb a { text-decoration: underline; }

/* Gallery toolbar chips */
.gallery-toolbar { margin: 14px 0 16px; }
.toolbar-row { display: flex; gap: 10px; flex-wrap: wrap; align-items: center; }
.chip {
  border: 1px solid #e6e6e6;
  background: #fff;
  padding: 8px 12px;
  border-radius: 999px;
  font-weight: 650;
  cursor: pointer;
  transition: transform 0.2s ease, background 0.2s ease;
}
.chip:hover { transform: translateY(-2px); }
.chip.active { background: #111; color: #fff; border-color: #111; }

/* Gallery grid */
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
}
.gallery-item { margin: 0; }
.gallery-btn {
  width: 100%;
  border: 0;
  background: transparent;
  padding: 0;
  text-align: left;
  cursor: pointer;
}
.gallery-btn img {
  width: 100%;
  display: block;
  border-radius: 18px;
  border: 1px solid #e6e6e6;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}
.gallery-btn:hover img {
  transform: translateY(-4px);
  box-shadow: 0 12px 25px rgba(0,0,0,0.10);
}
.caption {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  padding: 10px 6px 0;
}

/* Lightbox */
.lightbox {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.65);
  display: grid;
  place-items: center;
  padding: 18px;
  z-index: 300;
}
.lightbox-inner {
  width: min(980px, 96vw);
  background: #fff;
  border-radius: 18px;
  padding: 14px;
  border: 1px solid #e6e6e6;
}
.lightbox-inner img {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 14px;
  border: 1px solid #e6e6e6;
  margin-top: 10px;
}

/* Responsive: gallery grid */
@media (max-width: 860px) {
  .gallery-grid { grid-template-columns: 1fr; }
}
.card {
  overflow: hidden;
}

.card img {
  transition: transform 0.35s ease, filter 0.35s ease;
}

.card:hover img {
  transform: scale(1.05);
  filter: brightness(1.05);
}
.card img {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  border-radius: 12px;
}
.card {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
/* Hero banner */
.hero-banner {
  background-image: url("../images/hero-uk.jpg");
  background-size: cover;
  background-position: center;
  height: 420px;
  position: relative;
  display: flex;
  align-items: center;
}

/* Dark overlay */
.hero-overlay {
  background: rgba(0,0,0,0.45);
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}

/* Hero text */
.hero-content {
  color: white;
  max-width: 600px;
}

.hero-content h1 {
  font-size: 2.6rem;
  margin-bottom: 10px;
}

.hero-content p {
  font-size: 1.1rem;
  margin-bottom: 18px;
}
/* Improve list formatting inside cards */
.card ul {
  padding-left: 20px;
  margin-top: 10px;
}

.card li {
  margin-bottom: 10px;
  line-height: 1.5;
}
.card p {
  margin-bottom: 12px;
}
.card {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 10px;
}
.card h2 {
  margin-bottom: 8px;
}

/* ==================================
   FIX: Card layout and mission section
   ================================== */

.cards {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 14px;
    align-items: start;
}

.card {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-self: start;

    height: auto;
    min-height: 0;

    padding: 20px;
    gap: 0;

    overflow: hidden;
    box-sizing: border-box;
}

/* Card headings */
.card h2,
.card h3 {
    margin: 0 0 16px 0;
    line-height: 1.3;
}

/* Lists inside cards */
.card ul {
    list-style-type: disc;
    list-style-position: outside;

    margin: 0;
    padding-left: 24px;
}

/* Individual bullet points */
.card li {
    padding-left: 2px;
    margin-bottom: 14px;
    line-height: 1.6;
}

/* Remove extra bottom spacing */
.card li:last-child {
    margin-bottom: 0;
}

/* Paragraph spacing */
.card p {
    margin: 0 0 12px;
}

.card p:last-child {
    margin-bottom: 0;
}

/* Mobile responsiveness */
@media (max-width: 860px) {
    .cards {
        grid-template-columns: 1fr;
        align-items: start;
    }

    .card {
        width: 100%;
        height: auto;
        padding: 20px;
    }
}

/* ===== HERITAGE EDITORIAL REDESIGN ===== */
500;600;700&family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500;1,600&display=swap');
:root{--forest:#193b32;--forest-dark:#102a24;--cream:#f7f4eb;--paper:#fffdf7;--gold:#c7a56b;--ink:#1c3029;--line:#dcded5}
html{scroll-padding-top:85px}body{font-family:'DM Sans',system-ui,sans-serif;background:var(--cream);color:var(--ink);line-height:1.65}h1,h2,h3{font-family:'Playfair Display',Georgia,serif;letter-spacing:-.025em;line-height:1.18}h1 i,h2 i{font-weight:500;color:#9e8555}h2{font-size:clamp(1.8rem,3vw,3rem)}.container{width:min(1200px,90%)}
.site-header{background:rgba(250,248,242,.96);border-color:var(--line);backdrop-filter:blur(16px)}.header-inner{min-height:76px}.brand{font-size:1.08rem;display:inline-flex;gap:10px;align-items:center;color:var(--forest);white-space:nowrap}.brand em{font-style:normal;color:#a3834d}.brand-symbol{font-size:1.8rem;color:#a3834d}.site-nav .nav-list{gap:5px;align-items:center}.nav-list a{font-size:.87rem;font-weight:700;color:#42584d;padding:10px 13px}.nav-list a.active{background:var(--forest);color:#fff}.nav-list a:hover{background:#e8ebe2}.nav-list a.active:hover{background:var(--forest)}.nav-list a::after{display:none}.theme-toggle{border:1px solid var(--line);background:transparent;border-radius:30px;padding:9px 13px;color:inherit;cursor:pointer;font-weight:700;font-family:inherit}.nav-toggle{font-family:inherit;font-weight:700;color:var(--ink)}.mobile-menu[hidden]{display:none!important}.mobile-menu{padding:8px 0 20px}.mobile-menu a{font-weight:700}
.btn{border-radius:6px;padding:13px 21px;display:inline-flex;gap:18px;align-items:center;justify-content:space-between;font-size:.9rem;transition:transform .2s,background .2s,box-shadow .2s}.btn.primary{background:var(--forest);border-color:var(--forest);color:#fff}.btn.primary:hover{background:#2e5948}.btn.secondary,.btn.tertiary{background:var(--paper);color:var(--forest);border-color:var(--line)}.btn.glass{background:rgba(255,255,255,.12);border-color:rgba(255,255,255,.6);color:#fff;backdrop-filter:blur(6px)}.btn:hover{transform:translateY(-2px);box-shadow:0 8px 22px rgba(12,31,24,.12)}
.editorial-hero{position:relative;min-height:min(760px,85vh);background:#173a32;color:white;isolation:isolate}.editorial-photo{position:absolute;inset:0;background:url('../images/edinburgh-castle.jpg') center 52%/cover no-repeat;z-index:-2}.editorial-shade{position:absolute;inset:0;background:linear-gradient(90deg,rgba(8,30,24,.85),rgba(9,32,26,.55) 53%,rgba(7,29,23,.13)),linear-gradient(0deg,rgba(9,32,26,.5),transparent 30%);z-index:-1}.editorial-inner{min-height:min(760px,85vh);display:flex;flex-direction:column;justify-content:center;padding-top:75px;padding-bottom:55px}.eyebrow{font-family:'DM Sans',sans-serif;font-size:.73rem;font-weight:800;letter-spacing:.18em;color:#9a7d4b;margin:0 0 20px}.eyebrow.light{color:#e6d5ae}.eyebrow-line{display:inline-block;width:32px;border-top:1px solid currentColor;vertical-align:middle;margin:0 12px}.editorial-hero h1{font-size:clamp(3.6rem,8vw,7.7rem);font-weight:500;line-height:1.04;margin:0 0 25px;max-width:840px}.editorial-hero h1 i{color:#ead6a8}.hero-subtitle{max-width:520px;font-size:1.12rem;color:#f1f2eb;margin:0 0 26px}.hero-bottom{display:flex;justify-content:space-between;gap:12px;margin-top:auto;padding-top:65px;font-size:.69rem;letter-spacing:.14em;font-weight:700;color:#f1e6d0}.intro-strip{background:#eae9de;padding:65px 0}.intro-grid{display:grid;grid-template-columns:1.2fr 1fr auto;gap:35px;align-items:center}.intro-grid h2{margin:0}.intro-grid>p{max-width:440px;color:#526259}.text-link{font-size:.86rem;font-weight:800;color:var(--forest);white-space:nowrap;border-bottom:1px solid #a0aa9d;padding-bottom:6px}.destination-section{padding-top:100px;padding-bottom:100px}.section-heading{display:flex;justify-content:space-between;align-items:end;gap:18px;margin-bottom:30px}.section-heading h2{margin:0}.destination-grid{display:grid;grid-template-columns:1.18fr 1fr 1fr;gap:18px}.destination-tile{position:relative;min-height:440px;overflow:hidden;border-radius:8px;color:white;display:block}.destination-tile img{width:100%;height:100%;position:absolute;inset:0;object-fit:cover;transition:transform .6s}.destination-tile:hover img{transform:scale(1.065)}.tile-overlay{position:absolute;inset:0;padding:28px;display:flex;flex-direction:column;justify-content:end;background:linear-gradient(0deg,rgba(8,26,22,.85),transparent 65%)}.tile-overlay span{font-size:.7rem;font-weight:800;letter-spacing:.16em;color:#e2c894}.tile-overlay h3{font-size:clamp(1.7rem,3vw,2.6rem);margin:10px 0 0}.tile-overlay p{margin:5px 0 0;font-size:.88rem;color:#f0f2e9}
.page{padding-top:65px;padding-bottom:90px}.page-head{max-width:800px;margin:0 0 40px}.page-head h1{font-size:clamp(2.8rem,5vw,5rem);font-weight:500;margin-bottom:20px}.lead{color:#526259;font-size:1.1rem}.split{padding:75px 0}.editorial-section{border-top:1px solid var(--line)}.section-head{margin-bottom:30px}.section-head h2{margin:0 0 12px}.cards{grid-template-columns:repeat(3,minmax(0,1fr));gap:22px;align-items:stretch}.card,.hero-card{background:var(--paper);border:1px solid var(--line);border-radius:10px;padding:27px;display:flex;flex-direction:column;gap:0;overflow:visible;min-width:0}.card h2,.card h3{margin:0 0 15px}.card h3{font-size:1.55rem}.card p{margin:0 0 15px}.card ul{padding-left:24px;margin:0}.card li{padding-left:3px;margin:0 0 13px;line-height:1.6}.card li:last-child{margin-bottom:0}.card img{width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:6px;margin-bottom:22px}.card:hover{transform:translateY(-4px);box-shadow:0 18px 35px rgba(24,49,39,.09)}.card .btn{align-self:flex-start;margin-top:auto}.meta,.muted,.hint{color:#64736a}.form .field{margin-bottom:18px}.form label{color:var(--ink)}input,select,textarea{border-radius:6px;background:#fff;border-color:#cdd4c8;padding:13px}.form-status{min-height:1.5em}.signup-list{overflow-wrap:anywhere}.gallery-grid{gap:22px}.gallery-btn img{border-radius:8px}.gallery-item{min-width:0}.chip{border-radius:30px;border-color:var(--line);font-family:inherit;color:var(--forest)}.chip.active{background:var(--forest);border-color:var(--forest)}.site-footer{background:var(--forest-dark);border:0;color:#e6e9df;padding:36px 0}.site-footer .muted{color:#c3cfc5}.site-footer a{color:#e6e9df}
body.dark{--cream:#12251f;--paper:#1d352b;--ink:#eef2e9;--line:#365044;background:var(--cream);color:var(--ink)}body.dark .site-header{background:#162b24}body.dark .card,body.dark .hero-card{background:var(--paper);border-color:var(--line)}body.dark .lead,body.dark .muted,body.dark .intro-grid>p{color:#c1cec2}body.dark .intro-strip{background:#20392f}body.dark .text-link{color:#dfc38f}body.dark .nav-list a{color:#e6e9df}body.dark .nav-list a.active{background:#c7a56b;color:#12251f}body.dark .brand{color:#f0f1e7}body.dark .btn.secondary,body.dark .btn.tertiary{background:#284637;color:#f2f3e8}body.dark .site-footer{background:#0a1b15}body.dark .page-head .eyebrow{color:#dfc38f}
@media(max-width:1020px){.intro-grid{grid-template-columns:1fr 1fr}.intro-grid .text-link{grid-column:1/-1;justify-self:start}.destination-tile{min-height:360px}.header-inner{flex-wrap:wrap}.site-nav .nav-list{gap:0}.nav-list a{padding:8px}}@media(max-width:860px){.site-nav{display:none}.nav-toggle{display:inline-block}.mobile-menu:not([hidden]){display:block}.header-inner{flex-wrap:nowrap}.theme-toggle{margin-left:auto}.cards{grid-template-columns:1fr}.destination-grid{grid-template-columns:1fr 1fr}.destination-tile:first-child{grid-column:1/-1}.intro-grid{grid-template-columns:1fr}.intro-grid .text-link{grid-column:auto}.editorial-inner,.editorial-hero{min-height:650px}}@media(max-width:600px){.container{width:90%}.brand{font-size:.89rem}.brand-symbol{font-size:1.4rem}.theme-toggle{padding:7px;font-size:.75rem}.header-inner{gap:8px}.editorial-inner,.editorial-hero{min-height:610px}.editorial-inner{padding-top:55px}.editorial-hero h1{font-size:3.6rem}.hero-bottom{font-size:.58rem}.destination-grid{grid-template-columns:1fr}.destination-tile:first-child{grid-column:auto}.destination-tile{min-height:390px}.section-heading{align-items:start;flex-direction:column}.destination-section{padding-top:65px;padding-bottom:65px}.intro-strip{padding:45px 0}.page{padding-top:45px}.split{padding:48px 0}.card{padding:23px}}
@media(prefers-reduced-motion:reduce){*,*::before,*::after{animation:none!important;transition:none!important;scroll-behavior:auto!important}}
