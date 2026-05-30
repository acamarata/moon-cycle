[**moon-cycle v2.0.0**](../README.md)

***

[moon-cycle](../README.md) / imageFolder

# Function: imageFolder()

> **imageFolder**(`set`, `size`, `quality`): `string`

Defined in: [helpers.ts:13](https://github.com/acamarata/moon-cycle/blob/208f7ffba1c1bce684a1b90ff94e52538d2632d3/src/helpers.ts#L13)

Returns the folder name for a given image set, size, and quality.

Folder names follow the pattern `{set}-{size}-{quality}`, matching the
directory layout in the moon-cycle repository.

## Parameters

### set

[`ImageSet`](../type-aliases/ImageSet.md)

### size

[`ImageSize`](../type-aliases/ImageSize.md)

### quality

[`ImageQuality`](../type-aliases/ImageQuality.md)

## Returns

`string`

## Example

```ts
imageFolder('mm', 256, 75) // => 'mm-256-75'
imageFolder('my', 512, 85) // => 'my-512-85'
```
