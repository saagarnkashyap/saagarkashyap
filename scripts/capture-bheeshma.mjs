import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";

await mkdir(".tools", { recursive: true });
const browser = await chromium.launch({ channel: "msedge", headless: true });
try {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
    deviceScaleFactor: 1,
  });
  await page.goto("https://bheeshma.vercel.app/", {
    waitUntil: "domcontentloaded",
    timeout: 30000,
  });
  await page.getByRole("button", { name: /dark/i }).click();
  await page.getByRole("button", { name: /light/i }).waitFor();
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all(
      [...document.images].map((image) => image.decode().catch(() => {})),
    );
  });
  await page.screenshot({ path: ".tools/bheeshma-dark.png" });
  console.log(
    "Captured the live Bheeshma homepage in its verified dark theme.",
  );
} finally {
  await browser.close();
}
