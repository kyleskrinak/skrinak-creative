# Testing & Quality Assurance

This section covers testing strategies and quality validation for the portfolio site.

## Testing Types

### Visual Regression Testing
- **Screenshot-based testing** to catch unintended UI changes
- Run with: `npm run test:visual`
- Tests all key pages and components

### Link Checking
- **Verify all links work** (internal navigation, images, external links if any)
- Catch broken image paths
- Can be run manually or as part of CI

### Browser Console Testing
- **Catch runtime errors**: missing resources, syntax errors, 404s
- Run when testing in browser DevTools

## Running Tests

```bash
# Run all tests locally (dev server should be running)
npm run test:visual

# Update visual regression baselines (if intended changes)
npm run test:visual:baseline

# View last test report
npm run test:visual:report
```

## Test Coverage

**Pages tested**:
- Home page
- All 5 portfolio pages (brochures, folders, logos, newsletters, trade show)
- Contact page
- Navigation (desktop + mobile)
- Footer

**Components tested**:
- Gallery with GLightbox lightbox
- Navigation dropdown
- Mobile menu drawer
- Responsive layouts

**Critical paths**:
- Gallery image loading and interaction
- Navigation links work
- Images load from `src/assets/images/`
- Mobile responsive design
- No console errors

---

## Pre-Deployment Testing Checklist

Before creating a release PR, verify:

- [ ] Local build passes: `npm run build`
- [ ] Visual regression tests pass: `npm run test:visual`
- [ ] Code style passes: `npm run lint`
- [ ] All pages load in browser
- [ ] Gallery works (click image → lightbox opens)
- [ ] Navigation works (all links functional)
- [ ] Mobile view is responsive
- [ ] No console errors in DevTools
- [ ] Images load correctly
- [ ] SPEC.md matches implementation (colors, typography, spacing)

---

## Test Results

See [Test Findings](./findings.md) for latest test run results and known issues.

---

## Automated Testing in CI

**GitHub Actions** runs tests on:
- Every push to `develop`
- Every PR to `main`

Tests must pass before merging to `main`.

---

## Debugging Failing Tests

### Visual Regression Tests Failing

1. **Review the diff**: Screenshots show what changed
2. **Is the change intentional?**
   - Yes: Update baselines: `npm run test:visual:baseline`
   - No: Fix the code and re-run tests

### Images Not Loading

1. **Check image paths**: Are references correct?
2. **Verify file exists**: `ls src/assets/images/filename.png`
3. **Check console**: DevTools → Console for 404 errors

### Build Failing

1. **Check error message**: `npm run build` shows what failed
2. **Check Astro config**: `astro.config.ts` correct?
3. **Check TypeScript**: `npm run lint` for type errors

---

## Performance Testing

For basic performance insights:

```bash
# Build and preview locally
npm run build
npm run preview

# Open in browser and run Lighthouse audit
# Chrome DevTools → Lighthouse → Generate report
```

**Target metrics**:
- Lighthouse Performance: 80+
- Lighthouse Accessibility: 90+
- Lighthouse Best Practices: 90+
- Lighthouse SEO: 90+

---

## Manual Testing Checklist

When deploying, manually test:

1. **Homepage**:
   - [ ] Page loads
   - [ ] Banner displays correctly
   - [ ] Content readable
   - [ ] Navigation visible

2. **Portfolio Pages** (repeat for each):
   - [ ] Page loads
   - [ ] Banner displays
   - [ ] Gallery images load
   - [ ] Click image → lightbox opens
   - [ ] Next/prev navigation works
   - [ ] Thumbnails scroll
   - [ ] Mobile view responsive

3. **Contact Page**:
   - [ ] Page loads
   - [ ] Contact info displays
   - [ ] Google Maps embed loads

4. **Navigation**:
   - [ ] Desktop menu works
   - [ ] Portfolio dropdown expands
   - [ ] Mobile menu opens/closes
   - [ ] All links lead to correct pages

5. **Mobile**:
   - [ ] Responsive design works
   - [ ] Text readable
   - [ ] Images scale appropriately
   - [ ] Navigation accessible

6. **Console**:
   - [ ] No errors
   - [ ] No 404s
   - [ ] No warnings

---

Quality assurance is critical before launch. Use these tests to catch issues early!
