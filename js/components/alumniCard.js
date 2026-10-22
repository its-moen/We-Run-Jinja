/* AlumniCard({person, ctx}) */
WRJ.c.AlumniCard = function (p) {
  var a = p.person, U = WRJ.util;
  return '<article class="alumni-card solid" id="' + U.uid(p.ctx || 'alumni', a.id) + '" data-reveal>' + WRJ.c.Avatar({ athlete: a, size: 'lg' }) +
    '<h3 class="display h-sm">' + U.esc(a.name) + '</h3><p class="chip">' + U.flag(a.country.code) + ' ' + U.esc(a.country.name) + '</p>' +
    '<p class="muted">' + U.esc(a.years) + '</p><blockquote>' + U.esc(a.quote) + '</blockquote><p class="alumni-now">' + WRJ.icon('pin') + U.esc(a.now) + '</p></article>';
};
