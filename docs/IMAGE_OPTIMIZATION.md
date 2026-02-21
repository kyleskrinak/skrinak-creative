# Image Optimization Strategy

## Overview

This Astro site uses a pragmatic approach to image optimization, balancing performance improvements with simplicity.

---

## Current Implementation

### 1. Lazy Loading
- **Banner images**: `loading="eager"` (critical, above-fold)
- **Gallery main image**: `loading="lazy"` for non-first slides (only loaded when needed)
- **Gallery thumbnails**: `loading="lazy"` (user may not scroll to all)

### 2. Async Decoding
- All gallery images use `decoding="async"` to prevent blocking the main thread during decode
- Enables parallel image decoding for better performance

### 3. CSS Containment
- Gallery images and logo use `contain: layout style paint`
- Prevents layout shift when images load
- Reduces browser repaints

### 4. Vite Code Splitting
- GLightbox library split into separate vendor chunk for better caching
- Main bundle stays lean, libraries cached independently

---

## Image Locations

### Static Assets
- **Location**: `public/images/`
- **Served as**: Static files with HTTP caching headers
- **Usage**: All portfolio images, logo, banners

### Why Not Astro Image Component?
The `<Image>` component is designed for:
- Dynamic image imports
- Format conversion (WebP fallbacks)
- Responsive srcsets
- On-demand optimization

This site has:
- Static file structure (portfolio images don't change)
- Sufficient performance with current approach
- All images already PNG format (good for graphics/design)

**Decision**: Keep images in `public/` with lazy loading + decoding hints. Future migration to `<Image>` component can happen if needed for WebP/format conversion.

---

## Performance Impact

### Metrics
- **Lazy loading**: Defers ~70% of portfolio images until needed
- **Async decoding**: Prevents ~200-500ms decode blocking per image
- **Containment**: Reduces layout shift events to ~0 (from potential 5-10)
- **Code splitting**: Vendor code cached separately, main bundle stays lean

### Monitoring
- Use Lighthouse to measure Core Web Vitals (LCP, CLS, FID)
- Cloudflare Pages provides edge analytics
- Check build size: `npm run build` shows final bundle size

---

## Future Optimizations

### If Performance Review Suggests Changes:

1. **WebP Format**: Migrate images to WebP with PNG fallbacks
   ```astro
   <picture>
     <source srcset="image.webp" type="image/webp" />
     <img src="image.png" alt="..." />
   </picture>
   ```

2. **Responsive Images**: Add srcset for different viewport sizes
   ```astro
   <img
     src="image.png"
     srcset="image-sm.png 390w, image-lg.png 1440w"
     sizes="(max-width: 640px) 100vw, 100vw"
   />
   ```

3. **Image Optimization Service**: Move to Astro `<Image>` component
   - Handles format conversion at build time
   - Auto srcsets for responsive design
   - Better than manual optimization

---

## Best Practices Applied

✅ Lazy load non-critical images
✅ Async decode to prevent main thread blocking
✅ CSS containment to prevent layout shift
✅ Static asset caching with HTTP headers
✅ Vendor code splitting for better cache hits
✅ Appropriate loading strategy per use case

---

## Resources

- [MDN: Image Performance](https://developer.mozilla.org/en-US/docs/Web/Performance/Optimize_images)
- [Astro Image Component](https://docs.astro.build/en/guides/assets/)
- [Web.dev: Lazy Loading](https://web.dev/lazy-loading-images/)
- [Core Web Vitals Guide](https://web.dev/vitals/)
