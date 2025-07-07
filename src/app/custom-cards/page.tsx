import CustomCards from "@/components/cards";
import ComponentLayout from "@/components/Layout/ComponentLayout";
import React from "react";

function page() {
  return (
    <ComponentLayout
      title="Custom Cards Component"
      description="A beautiful and customizable card component for displaying content"
    >
      <CustomCards />
    </ComponentLayout>
  );
}

export default page;
