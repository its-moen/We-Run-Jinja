/* Tabs.create({id, tabs:[{key,label}], render:(key)=>html, active})
   Each tab swaps the panel and replays all entry animations in it. */
(function (W) {
  var registry = {};
  W.c.Tabs = function (p) {
    registry[p.id] = p.render;
    var active = p.active || p.tabs[0].key;
    return '<div class="tabs" id="' + p.id + '" data-tabs="' + p.id + '">' +
      '<div class="tab-list glass" role="tablist" aria-label="' + W.util.esc(p.label || 'Filter') + '">' +
      p.tabs.map(function (t) {
        return '<button class="tab" role="tab" id="' + p.id + '-tab-' + t.key + '" data-tab="' + t.key + '" aria-selected="' + (t.key === active) + '" aria-controls="' + p.id + '-panel">' + W.util.esc(t.label) + '</button>';
      }).join('') + '<i class="tab-pill" aria-hidden="true"></i></div>' +
      '<div class="tab-panel" id="' + p.id + '-panel" role="tabpanel" aria-labelledby="' + p.id + '-tab-' + active + '">' + p.render(active) + '</div></div>';
  };
  function pill(list) {
    var on = list.querySelector('[aria-selected="true"]'), pl = list.querySelector('.tab-pill'); if (!on || !pl) return;
    pl.style.width = on.offsetWidth + 'px'; pl.style.transform = 'translateX(' + on.offsetLeft + 'px)';
  }
  W.ui.inits.push(function (scope) {
    scope.querySelectorAll('[data-tabs]').forEach(function (box) {
      if (box._t) return; box._t = true;
      var list = box.querySelector('.tab-list'), panel = box.querySelector('.tab-panel');
      requestAnimationFrame(function () { pill(list); }); addEventListener('resize', function () { pill(list); });
      list.addEventListener('click', function (e) {
        var b = e.target.closest('[data-tab]'); if (!b) return;
        list.querySelectorAll('[data-tab]').forEach(function (x) { x.setAttribute('aria-selected', x === b); });
        pill(list); panel.setAttribute('aria-labelledby', b.id);
        W.ui.mount(panel, registry[box.dataset.tabs](b.dataset.tab));
      });
    });
  });
})(window.WRJ);
