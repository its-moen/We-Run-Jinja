/* OneRoad() : locals come in from the left, foreigners from the right, then the two groups meet and morph into one crew.
   Text and numbers: data/content.js -> oneRoad.  Faces come from data/athletes.js (country code decides the side). */
(function (W) {
  var U = W.util;
  function side(list, cls, rnd) {
    return list.map(function (a) {
      return '<span class="rn ' + cls + '" title="' + U.esc(a.name) + '" style="--d:' + Math.round(rnd() * 900) + 'ms;--y:' + Math.round((rnd() - .5) * 22) + 'px">' + W.c.Avatar({ athlete: a, size: 'md' }) + '<i class="rn-flag" aria-hidden="true">' + U.flag(a.country.code) + '</i></span>';
    }).join('');
  }
  W.c.OneRoad = function () {
    var C = W.data.content.oneRoad; if (!C) return '';
    var rnd = U.seeded('one-road'), A = W.data.athletes;
    var locals = A.filter(function (a) { return a.country.code === C.homeCode; }).slice(0, 6), foreign = A.filter(function (a) { return a.country.code !== C.homeCode; }).slice(0, 6);
    var total = C.stats.locals + C.stats.foreigners, pl = Math.round(C.stats.locals / total * 100);
    return '<section class="section" id="one-road"><div class="container">' + W.c.SectionHead({ label: C.label, title: C.title, text: C.text }) +
      '<div class="road-scene glass" id="one-road-scene" data-reveal="fade" role="img" aria-label="Locals and foreigners running toward each other and becoming one crew">' +
        '<div class="road-lane"><span class="road-line" aria-hidden="true"></span>' +
          '<div class="road-side left">' + side(locals, 'rn-l', rnd) + '</div><div class="road-side right">' + side(foreign, 'rn-r', rnd) + '</div></div>' +
        '<div class="road-banner" aria-hidden="true"><span class="b-split"><b>' + U.esc(C.localsLabel) + '</b><i></i><b>' + U.esc(C.foreignersLabel) + '</b></span><span class="b-merge display">' + U.esc(C.mergedLabel) + '</span></div>' +
        '<div class="road-bar" aria-hidden="true"><i class="seg-l" style="--w:' + pl + '%"></i><i class="seg-r"></i></div></div>' +
      '<div class="grid cols-3 road-stats" data-stagger>' + W.c.StatTile({ value: C.stats.locals, label: C.localsLabel, icon: 'home', tone: 'local' }) + W.c.StatTile({ value: C.stats.foreigners, label: C.foreignersLabel, icon: 'globe', tone: 'foreign' }) + W.c.StatTile({ value: C.stats.countries, label: 'Countries on our roads', icon: 'users' }) + '</div></div></section>';
  };
  W.ui.inits.push(function (scope) {
    var el = scope.querySelector && scope.querySelector('#one-road-scene'); if (!el || el._r) return; el._r = true; var t;
    el._enter = function () { clearTimeout(t); t = setTimeout(function () { el.classList.add('merged'); }, 2000); };
    el._leave = function () { clearTimeout(t); el.classList.remove('merged'); };
  });
})(window.WRJ);
