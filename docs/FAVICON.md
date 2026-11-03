# Photo favicon

The browser-tab icon uses a cropped, transparent photographic cutout based on Saagar's supplied medal photograph. The navbar wordmark is unchanged.

## Assets

- `public/favicon-32.png`: 32 × 32 RGBA PNG.
- `public/favicon-192.png`: 192 × 192 RGBA PNG.
- `public/favicon.ico`: 16, 32, and 48 pixel icon entries.
- `public/apple-touch-icon.png`: 180 × 180 RGBA PNG.
- `public/strava/saagar-medal-cutout.webp`: full-size 1254 by 1254 lossless export of the same cutout for the dark-theme Strava introduction. Visible RGBA pixels match the master.
- Cutout master: `.tools/favicon/saagar-medal-cutout-master.png` (1254 × 1254 RGBA, kept locally outside public).
- Source photograph: `public/strava/WhatsApp Image 2026-11-02 at 1.12.05 PM (1).jpeg` (unchanged).

The cutout was made with the built-in imagegen edit tool. Standard favicon exports resize the cutout while preserving its alpha channel. `index.html` declares the PNG/ICO favicon and Apple touch sizes; all prerendered pages inherit these declarations. The previous SVG is retained but no longer linked as the site icon. No social-preview image or navigation logo is changed.

## Final prompt

Use case: background-extraction. Edit target: the supplied original photograph of Saagar wearing sunglasses, a dark cycling shirt, backpack straps and a finisher medal. Create a clean PHOTOGRAPHIC cutout of that exact person for a small website identity icon. Remove the whole event background, all other people, sky, track, buildings and signage. Crop closely to a centered square head-and-chest portrait, from a small margin above his hair down to just below his medal, retaining the visible medal and ribbon. Keep his head upright in its exact original pose, hair, face, glasses, expression, shirt, ribbon, medal and original colors/lighting unchanged. This is masking and cropping, not a new portrait: no illustration, ink, silhouette, painting, new facial detail, retouching, beauty treatment, stylization, new clothes, new body parts or new light. Maintain his actual identity from the source, even its natural photographic softness. Use genuine transparent alpha around the subject, with crisp natural hair edges and no white fringe, shadow, glow, border, circular container, text, logo or background color. Fill most of the square with the cutout so the head is readable at small sizes. Output one square transparent image.

