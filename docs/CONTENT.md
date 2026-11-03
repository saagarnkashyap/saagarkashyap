# Updating the portfolio

Content is separate from layout code. Rebuild after content changes to regenerate HTML, RSS, sitemap, and robots.txt.

## Projects and background

`src/content/projects.js` contains the nine projects in archive order, their technologies, links, and concise project summaries. Each detail page renders three `summary` bullets and an optional `note` inside a GitHub README-style panel, using the existing portfolio palette and fonts. This replaces the long numbered question/approach/design/implementation sections. Important research limitations and repository-version notes are retained. Archive descriptions and external links are unchanged; Falconet, claudetrippy, and DrishtiNet were added from the supplied repositories. Additional external resources use labeled `links` entries so recordings and notebooks are not presented as live applications. `src/content/profile.js` contains background and contact details. The supplied resume is served from `public/Saagar-Kashyap-Resume.pdf`.

The shared `CaseStudy` in `src/views/Work.jsx` ends with four clickable previews of other projects, continuing through the archive order and wrapping at the end, plus View all work. It reuses `ProjectItem` and the homepage's two-column image-grid layout, stacking on mobile. Each image opens that project's own detail page. Existing screenshots, scientific figures, animated GIFs, pause controls, reduced-motion posters, and editorial covers are reused; no unrelated imagery is added. The single Next / Keep exploring footer is removed.

The short display title **Semiconductor insights** refers to the resume's **Semiconductor Industry Case Study Dashboard**. Wafex links to `WAFERX`. Bheeshma's source link is its earlier Streamlit edition; its live Vercel app is the newer web edition. NeuroAsha links to its public website repository, distinct from the model repository in the resume. ARTI-E has a live link; no repository URL was invented.

## About and recommendations

About has its own background, interests, and broad invitation to work on useful data and software projects. The shared Home introduction and employment timeline are not repeated. `src/content/about.js` holds a selection of three certificates and four recommendations supplied by Saagar. All 21 existing skills and interests from `profile.js` are displayed as grouped, wrapping tags directly beneath Useful data. Useful software. The separate Tools, put to work section has been removed. The complete certificate list remains in `profile.js` and the résumé. Each recommendation has an exact excerpt, full original paragraphs, a shortened role, relationship, date, and author profile link. Native disclosure controls reveal the full text without a carousel or external scripts. Keep excerpts verbatim; author wording is not rewritten. The signed-in LinkedIn export is preserved under ignored `.tools/references/`, outside the public directory.

## Publish an article

Writing stays out of desktop and mobile main navigation until at least one non-draft article is published; the RSS invitation follows the same rule. `/writing` remains available and links to the verified public post, **Object detection in traffic using YOLOv11**. The older unverified post URL is retained in `unlistedWritingLinks` in `src/content/links.js`, without a guessed title or a public listing.

No articles are prefilled. To publish your own:

1. Write `src/content/articles/your-slug.md`. Use `##` headings, fenced code blocks, and Markdown links and images.
2. Add metadata to `src/content/writing/index.json`, replacing these template values with real content:

```json
[
  {
    "slug": "your-slug",
    "title": "Your actual title",
    "description": "An accurate description of your article.",
    "date": "2026-11-01",
    "tags": ["Project notes"],
    "draft": false
  }
]
```

3. Run `npm run build`. The article appears in the Writing listing, tag filters, RSS, sitemap, and its own prerendered page.

`draft: true` excludes an entry from publication. Dates use `YYYY-MM-DD`, displayed in UTC to avoid date drift. Reading time is automatic. More than three level-two headings enables a table of contents. Highlighted languages: Python, JavaScript, TypeScript, SQL, JSON, and Bash. Raw HTML is escaped and unsafe link protocols are rejected. Store images in `public/writing/` and write descriptive alt text, e.g. `![Description](/writing/image.webp)`.

The publishing verification script uses temporary, clearly labeled fixtures. It restores the original manifest and removes its article afterward.

## Photos

Originals are in `public/photos/`. All 60 image files are included, including JPG, JPEG, and WebP originals. Generated files in `optimized/` are excluded from the original-file scan. `src/content/photos.json` records filenames, dimensions, collections, descriptive alt text, and a separate `caption` field. Locations and capture dates are absent because they have not been verified. The poetic caption-writing pass is deferred; empty captions display “Caption to come.” in the viewer.

To add photos, copy originals into `public/photos/` and run `npm run photos:sync` with Pillow installed. This indexes every original, preserves existing IDs and captions, and generates 480, 960, and 1600-pixel WebP derivatives. `src/content/photo-details.json` supplies optional descriptive alt text and collection overrides for new images. The normal build checks that every original has an entry and responsive assets; it requires no Python. `python scripts/prepare-assets.py --fonts` also refreshes the optional local font assets. Direct photo links use `/photos?photo=the-counter`.

