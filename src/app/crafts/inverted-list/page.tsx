"use client";

import Image from "next/image";
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
    title: "Mountain Peak",
    description: "Majestic alpine landscape",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=800&fit=crop",
    location: "Swiss Alps, Switzerland",
    details: "Towering granite spires pierce the clouds at over 4,000 metres. Pristine snowfields reflect dawn light in shades of rose and amber, while alpine meadows below burst with wildflowers during the brief summer thaw.",
    tags: ["alpine", "snow", "hiking", "nature"],
  },
  {
    id: 1,
    title: "Ocean Waves",
    description: "Serene coastal beauty",
    image: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=600&h=800&fit=crop",
    location: "Pacific Coast, California",
    details: "Rolling swells travel thousands of miles before meeting the rugged coastline, carving sea caves and stacking tide pools with colourful life. The salt air carries the rhythm of something ancient and endless.",
    tags: ["ocean", "waves", "coastal", "blue"],
  },
  {
    id: 2,
    title: "Forest Path",
    description: "Deep woods exploration",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=800&fit=crop",
    location: "Black Forest, Germany",
    details: "Ancient beeches and silver firs form cathedral canopies over moss-carpeted trails. Shafts of light pierce the canopy at dawn, illuminating mist that clings to the forest floor like a living thing.",
    tags: ["forest", "trees", "trail", "green"],
  },
  {
    id: 3,
    title: "City Lights",
    description: "Urban nightscape",
    image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=600&h=800&fit=crop",
    location: "Manhattan, New York",
    details: "Eight million stories compressed into a grid of light and shadow. At night the skyline becomes an abstract painting — reflections doubling every glowing window into a second city below.",
    tags: ["urban", "night", "skyline", "architecture"],
  },
  {
    id: 4,
    title: "Desert Dunes",
    description: "Golden sands endless",
    image: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=600&h=800&fit=crop",
    location: "Sahara Desert, Morocco",
    details: "Wind sculpts the sand into perfect geometric ridges that shift overnight, erasing every footprint. At sunset the dunes turn deep orange then violet, and silence is so complete you can hear your own heartbeat.",
    tags: ["desert", "sand", "sunset", "dunes"],
  },
  {
    id: 5,
    title: "Aurora Borealis",
    description: "Northern lights magic",
    image: "https://images.unsplash.com/photo-1444080748397-f442aa95c3e5?w=600&h=800&fit=crop",
    location: "Tromsø, Norway",
    details: "Solar particles collide with the atmosphere 100 kilometres up, painting the sky in curtains of green, violet, and white. Each display is unrepeatable — the same physics, a different painting, every time.",
    tags: ["aurora", "night sky", "arctic", "lights"],
  },
  {
    id: 6,
    title: "Waterfall",
    description: "Cascading waters",
    image: "https://images.unsplash.com/photo-1500595046891-9e0e6b6adddd?w=600&h=800&fit=crop",
    location: "Plitvice Lakes, Croatia",
    details: "Sixteen terraced lakes cascade into each other through a series of falls, the water so mineral-rich it builds its own travertine dams. The turquoise pools shift colour with the angle of the sun.",
    tags: ["waterfall", "lakes", "turquoise", "nature"],
  },
  {
    id: 7,
    title: "Sunset Sky",
    description: "Golden hour glow",
    image: "https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?w=600&h=800&fit=crop",
    location: "Santorini, Greece",
    details: "The Aegean's last light catches the whitewashed walls and turns them honey-gold, every shadow a deep cobalt. For twenty minutes the island exists in a palette no photographer can fully claim to have captured.",
    tags: ["sunset", "golden hour", "sky", "greece"],
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

  const scale      = useTransform(absDistance, [0, 1, 3], [1.05, 0.95, 0.85]);
  const color      = useTransform(absDistance, [0, 0.5, 2], ["#ffffff", "#cccccc", "#444444"]);
  const fontWeight = useTransform(absDistance, (d) => (d < 0.4 ? 700 : 400));

  const [descVisible, setDescVisible] = useState(false);
  useMotionValueEvent(absDistance, "change", (d) => setDescVisible(d < 0.4));

  return (
    <motion.div
      style={{ position: "absolute", top, left: 0, right: 0, height: LEFT_ITEM_HEIGHT, scale, color }}
      className="flex items-end text-left gap-5 justify-start px-12 cursor-pointer origin-left"
      onClick={() => onSelect(itemIndex)}
    >
      <motion.h2 style={{ fontWeight }} className="text-3xl leading-tight tracking-tight">
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
      style={{ position: "absolute", top, left: 0, right: 0, height: imageSlot }}
      className="px-2 flex items-center justify-center"
    >
      <motion.div
        layoutId={`img-${itemIndex}`}
        animate={{ opacity: isSelected ? 0 : 1 }}
        transition={{ opacity: { duration: 0.12 } }}
        style={{ borderRadius: 16 }}
        className="relative w-xl h-96 border border-white/10 overflow-hidden cursor-pointer"
        onClick={() => onSelect(itemIndex)}
      >
        <Image src={item.image} alt={item.title} fill className="object-cover" unoptimized />
      </motion.div>
    </motion.div>
  );
}

// ── Detail left panel ───────────────────────────────────────────────────────
function DetailPanel({
  item,
  onBack,
}: {
  item: Item;
  onBack: () => void;
}) {
  const stagger = (i: number) => ({ delay: 0.08 + i * 0.06 });

  return (
    <motion.div
      key="detail"
      className="absolute inset-0 flex flex-col justify-center px-12"
      initial={{ opacity: 0, x: 48 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 48 }}
      transition={{ type: "spring", stiffness: 220, damping: 28 }}
    >
      <motion.button
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={stagger(0)}
        onClick={onBack}
        className="self-start mb-14 flex items-center gap-2 text-white/30 hover:text-white/70 transition-colors text-xs tracking-[0.25em] uppercase"
      >
        ← Back
      </motion.button>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={stagger(1)}
        className="text-xs text-white/25 tracking-[0.28em] uppercase mb-3"
      >
        {item.location}
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...stagger(2), type: "spring", stiffness: 200, damping: 24 }}
        className="text-6xl font-bold text-white leading-none tracking-tight mb-4"
      >
        {item.title}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={stagger(3)}
        className="text-xl text-white/45 mb-8 leading-snug"
      >
        {item.description}
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={stagger(4)}
        className="text-white/55 leading-relaxed text-sm max-w-xs mb-10"
      >
        {item.details}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={stagger(5)}
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
  const baseAccumulated   = useRef(0);
  const activeRaw         = useTransform(accumulatedScroll, (s) => s / imageSlotRef.current);
  const activeSpring      = useSpring(activeRaw, { stiffness: 60, damping: 8, mass: 0.6 });

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

  const leftSlots = Array.from({ length: LEFT_HALF * 2 + 1 }, (_, i) => i - LEFT_HALF);

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

        {/* Full-screen overlay — layoutId morphs from the card */}
        <AnimatePresence>
          {selectedIndex !== null && (
            <motion.div
              key={selectedIndex}
              layoutId={`img-${selectedIndex}`}
              className="absolute inset-0 overflow-hidden"
              style={{ borderRadius: 0 }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <Image
                src={items[selectedIndex].image}
                alt={items[selectedIndex].title}
                fill
                className="object-cover"
                unoptimized
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
