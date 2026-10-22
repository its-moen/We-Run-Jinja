/* Gallery({items, ctx, cols}) : columns drift up and down as you scroll (vertical scroll, opposite directions).
   Click a photo to enlarge. On phones the third column hides and two columns remain. */
(function (W) {
  var U = W.util;
  W.c.Gallery = function (p) {
    var cols = p.cols || 3, speeds = [70, -70, 50], buckets = [], i;
    for (i = 0; i < cols; i++) buckets.push([]);
    for (i = 0; i < cols * 4; i++) buckets[i % cols].push(p.items[(i + Math.floor(i / cols) * 2) % p.items.length]);
    return '<div class="gallery" data-vparallax>' + buckets.map(function (col, ci) {
      return '<div class="gallery-col" data-speed="' + speeds[ci % 3] + '">' + col.map(function (g, gi) {
        return '<figure class="shot" id="' + U.uid(p.ctx || 'gallery', 'col' + (ci + 1), g.id, gi + 1) + '" data-reveal data-lightbox="' + g.id + '" tabindex="0" role="button" aria-label="Enlarge: ' + U.esc(g.caption) + '" style="aspect-ratio:' + g.ratio + '">' +
          '<img src="' + g.src + '" alt="' + U.esc(g.alt) + '" loading="lazy"><figcaption>' + U.esc(g.caption) + '</figcaption></figure>';
      }).join('') + '</div>';
    }).join('') + '</div>';
  };
  W.ui.inits.push(function () {
    if (document._lb) return; document._lb = true;
    function open(el) { var g = W.data.gallery.find(function (x) { return x.id === el.dataset.lightbox; }); if (g) W.ui.openModal('<figure class="lightbox"><img src="' + g.src + '" alt="' + U.esc(g.alt) + '"><figcaption class="display h-sm">' + U.esc(g.caption) + '</figcaption></figure>', g.caption); }
    document.addEventListener('click', function (e) { var el = e.target.closest('[data-lightbox]'); if (el) open(el); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Enter' && e.target.matches('[data-lightbox]')) open(e.target); });
  });
})(window.WRJ);
