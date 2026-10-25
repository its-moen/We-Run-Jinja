/* Footer() : brand call to action, panels (chain of command, birthdays, news and promotions, feedback, accessibility)
   and link columns. All text comes from data/content.js and data/site.js.
   On phones each panel is a collapsed section; footer links like #chain open the right one. */
(function (W) {
  var U = W.util, C = W.data.content, S = W.data.site;
  function links(arr) { return '<ul>' + U.list(arr, function (l) { return '<li><a href="' + l.href + '">' + U.esc(l.label) + '</a></li>'; }) + '</ul>'; }
  function panel(id, icon, title, body) { return '<details class="fpanel solid" id="' + id + '" open data-reveal><summary><span class="fp-ic">' + W.icon(icon) + '</span><h3 class="display h-sm">' + title + '</h3><span class="faq-plus">' + W.icon('plus') + '</span></summary><div class="fp-body">' + body + '</div></details>'; }
  function toggles() {
    var a = W.theme.a11y();
    return '<ul class="switches">' + [['text', 'Larger text'], ['contrast', 'High contrast'], ['motion', 'Reduce motion']].map(function (t) {
      return '<li><span>' + t[1] + '</span><button class="switch" role="switch" id="a11y-' + t[0] + '" data-a11y="' + t[0] + '" aria-checked="' + !!a[t[0]] + '" aria-label="' + t[1] + '"><i></i></button></li>'; }).join('') + '</ul><p class="muted fp-note">Preferences are saved on this device.</p>';
  }
  function feedback() {
    return W.c.Tabs({ id: 'footer-feedback-tabs', label: 'Feedback type', tabs: [{ key: 'site', label: 'Site feedback' }, { key: 'rate', label: 'Rate and review' }], render: function (k) {
      return k === 'site'
        ? W.c.Form({ id: 'footer-site-feedback', submit: 'Send feedback', success: 'Thanks, your feedback reached the team.', fields: [
            { name: 'topic', label: 'Topic', type: 'select', options: ['Something is broken', 'Idea or request', 'Content correction', 'Other'], required: true, full: true },
            { name: 'message', label: 'Your message', type: 'textarea', placeholder: 'Tell us what to improve', required: true, full: true }] })
        : W.c.Form({ id: 'footer-review', submit: 'Post review', success: 'Thank you for the review.', fields: [
            { name: 'rating', label: 'Rate your experience', type: 'rating', full: true },
            { name: 'name', label: 'Name', placeholder: 'Alex Namusoke', auto: 'name', full: true },
            { name: 'review', label: 'Review', type: 'textarea', placeholder: 'How was your run with us?', full: true }] });
    } });
  }
  W.c.Footer = function () {
    var chain = '<ol class="chain">' + U.list(C.chain, function (r, i) { return W.c.RoleCard({ role: r, index: i, ctx: 'footer' }); }) + '</ol>';
    var news = '<ul class="news">' + U.list(C.news, function (n) { return '<li id="footer-' + n.id + '"><span class="chip">' + U.esc(n.tag) + '</span><div><b>' + U.esc(n.title) + '</b><small class="muted">' + U.fmt(U.date(n.date), { day: 'numeric', month: 'long', year: 'numeric' }) + '</small></div></li>'; }) + '</ul>';
    var promos = '<div class="promos" id="promotions">' + U.list(C.promos, function (x) { return '<div class="promo" id="footer-' + x.id + '"><b>' + W.icon('tag') + U.esc(x.title) + '</b><p>' + U.esc(x.text) + '</p><button class="chip" data-copy="' + U.esc(x.code) + '">Code ' + U.esc(x.code) + '</button></div>'; }) + '</div>';
    return W.c.Credits() + '<footer class="site-footer"><div class="container">' +
      '<div class="footer-cta glass" data-reveal><h2 class="display h-lg" data-split="chars">Run with us</h2><div class="row">' + W.c.Button({ label: 'Join a run', href: 'index.html#join' }) + W.c.Button({ label: 'See events', href: 'events.html', variant: 'ghost' }) + '</div></div>' +
      '<div class="footer-panels">' +
        panel('chain', 'users', 'Chain of command', chain) +
        panel('birthdays', 'cake', 'Birthdays', W.c.BirthdayPanel({ ctx: 'footer', compact: true })) +
        panel('news', 'news', 'News and promotions', news + '<h4 class="bday-head">Promotions and discounts</h4>' + promos) +
        panel('feedback', 'star', 'Feedback and reviews', feedback()) +
        panel('accessibility', 'access', 'Accessibility', toggles()) +
      '</div>' +
      '<div class="footer-links"><div class="footer-brand"><a class="brand" href="index.html"><span class="brand-mark">' + W.icon('run') + '</span><span class="brand-name display">' + U.esc(W.data.settings.logo.text) + '</span></a><p class="muted">' + U.esc(S.name) + ' is a friendly group of locals and foreigners running by the Nile.</p></div>' +
        '<nav aria-label="Resources"><h4>Resources</h4>' + links(C.footer.resources) + '</nav>' +
        '<nav aria-label="Club"><h4>Club</h4>' + links(C.footer.club) + '</nav>' +
        '<nav aria-label="Support"><h4>Support</h4>' + links(C.footer.support) + '</nav>' +
        '<div><h4>Social handles</h4>' + W.c.SocialRow({ links: S.socials, ctx: 'footer' }) + '</div></div>' +
      '<div class="footer-bottom"><p>&copy; ' + new Date().getFullYear() + ' ' + U.esc(S.name) + '. Made in ' + U.esc(S.city) + '.</p><a href="#main" class="chip">Back to top ' + W.icon('arrowUp') + '</a></div></div></footer>';
  };
  W.ui.inits.push(function (scope) {
    if (scope === document) {
      if (innerWidth < 760) document.querySelectorAll('.fpanel').forEach(function (d) { d.removeAttribute('open'); });
      var openFor = function (id) { var t = id && document.getElementById(id); if (t && t.matches('details')) { t.setAttribute('open', ''); setTimeout(function () { t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 30); } };
      document.addEventListener('click', function (e) { var a = e.target.closest('a[href^="#"]'); if (a && a.getAttribute('href').length > 1) { var t = document.getElementById(a.getAttribute('href').slice(1)); if (t) { var d = t.closest('details'); if (d) { d.setAttribute('open', ''); } } } });
      if (location.hash) openFor(location.hash.slice(1));
    }
    scope.querySelectorAll('[data-a11y]').forEach(function (b) {
      if (b._a) return; b._a = true;
      b.addEventListener('click', function () { var on = b.getAttribute('aria-checked') !== 'true'; b.setAttribute('aria-checked', on); W.theme.setA11y(b.dataset.a11y, on); });
    });
    scope.querySelectorAll('[data-copy]').forEach(function (b) {
      if (b._cp) return; b._cp = true;
      b.addEventListener('click', function () { var t = b.textContent; try { navigator.clipboard.writeText(b.dataset.copy); } catch (e) {} b.textContent = 'Copied'; setTimeout(function () { b.textContent = t; }, 1400); });
    });
  });
})(window.WRJ);
