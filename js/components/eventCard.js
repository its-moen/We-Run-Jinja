/* EventCard({event, ctx}) : date block, title, place, distance. event.kind picks the label colour. */
WRJ.c.EventCard = function (p) {
  var U = WRJ.util, e = p.event, d = U.date(e.date), ph = e.photo ? { src: e.photo, alt: e.title } : U.photo(e.kind, (e.id || '').length % 3);
  var kinds = { club: 'Club run', race: 'Race', charity: 'Charity', social: 'Social', birthday: 'Birthday' };
  return '<article class="event-card glass has-photo kind-' + e.kind + '" id="' + U.uid(p.ctx || 'event', e.id) + '" data-reveal data-kind="' + e.kind + '">' +
    '<div class="event-date"><span class="display num" data-split="chars">' + d.getDate() + '</span><small>' + U.fmt(d, { month: 'short' }) + '</small><em>' + U.fmt(d, { weekday: 'short' }) + '</em></div>' +
    '<div class="event-main"><span class="chip">' + WRJ.icon(e.kind === 'birthday' ? 'cake' : e.kind === 'charity' ? 'heart' : e.kind === 'race' ? 'medal' : 'run') + kinds[e.kind] + '</span>' +
    '<h3 class="display h-sm">' + U.esc(e.title) + '</h3>' + (e.text ? '<p class="muted">' + U.esc(e.text) + '</p>' : '') +
    '<ul class="event-meta"><li>' + WRJ.icon('clock') + e.time + '</li><li>' + WRJ.icon('pin') + U.esc(e.place) + '</li>' + (e.distance ? '<li>' + WRJ.icon('route') + e.distance + '</li>' : '') + '</ul></div>' + (ph ? '<div class="event-photo"><img src="' + U.esc(ph.src) + '" alt="' + U.esc(ph.alt || e.title) + '" loading="lazy"></div>' : '') + '</article>';
};
