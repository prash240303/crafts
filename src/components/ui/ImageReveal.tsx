"use client";
import Image from "next/image";
import React, { useState } from "react";
import { motion } from "framer-motion";

function ImageReveal() {
  const [isRevealed, setIsRevealed] = useState(false);
  const rows = 10;
  const cols = 15;

  return (
    <>
      <div className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
        <div
          key={isRevealed ? "revealed" : "hidden"}
          className="absolute inset-0 z-10 pointer-events-none grid h-full w-full"
          style={{
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
            gridTemplateRows: `repeat(${rows}, 1fr)`,
          }}
        >
          {[...Array(rows * cols)].map((_, i) => {
            const row = Math.floor(i / cols);
            const col = i % cols;
            return (
              <motion.div
                key={i}
                initial={{
                  opacity: 1,
                  filter: "brightness(2)",
                  background: "rgba(255,255,255,1)",
                }}
                animate={
                  isRevealed
                    ? {
                        opacity: 0,
                        filter: "brightness(1)",
                        background: "rgba(255,255,255,0)",
                        scale: 1.1,
                      }
                    : {}
                }
                transition={{
                  duration: 0.6,
                  ease: "easeInOut",
                  delay: (row + col) * 0.04,
                }}
                className="w-full h-full relative border-[0.5px] border-white/5"
              />
            );
          })}
        </div>
        <Image
          src="/home/bridge.jpg"
          className="object-cover w-full h-full transform transition-transform duration-700 group-hover:scale-105"
          width={1200}
          height={800}
          alt="image"
          priority
        />
      </div>

      <button
        onClick={() => setIsRevealed(!isRevealed)}
        className="group relative px-10 py-4 bg-white text-black font-semibold rounded-full overflow-hidden hover:scale-105 active:scale-95 transition-all duration-300"
      >
        <span className="relative z-10 flex items-center gap-2">
          {isRevealed ? "Reset Gallery" : "Ignite Reveal"}
        </span>
      </button>
    </>
  );
}

export default ImageReveal;
