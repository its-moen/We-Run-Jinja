/* We Run Jinja | boot.js
   Loads every script in order (works when index.html is opened from disk),
   then starts the page named in <body data-page="...">.
   To add a component or data file, add its path to the list below. */
(function () {
  var base = document.currentScript.src.replace(/boot\.js.*$/, '');
  var files = [
    'core/namespace.js','core/util.js','core/icons.js','core/motion.js','core/scroll.js','core/theme.js','core/ui.js',
    'data/settings.js','data/site.js','data/athletes.js','data/runs.js','data/events.js','data/content.js','data/developers.js','data/credits.js','data/alumni.js','data/gallery.js',
    'components/button.js','components/sectionHead.js','components/statTile.js','components/avatar.js',
    'components/athleteCard.js','components/recordCard.js','components/routeCard.js','components/eventCard.js',
    'components/carousel.js','components/tabs.js','components/modal.js','components/gallery.js',
    'components/performanceBoard.js','components/leaderboard.js','components/ultimateGrid.js',
    'components/scheduleCard.js','components/birthdayPanel.js','components/roleCard.js',
    'components/developerCard.js','components/alumniCard.js','components/faq.js','components/form.js',
    'components/marquee.js','components/nextRun.js','components/pageHero.js','components/activityCard.js','components/groupCard.js','components/whatsappFloat.js','components/credits.js','components/header.js','components/footer.js'
  ];
  files.push('pages/' + document.body.dataset.page + '.js');
  var left = files.length;
  files.forEach(function (f) {
    var s = document.createElement('script');
    s.src = base + f; s.async = false;
    s.onload = s.onerror = function (e) {
      if (e && e.type === 'error') console.error('WRJ: could not load ' + f);
      if (--left === 0) window.WRJ.start();
    };
    document.head.appendChild(s);
  });
})();
