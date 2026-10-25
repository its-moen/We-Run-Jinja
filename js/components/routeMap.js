/* RouteDetail + WRJ.ui.openRoute(id) : click a route card to see the route on a real map with landmarks.
   Settings: data/settings.js -> maps {apiKey, mapId, zoom, center}.  Geo data: data/runs.js -> routeGeo (or sheet columns).
   No API key, no internet, a bad key or a blocked script: the pop up still works with a route sketch, the landmark list
   and an "Open in Google Maps" link (which needs no key). */
(function (W) {
  var U = W.util, loading;
  function geo(r) { var g = (W.data.routeGeo || {})[r.id] || {}; return { center: r.center || g.center, landmarks: r.landmarks || g.landmarks || [], path: r.path || g.path, polyline: r.polyline || g.polyline }; }
  function decode(str) { /* Google encoded polyline */
    var i = 0, lat = 0, lng = 0, out = [];
    while (i < str.length) {
      for (var k = 0, shift = 0, b, res = 0; k < 2; k++, shift = 0, res = 0) {
        do { b = str.charCodeAt(i++) - 63; res |= (b & 31) << shift; shift += 5; } while (b >= 32);
        var d = (res & 1) ? ~(res >> 1) : (res >> 1); if (k === 0) lat += d; else lng += d;
      }
      out.push([lat / 1e5, lng / 1e5]);
    }
    return out;
  }
  function coords(r) {
    var g = geo(r), m = W.data.settings.maps;
    try { if (g.polyline) return { pts: decode(g.polyline), approx: false }; } catch (e) {}
    if (g.path && g.path.length > 1) return { pts: g.path, approx: false };
    var c = g.center || [m.center.lat, m.center.lng];
    return { pts: (r.points || []).map(function (p) { return [c[0] + (30 - p[1]) * 0.00022, c[1] + (p[0] - 50) * 0.0004]; }), approx: true };
  }
  function gmapsLink(pts) {
    if (!pts.length) return 'https://www.google.com/maps';
    var f = pts[0], l = pts[pts.length - 1], step = Math.max(1, Math.floor(pts.length / 8)), way = pts.filter(function (p, i) { return i > 0 && i < pts.length - 1 && i % step === 0; }).slice(0, 8);
    return 'https://www.google.com/maps/dir/?api=1&travelmode=walking&origin=' + f[0].toFixed(5) + ',' + f[1].toFixed(5) + '&destination=' + l[0].toFixed(5) + ',' + l[1].toFixed(5) + (way.length ? '&waypoints=' + way.map(function (p) { return p[0].toFixed(5) + ',' + p[1].toFixed(5); }).join('%7C') : '');
  }
  W.c.RouteDetail = function (r) {
    var g = geo(r), c = coords(r);
    return '<div class="route-detail"><span class="chip">' + W.icon('route') + U.esc(r.level) + '</span><h3 class="display h-md">' + U.esc(r.name) + '</h3>' +
      '<ul class="route-facts"><li><b class="num">' + r.km + '</b> km</li><li><b class="num">' + r.elevation + '</b> m climb</li><li>' + U.esc(r.when) + '</li><li>' + W.icon('pin') + U.esc(r.start) + '</li></ul>' +
      '<div class="map-live" id="route-map-live"><div class="map-sketch">' + W.c.RouteMap(r) + '</div></div>' +
      '<p class="map-status muted" id="route-map-status" role="status">' + (W.data.settings.maps.apiKey ? 'Loading map...' : 'Showing the route sketch. Add a Google Maps key in settings to see the live map.') + '</p>' +
      (c.approx ? '<p class="map-note">Approximate line. The exact GPS trace will replace it.</p>' : '') +
      (g.landmarks.length ? '<h4 class="display h-sm">Landmarks</h4><ul class="landmarks">' + U.list(g.landmarks, function (l, i) { return '<li><button type="button" class="landmark" data-landmark="' + i + '"><span class="landmark-n">' + (i + 1) + '</span><span><b>' + U.esc(l.name) + '</b><small>' + U.esc(l.note || '') + '</small></span></button></li>'; }) + '</ul>' : '') +
      '<div class="row">' + W.c.Button({ label: 'Open in Google Maps', href: gmapsLink(c.pts), icon: 'pin', attrs: 'target="_blank" rel="noopener"', size: 'sm' }) + '</div></div>';
  };
  function loadMaps() {
    var m = W.data.settings.maps; if (window.google && google.maps) return Promise.resolve();
    if (!m.apiKey) return Promise.reject(new Error('nokey'));
    if (loading) return loading;
    loading = new Promise(function (res, rej) {
      var t = setTimeout(function () { loading = null; rej(new Error('timeout')); }, 10000);
      window.__wrjMaps = function () { clearTimeout(t); res(); };
      window.gm_authFailure = function () { clearTimeout(t); loading = null; rej(new Error('auth')); };
      var s = document.createElement('script'); s.async = true; s.src = 'https://maps.googleapis.com/maps/api/js?key=' + encodeURIComponent(m.apiKey) + '&callback=__wrjMaps&v=weekly';
      s.onerror = function () { clearTimeout(t); loading = null; rej(new Error('load')); }; document.head.appendChild(s);
    });
    return loading;
  }
  var DARK = [{ elementType: 'geometry', stylers: [{ color: '#14272b' }] }, { elementType: 'labels.text.fill', stylers: [{ color: '#9bb3b0' }] }, { elementType: 'labels.text.stroke', stylers: [{ color: '#071619' }] }, { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#0b3a55' }] }, { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#24454b' }] }];
  function draw(r) {
    var m = W.data.settings.maps, g = geo(r), c = coords(r), box = document.getElementById('route-map-live'), st = document.getElementById('route-map-status');
    var opts = { zoom: m.zoom, center: { lat: c.pts[0][0], lng: c.pts[0][1] }, mapTypeControl: false, streetViewControl: false, fullscreenControl: true };
    if (m.mapId) opts.mapId = m.mapId; else if (W.theme.current() === 'dark') opts.styles = DARK;
    box.innerHTML = ''; var map = new google.maps.Map(box, opts);
    var line = new google.maps.Polyline({ path: c.pts.map(function (p) { return { lat: p[0], lng: p[1] }; }), strokeColor: '#ff7a3c', strokeWeight: 5, strokeOpacity: .95 }); line.setMap(map);
    var bounds = new google.maps.LatLngBounds(); c.pts.forEach(function (p) { bounds.extend({ lat: p[0], lng: p[1] }); });
    var info = new google.maps.InfoWindow(), marks = g.landmarks.map(function (l, i) {
      var mk = new google.maps.Marker({ position: { lat: l.lat, lng: l.lng }, map: map, label: String(i + 1), title: l.name }); bounds.extend(mk.getPosition());
      mk.addListener('click', function () { info.setContent('<b>' + U.esc(l.name) + '</b><br>' + U.esc(l.note || '')); info.open(map, mk); }); return mk;
    });
    map.fitBounds(bounds, 40);
    document.querySelectorAll('[data-landmark]').forEach(function (b) { b.addEventListener('click', function () { var i = +b.dataset.landmark; map.panTo(marks[i].getPosition()); map.setZoom(16); google.maps.event.trigger(marks[i], 'click'); }); });
    st.textContent = 'Tap a landmark to centre the map on it.';
  }
  W.ui.openRoute = function (id) {
    var r = W.data.routes.find(function (x) { return x.id === id; }); if (!r) return;
    W.ui.openModal(W.c.RouteDetail(r), r.name + ' map');
    loadMaps().then(function () { draw(r); }).catch(function (e) {
      var st = document.getElementById('route-map-status'); if (!st) return;
      st.textContent = e.message === 'nokey' ? 'Showing the route sketch. Add a Google Maps key in settings to see the live map.' : 'The live map could not load (' + e.message + '). Showing the route sketch instead.';
      document.querySelectorAll('[data-landmark]').forEach(function (b) { b.disabled = true; });
    });
  };
  W.ui.inits.push(function () {
    if (document._rt) return; document._rt = true;
    document.addEventListener('click', function (e) { var el = e.target.closest('[data-open-route]'); if (el) W.ui.openRoute(el.dataset.openRoute); });
    document.addEventListener('keydown', function (e) { if ((e.key === 'Enter' || e.key === ' ') && e.target.matches('[data-open-route]')) { e.preventDefault(); W.ui.openRoute(e.target.dataset.openRoute); } });
  });
})(window.WRJ);
