/* FindUs() : where to stand on Saturday: a photo of the spot, plain directions and a free Google Maps link. Data: content.findUs */
WRJ.c.FindUs = function () {
  var W = WRJ, U = W.util, F = W.data.content.findUs; if (!F) return '';
  var ph = U.photo('spot', 0), link = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(F.mapsQuery || F.place);
  return '<section class="section" id="find-us"><div class="container find glass" data-reveal>' +
    '<div class="find-photo">' + (ph ? '<img src="' + U.esc(ph.src) + '" alt="' + U.esc(ph.alt || F.place) + '" loading="lazy"><span class="chip">' + U.esc(ph.caption || '') + '</span>' : '') + '</div>' +
    '<div class="find-copy"><span class="chip"><i class="dot"></i>' + U.esc(F.label) + '</span><h2 class="display h-md">' + U.esc(F.title) + '</h2><p class="muted">' + U.esc(F.text) + '</p>' +
    '<p class="find-place">' + W.icon('pin') + '<b>' + U.esc(F.place) + '</b></p>' + W.c.Button({ label: 'Open in Google Maps', href: link, icon: 'pin', attrs: 'target="_blank" rel="noopener"', size: 'sm' }) + '</div></div></section>';
};
