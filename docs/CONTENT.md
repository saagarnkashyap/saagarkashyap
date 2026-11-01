# Updating the portfolio

Content is separate from layout code. Rebuild after content changes to regenerate HTML, RSS, sitemap, and robots.txt.

## Projects and background

`src/content/projects.js` contains only the six resume projects, their technologies, links, and case studies. `src/content/profile.js` contains background and contact details. The supplied resume is served from `public/Saagar-Kashyap-Resume.pdf`.

The short display title **Semiconductor insights** refers to the resume's **Semiconductor Industry Case Study Dashboard**. Wafex links to `WAFERX`. Bheeshma's source link is its earlier Streamlit edition; its live Vercel app is the newer web edition. NeuroAsha links to its public website repository, distinct from the model repository in the resume. ARTI-E has a live link; no repository URL was invented.

## Publish an article

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

Home contains the shared personal introduction and work experience from `src/components/PersonalBackground.jsx`, followed by Bheeshma, ARTI-E, Wafex, and NeuroAsha image previews. All previews and the gold View all work button open `/work`. NeuroAsha uses the supplied `public/projects/neuroasha.png` MRI/Grad-CAM comparison. Full details remain in Work and the case studies. About retains the full background, skills, education, and certifications.

The Home photography slider shows seven selected photos in a 16:9 frame, with arrows, dots, arrow-key navigation, and touch swipes. Edit the `featuredPhotos` IDs in `src/content/photos.js` to change the selection. It does not autoplay. “Explore my photography” opens `/photos`.

## Themes, typography, and company marks

The sun/moon button in the shared header switches the entire site between white and dark themes. It follows the browser preference on a first visit and saves explicit choices in local storage. A small script in `index.html` applies the saved theme before paint. Theme colors and upright Geist headings are defined in `src/styles/refinements.css`; body copy and section headings are larger for readability. Semantic emphasis in article content remains available.

Company logo paths are part of the experience entries in `src/content/profile.js`. The GF SVG was extracted from the official https://gf.com/ header; its mark-only version uses a cropped viewBox of the original drawing. The Tiger Analytics SVG comes from the official https://www.tigeranalytics.com/ header asset at `https://www.tigeranalytics.com/wp-content/uploads/2026/09/Tigernalytics-trademark-logo-white.svg`. Both have transparent backgrounds and no surrounding frame. Tiger's foreground follows the embedding page's color scheme: white in dark mode and black in light mode, preserving the orange accents. `scripts/fetch-company-logos.mjs` retains this behavior when refreshing the original assets.

Desktop work experience uses one left-aligned column rather than reserving a separate date column. The wordmark is uniformly sized “Saagar Kashyap”; Menu and Now use bold Geist. Light-theme body and secondary text use black.

`PageIntro` now supports compact editorial layouts through its `layout` prop: Work uses an archive masthead with the description alongside the title; Writing puts RSS alongside its heading; Photography leads directly into the gallery controls; Cycling uses a short logbook introduction; About opens directly into the photograph/text composition. Desktop page titles use a 40–44px scale, with smaller responsive sizes. Optional supporting copy is ordinary paragraph text, not another display heading.

Home uses a single 44–48px desktop greeting, “Hello, I'm Saagar.” Only “Saagar.” uses `--wordmark-first-name`, matching the navbar: red in light mode and gold in dark mode. The navbar wordmark uses bold Geist and `--wordmark-first-name` / `--wordmark-last-name`: `#A93632` / `#785F32` in light mode and `#D0B47B` / `#DC6259` in dark mode. Gold/bronze tokens, navigation, buttons, and project visuals retain their existing colors. The compact greeting sits closely above the original two-column photo/text introduction. `node scripts/review-typography.mjs` checks all six openings at desktop/mobile widths in both themes against the local production preview.

The journal is **Cycling Journal**, with the canonical route `/cycling`, cycling copy, and a bicycle illustration. `/running` redirects to `/cycling` in both the React app and Vercel configuration. Strava remains deferred; no activity records are populated.

## Now

Edit `src/content/now.json`: `updated`, `intro`, and `items`. No layout changes are needed. Use real updates; unknown reading or learning information should stay unfilled.

## Domain and metadata

The production origin is in `src/content/profile.js`. If it changes, also update the absolute social image URLs in `index.html`. Page metadata is derived in `src/lib/metadata.js`.
