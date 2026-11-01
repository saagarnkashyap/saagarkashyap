# Portfolio audit and redesign

Audited 1 November 2026, before implementation.

## Existing application

React 19, Vite 6, React Router 7, Tailwind 4. The checkout is an extracted source directory without Git metadata. Existing routes are Home, Projects, Skills, Certifications, and Blog with photography and LinkedIn embeds. There is no article content system, route metadata, sitemap, RSS, or Vercel configuration. The old deploy script targets GitHub Pages despite the live Vercel URL.

The presentation uses global particles, GSAP, WebGL gallery components, animated electric borders, gradient buttons, and a greeting changed every 300ms. These distract from the work and add unnecessary runtime cost. Some unused gallery implementations lack keyboard and focus management. Existing project summaries, photographs, social links, and source links are valuable.

## Content verification

- The supplied `C:/Users/Asha/Downloads/SaagarKashyap_resume.pdf` supersedes the older resume in the checkout. It records GlobalFoundries planning systems work from January 2026, Tiger Analytics from August–October 2025, and VIT-AP education from 2022–2026. Use its role descriptions without inventing additional results.
- The checkout contains 15 original photographs. Inspect all visually, write descriptive alt text, generate smaller WebP derivatives, preserve originals. Do not infer locations or publish capture dates from filenames.
- Public GitHub API and raw READMEs verify Bheeshma, Sandisk-Corp, WAFERX, RideZilla, and other projects. Live Bheeshma and ARTI-E pages were reachable. Capture their actual interfaces rather than inventing project screenshots.
- Bheeshma's public repository describes the original Python/Streamlit implementation. The supplied resume and live Vercel app describe a newer React version. Distinguish these versions in the case study. The live page says 700 verses while the resume says 701; omit an exact verse count.
- WAFERX's public README reports 93.14% while the resume says 95.1%. Omit the disputed metric. The README describes CNNs, WM-811K, and eight defect types.
- ARTI-E is documented by the supplied resume and its live interface; no matching public source repository was found. Do not invent a repository link or benchmark results.
- The Marvel project could not be identified in the checkout or public repository list. Requested its URL; it is not represented as a verified project.
- The Google Drive reference could not be read with the available web reader. No claims are derived from it.
- No authored blog articles were supplied. Keep the real LinkedIn references, and provide a functional Markdown publishing system with an honest empty archive and RSS.
- No personal running records were supplied. The user explicitly deferred Strava API implementation until last. Build the journal presentation and document the remaining integration; do not implement authentication or show sample statistics.

## Design and implementation plan

Keep React/Vite/React Router. Use obsidian, ivory, restrained gold and sage; local Instrument Serif, Geist and JetBrains Mono; large editorial type, fine rules, chapter numbers, asymmetrical photography. Replace global visual effects with small CSS interactions and reduced-motion support.

1. Shared tokens, semantic header/footer, responsive navigation and route focus.
2. Home, selected-work archive, individually themed evidence-based case studies, and conversational About.
3. Markdown writing pipeline, tag filtering, reading times, article pages and highlighting; original photography gallery with accessible lightbox; Running and editable Now.
4. Static prerendering of each route for initial content and metadata, RSS, sitemap, robots, local fonts and responsive images; Vercel clean URLs and genuine 404 handling.
5. Production build, browser navigation, mobile layouts, accessibility and content-path checks.

The original inactive components remain available for reference, but are not imported into the redesigned app. Preserve the existing Vercel workflow; no unrelated hosting service or public deployment is created.

User clarification: use only projects in the supplied resume. The final selection is Bheeshma, ARTI-E, Semiconductor Industry Case Study Dashboard (short display title: Semiconductor insights), Wafex, RideZilla, and NeuroAsha. CityEye and the unidentified Marvel reference are excluded.

## Sources

- Supplied resume and local source files.
- https://github.com/saagarnkashyap
- https://github.com/saagarnkashyap/Bheeshma
- https://bheeshma.vercel.app
- https://arti-e.vercel.app
- https://github.com/saagarnkashyap/Sandisk-Corp
- https://github.com/saagarnkashyap/WAFERX
- https://github.com/saagarnkashyap/RideZilla
