import { test, expect } from "@playwright/test";
import { readFileSync } from "node:fs";
const photoManifest = JSON.parse(
  readFileSync("src/content/photos.json", "utf8"),
);

const paths = [
  "/",
  "/work",
  "/work/bheeshma",
  "/work/arti-e",
  "/work/semiconductor-insights",
  "/work/wafex",
  "/work/ridezilla",
  "/work/neuroasha",
  "/work/falconet",
  "/work/claudetrippy",
  "/work/drishtinet",
  "/writing",
  "/photos",
  "/about",
  "/cycling",
  "/now",
];

test("all routes render, hydrate, load assets, and fit the viewport", async ({
  page,
}) => {
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  for (const path of paths) {
    await page.goto(path, { waitUntil: "networkidle" });
    await expect(page.locator("main h1")).toHaveCount(1);
    await expect(page.locator("head title")).toHaveCount(1);
    await expect(page.locator('head link[rel="canonical"]')).toHaveCount(1);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth + 1,
      ),
      path,
    ).toBe(true);
    // Include below-fold, lazy-loaded images in the check.
    const images = page.locator("main img");
    for (const image of await images.all()) {
      await image.scrollIntoViewIfNeeded();
      await expect
        .poll(() =>
          image.evaluate((img) => img.complete && img.naturalWidth > 0),
        )
        .toBe(true);
    }
  }
  expect(errors).toEqual([]);
});

test("Home previews open the nine-project work archive in its editorial order", async ({
  page,
}) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "GlobalFoundries", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Tiger Analytics", exact: true }),
  ).toBeVisible();
  await expect(page.locator(".wordmark")).toHaveText("Saagar Kashyap");
  await expect(page.locator(".home-project-preview")).toHaveCount(4);
  await expect(
    page.locator(".home-project-preview").first().locator("img"),
  ).toHaveAttribute("src", "/projects/bheeshma-dark.webp");
  await expect(
    page.locator(".home-project-preview").nth(1).locator("img"),
  ).toHaveAttribute("src", "/projects/arti-e.webp");
  await expect(
    page.locator(".home-project-preview").nth(2).locator("img"),
  ).toHaveAttribute("src", "/projects/WAFER-X.png");
  await expect(
    page.locator(".home-project-preview").nth(3).locator("img"),
  ).toHaveAttribute("src", "/projects/neuroasha.png");
  for (const preview of await page.locator(".home-project-preview").all()) {
    await expect(preview).toHaveAttribute("href", "/work");
  }
  await expect(
    page.locator(".home-projects-heading .all-work-button"),
  ).toHaveText("View all work");
  await expect(
    page.locator(
      ".writing-home, .photo-home, .running-home, .work-strip, .project-description",
    ),
  ).toHaveCount(0);
  await page.locator(".home-project-preview").first().click();
  await expect(page).toHaveURL(/\/work$/);
  await expect(page.locator(".project-item")).toHaveCount(9);
  await expect(page.locator(".filter-count")).toHaveText("09 PROJECTS");
  expect(await page.locator(".project-index").allTextContents()).toEqual([
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
  ]);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Work archive",
  );
  expect(
    await page
      .locator(".page-title-row h1")
      .evaluate((element) => parseFloat(getComputedStyle(element).fontSize)),
  ).toBeGreaterThan(
    await page
      .locator(".intro-description")
      .evaluate((element) => parseFloat(getComputedStyle(element).fontSize)),
  );
  expect(await page.locator(".project-caption h3").allTextContents()).toEqual([
    "Bheeshma",
    "ARTI-E",
    "NeuroAsha",
    "WAFERX",
    "Falconet",
    "claudetrippy",
    "DrishtiNet",
    "Semiconductor insights",
    "RideZilla",
  ]);
  for (const [filter, names] of [
    ["Web & personal", ["Bheeshma", "NeuroAsha", "claudetrippy", "RideZilla"]],
    [
      "Data & intelligence",
      [
        "NeuroAsha",
        "WAFERX",
        "Falconet",
        "DrishtiNet",
        "Semiconductor insights",
      ],
    ],
    [
      "Engineering",
      [
        "ARTI-E",
        "WAFERX",
        "Falconet",
        "claudetrippy",
        "Semiconductor insights",
      ],
    ],
  ]) {
    await page.getByRole("button", { name: filter, exact: true }).click();
    expect(await page.locator(".project-caption h3").allTextContents()).toEqual(
      names,
    );
    await expect(page.locator(".filter-count")).toHaveText(
      `${String(names.length).padStart(2, "0")} PROJECTS`,
    );
  }
  await page.getByRole("button", { name: "All work", exact: true }).click();
  await page
    .getByRole("link", { name: "Explore Bheeshma", exact: true })
    .click();
  await expect(page).toHaveURL(/\/work\/bheeshma$/);
  await expect(page.locator("main")).toBeFocused();
  await page.goto("/work/wafex");
  await expect(page.locator(".case-visual img")).toHaveAttribute(
    "src",
    "/projects/WAFER-X.png",
  );
});

