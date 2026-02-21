# Skrinak Creative — Astro Site

Static site built with Astro + GLightbox, designed to replace the Squarespace site at skrinakcreative.com. Deploy to Cloudflare Pages (free).

---

## Project Structure

```
src/
  layouts/
    BaseLayout.astro      ← shared HTML shell: banner, nav, mobile drawer, footer
    PortfolioPage.astro   ← shared wrapper for all 5 portfolio category pages
  components/
    Gallery.astro         ← slideshow main image + thumbnail strip + GLightbox
  pages/
    index.astro           ← home
    brochures.astro       ← portfolio page (add images here)
    folders.astro
    logos-identity.astro
    newsletters.astro
    trade-show-display.astro
    contact.astro
  styles/
    global.css            ← all CSS, CSS variables, responsive breakpoints

public/
  images/
    logo.png              ← ← PLACE YOUR ASSETS HERE
    banner.png            ← full-width home banner background
    banner-inner.png      ← banner used on interior pages (can be same file)
    brochures/            ← portfolio images per category
    folders/
    logos-identity/
    newsletters/
    trade-show-display/
```

---

## Setup

```bash
npm install
npm run dev        # localhost:4321
npm run build      # outputs to dist/
npm run preview    # preview production build locally
```

---

## Adding Portfolio Images

1. Export images from Squarespace (Settings → Advanced → Import / Export, or use `wget`/`httrack` to scrape the image assets).
2. Place images in the correct `public/images/<category>/` folder.
3. Add each image to the `images` array in the corresponding page file (e.g. `src/pages/brochures.astro`).
4. Run `npm run build` and deploy.

**Brochures page example:**
```js
const images = [
  { src: '/images/brochures/Aerospace_bro.png', alt: 'Aviation & Aerospace brochure' },
  { src: '/images/brochures/STYLE_GUIDE.png',   alt: 'Style guide brochure' },
  // ... add more
];
```

---

## Deploy to Cloudflare Pages

1. Push this repo to GitHub.
2. Log into [Cloudflare Pages](https://pages.cloudflare.com/).
3. Create new project → connect GitHub repo.
4. Build settings:
   - **Framework preset**: Astro
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
5. Add custom domain: `skrinakcreative.com`
6. Update DNS at your registrar to point to Cloudflare Pages.

---

## Assets to Export from Squarespace Before Cancelling

- [ ] Logo PNG (`/images/logo.png`)
- [ ] Banner background image(s)
- [ ] All portfolio images — brochures, folders, logos, newsletters, trade show
- [ ] Favicon

Use browser dev tools → Network tab → filter by image type, or run:
```bash
wget --mirror --convert-links --adjust-extension --page-requisites \
     --no-parent https://skrinakcreative.com
```
