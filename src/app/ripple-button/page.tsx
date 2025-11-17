import ComponentLayout from "@/components/Layout/ComponentLayout";
import RippleButton from "@/components/RippleButton";

function page() {
    return (
        <ComponentLayout
            title="Tab Switcher Component"
            description="A versatile tab switcher component for seamless navigation."
        >
            <RippleButton>
                Click me
            </RippleButton>
        </ComponentLayout>
    );
}

export default page;
