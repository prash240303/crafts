---
name: frontend
description: Build beautiful, hand-crafted UI components for the Digital Crafts museum. Use when adding a new craft, polishing motion/feel of an existing craft, or composing interactive components with Tailwind CSS v4 and `motion/react`. Prioritizes visual craft and tactile feel over reusability — hardcoded values are welcome, system patterns are reached for only when they earn it.
---

# Frontend — Digital Crafts museum

You are working inside a **museum of UI components**, not a design system. Each craft is its own exhibit: a beautiful, opinionated, often non-reusable interaction at its own route. The bar is *feel*, not flexibility.

## Mindset

Before writing code, decide what kind of craft this is:

1. **One-off illustration** — a button, a text effect, a single visual idea. Hardcode everything. No props, no abstractions, no config. The JSX is the design.
2. **Pattern study** — exploring a real interaction (infinite scroll, gesture handling, layout primitive). Worth investing in structure *inside the craft folder*. Still don't hoist into shared components.
3. **Composition** — multiple primitives working together (a player, a dock, a card stack). Use what exists in `src/components/ui/`, write the rest inline.

When in doubt, default to #1. Premature abstraction is the most common failure mode here.

## Core rules

### Always

- Import motion from `"motion/react"` — never `"framer-motion"`. Both are installed; only one is correct.
- Use Tailwind v4. Inline arbitrary values (`h-[73vh]`, `bg-[#0a0a0a]`, `delay-[430ms]`) when they nail the feel. Don't extract a token for one use.
- Use `cn()` from `src/lib/utils.ts` for conditional class composition.
- Start the dev server and verify visually. Motion can't be type-checked.
- Build the craft as `src/app/crafts/<name>/page.tsx`, full page, full control.
- Add an entry to `src/data/projects.ts` and drop a preview asset (`.gif`, `.png`, `.mp4`) in `/public/craft-preview/`.

### Never

- Don't add `ComponentLayout` unless the craft genuinely wants back-button chrome.
- Don't preemptively extract reusable components. Wait for a second real caller.
- Don't add loading states, error boundaries, or a11y scaffolding the craft doesn't need to *be itself*. Add them when a real interaction demands them.
- Don't share state, layout, or styles across crafts. Copy-paste is fine.
- Don't allow-list new remote image domains casually. Local assets in `/public/`; Unsplash works via `unoptimized` on `<Image>`.

## Anatomy of a good craft

```tsx
// src/app/crafts/<name>/page.tsx
"use client";

import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";

export default function CraftName() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({ container: ref });
  // Spring values tuned by feel, not derived from a system.
  const y = useSpring(scrollY, { stiffness: 247, damping: 32 });

  return (
    <div ref={ref} className="h-screen w-screen overflow-y-auto bg-[#0a0a0a]">
      {/* The craft. Hardcoded, deliberate, beautiful. */}
    </div>
  );
}
```

Notice: no props, no exported types, no story file, no test. The page **is** the craft.

## Motion patterns to reach for

These are documented because they keep coming up. Use them when they fit; reinvent when they don't.

- **Spring-lagged scroll follower** — `useScroll({ container: ref })` + `useSpring(scrollY, { stiffness, damping })`. Tune by feel.
- **Derived MotionValues** — `useTransform(motionValue, [in], [out])` for opacity/scale/position chained off scroll or gesture.
- **Side-effects without re-render** — `useMotionValueEvent(mv, "change", cb)` when you need to react to a value mid-animation without paying React's re-render cost.
- **3-copy teleport infinite scroll** — render `[...items, ...items, ...items]`, start `scrollTop` at the middle copy's offset, silently reset on edge-crossing via `useMotionValueEvent`, accumulate deltas separately so the spring never sees the jump. See `src/app/crafts/inverted-list/` for a worked example.
- **Stagger via `transition: { delay: i * 0.04 }`** — often beats `staggerChildren` for small finite lists because you can see/tweak the curve inline.

## When to use hardcoded values

Default. Especially for:

- Spring `stiffness` / `damping`
- Delays, durations, easing curves
- Specific dimensions tied to a layout idea (`h-[420px]`)
- Color values that are part of the craft's identity
- Z-index stacking within a craft

If you're naming a constant for the second time across the codebase, *then* extract it — and put it inside the craft's folder, not in a shared file, unless multiple crafts genuinely share the value.

## When to use system patterns

Reach for structure when:

- The craft is large enough that a single 600-line file becomes hard to navigate — split by *concept* (e.g. `Card.tsx`, `useCardGesture.ts`) inside the craft folder.
- You're building a generic primitive that 2+ crafts will pull from — promote to `src/components/ui/`. But verify both callers exist first.
- The interaction has discrete states worth modeling explicitly (a state machine, a reducer) rather than a tangle of `useState` calls.

A pattern is earned. A pattern is not aspired to.

## Working with `src/components/ui/`

This folder is a grab-bag of primitives crafts have needed. It is **not** versioned, **not** documented, **not** consistent. Before importing:

1. Read the source. Names can be misleading (`keyboardv1.tsx`, `keyboardbackup.tsx`, `keyboard.tsx` are *different iterations*, not versions).
2. Verify the API matches what you need. If not, build inline — don't bend the existing component.
3. If you extend one, extend it inside your craft folder. Don't mutate the shared primitive unless multiple existing crafts already use the new shape.

## Verifying your work

1. `yarn dev` and open the craft route directly (`localhost:3000/crafts/<name>`).
2. Interact with it. Hover. Scroll. Click rapidly. Resize the window.
3. Visit `/crafts` and confirm the gallery tile renders, preview asset loads, height is right.
4. Watch the motion at quarter speed in dev tools if a spring feels off — feel beats vibes.
5. `yarn lint` before declaring done.

You cannot unit-test feel. Don't claim a craft is finished without using it in the browser.

## Common shapes

### Adding a new craft (checklist)

- [ ] `src/app/crafts/<name>/page.tsx` exists and renders standalone
- [ ] Preview asset in `/public/craft-preview/<name>.{gif,png,mp4}`
- [ ] Entry in `src/data/projects.ts` with correct `createdAt` (DD-MM-YYYY), `height`, `img` or `vid`
- [ ] Tested in browser, motion feels right
- [ ] `yarn lint` passes

### Polishing an existing craft

- Tweak spring values *in place*, watch in browser, commit when it feels right.
- Don't refactor while polishing — separate the diffs.
- Preserve the existing structure unless it's actively in the way.

### Promoting a primitive to `src/components/ui/`

- Verify 2+ existing crafts already need this shape (not "could use" — "do use").
- Keep the API minimal. Props only for things that genuinely vary between callers.
- Update the callers; don't leave duplicate inline implementations behind.

## Final note

The user is building a museum. Beauty is the point. If a choice between "elegant code" and "elegant interaction" presents itself, choose the interaction. The code can be loud; the craft must be quiet and exact.
