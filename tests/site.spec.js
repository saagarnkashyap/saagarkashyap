import { test, expect } from "@playwright/test";
import { readFileSync } from "node:fs";
const photoManifest = JSON.parse(
  readFileSync("src/content/photos.json", "utf8"),
);

// Test portfolio behavior independently of third-party uptime.
// Real Strava rendering is reviewed separately with the supplied embeds.
test.beforeEach(async ({ page }) => {
  await page.route("https://strava-embeds.com/**", (route) =>
    route.fulfill({
      contentType: "text/html",
      body: "<!doctype html><html lang='en'><title>Strava embed test fixture</title><body>Activity embed fixture</body></html>",
    }),
  );
});

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
  "/strava",
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

test("every project has a concise README and linked image previews of other projects", async ({
  page,
}) => {
  const slugs = [
    "bheeshma",
    "arti-e",
    "neuroasha",
    "wafex",
    "falconet",
    "claudetrippy",
    "drishtinet",
    "semiconductor-insights",
    "ridezilla",
  ];
  for (const slug of slugs) {
    await page.goto(`/work/${slug}`);
    await expect(page.locator(".case-readme-header")).toHaveText("README.md");
    await expect(page.locator(".case-readme-content li")).toHaveCount(3);
    await expect(page.locator(".case-section, .next-project")).toHaveCount(0);
    await expect(page.getByText("Keep exploring", { exact: true })).toHaveCount(
      0,
    );
    const previews = page.locator(".case-related .project-cover");
    await expect(previews).toHaveCount(4);
    const hrefs = await previews.evaluateAll((links) =>
      links.map((link) => link.getAttribute("href")),
    );
    expect(new Set(hrefs).size).toBe(4);
    expect(hrefs).not.toContain(`/work/${slug}`);
    for (const href of hrefs) expect(slugs).toContain(href.split("/").at(-1));
    await expect(
      page
        .locator(".case-related")
        .getByRole("link", { name: "View all work", exact: true }),
    ).toHaveAttribute("href", "/work");
    await previews.first().click();
    await expect(page).toHaveURL(new RegExp(`${hrefs[0]}$`));
    await expect(page.locator("main")).toBeFocused();
    await expect(page.locator(".case-readme-content li")).toHaveCount(3);
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
      "/strava",
      "/strava/trophies",
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
  await expect(page).toHaveURL(/\/strava$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Strava");
  await page.goto("/running");
  await expect(page).toHaveURL(/\/strava$/);
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
      "/strava",
      "/strava/trophies",
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

test("section dividers, Certificates, and the Strava profile use the supplied content", async ({
  page,
}) => {
  await page.goto("/");
  expect(
    await page
      .locator("#experience .experience-list > article")
      .last()
      .evaluate((el) => getComputedStyle(el).borderBottomWidth),
  ).toBe("0px");
  const titles = page.locator(".home-project-title");
  expect(
    await titles
      .last()
      .evaluate((el) => getComputedStyle(el).borderBottomWidth),
  ).toBe("0px");
  if (page.viewportSize().width > 760)
    expect(
      await titles
        .nth(2)
        .evaluate((el) => getComputedStyle(el).borderBottomWidth),
    ).toBe("0px");
  expect(
    await page
      .locator(".home-photography .chapter")
      .evaluate((el) => getComputedStyle(el).borderTopWidth),
  ).toBe("1px");
  await page.goto("/about");
  await expect(
    page
      .locator("#certificates")
      .getByRole("heading", { name: /Certificates$/ }),
  ).toBeVisible();
  await expect(page.getByText("Learning, with a paper trail.")).toHaveCount(0);

  await page.goto("/strava");
  await expect(
    page
      .locator(".site-nav")
      .getByRole("link", { name: "Strava", exact: true, includeHidden: true }),
  ).toHaveAttribute("href", "/strava");
  expect(await page.locator(".strava-totals dd").allTextContents()).toEqual([
    "204",
    "4,159.8 km",
    "20,588 m",
    "261h 18m",
  ]);
  expect(
    await page.locator(".strava-bikes .text-link").allTextContents(),
  ).toEqual(["bhairavi", "hemavati", "kali"]);
  await expect(page.locator(".strava-records > div")).toHaveCount(3);
  await expect(page.locator(".strava-effort-times > div")).toHaveCount(11);
  expect(
    await page.locator(".strava-effort-times dt").allTextContents(),
  ).toEqual([
    "5 mile",
    "10K",
    "10 mile",
    "20K",
    "30K",
    "40K",
    "50K",
    "80K",
    "50 mile",
    "90K",
    "100K",
  ]);
  await expect(page.locator(".strava-intro-photo img")).toHaveCount(1);
  const gearRows = await page
    .locator(".strava-bikes li")
    .evaluateAll((items) =>
      items.map((item) => Math.round(item.getBoundingClientRect().top)),
    );
  expect(new Set(gearRows).size).toBe(1);
  expect(
    await page
      .locator(".strava-activities")
      .evaluate(
        (el) => getComputedStyle(el).gridTemplateColumns.split(" ").length,
      ),
  ).toBe(
    page.viewportSize().width >= 1280
      ? 4
      : page.viewportSize().width > 760
        ? 2
        : 1,
  );
  await expect(
    page.getByRole("link", { name: "View my trophy case on Strava" }),
  ).toHaveAttribute("href", "https://www.strava.com/athletes/123068868");
  await expect(page.locator(".strava-trophy-grid li")).toHaveCount(6);
  await expect(page.locator(".strava-medal-photos")).toHaveCount(0);
  await expect(
    page.getByRole("link", { name: "Show more trophies" }),
  ).toHaveAttribute("href", "/strava/trophies");
  await expect(page.locator(".strava-trophy-grid a").first()).toHaveAttribute(
    "href",
    "https://www.strava.com/challenges/No-bad-weather-with-Weather-&-Radar-2026",
  );
  const ids = [
    "19958146653",
    "19553886327",
    "18686832110",
    "18260083376",
    "18061270930",
    "17553633686",
    "17401184048",
  ];
  const sources = await page
    .locator(".strava-activity iframe")
    .evaluateAll((frames) => frames.map((frame) => frame.src));
  expect(sources).toHaveLength(7);
  for (let i = 0; i < ids.length; i++) {
    const url = new URL(sources[i]);
    expect(url.origin).toBe("https://strava-embeds.com");
    expect(url.pathname).toBe(`/activity/${ids[i]}`);
    expect(url.searchParams.get("token")).toBeTruthy();
  }
  await expect(page.locator(".strava-weekly")).toHaveCount(0);
  await expect(
    page.getByRole("heading", { name: "Weekly activity", exact: true }),
  ).toHaveCount(0);
  await expect(page.locator(".running-empty, .running-related")).toHaveCount(0);
});

test("Strava trophy preview opens its own page with the small photo before all badges", async ({
  page,
  request,
}) => {
  await page.goto("/strava");
  const theme = await page.locator("html").getAttribute("data-theme");
  await page
    .getByRole("link", { name: "Show more trophies", exact: true })
    .click();
  await expect(page).toHaveURL(/\/strava\/trophies$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Trophy case",
  );
  await expect(page.locator("main")).toBeFocused();
  await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
  await expect(
    page
      .getByRole("navigation", { name: "Main navigation", includeHidden: true })
      .getByRole("link", {
        name: "Trophies",
        exact: true,
        includeHidden: true,
      }),
  ).toHaveAttribute("aria-current", "page");
  const mainNavigation = page.getByRole("navigation", {
    name: "Main navigation",
    includeHidden: true,
  });
  expect(await mainNavigation.locator("a").allTextContents()).toEqual([
    "Home",
    "Work",
    "Writing",
    "Photos",
    "Strava",
    "Trophies",
    "About",
  ]);
  await expect(mainNavigation.locator('a[aria-current="page"]')).toHaveCount(1);
  await expect(
    page.getByRole("navigation", { name: "Strava sections" }),
  ).toHaveCount(0);
  await expect(page.locator(".strava-trophy-grid li")).toHaveCount(293);
  const photos = page.locator(".strava-medal-photos img");
  await expect(photos).toHaveCount(1);
  for (const image of await photos.all()) {
    await image.scrollIntoViewIfNeeded();
    await image.evaluate((img) => img.decode());
    const box = await image.boundingBox();
    if (page.viewportSize().width <= 760) {
      expect(box.width).toBeLessThanOrEqual(250);
      const sourceRatio = await image.evaluate(
        (img) => img.naturalWidth / img.naturalHeight,
      );
      expect(Math.abs(box.width / box.height - sourceRatio)).toBeLessThan(0.01);
    } else {
      expect(box.width).toBeLessThanOrEqual(320);
      expect(box.height).toBe(200);
      expect(
        await image.evaluate((img) => getComputedStyle(img).objectFit),
      ).toBe("cover");
    }
  }
  expect(
    await page
      .locator(".strava-medal-photos")
      .evaluate((el) =>
        Boolean(
          el.compareDocumentPosition(
            document.querySelector(".strava-trophy-grid"),
          ) & Node.DOCUMENT_POSITION_FOLLOWING,
        ),
      ),
  ).toBe(true);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth + 1,
    ),
  ).toBe(true);
  const html = await (await request.get("/strava/trophies")).text();
  expect(html).toContain("<h1>Trophy case</h1>");
  expect(html).toContain("/strava/trophies");
  if (page.viewportSize().width <= 760)
    await page.getByRole("button", { name: "Menu +", exact: true }).click();
  await mainNavigation
    .getByRole("link", { name: "Strava", exact: true })
    .click();
  await expect(page).toHaveURL(/\/strava$/);
  await expect(page.locator(".strava-trophy-grid li")).toHaveCount(6);
});
