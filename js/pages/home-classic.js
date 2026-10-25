/* home-classic.js | the earlier content-first home page. To use it set <body data-page="home-classic"> in index.html.
   Home page. First screen is a stand alone hero. Everything else sits below it.
   Long, secondary blocks live in dropdowns so the page stays short. */
WRJ.pages['home-classic'] = {
  key: 'home',
  render: function () {
    var W = WRJ, U = W.util, D = W.data, C = D.content, S = D.settings;
    var heroVideo = S.heroVideo.src ? '<video class="hero-video" src="' + U.esc(S.heroVideo.src) + '" poster="' + U.esc(S.heroVideo.poster) + '" autoplay muted loop playsinline></video>' : '';

    var hero = '<section class="hero" id="home" data-fullscreen><div class="hero-bg"></div>' + heroVideo + '<div class="hero-shade"></div>' +
      '<div class="container hero-grid"><div class="hero-copy"><span class="chip" data-reveal="fade"><i class="dot"></i>' + C.hero.chip + '</span>' +
      '<h1 class="display h-xl" data-split="chars">' + C.hero.title + '</h1><p class="lead" data-split="words">' + C.hero.text + '</p>' +
      '<div class="row">' + W.c.Button({ label: 'Join a Saturday run', href: '#join' }) + W.c.Button({ label: 'Explore routes', href: '#routes', variant: 'ghost', icon: 'arrowDown' }) + '</div></div>' +
      W.c.NextRun() + '</div><a class="scroll-cue" href="#about-snapshot" aria-label="Scroll to the next section"><span>Scroll</span>' + W.icon('arrowDown') + '</a></section>' + W.c.Marquee({ items: D.site.marquee });

    var about = '<section class="section" id="about-snapshot"><div class="container">' +
      W.c.SectionHead({ label: 'Who we are', title: 'Locals and foreigners.<br>One road.', text: C.about.mission }) +
      '<div class="grid cols-4 stats" data-stagger>' + D.site.stats.map(W.c.StatTile).join('') + '</div></div></section>';

    var groups = '<section class="section-tight" id="groups"><div class="container">' + W.c.SectionHead({ label: 'Every pace has a place', title: 'Pick your group', text: 'From a gentle 1 km walk to a 21 km long run.' }) +
      '<div class="grid cols-4" data-stagger>' + U.list(D.groups, function (g) { return W.c.GroupCard({ group: g, ctx: 'home' }); }) + '</div></div></section>';

    var routes = '<section class="section" id="routes"><div class="container">' + W.c.SectionHead({ label: 'Where we run', title: 'Routes of the club', text: 'Swipe through our favourite loops, from a 2 km walk to a hilly 12 km trail.' }) +
      W.c.Carousel({ id: 'routes-carousel', label: 'Club routes', itemClass: 'routes', items: D.routes.map(function (r) { return W.c.RouteCard({ route: r, ctx: 'home' }); }) }) + '</div></section>';

    var cats = [{ key: 'all', label: 'All' }, { key: 'race', label: 'Races' }, { key: 'jog', label: 'Jogs' }, { key: 'charity', label: 'Charity' }];
    var records = '<section class="section" id="records"><div class="container">' +
      W.c.SectionHead({ label: 'Fresh from the road', title: 'Latest records', text: 'Marathons, jogs and charity runs, with distance, time and pace for every effort.' }) +
      W.c.Tabs({ id: 'records-tabs', label: 'Record type', tabs: cats, render: function (k) {
        var list = D.records.filter(function (r) { return k === 'all' || r.category === k; });
        return W.c.Carousel({ id: 'records-' + k, label: 'Latest records', items: list.map(function (r) { return W.c.RecordCard({ run: r, ctx: 'records-' + k, maxKm: 42.2 }); }) });
      } }) + '</div></section>';

    var leaders = D.athletes.slice().sort(function (a, b) { return b.totalKm - a.totalKm; }).slice(0, 8);
    var book = '<section class="section" id="record-book"><div class="container">' +
      W.c.SectionHead({ label: 'The record book', title: 'Club hall of fame', text: 'Open a block to see the best times, the leaders and the legends.' }) +
      '<div class="dd-stack">' +
        W.c.Dropdown({ id: 'top-performances', icon: 'trophy', title: 'Top performances', summary: 'All time best times by distance', open: true, body: W.c.PerformanceBoard({ ctx: 'home-perf' }) }) +
        W.c.Dropdown({ id: 'leading-athletes', icon: 'medal', title: 'Leading athletes', summary: 'Most kilometres of all time', body: W.c.Carousel({ id: 'leading-carousel', label: 'Leading athletes', items: leaders.map(function (a, i) { return W.c.AthleteCard({ athlete: a, variant: 'leading', rank: i + 1, ctx: 'leading' }); }) }) }) +
        W.c.Dropdown({ id: 'rankings', icon: 'star', title: 'Top rankings', summary: 'Distance, runs, races and streaks', body: W.c.Leaderboard({ ctx: 'home-rank' }) }) +
        W.c.Dropdown({ id: 'ultimate', icon: 'users', title: 'Ultimate athletes', summary: 'Club legends and record holders', body: W.c.UltimateGrid({ ctx: 'home-ultimate' }) }) +
      '</div></div></section>';

    var join = '<section class="section" id="join"><div class="container join glass">' +
      '<div class="join-copy"><span class="chip"><i class="dot"></i>Membership</span><h2 class="display h-lg" data-split="chars">Let\'s make<br>it a run</h2><p class="lead" data-split="words">Tell us a little about you and we will welcome you at the next Saturday run. Visitors are always welcome.</p></div>' +
      W.c.Form({ id: 'join-form', submit: 'I am interested', success: 'Welcome, we will be in touch before the next run.', fields: [
        { name: 'name', label: 'Your name', placeholder: 'Alex Namusoke', required: true, auto: 'name' },
        { name: 'email', label: 'Email or WhatsApp', type: 'contact', placeholder: 'you@example.com or +256 7...', required: true, auto: 'email' },
        { name: 'pace', label: 'What feels right for you?', type: 'select', options: ['Seed walker (1 to 4 km)', 'Aerobics', 'I am just starting', 'Walk or easy jog', 'Steady runner', 'Long distance runner', 'Visiting Jinja'], required: true, full: true }] }) + '</div></section>';

    var faq = '<section class="section" id="faq"><div class="container narrow">' + W.c.SectionHead({ label: 'Good to know', title: 'First run? No worries' }) + W.c.Faq({ items: C.faq, ctx: 'home' }) + '</div></section>';

    return hero + about + W.c.OneRoad() + groups + W.c.Finder() + routes + records + book + join + faq;
  }
};
