/* Belonging() : the warm "come as you are" block right after the hero. Words: data/content.js -> belonging.
   Pictures: data/photos.js (tag 'people'); if a film exists in data/media.js with a source, it leads. */
WRJ.c.Belonging = function () {
  var W = WRJ, U = W.util, B = W.data.content.belonging; if (!B) return '';
  var faces = U.photosBy('people', 3), film = (W.data.media || []).find(function (m) { return m.show !== false && (m.youtubeId || (m.src && m.type !== 'image')); });
  var lead = film ? W.c.MediaCard({ item: film, ctx: 'belong', feature: true }) : '<figure class="belong-lead" data-reveal><img src="' + U.esc(faces[0].src) + '" alt="' + U.esc(faces[0].alt || '') + '" loading="lazy"><figcaption>' + U.esc(faces[0].caption || '') + '</figcaption></figure>';
  return '<section class="section" id="belonging"><div class="container belong">' +
    '<div class="belong-copy"><span class="chip"><i class="dot"></i>' + U.esc(B.label) + '</span><h2 class="display h-lg" data-split="chars">' + B.title + '</h2><p class="lead" data-split="words">' + U.esc(B.text) + '</p>' +
    '<ul class="promises" data-stagger>' + U.list(B.promises, function (p, i) { return '<li id="' + U.uid('promise', i + 1) + '"><span class="act-ic">' + W.icon(p.icon) + '</span><span><b>' + U.esc(p.title) + '</b><small>' + U.esc(p.text) + '</small></span></li>'; }) + '</ul>' +
    W.c.Button({ label: B.cta || 'Say hello', href: '#join', icon: 'heart' }) + '</div>' +
    '<div class="belong-media">' + lead + '<div class="belong-faces">' + U.list(faces.slice(film ? 0 : 1), function (f, i) { return '<figure class="belong-face" id="' + U.uid('belong-face', f.id, i) + '" data-reveal><img src="' + U.esc(f.src) + '" alt="' + U.esc(f.alt || '') + '" loading="lazy"></figure>'; }) + '</div></div></div></section>';
};
