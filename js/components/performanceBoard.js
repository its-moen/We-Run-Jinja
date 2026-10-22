/* PerformanceBoard({ctx}) : all time best times per distance, tabbed. Data: WRJ.data.performances */
WRJ.c.PerformanceBoard = function (p) {
  var U = WRJ.util, W = WRJ, ctx = p.ctx || 'perf', P = W.data.performances;
  function row(e, rank) {
    var a = U.athlete(e.athleteId);
    return '<li class="perf-row glass" id="' + U.uid(ctx, rank, e.athleteId, e.time) + '" data-reveal style="--d:' + (rank * 90) + 'ms"><span class="perf-rank display">' + rank + '</span>' + W.c.Avatar({ athlete: a, size: 'sm' }) +
      '<div class="perf-who"><b>' + U.esc(a.name) + '</b><span class="muted">' + U.flag(a.country.code) + ' ' + U.esc(e.event) + ', ' + U.fmt(U.date(e.date), { month: 'short', year: 'numeric' }) + '</span></div><span class="perf-time display num" data-split="chars">' + e.time + '</span></li>';
  }
  function panel(key) {
    var d = P[key], top = d.list[0], a = U.athlete(top.athleteId);
    return '<div class="perf-grid"><div class="perf-hero" data-reveal="zoom"><p class="perf-label">All time club record</p>' +
      '<h3 class="display h-lg" data-split="chars">' + U.esc(d.label) + '</h3><p class="perf-big display num" data-split="chars">' + top.time + '</p>' +
      '<div class="perf-holder">' + W.c.Avatar({ athlete: a, size: 'md' }) + '<div><b>' + U.esc(a.name) + '</b><span>' + U.flag(a.country.code) + ' ' + U.esc(a.country.name) + '</span></div></div></div>' +
      '<ol class="perf-list">' + d.list.map(function (e, i) { return row(e, i + 1); }).join('') + '</ol></div>';
  }
  return W.c.Tabs({ id: ctx + '-tabs', label: 'Distance', tabs: Object.keys(P).map(function (k) { return { key: k, label: P[k].label }; }), render: panel });
};
