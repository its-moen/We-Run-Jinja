/* site.js | club-wide content. EDIT HERE: times, meeting points, numbers, contact details and social links.
   All values below are placeholders until the club confirms them. */
WRJ.data.site = {
  name: 'We Run Jinja',
  city: 'Jinja, Uganda',
  formEndpoint: '', /* paste a Formspree or Apps Script URL to receive real form submissions */
  nav: [
    { key: 'home',    label: 'Home',    href: 'index.html',   icon: 'home' },
    { key: 'events',  label: 'Events',  href: 'events.html',  icon: 'calendar' },
    { key: 'contact', label: 'Contact', href: 'contact.html', icon: 'mail' }
  ],
  /* leave href as '#' until real handles exist */
  socials: [
    { id: 'instagram', label: 'Instagram', icon: 'instagram', href: '#' },
    { id: 'facebook',  label: 'Facebook',  icon: 'facebook',  href: '#' },
    { id: 'x',         label: 'X',         icon: 'x',         href: '#' },
    { id: 'youtube',   label: 'YouTube',   icon: 'youtube',   href: '#' },
    { id: 'tiktok',    label: 'TikTok',    icon: 'tiktok',    href: '#' },
    { id: 'whatsapp',  label: 'WhatsApp',  icon: 'whatsapp',  href: '#' },
    { id: 'strava',    label: 'Strava',    icon: 'strava',    href: '#' }
  ],
  contact: {
    email: 'hello@werunjinja.example',
    phone: '+256 700 000 000',
    meeting: 'Jinja Bridge viewpoint, Njeru side',
    hours: 'Replies within two days'
  },
  /* animated numbers on the home page */
  stats: [
    { value: 86,    label: 'Active members',        icon: 'users' },
    { value: 14,    label: 'Countries on our roads', icon: 'globe' },
    { value: 12480, suffix: 'km', label: 'Run together', icon: 'route' },
    { value: 312,   label: 'Club runs held',        icon: 'run' }
  ],
  /* dow: 0 Sunday ... 6 Saturday. main:true marks the weekly flagship run */
  schedule: [
    { id: 'saturday',  day: 'Saturday',  dow: 6, time: '06:30', title: 'Club long run',    place: 'Jinja Bridge viewpoint', main: true,  note: 'Our main run of the week. Seed walkers go 1 to 4 km, runners 3 to 15 km. Coffee after.' },
    { id: 'wednesday', day: 'Wednesday', dow: 3, time: '17:45', title: 'Midweek social',   place: 'Jinja town loop',        main: false, note: 'Easy 5 km with chat. Good for first timers and visitors.' },
    { id: 'thursday',  day: 'Thursday',  dow: 4, time: '17:45', title: 'Tempo and hills',  place: 'Walukuba hills',         main: false, note: 'Short, sharp session for those chasing a race goal.' },
    { id: 'monday',    day: 'Monday',    dow: 1, time: '17:45', title: 'Recovery jog',     place: 'Source of the Nile path', main: false, note: 'Slow shake out to start the week. Walkers welcome.' }
  ],
  marquee: ['One city', 'Many paces', 'Locals and foreigners', 'Saturday long runs', 'Charity miles', 'Nile sunrise', 'Everyone finishes']
};
