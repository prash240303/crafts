import { Squircle } from "@cornerkit/react";
import React, { ReactNode, useRef, useState, useEffect } from "react";
import {MY_IMAGE} from "../../lib/constants"

function DockUI({ children }: { children: ReactNode }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const drag = useRef({
    active: false,
    startX: 0,
    startY: 0,
    origX: 0,
    origY: 0,
  });

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!drag.current.active) return;
      setPos({
        x: drag.current.origX + e.clientX - drag.current.startX,
        y: drag.current.origY + e.clientY - drag.current.startY,
      });
    };
    const onMouseUp = () => {
      drag.current.active = false;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!drag.current.active) return;
      e.preventDefault();
      setPos({
        x: drag.current.origX + e.touches[0].clientX - drag.current.startX,
        y: drag.current.origY + e.touches[0].clientY - drag.current.startY,
      });
    };
    const onTouchEnd = () => {
      drag.current.active = false;
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  const onMouseDown = (e: React.MouseEvent) => {
    drag.current = {
      active: true,
      startX: e.clientX,
      startY: e.clientY,
      origX: pos.x,
      origY: pos.y,
    };
    e.preventDefault();
  };

  const onTouchStart = (e: React.TouchEvent) => {
    drag.current = {
      active: true,
      startX: e.touches[0].clientX,
      startY: e.touches[0].clientY,
      origX: pos.x,
      origY: pos.y,
    };
  };

  return (
    <>
      <svg className="hidden" aria-hidden="true">
        <defs>
          <filter
            id="displacementFilter"
            x="0%"
            y="0%"
            width="100%"
            height="100%"
          >
            <feImage
            href= {MY_IMAGE}
              preserveAspectRatio="none"
              result="displacement"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="displacement"
              scale="30"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      <Squircle
        radius={25}
        smoothing={0.9}
        ref={cardRef}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
        className="fixed border border-white/10 z-10 w-fit h-fit px-2 pt-2 pb-1 flex gap-1 bg-black/10 items-start justify-start flex-wrap overflow-hidden transition-opacity select-none touch-none"
        style={{
          transform: `translate(${pos.x}px, ${pos.y}px)`,
          cursor: drag.current.active ? "grabbing" : "grab",
          filter: "drop-shadow(-8px -10px 46px #0000005f)",
          backdropFilter:
            "brightness(1.1) blur(1px) url(#displacementFilter)",
        }}
      >
        {children}
      </Squircle>
    </>
  );
}

export default DockUI;
