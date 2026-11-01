/* Photo helpers.  WRJ.util.photosBy(tag, n) returns photos for a tag (data/photos.js), falling back to the gallery.
   PhotoMosaic({tag, n, ctx}) : a collage of photos (first one large). Click to enlarge. */
(function (W) {
  var U = W.util;
  U.photosBy = function (tag, n) {
    var all = (W.data.photos || []).filter(function (p) { return p && p.show !== false; });
    var out = all.filter(function (p) { return p.tag === tag; });
    if (!out.length) out = (W.data.gallery || []).map(function (g) { return { id: g.id, src: g.src, alt: g.alt, caption: g.caption, tag: tag }; });
    var list = []; for (var i = 0; i < (n || out.length) && out.length; i++) list.push(out[i % out.length]);
    return list;
  };
  U.photo = function (tag, i) { return U.photosBy(tag, (i || 0) + 1)[i || 0] || null; };
  W.c.PhotoMosaic = function (p) {
    var list = U.photosBy(p.tag, p.n || 5); if (!list.length) return '';
    return '<div class="mosaic mosaic-' + list.length + '">' + list.map(function (ph, i) {
      return '<figure class="mosaic-tile" id="' + U.uid(p.ctx || 'mosaic', ph.id, i + 1) + '" data-reveal><img src="' + U.esc(ph.src) + '" alt="' + U.esc(ph.alt || '') + '" loading="lazy"><figcaption>' + U.esc(ph.caption || '') + '</figcaption></figure>';
    }).join('') + '</div>';
  };
})(window.WRJ);
