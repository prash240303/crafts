import type { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
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
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex items-center gap-6 mb-6">
            <a
              href="/"
              className="group flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-all duration-300 font-mono text-sm font-medium px-3 py-2 rounded-lg hover:bg-blue-50"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              BACK
            </a>
          </div>
          <div className="flex flex-col items-start justify-start gap-3">
            <div className="text-3xl font-bold text-gray-900 font-mono tracking-tight m-0 p-0">
              {title}
            </div>
            <p className="text-gray-600 text-base max-w-5xl leading-relaxed font-normal font-mono m-0 p-0">
              {description}
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-6 py-12">
        <div className=" mx-auto">
            {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm border-t border-gray-200 mt-auto">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              <p className="text-gray-700 font-mono text-sm font-medium">
                BUILT BY{" "}
                <Link href="https://x.com/prash2403" className="font-bold hover:underline  text-gray-900">
                  PRASHANT
                </Link>
              </p>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/prash240303"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-all duration-300 font-mono text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-50 border border-transparent hover:border-blue-200"
              >
                GITHUB
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
