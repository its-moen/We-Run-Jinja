/* settings.js | look and feel as a dictionary. Edit numbers here, nothing else needed.
   Every list is [desktop, tablet, phone] in plain pixels. */
WRJ.data.settings = {
  breakpoints: { tablet: 1024, phone: 640 },
  logo: { text: 'WRJ', mark: 'run', label: 'We Run Jinja home' },
  type: {                       /* font sizes */
    xl: [72, 52, 40],           /* the main word in each hero */
    lg: [32, 27, 23],           /* section titles */
    md: [23, 20, 18],           /* big numbers, card titles */
    sm: [16, 15, 15],           /* small headings */
    body: [14, 14, 13.5],       /* normal text */
    small: [12, 12, 12]         /* captions, chips, meta lines */
  },
  space: {                      /* gaps and padding */
    section: [36, 30, 26],      /* space between page sections */
    gap: [14, 12, 10],
    pad: [40, 22, 14],          /* left and right page padding */
    card: [16, 14, 12],
    scale: [0.65, 0.58, 0.5]    /* multiplies misc spacing */
  },
  radius: { sm: [10, 10, 10], md: [14, 14, 12], lg: [20, 18, 16] },
  whatsapp: {
    number: '',                 /* e.g. '256700000000' (country code, no plus). Empty keeps the link blank */
    message: 'Hello We Run Jinja, I would like to join a run.',
    label: 'Chat on WhatsApp',
    idleOpacity: 0.35           /* how faint it is until hover or tap */
  }
};
