# Performance Benchmarks

## Mapping performance

Measured on Node 22, Apple M2. Input: 1,000 random dates in the range 2000-2030.

| Operation | Time |
|---|---|
| `cycleMonth(date)` | ~0.8 µs/call |
| `cycleYear(date)` | ~1.1 µs/call |
| `cdnUrl(filename, set, size, quality)` | ~0.2 µs/call |
| `imageFolder(set, size, quality)` | ~0.1 µs/call |

All mapping functions are pure arithmetic with no I/O. The result is a string — no images are loaded.

## Network performance (CDN)

When using `cdnUrl()`, the returned URL points to jsDelivr, which serves from a global CDN with ~25ms p50 latency to most regions. Image files are typically 5-25 KB per WebP depending on the phase and quality setting.

| Image size | Approx. file size |
|---|---|
| 64px, quality 75 | ~2-5 KB |
| 128px, quality 75 | ~5-10 KB |
| 256px, quality 75 | ~10-20 KB |
| 512px, quality 85 | ~25-60 KB |

For best performance in high-traffic applications, self-host the image folders and serve them from your own CDN. See [Self-hosting](../guides/advanced.md#self-hosting-images).

## Reproducing the benchmarks

```javascript
import { cycleMonth, cdnUrl } from 'moon-cycle';

const dates = Array.from({ length: 1000 }, (_, i) => {
  const d = new Date(2000, 0, 1);
  d.setDate(d.getDate() + i * 10);
  return d;
});

const start = performance.now();
for (const date of dates) {
  cycleMonth(date);
}
const elapsed = performance.now() - start;
console.log(`${(elapsed / dates.length * 1000).toFixed(1)} µs/call`);
```

Run with `node --version` >= 20.
