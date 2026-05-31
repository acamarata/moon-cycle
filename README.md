# moon-cycle

[![CI](https://github.com/acamarata/moon-cycle/actions/workflows/ci.yml/badge.svg)](https://github.com/acamarata/moon-cycle/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

Maps any JavaScript `Date` to the correct NASA moon phase image filename. Two algorithms: synodic-cycle mapping (708 images) and calendar-year mapping (8,760 images).

Not published to npm. The image dataset (~438 MB of hourly WebP photos from NASA's Scientific Visualization Studio) lives in this repository. Use CDN or clone.

## Install

```bash
# Clone to get code and images together
git clone https://github.com/acamarata/moon-cycle.git

# Or add the code-only package via git
pnpm add github:acamarata/moon-cycle
```

## Quick Start

```ts
import { cycleMonth, cdnUrl } from 'moon-cycle';

const filename = cycleMonth();                     // e.g. "354.webp"
const url = cdnUrl(filename, 'mm', 256, 75);
// => 'https://cdn.jsdelivr.net/gh/acamarata/moon-cycle@main/mm-256-75/354.webp'
```

CommonJS:

```js
const { cycleMonth, cdnUrl } = require('moon-cycle');
```

## Documentation

Full reference: [GitHub Wiki](https://github.com/acamarata/moon-cycle/wiki)

- [API Reference](https://github.com/acamarata/moon-cycle/wiki/API-Reference)
- [Architecture](https://github.com/acamarata/moon-cycle/wiki/Architecture)
- [Examples](https://github.com/acamarata/moon-cycle/wiki/examples/basic-usage)

## Related

- [nrel-spa](https://github.com/acamarata/nrel-spa): Pure JS NREL Solar Position Algorithm
- [pray-calc](https://github.com/acamarata/pray-calc): Islamic prayer times
- [moon-sighting](https://github.com/acamarata/moon-sighting): Lunar crescent visibility

## Acknowledgments

Moon phase imagery from NASA's Scientific Visualization Studio:

> Ernie Wright (2023). *Moon Phase and Libration, 2023* [Data set]. NASA Scientific Visualization Studio. [https://svs.gsfc.nasa.gov/5187](https://svs.gsfc.nasa.gov/5187)

Images are in the public domain per NASA's [media usage guidelines](https://www.nasa.gov/nasa-brand-center/images-and-media/).

## License

MIT. See [LICENSE](LICENSE) for the full text.
