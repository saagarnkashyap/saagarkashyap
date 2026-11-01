"""Index every original photo and generate responsive assets. Requires Pillow."""
import json
import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path('.tools/python').resolve()))
from PIL import Image, ImageOps

root = Path('public/photos')
manifest = Path('src/content/photos.json')
previous = json.loads(manifest.read_text(encoding='utf-8')) if manifest.exists() else []
by_file = {photo['file']: photo for photo in previous}
details_path = Path('src/content/photo-details.json')
details = json.loads(details_path.read_text(encoding='utf-8')) if details_path.exists() else {}
originals = sorted(p for p in root.rglob('*') if p.is_file() and 'optimized' not in p.relative_to(root).parts and p.suffix.lower() in {'.jpg', '.jpeg', '.png', '.webp', '.avif'})
out = root / 'optimized'
out.mkdir(exist_ok=True)
photos = []
for path in originals:
    filename = path.relative_to(root).as_posix()
    image = ImageOps.exif_transpose(Image.open(path)).convert('RGB')
    photo = by_file.get(filename, {
        'id': 'frame-' + re.sub(r'[^a-z0-9]+', '-', str(Path(filename).with_suffix('')).lower()).strip('-') + '-' + path.suffix[1:].lower(),
        'file': filename,
        'alt': 'A photograph from Saagar’s personal archive.',
        'collection': 'Unsorted',
    })
    photo.update(details.get(filename, {}))
    photo['width'], photo['height'] = image.size
    photo.setdefault('caption', '')
    for size in (480, 960, 1600):
        target = out / f'{photo["id"]}-{size}.webp'
        if target.exists() and target.stat().st_mtime >= path.stat().st_mtime:
            continue
        derivative = image.copy()
        derivative.thumbnail((size, 10000), Image.Resampling.LANCZOS)
        derivative.save(target, 'WEBP', quality=82, method=4)
    photos.append(photo)
# Preserve existing order and deep links, followed by newly added files.
order = {photo['id']: index for index, photo in enumerate(previous)}
photos.sort(key=lambda photo: (order.get(photo['id'], len(order)), photo['file']))
if len({photo['id'] for photo in photos}) != len(photos):
    raise RuntimeError('Photo IDs must be unique.')
manifest.write_text(json.dumps(photos, indent=2, ensure_ascii=False) + '\n', encoding='utf-8')
print(f'Indexed {len(photos)} originals and prepared {len(photos)*3} responsive images.')
