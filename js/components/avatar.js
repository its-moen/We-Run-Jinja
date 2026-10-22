/* Avatar({athlete, size:'sm'|'md'|'lg'|'xl'}) : uses athlete.photo when set, otherwise initials on a gradient */
WRJ.c.Avatar = function (p) {
  var a = p.athlete, U = WRJ.util, size = p.size || 'md';
  var inner = a.photo ? '<img src="' + U.esc(a.photo) + '" alt="' + U.esc(a.name) + '" loading="lazy">' : '<b>' + U.initials(a.name) + '</b>';
  return '<span class="avatar avatar-' + size + '" style="--h:' + a.hue + '">' + inner + '</span>';
};
