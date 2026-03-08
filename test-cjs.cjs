/**
 * CJS test suite for moon-cycle v2.
 * Verifies CommonJS compatibility of the built package.
 */

'use strict';

const { describe, it } = require('node:test');
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

describe('CJS exports', () => {
  it('all exports are available via require()', () => {
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

  it('cycleMonth at anchor returns 001.webp', () => {
    assert.strictEqual(cycleMonth(MONTH_ANCHOR), '001.webp');
  });

  it('cycleYear at anchor returns 0001.webp', () => {
    assert.strictEqual(cycleYear(YEAR_ANCHOR), '0001.webp');
  });

  it('cycleMonth result format is correct', () => {
    assert.match(cycleMonth(), /^\d{3}\.webp$/);
  });

  it('cycleYear result format is correct', () => {
    assert.match(cycleYear(), /^\d{4}\.webp$/);
  });

  it('imageFolder constructs correct path', () => {
    assert.strictEqual(imageFolder('mm', 256, 75), 'mm-256-75');
  });

  it('cdnUrl returns expected jsDelivr URL', () => {
    assert.strictEqual(
      cdnUrl('001.webp', 'mm', 256, 75),
      'https://cdn.jsdelivr.net/gh/acamarata/moon-cycle@main/mm-256-75/001.webp',
    );
  });

  it('cycleMonth throws TypeError for invalid Date', () => {
    assert.throws(() => cycleMonth(new Date('invalid')), {
      name: 'TypeError',
      message: 'date must be a valid Date instance',
    });
  });

  it('cycleYear throws TypeError for invalid Date', () => {
    assert.throws(() => cycleYear(new Date('invalid')), {
      name: 'TypeError',
      message: 'date must be a valid Date instance',
    });
  });
});
