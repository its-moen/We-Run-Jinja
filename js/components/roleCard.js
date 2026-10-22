/* RoleCard({role, ctx, index}) : chain of command row in the footer */
WRJ.c.RoleCard = function (p) {
  var r = p.role, U = WRJ.util, a = WRJ.data.athletes.find(function (x) { return x.name === r.name; }) || { name: r.name, hue: 200 };
  return '<li class="role-card" id="' + U.uid(p.ctx || 'chain', r.id) + '" style="--i:' + p.index + '">' + WRJ.c.Avatar({ athlete: a, size: 'sm' }) +
    '<div><b>' + U.esc(r.name) + '</b><span>' + U.esc(r.role) + '</span><small>' + U.esc(r.note) + '</small></div></li>';
};
