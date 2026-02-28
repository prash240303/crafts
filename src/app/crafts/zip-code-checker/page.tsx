"use client"
import ComponentLayout from "@/components/layout/ComponentLayout";
import ZipCodeChecker from "@/components/ui/ZipCodeChecker";
import CodeBlock from "@/components/layout/CodeBlock";
import SourceCodeButton from "@/components/ui/sourceCodeButton";

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
        I built this Zip Code Checker as a small UI experiment focused on
        interaction and polish. The idea was to make a simple input feel more
        engaging through layout, spacing, and subtle animation.
        <div className="mt-4">
          It&apos;s a client-side Next.js component using React state for the
          input and a DOM-based ripple effect for instant visual feedback when
          the button is clicked. The background image acts as both a design
          element and an interaction surface, keeping everything contained and
          clean.
        </div>
        <div className="mt-4">
          The inspiration came from modern SaaS landing pages that check
          availability by location—I wanted it to feel friendly, lightweight,
          and responsive, while still being easy to extend with real validation
          or API logic later.
        </div>
        <div className="mt-6">
          <h3 className="font-semibold mt-2 mb-1 text-neutral-700">
            Component Structure
          </h3>
          <p className="text-neutral-700">
            The component uses Next.js Image optimization for the background,
            React state for input management, and a ref to handle the ripple
            effect positioning:
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
            To create the ripple click effect, I use a DOM reference. This
            allows me to insert a temporary element exactly where the user
            clicks, without adding extra markup.
          </p>
          <p className="text-neutral-700 mb-2">
            When the Check Availability button is clicked, a ripple is created
            and positioned using the mouse coordinates and the container&apos;s
            bounds:
          </p>
          <div className="my-4 rounded-md">
            <CodeBlock language="typescript" code={codeSnippetRipple} />
          </div>
          <p className="text-neutral-700">
            The ripple element is dynamically created, positioned at the click
            coordinates relative to the container, and then removed after the
            animation completes.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mt-2 mb-1 text-neutral-700">
            Ripple Animation CSS
          </h3>
          <p className="text-neutral-700 mb-2">
            The ripple effect is achieved through CSS animations that scale and
            fade the element:
          </p>
          <CodeBlock language="css" code={codeSnippetRippleCSS} />
          <p className="text-neutral-700 mt-2">
            The animation scales the ripple from 0 to 4x its size while fading
            it out, creating a smooth, water-like expansion effect. The
            pointer-events: none ensures it doesn&apos;t interfere with other
            interactions.
          </p>
        </div>
        <div className="mt-6">
          <h3 className="font-semibold mb-2 text-neutral-700">Key Features</h3>
          <ul className="list-disc list-inside text-neutral-700 space-y-1">
            <li>Optimized background image using Next.js Image component</li>
            <li>Dynamic ripple effect triggered on button click</li>
            <li>Clean, centered layout with Tailwind CSS</li>
            <li>Responsive design that adapts to different screen sizes</li>
            <li>Easy to extend with real API validation logic</li>
          </ul>
        </div>
        <SourceCodeButton
          componentName="ZipCodeChecker"
          hrefLink="https://github.com/prash240303/crafts/blob/main/src/components/ZipCodeChecker.tsx"
        />
      </div>
    </ComponentLayout>
  );
}

export default page;
