"use client"
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import ComponentLayout from '@/components/Layout/ComponentLayout';
import MagicText from '@/components/GlowyStarryText';
import CodeBlock from '@/components/Layout/CodeBlock';


const codeSnippetGradient = `
.magic-text {
  background: linear-gradient(45deg, #9333ea, #a855f7, #c084fc);
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: bg-pan 3s ease-in-out infinite;
}
`;

const codeSnippetStarPosition = `
star.style.setProperty('--star-left', \`\${rand(-10, 110)}%\`);
star.style.setProperty('--star-top', \`\${rand(-30, 130)}%\`);
`;

const codeSnippetUseEffect = `
useEffect(() => {
  const stars = document.querySelectorAll('.magic-star');
}, []);
`;

function Page() {
  return (
    <ComponentLayout
      title="Magic Text Component"
      description="A beautiful glowing text component with starry effects and smooth animations. Perfect for hero sections and attention-grabbing headlines."
    >
      <div className="bg-white rounded-xl shadow-sm mb-8">
        <MagicText />
      </div>

      <div className="text-base mt-8 text-neutral-700">
        The Magic Text component is a playful typography experiment designed to bring a bit of motion and delight into static text. The highlighted phrase animates with a shifting gradient, while small star icons float, spin, and reposition around it—creating a subtle "magic" effect without overwhelming the layout.

        <div className="mt-4">
          Because it relies on animation timing and direct DOM access, the component runs on the client using "use client".
        </div>

        <div className="mt-6">
          <h3 className="font-semibold mt-2 mb-1 text-neutral-700">
            Animated Gradient Text
          </h3>
          <p className="text-neutral-700 mb-2">
            The highlighted words use a moving gradient that continuously pans across the text:
          </p>
          <div className="my-4 rounded-md">
            <CodeBlock language='javascript' code={codeSnippetGradient} />
          </div>
          <p className="text-neutral-700">
            This keeps the text visually alive while remaining readable.
          </p>
        </div>

        <div>
          <h3 className="font-semibold mt-2 mb-1 text-neutral-700">
            Floating Star Logic
          </h3>
          <p className="text-neutral-700 mb-2">
            The stars are animated using a combination of CSS keyframes and JavaScript positioning. On an interval, each star is randomly repositioned using CSS variables:
          </p>
          <div className="my-4 rounded-md">
            <CodeBlock language="javascript" code={codeSnippetStarPosition} />
          </div>
          <p className="text-neutral-700">
            Each star then animates into place, fades in, and slowly spins.
          </p>
        </div>

        <div>
          <h3 className="font-semibold mt-2 mb-1 text-neutral-700">
            Lightweight DOM Animation
          </h3>
          <p className="text-neutral-700 mb-2">
            The animation is initialized inside a useEffect hook so it only runs on the client:
          </p>
          <div className="my-4 rounded-md">
            <CodeBlock language="javascript" code={codeSnippetUseEffect} />
          </div>
          <p className="text-neutral-700">
            This keeps the JSX clean while allowing fine-grained control over timing and motion.
          </p>
        </div>

        <p className="font-medium mt-6 text-neutral-700 mb-3">
          Here's the source code, I hope you like it :)
        </p>
        <motion.a
          href="https://github.com/prash240303/crafts/blob/main/src/components/GlowyStarryText.tsx"
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
          <span className="break-all">prash240303/crafts/GlowyStarryText.tsx</span>
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