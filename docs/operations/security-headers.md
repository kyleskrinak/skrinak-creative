# Security Headers & Content Security Policy

## Overview

Security headers are configured in `public/_headers` and deployed via Cloudflare Pages. These headers protect the site from common attacks but can block legitimate resources.

## Content Security Policy (CSP)

The CSP directive controls which resources (scripts, styles, images, etc.) can be loaded on the site.

**File**: `public/_headers` (line 2)

### Current Policy

```
script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://static.cloudflareinsights.com
style-src 'self' 'unsafe-inline' https://fonts.googleapis.com
```

### Directives Explained

| Directive | Purpose | Allowed |
|-----------|---------|---------|
| `script-src` | What scripts can execute | Self, inline, Google Analytics, Cloudflare Insights |
| `style-src` | What stylesheets can load | Self, inline, Google Fonts |
| `font-src` | What fonts can load | Self, Google Fonts API |
| `img-src` | What images can load | Self, HTTPS URLs, data URIs |
| `frame-src` | What can be embedded | OpenStreetMap (contact page map) |
| `connect-src` | What can be fetched via API | Self, Google Analytics, Cloudflare Insights |

## Why We Use `'unsafe-inline'`

Astro generates component-level `<script>` and `<style>` tags inline in the HTML. Without `'unsafe-inline'`, these scripts don't execute, breaking functionality like:
- Gallery navigation (next/prev buttons)
- GLightbox lightbox functionality
- Any component-level JavaScript

This is a trade-off: security vs. framework capability. Astro doesn't easily support nonce-based CSP yet.

## Testing for CSP Violations

The console error test catches CSP violations automatically:

```bash
# Test live site for CSP errors
npm run test:console:live

# Output shows blocked resources
```

Common CSP violations to watch for:
- ❌ Inline scripts blocked (usually Astro component scripts)
- ❌ External scripts blocked (third-party tools, analytics)
- ❌ Inline styles blocked (Astro styles or component styling)

## Adding New External Resources

If you need to add a new third-party service (analytics, fonts, etc.):

1. **Add domain to CSP**:
   ```
   script-src ... https://new-service.com
   connect-src ... https://new-service.com
   ```

2. **Update `public/_headers`**

3. **Test locally**:
   ```bash
   npm run test:console
   ```

4. **Test live**:
   ```bash
   npm run test:console:live
   ```

5. **Verify no new CSP errors** in test output

## Other Security Headers

In `public/_headers`:

| Header | Purpose |
|--------|---------|
| `Strict-Transport-Security` | Force HTTPS connections |
| `X-Content-Type-Options` | Prevent MIME sniffing |
| `X-Frame-Options` | Prevent clickjacking |
| `X-XSS-Protection` | Legacy XSS protection |
| `Referrer-Policy` | Control referrer information |
| `Permissions-Policy` | Restrict browser features |

## Troubleshooting CSP Issues

### Gallery Not Working

**Symptom**: Gallery shows all images in grid instead of main viewer

**Cause**: Gallery JavaScript is blocked by CSP

**Solution**:
1. Check DevTools Console for CSP errors
2. Verify `'unsafe-inline'` is in `script-src` directive
3. Run `npm run test:console:live` to confirm

### External Script Not Loading

**Symptom**: Third-party analytics/tool not working

**Cause**: Domain not allowed by CSP

**Solution**:
1. Add domain to appropriate CSP directive
2. Add to both `script-src` AND `connect-src` if it makes API calls
3. Test with `npm run test:console:live`

## Pre-Deployment Checklist

Before deploying changes:

- [ ] Run `npm run test:console` locally — no errors
- [ ] Deploy to Cloudflare
- [ ] Wait 1-2 minutes for deployment
- [ ] Run `npm run test:console:live` against production
- [ ] All 14 tests pass (7 pages × 2 viewports)

---

## References

- [MDN: Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [Cloudflare: Security Headers](https://www.cloudflare.com/learning/security/glossary/what-is-csp/)
- [Astro: Content Security Policy](https://docs.astro.build/en/guides/security/)
