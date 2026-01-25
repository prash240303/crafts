"use client";
import { useState } from "react";

export const GradientIconGallery = ({ isActive }: { isActive: boolean }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="iconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#EEC693" />
        <stop offset="100%" stopColor="#EADA63" />
      </linearGradient>
    </defs>
    <path
      d="M3 6.66667C3 5.19391 4.19391 4 5.66667 4H18.3333C19.8061 4 21 5.19391 21 6.66667V17.3333C21 18.8061 19.8061 20 18.3333 20H5.66667C4.19391 20 3 18.8061 3 17.3333V6.66667ZM5.66667 5.33333C4.93029 5.33333 4.33333 5.93029 4.33333 6.66667V17.3333C4.33333 18.0697 4.93029 18.6667 5.66667 18.6667H18.3333C19.0697 18.6667 19.6667 18.0697 19.6667 17.3333V6.66667C19.6667 5.93029 19.0697 5.33333 18.3333 5.33333H5.66667ZM10.3333 9.33333C10.3333 8.78105 10.7811 8.33333 11.3333 8.33333H16.6667C17.219 8.33333 17.6667 8.78105 17.6667 9.33333C17.6667 9.88562 17.219 10.3333 16.6667 10.3333H11.3333C10.7811 10.3333 10.3333 9.88562 10.3333 9.33333ZM10.3333 13.3333C10.3333 12.7811 10.7811 12.3333 11.3333 12.3333H16.6667C17.219 12.3333 17.6667 12.7811 17.6667 13.3333C17.6667 13.8856 17.219 14.3333 16.6667 14.3333H11.3333C10.7811 14.3333 10.3333 13.8856 10.3333 13.3333ZM6.33333 9.33333C6.33333 8.78105 6.78105 8.33333 7.33333 8.33333H8C8.55229 8.33333 9 8.78105 9 9.33333C9 9.88562 8.55229 10.3333 8 10.3333H7.33333C6.78105 10.3333 6.33333 9.88562 6.33333 9.33333ZM6.33333 13.3333C6.33333 12.7811 6.78105 12.3333 7.33333 12.3333H8C8.55229 12.3333 9 12.7811 9 13.3333C9 13.8856 8.55229 14.3333 8 14.3333H7.33333C6.78105 14.3333 6.33333 13.8856 6.33333 13.3333Z"
      fill={isActive ? "url(#iconGradient)" : "gray"} // Change fill color based on isActive
    />
  </svg>
);

export const GradientIconLayout = ({ isActive }: { isActive: boolean }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="iconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#EEC693" />
        <stop offset="100%" stopColor="#EADA63" />
      </linearGradient>
    </defs>
    <path
      d="M5.33333 4C4.59695 4 4 4.59695 4 5.33333V18.6667C4 19.403 4.59695 20 5.33333 20H18.6667C19.403 20 20 19.403 20 18.6667V5.33333C20 4.59695 19.403 4 18.6667 4H5.33333ZM5.33333 5.33333H8V18.6667H5.33333V5.33333ZM9.33333 5.33333H14.6667V18.6667H9.33333V5.33333ZM16 5.33333H18.6667V18.6667H16V5.33333Z"
      fill={isActive ? "url(#iconGradient)" : "gray"} // Change fill color based on isActive
    />
  </svg>
);

export default function TabSwitcher() {
  const [activeTab, setActiveTab] = useState<"gallery" | "kanban">("gallery");

  return (
    <div className="rounded-xl py-3 space-y-4 overflow-hidden w-fit">
      {/* Tabs */}
      <div className="relative bg-neutral-200 p-1 rounded-xl mx-auto flex w-fit">
        {/* Background Slide */}
        <div
          className={`absolute top-0 left-0 h-full w-1/2 rounded-xl bg-neutral-900 transition-transform duration-300 ease-in-out shadow-xs ${
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

        <button
          className={`relative flex items-center px-4 py-2 rounded-xl transition-all duration-200 z-10 ${
            activeTab === "gallery" ? "text-amber-400" : "text-gray-500"
          }`}
          onClick={() => setActiveTab("gallery")}
        >
          <GradientIconGallery isActive={activeTab === "gallery"} />
          <span className="font-medium ml-2">Gallery</span>
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

      {/* Tab Content */}
      <div className="p-4 bg-neutral-200 border border-gray-100 max-w-2xl rounded-lg text-sm text-gray-900 overflow-hidden">
        {/* Sliding track */}
        <div
          className={`flex w-full pr-4 gap-4 transition-transform duration-300 ease-in-out ${
            activeTab === "gallery" ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Gallery */}
          <div className="w-full mr-4 shrink-0">
            <h3 className="font-semibold mb-1">Gallery View</h3>
            <p>
              Display content in a visual grid layout, perfect for images,
              cards, or previews.
            </p>
          </div>

          {/* Kanban */}
          <div className="w-full mr-4 shrink-0">
            <h3 className="font-semibold mb-1">Kanban View</h3>
            <p>
              Organize items into columns for workflows, tasks, or project
              management.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
