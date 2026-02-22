# Discovery & Planning — Squarespace → Astro Migration

**Date:** February 20-21, 2026
**Status:** ✅ Complete (moved to Claude Code for implementation)

---

## Initial Brief

Elena Skrinak runs a graphic design business at **skrinakcreative.com**. She currently uses Squarespace ($16–23/month) but the site is essentially a brochure with portfolio galleries—she doesn't need the full platform.

**Goals (ranked by priority):**
1. Lowest possible cost (eliminate Squarespace subscription)
2. Fastest performance
3. Keep current design intact
4. Easiest for Elena to maintain (she doesn't update content directly—Kyle does)

---

## Discovery Process

### Site Audit

Crawled the live Squarespace site to understand structure:

**Pages:** 7 total
- Homepage (hero + intro text)
- 5 portfolio category pages (Brochures, Folders, Logos & Identity, Newsletters, Trade Show & Display)
- Contact page

**Content:** Image-heavy portfolio galleries + contact form

**Key finding:** No custom layouts per category—every portfolio page uses identical structure:
- Full-width hero banner (dark background image)
- Page title
- Slideshow/lightbox gallery (main image viewer + thumbnail strip)

**Dynamic elements:** Only a Google Map embed on contact page (no form submission)

### Technology Options Evaluated

#### Option 1: AWS S3 + CloudFront Scrape
- Pros: Very low cost, easy to set up quickly
- Cons: Requires wiring up contact form (AWS SES + Lambda or third-party)
- Verdict: Fast path to savings but more moving parts

#### Option 2: Static Site Generator (Hugo, Astro, etc.)
- Pros: Clean maintainable source, easy to add portfolio pieces, excellent for galleries
- Cons: More upfront build work
- Verdict: Better long-term maintainability

#### Option 3: Cloudflare Pages + Astro
- Pros: Free hosting, auto-deploys from git, includes HTTPS + CDN globally, excellent image optimization
- Cons: Requires building the site vs. scraping
- Verdict: ✅ **CHOSEN** — Astro + Cloudflare Pages
  - Cloudflare Pages beats AWS for small static sites (unlimited bandwidth, zero-cost)
  - Astro's `<Image />` component handles WebP conversion + lazy loading (critical for image-heavy design portfolio)
  - Multi-collection support maps directly to portfolio categories
  - Workflow: Add image → update data file → git push → auto-deploy in 20s

---

## Architecture Decision

### Framework: Astro

**Why Astro over Hugo:**
- Hugo would require a build pipeline to optimize images; Astro's `<Image />` component does it natively
- Component model makes reusable gallery layouts clean
- Perfect for portfolios where images are the product

### Theme Analysis

Evaluated 3 existing Astro portfolio themes:
1. **Minimalistic Photography Portfolio** — Best structural fit (multi-collection YAML)
2. **Astro Photo Grid** — Excellent visually but single-gallery only
3. **Astro Multiverse** — Interesting but wrong structure

**Decision:** Don't use an existing theme.

**Reason:** The gap is substantial in two areas:
- **Header/Banner:** Elena's site uses full-viewport hero with logo top-left, nav top-right (Squarespace pattern). Every Astro theme uses a slim navbar at top. Mismatch requires rewriting the base layout anyway.
- **Mobile nav:** Elena's site uses a right-side slide-in drawer (Squarespace signature). Astro themes use hamburger dropdowns or nothing. Again, requires custom implementation.

**Conclusion:** Start with clean Astro starter kit and build the exact layouts Elena's current site uses, rather than fighting a theme. The hero banner + slide-in mobile nav is ~100 lines of CSS + vanilla JS—easier to build clean than adapt a theme.

---

## Design Specifications Extracted

### Typography

**Current fonts (Squarespace):**
- `futura-pt` — Primary (headings, nav, body)
- `europa` — Secondary (footer copy)

Both are Adobe Fonts bundled with Squarespace subscription. License is lost on cancellation.

**Decision:** Use **Jost** (Google Fonts)
- Geometric sans, closely matches Futura PT proportions
- Free, open source, available immediately
- Weights 300 & 500 cover all needs
- Elena likely won't notice the difference

### Color Palette

| Token | RGB | Hex | Usage |
|-------|-----|-----|-------|
| Dark (bg) | rgb(30, 25, 22) | #1e1916 | Banner, footer, body bg |
| Overlay | rgba(30, 25, 22, 0.7) | #1e1916 | Banner image overlay |
| Text dark | rgb(31, 31, 31) | #1f1f1f | Headings on white |
| Text light | rgb(245, 245, 245) | #f5f5f5 | Text on dark |
| Nav link | rgb(156, 153, 153) | #9c9999 | Header nav |
| Accent | rgb(156, 236, 65) | #9cec41 | Footer nav (lime green) |
| White | rgb(255, 255, 255) | #ffffff | Contact button |

### Layout & Spacing

- **Content max-width:** 1020px (centered, auto-margins)
- **Footer padding:** 64px top/bottom, 32px left/right
- **Spacing unit:** 32px (consistent throughout)
- **Responsive breakpoint:** 800px (hamburger appears below this)

### Banners

- **Home page:** 590px height
- **Inner pages:** 335px height
- Both use padding (not flexbox) to center text vertically
- Dark overlay: 70% opacity over image

### Mobile Navigation

- Right-side slide-in drawer (dark background)
- Appears at 800px breakpoint and below
- Close button (✕) in top-right of drawer
- Expandable "Portfolio" submenu in drawer

---

## Asset Inventory

### Images to Export

**Banner images:**
- `Banner.png` (home page, full viewport)
- `Banner_thinner.png` (inner pages, shorter)
- Logo (appears in nav)

**Portfolio galleries:**
- Brochures: 17 images
- Folders: (to be inventoried)
- Logos & Identity: (to be inventoried)
- Newsletters: (to be inventoried)
- Trade Show & Display: (to be inventoried)

### Contact Page

- Google Maps embed (Squarespace component)
- Can be replaced with static map or embedded iframe

---

## Next Steps (To Be Done)

1. ✅ Export asset inventory from Squarespace (all image files)
2. ✅ Inventory remaining 4 portfolio pages (folders, logos, newsletters, trade show)
3. ✅ Build Astro scaffold with exact design specs
4. Update fonts (Squarespace → Jost)
5. ✅ Configure Cloudflare Pages deployment
6. Test all pages at desktop (1440px) and mobile (390px)
7. Deploy & verify live
8. Point DNS to Cloudflare
9. Cancel Squarespace

---

## Decision Summary

| Decision | Option | Rationale |
|----------|--------|-----------|
| Hosting | Cloudflare Pages | Free, fast, auto-deploy from git, global CDN |
| Framework | Astro | Best image optimization, clean component model |
| Theme | None (build from scratch) | Gap between current design + existing themes too large |
| Font | Jost (Google Fonts) | Free, close match to Futura PT, available immediately |
| Mobile nav | Custom slide-in drawer | Matches current Squarespace pattern |
| Banner | Full-viewport hero | Match current design exactly |
| Contact form | Static page (no form) | Current site has Google Maps only, no form submission |

---

## Timeline

- **Feb 20:** Initial analysis + discovery
- **Feb 20:** Technology & theme evaluation
- **Feb 21:** Design specifications extraction + Astro scaffold generation
- **Feb 21 onwards:** Implementation in Claude Code
