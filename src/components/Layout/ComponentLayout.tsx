"use client";
import type { ReactNode } from "react";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";
import { useParams, useRouter, usePathname } from "next/navigation";
import Link from "next/link";

interface LayoutProps {
  title: string;
  description: string;
  children: ReactNode;
}

export default function ComponentLayout({
  title = "Component Name",
  description = "Component description goes here",
  children,
}: LayoutProps) {
  const pathname = usePathname();
  console.log("Current path:", pathname);

  const projects = [
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
  ];

  const currIdx = projects.findIndex((item) => item.path === pathname);
  const leftIdx = currIdx === 0 ? projects.length - 1 : currIdx - 1;
  const rightIdx = currIdx === projects.length - 1 ? 0 : currIdx + 1;

  console.log("left ad right", leftIdx, rightIdx);

  return (
    <div className="min-h-screen md:mx-auto mx-4 flex flex-col items-start max-w-3xl gap-8 py-12">
      {/* Header */}
      <div className="">
        <div className="flex items-center gap-6 mb-6">
          <a
            href="/crafts"
            className="group flex items-center gap-2 text-gray-500 hover:text-black transition-all duration-300 text-sm py-2"
          >
            <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            back
          </a>
        </div>
        <div className="flex flex-col items-start justify-start gap-3">
          <div className="text-3xl font-bold text-gray-900 tracking-tight m-0 p-0">
            {title}
          </div>
          <p className="text-gray-600 text-base max-w-5xl leading-relaxed font-normal m-0 p-0">
            {description}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="">{children}</main>

      {/* Footer */}
      <footer className="mt-auto w-full">
        <div className="w-full border-[0.5px] border-t border-b-0 border-dashed border-neutral-500 h-px" />
        <div className="flex w-full text-sm mt-3 flex-row justify-between items-center gap-4">
          <Link
            href={projects[leftIdx].path}
            className="flex flex-col gap-1 items-start justify-center"
          >
            <span className="text-neutral-600 text-xs">Previous</span>
            <span className="font-medium">{projects[leftIdx].name}</span>
          </Link>
          <Link
            href={projects[rightIdx].path}
            className="flex flex-col gap-1 items-end justify-center"
          >
            <span className="text-neutral-600 text-xs">Next</span>
            <span className="font-medium">{projects[rightIdx].name}</span>
          </Link>
        </div>
      </footer>
    </div>
  );
}