test("new case studies use real media, correctly labeled links, and motion controls", async ({
  page,
}) => {
  await page.goto("/work/falconet");
  await expect(
    page.getByRole("link", { name: "Watch the video on LinkedIn" }),
  ).toHaveAttribute("href", "https://lnkd.in/p/gTTDEmjH");
  await expect(
    page.getByRole("link", { name: "Source on GitHub" }),
  ).toHaveAttribute("href", "https://github.com/saagarnkashyap/Falconet");
  await expect(
    page.getByRole("link", { name: "Open live project" }),
  ).toHaveCount(0);
  await expect(page.locator(".case-visual img")).toHaveAttribute(
    "src",
    "/projects/falconet.gif",
  );

  await page.goto("/work/drishtinet");
  await expect(
    page.getByRole("link", { name: "Read the research notebook" }),
  ).toHaveAttribute(
    "href",
    "https://github.com/saagarnkashyap/DrishtiNet/blob/main/06thMar26_draft1.ipynb",
  );
  const scientificImage = page.locator(".case-visual img");
  await expect(scientificImage).toHaveAttribute(
    "src",
    "/projects/drishtinet.webp",
  );
  expect(
    await scientificImage.evaluate((img) => getComputedStyle(img).objectFit),
  ).toBe("contain");
  await expect(scientificImage).toHaveAttribute("width", "1234");
  await expect(scientificImage).toHaveAttribute("height", "413");

  for (const [slug, name] of [
    ["falconet", "Falconet"],
    ["claudetrippy", "claudetrippy"],
  ]) {
    for (const route of ["/work", `/work/${slug}`]) {
      await page.goto(route);
      const preview =
        route === "/work"
          ? page.locator(".project-item").filter({
              has: page.getByRole("heading", {
                name,
                exact: true,
              }),
            })
          : page.locator(".case-visual");
      const image = preview.locator("img");
      await expect(image).toHaveAttribute("src", `/projects/${slug}.gif`);
      await preview.getByRole("button", { name: "Pause animation" }).click();
      await expect(image).toHaveAttribute(
        "src",
        `/projects/${slug}-poster.webp`,
      );
      await preview.getByRole("button", { name: "Play animation" }).click();
      await expect(image).toHaveAttribute("src", `/projects/${slug}.gif`);
      await expect(page).toHaveURL(new RegExp(`${route}$`));
      await page.emulateMedia({ reducedMotion: "reduce" });
      await expect
        .poll(() => image.evaluate((img) => img.currentSrc))
        .toContain(`${slug}-poster.webp`);
      await expect(
        preview.getByRole("button", { name: "Pause animation" }),
      ).toBeHidden();
      await page.emulateMedia({ reducedMotion: "no-preference" });
    }
  }
});

test("small phones and intermediate widths remain usable", async ({
  page,
}, info) => {
  test.skip(
    info.project.name !== "desktop",
    "Covered once with explicit viewport sizes.",
  );
  for (const width of [320, 768, 1024]) {
    await page.setViewportSize({ width, height: 900 });
    for (const path of [
      "/",
      "/work",
      "/photos",
      "/cycling",
      "/about",
      "/now",
      "/work/semiconductor-insights",
    ]) {
      await page.goto(path, { waitUntil: "networkidle" });
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth + 1,
        ),
        `${path} at ${width}px`,
      ).toBe(true);
    }
  }
});

test("gallery supports filtering, keyboard navigation, focus trapping and restoration", async ({
  page,
}) => {
  await page.goto("/photos");
  await expect(page.locator(".gallery-image")).toHaveCount(
    photoManifest.length,
  );
  await page.getByRole("button", { name: "After hours", exact: true }).click();
  await expect(page.locator(".gallery-image")).toHaveCount(
    photoManifest.filter((photo) => photo.collection === "After hours").length,
  );
  const trigger = page.locator(".gallery-image").first();
  await trigger.click();
  await expect(page.getByRole("dialog")).toBeVisible();
  const first = await page.locator(".lightbox-inner>img").getAttribute("src");
  await page.keyboard.press("ArrowRight");
  await expect(page.locator(".lightbox-inner>img")).not.toHaveAttribute(
    "src",
    first,
  );
  await page
    .getByRole("button", { name: "Next photograph", exact: true })
    .focus();
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("button", { name: "Close photograph viewer" }),
  ).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await expect(trigger).toBeFocused();
});

