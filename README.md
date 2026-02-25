# moon-cycle

[![npm version](https://img.shields.io/npm/v/moon-cycle.svg)](https://www.npmjs.com/package/moon-cycle)
[![CI](https://github.com/acamarata/moon-cycle/actions/workflows/ci.yml/badge.svg)](https://github.com/acamarata/moon-cycle/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

Maps any JavaScript `Date` to the correct NASA moon phase image filename. Two algorithms: synodic-cycle mapping (monthly, 708 images) and calendar-year mapping (yearly, 8,760 images).

The image dataset (~438 MB of hourly WebP photos from NASA's Scientific Visualization Studio) lives in this repository. The npm package ships only the code. Serve images via CDN (jsDelivr, see below) or by cloning the repo and hosting the folders yourself.

## Installation

```bash
npm install moon-cycle
# or
pnpm add moon-cycle
```

## Quick Start

```ts
import { cycleMonth, cycleYear, cdnUrl } from 'moon-cycle';

const date = new Date();

// Get the current moon phase filename
const monthlyFile = cycleMonth(date); // e.g. "354.webp"
const yearlyFile  = cycleYear(date);  // e.g. "4380.webp"

// Construct a CDN URL served from GitHub via jsDelivr
const url = cdnUrl(monthlyFile, 'mm', 256, 75);
// => 'https://cdn.jsdelivr.net/gh/acamarata/moon-cycle@main/mm-256-75/354.webp'
```

CommonJS:

```js
const { cycleMonth, cycleYear, cdnUrl } = require('moon-cycle');
```

## API

### `cycleMonth(date?: Date): string`

Maps a date to an image filename in the monthly (synodic) dataset.

Uses the IAU mean synodic month (29.530588 days) and a 2023-11-13 new moon anchor. The 708 hourly images span one complete synodic cycle. The result wraps continuously — any past or future date resolves to a valid image.

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `date` | `Date` | `new Date()` | The date to resolve |

Returns a zero-padded filename string in the range `"001.webp"` to `"708.webp"`.

### `cycleYear(date?: Date): string`

Maps a date to an image filename in the yearly dataset.

The 8,760 images are hourly photographs from the full calendar year 2023 (365 days). The result maps to the equivalent hour-of-year position and repeats annually.

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `date` | `Date` | `new Date()` | The date to resolve |

Returns a zero-padded filename string in the range `"0001.webp"` to `"8760.webp"`.

### `imageFolder(set, size, quality): string`

Returns the directory name for a given image set and quality level.

```ts
imageFolder('mm', 256, 75) // => 'mm-256-75'
imageFolder('my', 512, 85) // => 'my-512-85'
```

| Parameter | Type | Description |
| --- | --- | --- |
| `set` | `'mm' \| 'my'` | Monthly or yearly dataset |
| `size` | `256 \| 512` | Image dimension in pixels |
| `quality` | `75 \| 85` | WebP compression quality |

### `cdnUrl(filename, set, size, quality, ref?): string`

Returns a jsDelivr CDN URL for a specific image, served directly from this GitHub repository.

```ts
const file = cycleMonth();
const url = cdnUrl(file, 'mm', 256, 75);
// => 'https://cdn.jsdelivr.net/gh/acamarata/moon-cycle@main/mm-256-75/354.webp'
```

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `filename` | `string` | — | Result from `cycleMonth` or `cycleYear` |
| `set` | `'mm' \| 'my'` | — | Monthly or yearly dataset |
| `size` | `256 \| 512` | — | Image dimension |
| `quality` | `75 \| 85` | — | WebP quality |
| `ref` | `string` | `'main'` | Branch, tag, or commit SHA |

### Constants

| Export | Value | Description |
| --- | --- | --- |
| `SYNODIC_MONTH` | `29.53058821398858` | IAU mean synodic month in days |
| `MONTH_IMAGES` | `708` | Image count in the monthly dataset |
| `YEAR_IMAGES` | `8760` | Image count in the yearly dataset |
| `MONTH_ANCHOR` | `Date('2023-11-13T09:27:00Z')` | Reference new moon for `cycleMonth` |
| `YEAR_ANCHOR` | `Date('2023-01-01T00:00:00Z')` | Reference start date for `cycleYear` |

### Types

```ts
type ImageSet     = 'mm' | 'my';
type ImageSize    = 256 | 512;
type ImageQuality = 75 | 85;
```

## Image Dataset

The repository contains eight image folders, each a complete set of hourly NASA moon photos in WebP format:

| Folder | Images | Resolution | Quality | Size |
| --- | --- | --- | --- | --- |
| `mm-256-75` | 708 | 256x256 | 75 | ~4 MB |
| `mm-256-85` | 708 | 256x256 | 85 | ~5 MB |
| `mm-512-75` | 708 | 512x512 | 75 | ~9 MB |
| `mm-512-85` | 708 | 512x512 | 85 | ~14 MB |
| `my-256-75` | 8,760 | 256x256 | 75 | ~51 MB |
| `my-256-85` | 8,760 | 256x256 | 85 | ~66 MB |
| `my-512-75` | 8,760 | 512x512 | 75 | ~113 MB |
| `my-512-85` | 8,760 | 512x512 | 85 | ~176 MB |

Images are not included in the npm package. Options for serving them:

1. **CDN (recommended for web apps):** Use `cdnUrl()` to serve from jsDelivr, which caches GitHub content globally at no cost.
2. **Self-hosted:** Clone the repo and copy the relevant folder(s) into your `public/` directory.
3. **Pinned version:** Pass a specific git tag as `ref` to `cdnUrl()` to lock to a stable image set.

## TypeScript

The package ships dual CJS and ESM builds with full type definitions. No `@types/` package is needed.

```ts
import { cycleMonth, cycleYear, cdnUrl } from 'moon-cycle';
import type { ImageSet, ImageSize, ImageQuality } from 'moon-cycle';

function getMoonUrl(date: Date, set: ImageSet, size: ImageSize, quality: ImageQuality): string {
  const filename = set === 'mm' ? cycleMonth(date) : cycleYear(date);
  return cdnUrl(filename, set, size, quality);
}
```

## Compatibility

| Runtime | Support |
| --- | --- |
| Node.js | >= 20 |
| Browser | Yes (ESM) |
| Bundlers | Vite, webpack, esbuild, Rollup |
| React / Next.js | Yes |
| Deno | Yes |

## Architecture

Two distinct algorithms, one shared image source. See the [Architecture wiki page](https://github.com/acamarata/moon-cycle/wiki/Architecture) for analysis of the synodic and calendar-year mapping approaches, how they differ, and when to prefer each.

## Documentation

Full reference: [GitHub Wiki](https://github.com/acamarata/moon-cycle/wiki)

- [Home](https://github.com/acamarata/moon-cycle/wiki/Home)
- [API Reference](https://github.com/acamarata/moon-cycle/wiki/API-Reference)
- [Architecture](https://github.com/acamarata/moon-cycle/wiki/Architecture)
- [Migration Guide (v1 to v2)](https://github.com/acamarata/moon-cycle/wiki/Migration)

## Related

- [nrel-spa](https://github.com/acamarata/nrel-spa) — Pure JS NREL Solar Position Algorithm, zero dependencies
- [pray-calc](https://github.com/acamarata/pray-calc) — Islamic prayer times with dynamic angle algorithm
- [luxon-hijri](https://github.com/acamarata/luxon-hijri) — Hijri/Gregorian calendar conversion
- [moon-calc](https://github.com/acamarata/moon-calc) — Lunar crescent visibility using Yallop and Odeh criteria

## Acknowledgments

Moon phase imagery from NASA's Scientific Visualization Studio:

> Ernie Wright (2023). *Moon Phase and Libration, 2023* [Data set]. NASA Scientific Visualization Studio. [https://svs.gsfc.nasa.gov/5187](https://svs.gsfc.nasa.gov/5187)

Images are in the public domain per NASA's [media usage guidelines](https://www.nasa.gov/nasa-brand-center/images-and-media/).

## License

MIT. See [LICENSE](LICENSE) for the full text.
