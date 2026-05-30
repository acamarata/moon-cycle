[**moon-cycle v2.0.0**](../README.md)

***

[moon-cycle](../README.md) / YEAR\_IMAGES

# Variable: YEAR\_IMAGES

> `const` **YEAR\_IMAGES**: `8760` = `8760`

Defined in: [types.ts:77](https://github.com/acamarata/moon-cycle/blob/800a74670ed6ac7b6d239efd6ec627dbb009fcea/src/types.ts#L77)

Number of images in the yearly (`my`) dataset.

Equals 365 days × 24 hours. Filenames range from `"0001.webp"` to
`"8760.webp"`.

## Example

```ts
import { YEAR_IMAGES } from 'moon-cycle';
// Total hours in the yearly dataset
console.log(YEAR_IMAGES); // 8760
```
