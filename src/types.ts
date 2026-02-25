/**
 * Image set identifier.
 * - 'mm' = moon monthly (synodic cycle, 708 images)
 * - 'my' = moon yearly (calendar year, 8,760 images)
 */
export type ImageSet = 'mm' | 'my';

/**
 * Image dimension in pixels (square).
 */
export type ImageSize = 256 | 512;

/**
 * WebP compression quality level.
 */
export type ImageQuality = 75 | 85;

/**
 * Length of one synodic month in days.
 * Source: IAU mean value (J2000.0 epoch).
 */
export const SYNODIC_MONTH = 29.53058821398858;

/** Number of images in the monthly (mm) dataset. */
export const MONTH_IMAGES = 708;

/** Number of images in the yearly (my) dataset. */
export const YEAR_IMAGES = 8760;

/**
 * Anchor date for the monthly cycle: the 2023-11-13 new moon (UTC).
 * All synodic phase calculations are derived from this reference point.
 */
export const MONTH_ANCHOR = new Date('2023-11-13T09:27:00Z');

/**
 * Anchor date for the yearly cycle: start of the 2023 NASA image collection.
 * The 8,760 images correspond to one per hour for the full calendar year 2023.
 */
export const YEAR_ANCHOR = new Date('2023-01-01T00:00:00Z');
