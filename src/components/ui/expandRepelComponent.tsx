"use client";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";

interface CardProps {
  id: number;
  title: string;
  desc: string;
  vidSrc: string;
  initialX: number;
  projectLink: string;
  initialY: number;
  mousePos: { x: number; y: number };
  onExpandChange: (id: number, isExpanded: boolean) => void;
  isAnyCardExpanded: boolean;
  expandedCardPosition?: { x: number; y: number };
}

const UICard: React.FC<CardProps> = ({
  id,
  title,
  desc,
  projectLink,
  vidSrc,
  initialX,
  initialY,
  mousePos,
  onExpandChange,
  isAnyCardExpanded,
  expandedCardPosition,
}) => {
  const homePosition = useRef({ x: initialX, y: initialY });
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isExpanded, setIsExpanded] = useState(false);
  const animationFrame = useRef<number>();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updatePosition = () => {
      // Don't apply repel effect when this card is expanded
      if (isExpanded) {
        animationFrame.current = requestAnimationFrame(updatePosition);
        return;
      }

      // calc card center position
      const cardCenterX = homePosition.current.x + 160; // (w-80)/2
      const cardCenterY = homePosition.current.y + 128; // (h-64)/2

      let offsetX = 0;
      let offsetY = 0;

      // Check collision with expanded card
      if (isAnyCardExpanded && expandedCardPosition && !isExpanded) {
        // Expanded card dimensions - matching the viewport-aware expansion
        const expandedWidth = 600;
        const expandedHeight = 400; // Match the estimated height in handleClick

        // Current card dimensions
        const cardWidth = 320;
        const cardHeight = 256;

        // calc current card bounds (using HOME position for collision check)
        const cardLeft = homePosition.current.x;
        const cardRight = cardLeft + cardWidth;
        const cardTop = homePosition.current.y;
        const cardBottom = cardTop + cardHeight;

        // calc expanded card bounds with extra padding for safety
        const padding = 20;
        const expandedLeft = expandedCardPosition.x - padding;
        const expandedRight = expandedCardPosition.x + expandedWidth + padding;
        const expandedTop = expandedCardPosition.y - padding;
        const expandedBottom =
          expandedCardPosition.y + expandedHeight + padding;

        // Check if cards overlap
        const horizontalOverlap =
          cardRight > expandedLeft && cardLeft < expandedRight;
        const verticalOverlap =
          cardBottom > expandedTop && cardTop < expandedBottom;
        const isColliding = horizontalOverlap && verticalOverlap;

        if (isColliding) {
          // calc centers
          const expandedCenterX = expandedCardPosition.x + expandedWidth / 2;
          const expandedCenterY = expandedCardPosition.y + expandedHeight / 2;

          // calc displacement direction from expanded card center
          const dx = cardCenterX - expandedCenterX;
          const dy = cardCenterY - expandedCenterY;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance > 0) {
            // Normalize direction
            const dirX = dx / distance;
            const dirY = dy / distance;

            // calc how much overlap there is
            const overlapX = Math.max(
              0,
              expandedWidth / 2 + cardWidth / 2 + padding - Math.abs(dx),
            );
            const overlapY = Math.max(
              0,
              expandedHeight / 2 + cardHeight / 2 + padding - Math.abs(dy),
            );

            // Push in the direction with more overlap
            if (overlapX > overlapY) {
              // Push horizontally
              offsetX = dirX * (overlapX + 20); //  20px buffer
              offsetY = dirY * (overlapY * 0.5); 
            } else {
              // Push vertically
              offsetY = dirY * (overlapY + 20); //  20px buffer
              offsetX = dirX * (overlapX * 0.5);
            }
          }
        }
      } else if (!isAnyCardExpanded) {
        // Normal mouse repulsion when no card is expanded
        const dx = cardCenterX - mousePos.x;
        const dy = cardCenterY - mousePos.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Repulsion settings - increased for more noticeable effect
        const repelRadius = 200; // Larger radius for earlier repulsion
        const maxRepelDistance = 80; // Stronger push away from mouse

        if (distance < repelRadius && distance > 0) {
          const force = (repelRadius - distance) / repelRadius;
          const angle = Math.atan2(dy, dx);

          offsetX = Math.cos(angle) * force * maxRepelDistance;
          offsetY = Math.sin(angle) * force * maxRepelDistance;
        }
      }

      // Smooth interpolation back to home position
      setOffset((prev) => ({
        x: prev.x + (offsetX - prev.x) * 0.25,
        y: prev.y + (offsetY - prev.y) * 0.25,
      }));

      animationFrame.current = requestAnimationFrame(updatePosition);
    };

    animationFrame.current = requestAnimationFrame(updatePosition);

    return () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, [mousePos, isExpanded, isAnyCardExpanded, expandedCardPosition]);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newExpandedState = !isExpanded;

    // If expanding, calc if we need to adjust position to stay in viewport
    if (newExpandedState && containerRef) {
      const expandedWidth = 600;
      const expandedHeight = 400;

      // Get viewport dimensions (we'll need to pass containerSize as prop)
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // calc where the card would end up if expanded
      const cardRight = homePosition.current.x + expandedWidth;
      const cardBottom = homePosition.current.y + expandedHeight;

      // Adjust offset if card would go out of bounds
      let adjustX = 0;
      let adjustY = 0;

      if (cardRight > viewportWidth) {
        adjustX = viewportWidth - cardRight - 20; // 20px padding from edge
      }
      if (homePosition.current.x + adjustX < 20) {
        adjustX = 20 - homePosition.current.x; // Keep 20px from left edge
      }

      if (cardBottom > viewportHeight) {
        adjustY = viewportHeight - cardBottom - 20; // 20px padding from bottom
      }
      if (homePosition.current.y + adjustY < 20) {
        adjustY = 20 - homePosition.current.y; // Keep 20px from top
      }

      // Apply viewport adjustment to offset
      setOffset({ x: adjustX, y: adjustY });
    }

    setIsExpanded(newExpandedState);
    onExpandChange(id, newExpandedState);
  };

  return (
    <div
      onClick={handleClick}
      style={{
        left: homePosition.current.x + "px",
        top: homePosition.current.y + "px",
        transform: isExpanded
          ? `translate(${offset.x}px, ${offset.y}px) scale(1)`
          : `translate(${offset.x}px, ${offset.y}px)`,
        zIndex: isExpanded ? 50 : 1,
        transformOrigin: "top left",
      }}
      className={`absolute border border-black overflow-hidden bg-white flex flex-col cursor-pointer transition-all duration-300 ease-out
        ${
          isExpanded
            ? "w-[600px] bg-white shadow-2xl"
            : "w-80 bg-white shadow-lg hover:shadow-xl hover:scale-[1.02]"
        }`}
    >
      <div className="py-2  pl-4 border-b border-gray-100">
        <h3
          className={`font-medium text-gray-800 ${isExpanded ? "text-xl" : "text-base"}`}
        >
          {title}
        </h3>
      </div>

      <div className="px-4 flex flex-col items-start justify-start bg-linear-to-br from-gray-50 to-white">
        <div
          className={`border ${isExpanded ? "" : "my-3"} w-full border-neutral-500  transition-all duration-300`}
        >
          <video
            src={vidSrc}
            autoPlay
            loop
            muted
            playsInline
            className={
              isExpanded
                ? "w-full h-64 object-cover object-center"
                : "w-full h-32 object-cover object-center"
            }
          />
        </div>

        {isExpanded && (
          <div className="mt-4 mb-2 flex flex-col items-start justify-start space-y-3">
            <p className="text-sm text-left text-gray-500">{desc}</p>
            <Link
              href={projectLink}
              target="_blank"
              className="px-6 py-2 hover:text-white hover:bg-black mt-2 text-black border border-black transition-colors"
            >
              View Project
            </Link>
            <p className="text-xs text-gray-400">Click anywhere to collapse</p>
          </div>
        )}
      </div>
    </div>
  );
};

