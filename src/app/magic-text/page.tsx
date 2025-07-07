import MagicText from "@/components/GlowyStarryText";
import ComponentLayout from "@/components/Layout/ComponentLayout";
import React from "react";

function page() {
  return (
    <ComponentLayout
      title="Magic Text Component"
      description="A beautiful glowing text component with starry effects and smooth animations. Perfect for hero sections and attention-grabbing headlines."
    >
      <MagicText />
    </ComponentLayout>
  );
}

export default page;
