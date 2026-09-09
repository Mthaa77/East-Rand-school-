"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Command, CornerDownLeft, X } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { SITE_PAGES } from "@/lib/navigation";
import { OPEN_SHORTCUTS_EVENT } from "@/lib/interaction-events";

// 1–6 open the six pages of the site — works from any route.
const PAGE_KEYS = SITE_PAGES.map((p, i) => ({
  key: String(i + 1),
  label: p.short,
  path: p.path,
}));

function isTyping(target: EventTarget | null): boolean {
  const el = target as HTMLElement | null;
  if (!el) return false;
  const tag = el.tagName;
  return (
    tag === "INPUT" ||
    tag === "TEXTAREA" ||
    tag === "SELECT" ||
    el.isContentEditable === true
  );
}

export function ShortcutsDialog() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      // "?" (Shift + /) reveals the sheet.
      if (e.key === "?" && !isTyping(e.target)) {
        e.preventDefault();
        setOpen(true);
        return;
      }
      // Digits 1–6 open the site's pages — only with nothing typed and no
      // dialog in the way (the palette and the dossiers own the keyboard then).
      if (open || e.metaKey || e.ctrlKey || e.altKey || isTyping(e.target)) return;
      if (document.querySelector("[role='dialog']")) return;
      const hit = PAGE_KEYS.find((s) => s.key === e.key);
      if (hit) router.push(hit.path);
    }
    function onOpenRequest() {
      setOpen(true);
    }
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_SHORTCUTS_EVENT, onOpenRequest);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_SHORTCUTS_EVENT, onOpenRequest);
    };
  }, [open, router]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="top-[42%] rounded-3xl border-paper/15 bg-ink-900 p-0 shadow-lift sm:max-w-md">
        <div aria-hidden="true" className="grain pointer-events-none absolute inset-0 z-20 opacity-50" />

        <div className="relative overflow-hidden border-b border-paper/10 bg-gradient-to-br from-gold-500/[0.14] via-transparent to-crimson-500/[0.08] px-7 pb-5 pt-6">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-2 -top-6 select-none font-display text-[7rem] font-bold leading-none text-outline-gold opacity-25"
          >
            ?
          </span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close the shortcuts sheet"
            className="absolute right-4 top-4 z-30 grid size-9 place-items-center rounded-full border border-paper/20 bg-ink-950/60 text-paper/80 backdrop-blur-sm transition-all duration-300 hover:rotate-90 hover:border-gold-400 hover:text-gold-300"
          >
            <X className="size-4" />
          </button>
          <p className="relative z-10 font-mono text-[0.6rem] tracking-[0.3em] text-gold-300">
            STAGEHAND&apos;S KEYS
          </p>
          <DialogTitle className="relative z-10 mt-2 font-display text-2xl font-medium text-paper">
            Keyboard shortcuts.
          </DialogTitle>
          <DialogDescription className="sr-only">
            Every keyboard shortcut available on the school website.
          </DialogDescription>
        </div>

        <div className="relative px-7 py-6">
          <ul className="space-y-3">
            <li className="flex items-center gap-4">
              <span className="flex w-24 shrink-0 gap-1">
                <kbd className="inline-flex min-w-9 items-center justify-center gap-1 rounded-md border border-paper/20 bg-ink-950 px-2 py-1.5 font-mono text-[0.62rem] text-paper/70">
                  <Command className="size-3" aria-hidden="true" />K
                </kbd>
              </span>
              <p className="text-sm text-paper/65">Open the search palette — go anywhere.</p>
            </li>
            {PAGE_KEYS.map((s) => (
              <li key={s.key} className="flex items-center gap-4">
                <kbd className="inline-flex w-24 shrink-0 items-center justify-center rounded-md border border-paper/20 bg-ink-950 px-2 py-1.5 font-mono text-[0.62rem] text-paper/70">
                  {s.key}
                </kbd>
                <p className="text-sm text-paper/65">Open the {s.label === "News" ? "news & events" : s.label.toLowerCase()} page.</p>
              </li>
            ))}
            <li className="flex items-center gap-4">
              <kbd className="inline-flex w-24 shrink-0 items-center justify-center rounded-sm border border-paper/20 bg-ink-950 px-2 py-1.5 font-mono text-[0.62rem] text-paper/70">
                esc
              </kbd>
              <p className="text-sm text-paper/65">Close whatever is open.</p>
            </li>
            <li className="flex items-center gap-4">
              <kbd className="inline-flex w-24 shrink-0 items-center justify-center rounded-sm border border-paper/20 bg-ink-950 px-2 py-1.5 font-mono text-[0.62rem] text-paper/70">
                ?
              </kbd>
              <p className="text-sm text-paper/65">Reveal this sheet again.</p>
            </li>
          </ul>

          <p className="mt-6 flex items-start gap-2 border-t border-paper/10 pt-4 text-[0.68rem] leading-relaxed text-paper/35">
            <CornerDownLeft className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
            Inside the palette, ↑↓ browse and ↵ opens. Single keys never fire while
            you are typing in a field.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
