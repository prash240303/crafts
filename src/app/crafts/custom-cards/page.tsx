import CustomCards from "@/components/ui/cards";
import ComponentLayout from "@/components/layoutComponents/ComponentLayout";

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
