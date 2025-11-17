"use client";
import { ArrowRight } from "lucide-react";
import React from "react";
import { useRouter } from "next/navigation";

export default function ComponentLinks() {
  const componentLinks = [
    { name: "Arrow Button", path: "/arrow-button", description: "A button with an arrow icon." },
    { name: "Magic Text", path: "/magic-text", description: "A text component with magical effects." },
    { name: "Tab Switcher", path: "/tab-switcher", description: "A component for switching between tabs." },
    { name: "Tags Component", path: "/tags-component", description: "A component for displaying tags." },
    { name: "Zip Code Checker", path: "/zip-code-checker", description: "A component for checking zip codes." },
    { name: "Custom Cards", path: "/custom-cards", description: "A component for displaying custom cards." },
    { name: "Ripple button", path: "/ripple-button", description: "Button with ripple effect on hover" }
  ];
  const router = useRouter();

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white min-h-screen">
      <div className="flex flex-col gap-4 items-start justify-between mb-8">
        <div className="text-3xl font-bold text-left text-gray-900">Crafts</div>
        <div>
          {" "}
          Hi, I&apos;m Prashant. I&apos;m a frontend-stack engineer from India.
        </div>
      </div>
      <div className="border-t-2 border-gray-900 pt-6">
        <div className="space-y-6">
          {componentLinks.map((link) => (
            <div key={link.path} onClick={() => { router.push(link.path) }} className="flex rounded-md group hover:cursor-pointer hover:bg-blue-50 py-3 px-5 items-start">
              <div className="flex-1">
                <div
                  className="text-gray-900 transition-colors duration-200 font-medium"
                >
                  {link.name}
                </div>
                <div className="text-neutral-500 border-dotted border-gray-300 mt-2">
                  {link.description || "No description available."}
                </div>
              </div>
              <div className="text-gray-500 my-auto text-sm">
                <ArrowRight className="inline-block mr-1 transition-all duration-150 ease-in-out text-neutral-500 group-hover:text-blue-500 -rotate-45 group-hover:rotate-0" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
