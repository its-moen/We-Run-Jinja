/* bgField.js | animated page backgrounds drawn on one fixed canvas (same approach as a particle field:
   init, resize, requestAnimationFrame loop, pause when the tab is hidden, still frame for reduced motion).
   Types: 'waves' (Nile water), 'ripples' (rain on the river), 'particles' (soft squares drifting toward you).
   All dials live in data/settings.js -> background. Visitors get a pause button; "Reduce motion" makes it still art.
   API: WRJ.ui.bg.init(config) | .update({speed:0.5}) | .pause() | .play() | .sync() | .destroy() */
(function (W) {
  var B = W.ui.bg = {}, cv, ctx, raf = 0, cfg = { type: 'none' }, w = 0, h = 0, clock = 0, last = 0, lastDraw = 0, paused = false, btn, ripples = [], nextSpawn = 0, parts = [];
  var DEF = { type: 'none', speed: 1, opacity: 1, fps: 60, layers: 5, amplitude: 26, wavelength: 460, rings: 3, maxRipples: 5, interval: 2.8, maxRadius: 340, count: 90, size: 14, depth: 900 };
  var TAU = Math.PI * 2, rnd = Math.random;
  var norm = function (c) { if (!c || c === 'none') return { type: 'none' }; if (typeof c === 'string') c = { type: c }; return Object.assign({}, DEF, c); };
  var dark = function () { return W.theme.current() === 'dark'; };
  var col = function () { return dark() ? { a: '125,205,215', b: '255,122,60' } : { a: '20,80,92', b: '212,68,15' }; };
  var still = function () { return W.motion.reduced(); };
  var store = { get: function () { try { return localStorage.getItem('wrj-bg-paused') === '1'; } catch (e) { return false; } }, set: function (v) { try { localStorage.setItem('wrj-bg-paused', v ? '1' : '0'); } catch (e) {} } };

  function resize() {
    if (!cv) return; var dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = innerWidth; h = innerHeight; cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr); ctx.setTransform(dpr, 0, 0, dpr, 0, 0); draw();
  }

  /* ---------- waves: layered sine bands that flow sideways and drift with the scroll ---------- */
  function waves() {
    var c = col(), L = cfg.layers, A = cfg.amplitude, lam = cfg.wavelength, o = cfg.opacity, span = h + 240;
    for (var i = 0; i < L; i++) {
      var base = h * (0.18 + i * (0.74 / L)), y0 = ((base - scrollY * (0.05 + i * 0.018)) % span + span) % span - 120, k = 1 + i * 0.16, ph = i * 1.7;
      ctx.beginPath(); ctx.moveTo(-10, y0);
      for (var x = -10; x <= w + 10; x += 10) {
        var y = y0 + A * (Math.sin(x / lam * TAU + clock * 0.55 * k + ph) + 0.42 * Math.sin(x / (lam * 0.52) * TAU - clock * 0.8 + i) + 0.18 * Math.sin(x / (lam * 0.23) * TAU + clock * 1.2 * k));
        ctx.lineTo(x, y);
      }
      ctx.strokeStyle = 'rgba(' + (i % 4 === 3 ? c.b : c.a) + ',' + (o * (0.07 + 0.05 * i / L)).toFixed(3) + ')'; ctx.lineWidth = 1.3; ctx.stroke();
      ctx.lineTo(w + 10, y0 + 400); ctx.lineTo(-10, y0 + 400); ctx.closePath(); ctx.fillStyle = 'rgba(' + c.a + ',' + (o * 0.016).toFixed(3) + ')'; ctx.fill();
    }
  }

  /* ---------- ripples: soft rings spreading from random points, squashed to feel like water in perspective ---------- */
  function spawn(age) { ripples.push({ x: rnd() * w, y: rnd() * h, born: clock - (age || 0), life: 7 + rnd() * 3, r: cfg.maxRadius * (0.6 + rnd() * 0.6), b: rnd() < 0.2 }); }
  function seed() { ripples = []; for (var i = 0; i < Math.min(3, cfg.maxRipples); i++) spawn(rnd() * 4); nextSpawn = clock + cfg.interval; }
  function ripple() {
    var c = col(), o = cfg.opacity;
    if (clock >= nextSpawn) { if (ripples.length < cfg.maxRipples) spawn(0); nextSpawn = clock + cfg.interval * (0.7 + rnd() * 0.6); }
    ripples = ripples.filter(function (r) { return (clock - r.born) / r.life < 1; });
    ripples.forEach(function (r) {
      var p = (clock - r.born) / r.life, e = 1 - Math.pow(1 - p, 3);
      for (var k = 0; k < cfg.rings; k++) {
        var rp = e - k * 0.13; if (rp <= 0) continue;
        var rad = rp * r.r, a = (1 - p) * (1 - k / cfg.rings) * 0.24 * o;
        ctx.beginPath(); ctx.ellipse(r.x, r.y, rad, rad * 0.6, 0, 0, TAU); ctx.strokeStyle = 'rgba(' + (r.b ? c.b : c.a) + ',' + a.toFixed(3) + ')'; ctx.lineWidth = 1.4 - k * 0.3; ctx.stroke();
      }
    });
  }

  /* ---------- particles: depth squares, adapted from the particle field example ---------- */
  function mk(z) { return { nx: rnd() * 2 - 1, ny: rnd() * 2 - 1, z: z != null ? z : 30 + rnd() * cfg.depth, rot: rnd() * Math.PI, spin: (rnd() * 2 - 1) * 0.004, b: rnd() < 0.25 }; }
  function particles(dt) {
    var c = col(), focal = 420, cx = w / 2, cy = h / 2, o = cfg.opacity;
    if (parts.length !== cfg.count) parts = Array.from({ length: cfg.count }, function () { return mk(); });
    parts.forEach(function (p) {
      p.z -= cfg.speed * dt * 20 * 3; p.rot += p.spin; if (p.z < 30) Object.assign(p, mk(cfg.depth));
      var k = focal / p.z, sx = cx + p.nx * focal * k, sy = cy + p.ny * focal * k, size = Math.max(1.2, cfg.size * k);
      var alpha = (0.12 + Math.max(0, 1 - p.z / cfg.depth) * Math.min(1, p.z / 60) * 0.43) * o;
      ctx.save(); ctx.translate(sx, sy); ctx.rotate(p.rot); ctx.fillStyle = 'rgba(' + (p.b ? c.b : c.a) + ',' + alpha.toFixed(3) + ')'; ctx.fillRect(-size / 2, -size / 2, size, size); ctx.restore();
    });
  }

  function draw(dt) {
    if (!ctx || cfg.type === 'none') return; ctx.clearRect(0, 0, w, h);
    if (cfg.type === 'waves') waves(); else if (cfg.type === 'ripples') ripple(); else if (cfg.type === 'particles') particles(dt || 0);
  }
  function loop(t) {
    raf = requestAnimationFrame(loop);
    if (t - lastDraw < 1000 / cfg.fps - 2) return;
    var dt = Math.min((t - last) / 1000, 0.05); last = t; lastDraw = t; clock += dt * cfg.speed; draw(dt);
  }
  function run() { if (raf || cfg.type === 'none' || paused || still() || document.hidden) return; last = performance.now(); raf = requestAnimationFrame(loop); }
  function halt() { cancelAnimationFrame(raf); raf = 0; }

  function button() {
    if (btn) btn.remove(); btn = null; if (cfg.type === 'none') return;
    btn = document.createElement('button'); btn.type = 'button'; btn.className = 'bg-toggle icon-btn'; btn.id = 'bg-motion-toggle';
    btn.addEventListener('click', function () { paused ? B.play() : B.pause(); }); document.body.appendChild(btn); label();
  }
  function label() { if (!btn) return; btn.hidden = still(); btn.setAttribute('aria-pressed', paused); btn.setAttribute('aria-label', paused ? 'Play background motion' : 'Pause background motion'); btn.title = btn.getAttribute('aria-label'); btn.innerHTML = W.icon(paused ? 'play' : 'pause'); }

  B.init = function (c) {
    B.destroy(); cfg = norm(c); if (cfg.type === 'none') return;
    cv = document.createElement('canvas'); cv.id = 'bg-canvas'; cv.setAttribute('aria-hidden', 'true'); document.body.appendChild(cv); ctx = cv.getContext('2d');
    paused = store.get(); clock = 2; if (cfg.type === 'ripples') seed(); parts = [];
    addEventListener('resize', resize); document.addEventListener('visibilitychange', onVis); resize(); button(); run();
  };
  function onVis() { document.hidden ? halt() : run(); }
  B.update = function (p) { cfg = Object.assign(cfg, p); if ('count' in p) parts = []; if (cfg.type === 'ripples' && ('maxRipples' in p)) seed(); draw(); };
  B.pause = function () { paused = true; store.set(true); halt(); label(); };
  B.play = function () { paused = false; store.set(false); label(); run(); };
  B.sync = function () { label(); if (still()) { halt(); draw(); } else run(); };   /* called when theme or accessibility settings change */
  B.destroy = function () { halt(); removeEventListener('resize', resize); document.removeEventListener('visibilitychange', onVis); if (cv) cv.remove(); if (btn) btn.remove(); cv = ctx = btn = null; cfg = { type: 'none' }; };
})(window.WRJ);
