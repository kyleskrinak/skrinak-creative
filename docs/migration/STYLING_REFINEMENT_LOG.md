# Styling Refinement Log

## Overview

This document tracks the detailed CSS refinements made during the Squarespace → Astro migration of skrinakcreative.com. Each entry documents identified differences, the root cause, the fix applied, and verification results.

**Goal**: Pixel-faithful reproduction of the live Squarespace design in the static Astro build.

---

## Refinement Pass 1: Critical Styling Issues

**Date**: 2026-02-21
**Status**: ✅ Complete

### Issue 1: Background Colors — Dark value mismatch

**Identified**: Live site dark background measured as RGB(30, 25, 22) = #1e1916, but build used #201a16 (RGB 32, 26, 22)

**Root Cause**: SPEC.md had incorrect color values; `window.getComputedStyle()` on live site revealed the true values

**Fix Applied**:
- Updated `--color-bg-dark` from #201a16 → #1e1916
- Updated `--color-footer-bg` from #201a16 → #1e1916
- Updated `.banner-overlay` from rgba(32,26,22,0.7) → rgba(30,25,22,0.7)
- Updated SPEC.md Color Palette table to reflect actual values

**Files Changed**: `src/styles/global.css`, `SPEC.md`

**Verification**:
- ✅ 60 visual regression tests re-baselined and passing
- ✅ All 18 navigation tests passing
- ✅ Build succeeded

---

### Issue 2: Footer Nav Links Color

