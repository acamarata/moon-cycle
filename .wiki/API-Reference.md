# API Reference

Complete reference for moon-cycle v2.

## Functions

### `cycleMonth(date?)`

```ts
function cycleMonth(date?: Date): string;
```

Maps a date to an image filename in the **monthly (synodic) dataset**.

The 708 images cover one complete synodic month at hourly resolution. The function computes how far into the current synodic cycle the given date falls and maps that fraction to an image index in `[1, 708]`.

**Parameters:**

| Name   | Type   | Default      | Description         |
| ------ | ------ | ------------ | ------------------- |
| `date` | `Date` | `new Date()` | The date to resolve |

**Returns:** A zero-padded filename string, e.g. `"354.webp"`. Always in the range `"001.webp"` to `"708.webp"`.

**Example:**

```ts
import { cycleMonth } from 'moon-cycle';

cycleMonth(); // current lunar phase
cycleMonth(new Date('2024-01-15')); // specific date
cycleMonth(new Date('2020-06-21')); // any past date works
```

---

### `cycleYear(date?)`

```ts
function cycleYear(date?: Date): string;
```

Maps a date to an image filename in the **yearly dataset**.

The 8,760 images cover the full calendar year 2023 at hourly resolution. The function extracts the hour-of-year position from the given date, cycling through the same 8,760 images every year.

**Parameters:**

| Name   | Type   | Default      | Description         |
| ------ | ------ | ------------ | ------------------- |
| `date` | `Date` | `new Date()` | The date to resolve |

**Returns:** A zero-padded filename string, e.g. `"4380.webp"`. Always in the range `"0001.webp"` to `"8760.webp"`.

**Example:**

```ts
import { cycleYear } from 'moon-cycle';

cycleYear(); // current hour-of-year position
cycleYear(new Date('2025-07-04T12:00Z')); // July 4, noon
```

---

### `imageFolder(set, size, quality)`

```ts
function imageFolder(set: ImageSet, size: ImageSize, quality: ImageQuality): string;
```

Returns the directory name for a given combination of image set, size, and quality.

Directory names follow the pattern `{set}-{size}-{quality}`, matching the layout in the repository.

**Parameters:**

| Name      | Type           | Description               |
| --------- | -------------- | ------------------------- |
| `set`     | `'mm' \| 'my'` | Monthly or yearly dataset |
| `size`    | `256 \| 512`   | Image dimension in pixels |
| `quality` | `75 \| 85`     | WebP compression quality  |

**Returns:** A string like `"mm-256-75"`.

**Example:**

```ts
import { imageFolder } from 'moon-cycle';

imageFolder('mm', 256, 75); // => 'mm-256-75'
imageFolder('my', 512, 85); // => 'my-512-85'

// Use with a local public directory:
const filename = cycleMonth();
const folder = imageFolder('mm', 512, 85);
const localUrl = `/public/${folder}/${filename}`;
```

---

### `cdnUrl(filename, set, size, quality, ref?)`

```ts
function cdnUrl(
  filename: string,
  set: ImageSet,
  size: ImageSize,
  quality: ImageQuality,
  ref?: string,
): string;
```

Returns a jsDelivr CDN URL serving the specified image directly from the GitHub repository. jsDelivr caches GitHub content via a global CDN with no account or configuration required.

**Parameters:**

| Name       | Type           | Default  | Description                                   |
| ---------- | -------------- | -------- | --------------------------------------------- |
| `filename` | `string`       | :        | Filename from `cycleMonth()` or `cycleYear()` |
| `set`      | `'mm' \| 'my'` | :        | Monthly or yearly dataset                     |
| `size`     | `256 \| 512`   | :        | Image dimension in pixels                     |
| `quality`  | `75 \| 85`     | :        | WebP compression quality                      |
| `ref`      | `string`       | `'main'` | Branch name, git tag, or commit SHA           |

**Returns:** A full URL string, e.g. `"https://cdn.jsdelivr.net/gh/acamarata/moon-cycle@main/mm-256-75/354.webp"`.

**Example:**

```ts
import { cycleMonth, cdnUrl } from 'moon-cycle';

// Current phase, served via CDN
const file = cycleMonth();
const url  = cdnUrl(file, 'mm', 256, 75);

// Pin to a specific release for cache stability
const stableUrl = cdnUrl(file, 'mm', 256, 75, 'v2.0.0');

// Use in a React component
function MoonImage() {
  const file = cycleMonth();
  return <img src={cdnUrl(file, 'mm', 256, 85)} alt="Current moon phase" />;
}
```

---

## Constants

| Export          | Type     | Value                  | Description                          |
| --------------- | -------- | ---------------------- | ------------------------------------ |
| `SYNODIC_MONTH` | `number` | `29.53058821398858`    | IAU mean synodic month in days       |
| `MONTH_IMAGES`  | `number` | `708`                  | Image count in the monthly dataset   |
| `YEAR_IMAGES`   | `number` | `8760`                 | Image count in the yearly dataset    |
| `MONTH_ANCHOR`  | `Date`   | `2023-11-13T09:27:00Z` | New moon reference for `cycleMonth`  |
| `YEAR_ANCHOR`   | `Date`   | `2023-01-01T00:00:00Z` | Year start reference for `cycleYear` |

**Example:**

```ts
import { SYNODIC_MONTH, MONTH_ANCHOR } from 'moon-cycle';

// Compute the next new moon after a given date
function nextNewMoon(after: Date): Date {
  const elapsed = (after.getTime() - MONTH_ANCHOR.getTime()) / (1000 * 60 * 60 * 24);
  const cycles = Math.ceil(elapsed / SYNODIC_MONTH);
  return new Date(MONTH_ANCHOR.getTime() + cycles * SYNODIC_MONTH * 86400000);
}
```

---

## Types

```ts
/** 'mm' = monthly dataset (synodic cycle, 708 images) */
/** 'my' = yearly dataset (calendar year, 8,760 images) */
type ImageSet = 'mm' | 'my';

/** Image dimension in pixels (square). */
type ImageSize = 256 | 512;

/** WebP compression quality level. */
type ImageQuality = 75 | 85;
```

---

## Image Dataset Reference

| Folder      | Set     | Images | Resolution | Quality | Approx. Size |
| ----------- | ------- | ------ | ---------- | ------- | ------------ |
| `mm-256-75` | monthly | 708    | 256x256    | 75      | ~4 MB        |
| `mm-256-85` | monthly | 708    | 256x256    | 85      | ~5 MB        |
| `mm-512-75` | monthly | 708    | 512x512    | 75      | ~9 MB        |
| `mm-512-85` | monthly | 708    | 512x512    | 85      | ~14 MB       |
| `my-256-75` | yearly  | 8,760  | 256x256    | 75      | ~51 MB       |
| `my-256-85` | yearly  | 8,760  | 256x256    | 85      | ~66 MB       |
| `my-512-75` | yearly  | 8,760  | 512x512    | 75      | ~113 MB      |
| `my-512-85` | yearly  | 8,760  | 512x512    | 85      | ~176 MB      |

All images are square WebP, transparent background, named with zero-padded indices (`001.webp` to `708.webp` for monthly, `0001.webp` to `8760.webp` for yearly).

---

_[Home](Home) | [Architecture](Architecture) | [Migration Guide](Migration)_
