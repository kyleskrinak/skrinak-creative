# Branching Workflow

GitHub Flow: short-lived branches off `main`, merged back to `main` through a pull request. There is no `develop` or `staging` branch. Cloudflare Pages builds a preview of every PR, and that preview takes the place of a staging environment.

## Branches

- **`main`**: Production. Every merge auto-deploys to skrinakcreative.com via Cloudflare Pages.
- **Short-lived work branches**: One per change, branched off `main`, deleted after merge.

**Naming**: Prefix with the Conventional Commit type, e.g. `feat/`, `fix/`, `chore/`, `docs/`, `ci/`.

## Key Rules

1. **Branch off an up-to-date `main`** for every change.
2. **Every change reaches `main` through a PR**, so CI, the Cloudflare preview, and Copilot review all run before production.
3. **Keep branches short-lived**: merge or close within days, then delete.

---

## Standard Workflow

```bash
# 1. Start from an up-to-date main
git checkout main && git pull origin main
git checkout -b feat/gallery-captions

# 2. Make changes and commit
# ... edit files ...
git add -A
git commit -m "feat(gallery): add captions to lightbox images"

# 3. Verify locally
npm run build
npm run test:visual

# 4. Push and open a PR into main
git push -u origin feat/gallery-captions
gh pr create --base main --fill
```

### What runs on the PR

| Check | What it does |
| --- | --- |
| **PR Checks** (GitHub Actions) | `build`, `audit` (`npm audit --audit-level=high`), `visual` (Playwright) |
| **Cloudflare Pages** | Builds a preview and comments with a per-commit **Preview URL** and a stable **Branch Preview URL** (`https://<branch-name>.skrinak-creative.pages.dev`) |
| **Copilot code review** | Requested automatically on PRs you open. It skips lockfiles, and it doesn't review Dependabot PRs. |

Use the Branch Preview URL as the staging check: click through the changed pages before merging.

### Merge and clean up

Merge via the GitHub UI once the checks pass and the preview looks right. Cloudflare Pages deploys `main` to production in about 1–2 minutes.

```bash
git checkout main && git pull origin main
git branch -d feat/gallery-captions
git push origin --delete feat/gallery-captions
```

---

## Dependabot PRs

Dependabot opens grouped dependency PRs against `main` every Monday at 09:00 America/New_York (see `.github/dependabot.yml`). They get the same checks as any other PR, except Copilot review.

- When `@playwright/test` gets a minor bump, update the `mcr.microsoft.com/playwright:vX.Y.Z-noble` container image to match in **both** `.github/workflows/pr-checks.yml` and `.github/workflows/weekly-maintenance.yml`. Otherwise the `visual` job fails at browser launch.
- Dependabot stops rebasing a PR once anyone else pushes to its branch. Bring such a PR up to date by merging `main` into it rather than force-pushing.

---

## Branch Protection

`main` is covered by the **Main Copilot** repository ruleset (Settings → Rules → Rulesets):

- Blocks branch deletion
- Blocks force pushes
- Automatically requests Copilot code review on new PRs, new pushes, and draft PRs

The ruleset does **not** require a PR or passing checks. Merging through a PR is a convention. To enforce it, add the "Require a pull request before merging" and "Require status checks to pass" rules to the ruleset.

---

## Rollback

### Revert a bad merge

On GitHub, open the merged PR and click **Revert**. GitHub creates a revert branch and PR. Merge it, and Cloudflare Pages redeploys the previous state.

From the command line, the equivalent is:

```bash
git checkout main && git pull origin main
git checkout -b fix/revert-gallery-captions
git revert -m 1 <merge-commit-hash>
git push -u origin fix/revert-gallery-captions
gh pr create --base main --fill
```

### Fix forward

For a small production bug, a normal `fix/` branch and PR is usually faster than a revert.

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
