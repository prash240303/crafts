"use client";
import ComponentLayout from "@/components/layoutComponents/ComponentLayout";
import CodeBlock from "../../../components/layoutComponents/CodeBlock";
import SourceCodeButton from "@/components/ui/sourceCodeButton";
import Link from "next/link";

// ── Code Snippets ────────────────────────────────────────────────────────────

const snippetArrowShape = `
const getArrowStyles = (index: number) => ({
  height: '2px', width: '2px',
  borderRadius: '2px', backgroundColor: '#000',
  ...positions[index],           // positional offsets
});`;

const snippetFontSystem = `
const FONTS = [
  { label: "Special Elite",       value: "'Special Elite', monospace" },
  { label: "Courier Prime",       value: "'Courier Prime', monospace" },
  { label: "Playfair Display",    value: "'Playfair Display', serif"  },
  { label: "Cormorant Garamond",  value: "'Cormorant Garamond', serif"},
  { label: "Instrument Serif",    value: "'Instrument Serif', serif"  },
];

// Inject Google Fonts once on mount
useEffect(() => {
  if (document.getElementById("gfonts-typewriter")) return;
  const link = document.createElement("link");
  link.id   = "gfonts-typewriter";
  link.rel  = "stylesheet";
  link.href = GOOGLE_FONTS_URL;
  document.head.appendChild(link);
}, []);

// Live-swap the ProseMirror font via a <style> override
useEffect(() => {
  let tag = document.getElementById("pm-font-override") as HTMLStyleElement;
  if (!tag) { tag = document.createElement("style"); tag.id = "pm-font-override"; document.head.appendChild(tag); }
  tag.textContent = \`
    .ProseMirror { font-family: \${selectedFont} !important; outline: none !important; }
    .ProseMirror p { margin: 0; line-height: \${LINE_HEIGHT}px; }
  \`;
}, [selectedFont]);
`;

const snippetProseMirror = `
const state = EditorState.create({
  schema,                          // prosemirror-schema-basic
  doc,                             // restored from localStorage (if any)
  plugins: [keymap(baseKeymap)],   // arrow keys, Backspace, Enter…
});

const view = new EditorView(editorRef.current, {
  state,
  dispatchTransaction(transaction) {
    const newState = view.state.apply(transaction);

    if (transaction.docChanged) {
      const lineCount = countEditorLines(
        newState.doc, selectedFontRef.current,
        EDITOR_MAX_WIDTH, EDITOR_FONT_SIZE,
      );

      if (lineCount > MAX_LINES) {
        setIsAtLimit(true);
        return;               // ← reject the transaction — page is full
      }

      setIsAtLimit(false);
      view.updateState(newState);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newState.doc.toJSON()));
    } else {
      view.updateState(newState);   // cursor moves always allowed
    }
  },
});
`;

const snippetLineCount = `
function countEditorLines(
  doc: EditorState["doc"],
  fontFamily: string,
  maxWidth: number,
  fontSize: number,
): number {
  // Use an off-screen canvas to measure real text widths
  const ctx = document.createElement("canvas").getContext("2d")!;
  let totalLines = 0;

  doc.forEach((paraNode) => {
    const text = paraNode.textContent ?? "";
    if (!text.trim()) { totalLines += 1; return; }  // blank line counts
    ctx.font = \`\${fontSize}px \${fontFamily}\`;
    totalLines += wrapText(ctx, text, maxWidth).length;
  });

  return totalLines;
}
`;

const snippetExport = `
function exportLetterToPNG(view: EditorView, selectedFont: string) {
  // 1. Walk the ProseMirror doc → array of { text, italic, bold } segments
  const paragraphs: Segment[][] = [];
  view.state.doc.forEach((paraNode) => {
    const segs: Segment[] = [];
    paraNode.forEach((child) => {
      if (child.isText && child.text)
        segs.push({
          text:   child.text,
          italic: child.marks.some((m) => m.type.name === "em"),
          bold:   child.marks.some((m) => m.type.name === "strong"),
        });
    });
    paragraphs.push(segs);
  });

  // 2. Load /public/letter_export_bg.png as the paper background
  const bgImage = new window.Image();
  bgImage.src = "/letter_export_bg.png";
  bgImage.onload = () => {
    const canvas = document.createElement("canvas");
    canvas.width  = bgImage.naturalWidth  * 2;   // 2× for retina
    canvas.height = bgImage.naturalHeight * 2;
    const ctx = canvas.getContext("2d")!;
    ctx.scale(2, 2);

    ctx.drawImage(bgImage, 0, 0, bgImage.naturalWidth, bgImage.naturalHeight);

    // 3. Render each paragraph over the image, wrapping at PAD_X
    ctx.fillStyle = "#2c2010";
    let curY = PAD_TOP + FONT_SIZE;
    for (const segs of paragraphs) { /* ... draw each wrapped line ... */ }

    // 4. Trigger download
    const a  = document.createElement("a");
    a.download = "my-letter.png";
    a.href     = canvas.toDataURL("image/png");
    a.click();
  };
}
`;

