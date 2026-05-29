# Contributing to moon-cycle

Thanks for your interest in contributing. This library maps JavaScript dates to NASA moon phase images and contributions are welcome.

## Getting started

```bash
git clone https://github.com/acamarata/moon-cycle.git
cd moon-cycle
pnpm install
pnpm build
pnpm test
```

All tests should pass before you start.

## What to work on

Check the [open issues](https://github.com/acamarata/moon-cycle/issues) for anything tagged `help wanted` or `good first issue`. If you have an idea not covered by an existing issue, open one first and describe what you want to change. That avoids duplicate work.

## Code style

- Plain JavaScript (index.js) with a TypeScript declaration file (index.d.ts). No TypeScript source.
- Pure functions. No global state. Date is always passed explicitly.
- Each function: one purpose.
- Run `pnpm run format` before committing.
- Run `pnpm run lint` before committing.

## Image dataset

The image dataset (~438 MB) is tracked in git and should not be modified. All images are NASA public domain material from the Scientific Visualization Studio. Do not add new images without updating the algorithm constants and test coverage.

If you think the dataset is wrong or a mapping is incorrect, open an issue with the specific date, expected image, and actual image.

## Tests

- Tests live in `test.mjs` (ESM) and `test-cjs.cjs` (CommonJS). Both must pass.
- Use the native Node.js `node:test` runner.
- Test specific known dates against expected filenames.

## Pull requests

- Keep PRs small and focused. One concern per PR.
- Write a clear description of what changed and why.
- Reference the issue number if one exists (`Fixes #42`).
- CI must be green before merge.

## License

By contributing, you agree that your work will be licensed under MIT. Copyright remains with Aric Camarata. NASA imagery is public domain per NASA media guidelines.
