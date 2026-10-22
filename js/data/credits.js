/* credits.js | the credits band that sits above every footer.
   people = the developers plus anyone else who helped. Add a line to credit someone. */
WRJ.data.credits = {
  chip: 'Credits',
  title: 'Made by people who run with you',
  text: 'Thank you to everyone who built, designed, photographed and tested this site.',
  people: WRJ.data.developers.concat([
    { id: 'Mayanja-Joel-tephen', name: 'Mayanja Joel Stephen', role: 'UI UX and Front-end Designer', hue: 290, links: [{ icon: 'instagram', label: 'Instagram', href: '#' }] },
    { id: 'Sempala-Harison-Solomon', name: 'Sempala Harison .S', role: 'SEO analyst, Backend ENgineer, Help and support', hue: 22, links: [{ icon: 'globe', label: '', href: '' }] }
  ])
};
