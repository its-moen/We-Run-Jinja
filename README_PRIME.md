# We Run Jinja Prime (v8)

Claude's professional take on the same club site. Same codebase and dictionaries as v6, with a different structure and the finishing layer a launch needs.

## What is different from v6, and why
1. **The home page follows the visitor's questions.** What is this, how do I join, is there a group for me, can I trust them (records, founders, films, photos), then depth (record book dropdowns), then join and FAQ. v6 follows the content; Prime follows the visitor.
2. **WhatsApp is the primary call to action.** The hero button, the join section and the floating icon all use one link, built once in `js/components/whatsappFloat.js` from `settings.whatsapp.number`.
3. **A fact bar** answers when, where, who and cost in four lines (`content.facts`).
4. **How it works** shows three steps for a first timer (`content.steps`).
5. **Add to calendar** on the next run card downloads an .ics file, so a runner can save Saturday to their phone.
6. **Founders and films** have their own sections. Videos load only after a tap, which saves visitors' mobile data. A muted looping hero video is supported (`settings.heroVideo.src`).
7. **Search and sharing:** page titles and descriptions, Open Graph image (`assets/og-image.jpg`) for WhatsApp link previews, structured data (SportsClub), `robots.txt`, `sitemap.xml`, `manifest.webmanifest`, favicon.
8. **Calmer motion:** only the main hero word animates letter by letter. Everything else fades in once. No parallax. A visitor can switch motion off in the footer accessibility panel.

## Launch checklist (do these in order)
- [ ] Replace placeholder names, records, news and promos (or connect the Google Sheet: `sheet/README_SHEET.md`).
- [ ] Add real photos: hero, founders, athletes who agreed, gallery. Compress to under 300 KB each.
- [ ] Add the WhatsApp number in `js/data/settings.js` and test the link on a phone.
- [ ] Confirm times and meeting points with the captain.
- [ ] Get consent for any names, photos and results shown. Do not show children's photos without a guardian's consent.
- [ ] Replace `werunjinja.example` with the real domain in the three html heads, `robots.txt`, `sitemap.xml`.
- [ ] Add real social links (`site.socials`) and send test form submissions.
- [ ] Test on a low-end Android phone on mobile data, and in both light and dark mode.
- [ ] Add privacy friendly analytics (for example Plausible or Cloudflare Web Analytics) if the club wants visit numbers.
- [ ] Host as a static site (Cloudflare Pages, Netlify, GitHub Pages) and point the domain.

## Roadmap after launch
1. Weekly results posted from the sheet (one row per run).
2. A members area is not needed yet. Keep WhatsApp for community, the site for discovery.
3. Sponsor strip once the club has partners.
4. Swahili and Luganda copy toggle if visitors ask for it.


## New in v7
- **Platform colours:** WhatsApp, Instagram, X, Facebook, YouTube, TikTok, Strava, LinkedIn, GitHub fade into their brand colours as they scroll into view (`settings.brands`). Black logos turn white in dark mode.
- **Carousels fixed:** cards no longer vanish or get clipped; soft edge fades show there is more to swipe. A bug that stopped clicks on carousel cards with a mouse is fixed.
- **Route maps:** click a route to see it on Google Maps with landmarks. Add a key in `settings.maps.apiKey` (restrict it to your domain). Without a key it shows a route sketch and a free "Open in Google Maps" link. Coordinates in `data/runs.js` (`routeGeo`) are placeholders: replace with real ones or paste a Strava polyline.
- **Groups:** steady runners now 3 to 10 km.
- **One road:** locals enter from the left, foreigners from the right, meet in the middle and morph into one crew, with live counters (`content.oneRoad`).
- **Find your group quiz:** three questions, a suggested group, and a WhatsApp message that already names the group (`data/finder.js`). This is the extra feature.
- **Contact:** founders, developers (photo provision), then alumni.
- **Media dictionary:** films and photos in one list (`data/media.js`): YouTube, video file or image.
- **Soft page backgrounds:** waves on Events, contours on Contact (`settings.background`), light and dark.
- **Safer inputs:** inline validation, email or phone check, input cleaning, spam trap, cool down, offline and timeout messages. Components are wrapped so one bad data row never blanks a page, and broken images hide themselves.
- **Classic home:** the earlier content-first home is kept in `js/pages/home-classic.js`. Switch by setting `<body data-page="home-classic">` in `index.html`.


## New in v8
- **Developers** use the same card as the founders (photo area, role, name, line, bio, social links). Add `photo` in `js/data/developers.js`. Few cards stay centred.
- **Alumni** is a dropdown at the end of the Contact page.
- **Contact is lighter:** contact details and form, the story and timeline, developers, alumni. Values, social rows and the founders cards were removed from this page (founders live on Home, socials in the footer).
- **Animated backgrounds** (`js/components/bgField.js`): flowing waves on Events, slow ripples on Contact. Same structure as a particle field (resize, frame loop, pause when the tab is hidden, still frame for reduced motion). A third style, `particles` (depth squares), is ready to switch on for any page.
- **Dials** in `js/data/settings.js` -> `background`: speed, opacity, fps cap, plus waves (layers, amplitude, wavelength) and ripples (rings, maxRipples, interval, maxRadius). Visitors get a pause button, saved on their device, and "Reduce motion" turns it into still art.
