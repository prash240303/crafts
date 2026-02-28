"use client";
import { useRouter } from "next/navigation";
import { Inter, Instrument_Serif } from "next/font/google";
import { cn } from "../../lib/utils";
import Link from "next/link";
import { Projects } from "../../data/projects";

type Project = {
  id: number;
  name: string;
  path: string;
  img?: string;
  vid?: string;
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
    router.push(path);
  };

  // Split projects into 3 equal columns
  const itemsPerColumn = Math.ceil(Projects.length / 3);
  const column1 = Projects.slice(0, itemsPerColumn);
  const column2 = Projects.slice(itemsPerColumn, itemsPerColumn * 2);
  const column3 = Projects.slice(itemsPerColumn * 2);

  const renderColumn = (columnProjects: Project[]) => (
    <div className={cn("flex flex-col gap-2", inter.className)}>
      {columnProjects.map((project) => (
        <div
          key={project.id}
          onClick={() => handleCardClick(project.path)}
          className={`bg-white rounded-xl border border-zinc-300 p-1 hover:border-zinc-400 hover:scale-[101%] hover:shadow-2xl transition-all ease-in duration-400 cursor-pointer flex flex-col ${project.height}`}
        >
          {/* Video Container */}
          <div className="border rounded-lg border-neutral-100 relative h-full overflow-hidden">
            {project.vid && renderContent(project.vid)}
            {project.img && (
              <img
                src={project.img || "/placeholder.svg"}
                alt={project.name}
                className="w-full h-full object-cover"
              />
            )}

            {/* Card Footer */}
            <div className="space-y-1 absolute w-full bottom-0 left-0 px-3 py-2 bg-white/60 backdrop-blur-md rounded-xl border border-white/20">
              <div className="text-neutral-800 text-lg font-medium">
                {project.name}
              </div>
              <div className="text-gray-600 text-sm">{project.description}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen relative">
      {/* Slanted lines background */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `repeating-linear-gradient(
        45deg,
        transparent,
        transparent 6px,
        rgba(0, 0, 0, 0.3) 6px,
        rgba(0, 0, 0, 0.3) 8px
      )`,
        }}
      />
      <div className="border-x fixed left-1/2 -translate-x-1/2 top-0 h-full w-screen max-w-5xl bg-white border-neutral-300"></div>

      {/* Content */}
      <div className="relative py-10 border-x border-neutral-300 space-y-8 mx-auto">
        <div className="w-full border-y border-neutral-300">
          <div
            className={`flex gap-2 max-w-5xl text-neutral-700 border-x border-neutral-300 mx-auto bg-white/60 backdrop-blur-md py-4 items-center justify-center md:text-4xl text-2xl ${instrumentSerif.className}`}
          >
            <span className="">A</span>
            <span className="italic font-bold ">collection</span>
            <span className="">of Digital Crafts</span>
          </div>
        </div>
        <div className="border w-full">
          <div className="grid md:grid-cols-3 grid-cols-1 border-x border-neutral-300 p-2 bg-white max-w-5xl  mx-auto gap-2">
            {renderColumn(column1)}
            {renderColumn(column2)}
            {renderColumn(column3)}
          </div>
        </div>
        <div
          className={`mt-2 border flex flex-col md:flex-row md:justify-between justify-center px-4 max-w-5xl ${instrumentSerif.className} py-4 mx-auto md:text-center`}
        >
          <span>Site Designed by myself</span>
          <Link target="_blank" href="https://portfolio-prash.vercel.app/about">
            About me
          </Link>
          <Link target="_blank" href="mailto:prash2402works@gmail.com">
            prash2402works@gmail.com
          </Link>
          <Link target="_blank" href="https://x.com/prash2403">
            Twitter
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PortfolioGrid;
