/* RouteCard({route, ctx}) : drawn map (smooth path, start and finish, km pills). The line draws itself on entry. */
(function (W) {
  var U = W.util;
  function smooth(pts) {
    var d = 'M' + pts[0][0] + ' ' + pts[0][1];
    for (var i = 0; i < pts.length - 1; i++) {
      var p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2;
      d += ' C' + (p1[0] + (p2[0] - p0[0]) / 6).toFixed(1) + ' ' + (p1[1] + (p2[1] - p0[1]) / 6).toFixed(1) + ',' + (p2[0] - (p3[0] - p1[0]) / 6).toFixed(1) + ' ' + (p2[1] - (p3[1] - p1[1]) / 6).toFixed(1) + ',' + p2[0] + ' ' + p2[1];
    }
    return d;
  }
  W.c.RouteMap = function (route) {
    var rnd = U.seeded(route.id), streets = '', i, pts = route.points;
    for (i = 0; i < 9; i++) { var x = rnd() * 100, y = rnd() * 60; streets += '<path d="M' + x.toFixed(0) + ' ' + y.toFixed(0) + ' L' + (x + (rnd() - .5) * 90).toFixed(0) + ' ' + (y + (rnd() - .5) * 60).toFixed(0) + '"/>'; }
    var s = pts[0], e = pts[pts.length - 1];
    return '<div class="map"><svg viewBox="0 0 100 60" preserveAspectRatio="none" aria-hidden="true"><g class="map-streets">' + streets + '</g>' +
      '<path class="route-line" pathLength="1" d="' + smooth(pts) + '"/><circle class="route-dot" cx="' + s[0] + '" cy="' + s[1] + '" r="1.8"/><rect class="route-end" x="' + (e[0] - 1.8) + '" y="' + (e[1] - 1.8) + '" width="3.6" height="3.6" rx=".8"/></svg>' +
      (route.marks || []).map(function (m) { var pt = pts[m.at]; return '<span class="map-pill" style="left:' + pt[0] + '%;top:' + (pt[1] / 60 * 100) + '%">' + U.esc(m.label) + '</span>'; }).join('') + '</div>';
  };
  W.c.RouteCard = function (p) {
    var r = p.route;
    return '<article class="route-card tone-' + r.tone + '" id="' + U.uid(p.ctx || 'route', r.id) + '" data-reveal="zoom" data-open-route="' + r.id + '" tabindex="0" role="button" aria-label="Open map for ' + U.esc(r.name) + '">' +
      W.c.RouteMap(r) +
      '<div class="route-body"><h3 class="display h-sm">' + U.esc(r.name) + '</h3>' +
      '<ul class="route-facts"><li><b class="num">' + r.km + '</b> km</li><li><b class="num">' + r.elevation + '</b> m climb</li><li>' + U.esc(r.level) + '</li></ul>' +
      '<p class="route-when">' + W.icon('calendar') + U.esc(r.when) + '<span>' + W.icon('pin') + U.esc(r.start) + '</span></p><span class="route-cta">View on map ' + W.icon('arrowUpRight') + '</span></div></article>';
  };
})(window.WRJ);
