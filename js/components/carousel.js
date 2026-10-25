/* Carousel({id, items:[html], orientation:'x'|'y', title, itemClass, height})
   Native scroll-snap with buttons, mouse drag, progress bar and disabled states.
   Use orientation 'y' for a vertical carousel. Items are plain HTML strings. */
(function (W) {
  W.c.Carousel = function (p) {
    var y = p.orientation === 'y';
    return '<div class="carousel carousel-' + (y ? 'y' : 'x') + '" id="' + p.id + '" data-carousel data-reveal="fade"' + (p.height ? ' style="--car-h:' + p.height + '"' : '') + '>' +
      '<div class="carousel-bar">' + (p.title ? '<h3 class="display h-sm" data-split="chars">' + p.title + '</h3>' : '<span></span>') +
      '<div class="row carousel-btns"><button class="icon-btn" data-car="prev" aria-label="Previous">' + W.icon(y ? 'arrowUp' : 'arrowLeft') + '</button>' +
      '<button class="icon-btn" data-car="next" aria-label="Next">' + W.icon(y ? 'arrowDown' : 'arrowRight') + '</button></div></div>' +
      '<div class="carousel-track ' + (p.itemClass || '') + '" tabindex="0" aria-label="' + W.util.esc(p.label || p.title || 'Carousel') + '">' +
      p.items.map(function (h) { return '<div class="carousel-item">' + h.replace(/ data-reveal(="[^"]*")?/, '') + '</div>'; }).join('') + '</div>' +
      '<div class="car-progress"><i></i></div></div>';
  };
  W.ui.inits.push(function (scope) {
    scope.querySelectorAll('[data-carousel]').forEach(function (car) {
      if (car._c) return; car._c = true;
      var y = car.classList.contains('carousel-y'), tr = car.querySelector('.carousel-track');
      var prev = car.querySelector('[data-car=prev]'), next = car.querySelector('[data-car=next]'), bar = car.querySelector('.car-progress i');
      var size = function () { return y ? tr.clientHeight : tr.clientWidth; };
      var pos = function () { return y ? tr.scrollTop : tr.scrollLeft; };
      var max = function () { return (y ? tr.scrollHeight : tr.scrollWidth) - size(); };
      function sync() { var m = max(); prev.disabled = pos() <= 4; next.disabled = pos() >= m - 4; car.classList.toggle('at-start', pos() <= 4); car.classList.toggle('at-end', pos() >= m - 4 || m <= 0); bar.style.transform = (y ? 'scaleY(' : 'scaleX(') + (m > 0 ? Math.max(pos() / m, .04) : 1) + ')'; }
      function go(dir) { var o = {behavior: 'smooth'}; o[y ? 'top' : 'left'] = dir * size() * .85; tr.scrollBy(o); }
      prev.addEventListener('click', function () { go(-1); }); next.addEventListener('click', function () { go(1); });
      tr.addEventListener('scroll', sync, { passive: true }); addEventListener('resize', sync); setTimeout(sync, 60);
      tr.addEventListener('keydown', function (e) { var k = e.key; if (k === (y ? 'ArrowDown' : 'ArrowRight')) { e.preventDefault(); go(1); } if (k === (y ? 'ArrowUp' : 'ArrowLeft')) { e.preventDefault(); go(-1); } });
      /* mouse drag */
      var down = false, sx, ss, moved = false;
      tr.addEventListener('pointerdown', function (e) { if (e.pointerType !== 'mouse' || e.target.closest('button,a,input')) return; down = true; moved = false; sx = y ? e.clientY : e.clientX; ss = pos(); });
      addEventListener('pointermove', function (e) { if (!down) return; var d = (y ? e.clientY : e.clientX) - sx; if (Math.abs(d) > 4) { moved = true; tr.classList.add('dragging'); } if (moved) tr[y ? 'scrollTop' : 'scrollLeft'] = ss - d; });
      addEventListener('pointerup', function () { if (!down) return; down = false; tr.classList.remove('dragging'); });
      tr.addEventListener('click', function (e) { if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; } }, true);
    });
  });
})(window.WRJ);
