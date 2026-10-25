/* UltimateGrid({ctx}) : legends of the club. Any athlete with a "legend" line in data/athletes.js appears. */
WRJ.c.UltimateGrid = function (p) {
  var W = WRJ, U = W.util, tones = ['orange', 'dark', 'light', 'outline'];
  var legends = W.data.athletes.filter(function (a) { return a.legend; });
  return '<div class="ultimate" data-stagger>' + legends.map(function (a, i) {
    return '<article class="ult-tile tone-' + tones[i % 4] + ' ult-' + (i + 1) + '" id="' + U.uid(p.ctx || 'ultimate', a.id) + '" data-open-athlete="' + a.id + '" tabindex="0" role="button">' +
      '<div class="ult-photo" style="--h:' + a.hue + '">' + (a.photo ? '<img src="' + U.esc(a.photo) + '" alt="" loading="lazy">' : '<b>' + U.initials(a.name) + '</b>') + '</div>' +
      '<div class="ult-text"><h3 class="display h-md">' + U.esc(a.name) + '</h3><p class="ult-title">' + U.esc(a.legend) + '</p>' +
      '<ul class="ult-meta"><li><b class="num">' + a.totalKm.toLocaleString('en-US') + '</b> km</li><li><b class="num">' + a.podiums + '</b> podiums</li><li>' + U.flag(a.country.code) + ' ' + U.esc(a.country.name) + '</li></ul></div></article>';
  }).join('') + '</div>';
};
