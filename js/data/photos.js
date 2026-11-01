/* photos.js | every photo the site can show, grouped by tag. This is the ONE place to add pictures.
   tag decides where a photo appears:
     people      faces and groups, shown in the "Come as you are" section
     hero        the photo mosaic at the top of Events
     meet, warmup, run, coffee   the four steps of a Saturday
     seed-walkers, aerobics, steady, long   the pace group cards
     club, race, charity, social, birthday  event cards (by event kind)
     spot        the meeting point ("Find us")
   Missing a tag? The site falls back to the gallery so nothing looks empty.
   The demo files below are crops of the bridge photo: replace src with your own (assets/photos/xxx.webp).
   Run tools/prepare_images.py to resize your own photos and generate these lines for you. */
WRJ.data.photos = [
  { id: 'demo-hero-1',   src: 'assets/gallery/arobics3.jpeg', alt: 'Runners start beside Jinja Bridge', caption: 'Saturday start', tag: 'hero' },
  { id: 'demo-hero-2',   src: 'assets/gallery/bridge7.jpeg', alt: 'Sun low over the Nile', caption: 'Golden hour', tag: 'hero' },
  { id: 'demo-hero-3',   src: 'assets/gallery/g3.jpg', alt: 'The road across the bridge', caption: 'Open road', tag: 'hero' },
  { id: 'demo-hero-4',   src: 'assets/gallery/p3.jpeg', alt: 'Shear Power', caption: 'Steel and light', tag: 'hero' },
  { id: 'demo-hero-5',   src: 'assets/gallery/g6.jpg', alt: 'Big sky over Jinja', caption: 'Big sky mornings', tag: 'hero' },
  { id: 'demo-people-1', src: 'assets/gallery/g2.jpg', alt: 'Club members together', caption: 'Together at the finish', tag: 'people' },
  { id: 'demo-people-2', src: 'assets/gallery/g5.jpg', alt: 'Members stretching', caption: 'Warm up together', tag: 'people' },
  { id: 'demo-people-3', src: 'assets/gallery/g9.jpg', alt: 'Members walking', caption: 'Walkers go first', tag: 'people' },
  { id: 'meet',          src: 'assets/gallery/g1.jpg', alt: 'Meeting at Sikia - Jinja', caption: 'Meet at the Sikia - Jinja', tag: 'meet' },
  { id: 'demo-warmup',   src: 'assets/gallery/g7.jpg', alt: 'Warm up', caption: 'Warm up together', tag: 'warmup' },
  { id: 'demo-run',      src: 'assets/gallery/g3.jpg', alt: 'Running across the bridge', caption: 'Run or walk your way', tag: 'run' },
  { id: 'demo-coffee',   src: 'assets/gallery/g4.jpg', alt: 'Coffee after the run', caption: 'Coffee and stories', tag: 'coffee' },
  { id: 'speed-walkers',     src: 'assets/gallery/j1.jpg', alt: 'Speed walkers', caption: 'Speed walkers', tag: 'speed-walkers' },
  { id: 'aerobics',      src: 'assets/gallery/p7.jpeg', alt: 'Aerobics session', caption: 'Aerobics', tag: 'aerobics' },
  { id: 'steady',        src: 'assets/gallery/group10.jpg', alt: 'Steady runners', caption: 'Steady runners', tag: 'steady' },
  { id: 'long',     src: 'assets/gallery/j2.jpg', alt: 'Long runners', caption: 'Long runners', tag: 'long' },
  { id: 'demo-spot',     src: 'assets/gallery/g6.jpg', alt: 'The meeting spot', caption: 'Look for the bridge pylon', tag: 'spot' },
  { id: 'demo-birthday', src: 'assets/gallery/g4.jpg', alt: 'Birthday celebration', caption: 'Cake after the run', tag: 'birthday' }
];
