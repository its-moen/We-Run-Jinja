/* finder.js | "Find your group" quiz. Each answer adds points to groups (ids from data/events.js -> groups).
   The group with the most points wins. Edit questions, answers and points freely. */
WRJ.data.finder = {
  label: 'Not sure where you fit?',
  title: 'Find your group',
  text: 'Three quick questions and we will suggest where to start. No sign up.',
  questions: [
    { id: 'now', q: 'How do you feel about running right now?', options: [
      { label: 'Brand new, or coming back', score: { 'seed-walkers': 3, aerobics: 1 } },
      { label: 'I jog a little', score: { steady: 2, 'seed-walkers': 1 } },
      { label: 'I run most weeks', score: { steady: 2, long: 1 } },
      { label: 'I train for races', score: { long: 3, steady: 1 } } ] },
    { id: 'far', q: 'How far feels good today?', options: [
      { label: '1 to 4 km', score: { 'seed-walkers': 3 } },
      { label: '3 to 10 km', score: { steady: 3 } },
      { label: '10 km or more', score: { long: 3 } },
      { label: 'I prefer music and movement', score: { aerobics: 3 } } ] },
    { id: 'want', q: 'What do you want from Saturday?', options: [
      { label: 'An easy start and new friends', score: { 'seed-walkers': 2, aerobics: 1, steady: 1 } },
      { label: 'Fitness and fun', score: { aerobics: 2, steady: 2 } },
      { label: 'A solid long run', score: { long: 3 } },
      { label: 'Training for a race', score: { long: 2, steady: 1 } } ] }
  ]
};
