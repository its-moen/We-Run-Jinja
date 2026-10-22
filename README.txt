WE RUN JINJA WEBSITE
====================
Three pages (index.html, events.html, contact.html) built from reusable components.
No build tools. Open index.html in a browser, or upload the whole folder to any static host.

FOLDERS
  css/base.css         colours (light + dark), type, layout, animation states
  css/components.css   one block per component
  css/pages.css        page specific layout
  js/core/             util, icons, motion (scroll animations), scroll (pinned + parallax), theme, ui
  js/data/             ALL CONTENT (dictionaries). Edit these files to change the site:
      site.js          schedule, stats, contact details, social links, form endpoint
      athletes.js      members (cards, rankings, profiles, birthdays, hall of fame)
      runs.js          latest records, top performances, routes
      events.js        pace groups (seed walkers 1 to 4 km, aerobics, steady, long), key activities, one off events, birthday text
      content.js       hero copy, about us, FAQ, footer lists, chain of command, news, promos
      developers.js    developer credit people and their (blank) social links
      credits.js       credits band (uses developers + extra contributors)
      settings.js      sizes, spacing, logo, WhatsApp
      alumni.js        alumni cards
      gallery.js       gallery photos
  js/components/       reusable components (call them like WRJ.c.AthleteCard({athlete}))
  js/pages/            home.js, events.js, contact.js assemble sections from components
  assets/              hero image + gallery photos (replace with real club photos)
  legacy/index-v1.html the original single file version, kept for reference

HOW TO ADD THINGS
  New athlete:   copy a block in js/data/athletes.js. Add  photo:'assets/athletes/name.jpg'  for a real picture.
  New record:    add a line to WRJ.data.records in js/data/runs.js (pace is calculated).
  New event:     add a line to WRJ.data.events in js/data/events.js.
  Birthday run:  third Saturday dates are generated automatically (Events page, hero card, footer).
  Social links:  js/data/site.js (club) and js/data/developers.js (credits). '#' means blank.
  Real forms:    paste a Formspree or Apps Script URL into formEndpoint in js/data/site.js.
  New component: add js/components/yourThing.js, list it in js/boot.js, call WRJ.c.YourThing({...}).

ANIMATION HOOKS (any element, anywhere)
  data-reveal="up|left|right|zoom|fade|clip"   fades/slides in, resets when it leaves the screen
  data-split="chars|words"                      letters or words rise in one by one
  data-count="1240"                             number counts up from 0 every time it appears
  data-stagger                                  children appear one after another
  data-delay="200"                              extra delay in ms

BEFORE LAUNCH
  Times, meeting points, route distances, records, member names, news and promotions are PLACEHOLDERS.
  Replace them with confirmed information. Gallery photos are crops of the Jinja Bridge image.
  Accessibility panel (footer) and light/dark choice are saved on the visitor's device.

LOOK AND FEEL (v3)  all in js/data/settings.js
  Font sizes, spacing, corner radius: lists of [desktop, tablet, phone] pixels. No viewport units are used.
  Logo text (WRJ) and logo icon.
  WhatsApp button: number, message, label and idle opacity. Empty number keeps the link blank.
  Header: logo pill, nav pill and theme button are separate pieces. Nav items are in js/data/site.js.
  Credits band above every footer: js/data/credits.js (developers plus anyone else who helped).
  Parallax: data-float="30" (drifts up/down), data-shiftx="120" (drifts sideways),
            data-float-children="16" (children drift in alternating directions), data-parallax (backgrounds).
