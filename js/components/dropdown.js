/* Dropdown({id, title, summary, icon, body, open}) : collapsible block that keeps long pages short.
   Opens automatically when a link such as #rankings points inside it. */
(function (W) {
  W.c.Dropdown = function (p) {
    var U = W.util;
    return '<details class="dd glass" id="' + p.id + '"' + (p.open ? ' open' : '') + ' data-reveal><summary>' +
      '<span class="dd-ic">' + W.icon(p.icon || 'run') + '</span><span class="dd-text"><b class="display h-sm">' + U.esc(p.title) + '</b>' + (p.summary ? '<small>' + U.esc(p.summary) + '</small>' : '') + '</span>' +
      '<span class="faq-plus">' + W.icon('plus') + '</span></summary><div class="dd-body">' + p.body + '</div></details>';
  };
  W.ui.inits.push(function () {
    if (document._dd) return; document._dd = true;
    /* sizes inside a closed block are zero: recalculate tabs and carousels when it opens */
    document.addEventListener('toggle', function (e) { if (e.target.matches && e.target.matches('details.dd') && e.target.open) setTimeout(function () { dispatchEvent(new Event('resize')); }, 30); }, true);
    document.addEventListener('click', function (e) {
      var a = e.target.closest('a[href^="#"]'); if (!a || a.getAttribute('href').length < 2) return;
      var t = document.getElementById(a.getAttribute('href').slice(1)); var d = t && (t.matches('details') ? t : t.closest('details'));
      if (d && !d.open) d.open = true;
    });
  });
})(window.WRJ);
