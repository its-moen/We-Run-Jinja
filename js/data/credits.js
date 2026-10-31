/* credits.js | the credits band that sits above every footer.
   people = the developers plus anyone else who helped. Add a line to credit someone. */
WRJ.data.credits = {
  slimText: 'Made by members of the club:',
  chip: 'Credits',
  title: 'Made by people who run with you',
  text: 'Thank you to everyone who built, designed, photographed and tested this site.',
  people: WRJ.data.developers.concat([
    { id: 'chloe-martin', name: 'Chloe Martin', role: 'Photography', hue: 290, links: [{ icon: 'instagram', label: 'Instagram', href: '#' }] },
    { id: 'claude', name: 'Claude', role: 'AI assistant by Anthropic, code and design support', hue: 22, links: [{ icon: 'globe', label: 'Claude', href: 'https://claude.ai' }] },
    { id: 'claude', name: 'Claude', role: 'AI assistant by Anthropic, code and design support', hue: 22, links: [{ icon: 'globe', label: 'Claude', href: 'https://claude.ai' }] }

  ])
};
