import ShaderMagnifier from "@/components/ui/Shader_Maginfier";

export default function Dock() {
  return (
    <main className="w-full h-screen flex items-end p-4 justify-center overflow-hidden relative">
      <ShaderMagnifier bgImage="/magnifier-bg.png" />
    </main>
  );
}
