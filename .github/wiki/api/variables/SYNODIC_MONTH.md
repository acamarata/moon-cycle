[**moon-cycle v2.0.0**](../README.md)

***

[moon-cycle](../README.md) / SYNODIC\_MONTH

# Variable: SYNODIC\_MONTH

> `const` **SYNODIC\_MONTH**: `29.53058821398858` = `29.53058821398858`

Defined in: [types.ts:51](https://github.com/acamarata/moon-cycle/blob/800a74670ed6ac7b6d239efd6ec627dbb009fcea/src/types.ts#L51)

Length of one synodic month in days.

IAU mean value at J2000.0. Used by `cycleMonth` to divide the elapsed
time into a fractional position within the current lunar cycle.

## Example

```ts
import { SYNODIC_MONTH } from 'moon-cycle';
// Days old: how far into the current cycle
const now = new Date();
const elapsed = (now.getTime() - MONTH_ANCHOR.getTime()) / 86400000;
const age = ((elapsed % SYNODIC_MONTH) + SYNODIC_MONTH) % SYNODIC_MONTH;
```