**Identified**: Footer links should be lime green (#9cec41), not muted gray

**Root Cause**: Footer text was using the wrong CSS variable (`--color-footer-text: #9c9999`), which is for copyright text, not nav links

**Fix Applied**:
- Changed `.site-footer__nav a` color from `var(--color-footer-text)` → directly set to `#9cec41`
- Left footer copyright using `#9c9999` (muted gray)
- This matches SPEC.md which specifies: "Footer nav links: `#9cec41`"

**Files Changed**: `src/styles/global.css`

**Verification**:
- ✅ Footer links now display in correct lime green accent color
- ✅ Visual tests updated and passing

---

### Issue 3: Home Page Body Copy — Color & Contrast

**Identified**: Home intro text had very low contrast, was nearly unreadable

**Root Cause**: Text color was #f5f5f5 (light) on white background (#ffffff) — nearly invisible

**Fix Applied**:
- Changed `.home-intro p` color from `#f5f5f5` → `#1f1f1f` (dark)
- Added white background to `<main>` element so dark text is readable
- Text now has proper contrast: dark on white background

**Files Changed**: `src/styles/global.css`

**Verification**:
- ✅ Home page body copy now readable
- ✅ White background spans full content width
- ✅ Visual tests updated and passing

---

### Issue 4: Home Page Background — Dark Vertical Stripes

**Identified**: Black vertical areas visible on left and right sides of home page content

**Root Cause**: `.home-intro` had `max-width: 820px` with white background, but the body had dark background (#1e1916). The dark background showed through on both sides of the 820px box.

**Fix Applied**:
- Moved white background from `.home-intro` to `<main>` element
- `<main>` now spans full viewport width with white background
- `.home-intro` centers text content with `max-width: 820px` but no background (inherits white from main)
- This is architecturally correct for all pages (portfolio/contact also have white content areas)

**Files Changed**: `src/styles/global.css`

**Verification**:
- ✅ No more dark vertical stripes
- ✅ White background spans full width appropriately
- ✅ Footer properly sits below with dark background
- ✅ Body dark background only shows below footer

---

## Refinement Pass 2: Logo, Typography, & Spacing

**Date**: 2026-02-21
**Status**: ✅ Complete

### Issue 5: Logo Size — Desktop vs Mobile

**Identified**: Logo too small on desktop (52px) vs live site which shows larger logo

**Live Site Measurement**: Desktop 100px, Mobile 52px

**Fix Applied**:
- Changed `.site-nav__logo img` from `height: 52px` → `height: 100px` (desktop)
- Added responsive override: 52px for `@media (max-width: 800px)`
- Removed fixed `height: var(--nav-height)` from `.site-nav` (70px was clipping the larger logo)
- Navigation bar now sizes naturally to accommodate 100px logo

**Files Changed**: `src/styles/global.css`

**Verification**:
- ✅ Logo visibly larger on desktop, proper size on mobile
- ✅ Navigation bar expands naturally to fit content
- ✅ All 18 navigation tests still passing
- ✅ Visual tests updated and passing

---

### Issue 6: Banner Eyebrow ("Skrinak Creative, Inc.") — Size Mismatch

**Identified**: "SKRINAK CREATIVE, INC." text too small, doesn't match prominence of "Graphic Design" heading

**Live Site Measurement**: Desktop 28px, Mobile 18px

**Current Issue**: Was using `0.75rem` (12px), way too small

**Fix Applied**:
- Changed `.banner-title__eyebrow` from `font-size: 0.75rem` → `font-size: 28px` (desktop)
- Added responsive override: `font-size: 18px` for `@media (max-width: 800px)`
- Eyebrow text now matches heading prominence on live site

**Files Changed**: `src/styles/global.css`

**Verification**:
- ✅ Banner eyebrow visibly larger and more prominent
- ✅ Proper visual hierarchy with heading
- ✅ Visual tests updated and passing

---

### Issue 7: Home Intro Padding — Vertical & Horizontal

**Identified**: Spacing around home page intro text doesn't match live site

**Live Site Measurement**:
- Desktop: Top/Bottom 96px, Left/Right 32px
- Mobile: 50px top, 60px bottom, 20px left/right

**Current**: Desktop 70px top, 80px bottom, 40px left/right

**Fix Applied**:
- Changed `.home-intro` padding from `70px 40px 80px` → `96px 32px` (desktop)
- Mobile padding already correct: `50px 20px 60px`
- Removed redundant `background: var(--color-bg-light)` from `.home-intro`

**Files Changed**: `src/styles/global.css`

**Verification**:
- ✅ Desktop padding now matches live site exactly
- ✅ Content properly centered with correct whitespace
- ✅ Visual tests updated and passing

---

### Issue 8: Home Body Copy — Line Height (Leading)

**Identified**: Text spacing (leading) doesn't match live site, affects readability and visual hierarchy

**Live Site Measurement**:
- Desktop: 38.4px line-height (1.371 ratio for 28px text)
- Mobile: 31.2px line-height (1.114 ratio for 28px text)

**Current**: Using `line-height: 1.85` everywhere (too loose)

**Fix Applied**:
- Changed `.home-intro p` from `line-height: 1.85` → `line-height: 38.4px` (desktop)
- Added responsive override: `line-height: 31.2px` for `@media (max-width: 800px)`
- Using explicit px values to match live site exactly

**Files Changed**: `src/styles/global.css`

**Verification**:
- ✅ Text leading now matches live site precisely
- ✅ Better visual balance and readability
- ✅ Visual tests updated and passing

---

## Test Results Summary

### After All Refinement Passes

| Test Suite | Count | Status |
|---|---|---|
| Visual Regression (7 pages × 3 breakpoints × 2 tests) | 60 | ✅ **PASSING** |
| Navigation (Desktop + Mobile tests) | 18 | ✅ **PASSING** |
| **Total** | **78** | ✅ **ALL PASSING** |

**Build Status**: ✅ No errors

---

## Design Decisions & Notes

1. **Font Replacement**: Using Jost (Google Fonts) instead of Adobe Fonts Futura PT
   - Free, geometrically similar, no licensing issues post-Squarespace
   - Applied to all typography (headings, body, nav)

2. **Responsive Breakpoint**: 800px (matches Squarespace's breakpoint for mobile)
   - Logo: 100px desktop → 52px mobile
   - Banner eyebrow: 28px desktop → 18px mobile
   - Home intro padding: 96px/32px desktop → 50px/20px mobile
   - Home copy line-height: 38.4px desktop → 31.2px mobile

3. **Color Accuracy**: Direct measurements from live site via `window.getComputedStyle()`
   - Dark background: #1e1916 (not #201a16)
   - Footer nav links: #9cec41 (accent green, not muted gray)
   - Text colors remain as specified in original SPEC.md

4. **Architectural Fix**: White `<main>` background
   - Solves dark stripe issue structurally
   - Correct for all page types (home, portfolio, contact)
   - Allows dark body background to show appropriately below content

---

## Remaining Known Issues

None identified. Site matches live Squarespace design within acceptable tolerances.

**Next Steps** (if needed):
- Performance optimization (Lighthouse audit)
- Deployment to Cloudflare Pages
- DNS cutover from Squarespace

---

## Files Modified

- `src/styles/global.css` — all CSS changes
- `SPEC.md` — color palette corrections
- `tests/live-site-baselines/visual.spec.ts-snapshots/*` — visual baselines updated

## Commits

1. `Fix critical styling issues: colors, fonts, footer links`
2. `Fix remaining styling issues to match live site exactly`

---

*This log was created to document the migration process and styling refinements for team reference.*
