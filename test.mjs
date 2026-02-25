/**
 * ESM test suite for moon-cycle v2.
 * Uses Node.js built-in assert — no test framework required.
 */

import assert from 'node:assert/strict';
import {
  cycleMonth,
  cycleYear,
  imageFolder,
  cdnUrl,
  SYNODIC_MONTH,
  MONTH_IMAGES,
  YEAR_IMAGES,
  MONTH_ANCHOR,
  YEAR_ANCHOR,
} from './dist/index.mjs';

let passed = 0;
let total = 0;

function test(name, fn) {
  total++;
  try {
    fn();
    console.log(`[${name}]... PASS`);
    passed++;
  } catch (err) {
    console.error(`[${name}]... FAIL: ${err.message}`);
    process.exitCode = 1;
  }
}

// ─── Constants ───────────────────────────────────────────────────────────────

test('SYNODIC_MONTH is correct IAU value', () => {
  assert.strictEqual(SYNODIC_MONTH, 29.53058821398858);
});

test('MONTH_IMAGES is 708', () => {
  assert.strictEqual(MONTH_IMAGES, 708);
});

test('YEAR_IMAGES is 8760', () => {
  assert.strictEqual(YEAR_IMAGES, 8760);
});

test('MONTH_ANCHOR is 2023-11-13T09:27:00Z', () => {
  assert.strictEqual(MONTH_ANCHOR.toISOString(), '2023-11-13T09:27:00.000Z');
});

test('YEAR_ANCHOR is 2023-01-01T00:00:00Z', () => {
  assert.strictEqual(YEAR_ANCHOR.toISOString(), '2023-01-01T00:00:00.000Z');
});

// ─── cycleMonth: return format ────────────────────────────────────────────────

test('cycleMonth returns a string', () => {
  assert.strictEqual(typeof cycleMonth(), 'string');
});

test('cycleMonth result matches /^\\d{3}\\.webp$/', () => {
  const result = cycleMonth();
  assert.match(result, /^\d{3}\.webp$/);
});

test('cycleMonth result is never 000.webp (images are 1-indexed)', () => {
  // Test many dates across different lunar phases
  const anchor = MONTH_ANCHOR.getTime();
  const synodic_ms = SYNODIC_MONTH * 24 * 60 * 60 * 1000;
  for (let i = 0; i < 100; i++) {
    const date = new Date(anchor + i * (synodic_ms / 100));
    const result = cycleMonth(date);
    assert.notStrictEqual(result, '000.webp', `Got 000.webp for offset ${i}`);
  }
});

// ─── cycleMonth: anchor date ──────────────────────────────────────────────────

test('cycleMonth at anchor date returns 001.webp (start of synodic cycle)', () => {
  assert.strictEqual(cycleMonth(MONTH_ANCHOR), '001.webp');
});

test('cycleMonth one synodic month + 1 min after anchor returns near start of next cycle', () => {
  // Adding exactly one synodic month in floating-point can land on either side of the
  // cycle boundary (001 or 708) due to IEEE 754 rounding. Adding 1 minute steps past it.
  const oneMonthPlus = new Date(
    MONTH_ANCHOR.getTime() + SYNODIC_MONTH * 24 * 60 * 60 * 1000 + 60_000
  );
  const result = cycleMonth(oneMonthPlus);
  const index = parseInt(result.replace('.webp', ''), 10);
  assert(index <= 3, `Expected near start of next cycle (index <= 3), got ${index}`);
});

test('cycleMonth at halfway through synodic month returns ~354.webp', () => {
  const half = new Date(
    MONTH_ANCHOR.getTime() + (SYNODIC_MONTH / 2) * 24 * 60 * 60 * 1000
  );
  const result = cycleMonth(half);
  const index = parseInt(result.replace('.webp', ''), 10);
  // Allow ±1 for rounding
  assert(index >= 353 && index <= 355, `Expected ~354, got ${index}`);
});

test('cycleMonth result is always in range [001, 708]', () => {
  // Test dates spanning 5 years
  const start = new Date('2020-01-01T00:00:00Z');
  const step = 24 * 60 * 60 * 1000 * 7; // weekly
  for (let i = 0; i < 260; i++) {
    const date = new Date(start.getTime() + i * step);
    const result = cycleMonth(date);
    const index = parseInt(result.replace('.webp', ''), 10);
    assert(index >= 1, `Index ${index} below minimum (date: ${date.toISOString()})`);
    assert(index <= 708, `Index ${index} above maximum (date: ${date.toISOString()})`);
  }
});

// ─── cycleMonth: past dates ───────────────────────────────────────────────────

test('cycleMonth handles dates before the anchor (pre-2023)', () => {
  const past = new Date('2020-06-15T00:00:00Z');
  const result = cycleMonth(past);
  assert.match(result, /^\d{3}\.webp$/);
  const index = parseInt(result.replace('.webp', ''), 10);
  assert(index >= 1 && index <= 708);
});

