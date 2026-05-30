[**moon-cycle v2.0.0**](../README.md)

***

[moon-cycle](../README.md) / ImageSize

# Type Alias: ImageSize

> **ImageSize** = `256` \| `512`

Defined in: [types.ts:23](https://github.com/acamarata/moon-cycle/blob/208f7ffba1c1bce684a1b90ff94e52538d2632d3/src/types.ts#L23)

Image dimension in pixels (square).

Both values produce square images. Use `256` for thumbnails and smaller
displays; use `512` for high-DPI or full-size display contexts.

## Example

```ts
import type { ImageSize } from 'moon-cycle';
const size: ImageSize = 256;
```
