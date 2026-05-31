/**
 * Image set identifier.
 *
 * - `'mm'` = monthly dataset: 708 hourly images covering one synodic cycle
 * - `'my'` = yearly dataset: 8,760 hourly images covering calendar year 2023
 *
 * @example
 * import type { ImageSet } from 'moon-cycle';
 * const set: ImageSet = 'mm'; // monthly synodic cycle
 */
export type ImageSet = 'mm' | 'my';

/**
 * Image dimension in pixels (square).
 *
 * Both values produce square images. Use `256` for thumbnails and smaller
 * displays; use `512` for high-DPI or full-size display contexts.
 *
 * @example
 * import type { ImageSize } from 'moon-cycle';
 * const size: ImageSize = 256;
 */
export type ImageSize = 256 | 512;

/**
 * WebP compression quality level.
 *
 * `75` gives smaller files with minor quality loss. `85` gives higher visual
 * fidelity at roughly 1.5x the file size. The difference is most visible on
 * large displays or when zoomed in.
 *
 * @example
 * import type { ImageQuality } from 'moon-cycle';
 * const quality: ImageQuality = 75; // smaller, faster
 */
export type ImageQuality = 75 | 85;

/**
 * Length of one synodic month in days.
 *
 * IAU mean value at J2000.0. Used by `cycleMonth` to divide the elapsed
 * time into a fractional position within the current lunar cycle.
 *
 * @example
 * import { SYNODIC_MONTH } from 'moon-cycle';
 * // Days old: how far into the current cycle
 * const now = new Date();
 * const elapsed = (now.getTime() - MONTH_ANCHOR.getTime()) / 86400000;
 * const age = ((elapsed % SYNODIC_MONTH) + SYNODIC_MONTH) % SYNODIC_MONTH;
 */
export const SYNODIC_MONTH = 29.53058821398858;

/**
 * Number of images in the monthly (`mm`) dataset.
 *
 * Equals the number of hours in one synodic month, rounded to the nearest
 * integer. Filenames range from `"001.webp"` to `"708.webp"`.
 *
 * @example
 * import { MONTH_IMAGES } from 'moon-cycle';
 * // Fraction of the way through the synodic cycle
 * const index = Math.floor(fraction * MONTH_IMAGES) + 1;
 */
export const MONTH_IMAGES = 708;

/**
 * Number of images in the yearly (`my`) dataset.
 *
 * Equals 365 days × 24 hours. Filenames range from `"0001.webp"` to
 * `"8760.webp"`.
 *
 * @example
 * import { YEAR_IMAGES } from 'moon-cycle';
 * // Total hours in the yearly dataset
 * console.log(YEAR_IMAGES); // 8760
 */
export const YEAR_IMAGES = 8760;

/**
 * Anchor date for the monthly cycle: the 2023-11-13 new moon (UTC).
 *
 * All synodic phase calculations measure elapsed time from this reference
 * point. Confirmed against JPL Horizons ephemeris data.
 *
 * @example
 * import { MONTH_ANCHOR } from 'moon-cycle';
 * const ageMs = Date.now() - MONTH_ANCHOR.getTime();
 */
export const MONTH_ANCHOR = new Date('2023-11-13T09:27:00Z');

/**
 * Anchor date for the yearly cycle: start of the 2023 NASA image collection.
 *
 * The 8,760 images correspond to one per hour for the full calendar year
 * 2023. `cycleYear` measures elapsed time from this reference point.
 *
 * @example
 * import { YEAR_ANCHOR } from 'moon-cycle';
 * const hours = (Date.now() - YEAR_ANCHOR.getTime()) / 3600000;
 */
export const YEAR_ANCHOR = new Date('2023-01-01T00:00:00Z');
