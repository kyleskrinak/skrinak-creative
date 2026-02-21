# Code Change Process

Implement changes systematically to prevent inconsistencies across components, styles, and documentation.

## Overview

**Workflow**: Explore → Plan → Implement → Verify

This prevents gaps where changes introduce inconsistencies (e.g., updating a component but forgetting to update global styles, or updating SPEC.md but not the component).

---

## Phase 1: Exploration

Before coding, map the full scope of the change.

### 1. Identify Related Files

Find all files that interact with or depend on what you're changing:

- **Direct files**: Components you'll modify
- **Styles**: `src/styles/global.css`, component-specific styles
- **Pages**: Which pages use this component?
- **Assets**: Do you need to update `src/assets/images/`?
- **Documentation**: Does SPEC.md need updates? Does README.md?

**Example**: Building a gallery component requires checking:
- Gallery component (new file to create)
- Global styles (image sizing, grid)
- Pages using gallery (all portfolio pages)
- Assets (which images to reference)
- SPEC.md (gallery behavior documented)

### 2. Document Assumptions

Write down your understanding:
- How should this feature work?
- What does SPEC.md say about it?
- Are there similar implementations to match?
- What is the intended behavior?

### 3. Check Existing Patterns

- Is there a similar component? Match its style and structure.
- Are there tests for similar features? Plan to add equivalent tests.
- Does related code have comments? Plan to add equivalent comments.

---

## Phase 2: Plan (Before Coding)

Present your exploration findings for approval.

### Planning Checklist

- [ ] All related files identified
- [ ] Assumptions documented
- [ ] Behavior clearly described (what should this do?)
- [ ] Implementation strategy defined
- [ ] Documentation updates identified (SPEC.md? README? tests?)

**Do not code until this is approved.**

---

## Phase 3: Implementation

### Code Change Standards

1. **Make complete changes across all related files**
   - Don't change the component and forget global styles
   - Don't add a feature and forget SPEC.md
   - Make the change atomic (all related files in one commit)

2. **Clear Comments**
   - Explain **why** the code exists, not what it does
   - Reference related files if logic spans multiple places
   - Example:
     ```jsx
     {/* Gallery uses GLightbox for fullscreen lightbox.
         Main image can be clicked to zoom. Thumbnails change the main image.
         Navigation wraps (last → first). See SPEC.md for behavior specs. */}
     <Gallery images={images} />
     ```

3. **Match Existing Patterns**
   - If there are similar components, match their structure
   - If similar code has comments, add equivalent comments
   - If similar code has tests, add equivalent tests

### Commit Message Format

Use [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

<body>
```

**Example**:
```
feat(gallery): implement GLightbox component for portfolio images

- Add Gallery.astro component with main image viewer
- Add thumbnail strip with horizontal scrolling
- Implement prev/next navigation (wraps on edges)
- Integrate GLightbox for fullscreen lightbox
- Add to all portfolio pages (brochures, folders, logos, newsletters, trade show)
- Update SPEC.md with gallery behavior specs

Related files: src/components/Gallery.astro, src/pages/brochures.astro,
              src/pages/folders.astro, etc.
```

---

## Phase 4: Verification

Before submitting for review, verify all boxes:

### Cross-File Audit

- [ ] All related files updated together
- [ ] Component/style changes are consistent
- [ ] Comments explain intent and reference related files
- [ ] Commit message accurately describes all changes
- [ ] Similar features have equivalent tests

### Documentation Sync

- [ ] SPEC.md updated if behavior specs changed
- [ ] README.md updated if user-facing features changed
- [ ] Code comments explain why, not what
- [ ] No docs contradict the implementation

### Build & Test

```bash
npm run build
# Verify no build errors

npm run test:visual
# Verify visual regression tests pass

npm run lint
# Verify code style
```

### Final Pre-Commit Checklist

Can you answer YES to all?

1. ✅ Fixed the specific issue
2. ✅ Found and updated ALL related files
3. ✅ Added tests matching similar features (if applicable)
4. ✅ Checked ALL interacting systems
5. ✅ Matched completeness of similar implementations
6. ✅ Added explanatory comments matching project style
7. ✅ Updated SPEC.md if design/behavior specs changed
8. ✅ Updated README.md if user-facing changes
9. ✅ Build passes: `npm run build`
10. ✅ Tests pass: `npm run test:visual`
11. ✅ Code style passes: `npm run lint`

**If you can't check all boxes, you're not done.**

---

## Anti-Patterns (Never)

- ❌ Change one component without checking related files
- ❌ Update a feature but leave tests out
- ❌ Add comments explaining what the code does, not why it exists
- ❌ Submit code for review without stakeholder approval on approach
- ❌ Update code but leave SPEC.md inconsistent
- ❌ Make assumptions without documenting them

---

## Example: Adding a Portfolio Page

### Exploration

**Related files**:
- New page: `src/pages/brochures.astro`
- Gallery component: `src/components/Gallery.astro` (already exists)
- Navigation: Update nav to link to new page
- Footer: Links to all portfolio pages
- Global styles: Used by gallery
- SPEC.md: Lists images, behavior specs
- Assets: `src/assets/images/` (brochure images)

**Assumptions**:
- Gallery component already built and tested
- 17 brochure images already exported to `src/assets/images/`
- SPEC.md lists all images: Aerospace_bro.png, STYLE_GUIDE.png, etc.

### Plan

- Create `/brochures` page with banner, gallery, title
- Add nav link to Portfolio dropdown
- Add footer link
- Use existing Gallery component
- Match layout of other portfolio pages
- Update SPEC.md if any specs changed

### Implementation

Create new file `src/pages/brochures.astro`:
```astro
---
import Layout from '../layouts/Layout.astro';
import Gallery from '../components/Gallery.astro';

const title = 'Brochures';
const images = [
  'Aerospace_bro.png',
  'STYLE_GUIDE.png',
  // ... all 17 images from SPEC.md
];
---

<Layout title={title}>
  <!-- Banner handled by layout -->
  <div class="page-content">
    <h2 class="page-content__title">{title}</h2>
    <Gallery {images} />
  </div>
</Layout>
```

Update `src/components/Nav.astro`:
```astro
<!-- Add link to brochures page in Portfolio dropdown -->
<a href="/brochures">Brochures</a>
```

Update `src/components/Footer.astro`:
```astro
<!-- Add footer nav link -->
<a href="/brochures">Brochures</a>
```

**Commit**:
```
feat(pages): add brochures portfolio page

- Create brochures.astro with gallery component
- Add navigation link in Portfolio dropdown
- Add footer navigation link
- All 17 images from SPEC.md are wired
- Matches layout/styling of other portfolio pages

Related: src/pages/brochures.astro, src/components/Nav.astro,
         src/components/Footer.astro, SPEC.md (images list)
```

### Verification

- [ ] Page builds without errors
- [ ] Visual regression test passes (screenshot matches design)
- [ ] Images load correctly (all 17 images)
- [ ] Navigation works (nav link, footer link)
- [ ] Layout matches other portfolio pages
- [ ] SPEC.md still accurate (image list, behavior)

---

## Questions

**Q: What if I discover inconsistencies during exploration?**

A: Document them and fix as part of the change. Don't code around inconsistencies.

**Q: What if a change only touches one file?**

A: Still do exploration. A single-file change might have undiscovered dependencies (global styles, navigation, SPEC.md updates).

**Q: Can I skip planning for small changes?**

A: No. Planning is where inconsistencies are caught. Even small changes need approval on approach.

**Q: Who approves the plan?**

A: If solo, use this as a personal checklist. If with others, share the plan with the team before coding.
