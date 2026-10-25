/* BirthdayPanel({ctx, compact}) : one celebration a month for everyone with a birthday that month. No individual names or dates are shown. */
WRJ.c.BirthdayPanel = function (p) {
  var W = WRJ, U = W.util, next = U.thirdSaturdays(1)[0], month = U.fmt(next, { month: 'long' });
  return '<div class="bday-panel' + (p.compact ? ' compact' : '') + '"><p class="bday-next">' + W.icon('cake') + '<span>Next celebration <b>' + U.fmt(next, { weekday: 'long', day: 'numeric', month: 'long' }) + '</b></span></p>' +
    '<p class="bday-group"><b>' + month + ' babies</b> celebrate together. Everyone in the group with a birthday in ' + month + ' is cheered on with a group photo and cake after the run.</p></div>';
};
