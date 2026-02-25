import { YEAR_IMAGES, YEAR_ANCHOR } from './types.js';

/**
 * Maps a date to the corresponding NASA moon image for the yearly cycle.
 *
 * The yearly dataset contains 8,760 hourly images covering the full calendar
 * year 2023 (365 days × 24 hours). This function computes the fractional
 * position within a 365-day year relative to 2023-01-01 and maps that
 * fraction to an image index in [1, 8760].
 *
 * The cycle repeats annually, so dates in any year resolve to the equivalent
 * hour-of-year position in the 2023 imagery.
 *
 * @param date - The date to resolve. Defaults to the current time.
 * @returns A zero-padded filename string, e.g. `"4380.webp"`.
 */
export function cycleYear(date: Date = new Date()): string {
  // Hours elapsed since 2023-01-01T00:00:00Z
  const elapsed_hours = (date.getTime() - YEAR_ANCHOR.getTime()) / (1000 * 3600);

  // Total years elapsed (may be negative for past dates)
  const years = elapsed_hours / YEAR_IMAGES;

  // Fractional part of the current year: always in [0, 1)
  const fraction = years - Math.floor(years);

  // Map to 1-indexed image number: 1 to YEAR_IMAGES
  const index = Math.floor(fraction * YEAR_IMAGES) + 1;

  return index.toString().padStart(4, '0') + '.webp';
}
