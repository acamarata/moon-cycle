[**moon-cycle v2.0.0**](../README.md)

***

[moon-cycle](../README.md) / ImageSize

# Type Alias: ImageSize

> **ImageSize** = `256` \| `512`

Defined in: [types.ts:23](https://github.com/acamarata/moon-cycle/blob/800a74670ed6ac7b6d239efd6ec627dbb009fcea/src/types.ts#L23)

Image dimension in pixels (square).

Both values produce square images. Use `256` for thumbnails and smaller
displays; use `512` for high-DPI or full-size display contexts.

## Example

```ts
import type { ImageSize } from 'moon-cycle';
const size: ImageSize = 256;
```
