"use client";
import TabSwitcher from "@/components/ui/Switcher";
import CodeBlock from "@/components/layoutComponents/CodeBlock";
import ComponentLayout from "@/components/layoutComponents/ComponentLayout";
import SourceCodeButton from "@/components/ui/sourceCodeButton";

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
      <div className="bg-neutral-50 mx-auto py-8 flex items-center justify-center rounded-xl shadow-md mb-8">
        <TabSwitcher />
      </div>

      <div className="text-base mt-8 text-neutral-700 space-y-6">
        <p>
          The Tab Switcher is a compact navigation component designed for
          smooth, visual tab transitions. Instead of switching content abruptly,
          the active tab slides into place with a soft background animation,
          making the interaction feel polished and intentional.
        </p>

        <p>
          The component runs on the client {"use client"} since it relies on
          state and animated transitions.
        </p>

        <div className="mt-6">
          <h3 className="font-semibold mt-2 mb-1 text-neutral-700">
            State-Driven Tab Control
          </h3>
          <p className="text-neutral-700 mb-2">
            The active tab is controlled using React state:
          </p>
          <div className="my-4 rounded-md">
            <CodeBlock language="javascript" code={codeSnippetState} />
          </div>
          <p className="text-neutral-700">
            This keeps the logic simple and makes it easy to add more tabs later
            or sync the state with routing.
          </p>
        </div>

        <div>
          <h3 className="font-semibold mt-2 mb-1 text-neutral-700">
            Sliding Background Animation
          </h3>
          <p className="text-neutral-700 mb-2">
            The highlight behind the active tab is a single element that slides
            horizontally based on the active state:
          </p>
          <div className="my-4 rounded-md">
            <CodeBlock language="javascript" code={codeSnippetSliding} />
          </div>
          <p className="text-neutral-700">
            Using transform instead of position changes keeps the animation
            smooth and performant.
          </p>
        </div>

        <div>
          <h3 className="font-semibold mt-2 mb-1 text-neutral-700">
            Icon Feedback
          </h3>
          <p className="text-neutral-700 mb-2">
            The icons respond to the active state, reinforcing which tab is
            selected:
          </p>
          <div className="my-4 rounded-md">
            <CodeBlock language="javascript" code={codeSnippetIconFeedback} />
          </div>
          <p className="text-neutral-700">
            This subtle feedback helps the component feel more responsive
            without adding extra animation noise.
          </p>
        </div>

        <SourceCodeButton
          componentName="TabSwitcher"
          hrefLink="https://github.com/prash240303/crafts/blob/main/src/components/Switcher.tsx"
        />
      </div>
    </ComponentLayout>
  );
}

export default Page;
