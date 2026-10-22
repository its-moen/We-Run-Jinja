/* BirthdayPanel({ctx, compact}) : the next third Saturday celebration and that month's birthday people */
WRJ.c.BirthdayPanel = function (p) {
  var W = WRJ, U = W.util, next = U.thirdSaturdays(1)[0], month = next.getMonth();
  var people = W.data.athletes.filter(function (a) { return +a.birthday.split('-')[0] - 1 === month; })
    .sort(function (a, b) { return +a.birthday.split('-')[1] - +b.birthday.split('-')[1]; });
  var items = people.map(function (a, i) {
    var d = new Date(next.getFullYear(), month, +a.birthday.split('-')[1]);
    return '<li class="bday" id="' + U.uid(p.ctx || 'birthday', a.id) + '" style="--i:' + i + '">' + W.c.Avatar({ athlete: a, size: 'sm' }) + '<div><b>' + U.esc(a.name) + '</b><span>' + U.fmt(d, { weekday: 'short', day: 'numeric', month: 'long' }) + '</span></div>' + W.icon('cake') + '</li>';
  }).join('');
  return '<div class="bday-panel' + (p.compact ? ' compact' : '') + '"><p class="bday-next">' + W.icon('cake') + '<span>Next celebration <b>' + U.fmt(next, { weekday: 'long', day: 'numeric', month: 'long' }) + '</b></span></p>' +
    '<h4 class="bday-head">' + U.fmt(next, { month: 'long' }) + ' birthdays</h4>' + (items ? '<ul class="bday-list">' + items + '</ul>' : '<p class="muted">No birthdays on file this month. Tell the welfare lead if yours is coming up.</p>') + '</div>';
};
