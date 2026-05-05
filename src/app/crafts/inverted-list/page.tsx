"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useTransform,
  useSpring,
  useMotionValueEvent,
  useMotionValue,
  MotionValue,
} from "motion/react";

const FALLBACK_IMAGE_SLOT = 448;
const LEFT_ITEM_HEIGHT = 60;
const LEFT_HALF = 8;
const N = 8; // items.length — used in transform closures

const mod = (n: number, m: number) => ((n % m) + m) % m;

interface Item { id: number; title: string; description: string; image: string; }

const items: Item[] = [
  { id: 0, title: "Mountain Peak",   description: "Majestic alpine landscape",  image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=800&fit=crop" },
  { id: 1, title: "Ocean Waves",     description: "Serene coastal beauty",       image: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=600&h=800&fit=crop" },
  { id: 2, title: "Forest Path",     description: "Deep woods exploration",      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=800&fit=crop" },
  { id: 3, title: "City Lights",     description: "Urban nightscape",            image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=600&h=800&fit=crop" },
  { id: 4, title: "Desert Dunes",    description: "Golden sands endless",        image: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=600&h=800&fit=crop" },
  { id: 5, title: "Aurora Borealis", description: "Northern lights magic",       image: "https://images.unsplash.com/photo-1444080748397-f442aa95c3e5?w=600&h=800&fit=crop" },
  { id: 6, title: "Waterfall",       description: "Cascading waters",            image: "https://images.unsplash.com/photo-1500595046891-9e0e6b6adddd?w=600&h=800&fit=crop" },
  { id: 7, title: "Sunset Sky",      description: "Golden hour glow",            image: "https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?w=600&h=800&fit=crop" },
];

// ── Left column slot ────────────────────────────────────────────────────────
// Uses activeIndex (React state) to select which item to render at each offset.
// Text-only so re-renders on activeIndex change are invisible.
function LeftSlot({
  offset,
  activeSpring,
  activeIndex,
}: {
  offset: number;
  activeSpring: MotionValue<number>;
  activeIndex: number;
}) {
  const itemIndex = mod(activeIndex + offset, N);
  const item = items[itemIndex];

  const top = useTransform(activeSpring, (a) => {
    const frac = a - Math.round(a);
    const mid = typeof window !== "undefined" ? window.innerHeight / 2 : 400;
    return mid + (offset - frac) * LEFT_ITEM_HEIGHT - LEFT_ITEM_HEIGHT / 2;
  });

  const absDistance = useTransform(activeSpring, (a) => {
    const frac = a - Math.round(a);
    return Math.abs(offset - frac);
  });

  const scale      = useTransform(absDistance, [0, 1, 3],       [1.05, 0.95, 0.85]);
  const color      = useTransform(absDistance, [0, 0.5, 2],        ["#ffffff", "#cccccc", "#444444"]);
  const fontWeight = useTransform(absDistance, (d) => (d < 0.4 ? 700 : 400));

  const [descVisible, setDescVisible] = useState(false);
  useMotionValueEvent(absDistance, "change", (d) => setDescVisible(d < 0.4));

  return (
    <motion.div
      style={{ position: "absolute", top, left: 0, right: 0, height: LEFT_ITEM_HEIGHT, scale, color }}
      className="flex items-end text-left gap-5 justify-start px-12 cursor-default origin-left"
    >
      <motion.h2 style={{ fontWeight }} className="text-3xl leading-tight tracking-tight">
        {item.title}
      </motion.h2>
      <motion.p
        animate={descVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 }}
        transition={descVisible
          ? { type: "spring", stiffness: 400, damping: 28 }
          : { duration: 0.2, ease: "easeOut" }}
        className="text-lg text-left text-gray-400 mt-0.5 tracking-widest"
      >
        {item.description}
      </motion.p>
    </motion.div>
  );
}

// ── Right column image ──────────────────────────────────────────────────────
// Fixed identity: each RightImage always renders the same item (itemIndex never
// changes). Position is computed from activeSpring using shortest-path modular
// distance so the image never changes its src — no reload, no glitch.
//
// Direction: dist = a - itemIndex (wrapped).  As 'a' increases (scroll forward),
// dist increases → top increases → image moves DOWN (opposite of left column).
function RightImage({
  itemIndex,
  activeSpring,
  imageSlotRef,
  imageSlot,
}: {
  itemIndex: number;
  activeSpring: MotionValue<number>;
  imageSlotRef: React.MutableRefObject<number>;
  imageSlot: number;
}) {
  const item = items[itemIndex];

  // Shortest-path distance in the ring: wraps to (-N/2, N/2]
  const top = useTransform(activeSpring, (a) => {
    const slot = imageSlotRef.current;
    const mid = typeof window !== "undefined" ? window.innerHeight / 2 : 400;
    const raw  = a - itemIndex;
    const dist = raw - Math.round(raw / N) * N;
    return mid + dist * slot - slot / 2;
  });

  return (
    <motion.div
      style={{ position: "absolute", top, left: 0, right: 0, height: imageSlot }}
      className="px-2 flex items-center justify-center"
    >
      <div className="relative border w-xl h-96 rounded-2xl overflow-hidden">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover"
          unoptimized
        />
      </div>
    </motion.div>
  );
}

// ── Page ────────────────────────────────────────────────────────────────────
export default function InvertedListPage() {
  const imageSlotRef = useRef(FALLBACK_IMAGE_SLOT);
  const [imageSlot, setImageSlot] = useState(FALLBACK_IMAGE_SLOT);

  const accumulatedScroll = useMotionValue(0);
  const baseAccumulated   = useRef(0);

  const activeRaw    = useTransform(accumulatedScroll, (s) => s / imageSlotRef.current);
  const activeSpring = useSpring(activeRaw, { stiffness: 60, damping: 8, mass: 0.6 });

  const [activeIndex, setActiveIndex] = useState(0);
  useMotionValueEvent(activeSpring, "change", (a) => {
    const r = Math.round(a);
    setActiveIndex((prev) => (prev !== r ? r : prev));
  });

  useEffect(() => {
    const IMAGE_SLOT = Math.round(window.innerHeight / 1.8);
    imageSlotRef.current = IMAGE_SLOT;
    setImageSlot(IMAGE_SLOT);

    let wheelAccum = 0;
    let snapTimer: ReturnType<typeof setTimeout>;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      wheelAccum += e.deltaY;
      accumulatedScroll.set(baseAccumulated.current + wheelAccum);

      clearTimeout(snapTimer);
      snapTimer = setTimeout(() => {
        const steps = Math.round(wheelAccum / IMAGE_SLOT);
        if (steps !== 0) baseAccumulated.current += steps * IMAGE_SLOT;
        accumulatedScroll.set(baseAccumulated.current);
        wheelAccum = 0;
      }, 80);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheel);
      clearTimeout(snapTimer);
    };
  }, []);

  const leftSlots = Array.from({ length: LEFT_HALF * 2 + 1 }, (_, i) => i - LEFT_HALF);

  return (
    <div className="flex h-screen overflow-hidden bg-black">
      {/* Left — text list scrolls UP on forward scroll */}
      <div className="w-1/2 relative overflow-hidden">
        {leftSlots.map((offset) => (
          <LeftSlot
            key={offset}
            offset={offset}
            activeSpring={activeSpring}
            activeIndex={activeIndex}
          />
        ))}
      </div>

      {/* Right — images scroll DOWN on forward scroll (opposite direction).
          All 8 images are always mounted with fixed identity — no src swap, no flicker. */}
      <div className="w-1/2 h-screen border overflow-hidden relative">
        {items.map((_, i) => (
          <RightImage
            key={i}
            itemIndex={i}
            activeSpring={activeSpring}
            imageSlotRef={imageSlotRef}
            imageSlot={imageSlot}
          />
        ))}
      </div>
    </div>
  );
}
