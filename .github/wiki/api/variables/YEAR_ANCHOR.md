[**moon-cycle v2.0.0**](../README.md)

***

[moon-cycle](../README.md) / YEAR\_ANCHOR

# Variable: YEAR\_ANCHOR

> `const` **YEAR\_ANCHOR**: `Date`

Defined in: [types.ts:101](https://github.com/acamarata/moon-cycle/blob/208f7ffba1c1bce684a1b90ff94e52538d2632d3/src/types.ts#L101)

Anchor date for the yearly cycle: start of the 2023 NASA image collection.

The 8,760 images correspond to one per hour for the full calendar year
2023. `cycleYear` measures elapsed time from this reference point.

## Example

```ts
import { YEAR_ANCHOR } from 'moon-cycle';
const hours = (Date.now() - YEAR_ANCHOR.getTime()) / 3600000;
```
