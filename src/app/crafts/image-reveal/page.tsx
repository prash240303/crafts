"use client";
import ImageReveal from "@/components/ui/ImageReveal";
import ComponentLayout from "@/components/layoutComponents/ComponentLayout";
import CodeBlock from "../../../components/layoutComponents/CodeBlock";
import SourceCodeButton from "@/components/ui/sourceCodeButton";

const codeSnippetGrid = `
const rows = 10;
const cols = 15;

<div
  key={isRevealed ? "revealed" : "hidden"}
  className="absolute inset-0 z-10 pointer-events-none grid h-full w-full"
  style={{
    gridTemplateColumns: \`repeat(\${cols}, 1fr)\`,
    gridTemplateRows: \`repeat(\${rows}, 1fr)\`,
  }}
>
  {[...Array(rows * cols)].map((_, i) => {
    const row = Math.floor(i / cols);
    const col = i % cols;
    // render each tile...
  })}
</div>
`;

const codeSnippetTile = `
<motion.div
  key={i}
  initial={{
    opacity: 1,
    filter: "brightness(2)",
    background: "rgba(255,255,255,1)",
  }}
  animate={
    isRevealed
      ? {
          opacity: 0,
          filter: "brightness(1)",
          background: "rgba(255,255,255,0)",
          scale: 1.1,
        }
      : {}
  }
  transition={{
    duration: 0.6,
    ease: "easeInOut",
    delay: (row + col) * 0.04,  // diagonal wave
  }}
  className="w-full h-full relative border-[0.5px] border-white/5"
/>
`;

const codeSnippetDelay = `
// Each cell's delay is computed from its row + column index.
// This produces a diagonal sweep from top-left → bottom-right.

delay: (row + col) * 0.04

// For a 10 × 15 grid the maximum diagonal index is (9 + 14) = 23
// Maximum delay  →  23 × 0.04 = 0.92 s
// Per-tile duration  →  0.6 s
// Total visible reveal  ≈  0.92 + 0.6  =  ~1.5 s
`;

const codeSnippetReset = `
// Force a full remount of the grid when toggling state.
// This snaps every tile back to its white 'initial' state instantly
// without fighting Framer Motion's internal animation cache.

<div key={isRevealed ? "revealed" : "hidden"} ...>
`;

const codeSnippetFull = `
"use client";
import Image from "next/image";
import React, { useState } from "react";
import { motion } from "framer-motion";

function ImageReveal() {
  const [isRevealed, setIsRevealed] = useState(false);
  const rows = 10;
  const cols = 15;

  return (
    <>
      <div className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
        <div
          key={isRevealed ? "revealed" : "hidden"}
          className="absolute inset-0 z-10 pointer-events-none grid h-full w-full"
          style={{
            gridTemplateColumns: \`repeat(\${cols}, 1fr)\`,
            gridTemplateRows: \`repeat(\${rows}, 1fr)\`,
          }}
        >
          {[...Array(rows * cols)].map((_, i) => {
            const row = Math.floor(i / cols);
            const col = i % cols;
            return (
              <motion.div
                key={i}
                initial={{
                  opacity: 1,
                  filter: "brightness(2)",
                  background: "rgba(255,255,255,1)",
                }}
                animate={
                  isRevealed
                    ? {
                        opacity: 0,
                        filter: "brightness(1)",
                        background: "rgba(255,255,255,0)",
                        scale: 1.1,
                      }
                    : {}
                }
                transition={{
                  duration: 0.6,
                  ease: "easeInOut",
                  delay: (row + col) * 0.04,
                }}
                className="w-full h-full relative border-[0.5px] border-white/5"
              />
            );
          })}
        </div>
        <Image
          src="/home/bridge.jpg"
          className="object-cover w-full h-full transform transition-transform duration-700 group-hover:scale-105"
          width={1200}
          height={800}
          alt="image"
          priority
        />
      </div>

      <button
        onClick={() => setIsRevealed(!isRevealed)}
        className="group relative px-10 py-4 bg-white text-black font-semibold rounded-full overflow-hidden hover:scale-105 active:scale-95 transition-all duration-300"
      >
        <span className="relative z-10 flex items-center gap-2">
          {isRevealed ? "Reset Gallery" : "Ignite Reveal"}
        </span>
      </button>
    </>
  );
}

export default ImageReveal;
`;

