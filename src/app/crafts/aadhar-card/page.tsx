import ComponentLayout from "@/components/layout/ComponentLayout";
import React from "react";
import AadharCard from "./aadhar-card";

function AadharCardPage() {
  return (
    <ComponentLayout
      title="Reveal Card Component"
      description="A simple yet elegant reveal card component that can be used for displaying aadhar card."
    >
      <AadharCard />
    </ComponentLayout>
  );
}

export default AadharCardPage;
