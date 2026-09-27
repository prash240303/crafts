"use client";
import { Image } from "@imagekit/next";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useTransform,
  useSpring,
  useMotionValueEvent,
  useMotionValue,
  MotionValue,
} from "motion/react";

const FALLBACK_IMAGE_SLOT = 448;
const LEFT_ITEM_HEIGHT = 60;
const LEFT_HALF = 8;
const N = 8;

const mod = (n: number, m: number) => ((n % m) + m) % m;

interface Item {
  id: number;
  title: string;
  description: string;
  image: string;
  location: string;
  details: string;
  tags: string[];
}
const items: Item[] = [
  {
    id: 0,
    title: 'MacBook Pro 16"',
    description: "Professional laptop powerhouse",
    image: "/Crafts/inverted-list/macbook.jpg",
    location: "Apple, California",
    details:
      "M4 Max chip delivers desktop-class performance in a portable form. The 16-inch Liquid Retina XDR display renders colors with exceptional accuracy, while the all-day battery enables creative work anywhere. Thermal engineering keeps it cool under sustained workloads.",
    tags: ["laptop", "professional", "high-performance", "design"],
  },
  {
    id: 1,
    title: "Sony WH-1000XM5",
    description: "Premium wireless headphones",
    image:
      "/Crafts/inverted-list/sony.jpeg",
    location: "Sony, Japan",
    details:
      "Industry-leading noise cancellation uses eight microphones to detect and eliminate ambient sound. The 30-hour battery outlasts most workdays, while adaptive sound control learns your environment and adjusts automatically.",
    tags: ["audio", "wireless", "noise-cancelling", "premium"],
  },
  {
    id: 2,
    title: "DJI Mini 4 Pro",
    description: "Ultra-compact drone camera",
    image:
      "/Crafts/inverted-list/dji.jpg",
    location: "DJI, China",
    details:
      "Weighs just 249 grams, making it exempt from many regulations. The mechanical 3-axis gimbal stabilizes 4K footage, while obstacle avoidance on all sides provides confidence in tight spaces.",
    tags: ["drone", "camera", "portable", "4K"],
  },
  {
    id: 3,
    title: "iPhone 16 Pro",
    description: "Advanced smartphone flagship",
    image:
      "/Crafts/inverted-list/iphone.png",
    location: "Apple, California",
    details:
      "A18 Pro chip handles computational photography and machine learning at the edge. The titanium frame feels premium, while the always-on display provides constant connectivity without battery drain.",
    tags: ["smartphone", "ios", "camera", "flagship"],
  },
  {
    id: 4,
    title: "Steam Deck OLED",
    description: "Portable gaming revolution",
    image:
      "/Crafts/inverted-list/steamdeck.jpg",
    location: "Valve, Washington",
    details:
      "The OLED display transforms PC gaming on the go with perfect blacks and vibrant colors. Play your entire Steam library with hardware that fits in your backpack, with dock support for TV gaming.",
    tags: ["gaming", "handheld", "pc", "portable"],
  },
  {
    id: 5,
    title: "Apple Vision Pro",
    description: "Spatial computing interface",
    image:
      "/Crafts/inverted-list/visionpro.png",
    location: "Apple, California",
    details:
      "Dual micro-OLED displays deliver a 4K experience to each eye. Eye tracking and hand gesture recognition create an intuitive interface, while spatial audio places sound precisely in three-dimensional space.",
    tags: ["vr", "spatial computing", "innovation", "future"],
  },
  {
    id: 6,
    title: "Canon EOS R5 ",
    description: "Professional mirrorless camera",
    image:
      "/Crafts/inverted-list/canon-r5.jpeg",
    location: "Canon, Japan",
    details:
      "45-megapixel full-frame sensor captures stunning detail across dynamic ranges. Advanced autofocus with bird-eye detection tracks subjects with AI precision, while 8K recording future-proofs your footage.",
    tags: ["camera", "professional", "photography", "8K"],
  },
  {
    id: 7,
    title: "Framework Laptop",
    description: "Modular computing experience",
    image:
      "/Crafts/inverted-list/framework.jpg",
    location: "Framework, California",
    details:
      "Swappable port modules let you customize connectivity for each journey. Upgrade the mainboard while keeping your chassis, encouraging longevity over obsolescence. Repairable by design with no proprietary screws.",
    tags: ["laptop", "modular", "sustainable", "customizable"],
  },
];
// ── Left list slot ──────────────────────────────────────────────────────────
function LeftSlot({
  offset,
  activeSpring,
  activeIndex,
  onSelect,
}: {
  offset: number;
  activeSpring: MotionValue<number>;
  activeIndex: number;
  onSelect: (itemIndex: number) => void;
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

  const scale = useTransform(absDistance, [0, 1, 3], [1.05, 0.95, 0.85]);
  const color = useTransform(
    absDistance,
    [0, 0.5, 2],
    ["#ffffff", "#cccccc", "#444444"],
  );
  const fontWeight = useTransform(absDistance, (d) => (d < 0.4 ? 700 : 400));

  const [descVisible, setDescVisible] = useState(false);
  useMotionValueEvent(absDistance, "change", (d) => setDescVisible(d < 0.4));

  return (
    <motion.div
      style={{
        position: "absolute",
        top,
        left: 0,
        right: 0,
        height: LEFT_ITEM_HEIGHT,
        scale,
        color,
      }}
      className="flex items-end text-left gap-5 justify-start px-12 cursor-pointer origin-left"
      onClick={() => onSelect(itemIndex)}
    >
      <motion.h2
        style={{ fontWeight }}
        className="text-3xl leading-tight tracking-tight"
      >
        {item.title}
      </motion.h2>
      <motion.p
        animate={descVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 }}
        transition={
          descVisible
            ? { type: "spring", stiffness: 400, damping: 28 }
            : { duration: 0.2, ease: "easeOut" }
        }
        className="text-lg text-left text-gray-400 mt-0.5 tracking-widest"
      >
        {item.description}
      </motion.p>
    </motion.div>
  );
}

