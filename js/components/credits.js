/* Credits() : slim line above the footer on every page. On the Contact page it becomes the full band with every contributor.
   Data: js/data/credits.js */
WRJ.c.Credits = function () {
  var W = WRJ, U = W.util, C = W.data.credits;
  var names = C.people.map(function (p) { return p.name; });
  var list = names.length > 1 ? names.slice(0, -1).join(', ') + ' and ' + names[names.length - 1] : names[0];
  return '<section class="credits-slim" id="credits"><div class="container"><div class="credits-pill glass"><span class="credits-avatars">' +
    C.people.slice(0, 4).map(function (p) { return W.c.Avatar({ athlete: { name: p.name, hue: p.hue, photo: p.photo || null }, size: 'sm' }); }).join('') + '</span>' +
    '<p>' + U.esc(C.slimText) + ' <b>' + U.esc(list) + '</b>.</p><a class="credits-link" href="contact.html#developers">See credits ' + W.icon('arrowRight') + '</a></div></div></section>';
};
WRJ.c.CreditsFull = function () {
  var W = WRJ, U = W.util, C = W.data.credits;
  return '<section class="credits" id="credits"><span id="developers"></span><div class="container"><div class="credits-card" data-reveal="fade">' +
    '<div class="credits-head"><span class="chip"><i class="dot"></i>' + U.esc(C.chip) + '</span><h2 class="display h-lg" data-split="chars">' + U.esc(C.title) + '</h2><p class="lead" data-split="words">' + U.esc(C.text) + '</p></div>' +
    '<ul class="credits-grid">' + U.list(C.people, function (p) {
      return '<li class="credit" id="' + U.uid('credit', p.id) + '" data-reveal>' + W.c.Avatar({ athlete: { name: p.name, hue: p.hue, photo: p.photo || null }, size: 'md' }) +
        '<div class="credit-text"><b>' + U.esc(p.name) + '</b><span>' + U.esc(p.role) + '</span></div><div class="credit-links">' +
        U.list(p.links, function (l) { return '<a class="icon-btn" href="' + l.href + '" aria-label="' + U.esc(p.name + ' ' + l.label) + '">' + W.icon(l.icon) + '</a>'; }) + '</div></li>';
    }) + '</ul></div></div></section>';
};