// ─── cycleYear: return format ─────────────────────────────────────────────────

test('cycleYear returns a string', () => {
  assert.strictEqual(typeof cycleYear(), 'string');
});

test('cycleYear result matches /^\\d{4}\\.webp$/', () => {
  const result = cycleYear();
  assert.match(result, /^\d{4}\.webp$/);
});

test('cycleYear result is never 0000.webp (images are 1-indexed)', () => {
  const anchor = YEAR_ANCHOR.getTime();
  const year_ms = YEAR_IMAGES * 60 * 60 * 1000;
  for (let i = 0; i < 100; i++) {
    const date = new Date(anchor + i * (year_ms / 100));
    const result = cycleYear(date);
    assert.notStrictEqual(result, '0000.webp', `Got 0000.webp for offset ${i}`);
  }
});

// ─── cycleYear: anchor date ───────────────────────────────────────────────────

test('cycleYear at anchor date returns 0001.webp (start of year)', () => {
  assert.strictEqual(cycleYear(YEAR_ANCHOR), '0001.webp');
});

test('cycleYear at exactly one year after anchor returns 0001.webp', () => {
  const oneYear = new Date(
    YEAR_ANCHOR.getTime() + YEAR_IMAGES * 60 * 60 * 1000
  );
  assert.strictEqual(cycleYear(oneYear), '0001.webp');
});

test('cycleYear at halfway through year returns ~4380.webp', () => {
  const half = new Date(
    YEAR_ANCHOR.getTime() + (YEAR_IMAGES / 2) * 60 * 60 * 1000
  );
  const result = cycleYear(half);
  const index = parseInt(result.replace('.webp', ''), 10);
  assert(index >= 4379 && index <= 4381, `Expected ~4380, got ${index}`);
});

test('cycleYear result is always in range [0001, 8760]', () => {
  const start = new Date('2020-01-01T00:00:00Z');
  const step = 24 * 60 * 60 * 1000 * 7;
  for (let i = 0; i < 260; i++) {
    const date = new Date(start.getTime() + i * step);
    const result = cycleYear(date);
    const index = parseInt(result.replace('.webp', ''), 10);
    assert(index >= 1, `Index ${index} below minimum`);
    assert(index <= 8760, `Index ${index} above maximum`);
  }
});

test('cycleYear handles dates before 2023', () => {
  const past = new Date('2021-06-15T00:00:00Z');
  const result = cycleYear(past);
  assert.match(result, /^\d{4}\.webp$/);
  const index = parseInt(result.replace('.webp', ''), 10);
  assert(index >= 1 && index <= 8760);
});

// ─── cycleMonth/cycleYear default parameter ───────────────────────────────────

test('cycleMonth() with no args returns a valid result', () => {
  const result = cycleMonth();
  assert.match(result, /^\d{3}\.webp$/);
});

test('cycleYear() with no args returns a valid result', () => {
  const result = cycleYear();
  assert.match(result, /^\d{4}\.webp$/);
});

// ─── imageFolder ──────────────────────────────────────────────────────────────

test('imageFolder returns correct folder name', () => {
  assert.strictEqual(imageFolder('mm', 256, 75), 'mm-256-75');
  assert.strictEqual(imageFolder('mm', 512, 85), 'mm-512-85');
  assert.strictEqual(imageFolder('my', 256, 75), 'my-256-75');
  assert.strictEqual(imageFolder('my', 512, 85), 'my-512-85');
});

// ─── cdnUrl ───────────────────────────────────────────────────────────────────

test('cdnUrl returns a valid jsDelivr URL', () => {
  const url = cdnUrl('354.webp', 'mm', 256, 75);
  assert.strictEqual(
    url,
    'https://cdn.jsdelivr.net/gh/acamarata/moon-cycle@main/mm-256-75/354.webp'
  );
});

test('cdnUrl respects custom ref parameter', () => {
  const url = cdnUrl('001.webp', 'my', 512, 85, 'v2.0.0');
  assert.strictEqual(
    url,
    'https://cdn.jsdelivr.net/gh/acamarata/moon-cycle@v2.0.0/my-512-85/001.webp'
  );
});

test('cdnUrl integrates with cycleMonth output', () => {
  const filename = cycleMonth(MONTH_ANCHOR);
  const url = cdnUrl(filename, 'mm', 256, 75);
  assert(url.startsWith('https://cdn.jsdelivr.net/gh/acamarata/moon-cycle@main/mm-256-75/'));
  assert(url.endsWith('.webp'));
});

// ─── Summary ─────────────────────────────────────────────────────────────────

console.log(`\n${passed}/${total} tests passed`);
if (passed < total) process.exit(1);
