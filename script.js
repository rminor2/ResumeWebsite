/* ============================================================
   Ryan Minor — Solutions Engineer Portfolio (multi-page)
   Shared engine: tubelight nav + footer + animations + graph
   Vanilla JS, no dependencies.
   ============================================================ */
(function () {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Shared nav config ---------- */
  const ICON = {
    home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9.5 12 3l9 6.5"/><path d="M5 9.5V21h14V9.5"/></svg>',
    about: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/></svg>',
    exp: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/></svg>',
    ai: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3"/></svg>',
    proj: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>',
    resume: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"/><path d="M14 3v5h5"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
  };
  const NAV = [
    { label: "Home", href: "index.html", icon: ICON.home },
    { label: "About", href: "about.html", icon: ICON.about },
    { label: "Experience", href: "experience.html", icon: ICON.exp },
    { label: "AI Process", href: "ai.html", icon: ICON.ai },
    { label: "Projects", href: "projects.html", icon: ICON.proj },
    { label: "Résumé", href: "resume.html", icon: ICON.resume },
    { label: "Contact", href: "contact.html", icon: ICON.mail },
  ];

  function currentPage() {
    let p = location.pathname.split("/").pop() || "index.html";
    if (p === "" ) p = "index.html";
    return p;
  }

  function buildNav() {
    const root = document.getElementById("nav-root");
    if (!root) return;
    const here = currentPage();
    root.innerHTML = `
      <nav class="tube-nav" aria-label="Primary">
        <div class="tube-nav__pill" id="tube-pill">
          ${NAV.map((n) => {
            const active = n.href === here ? " active" : "";
            return `<a class="tube-link${active}" href="${n.href}" ${active ? 'aria-current="page"' : ""}>
              <span class="tube-link__icon">${n.icon}</span>
              <span class="tube-link__label">${n.label}</span>
            </a>`;
          }).join("")}
          <span class="tube-lamp" id="tube-lamp" aria-hidden="true">
            <span class="tube-lamp__bar"></span><span class="tube-lamp__glow"></span>
          </span>
        </div>
      </nav>`;

    const pill = document.getElementById("tube-pill");
    const lamp = document.getElementById("tube-lamp");
    const active = pill.querySelector(".tube-link.active") || pill.querySelector(".tube-link");
    function placeLamp(animate) {
      if (!active) return;
      if (!animate) lamp.style.transition = "none";
      lamp.style.left = active.offsetLeft + "px";
      lamp.style.width = active.offsetWidth + "px";
      if (!animate) requestAnimationFrame(() => (lamp.style.transition = ""));
    }
    placeLamp(false);
    // settle animation in from a touch left
    if (!reduceMotion) requestAnimationFrame(() => placeLamp(true));
    window.addEventListener("resize", () => placeLamp(false));
  }

  /* ---------- Mobile nav follows the visible viewport bottom ----------
     On phones the tube-nav floats at the bottom. iOS Safari's toolbar overlaps
     the bottom of the layout viewport, so a plain `bottom: 0` element hides
     behind it. We instead anchor the nav to the bottom of the *visual* viewport:
     when Safari's toolbar slides up the nav rides up with it, and when the user
     scrolls and the toolbar collapses the nav drops back to the screen edge. */
  function followViewport() {
    const nav = document.querySelector(".tube-nav");
    const vv = window.visualViewport;
    if (!nav) return;
    const isMobile = window.matchMedia("(max-width: 720px)").matches;
    if (!isMobile || !vv) { nav.style.top = ""; nav.style.bottom = ""; return; }
    const gap = 12;                              // breathing room above the chrome
    const navH = nav.offsetHeight || 56;
    const visibleBottom = vv.offsetTop + vv.height; // y of the visible-area bottom
    nav.style.bottom = "auto";
    nav.style.top = Math.max(8, visibleBottom - navH - gap) + "px";
  }
  function watchViewport() {
    const relayout = () => requestAnimationFrame(followViewport);
    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", relayout);
      window.visualViewport.addEventListener("scroll", relayout);
    }
    window.addEventListener("resize", relayout);
    window.addEventListener("orientationchange", relayout);
    window.addEventListener("scroll", relayout, { passive: true });
    followViewport();
  }

  function buildFooter() {
    const root = document.getElementById("footer-root");
    if (!root) return;
    root.innerHTML = `
      <div class="container footer__inner">
        <span class="footer__name">Ryan Minor</span>
        <span class="footer__links">
          <a href="https://www.linkedin.com/in/ryan-minor-825126228" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="https://github.com/rminor2" target="_blank" rel="noreferrer">GitHub</a>
          <a href="mailto:rminor2@uccs.edu">Email</a>
        </span>
        <span class="footer__copy">© ${new Date().getFullYear()} Ryan Minor · Built from scratch, AI-augmented.</span>
      </div>`;
  }

  /* ---------- Scroll progress ---------- */
  function scrollProgress() {
    const bar = document.getElementById("scroll-progress");
    if (!bar) return;
    let ticking = false;
    const upd = () => {
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.setProperty("--scroll-progress", docH > 0 ? window.pageYOffset / docH : 0);
      ticking = false;
    };
    window.addEventListener("scroll", () => { if (!ticking) { requestAnimationFrame(upd); ticking = true; } }, { passive: true });
    upd();
  }

  /* ---------- Reveal on scroll ---------- */
  function reveal() {
    const els = document.querySelectorAll(".reveal");
    if (reduceMotion) { els.forEach((e) => e.classList.add("in")); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    els.forEach((e) => io.observe(e));
  }

  /* ---------- Animated counters ---------- */
  function counters() {
    const els = document.querySelectorAll(".stat__num");
    if (!els.length) return;
    const run = (el) => {
      const target = parseFloat(el.dataset.count || "0");
      const suffix = el.dataset.suffix || "";
      if (reduceMotion) { el.textContent = target + suffix; return; }
      const dur = 1400, start = performance.now();
      const step = (now) => {
        const p = Math.min((now - start) / dur, 1);
        el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))) + suffix;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting) { run(e.target); io.unobserve(e.target); }
    }), { threshold: 0.5 });
    els.forEach((e) => io.observe(e));
  }

  /* ---------- Gooey morphing text (Home hero) ---------- */
  function gooey() {
    const el = document.querySelector("[data-gooey]");
    if (!el) return;
    let texts;
    try { texts = JSON.parse(el.getAttribute("data-gooey")); } catch { return; }
    const t1 = el.querySelector(".gooey__t1");
    const t2 = el.querySelector(".gooey__t2");
    if (!t1 || !t2 || !texts.length) return;

    // The morphing headline is a signature hero animation, so it runs even when
    // the OS "Reduce Motion" setting is on (this is what froze it on iOS, where
    // it was swapping text with no blur morph).
    const morphTime = 1, cooldownTime = 0.4;
    let textIndex = texts.length - 1, time = new Date(), morph = 0, cooldown = cooldownTime;
    t1.textContent = texts[textIndex % texts.length];
    t2.textContent = texts[(textIndex + 1) % texts.length];
    const setMorph = (f) => {
      t2.style.filter = `blur(${Math.min(8 / f - 8, 100)}px)`;
      t2.style.opacity = `${Math.pow(f, 0.4) * 100}%`;
      const g = 1 - f;
      t1.style.filter = `blur(${Math.min(8 / g - 8, 100)}px)`;
      t1.style.opacity = `${Math.pow(g, 0.4) * 100}%`;
    };
    const doCooldown = () => { morph = 0; t2.style.filter = ""; t2.style.opacity = "100%"; t1.style.filter = ""; t1.style.opacity = "0%"; };
    const doMorph = () => { morph -= cooldown; cooldown = 0; let f = morph / morphTime; if (f > 1) { cooldown = cooldownTime; f = 1; } setMorph(f); };
    (function animate() {
      requestAnimationFrame(animate);
      const nt = new Date(); const inc = cooldown > 0; const dt = (nt - time) / 1000; time = nt; cooldown -= dt;
      if (cooldown <= 0) {
        if (inc) { textIndex = (textIndex + 1) % texts.length; t1.textContent = texts[textIndex % texts.length]; t2.textContent = texts[(textIndex + 1) % texts.length]; }
        doMorph();
      } else { doCooldown(); }
    })();
  }

  /* ---------- Page transitions (exit on internal nav) ---------- */
  function pageTransitions() {
    if (reduceMotion) return;
    document.addEventListener("click", (e) => {
      const a = e.target.closest("a");
      if (!a) return;
      const href = a.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("http") || href.startsWith("mailto") || href.startsWith("tel")) return;
      if (a.target === "_blank" || a.hasAttribute("download")) return;
      e.preventDefault();
      document.body.classList.add("is-exiting");
      setTimeout(() => { window.location.href = href; }, 240);
    });
    // restore on bfcache back-nav
    window.addEventListener("pageshow", () => document.body.classList.remove("is-exiting"));
  }

  /* ---------- Hero electric-waves shader (Home, raw WebGL) ---------- */
  function initHeroShader() {
    const canvas = document.getElementById("hero-shader");
    if (!canvas) return;
    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (!gl) return; // CSS aurora remains as fallback

    const vsSrc = "attribute vec2 a_pos; void main(){ gl_Position = vec4(a_pos,0.0,1.0); }";
    const fsSrc = `
      precision mediump float;
      uniform float u_time;
      uniform vec2 u_resolution;
      const float FREQ = 2.0;
      const float AMP = 0.12;
      const float BRIGHT = 0.0032;
      const float SEP = 0.12;
      float pattern(vec2 uv){
        float intensity = 0.0;
        for (int i = 0; i < 6; i++){
          float fi = float(i);
          uv.x += sin(u_time * (1.0 + fi) + uv.y * FREQ) * AMP;
          intensity += BRIGHT / abs(uv.x);
        }
        return intensity;
      }
      vec3 scene(vec2 uv){
        vec3 color = vec3(0.0);
        vec2 ruv = vec2(uv.y, uv.x);
        for (int i = 0; i < 6; i++){
          float fi = float(i);
          int ch = int(mod(fi, 3.0));
          vec2 cuv = ruv + vec2(0.0, fi * SEP);
          float p = pattern(cuv);
          if (ch == 0) color.r += p; else if (ch == 1) color.g += p; else color.b += p;
        }
        return color;
      }
      void main(){
        vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution) / min(u_resolution.x, u_resolution.y);
        vec3 col = scene(uv);
        // warm brand tint (cream / amber / tan) instead of raw RGB
        vec3 tint = col.r * vec3(1.0,0.80,0.52) + col.g * vec3(1.0,0.88,0.66) + col.b * vec3(0.78,0.55,0.40);
        gl_FragColor = vec4(tint, 1.0);
      }`;

    const sh = (type, src) => { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) { console.error(gl.getShaderInfoLog(s)); return null; } return s; };
    const vs = sh(gl.VERTEX_SHADER, vsSrc), fs = sh(gl.FRAGMENT_SHADER, fsSrc);
    if (!vs || !fs) return;
    const prog = gl.createProgram(); gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) { console.error(gl.getProgramInfoLog(prog)); return; }
    gl.useProgram(prog);
    const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, -1,1, 1,-1, 1,1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "a_pos"); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const uTime = gl.getUniformLocation(prog, "u_time"), uRes = gl.getUniformLocation(prog, "u_resolution");
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const resize = () => { const w = canvas.clientWidth, h = canvas.clientHeight; canvas.width = Math.max(1, w * dpr); canvas.height = Math.max(1, h * dpr); gl.viewport(0, 0, canvas.width, canvas.height); gl.uniform2f(uRes, canvas.width, canvas.height); };
    resize(); window.addEventListener("resize", resize);
    window.addEventListener("load", resize);          // re-measure once fonts/layout settle
    requestAnimationFrame(resize);                    // and again next frame (mobile sizing)
    const start = performance.now();
    // The hero shader is core brand content, so it keeps animating even when the
    // OS "Reduce Motion" setting is on. The IntersectionObserver below still pauses
    // it whenever it scrolls off-screen, so battery cost stays bounded.
    let raf = null, running = false;
    const frame = () => { gl.uniform1f(uTime, (performance.now() - start) / 1000); gl.drawArrays(gl.TRIANGLES, 0, 6); raf = requestAnimationFrame(frame); };
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting && !running) { running = true; frame(); }
      else if (!e.isIntersecting && running) { running = false; cancelAnimationFrame(raf); }
    }), { threshold: 0 });
    io.observe(canvas);
  }

  document.addEventListener("DOMContentLoaded", () => {
    buildNav();
    buildFooter();
    scrollProgress();
    reveal();
    counters();
    gooey();
    pageTransitions();
    initHeroShader();   // no-op unless #hero-shader exists (Home only)
    initKnowledgeGraph(reduceMotion); // no-op unless #knowledge-graph exists
    watchViewport();    // keep the mobile nav pinned above iOS Safari's toolbar
  });
})();

