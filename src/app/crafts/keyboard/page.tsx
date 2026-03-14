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

const LINE_HEIGHT = 28;
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

export default function Page() {
  const paperRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);

  const [selectedFont, setSelectedFont] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(FONT_STORAGE_KEY) ?? FONTS[0].value;
    }
    return FONTS[0].value;
  });

  // Inject Google Fonts link once
  useEffect(() => {
    if (document.getElementById("gfonts-typewriter")) return;
    const link = document.createElement("link");
    link.id = "gfonts-typewriter";
    link.rel = "stylesheet";
    link.href = GOOGLE_FONTS_URL;
    document.head.appendChild(link);
  }, []);

  // Add this effect right after the Google Fonts injection effect
  useEffect(() => {
    let styleTag = document.getElementById(
      "pm-font-override",
    ) as HTMLStyleElement | null;
    if (!styleTag) {
      styleTag = document.createElement("style");
      styleTag.id = "pm-font-override";
      document.head.appendChild(styleTag);
    }
    styleTag.textContent = `.ProseMirror { font-family: ${selectedFont} !important; }`;
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
      dispatchTransaction(transaction) {
        const newState = view.state.apply(transaction);
        view.updateState(newState);

        if (transaction.docChanged) {
          try {
            localStorage.setItem(
              STORAGE_KEY,
              JSON.stringify(newState.doc.toJSON()),
            );
          } catch {}
        }

        if (paperRef.current) {
          paperRef.current.scrollTo({
            top: paperRef.current.scrollHeight,
            behavior: "smooth",
          });
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

  const currentFontLabel =
    FONTS.find((f) => f.value === selectedFont)?.label ?? "Special Elite";

  return (
    <div className="relative p-4 mx-auto h-full w-full">
      <div className="w-screen absolute inset-0 h-screen">
        <Image alt="bg" fill src="/typewriter_bg.png" />
      </div>

      {/* ── Font Selector ── */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50">
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
      </div>

      {/* ── ProseMirror editor ── */}
      <div
        ref={editorRef}
        className="absolute top-48 left-48 z-50 w-[380px]"
        style={{
          fontFamily: selectedFont,
          fontSize: 15,
          lineHeight: `${LINE_HEIGHT}px`,
          color: "#3a3025",
          letterSpacing: "0.05em",
        }}
      />

      <Image
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
