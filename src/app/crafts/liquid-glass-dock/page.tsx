"use client";
import TabSwitcher from "@/components/ui/Switcher";
import CodeBlock from "@/components/layoutComponents/CodeBlock";
import ComponentLayout from "@/components/layoutComponents/ComponentLayout";
import SourceCodeButton from "@/components/ui/sourceCodeButton";
import Dock from "../../dock/page";
import Link from "next/link";
// Code snippets for documentation
const codeSnippetFilter = `/* Apply displacement filter to card */
.liquid-glass-card {
  filter: brightness(1.05) url(#liquid-displacement);
  backdrop-filter: blur(2px);
}`;

const codeSnippetSvgFilter = `<svg style="position: absolute; width: 0; height: 0;">
  <defs>
    <filter id="liquid-displacement">
      <feTurbulence
        type="fractalNoise"
        baseFrequency="0.015"
        numOctaves="3"
        result="noise"
      />
      <feDisplacementMap
        in="SourceGraphic"
        in2="noise"
        scale="30"
        xChannelSelector="R"
        yChannelSelector="G"
      />
    </filter>
  </defs>
</svg>`;

const codeSnippetDataUri = `/* Convert displacement image to data URI */
const displacementDataURI = \`url("data:image/png;base64,\${base64EncodedImage}")\`;

/* Use inline in SVG filter */
<feImage href={displacementDataURI} result="displacement-map" />`;

// Main Page Component
function Page() {
  return (
    <ComponentLayout
      title="Liquid Glass Effect"
      description="A CSS and SVG filter technique that goes beyond standard glassmorphism by physically warping and refracting background elements, creating a convincing liquid glass illusion without JavaScript or shaders."
    >
      <div className="relative bg-[#0b1220] w-full flex flex-col items-center justify-center rounded-xl border border-white/10 min-h-80 overflow-hidden gap-4 p-6">
        {/* glass noise */}
        <div className="pointer-events-none absolute inset-0 opacity-20" />

        {/* subtle glass gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-blue-200/5 to-transparent backdrop-blur-xl" />

        <p
          className="text-white/70 text-sm text-center z-10 max-w-xs"
          style={{ fontFamily: "'Special Elite', monospace" }}
        >
          The full experience requires a screen wide enough for the background.
          Click below to open it.
        </p>

        <Link
          href="/crafts/dock"
          target="_blank"
          rel="noopener noreferrer"
          className="z-10 group relative flex items-center gap-2 px-6 py-2.5 rounded-full text-sm transition-all duration-300 hover:scale-105 active:scale-95"
          style={{
            background: "rgba(255, 255, 255, 0.08)",
            border: "1px solid rgba(255, 255, 255, 0.25)",
            color: "#dbeafe",
            fontFamily: "'Special Elite', monospace",
            boxShadow: "0 0 30px rgba(120, 200, 255, 0.25)",
            backdropFilter: "blur(14px)",
          }}
        >
          Open Liquid Glass Experience
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          >
            <path d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
        </Link>

        <p className="text-white/40 text-xs z-10">
          Opens in a new tab · Only available on desktop
        </p>
      </div>
      <div className="text-base mt-8 text-neutral-700 space-y-6">
        {/* Intro */}
        <p>
          The Liquid Glass effect, demonstrated by Bernard from Better Stack,
          elevates the familiar glassmorphism aesthetic by adding genuine
          background distortion. While standard glassmorphism simply blurs
          what's behind a panel, liquid glass physically warps and refracts
          those elements — making the surface feel optically real.
        </p>

        <p>
          The entire effect is achieved with pure CSS and SVG filters, with no
          JavaScript required for the core illusion. The key distinction: liquid
          glass displaces pixels in the background, whereas
          <code className="mx-1 px-1.5 py-0.5 bg-neutral-100 rounded text-sm font-mono text-neutral-800">
            backdrop-filter: blur()
          </code>
          only softens them.
        </p>

        {/* Section 1: Displacement Map */}
        <div className="mt-6">
          <h3 className="font-semibold mt-2 mb-1 text-neutral-700">
            How Displacement Maps Drive Refraction
          </h3>
          <p className="text-neutral-700 mb-2">
            An SVG{" "}
            <code className="px-1.5 py-0.5 bg-neutral-100 rounded text-sm font-mono text-neutral-800">
              feDisplacementMap
            </code>{" "}
            filter reads a source image and uses its{" "}
            <strong>Red channel</strong> to control horizontal (X) distortion
            and its <strong>Green channel</strong> to control vertical (Y)
            distortion. A gradient or turbulence texture fed into this filter
            creates the illusion of depth and refraction across the glass
            surface.
          </p>
          <div className="my-4 rounded-md">
            <CodeBlock language="xml" code={codeSnippetSvgFilter} />
          </div>
          <p className="text-neutral-700">
            Using{" "}
            <code className="px-1.5 py-0.5 bg-neutral-100 rounded text-sm font-mono text-neutral-800">
              feTurbulence
            </code>{" "}
            as the displacement source generates a procedural, liquid-like
            texture that produces convincingly organic distortion — ideal for
            icy or water-like glass surfaces.
          </p>
        </div>

        {/* Section 2: CSS Filter Hook */}
        <div>
          <h3 className="font-semibold mt-2 mb-1 text-neutral-700">
            Wiring It Up with CSS Filters
          </h3>
          <p className="text-neutral-700 mb-2">
            The card component references the SVG filter via{" "}
            <code className="px-1.5 py-0.5 bg-neutral-100 rounded text-sm font-mono text-neutral-800">
              filter: url(#id)
            </code>
            , combined with a brightness lift to enhance the glass highlight:
          </p>
          <div className="my-4 rounded-md">
            <CodeBlock language="css" code={codeSnippetFilter} />
          </div>
          <p className="text-neutral-700">
            The SVG filter runs at the compositing stage, meaning it distorts
            the element's rendered pixels — including whatever the background
            shows through — giving you true refraction rather than a simple
            blur.
          </p>
        </div>

        {/* Section 3: Data URI */}
        <div>
          <h3 className="font-semibold mt-2 mb-1 text-neutral-700">
            Self-Contained with Data URIs
          </h3>
          <p className="text-neutral-700 mb-2">
            To avoid external image requests, displacement map textures can be
            inlined as base64 data URIs directly inside the SVG filter
            definition:
          </p>
          <div className="my-4 rounded-md">
            <CodeBlock language="javascript" code={codeSnippetDataUri} />
          </div>
          <p className="text-neutral-700">
            This keeps the component fully portable — no assets folder, no
            network requests, no cache concerns.
          </p>
        </div>

        {/* Limitations */}
        <div>
          <h3 className="font-semibold mt-2 mb-1 text-neutral-700">
            Known Limitations
          </h3>
          <p className="text-neutral-700">
            Pure CSS and SVG filters cannot easily replicate dynamic shadows,
            chromatic aberration, or complex angle-dependent light behaviour.
            For full physical fidelity — the kind seen in Apple's visionOS glass
            surfaces — a shader-based approach (WebGL/GLSL) or a JavaScript
            rendering loop would be required. For most UI use cases, however,
            the CSS-only approach is lightweight, performant, and visually
            compelling enough.
          </p>
        </div>

        <SourceCodeButton
          componentName="LiquidGlass"
          hrefLink="https://github.com/prash240303/crafts/blob/main/src/app/dock/page.tsx"
        />
      </div>
    </ComponentLayout>
  );
}

export default Page;
