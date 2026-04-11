import { Squircle } from "@cornerkit/react";
import React, { ReactNode, useRef, useState, useEffect } from "react";
import { MAGNIFIER_URI } from "../../lib/constants";

function FilterMagnifier() {
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
            <feImage href={MAGNIFIER_URI} result="map" />
            <feGaussianBlur in="map" stdDeviation="4" result="softMap" />

            <feDisplacementMap
              in="SourceGraphic"
              in2="softMap"
              scale="22"
              xChannelSelector="R"
              yChannelSelector="G"
              result="redDisp"
            />
            <feColorMatrix
              in="redDisp"
              type="matrix"
              values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"
              result="red"
            />

            <feDisplacementMap
              in="SourceGraphic"
              in2="softMap"
              scale="20"
              xChannelSelector="R"
              yChannelSelector="G"
              result="greenDisp"
            />
            <feColorMatrix
              in="greenDisp"
              type="matrix"
              values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0"
              result="green"
            />

            <feDisplacementMap
              in="SourceGraphic"
              in2="softMap"
              scale="18"
              xChannelSelector="R"
              yChannelSelector="G"
              result="blueDisp"
            />
            <feColorMatrix
              in="blueDisp"
              type="matrix"
              values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0"
              result="blue"
            />

            <feBlend in="red" in2="green" mode="screen" result="rg" />
            <feBlend in="rg" in2="blue" mode="screen" />
          </filter>
        </defs>
      </svg>

      <div
        ref={cardRef}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
        className="fixed rounded-full border border-white/10 z-10 size-32 px-2 pt-2 pb-1 flex gap-1 bg-black/10 items-start justify-start flex-wrap overflow-hidden transition-opacity select-none touch-none"
        style={{
          transform: `translate(${pos.x}px, ${pos.y}px)`,
          cursor: drag.current.active ? "grabbing" : "grab",
          filter: "drop-shadow(-8px -10px 46px #0000005f)",
          backdropFilter: "brightness(1.1) url(#displacementFilter)",
        }}
      />
    </>
  );
}

export default FilterMagnifier;
