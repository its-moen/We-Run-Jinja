/* content.js | copy blocks: about us, timeline, FAQ, footer panels, hero text. */
WRJ.data.content = {
  hero: {
    chip: 'Locals and foreigners, one Jinja crew',
    title: 'We Run<br>Jinja',
    text: 'A friendly running club on the banks of the Nile. Every pace belongs here, every Saturday.'
  },
  about: {
    story: [
      'We Run Jinja began as a few friends meeting on the bridge before sunrise. Some of us grew up here, some arrived with a backpack and stayed.',
      'Today we are a mix of locals and foreigners who run together most Saturdays, join marathons across the region and use our kilometres to support charity.'
    ],
    mission: 'To make running in Jinja social, safe and open to everyone.',
    values: [
      { icon: 'users', title: 'Everyone belongs', text: 'Local, visitor, fast or slow, you finish with the group.' },
      { icon: 'heart', title: 'Run for others',   text: 'We turn kilometres into support for our community.' },
      { icon: 'route', title: 'Know the road',    text: 'We look after each other and respect shared roads.' }
    ],
    timeline: [
      { year: '2019', text: 'First Saturday run on Jinja Bridge.' },
      { year: '2020', text: 'Midweek sessions and our first away marathon.' },
      { year: '2022', text: 'First charity fun run for school fees.' },
      { year: '2024', text: 'Monthly birthday celebration begins.' },
      { year: '2026', text: 'We Run Jinja goes online.' }
    ]
  },
  oneRoad: {
    label: 'One crew',
    title: 'Locals and foreigners.<br>One road.',
    text: 'They arrive from both sides of the bridge, with different accents and the same Saturday alarm. By the finish there is just one crew.',
    homeCode: 'UG',
    localsLabel: 'Locals', foreignersLabel: 'Visitors and expats', mergedLabel: 'One crew',
    stats: { locals: 52, foreigners: 34, countries: 14 }   /* shown as numbers. Update when your membership changes */
  },
  facts: [
    { icon: 'calendar', label: 'When',  value: 'Saturdays, 06:30' },
    { icon: 'pin',      label: 'Where', value: 'Jinja Bridge viewpoint' },
    { icon: 'users',    label: 'Who',   value: 'Locals, visitors, every pace' },
    { icon: 'heart',    label: 'Cost',  value: 'Free to join a run' }
  ],
  steps: [
    { n: 1, icon: 'whatsapp', title: 'Say hello',        text: 'Message us on WhatsApp or fill in the form. Tell us how you like to move.' },
    { n: 2, icon: 'users',    title: 'Pick your group',  text: 'Seed walkers 1 to 4 km, aerobics, steady runners or long runners.' },
    { n: 3, icon: 'run',      title: 'Show up Saturday', text: 'Meet at the bridge, move together and stay for coffee. Nobody is left behind.' }
  ],
  faq: [
    { q: 'Do I need to be fast?', a: 'No. We run in pace groups and nobody is left behind. Walkers are welcome too.' },
    { q: 'When and where do you meet?', a: 'Mostly Saturdays at the Jinja Bridge viewpoint. Some weeks we also run on Monday, Wednesday or Thursday. See the Events page for dates.' },
    { q: 'I am slow or just starting. Is there a group for me?', a: 'Yes. Seed walkers cover 1 to 4 km at a gentle walk or easy jog, and we also run aerobics sessions. Nobody is left behind.' },
    { q: 'Is there a fee?', a: 'Joining a run is free. Membership is optional and covers club kit and race transport.' },
    { q: 'I am visiting Jinja. Can I join?', a: 'Yes, please do. Come to any run and introduce yourself to the captain.' }
  ],
  footer: {
    resources: [
      { label: 'Run safety guide', href: '#' }, { label: 'Beginner plan', href: '#' }, { label: 'Route maps', href: 'index.html#routes' },
      { label: 'Race calendar', href: 'events.html#upcoming' }, { label: 'Club handbook', href: '#' }
    ],
    club: [
      { label: 'Chain of command', href: '#chain' }, { label: 'Membership', href: 'index.html#join' }, { label: 'Link with us', href: 'contact.html#link-with-us' },
      { label: 'Birthdays', href: '#birthdays' }, { label: 'News', href: '#news' }, { label: 'Promotions and discounts', href: '#promotions' }
    ],
    support: [
      { label: 'Contact us', href: 'contact.html#contact' }, { label: 'Help', href: 'index.html#faq' }, { label: 'Site feedback', href: '#feedback' },
      { label: 'Rate and review', href: '#feedback' }, { label: 'Accessibility', href: '#accessibility' }
    ]
  },
  chain: [
    { id: 'captain',   role: 'Club captain',     name: 'Alex Namusoke',  note: 'Final say on routes and safety' },
    { id: 'vice',      role: 'Vice captain',     name: 'Sarah Nakato',   note: 'Runs when the captain is away' },
    { id: 'pacers',    role: 'Head of pacers',   name: 'Samuel Kiprono', note: 'Pace groups and training plans' },
    { id: 'welfare',   role: 'Welfare and new members', name: 'Grace Atim', note: 'First point of contact for newcomers' },
    { id: 'treasurer', role: 'Treasurer',        name: 'Tom Whitaker',   note: 'Membership, fundraising and race transport' }
  ],
  news: [
    { id: 'news-1', date: '2026-10-12', title: 'Lena Hoffmann finishes marathon in 3:21', tag: 'Results' },
    { id: 'news-2', date: '2026-10-05', title: 'Charity fun run date announced for 14 November', tag: 'Events' },
    { id: 'news-3', date: '2026-09-28', title: 'New route added: Bujagali Falls Trail', tag: 'Routes' }
  ],
  promos: [
    { id: 'promo-1', title: 'Member discount', text: 'Ask the treasurer about partner shop discounts on running shoes.', code: 'WRJMEMBER' },
    { id: 'promo-2', title: 'Bring a friend', text: 'Bring a new runner for their first Saturday and get a free club tee.', code: 'FRIEND' }
  ]
};
