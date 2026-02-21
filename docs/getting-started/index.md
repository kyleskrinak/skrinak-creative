# Getting Started

Quick setup to get the portfolio site running locally.

## Prerequisites

- **Node.js**: 20+ (check with `node --version`)
- **npm**: 10+ (comes with Node.js)
- **Git**: For cloning the repository

## Setup (5 minutes)

### 1. Clone the Repository

```bash
git clone https://github.com/kyleskrinak/skrinak-creative.git
cd skrinak-creative
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Development Server

```bash
npm run dev
```

The server will start at `http://localhost:4321` and automatically reload when you make changes.

### 4. Open in Browser

Visit **http://localhost:4321** to see the site.

## What's Happening?

The dev server watches your files and automatically reloads the browser when you make changes. Perfect for development!

## Common Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start development server (http://localhost:4321) |
| `npm run build` | Build for production (creates `dist/` folder) |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Check code for style issues |
| `npm run format` | Auto-format code with Prettier |
| `npm run test:visual` | Run visual regression tests |
| `make test` | Run all tests (shortcut) |

## Project Structure

```
src/
  ├── layouts/
  │   └── Layout.astro          # Main layout component
  ├── components/
  │   ├── Gallery.astro         # Gallery component with GLightbox
  │   ├── Nav.astro             # Navigation bar
  │   └── Footer.astro          # Footer
  ├── pages/
  │   ├── index.astro           # Home page
  │   ├── brochures.astro       # Brochures portfolio page
  │   ├── folders.astro         # Folders portfolio page
  │   ├── logos-identity.astro  # Logos & Identity portfolio page
  │   ├── newsletters.astro     # Newsletters portfolio page
  │   ├── trade-show-display.astro  # Trade Show portfolio page
  │   └── contact.astro         # Contact page
  ├── assets/
  │   └── images/               # All portfolio images (47 files)
  └── styles/
      └── global.css            # Global styles, Jost typography, colors

docs/                            # Documentation
SPEC.md                          # Design specs (single source of truth)
CLAUDE.md                        # Project context and guidelines
Makefile                         # Quick commands
```

## Key Files to Know

- **[SPEC.md](../../SPEC.md)** — Design specifications, color palette, typography, asset inventory
- **[CLAUDE.md](../../CLAUDE.md)** — Project context, development philosophy, verification protocols
- **[Code Change Process](../operations/code-change-process.md)** — How to implement changes
- **[GitFlow Workflow](../operations/gitflow.md)** — Branching strategy

## Editing Content

All pages are built with **Astro**. To edit:

1. Open a `.astro` file in `src/pages/` or `src/components/`
2. Make your changes
3. Save — the dev server automatically reloads your browser

## Working with Images

All portfolio images are in `src/assets/images/`. When referencing images:

```astro
<img src={import('../assets/images/Aerospace_bro.png').then(mod => mod.default)} alt="Aerospace Brochure" />
```

Or use a Gallery component for multiple images.

## Testing Locally

Before pushing code:

```bash
# Build for production
npm run build

# Run visual regression tests
npm run test:visual

# Check code style
npm run lint
```

All should pass with no errors.

## Deploying

When ready to go live:

1. Commit your changes to `develop`:
   ```bash
   git add -A
   git commit -m "feat(pages): add portfolio pages"
   git push origin develop
   ```

2. Create a PR from `develop` to `main`:
   ```bash
   gh pr create --base main --head develop --title "Release: v1.0.0"
   ```

3. Merge the PR. Cloudflare Pages auto-deploys to https://skrinakcreative.com

See [Deployment Guide](../operations/deployment.md) for details.

## Troubleshooting

### Dev server won't start

```bash
# Try clearing cache and reinstalling
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Build fails

```bash
# Check for errors
npm run build

# Lint for issues
npm run lint
```

### Images not showing in dev

- Check image path is correct
- Verify image file exists in `src/assets/images/`
- Restart dev server: Ctrl+C then `npm run dev`

## Next Steps

- **Want to understand the design?** Read [SPEC.md](../../SPEC.md)
- **Ready to code?** See [Code Change Process](../operations/code-change-process.md)
- **Need to deploy?** See [Deployment Guide](../operations/deployment.md)
- **Have questions?** Check [Documentation Index](../index.md)

---

Happy coding! 🚀
