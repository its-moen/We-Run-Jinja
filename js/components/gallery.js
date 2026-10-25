/* Gallery({items, ctx}) : photo wall in columns. Click a photo to enlarge. */
(function (W) {
  var U = W.util;
  W.c.Gallery = function (p) {
    return '<div class="gallery">' + p.items.map(function (g) {
      return '<figure class="shot" id="' + U.uid(p.ctx || 'gallery', g.id) + '" data-reveal data-lightbox="' + g.id + '" tabindex="0" role="button" aria-label="Enlarge: ' + U.esc(g.caption) + '" style="aspect-ratio:' + g.ratio + '">' +
        '<img src="' + g.src + '" alt="' + U.esc(g.alt) + '" loading="lazy"><figcaption>' + U.esc(g.caption) + '</figcaption></figure>';
    }).join('') + '</div>';
  };
  W.ui.inits.push(function () {
    if (document._lb) return; document._lb = true;
    function open(el) { var g = W.data.gallery.find(function (x) { return x.id === el.dataset.lightbox; }); if (g) W.ui.openModal('<figure class="lightbox"><img src="' + g.src + '" alt="' + U.esc(g.alt) + '"><figcaption class="display h-sm">' + U.esc(g.caption) + '</figcaption></figure>', g.caption); }
    document.addEventListener('click', function (e) { var el = e.target.closest('[data-lightbox]'); if (el) open(el); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Enter' && e.target.matches('[data-lightbox]')) open(e.target); });
  });
})(window.WRJ);
