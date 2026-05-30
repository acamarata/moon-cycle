[**moon-cycle v2.0.0**](../README.md)

***

[moon-cycle](../README.md) / cycleMonth

# Function: cycleMonth()

> **cycleMonth**(`date?`): `string`

Defined in: [cycleMonth.ts:16](https://github.com/acamarata/moon-cycle/blob/800a74670ed6ac7b6d239efd6ec627dbb009fcea/src/cycleMonth.ts#L16)

Maps a date to the corresponding NASA moon phase image for the monthly cycle.

The monthly dataset contains 708 hourly images spanning exactly one synodic
month (29.53 days). This function computes the fractional position within
the current synodic month relative to the 2023-11-13 new moon anchor and
maps that fraction to an image index in [1, 708].

## Parameters

### date?

`Date` = `...`

The date to resolve. Defaults to the current time.

## Returns

`string`

A zero-padded filename string, e.g. `"354.webp"`.
