/* media.js | films and photos for the "Films and photos" blocks. One dictionary, three kinds:
     YouTube   { type:'youtube', youtubeId:'dQw4w9WgXcQ' }
     Video file{ type:'file',    src:'assets/video/run.mp4', poster:'assets/video/run.jpg' }
     Image     { type:'image',   src:'assets/media/charity-run.jpg' }
   type is optional: it is worked out from the fields. Items with no source show "Coming soon".
   The first item is shown large. show:false (or the sheet's show column) hides an item. */

WRJ.data.media = [
  { id: 'saturday Meeting Point',  type: 'image', title: 'A Saturday On the Set, Make it by 7:00pm to set off',  src:'assets/gallery/sikia1.jpeg' ,caption: 'Make it by 7:00pm to set off', poster: 'assets/gallery/sikia1.jpeg' },
  { id: 'saturday-run',  type: 'youtube', title: 'A Saturday on the bridge',   caption: 'Sunrise, warm up and the first loop.', youtubeId: '', poster: 'assets/gallery/bridge7.jpeg', src:'assets/gallery/bridge7.jpeg', },
  { id: 'Aerobics On The Go-run',  type: 'file', title: 'Oh Yes, Things dont just end there, We also get to aerobics.',   caption: 'Sunrise with the heat.', youtubeId: '', poster: 'assets/gallery/arobics3.jpeg', src:'assets/gallery/video.mp4', duration: '2:10' },
  { id: 'charity-run',   type: 'youtube', title: 'Charity fun run highlights', caption: 'Raising school fees, one kilometre at a time.', youtubeId: '', poster: 'assets/gallery/g4.jpg', duration: '1:30' },
  { id: 'new-runner',    type: 'file',    title: 'Your first run with us',     caption: 'What to expect on day one.', src: 'assets/gallery/group1.jpeg', poster: '', duration: '0:55' },
  { id: 'Evening Ninja Run',  type: 'image',   title: 'Evening Ninja Runs',          caption: 'Unlock the Ultimate key to releave your days stress. join the Mid week evening ninja runs.', src: 'assets/gallery/total.jpeg' }
];
