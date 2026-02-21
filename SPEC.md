# Skrinak Creative — Design Specification
> Reference document for Claude Code. All values measured directly from the live
> Squarespace site at skrinakcreative.com. Do not deviate from these specs without
> explicit instruction.

---

## Project Overview

Migrating skrinakcreative.com from Squarespace to a static Astro site hosted on
Cloudflare Pages (free tier). The goal is pixel-faithful reproduction of the current
design with zero Squarespace dependency.

**Stack**
- Framework: Astro (static output)
- Lightbox: GLightbox
- Hosting: Cloudflare Pages
- DNS: Point skrinakcreative.com to Cloudflare Pages

---

## Typography

The live site uses two Adobe Fonts (Typekit) faces that are bundled with the
Squarespace subscription. These licenses do NOT transfer on cancellation.

### Current fonts (Squarespace / Adobe Fonts)
| Font | Role |
|---|---|
| `futura-pt` | Primary — headings, nav, page titles, body |
| `europa` | Secondary — body copy, footer copyright |

### Replacement strategy — ✅ DECIDED: Jost
Selected **Jost** (Google Fonts) — free, geometric sans inspired by Futura PT.
- Implementation: Both `--font-display` and `--font-body` use Jost (weights 300, 500)
- Google Fonts import: `family=Jost:wght@300;500`

### Exact usage specs (measured from live site)

| Element | Font | Weight | Size | Transform | Letter-spacing | Color |
|---|---|---|---|---|---|---|
| Nav links | futura-pt | 500 | 13px | uppercase | 2px | `#9c9999` |
| Contact Us button | futura-pt | 500 | 13px | uppercase | — | `#ffffff` |
| Page title (h2) | futura-pt | 300 | 32px | none | normal | `#1f1f1f` |
| Banner heading | futura-pt | 300 | 28px | none | normal | `#f5f5f5` |
| Footer nav links | futura-pt | 500 | 13px | uppercase | 2px | `#9cec41` |
| Body copy (home) | futura-pt | 300 | 28px | none | normal | `#f5f5f5` |
| Body copy (inner) | europa | 300 | 16px | none | 0.5px | `#1f1f1f` |
| Footer copyright | europa | 300 | 16px | none | — | `#9c9999` |

---

## Color Palette

All values measured via `window.getComputedStyle()` on the live site.

| Token | Value | Hex | Usage |
|---|---|---|---|
| `--color-dark` | `rgb(30, 25, 22)` | `#1e1916` | Banner bg, footer bg, body bg |
| `--color-overlay` | `rgba(30, 25, 22, 0.7)` | `#1e1916` at 70% | Banner image overlay |
| `--color-text-dark` | `rgb(31, 31, 31)` | `#1f1f1f` | Headings, body text on white |
| `--color-text-light` | `rgb(245, 245, 245)` | `#f5f5f5` | Text on dark backgrounds |
| `--color-nav-link` | `rgb(156, 153, 153)` | `#9c9999` | Header nav link color |
| `--color-accent` | `rgb(156, 236, 65)` | `#9cec41` | Footer nav links (lime green) |
| `--color-white` | `rgb(255, 255, 255)` | `#ffffff` | Contact Us button text + border |

---

## Layout & Grid

### Content container
- Max-width: **1020px**
- Centered with auto margins
- At 1455px viewport: left offset = 218px (auto-centered)

### Footer inner
- Max-width: **1020px**
- Padding: **64px top/bottom, 32px left/right**

### Squarespace grid classes (reference only — do not replicate)
- `sqs-grid-12` / `sqs-col-12` / `sqs-row`
- All pages use a single full-width column — no multi-column layouts exist

### Spacing observations
- No formal 8px grid detected
- Consistent values: 32px (padding unit), 64px (section spacing)
- Squarespace template config: `transparent-header`, `nav-button-style-outline`,
  `nav-button-corner-style-square`

---

## Header / Banner

### Structure
The header IS the hero — a full-viewport-width background image with nav overlaid
on top and centered text sitting in the middle. There is no separate navbar above
the banner.

### Home page banner
- Height: **590px**
- Padding: `180px top, 155px bottom` (Squarespace centers text via padding)
- Background image: `Banner.png`
- Overlay: `rgba(32, 26, 22, 0.7)` over the image

### Inner page banner (all portfolio + contact pages)
- Height: **335px**
- Same padding scheme as home: `180px top, 155px bottom`
- Background image: `Banner_thinner.png` (different, shorter image)
- Same overlay

### Logo
- Position: top-left of banner, `left: 20px`
- Dimensions: **159px wide × 100px tall**
- File: `logo.png` (to be exported from Squarespace)

### Desktop nav bar
- Sits inside the banner area, not above it
- Nav element: 1235px wide, starts at `left: 200px`
- Links: futura-pt 500 13px uppercase 2px letter-spacing `#9c9999`
- Portfolio: dropdown trigger (not a link itself)
- Contact Us: outlined button — 2px solid white border, square corners, white text

### Portfolio dropdown
- Triggered on hover
- Contains 5 links: Brochures, Folders, Logos & Identity, Newsletters & One-pagers,
  Trade Show & Display

---

## Mobile Navigation

### Breakpoint
- Hamburger appears below **800px** (Squarespace standard breakpoint)
- Desktop nav hidden below 800px

### Drawer behavior (confirmed from live site inspection)
- Right-side slide-in drawer
- Dark background (`#201a16`)
- ✕ close button top-right of drawer
- Portfolio section is expandable (shows sub-links)
- Overlay dims the left portion of screen