function ExpandRepelComponent() {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [expandedCardId, setExpandedCardId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const cards = [
    {
      id: 1,
      title: "Arrow-Button",
      vidSrc: "/craft-preview/arrowbutton.mp4",
      projectLink: "https://crafts-three.vercel.app/arrow-button",
      desc: "A simple yet elegant arrow button component that can be used for Call to Actions(CTA).",
      x: 120,
      y: 150,
    },
    {
      id: 2,
      title: "Ripple Button",
      vidSrc: "/craft-preview/ripplebutton.mp4",
      projectLink: "https://crafts-three.vercel.app/arrow-button",
      desc: "An interactive button with hover-triggered ripple effects for tactile, responsive feedback",
      x: 1080,
      y: 250,
    },
    {
      id: 3,
      title: "Starry Text",
      vidSrc: "/craft-preview/starrytext.mp4",
      projectLink: "https://crafts-three.vercel.app/arrow-button",
      desc: "A beautiful glowing text component with starry effects and smooth animations. Perfect for hero sections and attention-grabbing headlines.",
      x: 80,
      y: 480,
    },
    {
      id: 4,
      title: "Tab Switcher",
      projectLink: "https://crafts-three.vercel.app/arrow-button",
      vidSrc: "/craft-preview/tabswitcher.mp4",
      desc: "A compact navigation component designed for smooth, visual tab transitions. Instead of switching content abruptly, the active tab slides into place with a soft background animation, making the interaction feel polished and intentional.",
      x: 550,
      y: 420,
    },
  ];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: -1000, y: -1000 });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="w-screen h-screen relative bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden"
    >
      {expandedCardId !== null && (
        <div
          className="absolute inset-0 backdrop-blur-md bg-black/20 z-40 transition-all duration-300"
          onClick={() => setExpandedCardId(null)}
        />
      )}

      {cards.map((card) => (
        <UICard
          key={card.id}
          id={card.id}
          vidSrc={card.vidSrc}
          title={card.title}
          desc={card.desc}
          projectLink={card.projectLink}
          initialX={card.x}
          initialY={card.y}
          mousePos={mousePos}
          onExpandChange={(id, isExpanded) => {
            setExpandedCardId(isExpanded ? id : null);
          }}
          isAnyCardExpanded={expandedCardId !== null}
          expandedCardPosition={
            expandedCardId !== null && expandedCardId !== card.id
              ? cards.find((c) => c.id === expandedCardId)
              : undefined
          }
        />
      ))}
    </div>
  );
}

export default ExpandRepelComponent;
