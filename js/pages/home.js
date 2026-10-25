/* home.js (PRIME) | The page is built like a visitor thinks:
   1 what is this and how do I join (hero, facts, how it works)  2 who it is for (groups, routes)
   3 proof (records, founders, films, photos)  4 depth (record book dropdowns)  5 join and questions. */
WRJ.pages.home = {
  key: 'home',
  render: function () {
    var W = WRJ, U = W.util, D = W.data, C = D.content, S = D.settings;
    var heroVideo = S.heroVideo.src ? '<video class="hero-video" src="' + U.esc(S.heroVideo.src) + '" poster="' + U.esc(S.heroVideo.poster) + '" autoplay muted loop playsinline></video>' : '';

    var hero = '<section class="hero" id="home" data-fullscreen><div class="hero-bg"></div>' + heroVideo + '<div class="hero-shade"></div>' +
      '<div class="container hero-grid"><div class="hero-copy"><span class="chip" data-reveal="fade"><i class="dot"></i>' + C.hero.chip + '</span>' +
      '<h1 class="display h-xl" data-split="chars">' + C.hero.title + '</h1><p class="lead" data-split="words">' + C.hero.text + '</p>' +
      '<div class="row">' + W.c.Button({ label: 'Join on WhatsApp', href: U.waHref(), variant: 'whatsapp', icon: 'whatsapp', attrs: 'target="_blank" rel="noopener"' }) + W.c.Button({ label: 'See this week', href: '#this-week', variant: 'ghost', icon: 'arrowDown' }) + '</div></div>' +
      W.c.NextRun() + '</div><a class="scroll-cue" href="#this-week" aria-label="Scroll to the next section"><span>Scroll</span>' + W.icon('arrowDown') + '</a></section>';

    var intro = '<section class="section-tight" id="this-week"><div class="container">' + W.c.FactBar({ facts: C.facts, ctx: 'home' }) + '</div></section>' +
      '<section class="section" id="how-it-works"><div class="container">' + W.c.SectionHead({ label: 'New here?', title: 'How it works', text: 'Three steps from your sofa to the start line.' }) +
      '<div class="grid cols-3" data-stagger>' + U.list(C.steps, function (s) { return W.c.HowStep({ step: s, ctx: 'home' }); }) + '</div></div></section>';

    var groups = '<section class="section-tight" id="groups"><div class="container">' + W.c.SectionHead({ label: 'Every pace has a place', title: 'Pick your group', text: 'From a gentle 1 km walk to a 21 km long run.' }) +
      '<div class="grid cols-4" data-stagger>' + U.list(D.groups, function (g) { return W.c.GroupCard({ group: g, ctx: 'home' }); }) + '</div></div></section>';

    var routes = '<section class="section" id="routes"><div class="container">' + W.c.SectionHead({ label: 'Where we run', title: 'Routes of the club', text: 'Swipe through our favourite loops, from a 2 km walk to a hilly 12 km trail.' }) +
      W.c.Carousel({ id: 'routes-carousel', label: 'Club routes', itemClass: 'routes', items: D.routes.map(function (r) { return W.c.RouteCard({ route: r, ctx: 'home' }); }) }) + '</div></section>';

    var cats = [{ key: 'all', label: 'All' }, { key: 'race', label: 'Races' }, { key: 'jog', label: 'Jogs' }, { key: 'charity', label: 'Charity' }];
    var records = '<section class="section" id="records"><div class="container">' +
      W.c.SectionHead({ label: 'Fresh from the road', title: 'Latest records', text: 'Distance, time and pace for every effort.' }) +
      W.c.Tabs({ id: 'records-tabs', label: 'Record type', tabs: cats, render: function (k) {
        var list = D.records.filter(function (r) { return k === 'all' || r.category === k; });
        return W.c.Carousel({ id: 'records-' + k, label: 'Latest records', items: list.map(function (r) { return W.c.RecordCard({ run: r, ctx: 'records-' + k, maxKm: 42.2 }); }) });
      } }) + '</div></section>';

    var founders = '<section class="section" id="founders"><div class="container">' + W.c.SectionHead({ label: 'Where it began', title: 'Our founders', text: 'Five friends, one bridge and a very early alarm.' }) +
      '<div class="grid cols-3" data-stagger>' + U.list(D.founders, function (f) { return W.c.FounderCard({ founder: f, ctx: 'home' }); }) + '</div></div></section>';

    var media = (D.media || []).length ? '<section class="section" id="media"><div class="container">' + W.c.SectionHead({ label: 'See it for yourself', title: 'Films and photos', text: 'Tap to play or enlarge. Videos load only when you press play, to save your data.' }) + W.c.MediaSection({ ctx: 'home-media' }) + '</div></section>' : '';

    var strip = '<section class="section" id="community"><div class="container">' + W.c.SectionHead({ label: 'Our community', title: 'Faces and places', text: 'A few frames from recent Saturdays.' }) +
      '<div class="grid cols-4 stats" data-stagger>' + D.site.stats.map(W.c.StatTile).join('') + '</div><div class="strip-gap"></div>' +
      W.c.Carousel({ id: 'photo-strip', label: 'Photo strip', itemClass: 'strip', items: D.gallery.map(function (g) {
        return '<figure class="shot" id="' + U.uid('prime-strip', g.id) + '" data-lightbox="' + g.id + '" tabindex="0" role="button" aria-label="Enlarge: ' + U.esc(g.caption) + '" style="aspect-ratio:' + g.ratio + '"><img src="' + g.src + '" alt="' + U.esc(g.alt) + '" loading="lazy"><figcaption>' + U.esc(g.caption) + '</figcaption></figure>'; }) }) +
      '</div></section>';

    var leaders = D.athletes.slice().sort(function (a, b) { return b.totalKm - a.totalKm; }).slice(0, 8);
    var book = '<section class="section" id="record-book"><div class="container">' +
      W.c.SectionHead({ label: 'The record book', title: 'Club hall of fame', text: 'Open a block to see the best times, the leaders and the legends.' }) +
      '<div class="dd-stack">' +
        W.c.Dropdown({ id: 'top-performances', icon: 'trophy', title: 'Top performances', summary: 'All time best times by distance', body: W.c.PerformanceBoard({ ctx: 'home-perf' }) }) +
        W.c.Dropdown({ id: 'leading-athletes', icon: 'medal', title: 'Leading athletes', summary: 'Most kilometres of all time', body: W.c.Carousel({ id: 'leading-carousel', label: 'Leading athletes', items: leaders.map(function (a, i) { return W.c.AthleteCard({ athlete: a, variant: 'leading', rank: i + 1, ctx: 'leading' }); }) }) }) +
        W.c.Dropdown({ id: 'rankings', icon: 'star', title: 'Top rankings', summary: 'Distance, runs, races and streaks', body: W.c.Leaderboard({ ctx: 'home-rank' }) }) +
        W.c.Dropdown({ id: 'ultimate', icon: 'users', title: 'Ultimate athletes', summary: 'Club legends and record holders', body: W.c.UltimateGrid({ ctx: 'home-ultimate' }) }) +
      '</div></div></section>';

    var join = '<section class="section" id="join"><div class="container join glass">' +
      '<div class="join-copy"><span class="chip"><i class="dot"></i>Membership</span><h2 class="display h-lg" data-split="chars">Let\'s make<br>it a run</h2><p class="lead" data-split="words">Message us on WhatsApp or leave your details. We reply within two days and welcome you at the next Saturday run.</p>' +
      W.c.Button({ label: 'Chat on WhatsApp', href: U.waHref(), variant: 'whatsapp', icon: 'whatsapp', attrs: 'target="_blank" rel="noopener"' }) + '</div>' +
      W.c.Form({ id: 'join-form', submit: 'Send my details', success: 'Welcome, we will be in touch before the next run.', fields: [
        { name: 'name', label: 'Your name', placeholder: 'Alex Namusoke', required: true, auto: 'name' },
        { name: 'email', label: 'Email or WhatsApp', type: 'contact', placeholder: 'you@example.com or +256 7...', required: true, auto: 'email' },
        { name: 'pace', label: 'What feels right for you?', type: 'select', options: ['Seed walker (1 to 4 km)', 'Aerobics', 'I am just starting', 'Walk or easy jog', 'Steady runner', 'Long distance runner', 'Visiting Jinja'], required: true, full: true }] }) + '</div></section>';

    var faq = '<section class="section" id="faq"><div class="container narrow">' + W.c.SectionHead({ label: 'Good to know', title: 'First run? No worries' }) + W.c.Faq({ items: C.faq, ctx: 'home' }) + '</div></section>';

    return hero + intro + W.c.OneRoad() + groups + W.c.Finder() + routes + records + founders + media + strip + book + join + faq;
  }
};
