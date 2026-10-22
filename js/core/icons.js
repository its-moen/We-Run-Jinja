(function (W) {
  var P = {
    arrowUpRight:'<path d="M7 17 17 7M8 7h9v9"/>', arrowRight:'<path d="M5 12h14M13 6l6 6-6 6"/>', arrowLeft:'<path d="M19 12H5M11 6l-6 6 6 6"/>',
    arrowUp:'<path d="M12 19V5M6 11l6-6 6 6"/>', arrowDown:'<path d="M12 5v14M6 13l6 6 6-6"/>',
    sun:'<circle cx="12" cy="12" r="4"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6 7 7M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4"/>',
    moon:'<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/>', close:'<path d="M6 6l12 12M18 6 6 18"/>',
    pin:'<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',
    clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>', calendar:'<path d="M4 6h16v14H4zM4 10h16M8 3v4M16 3v4"/>',
    cake:'<path d="M4 20h16M5 20v-6h14v6M5 14c2 0 2-2 3.5-2S11 14 12 14s1.5-2 3.5-2S17 14 19 14M12 12V8M12 8c-1-1-1-2 0-3 1 1 1 2 0 3z"/>',
    trophy:'<path d="M8 4h8v5a4 4 0 0 1-8 0zM8 6H5a3 3 0 0 0 3 4M16 6h3a3 3 0 0 1-3 4M12 13v4M9 21h6M10 17h4v4h-4z"/>',
    run:'<circle cx="15" cy="5" r="2"/><path d="M4 21l4-6 3 2 2-4-3-3-4 2M13 11l3 3 4-1M11 17l3 4"/>',
    home:'<path d="M4 11l8-7 8 7v9H4zM10 20v-6h4v6"/>', users:'<path d="M16 19v-1a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v1M9.5 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM21 19v-1a4 4 0 0 0-3-3.8M15.500 4.2a3.500 3.500 0 0 1 0 6.600"/>',
    mail:'<path d="M4 6h16v12H4zM4 7l8 6 8-6"/>', phone:'<path d="M6 3h3l2 5-2 1.500a11 11 0 0 0 5.500 5.500L16 13l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 4 5a2 2 0 0 1 2-2z"/>',
    star:'<path d="M12 3l2.700 5.600 6.100.9-4.400 4.300 1 6.100L12 17l-5.400 2.900 1-6.100L3.200 9.500l6.100-.9z"/>', check:'<path d="M5 12l5 5 9-10"/>', plus:'<path d="M12 5v14M5 12h14"/>',
    instagram:'<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.200" cy="6.800" r=".6" fill="currentColor"/>',
    facebook:'<path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8z"/>', x:'<path d="M4 4l16 16M20 4 4 20"/>',
    youtube:'<path d="M3 7a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3z"/><path d="M10 9l5 3-5 3z"/>',
    tiktok:'<path d="M14 4v10.500a3.500 3.500 0 1 1-3.500-3.500M14 4c.5 2.500 2 4 5 4"/>',
    whatsapp:'<path d="M4 20l1.300-4.200A8 8 0 1 1 8.400 18.800z"/><path d="M9 9c0 3 3 6 6 6l1-1.500-2-1-1 .7c-1-.4-1.800-1.200-2.200-2.200l.7-1-1-2z"/>',
    strava:'<path d="M10 3l5 10h-3.300L10 9.500 8.300 13H5zM15 13l2.200 4.400L19.400 13H22l-4.800 9-4.700-9z"/>',
    github:'<path d="M9 19c-4 1-4-2-6-2m12 4v-3.200a2.800 2.800 0 0 0-.8-2.200c2.700-.3 5.500-1.300 5.500-6a4.600 4.600 0 0 0-1.300-3.200 4.300 4.300 0 0 0-.1-3.200s-1-.3-3.300 1.300a11.500 11.500 0 0 0-6 0C7.700 3.800 6.700 4.100 6.700 4.100a4.300 4.300 0 0 0-.1 3.200A4.600 4.600 0 0 0 5.300 10.500c0 4.600 2.800 5.700 5.500 6a2.800 2.800 0 0 0-.8 2.200V21"/>',
    linkedin:'<path d="M6 9v11M6 5v.01M10 20v-7a3 3 0 0 1 6 0v7M10 9v11"/>', globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
    heart:'<path d="M12 20s-7-4.400-7-10a4 4 0 0 1 7-2.500A4 4 0 0 1 19 10c0 5.600-7 10-7 10z"/>', medal:'<path d="M8 3l4 6 4-6"/><circle cx="12" cy="15" r="6"/>',
    route:'<circle cx="6" cy="17" r="2"/><circle cx="18" cy="7" r="2"/><path d="M8 17h6a3 3 0 0 0 0-6h-4a3 3 0 0 1 0-6h6"/>',
    access:'<circle cx="12" cy="4" r="1.200"/><path d="M5 8l7 1 7-1M12 9v5M9 21l3-7 3 7"/>', mountain:'<path d="M3 20l6-11 4 6 3-4 5 9z"/>',
    gift:'<path d="M4 10h16v10H4zM3 7h18v3H3zM12 7v13M12 7c-2-4-6-3-5 0M12 7c2-4 6-3 5 0"/>', news:'<path d="M5 4h12v16H5zM17 8h3v10a2 2 0 0 1-2 2M8 8h6M8 12h6M8 16h4"/>',
    tag:'<path d="M3 12V4h8l10 10-8 8z"/><circle cx="7.500" cy="8.500" r="1.200"/>', help:'<circle cx="12" cy="12" r="9"/><path d="M9.500 9.500a2.500 2.500 0 1 1 3.500 2.300c-.7.400-1 .9-1 1.700M12 17v.01"/>',
    link:'<path d="M10 14a4 4 0 0 0 5.700 0l3-3a4 4 0 0 0-5.700-5.700l-1 1M14 10a4 4 0 0 0-5.700 0l-3 3A4 4 0 0 0 11 18.700l1-1"/>', book:'<path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3zM5 17a3 3 0 0 1 3-3h11"/>'
  };
  W.icon = function (name, cls) {
    return '<svg class="i ' + (cls || '') + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (P[name] || P.run) + '</svg>';
  };
})(window.WRJ);
