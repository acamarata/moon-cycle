# Changelog

All notable changes to this project will be documented in this file. Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [2.0.0] - 2025-02-25

### Added

- TypeScript source (`src/`) with full type definitions: dual CJS and ESM builds via tsup
- `imageFolder(set, size, quality)` helper to construct image directory names
- `cdnUrl(filename, set, size, quality, ref?)` helper to generate jsDelivr CDN URLs, enabling image serving without self-hosting the ~438 MB dataset
- Exported constants: `SYNODIC_MONTH`, `MONTH_IMAGES`, `YEAR_IMAGES`, `MONTH_ANCHOR`, `YEAR_ANCHOR`
- Exported types: `ImageSet`, `ImageSize`, `ImageQuality`
- Dual ESM and CJS builds with `.mjs` / `.cjs` extensions and matching `.d.ts` / `.d.mts` type definitions
- Proper `exports` map in `package.json` (types-first conditional exports)
- `test.mjs` and `test-cjs.cjs`: full assertion-based test suites covering bounds, anchor dates, edge cases, and all exported functions
- GitHub Actions CI workflow: Node 20/22/24 test matrix, typecheck job, pack-check job
- GitHub Actions wiki-sync workflow: syncs `.wiki/` to GitHub Wiki on push to `main`
- `.wiki/` documentation: Home, API Reference, Architecture, Migration Guide
- `.nvmrc`, `.editorconfig`, `.npmrc`, `pnpm-workspace.yaml`

### Changed

- Package is now npm-publishable: `files` field restricts the npm package to `dist/`, README, LICENSE, and CHANGELOG: images are excluded
- `package.json` fully updated: correct author name, accurate description, `engines`, `sideEffects`, `publishConfig`, `repository.url` with `git+https://` prefix, expanded keywords
- `repository.url` corrected to use `git+https://` prefix per npm convention

### Fixed

- **Off-by-one bug in both algorithms.** The v1 implementation mapped dates to 0-indexed filenames (`000.webp` to `707.webp` monthly, `0000.webp` to `8759.webp` yearly). The image dataset is 1-indexed (`001.webp` to `708.webp`, `0001.webp` to `8760.webp`). Both functions now return the correct 1-indexed filename. This is a breaking change for anyone who was working around the bug or had a local image set starting at `000.webp`.
- TypeScript definitions in `index.d.ts` were incorrect: both functions were typed as returning `{ result: string }` instead of `string`. The new generated types are accurate.

### Removed

- `index.js`, `cycleMonth.js`, `cycleYear.js`: replaced by `src/` TypeScript source and `dist/` build output
- `index.d.ts`: replaced by generated `dist/index.d.ts` and `dist/index.d.mts`
- `test.js`: replaced by `test.mjs` and `test-cjs.cjs`

## [1.0.1] - 2023-11-14

- Minor repository metadata updates

## [1.0.0] - 2023-11-14

- Initial release: `cycleMonth` and `cycleYear` functions, 708 monthly and 8,760 yearly NASA moon phase images in WebP format
