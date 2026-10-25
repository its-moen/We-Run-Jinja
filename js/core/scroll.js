/* scroll.js | small scroll helpers (no parallax)
   - top progress line
   - top bar softens while scrolling down, returns on scroll up, hover, tap or focus
   - [data-fullscreen] blocks get the window height in plain pixels */
(function (W) {
  var S = W.scroll = {}, ticking = false;
  var clamp = function (v, a, b) { return Math.min(Math.max(v, a), b); };
  function fullScreens() {
    if (S._w === innerWidth && S._h) return; S._w = innerWidth; S._h = innerHeight;
    document.querySelectorAll('[data-fullscreen]').forEach(function (el) { el.style.minHeight = S._h + 'px'; });
    var hs = W.data.settings.hero || {}, r = (hs.ratio || [0.38, 0.4, 0.5, 0.52])[W.theme.sizeIndex()];   /* inner page heroes: a share of the window height, in px */
    document.querySelectorAll('[data-hero-ratio]').forEach(function (el) { el.style.minHeight = Math.round(Math.min(Math.max(S._h * r, hs.min || 300), hs.max || 640)) + 'px'; });
  }
  function frame() {
    ticking = false;
    var y = scrollY, doc = document.documentElement, bar = document.querySelector('.progress-line'), hd = document.querySelector('.site-header');
    if (bar) bar.style.transform = 'scaleX(' + clamp(y / Math.max(doc.scrollHeight - innerHeight, 1), 0, 1) + ')';
    if (hd) {
      hd.classList.toggle('scrolled', y > 24);
      var dy = y - (S._y || 0); S._y = y;
      if (y <= 40 || dy < -3) hd.classList.remove('dimmed'); else if (dy > 3) hd.classList.add('dimmed');
    }
  }
  function req() { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }
  S.refresh = function () { fullScreens(); req(); };
  S.init = function () {
    ['pointerdown', 'pointerover', 'focusin'].forEach(function (t) { document.addEventListener(t, function (e) { var h = document.querySelector('.site-header'); if (h && e.target.closest && e.target.closest('.site-header')) h.classList.remove('dimmed'); }); });
    addEventListener('scroll', req, { passive: true }); addEventListener('resize', S.refresh); addEventListener('load', S.refresh);
    S.refresh();
  };
})(window.WRJ);
