# moon-cycle

Maps any JavaScript `Date` to the correct NASA moon phase image filename. Built on two independent algorithms, the package ships ~2 KB of code to npm while the ~438 MB image dataset stays in the GitHub repository, served via CDN on demand.

## What it does

Given any date, you get a filename like `354.webp` or `4380.webp` that corresponds to an hourly NASA moon photograph. Pair it with `cdnUrl()` to construct a ready-to-use image URL, or host the image folders yourself.

Two algorithms are provided because they answer different questions:

| Function | Algorithm | Use when |
| --- | --- | --- |
| `cycleMonth` | Synodic (lunar) cycle | You want the actual lunar phase for the date |
| `cycleYear` | Calendar year (2023) | You want a consistent annual visual rhythm |

See [Architecture](Architecture) for a full explanation of each approach.

## Installation

```bash
npm install moon-cycle
pnpm add moon-cycle
```

## Quick start

```ts
import { cycleMonth, cdnUrl } from 'moon-cycle';

const file = cycleMonth(); // e.g. "354.webp": current lunar phase
const url  = cdnUrl(file, 'mm', 256, 75);
// => 'https://cdn.jsdelivr.net/gh/acamarata/moon-cycle@main/mm-256-75/354.webp'
```

## Image options

Pick the folder that fits your use case:

| Folder | Images | Size |
| --- | --- | --- |
| `mm-256-75` | 708 (monthly) | ~4 MB |
| `mm-512-85` | 708 (monthly) | ~14 MB |
| `my-256-75` | 8,760 (yearly) | ~51 MB |
| `my-512-85` | 8,760 (yearly) | ~176 MB |

All eight combinations (`mm`/`my` × `256`/`512` × `75`/`85`) are available. Use `imageFolder()` to construct the directory name programmatically.

## Pages

- [API Reference](API-Reference): full function and type documentation
- [Architecture](Architecture): algorithm design, dataset description, tradeoffs
- [Migration Guide](Migration): upgrading from v1

## Source

[github.com/acamarata/moon-cycle](https://github.com/acamarata/moon-cycle)

---

*Part of the [acamarata](https://github.com/acamarata) astronomical computing stack.*
