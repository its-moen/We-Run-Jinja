/* events.js | Events page: weekly rhythm, key activities, birthday celebration, upcoming list, gallery, athletes */
WRJ.pages.events = {
  key: 'events',
  render: function () {
    var W = WRJ, U = W.util, D = W.data, today = U.today();

    var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var strip = '<ul class="week-strip" data-stagger>' + days.map(function (d, i) {
      var s = D.site.schedule.find(function (x) { return x.dow === i; });
      return '<li class="' + (s ? 'on' : '') + (s && s.main ? ' main' : '') + '" id="week-' + d.toLowerCase() + '"><b class="display">' + d + '</b><small>' + (s ? s.time : 'Rest') + '</small></li>'; }).join('') + '</ul>';
    var hero = W.c.PageHero({ chip: 'Mainly Saturdays, sometimes midweek', title: 'Events', text: 'Weekly runs, away marathons, charity miles and a birthday celebration every third Saturday.', extra: strip });

    var rhythm = '<section class="section" id="rhythm"><div class="container">' + W.c.SectionHead({ label: 'When we run', title: 'The weekly rhythm', text: 'Saturday is our main run. Monday, Wednesday and Thursday sessions pop up through the month.' }) +
      '<div class="sched-grid" data-float-children="5">' + U.list(D.site.schedule, function (s) { return W.c.ScheduleCard({ slot: s, ctx: 'events' }); }) + '</div></div></section>';

    var groups = '<section class="section" id="groups"><div class="container">' + W.c.SectionHead({ label: 'Every pace has a place', title: 'Pick your group', text: 'Seed walkers cover 1 to 4 km. Aerobics, steady and long runners fill the rest of the morning.' }) +
      '<div class="grid cols-4" data-stagger>' + U.list(D.groups, function (g) { return W.c.GroupCard({ group: g, ctx: 'events' }); }) + '</div></div></section>';

    var acts = '<section class="section" id="activities"><div class="container">' + W.c.SectionHead({ label: 'What we do', title: 'Key activities' }) +
      '<div class="grid cols-3" data-stagger data-float-children="5">' + U.list(D.activities, function (a) { return W.c.ActivityCard({ activity: a, ctx: 'events' }); }) + '</div></div></section>';

    var b = D.birthdayRun, nexts = U.thirdSaturdays(3);
    var birthday = '<section class="section" id="birthday-celebration"><div class="container"><div class="bday-feature">' +
      '<div class="bday-feature-main"><span class="chip">' + W.icon('cake') + b.rule + '</span><h2 class="display h-lg" data-split="chars">Monthly birthday celebration</h2><p class="lead" data-split="words">' + U.esc(b.text) + '</p>' +
      '<ul class="event-meta"><li>' + W.icon('clock') + b.time + '</li><li>' + W.icon('pin') + U.esc(b.place) + '</li></ul>' +
      '<ol class="next-dates" data-stagger>' + nexts.map(function (d, i) { return '<li id="birthday-date-' + (i + 1) + '"><b class="display">' + d.getDate() + '</b><span>' + U.fmt(d, { weekday: 'long', month: 'long', year: 'numeric' }) + '</span></li>'; }).join('') + '</ol></div>' +
      '<div class="bday-feature-side glass" data-reveal="right"><h3 class="display h-sm">Who we celebrate</h3>' + W.c.BirthdayPanel({ ctx: 'events' }) + '</div></div></div></section>';

    /* upcoming: one-off events + generated birthday runs + next two regular Saturdays */
    var list = D.events.filter(function (e) { return U.date(e.date) >= today; });
    U.thirdSaturdays(4).forEach(function (d, i) { list.push({ id: 'ev-birthday-' + i, title: 'Birthday celebration run', kind: 'birthday', date: U.iso(d), time: b.time, place: b.place, distance: '6 km', text: 'Third Saturday cake run.' }); });
    var sat = D.site.schedule[0], cur = new Date(today), added = 0;
    while (added < 2) { if (cur.getDay() === 6 && cur >= today && !U.isThirdSaturday(cur)) { list.push({ id: 'ev-saturday-' + U.iso(cur), title: sat.title, kind: 'club', date: U.iso(cur), time: sat.time, place: sat.place, distance: '5 to 15 km', text: sat.note }); added++; } cur.setDate(cur.getDate() + 1); }
    list.sort(function (a, b) { return U.date(a.date) - U.date(b.date); });
    var kinds = [{ key: 'all', label: 'All' }, { key: 'club', label: 'Club runs' }, { key: 'race', label: 'Races' }, { key: 'charity', label: 'Charity' }, { key: 'social', label: 'Social' }, { key: 'birthday', label: 'Birthdays' }];
    var upcoming = '<section class="section" id="upcoming"><div class="container">' + W.c.SectionHead({ label: 'Mark your calendar', title: 'Upcoming events', text: 'Includes other marathons, charity runs and every third Saturday celebration.' }) +
      W.c.Tabs({ id: 'events-tabs', label: 'Event type', tabs: kinds, render: function (k) {
        var shown = list.filter(function (e) { return k === 'all' || e.kind === k; });
        return shown.length ? '<div class="event-list">' + U.list(shown, function (e) { return W.c.EventCard({ event: e, ctx: 'upcoming-' + k }); }) + '</div>' : '<p class="empty glass">Nothing in this group just yet. Check back soon.</p>';
      } }) + '</div></section>';

    var gallery = '<section class="section" id="gallery"><div class="container">' + W.c.SectionHead({ label: 'Moments', title: 'Gallery', text: 'Scroll and the columns glide in opposite directions. Tap any photo to enlarge it.' }) + W.c.Gallery({ items: D.gallery, ctx: 'events-gallery', cols: 3 }) + '</div></section>';

    var group = [{ key: 'all', label: 'Everyone' }, { key: 'ug', label: 'Uganda' }, { key: 'intl', label: 'International' }];
    var athletes = '<section class="section" id="athletes"><div class="container">' + W.c.SectionHead({ label: 'The runners', title: 'Athletes', text: 'Tap a runner for a simple profile. Locals and visitors, side by side.' }) +
      W.c.Tabs({ id: 'athletes-tabs', label: 'Country filter', tabs: group, render: function (k) {
        var shown = D.athletes.filter(function (a) { return k === 'all' || (k === 'ug' ? a.country.code === 'UG' : a.country.code !== 'UG'); });
        return '<div class="grid cols-4 athlete-grid" data-float-children="4">' + U.list(shown, function (a) { return W.c.AthleteCard({ athlete: a, ctx: 'athletes-' + k }); }) + '</div>';
      } }) + '</div></section>';

    return hero + rhythm + groups + acts + birthday + upcoming + gallery + athletes;
  }
};
