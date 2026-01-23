"use client";
import React, { useState, useRef } from "react";
import { Instrument_Serif } from "next/font/google";
import { useRouter } from "next/navigation";
import Image from "next/image";

type ItemType =
  | "image"
  | "text"
  | "text2"
  | "dots"
  | "icon"
  | "hero"
  | "plus"
  | "button";

interface GridItem {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  type: ItemType;
  src?: string;
  text?: string;
}

interface DraggingState {
  id: string;
  startX: number;
  startY: number;
  startGridX: number;
  startGridY: number;
  offsetX: number;
  offsetY: number;
}

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
});

const DesktopUI: React.FC = () => {
  const cols = 16;
  const rows = 16;

  const [items, setItems] = useState<GridItem[]>([
    {
      id: "img1",
      x: 1,
      y: 1,
      w: 2,
      h: 5,
      type: "image",
      src: "/home/sculpture.jpg",
    },
    {
      id: "text1",
      x: 12,
      y: 1,
      w: 3,
      h: 2,
      type: "text",
      text: "MINIMALISM, FOR EG, WAS ALL ABOUT CLARITY AND PURPOSE. INSTEAD, WE'VE COMPROMISED IT. NOW IT FEELS MANUFACTURED.",
    },
    {
      //hero top left
      id: "img3",
      x: 4,
      y: 3,
      w: 1,
      h: 2,
      type: "image",
      src: "/home/Frame2.png",
    },
    {
      id: "hero",
      x: 5,
      y: 6,
      w: 7,
      h: 2,
      type: "hero",
    },
    {
      //hero bottom left
      id: "img4",
      x: 4,
      y: 9,
      w: 2,
      h: 2,
      type: "image",
      src: "/home/Frame1.png",
    },
    {
      // hero top right
      id: "img5",
      x: 10,
      y: 3,
      w: 2,
      h: 1,
      type: "image",
      src: "/home/Frame3.png",
    },
    {
      //hero bottom right
      id: "img7",
      x: 10.5,
      y: 9,
      w: 1.5,
      h: 2,
      type: "image",
      src: "/home/Frame4.png",
    },
    {
      id: "img8",
      x: 1,
      y: 13,
      w: 3,
      h: 2,
      type: "image",
      src: "/home/chair.jpg",
    },
    {
      id: "img9",
      x: 12,
      y: 13,
      w: 3,
      h: 2,
      type: "image",
      src: "/home/bridge.jpg",
    },
    {
      id: "icon2",
      x: 14.7,
      y: 14.5,
      w: 1,
      h: 1,
      type: "icon",
    },
    {
      id: "text2",
      x: 4,
      y: 13,
      w: 2,
      h: 2,
      type: "text2",
      text: "FULFILLING UTILITY IS ONE THING. ACHIEVING IT WITH BEAUTY IS ANOTHER.",
    },
    { id: "plus1", x: 11, y: 3, w: 1, h: 1, type: "plus" },
    { id: "plus2", x: 11, y: 11, w: 1, h: 1, type: "plus" },
    { id: "plus3", x: 3, y: 11, w: 1, h: 1, type: "plus" },
    { id: "plus4", x: 7, y: 11, w: 1, h: 1, type: "plus" },
    { id: "plus5", x: 7, y: 3, w: 1, h: 1, type: "plus" },
    { id: "plus6", x: 3, y: 3, w: 1, h: 1, type: "plus" },
    { id: "plus7", x: 0, y: 11, w: 1, h: 1, type: "plus" },
    { id: "plus8", x: 14, y: 11, w: 1, h: 1, type: "plus" },
    { id: "plus9", x: 14, y: 3, w: 1, h: 1, type: "plus" },
    { id: "CTA", x: 7, y: 9, w: 2, h: 1, type: "button" },
  ]);

  const [dragging, setDragging] = useState<DraggingState | null>(null);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
    if (e.button !== 0) return;

    const container = containerRef.current?.getBoundingClientRect();
    if (!container) return;

    const item = items.find((i) => i.id === id);
    if (!item) return;

    const startX = e.clientX;
    const startY = e.clientY;

    // Calculate where the mouse is relative to the item's top-left corner
    const itemLeft = (item.x / cols) * container.width;
    const itemTop = (item.y / rows) * container.height;
    const offsetX = startX - container.left - itemLeft;
    const offsetY = startY - container.top - itemTop;

    setDragging({
      id,
      startX,
      startY,
      startGridX: item.x,
      startGridY: item.y,
      offsetX,
      offsetY,
    });
    setDragOffset({ x: 0, y: 0 });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!dragging) return;

    const container = containerRef.current?.getBoundingClientRect();
    if (!container) return;

    const deltaX = e.clientX - dragging.startX;
    const deltaY = e.clientY - dragging.startY;

    setDragOffset({ x: deltaX, y: deltaY });
  };

  const handleMouseUp = () => {
    if (!dragging) return;

    const container = containerRef.current?.getBoundingClientRect();
    if (!container) return;

    const colWidth = container.width / cols;
    const rowHeight = container.height / rows;

    const gridDeltaX = Math.round(dragOffset.x / colWidth);
    const gridDeltaY = Math.round(dragOffset.y / rowHeight);

    const item = items.find((i) => i.id === dragging.id);
    if (!item) return;

    const newX = Math.max(
      0,
      Math.min(cols - item.w, dragging.startGridX + gridDeltaX),
    );
    const newY = Math.max(
      0,
      Math.min(rows - item.h, dragging.startGridY + gridDeltaY),
    );

    setItems((prev) =>
      prev.map((i) => (i.id === dragging.id ? { ...i, x: newX, y: newY } : i)),
    );

    setDragging(null);
    setDragOffset({ x: 0, y: 0 });
  };

  const renderContent = (item: GridItem) => {
    switch (item.type) {
      case "image":
        return (
          <div className="border border-red-400 w-full h-full">
            <Image
              src={item.src || "/home/sculpture.jpg"}
              alt="image"
              className="object-cover"
              fill
              sizes={`(max-width: 768px) 100vw, ${(item.w / cols) * 100}vw`}
            />
          </div>
        );

      case "text":
        return (
          <div className="p-2 bg-white border flex items-start h-full">
            <p className="text-xs font-medium leading-tight uppercase tracking-tight">
              {item.text}
            </p>
          </div>
        );

      case "text2":
        return (
          <div className="px-2 flex flex-col items-start h-full">
            <div className="flex w-full justify-between items-start">
              <span className="text-2xl font-bold">*</span>
              <span className="text-2xl font-bold">• • •</span>
            </div>
            <p className="text-xs md:text-xs font-medium">{item.text}</p>
          </div>
        );

      case "dots":
        return (
          <div className="flex items-center justify-center h-full">
            <span className="text-2xl">• • •</span>
          </div>
        );

      case "plus":
        return (
          <svg
            className="absolute scale-125 -top-3 -right-3 w-6 h-6 text-gray-700"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        );
      case "button":
        return (
          <div
            onClick={() => router.push("/crafts")}
            className={`flex ${instrumentSerif.className} bg-white italic text-xl  border-2 border-black items-center justify-center w-full h-full hover:bg-black hover:text-white transition-colors duration-300 cursor-pointer `}
          >
            <span className="font-bold">Explore Crafts</span>
          </div>
        );
      case "icon":
        return (
          <div className="flex items-center justify-center h-full">
            <span className="text-4xl font-bold">*</span>
          </div>
        );

      case "hero":
        return (
          <div
            className={`h-full ${instrumentSerif.className} relative p-0 m-0 w-full`}
          >
            <p className="text-3xl text-center border h-full w-full bg-white py-1 font-light leading-tight">
              We&apos;ve gotten so stuck in{" "}
              <span className="font-bold italic">optimising for function</span>{" "}
              that we&apos;ve{" "}
              <span className="font-bold">
                forgotten to be <span className="italic">creative</span>{" "}
              </span>
              .
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="bg-white h-screen w-screen overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div
        ref={containerRef}
        className="w-full h-full relative"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, #e5e5e5 0px, #e5e5e5 1px, transparent 1px, transparent calc(100% / ${
              cols * 0.01
            })),
            repeating-linear-gradient(90deg, #e5e5e5 0px, #e5e5e5 1px, transparent 1px, transparent calc(100% / ${
              rows * 0.12
            }))
          `,
          backgroundSize: `calc(100% / ${cols}) calc(100% / ${rows})`,
        }}
      >
        {items.map((item) => {
          const isDragging = dragging?.id === item.id;
          const container = containerRef.current?.getBoundingClientRect();

          let left = (item.x / cols) * 100;
          let top = (item.y / rows) * 100;

          if (isDragging && container) {
            left =
              (((item.x / cols) * container.width + dragOffset.x) /
                container.width) *
              100;
            top =
              (((item.y / rows) * container.height + dragOffset.y) /
                container.height) *
              100;
          }

          return (
            <div
              key={item.id}
              onMouseDown={(e) => handleMouseDown(e, item.id)}
              style={{
                position: "absolute",
                left: `${left}%`,
                top: `${top}%`,
                width: `${(item.w / cols) * 100}%`,
                height: `${(item.h / rows) * 100}%`,
                cursor: isDragging ? "grabbing" : "grab",
                transition: isDragging
                  ? "none"
                  : "left 0.2s ease, top 0.2s ease",
                zIndex: isDragging ? 1000 : 1,
              }}
            >
              {renderContent(item)}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DesktopUI;
