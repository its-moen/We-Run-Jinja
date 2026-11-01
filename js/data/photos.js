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




  { id: 'ev-speed-walkers',     src: 'assets/gallery/shirts.jpg', alt: 'Speed walkers', caption: 'Speed walkers', tag: 'speed-walkers' },
  { id: 'ev-aerobics',      src: 'assets/gallery/p7.jpeg', alt: 'Aerobics session', caption: 'Aerobics', tag: 'aerobics' },
  { id: 'ev-steady',        src: 'assets/gallery/group10.jpg', alt: 'Steady runners', caption: 'Steady runners', tag: 'steady' },
  { id: 'ev-long',     src: 'assets/gallery/j2.jpg', alt: 'Long runners', caption: 'Long runners', tag: 'long' },
  
  
  { id: 'spot',     src: 'assets/gallery/sikia1.jpeg', alt: 'The meeting spot', caption: 'Look for the bridge pylon', tag: 'spot' },
  { id: 'birthday', src: 'assets/gallery/bd1.jpg', alt: 'Birthday celebration', caption: 'Cake after the run', tag: 'birthday' },

{ id: 'meet-1',   src: 'assets/gallery/grx.jpeg',      alt: 'Runners meeting at the bridge', caption: 'Meet at the bridge',  tag: 'meet' },
{ id: 'warmup-2', src: 'assets/gallery/arobics4.jpeg', alt: 'Members warming up together',   caption: 'Warm up together',    tag: 'warmup' },
{ id: 'run-3',    src: 'assets/gallery/j3.jpg',      alt: 'Runners and walkers on the road', caption: 'Run or walk your way', tag: 'run' },
{ id: 'coffee-4', src: 'assets/gallery/coffee.jpeg',      alt: 'Members chatting over coffee',  caption: 'Coffee and stories',  tag: 'coffee' },

{ id: 'ev-aerobics', src: 'assets/gallery/p9.jpg', alt: 'Aerobics and walkers morning at the bridge', caption: 'Aerobics morning',  tag: 'event-ev-aerobics' },
{ id: 'ev-charity',  src: 'assets/gallery/charity.jpeg',  alt: 'Charity fun run for school fees',          caption: 'Charity fun run',   tag: 'event-ev-charity' },
{ id: 'ev-away',     src: 'assets/gallery/kampala1.jpeg',     alt: 'Away half marathon weekend',               caption: 'Away half marathon', tag: 'event-ev-away' },
{ id: 'ev-sunrise',  src: 'assets/gallery/p14.jpg',  alt: 'Sunrise long run by the Nile',             caption: 'Nile sunrise run', tag: 'event-ev-sunrise' },
{ id: 'ev-year',     src: 'assets/gallery/medal.jpeg',     alt: 'Year end club 10K',                        caption: 'Year end 10K',      tag: 'event-ev-year' },
{ id: 'ev-newyear',  src: 'assets/gallery/ny1.jpeg',  alt: 'New year social run at Bujagali Falls',    caption: 'New year social run', tag: 'event-ev-newyear' },

];
