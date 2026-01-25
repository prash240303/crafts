"use client";
import ComponentLayout from "@/components/layout/ComponentLayout";

function Page() {
  return (
    <ComponentLayout
      title="Expand Repel Card"
      description="A beautiful glowing text component with starry effects and smooth animations. Perfect for hero sections and attention-grabbing headlines."
    >
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
        </div>
      </div>
    </ComponentLayout>
  );
}

export default Page;
