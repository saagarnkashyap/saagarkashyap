import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";
await mkdir(".tools/screenshots", { recursive: true });
const browser = await chromium.launch({ channel: "msedge", headless: true });
const page = await browser.newPage({
  viewport: { width: 1440, height: 1000 },
  colorScheme: "dark",
});
page.on("pageerror", (error) => console.log("PAGE ERROR:", error.message));
await page.goto("http://127.0.0.1:4173/", { waitUntil: "networkidle" });
await page.locator("img").evaluateAll(async (images) => {
  for (const image of images) image.loading = "eager";
  await Promise.all(images.map((image) => image.decode().catch(() => {})));
});
await page.screenshot({
  path: ".tools/screenshots/home-desktop.png",
  fullPage: true,
});
await page.setViewportSize({ width: 390, height: 844 });
await page.screenshot({
  path: ".tools/screenshots/home-mobile.png",
  fullPage: true,
});
await page.setViewportSize({ width: 1440, height: 1000 });
await page.locator(".theme-toggle").click();
await page.waitForTimeout(300);
await page.screenshot({
  path: ".tools/screenshots/home-light.png",
  fullPage: true,
});
await page.goto("http://127.0.0.1:4173/photos", { waitUntil: "networkidle" });
await page.screenshot({ path: ".tools/screenshots/photos-light.png" });
await page.setViewportSize({ width: 390, height: 844 });
await page.goto("http://127.0.0.1:4173/work", { waitUntil: "networkidle" });
await page.screenshot({
  path: ".tools/screenshots/work-mobile.png",
  fullPage: true,
});
await page.setViewportSize({ width: 1200, height: 630 });
await page.goto("http://127.0.0.1:4173/", { waitUntil: "networkidle" });
await page.screenshot({
  path: "public/social-preview.jpg",
  type: "jpeg",
  quality: 90,
});
console.log("Captured desktop, mobile, work, and social preview images.");
await browser.close();
