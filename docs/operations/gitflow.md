# GitFlow Workflow

Lightweight gitflow for solo development on a static portfolio site.

## Branch Structure

- **`develop`**: Main integration branch. Active development, direct commits allowed. Staging/preview environment.
- **`main`**: Production-ready code. Auto-deploys to skrinakcreative.com via Cloudflare Pages. Requires PR.

**No feature branches** (unless you need work isolation — see below).

## Key Rules

1. **Work directly on `develop`**: For solo development, commit and push directly to `develop` for fast iteration.
2. **`main` is production**: Requires PR from `develop`. All production changes flow through PRs for audit.
3. **Flow is linear**: `develop` (work) → PR → `main` (production)
4. **Never commit directly to `main`**: Always use PRs.

---

## Standard Workflow (Direct to Develop)

**Default workflow for solo development**:

```bash
# 1. Make sure you're on develop and up to date
git checkout develop && git pull origin develop

# 2. Make changes and commit
# ... edit files ...
git add -A
git commit -m "feat(gallery): implement GLightbox lightbox for portfolio images"

# 3. Push directly to develop
git push origin develop

# 4. When ready to release, create PR: develop → main
gh pr create --base main --head develop --title "Release: add gallery and contact pages"
```

**When to use feature branches instead**:
- Long-running work (days/weeks)
- Experimental features you might abandon
- When pausing work and switching context

---

## Creating a Feature Branch (Optional)

Use only when you need work isolation:

```bash
git checkout develop
git pull origin develop
git checkout -b feature/gallery-component

# ... make changes ...
git add -A
git commit -m "feat(gallery): build GLightbox component"
git push -u origin feature/gallery-component

# Merge back to develop when ready
git checkout develop
git pull origin develop
git merge --no-ff feature/gallery-component
git push origin develop
git branch -d feature/gallery-component
git push origin --delete feature/gallery-component
```

**Naming convention**: Use `feature/`, `fix/`, `chore/`, or `docs/` prefixes.

---

## Releasing to Production

### Prerequisites

Before opening a release PR, verify:

```bash
# Make sure develop is up to date
git checkout develop && git pull origin develop

# Verify tests pass locally
npm run build
npm run test:visual
```

### Create Release PR

```bash
# Create PR from develop to main
gh pr create --base main --head develop \
  --title "Release: v1.0.0 — Portfolio pages and gallery" \
  --body "## Changes
- Implement gallery component with GLightbox
- Create all 5 portfolio pages (brochures, folders, logos, newsletters, trade show)
- Add contact page with map
- Set up Jost typography

## Testing
- [x] Local build passes
- [x] Visual regression tests pass
- [x] Link checking passes
"
```

### Release Checklist

Before merging `develop` → `main`:

- [ ] All pages implemented and tested
- [ ] Visual regression tests pass
- [ ] Build passes without errors
- [ ] Images are optimized
- [ ] SPEC.md matches implementation (colors, typography, spacing)
- [ ] No console errors
- [ ] Links work (internal + image galleries)
- [ ] Mobile responsive

### Merge & Deploy

Once approved and CI passes, merge via GitHub UI. Cloudflare Pages automatically deploys.

---

## Branch Protection Rules

Configure via GitHub: Repository → Settings → Branches → Add Rule

### `develop`
- Optional: Require CI to pass (GitHub Actions)
- Optional: Require PR review (catch issues early)

### `main`
- **Require pull request review** (≥ 1 approval)
- **Require CI to pass** (GitHub Actions)
- **Require branches to be up to date** before merge
- **Dismiss stale reviews** on new commits

---

## Rollback Strategy

### If Development is Broken

1. Identify the problematic commit:
   ```bash
   git log --oneline develop | head
   ```

2. Revert the commit:
   ```bash
   git checkout develop
   git revert <commit-hash>
   git push origin develop
   ```

3. Fix the issue in a new commit.

### If Production is Broken

1. Create a hotfix branch off `main`:
   ```bash
   git checkout main
   git pull origin main
   git checkout -b hotfix/production-bug

   # Fix the issue
   git add -A
   git commit -m "fix(gallery): correct image path in lightbox"
   ```

2. Create PR to `main`:
   ```bash
   gh pr create --base main --head hotfix/production-bug \
     --title "Hotfix: fix image paths in gallery"
   ```

3. Merge and deploy.

4. Sync `develop` with the fix:
   ```bash
   git checkout develop
   git pull origin develop
   git merge main
   git push origin develop
   ```

---

## Conventional Commits

Use [Conventional Commits](https://www.conventionalcommits.org/) for clear history:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types**: `feat`, `fix`, `chore`, `docs`, `style`, `refactor`, `test`, `ci`

**Examples**:
- `feat(pages): add brochures portfolio page with gallery`
- `fix(styles): correct Jost font weight in headings`
- `docs(spec): update asset inventory`
- `chore(build): configure image optimization`

---

## Questions

**Q: Can I commit directly to `develop`?**

A: Yes. Direct commits to `develop` are allowed for fast iteration.

**Q: Can I commit directly to `main`?**

A: No. All changes to production require PRs for audit and validation.

**Q: What if I need an urgent production fix?**

A: Create a `hotfix/` branch off `main`, fix, test, PR to `main`, merge, then sync `develop`.

**Q: How do I clean up old feature branches?**

A: After merging to `develop`:
```bash
git branch -d feature/your-feature
git push origin --delete feature/your-feature
```

---

## Environment Variables

### Local Development

Use `.env` file (not committed; see `.env.example`):

```bash
# Example (if needed for future features)
PUBLIC_SITE_URL=http://localhost:3000
```

### Production CI (Cloudflare Pages)

Set in Cloudflare Pages project settings → Environment variables:
- `NODE_VERSION=20` (or current LTS)

No secrets needed for this static site.
