/* Credits() : eye catching band above the footer. Everything comes from data/credits.js */
WRJ.c.Credits = function () {
  var W = WRJ, U = W.util, C = W.data.credits;
  return '<section class="credits" id="credits"><span id="developers"></span><div class="container"><div class="credits-card" data-reveal="fade">' +
    '<div class="credits-head"><span class="chip"><i class="dot"></i>' + U.esc(C.chip) + '</span><h2 class="display h-lg" data-split="chars">' + U.esc(C.title) + '</h2><p class="lead" data-split="words">' + U.esc(C.text) + '</p></div>' +
    '<ul class="credits-grid">' + U.list(C.people, function (p) {
      return '<li class="credit" id="' + U.uid('credit', p.id) + '" data-reveal>' + W.c.Avatar({ athlete: { name: p.name, hue: p.hue, photo: p.photo || null }, size: 'md' }) +
        '<div class="credit-text"><b>' + U.esc(p.name) + '</b><span>' + U.esc(p.role) + '</span></div><div class="credit-links">' +
        U.list(p.links, function (l) { return '<a class="icon-btn" href="' + l.href + '" aria-label="' + U.esc(p.name + ' ' + l.label) + '">' + W.icon(l.icon) + '</a>'; }) + '</div></li>';
    }) + '</ul></div></div></section>';
};
