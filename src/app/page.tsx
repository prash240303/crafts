import ArrowButton from "@/components/ArrowButton";
import MagicText from "@/components/GlowyStarryText";
import TagsComponent from "@/components/TagsComponent";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-12 p-24">
      <ArrowButton/>
      <TagsComponent 
        type="default"
        content="hellow"
        isFilled={true}
        isBordered={false}
        trailingIcon=""
        leadingIcon=""
        color="Red"
        // Add any other missing properties here
      />
      <MagicText/>
    </main>
  );
}
