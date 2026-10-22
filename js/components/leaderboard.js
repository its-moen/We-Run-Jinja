/* Leaderboard({ctx}) : top rankings by metric. Podium for the top three, vertical carousel for the rest. */
WRJ.c.Leaderboard = function (p) {
  var W = WRJ, U = W.util, ctx = p.ctx || 'rank';
  var metrics = { totalKm: { label: 'Total km', unit: 'km' }, runs: { label: 'Runs', unit: 'runs' }, races: { label: 'Races', unit: 'races' }, streak: { label: 'Week streak', unit: 'weeks' } };
  function panel(key) {
    var list = W.data.athletes.slice().sort(function (a, b) { return b[key] - a[key]; }), max = list[0][key], m = metrics[key];
    var pod = [list[1], list[0], list[2]].map(function (a, i) {
      var rank = [2, 1, 3][i];
      return '<article class="podium-step rank-' + rank + '" id="' + U.uid(ctx, key, 'podium', a.id) + '" data-reveal data-open-athlete="' + a.id + '" tabindex="0" role="button" style="--d:' + ([160, 0, 300][i]) + 'ms">' +
        W.c.Avatar({ athlete: a, size: rank === 1 ? 'xl' : 'lg' }) + '<span class="podium-rank">#' + rank + '</span><h4 class="display h-sm">' + U.esc(a.name) + '</h4><p>' + U.flag(a.country.code) + ' ' + U.esc(a.country.name) + '</p>' +
        '<p class="podium-val"><span class="display num" data-count="' + a[key] + '">0</span><small>' + m.unit + '</small></p></article>';
    }).join('');
    var rest = list.slice(3).map(function (a, i) {
      return '<div class="rank-row" id="' + U.uid(ctx, key, 'row', a.id) + '" data-open-athlete="' + a.id + '" tabindex="0" role="button"><span class="display rank-n">' + (i + 4) + '</span>' + W.c.Avatar({ athlete: a, size: 'sm' }) +
        '<div class="rank-who"><b>' + U.esc(a.name) + '</b><span class="muted">' + U.flag(a.country.code) + ' ' + U.esc(a.country.name) + '</span><i class="rank-bar" style="--w:' + Math.round(a[key] / max * 100) + '%"></i></div>' +
        '<span class="num rank-val"><b>' + a[key].toLocaleString('en-US') + '</b> ' + m.unit + '</span></div>';
    });
    return '<div class="podium">' + pod + '</div>' + W.c.Carousel({ id: U.uid(ctx, key, 'more'), orientation: 'y', title: 'The chasing pack', label: 'Ranks 4 and below', items: rest, height: '360px' });
  }
  return W.c.Tabs({ id: ctx + '-tabs', label: 'Ranking metric', tabs: Object.keys(metrics).map(function (k) { return { key: k, label: metrics[k].label }; }), render: panel });
};
