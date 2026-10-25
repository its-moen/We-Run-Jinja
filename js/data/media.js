/* media.js | films and photos for the "Films and photos" blocks. One dictionary, three kinds:
     YouTube   { type:'youtube', youtubeId:'dQw4w9WgXcQ' }
     Video file{ type:'file',    src:'assets/video/run.mp4', poster:'assets/video/run.jpg' }
     Image     { type:'image',   src:'assets/media/charity-run.jpg' }
   type is optional: it is worked out from the fields. Items with no source show "Coming soon".
   The first item is shown large. show:false (or the sheet's show column) hides an item. */
WRJ.data.media = [
  { id: 'saturday-run',  type: 'youtube', title: 'A Saturday on the bridge',   caption: 'Sunrise, warm up and the first loop.', youtubeId: '', poster: 'assets/gallery/g1.jpg', duration: '2:10' },
  { id: 'charity-run',   type: 'youtube', title: 'Charity fun run highlights', caption: 'Raising school fees, one kilometre at a time.', youtubeId: '', poster: 'assets/gallery/g4.jpg', duration: '1:30' },
  { id: 'new-runner',    type: 'file',    title: 'Your first run with us',     caption: 'What to expect on day one.', src: '', poster: 'assets/gallery/g3.jpg', duration: '0:55' },
  { id: 'photo-clouds',  type: 'image',   title: 'Cables and clouds',          caption: 'Photo from a recent Saturday.', src: 'assets/gallery/g2.jpg' }
];
