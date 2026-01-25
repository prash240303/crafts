"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DesktopUI from "./ui-layouts/DesktopUI";
import MobileUI from "./ui-layouts/MobileUI";

function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (isMobile) {
    return <MobileUI/>;
  }

  return <DesktopUI/>;
}

export default Home;
