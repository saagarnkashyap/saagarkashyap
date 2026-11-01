import { chromium } from "@playwright/test";
const browser = await chromium.launch({ channel: "msedge", headless: true });
const page = await browser.newPage({
  viewport: { width: 1440, height: 1000 },
  deviceScaleFactor: 1,
});
for (const [name, url] of [
  ["bheeshma", "https://bheeshma.vercel.app"],
  ["arti-e", "https://arti-e.vercel.app"],
]) {
  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
    await page.waitForTimeout(6000);
    await page.screenshot({
      path: `public/projects/${name}.webp`,
      type: "jpeg",
      quality: 85,
    });
    console.log(name, (await page.locator("body").innerText()).slice(0, 4500));
  } catch (error) {
    console.log(name, error.message);
  }
}
await browser.close();
