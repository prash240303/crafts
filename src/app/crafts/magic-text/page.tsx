"use client";
import ComponentLayout from "@/components/layout/ComponentLayout";
import MagicText from "@/components/ui/GlowyStarryText";
import CodeBlock from "@/components/layout/CodeBlock";
import SourceCodeButton from "@/components/ui/sourceCodeButton";

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
      <div className="bg-white rounded-xl shadow-xs mb-8">
        <MagicText />
      </div>

      <div className="text-base mt-8 text-neutral-700">
        The Magic Text component is a playful typography experiment designed to
        bring a bit of motion and delight into static text. The highlighted
        phrase animates with a shifting gradient, while small star icons float,
        spin, and reposition around it—creating a subtle {"magic"} effect
        without overwhelming the layout.
        <div className="mt-4">
          Because it relies on animation timing and direct DOM access, the
          component runs on the client using {"use client"}.
        </div>
        <div className="mt-6">
          <h3 className="font-semibold mt-2 mb-1 text-neutral-700">
            Animated Gradient Text
          </h3>
          <p className="text-neutral-700 mb-2">
            The highlighted words use a moving gradient that continuously pans
            across the text:
          </p>
          <div className="my-4 rounded-md">
            <CodeBlock language="javascript" code={codeSnippetGradient} />
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
            The stars are animated using a combination of CSS keyframes and
            JavaScript positioning. On an interval, each star is randomly
            repositioned using CSS variables:
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
            The animation is initialized inside a useEffect hook so it only runs
            on the client:
          </p>
          <div className="my-4 rounded-md">
            <CodeBlock language="javascript" code={codeSnippetUseEffect} />
          </div>
          <p className="text-neutral-700">
            This keeps the JSX clean while allowing fine-grained control over
            timing and motion.
          </p>
        </div>
        <SourceCodeButton
          componentName="GlowyStarryText"
          hrefLink="https://github.com/prash240303/crafts/blob/main/src/components/GlowyStarryText.tsx"
        />
      </div>
    </ComponentLayout>
  );
}

export default Page;
