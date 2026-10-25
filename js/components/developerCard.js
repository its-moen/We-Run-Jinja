/* DeveloperCard({dev, ctx}) : same card as the founders. Photo area on top (set photo:'assets/developers/name.jpg'),
   then role, name, a short line, bio and social links. Data: data/developers.js */
WRJ.c.DeveloperCard = function (p) {
  var d = p.dev, U = WRJ.util;
  return '<article class="founder dev solid" id="' + U.uid(p.ctx || 'dev', d.id) + '" data-reveal>' +
    '<div class="founder-photo" style="--h:' + d.hue + '">' + (d.photo ? '<img src="' + U.esc(d.photo) + '" alt="' + U.esc(d.name) + '" loading="lazy">' : '<b aria-hidden="true">' + U.initials(d.name) + '</b>') + '</div>' +
    '<div class="founder-body"><span class="chip">' + U.esc(d.role) + '</span><h3 class="display h-md">' + U.esc(d.name) + '</h3>' +
    (d.quote ? '<blockquote>' + U.esc(d.quote) + '</blockquote>' : '') + '<p class="muted">' + U.esc(d.text) + '</p>' +
    WRJ.c.SocialRow({ links: d.links, owner: d.name, ctx: p.ctx || 'dev' }) + '</div></article>';
};
