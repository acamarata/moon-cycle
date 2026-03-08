import { SYNODIC_MONTH, MONTH_IMAGES, MONTH_ANCHOR } from './types.js';

const SYNODIC_SECONDS = SYNODIC_MONTH * 24 * 60 * 60;

/**
 * Maps a date to the corresponding NASA moon phase image for the monthly cycle.
 *
 * The monthly dataset contains 708 hourly images spanning exactly one synodic
 * month (29.53 days). This function computes the fractional position within
 * the current synodic month relative to the 2023-11-13 new moon anchor and
 * maps that fraction to an image index in [1, 708].
 *
 * @param date - The date to resolve. Defaults to the current time.
 * @returns A zero-padded filename string, e.g. `"354.webp"`.
 */
export function cycleMonth(date: Date = new Date()): string {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    throw new TypeError('date must be a valid Date instance');
  }

  // Seconds elapsed since the known new moon anchor
  const elapsed = (date.getTime() - MONTH_ANCHOR.getTime()) / 1000;

  // Total synodic months elapsed (may be negative for past dates)
  const months = elapsed / SYNODIC_SECONDS;

  // Fractional part of the current month: always in [0, 1)
  const fraction = months - Math.floor(months);

  // Map to 1-indexed image number: 1 to MONTH_IMAGES
  const index = Math.floor(fraction * MONTH_IMAGES) + 1;

  return index.toString().padStart(3, '0') + '.webp';
}
