/* SaturdaySteps() : four photo cards that walk a newcomer through a Saturday. Words: content.saturday. Photos: tags meet, warmup, run, coffee. */
WRJ.c.SaturdaySteps = function () {
  var W = WRJ, U = W.util, S = W.data.content.saturday; if (!S) return '';
  return '<section class="section" id="saturday-steps"><div class="container">' + W.c.SectionHead({ label: S.label, title: S.title, text: S.text }) +
    '<ol class="steps-photo" data-stagger>' + U.list(S.steps, function (s) {
      var ph = U.photo(s.tag, 0);
      return '<li class="step-photo" id="' + U.uid('sat-step', s.n) + '"><div class="step-img">' + (ph ? '<img src="' + U.esc(ph.src) + '" alt="' + U.esc(ph.alt || s.title) + '" loading="lazy">' : '') + '<span class="step-n display">' + s.n + '</span></div><div class="step-text"><h3 class="display h-sm">' + U.esc(s.title) + '</h3><p class="muted">' + U.esc(s.text) + '</p></div></li>';
    }) + '</ol></div></section>';
};
