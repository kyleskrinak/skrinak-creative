# Skrinak Creative — Documentation

Welcome! This documentation covers setup, development, deployment, and testing for the portfolio site migration from Squarespace to Astro.

## Quick Links

### Getting Started
- **[Setup Guide](./getting-started/index.md)** — Clone, install, run locally
- **[SPEC.md](../SPEC.md)** — Design specs, color palette, asset inventory (single source of truth)

### Development
- **[Code Change Process](./operations/code-change-process.md)** — Systematic approach: explore → plan → implement → verify
- **[GitFlow Workflow](./operations/gitflow.md)** — Branching strategy and release process
- **[Building & Configuration](./operations/build-configuration.md)** — Build scripts and debugging

### Testing & Quality
- **[Testing Guide](./testing/index.md)** — Visual regression, link checking, quality validation
- **[Test Results](./testing/findings.md)** — Latest test run results

### Deployment
- **[Deployment Guide](./operations/deployment.md)** — How to deploy to production (Cloudflare Pages)

---

## Key Information

**Repository**: https://github.com/kyleskrinak/skrinak-creative

**Production Environment**:
- URL: https://skrinakcreative.com
- Deployed on: Cloudflare Pages
- Triggers on: Push to `main` branch

**Development**:
- Work on: `develop` branch
- Release to: `main` via PR

---

## Design Specifications

All design specs are in **[SPEC.md](../SPEC.md)** — this is the single source of truth for:
- Typography (Jost, weights, sizes)
- Color palette (dark, light, accents)
- Layout & spacing
- Asset inventory (47 portfolio images + banners)

**Keep SPEC.md updated** whenever design specs change.

---

## Important Files

| File | Purpose |
|------|---------|
| `SPEC.md` | Design specs, measurements, asset inventory |
| `CLAUDE.md` | Project context, development philosophy, verification protocols |
| `Makefile` | Quick commands for build/test/push |
| `src/styles/global.css` | Global styles, typography (Jost), color variables |
| `src/assets/images/` | All portfolio images (47 files) |
| `astro.config.ts` | Astro configuration |

---

## Common Tasks

### Start Developing
```bash
npm run dev
# Visit http://localhost:4321
```

### Test Before Pushing
```bash
make test
# Runs visual regression tests
```

### Deploy to Production
```bash
git push origin develop  # Work on develop
# When ready, create PR: develop → main
gh pr create --base main --head develop --title "Release: ..."
```

### Check Code Style
```bash
npm run lint
npm run format
```

---

**Questions?** Check the relevant guide above, or review SPEC.md for design details.
