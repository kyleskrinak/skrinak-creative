# Test Results & Findings

This page tracks test runs and any issues discovered.

## Baselines

### Live Site (Squarespace) Baselines — CURRENT REFERENCE
- **Location**: `tests/live-site-baselines/`
- **Purpose**: Reference design for pixel-faithful reproduction
- **Coverage**: 3 viewports × 7 pages × 2 test types = 42 tests
  - Desktop (1440px)
  - Tablet (1024px)
  - Mobile (390px — below 800px breakpoint)
- **Created**: [2026-02-21]
- **Command**: `npx playwright test --config=playwright.live-site.config.ts`
- **Status**: All pages pass without console errors ✅

### Local (Astro) Site Baselines
- **Location**: `tests/visual.spec.ts-snapshots/`
- **Purpose**: Reference design for ongoing Astro development
- **Coverage**: Same as live-site (3 viewports × 7 pages × 2 tests)
- **Test command**: `npm run test:visual`
- **Note**: Will become the reference baseline once Astro version is finalized and goes live

## Latest Test Run

- **Date**: [To be updated]
- **Status**: Baseline created
- **Tests Run**: Visual regression (14 tests: 7 pages × 2 tests each)
- **Results**: All pass against baselines

### Summary

[Ongoing test results to be recorded here as Astro development progresses]

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
