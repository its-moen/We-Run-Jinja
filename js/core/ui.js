/* ui.js | start-up and the init registry.
   A component that needs behaviour pushes a function into WRJ.ui.inits;
   it is called with a container (document on first load, a panel after re-render). */
(function (W) {
  var ui = W.ui; ui.inits = [];
  ui.initAll = function (scope) { ui.inits.forEach(function (fn) { fn(scope || document); }); };
  /* re-render helper: swap content, then wire behaviour + animations for the new nodes */
  ui.mount = function (el, html) { el.innerHTML = html; ui.initAll(el); W.motion.scan(el); if (W.scroll) W.scroll.refresh(); };

  /* every component is wrapped: a bad row of data hides that one block, it never blanks the page */
  function guard() {
    Object.keys(W.c).forEach(function (k) {
      var f = W.c[k]; if (typeof f !== 'function' || f._safe) return;
      var g = function () { try { return f.apply(this, arguments); } catch (e) { console.warn('WRJ: component ' + k + ' failed', e); return ''; } }; g._safe = true; W.c[k] = g;
    });
  }
  function render() {
    guard();
    var page = W.pages[document.body.dataset.page];

    document.getElementById('header-root').innerHTML = W.c.Header(page.key);
    var main = document.getElementById('main'), out = '';
    try { out = page.render(); } catch (e) { console.error('WRJ: page failed', e); out = '<section class="section"><div class="container narrow"><div class="glass" style="padding:24px"><h1 class="display h-lg">Something went wrong</h1><p class="muted">This page could not load fully. Please refresh, or message us on WhatsApp.</p></div></div></section>'; }
    main.innerHTML = out;
    document.getElementById('footer-root').innerHTML = W.c.Footer() + W.c.WhatsAppFloat();
    document.body.insertAdjacentHTML('afterbegin', '<div class="progress-line" aria-hidden="true"></div>');
    W.theme.init(); ui.initAll(document); if (W.ui.bg) W.ui.bg.init((W.data.settings.background || {})[page.key]); W.motion.scan(document); W.scroll.init();
    if (location.hash) setTimeout(function () { var t = document.getElementById(decodeURIComponent(location.hash.slice(1))); if (t) { var d = t.matches('details') ? t : t.closest('details'); if (d) d.open = true; t.scrollIntoView(); } }, 120);
  }
  W.start = function () { if (W.sheet && W.sheet.enabled()) W.sheet.load().then(render, render); else render(); };

  /* delegated theme toggle */
  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-theme-toggle]'); if (t) W.theme.toggle();
  });
})(window.WRJ);

/* images that fail to load are hidden (the card keeps its gradient) instead of showing a broken icon */
document.addEventListener('error', function (e) { if (e.target && e.target.tagName === 'IMG') e.target.classList.add('img-broken'); }, true);
window.addEventListener('unhandledrejection', function (e) { console.warn('WRJ: unhandled promise', e.reason); });
