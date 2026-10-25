/**
 * We Run Jinja | Google Apps Script (CHECKPOINT 3)
 * Paste into Extensions > Apps Script in your Google Sheet, then:
 *   1) Run setupSheets() once. It creates every tab with the right column headers.
 *   2) Deploy > New deployment > type: Web app > Execute as: Me > Who has access: Anyone.
 *   3) Copy the web app URL into js/data/settings.js  ->  sheet.url
 * doGet  : sends every tab as JSON to the website.
 * doPost : saves website forms (join, contact, feedback, reviews) into a tab called "submissions".
 */
var TABS = {
  athletes: ['id','name','country.name','country.code','since','hue','photo','totalKm','runs','races','podiums','streak','pb.5K','pb.10K','pb.21K','pb.42K','legend','bio','show'],
  records: ['id','type','category','km','duration','athleteId','date','location','show'],
  performances: ['distance','label','rank','athleteId','time','date','event','show'],
  routes: ['id','name','km','elevation','level','when','start','tone','points','marks','center','landmarks','path','polyline','show'],
  schedule: ['id','day','dow','time','title','place','main','note','show'],
  events: ['id','title','kind','date','time','place','distance','text','show'],
  groups: ['id','icon','title','range','tag','text','show'],
  activities: ['id','icon','title','text','show'],
  founders: ['id','name','role','since','hue','photo','quote','bio','links','show'],
  developers: ['id','name','role','hue','text','links','show'],
  credits: ['id','name','role','hue','links','show'],
  alumni: ['id','name','country.name','country.code','years','hue','now','quote','show'],
  chain: ['id','role','name','note','show'],
  news: ['id','date','title','tag','show'],
  promos: ['id','title','text','code','show'],
  faq: ['q','a','show'],
  gallery: ['id','src','alt','caption','ratio','show'],
  media: ['id','type','title','caption','youtubeId','src','poster','duration','show'],
  socials: ['id','label','icon','href','show'],
  settings: ['path','value','show']
};

function setupSheets() {
  var ss = SpreadsheetApp.getActive();
  Object.keys(TABS).forEach(function (name) {
    var sh = ss.getSheetByName(name) || ss.insertSheet(name);
    if (sh.getLastRow() === 0) {
      sh.getRange(1, 1, 1, TABS[name].length).setValues([TABS[name]]).setFontWeight('bold').setBackground('#ffe3d3');
      sh.setFrozenRows(1);
    }
  });
}

function doGet() {
  var ss = SpreadsheetApp.getActive(), tz = Session.getScriptTimeZone(), out = {};
  Object.keys(TABS).forEach(function (name) {
    var sh = ss.getSheetByName(name); if (!sh) return;
    var v = sh.getDataRange().getValues(); if (v.length < 2) { out[name] = []; return; }
    var head = v[0].map(String);
    out[name] = v.slice(1).filter(function (r) { return r.some(function (c) { return c !== ''; }); }).map(function (r) {
      var o = {}; head.forEach(function (h, i) { if (h) o[h] = cell(r[i], tz); }); return o;
    });
  });
  return ContentService.createTextOutput(JSON.stringify(out)).setMimeType(ContentService.MimeType.JSON);
}

function cell(v, tz) {
  if (v instanceof Date) return v.getFullYear() < 1950 ? Utilities.formatDate(v, tz, 'HH:mm') : Utilities.formatDate(v, tz, 'yyyy-MM-dd');
  return v;
}

function doPost(e) {
  var lock = LockService.getScriptLock(); lock.waitLock(10000);
  try {
    var data = JSON.parse(e.postData.contents), ss = SpreadsheetApp.getActive();
    var sh = ss.getSheetByName('submissions') || ss.insertSheet('submissions');
    if (sh.getLastRow() === 0) sh.appendRow(['received', 'kind', 'name', 'email', 'details (json)']);
    sh.appendRow([new Date(), data.kind || '', data.name || '', data.email || '', JSON.stringify(data)]);
    return ContentService.createTextOutput('ok');
  } finally { lock.releaseLock(); }
}
