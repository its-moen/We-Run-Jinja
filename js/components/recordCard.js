/* RecordCard({run, ctx, maxKm}) : one latest record. Pace is calculated from distance and duration. */
WRJ.c.RecordCard = function (p) {
  var U = WRJ.util, r = p.run, a = U.athlete(r.athleteId), id = U.uid(p.ctx || 'record', r.id);
  var icon = r.category === 'charity' ? 'heart' : r.category === 'race' ? 'medal' : 'run';
  return '<article class="rec-card glass" id="' + id + '" data-reveal style="--fill:' + Math.round(r.km / (p.maxKm || 42.2) * 100) + '%">' +
    '<div class="rec-top"><span class="chip">' + WRJ.icon(icon) + U.esc(r.type) + '</span><time class="muted" datetime="' + r.date + '">' + U.fmt(U.date(r.date), { day: 'numeric', month: 'short', year: 'numeric' }) + '</time></div>' +
    '<p class="rec-km"><span class="display num" data-count="' + r.km + '" data-decimals="' + (r.km % 1 ? 1 : 0) + '">0</span><small>km covered</small></p>' +
    '<div class="rec-meter" aria-hidden="true"><i></i></div>' +
    '<dl class="rec-stats"><div><dt>Duration</dt><dd class="num" data-split="chars">' + r.duration + '</dd></div><div><dt>Pace</dt><dd class="num" data-split="chars">' + U.pace(r.km, r.duration) + ' /km</dd></div></dl>' +
    '<div class="rec-foot">' + WRJ.c.Avatar({ athlete: a, size: 'sm' }) + '<div><b>' + U.esc(a.name) + '</b><span class="muted">' + WRJ.icon('pin') + U.esc(r.location) + '</span></div></div></article>';
};
