"use client";
import { useState } from "react";
import {
  GradientIconGallery,
  GradientIconLayout,
} from "../../public/GradientIcon";

export default function TabSwitcher() {
  const [activeTab, setActiveTab] = useState<"gallery" | "kanban">("gallery");

  return (
    <div className="rounded-xl py-3 space-y-4 overflow-hidden w-fit">
      {/* Tabs */}
      <div className="relative bg-neutral-200 p-1 rounded-xl mx-auto flex w-fit">
        {/* Background Slide */}
        <div
          className={`absolute top-0 left-0 h-full w-1/2 rounded-xl bg-neutral-900 transition-transform duration-300 ease-in-out shadow-sm ${activeTab === "gallery" ? "translate-x-0" : "translate-x-full"
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

        <button
          className={`relative flex items-center px-4 py-2 rounded-xl transition-all duration-200 z-10 ${activeTab === "gallery" ? "text-amber-400" : "text-gray-500"
            }`}
          onClick={() => setActiveTab("gallery")}
        >
          <GradientIconGallery isActive={activeTab === "gallery"} />
          <span className="font-medium ml-2">Gallery</span>
        </button>

        <button
          className={`relative flex items-center px-4 py-2 rounded-xl transition-all duration-200 z-10 ${activeTab === "kanban" ? "text-amber-400" : "text-gray-500"
            }`}
          onClick={() => setActiveTab("kanban")}
        >
          <GradientIconLayout isActive={activeTab === "kanban"} />
          <span className="font-medium ml-2">Kanban</span>
        </button>
      </div>

      {/* Tab Content */}
      <div className="p-4 bg-neutral-200 border border-gray-100 max-w-2xl rounded-lg text-sm text-gray-900 overflow-hidden">
        {/* Sliding track */}
        <div
          className={`flex w-full pr-4 gap-4 transition-transform duration-300 ease-in-out ${activeTab === "gallery" ? "translate-x-0" : "-translate-x-full"
            }`}
        >
          {/* Gallery */}
          <div className="w-full mr-4 shrink-0">
            <h3 className="font-semibold mb-1">Gallery View</h3>
            <p>
              Display content in a visual grid layout, perfect for images, cards, or previews.
            </p>
          </div>

          {/* Kanban */}
          <div className="w-full mr-4 shrink-0">
            <h3 className="font-semibold mb-1">Kanban View</h3>
            <p>
              Organize items into columns for workflows, tasks, or project management.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
