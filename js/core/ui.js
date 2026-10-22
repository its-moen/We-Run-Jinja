/* ui.js | start-up and the init registry.
   A component that needs behaviour pushes a function into WRJ.ui.inits;
   it is called with a container (document on first load, a panel after re-render). */
(function (W) {
  var ui = W.ui; ui.inits = [];
  ui.initAll = function (scope) { ui.inits.forEach(function (fn) { fn(scope || document); }); };
  /* re-render helper: swap content, then wire behaviour + animations for the new nodes */
  ui.mount = function (el, html) { el.innerHTML = html; ui.initAll(el); W.motion.scan(el); if (W.scroll) W.scroll.refresh(); };

  W.start = function () {
    var page = W.pages[document.body.dataset.page];
    document.getElementById('header-root').innerHTML = W.c.Header(page.key);
    document.getElementById('main').innerHTML = page.render();
    document.getElementById('footer-root').innerHTML = W.c.Footer() + W.c.WhatsAppFloat();
    document.body.insertAdjacentHTML('afterbegin', '<div class="progress-line" aria-hidden="true"></div>');
    W.theme.init(); ui.initAll(document); W.motion.scan(document); W.scroll.init();
    if (location.hash) setTimeout(function () { var t = document.getElementById(decodeURIComponent(location.hash.slice(1))); if (t) t.scrollIntoView(); }, 120);
  };

  /* delegated theme toggle */
  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-theme-toggle]'); if (t) W.theme.toggle();
  });
})(window.WRJ);
