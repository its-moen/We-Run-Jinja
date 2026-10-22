/* motion.js | scroll-triggered before/after transitions.
   Everything resets when it leaves the viewport and plays again on re-entry.
   Markup hooks:
     data-reveal="up|left|right|zoom|fade|clip"   whole element
     data-split="chars|words"                      letters or words rise in one by one
     data-count="1240" [data-decimals] [data-suffix]  numbers count up from 0
     data-stagger                                  children reveal one after another
     data-delay="200"                              extra delay in ms */
(function (W) {
  var M = W.motion, root = document.documentElement, io;
  var reduced = function () { return root.dataset.motion === 'reduce' || (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches); };

  function wrap(cls, inner, i) { return '<span class="' + cls + '"><span style="--i:' + Math.min(i, 70) + '">' + inner + '</span></span>'; }

  function split(el) {
    var mode = el.dataset.split, i = 0, label = el.textContent.replace(/\s+/g, ' ').trim();
    (function walk(node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (n) {
        if (n.nodeType === 3) {
          var frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach(function (part) {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(' ')); return; }
            var w = document.createElement('span'); w.className = 'w';
            w.innerHTML = mode === 'chars'
              ? Array.from(part).map(function (c) { return wrap('chr', c, i++); }).join('')
              : wrap('wd', part, i++);
            frag.appendChild(w);
          });
          n.replaceWith(frag);
        } else if (n.nodeType === 1 && n.tagName !== 'BR') walk(n);
      });
    })(el);
    var vis = document.createElement('span'); vis.className = 'split-vis'; vis.setAttribute('aria-hidden', 'true');
    while (el.firstChild) vis.appendChild(el.firstChild);
    var sr = document.createElement('span'); sr.className = 'sr'; sr.textContent = label;
    el.appendChild(sr); el.appendChild(vis);
  }

  function fmtNum(v, dec) { return v.toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec }); }

  function counter(el) {
    var target = parseFloat(el.dataset.count), dec = +(el.dataset.decimals || 0), raf;
    var zero = fmtNum(0, dec);
    el.textContent = reduced() ? fmtNum(target, dec) : zero;
    el._enter = function () {
      cancelAnimationFrame(raf);
      if (reduced()) { el.textContent = fmtNum(target, dec); return; }
      var t0 = performance.now(), dur = 1600 + Math.min(target, 20000) / 20000 * 700, delay = +(el.dataset.delay || 0);
      (function tick(now) {
        var p = Math.min(Math.max((now - t0 - delay) / dur, 0), 1), e = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
        el.textContent = fmtNum(target * e, dec);
        if (p < 1) raf = requestAnimationFrame(tick);
      })(t0);
    };
    el._leave = function () { cancelAnimationFrame(raf); el.textContent = reduced() ? fmtNum(target, dec) : zero; };
  }

  function observe() {
    if (io) return io;
    io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        var el = e.target;
        if (!e.isIntersecting) { if (el.classList.contains('in')) { el.classList.remove('in'); if (el._leave) el._leave(); } return; }
        var enough = e.intersectionRatio >= 0.14 || e.intersectionRect.height > innerHeight * 0.28;
        if (enough && !el.classList.contains('in')) {
          if (el.dataset.delay) el.style.setProperty('--d', el.dataset.delay + 'ms');
          el.classList.add('in'); if (el._enter) el._enter();
        }
      });
    }, { threshold: [0, 0.14, 0.3], rootMargin: '0px 0px -5% 0px' });
    return io;
  }

  /* call after any render: M.scan(container) */
  M.scan = function (scope) {
    scope = scope || document; var o = observe();
    scope.querySelectorAll('[data-stagger]').forEach(function (p) {
      Array.prototype.forEach.call(p.children, function (c, i) { if (!c.hasAttribute('data-reveal')) c.setAttribute('data-reveal', 'up'); c.style.setProperty('--d', (i * 80) + 'ms'); });
    });
    scope.querySelectorAll('[data-split],[data-reveal],[data-count]').forEach(function (el) {
      if (el._m) return; el._m = true;
      if (el.dataset.split) split(el);
      if (el.dataset.count) counter(el);
      o.observe(el);
    });
  };
  M.reduced = reduced;
})(window.WRJ);
