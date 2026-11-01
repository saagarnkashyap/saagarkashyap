import { chromium } from "@playwright/test";
import { writeFile, mkdir } from "node:fs/promises";

await mkdir("public/logos", { recursive: true });
const browser = await chromium.launch({ channel: "msedge" });
try {
  const page = await browser.newPage();
  await page.goto("https://gf.com/", {
    waitUntil: "domcontentloaded",
    timeout: 30000,
  });
  const logo = page.locator('[class*="logo"] svg').first();
  const full = await logo.evaluate((element) => element.outerHTML);
  const mark = await logo.evaluate((element) => {
    const copy = element.cloneNode(true);
    copy.setAttribute("viewBox", "0 0 45 43");
    copy.setAttribute("width", "45");
    return copy.outerHTML;
  });
  await writeFile("public/logos/globalfoundries.svg", full);
  await writeFile("public/logos/globalfoundries-mark.svg", mark);
  await page.goto("https://www.tigeranalytics.com/", {
    waitUntil: "domcontentloaded",
    timeout: 30000,
  });
  const source = await page
    .locator("img")
    .evaluateAll((images) =>
      images
        .map((image) => image.src)
        .find((src) => src.includes("trademark-logo-white.svg")),
    );
  if (!source) throw new Error("Official Tiger logo not found.");
  const tiger = await page.evaluate(
    async (src) => (await fetch(src)).text(),
    source,
  );
  if (!tiger.includes("<svg")) throw new Error("Expected Tiger SVG.");
  const themeAwareTiger = tiger.replace(
    "</style>",
    "@media (prefers-color-scheme: light) { path { fill: #101113; } }</style>",
  );
  await writeFile("public/logos/tiger-analytics.svg", themeAwareTiger);
  console.log(
    "Saved authentic GF mark and Tiger Analytics logo from their official sites.",
  );
} finally {
  await browser.close();
}
