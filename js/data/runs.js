/* runs.js | latest records, all time top performances and routes.
   Add a record: copy a line, change the values. Pace is calculated automatically.
   category: 'race' | 'jog' | 'charity'   (used by the filter tabs) */
WRJ.data.records = [
  { id: 'rec-2610-a', type: 'Marathon',      category: 'race',    km: 42.2, duration: '3:21:05', athleteId: 'lena-hoffmann',  date: '2026-10-11', location: 'Away marathon, Kampala' },
  { id: 'rec-2610-b', type: 'Social jog',    category: 'jog',     km: 8.4,  duration: '0:58:40', athleteId: 'alex-namusoke',  date: '2026-10-17', location: 'Jinja Bridge to Bujagali' },
  { id: 'rec-2610-c', type: 'Half marathon', category: 'race',    km: 21.1, duration: '1:15:30', athleteId: 'samuel-kiprono', date: '2026-10-04', location: 'Entebbe road race' },
  { id: 'rec-2609-a', type: 'Charity run',   category: 'charity', km: 10,   duration: '0:44:12', athleteId: 'sarah-nakato',   date: '2026-09-27', location: 'Jinja school fundraiser' },
  { id: 'rec-2609-b', type: 'Long jog',      category: 'jog',     km: 15.3, duration: '1:32:10', athleteId: 'tom-whitaker',   date: '2026-09-19', location: 'Source of the Nile loop' },
  { id: 'rec-2609-c', type: 'Trail run',     category: 'jog',     km: 12.6, duration: '1:24:50', athleteId: 'brian-okello',   date: '2026-09-12', location: 'Bujagali Falls trail' },
  { id: 'rec-2608-a', type: '10K race',      category: 'race',    km: 10,   duration: '0:40:10', athleteId: 'ayumi-tanaka',   date: '2026-08-29', location: 'Kakira 10K' },
  { id: 'rec-2608-b', type: 'Charity run',   category: 'charity', km: 5,    duration: '0:27:45', athleteId: 'ruth-achieng',   date: '2026-08-15', location: 'Walukuba community run' }
];

/* all time club records per distance (top three). time text is shown as written. */
WRJ.data.performances = {
  '5K':  { label: '5K',            list: [ { athleteId: 'samuel-kiprono', time: '16:52', date: '2025-03-08', event: 'Club time trial' }, { athleteId: 'brian-okello', time: '17:40', date: '2025-06-14', event: 'Saturday 5K' }, { athleteId: 'sarah-nakato', time: '18:55', date: '2026-02-21', event: 'Club time trial' } ] },
  '10K': { label: '10K',           list: [ { athleteId: 'samuel-kiprono', time: '34:40', date: '2025-08-30', event: 'Kakira 10K' }, { athleteId: 'brian-okello', time: '37:05', date: '2025-08-30', event: 'Kakira 10K' }, { athleteId: 'sarah-nakato', time: '39:30', date: '2026-05-16', event: 'Charity 10K' } ] },
  '21K': { label: 'Half marathon', list: [ { athleteId: 'samuel-kiprono', time: '1:15:30', date: '2026-10-04', event: 'Entebbe road race' }, { athleteId: 'brian-okello', time: '1:22:15', date: '2026-03-01', event: 'Kampala half' }, { athleteId: 'sarah-nakato', time: '1:29:10', date: '2025-11-09', event: 'Jinja half' } ] },
  '42K': { label: 'Marathon',      list: [ { athleteId: 'samuel-kiprono', time: '2:38:05', date: '2025-10-19', event: 'Away marathon' }, { athleteId: 'brian-okello', time: '3:01:50', date: '2026-06-07', event: 'Away marathon' }, { athleteId: 'sarah-nakato', time: '3:12:44', date: '2026-06-07', event: 'Away marathon' } ] }
};

/* routes: points are [x 0-100, y 0-60]. marks add small km pills on the map.
   tone: 'dark' | 'orange' | 'light' (colour of the card). Distances are starter values: verify before publishing. */
