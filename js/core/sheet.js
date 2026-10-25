/* sheet.js | CHECKPOINT 3: content from a Google Sheet.
   If data/settings.js has sheet.url, the site downloads every tab as JSON, turns the rows into the same dictionaries
   the site already uses, and renders with those. If anything fails it silently keeps the local dictionaries.
   Column rules (see sheet/README_SHEET.md):
     country.name, pb.5K   a dot makes a nested object
     links                 github:https://...|linkedin:https://...
     points                x,y;x,y;x,y            marks   index:label|index:label
     center                lat,lng   path  lat,lng;lat,lng   landmarks  name:lat,lng:note|name:lat,lng:note
     show                  FALSE hides a row without deleting it                                                  */
(function (W) {
  var S = W.sheet = {}, KEY = 'wrj-sheet';
  var cfg = function () { return W.data.settings.sheet || {}; };
  S.enabled = function () { return !!cfg().url; };

  function nest(row) {
    var o = {};
    Object.keys(row).forEach(function (k) {
      var v = row[k]; if (v === '' || v == null) return;
      var parts = k.split('.'), t = o;
      parts.slice(0, -1).forEach(function (p) { t = t[p] = t[p] || {}; });
      t[parts[parts.length - 1]] = v;
    });
    return o;
  }
  function visible(rows) { return (rows || []).filter(function (r) { return !(r.show === false || String(r.show).toUpperCase() === 'FALSE'); }); }
  function list(rows) { return visible(rows).map(function (r) { var o = nest(r); delete o.show; return o; }); }
  function links(str) {
    return String(str || '').split('|').filter(Boolean).map(function (p) {
      var i = p.indexOf(':'), icon = p.slice(0, i).trim(), href = p.slice(i + 1).trim();
      return { icon: icon, label: icon.charAt(0).toUpperCase() + icon.slice(1), href: href || '#' };
    });
  }
  function setPath(obj, path, val) {
    var p = path.split('.'), t = obj;
    for (var i = 0; i < p.length - 1; i++) { if (typeof t[p[i]] !== 'object' || t[p[i]] === null) t[p[i]] = {}; t = t[p[i]]; }
    t[p[p.length - 1]] = val;
  }

  /* tab name -> function(rows) that updates WRJ.data */
  var map = {
    athletes:    function (r) { W.data.athletes = list(r); },
    records:     function (r) { W.data.records = list(r); },
    events:      function (r) { W.data.events = list(r); },
    groups:      function (r) { W.data.groups = list(r); },
    activities:  function (r) { W.data.activities = list(r); },
    schedule:    function (r) { W.data.site.schedule = list(r).map(function (x) { x.main = x.main === true || String(x.main).toUpperCase() === 'TRUE'; x.dow = +x.dow; return x; }); },
    routes:      function (r) {
      W.data.routes = list(r).map(function (x) {
        x.points = String(x.points || '').split(';').filter(Boolean).map(function (p) { return p.split(',').map(Number); });
        x.marks = String(x.marks || '').split('|').filter(Boolean).map(function (m) { var i = m.indexOf(':'); return { at: +m.slice(0, i), label: m.slice(i + 1) }; });
        if (x.center) x.center = String(x.center).split(',').map(Number);          /* lat,lng */
        if (x.path) x.path = String(x.path).split(';').filter(Boolean).map(function (p) { return p.split(',').map(Number); });   /* lat,lng;lat,lng */
        if (x.landmarks) x.landmarks = String(x.landmarks).split('|').filter(Boolean).map(function (l) { var a = l.split(':'), c = (a[1] || '').split(','); return { name: a[0], lat: +c[0], lng: +c[1], note: a.slice(2).join(':') }; });   /* name:lat,lng:note */
        return x;
      });
    },
    performances: function (r) {
      var out = {};
      visible(r).sort(function (a, b) { return a.rank - b.rank; }).forEach(function (x) {
        var d = out[x.distance] = out[x.distance] || { label: x.label || x.distance, list: [] };
        d.list.push({ athleteId: x.athleteId, time: String(x.time), date: x.date, event: x.event });
      });
      if (Object.keys(out).length) W.data.performances = out;
    },
    news:        function (r) { W.data.content.news = list(r); },
    promos:      function (r) { W.data.content.promos = list(r); },
    chain:       function (r) { W.data.content.chain = list(r); },
    faq:         function (r) { W.data.content.faq = list(r); },
    gallery:     function (r) { W.data.gallery = list(r); },
    alumni:      function (r) { W.data.alumni = list(r); },
    media:       function (r) { W.data.media = list(r); },
    videos:      function (r) { W.data.media = list(r); },   /* old tab name, still accepted */
    socials:     function (r) { W.data.site.socials = list(r); },
    founders:    function (r) { W.data.founders = list(r).map(function (x) { x.links = links(x.links); return x; }); },
    developers:  function (r) { W.data.developers = list(r).map(function (x) { x.links = links(x.links); return x; }); },
    credits:     function (r) { S._extras = list(r).map(function (x) { x.links = links(x.links); return x; }); },
    settings:    function (r) { visible(r).forEach(function (x) { if (x.path) setPath(W.data, String(x.path), x.value); }); }
  };

  S.apply = function (data) {
    if (S._orig === undefined) S._orig = W.data.credits.people.filter(function (p) { return !W.data.developers.some(function (d) { return d.id === p.id; }); });
    Object.keys(map).forEach(function (tab) {
      if (data[tab] && data[tab].length) { try { map[tab](data[tab]); } catch (e) { console.warn('WRJ sheet: tab "' + tab + '" skipped', e); } }
    });
    W.data.credits.people = W.data.developers.concat(S._extras || S._orig);
  };

  function fetchData(ms) {
    var u = cfg().url + (cfg().url.indexOf('?') > -1 ? '&' : '?') + 't=' + Date.now(), ctl = window.AbortController ? new AbortController() : null, to;
    if (ctl) to = setTimeout(function () { ctl.abort(); }, ms || cfg().timeoutMs || 3500);
    return fetch(u, ctl ? { signal: ctl.signal } : {}).then(function (r) { clearTimeout(to); if (!r.ok) throw new Error('sheet ' + r.status); return r.json(); });
  }
  function read() { try { return JSON.parse(localStorage.getItem(KEY)); } catch (e) { return null; } }
  function save(d) { try { localStorage.setItem(KEY, JSON.stringify({ t: Date.now(), data: d })); } catch (e) {} }

  /* returns a promise that always resolves: cached data renders instantly, fresh data is fetched in the background when the cache is old */
  S.load = function () {
    var c = read(), ttl = (cfg().cacheMinutes || 10) * 60000;
    if (c && c.data) {
      S.apply(c.data);
      if (Date.now() - c.t > ttl) fetchData(8000).then(save).catch(function () {});
      return Promise.resolve();
    }
    return fetchData().then(function (d) { save(d); S.apply(d); }).catch(function (e) { console.warn('WRJ sheet: using local content', e); });
  };
})(window.WRJ);