---

## Page Structure

### All pages share
- Banner (home: 590px, inner: 335px)
- Same `Banner.png` / `Banner_thinner.png` background
- Footer with portfolio nav links + copyright

### Home (`/`)
- Banner heading: "Graphic Design"
- Banner eyebrow: "Skrinak Creative, Inc."
- Below banner: single centered text block, max-width ~956px, `32px` padding all sides
- Body copy color: `#f5f5f5` (white-ish, on dark background — home page bg is dark)

### Portfolio pages (`/brochures`, `/folders`, `/logos-identity`, `/newsletters`, `/trade-show-display`)
- Inner banner with page title centered in banner
- Below banner: page title as h2 (futura-pt 300 32px `#1f1f1f`) at `top: 431px, left: 250px`
- Gallery component below title
- Content area width: 956px centered

### Contact (`/contact`)
- Inner banner, heading "Contact Us"
- No form — just name, phone, email for two contacts
- Physical address
- Google Maps embed

---

## Gallery Component

### Behavior (confirmed from live Squarespace site)
- Large main image viewer (slideshow style — one image at a time)
- Thumbnail strip below (scrollable horizontally)
- Prev/Next arrow buttons on main image
- Clicking main image opens GLightbox fullscreen overlay
- Thumbnail click changes main image (does NOT directly open lightbox)
- Navigation wraps (last → first, first → last)
- GLightbox: touch navigation, loop, zoomable

### Brochures page — confirmed image list (17 images)
All filenames taken directly from live site DOM:
1. `Aerospace_bro.png`
2. `STYLE_GUIDE.png`
3. `2015_TakeAway.png`
4. `RxStudy_Card_brochure.png`
5. `BaseCamp_bro.png`
6. `DRAKAbro.png`
7. `e-NC_BiennaI.png`
8. `e-nc2.png`
9. `Elite_brochure.png`
10. `gateway.png`
11. `Healthcare_bro.png`
12. `Magnacet_bro.png`
13. `NCsmall.png`
14. `Peacebro.png`
15. `Peacecamp.png`
16. `PNI_brochure.png`
17. `SEW.png`

### Folders page — 6 images
1. `CCfolder.png`
2. `e-NC.png`
3. `GSS.png`
4. `H&M.png`
5. `KPC.png`
6. `Manufacturing_bro.png`

### Logos & Identity page — 7 images
1. `COE_logo.png`
2. `interact_cleaned.png`
3. `CClogo.png`
4. `2020.png`
5. `wmtlogo.png`
6. `GSS.png`
7. `KM_cleaned.png`

### Newsletters & One-pagers page — 6 images
1. `HfHnews.png`
2. `DRAKAbulletins.png`
3. `DRAKAnews.png`
4. `Evokat_sellsheet.png`
5. `HomeownerHapps.png`
6. `HIV_sellsheet_v2.png`

### Trade Show & Display page — 10 images
1. `DRAKA_TS_Panels.png`
2. `Plexus_wheel_OUTLINE.png`
3. `DRAKAtrade.png`
4. `Office_posters.png`
5. `MoodleMoot_Poster.png`
6. `17-133_CA-BIO2017_Samulski-24x36_P3_withmap.png`
7. `VICTORYtrade.png`
8. `2017_tradeshow_panel.png`
9. `VICTORYtrade.png` (duplicate in gallery)
10. `IMG_0030.png`

---

## Footer

### Structure
- Background: `#201a16`
- Inner container: 1020px max-width, 64px top/bottom padding, 32px left/right
- Nav links: futura-pt 500 13px uppercase 2px letter-spacing `#9cec41` (lime green)
- Copyright: "©[year] Skrinak Creative, Inc." — europa 300 16px `#9c9999`

### Footer nav links (in order)
1. Brochures → `/brochures`
2. Folders → `/folders`
3. Logos & Identity → `/logos-identity`
4. Newsletters & One-pagers → `/newsletters`
5. Trade Show & Display → `/trade-show-display`

---

## Assets Exported from Squarespace ✅

All assets have been successfully exported and organized in `src/assets/images/`:

### Collected
- [x] `SCI_logomark_KO.png` — site logo
- [x] `Banner.png` — home page banner background (322K)
- [x] `Banner_thinner.png` — inner page banner background (208K)
- [x] All brochure images (17 files)
- [x] All folder images (6 files)
- [x] All logos & identity images (7 files)
- [x] All newsletter images (6 files)
- [x] All trade show & display images (9 files)
- [ ] Favicon (not found in Squarespace export — may need to source separately)

### Total: 47 portfolio + banner/logo images ready for use

---

## Deployment

### Cloudflare Pages setup
1. Push repo to GitHub
2. Cloudflare Pages → New project → Connect GitHub repo
3. Build settings:
   - Framework preset: **Astro**
   - Build command: `npm run build`
   - Output directory: `dist`
4. Custom domain: `skrinakcreative.com`
5. Update DNS at registrar to Cloudflare nameservers

### Cost
- Cloudflare Pages: **$0**
- GLightbox: **$0** (MIT)
- Astro: **$0** (MIT)
- Font: **TBD** (pending font decision)
- Domain renewal: existing cost unchanged

---

## Open Decisions

1. **Google Maps embed** — keep iframe or replace with static map image
2. **Banner images** — confirm `Banner.png` vs `Banner_thinner.png` filenames match exports
