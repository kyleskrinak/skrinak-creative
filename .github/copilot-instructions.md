# Copilot Instructions — Skrinak Creative

Static portfolio site migrated from Squarespace to Astro, deployed on Cloudflare Pages.

**Key constraint**: `SPEC.md` is the single source of truth for all design values (colors, spacing, typography, layout). Do not deviate from it without explicit instruction.

---

## Commands

```bash
npm run dev              # Dev server at localhost:4321
npm run build            # Production build → dist/
npm run preview          # Preview prod build at localhost:4322

npm run test:visual                   # Full visual regression suite (builds first)
npm run test:visual:desktop           # Desktop only
npm run test:visual:mobile            # Mobile only
npm run test:visual:baseline          # Update snapshots
npm run test:console                  # Console error checks
npm run test:links                    # Broken link check
```

Run a **single test file**:
```bash
npx playwright test tests/visual.spec.ts
npx playwright test tests/navigation.spec.ts
```

Visual tests build the site first (port 4322, not 4321). Set `TEST_URL` to test against the live site:
```bash
TEST_URL=https://www.skrinakcreative.com npm run test:console
```

---

## Architecture

```
src/
  layouts/
    BaseLayout.astro      ← HTML shell: banner, nav, mobile drawer, footer, GA4
    PortfolioPage.astro   ← Thin wrapper: BaseLayout + page title + Gallery
  components/
    Gallery.astro         ← Unoptimized gallery (string src paths, public/)
    OptimizedGallery.astro ← Optimized gallery (ImageMetadata, Astro Image component)
  pages/                  ← index, contact, + 5 portfolio category pages
  styles/
    global.css            ← All CSS — CSS variables, layout, responsive breakpoints
  utils/
    images.ts             ← Centralized image imports (ImageMetadata) for all categories
  assets/images/          ← All 47 portfolio images + banners + logo
```

**Portfolio pages** (brochures, folders, logos-identity, newsletters, trade-show-display) all follow the same pattern:
1. Import `images.<category>` from `src/utils/images.ts`
2. Render `<BaseLayout>` + `<OptimizedGallery>` directly (not via `PortfolioPage.astro`)

**Two gallery components exist**:
- `OptimizedGallery.astro` — used by all current portfolio pages; takes `ImageMetadata` (imported via `src/utils/images.ts`); uses Astro `<Image>` for WebP + srcset
- `Gallery.astro` — legacy; takes `{ src: string, alt: string }`; no Astro image optimization

**`src/utils/images.ts`** is the central registry for all portfolio images. Every image must be imported here and added to the relevant category array. This is what feeds `OptimizedGallery`.

**GLightbox** is initialized per gallery instance inside each component's `<script>` block, keyed by `data-gallery={category}`. Clicking a main image opens the lightbox at that index; thumbnail clicks change the visible slide without opening the lightbox.

**Mobile nav breakpoint**: 800px (hamburger replaces desktop nav below this width).

---

## Key Conventions

### Image management
All portfolio images live in `src/assets/images/` (not `public/`). Add new images by:
1. Placing the file in `src/assets/images/`
2. Adding an import + entry in `src/utils/images.ts`
3. The page automatically picks it up via the `images.<category>` array

### CSS
All styles are in `src/styles/global.css`. There are no component-scoped styles except the two `.gallery-slide--*` rules in gallery components. CSS variables are defined in `:root` and must match `SPEC.md` values.

### Commit messages
Use Conventional Commits: `type(scope): subject`  
Types: `feat`, `fix`, `chore`, `docs`, `style`, `refactor`, `test`  
Examples: `feat(gallery): add keyboard navigation`, `fix(nav): correct mobile breakpoint`

### SPEC.md updates
If any design measurement changes (spacing, color, typography), update `SPEC.md` in the same commit.

### Testing
Visual regression snapshots are in `tests/visual.spec.ts-snapshots/`. Update baselines with `npm run test:visual:baseline` when intentional visual changes are made.

---

## Do Not Read

- `node_modules/`, `dist/`, `.astro/`, `.git/`
- `skrinakcreative.com/` — wget mirror of the old site, for reference only
