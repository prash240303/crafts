import { useState, useEffect, useRef } from "react";

export const useContainerWidth = () => {
  const [width, setWidth] = useState(1200);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const element = containerRef.current;
    if (!element) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect) {
          setWidth(entry.contentRect.width);
        }
      }
    });

    resizeObserver.observe(element);

    // Set initial width if available
    if (element.clientWidth) {
      setWidth(element.clientWidth);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return { width, containerRef, mounted };
};
