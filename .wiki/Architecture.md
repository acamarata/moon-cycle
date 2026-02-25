# Architecture

This page explains how moon-cycle works internally, why two separate algorithms exist, and the tradeoffs involved in each approach.

## Overview

The library solves a single problem: given a JavaScript `Date`, which of NASA's moon phase photographs corresponds to that moment in time? There are two conceptually distinct ways to answer that question, and the library provides both.

## The Image Dataset

All images originate from NASA's Scientific Visualization Studio visualization "Moon Phase and Libration, 2023" (SVS #5187), produced by Ernie Wright. The visualization renders the moon's appearance once per hour throughout the calendar year 2023, capturing both phase and libration (the apparent wobble caused by the Moon's slightly elliptical orbit and axial tilt).

The raw frames were converted to WebP and organized into eight folders combining two image sets, two resolutions, and two quality levels:

- `mm-*` — 708 images covering one synodic month (monthly set)
- `my-*` — 8,760 images covering the full year 2023 (yearly set)

Images are named with zero-padded integers starting at 1 (`001.webp` to `708.webp` for monthly, `0001.webp` to `8760.webp` for yearly).

## Algorithm 1: Synodic Cycle (`cycleMonth`)

### Concept

The synodic month is the time between two identical lunar phases as seen from Earth — new moon to new moon. Its IAU mean value is **29.53058821398858 days**. The 708 images in the monthly set span exactly one such cycle at hourly resolution.

To find the correct image for any date, the algorithm:

1. Computes elapsed seconds since the **reference new moon** (`2023-11-13T09:27:00 UTC`, a known new moon moment)
2. Divides by the length of one synodic cycle in seconds to get total synodic months elapsed
3. Takes the fractional part of that value (always in `[0, 1)`)
4. Maps the fraction to an image index in `[1, 708]`

```
elapsed_seconds = (date - ANCHOR) / 1000
months          = elapsed_seconds / SYNODIC_SECONDS
fraction        = months - floor(months)
index           = floor(fraction * 708) + 1
```

### Properties

- **Accurate lunar phase:** The result corresponds to the real lunar phase on the given date. Near index 354, the moon is near full; near index 1 or 708, it is near new.
- **Works for any date:** Past dates (even centuries ago) and future dates all resolve correctly, because the synodic cycle is stable and the modular arithmetic handles negative elapsed times.
- **Sub-hour precision:** The index changes every ~2.5 hours (one synodic month / 708 images). Within that window, the same image repeats.

### Limitation

The synodic month is not exactly 29.53058821398858 days — that value is the IAU *mean* (averaged over centuries). The actual length of a given synodic month varies by up to ~7 hours depending on the Moon's position in its elliptical orbit. For dates far from the 2023 reference period, accumulated drift means the image may be off by a few frames from the true observed phase. For UI purposes, this is imperceptible.

## Algorithm 2: Calendar Year (`cycleYear`)

### Concept

The yearly set contains 8,760 images — one per hour of the 365-day year 2023. Rather than tracking lunar phase directly, `cycleYear` maps any date to its hour-of-year equivalent and uses that to index into the 2023 imagery.

The algorithm:

1. Computes hours elapsed since `2023-01-01T00:00:00 UTC`
2. Takes the fractional year (elapsed hours divided by 8760)
3. Takes the fractional part (for yearly wrapping)
4. Maps to an index in `[1, 8760]`

```
elapsed_hours = (date - ANCHOR) / (1000 * 3600)
years         = elapsed_hours / 8760
fraction      = years - floor(years)
index         = floor(fraction * 8760) + 1
```

### Properties

- **Seasonal consistency:** January always maps to images from early 2023, July to mid-2023. The visual result is the same season-of-year appearance regardless of which year the input date is in.
- **Smooth progression:** The index advances every hour, giving the smoothest possible visual change when animating over time.
- **Non-lunar:** The result does not reflect the actual lunar phase. It reflects what the moon looked like at this time of year in 2023.

### Limitation

The year 2023 had 365 days (not a leap year), so the 8,760 images correspond exactly to one non-leap year. For years with 366 days, there is a subtle 24-image offset in the second half of the year — the hour-of-year for December 31 in a leap year wraps around slightly differently than in 2023. This is a cosmetic artifact, not a functional error.

## Choosing Between the Two

| Scenario | Recommendation |
| --- | --- |
| Show the actual current moon phase | `cycleMonth` |
| Animate through a year of moon phases for a calendar app | `cycleYear` |
| Show a consistent seasonal moon appearance | `cycleYear` |
| Compute when the next full moon occurs | `cycleMonth` + `SYNODIC_MONTH` |
| Display a decorative moon that changes daily | Either — `cycleYear` has smoother hourly progression |

## Package Structure

```
moon-cycle/
├── src/
│   ├── index.ts        # Public API — re-exports all named exports
│   ├── types.ts        # Types, constants, anchor dates
│   ├── cycleMonth.ts   # Synodic algorithm
│   ├── cycleYear.ts    # Calendar-year algorithm
│   └── helpers.ts      # imageFolder, cdnUrl
├── dist/               # Built output (not in git, shipped to npm)
│   ├── index.cjs       # CommonJS build
│   ├── index.mjs       # ESM build
│   ├── index.d.ts      # CJS type definitions
│   └── index.d.mts     # ESM type definitions
├── mm-256-75/ … my-512-85/  # Image folders (in git, not in npm)
├── test.mjs            # ESM test suite
├── test-cjs.cjs        # CJS compatibility test
└── package.json
```

## Build Pipeline

The source is TypeScript, compiled by [tsup](https://tsup.egoist.dev/) (esbuild-based). tsup produces four output files from `src/index.ts`:

- `dist/index.cjs` — CommonJS for `require()`
- `dist/index.mjs` — ESM for `import`
- `dist/index.d.ts` — type definitions for CJS consumers
- `dist/index.d.mts` — type definitions for ESM consumers

The `exports` field in `package.json` uses types-first conditional exports so TypeScript resolves the correct declaration file regardless of `moduleResolution` setting.

## Off-by-One Fix (v2)

In v1, both algorithms produced 0-indexed filenames (`000.webp` to `707.webp`, `0000.webp` to `8759.webp`). The actual images in the dataset are 1-indexed (`001.webp` to `708.webp`, `0001.webp` to `8760.webp`). v2 corrects this by adding 1 to the computed index before formatting:

```ts
const index = Math.floor(fraction * MONTH_IMAGES) + 1;
```

The probability of hitting the exact boundary where `000.webp` would have been requested was extremely low (it required a date within one minute of the anchor moment), but it was a latent correctness bug.

---

*[Home](Home) | [API Reference](API-Reference) | [Migration Guide](Migration)*
