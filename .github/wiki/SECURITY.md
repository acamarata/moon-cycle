# Security Policy

## Supported versions

| Version | Supported |
| --- | --- |
| 2.x (latest) | Yes |
| < 2.0 | No |

## Reporting a vulnerability

moon-cycle is a pure date-to-filename mapping library. It accepts JavaScript `Date` objects as input and returns image filenames or CDN URLs. There is no network access, no file system access (image paths are resolved client-side), no user authentication, and no persistent state.

Security vulnerabilities are unlikely given the surface area. That said, if you find something:

1. **Do not open a public issue.** That exposes the vulnerability before a fix is available.
2. Email **aric.camarata@gmail.com** with the subject line "Security: moon-cycle".
3. Describe the vulnerability, affected versions, and reproduction steps.
4. You will receive a response within 7 days.

## What counts as a security issue here

- An input that causes the library to execute arbitrary code
- Prototype pollution via user-provided inputs

## What does not count

- Incorrect moon phase image selection (that is a bug, not a security issue)
- Missing input validation that causes incorrect output but no code execution
