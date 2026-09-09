"use client";

import { useEffect } from "react";
import { Search } from "lucide-react";
import { OPEN_FINDER_EVENT, OPEN_PALETTE_EVENT } from "@/lib/interaction-events";

/**
 * The lightweight half of the command palette: the navbar trigger button and
 * the finder hook. Split out of `command-palette.tsx` so the navbar (rendered
 * on every page) never pulls the cmdk bundle — the full palette is
 * dynamically imported in the root layout and opens on the
 * `ersa:open-palette` window event.
 */

/** Small trigger for the navbar — icon on mobile, ⌘K chip on desktop. */
export function PaletteTrigger() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new CustomEvent(OPEN_PALETTE_EVENT))}
      aria-label="Open site search (Command K)"
      aria-haspopup="dialog"
      className="group inline-flex items-center gap-2 rounded-xl border border-paper/15 bg-ink-900/60 px-2.5 py-2 text-paper/60 shadow-card transition-all duration-300 hover:border-gold-400/60 hover:text-gold-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400/70"
    >
      <Search className="size-4" />
      <kbd className="hidden font-mono text-[0.6rem] tracking-[0.14em] lg:inline">⌘K</kbd>
    </button>
  );
}

/** Listens for the palette's finder action and forwards it upward. */
export function useOpenFinder(handler: () => void) {
  useEffect(() => {
    const fn = () => handler();
    window.addEventListener(OPEN_FINDER_EVENT, fn);
    return () => window.removeEventListener(OPEN_FINDER_EVENT, fn);
  }, [handler]);
}
