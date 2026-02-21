# Test Results & Findings

This page tracks test runs and any issues discovered.

## Latest Test Run

- **Date**: [To be updated after first test run]
- **Status**: [Pending]
- **Tests Run**: Visual regression, link checking
- **Results**: [To be updated]

### Summary

[Test results to be recorded here after running `npm run test:visual`]

---

## Known Issues

[Issues to be documented as they're found and fixed]

---

## Test Baseline

Visual regression baseline screenshots are stored in `tests/baselines/`. When updating the design intentionally, update baselines with:

```bash
npm run test:visual:baseline
```

---

## Performance Metrics

To be updated after performance testing:

| Metric | Target | Actual |
|--------|--------|--------|
| Lighthouse Performance | 80+ | — |
| Lighthouse Accessibility | 90+ | — |
| Lighthouse Best Practices | 90+ | — |
| Lighthouse SEO | 90+ | — |

---

## Issue Tracker

Issues found during testing should be tracked in GitHub Issues and linked here.

Example:
- [#1](https://github.com/kyleskrinak/skrinak-creative/issues/1) — Image not loading on mobile
- [#2](https://github.com/kyleskrinak/skrinak-creative/issues/2) — Gallery lightbox not responding to arrow keys

---

See [Testing Guide](./index.md) for how to run tests locally.