/* ============================================================
   Knowledge Graph — lightweight force-directed canvas
   (renders only on pages that include #knowledge-graph)
   ============================================================ */
function initKnowledgeGraph(reduceMotion) {
  const canvas = document.getElementById("knowledge-graph");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const tooltip = document.getElementById("graph-tooltip");
  const legendEl = document.getElementById("graph-legend");

  const N = [
    { id: "ai", label: "AI-Assisted Development" },
    { id: "obs", label: "Obsidian Knowledge Base" },
    { id: "se", label: "Solutions Engineering" },
    { id: "demos", label: "Customer Demos" },
    { id: "api", label: "API Integrations" },
    { id: "exec", label: "Executive Ops Dashboard" },
    { id: "webco", label: "Website Generation Co." },
    { id: "whole", label: "WholesaleBot" },
    { id: "signals", label: "Smart Money Signals" },
    { id: "resume", label: "Resume Website" },
    { id: "biz", label: "Business Automation" },
    { id: "saas", label: "SaaS Projects" },
    { id: "school", label: "School Projects" },
    { id: "cvpr", label: "CVPR Analytics" },
    { id: "score", label: "Score-Tracking Platform" },
  ];
  const E = [
    ["ai","obs"],["ai","se"],["ai","exec"],["ai","webco"],["ai","whole"],
    ["ai","signals"],["ai","resume"],["ai","biz"],["ai","saas"],
    ["obs","exec"],["obs","webco"],["obs","whole"],["obs","signals"],["obs","resume"],
    ["se","demos"],["se","exec"],["se","webco"],["demos","webco"],["demos","exec"],
    ["api","exec"],["api","webco"],["api","score"],["api","whole"],
    ["biz","exec"],["biz","webco"],["biz","whole"],
    ["saas","exec"],["saas","webco"],["saas","resume"],
    ["school","cvpr"],["school","score"],["resume","saas"],
  ];

  // Obsidian-style violet tiers: brighter + larger by connection count
  const tier = (d) => {
    if (d >= 8) return { core: "#c4b5fd", rgb: "167,139,250", r: 9 + Math.min(d, 11) * 1.6 };
    if (d >= 5) return { core: "#a78bfa", rgb: "139,92,245", r: 7 + Math.min(d, 11) * 1.4 };
    return { core: "#8b78d6", rgb: "124,58,237", r: 6 + Math.min(d, 11) * 1.2 };
  };
  const deg = {}; N.forEach((n) => (deg[n.id] = 0)); E.forEach(([a, b]) => { deg[a]++; deg[b]++; });
  const byId = {};
  N.forEach((n) => { byId[n.id] = n; n.deg = deg[n.id]; const t = tier(n.deg); n.core = t.core; n.rgb = t.rgb; n.r = t.r; n.vx = 0; n.vy = 0; n.phase = Math.random() * 6.283; });

  if (legendEl) legendEl.innerHTML = '<span class="graph-cap">Each node is a project, skill, or knowledge area · lines are links · larger nodes are more connected</span>';

  let W = 0, H = 0, laidOut = false; const dpr = Math.min(window.devicePixelRatio || 1, 2);
  function layoutNodes() {
    N.forEach((n, i) => {
      const a = (i / N.length) * Math.PI * 2;
      n.x = W / 2 + Math.cos(a) * Math.min(W, H) * 0.28 + (Math.random() - 0.5) * 40;
      n.y = H / 2 + Math.sin(a) * Math.min(W, H) * 0.28 + (Math.random() - 0.5) * 40;
    });
    laidOut = true;
  }
  function resize() {
    const rect = canvas.getBoundingClientRect();
    W = rect.width; H = rect.height;
    canvas.width = W * dpr; canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    // On mobile the canvas can measure 0×0 at DOMContentLoaded; lay the nodes out
    // only once we have a real size so the graph never renders blank.
    if (!laidOut && W > 0 && H > 0) layoutNodes();
  }
  resize();
  window.addEventListener("resize", resize);
  window.addEventListener("load", resize);   // re-measure after layout/fonts settle
  requestAnimationFrame(resize);             // and once more next frame (mobile sizing)

  let hovered = null, dragging = null;
  const pos = (evt) => { const r = canvas.getBoundingClientRect(); const t = evt.touches ? evt.touches[0] : evt; return { x: t.clientX - r.left, y: t.clientY - r.top }; };
  const nodeAt = (x, y) => { for (let i = N.length - 1; i >= 0; i--) { const n = N[i]; if ((n.x - x) ** 2 + (n.y - y) ** 2 <= (n.r + 7) ** 2) return n; } return null; };
  canvas.addEventListener("mousemove", (e) => {
    const m = pos(e);
    if (dragging) { dragging.x = m.x; dragging.y = m.y; dragging.vx = dragging.vy = 0; return; }
    hovered = nodeAt(m.x, m.y);
    if (hovered && tooltip) { tooltip.textContent = hovered.label; tooltip.style.left = hovered.x + "px"; tooltip.style.top = hovered.y + "px"; tooltip.style.opacity = "1"; }
    else if (tooltip) tooltip.style.opacity = "0";
    canvas.style.cursor = hovered ? "pointer" : "grab";
  });
  canvas.addEventListener("mousedown", (e) => { const m = pos(e); dragging = nodeAt(m.x, m.y); });
  window.addEventListener("mouseup", () => (dragging = null));
  canvas.addEventListener("mouseleave", () => { hovered = null; if (tooltip) tooltip.style.opacity = "0"; });
  const connected = (id) => new Set(E.filter((e) => e.includes(id)).flat());

  function physics() {
    const cx = W / 2, cy = H / 2, now = performance.now();
    for (let i = 0; i < N.length; i++) for (let j = i + 1; j < N.length; j++) {
      const a = N[i], b = N[j]; let dx = a.x - b.x, dy = a.y - b.y; let d2 = dx * dx + dy * dy || 0.01;
      const f = 2200 / d2, d = Math.sqrt(d2), fx = (dx / d) * f, fy = (dy / d) * f;
      a.vx += fx; a.vy += fy; b.vx -= fx; b.vy -= fy;
    }
    E.forEach(([ai, bi]) => {
      const a = byId[ai], b = byId[bi]; let dx = b.x - a.x, dy = b.y - a.y; const d = Math.sqrt(dx * dx + dy * dy) || 0.01;
      const f = (d - 124) * 0.011, fx = (dx / d) * f, fy = (dy / d) * f;
      a.vx += fx; a.vy += fy; b.vx -= fx; b.vy -= fy;
    });
    N.forEach((n) => {
      n.vx += (cx - n.x) * 0.0018; n.vy += (cy - n.y) * 0.0018;
      // smooth organic drift (deterministic — no jitter)
      n.vx += Math.sin(now * 0.0006 + n.phase) * 0.02;
      n.vy += Math.cos(now * 0.0005 + n.phase * 1.3) * 0.02;
      n.vx *= 0.9; n.vy *= 0.9;
      if (n !== dragging) { n.x += n.vx; n.y += n.vy; }
      n.x = Math.max(n.r + 8, Math.min(W - n.r - 8, n.x));
      n.y = Math.max(n.r + 8, Math.min(H - n.r - 8, n.y));
    });
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    const hi = hovered ? connected(hovered.id) : null;
    const now = performance.now();

    // edges (lavender, faint)
    E.forEach(([ai, bi]) => {
      const a = byId[ai], b = byId[bi];
      const active = hi && (ai === hovered.id || bi === hovered.id);
      ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
      ctx.strokeStyle = active ? "rgba(167,139,250,.55)" : hi ? "rgba(167,139,250,.06)" : "rgba(167,139,250,.13)";
      ctx.lineWidth = active ? 1.5 : 0.7; ctx.stroke();
    });

    // additive glow halos (internal luminescence)
    ctx.globalCompositeOperation = "lighter";
    N.forEach((n) => {
      const dimmed = hi && !hi.has(n.id);
      const a = (dimmed ? 0.07 : 0.32) + 0.1 * Math.sin(now * 0.0016 + n.phase);
      const R = n.r * 3.6;
      const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, R);
      g.addColorStop(0, `rgba(${n.rgb},${Math.max(a, 0)})`);
      g.addColorStop(1, `rgba(${n.rgb},0)`);
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(n.x, n.y, R, 0, 6.2832); ctx.fill();
    });
    ctx.globalCompositeOperation = "source-over";

    // cores + inset highlight + labels
    ctx.textAlign = "center";
    N.forEach((n) => {
      const dimmed = hi && !hi.has(n.id);
      ctx.globalAlpha = dimmed ? 0.4 : 1;
      ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, 6.2832); ctx.fillStyle = n.core; ctx.fill();
      ctx.beginPath(); ctx.arc(n.x - n.r * 0.28, n.y - n.r * 0.28, n.r * 0.46, 0, 6.2832); ctx.fillStyle = "rgba(255,255,255,.32)"; ctx.fill();
      ctx.globalAlpha = 1;
      const show = n.deg >= 8 || (hi && hi.has(n.id));
      if (show) {
        const strong = hovered && n.id === hovered.id;
        ctx.globalAlpha = dimmed ? 0.3 : 1;
        ctx.fillStyle = strong ? "#eeeeee" : "rgba(188,188,188,.85)";
        ctx.font = (strong ? "600 " : "500 ") + "11px ui-sans-serif, system-ui, -apple-system, sans-serif";
        ctx.fillText(n.label, n.x, n.y + n.r + 15);
        ctx.globalAlpha = 1;
      }
    });
  }

  // The graph is core brand content, so it animates even under "Reduce Motion".
  // It still pauses when scrolled off-screen (battery), and guards against a
  // not-yet-sized canvas so it can re-lay-out cleanly once a real size arrives.
  let running = false, raf = null;
  const loop = () => {
    if (W > 0 && H > 0) { if (!laidOut) layoutNodes(); physics(); draw(); }
    raf = requestAnimationFrame(loop);
  };
  const vis = new IntersectionObserver((entries) => entries.forEach((e) => {
    if (e.isIntersecting && !running) { running = true; loop(); }
    else if (!e.isIntersecting && running) { running = false; cancelAnimationFrame(raf); }
  }), { threshold: 0.05 });
  vis.observe(canvas);
}
