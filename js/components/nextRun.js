/* NextRun() : finds the next scheduled run from data/site.js and counts down to it live. */
(function (W) {
  var U = W.util;
  function nextSlot() {
    var now = new Date(), best = null;
    W.data.site.schedule.forEach(function (s) {
      var t = s.time.split(':'), d = new Date(now.getFullYear(), now.getMonth(), now.getDate(), +t[0], +t[1]);
      d.setDate(d.getDate() + (s.dow - d.getDay() + 7) % 7);
      if (d <= now) d.setDate(d.getDate() + 7);
      if (!best || d < best.date) best = { slot: s, date: d };
    });
    return best;
  }
  W.c.NextRun = function () {
    var n = nextSlot(), s = n.slot, bday = U.isThirdSaturday(n.date);
    return '<aside class="next-run glass" id="next-run" data-reveal="left" data-target="' + n.date.getTime() + '">' +
      '<div class="row"><span class="chip"><i class="dot"></i>Next run</span>' + (bday ? '<span class="chip">' + W.icon('cake') + 'Birthday run</span>' : '') + '</div>' +
      '<h3 class="display h-md">' + U.fmt(n.date, { weekday: 'long' }) + '<small>' + U.fmt(n.date, { day: 'numeric', month: 'long' }) + '</small></h3>' +
      '<p class="next-title">' + U.esc(s.title) + '</p><ul class="event-meta"><li>' + W.icon('clock') + s.time + '</li><li>' + W.icon('pin') + U.esc(s.place) + '</li></ul>' +
      '<button class="btn btn-ghost btn-sm" type="button" data-ics="' + n.date.getTime() + '|' + U.esc(s.title) + '|' + U.esc(s.place) + '"><span>Add to calendar</span><span class="btn-ic">' + W.icon('calendar') + '</span></button>' +
      '<div class="countdown" aria-label="Time until the next run">' + ['days', 'hours', 'mins', 'secs'].map(function (u) { return '<div><b class="display num" data-u="' + u + '">00</b><small>' + u + '</small></div>'; }).join('') + '</div></aside>';
  };
  /* builds a small .ics file in the browser so a runner can save the run to their phone calendar */
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-ics]'); if (!b) return;
    var p = b.dataset.ics.split('|'), d = new Date(+p[0]), f = function (x) { return x.getFullYear() + String(x.getMonth() + 1).padStart(2, '0') + String(x.getDate()).padStart(2, '0') + 'T' + String(x.getHours()).padStart(2, '0') + String(x.getMinutes()).padStart(2, '0') + '00'; };
    var ics = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//We Run Jinja//EN', 'BEGIN:VEVENT', 'UID:' + p[0] + '@werunjinja', 'DTSTAMP:' + f(new Date()), 'DTSTART:' + f(d), 'DURATION:PT2H', 'SUMMARY:We Run Jinja: ' + p[1], 'LOCATION:' + p[2], 'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
    var a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' })); a.download = 'we-run-jinja.ics'; document.body.appendChild(a); a.click(); a.remove();
  });
  W.ui.inits.push(function (scope) {
    var el = scope.querySelector && scope.querySelector('#next-run'); if (!el || el._n) return; el._n = true;
    var t = +el.dataset.target, q = function (u) { return el.querySelector('[data-u=' + u + ']'); };
    (function tick() {
      var ms = Math.max(t - Date.now(), 0), v = { days: Math.floor(ms / 864e5), hours: Math.floor(ms % 864e5 / 36e5), mins: Math.floor(ms % 36e5 / 6e4), secs: Math.floor(ms % 6e4 / 1e3) };
      Object.keys(v).forEach(function (k) { q(k).textContent = String(v[k]).padStart(2, '0'); });
      setTimeout(tick, 1000);
    })();
  });
})(window.WRJ);