`src/content/project-images.js` maps projects to real screenshots and supplied output. Bheeshma uses `public/projects/bheeshma-dark.webp`, captured from its actual dark theme by `scripts/capture-bheeshma.mjs`. ARTI-E uses its existing application capture. Wafex uses the supplied `public/projects/WAFER-X.png` without cropping its test-result labels in the case study. No semiconductor dashboard image has been supplied yet; add its verified image under `semiconductor-insights` in this mapping when available.

Home contains the personal introduction and work experience from `src/components/PersonalBackground.jsx`, followed by Bheeshma, ARTI-E, Wafex, and NeuroAsha image previews. All previews and the gold View all work button open `/work`. NeuroAsha uses the supplied `public/projects/neuroasha.png` MRI/Grad-CAM comparison. Full details remain in Work and the case studies. About adds a separate personal background, grouped skill tags, recommendations, and selected certificates.

The Home photography slider shows seven selected photos in a 16:9 frame, with arrows, dots, arrow-key navigation, and touch swipes. Edit the `featuredPhotos` IDs in `src/content/photos.js` to change the selection. It does not autoplay. “Explore my photography” opens `/photos`.

Falconet uses the supplied `public/projects/falconet.gif` (400 by 225, 435 frames, 29 seconds, infinite loop) on both the archive and detail page. Its `falconet-poster.webp` is an actual frame used when paused or when reduced motion is requested. The GIF remains unchanged, lazy-loaded, and uncropped. The supplied [LinkedIn recording](https://lnkd.in/p/gTTDEmjH) resolved successfully during verification; it is a video post. The original animated `public/projects/claudetrippy.gif` (800 × 464, 159 frames, 15.9 seconds, infinite loop) is retained and lazy-loaded. A real frame exported as `claudetrippy-poster.webp` is used when paused or when reduced motion is requested. Pause controls are outside archive links. DrishtiNet uses a native-resolution, lossless `drishtinet.webp` copy of the retained `DrishtiNet.png`: all RGBA pixels are identical, including labels, heatmap colors, and the attention scale. No sharpening, tonal remapping, or AI upscaling is applied to scientific evidence. Both its archive and detail views contain the complete figure. Its case study follows the [supplied draft notebook](https://github.com/saagarnkashyap/DrishtiNet/blob/main/06thMar26_draft1.ipynb), without adding clinical claims or accuracy metrics.

## Themes, typography, and company marks

The sun/moon button in the shared header switches the entire site between white and dark themes. It follows the browser preference on a first visit and saves explicit choices in local storage. A small script in `index.html` applies the saved theme before paint. Theme colors and upright Geist headings are defined in `src/styles/refinements.css`; body copy and section headings are larger for readability. Semantic emphasis in article content remains available.

Company logo paths are part of the experience entries in `src/content/profile.js`. The GF SVG was extracted from the official https://gf.com/ header; its mark-only version uses a cropped viewBox of the original drawing. The Tiger Analytics SVG comes from the official https://www.tigeranalytics.com/ header asset at `https://www.tigeranalytics.com/wp-content/uploads/2026/09/Tigernalytics-trademark-logo-white.svg`. Both have transparent backgrounds and no surrounding frame. Tiger's foreground follows the embedding page's color scheme: white in dark mode and black in light mode, preserving the orange accents. `scripts/fetch-company-logos.mjs` retains this behavior when refreshing the original assets.

Desktop work experience uses one left-aligned column rather than reserving a separate date column. The wordmark is uniformly sized “Saagar Kashyap”; Menu and Now use bold Geist. Light-theme body and secondary text use black.

`PageIntro` now supports compact editorial layouts through its `layout` prop: Work uses an archive masthead with the description alongside the title; Writing puts RSS alongside its heading; Photography leads directly into the gallery controls; Strava uses a compact profile introduction; About opens directly into the photograph/text composition. Desktop page titles use a 40–44px scale, with smaller responsive sizes. Optional supporting copy is ordinary paragraph text, not another display heading.

Home uses a single 44–48px desktop greeting, “Hello, I'm Saagar.” Only “Saagar.” uses `--wordmark-first-name`, matching the navbar: red in light mode and gold in dark mode. The navbar wordmark uses bold Geist and `--wordmark-first-name` / `--wordmark-last-name`: `#A93632` / `#785F32` in light mode and `#D0B47B` / `#DC6259` in dark mode. Gold/bronze tokens, navigation, buttons, and project visuals retain their existing colors. The compact greeting sits closely above the original two-column photo/text introduction. `node scripts/review-typography.mjs` checks all six openings at desktop/mobile widths in both themes against the local production preview.

The **Strava** page uses the canonical route `/strava`; `/cycling` and `/running` redirect there in React and Vercel. `src/content/strava.js` stores Saagar's supplied all-time cycling totals, three bikes, fourteen best efforts, and seven public embed IDs/share tokens. Profile values are a snapshot dated 2 November 2026; edit the values and `updated` date together when refreshing them. The weekly summary widget has been removed at the author's request. `StravaActivity.jsx` uses official Strava activity iframe URLs, validates origin/source/namespace for automatic height messages, and removes listeners on unmount. Native lazy loading defers offscreen embeds, and each has a descriptive title and a direct activity link. The trophy gallery uses 293 real challenge badges extracted from the supplied saved trophy page. Its sanitized manifest is `src/content/strava-trophies.json`; compact WebP badge images are stored under `public/strava-trophies/`. Display copies fit within 200 by 200 pixels for a 100-pixel layout without cropping or recoloring; original downloads remain under `.tools/strava/trophy-originals/`. Six appear on the Strava overview. The Show more trophies link opens the separate `/strava/trophies` page. It starts with the remaining supplied medal photo and six challenge badges; Show more expands to all 293, and Show fewer restores the preview. The button exposes its expanded state and the displayed count is announced politely. All badge names, dates, image paths, and destinations are unchanged. Trophies is in the main navigation immediately after Strava; there is no secondary tab bar. Names, earned dates, and challenge links are retained. The original signed-in HTML is preserved privately under `.tools/strava/strava_trophy.html` and is not served or committed. No OAuth access or refresh tokens, API credentials, or private account data are stored.

The remaining supplied finish-line medal photo in `public/strava/` is aligned to the right of each desktop introduction. Strava now uses a separate transparent ink-style portrait generated from the photograph, rendered with contain sizing at 300 pixels high on desktop and 250 on phones. CSS shows the approved ink drawing in light mode and the same background-removed photo cutout used by the favicon in dark mode. The dark cutout is a full-size lossless WebP export, with unchanged visible pixels and alpha. Both use contain sizing and no filters; Trophies retains the original event photograph. The unused dark drawing is archived locally outside public. The approved light artwork is retained unchanged. On phones the portrait container uses the full introduction width to center the drawing against the viewport. The generated asset, source, and final imagegen prompt are recorded in `docs/STRAVA-PORTRAIT.md`. Trophies retains the photographic source. Trophies now uses a closer 4:3 CSS crop up to 340 pixels wide, centered below the title, description, and profile link on phones; the link no longer competes with the title for the same narrow row. The source image is unchanged. No event name, placing, or race date is inferred. All-time cycling totals and the three bikes are presented as short paragraphs, retaining the 2 November 2026 snapshot date and all original values/links. Only the 109.9 km longest ride is displayed from the three single-ride records; biggest climb and single-ride elevation gain are omitted. Eleven personal-best sentences retain their actual mile/kilometre distances and times, arranged in three columns on desktop and one column on phones. There is no invented 5 km record: the first supplied effort is 5 miles. Selected activity embeds retain four columns from 1280px, two from 761-1279px, and one on phones. The weekly widget remains removed. About retains the explicit Certificates heading. The last experience entry and the last row of Home project previews omit trailing borders; the following chapter supplies a single divider.

## Updates (existing /now route)

The header, page title, About link, and footer now call this destination Updates, distinguishing work/life updates from the theme switch. The route and data filename remain unchanged. Mobile navigation uses an accessible three-line SVG button and a close icon, with a 44-pixel tap target, expanded state, Escape-to-close, and focus restoration. The header remains on one row at 320 pixels.

Edit `src/content/now.json`: `updated`, `intro`, and `items`. No layout changes are needed. Use real updates; unknown reading or learning information should stay unfilled.

## Domain and metadata

The browser-tab favicon uses a background-removed, cropped medal-photo cutout. `index.html` declares 32px and 192px PNG icons, a 16/32/48px ICO, and a 180px Apple touch icon. The navbar wordmark is unchanged. Assets and the built-in imagegen edit prompt are documented in `docs/FAVICON.md`; the original photograph remains unchanged.

Theme defaults follow the device's light/dark preference before the page paints. A saved manual selection takes priority. Until a visitor chooses a theme manually, changes to the device preference also update the page and browser theme color. Storage being blocked does not force dark mode; manual selection still works for the current visit. Browsers that cannot report a preference use light mode.

The production origin is in `src/content/profile.js`. If it changes, also update the absolute social image URLs in `index.html`. Page metadata is derived in `src/lib/metadata.js`.
