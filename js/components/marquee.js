/* Marquee({items}) : endless ticker, pauses on hover */
WRJ.c.Marquee = function (p) {
  var row = p.items.map(function (t) { return '<span>' + WRJ.util.esc(t) + '</span>'; }).join('');
  return '<div class="marquee" aria-label="' + WRJ.util.esc(p.items.join(', ')) + '"><div class="marquee-track" aria-hidden="true">' + row + row + row + row + '</div></div>';
};
