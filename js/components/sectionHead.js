/* SectionHead({label, title, text, id, tag}) : title letters rise in, text words rise in */
WRJ.c.SectionHead = function (p) {
  var U = WRJ.util;
  return '<header class="section-head"' + (p.id ? ' id="' + p.id + '"' : '') + '>' +
    '<div class="section-head-main">' +
      (p.label ? '<span class="chip" data-reveal="fade"><i class="dot"></i>' + U.esc(p.label) + '</span>' : '') +
      '<h2 class="display h-lg" data-split="chars">' + p.title + '</h2></div>' +
    (p.text ? '<p class="lead" data-float="8" data-split="words">' + U.esc(p.text) + '</p>' : '') + (p.extra || '') + '</header>';
};
