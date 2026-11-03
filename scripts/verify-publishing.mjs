import { readFile, writeFile, unlink } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import assert from "node:assert/strict";
import { chromium } from "@playwright/test";

const manifestPath = "src/content/writing/index.json";
const original = await readFile(manifestPath);
const slug = "publishing-verification-fixture";
const bodyPath = `src/content/articles/${slug}.md`;
const build = () => {
  const result = spawnSync(
    process.execPath,
    [process.env.npm_execpath, "run", "build"],
    { stdio: "inherit" },
  );
  if (result.status !== 0)
    throw new Error("Build failed during publishing verification.");
};
let browser;
try {
  const entries = JSON.parse(original.toString("utf8"));
  await writeFile(
    manifestPath,
    JSON.stringify([
      ...entries,
      {
        slug,
        title: "Publishing verification fixture",
        description: "Temporary test content, removed automatically.",
        date: "2026-11-01",
        tags: ["Verification"],
        draft: false,
      },
      {
        slug: "draft-verification-fixture",
        title: "Draft fixture",
        description: "Must not be published.",
        date: "2026-11-01",
        tags: ["Verification"],
        draft: true,
      },
    ]),
  );
  await writeFile(
    bodyPath,
    '## Section one\n\nTemporary verification fixture.\n\n```python\nprint("hello")\n```\n\n## Section two\n\nMore text.\n\n## Section three\n\nMore text.\n\n## Section four\n\n![Original photograph](/photos/optimized/the-counter-480.webp)\n',
  );
  build();
  const rss = await readFile("dist/rss.xml", "utf8");
  const sitemap = await readFile("dist/sitemap.xml", "utf8");
  const html = await readFile(`dist/writing/${slug}.html`, "utf8");
  assert.ok(
    rss.includes(
      `<guid isPermaLink="true">https://kashyapsaagar.vercel.app/writing/${slug}</guid>`,
    ),
  );
  assert.ok(sitemap.includes(`/writing/${slug}`));
  assert.ok(
    !rss.includes("Draft fixture") &&
      !sitemap.includes("draft-verification-fixture"),
  );
  assert.ok(
    html.includes("hljs-string") &&
      html.includes("IN THIS NOTE") &&
      html.includes('og:type" content="article"'),
  );
  browser = await chromium.launch({ channel: "msedge", headless: true });
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto(`http://127.0.0.1:4173/writing/${slug}`, {
    waitUntil: "networkidle",
  });
  assert.equal(await page.locator(".prose pre .hljs-string").count(), 1);
  await page.locator(".article-toc summary").click();
  await page.locator(".article-toc a").last().click();
  assert.ok(page.url().endsWith("#section-four"));
  assert.ok(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  );
  await page.goto("http://127.0.0.1:4173/writing", {
    waitUntil: "networkidle",
  });
  assert.equal(await page.locator('.site-nav a[href="/writing"]').count(), 1);
  assert.equal(await page.locator('.rss-link[href="/rss.xml"]').count(), 1);
  await page.getByRole("button", { name: "Verification", exact: true }).click();
  assert.equal(await page.locator(".article-list article").count(), 1);
  assert.deepEqual(errors, []);
  console.log(
    "Verified article HTML, highlighting, dates, tags, TOC, RSS, sitemap, mobile rendering, draft exclusion, and Writing/RSS returning for published content.",
  );
} finally {
  await browser?.close();
  await writeFile(manifestPath, original);
  await unlink(bodyPath).catch(() => {});
  build();
  console.log("Restored real content and rebuilt the production portfolio.");
}
