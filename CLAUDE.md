# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this project is

**Digital Crafts** is a personal museum of UI components — each craft is a small, self-contained exhibit at its own route. The point is not to ship reusable infrastructure; the point is to build beautiful, tactile, expressive interactions worth lingering on. Think gallery, not design system.

Some crafts are one-off illustrations of an idea (a button with a ripple, a magic-text shimmer). Others are deeper studies of a pattern (inverted-list's spring-scroll, the liquid glass dock). Both belong here.

### Philosophy

- **Beauty over reuse.** A craft does not need to be generalizable. If hardcoded values land the feel better than a configurable API, hardcode them. Magic numbers that produce magic are not technical debt.
- **System patterns when they earn it.** If a craft is genuinely exploring a pattern (infinite scroll, gesture handling, a layout primitive), invest in the abstraction — but only inside that craft. Don't hoist it into `src/components/ui` unless multiple crafts already need it.
- **Each craft is its own world.** Don't share state, layout, or styles across crafts. Copy-paste is fine — divergence is the point.
- **Motion and feel are the product.** Spring tuning, easing, stagger, delay — these are not decoration. Iterate on them like you would iterate on copy.
- **Resist premature polish.** Don't add loading states, error boundaries, or accessibility scaffolding the craft doesn't need to *be itself*. Add them when a real interaction requires them.

## Commands

```bash
yarn dev        # Start development server at http://localhost:3000
yarn build      # Production build
yarn lint       # ESLint via next lint
```

No test suite exists. Verify visually in the browser; motion can't be unit-tested.

## Architecture

Next.js 16 App Router. Each craft is a route under `/crafts/<name>`, fully self-contained, no shared layout.

### Adding a new craft

1. Create `src/app/crafts/<craft-name>/page.tsx` — full page, full control. No `ComponentLayout` wrapper unless you want the back/prev/next chrome.
2. Drop a preview asset in `/public/craft-preview/` (`.gif`, `.png`, or `.mp4`).
3. Add an entry to `src/data/projects.ts` — single source of truth for the gallery grid. Sorted by `createdAt` (`DD-MM-YYYY`) descending. Fields:
   - `name`, `path`, `description`, `type`
   - `img` *or* `vid` — gif/png for static previews, mp4 for video previews
   - `height` — Tailwind class controlling the grid tile height (`h-72`, `h-96`, `h-[420px]`)
   - `createdAt` — `DD-MM-YYYY`
4. Build inside the route. Pull shared primitives from `src/components/ui/` only if one already fits — otherwise build it inline. **Don't preemptively extract.**

### Route structure

```
/                          → src/app/page.tsx (landing)
/crafts                    → src/app/crafts/page.tsx (gallery grid, reads projects.ts)
/crafts/<name>             → src/app/crafts/<name>/page.tsx (individual craft, self-contained)
/crafts/test               → scratchpad for in-progress experiments
```

### Component library (`src/components/ui/`)

This is a *grab-bag*, not a design system. Components here exist because a craft needed them. They're not versioned, not documented, not always reusable. Read the source before importing — names can be misleading. Common picks:

- `MediaCard.tsx`, `FMCard.tsx`, `cards.tsx` — card variants
- `Dock.tsx`, `SquircleWithOverflow.tsx` — layout primitives with personality
- `RippleButton.tsx`, `ArrowButton.tsx`, `button.tsx` — button variants
- `keyboard.tsx`, `keyboardv1.tsx`, `keyboardbackup.tsx` — iterations live side-by-side; pick the one that fits

`src/components/layoutComponents/ComponentLayout.tsx` is optional craft chrome (back button + prev/next). Most newer crafts skip it because its internal project list is stale.

## Key conventions

- **Animation**: `motion/react` (re-export of Framer Motion) for all spring/scroll work. Always import from `"motion/react"`, never `"framer-motion"`, even though both are installed.
- **Styling**: Tailwind CSS v4. `cn()` from `src/lib/utils.ts` for conditional classes. Inline arbitrary values (`h-[420px]`, `bg-[#1a1a1a]`) are encouraged when they nail the look — don't fabricate a token for one use.
- **Images**: Local assets live in `/public/`. Remote images are restricted to `images.unsplash.com` via `next.config.mjs`. Use `unoptimized` on `<Image>` for Unsplash URLs (CSP blocks remote image optimization).
- **ImageKit**: Some crafts (inverted-list) use ImageKit for CDN-served optimized images. Pattern is in those files — copy when needed.
- **Hardcoded values are fine.** Spring stiffness of `247`, a delay of `0.43s`, a height of `73vh` — if it feels right, ship it. Don't extract constants until a second caller exists.

## Motion patterns in the wild

Reach for these when they fit; reinvent when they don't.

- `useScroll({ container: ref })` + `useSpring` — spring-lagged scroll followers
- `useMotionValueEvent` — react to a MotionValue without re-rendering each frame
- `useTransform` — derive a MotionValue (opacity, scale, position) from another
- **"3-copy teleport" infinite scroll** (see `inverted-list`): render `[...items, ...items, ...items]`, start `scrollTop` at `SINGLE_HEIGHT`, silently reset on edge-crossing via `useMotionValueEvent`, and accumulate deltas separately so the spring never sees the jump.

## When to abstract, when not to

- **Abstract** when: two crafts are already doing the same thing and the third is about to. The shape is now known.
- **Don't abstract** when: you *think* this might be reused. Wait until it is. Premature interfaces ossify the wrong joints.
- **Inline magic numbers** when: the value is the design, not a parameter. `stiffness: 320` isn't asking to be a prop.
- **Configure** when: a craft genuinely demonstrates *variation* — the same idea across multiple visual settings.

A craft that is 400 lines of bespoke, hardcoded JSX with a perfect feel is a better contribution than the same craft factored into a generic component plus a config object.
