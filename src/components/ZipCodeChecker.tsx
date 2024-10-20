"use client";

import Image from "next/image";
import { useState } from "react";

export default function ZipCodeChecker() {
  const [zipCode, setZipCode] = useState("");

  return (
    <div className="relative flex justify-center items-center">
      <Image
        src="/bg.png"
        alt="background"
        width={1000}
        height={200}
        className="rounded-[45px] h-36 absolute object-cover shadow-lg"
      />

      <div className="relative px-3  h-fit">
        <input
          type="text"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
          placeholder="Enter your zip code"
          className="w-full  relative text-3xl px-6 py-4 text-center text-gray-900 placeholder-gray-900 bg-white rounded-full shadow-inner border-2 border-white focus:outline-none"
        />
        <button
          type="submit"
          className="w-full px-6 pt-4 text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#73a024] to-[#95904a]"
        >
          Check Availability
        </button>
      </div>
    </div>
  );
}
