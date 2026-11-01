/* GroupCard({group, ctx}) : a pace or distance group (data/events.js, WRJ.data.groups) */
WRJ.c.GroupCard = function (p) {
  var g = p.group, U = WRJ.util, ph = g.photo ? { src: g.photo, alt: g.title } : U.photo(g.id, 0);
  return '<article class="group-card glass" id="' + U.uid(p.ctx || 'group', g.id) + '" data-reveal>' + (ph ? '<div class="group-photo"><img src="' + U.esc(ph.src) + '" alt="' + U.esc(ph.alt || g.title) + '" loading="lazy"></div>' : '') + '<div class="group-top"><span class="act-ic">' + WRJ.icon(g.icon) + '</span><span class="chip">' + U.esc(g.tag) + '</span></div>' +
    '<h3 class="display h-sm">' + U.esc(g.title) + '</h3><p class="group-range display">' + U.esc(g.range) + '</p><p class="muted">' + U.esc(g.text) + '</p></article>';
};
