#!/usr/bin/env python3
"""
prepare_images.py  |  turn a folder of big phone photos into small web photos, and write the lines you paste into the site.

WHAT IT DOES
  1. Reads every .jpg .jpeg .png .webp in the input folder.
  2. Fixes rotation, REMOVES hidden data (GPS location, camera info) and resizes to a web size.
  3. Saves two files per photo as WebP:  assets/photos/<name>.webp (big) and assets/photos/thumbs/<name>.webp (small).
  4. Writes photos.csv  (paste into the Google Sheet tab "photos") and photos.js (paste into js/data/photos.js).
  5. Optional --sheet makes contact-sheet images with numbers, so you can pick your best 30 to 40 from 200+.

HOW TO RUN (needs Python 3 and Pillow:  pip install pillow)
  python tools/prepare_images.py --in my_photos --out assets/photos --tag people
  python tools/prepare_images.py --in my_photos --sheet           # contact sheets only, to choose photos first
Options: --width 1600  --thumb 600  --quality 78  --tag people  --limit 40
iPhone HEIC files: export or convert them to JPG first (Photos app > Export), or  pip install pillow-heif  then rename.
"""
import argparse, csv, os, re, sys
from pathlib import Path
try:
    from PIL import Image, ImageOps, ImageDraw
except ImportError:
    sys.exit("Pillow is missing. Run:  pip install pillow")

EXT = {'.jpg', '.jpeg', '.png', '.webp'}

def slug(name):
    s = re.sub(r'[^a-z0-9]+', '-', name.lower()).strip('-')
    return s or 'photo'

def load(path):
    im = Image.open(path); im = ImageOps.exif_transpose(im)      # fix rotation
    if im.mode not in ('RGB', 'RGBA'): im = im.convert('RGB')
    return im

def fit(im, width):
    if im.width <= width: return im.copy()
    return im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)

def contact_sheets(files, outdir, per=30, cols=6, cell=260):
    outdir.mkdir(parents=True, exist_ok=True); rows = per // cols
    for s in range(0, len(files), per):
        sheet = Image.new('RGB', (cols * cell, rows * (cell + 22)), (20, 28, 30)); d = ImageDraw.Draw(sheet)
        for k, f in enumerate(files[s:s + per]):
            try: im = ImageOps.fit(load(f).convert('RGB'), (cell - 6, cell - 6))
            except Exception: continue
            x, y = (k % cols) * cell, (k // cols) * (cell + 22); sheet.paste(im, (x + 3, y + 3))
            d.text((x + 6, y + cell), f"{s + k + 1}  {f.name[:28]}", fill=(235, 235, 235))
        p = outdir / f"contact-sheet-{s // per + 1}.jpg"; sheet.save(p, quality=80); print('wrote', p)

def main():
    a = argparse.ArgumentParser(description='Resize photos for the We Run Jinja site')
    a.add_argument('--in', dest='src', required=True, help='folder with your original photos')
    a.add_argument('--out', default='assets/photos', help='output folder (default assets/photos)')
    a.add_argument('--width', type=int, default=1600); a.add_argument('--thumb', type=int, default=600)
    a.add_argument('--quality', type=int, default=78); a.add_argument('--tag', default='people', help='tag for every photo (see js/data/photos.js)')
    a.add_argument('--limit', type=int, default=0, help='only process the first N photos'); a.add_argument('--sheet', action='store_true', help='make numbered contact sheets only')
    o = a.parse_args()
    files = sorted(p for p in Path(o.src).rglob('*') if p.suffix.lower() in EXT)
    if not files: sys.exit(f'No photos found in {o.src}')
    if o.limit: files = files[:o.limit]
    print(f'{len(files)} photos found')
    if o.sheet: return contact_sheets(files, Path('contact-sheets'))
    out = Path(o.out); (out / 'thumbs').mkdir(parents=True, exist_ok=True); rows = []; used = set()
    for f in files:
        try: im = load(f)
        except Exception as e: print('skip', f.name, e); continue
        base = slug(f.stem); n = base; i = 2
        while n in used: n = f'{base}-{i}'; i += 1
        used.add(n)
        fit(im, o.width).convert('RGB').save(out / f'{n}.webp', 'WEBP', quality=o.quality, method=6)      # no EXIF is written
        fit(im, o.thumb).convert('RGB').save(out / 'thumbs' / f'{n}.webp', 'WEBP', quality=o.quality - 6, method=6)
        rows.append({'id': n, 'src': f'{o.out}/{n}.webp', 'alt': 'Club members on a run', 'caption': '', 'tag': o.tag, 'show': 'TRUE'})
        print('ok', n, f'{(out / (n + ".webp")).stat().st_size // 1024} KB')
    with open('photos.csv', 'w', newline='', encoding='utf-8') as fh:
        w = csv.DictWriter(fh, fieldnames=['id', 'src', 'alt', 'caption', 'tag', 'show']); w.writeheader(); w.writerows(rows)
    with open('photos.js', 'w', encoding='utf-8') as fh:
        fh.write('/* paste these lines inside WRJ.data.photos = [ ... ]  (js/data/photos.js). Then edit alt and caption. */\n')
        for r in rows: fh.write("  { id: '%s', src: '%s', alt: '%s', caption: '%s', tag: '%s' },\n" % (r['id'], r['src'], r['alt'], r['caption'], r['tag']))
    print(f'\nDone: {len(rows)} photos in {o.out}. Now open photos.csv or photos.js, write a short alt text and caption for each, and set the right tag.')

if __name__ == '__main__': main()
