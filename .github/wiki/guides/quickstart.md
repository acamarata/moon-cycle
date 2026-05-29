# Quick Start

This guide covers the most common use cases in moon-cycle.

## Distribution

moon-cycle is not published to npm (the image dataset exceeds the registry size limit). Use one of these options:

```bash
# Clone the full repo (code + images)
git clone https://github.com/acamarata/moon-cycle.git

# Install code-only via git
pnpm add github:acamarata/moon-cycle
```

For most web use cases, you do not need to install anything. Use `cdnUrl()` to serve images from jsDelivr.

## Map a date to a monthly (synodic) image

```typescript
import { cycleMonth } from 'moon-cycle';

const filename = cycleMonth(new Date(2024, 0, 15));
// e.g. '354.webp'
```

`cycleMonth` maps the date to one of 708 hourly images covering one complete synodic cycle. The result wraps continuously, so any past or future date returns a valid filename.

## Map a date to a yearly image

```typescript
import { cycleYear } from 'moon-cycle';

const filename = cycleYear(new Date(2024, 0, 15));
// e.g. '0360.webp'
```

`cycleYear` maps to one of 8,760 hourly images from the 2023 calendar year. The mapping repeats annually.

## Build a CDN URL

```typescript
import { cycleMonth, cdnUrl } from 'moon-cycle';

const filename = cycleMonth(new Date());
const url = cdnUrl(filename, 'mm', 256, 75);
// 'https://cdn.jsdelivr.net/gh/acamarata/moon-cycle@main/mm-256-75/354.webp'
```

`cdnUrl` returns a jsDelivr URL served from the GitHub repository. No server or npm installation needed.

## Serve images from a cloned repo

If you cloned the repository, images are in the root-level folders:

```
mm-256-75/   # monthly, 256x256, quality 75
mm-256-85/   # monthly, 256x256, quality 85
mm-512-75/   # monthly, 512x512, quality 75
mm-512-85/   # monthly, 512x512, quality 85
my-256-75/   # yearly, 256x256, quality 75
...
```

Reference them relative to wherever you serve the repo:

```typescript
import { cycleMonth, imageFolder } from 'moon-cycle';

const filename = cycleMonth(new Date());
const folder = imageFolder('mm', 256, 75); // 'mm-256-75'
const imgPath = `/images/${folder}/${filename}`;
```

## CommonJS

```js
const { cycleMonth, cdnUrl } = require('moon-cycle');

const filename = cycleMonth(new Date());
const url = cdnUrl(filename, 'mm', 256, 75);
console.log(url);
```

## Next steps

- [API Reference](API-Reference) for all function signatures and constants
- [Architecture](Architecture) for how the two algorithms (synodic and yearly) differ
