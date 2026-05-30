[**moon-cycle v2.0.0**](../README.md)

***

[moon-cycle](../README.md) / MONTH\_ANCHOR

# Variable: MONTH\_ANCHOR

> `const` **MONTH\_ANCHOR**: `Date`

Defined in: [types.ts:89](https://github.com/acamarata/moon-cycle/blob/800a74670ed6ac7b6d239efd6ec627dbb009fcea/src/types.ts#L89)

Anchor date for the monthly cycle: the 2023-11-13 new moon (UTC).

All synodic phase calculations measure elapsed time from this reference
point. Confirmed against JPL Horizons ephemeris data.

## Example

```ts
import { MONTH_ANCHOR } from 'moon-cycle';
const ageMs = Date.now() - MONTH_ANCHOR.getTime();
```
