import { readdir, readFile, access } from "node:fs/promises";
import { join } from "node:path";
import assert from "node:assert/strict";

async function originals(directory = "public/photos", prefix = "") {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (entry.name === "optimized") continue;
    const relative = prefix + entry.name;
    if (entry.isDirectory())
      files.push(
        ...(await originals(join(directory, entry.name), relative + "/")),
      );
    else if (/\.(jpe?g|png|webp|avif)$/i.test(entry.name)) files.push(relative);
  }
  return files;
}
const manifest = JSON.parse(await readFile("src/content/photos.json", "utf8"));
assert.deepEqual(
  manifest.map((photo) => photo.file).sort(),
  (await originals()).sort(),
  "Photo manifest is out of date. Run npm run photos:sync.",
);
assert.equal(
  new Set(manifest.map((photo) => photo.id)).size,
  manifest.length,
  "Photo IDs must be unique.",
);
await Promise.all(
  manifest.flatMap((photo) =>
    [480, 960, 1600].map((size) =>
      access(`public/photos/optimized/${photo.id}-${size}.webp`),
    ),
  ),
);
console.log(
  `Verified all ${manifest.length} originals and ${manifest.length * 3} responsive photo assets.`,
);
