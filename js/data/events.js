/* events.js | key activities, other races and charity events, birthday celebration copy.
   Weekly runs and the third Saturday birthday run are generated automatically from site.js,
   so you only add one-off events here. date: 'YYYY-MM-DD'.  kind: 'club' | 'race' | 'charity' | 'social' */
WRJ.data.activities = [
  { id: 'saturday-long-run', icon: 'run',   title: 'Saturday long run',     text: 'The heart of the club. Meet at sunrise, pick a pace group, finish together.' },
  { id: 'midweek',           icon: 'clock', title: 'Midweek sessions',      text: 'Wednesday social, Thursday tempo and the odd Monday recovery jog.' },
  { id: 'races',             icon: 'medal', title: 'Marathons and road races', text: 'We travel together to marathons, half marathons and 10K races across the region.' },
  { id: 'charity',           icon: 'heart', title: 'Charity runs',          text: 'Fun runs and fundraisers for schools, clinics and community projects.' },
  { id: 'birthdays',         icon: 'cake',  title: 'Birthday celebration',  text: 'Every third Saturday we run for the month\'s birthday people and share cake.' },
  { id: 'visitors',          icon: 'globe', title: 'Visitors welcome',      text: 'Travelling through Jinja? Join any run, no sign up and no fee.' }
];

/* pace and distance groups. Add a line to add a group card on Home and Events. */
WRJ.data.groups = [
  { id: 'seed-walkers', icon: 'users', title: 'Seed walkers', range: '1 to 4 km', tag: 'Walk or easy jog', text: 'A gentle walk or slow jog with no pressure. For beginners, families, recovery and anyone not ready to run fast.' },
  { id: 'aerobics',     icon: 'heart', title: 'Aerobics',     range: 'Music and movement', tag: 'Fitness', text: 'Led aerobics to warm up or wind down. No distance, just good energy.' },
  { id: 'steady',       icon: 'run',   title: 'Steady runners', range: '5 to 10 km', tag: 'Social pace', text: 'Relaxed running and conversation. Our biggest group on Saturdays.' },
  { id: 'long',         icon: 'medal', title: 'Long runners', range: '10 to 21 km', tag: 'Race training', text: 'Longer loops for marathon and half marathon goals.' }
];

WRJ.data.events = [
  { id: 'ev-aerobics-walk',   title: 'Aerobics and seed walkers morning', kind: 'social', date: '2026-11-07', time: '06:30', place: 'Jinja Bridge viewpoint',   distance: '1 to 4 km', text: 'Warm up with aerobics, then a gentle 1 to 4 km walk or jog.' },
  { id: 'ev-charity-fun-run', title: 'Charity fun run for school fees', kind: 'charity', date: '2026-11-14', time: '07:00', place: 'Jinja Main Street',        distance: '5 km',  text: 'Raise money for local students. Walk, jog or run.' },
  { id: 'ev-away-half',       title: 'Away half marathon weekend',      kind: 'race',    date: '2026-11-22', time: '06:00', place: 'Kampala',                   distance: '21 km', text: 'Shared transport and a team photo at the finish.' },
  { id: 'ev-sunrise-long',    title: 'Nile sunrise long run',           kind: 'club',    date: '2026-12-05', time: '05:45', place: 'Source of the Nile path',   distance: '15 km', text: 'An early start for the best light of the year.' },
  { id: 'ev-year-end-10k',    title: 'Year end club 10K',               kind: 'race',    date: '2026-12-19', time: '06:30', place: 'Jinja Bridge viewpoint',    distance: '10 km', text: 'Our own timed 10K with medals for every finisher.' },
  { id: 'ev-new-year-social', title: 'New year social run',             kind: 'social',  date: '2027-01-02', time: '07:00', place: 'Bujagali Falls',            distance: '6 km',  text: 'Easy kilometres and breakfast by the river.' }
];

WRJ.data.birthdayRun = {
  rule: 'Every third Saturday of the month',
  time: '06:30', place: 'Jinja Bridge viewpoint',
  text: 'We run the first loop together, sing, and share cake at the finish for everyone with a birthday that month.'
};
