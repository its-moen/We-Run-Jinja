(function (W) {
  var U = W.util;
  U.esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); };
  U.uid = function () { return Array.prototype.slice.call(arguments).join('-').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); };
  U.list = function (arr, fn) { return (arr || []).map(fn).join(''); };
  U.flag = function (code) { return String.fromCodePoint.apply(null, code.toUpperCase().split('').map(function (c) { return 127397 + c.charCodeAt(0); })); };
  U.initials = function (n) { return n.split(/\s+/).map(function (p) { return p[0]; }).slice(0, 2).join('').toUpperCase(); };
  U.athlete = function (id) { return W.data.athletes.find(function (a) { return a.id === id; }); };
  U.date = function (iso) { var p = iso.split('-'); return new Date(+p[0], +p[1] - 1, +p[2]); };
  U.fmt = function (d, o) { return new Intl.DateTimeFormat('en-GB', o).format(d); };
  U.iso = function (d) { return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); };
  U.sec = function (t) { return t.split(':').reduce(function (a, v) { return a * 60 + (+v); }, 0); };
  U.dur = function (s) { var h = Math.floor(s / 3600), m = Math.floor(s % 3600 / 60), x = Math.round(s % 60); return (h ? h + ':' + String(m).padStart(2, '0') : m) + ':' + String(x).padStart(2, '0'); };
  U.pace = function (km, durText) { var s = U.sec(durText) / km, m = Math.floor(s / 60), x = Math.round(s % 60); if (x === 60) { m++; x = 0; } return m + ':' + String(x).padStart(2, '0'); };
  /* n-th given weekday (0=Sun ... 6=Sat) of a month */
  U.nthWeekday = function (y, m, dow, n) { var d = new Date(y, m, 1); var off = (dow - d.getDay() + 7) % 7; return new Date(y, m, 1 + off + (n - 1) * 7); };
  U.today = function () { var d = new Date(); d.setHours(0, 0, 0, 0); return d; };
  /* next N third-Saturdays from today */
  U.thirdSaturdays = function (count) {
    var out = [], t = U.today(), y = t.getFullYear(), m = t.getMonth();
    while (out.length < count) { var d = U.nthWeekday(y, m, 6, 3); if (d >= t) out.push(d); m++; if (m > 11) { m = 0; y++; } }
    return out;
  };
  U.isThirdSaturday = function (d) { return d.getDay() === 6 && Math.ceil(d.getDate() / 7) === 3; };
  U.seeded = function (seed) { var s = 0; for (var i = 0; i < seed.length; i++) s = (s * 31 + seed.charCodeAt(i)) >>> 0; return function () { s = (s + 0x6D2B79F5) >>> 0; var t = Math.imul(s ^ s >>> 15, 1 | s); t ^= t + Math.imul(t ^ t >>> 7, 61 | t); return ((t ^ t >>> 14) >>> 0) / 4294967296; }; };
})(window.WRJ);
