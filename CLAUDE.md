# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
yarn dev        # Start development server at http://localhost:3000
yarn build      # Production build
yarn lint       # ESLint via next lint
```

No test suite exists in this project.

## Architecture

**Digital Crafts** is a Next.js 16 App Router project — a personal gallery of handcrafted UI components, each living at its own route.

### Adding a new craft

1. Create `src/app/crafts/<craft-name>/page.tsx` — the craft lives here, full page, no layout constraint
2. Add an entry to `src/data/projects.ts` — this is the single source of truth for the gallery grid. The array is sorted by `createdAt` (format `DD-MM-YYYY`) descending. Each entry needs `name`, `path`, `img` (gif/png in `/public/craft-preview/`), `description`, `type`, `height` (Tailwind class), `createdAt`

### Key conventions

- **Animation**: `motion/react` (re-export of Framer Motion) is used for all spring/scroll animations. Import from `"motion/react"`, not `"framer-motion"`, even though both are installed.
- **Styling**: Tailwind CSS v4. `cn()` from `src/lib/utils.ts` for conditional classes.
- **Craft pages are self-contained** — each `page.tsx` under `crafts/` is its own world. No shared layout wraps them; they control their own full-screen layout.
- **`ComponentLayout`** (`src/components/layoutComponents/ComponentLayout.tsx`) exists as an optional wrapper for crafts that want a back-button + prev/next footer, but most newer crafts don't use it (its internal project list is stale).
- **External images**: Only `images.unsplash.com` is allowlisted in `next.config.mjs`. Use `unoptimized` prop on `<Image>` for Unsplash URLs since the CSP restricts remote image optimization. Local images go in `/public/`.

### Route structure

```
/                          → src/app/page.tsx (redirects or landing)
/crafts                    → src/app/crafts/page.tsx (gallery grid, reads from projects.ts)
/crafts/<name>             → src/app/crafts/<name>/page.tsx (individual craft)
```

### Motion/scroll patterns used across crafts

- `useScroll({ container: ref })` + `useSpring` for spring-lagged scroll followers
- `useMotionValueEvent` to react to MotionValue changes without causing re-renders on every frame
- `useTransform` for derived MotionValues (opacity, scale, position from scroll)
- The inverted-list craft demonstrates a "3-copy teleport" infinite scroll pattern: render `[...items, ...items, ...items]`, start `scrollTop` at `SINGLE_HEIGHT`, silently reset on edge-crossing via `useMotionValueEvent`, accumulate deltas separately so the spring never sees the jump
