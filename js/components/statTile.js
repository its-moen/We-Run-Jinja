/* StatTile({value, suffix, decimals, label, icon, tone}) : number counts up from zero on every entry */
WRJ.c.StatTile = function (p) {
  return '<div class="tile glass' + (p.tone ? ' tile-' + p.tone : '') + '" data-reveal>' +
    '<span class="tile-ic">' + WRJ.icon(p.icon || 'run') + '</span>' +
    '<div class="tile-num display"><span class="num" data-count="' + p.value + '"' + (p.decimals ? ' data-decimals="' + p.decimals + '"' : '') + '>0</span>' + (p.suffix ? '<small>' + WRJ.util.esc(p.suffix) + '</small>' : '') + '</div>' +
    '<p>' + WRJ.util.esc(p.label) + '</p></div>';
};
