/* MediaCard({item, ctx, feature}) and MediaSection({ctx}) : films and photos from data/media.js.
   Videos load only when tapped (saves mobile data). Photos open large. No source = "Coming soon". */
(function (W) {
  var U = W.util;
  function kind(v) {
    if (v.type === 'image' && v.src) return 'image';
    if (v.youtubeId) return 'youtube';
    if (v.src) return v.type === 'image' || /\.(jpe?g|png|webp|gif|avif)(\?|$)/i.test(v.src) ? 'image' : 'file';
    return 'soon';
  }
  W.c.MediaCard = function (p) {
    var v = p.item, k = kind(v), thumb = v.poster || (k === 'image' ? v.src : '');
    var attr = k === 'soon' ? '' : ' data-media="' + U.esc(v.id) + '" tabindex="0" role="button" aria-label="' + (k === 'image' ? 'Open photo: ' : 'Play: ') + U.esc(v.title) + '"';
    return '<figure class="video media-' + k + (p.feature ? ' feature' : '') + (k === 'soon' ? ' soon' : '') + '" id="' + U.uid(p.ctx || 'media', v.id) + '" data-reveal>' +
      '<div class="video-frame"' + attr + '><div class="video-poster" style="' + (thumb ? 'background-image:url(\'' + U.esc(thumb) + '\')' : '') + '"></div>' +
      (k === 'soon' ? '<span class="chip video-soon">Coming soon</span>' : '<span class="video-play">' + W.icon(k === 'image' ? 'star' : 'arrowRight') + '</span>') +
      (v.duration && k !== 'image' ? '<span class="chip video-time">' + U.esc(v.duration) + '</span>' : '') + '</div>' +
      '<figcaption><b>' + U.esc(v.title) + '</b><span class="muted">' + U.esc(v.caption || '') + '</span></figcaption></figure>';
  };
  W.c.MediaSection = function (p) {
    var list = (W.data.media || []).filter(function (m) { return m && m.show !== false; }); if (!list.length) return '';
    return '<div class="video-grid">' + W.c.MediaCard({ item: list[0], ctx: p.ctx, feature: true }) + '<div class="video-side">' + U.list(list.slice(1), function (v) { return W.c.MediaCard({ item: v, ctx: p.ctx }); }) + '</div></div>';
  };
  W.ui.inits.push(function () {
    if (document._med) return; document._med = true;
    function open(el) {
      var v = W.data.media.find(function (x) { return x.id === el.dataset.media; }); if (!v) return; var k = kind(v);
      if (k === 'image') { W.ui.openModal('<figure class="lightbox"><img src="' + U.esc(v.src) + '" alt="' + U.esc(v.title) + '"><figcaption class="display h-sm">' + U.esc(v.title) + '</figcaption></figure>', v.title); return; }
      el.innerHTML = k === 'youtube'
        ? '<iframe src="https://www.youtube-nocookie.com/embed/' + encodeURIComponent(v.youtubeId) + '?autoplay=1&rel=0" title="' + U.esc(v.title) + '" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>'
        : '<video src="' + U.esc(v.src) + '" controls autoplay playsinline></video>';
      el.removeAttribute('data-media'); el.removeAttribute('role');
    }
    document.addEventListener('click', function (e) { var el = e.target.closest('[data-media]'); if (el) open(el); });
    document.addEventListener('keydown', function (e) { if ((e.key === 'Enter' || e.key === ' ') && e.target.matches('[data-media]')) { e.preventDefault(); open(e.target); } });
  });
})(window.WRJ);