// ── Right column image ──────────────────────────────────────────────────────
// layoutId on the card div — Framer Motion morphs it to the full-screen overlay on select.
function RightImage({
  itemIndex,
  activeSpring,
  imageSlotRef,
  imageSlot,
  isSelected,
  onSelect,
}: {
  itemIndex: number;
  activeSpring: MotionValue<number>;
  imageSlotRef: React.MutableRefObject<number>;
  imageSlot: number;
  isSelected: boolean;
  onSelect: (itemIndex: number) => void;
}) {
  const item = items[itemIndex];

  const top = useTransform(activeSpring, (a) => {
    const slot = imageSlotRef.current;
    const mid = typeof window !== "undefined" ? window.innerHeight / 2 : 400;
    const raw = a - itemIndex;
    const dist = raw - Math.round(raw / N) * N;
    return mid + dist * slot - slot / 2;
  });

  return (
    <motion.div
      style={{
        position: "absolute",
        top,
        left: 0,
        right: 0,
        height: imageSlot,
      }}
      className="px-2 flex items-center justify-center"
    >
      <motion.div
        animate={{ opacity: isSelected ? 0 : 1 }}
        transition={{ opacity: { duration: 0.12 } }}
        className="relative w-xl h-96 rounded-2xl border border-white/10 overflow-hidden cursor-pointer"
        onClick={() => onSelect(itemIndex)}
      >
        <Image
          urlEndpoint="https://ik.imagekit.io/z0f6srcjf"
          src={item.image}
          alt={item.title}
          fill
          sizes="576px"
          className="object-cover"
          unoptimized
          priority={itemIndex < 3}
          transformation={[{ width: 576, height: 384, focus: "auto", quality: 80 }]}
        />
      </motion.div>
    </motion.div>
  );
}

