/* ScheduleCard({slot}) : one weekday of the club rhythm. Saturday is highlighted as the main run. */
WRJ.c.ScheduleCard = function (p) {
  var s = p.slot, U = WRJ.util;
  return '<article class="sched-card ' + (s.main ? 'is-main' : 'glass') + '" id="' + U.uid(p.ctx || 'schedule', s.id) + '" data-reveal>' +
    '<div class="sched-day"><span class="display h-md" data-split="chars">' + s.day + '</span>' + (s.main ? '<span class="chip"><i class="dot"></i>Main run</span>' : '') + '</div>' +
    '<p class="sched-title">' + U.esc(s.title) + '</p><p class="sched-note">' + U.esc(s.note) + '</p>' +
    '<ul class="event-meta"><li>' + WRJ.icon('clock') + s.time + '</li><li>' + WRJ.icon('pin') + U.esc(s.place) + '</li></ul></article>';
};
