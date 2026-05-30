[**moon-cycle v2.0.0**](../README.md)

***

[moon-cycle](../README.md) / ImageSet

# Type Alias: ImageSet

> **ImageSet** = `"mm"` \| `"my"`

Defined in: [types.ts:11](https://github.com/acamarata/moon-cycle/blob/208f7ffba1c1bce684a1b90ff94e52538d2632d3/src/types.ts#L11)

Image set identifier.

- `'mm'` = monthly dataset: 708 hourly images covering one synodic cycle
- `'my'` = yearly dataset: 8,760 hourly images covering calendar year 2023

## Example

```ts
import type { ImageSet } from 'moon-cycle';
const set: ImageSet = 'mm'; // monthly synodic cycle
```
