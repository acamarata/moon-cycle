# Basic Usage Examples

## Get the moon phase image for today

```javascript
import { cycleMonth, cdnUrl } from 'moon-cycle';

const filename = cycleMonth(new Date());
const url = cdnUrl(filename, 'mm', 256, 75);

console.log(url);
// 'https://cdn.jsdelivr.net/gh/acamarata/moon-cycle@main/mm-256-75/354.webp'
```

## Get the image for a specific date

```javascript
import { cycleMonth, cdnUrl } from 'moon-cycle';

// March 23, 2023 — 1 Ramadan 1444 AH
const date = new Date(2023, 2, 23);
const filename = cycleMonth(date);
const url = cdnUrl(filename, 'mm', 256, 75);

console.log(filename);  // e.g. '001.webp'
console.log(url);
```

## Use a larger image size

```javascript
import { cycleMonth, cdnUrl } from 'moon-cycle';

const filename = cycleMonth(new Date());

// Available sizes: 64, 128, 256, 512
// Available quality: 75, 85, 95
const urlSmall  = cdnUrl(filename, 'mm', 64,  75);
const urlMedium = cdnUrl(filename, 'mm', 256, 75);
const urlLarge  = cdnUrl(filename, 'mm', 512, 85);

console.log(urlSmall);
console.log(urlMedium);
console.log(urlLarge);
```

## Use the year-based dataset

```javascript
import { cycleYear, cdnUrl } from 'moon-cycle';

// cycleYear maps to 2023 hourly NASA photographs
const filename = cycleYear(new Date());
const url = cdnUrl(filename, 'yr', 256, 75);

console.log(url);
```

## Self-hosted images

If you have cloned the repo and copied the image folder to your static assets:

```javascript
import { cycleMonth, imageFolder } from 'moon-cycle';

const folder = imageFolder('mm', 256, 75);  // 'mm-256-75'
const filename = cycleMonth(new Date());
const src = `/moon/${folder}/${filename}`;

// Use src in an <img> tag
```

## React component

```tsx
import { cycleMonth, cdnUrl } from 'moon-cycle';

function MoonPhase({ date }: { date: Date }) {
  const filename = cycleMonth(date);
  const src = cdnUrl(filename, 'mm', 256, 75);

  return (
    <img
      src={src}
      alt="Moon phase"
      width={256}
      height={256}
    />
  );
}
```

## CJS usage

```javascript
const { cycleMonth, cdnUrl } = require('moon-cycle');

const filename = cycleMonth(new Date());
const url = cdnUrl(filename, 'mm', 256, 75);

console.log(url);
```
