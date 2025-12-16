import type { ReactNode } from "react";
import { ChevronLeft } from "lucide-react";

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
  return (
    <div className="min-h-screen mx-auto flex flex-col items-start max-w-3xl gap-8 py-12">
      {/* Header */}
      <div className="">
        <div className="flex items-center gap-6 mb-6">
          <a
            href="/"
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
      <main className="">
        {children}
      </main>

      {/* Footer */}
      <footer className="mt-auto w-full">
        <div className="w-full border-[0.5px] border-t  border-b-0 border-dashed border-neutral-500 h-[1px]" />
          <div className="flex w-full flex-col sm:flex-row justify-between items-center gap-4">
            footer here
          </div>
      </footer>
    </div>
  );
}
