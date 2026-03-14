"use client";

import { Keyboard } from "@/components/ui/keyboard";
import { useRef, useEffect, useState } from "react";

// ProseMirror Imports
import { EditorState } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import { schema } from "prosemirror-schema-basic";
import {
  baseKeymap,
  chainCommands,
  deleteSelection,
  joinBackward,
} from "prosemirror-commands";
import { keymap } from "prosemirror-keymap";
import Image from "next/image";

const LINE_HEIGHT = 20;
const STORAGE_KEY = "typewriter-content";
const FONT_STORAGE_KEY = "typewriter-font";

const FONTS = [
  { label: "Special Elite", value: "'Special Elite', monospace" },
  { label: "Courier Prime", value: "'Courier Prime', monospace" },
  { label: "Playfair Display", value: "'Playfair Display', serif" },
  { label: "Cormorant Garamond", value: "'Cormorant Garamond', serif" },
  { label: "Instrument Serif", value: "'Instrument Serif', serif" },
];
const GOOGLE_FONTS_URL =
  "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300..700;1,300..700&family=Courier+Prime:ital,wght@0,400;0,700;1,400;1,700&family=Instrument+Serif:ital@0;1&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Special+Elite&display=swap";

// ── Helpers ──────────────────────────────────────────────────────────────────

