/* WhatsAppFloat() : floating chat button on every page. Faint until hover; on phones the first tap reveals it, the second opens chat.
   Number, message and opacity live in data/settings.js */
(function (W) {
  W.c.WhatsAppFloat = function () {
    var w = W.data.settings.whatsapp, href = w.number ? 'https://wa.me/' + w.number + '?text=' + encodeURIComponent(w.message) : '#';
    return '<a class="wa-float" id="whatsapp-float" href="' + href + '" target="_blank" rel="noopener" aria-label="' + W.util.esc(w.label) + '" style="--wa-idle:' + w.idleOpacity + '"><span class="wa-label">' + W.util.esc(w.label) + '</span><span class="wa-ic">' + W.icon('whatsapp') + '</span></a>';
  };
  W.ui.inits.push(function (scope) {
    var a = scope.querySelector && scope.querySelector('#whatsapp-float'); if (!a || a._w) return; a._w = true; var t;
    a.addEventListener('click', function (e) {
      if (matchMedia('(hover: none)').matches && !a.classList.contains('active')) { e.preventDefault(); a.classList.add('active'); clearTimeout(t); t = setTimeout(function () { a.classList.remove('active'); }, 4000); }
    });
  });
})(window.WRJ);
