/* theme.js | light/dark swap and accessibility preferences (saved in localStorage when allowed) */
(function (W) {
  var T = W.theme, root = document.documentElement;
  var get = function (k, d) { try { return localStorage.getItem(k) || d; } catch (e) { return d; } };
  var set = function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} };
  T.current = function () { return root.dataset.theme; };
  T.set = function (mode) {
    root.classList.add('theme-anim'); root.dataset.theme = mode; set('wrj-theme', mode);
    var m = document.querySelector('meta[name="theme-color"]'); if (m) m.content = mode === 'dark' ? '#071619' : '#e6edee';
    document.querySelectorAll('[data-theme-toggle]').forEach(function (b) { b.setAttribute('aria-pressed', mode === 'dark'); b.setAttribute('aria-label', mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'); });
    setTimeout(function () { root.classList.remove('theme-anim'); }, 500);
  };
  T.toggle = function () { T.set(T.current() === 'dark' ? 'light' : 'dark'); };
  /* accessibility panel */
  T.a11y = function () { try { return JSON.parse(get('wrj-a11y', '{}')); } catch (e) { return {}; } };
  T.setA11y = function (key, on) {
    var a = T.a11y(); a[key] = on; set('wrj-a11y', JSON.stringify(a)); T.applyA11y();
  };
  T.applyA11y = function () {
    var a = T.a11y();
    a.text ? root.dataset.text = 'lg' : delete root.dataset.text;
    a.contrast ? root.dataset.contrast = 'high' : delete root.dataset.contrast;
    a.motion ? root.dataset.motion = 'reduce' : delete root.dataset.motion;
    if (W.scroll && W.scroll.refresh) W.scroll.refresh();
    if (W.ui.bg) W.ui.bg.sync();
  };
  /* push data/settings.js into CSS variables for the current screen size */
  T.sizeIndex = function () { var bp = W.data.settings.breakpoints, w = innerWidth; return w >= bp.wide ? 0 : w >= bp.desktop ? 1 : w >= bp.tablet ? 2 : 3; };
  T.applySettings = function () {
    var S = W.data.settings, i = T.sizeIndex(), st = root.style, t = S.type, px = function (k, o) { st.setProperty(k, o[i] + 'px'); };
    ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'body'].forEach(function (k) { px('--fs-' + k, t[k]); });
    px('--fs-text-sm', t.small); px('--fs-small', t.caption); px('--fs-btn', t.button);
    st.setProperty('--lh-head', t.lineHeading[i]); st.setProperty('--lh-body', t.lineBody[i]);
    px('--section-y', S.space.section); px('--gap', S.space.gap); px('--pad', S.space.pad); px('--card-pad', S.space.card);
    ['sm', 'md', 'lg'].forEach(function (k) { px('--r-' + k, S.radius[k]); });
  };
  T.init = function () { T.applySettings(); addEventListener('resize', T.applySettings); T.set(T.current() || 'dark'); T.applyA11y(); };
})(window.WRJ);
