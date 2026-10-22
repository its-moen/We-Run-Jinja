/* scroll.js | one rAF loop for scroll-driven effects
   [data-parallax="0.2"]      slow vertical drift
   [data-hscroll]             pinned section: vertical scroll moves a horizontal track
   [data-vparallax]           columns that slide up and down in opposite directions
   Header state and the top progress line also live here. */
(function (W) {
  var S = W.scroll = {}, ticking = false, mq = function () { return matchMedia('(min-width:900px)').matches; };
  var clamp = function (v, a, b) { return Math.min(Math.max(v, a), b); };

  var TOP = 72; /* px the pinned block sticks below the top of the window */
  function setupH(sec) {
    var sticky = sec.querySelector('.hs-sticky'), track = sec.querySelector('.hs-track');
    if (!mq() || W.motion.reduced()) { sec.style.height = ''; track.style.transform = ''; sec._dist = 0; return; }
    var pad = Math.max(40, (innerWidth - 1160) / 2); track.style.setProperty('--hs-pad', pad + 'px');
    sec._dist = Math.max(track.scrollWidth - innerWidth + pad, 0);
    sec.style.height = (sticky.offsetHeight + sec._dist) + 'px';
  }
  function frame() {
    ticking = false;
    var y = scrollY, doc = document.documentElement;
    var bar = document.querySelector('.progress-line'); if (bar) bar.style.transform = 'scaleX(' + clamp(y / Math.max(doc.scrollHeight - innerHeight, 1), 0, 1) + ')';
    var hd = document.querySelector('.site-header');
    if (hd) {
      hd.classList.toggle('scrolled', y > 24);
      var dy = y - (S._y || 0); S._y = y;
      if (y <= 40 || dy < -3) hd.classList.remove('dimmed'); else if (dy > 3) hd.classList.add('dimmed');
    }
    if (!W.motion.reduced()) {
      document.querySelectorAll('[data-parallax]').forEach(function (el) {
        var r = el.parentElement.getBoundingClientRect(); if (r.bottom < 0 || r.top > innerHeight) return;
        el.style.transform = 'translate3d(0,' + (-r.top * parseFloat(el.dataset.parallax)).toFixed(1) + 'px,0) scale(1.08)';
      });
      document.querySelectorAll('[data-vparallax]').forEach(function (box) {
        var r = box.getBoundingClientRect(); if (r.bottom < -200 || r.top > innerHeight + 200) return;
        var p = clamp((innerHeight - r.top) / (innerHeight + r.height), 0, 1) - .5;
        box.querySelectorAll('[data-speed]').forEach(function (col) { col.style.transform = 'translate3d(0,' + (p * -2 * parseFloat(col.dataset.speed)).toFixed(1) + 'px,0)'; });
      });
    }
    if (!W.motion.reduced()) {
      document.querySelectorAll('[data-float]').forEach(function (el) {
        var r = el.parentElement.getBoundingClientRect(); if (r.bottom < -100 || r.top > innerHeight + 100) return;
        var c = (r.top + r.height / 2 - innerHeight / 2) / innerHeight; el.style.translate = '0 ' + (c * -parseFloat(el.dataset.float)).toFixed(1) + 'px';
      });
      document.querySelectorAll('[data-shiftx]').forEach(function (el) {
        var r = el.getBoundingClientRect(); if (r.bottom < -100 || r.top > innerHeight + 100) return;
        var c = (r.top + r.height / 2 - innerHeight / 2) / innerHeight; el.style.translate = (c * -parseFloat(el.dataset.shiftx)).toFixed(1) + 'px 0';
      });
    }
    document.querySelectorAll('[data-hscroll]').forEach(function (sec) {
      if (!sec._dist) return;
      var r = sec.getBoundingClientRect(), p = clamp((TOP - r.top) / Math.max(sec._dist, 1), 0, 1);
      sec.querySelector('.hs-track').style.transform = 'translate3d(' + (-p * sec._dist).toFixed(1) + 'px,0,0)';
      var pb = sec.querySelector('.hs-progress i'); if (pb) pb.style.transform = 'scaleX(' + p + ')';
    });
  }
  function req() { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }
  /* [data-float-children="8"] gives each child a drift speed, alternating up and down */
  function seedFloat() { document.querySelectorAll('[data-float-children]').forEach(function (p) { if (p._ff) return; p._ff = true; var v = parseFloat(p.dataset.floatChildren); Array.prototype.forEach.call(p.children, function (c, i) { c.dataset.float = (i % 2 ? -v : v) * (1 + (i % 3) * .25); }); }); }
  /* stand alone screens: height in plain pixels, updated only when the width changes (avoids phone address bar jitter) */
  function fullScreens() { if (S._w === innerWidth && S._h) return; S._w = innerWidth; S._h = innerHeight; document.querySelectorAll('[data-fullscreen]').forEach(function (el) { el.style.minHeight = S._h + 'px'; }); }
  S.refresh = function () { fullScreens(); seedFloat(); document.querySelectorAll('[data-hscroll]').forEach(setupH); req(); };
  S.init = function () {
    /* touching, hovering or focusing the bar brings it back to normal */
    ['pointerdown', 'pointerover', 'focusin'].forEach(function (t) { document.addEventListener(t, function (e) { var h = document.querySelector('.site-header'); if (h && e.target.closest && e.target.closest('.site-header')) h.classList.remove('dimmed'); }); });
    addEventListener('scroll', req, { passive: true });
    addEventListener('resize', S.refresh);
    addEventListener('load', S.refresh);
    S.refresh();
  };
})(window.WRJ);
