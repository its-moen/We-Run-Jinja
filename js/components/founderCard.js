/* FounderCard({founder, ctx}) : data/founders.js. Add photo:'assets/founders/name.jpg' for a real picture. */
WRJ.c.FounderCard = function (p) {
  var f = p.founder, U = WRJ.util;
  return '<article class="founder solid" id="' + U.uid(p.ctx || 'founder', f.id) + '" data-reveal>' +
    '<div class="founder-photo" style="--h:' + f.hue + '">' + (f.photo ? '<img src="' + U.esc(f.photo) + '" alt="' + U.esc(f.name) + '" loading="lazy">' : '<b aria-hidden="true">' + U.initials(f.name) + '</b>') + '</div>' +
    '<div class="founder-body"><span class="chip">' + U.esc(f.role) + ', since ' + f.since + '</span><h3 class="display h-md">' + U.esc(f.name) + '</h3>' +
    '<blockquote>' + U.esc(f.quote) + '</blockquote><p class="muted">' + U.esc(f.bio) + '</p>' +
    WRJ.c.SocialRow({ links: f.links, owner: f.name, ctx: p.ctx || 'founder' }) + '</div></article>';
};
