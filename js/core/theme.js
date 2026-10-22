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
  };
  /* push data/settings.js into CSS variables for the current screen size */
  T.applySettings = function () {
    var S = W.data.settings, bp = S.breakpoints, i = innerWidth <= bp.phone ? 2 : innerWidth <= bp.tablet ? 1 : 0, st = root.style;
    ['xl', 'lg', 'md', 'sm', 'body', 'small'].forEach(function (k) { st.setProperty('--fs-' + k, S.type[k][i] + 'px'); });
    st.setProperty('--section-y', S.space.section[i] + 'px'); st.setProperty('--gap', S.space.gap[i] + 'px');
    st.setProperty('--pad', S.space.pad[i] + 'px'); st.setProperty('--card-pad', S.space.card[i] + 'px'); st.setProperty('--s', S.space.scale[i]);
    ['sm', 'md', 'lg'].forEach(function (k) { st.setProperty('--r-' + k, S.radius[k][i] + 'px'); });
  };
  T.init = function () { T.applySettings(); addEventListener('resize', T.applySettings); T.set(T.current() || 'dark'); T.applyA11y(); };
})(window.WRJ);
