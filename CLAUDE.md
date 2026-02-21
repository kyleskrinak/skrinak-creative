# Project Context

## Overview

Static portfolio site for Skrinak Creative, Inc. Migrated from Squarespace to Astro, deployed on Cloudflare Pages.

**Key Constraint**: Design specs measured directly from live site (SPEC.md) — pixel-faithful reproduction required.

**Tech Stack**: Astro, TypeScript, Tailwind CSS, GLightbox, Jost (Google Fonts)

## Key Files

- **SPEC.md** — Single source of truth: design measurements, color palette, typography, asset inventory
- **Source**: `src/` (components, pages, layouts, styles)
- **Assets**: `src/assets/images/` (47 portfolio images + banners)
- **Styles**: `src/styles/global.css` (Jost font, colors, layout)
- **Documentation**: `docs/` (setup, deployment, testing)
- **Config**: `astro.config.ts`, `playwright.config.ts`

## Forbidden Directories

DO NOT read or reference:
- `node_modules/`, `dist/`, `build/`
- `.git/`, `.astro/`, `coverage/`
- `skrinakcreative.com/` (downloaded wget mirror — reference only)

---

# Development Philosophy

## Code Categories

**MVP Features** (UI, pages, gallery, content):
- Simple solutions, iterate fast
- Hardcode reasonable defaults
- Don't over-engineer
- Match SPEC.md pixel-faithful requirements

**Infrastructure** (build scripts, testing, CI/CD):
- Production-grade from start
- Proper error handling required
- Work in CI/CD environments
- Resource cleanup (processes, files)

## General Principles

- Start with simplest solution that works
- Don't add unnecessary abstractions
- Match completeness of similar implementations
- When in doubt, ask: "Is this essential for the portfolio to work?"

---

# Code Changes

## Workflow: Explore → Plan → Implement → Verify

### 1. Explore
- Identify related files (components, styles, SPEC.md updates needed)
- Document assumptions about current behavior
- Map dependencies (e.g., gallery changes affect multiple pages)

### 2. Plan
- Write exploration findings
- Propose implementation approach
- Get approval before coding

### 3. Implement
- Make changes across all related files in one operation
- Update comments, styles, and SPEC.md together
- Use atomic commits (related changes in one commit)

### 4. Verify
- [ ] Related files reviewed for consistency
- [ ] Comments explain **why**, not just **what**
- [ ] Build passes: `npm run build`
- [ ] Tests pass: `npm run test:visual`
- [ ] SPEC.md updated if design specs changed
- [ ] Commit message clearly describes what changed

## Commit Message Format

Use [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

<body>
```

**Types**: `feat`, `fix`, `chore`, `docs`, `style`, `refactor`, `test`

**Examples**:
- `feat(gallery): implement GLightbox lightbox for portfolio images`
- `fix(typography): correct Jost font weights in headings`
- `docs(spec): update asset inventory after export`

## Pre-Commit Checklist

Before committing, verify ALL boxes:

**Pattern Completeness** (if implementing similar to existing code):
- [ ] Read COMPLETE existing implementation
- [ ] Check for comments — add equivalent ones
- [ ] Check for tests — add equivalent tests
- [ ] Compare: match quality/completeness of similar code

**Systemic Impact**:
- [ ] Search codebase for related functionality
- [ ] Gallery changes affect multiple pages? Update all.
- [ ] Style changes? Check global.css AND components.
- [ ] Asset updates? Update SPEC.md.

**Test Coverage**:
- [ ] Do similar features have tests? Add equivalent tests.
- [ ] Visual regression tests passing?
- [ ] Link checking passing (for image galleries)?

**Documentation**:
- [ ] Do similar components have comments? Add them.
- [ ] SPEC.md updated if design specs changed?
- [ ] README.md needs updates?

**Final Check — Can you answer YES to all:**
1. ✅ Fixed the specific issue
2. ✅ Found and fixed ALL instances of the pattern
3. ✅ Added tests matching similar features
4. ✅ Checked ALL interacting systems
5. ✅ Matched completeness of similar implementations
6. ✅ Added explanatory comments matching project style
7. ✅ Updated SPEC.md and README.md if needed
8. ✅ Tested critical paths (build passes, tests pass)
9. ✅ Verified documentation accuracy

**If you can't check all boxes, you're not done.**

---

# Communication Style

- Provide clear, numbered steps for complex tasks
- State assumptions upfront
- Ask clarifying questions before exploration
- Summarize findings concisely
