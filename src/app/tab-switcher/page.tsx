"use client"
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import TabSwitcher from '@/components/Switcher';
import CodeBlock from '@/components/Layout/CodeBlock';
import ComponentLayout from '@/components/Layout/ComponentLayout';

// Code snippets for documentation
const codeSnippetState = `const [activeTab, setActiveTab] = useState("gallery");`;

const codeSnippetSliding = `<div
  className={\`absolute top-1 bottom-1 w-[calc(50%-0.25rem)] 
    bg-white rounded-lg shadow-md transition-transform 
    duration-300 ease-out \${
    activeTab === "gallery" 
      ? "translate-x-0" 
      : "translate-x-full"
  }\`}
/>`;

const codeSnippetIconFeedback = `<GradientIconGallery isActive={activeTab === "gallery"} />`;

// Main Page Component
function Page() {
  return (
    <ComponentLayout
      title="Tab Switcher Component"
      description="A compact navigation component designed for smooth, visual tab transitions. Instead of switching content abruptly, the active tab slides into place with a soft background animation, making the interaction feel polished and intentional."
    >
      <div className="bg-white mx-auto py-8 flex items-center justify-center rounded-xl shadow-sm mb-8">
        <TabSwitcher />
      </div>



      <div className="text-base mt-8 text-neutral-700 space-y-6">
        <p>
          The Tab Switcher is a compact navigation component designed for smooth, visual tab transitions. Instead of switching content abruptly, the active tab slides into place with a soft background animation, making the interaction feel polished and intentional.
        </p>

        <p>
          The component runs on the client {"use client"} since it relies on state and animated transitions.
        </p>

        <div className="mt-6">
          <h3 className="font-semibold mt-2 mb-1 text-neutral-700">
            State-Driven Tab Control
          </h3>
          <p className="text-neutral-700 mb-2">
            The active tab is controlled using React state:
          </p>
          <div className="my-4 rounded-md">
            <CodeBlock language='javascript' code={codeSnippetState} />
          </div>
          <p className="text-neutral-700">
            This keeps the logic simple and makes it easy to add more tabs later or sync the state with routing.
          </p>
        </div>

        <div>
          <h3 className="font-semibold mt-2 mb-1 text-neutral-700">
            Sliding Background Animation
          </h3>
          <p className="text-neutral-700 mb-2">
            The highlight behind the active tab is a single element that slides horizontally based on the active state:
          </p>
          <div className="my-4 rounded-md">
            <CodeBlock language='javascript' code={codeSnippetSliding} />
          </div>
          <p className="text-neutral-700">
            Using transform instead of position changes keeps the animation smooth and performant.
          </p>
        </div>

        <div>
          <h3 className="font-semibold mt-2 mb-1 text-neutral-700">
            Icon Feedback
          </h3>
          <p className="text-neutral-700 mb-2">
            The icons respond to the active state, reinforcing which tab is selected:
          </p>
          <div className="my-4 rounded-md">
            <CodeBlock language='javascript' code={codeSnippetIconFeedback} />
          </div>
          <p className="text-neutral-700">
            This subtle feedback helps the component feel more responsive without adding extra animation noise.
          </p>
        </div>

        <p className="font-medium mt-6 text-neutral-700 mb-3">
         {` Here's the source code, I hope you like it :)`}
        </p>
        <motion.a
          href="https://github.com/prash240303/crafts/blob/main/src/components/Switcher.tsx"
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
          <span className="break-all">prash240303/crafts/Switcher.tsx</span>
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
    </ComponentLayout>

  );
}

export default Page;