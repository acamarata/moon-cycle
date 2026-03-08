# Migration Guide

Upgrading from moon-cycle v1 to v2.

## Summary of Breaking Changes

1. **Off-by-one fix:** `cycleMonth` and `cycleYear` now return 1-indexed filenames
2. **No default export:** Functions are now named exports only (this was always the case: `require('moon-cycle')` still works, but `require('moon-cycle').default` does not exist)

## 1. Off-by-one correction

v1 produced filenames in the range `000.webp` to `707.webp` (monthly) and `0000.webp` to `8759.webp` (yearly). The actual image files in the repository start at `001.webp` and `0001.webp`. v1 was therefore referencing non-existent filenames.

v2 corrects this. The returned filenames now match the actual files in the dataset.

**What this means for you:**

- If you used the npm package with the standard image folders from this repository, your images were silently not found for the `000.webp` and `0000.webp` edge case, and all other images were effectively one frame off from the v2 behavior. Updating to v2 with no other changes will produce accurate results.

- If you created your own image folders starting at `000.webp` to match v1's output, you need to either rename your images to start at `001.webp` or keep using v1. v2 will no longer produce `000.webp`.

## 2. TypeScript types

v1 shipped a hand-written `index.d.ts` that incorrectly declared both functions as returning `{ result: string }`:

```ts
// v1: incorrect
export function cycleMonth(date: Date): MonthResult;
interface MonthResult {
  result: string;
}
```

The actual runtime behavior in v1 was to return a plain `string`, not an object. v2 types match the implementation:

```ts
// v2: correct
export function cycleMonth(date?: Date): string;
```

If your TypeScript code destructured the (nonexistent) `.result` property, remove that:

```ts
// v1 code (incorrect runtime behavior, wrong types)
const { result } = cycleMonth(date);
const src = `/mm-256-75/${result}`;

// v2 code (correct)
const filename = cycleMonth(date);
const src = `/mm-256-75/${filename}`;
```

## 3. New exports

v2 adds several exports that did not exist in v1. These are additive and do not break existing code:

- `imageFolder(set, size, quality)`: constructs folder name strings
- `cdnUrl(filename, set, size, quality, ref?)`: constructs jsDelivr CDN URLs
- `SYNODIC_MONTH`, `MONTH_IMAGES`, `YEAR_IMAGES`, `MONTH_ANCHOR`, `YEAR_ANCHOR`: constants
- `ImageSet`, `ImageSize`, `ImageQuality`: TypeScript types

## 4. Optional `date` parameter

In v1, `cycleMonth` and `cycleYear` accepted an optional `date` parameter with `date = new Date()` as default, but this was not reflected in the type definitions. v2 types both parameters as `date?: Date`, which matches the runtime behavior.

## 5. Package format

v2 ships dual CJS and ESM builds. If you use a bundler, it will now automatically pick up the ESM version for better tree-shaking. `require('moon-cycle')` continues to work unchanged.

## Migration Checklist

- [ ] Update to `moon-cycle@2.0.0`
- [ ] Verify image filenames: if you referenced `000.webp` or `0000.webp` directly, rename to `001.webp` / `0001.webp`
- [ ] Remove any `.result` property access: both functions return `string` directly
- [ ] Update TypeScript types if you had manual overrides working around the incorrect v1 declarations
- [ ] Consider using `cdnUrl()` if you were constructing CDN URLs manually

---

_[Home](Home) | [API Reference](API-Reference) | [Architecture](Architecture)_