/** Wrap a single line of text, returning an array of wrapped lines */
function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const test = current ? `${current} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && current) {
      lines.push(current);
      current = word;
    } else {
      current = test;
    }
  }
  if (current) lines.push(current);
  return lines.length ? lines : [""];
}

/** Draw a single styled text segment, returning new x position */
function drawSegment(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  fontSize: number,
  fontFamily: string,
  italic: boolean,
  bold: boolean,
): number {
  const style = `${italic ? "italic " : ""}${bold ? "bold " : ""}${fontSize}px ${fontFamily}`;
  ctx.font = style;
  ctx.fillText(text, x, y);
  return x + ctx.measureText(text).width;
}

// ── Paragraph type ────────────────────────────────────────────────────────────
interface Segment {
  text: string;
  italic: boolean;
  bold: boolean;
}

// ── Main Export Function ──────────────────────────────────────────────────────

function exportLetterToPNG(
  view: EditorView,
  selectedFont: string,
  filename = "letter.png",
) {
  // --- 1. Collect paragraphs from ProseMirror doc ---
  const paragraphs: Segment[][] = [];
  view.state.doc.forEach((paraNode) => {
    const segs: Segment[] = [];
    paraNode.forEach((child) => {
      if (child.isText && child.text) {
        segs.push({
          text: child.text,
          italic: child.marks.some((m) => m.type.name === "em"),
          bold: child.marks.some((m) => m.type.name === "strong"),
        });
      }
    });
    paragraphs.push(segs);
  });

  // --- 2. Load background image first, then draw ---
  const bgImage = new window.Image();
  bgImage.src = "/letter_export_bg.png"; // ← your image in /public
  bgImage.onload = () => {
    const W = bgImage.naturalWidth;
    const H = bgImage.naturalHeight;

    // Text layout constants — tweak these to position text on the blank paper area
    const PAD_X = 120; // left/right margin (pixels, relative to W)
    const PAD_TOP = 200; // top of text area
    const PAD_BOTTOM = 300; // bottom margin
    const FONT_SIZE = 22;
    const LINE_H = 38;
    const PARA_GAP = LINE_H * 0.6;
    const maxTextWidth = W - PAD_X * 2;

    // --- 3. Create canvas matching image size ---
    const dpr = 2;
    const canvas = document.createElement("canvas");
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    const ctx = canvas.getContext("2d")!;
    ctx.scale(dpr, dpr);

    // --- 4. Draw background image ---
    ctx.drawImage(bgImage, 0, 0, W, H);

    // --- 5. Render paragraphs over the image ---
    ctx.fillStyle = "#2c2010"; // dark ink color
    let curY = PAD_TOP + FONT_SIZE;

    for (const segs of paragraphs) {
      const fullText = segs.map((s) => s.text).join("");

      if (!fullText.trim()) {
        curY += LINE_H * 0.8;
        continue;
      }

      ctx.font = `${FONT_SIZE}px ${selectedFont}`;
      const wrappedLines = wrapText(ctx, fullText, maxTextWidth);

      let segIdx = 0;
      let charOffset = 0;

      for (const line of wrappedLines) {
        let x = PAD_X;
        let remaining = line;

        while (remaining.length > 0 && segIdx < segs.length) {
          const seg = segs[segIdx];
          const segRemain = seg.text.slice(charOffset);

          if (segRemain.length <= remaining.length) {
            x = drawSegment(
              ctx,
              segRemain,
              x,
              curY,
              FONT_SIZE,
              selectedFont,
              seg.italic,
              seg.bold,
            );
            remaining = remaining.slice(segRemain.length);
            segIdx++;
            charOffset = 0;
          } else {
            x = drawSegment(
              ctx,
              remaining,
              x,
              curY,
              FONT_SIZE,
              selectedFont,
              seg.italic,
              seg.bold,
            );
            charOffset += remaining.length;
            remaining = "";
          }
        }

        curY += LINE_H;

        // Stop rendering if we've gone past the paper area
        if (curY > H - PAD_BOTTOM) break;
      }

      curY += PARA_GAP;
      if (curY > H - PAD_BOTTOM) break;
    }

    // --- 6. Download ---
    const link = document.createElement("a");
    link.download = filename;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  bgImage.onerror = () => {
    console.error("Failed to load background image for export.");
  };
}

// ── Page Component ────────────────────────────────────────────────────────────

export default function Page() {
  const paperRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);
  const paperRef2 = useRef<HTMLImageElement>(null);
  const [editorMaxHeight, setEditorMaxHeight] = useState(380);
  const [exporting, setExporting] = useState(false);

  const [selectedFont, setSelectedFont] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(FONT_STORAGE_KEY) ?? FONTS[0].value;
    }
    return FONTS[0].value;
  });

  useEffect(() => {
    if (!paperRef2.current) return;
    const update = () => {
      const paperHeight = paperRef2.current!.offsetHeight;
      setEditorMaxHeight(paperHeight - 96 - 48);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Add these refs near the top of the component, alongside existing refs:
  const selectedFontRef = useRef(selectedFont);
  const editorMaxHeightRef = useRef(editorMaxHeight);
  const [isAtLimit, setIsAtLimit] = useState(false);

  // Keep refs in sync with state
  useEffect(() => {
    selectedFontRef.current = selectedFont;
  }, [selectedFont]);
  useEffect(() => {
    editorMaxHeightRef.current = editorMaxHeight;
  }, [editorMaxHeight]);

  // Add this helper outside the component, alongside wrapText / drawSegment:
  function countEditorLines(
    doc: EditorState["doc"],
    fontFamily: string,
    maxWidth: number,
    fontSize: number,
  ): number {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;
    let totalLines = 0;

    doc.forEach((paraNode) => {
      const text = paraNode.textContent ?? "";
      if (!text.trim()) {
        totalLines += 1; // blank paragraph = 1 line
        return;
      }
      ctx.font = `${fontSize}px ${fontFamily}`;
      const wrapped = wrapText(ctx, text, maxWidth);
      totalLines += wrapped.length;
    });

    return totalLines;
  }

  // Inject Google Fonts link once
  useEffect(() => {
    if (document.getElementById("gfonts-typewriter")) return;
    const link = document.createElement("link");
    link.id = "gfonts-typewriter";
    link.rel = "stylesheet";
    link.href = GOOGLE_FONTS_URL;
    document.head.appendChild(link);
  }, []);

  // Override ProseMirror font via style tag
  useEffect(() => {
    let styleTag = document.getElementById(
      "pm-font-override",
    ) as HTMLStyleElement | null;
    if (!styleTag) {
      styleTag = document.createElement("style");
      styleTag.id = "pm-font-override";
      document.head.appendChild(styleTag);
    }
    styleTag.textContent = `
  .ProseMirror { font-family: ${selectedFont} !important; outline: none !important; }
  .ProseMirror p { margin: 0; line-height: ${LINE_HEIGHT}px; }