function page() {
  return (
    <ComponentLayout
      title="Image Reveal Component"
      description="A cinematic image reveal where a 10×15 grid of tiles dissolves away in a diagonal wave, uncovering the photograph beneath."
    >
      {/* Live demo */}
      <div className="bg-[#111111] w-full max-w-4xl flex flex-col items-center justify-center gap-6 rounded-lg border border-neutral-800 min-h-80 p-8">
        <ImageReveal />
      </div>

      {/* Article body */}
      <div className="text-base mt-8 text-neutral-700">
        I wanted to recreate the kind of dramatic image reveal you see on
        high-end portfolio and product launch sites — where a photo isn&apos;t
        simply faded in but actively{" "}
        <span className="font-medium text-neutral-900">uncovered</span>, tile by
        tile, like a curtain being drawn back. The whole effect is built with a
        CSS Grid overlay and{" "}
        <span className="font-medium text-neutral-900">Framer Motion</span> — no
        canvas, no WebGL, no external animation libraries beyond what&apos;s
        already in the stack.
        {/* Grid overlay */}
        <div className="mt-4">
          <h3 className="font-semibold mt-2 mb-1 text-neutral-700">
            Building the Grid Overlay
          </h3>
          The core idea is to place an absolutely-positioned CSS grid directly
          on top of the image. Each cell starts fully opaque white — completely
          hiding the image — and later animates to transparent when the reveal
          fires. The container is divided into a{" "}
          <span className="font-medium text-neutral-900">
            10 rows × 15 cols
          </span>{" "}
          grid (150 tiles total) using{" "}
          <code className="text-sm bg-neutral-100 px-1 py-0.5 rounded">
            gridTemplateColumns
          </code>{" "}
          and{" "}
          <code className="text-sm bg-neutral-100 px-1 py-0.5 rounded">
            gridTemplateRows
          </code>{" "}
          set inline from JavaScript constants, so changing the grid density is
          a one-line change.
          <div className="my-4 rounded-md">
            <CodeBlock language="jsx" code={codeSnippetGrid} />
          </div>
          The overlay carries{" "}
          <code className="text-sm bg-neutral-100 px-1 py-0.5 rounded">
            pointer-events-none
          </code>{" "}
          so it never blocks hover interactions on the image below, and{" "}
          <code className="text-sm bg-neutral-100 px-1 py-0.5 rounded">
            z-10
          </code>{" "}
          to ensure it sits above the image layer at all times.
        </div>
        {/* Per-tile animation */}
        <div>
          <h3 className="font-semibold mt-2 mb-1 text-neutral-700">
            Animating Each Tile with Framer Motion
          </h3>
          Every cell is a{" "}
          <code className="text-sm bg-neutral-100 px-1 py-0.5 rounded">
            {"<motion.div>"}
          </code>
          . Its{" "}
          <code className="text-sm bg-neutral-100 px-1 py-0.5 rounded">
            initial
          </code>{" "}
          state is fully opaque white. When{" "}
          <code className="text-sm bg-neutral-100 px-1 py-0.5 rounded">
            isRevealed
          </code>{" "}
          flips to{" "}
          <code className="text-sm bg-neutral-100 px-1 py-0.5 rounded">
            true
          </code>
          , the{" "}
          <code className="text-sm bg-neutral-100 px-1 py-0.5 rounded">
            animate
          </code>{" "}
          prop drives each tile to{" "}
          <code className="text-sm bg-neutral-100 px-1 py-0.5 rounded">
            opacity: 0
          </code>{" "}
          with a subtle{" "}
          <code className="text-sm bg-neutral-100 px-1 py-0.5 rounded">
            scale: 1.1
          </code>{" "}
          pop before vanishing — adding a small sense of physicality to each
          departing tile. Setting{" "}
          <code className="text-sm bg-neutral-100 px-1 py-0.5 rounded">
            filter: brightness(2)
          </code>{" "}
          on the initial state gives tiles a luminous, glowing quality rather
          than flat white, making the pre-reveal feel intentional.
          <div className="my-4 rounded-md">
            <CodeBlock language="jsx" code={codeSnippetTile} />
          </div>
        </div>
        {/* Diagonal delay */}
        <div>
          <h3 className="font-semibold mt-2 mb-1 text-neutral-700">
            The Diagonal Wave Delay
          </h3>
          The one detail that turns a plain fade into a real sweep is the
          staggered delay. Rather than all 150 tiles disappearing at once, each
          tile&apos;s delay is derived from its{" "}
          <code className="text-sm bg-neutral-100 px-1 py-0.5 rounded">
            row + col
          </code>{" "}
          sum. Tiles near the top-left disappear first; tiles at the
          bottom-right disappear last — producing a natural diagonal wave across
          the entire image.
          <div className="my-4 rounded-md">
            <CodeBlock language="javascript" code={codeSnippetDelay} />
          </div>
          The multiplier{" "}
          <code className="text-sm bg-neutral-100 px-1 py-0.5 rounded">
            0.04
          </code>{" "}
          is fully tunable — increase it for a slow theatrical wipe, decrease it
          for a snappy explosive reveal.
        </div>
        {/* Reset trick */}
        <div>
          <h3 className="font-semibold mt-2 mb-1 text-neutral-700">
            Resetting the Animation
          </h3>
          A subtle challenge with Framer Motion is getting animated elements
          back to their{" "}
          <code className="text-sm bg-neutral-100 px-1 py-0.5 rounded">
            initial
          </code>{" "}
          state cleanly after they&apos;ve already animated. The cleanest fix is
          changing the grid wrapper&apos;s{" "}
          <code className="text-sm bg-neutral-100 px-1 py-0.5 rounded">
            key
          </code>{" "}
          prop whenever the toggle fires. When React sees a new key it discards
          and fully remounts the component tree — so all 150 tiles snap back to
          their white initial state instantly, zero leftover animation state to
          fight.
          <div className="my-4 rounded-md">
            <CodeBlock language="jsx" code={codeSnippetReset} />
          </div>
        </div>
        {/* Full source */}
        <div>
          <h3 className="font-semibold mt-2 mb-1 text-neutral-700">
            Full Source
          </h3>
          <div className="my-4 rounded-md">
            <CodeBlock language="tsx" code={codeSnippetFull} />
          </div>
          <SourceCodeButton
            componentName="ImageReveal"
            hrefLink="https://github.com/prash240303/crafts/blob/main/src/components/ui/ImageReveal.tsx"
          />
        </div>
      </div>
    </ComponentLayout>
  );
}

export default page;
