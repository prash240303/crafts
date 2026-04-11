"use client";
import DockUI from "@/components/ui/Dock";
import Image from "next/image";
import { useState } from "react";

const BG_OPTIONS = [
  { id: "sonoma", src: "/bg/bg-sonoma.jpeg", label: "Sonoma" },
  { id: "forest", src: "/bg/bg-forest.jpg", label: "Forest" },
  { id: "city", src: "/bg/bg-city.jpg", label: "City" },
  { id: "tahoe", src: "/bg/bg-tahoe.jpg", label: "Tahoe" },
];

export default function Dock() {
  const [activeBg, setActiveBg] = useState(BG_OPTIONS[0]);
  const [open, setOpen] = useState(false);

  return (
    <main className="w-full h-screen flex items-center justify-center overflow-hidden">
      <DockUI>
        <Image className="w-16 h-18" src="/dock_icons/App.svg" alt="" width={2000} height={2000} />
        <Image className="w-16 h-16" src="/dock_icons/App-1.svg" alt="" width={2000} height={2000} />
        <Image className="w-16 h-18" src="/dock_icons/App-2.svg" alt="" width={2000} height={2000} />
        <Image className="w-16 h-16" src="/dock_icons/App-3.svg" alt="" width={2000} height={2000} />
        <Image className="w-16 h-18" src="/dock_icons/App-4.svg" alt="" width={2000} height={2000} />
        <Image className="w-16 h-18" src="/dock_icons/App-5.svg" alt="" width={2000} height={2000} />
        <Image className="w-16 h-18" src="/dock_icons/App-6.svg" alt="" width={2000} height={2000} />
        <Image className="w-16 h-18" src="/dock_icons/App-7.svg" alt="" width={2000} height={2000} />
        <Image className="w-16 h-18" src="/dock_icons/App-8.svg" alt="" width={2000} height={2000} />
        <Image className="w-16 h-18" src="/dock_icons/App-9.svg" alt="" width={2000} height={2000} />
        <Image className="w-16 h-18" src="/dock_icons/App-10.svg" alt="" width={2000} height={2000} />
      </DockUI>

      {/* Background switcher */}
      <div className="fixed bottom-6 right-6 z-20 flex flex-col items-end gap-2">
        {/* Options panel */}
        <div
          className={`flex flex-col gap-2 transition-all duration-300 origin-bottom-right ${
            open ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-90 pointer-events-none"
          }`}
        >
          {BG_OPTIONS.map((bg) => (
            <button
              key={bg.id}
              onClick={() => {
                setActiveBg(bg);
                setOpen(false);
              }}
              className={`flex items-center gap-2.5 px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-md border transition-all duration-200 ${
                activeBg.id === bg.id
                  ? "bg-white/30 border-white/60 text-white shadow-lg"
                  : "bg-black/25 border-white/15 text-white/70 hover:bg-white/20 hover:text-white"
              }`}
            >
              {/* Thumbnail */}
              <span className="w-6 h-6 rounded-full overflow-hidden border border-white/20 flex-shrink-0 relative">
                <Image src={bg.src} alt={bg.label} fill className="object-cover" />
              </span>
              {bg.label}
              {activeBg.id === bg.id && (
                <span className="w-1.5 h-1.5 rounded-full bg-white ml-0.5" />
              )}
            </button>
          ))}
        </div>

        {/* Toggle button */}
        <button
          onClick={() => setOpen((o) => !o)}
          className="w-9 h-9 rounded-full backdrop-blur-md bg-black/30 border border-white/20 text-white flex items-center justify-center shadow-lg hover:bg-white/20 transition-all duration-200"
          aria-label="Change background"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`transition-transform duration-300 ${open ? "rotate-45" : ""}`}
          >
            <circle cx="12" cy="12" r="3" />
            <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
          </svg>
        </button>
      </div>

      {/* Background image */}
      <Image
        key={activeBg.src}
        src={activeBg.src}
        alt=""
        width={20000}
        height={20000}
        className="w-screen h-screen absolute inset-0 z-0 object-cover transition-opacity duration-700"
      />
    </main>
  );
}