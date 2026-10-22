/* DeveloperCard({dev, ctx}) : credit card with blank social links (edit in data/developers.js) */
WRJ.c.DeveloperCard = function (p) {
  var d = p.dev, U = WRJ.util;
  return '<article class="dev-card glass" id="' + U.uid(p.ctx || 'dev', d.id) + '" data-reveal><div class="dev-top">' + WRJ.c.Avatar({ athlete: { name: d.name, hue: d.hue, photo: d.photo || null }, size: 'lg' }) +
    '<div><h3 class="display h-sm">' + U.esc(d.name) + '</h3><span class="chip">' + U.esc(d.role) + '</span></div></div><p class="muted">' + U.esc(d.text) + '</p>' +
    '<ul class="social-row">' + U.list(d.links, function (l) { return '<li><a class="icon-btn" href="' + l.href + '" aria-label="' + U.esc(d.name + ' ' + l.label) + '">' + WRJ.icon(l.icon) + '</a></li>'; }) + '</ul></article>';
};
