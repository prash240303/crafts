'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, animate, AnimationPlaybackControls } from 'motion/react';
import { AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { SquircleWithOverflow } from './SquircleWithOverflow';

function TickerChar({ ch }: { ch: string }) {
  if (ch === ':') return <span className="text-sm text-neutral-800 mx-px">{ch}</span>;
  return (
    <span className="relative inline-block overflow-hidden" style={{ width: 8, height: 20 }}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={ch}
          className="absolute inset-0 flex items-center justify-center text-sm text-neutral-800 tabular-nums"
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
        >
          {ch}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

interface AlbumPlayerProps {
  song: string;
  artist: string;
  albumArt: string;
}

export default function AlbumPlayer({ song, artist, albumArt }: AlbumPlayerProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [elapsed, setElapsed] = useState(76); // start at 1:16
  const rotate = useMotionValue(0);
  const animRef = useRef<AnimationPlaybackControls | null>(null);

  useEffect(() => {
    animRef.current = animate(rotate, 36000 * 360, { duration: 36000 * 4, ease: 'linear' });
    return () => animRef.current?.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const id = setInterval(() => setElapsed(s => Math.min(s + 1, 180)), 1000);
    return () => clearInterval(id);
  }, []);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${String(sec).padStart(2, '0')}`;
  };

  return (
    <SquircleWithOverflow
      radius={30}
      style={{ width: '240px', height: '240px' }}
      overflow="hidden"
      border={{ width: 2, color: '#3b82f6' }}
    >
      <div className="w-full relative h-full bg-neutral-50 flex items-center justify-center">

        {/* disc shadow — blurred circle behind disc, offset down so all edges are inside parent clip */}
        <motion.div
          className="absolute left-0 w-full h-full pointer-events-none"
          style={{
            zIndex: 9,
            background: 'rgba(0,0,0,0.28)',
            filter: 'blur(18px)',
          }}
          animate={{
            y: isHovered ? '4%' : '-46%',
            borderRadius: isHovered ? '0%' : '50%',
            scale: isHovered ? 1.04 : 0.9,
          }}
          transition={{
            y: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
            borderRadius: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
            scale: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
          }}
        />

        {/* disc — spins continuously, expands on hover */}
        <motion.div
          className="absolute cursor-pointer left-0 w-full h-full z-10 overflow-hidden"
          style={{ rotate }}
          initial={{ y: '-50%', borderRadius: '50%' }}
          animate={{
            y: isHovered ? '0%' : '-50%',
            borderRadius: isHovered ? '0%' : '50%',
          }}
          transition={{
            y: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
            borderRadius: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Image src={albumArt} alt="album art" fill className="object-cover" />
          {/* CD hub — concentric groove rings + spindle hole */}
          <div className="absolute  inset-0 flex items-center justify-center pointer-events-none">
            <div
              className="rounded-full flex items-center justify-center"
              style={{
                width: 84,
                height: 84,
                background: 'rgba(240,240,240, 0.9)',
                boxShadow: [
                  'inset 0 0 0 7px rgba(0,0,0,0.1)',
                  '0 0 0 1px rgba(0,0,0,0.2)',
                ].join(', '),
              }}
            >
              {/* spindle hole */}
              <div
                className="rounded-full"
                style={{
                  width: 10,
                  height: 10,
                  background:"#000"
                }}
              />
            </div>
          </div>
        </motion.div>

        {/* upright image — radial fill from center on hover */}
        <motion.div
          className="absolute inset-0 z-20 pointer-events-none"
          animate={{
            clipPath: isHovered
              ? 'circle(150% at 50% 50%)'
              : 'circle(0% at 50% 50%)',
          }}
          transition={{
            duration: 0.55,
            ease: [0.4, 0, 0.2, 1],
            delay: isHovered ? 0.15 : 0,
          }}
        >
          <Image src={albumArt} alt="album art upright" fill className="object-cover" />
        </motion.div>

        {/* content */}
        <div className="absolute bottom-1 w-full flex flex-col items-center justify-center gap-1 left-1/2 -translate-x-1/2">
          <div className="w-10 h-10  flex items-center justify-center gap-[3px]">
            {[
              { height: [6, 14, 4, 10, 6], duration: 0.7 },
              { height: [14, 4, 12, 6, 14], duration: 0.9 },
              { height: [8, 12, 4, 14, 8], duration: 0.65 },
              { height: [12, 6, 14, 4, 12], duration: 0.8 },
            ].map(({ height, duration }, i) => (
              <motion.span
                key={i}
                className="w-[3px] rounded-full bg-neutral-500 block"
                animate={{ height }}
                transition={{
                  duration,
                  repeat: Infinity,
                  repeatType: 'mirror',
                  ease: 'easeInOut',
                  delay: i * 0.12,
                }}
                style={{ height: height[0] }}
              />
            ))}
          </div>
          <p className="text-sm text-neutral-600">{artist}</p>
          <h2 className="text-md text-center font-bold text-neutral-800">{song}</h2>
          <div className="flex items-center">
            {formatTime(elapsed).split('').map((ch, i) => (
              <TickerChar key={i} ch={ch} />
            ))}
            <span className="text-sm text-neutral-400 mx-1">/</span>
            <span className="text-sm text-neutral-400">3:00</span>
          </div>
        </div>
      </div>
    </SquircleWithOverflow>
  );
}
