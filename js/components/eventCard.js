/* EventCard({event, ctx}) : date block, title, place, distance. event.kind picks the label colour. */
WRJ.c.EventCard = function (p) {
  var U = WRJ.util, e = p.event, d = U.date(e.date);
  var kinds = { club: 'Club run', race: 'Race', charity: 'Charity', social: 'Social', birthday: 'Birthday' };
  return '<article class="event-card glass kind-' + e.kind + '" id="' + U.uid(p.ctx || 'event', e.id) + '" data-reveal data-kind="' + e.kind + '">' +
    '<div class="event-date"><span class="display num" data-split="chars">' + d.getDate() + '</span><small>' + U.fmt(d, { month: 'short' }) + '</small><em>' + U.fmt(d, { weekday: 'short' }) + '</em></div>' +
    '<div class="event-main"><span class="chip">' + WRJ.icon(e.kind === 'birthday' ? 'cake' : e.kind === 'charity' ? 'heart' : e.kind === 'race' ? 'medal' : 'run') + kinds[e.kind] + '</span>' +
    '<h3 class="display h-sm">' + U.esc(e.title) + '</h3>' + (e.text ? '<p class="muted">' + U.esc(e.text) + '</p>' : '') +
    '<ul class="event-meta"><li>' + WRJ.icon('clock') + e.time + '</li><li>' + WRJ.icon('pin') + U.esc(e.place) + '</li>' + (e.distance ? '<li>' + WRJ.icon('route') + e.distance + '</li>' : '') + '</ul></div></article>';
};
