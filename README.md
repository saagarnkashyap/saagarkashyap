# Saagar Kashyap — personal portfolio

An editorial portfolio built with React 19, Vite, React Router, local fonts, original photographs, and a Markdown publishing system. Selected work contains nine projects, including the six original resume projects and three additional projects supplied by the author. The Strava page combines author-supplied lifetime statistics and gear with seven official activity embeds.

```sh
npm ci
npm run dev
```

Build and preview the production version:

```sh
npm run build
npm run preview
```

Deploy this directory to Vercel. `vercel.json` selects the build command and `dist` directory, serves clean prerendered URLs, redirects old paths, and preserves a real 404 page. No environment variables are required. This checkout tracks `main` in `https://github.com/saagarnkashyap/saagarkashyap`.

The build generates static HTML for all routes, page metadata, RSS, sitemap, and robots.txt. React hydrates interactive navigation and galleries. Project details use concise README-style notes and four linked image previews of other projects. Add real articles without changing layout code. No sample articles or running statistics are published.

The photography archive includes every original image in `public/photos/` (currently 60). Run `npm run photos:sync` after adding images; the normal build verifies complete coverage and uses committed responsive assets. Poetic captions are deferred. The shared sun/moon switch supports white and dark themes, follows the browser preference on a first visit, and remembers explicit choices. Home includes four project previews, company logos, and a manual 16:9 photography slider.

Strava lives at `/strava`; `/cycling` and `/running` redirect there. Lifetime totals, bikes, and personal bests are a dated snapshot in `src/content/strava.js`; activity embeds load from Strava. The weekly widget has been removed. The trophy case includes 293 challenge badges extracted from the supplied saved profile page, with six previewed on `/strava` and the complete collection on `/strava/trophies`. The About page explicitly labels its Certificates section. Home section boundaries use a single divider. The desktop experience entries align left, company logos have transparent backgrounds, and the light theme uses black text.

```sh
npm run test:content
npm test
npm run test:publishing
```

Browser tests use an installed Microsoft Edge browser. On another system, install Playwright Chromium and replace `channel: 'msedge'` in the configuration and maintenance scripts. Publishing verification requires a production preview at port 4173; it builds temporary fixture content, then restores the original content and rebuilds in `finally`.

- [Audit and design decisions](docs/AUDIT.md)
- [Content editing guide](docs/CONTENT.md)
- [Strava integration notes](docs/STRAVA-LATER.md)

Original inactive components remain as reference material; their animation libraries are no longer active dependencies. The redesigned app imports only its new components and views. Font license files are in `public/fonts/`.
