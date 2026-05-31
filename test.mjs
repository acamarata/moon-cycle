/**
 * ESM test suite for moon-cycle v2.
 * Uses Node.js built-in test runner.
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";
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
} from "./dist/index.mjs";

// ─── Constants ───────────────────────────────────────────────────────────────

describe("constants", () => {
  it("SYNODIC_MONTH is correct IAU value", () => {
    assert.strictEqual(SYNODIC_MONTH, 29.53058821398858);
  });

  it("MONTH_IMAGES is 708", () => {
    assert.strictEqual(MONTH_IMAGES, 708);
  });

  it("YEAR_IMAGES is 8760", () => {
    assert.strictEqual(YEAR_IMAGES, 8760);
  });

  it("MONTH_ANCHOR is 2023-11-13T09:27:00Z", () => {
    assert.strictEqual(MONTH_ANCHOR.toISOString(), "2023-11-13T09:27:00.000Z");
  });

  it("YEAR_ANCHOR is 2023-01-01T00:00:00Z", () => {
    assert.strictEqual(YEAR_ANCHOR.toISOString(), "2023-01-01T00:00:00.000Z");
  });
});

// ─── cycleMonth ──────────────────────────────────────────────────────────────

describe("cycleMonth", () => {
  it("returns a string", () => {
    assert.strictEqual(typeof cycleMonth(), "string");
  });

  it("result matches /^\\d{3}\\.webp$/", () => {
    assert.match(cycleMonth(), /^\d{3}\.webp$/);
  });

  it("result is never 000.webp (images are 1-indexed)", () => {
    const anchor = MONTH_ANCHOR.getTime();
    const synodic_ms = SYNODIC_MONTH * 24 * 60 * 60 * 1000;
    for (let i = 0; i < 100; i++) {
      const date = new Date(anchor + i * (synodic_ms / 100));
      assert.notStrictEqual(cycleMonth(date), "000.webp", `Got 000.webp for offset ${i}`);
    }
  });

  it("at anchor date returns 001.webp (start of synodic cycle)", () => {
    assert.strictEqual(cycleMonth(MONTH_ANCHOR), "001.webp");
  });

  it("one synodic month + 1 min after anchor returns near start of next cycle", () => {
    const oneMonthPlus = new Date(
      MONTH_ANCHOR.getTime() + SYNODIC_MONTH * 24 * 60 * 60 * 1000 + 60_000,
    );
    const index = parseInt(cycleMonth(oneMonthPlus).replace(".webp", ""), 10);
    assert(index <= 3, `Expected near start of next cycle (index <= 3), got ${index}`);
  });

  it("at halfway through synodic month returns ~354.webp", () => {
    const half = new Date(MONTH_ANCHOR.getTime() + (SYNODIC_MONTH / 2) * 24 * 60 * 60 * 1000);
    const index = parseInt(cycleMonth(half).replace(".webp", ""), 10);
    assert(index >= 353 && index <= 355, `Expected ~354, got ${index}`);
  });

  it("result is always in range [001, 708]", () => {
    const start = new Date("2020-01-01T00:00:00Z");
    const step = 24 * 60 * 60 * 1000 * 7;
    for (let i = 0; i < 260; i++) {
      const date = new Date(start.getTime() + i * step);
      const index = parseInt(cycleMonth(date).replace(".webp", ""), 10);
      assert(index >= 1, `Index ${index} below minimum (date: ${date.toISOString()})`);
      assert(index <= 708, `Index ${index} above maximum (date: ${date.toISOString()})`);
    }
  });

  it("handles dates before the anchor (pre-2023)", () => {
    const past = new Date("2020-06-15T00:00:00Z");
    const result = cycleMonth(past);
    assert.match(result, /^\d{3}\.webp$/);
    const index = parseInt(result.replace(".webp", ""), 10);
    assert(index >= 1 && index <= 708);
  });

  it("with no args returns a valid result", () => {
    assert.match(cycleMonth(), /^\d{3}\.webp$/);
  });

  it("throws TypeError for invalid Date", () => {
    assert.throws(() => cycleMonth(new Date("invalid")), {
      name: "TypeError",
      message: "date must be a valid Date instance",
    });
  });

  it("throws TypeError for non-Date input", () => {
    assert.throws(() => cycleMonth("2023-01-01"), {
      name: "TypeError",
      message: "date must be a valid Date instance",
    });
  });
});

// ─── cycleYear ───────────────────────────────────────────────────────────────

describe("cycleYear", () => {
  it("returns a string", () => {
    assert.strictEqual(typeof cycleYear(), "string");
  });

  it("result matches /^\\d{4}\\.webp$/", () => {
    assert.match(cycleYear(), /^\d{4}\.webp$/);
  });

  it("result is never 0000.webp (images are 1-indexed)", () => {
    const anchor = YEAR_ANCHOR.getTime();
    const year_ms = YEAR_IMAGES * 60 * 60 * 1000;
    for (let i = 0; i < 100; i++) {
      const date = new Date(anchor + i * (year_ms / 100));
      assert.notStrictEqual(cycleYear(date), "0000.webp", `Got 0000.webp for offset ${i}`);
    }
  });

  it("at anchor date returns 0001.webp (start of year)", () => {
    assert.strictEqual(cycleYear(YEAR_ANCHOR), "0001.webp");
  });

  it("at exactly one year after anchor returns 0001.webp", () => {
    const oneYear = new Date(YEAR_ANCHOR.getTime() + YEAR_IMAGES * 60 * 60 * 1000);
    assert.strictEqual(cycleYear(oneYear), "0001.webp");
  });

  it("at halfway through year returns ~4380.webp", () => {
    const half = new Date(YEAR_ANCHOR.getTime() + (YEAR_IMAGES / 2) * 60 * 60 * 1000);
    const index = parseInt(cycleYear(half).replace(".webp", ""), 10);
    assert(index >= 4379 && index <= 4381, `Expected ~4380, got ${index}`);
  });

  it("result is always in range [0001, 8760]", () => {
    const start = new Date("2020-01-01T00:00:00Z");
    const step = 24 * 60 * 60 * 1000 * 7;
    for (let i = 0; i < 260; i++) {
      const date = new Date(start.getTime() + i * step);
      const index = parseInt(cycleYear(date).replace(".webp", ""), 10);
      assert(index >= 1, `Index ${index} below minimum`);
      assert(index <= 8760, `Index ${index} above maximum`);
    }
  });

  it("handles dates before 2023", () => {
    const past = new Date("2021-06-15T00:00:00Z");
    const result = cycleYear(past);
    assert.match(result, /^\d{4}\.webp$/);
    const index = parseInt(result.replace(".webp", ""), 10);
    assert(index >= 1 && index <= 8760);
  });

  it("with no args returns a valid result", () => {
    assert.match(cycleYear(), /^\d{4}\.webp$/);
  });

  it("throws TypeError for invalid Date", () => {
    assert.throws(() => cycleYear(new Date("invalid")), {
      name: "TypeError",
      message: "date must be a valid Date instance",
    });
  });

  it("throws TypeError for non-Date input", () => {
    assert.throws(() => cycleYear("2023-01-01"), {
      name: "TypeError",
      message: "date must be a valid Date instance",
    });
  });
});

// ─── imageFolder ─────────────────────────────────────────────────────────────

describe("imageFolder", () => {
  it("returns correct folder name", () => {
    assert.strictEqual(imageFolder("mm", 256, 75), "mm-256-75");
    assert.strictEqual(imageFolder("mm", 512, 85), "mm-512-85");
    assert.strictEqual(imageFolder("my", 256, 75), "my-256-75");
    assert.strictEqual(imageFolder("my", 512, 85), "my-512-85");
  });
});

// ─── cdnUrl ──────────────────────────────────────────────────────────────────

describe("cdnUrl", () => {
  it("returns a valid jsDelivr URL", () => {
    assert.strictEqual(
      cdnUrl("354.webp", "mm", 256, 75),
      "https://cdn.jsdelivr.net/gh/acamarata/moon-cycle@main/mm-256-75/354.webp",
    );
  });

  it("respects custom ref parameter", () => {
    assert.strictEqual(
      cdnUrl("001.webp", "my", 512, 85, "v2.0.0"),
      "https://cdn.jsdelivr.net/gh/acamarata/moon-cycle@v2.0.0/my-512-85/001.webp",
    );
  });

  it("integrates with cycleMonth output", () => {
    const filename = cycleMonth(MONTH_ANCHOR);
    const url = cdnUrl(filename, "mm", 256, 75);
    assert(url.startsWith("https://cdn.jsdelivr.net/gh/acamarata/moon-cycle@main/mm-256-75/"));
    assert(url.endsWith(".webp"));
  });
});
