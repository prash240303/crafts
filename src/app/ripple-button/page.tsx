"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import RippleButton from "@/components/RippleButton";
import ComponentLayout from "@/components/Layout/ComponentLayout";
import CodeBlock from "@/components/Layout/CodeBlock";
import SourceCodeButton from "@/components/sourceCodeButton";

const codeSnippetRipple = `
const createRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
  const button = e.currentTarget;
  const rect = button.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height) * 2.4;
  
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  
  const newRipple = { id: Date.now(), x, y };
  setRipples(prev => [...prev, newRipple]);
  
  setTimeout(() => {
    setRipples(prev => prev.filter(r => r.id !== newRipple.id));
  }, 600);
};
`;

const codeSnippetRippleCSS = `
@keyframes ripple {
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(4);
    opacity: 0;
  }
}

.animate-ripple {
  animation: ripple 0.6s ease-out;
}
`;

const codeSnippetComponent = `
const RippleButton = ({ children }: { children: React.ReactNode }) => {
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);

  const createRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newRipple = { id: Date.now(), x, y };
    setRipples(prev => [...prev, newRipple]);
    
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id));
    }, 600);
  };

  return (
    <button
      onMouseEnter={createRipple}
      className="relative overflow-hidden px-8 py-4 rounded-xl border-2 border-blue-600 
                 text-blue-600 bg-white hover:bg-blue-600 hover:text-white 
                 hover:scale-[102%] transition-all duration-300"
    >
      {ripples.map(ripple => (
        <span
          key={ripple.id}
          className="absolute rounded-full bg-blue-500/30 animate-ripple"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: '100px',
            height: '100px',
            marginLeft: '-50px',
            marginTop: '-50px',
          }}
        />
      ))}
      <span className="relative z-10">{children}</span>
    </button>
  );
};
`;

function Page() {
  return (
    <ComponentLayout
      title="Ripple Button Component"
      description="An interactive button with hover-triggered ripple effects for tactile, responsive feedback"
    >
      <div className="flex items-center justify-center py-12 bg-neutral-50 rounded-xl shadow-xs mb-8">
        <RippleButton>Click me</RippleButton>
      </div>

      <div className="text-base mt-8 text-neutral-700">
        I built this Ripple Button as a micro-interaction experiment to make
        button hovers feel more alive and responsive. The goal was to create
        subtle motion that adds tactile feedback without overwhelming the user.
        <div className="mt-4">
          It&apos;s a client-side React component that tracks hover events and
          dynamically creates ripple elements at the cursor position. Each
          ripple expands outward with a smooth animation before fading away,
          creating the illusion of the button filling in with color.
        </div>
        <div className="mt-4">
          The inspiration came from Material Design&apos;s ripple effects, but I
          wanted something softer and triggered on hover rather than
          click—making it feel more playful and less aggressive. The component
          is lightweight, reusable, and easy to customize with different colors
          or sizes.
        </div>
        <div className="mt-6">
          <h3 className="font-semibold mt-2 mb-1 text-neutral-700">
            Component Structure
          </h3>
          <p className="text-neutral-700">
            The component uses React state to manage multiple ripples, allowing
            overlapping effects when the user moves their cursor across the
            button quickly:
          </p>
          <div className="my-4 rounded-md">
            <CodeBlock language="typescript" code={codeSnippetComponent} />
          </div>
        </div>
        <div>
          <h3 className="font-semibold mt-2 mb-1 text-neutral-700">
            Ripple Hover Effect
          </h3>
          <p className="text-neutral-700 mb-2">
            The ripple effect is created on hover, not click. This makes the
            interaction feel softer and more exploratory—users get feedback just
            by moving their cursor over the button.
          </p>
          <p className="text-neutral-700 mb-2">
            When the user hovers, the cursor position is calculated relative to
            the button&apos;s bounds, and a new ripple element is inserted at
            that exact location:
          </p>
          <div className="my-4 rounded-md">
            <CodeBlock language="typescript" code={codeSnippetRipple} />
          </div>
          <p className="text-neutral-700">
            The ripple size is calculated based on the button dimensions to
            ensure it always covers the entire button. Each ripple is tracked in
            state and automatically removed after the animation completes.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mt-2 mb-1 text-neutral-700">
            Ripple Animation CSS
          </h3>
          <p className="text-neutral-700 mb-2">
            The ripple animation scales the element from 0 to 4x its size while
            fading it out, creating a smooth, water-like expansion:
          </p>
          <CodeBlock language="css" code={codeSnippetRippleCSS} />
          <p className="text-neutral-700 mt-2">
            The animation is applied using Tailwind&apos;s custom animation
            utilities. The pointer-events: none class ensures ripples don&apos;t
            interfere with button interactions.
          </p>
        </div>
        <div className="mt-6">
          <h3 className="font-semibold mb-2 text-neutral-700">Key Features</h3>
          <ul className="list-disc list-inside text-neutral-700 space-y-1">
            <li>
              Hover-triggered ripple effects for subtle, playful interaction
            </li>
            <li>Multiple overlapping ripples supported simultaneously</li>
            <li>Smooth color and scale transitions using Tailwind CSS</li>
            <li>Dynamic ripple sizing that adapts to button dimensions</li>
            <li>Clean state management with automatic ripple cleanup</li>
          </ul>
        </div>
        <SourceCodeButton componentName="RippleButton" hrefLink="https://github.com/prash240303/crafts/blob/main/src/components/RippleButton.tsx" />
      </div>
    </ComponentLayout>
  );
}

export default Page;