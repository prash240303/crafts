"use client"
import ComponentLayout from '@/components/Layout/ComponentLayout'
import ZipCodeChecker from '@/components/ZipCodeChecker'
import React from 'react'
import CodeBlock from '@/components/Layout/CodeBlock'
import { motion } from 'framer-motion'

const codeSnippetRipple = `
const createRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
  const button = e.currentTarget;
  const wrapper = imageWrapperRef.current;
  
  if (!wrapper) return;
  
  const ripple = document.createElement('span');
  const rect = wrapper.getBoundingClientRect();
  
  ripple.style.left = \`\${e.clientX - rect.left}px\`;
  ripple.style.top = \`\${e.clientY - rect.top}px\`;
  ripple.classList.add('ripple');
  
  wrapper.appendChild(ripple);
  
  setTimeout(() => {
    ripple.remove();
  }, 600);
};
`;

const codeSnippetRippleCSS = `
.ripple {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.6);
  width: 100px;
  height: 100px;
  margin-top: -50px;
  margin-left: -50px;
  animation: ripple-effect 0.6s ease-out;
  pointer-events: none;
}

@keyframes ripple-effect {
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(4);
    opacity: 0;
  }
}
`;

const codeSnippetComponent = `
const ZipCodeChecker = () => {
  const [zipCode, setZipCode] = useState('');
  const imageWrapperRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle zip code validation
    console.log('Checking zip code:', zipCode);
  };

  return (
    <div ref={imageWrapperRef} className="relative overflow-hidden rounded-2xl">
      <Image
        src="/your-background-image.jpg"
        alt="Background"
        width={1200}
        height={600}
        className="object-cover"
      />
      <form onSubmit={handleSubmit} className="absolute inset-0 flex flex-col items-center justify-center">
        <input
          type="text"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
          placeholder="Enter zip code"
          className="px-4 py-2 rounded-lg"
        />
        <button 
          onClick={createRipple}
          className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg"
        >
          Check Availability
        </button>
      </form>
    </div>
  );
};
`;

function page() {
  return (
    <ComponentLayout
      title="Zip Code Checker Component"
      description="A beautiful and customizable input component for collecting user information with engaging ripple effects"
    >
      <div className="scale-75 origin-top">
        <ZipCodeChecker />
      </div>

      <div className="text-base mt-8 text-neutral-700">
        I built this Zip Code Checker as a small UI experiment focused on interaction and polish. The idea was to make a simple input feel more engaging through layout, spacing, and subtle animation.

        <div className="mt-4">
          It's a client-side Next.js component using React state for the input and a DOM-based ripple effect for instant visual feedback when the button is clicked. The background image acts as both a design element and an interaction surface, keeping everything contained and clean.
        </div>

        <div className="mt-4">
          The inspiration came from modern SaaS landing pages that check availability by location—I wanted it to feel friendly, lightweight, and responsive, while still being easy to extend with real validation or API logic later.
        </div>

        <div className="mt-6">
          <h3 className="font-semibold mt-2 mb-1 text-neutral-700">
            Component Structure
          </h3>
          <p className="text-neutral-700">
            The component uses Next.js Image optimization for the background, React state for input management, and a ref to handle the ripple effect positioning:
          </p>
          <div className="my-4 rounded-md">
            <CodeBlock language="typescript" code={codeSnippetComponent} />
          </div>
        </div>

        <div>
          <h3 className="font-semibold mt-2 mb-1 text-neutral-700">
            Ripple Click Effect
          </h3>
          <p className="text-neutral-700 mb-2">
            To create the ripple click effect, I use a DOM reference. This allows me to insert a temporary element exactly where the user clicks, without adding extra markup.
          </p>
          <p className="text-neutral-700 mb-2">
            When the Check Availability button is clicked, a ripple is created and positioned using the mouse coordinates and the container's bounds:
          </p>
          <div className="my-4 rounded-md">
            <CodeBlock language="typescript" code={codeSnippetRipple} />
          </div>
          <p className="text-neutral-700">
            The ripple element is dynamically created, positioned at the click coordinates relative to the container, and then removed after the animation completes.
          </p>
        </div>

        <div>
          <h3 className="font-semibold mt-2 mb-1 text-neutral-700">
            Ripple Animation CSS
          </h3>
          <p className="text-neutral-700 mb-2">
            The ripple effect is achieved through CSS animations that scale and fade the element:
          </p>
          <CodeBlock language="css" code={codeSnippetRippleCSS} />
          <p className="text-neutral-700 mt-2">
            The animation scales the ripple from 0 to 4x its size while fading it out, creating a smooth, water-like expansion effect. The pointer-events: none ensures it doesn't interfere with other interactions.
          </p>
        </div>

        <div className="mt-6">
          <h3 className="font-semibold mb-2 text-neutral-700">
            Key Features
          </h3>
          <ul className="list-disc list-inside text-neutral-700 space-y-1">
            <li>Optimized background image using Next.js Image component</li>
            <li>Dynamic ripple effect triggered on button click</li>
            <li>Clean, centered layout with Tailwind CSS</li>
            <li>Responsive design that adapts to different screen sizes</li>
            <li>Easy to extend with real API validation logic</li>
          </ul>
        </div>

        <p className="font-medium mt-6 text-neutral-700 mb-3">
          Here's the source code, I hope you like it :)
        </p>
        <motion.a
          href="https://github.com/prash240303/crafts/blob/main/src/components/ZipCodeChecker.tsx"
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
          <span className="break-all">prash240303/crafts/ZipCodeChecker.tsx</span>
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

export default page