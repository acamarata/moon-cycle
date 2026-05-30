[**moon-cycle v2.0.0**](../README.md)

***

[moon-cycle](../README.md) / MONTH\_IMAGES

# Variable: MONTH\_IMAGES

> `const` **MONTH\_IMAGES**: `708` = `708`

Defined in: [types.ts:64](https://github.com/acamarata/moon-cycle/blob/208f7ffba1c1bce684a1b90ff94e52538d2632d3/src/types.ts#L64)

Number of images in the monthly (`mm`) dataset.

Equals the number of hours in one synodic month, rounded to the nearest
integer. Filenames range from `"001.webp"` to `"708.webp"`.

## Example

```ts
import { MONTH_IMAGES } from 'moon-cycle';
// Fraction of the way through the synodic cycle
const index = Math.floor(fraction * MONTH_IMAGES) + 1;
```
