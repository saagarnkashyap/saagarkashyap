import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
import assert from "node:assert/strict";

const output = ".tools/screenshots";
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ channel: "msedge", headless: true });
const review = [];
try {
  const page = await browser.newPage({ colorScheme: "dark" });
  await page.goto("http://127.0.0.1:4173/");
  for (const width of [1440, 390]) {
    const device = width === 1440 ? "desktop" : "mobile";
    await page.setViewportSize({ width, height: width === 1440 ? 1000 : 844 });
    for (const theme of ["dark", "light"]) {
      await page.evaluate(
        (value) => localStorage.setItem("portfolio-theme", value),
        theme,
      );
      for (const route of [
        "/",
        "/work",
        "/writing",
        "/photos",
        "/cycling",
        "/about",
      ]) {
        await page.goto(`http://127.0.0.1:4173${route}`, {
          waitUntil: "networkidle",
        });
        const metrics = await page.evaluate(() => {
          const heading = document.querySelector("main h1");
          const name = heading.querySelector(".home-name");
          const styles = getComputedStyle(document.documentElement);
          const luminance = (color) => {
            const values = color
              .match(/[\d.]+/g)
              .slice(0, 3)
              .map(Number)
              .map((v) => v / 255)
              .map((v) =>
                v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4,
              );
            return 0.2126 * values[0] + 0.7152 * values[1] + 0.0722 * values[2];
          };
          let contrast = null;
          if (name) {
            const fore = luminance(getComputedStyle(name).color);
            const back = luminance(
              getComputedStyle(document.body).backgroundColor,
            );
            contrast =
              (Math.max(fore, back) + 0.05) / (Math.min(fore, back) + 0.05);
          }
          return {
            heading: heading.textContent,
            fontSize: parseFloat(getComputedStyle(heading).fontSize),
            fontFamily: getComputedStyle(heading).fontFamily,
            introHeight: document
              .querySelector(".page-intro")
              .getBoundingClientRect().height,
            gold: styles.getPropertyValue("--gold").trim(),
            accent: name ? getComputedStyle(name).color : null,
            primary: getComputedStyle(heading).color,
            contrast,
            photoTop: document
              .querySelector(".about-opening")
              ?.getBoundingClientRect().top,
            columns: document.querySelector(".about-opening")
              ? getComputedStyle(
                  document.querySelector(".about-opening"),
                ).gridTemplateColumns.split(" ").length
              : null,
            overflow: document.documentElement.scrollWidth > innerWidth + 1,
            secondaryHeadings:
              document.querySelectorAll(".page-intro h2").length,
          };
        });
        assert.equal(
          metrics.overflow,
          false,
          `${route}, ${device}, ${theme}: overflow`,
        );
        assert.equal(
          metrics.secondaryHeadings,
          0,
          "Opening should not repeat a second display heading.",
        );
        assert.equal(
          metrics.gold,
          theme === "dark" ? "#c5a66a" : "#8a6224",
          "Existing gold accents must be preserved.",
        );
        if (width === 1440)
          assert.ok(
            metrics.fontSize >= (route === "/" ? 44 : 40) &&
              metrics.fontSize <= (route === "/" ? 48 : 46),
          );
        else assert.ok(metrics.fontSize >= 28 && metrics.fontSize <= 36);
        if (route === "/") {
          assert.equal(metrics.heading, "Hello, I'm Saagar.");
          assert.equal(
            metrics.accent,
            theme === "dark" ? "rgb(208, 180, 123)" : "rgb(169, 54, 50)",
          );
          assert.ok(metrics.contrast >= 4.5);
          assert.ok(
            metrics.photoTop < 300,
            "Photograph should follow the short greeting closely.",
          );
          assert.equal(metrics.columns, width === 1440 ? 2 : 1);
        }
        await page.screenshot({
          path: `${output}/typography-${route === "/" ? "home" : route.slice(1)}-${theme}-${device}.png`,
        });
        review.push({ route, theme, device, ...metrics });
      }
    }
  }
  await writeFile(
    ".tools/typography-review.json",
    JSON.stringify(review, null, 2),
  );
  console.log(
    `Reviewed ${review.length} page/theme/viewport combinations. Greeting contrast: ${review
      .filter((row) => row.route === "/")
      .map((row) => `${row.theme}/${row.device} ${row.contrast.toFixed(2)}:1`)
      .join(", ")}.`,
  );
} finally {
  await browser.close();
}