const snippetKeyboardHandler = `
const handleKeyEvent = ({ code, phase }: { code: string; phase: string }) => {
  if (phase !== "down") return;
  const { state, dispatch } = view;

  if (code === "Backspace") {
    chainCommands(deleteSelection, joinBackward)(state, dispatch);
    return;
  }
  if (code === "Enter") {
    baseKeymap["Enter"]?.(state, dispatch);
    return;
  }

  // Map KeyA–KeyZ, Digit0–9, and common symbols to characters
  let char = "";
  if (code === "Space")   char = " ";
  else if (/^Key([A-Z])$/.test(code))   char = code[3].toLowerCase();
  else if (/^Digit(\\d)$/.test(code))   char = code[5];
  else char = SPECIAL_KEYS[code] ?? "";   // { Minus:"-", Period:".", … }

  if (char) view.dispatch(state.tr.insertText(char));
};
`;

// ── Page ──────────────────────────────────────────────────────────────────────

export default function TypewriterPage() {
  return (
    <ComponentLayout
      title="Typewriter Keyboard Component"
      description="A vintage typewriter experience built on a physical keyboard UI, ProseMirror rich text, and a canvas-based PNG export — all wired together in one atmospheric page."
    >
      {/* ── Live preview / CTA ─────────────────────────────────────────── */}
      <div className="relative bg-[#1c1510] w-full max-w-2xl flex flex-col items-center justify-center rounded-lg border border-neutral-700 min-h-80 overflow-hidden gap-4 p-6">
        {/* decorative grain */}
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
            backgroundSize: "150px",
          }}
        />

        {/* typewriter SVG deco */}
        <svg
          width="64"
          height="40"
          viewBox="0 0 64 40"
          fill="none"
          className="opacity-60"
        >
          <rect x="4" y="18" width="56" height="18" rx="3" fill="#8b7355" />
          <rect x="10" y="12" width="44" height="10" rx="2" fill="#6b5a3e" />
          <rect x="14" y="6" width="36" height="8" rx="1" fill="#5a4a30" />
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <rect key={i} x={12 + i * 6} y="22" width="4" height="4" rx="1" fill="#3a2e1e" />
          ))}
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <rect key={i} x={15 + i * 6} y="28" width="4" height="4" rx="1" fill="#3a2e1e" />
          ))}
          <rect x="20" y="34" width="24" height="3" rx="1" fill="#3a2e1e" />
        </svg>

        <p
          className="text-amber-100/70 text-sm text-center z-10 max-w-xs"
          style={{ fontFamily: "'Special Elite', monospace" }}
        >
          The full experience requires a screen wide enough for the keyboard.
          Click below to open it.
        </p>

        <Link
          href="/crafts/keyboard"
          target="_blank"
          rel="noopener noreferrer"
          className="z-10 group relative flex items-center gap-2 px-6 py-2.5 rounded-full text-sm transition-all duration-300 hover:scale-105 active:scale-95"
          style={{
            background: "rgba(245, 220, 150, 0.12)",
            border: "1px solid rgba(200, 160, 80, 0.45)",
            color: "#f5dda0",
            fontFamily: "'Special Elite', monospace",
            boxShadow: "0 0 24px rgba(200,150,50,0.15)",
            backdropFilter: "blur(8px)",
          }}
        >
          {/* key icon */}
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
          </svg>
          Open Typewriter Experience
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

        <p className="text-neutral-500 text-xs z-10">
          Opens in a new tab · Only available on desktop
        </p>
      </div>

      {/* ── Narrative ──────────────────────────────────────────────────── */}
      <div className="text-base mt-8 text-neutral-700 space-y-6">
        <p>
          This started as a simple question: <em>what if a virtual keyboard
          wasn't just decorative?</em> I wanted clicking keys to actually feel
          like using a typewriter — sound, haptics, and ink on paper — and the
          result to be a real PNG you could send to someone.
        </p>

        {/* ── Font Switcher ── */}
        <div>
          <h3 className="font-semibold mt-2 mb-1 text-neutral-700">
            1 · The Font System
          </h3>
          <p>
            Five Google Fonts are loaded once via a programmatically injected{" "}
            <code className="text-sm bg-neutral-100 px-1 rounded">&lt;link&gt;</code>{" "}
            tag. Switching fonts re-writes a single{" "}
            <code className="text-sm bg-neutral-100 px-1 rounded">&lt;style&gt;</code>{" "}
            override tag that targets <code className="text-sm bg-neutral-100 px-1 rounded">.ProseMirror</code>,
            so the editor responds instantly without a re-mount. The chosen font
            is also persisted to <code className="text-sm bg-neutral-100 px-1 rounded">localStorage</code> so
            your typeface survives a page refresh.
          </p>
          <div className="my-4 rounded-md">
            <CodeBlock language="typescript" code={snippetFontSystem} />
          </div>
        </div>

        {/* ── ProseMirror ── */}
        <div>
          <h3 className="font-semibold mt-2 mb-1 text-neutral-700">
            2 · ProseMirror as the "paper"
          </h3>
          <p>
            Rather than a plain <code className="text-sm bg-neutral-100 px-1 rounded">textarea</code>, the
            editor uses{" "}
            <span className="font-medium text-blue-500">
              <a href="https://prosemirror.net/" target="_blank" rel="noopener noreferrer">
                ProseMirror
              </a>
            </span>{" "}
            so we get rich text (bold, italic) for free. The key trick is inside
            <code className="text-sm bg-neutral-100 px-1 rounded"> dispatchTransaction</code>: every keystroke
            that changes the document is measured against the{" "}
            <em>physical page height</em> before being committed. If the
            rendered line count would exceed{" "}
            <code className="text-sm bg-neutral-100 px-1 rounded">MAX_LINES</code>, the transaction is
            silently rejected — the letter simply cannot grow longer than one
            page.
          </p>
          <div className="my-4 rounded-md">
            <CodeBlock language="typescript" code={snippetProseMirror} />
          </div>
        </div>

        {/* ── Line counting ── */}
        <div>
          <h3 className="font-semibold mt-2 mb-1 text-neutral-700">
            3 · Canvas-based line counting
          </h3>
          <p>
            CSS word-wrap is invisible to JavaScript, so I use an off-screen{" "}
            <code className="text-sm bg-neutral-100 px-1 rounded">canvas</code> to measure the <em>same font
            at the same size</em> as the editor and replicate the wrap logic.
            This gives an accurate line count that matches what the user sees —
            no scroll-height hacks, no DOM measurements.
          </p>
          <div className="my-4 rounded-md">
            <CodeBlock language="typescript" code={snippetLineCount} />
          </div>
        </div>

        {/* ── Keyboard handler ── */}
        <div>
          <h3 className="font-semibold mt-2 mb-1 text-neutral-700">
            4 · Wiring the visual keyboard to ProseMirror
          </h3>
          <p>
            The <code className="text-sm bg-neutral-100 px-1 rounded">Keyboard</code> component fires{" "}
            <code className="text-sm bg-neutral-100 px-1 rounded">onKeyEvent</code> with a{" "}
            <code className="text-sm bg-neutral-100 px-1 rounded">code</code> string (e.g.{" "}
            <code className="text-sm bg-neutral-100 px-1 rounded">"KeyA"</code>,{" "}
            <code className="text-sm bg-neutral-100 px-1 rounded">"Space"</code>,{" "}
            <code className="text-sm bg-neutral-100 px-1 rounded">"Backspace"</code>). The handler maps
            those codes to ProseMirror commands — special keys like{" "}
            <code className="text-sm bg-neutral-100 px-1 rounded">Backspace</code> and{" "}
            <code className="text-sm bg-neutral-100 px-1 rounded">Enter</code> use{" "}
            <code className="text-sm bg-neutral-100 px-1 rounded">chainCommands</code> and{" "}
            <code className="text-sm bg-neutral-100 px-1 rounded">baseKeymap</code>; printable characters are
            inserted via <code className="text-sm bg-neutral-100 px-1 rounded">tr.insertText(char)</code>.
          </p>
          <div className="my-4 rounded-md">
            <CodeBlock language="typescript" code={snippetKeyboardHandler} />
          </div>
        </div>

        {/* ── Export ── */}
        <div>
          <h3 className="font-semibold mt-2 mb-1 text-neutral-700">
            5 · Exporting to PNG
          </h3>
          <p>
            The export function walks the ProseMirror document tree, collecting
            segments with their inline marks (bold / italic). It then loads{" "}
            <code className="text-sm bg-neutral-100 px-1 rounded">/letter_export_bg.png</code> — an
            aged-paper texture — onto a 2× DPI canvas, re-draws every wrapped
            line with the selected font, and triggers a browser download. The
            font is read from{" "}
            <code className="text-sm bg-neutral-100 px-1 rounded">document.fonts.ready</code> before drawing
            to avoid blank-text export bugs.
          </p>
          <div className="my-4 rounded-md">
            <CodeBlock language="typescript" code={snippetExport} />
          </div>
        </div>

        {/* ── Source ── */}
        <SourceCodeButton
          componentName="TypewriterPage"
          hrefLink="https://github.com/prash240303/crafts/blob/main/src/app/crafts/keyboard/page.tsx"
        />
      </div>
    </ComponentLayout>
  );
}