import { ImageSet, ImageSize, ImageQuality } from "./types.js";

/**
 * Returns the folder name for a given image set, size, and quality.
 *
 * Folder names follow the pattern `{set}-{size}-{quality}`, matching the
 * directory layout in the moon-cycle repository.
 *
 * @example
 * imageFolder('mm', 256, 75) // => 'mm-256-75'
 * imageFolder('my', 512, 85) // => 'my-512-85'
 */
export function imageFolder(set: ImageSet, size: ImageSize, quality: ImageQuality): string {
  return `${set}-${size}-${quality}`;
}

/**
 * Returns a jsDelivr CDN URL for a specific moon image.
 *
 * jsDelivr serves files directly from GitHub repositories, making it a
 * practical option for web applications that need the images without
 * bundling ~438 MB of assets locally.
 *
 * @param filename - Filename returned by `cycleMonth` or `cycleYear`, e.g. `"354.webp"`.
 * @param set - Image set: `'mm'` (monthly) or `'my'` (yearly).
 * @param size - Image dimension: `256` or `512`.
 * @param quality - WebP quality: `75` or `85`.
 * @param ref - Git ref (branch, tag, or commit SHA). Defaults to `'main'`.
 * @returns A full CDN URL string.
 *
 * @example
 * const file = cycleMonth();
 * const url = cdnUrl(file, 'mm', 256, 75);
 * // => 'https://cdn.jsdelivr.net/gh/acamarata/moon-cycle@main/mm-256-75/354.webp'
 */
export function cdnUrl(
  filename: string,
  set: ImageSet,
  size: ImageSize,
  quality: ImageQuality,
  ref: string = "main",
): string {
  const folder = imageFolder(set, size, quality);
  return `https://cdn.jsdelivr.net/gh/acamarata/moon-cycle@${ref}/${folder}/${filename}`;
}
