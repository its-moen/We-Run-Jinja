/* Form({id, fields, submit, success, kind})
   field: {name,label,type:'text'|'email'|'contact'|'select'|'textarea'|'rating', options, placeholder, required, min, max}
   'contact' accepts an email OR a phone / WhatsApp number.
   Safety built in: required + length + format checks with inline messages, input cleaning (tags and control characters removed),
   hidden spam trap, double click lock, 2.5 second cool down, 5 sends per visit, offline notice and a 10 second timeout.
   Sending: Google Sheet web app (data/settings.js -> sheet.url) or Formspree (site.formEndpoint). With neither, it only confirms on the page (demo). */
(function (W) {
  var U = W.util, sent = 0, lastAt = 0;
  var EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  function phone(v) { var d = v.replace(/[\s().-]/g, ''); return /^\+?\d{7,15}$/.test(d); }
  function clean(v) { return String(v == null ? '' : v).replace(/<[^>]*>/g, '').replace(/[\u0000-\u001f\u007f]/g, ' ').replace(/\s+/g, ' ').trim(); }

  function field(f, id) {
    var fid = id + '-' + f.name, req = f.required ? ' required aria-required="true"' : '', err = fid + '-err', max = f.max || (f.type === 'textarea' ? 1000 : f.type === 'contact' || f.type === 'email' ? 120 : 80);
    if (f.type === 'rating') return '<fieldset class="rating field" data-field="' + f.name + '"><legend>' + U.esc(f.label) + '</legend>' + [5, 4, 3, 2, 1].map(function (n) {
      return '<input type="radio" id="' + fid + '-' + n + '" name="' + f.name + '" value="' + n + '"' + (n === 5 ? ' required' : '') + '><label for="' + fid + '-' + n + '" title="' + n + ' stars"><span class="sr">' + n + ' stars</span>' + W.icon('star') + '</label>';
    }).join('') + '<small class="field-err" id="' + err + '" role="alert"></small></fieldset>';
    var d = ' aria-describedby="' + err + '"', ctrl = f.type === 'select'
      ? '<select id="' + fid + '" name="' + f.name + '"' + req + d + '><option value="">Choose one</option>' + f.options.map(function (o) { return '<option>' + U.esc(o) + '</option>'; }).join('') + '</select>'
      : f.type === 'textarea' ? '<textarea id="' + fid + '" name="' + f.name + '" rows="4" maxlength="' + max + '" placeholder="' + U.esc(f.placeholder || '') + '"' + req + d + '></textarea>'
      : '<input id="' + fid + '" name="' + f.name + '" type="' + (f.type === 'email' ? 'email' : 'text') + '"' + (f.type === 'contact' ? ' inputmode="email"' : '') + ' maxlength="' + max + '" placeholder="' + U.esc(f.placeholder || '') + '"' + req + d + ' autocomplete="' + (f.auto || 'off') + '">';
    return '<div class="field' + (f.full ? ' full' : '') + '" data-field="' + f.name + '"><label for="' + fid + '">' + U.esc(f.label) + (f.required ? ' <span aria-hidden="true">*</span>' : '') + '</label>' + ctrl + '<small class="field-err" id="' + err + '" role="alert"></small></div>';
  }
  W.c.Form = function (p) {
    var meta = encodeURIComponent(JSON.stringify(p.fields.map(function (f) { return { n: f.name, t: f.type || 'text', r: !!f.required, l: f.label, min: f.min, max: f.max }; })));
    return '<form class="form" id="' + p.id + '" data-form data-kind="' + (p.kind || p.id) + '" data-success="' + U.esc(p.success || 'Thank you. We got your message.') + '" data-spec="' + meta + '" novalidate>' +
      '<div class="form-grid">' + p.fields.map(function (f) { return field(f, p.id); }).join('') + '</div>' +
      '<div class="hp" aria-hidden="true"><label>Leave this empty<input type="text" name="website" tabindex="-1" autocomplete="off"></label></div>' +
      W.c.Button({ label: p.submit || 'Send', type: 'submit', icon: 'arrowUpRight' }) + '<p class="form-msg" role="status" aria-live="polite"></p></form>';
  };

  function check(spec, v) {
    v = clean(v);
    if (spec.t === 'rating') return v ? '' : 'Please choose a rating.';
    if (!v) return spec.r ? 'Please fill in ' + spec.l.toLowerCase() + '.' : '';
    var min = spec.min || (spec.t === 'textarea' ? 5 : spec.n === 'name' ? 2 : 1);
    if (v.length < min) return 'Please write at least ' + min + ' characters.';
    if (spec.t === 'email' && !EMAIL.test(v)) return 'Please enter a valid email, for example you@example.com.';
    if (spec.t === 'contact' && !EMAIL.test(v) && !phone(v)) return 'Please enter an email or a phone number with country code.';
    return '';
  }

  W.ui.inits.push(function (scope) {
    scope.querySelectorAll('[data-form]').forEach(function (f) {
      if (f._f) return; f._f = true;
      var spec = JSON.parse(decodeURIComponent(f.dataset.spec)), msg = f.querySelector('.form-msg'), btn = f.querySelector('button[type=submit]');
      function show(name, text) {
        var box = f.querySelector('[data-field="' + name + '"]'); if (!box) return;
        box.classList.toggle('invalid', !!text); box.querySelector('.field-err').textContent = text;
        var c = box.querySelector('input:not([type=radio]),select,textarea'); if (c) c.setAttribute('aria-invalid', !!text);
      }
      f.addEventListener('input', function (e) { var b = e.target.closest('[data-field]'); if (b && b.classList.contains('invalid')) show(b.dataset.field, ''); });
      f.addEventListener('submit', function (e) {
        e.preventDefault(); msg.classList.remove('ok'); msg.textContent = '';
        var fd = new FormData(f), data = {}, first = null;
        spec.forEach(function (s) { var v = clean(fd.get(s.n)), er = check(s, fd.get(s.n)); show(s.n, er); if (er && !first) first = s.n; data[s.n] = v; });
        if (first) { var c = f.querySelector('[data-field="' + first + '"] input,[data-field="' + first + '"] select,[data-field="' + first + '"] textarea'); if (c) c.focus(); msg.textContent = 'Please fix the highlighted fields.'; return; }
        if (clean(fd.get('website'))) { msg.textContent = f.dataset.success; msg.classList.add('ok'); f.reset(); return; }   /* spam trap filled: pretend success */
        if (btn.disabled) return;
        if (sent >= 5) { msg.textContent = 'You have sent several messages already. Please message us on WhatsApp instead.'; return; }
        if (Date.now() - lastAt < 2500) { msg.textContent = 'One moment, please wait before sending again.'; return; }
        if (navigator.onLine === false) { msg.textContent = 'You seem to be offline. Please check your connection and try again.'; return; }
        data.kind = f.dataset.kind; data.page = location.pathname.split('/').pop() || 'index.html';
        var done = function () { sent++; lastAt = Date.now(); msg.textContent = f.dataset.success; msg.classList.add('ok'); f.reset(); }, fail = function () { msg.classList.remove('ok'); msg.textContent = 'Could not send right now. Please try again, or message us on WhatsApp.'; };
        var sh = W.data.settings.sheet || {}, ep = W.data.site.formEndpoint;
        btn.disabled = true; btn.setAttribute('aria-busy', 'true');
        var ctl = window.AbortController ? new AbortController() : null, to = ctl && setTimeout(function () { ctl.abort(); }, 10000);
        var req = sh.url ? fetch(sh.url, { method: 'POST', mode: 'no-cors', body: JSON.stringify(data), signal: ctl && ctl.signal })
                : ep ? fetch(ep, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(data), signal: ctl && ctl.signal }).then(function (r) { if (!r.ok) throw new Error('bad'); })
                : Promise.resolve();
        req.then(done).catch(fail).then(function () { clearTimeout(to); btn.disabled = false; btn.removeAttribute('aria-busy'); });
      });
    });
  });
})(window.WRJ);
