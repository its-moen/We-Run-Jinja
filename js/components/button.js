/* Button({label, href, variant:'primary'|'ghost', icon, size:'sm', attrs}) */
WRJ.c.Button = function (p) {
  var tag = p.href ? 'a' : 'button', href = p.href ? ' href="' + p.href + '"' : ' type="' + (p.type || 'button') + '"';
  return '<' + tag + ' class="btn btn-' + (p.variant || 'primary') + (p.size ? ' btn-' + p.size : '') + '"' + href + ' ' + (p.attrs || '') + '>' +
    '<span>' + WRJ.util.esc(p.label) + '</span><span class="btn-ic">' + WRJ.icon(p.icon || 'arrowUpRight') + '</span></' + tag + '>';
};
