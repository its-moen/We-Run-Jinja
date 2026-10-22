/* contact.js | Contact page: contact form, about us, alumni (developer credits are in the credits band above the footer) */
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
        '<ul class="social-row">' + U.list(S.socials, function (s) { return '<li><a class="icon-btn" id="contact-social-' + s.id + '" href="' + s.href + '" aria-label="' + s.label + '">' + W.icon(s.icon) + '</a></li>'; }) + '</ul></div>' +
        '<div class="glass info-card" id="link-with-us" data-reveal><h3 class="display h-sm">Link with us</h3><p class="muted">Brands, schools and charities: partner with the club for races, fundraisers and kit.</p>' + W.c.Button({ label: 'Partner with us', href: 'mailto:' + S.contact.email + '?subject=Partnership', variant: 'ghost', size: 'sm' }) + '</div></div>' +
      '<div class="glass form-card" data-reveal="right"><h2 class="display h-md" data-split="chars">Send a message</h2>' +
      W.c.Form({ id: 'contact-form', submit: 'Send message', success: 'Message sent. We will reply soon.', fields: [
        { name: 'name', label: 'Your name', placeholder: 'Alex Namusoke', required: true, auto: 'name' },
        { name: 'email', label: 'Email', type: 'email', placeholder: 'you@example.com', required: true, auto: 'email' },
        { name: 'subject', label: 'Subject', type: 'select', options: ['Joining the club', 'Visiting Jinja', 'Partnership', 'Press', 'Something else'], required: true, full: true },
        { name: 'message', label: 'Message', type: 'textarea', placeholder: 'How can we help?', required: true, full: true }] }) + '</div></div></section>';

    var about = '<section class="section" id="about"><div class="container">' + W.c.SectionHead({ label: 'About us', title: 'Our story' }) +
      '<div class="about-grid"><div class="stack">' + U.list(A.story, function (t) { return '<p class="lead big" data-split="words">' + U.esc(t) + '</p>'; }) +
      '<p class="mission glass" data-reveal>' + W.icon('heart') + '<span>' + U.esc(A.mission) + '</span></p></div>' +
      '<ol class="timeline" data-stagger>' + U.list(A.timeline, function (t) { return '<li id="timeline-' + t.year + '"><b class="display">' + t.year + '</b><span>' + U.esc(t.text) + '</span></li>'; }) + '</ol></div>' +
      '<div class="grid cols-3 values" data-stagger data-float-children="5">' + U.list(A.values, function (v, i) { return '<article class="act-card glass" id="value-' + (i + 1) + '"><span class="act-ic">' + W.icon(v.icon) + '</span><h3 class="display h-sm">' + U.esc(v.title) + '</h3><p class="muted">' + U.esc(v.text) + '</p></article>'; }) + '</div></div></section>';

    var alumni = '<section class="section" id="alumni"><div class="container">' + W.c.SectionHead({ label: 'Once a runner, always a runner', title: 'Alumni', text: 'Friends who ran with us and carried the club to other corners of the world.' }) +
      W.c.Carousel({ id: 'alumni-carousel', label: 'Alumni', items: D.alumni.map(function (a) { return W.c.AlumniCard({ person: a, ctx: 'alumni' }); }) }) + '</div></section>';

    return hero + contact + about + alumni;
  }
};
