# Operations & Deployment

This section covers developing, maintaining, and deploying the Astro portfolio site.

## Development & Process

- **[Code Change Process](./code-change-process.md)** — Systematic approach: explore → plan → implement → verify
- **[GitFlow Workflow](./gitflow.md)** — Branching strategy for development and releases

## Build & Configuration

- **[Build & Configuration Guide](./build-configuration.md)** — Build scripts, Astro setup, and debugging

## Deployment

- **[Deployment Guide](./deployment.md)** — Deploy to production (Cloudflare Pages) via `main` branch

---

## Quick Reference

### Development Workflow

```bash
# 1. Work on develop branch
git checkout develop && git pull origin develop

# 2. Make changes and commit
git add -A
git commit -m "feat(pages): add brochures page"

# 3. Push to develop
git push origin develop

# 4. When ready to release, create PR: develop → main
gh pr create --base main --head develop --title "Release: portfolio pages"

# 5. After PR merge, Cloudflare Pages auto-deploys to production
```

### Testing Before Release

```bash
# Verify everything works locally
npm run build
npm run test:visual
npm run lint

# If all pass, you're ready to push
```

### Deploy to Production

```bash
# Create PR from develop to main
gh pr create --base main --head develop --title "Release: ..."

# GitHub CI runs tests
# Once approved and CI passes, merge via GitHub UI
# Cloudflare Pages auto-deploys to https://skrinakcreative.com
```

---

## Key Information

**Staging Environment**:
- Branch: `develop`
- Deployment: Manual (or local preview)

**Production Environment**:
- URL: https://skrinakcreative.com
- Branch: `main`
- Platform: Cloudflare Pages
- Deployment: Auto-triggered on push to `main`

**Branches**:
- `develop` — Active development
- `main` — Production (requires PR)

---

See [Deployment Guide](./deployment.md) for detailed instructions on deploying to production.
