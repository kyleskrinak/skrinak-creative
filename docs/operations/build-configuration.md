# Build & Configuration

Configuration for the Astro build, development, and deployment.

## Development Environment

### Starting the Dev Server

```bash
npm run dev
# Server runs at http://localhost:4321
```

**Features**:
- File watching (auto-reload on changes)
- Hot module replacement (HMR)
- Fast compilation
- Accessible from http://localhost:4321

### Previewing Production Build

```bash
npm run build
npm run preview
# Visit http://localhost:4321 to preview
```

This builds the exact same output that will be deployed to production.

---

## Build Configuration

### Build Scripts

**Development**:
```bash
npm run dev
```

**Production**:
```bash
npm run build
# Output: dist/ directory (ready for deployment)
```

**CI/CD** (GitHub Actions):
```bash
npm run build
```

### Build Settings

**File**: `astro.config.ts`

```typescript
export default defineConfig({
  integrations: [
    // Astro integrations
  ],
  output: 'static', // Static site generation
  site: 'https://skrinakcreative.com',
  // Other config
});
```

**Key settings**:
- `output: 'static'` — Generate static HTML files (no server needed)
- `site` — Production URL for sitemap and canonical tags
- `vite` — Vite configuration for asset bundling

### Output

After building:
```
dist/
  ├── index.html              # Home page
  ├── brochures/index.html    # Portfolio pages
  ├── folders/index.html
  ├── logos-identity/index.html
  ├── newsletters/index.html
  ├── trade-show-display/index.html
  ├── contact/index.html
  └── assets/                 # Images, styles, JavaScript
```

---

## Environment Variables

### Development (`.env`)

Create a `.env` file locally (not committed):

```bash
# Example (for future features)
PUBLIC_SITE_URL=http://localhost:4321
```

See `.env.example` for all available variables.

### Production (Cloudflare Pages)

Set in Cloudflare Pages project settings → Environment variables:

```
NODE_VERSION=20
```

No secrets needed for this static site.

---

## Asset Handling

### Images

**Location**: `src/assets/images/`

**Importing images in components**:

```astro
<img
  src={import('../assets/images/Aerospace_bro.png').then(mod => mod.default)}
  alt="Aerospace Brochure"
/>
```

Or use the Gallery component for gallery images.

### Styles

**Location**: `src/styles/global.css`

**Global styles**:
- Jost typography (Google Fonts)
- Color palette (CSS variables)
- Layout and spacing
- Responsive design

**Component styles** are scoped (CSS Modules or `<style>` in Astro components).

---

## Optimization

### Image Optimization

Images are served as-is from `src/assets/images/`. For production:

1. **Compress images** before adding to assets:
   ```bash
   # Use ImageOptim, TinyPNG, or similar tool
   ```

2. **Use appropriate formats**:
   - PNG for graphics (logos, illustrations)
   - JPG for photographs
   - WebP for modern browsers (if supported)

### CSS & JavaScript

- **CSS**: Minified automatically by Astro
- **JavaScript**: Bundled and minified by Vite
- **HTML**: Minified automatically

### Caching

Cloudflare Pages caches assets aggressively:
- Static files (HTML, CSS, JS) cached by default
- Cache invalidation on new deployments

---

## Debugging

### Build Errors

```bash
# Verbose build output
npm run build -- --verbose

# Check for TypeScript errors
npm run lint
```

### Dev Server Issues

```bash
# Clear cache and restart
rm -rf .astro dist
npm run dev
```

### Image Issues

1. **Image not found**:
   ```bash
   ls src/assets/images/ | grep filename
   ```

2. **Image path incorrect**:
   - Check import path matches actual file
   - Verify capitalization (case-sensitive)

3. **Check browser console**:
   - DevTools → Console
   - Look for 404 errors for missing images

---

## Performance Monitoring

### Lighthouse Audit

```bash
# Build and preview
npm run build
npm run preview

# Open Chrome DevTools: Lighthouse → Generate report
```

**Target scores**:
- Performance: 80+
- Accessibility: 90+
- Best Practices: 90+
- SEO: 90+

### Build Time

On production, builds typically take:
- **npm run build**: 5-10 seconds (local)
- **Cloudflare Pages**: 1-2 minutes (includes push + build + deploy)

If builds slow down, check:
- Number of images (currently 47)
- Component complexity
- Build script performance

---

## Deployment Pipeline

### GitHub to Cloudflare Pages

1. **Push to `main`** branch
2. **GitHub Actions** runs tests (if configured)
3. **Cloudflare Pages** auto-deploys:
   - Clones repository
   - Installs dependencies: `npm install`
   - Builds: `npm run build`
   - Publishes `dist/` to production
   - Takes ~1-2 minutes

### Environment Variables in CI

Set in Cloudflare Pages → project settings → Environment variables:

```
NODE_VERSION=20
```

---

## Troubleshooting

### Build fails on Cloudflare Pages but works locally

1. **Check Node version**:
   - Local: `node --version`
   - Cloudflare: Set `NODE_VERSION` env var to match

2. **Check npm version**:
   - `npm --version` should be 10+
   - Delete `package-lock.json` and `npm install` again if issues

3. **Check dependencies**:
   - All packages pinned in `package-lock.json`?
   - Any system-specific packages (native bindings)?

### Site looks different in production

1. **Check production build locally**:
   ```bash
   npm run build
   npm run preview
   ```

2. **Compare to dev server**:
   ```bash
   npm run dev
   ```

3. **Check CSS** for dev-only styles that shouldn't be in production

### Images missing in production

1. **Check image paths** in components
2. **Verify images exist** in `src/assets/images/`
3. **Check build output** (`dist/assets/images/`)

---

## Security Considerations

This is a static site with no backend, so security is minimal:

- No user input
- No database
- No authentication
- No API secrets

**Best practices**:
- Don't commit `.env` with secrets (use `.env.example` for reference)
- All code is public (on GitHub)
- No sensitive data in environment variables

---

## Next Steps

- **Running tests?** See [Testing Guide](../testing/index.md)
- **Deploying?** See [Deployment Guide](./deployment.md)
- **Making changes?** See [Code Change Process](./code-change-process.md)
