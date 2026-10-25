/* AthleteCard({athlete, ctx, variant:'leading'|'profile', rank})
   AthleteProfile(athlete) fills the modal. Clicking any [data-open-athlete] opens it. */
(function (W) {
  var U = W.util;
  W.c.AthleteCard = function (p) {
    var a = p.athlete, v = p.variant || 'profile', id = U.uid(p.ctx || 'athlete', 'athlete', a.id);
    return '<article class="ath-card ' + v + '" id="' + id + '" data-reveal data-open-athlete="' + a.id + '" tabindex="0" role="button" aria-label="Open profile of ' + U.esc(a.name) + '">' +
      '<div class="ath-photo" style="--h:' + a.hue + '">' + (a.photo ? '<img src="' + U.esc(a.photo) + '" alt="" loading="lazy">' : '<b aria-hidden="true">' + U.initials(a.name) + '</b>') +
        (p.rank ? '<span class="ath-rank">#' + p.rank + '</span>' : '') +
        '<span class="chip ath-country">' + U.flag(a.country.code) + ' ' + U.esc(a.country.name) + '</span></div>' +
      '<div class="ath-body"><h3 class="display h-sm">' + U.esc(a.name) + '</h3>' +
        (v === 'leading'
          ? '<p class="ath-big"><span class="num display" data-count="' + a.totalKm + '">0</span><small>km all time</small></p>'
          : '<p class="muted">Running with us since ' + a.since + '</p>') +
        '<ul class="ath-meta"><li>' + W.icon('run') + a.runs + ' runs</li><li>' + W.icon('medal') + a.races + ' races</li></ul></div></article>';
  };
  W.c.AthleteProfile = function (a) {
    var pbs = Object.keys(a.pb).filter(function (k) { return a.pb[k]; });
    return '<div class="profile">' +
      '<div class="profile-head">' + W.c.Avatar({ athlete: a, size: 'xl' }) +
        '<div><span class="chip">' + U.flag(a.country.code) + ' ' + U.esc(a.country.name) + '</span>' +
        '<h3 class="display h-md" data-split="chars">' + U.esc(a.name) + '</h3>' +
        '<p class="muted">Member since ' + a.since + '</p></div></div>' +
      '<p class="profile-bio" data-split="words">' + U.esc(a.bio) + '</p>' +
      (a.legend ? '<p class="chip"><i class="dot"></i>' + U.esc(a.legend) + '</p>' : '') +
      '<div class="profile-stats">' +
        [['Total km', a.totalKm], ['Runs', a.runs], ['Races', a.races], ['Podiums', a.podiums], ['Week streak', a.streak]].map(function (s) {
          return '<div class="solid"><span class="display h-md num" data-count="' + s[1] + '">0</span><small>' + s[0] + '</small></div>'; }).join('') + '</div>' +
      '<h4 class="display h-sm">Personal bests</h4><ul class="pb-list">' + pbs.map(function (k) { return '<li class="solid"><small>' + k + '</small><b class="display num" data-split="chars">' + a.pb[k] + '</b></li>'; }).join('') + '</ul></div>';
  };
  W.ui.inits.push(function () {
    if (document._athOpen) return; document._athOpen = true;
    function open(el) { var a = U.athlete(el.dataset.openAthlete); if (a) W.ui.openModal(W.c.AthleteProfile(a), a.name + ' profile'); }
    document.addEventListener('click', function (e) { var el = e.target.closest('[data-open-athlete]'); if (el) open(el); });
    document.addEventListener('keydown', function (e) { if ((e.key === 'Enter' || e.key === ' ') && e.target.matches('[data-open-athlete]')) { e.preventDefault(); open(e.target); } });
  });
})(window.WRJ);
