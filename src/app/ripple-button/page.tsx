import ComponentLayout from "@/components/Layout/ComponentLayout";
import RippleButton from "@/components/RippleButton";

function page() {
    return (
        <ComponentLayout
            title="Ripple Button"
            description="Hover over it!"
        >
            <RippleButton>
                Click me
            </RippleButton>
        </ComponentLayout>
    );
}

export default page;
