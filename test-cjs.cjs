/**
 * CJS test suite for moon-cycle v2.
 * Verifies CommonJS compatibility of the built package.
 */

'use strict';

const assert = require('node:assert/strict');
const {
  cycleMonth,
  cycleYear,
  imageFolder,
  cdnUrl,
  SYNODIC_MONTH,
  MONTH_IMAGES,
  YEAR_IMAGES,
  MONTH_ANCHOR,
  YEAR_ANCHOR,
} = require('./dist/index.cjs');

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

test('exports are available via require()', () => {
  assert.strictEqual(typeof cycleMonth, 'function');
  assert.strictEqual(typeof cycleYear, 'function');
  assert.strictEqual(typeof imageFolder, 'function');
  assert.strictEqual(typeof cdnUrl, 'function');
  assert.strictEqual(typeof SYNODIC_MONTH, 'number');
  assert.strictEqual(typeof MONTH_IMAGES, 'number');
  assert.strictEqual(typeof YEAR_IMAGES, 'number');
  assert(MONTH_ANCHOR instanceof Date);
  assert(YEAR_ANCHOR instanceof Date);
});

test('cycleMonth at anchor returns 001.webp', () => {
  assert.strictEqual(cycleMonth(MONTH_ANCHOR), '001.webp');
});

test('cycleYear at anchor returns 0001.webp', () => {
  assert.strictEqual(cycleYear(YEAR_ANCHOR), '0001.webp');
});

test('cycleMonth result format is correct', () => {
  const result = cycleMonth();
  assert.match(result, /^\d{3}\.webp$/);
});

test('cycleYear result format is correct', () => {
  const result = cycleYear();
  assert.match(result, /^\d{4}\.webp$/);
});

test('imageFolder constructs correct path', () => {
  assert.strictEqual(imageFolder('mm', 256, 75), 'mm-256-75');
});

test('cdnUrl returns expected jsDelivr URL', () => {
  const url = cdnUrl('001.webp', 'mm', 256, 75);
  assert.strictEqual(
    url,
    'https://cdn.jsdelivr.net/gh/acamarata/moon-cycle@main/mm-256-75/001.webp'
  );
});

console.log(`\n${passed}/${total} tests passed`);
if (passed < total) process.exit(1);
