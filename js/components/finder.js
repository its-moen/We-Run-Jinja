/* Finder() : "Find your group" quiz. Data: data/finder.js. Ends with a suggested group and a WhatsApp message that already
   names it. If no WhatsApp number is set the button jumps to the join form instead. */
(function (W) {
  var U = W.util;
  function html(F, st) {
    if (st.done) {
      var g = W.data.groups.find(function (x) { return x.id === st.best; }) || W.data.groups[0];
      var msg = 'Hello We Run Jinja, I would like to join the ' + g.title + ' group (' + g.range + ').', wa = U.waHref(msg);
      return '<div class="finder-result"><span class="chip"><i class="dot"></i>We suggest</span><h3 class="display h-md">' + U.esc(g.title) + '</h3><p class="finder-range display">' + U.esc(g.range) + '</p><p class="muted">' + U.esc(g.text) + '</p>' +
        '<div class="row">' + W.c.Button({ label: 'Tell us on WhatsApp', href: wa === '#' ? '#join' : wa, variant: 'whatsapp', icon: 'whatsapp', attrs: wa === '#' ? '' : 'target="_blank" rel="noopener"' }) +
        '<button type="button" class="btn btn-ghost" data-finder-restart><span>Start again</span><span class="btn-ic">' + W.icon('arrowLeft') + '</span></button></div></div>';
    }
    var q = F.questions[st.i];
    return '<div class="finder-q"><p class="finder-step">Question ' + (st.i + 1) + ' of ' + F.questions.length + '</p><div class="finder-dots" aria-hidden="true">' + F.questions.map(function (_, k) { return '<i class="' + (k <= st.i ? 'on' : '') + '"></i>'; }).join('') + '</div>' +
      '<h3 class="display h-sm" id="finder-question">' + U.esc(q.q) + '</h3><div class="finder-options" role="group" aria-labelledby="finder-question">' +
      q.options.map(function (o, k) { return '<button type="button" class="finder-opt" data-finder-pick="' + k + '">' + U.esc(o.label) + '</button>'; }).join('') + '</div></div>';
  }
  W.c.Finder = function () {
    var F = W.data.finder; if (!F || !F.questions || !F.questions.length || !W.data.groups.length) return '';
    return '<section class="section-tight" id="find-your-group"><div class="container"><div class="finder glass" id="finder-card" data-reveal>' +
      '<div class="finder-head"><span class="chip"><i class="dot"></i>' + U.esc(F.label) + '</span><h2 class="display h-md">' + U.esc(F.title) + '</h2><p class="muted">' + U.esc(F.text) + '</p></div>' +
      '<div class="finder-body" aria-live="polite">' + html(F, { i: 0 }) + '</div></div></div></section>';
  };
  W.ui.inits.push(function (scope) {
    var card = scope.querySelector && scope.querySelector('#finder-card'); if (!card || card._f) return; card._f = true;
    var F = W.data.finder, st = { i: 0, score: {} }, body = card.querySelector('.finder-body');
    function show() { body.innerHTML = html(F, st); var f = body.querySelector('button,a'); if (f && st.i + st.done) f.focus({ preventScroll: true }); }
    card.addEventListener('click', function (e) {
      var pick = e.target.closest('[data-finder-pick]'), re = e.target.closest('[data-finder-restart]');
      if (re) { st = { i: 0, score: {} }; show(); return; }
      if (!pick) return;
      var opt = F.questions[st.i].options[+pick.dataset.finderPick]; if (!opt) return;
      Object.keys(opt.score || {}).forEach(function (g) { st.score[g] = (st.score[g] || 0) + opt.score[g]; });
      if (st.i + 1 < F.questions.length) st.i++;
      else { st.done = true; st.best = Object.keys(st.score).sort(function (a, b) { return st.score[b] - st.score[a]; })[0]; }
      show();
    });
  });
})(window.WRJ);
