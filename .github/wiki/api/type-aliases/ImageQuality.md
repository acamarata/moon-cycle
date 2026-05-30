[**moon-cycle v2.0.0**](../README.md)

***

[moon-cycle](../README.md) / ImageQuality

# Type Alias: ImageQuality

> **ImageQuality** = `75` \| `85`

Defined in: [types.ts:36](https://github.com/acamarata/moon-cycle/blob/208f7ffba1c1bce684a1b90ff94e52538d2632d3/src/types.ts#L36)

WebP compression quality level.

`75` gives smaller files with minor quality loss. `85` gives higher visual
fidelity at roughly 1.5x the file size. The difference is most visible on
large displays or when zoomed in.

## Example

```ts
import type { ImageQuality } from 'moon-cycle';
const quality: ImageQuality = 75; // smaller, faster
```