`;
  }, [selectedFont]);

  // Initialize ProseMirror
  useEffect(() => {
    if (!editorRef.current) return;

    let doc;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        doc = schema.nodeFromJSON(JSON.parse(saved));
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }

    const state = EditorState.create({
      schema,
      doc,
      plugins: [keymap(baseKeymap)],
    });

    const view = new EditorView(editorRef.current, {
      state,
      // Replace the entire dispatchTransaction block inside the EditorView constructor:
      dispatchTransaction(transaction) {
        const newState = view.state.apply(transaction);

        if (transaction.docChanged) {
          const EDITOR_FONT_SIZE = 18;
          const EDITOR_MAX_WIDTH = 410; // editor width (430px) minus p-2 padding each side
          const MAX_LINES = Math.floor(
            editorMaxHeightRef.current / LINE_HEIGHT,
          );

          const lineCount = countEditorLines(
            newState.doc,
            selectedFontRef.current,
            EDITOR_MAX_WIDTH,
            EDITOR_FONT_SIZE,
          );

          if (lineCount > MAX_LINES) {
            // Reject the transaction — don't update state
            setIsAtLimit(true);
            return;
          }

          setIsAtLimit(false);
          view.updateState(newState);

          try {
            localStorage.setItem(
              STORAGE_KEY,
              JSON.stringify(newState.doc.toJSON()),
            );
          } catch {}

          if (paperRef.current) {
            paperRef.current.scrollTo({
              top: paperRef.current.scrollHeight,
              behavior: "smooth",
            });
          }
        } else {
          // Cursor moves, selections etc — always allow
          view.updateState(newState);
        }
      },
    });

    viewRef.current = view;
    view.focus();

    return () => {
      view.destroy();
    };
  }, []);

  const handleFontChange = (value: string) => {
    setSelectedFont(value);
    localStorage.setItem(FONT_STORAGE_KEY, value);
  };

  const handleKeyEvent = ({ code, phase }: { code: string; phase: string }) => {
    if (phase !== "down") return;
    const view = viewRef.current;
    if (!view) return;
    view.focus();

    const { state, dispatch } = view;

    if (code === "Backspace") {
      chainCommands(deleteSelection, joinBackward)(state, dispatch);
      return;
    }

    if (code === "Enter") {
      const enterCmd = baseKeymap["Enter"];
      if (enterCmd) enterCmd(state, dispatch);
      return;
    }

    let char = "";
    if (code === "Space") char = " ";
    else if (code === "Tab") char = "\t";
    else {
      const m = code.match(/^Key([A-Z])$/);
      const d = code.match(/^Digit(\d)$/);
      const special: Record<string, string> = {
        Minus: "-",
        Equal: "=",
        BracketLeft: "[",
        BracketRight: "]",
        Backslash: "\\",
        Semicolon: ";",
        Quote: "'",
        Comma: ",",
        Period: ".",
        Slash: "/",
        Backquote: "`",
      };
      if (m) char = m[1].toLowerCase();
      else if (d) char = d[1];
      else if (special[code]) char = special[code];
    }
  };

  const handleExport = async () => {
    const view = viewRef.current;
    if (!view) return;
    setExporting(true);
    // Small delay to allow fonts to be ready in canvas context
    await document.fonts.ready;
    setTimeout(() => {
      try {
        exportLetterToPNG(view, selectedFont, "my-letter.png");
      } finally {
        setExporting(false);
      }
    }, 100);
  };

  return (
    <div className="relative p-4 mx-auto h-full w-full">
      <div className="w-screen absolute inset-0 h-screen">
        <Image alt="bg" fill src="/typewriter_bg.png" />
      </div>
      {/* ── Font Selector ── */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3">
        <div className="relative">
          <select
            value={selectedFont}
            onChange={(e) => handleFontChange(e.target.value)}
            className="appearance-none pl-4 pr-10 py-2 rounded-full text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-400"
            style={{
              background: "rgba(245, 235, 210, 0.88)",
              border: "1px solid rgba(160, 130, 80, 0.5)",
              color: "#3a3025",
              fontFamily: selectedFont,
              backdropFilter: "blur(6px)",
              boxShadow:
                "0 2px 8px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.5)",
            }}
          >
            {FONTS.map((font) => (
              <option
                key={font.value}
                value={font.value}
                style={{ fontFamily: font.value }}
              >
                {font.label}
              </option>
            ))}
          </select>
          {/* Dropdown arrow */}
          <div
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"
            style={{ color: "#3a3025" }}
          >
            <svg width="10" height="6" viewBox="0 0 10 6" fill="currentColor">
              <path d="M0 0l5 6 5-6z" />
            </svg>
          </div>
        </div>

        {/* ── Export Button ── */}
        <button
          onClick={handleExport}
          disabled={exporting}
          title="Export as PNG"
          style={{
            background: exporting
              ? "rgba(200,180,130,0.7)"
              : "rgba(245, 235, 210, 0.88)",
            border: "1px solid rgba(160, 130, 80, 0.5)",
            color: "#3a3025",
            backdropFilter: "blur(6px)",
            boxShadow:
              "0 2px 8px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.5)",
            fontFamily: "'Special Elite', monospace",
            transition: "all 0.2s ease",
          }}
          className="flex items-center z-50 border border-red-500 gap-2 pl-4 pr-4 py-2 rounded-full text-sm cursor-pointer hover:brightness-95 active:scale-95 disabled:cursor-wait select-none"
        >
          {exporting ? (
            <>
              {/* Spinner */}
              <svg
                className="animate-spin"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
              </svg>
              Exporting…
            </>
          ) : (
            <>
              {/* Envelope / download icon */}
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
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Export Letter
            </>
          )}
        </button>
      </div>
      {/* ── ProseMirror editor ── */}
      <div
        ref={editorRef}
        className="absolute p-2 top-36 left-40 z-50 w-[430px]"
        style={{
          fontFamily: selectedFont,
          fontSize: 18,
          lineHeight: `${LINE_HEIGHT}px`,
          color: "#3a3025",
          letterSpacing: "0.05em",
          maxHeight: editorMaxHeight,
          overflowY: "auto",
          scrollBehavior: "smooth",
        }}
      />
      {/*  visual indicator for word limit */}
      {isAtLimit && (
        <div
          className="absolute z-50 flex items-center gap-2 px-3 py-1.5 rounded-full text-xs"
          style={{
            top: `calc(36px + ${editorMaxHeight}px + 144px)`, 
            left: "50%",
            transform: "translateX(-50%)",
            background: "rgba(80, 30, 10, 0.82)",
            color: "#f5ddb0",
            fontFamily: "'Special Elite', monospace",
            backdropFilter: "blur(6px)",
            border: "1px solid rgba(200, 120, 60, 0.5)",
            boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
            whiteSpace: "nowrap",
            pointerEvents: "none",
          }}
        >
          {/* Ink-blot warning icon */}
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
          </svg>
          Page full — the letter cannot grow any longer in order to export your letter
        </div>
      )}
      <Image
        ref={paperRef2}
        alt="paper"
        src="/paper.png"
        width={1000}
        height={1000}
        className="absolute w-[500px] h-auto aspect-auto left-32 top-24 z-10"
      />
      {/* Keyboard */}
      <div className="h-fit w-fit absolute -top-10 right-24">
        <Keyboard
          enableHaptics={true}
          enableSound={true}
          onKeyEvent={handleKeyEvent}
        />
      </div>
    </div>
  );
}
