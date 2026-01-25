"use client";

import Image from "next/image";
import { useRef, useState } from "react";

export default function ZipCodeChecker() {
  const [zipCode, setZipCode] = useState("");
  const imageWrapperRef = useRef<HTMLDivElement>(null);

  function handleCheckAvailability(zip: string, e: React.MouseEvent) {
    console.log(`Checking availability for zip code: ${zip}`);

    const wrapper = imageWrapperRef.current;
    if (!wrapper) return;

    const ripple = document.createElement("span");
    ripple.className = "ripple-on-image";

    const rect = wrapper.getBoundingClientRect();
    const size = 150;
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${e.clientY - rect.top - size / 2}px`;

    wrapper.appendChild(ripple);

    ripple.addEventListener("animationend", () => {
      ripple.remove();
    });
  }

  return (
    <div className="relative flex justify-center items-center">
      {/* Image Wrapper */}
      <div
        ref={imageWrapperRef}
        className="relative w-[780px] h-[144px] rounded-[45px] overflow-hidden shadow-lg"
      >
        <Image
          src="/bg.png"
          alt="background"
          fill
          className="object-cover rounded-[45px]"
        />
      </div>

      <div className="absolute px-3">
        <input
          type="text"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
          placeholder="Enter your zip code"
          className="w-full placeholder-neutral-500 text-3xl px-6 py-4 text-center text-gray-900 bg-white rounded-full shadow-inner border-2 border-white focus:outline-hidden"
        />
        <button
          type="button"
          onClick={(e) => handleCheckAvailability(zipCode, e)}
          className="w-full z-10 px-6 pt-4 pb-2 text-2xl font-semibold text-transparent bg-clip-text bg-linear-to-r from-[#78af19] to-[#385800]"
        >
          Check Availability
        </button>
      </div>
    </div>
  );
}