test("photo deep links, empty content, legacy routes and missing pages work", async ({
  page,
  request,
}) => {
  await page.goto("/photos?photo=the-counter");
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.getByRole("button", { name: "Close photograph viewer" }).click();
  await page.goto("/cycling");
  await expect(page.getByText("NO ACTIVITIES PUBLISHED YET")).toBeVisible();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Cycling Journal",
  );
  await page.goto("/running");
  await expect(page).toHaveURL(/\/cycling$/);
  await page.goto("/writing");
  await expect(page.locator(".writing-empty")).toBeVisible();
  await page.goto("/blog/photography");
  await expect(page).toHaveURL(/\/photos$/);
  await page.goto("/work/not-a-real-project");
  await expect(
    page.getByRole("heading", { name: "Page not found", exact: true }),
  ).toBeVisible();
  for (const url of [
    "/rss.xml",
    "/sitemap.xml",
    "/robots.txt",
    "/Saagar-Kashyap-Resume.pdf",
  ]) {
    expect((await request.get(url)).status()).toBe(200);
  }
  const html = await (await request.get("/work/bheeshma")).text();
  expect(html).toContain("<h1>Bheeshma");
  expect(html).toContain("<title>Bheeshma");
});

test("navigation menu is keyboard usable and closes after navigation", async ({
  page,
}, info) => {
  await page.goto("/");
  if (info.project.name === "mobile") {
    const menu = page.locator(".menu-toggle");
    await menu.click();
    await expect(menu).toHaveAttribute("aria-expanded", "true");
    await page.keyboard.press("Escape");
    await expect(menu).toBeFocused();
    await menu.click();
  }
  await page
    .getByRole("navigation", { name: "Main navigation" })
    .getByRole("link", { name: "About", exact: true })
    .click();
  await expect(page).toHaveURL(/\/about$/);
  await expect(page.locator("main")).toBeFocused();
  if (info.project.name === "mobile")
    await expect(page.getByRole("button", { name: "Menu +" })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
});

test("pages have no serious or critical automated accessibility issues", async ({
  page,
}) => {
  const axe = readFileSync("node_modules/axe-core/axe.min.js", "utf8");
  for (const theme of ["dark", "light"]) {
    await page.goto("/");
    await page.evaluate(
      (value) => localStorage.setItem("portfolio-theme", value),
      theme,
    );
    for (const path of [
      "/",
      "/work",
      "/photos",
      "/about",
      "/cycling",
      "/writing",
    ]) {
      await page.goto(path, { waitUntil: "networkidle" });
      await page.addScriptTag({ content: axe });
      const results = await page.evaluate(async () =>
        window.axe.run(document, {
          runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21aa"] },
        }),
      );
      const violations = results.violations.filter((v) =>
        ["serious", "critical"].includes(v.impact),
      );
      expect(
        violations.map((v) => ({
          id: v.id,
          nodes: v.nodes.map((n) => n.target),
        })),
        `${path} in ${theme} theme`,
      ).toEqual([]);
    }
  }
});

test("theme selection persists and the 16:9 photography slider works", async ({
  page,
}) => {
  await page.goto("/");
  const initial = await page.locator("html").getAttribute("data-theme");
  await page.locator(".theme-toggle").click();
  const next = initial === "dark" ? "light" : "dark";
  await expect(page.locator("html")).toHaveAttribute("data-theme", next);
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", next);
  await expect(page.locator(".company-logo img")).toHaveCount(2);
  const frame = page.locator(".photo-slide-frame");
  const bounds = await frame.boundingBox();
  expect(Math.abs(bounds.width / bounds.height - 16 / 9)).toBeLessThan(0.01);
  const first = await frame.locator("img").getAttribute("src");
  await page.getByRole("button", { name: "Next selected photograph" }).click();
  await expect(frame.locator("img")).not.toHaveAttribute("src", first);
  await page.locator(".photo-slider").focus();
  await page.keyboard.press("ArrowLeft");
  await expect(frame.locator("img")).toHaveAttribute("src", first);
  await page
    .getByRole("button", { name: "Show photograph 3", exact: true })
    .click();
  await expect(
    page.getByRole("button", { name: "Show photograph 3", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await page
    .getByRole("link", { name: "Explore my photography", exact: true })
    .click();
  await expect(page).toHaveURL(/\/photos$/);
  await expect(page.locator("html")).toHaveAttribute("data-theme", next);
  await page.locator(".gallery-image").first().click();
  await expect(page.locator("#lightbox-caption")).toHaveText(
    "Caption to come.",
  );
});
