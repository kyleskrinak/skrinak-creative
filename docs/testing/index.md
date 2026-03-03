# Testing & Quality Assurance

This section covers testing strategies and quality validation for the portfolio site.

## Testing Types

### Visual Regression Testing — Multi-Breakpoint
- **Screenshot-based testing** to catch unintended UI changes
- Tests across **3 viewports**: Desktop (1440px), Tablet (1024px), Mobile (390px)
- Covers Squarespace breakpoint at 800px (mobile below, desktop above)
- Tests all 7 pages × 2 test types (console errors + visual snapshot) × 3 breakpoints = 42 tests total

Run specific breakpoint:
```bash
npm run test:visual              # All breakpoints
npm run test:visual:desktop      # Desktop only
npm run test:visual:tablet       # Tablet only (1024px)
npm run test:visual:mobile       # Mobile only (390px — below 800px breakpoint)
```

### Link Checking
- **Verify all links work** (internal navigation, images, external links if any)
- Catch broken image paths
- Can be run manually or as part of CI

### Console Error & Warning Testing
- **Automated testing**: Catch runtime errors, CSP violations, missing resources
- **Multi-page**: Tests all 7 pages across desktop & mobile viewports
- **Catches**: JavaScript errors, warnings, security policy violations

Run against live site to catch deployment issues:
```bash
npm run test:console:live    # Test live site (www.skrinakcreative.com)
npm run test:console         # Test local dev (localhost:4321)
```

## Running Tests

### Local (Astro) Site
```bash
# Run all tests against localhost:4321 (dev server auto-starts)
npm run test:visual

# Update local baselines (if you intentionally changed design)
npm run test:visual:baseline

# View last test report
npm run test:visual:report

# Check for console errors/warnings
npm run test:console
```

### Live (Squarespace) Site
The live site baselines are captured in `tests/live-site-baselines/` for pixel-faithful reproduction comparison.

```bash
# Test against live Squarespace site (reference only)
npx playwright test --config=playwright.live-site.config.ts

# Update live-site baselines (captures current design for reference)
npx playwright test --config=playwright.live-site.config.ts --update-snapshots
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

6. **Console** (automated):
   - [ ] Run `npm run test:console:live` — all 14 tests pass
   - [ ] Or manually (DevTools → Console):
     - [ ] No errors
     - [ ] No 404s
     - [ ] No CSP violations

---

Quality assurance is critical before launch. Use these tests to catch issues early!
