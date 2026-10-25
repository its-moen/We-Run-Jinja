/* SocialRow({links, owner, ctx}) : round platform buttons. They start neutral and fade into the platform colour
   as they scroll into view (colours: data/settings.js -> brands).  links: [{icon,label,href}] */
(function (W) {
  W.c.SocialRow = function (p) {
    var U = W.util, B = W.data.settings.brands, owner = p.owner ? p.owner + ' ' : '';
    return '<ul class="social-row" data-stagger>' + U.list(p.links, function (l, i) {
      var b = B[l.icon] || { bg: 'var(--accent)', fg: 'var(--on-accent)' };
      var style = '--b-bg:' + b.bg + ';--b-fg:' + b.fg + ';--b-bg-d:' + (b.bgDark || b.bg) + ';--b-fg-d:' + (b.fgDark || b.fg);
      var id = p.ctx ? ' id="' + U.uid(p.ctx, p.owner || '', 'social', l.id || l.icon, i + 1) + '"' : '';
      return '<li data-reveal="fade"><a class="icon-btn brand-btn"' + id + ' href="' + U.esc(l.href || '#') + '" target="_blank" rel="noopener" aria-label="' + U.esc(owner + (l.label || l.icon)) + '" style="' + style + '">' + W.icon(l.icon) + '</a></li>';
    }) + '</ul>';
  };
})(window.WRJ);
