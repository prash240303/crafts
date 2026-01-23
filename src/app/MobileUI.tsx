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

const MobileUI = () => {
  const cols = 8; // Fewer columns for mobile
  const rows = 20; // More rows for vertical scrolling

  const [items, setItems] = useState<GridItem[]>([
    {
      id: "hero",
      x: 0,
      y: 3.7,
      w: 8.2,
      h: 2.6,
      type: "hero",
    },

    {
      id: "img1",
      x: 0,
      y: 0,
      w: 4,
      h: 3.7,
      type: "image",
      src: "/home/sculpture.jpg",
    },

    {
      id: "text1",
      x: 0,
      y: 13.6,
      w: 8.2,
      h: 2.7,
      type: "text",
      text: "MINIMALISM, FOR EG, WAS ALL ABOUT CLARITY AND PURPOSE. INSTEAD, WE'VE COMPROMISED IT. NOW IT FEELS MANUFACTURED.",
    },

    //hero images
    {
      id: "img5",
      x: 4,
      y: 9.7,
      w: 3,
      h: 1.5,
      type: "image",
      src: "/home/Frame3.png",
    },
    {
      id: "img4",
      x: 1,
      y: 7.5,
      w: 2,
      h: 3.8,
      type: "image",
      src: "/home/Frame1.png",
    },
    {
      id: "img7",
      x: 5,
      y: 7.5,
      w: 2,
      h: 1.4,
      type: "image",
      src: "/home/Frame4.png",
    },

    {
      id: "img8",
      x: 3,
      y: 16.3,
      w: 5,
      h: 2,
      type: "image",
      src: "/home/chair.jpg",
    },
    {
      id: "CTA",
      x: 1,
      y: 8.7,
      w: 6,
      h: 1.3,
      type: "button",
    },
    {
      id: "icon2",
      x: 3.5,
      y: 38.5,
      w: 1,
      h: 1,
      type: "icon",
    },
    { id: "plus1", x: 0, y: 11.2, w: 1, h: 1, type: "plus" },
    { id: "plus2", x: 0, y: 7.5, w: 1, h: 1, type: "plus" },
    { id: "plus3", x: 6, y: 7.5, w: 1, h: 1, type: "plus" },
    { id: "plus4", x: 6, y: 11.2, w: 1, h: 1, type: "plus" },
  ]);

  const [dragging, setDragging] = useState<DraggingState | null>(null);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleTouchStart = (
    e: React.TouchEvent<HTMLDivElement>,
    id: string,
  ) => {
    const container = containerRef.current?.getBoundingClientRect();
    if (!container) return;

    const item = items.find((i) => i.id === id);
    if (!item) return;

    const touch = e.touches[0];
    const startX = touch.clientX;
    const startY = touch.clientY;

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

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
    if (e.button !== 0) return;

    const container = containerRef.current?.getBoundingClientRect();
    if (!container) return;

    const item = items.find((i) => i.id === id);
    if (!item) return;

    const startX = e.clientX;
    const startY = e.clientY;

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

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!dragging) return;

    const touch = e.touches[0];
    const deltaX = touch.clientX - dragging.startX;
    const deltaY = touch.clientY - dragging.startY;

    setDragOffset({ x: deltaX, y: deltaY });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!dragging) return;

    const deltaX = e.clientX - dragging.startX;
    const deltaY = e.clientY - dragging.startY;

    setDragOffset({ x: deltaX, y: deltaY });
  };

  const handleEnd = () => {
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
          <div className="p-4 bg-white border flex items-start h-full">
            <p className="text-base w-full pr-4 font-medium leading-tight uppercase tracking-tight">
              {item.text}
            </p>
          </div>
        );

      case "text2":
        return (
          <div className="p-4 bg-white border flex flex-col items-start justify-between h-full">
            <div className="flex w-full justify-between items-start">
              <span className="text-xl font-bold">*</span>
              <span className="text-xl font-bold">• • •</span>
            </div>
            <p className="text-sm font-medium leading-tight uppercase tracking-tight">
              {item.text}
            </p>
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
            className={`flex ${instrumentSerif.className} bg-white italic text-xl border-2 border-black items-center justify-center w-full h-full hover:bg-black hover:text-white transition-colors duration-300 cursor-pointer active:bg-black active:text-white`}
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
            <div className="text-2xl leading-tight justify-center border h-full w-full bg-white flex flex-wrap items-center px-3 py-2 font-light gap-x-1">
              <p>We&apos;ve gotten so stuck in</p>
              <p className="italic">optimising for function</p>
              <p>that we&apos;ve</p>
              <p className="font-bold">
                forgotten to be <span className="italic">creative.</span>
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div
      className="bg-white  overflow-hidden h-screen w-screen touch-none"
      onMouseMove={handleMouseMove}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleEnd}
    >
      <div
        ref={containerRef}
        className="w-full relative"
        style={{
          height: `${rows * 50}px`, // Each row is 40px on mobile for better vertical spacing
          backgroundImage: `
            repeating-linear-gradient(0deg, #e5e5e5 0px, #e5e5e5 1px, transparent 1px, transparent calc(100% / ${
              cols * 0.001
            })),
            repeating-linear-gradient(90deg, #e5e5e5 0px, #e5e5e5 1px, transparent 1px, transparent calc(100% / ${
              rows * 0.005
            }))
          `,
          backgroundSize: `calc(100% / ${cols}) 50px`,
        }}
      >
        {items.map((item) => {
          const isDragging = dragging?.id === item.id;
          const container = containerRef.current?.getBoundingClientRect();

          let left = (item.x / cols) * 100;
          let top = (item.y / rows) * (rows * 40);

          if (isDragging && container) {
            left =
              (((item.x / cols) * container.width + dragOffset.x) /
                container.width) *
              100;
            top = (item.y / rows) * (rows * 40) + dragOffset.y;
          }

          return (
            <div
              key={item.id}
              onMouseDown={(e) => handleMouseDown(e, item.id)}
              onTouchStart={(e) => handleTouchStart(e, item.id)}
              style={{
                position: "absolute",
                left: `${left}%`,
                top: `${top}px`,
                width: `${(item.w / cols) * 100}%`,
                height: `${(item.h / rows) * (rows * 40)}px`,
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

export default MobileUI;
