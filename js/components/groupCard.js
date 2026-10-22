/* GroupCard({group, ctx}) : a pace or distance group (data/events.js, WRJ.data.groups) */
WRJ.c.GroupCard = function (p) {
  var g = p.group, U = WRJ.util;
  return '<article class="group-card glass" id="' + U.uid(p.ctx || 'group', g.id) + '" data-reveal><div class="group-top"><span class="act-ic">' + WRJ.icon(g.icon) + '</span><span class="chip">' + U.esc(g.tag) + '</span></div>' +
    '<h3 class="display h-sm">' + U.esc(g.title) + '</h3><p class="group-range display">' + U.esc(g.range) + '</p><p class="muted">' + U.esc(g.text) + '</p></article>';
};
