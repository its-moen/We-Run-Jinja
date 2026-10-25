/* HowStep({step, ctx}) : numbered step card (data/content.js -> steps) */
WRJ.c.HowStep = function (p) {
  var s = p.step, U = WRJ.util;
  return '<article class="how-step solid" id="' + U.uid(p.ctx || 'step', s.n) + '" data-reveal><span class="how-n display">' + s.n + '</span><span class="act-ic">' + WRJ.icon(s.icon) + '</span>' +
    '<h3 class="display h-sm">' + U.esc(s.title) + '</h3><p class="muted">' + U.esc(s.text) + '</p></article>';
};
