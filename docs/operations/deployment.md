# Deployment Guide

Deploy the portfolio site to production via Cloudflare Pages.

## Environments

### Production (`main` branch)
- **URL**: https://skrinakcreative.com
- **Platform**: Cloudflare Pages
- **Deployment**: Auto-triggered when code is pushed to `main`
- **Status**: Live, user-facing

### Development (`develop` branch)
- **Platform**: Local or staging preview (depends on GitHub Actions setup)
- **Deployment**: Manual (push to develop, no auto-deploy)

---

## Deployment Process

### Prerequisites

1. **Production branch is clean**:
   ```bash
   git checkout main
   git pull origin main
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

### Step 1: Create Release PR

From `develop` to `main`:

```bash
gh pr create --base main --head develop \
  --title "Release: Portfolio site migration from Squarespace" \
  --body "## Changes
- Migrate from Squarespace to Astro static site
- Implement all 5 portfolio pages (brochures, folders, logos, newsletters, trade show)
- Add contact page with embedded Google Maps
- Set up gallery component with GLightbox lightbox
- Configure Jost typography (Google Fonts)
- Pixel-faithful reproduction of original design

## Testing
- [x] Local build passes
- [x] Visual regression tests pass
- [x] All pages tested in browser
- [x] All images load correctly
- [x] Gallery functionality works
- [x] Mobile responsive design verified
- [x] No console errors
"
```

### Step 2: Review & Approval

- Review the PR description for accuracy
- Verify all changes are intentional
- Approve when satisfied

### Step 3: Merge to Main

Once approved and CI passes:

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

1. Create hotfix branch off `main`:
   ```bash
   git checkout main
   git pull origin main
   git checkout -b hotfix/production-issue
   ```

2. Fix the issue:
   ```bash
   # ... edit files ...
   git add -A
   git commit -m "fix(gallery): correct image path bug"
   ```

3. Create PR to `main`:
   ```bash
   gh pr create --base main --head hotfix/production-issue \
     --title "Hotfix: fix production issue"
   ```

4. Merge and deploy. Cloudflare Pages auto-deploys.

### Option 2: Revert Previous Commit

If the issue is in the last commit:

```bash
git checkout main
git revert HEAD
git push origin main
```

Cloudflare Pages auto-deploys the reverted code.

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

```bash
# Find the previous commit hash
git log main --oneline | head -5

# Revert to previous commit
git revert <previous-commit-hash>
git push origin main

# Cloudflare Pages auto-deploys the revert
```

---

## Troubleshooting

### Site not updating after push to main

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
