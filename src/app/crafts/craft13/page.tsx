"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { Gupter } from "next/font/google";

const gupter = Gupter({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

function HeroPage() {
  const imgDivRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const targetHeight = useRef(30);
  const currentHeight = useRef(30);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const height = window.innerHeight;
      const mouseYpos = e.clientY;
      const heightPercent = 100 - (mouseYpos / height) * 100;
      targetHeight.current = Math.max(30, heightPercent);
    };

    const animate = () => {
      currentHeight.current =
        currentHeight.current +
        (targetHeight.current - currentHeight.current) * 0.08;

      if (imgDivRef.current) {
        imgDivRef.current.style.height = `${currentHeight.current}%`;
      }

      // zoom calculation
      const scale = 1 + (currentHeight.current - 30) / 200;

      if (imgRef.current) {
        imgRef.current.style.transform = `scale(${scale})`;
      }

      rafId = requestAnimationFrame(animate);
    };

    let rafId = requestAnimationFrame(animate);
    window.addEventListener("mousemove", handleMove);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", handleMove);
    };
  }, []);

  return (
    <>
      <div
        className={`h-screen ${gupter.className} p-4 gap-8 flex flex-col w-screen mx-auto`}
      >
        {/* top header */}
        <div className="w-full flex justify-between items-center">
          <div className="flex flex-col gupter-regular items-start justify-center gap-3">
            <span className="text-[72px] leading-none tracking-tight font-medium">
              Prashant Prabhakar
            </span>
            <span className="text-2xl tracking-tight">
              Frontend developer, from India
            </span>
          </div>
          <div className="text-lg flex flex-col items-end justify-center">
            <Link href={"mailto:prash2402works@gmail.com"}>
              prash2402works@gmail.com
            </Link>
            <Link href={""}>About me</Link>
          </div>
        </div>

        <div className="absolute left-1/2 top-1/2 max-w-xs text-center text-xs tracking-tight -translate-x-1/2 -translate-y-1/2">
          I'm a person of few words, preferring images to speak for me,
          conveying emotions and thoughts without long explanations. Visual
          expression allows me to share ideas in a way that words can't, letting
          each person interpret them in their own unique way
        </div>
        {/* hero image */}
        <div
          ref={imgDivRef}
          className="mt-auto border ease-in-out  overflow-hidden relative w-full rounded-4xl"
        >
          <Image
            src="/20260308_143228.jpg"
            alt="hero image"
            fill
            ref={imgRef}
            className="object-cover"
          />
        </div>
      </div>
    </>
  );
}

export default HeroPage;
