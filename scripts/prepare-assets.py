"""Optional asset maintenance. Requires Pillow; normal builds use committed assets."""
import re
import sys
import urllib.request
from pathlib import Path

sys.path.insert(0, str(Path('.tools/python').resolve()))
from PIL import Image, ImageOps

import runpy
runpy.run_path('scripts/sync-photos.py')
if '--fonts' not in sys.argv:
    sys.exit(0)

fonts = [
    ('Instrument+Serif', 'instrument-serif', ''),
    ('Instrument+Serif:ital@1', 'instrument-serif-italic', ''),
    ('Geist:wght@100..900', 'geist', ''),
    ('JetBrains+Mono:wght@100..800', 'jetbrains-mono', ''),
]
font_dir = Path('public/fonts')
font_dir.mkdir(parents=True, exist_ok=True)
agent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'
for family, name, _ in fonts:
    request = urllib.request.Request(f'https://fonts.googleapis.com/css2?family={family}&display=swap', headers={'User-Agent': agent})
    css = urllib.request.urlopen(request).read().decode()
    blocks = re.findall(r'/\* latin \*/\s*(@font-face\s*\{.*?\})', css, re.S)
    if not blocks:
        raise RuntimeError(f'Latin font not found: {name}')
    url = re.search(r'url\((https://[^)]+)\)', blocks[-1]).group(1)
    (font_dir / f'{name}.woff2').write_bytes(urllib.request.urlopen(url).read())
    print('Downloaded local font:', name)
for family in ['instrumentserif', 'geist', 'jetbrainsmono']:
    url = f'https://raw.githubusercontent.com/google/fonts/main/ofl/{family}/OFL.txt'
    try:
        (font_dir / f'{family}-OFL.txt').write_bytes(urllib.request.urlopen(url).read())
    except Exception as error:
        print('License download needs attention:', family, error)
print('Prepared local font assets.')
