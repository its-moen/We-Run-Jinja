/* contact.js | Contact page. Its job: connect runners with the club, tell the history, introduce the developers, and hold the alumni.
   Anything about runs, routes, records or photos lives on Home and Events, so it is not repeated here. */
WRJ.pages.contact = {
  key: 'contact',
  render: function () {
    var W = WRJ, U = W.util, D = W.data, S = D.site, A = D.content.about;
    var hero = W.c.PageHero({ chip: 'We reply within two days', title: 'Contact us', text: 'Questions, partnerships, or just wondering where to stand on Saturday? Say hello.' });

    var contact = '<section class="section" id="contact"><div class="container contact-grid">' +
      '<div class="contact-info stack"><div class="solid info-card" data-reveal><ul class="info-list">' +
        '<li>' + W.icon('mail') + '<span><small>Email</small><a href="mailto:' + S.contact.email + '">' + S.contact.email + '</a></span></li>' +
        '<li>' + W.icon('phone') + '<span><small>Phone and WhatsApp</small><a href="tel:' + S.contact.phone.replace(/\s/g, '') + '">' + S.contact.phone + '</a></span></li>' +
        '<li>' + W.icon('pin') + '<span><small>Saturday meeting point</small>' + U.esc(S.contact.meeting) + '</span></li>' +
        '<li>' + W.icon('clock') + '<span><small>Response time</small>' + U.esc(S.contact.hours) + '</span></li></ul>' +
        W.c.Button({ label: 'Chat on WhatsApp', href: U.waHref ? U.waHref() : '#', variant: 'whatsapp', icon: 'whatsapp', attrs: 'target="_blank" rel="noopener"', size: 'sm' }) + '</div>' +
        '<div class="glass info-card" id="link-with-us" data-reveal><h3 class="display h-sm">Link with us</h3><p class="muted">Brands, schools and charities: partner with the club for races, fundraisers and kit.</p>' + W.c.Button({ label: 'Partner with us', href: 'mailto:' + S.contact.email + '?subject=Partnership', variant: 'ghost', size: 'sm' }) + '</div></div>' +
      '<div class="glass form-card" data-reveal><h2 class="display h-md" data-split="chars">Send a message</h2>' +
      W.c.Form({ id: 'contact-form', submit: 'Send message', success: 'Message sent. We will reply soon.', fields: [
        { name: 'name', label: 'Your name', placeholder: 'Alex Namusoke', required: true, auto: 'name' },
        { name: 'email', label: 'Email', type: 'email', placeholder: 'you@example.com', required: true, auto: 'email' },
        { name: 'subject', label: 'Subject', type: 'select', options: ['Joining the club', 'Visiting Jinja', 'Partnership', 'Press', 'Something else'], required: true, full: true },
        { name: 'message', label: 'Message', type: 'textarea', placeholder: 'How can we help?', required: true, full: true }] }) + '</div></div></section>';

    var history = '<section class="section" id="about"><div class="container">' + W.c.SectionHead({ label: 'About us', title: 'Our story' }) +
      '<div class="about-grid"><div class="stack">' + U.list(A.story, function (t) { return '<p class="lead big" data-split="words">' + U.esc(t) + '</p>'; }) +
      '<p class="mission glass" data-reveal>' + W.icon('heart') + '<span>' + U.esc(A.mission) + '</span></p>' +
      '<p class="muted">' + W.icon('users') + ' Want to meet the people who started it? <a class="credits-link" href="index.html#founders">See our founders ' + W.icon('arrowRight') + '</a></p></div>' +
      '<ol class="timeline" data-stagger>' + U.list(A.timeline, function (t) { return '<li id="timeline-' + t.year + '"><b class="display">' + t.year + '</b><span>' + U.esc(t.text) + '</span></li>'; }) + '</ol></div></div></section>';

    var devs = '<section class="section" id="developers"><div class="container">' + W.c.SectionHead({ label: 'Built by members', title: 'Developers', text: 'The people who designed, built and tested this site. Add a photo in js/data/developers.js.' }) +
      '<div class="dev-grid" data-stagger>' + U.list(D.developers, function (d) { return W.c.DeveloperCard({ dev: d, ctx: 'contact' }); }) + '</div></div></section>';

    var alumni = '<section class="section-tight" id="alumni-section"><div class="container">' +
      W.c.Dropdown({ id: 'alumni', icon: 'users', title: 'Alumni', summary: 'Friends who ran with us and carried the club to other corners of the world', body: W.c.Carousel({ id: 'alumni-carousel', label: 'Alumni', items: D.alumni.map(function (a) { return W.c.AlumniCard({ person: a, ctx: 'alumni' }); }) }) }) + '</div></section>';

    return hero + contact + history + devs + alumni;
  }
};
