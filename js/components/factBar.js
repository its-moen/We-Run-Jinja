/* FactBar({facts}) : four quick answers a first time visitor needs (data/content.js -> facts) */
WRJ.c.FactBar = function (p) {
  var U = WRJ.util;
  return '<ul class="fact-bar glass" data-stagger>' + U.list(p.facts, function (f, i) {
    return '<li id="' + U.uid(p.ctx || 'fact', f.label) + '"><span class="fact-ic">' + WRJ.icon(f.icon) + '</span><span><small>' + U.esc(f.label) + '</small><b>' + U.esc(f.value) + '</b></span></li>'; }) + '</ul>';
};
