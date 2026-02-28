"use client";
import ComponentLayout from "@/components/layoutComponents/ComponentLayout";
import ExpandRepelComponent from "@/components/ui/expandRepelComponent";
import CodeBlock from "@/components/layoutComponents/CodeBlock";
import SourceCodeButton from "@/components/ui/sourceCodeButton";
import { usePathname, useRouter } from "next/navigation";

const mouseRepelCode = `const updatePosition = () => {
  // Calculate card center position
  const cardCenterX = homePosition.current.x + 160; // Half of card width
  const cardCenterY = homePosition.current.y + 128; // Half of card height

  // Calculate distance from mouse to card center
  const dx = cardCenterX - mousePos.x;
  const dy = cardCenterY - mousePos.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  // Repulsion settings
  const repelRadius = 200; // Area of influence
  const maxRepelDistance = 80; // Maximum push distance

  if (distance < repelRadius && distance > 0) {
    const force = (repelRadius - distance) / repelRadius;
    const angle = Math.atan2(dy, dx);

    offsetX = Math.cos(angle) * force * maxRepelDistance;
    offsetY = Math.sin(angle) * force * maxRepelDistance;
  }
};`;

const collisionDetectionCode = `// Check collision with expanded card
if (isAnyCardExpanded && expandedCardPosition && !isExpanded) {
  const expandedWidth = 600;
  const expandedHeight = 400;
  
  // Calculate current card bounds
  const cardLeft = homePosition.current.x;
  const cardRight = cardLeft + cardWidth;
  const cardTop = homePosition.current.y;
  const cardBottom = cardTop + cardHeight;
  
  // Calculate expanded card bounds with padding
  const padding = 20;
  const expandedLeft = expandedCardPosition.x - padding;
  const expandedRight = expandedCardPosition.x + expandedWidth + padding;
  const expandedTop = expandedCardPosition.y - padding;
  const expandedBottom = expandedCardPosition.y + expandedHeight + padding;
  
  // Check if cards overlap
  const horizontalOverlap = cardRight > expandedLeft && cardLeft < expandedRight;
  const verticalOverlap = cardBottom > expandedTop && cardTop < expandedBottom;
  const isColliding = horizontalOverlap && verticalOverlap;
  
  if (isColliding) {
    // Push the card away from the expanded card
    const dx = cardCenterX - expandedCenterX;
    const dy = cardCenterY - expandedCenterY;
    // ... calculate repulsion force
  }
}`;

const smoothTransitionCode = `// Smooth interpolation back to home position
setOffset((prev) => ({
  x: prev.x + (offsetX - prev.x) * 0.25,
  y: prev.y + (offsetY - prev.y) * 0.25,
}));

animationFrame.current = requestAnimationFrame(updatePosition);`;

const viewportAdjustmentCode = `// Calculate if we need to adjust position to stay in viewport
if (newExpandedState && containerRef) {
  const expandedWidth = 600;
  const expandedHeight = 400;
  
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  
  // Calculate where the card would end up if expanded
  const cardRight = homePosition.current.x + expandedWidth;
  const cardBottom = homePosition.current.y + expandedHeight;
  
  // Adjust offset if card would go out of bounds
  let adjustX = 0;
  let adjustY = 0;
  
  if (cardRight > viewportWidth) {
    adjustX = viewportWidth - cardRight - 20; // 20px padding from edge
  }
  if (cardBottom > viewportHeight) {
    adjustY = viewportHeight - cardBottom - 20;
  }
  
  setOffset({ x: adjustX, y: adjustY });
}`;

