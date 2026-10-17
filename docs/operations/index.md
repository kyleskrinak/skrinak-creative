# Operations & Deployment

This section covers developing, maintaining, and deploying the Astro portfolio site.

## Development & Process

- **[Code Change Process](./code-change-process.md)** — Systematic approach: explore → plan → implement → verify
- **[Branching Workflow](./gitflow.md)** — GitHub Flow: short-lived branches, PRs into `main`, Cloudflare previews

## Build & Configuration

- **[Build & Configuration Guide](./build-configuration.md)** — Build scripts, Astro setup, and debugging

## Deployment

- **[Deployment Guide](./deployment.md)** — Deploy to production (Cloudflare Pages) via `main` branch

---

## Quick Reference

### Development Workflow

```bash
# 1. Branch off an up-to-date main
git checkout main && git pull origin main
git checkout -b feat/brochures-page

# 2. Make changes and commit
git add -A
git commit -m "feat(pages): add brochures page"

# 3. Push and open a PR into main
git push -u origin feat/brochures-page
gh pr create --base main --fill

# 4. Check the Cloudflare preview URL posted on the PR
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
# Open a PR from your branch into main
gh pr create --base main --fill

# PR Checks (build, audit, visual) and a Cloudflare preview deploy run on the PR
# Once checks pass and the preview looks right, merge via GitHub UI
# Cloudflare Pages auto-deploys to https://skrinakcreative.com
```

---

## Key Information

**Preview (staging) Environment**:
- Source: every pull request
- URL: `https://<branch-name>.skrinak-creative.pages.dev` (posted as a PR comment)
- Deployment: Auto-triggered by Cloudflare Pages on each push to a PR branch

**Production Environment**:
- URL: https://skrinakcreative.com
- Branch: `main`
- Platform: Cloudflare Pages
- Deployment: Auto-triggered on push to `main`

**Branches**:
- `main`: Production. Changes arrive by PR.
- Short-lived `feat/`, `fix/`, `chore/`, `docs/`, `ci/` branches: one per change, deleted after merge
- No `develop` or `staging` branch

---

See [Deployment Guide](./deployment.md) for detailed instructions on deploying to production.
