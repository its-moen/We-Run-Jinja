/* Header(activeKey) : three stand alone pieces on one row.
   logo pill (left, solid) ... nav pill (glass) + theme button (far right, solid).
   Logo text, mark and nav items come from data/settings.js and data/site.js */
WRJ.c.Header = function (active) {
  var W = WRJ, S = W.data.site, L = W.data.settings.logo, U = W.util;
  var toggle = '<button class="icon-btn theme-btn" data-theme-toggle aria-label="Switch theme" aria-pressed="true"><span class="t-sun">' + W.icon('sun') + '</span><span class="t-moon">' + W.icon('moon') + '</span></button>';
  return '<header class="site-header"><div class="container bar">' +
    '<a class="brand" href="index.html" aria-label="' + U.esc(L.label) + '"><span class="brand-mark">' + W.icon(L.mark) + '</span><span class="brand-name display">' + U.esc(L.text) + '</span></a>' +
    '<div class="bar-right"><nav class="nav" aria-label="Main">' + U.list(S.nav, function (n) { return '<a href="' + n.href + '" id="nav-' + n.key + '"' + (n.key === active ? ' aria-current="page"' : '') + '>' + n.label + '</a>'; }) + '</nav>' + toggle + '</div></div></header>';
};
