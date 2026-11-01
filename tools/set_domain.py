#!/usr/bin/env python3
"""
set_domain.py | replace the placeholder web address everywhere (page headers, robots.txt, sitemap.xml, manifest).
Run from the project folder:   python tools/set_domain.py https://we-run-jinja.vercel.app
Run it again any time you move to a new domain (it replaces whatever address is there now).
"""
import re, sys
from pathlib import Path
if len(sys.argv) != 2 or not sys.argv[1].startswith('http'):
    sys.exit('Usage: python tools/set_domain.py https://your-domain.com')
new = sys.argv[1].rstrip('/')
files = list(Path('.').glob('*.html')) + [Path(x) for x in ('robots.txt', 'sitemap.xml', 'manifest.webmanifest') if Path(x).exists()]
pat = re.compile(r'https?://(?:werunjinja\.example|[a-z0-9.-]+\.vercel\.app|[a-z0-9.-]+\.[a-z]{2,})(?=/|"|\')')
n = 0
for f in files:
    s = f.read_text(encoding='utf-8'); keep = []
    def sub(m):
        u = m.group(0)
        return u if 'fonts.g' in u or 'schema.org' in u or 'sitemaps.org' in u or 'youtube' in u or 'google.com' in u or 'w3.org' in u else new
    t = pat.sub(sub, s)
    if t != s: f.write_text(t, encoding='utf-8'); n += 1; print('updated', f)
print(f'Done. {n} files now use {new}')
