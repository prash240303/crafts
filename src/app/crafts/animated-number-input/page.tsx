"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Page() {
  const [input, setInput] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow numbers and limit length to 10 for better layout
    if ((value === "" || /^\d+$/.test(value)) && value.length <= 10) {
      setInput(value);
    }
  };

  const digits = useMemo(() => input.split(""), [input]);

  return (
    <div className="flex bg-[#050505] h-screen w-full flex-col items-center justify-center overflow-hidden font-sans selection:bg-blue-500/30">
      <div className="-mt-20 mb-24 grid content-start justify-items-center gap-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-medium">
            Animated Number Input
          </span>
        </motion.div>
      </div>

      <div className="relative group flex items-center justify-center min-w-[400px] h-40">
        {/* Hidden Input for interaction */}
        <input
          value={input}
          onChange={handleChange}
          autoFocus
          className="absolute inset-0 z-10 w-full opacity-0 cursor-text outline-none"
          type="text"
          placeholder="000"
        />

        {/* Animated Digits Container */}
        <div className="flex items-center justify-center pointer-events-none">
          <AnimatePresence mode="popLayout" initial={false}>
            {digits.length === 0 ? (
              <motion.span
                key="placeholder"
                initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                animate={{ opacity: 0.1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                className="text-[120px] font-black tracking-tighter text-white select-none"
              >
                000
              </motion.span>
            ) : (
              <div className="flex gap-1">
                {digits.map((digit, index) => (
                  <motion.span
                    key={`${index}-${digit}`}
                    initial={{
                      y: 60,
                      opacity: 0,
                      rotateX: -90,
                      filter: "blur(15px)",
                    }}
                    animate={{
                      y: 0,
                      opacity: 1,
                      rotateX: 0,
                      filter: "blur(0px)",
                    }}
                    exit={{
                      y: -60,
                      opacity: 0,
                      rotateX: 90,
                      filter: "blur(15px)",
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 350,
                      damping: 25,
                      mass: 0.8,
                    }}
                    className="text-[120px] font-black tracking-tighter text-white inline-block drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                  >
                    {digit}
                  </motion.span>
                ))}
              </div>
            )}
          </AnimatePresence>

          {/* Custom Cursor */}
          <motion.div
            layoutId="cursor"
            animate={{
              opacity: [0, 1, 0],
              height: digits.length === 0 ? 80 : 100,
            }}
            transition={{
              opacity: { repeat: Infinity, duration: 0.8 },
              height: { type: "spring", stiffness: 300, damping: 30 },
            }}
            className="w-1.5 bg-blue-500 ml-4 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.8)]"
          />
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/[0.03] blur-[150px] rounded-full" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#ffffff03_1px,transparent_1px)] [background-size:40px_40px]" />
      </div>

      {/* Footer hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 1 }}
        className="fixed bottom-12 text-[10px] uppercase tracking-widest text-white/50"
      >
        Backspace to delete • Only digits allowed
      </motion.div>
    </div>
  );
}

export default Page;
