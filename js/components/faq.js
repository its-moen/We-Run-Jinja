/* Faq({items, ctx}) : accessible accordion using native details/summary with animated panel */
(function (W) {
  W.c.Faq = function (p) {
    return '<div class="faq" data-stagger>' + p.items.map(function (f, i) {
      return '<details class="faq-item glass" id="' + W.util.uid(p.ctx || 'faq', 'q', i + 1) + '"><summary><span>' + W.util.esc(f.q) + '</span><span class="faq-plus">' + W.icon('plus') + '</span></summary><div class="faq-a"><p>' + W.util.esc(f.a) + '</p></div></details>';
    }).join('') + '</div>';
  };
  W.ui.inits.push(function (scope) {
    scope.querySelectorAll('.faq-item').forEach(function (d) {
      if (d._f) return; d._f = true;
      d.querySelector('summary').addEventListener('click', function () { d.closest('.faq').querySelectorAll('.faq-item[open]').forEach(function (o) { if (o !== d) o.removeAttribute('open'); }); });
    });
  });
})(window.WRJ);
