[**moon-cycle v2.0.0**](../README.md)

***

[moon-cycle](../README.md) / cdnUrl

# Function: cdnUrl()

> **cdnUrl**(`filename`, `set`, `size`, `quality`, `ref?`): `string`

Defined in: [helpers.ts:36](https://github.com/acamarata/moon-cycle/blob/208f7ffba1c1bce684a1b90ff94e52538d2632d3/src/helpers.ts#L36)

Returns a jsDelivr CDN URL for a specific moon image.

jsDelivr serves files directly from GitHub repositories, making it a
practical option for web applications that need the images without
bundling ~438 MB of assets locally.

## Parameters

### filename

`string`

Filename returned by `cycleMonth` or `cycleYear`, e.g. `"354.webp"`.

### set

[`ImageSet`](../type-aliases/ImageSet.md)

Image set: `'mm'` (monthly) or `'my'` (yearly).

### size

[`ImageSize`](../type-aliases/ImageSize.md)

Image dimension: `256` or `512`.

### quality

[`ImageQuality`](../type-aliases/ImageQuality.md)

WebP quality: `75` or `85`.

### ref?

`string` = `'main'`

Git ref (branch, tag, or commit SHA). Defaults to `'main'`.

## Returns

`string`

A full CDN URL string.

## Example

```ts
const file = cycleMonth();
const url = cdnUrl(file, 'mm', 256, 75);
// => 'https://cdn.jsdelivr.net/gh/acamarata/moon-cycle@main/mm-256-75/354.webp'
```
