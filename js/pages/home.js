/* home.js | Home page: hero, routes, latest records, top performances, leading athletes, rankings, ultimate athletes, join, FAQ */
WRJ.pages.home = {
  key: 'home',
  render: function () {
    var W = WRJ, U = W.util, D = W.data, C = D.content;
    var maxKm = 42.2;

    var hero = '<section class="hero" id="home" data-fullscreen><div class="hero-bg" data-parallax=".18"></div><div class="hero-shade"></div>' +
      '<div class="container hero-grid"><div class="hero-copy" data-float="4"><span class="chip" data-reveal="fade"><i class="dot"></i>' + C.hero.chip + '</span>' +
      '<h1 class="display h-xl" data-split="chars">' + C.hero.title + '</h1><p class="lead" data-split="words">' + C.hero.text + '</p>' +
      '<div class="row">' + W.c.Button({ label: 'Join a Saturday run', href: '#join' }) + W.c.Button({ label: 'Explore routes', href: '#routes', variant: 'ghost', icon: 'arrowDown' }) + '</div></div>' +
      W.c.NextRun() + '</div><a class="scroll-cue" href="#about-snapshot" aria-label="Scroll to the next section"><span>Scroll</span>' + W.icon('arrowDown') + '</a></section>' + W.c.Marquee({ items: D.site.marquee });

    var about = '<section class="section" id="about-snapshot"><div class="container">' +
      W.c.SectionHead({ label: 'Who we are', title: 'Locals and foreigners.<br>One road.', text: C.about.mission }) +
      '<div class="grid cols-4 stats" data-stagger data-float-children="6">' + D.site.stats.map(W.c.StatTile).join('') + '</div></div></section>' +
      '<section class="section-tight" id="groups"><div class="container">' + W.c.SectionHead({ label: 'Every pace has a place', title: 'Pick your group', text: 'From a gentle 1 km walk to a 21 km long run.' }) + '<div class="grid cols-4" data-stagger>' + U.list(D.groups, function (g) { return W.c.GroupCard({ group: g, ctx: 'home' }); }) + '</div></div></section>';

    var routes = '<section class="hs" id="routes" data-hscroll><div class="hs-sticky"><div class="container">' +
      W.c.SectionHead({ label: 'Where we run', title: 'Routes of the club', text: 'Scroll down and the routes slide across. Each one has its own character and pace.' }) +
      '</div><div class="hs-track" aria-label="Club routes">' + U.list(D.routes, function (r) { return W.c.RouteCard({ route: r, ctx: 'home' }); }) + '</div>' +
      '<div class="container"><div class="hs-progress" aria-hidden="true"><i></i></div></div></div></section>';

    var cats = [{ key: 'all', label: 'All' }, { key: 'race', label: 'Races' }, { key: 'jog', label: 'Jogs' }, { key: 'charity', label: 'Charity' }];
    var records = '<section class="section" id="records"><div class="container">' +
      W.c.SectionHead({ label: 'Fresh from the road', title: 'Latest records', text: 'Marathons, jogs and charity runs, with distance, time and pace for every effort.' }) +
      W.c.Tabs({ id: 'records-tabs', label: 'Record type', tabs: cats, render: function (k) {
        var list = D.records.filter(function (r) { return k === 'all' || r.category === k; });
        return W.c.Carousel({ id: 'records-' + k, label: 'Latest records', items: list.map(function (r) { return W.c.RecordCard({ run: r, ctx: 'records-' + k, maxKm: maxKm }); }) });
      } }) + '</div></section>';

    var perf = '<section class="section" id="top-performances"><div class="container">' +
      W.c.SectionHead({ label: 'All time bests', title: 'Top performances', text: 'The fastest times ever run in club colours, by distance.' }) + W.c.PerformanceBoard({ ctx: 'home-perf' }) + '</div></section>';

    var leaders = D.athletes.slice().sort(function (a, b) { return b.totalKm - a.totalKm; }).slice(0, 8);
    var leading = '<section class="section" id="leading-athletes"><div class="container">' +
      W.c.SectionHead({ label: 'The club\'s finest', title: 'Leading athletes', text: 'Our most active runners of all time, ranked by total kilometres.' }) +
      W.c.Carousel({ id: 'leading-carousel', label: 'Leading athletes', items: leaders.map(function (a, i) { return W.c.AthleteCard({ athlete: a, variant: 'leading', rank: i + 1, ctx: 'leading' }); }) }) + '</div></section>';

    var rankings = '<section class="section" id="rankings"><div class="container">' +
      W.c.SectionHead({ label: 'Who leads the table', title: 'Top rankings', text: 'Switch the table to see who tops distance, attendance, races or streaks.' }) + W.c.Leaderboard({ ctx: 'home-rank' }) + '</div></section>';

    var ultimate = '<section class="section" id="ultimate"><div class="container">' +
      W.c.SectionHead({ label: 'Hall of fame', title: 'Ultimate athletes', text: 'Club legends who set a record that still stands.' }) + W.c.UltimateGrid({ ctx: 'home-ultimate' }) + '</div></section>';

    var join = '<section class="section" id="join"><div class="container join glass">' +
      '<div class="join-copy"><span class="chip"><i class="dot"></i>Membership</span><h2 class="display h-lg" data-split="chars">Let\'s make<br>it a run</h2><p class="lead" data-split="words">Tell us a little about you and we will welcome you at the next Saturday run. Visitors are always welcome.</p></div>' +
      W.c.Form({ id: 'join-form', submit: 'I am interested', success: 'Welcome, we will be in touch before the next run.', fields: [
        { name: 'name', label: 'Your name', placeholder: 'Alex Namusoke', required: true, auto: 'name' },
        { name: 'email', label: 'Email', type: 'email', placeholder: 'you@example.com', required: true, auto: 'email' },
        { name: 'pace', label: 'What feels right for you?', type: 'select', options: ['Seed walker (1 to 4 km)', 'Aerobics', 'I am just starting', 'Walk or easy jog', 'Steady runner', 'Long distance runner', 'Visiting Jinja'], required: true, full: true }] }) + '</div></section>';

    var faq = '<section class="section" id="faq"><div class="container narrow">' + W.c.SectionHead({ label: 'Good to know', title: 'First run? No worries' }) + W.c.Faq({ items: C.faq, ctx: 'home' }) + '</div></section>';

    return hero + about + routes + records + perf + leading + rankings + ultimate + join + faq;
  }
};
