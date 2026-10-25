/* settings.js | look, feel and connections as one dictionary. Edit numbers here, nothing else needed.
   Every size list is [wide 1440+, desktop 1024-1439, tablet 768-1023, mobile 320-767] in plain pixels. */
WRJ.data.settings = {
  breakpoints: { wide: 1440, desktop: 1024, tablet: 768 },
  logo: { text: 'WRJ', mark: 'run', label: 'We Run Jinja home' },
  type: {
    h1: [64, 52, 40, 34],        /* page title (main hero word): top of your 56-64 / 44-52 / 36-40 / 30-34 ranges */
    h2: [44, 38, 31, 26],        /* section titles */
    h3: [31, 28, 25, 21],        /* card titles, big numbers */
    h4: [25, 23, 21, 19],
    h5: [21, 20, 19, 17],
    h6: [19, 18, 17, 16],
    body: [18, 16, 16, 16],
    small: [15, 14, 14, 14],     /* secondary text */
    caption: [13, 13, 13, 12],   /* chips, meta lines */
    button: [17, 16, 16, 16],    /* buttons and nav */
    lineHeading: [1.15, 1.15, 1.15, 1.15],
    lineBody: [1.6, 1.6, 1.6, 1.6]
  },
  space: {
    section: [48, 44, 36, 30],   /* space between page sections */
    gap: [18, 16, 14, 12],
    pad: [40, 32, 24, 16],       /* left and right page padding */
    card: [20, 18, 16, 14]
  },
  radius: { sm: [10, 10, 10, 10], md: [14, 14, 14, 12], lg: [20, 20, 18, 16] },
  /* Animated page backgrounds (canvas). One entry per page. type: 'waves' | 'ripples' | 'particles' | 'none'.
     Every number is a dial: speed (1 = calm default, 0.5 = slower), opacity (strength), fps (frame cap, 30 saves battery).
     waves: layers, amplitude (px), wavelength (px).   ripples: rings, maxRipples, interval (seconds), maxRadius (px).
     particles (depth squares): count, size, speedDepth. Visitors can pause with the button, and "Reduce motion" turns them into still art. */
  background: {
    home: 'none',
    events: { type: 'waves', speed: 1, opacity: 1, fps: 60, layers: 5, amplitude: 26, wavelength: 460 },
    contact: { type: 'ripples', speed: 1, opacity: 1, fps: 60, rings: 3, maxRipples: 5, interval: 2.8, maxRadius: 340 }
  },
  hero: {                        /* inner page heroes (Events, Contact): height as a share of the window height, [wide, desktop, tablet, phone] */
    ratio: [0.38, 0.40, 0.50, 0.52],
    min: 300, max: 640           /* px limits */
  },
  motion: { splitAll: false },   /* true = every heading animates letter by letter. false = only the main hero word */
  heroVideo: { src: '', poster: '' },   /* e.g. 'assets/video/hero.mp4' for a muted looping hero video */
  whatsapp: {
    number: '',                  /* e.g. '256700000000' (country code, no plus). Empty keeps the link blank */
    message: 'Hello We Run Jinja, I would like to join a run.',
    label: 'Chat on WhatsApp',
    idleOpacity: 0.9
  },
  seo: {                          /* used by the head tags and structured data in the html pages */
    siteUrl: 'https://werunjinja.example',
    title: 'We Run Jinja | Running club in Jinja, Uganda',
    description: 'A friendly running club of locals and foreigners in Jinja, Uganda. Saturday runs for every pace, from 1 km seed walkers to 21 km long runs.'
  },
  /* platform colours. bg/fg are used in light mode; bgDark/fgDark override in dark mode (black logos turn white). */
  brands: {
    whatsapp:  { bg: '#25D366', fg: '#fff' },
    instagram: { bg: 'linear-gradient(45deg,#f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)', fg: '#fff' },
    facebook:  { bg: '#1877F2', fg: '#fff' },
    x:         { bg: '#000', fg: '#fff', bgDark: '#fff', fgDark: '#000' },
    youtube:   { bg: '#FF0000', fg: '#fff' },
    tiktok:    { bg: '#000', fg: '#fff', bgDark: '#fff', fgDark: '#000' },
    strava:    { bg: '#FC4C02', fg: '#fff' },
    linkedin:  { bg: '#0A66C2', fg: '#fff' },
    github:    { bg: '#181717', fg: '#fff', bgDark: '#fff', fgDark: '#181717' },
    mail:      { bg: '#EA4335', fg: '#fff' },
    phone:     { bg: '#34A853', fg: '#fff' },
    globe:     { bg: '#4285F4', fg: '#fff' }
  },
  maps: {                         /* Google Maps for route pop ups. Empty apiKey = built in route sketch + "Open in Google Maps" link */
    apiKey: '',                   /* restrict this key to your domain in Google Cloud Console */
    mapId: '',
    zoom: 14,
    center: { lat: 0.4244, lng: 33.2041 }
  },
  sheet: {
    url: '',                     /* Google Apps Script web app URL (see sheet/README_SHEET.md). Empty = use the local dictionaries */
    cacheMinutes: 10,
    timeoutMs: 3500
  }
};
