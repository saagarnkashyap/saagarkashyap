import photoManifest from "./photos.json";

export const photos = photoManifest;
export const featuredPhotos = [
  "frame-screenshot-20261023-101706-instagram-1-jpeg",
  "frame-1000085414-edited-jpeg",
  "frame-20261008-212727-1-jpeg",
  "frame-1000079732-jpg",
  "frame-1000079779-jpg",
  "frame-20260827-211821-jpeg",
  "frame-20261020-012452-jpeg",
]
  .map((id) => photos.find((photo) => photo.id === id))
  .filter(Boolean);

export function photoSource(photo, size = 960) {
  return `/photos/optimized/${photo.id}-${size}.webp`;
}
export function photoSrcSet(photo) {
  return [480, 960, 1600]
    .map(
      (size) => `${photoSource(photo, size)} ${Math.min(size, photo.width)}w`,
    )
    .join(", ");
}
