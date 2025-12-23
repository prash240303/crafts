"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Inter, Instrument_Serif } from "next/font/google";
import { cn } from "../../lib/utils";

type Project = {
  id: number;
  name: string;
  path: string;
  vid: string;
  description: string;
  type: string;
  height: string;
};

const inter = Inter({
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
});

const PortfolioGrid = () => {
  const router = useRouter();
  const [projects] = useState([
    {
      id: 1,
      name: "Arrow Button",
      path: "/arrow-button",
      vid: "/craft-preview/base.mp4",
      description: "A button with an arrow icon.",
      type: "arrow-button",
      height: "h-72",
    },
    {
      id: 2,
      name: "Magic Text",
      path: "/magic-text",
      vid: "/craft-preview/base.mp4",
      description: "A text component with magical effects.",
      type: "magic-text",
      height: "h-80",
    },
    {
      id: 3,
      name: "Tab Switcher",
      path: "/tab-switcher",
      vid: "/craft-preview/base.mp4",
      description: "A component for switching between tabs.",
      type: "tab-switcher",
      height: "h-96",
    },
    {
      id: 4,
      name: "Tags Component",
      path: "/tags-component",
      vid: "/craft-preview/base.mp4",
      description: "A component for displaying tags.",
      type: "tags",
      height: "h-64",
    },
    {
      id: 5,
      name: "Zip Code Checker",
      path: "/zip-code-checker",
      vid: "/craft-preview/base.mp4",
      description: "A component for checking zip codes.",
      type: "zip-code",
      height: "h-80",
    },
    {
      id: 6,
      name: "Custom Cards",
      path: "/custom-cards",
      vid: "/craft-preview/base.mp4",
      description: "A component for displaying custom cards.",
      type: "custom-cards",
      height: "h-96",
    },
    {
      id: 7,
      name: "Ripple button",
      path: "/ripple-button",
      vid: "/craft-preview/base.mp4",
      description: "Button with ripple effect on hover",
      type: "ripple-button",
      height: "h-72",
    },
    {
      id: 8,
      name: "Aadhar Card",
      path: "/aadhar-card",
      vid: "/craft-preview/base.mp4",
      description: "A component for displaying aadhar card",
      type: "aadhar-card",
      height: "h-[420px]",
    },
  ]);

  const renderContent = (vid: string) => {
    return (
      <video
        src={vid}
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover rounded-lg"
      />
    );
  };

  const handleCardClick = (path: string) => {
    console.log(`Navigating to: ${path}`);
    router.push(path);
  };

  // Split projects into 3 equal columns
  const itemsPerColumn = Math.ceil(projects.length / 3);
  const column1 = projects.slice(0, itemsPerColumn);
  const column2 = projects.slice(itemsPerColumn, itemsPerColumn * 2);
  const column3 = projects.slice(itemsPerColumn * 2);

  const renderColumn = (columnProjects: Project[]) => (
    <div className={cn("flex flex-col gap-2", inter.className)}>
      {columnProjects.map((project) => (
        <div
          key={project.id}
          onClick={() => handleCardClick(project.path)}
          className={`bg-white border border-zinc-300 rounded-2xl p-1 hover:border-zinc-400 hover:scale-[101%] hover:shadow-2xl transition-all ease-in duration-400 cursor-pointer flex flex-col ${project.height}`}
        >
          {/* Video Container */}
          <div className="bg-black relative rounded-xl h-full overflow-hidden">
            {renderContent(project.vid)}

            {/* Card Footer */}
            <div className="space-y-1 absolute bottom-4 left-3 px-2">
              <div className="text-white text-lg font-medium">
                {project.name}
              </div>
              <div className="text-gray-500 text-sm">{project.description}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen p-10">
      <div className="max-w-5xl space-y-8 mx-auto">
        <div
          className={`flex gap-2 items-center justify-center text-2xl ${instrumentSerif.className}`}
        >
          <span>A</span>
          <span className="italic">collection</span>
          <span>of Digital Crafts</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {renderColumn(column1)}
          {renderColumn(column2)}
          {renderColumn(column3)}
        </div>
      </div>
    </div>
  );
};

export default PortfolioGrid;
