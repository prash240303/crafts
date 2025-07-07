import React from "react";
import { BookOpen, Mic } from "lucide-react";
import { cn } from "../../lib/utils";

interface Props {
  bgOuter: string;
  bgInner: string;
  content: string;
  icon: any;
  title: string;
  desc: string;
  badgeText: string;
  badgeColor: string;
  time: string;
}

function Card({
  bgOuter,
  bgInner,
  icon,
  title,
  desc,
  badgeText,
  badgeColor,
  time,
}: Props) {
  return (
    <div
      className={cn(
        "flex p-2 rounded-3xl shadow-xl transition-all duration-300",
        bgOuter
      )}
    >
      <div
        className={cn(
          "relative p-6 rounded-2xl shadow-lg shadow-black/30 outline-1 outline-dashed outline-white/30 flex flex-col justify-between",
          bgInner
        )}
      >
        {icon}

        <div>
          <h2 className="text-lg max-w-sm mt-4 geist-bold font-bold text-white">
            {title}
          </h2>
          <p className="text-sm max-w-md geist-light text-white mt-2 mb-8">
            {desc}
          </p>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 bg-black border-2 rounded-lg flex items-center justify-center shadow-md"
              style={{ borderColor: badgeColor }}
            >
              <span className="text-green-400 font-bold text-xs">N</span>
            </div>
            <span className="text-sm text-white/80">{badgeText}</span>
          </div>
          <span className="text-sm text-white/80">{time}</span>
        </div>
      </div>
    </div>
  );
}

const cardsData = [
  {
    bgOuter: "bg-[#6D4AFF] shadow-indigo-500/50",
    bgInner: "bg-purpleCardBG",
    content: "",
    icon: <BookOpen className="w-5 h-5 text-white/80" />,
    title: "Authenticate Neon Postgres application users with Clerk",
    desc: "Learn how to add authentication to a Neon Postgres database application using Clerk",
    badgeText: "Neon",
    badgeColor: "#8876EC",
    time: "16 mins",
  },
  {
    bgOuter: "bg-blackCardBG shadow-gray-800/50",
    bgInner: "bg-[#292929] shadow-inner",
    content: "",
    icon: <Mic className="w-5 h-5 text-white/80" />,
    title: "Building Jam: How Clerk Builds Product",
    desc: "Today, Colin Sidoti, CEO at Clerk, joins us to talk about how they build product",
    badgeText: "JAM",
    badgeColor: "#121212",
    time: "32 mins",
  },
];

function CustomCards() {
  return (
    <div className="flex mx-auto w-full items-center justify-center gap-4">
      {cardsData.map((card, index) => (
        <Card key={index} {...card} />
      ))}
    </div>
  );
}

export default CustomCards;
