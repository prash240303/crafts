import ComponentLayout from "@/components/Layout/ComponentLayout";
import TabSwitcher from "@/components/Switcher";
import React from "react";

function page() {
  return (
    <ComponentLayout
      title="Tab Switcher Component"
      description="A versatile tab switcher component for seamless navigation."
    >
      <TabSwitcher />
    </ComponentLayout>
  );
}

export default page;
