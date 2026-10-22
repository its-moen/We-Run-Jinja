/* Form({id, fields, submit, success, kind})
   field: {name,label,type:'text'|'email'|'select'|'textarea'|'rating', options, placeholder, required}
   Set WRJ.data.site.formEndpoint to a Formspree / Google Apps Script URL to send for real.
   Without it the form confirms on the page only (demo). */
(function (W) {
  var U = W.util;
  function field(f, id) {
    var fid = id + '-' + f.name, req = f.required ? ' required' : '';
    if (f.type === 'rating') return '<fieldset class="rating field"><legend>' + U.esc(f.label) + '</legend>' + [5, 4, 3, 2, 1].map(function (n) {
      return '<input type="radio" id="' + fid + '-' + n + '" name="' + f.name + '" value="' + n + '"' + (n === 5 ? ' required' : '') + '><label for="' + fid + '-' + n + '" title="' + n + ' stars"><span class="sr">' + n + ' stars</span>' + W.icon('star') + '</label>';
    }).join('') + '</fieldset>';
    var ctrl = f.type === 'select' ? '<select id="' + fid + '" name="' + f.name + '"' + req + '><option value="">Choose one</option>' + f.options.map(function (o) { return '<option>' + U.esc(o) + '</option>'; }).join('') + '</select>'
      : f.type === 'textarea' ? '<textarea id="' + fid + '" name="' + f.name + '" rows="4" placeholder="' + U.esc(f.placeholder || '') + '"' + req + '></textarea>'
      : '<input id="' + fid + '" name="' + f.name + '" type="' + (f.type || 'text') + '" placeholder="' + U.esc(f.placeholder || '') + '"' + req + ' autocomplete="' + (f.auto || 'off') + '">';
    return '<div class="field' + (f.full ? ' full' : '') + '"><label for="' + fid + '">' + U.esc(f.label) + '</label>' + ctrl + '</div>';
  }
  W.c.Form = function (p) {
    return '<form class="form" id="' + p.id + '" data-form data-kind="' + (p.kind || p.id) + '" data-success="' + U.esc(p.success || 'Thank you. We got your message.') + '">' +
      '<div class="form-grid">' + p.fields.map(function (f) { return field(f, p.id); }).join('') + '</div>' +
      W.c.Button({ label: p.submit || 'Send', type: 'submit', icon: 'arrowUpRight' }) + '<p class="form-msg" role="status" aria-live="polite"></p></form>';
  };
  W.ui.inits.push(function (scope) {
    scope.querySelectorAll('[data-form]').forEach(function (f) {
      if (f._f) return; f._f = true;
      f.addEventListener('submit', function (e) {
        e.preventDefault();
        var msg = f.querySelector('.form-msg'), data = {}; new FormData(f).forEach(function (v, k) { data[k] = v; }); data.kind = f.dataset.kind;
        var done = function () { msg.textContent = f.dataset.success; msg.classList.add('ok'); f.reset(); };
        var ep = W.data.site.formEndpoint;
        if (!ep) return done();
        fetch(ep, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(data) })
          .then(function (r) { if (!r.ok) throw 0; done(); }).catch(function () { msg.textContent = 'Could not send right now. Please try again or email us.'; msg.classList.remove('ok'); });
      });
    });
  });
})(window.WRJ);
