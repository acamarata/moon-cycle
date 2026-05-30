[**moon-cycle v2.0.0**](../README.md)

***

[moon-cycle](../README.md) / cycleYear

# Function: cycleYear()

> **cycleYear**(`date?`): `string`

Defined in: [cycleYear.ts:17](https://github.com/acamarata/moon-cycle/blob/800a74670ed6ac7b6d239efd6ec627dbb009fcea/src/cycleYear.ts#L17)

Maps a date to the corresponding NASA moon image for the yearly cycle.

The yearly dataset contains 8,760 hourly images covering the full calendar
year 2023 (365 days × 24 hours). This function computes the fractional
position within a 365-day year relative to 2023-01-01 and maps that
fraction to an image index in [1, 8760].

The cycle repeats annually, so dates in any year resolve to the equivalent
hour-of-year position in the 2023 imagery.

## Parameters

### date?

`Date` = `...`

The date to resolve. Defaults to the current time.

## Returns

`string`

A zero-padded filename string, e.g. `"4380.webp"`.