function Page() {
  const router = useRouter();
  const path = usePathname();

  return (
    <ComponentLayout
      title="Expand Repel Card Component"
      description="An interactive card component with magnetic repulsion physics and smooth expansion animations. Cards intelligently avoid each other and respond to mouse proximity."
    >
      <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 w-full  flex items-center justify-center rounded-lg border border-neutral-300 min-h-80">
        <video
          loop
          muted
          playsInline
          autoPlay
          src="/craft-preview/expand-repel-card-fullscreen.mp4"
        />
        <button
          onClick={() => {
            router.push(`${path}/expand-repel-page`);
          }}
          className="px-6 absolute bottom-4 left-1/2 -translate-x-1/2 cursor-pointer py-3 bg-black text-white rounded-lg hover:scale-105 transition-all duration-150 ease-in"
        >
          View Full Page Demo
        </button>
      </div>

      <div className="text-base mt-8 text-neutral-700">
        <p>
          The cards feature two key behaviors: they gently repel away from the
          mouse cursor, and when one card is expanded, other cards move out of
          the way to prevent overlap.
        </p>

        <div className="mt-6">
          <h3 className="font-semibold text-lg mb-3 text-neutral-800">
            Core Mechanics
          </h3>

          <div className="space-y-6">
            <div>
              <h4 className="font-semibold mt-4 mb-2 text-neutral-700">
                1. Mouse Repulsion Physics
              </h4>
              <p className="text-neutral-700 mb-3">
                Each card calculates its distance from the mouse cursor in
                real-time. When the mouse enters a defined radius (200px), the
                card experiences a repulsive force that pushes it away. The
                force is stronger the closer the mouse gets, creating a natural,
                fluid interaction.
              </p>
              <CodeBlock language="javascript" code={mouseRepelCode} />
              <p className="text-neutral-600 text-sm mt-2">
                The repulsion uses basic trigonometry to calculate the angle and
                force direction. The force decreases gradually as the mouse
                moves away, creating smooth, organic movement.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mt-4 mb-2 text-neutral-700">
                2. Collision Detection & Avoidance
              </h4>
              <p className="text-neutral-700 mb-3">
                When a card expands, the component performs collision detection
                with all other cards. If any card would overlap with the
                expanded card, it's pushed away in the direction with the most
                overlap, ensuring all cards remain visible.
              </p>
              <CodeBlock language="javascript" code={collisionDetectionCode} />
              <p className="text-neutral-600 text-sm mt-2">
                The collision system uses AABB (Axis-Aligned Bounding Box)
                detection to determine overlaps, then calculates the optimal
                push direction based on which axis has more overlap.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mt-4 mb-2 text-neutral-700">
                3. Smooth Animation with requestAnimationFrame
              </h4>
              <p className="text-neutral-700 mb-3">
                Instead of instant position changes, the cards use linear
                interpolation (lerping) to smoothly transition between their
                current position and the target position. This creates fluid,
                natural-looking movement.
              </p>
              <CodeBlock language="javascript" code={smoothTransitionCode} />
              <p className="text-neutral-600 text-sm mt-2">
                The interpolation factor (0.25) determines how quickly cards
                reach their target position. Lower values create smoother,
                slower movement, while higher values make it snappier.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mt-4 mb-2 text-neutral-700">
                4. Viewport-Aware Expansion
              </h4>
              <p className="text-neutral-700 mb-3">
                When a card expands, the component checks if it would overflow
                the viewport. If so, it automatically adjusts the card's
                position to keep it fully visible within the screen boundaries.
              </p>
              <CodeBlock language="javascript" code={viewportAdjustmentCode} />
              <p className="text-neutral-600 text-sm mt-2">
                This ensures that expanded cards are always fully visible,
                regardless of where they're positioned on the screen.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mt-4 mb-2 text-neutral-700">
                5. State Management & Performance
              </h4>
              <p className="text-neutral-700 mb-3">
                The component uses React refs to store position data that
                doesn't need to trigger re-renders, and state for values that
                affect the UI. The animation loop runs continuously using{" "}
                <code className="px-1.5 py-0.5 bg-gray-100 rounded text-sm">
                  requestAnimationFrame
                </code>
                , which is properly cleaned up to prevent memory leaks.
              </p>
            </div>
          </div>
        </div>

        <SourceCodeButton
          componentName="ExpandRepelComponent"
          hrefLink="https://github.com/prash240303/crafts/blob/main/src/components/ui/expandRepelComponent.tsx"
        />
      </div>
    </ComponentLayout>
  );
}

export default Page;
