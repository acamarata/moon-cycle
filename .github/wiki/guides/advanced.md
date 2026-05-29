# Advanced Usage

## Pinning to a specific git tag

Pass a `ref` argument to `cdnUrl` to lock images to a specific git tag. This prevents image updates from affecting your app after a dataset refresh:

```typescript
import { cycleMonth, cdnUrl } from 'moon-cycle';

const filename = cycleMonth(new Date());
const url = cdnUrl(filename, 'mm', 256, 75, 'v2.0.0');
// 'https://cdn.jsdelivr.net/gh/acamarata/moon-cycle@v2.0.0/mm-256-75/354.webp'
```

## Choosing between cycleMonth and cycleYear

The two mapping functions use different algorithms:

| Function | Dataset | Images | Use when |
|---|---|---|---|
| `cycleMonth` | Monthly (synodic) | 708 | Showing the current lunar phase accurately |
| `cycleYear` | Yearly (calendar) | 8,760 | Showing what the moon looked like at a specific date and time in 2023 |

`cycleMonth` uses an IAU synodic mean period anchor and repeats the same 708 images every ~29.5 days. The images show all phases of a single synodic cycle. `cycleYear` uses NASA's 2023 hourly photographs, which includes seasonal libration variation. Neither is "more accurate" — they are different representations.

## Using imageFolder directly

```typescript
import { imageFolder } from 'moon-cycle';

const folder = imageFolder('mm', 512, 85); // 'mm-512-85'
// Use this to construct local paths if you self-host
const imgPath = `/public/moon/${folder}/${filename}`;
```

## Self-hosting images

Clone the repo and copy the image folders to your static assets directory:

```bash
git clone https://github.com/acamarata/moon-cycle.git /tmp/moon-cycle
cp -r /tmp/moon-cycle/mm-256-75 /your-project/public/moon/
```

Then construct local paths instead of CDN URLs:

```typescript
import { cycleMonth, imageFolder } from 'moon-cycle';

const folder = imageFolder('mm', 256, 75);
const filename = cycleMonth(new Date());
const src = `/moon/${folder}/${filename}`;
```

## TypeScript

```typescript
import { cycleMonth, cdnUrl } from 'moon-cycle';
import type { ImageSet, ImageSize, ImageQuality } from 'moon-cycle';

function getMoonUrl(date: Date, set: ImageSet, size: ImageSize, quality: ImageQuality): string {
  const filename = set === 'mm' ? cycleMonth(date) : cycleYear(date);
  return cdnUrl(filename, set, size, quality);
}
```

## React usage

```tsx
import { cycleMonth, cdnUrl } from 'moon-cycle';

function MoonPhase({ date }: { date: Date }) {
  const filename = cycleMonth(date);
  const src = cdnUrl(filename, 'mm', 256, 75);
  return <img src={src} alt="Moon phase" width={256} height={256} />;
}
```
