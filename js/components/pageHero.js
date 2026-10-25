/* PageHero({chip, title, text, image, extra}) : compact hero for inner pages */
WRJ.c.PageHero = function (p) {
  var U = WRJ.util;
  return '<section class="page-hero" data-hero-ratio><div class="page-hero-bg" style="background-image:url(\'' + (p.image || 'assets/jinja-bridge-hero-clean.jpg') + '\')"></div>' +
    '<div class="container page-hero-in"><span class="chip" data-reveal="fade"><i class="dot"></i>' + U.esc(p.chip) + '</span>' +
    '<h1 class="display h-xl" data-split="chars">' + p.title + '</h1><p class="lead" data-split="words">' + U.esc(p.text) + '</p>' + (p.extra || '') + '</div></section>';
};
