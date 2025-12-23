"use client"
import ArrowButton from "@/components/ArrowButton";
import ComponentLayout from "@/components/Layout/ComponentLayout";
import React from "react";
import CodeBlock from "../../components/Layout/CodeBlock";
import Image from "next/image";
import { motion } from 'framer-motion';

const codeSnippet = `
const getArrowStyles = (index: number) => {
  const baseStyles = {
    height: '2px',
    width: '2px',
    borderRadius: '2px',
    backgroundColor: '#000',
  };
  const positions = [
    { left: 0, top: 0 },
    { left: '3px', top: 0 },
    { left: '3px', top: '3px' },
    { left: '6px', top: '3px' },
    { left: '6px', top: '6px' },
    { left: '9px', top: '6px' },
    { left: '3px', top: '9px' },
    { left: '6px', top: '9px' },
    { left: 0, top: '12px' },
    { left: '3px', top: '12px' },
  ];
  return { ...baseStyles, ...positions[index] };
};
`;
const codeSnippetHover = `<div className='hero-button-arrows absolute flex items-center
  pointer-events-none overflow-hidden transition-all p-1
  duration-500 group-hover:w-full group-hover:h-full 
  group-hover:left-0 group-hover:top-0 justify-center
  h-full w-12 rounded-4 top-0 left-0 moving-arrows'> 
{/* Arrow content */}
</div>`;

const codeSnippetPulsating = `{Array(8).fill(null).map((_, idx) => (
  <div key={idx} className={\`moving-arrows-item relative w-3 h-3 \${idx === 0 ? 'block' : 'group-hover:block'}\`}>
    {Array(10).fill(null).map((_, i) => (
      <div key={i} style={{ ...getArrowStyles(i), position: 'absolute' }} className={\`wave wave-\${idx + 1}\`}></div>
    ))}
  </div>
))}`;

const codeSnippetPulsatingCSS = `
.wave {
  animation: wave 1.5s ease-in-out infinite;
}

@keyframes wave {
  0%,
  100% {
    opacity: 0.8;
  }
  50% {
    opacity: 0.2;
  }
}

.wave-1 {
  animation-delay: 0s;
}

.wave-2 {
  animation-delay: 0.1s; /* 0.2s delay for the second arrow */
}

.wave-3 {
  animation-delay: 0.2s; /* 0.4s delay for the third arrow */
}

.wave-4 {
  animation-delay: 0.3s; /* 0.6s delay for the fourth arrow */
}

.wave-5 {
  animation-delay: 0.4s; /* 0.8s delay for the fifth arrow */
}

.wave-6 {
  animation-delay: 0.5s; /* 1s delay for the sixth arrow */
}

.wave-7 {
  animation-delay: 0.6s; /* 1.2s delay for the seventh arrow */
}

.wave-8 {
  animation-delay: 0.7s; /* 1.4s delay for the eighth arrow */
}

.group:hover .moving-arrows-item:first-child {
  display: none;
}
`;

function page() {
  return (
    <ComponentLayout
      title="Arrow Button Component"
      description="A simple yet elegant arrow button component that can be used for Call to Actions(CTA)."
    >
      <div className=" bg-[#DDDCDA] w-full max-w-2xl flex items-center justify-center rounded-lg border border-neutral-300 min-h-80 ">
        <ArrowButton />
      </div>
      <div className="text-base mt-8 text-neutral-700">
        Recently I came across a tweet by very respected
        <span className="font-medium text-blue-500 dark:text-blue-400">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://x.com/mannupaaji"
          >
            @mannupaaji.  {" "}
          </a>
        </span>
        Here is the reference tweet
        <div>
          <blockquote
            className="twitter-tweet"
            dangerouslySetInnerHTML={{
              __html: `
                  <p lang="qme" dir="ltr">
                    👀 💬 <a href="https://t.co/8riLSj39l2">pic.twitter.com/8riLSj39l2</a>
                  </p>
                  &mdash; Manu Arora (@mannupaaji) 
                  <a href="https://twitter.com/mannupaaji/status/1791328854360870914?ref_src=twsrc%5Etfw">May 17, 2024</a>
                `,
            }}
          />
        </div>
        where he referenced the website for{" "}
        <span className="font-medium text-lime-500">
          <a target="_blank" href="https://antimetal.com/">
            Antimetal
          </a>
        </span>{" "}
        where the CTA button struck my mind and I also in motivated mind
        thought to recreate that button.
        <div className="mt-2">
          My Immeditate thought was to create the detailed Arrow SVG
          <Image
            className="mx-auto border rounded-md my-2"
            src={"/arrow/arrow.png"}
            width={100}
            height={100}
            alt="arrow"
          />
          While I knew I wont find any asset/SVG online, I had to make it
          myself from scratch where got the idea by GPT how to build it using
          CSS styles over divs by absolute positioning them.
          <div className="my-4 rounded-md">
            <CodeBlock language="javascript" code={codeSnippet} />
          </div>
          This function creates the arrow shape using small 2x2 pixel blocks.
          Each block is positioned precisely to form the arrow shape. The
          baseStyles define the size and appearance of each block, while the
          positions array determines the exact placement of each block to
          create the arrow shape.
        </div>
        <div>
          <h3 className="font-semibold mt-2 mb-1 text-neutral-700">
            Hover Animation
          </h3>
          The hover animation is achieved through a combination of CSS
          transitions and React state changes. When the button is hovered, we
          trigger a series of class changes that reveal the full arrow
          container:
          <div className="my-4 rounded-md">
            <CodeBlock language="javascript" code={codeSnippetHover} />
          </div>
          <p className="text-neutral-700 ">
            The group-hover classes from Tailwind CSS are used to control the
            expansion of the arrow container on hover. This creates the effect
            of the arrows filling the button.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mt-2 mb-1 text-neutral-700 ">
            Pulsating Effect
          </h3>
          <p className="text-neutral-700 ">
            The pulsating effect is created by using multiple layers of arrows
            that appear to move. This is achieved by rendering multiple sets
            of arrows and animating them:
          </p>
          <CodeBlock language="javascript" code={codeSnippetPulsating} />
          <CodeBlock language="javascript" code={codeSnippetPulsatingCSS} />
          <p className="text-neutral-700 ">
            Each set of arrows is given a different animation delay, creating
            the illusion of a continuous flow of arrows. The CSS animations
            (not shown in the provided code) would handle the actual movement
            of these arrow sets.
          </p>

          <p className="font-medium mt-4 text-neutral-700 mb-3">
            {`Here's the source code, I hope you like it :)`}
          </p>
          <motion.a
            href="https://github.com/prash240303/crafts/blob/main/src/components/ArrowButton.tsx"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02, boxShadow: '0 0 0 2px #22c55e' }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-mono text-neutral-600 shadow-sm transition-colors hover:text-green-600 hover:bg-green-50"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            <span className="break-all">prash240303/crafts/ArrowButton.tsx</span>
            <svg
              className="w-4 h-4 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </motion.a>
        </div>
      </div>
    </ComponentLayout>
  );
}

export default page;
