# Cloudflare Pages Deployment Guide

## Overview

Deploy the Astro static site to Cloudflare Pages with automatic builds from GitHub.

---

## Prerequisites

1. **GitHub repository** — Push your code to GitHub (already done)
2. **Cloudflare account** — Sign up at [cloudflare.com](https://cloudflare.com)
3. **Domain** (optional) — skrinakcreative.com or use a `pages.dev` subdomain

---

## Step 1: Connect GitHub to Cloudflare Pages

1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Go to **Pages** in the left sidebar
3. Click **Create a project** → **Connect to Git**
4. Authorize Cloudflare to access your GitHub account
5. Select your repository: `skrinak-creative` (or whatever it's named)
6. Click **Begin setup**

---

## Step 2: Configure Build Settings

On the **Project name and deployment settings** page:

### Project name
- Enter: `skrinak-creative` (or your preferred subdomain)
- This creates: `skrinak-creative.pages.dev`

### Build settings
- **Framework preset**: Select **Astro**
- **Build command**: `npm run build`
- **Build output directory**: `dist`

### Environment variables (optional)
- Leave blank for now — not needed for this static site

Click **Save and Deploy** — Cloudflare will start the first build.

---

## Step 3: Monitor First Deployment

1. You'll be taken to the **Deployments** page
2. Watch for the build to complete (usually 1-2 minutes)
3. Once complete, you'll see a green checkmark and a live preview URL
4. Click the preview URL to verify the site looks correct

---

## Step 4: Connect Your Domain (Optional)

If you own `skrinakcreative.com` and want to point it to Cloudflare Pages:

1. In Cloudflare Pages project settings, go to **Custom domains**
2. Click **Add custom domain**
3. Enter `skrinakcreative.com`
4. Follow prompts to update your domain's DNS records
5. Cloudflare will verify and enable HTTPS automatically

---

## Automatic Deployments

After initial setup, every time you:
- Push to `main` branch
- Or merge a PR to `main`

Cloudflare automatically:
1. Pulls the latest code
2. Runs `npm run build`
3. Deploys the `dist/` folder
4. Creates a new deployment in the Pages dashboard

---

## Verify Deployment

After each deploy, check:
- [ ] Build succeeded (green checkmark on Deployments page)
- [ ] Live preview works (click preview URL)
- [ ] All pages load (home, portfolio pages, contact)
- [ ] Images load correctly
- [ ] Navigation works
- [ ] Mobile responsive at 640px breakpoint

---

## Rollback

If a deployment causes issues:
1. Go to **Deployments** page
2. Find the previous working deployment
3. Click **Rollback** to instantly revert

---

## Build Logs

If a build fails:
1. Click the failed deployment
2. Click **View build log**
3. Check for errors (usually missing dependencies or npm issues)

Common issues:
- Missing environment variables (we don't have any)
- Node version mismatch (Cloudflare uses recent versions)
- Missing assets (all should be in `public/images/`)

---

## Local Testing Before Deploy

Before pushing changes:
```bash
npm run build
npx playwright test --config=playwright.compare.config.ts
```

This ensures the build succeeds and visual tests pass locally before Cloudflare builds.

---

## After Going Live

Once `skrinakcreative.com` points to Cloudflare Pages:

1. **Update DNS at domain registrar** to point to Cloudflare
2. **Wait for propagation** (5 minutes to 48 hours)
3. **Verify HTTPS** — Cloudflare provides free SSL/TLS
4. **Monitor** — Check Cloudflare analytics and performance metrics

---

## Useful Links

- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
- [Astro Deployment Guide](https://docs.astro.build/en/guides/deploy/cloudflare/)
- [Your Pages Project](https://dash.cloudflare.com/pages) (once created)

---

## Questions?

Refer to:
- Cloudflare Pages docs for deployment questions
- Astro docs for framework-specific issues
- This project's CLAUDE.md for local development questions
