import { readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { allPaths, articles, render } from "../.build/entry-server.js";
import { profile } from "../src/content/profile.js";

const template = await readFile("dist/index.html", "utf8");
function documentFor(path) {
  let markup = render(path);
  // React 19 hoists document metadata; place it in the actual document head.
  const tags = [];
  markup = markup.replace(
    /<title>[\s\S]*?<\/title>|<meta\b[^>]*\/>|<link\b[^>]*\/>/g,
    (tag) => {
      tags.push(tag);
      return "";
    },
  );
  return template
    .replace("</head>", `${tags.join("\n")}\n</head>`)
    .replace('<div id="root"></div>', `<div id="root">${markup}</div>`);
}
for (const path of allPaths) {
  const filename = resolve(
    "dist",
    path === "/" ? "index.html" : `${path.slice(1)}.html`,
  );
  await mkdir(dirname(filename), { recursive: true });
  await writeFile(filename, documentFor(path));
}
await writeFile("dist/404.html", documentFor("/404"));
const xml = (value) =>
  String(value).replace(
    /[<>&"']/g,
    (char) =>
      ({
        "<": "&lt;",
        ">": "&gt;",
        "&": "&amp;",
        '"': "&quot;",
        "'": "&apos;",
      })[char],
  );
await writeFile(
  "dist/sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${allPaths.map((path) => `<url><loc>${profile.site}${path}</loc></url>`).join("")}</urlset>`,
);
await writeFile(
  "dist/robots.txt",
  `User-agent: *\nAllow: /\nSitemap: ${profile.site}/sitemap.xml\n`,
);
await writeFile(
  "dist/rss.xml",
  `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/"><channel><title>${xml(profile.shortName)} — Writing</title><link>${profile.site}/writing</link><description>${xml(profile.description)}</description><language>en</language><atom:link href="${profile.site}/rss.xml" rel="self" type="application/rss+xml"/>${articles.map((a) => `<item><title>${xml(a.title)}</title><link>${profile.site}/writing/${a.slug}</link><guid isPermaLink="true">${profile.site}/writing/${a.slug}</guid><pubDate>${new Date(`${a.date}T00:00:00Z`).toUTCString()}</pubDate><description>${xml(a.description)}</description>${a.tags.map((tag) => `<category>${xml(tag)}</category>`).join("")}<content:encoded>${xml(a.html)}</content:encoded></item>`).join("")}</channel></rss>`,
);
console.log(
  `Prerendered ${allPaths.length} pages, 404, sitemap, robots, and RSS (${articles.length} articles).`,
);