WRJ.data.routes = [
  { id: 'nile-run',     name: 'The Nile Run',       km: 8,   elevation: 62,  level: 'Moderate', when: 'Saturday', start: 'Jinja Bridge viewpoint', tone: 'dark',
    points: [[6,44],[18,36],[30,40],[44,28],[58,32],[72,20],[90,24]], marks: [{ at: 2, label: '2 km' }, { at: 5, label: '6 km' }] },
  { id: 'seed-loop',     name: 'Seed Walkers Loop',  km: 2,   elevation: 8,   level: 'Gentle', when: 'Saturday and Wednesday', start: 'Jinja Bridge viewpoint', tone: 'orange',
    points: [[16,40],[16,22],[36,12],[60,14],[80,24],[84,42],[62,50],[34,50],[16,40]], marks: [{ at: 3, label: '1 km' }] },
  { id: 'source-loop',  name: 'Source of the Nile Loop', km: 5, elevation: 24, level: 'Easy', when: 'Monday', start: 'Source of the Nile path', tone: 'light',
    points: [[20,46],[10,30],[24,14],[48,10],[70,18],[84,36],[66,50],[40,52],[20,46]], marks: [{ at: 3, label: '2.5 km' }] },
  { id: 'bujagali',     name: 'Bujagali Falls Trail', km: 12, elevation: 148, level: 'Hard', when: 'Special Saturdays', start: 'Bujagali road', tone: 'orange',
    points: [[8,12],[22,22],[16,38],[34,48],[52,40],[60,24],[78,30],[92,48]], marks: [{ at: 3, label: '4 km' }, { at: 6, label: '9 km' }] },
  { id: 'town-loop',    name: 'Jinja Town Loop',    km: 5.5, elevation: 31, level: 'Easy', when: 'Wednesday', start: 'Main street', tone: 'dark',
    points: [[10,48],[26,48],[26,30],[44,30],[44,14],[66,14],[66,38],[88,38]], marks: [{ at: 3, label: '3 km' }] },
  { id: 'walukuba',     name: 'Walukuba Hills',     km: 6.2, elevation: 118, level: 'Hard', when: 'Thursday', start: 'Walukuba junction', tone: 'light',
    points: [[8,50],[20,40],[30,46],[42,28],[54,36],[66,16],[78,24],[92,10]], marks: [{ at: 4, label: '3 km' }] }
];

/* Map details per route id. Used by the route pop up (click a route card).
   center: [lat, lng]   landmarks: [{name, lat, lng, note}]
   path: [[lat,lng], ...] OR polyline: an encoded Google/Strava polyline string for the exact GPS trace.
   Without path/polyline the pop up draws an approximate line from the sketch. EVERY coordinate below is an approximate
   placeholder: check each one on Google Maps before publishing. */
WRJ.data.routeGeo = {
  'nile-run':    { center: [0.4300, 33.2100], landmarks: [ { name: 'Jinja Bridge viewpoint', lat: 0.4372, lng: 33.2159, note: 'Saturday start and finish' }, { name: 'Source of the Nile gardens', lat: 0.4189, lng: 33.2184, note: 'Water and photo stop' } ] },
  'seed-loop':   { center: [0.4372, 33.2159], landmarks: [ { name: 'Jinja Bridge viewpoint', lat: 0.4372, lng: 33.2159, note: 'Start, finish and warm up' }, { name: 'Turn around cone', lat: 0.4390, lng: 33.2120, note: 'Halfway point' } ] },
  'source-loop': { center: [0.4189, 33.2184], landmarks: [ { name: 'Source of the Nile gardens', lat: 0.4189, lng: 33.2184, note: 'Start and finish' }, { name: 'River path bend', lat: 0.4210, lng: 33.2150, note: 'Best view of the water' } ] },
  'bujagali':    { center: [0.4985, 33.1430], landmarks: [ { name: 'Bujagali Falls', lat: 0.4985, lng: 33.1430, note: 'Turnaround and rest' }, { name: 'Bujagali road junction', lat: 0.4880, lng: 33.1560, note: 'Start' } ] },
  'town-loop':   { center: [0.4244, 33.2041], landmarks: [ { name: 'Jinja Main Street', lat: 0.4244, lng: 33.2041, note: 'Start and finish' }, { name: 'Clock tower roundabout', lat: 0.4252, lng: 33.2065, note: 'Marshal point' } ] },
  'walukuba':    { center: [0.4390, 33.2210], landmarks: [ { name: 'Walukuba junction', lat: 0.4390, lng: 33.2210, note: 'Start' }, { name: 'Hill top', lat: 0.4420, lng: 33.2260, note: 'Hill repeat turn' } ] }
};
