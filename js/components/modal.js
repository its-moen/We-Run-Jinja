/* Modal: WRJ.ui.openModal(html, label). Any element with data-modal-close also closes it. */
(function (W) {
  var dlg;
  function ensure() {
    if (dlg) return dlg;
    dlg = document.createElement('dialog'); dlg.className = 'modal'; dlg.id = 'wrj-modal';
    dlg.innerHTML = '<div class="modal-body"><button class="icon-btn modal-x" data-modal-close aria-label="Close">' + W.icon('close') + '</button><div class="modal-content"></div></div>';
    document.body.appendChild(dlg);
    dlg.addEventListener('click', function (e) { if (e.target === dlg || e.target.closest('[data-modal-close]')) dlg.close(); });
    dlg.addEventListener('close', function () { document.documentElement.classList.remove('modal-open'); });
    return dlg;
  }
  W.ui.openModal = function (html, label) {
    var d = ensure(), c = d.querySelector('.modal-content');
    d.setAttribute('aria-label', label || 'Details'); c.innerHTML = html;
    document.documentElement.classList.add('modal-open');
    if (!d.open) d.showModal();
    W.motion.scan(c);
    /* in a dialog, elements are visible immediately: force entry state */
    requestAnimationFrame(function () { c.querySelectorAll('[data-reveal],[data-split],[data-count]').forEach(function (el) { el.classList.add('in'); if (el._enter) el._enter(); }); });
  };
})(window.WRJ);
