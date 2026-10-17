# Deployment Guide

Deploy the portfolio site to production via Cloudflare Pages.

## Environments

### Production (`main` branch)
- **URL**: https://skrinakcreative.com
- **Platform**: Cloudflare Pages
- **Deployment**: Auto-triggered when code is pushed to `main`
- **Status**: Live, user-facing

### Preview (every pull request)
- **Platform**: Cloudflare Pages preview deployment
- **Deployment**: Auto-triggered on each push to a PR branch
- **URL**: Posted as a PR comment. The stable Branch Preview URL is `https://<branch-name>.skrinak-creative.pages.dev`
- **Purpose**: Staging. Review changes here before merging to `main`.

There is no `develop` or `staging` branch. See [Branching Workflow](./gitflow.md).

---

## Deployment Process

### Prerequisites

1. **Work is on a branch off an up-to-date `main`**:
   ```bash
   git checkout main && git pull origin main
   git checkout -b feat/your-change
   ```

2. **All tests pass locally**:
   ```bash
   npm run build
   npm run test:visual
   npm run test:console
   npm run lint
   ```

3. **Code changes are ready for production**:
   - SPEC.md updated if design specs changed
   - All pages functional and tested
   - Images optimized
   - No console errors

### Step 1: Open a PR into `main`

```bash
git push -u origin feat/your-change
gh pr create --base main --title "feat(gallery): ..." --body "## Changes
- ...

## Testing
- [x] Local build passes
- [x] Visual regression tests pass
"
```

### Step 2: Review the PR and its preview

- Wait for **PR Checks** (`build`, `audit`, `visual`) to pass
- Open the **Branch Preview URL** from the Cloudflare Pages comment and click through the changed pages
- Read the Copilot review, if any
- Verify all changes are intentional

### Step 3: Merge to Main

Once checks pass and the preview looks right:

1. **Merge via GitHub UI**: Click "Merge pull request"
2. **Cloudflare Pages auto-deploys**:
   - Build starts automatically
   - Takes ~1-2 minutes
   - Site updates at https://skrinakcreative.com

### Step 4: Verify Production

1. **Visit the live site**:
   ```bash
   open https://skrinakcreative.com
   ```

2. **Spot-check**:
   - Homepage loads
   - Navigation works
   - Portfolio pages load (brochures, folders, logos, newsletters, trade show)
   - Contact page loads with map
   - Images display correctly
   - Gallery works (click image, lightbox opens)
   - Mobile view is responsive

3. **Check console automatically** (recommended):
   ```bash
   npm run test:console:live
   ```
   All 14 tests should pass (7 pages × 2 viewports).

4. **Manual console check** (DevTools → Console):
   - No errors
   - No 404s
   - No warnings

---

## Rollback

If production has critical issues:

### Option 1: Quick Fix (Recommended)

1. Create a fix branch off `main`:
   ```bash
   git checkout main && git pull origin main
   git checkout -b fix/production-issue
   ```

2. Fix the issue:
   ```bash
   # ... edit files ...
   git add -A
   git commit -m "fix(gallery): correct image path bug"
   ```

3. Create PR to `main`:
   ```bash
   git push -u origin fix/production-issue
   gh pr create --base main --fill
   ```

4. Merge once checks pass. Cloudflare Pages auto-deploys.

### Option 2: Revert the Merged PR

On GitHub, open the PR that caused the problem and click **Revert**. GitHub opens a revert PR. Merge it, and Cloudflare Pages redeploys the previous state.

---

## Cloudflare Pages Configuration

The site is configured to auto-deploy from GitHub:

**Build Settings**:
- Framework preset: **Astro**
- Build command: `npm run build`
- Build output directory: `dist`

**Environment Variables** (set in Cloudflare Pages):
- `NODE_VERSION`: `20` (or current LTS)

**Custom Domain**:
- Domain: `skrinakcreative.com`
- Status: Active

**DNS**:
- Nameservers: Cloudflare (managed via Cloudflare DNS)

---

## Monitoring

After deployment:

1. **Visit the site**: https://skrinakcreative.com
2. **Check all pages**: Home, brochures, folders, logos, newsletters, trade show, contact
3. **Test gallery**: Click an image, lightbox should open
4. **Test mobile**: Use DevTools device emulation or test on phone
5. **Check console**: No errors or 404s

---

## Performance Monitoring

For basic performance monitoring:

1. **Check Cloudflare Analytics**:
   - Log in to Cloudflare Dashboard
   - Select `skrinakcreative.com` project
   - View requests, errors, page load times

2. **Local Lighthouse audit**:
   ```bash
   # Build and preview locally
   npm run build
   npm run preview
   # Open http://localhost:4321
   # In Chrome DevTools: Lighthouse → Generate report
   ```

---

## Undoing a Release

If you need to revert to the previous version:

Revert the release's merge commit on a branch and merge it through a PR:

```bash
git checkout main && git pull origin main
git log main --oneline --merges | head -5   # find the merge commit to undo

git checkout -b fix/revert-release
git revert -m 1 <merge-commit-hash>
git push -u origin fix/revert-release
gh pr create --base main --fill

# Merge the PR; Cloudflare Pages auto-deploys the revert
```

The **Revert** button on the merged PR in GitHub does the same thing.

---

## Troubleshooting

### Site not updating after merge to main

1. **Check GitHub Actions**: Go to repo → Actions, verify build passed
2. **Check Cloudflare Pages**: Dashboard → Deployments, verify latest deploy succeeded
3. **Clear cache**:
   - Hard refresh: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
   - Or clear browser cache manually

### Build fails on Cloudflare Pages

1. **Check build logs**: Cloudflare Pages → Deployments → View build log
2. **Verify locally**: `npm run build` passes?
3. **Check Node version**: Cloudflare Pages may need `NODE_VERSION` env var set to 20

### Images not loading

1. **Check asset paths**: Are image references using correct paths?
2. **Verify images exist**: Check `src/assets/images/` locally
3. **Check console**: Are there 404 errors for missing images?

---

## Next Steps After Deployment

1. **Update DNS** (if registrar wasn't already pointing to Cloudflare):
   - Go to domain registrar
   - Change nameservers to Cloudflare nameservers
   - Wait 24-48 hours for DNS propagation

2. **Cancel Squarespace subscription**:
   - Only after verifying skrinakcreative.com is live and working
   - Back up any remaining content first
   - Then cancel subscription

3. **Monitor the live site**:
   - Check Cloudflare Analytics daily for first week
   - Monitor for errors or performance issues
   - Test from different devices and networks
