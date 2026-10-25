/* athletes.js | one dictionary entry per member. Add a person here and they appear in
   cards, rankings, leaderboards and profiles automatically.
   photo: set to 'assets/athletes/name.jpg' to replace the initials avatar.
   legend: text shows the athlete in "Ultimate athletes". */
WRJ.data.athletes = [
  { id: 'alex-namusoke',  name: 'Alex Namusoke',  country: { name: 'Uganda',  code: 'UG' }, since: 2019, hue: 18,  photo: null, totalKm: 6840, runs: 412, races: 38, podiums: 14, streak: 41,
    pb: { '5K': '19:48', '10K': '41:20', '21K': '1:33:40', '42K': '3:24:15' }, legend: 'Most Saturdays ever', bio: 'Founding member and club captain. Rarely misses a Saturday and always waits for the last runner.' },
  { id: 'samuel-kiprono', name: 'Samuel Kiprono', country: { name: 'Kenya',   code: 'KE' }, since: 2020, hue: 160, photo: null, totalKm: 7420, runs: 366, races: 51, podiums: 29, streak: 28,
    pb: { '5K': '16:52', '10K': '34:40', '21K': '1:15:30', '42K': '2:38:05' }, legend: 'Club marathon record', bio: 'Our fastest runner and the pacer everyone chases on Thursday hills.' },
  { id: 'sarah-nakato',   name: 'Sarah Nakato',   country: { name: 'Uganda',  code: 'UG' }, since: 2019, hue: 330, photo: null, totalKm: 5980, runs: 388, races: 33, podiums: 17, streak: 36,
    pb: { '5K': '18:55', '10K': '39:30', '21K': '1:29:10', '42K': '3:12:44' }, legend: 'Fastest woman, all distances', bio: 'Leads the women\'s pace group and organises our charity runs.' },
  { id: 'lena-hoffmann',  name: 'Lena Hoffmann',  country: { name: 'Germany', code: 'DE' }, since: 2021, hue: 200, photo: null, totalKm: 5210, runs: 301, races: 22, podiums: 8,  streak: 64,
    pb: { '5K': '20:10', '10K': '42:50', '21K': '1:36:20', '42K': '3:31:02' }, legend: 'Longest weekly streak', bio: 'Volunteering in Jinja and never missed a week in over a year.' },
  { id: 'brian-okello',   name: 'Brian Okello',   country: { name: 'Uganda',  code: 'UG' }, since: 2020, hue: 40,  photo: null, totalKm: 4875, runs: 340, races: 29, podiums: 12, streak: 22,
    pb: { '5K': '17:40', '10K': '37:05', '21K': '1:22:15', '42K': '3:01:50' }, bio: 'Trail lover who finds the muddiest route on purpose.' },
  { id: 'tom-whitaker',   name: 'Tom Whitaker',   country: { name: 'United Kingdom', code: 'GB' }, since: 2022, hue: 255, photo: null, totalKm: 4310, runs: 255, races: 19, podiums: 5, streak: 18,
    pb: { '5K': '21:05', '10K': '44:10', '21K': '1:39:50', '42K': '3:38:20' }, bio: 'Rafting guide by day, long run enthusiast by dawn.' },
  { id: 'grace-atim',     name: 'Grace Atim',     country: { name: 'Uganda',  code: 'UG' }, since: 2021, hue: 95,  photo: null, totalKm: 3960, runs: 290, races: 17, podiums: 9, streak: 31,
    pb: { '5K': '20:30', '10K': '43:15', '21K': '1:38:05', '42K': '3:35:40' }, bio: 'Teacher, first to arrive and the voice of the warm up.' },
  { id: 'ayumi-tanaka',   name: 'Ayumi Tanaka',   country: { name: 'Japan',   code: 'JP' }, since: 2023, hue: 350, photo: null, totalKm: 3705, runs: 198, races: 24, podiums: 11, streak: 15,
    pb: { '5K': '19:20', '10K': '40:10', '21K': '1:31:45', '42K': '3:18:30' }, bio: 'Brings race day discipline and the best post run snacks.' },
  { id: 'daniel-mugisha', name: 'Daniel Mugisha', country: { name: 'Uganda',  code: 'UG' }, since: 2022, hue: 215, photo: null, totalKm: 3420, runs: 241, races: 15, podiums: 4, streak: 12,
    pb: { '5K': '19:05', '10K': '40:40', '21K': '1:30:20', '42K': '3:20:10' }, bio: 'Started as a walker, now chases every personal best.' },
  { id: 'chloe-martin',   name: 'Chloe Martin',   country: { name: 'France',  code: 'FR' }, since: 2023, hue: 290, photo: null, totalKm: 2980, runs: 176, races: 12, podiums: 3, streak: 20,
    pb: { '5K': '22:15', '10K': '46:00', '21K': '1:44:30', '42K': '' }, bio: 'Photographer of the group and keeper of the club gallery.' },
  { id: 'ruth-achieng',   name: 'Ruth Achieng',   country: { name: 'Uganda',  code: 'UG' }, since: 2023, hue: 60,  photo: null, totalKm: 2610, runs: 189, races: 9,  podiums: 2, streak: 14,
    pb: { '5K': '23:10', '10K': '48:20', '21K': '1:50:05', '42K': '' }, bio: 'Our newest 10K finisher and the loudest cheerer.' },
  { id: 'ibrahim-kato',   name: 'Ibrahim Kato',   country: { name: 'Uganda',  code: 'UG' }, since: 2024, hue: 130, photo: null, totalKm: 2240, runs: 150, races: 7,  podiums: 1, streak: 9,
    pb: { '5K': '21:40', '10K': '45:30', '21K': '', '42K': '' }, bio: 'Joined as a beginner and now leads the Wednesday social.' }
];