// ── Detail left panel ───────────────────────────────────────────────────────
function DetailPanel({ item, onBack }: { item: Item; onBack: () => void }) {
  return (
    <motion.div
      key="detail"
      className="absolute inset-0 flex flex-col justify-center px-12"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.55, duration: 0.25 }}
        onClick={onBack}
        className="self-start mb-14 cursor-pointer flex items-center gap-2 text-white/30 hover:text-white/70 transition-colors text-xs tracking-[0.25em] uppercase"
      >
        ← Back
      </motion.button>

      <motion.p
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.42, duration: 0.22 }}
        className="text-xs text-white/25 tracking-[0.28em] uppercase mb-3"
      >
        {item.location}
      </motion.p>

      <motion.h1
        initial={{ y: "20vh", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          y: { type: "spring", stiffness: 140, damping: 20 },
          opacity: { duration: 0.08 },
          x: { duration: 0.2 },
        }}
        className="text-6xl text-left px-0 font-bold text-white leading-none tracking-tight mb-4"
      >
        {item.title}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.28,
          type: "spring",
          stiffness: 300,
          damping: 28,
        }}
        className="text-xl text-white/45 mb-8 leading-snug"
      >
        {item.description}
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.38, duration: 0.22 }}
        className="text-white/55 leading-relaxed text-sm max-w-xs mb-10"
      >
        {item.details}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.48, duration: 0.2 }}
        className="flex flex-wrap gap-2"
      >
        {item.tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 border border-white/10 rounded-full text-xs text-white/30 tracking-widest uppercase"
          >
            {tag}
          </span>
        ))}
      </motion.div>
    </motion.div>
  );
}

// ── Page ────────────────────────────────────────────────────────────────────
export default function InvertedListPage() {
  const imageSlotRef = useRef(FALLBACK_IMAGE_SLOT);
  const [imageSlot, setImageSlot] = useState(FALLBACK_IMAGE_SLOT);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const isExpandedRef = useRef(false);

  const accumulatedScroll = useMotionValue(0);
  const baseAccumulated = useRef(0);
  const activeRaw = useTransform(
    accumulatedScroll,
    (s) => s / imageSlotRef.current,
  );
  const activeSpring = useSpring(activeRaw, {
    stiffness: 60,
    damping: 8,
    mass: 0.6,
  });

  const [activeIndex, setActiveIndex] = useState(0);
  useMotionValueEvent(activeSpring, "change", (a) => {
    const r = Math.round(a);
    setActiveIndex((prev) => (prev !== r ? r : prev));
  });

  useEffect(() => {
    isExpandedRef.current = selectedIndex !== null;
  }, [selectedIndex]);

  useEffect(() => {
    const IMAGE_SLOT = Math.round(window.innerHeight / 1.8);
    imageSlotRef.current = IMAGE_SLOT;
    setImageSlot(IMAGE_SLOT);

    let wheelAccum = 0;
    let snapTimer: ReturnType<typeof setTimeout>;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isExpandedRef.current) return;

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

  const leftSlots = Array.from(
    { length: LEFT_HALF * 2 + 1 },
    (_, i) => i - LEFT_HALF,
  );

  return (
    <div className="flex h-screen overflow-hidden bg-black">
      {/* ── Left column ── */}
      <div className="w-1/2 relative overflow-hidden">
        <AnimatePresence mode="wait">
          {selectedIndex === null ? (
            <motion.div
              key="list"
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.22 }}
            >
              {leftSlots.map((offset) => (
                <LeftSlot
                  key={offset}
                  offset={offset}
                  activeSpring={activeSpring}
                  activeIndex={activeIndex}
                  onSelect={setSelectedIndex}
                />
              ))}
            </motion.div>
          ) : (
            <DetailPanel
              item={items[selectedIndex]}
              onBack={() => setSelectedIndex(null)}
            />
          )}
        </AnimatePresence>
      </div>

      {/* ── Right column ── */}
      <div className="w-1/2 h-screen overflow-hidden relative">
        {items.map((_, i) => (
          <RightImage
            key={i}
            itemIndex={i}
            activeSpring={activeSpring}
            imageSlotRef={imageSlotRef}
            imageSlot={imageSlot}
            isSelected={selectedIndex === i}
            onSelect={setSelectedIndex}
          />
        ))}

        {/* Full-screen overlay — scales up from centre */}
        <AnimatePresence>
          {selectedIndex !== null && (
            <motion.div
              key={selectedIndex}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
              className="absolute inset-0 overflow-hidden"
            >
              <Image
                urlEndpoint="https://ik.imagekit.io/z0f6srcjf"
                src={items[selectedIndex].image}
                alt={items[selectedIndex].title}
                fill
                className="object-cover"
                unoptimized
                transformation={[{ width: 960, height: 1080, focus: "auto", quality: 85 }]}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
