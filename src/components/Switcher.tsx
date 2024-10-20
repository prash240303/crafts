"use client";
import { useState } from "react";
import {
  GradientIconGallery,
  GradientIconLayout,
} from "../../public/GradientIcon";

export default function TabSwitcher() {
  const [activeTab, setActiveTab] = useState("gallery");

  return (
    <div className="bg-[#fcf8f8] rounded-xl border border-gray-100 shadow-lg overflow-hidden w-fit">
      <div className="relative flex w-fit">
        {/* Background Slide */}
        <div
          className={`absolute top-0 left-0 h-full w-1/2 rounded-xl bg-neutral-900 transition-transform duration-300 ease-in-out shadow-sm ${
            activeTab === "gallery" ? "translate-x-0" : "translate-x-full"
          }`}
          style={{
            boxShadow: `
              inset 0 1px 3px rgba(255, 255, 255, 0.2),
              inset 0 -1px 3px rgba(0, 0, 0, 0.1),
              0 2px 6px rgba(0, 0, 0, 0.1),
              0 4px 12px rgba(0, 0, 0, 0.1)
            `,
          }}
        />

        {/* Buttons */}
        <button
          className={`relative flex items-center px-4 py-2 rounded-xl transition-all duration-200 z-10 ${
            activeTab === "gallery" ? "text-amber-400" : "text-gray-500"
          }`}
          onClick={() => setActiveTab("gallery")}
        >
          <GradientIconGallery isActive={activeTab === "gallery"} />
          <span className="font-medium ml-2">gallery</span>
        </button>
        <button
          className={`relative flex items-center px-4 py-2 rounded-xl transition-all duration-200 z-10 ${
            activeTab === "kanban" ? "text-amber-400" : "text-gray-500"
          }`}
          onClick={() => setActiveTab("kanban")}
        >
          <GradientIconLayout isActive={activeTab === "kanban"} />
          <span className="font-medium ml-2">Kanban</span>
        </button>
      </div>
    </div>
  );
}
