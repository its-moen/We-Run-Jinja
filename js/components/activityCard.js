/* ActivityCard({activity, ctx}) */
WRJ.c.ActivityCard = function (p) {
  var a = p.activity, U = WRJ.util;
  return '<article class="act-card glass" id="' + U.uid(p.ctx || 'activity', a.id) + '" data-reveal><span class="act-ic">' + WRJ.icon(a.icon) + '</span><h3 class="display h-sm">' + U.esc(a.title) + '</h3><p class="muted">' + U.esc(a.text) + '</p></article>';
};
