import ArrowButton from "@/components/ArrowButton";
import MagicText from "@/components/GlowyStarryText";
import Heading from "@/components/Heading";
import TabSwitcher from "@/components/Switcher";
import TagsComponent from "@/components/TagsComponent";
import UseStateExample from "@/components/UseState";
import ZipCodeChecker from "@/components/ZipCodeChecker";

export default function Home() {
  return (
    <main className="flex min-h-screen  items-center justify-center gap-4 p-24">
      {/* <ArrowButton/> */}
      {/* <Heading/> */}
      {/* <MagicText/>  */}
      {/* <TabSwitcher/> */}
      <ZipCodeChecker/>
    </main>
  );
}
