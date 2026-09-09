"use client";

import { useCallback, useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  CalendarPlus,
  CalendarRange,
  ExternalLink,
  MapPin,
  Newspaper,
  Phone,
  Ticket,
  ShieldCheck,
  RotateCcw,
  Share2,
  X,
} from "lucide-react";
import { SectionHeading } from "@/components/site/proof-bar";
import { Reveal } from "@/components/motion/reveal";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { copyText } from "@/lib/share";
import { buildIcs } from "@/lib/ics";
import { cn } from "@/lib/utils";

type SchoolEvent = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  category: "event" | "news";
  status: string;
  tone: "gold" | "crimson";
  dateISO: string | null;
  venue: string | null;
  ctaLabel: string | null;
  ctaHref: string | null;
  sourceNote: string | null;
};

const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

function dateBadge(dateISO: string) {
  const d = new Date(`${dateISO}T00:00:00`);
  if (Number.isNaN(d.getTime())) return { day: "—", date: "??", year: "" };
  return {
    day: MONTHS[d.getMonth()],
    date: String(d.getDate()).padStart(2, "0"),
    year: String(d.getFullYear()),
  };
}

function fullDate(dateISO: string) {
  const d = new Date(`${dateISO}T00:00:00`);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString("en-ZA", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/** The seed data carries labels but no hrefs — infer a sensible route target. */
function ctaTarget(ctaLabel: string | null): string {
  const l = (ctaLabel ?? "").toLowerCase();
  if (l.includes("proof")) return "/#proof";
  if (l.includes("audition") || l.includes("admission") || l.includes("checklist")) return "/admissions";
  return "/contact";
}

function todayISO(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}

/** "TODAY" / "TOMORROW" / "IN N DAYS" for a still-upcoming dated event. */
function daysAwayChip(dateISO: string): string | null {
  const today = todayISO();
  if (dateISO < today) return null;
  if (dateISO === today) return "TODAY";
  const [ty, tm, td] = today.split("-").map(Number);
  const [ey, em, ed] = dateISO.split("-").map(Number);
  const diff = Math.round(
    (new Date(ey, (em ?? 1) - 1, ed ?? 1).getTime() - new Date(ty, (tm ?? 1) - 1, td ?? 1).getTime()) / 86_400_000
  );
  if (diff === 1) return "TOMORROW";
  return `IN ${diff} DAYS`;
}

function downloadIcs(item: SchoolEvent) {
  const ics = buildIcs(
    [
      {
        slug: item.slug,
        title: item.title,
        summary: item.summary,
        dateISO: item.dateISO!,
        venue: item.venue,
        url: item.ctaHref,
      },
    ],
    { calendarName: "East Rand School of the Arts — notice board" }
  );
  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${item.slug}.ics`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

async function shareItem(item: SchoolEvent, toast: ReturnType<typeof useToast>["toast"]) {
  // Share the deep link — recipients land on the page with this item's dialog open.
  const url = `${window.location.origin}${window.location.pathname}#notice-${item.slug}`;
  if (navigator.share) {
    try {
      await navigator.share({ title: item.title, text: item.summary, url });
      return;
    } catch {
      return; // user dismissed the native share sheet
    }
  }
  const ok = await copyText(url);
  toast(
    ok
      ? { title: "Link copied", description: "Paste it anywhere to share this item." }
      : { variant: "destructive", title: "Could not copy", description: url }
  );
}

const STATUS_LABEL: Record<string, string> = {
  upcoming: "Upcoming",
  admissions: "Admissions",
  past: "Past",
  press: "Press",
};

type Filter = "all" | "event" | "news";

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "Everything" },
  { id: "event", label: "On stage" },
  { id: "news", label: "In the news" },
];

function StatusBadge({ status, tone }: { status: string; tone: "gold" | "crimson" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[0.6rem] font-bold uppercase tracking-[0.2em]",
        tone === "gold" ? "bg-gold-500/15 text-gold-300" : "bg-crimson-500/15 text-crimson-400"
      )}
    >
      <span className="size-1.5 rounded-full bg-current animate-[pulse-dot_2.4s_ease-in-out_infinite]" />
      {STATUS_LABEL[status] ?? status}
    </span>
  );
}

function EventCard({ e, onOpen }: { e: SchoolEvent; onOpen: (e: SchoolEvent) => void }) {
  const badge = e.dateISO ? dateBadge(e.dateISO) : null;
  const daysAway = e.dateISO && e.category === "event" ? daysAwayChip(e.dateISO) : null;
  return (
    <button
      type="button"
      onClick={() => onOpen(e)}
      aria-haspopup="dialog"
      aria-label={`${e.title}. Open details.`}
      className={cn(
        "group flex h-full w-full cursor-pointer flex-col rounded-2xl border p-7 text-left shadow-card transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift",
        "border-paper/10 bg-ink-900 hover:border-gold-500/40 hover:shadow-[0_30px_60px_-30px_rgba(0,0,0,0.8)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400/70"
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          {badge && (
            <div className="flex flex-col items-center rounded-lg border border-gold-500/30 bg-ink-950 px-3.5 py-2.5">
              <span className="text-[0.58rem] font-bold uppercase tracking-[0.24em] text-gold-400">
                {badge.day}
              </span>
              <span className="font-display text-2xl font-semibold leading-none text-paper">
                {badge.date}
              </span>
              <span className="mt-1 font-mono text-[0.5rem] tracking-[0.18em] text-paper/35">
                {badge.year}
              </span>
            </div>
          )}
          <StatusBadge status={e.status} tone={e.tone} />
          {daysAway && (
            <span
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[0.56rem] font-bold tracking-[0.18em]",
                daysAway === "TODAY" || daysAway === "TOMORROW"
                  ? "border-crimson-500/50 bg-crimson-500/10 text-crimson-300"
                  : "border-gold-500/40 bg-gold-500/[0.07] text-gold-300/90"
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "size-1 rounded-full bg-current",
                  (daysAway === "TODAY" || daysAway === "TOMORROW") &&
                    "animate-[pulse-dot_2.4s_ease-in-out_infinite]"
                )}
              />
              {daysAway}
            </span>
          )}
        </div>
        <ArrowUpRight className="size-5 text-paper/30 transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-gold-300" />
      </div>

      <h3 className="mt-6 text-balance font-display text-2xl font-medium leading-snug text-paper">
        {e.title}
      </h3>
      <p className="mt-3 line-clamp-4 flex-1 text-pretty text-sm leading-relaxed text-paper/55">{e.summary}</p>

      <div className="mt-6 space-y-2.5 border-t border-paper/10 pt-5">
        {e.venue && (
          <p className="flex items-start gap-2.5 text-xs text-paper/50">
            <MapPin className="mt-0.5 size-3.5 shrink-0 text-gold-500" />
            {e.venue}
          </p>
        )}
        {e.ctaLabel && (
          <p className="flex items-center gap-2.5 text-xs font-semibold text-gold-300">
            {e.category === "event" ? (
              <Ticket className="size-3.5" />
            ) : (
              <CalendarDays className="size-3.5" />
            )}
            <span className="relative">
              {e.ctaLabel} →
              <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-gold-400 transition-all duration-500 group-hover:w-full" />
            </span>
          </p>
        )}
      </div>
    </button>
  );
}

function NewsRow({ e, index, onOpen }: { e: SchoolEvent; index: number; onOpen: (e: SchoolEvent) => void }) {
  const badge = e.dateISO ? dateBadge(e.dateISO) : null;
  return (
    <button
      type="button"
      onClick={() => onOpen(e)}
      aria-haspopup="dialog"
      aria-label={`${e.title}. Open the full story.`}
      className={cn(
        "group relative flex w-full cursor-pointer flex-col gap-4 border-b border-paper/10 py-6 pl-5 pr-2 text-left transition-all duration-500 sm:flex-row sm:items-start sm:gap-8",
        "hover:bg-paper/[0.025] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gold-400/60"
      )}
    >
      {/* hover rail */}
      <span className="absolute left-0 top-1/2 h-0 w-[2px] -translate-y-1/2 bg-gold-400 transition-all duration-500 group-hover:h-[calc(100%-2rem)]" />

      <div className="flex w-28 shrink-0 flex-row items-baseline gap-2 pt-1 sm:flex-col sm:gap-0.5">
        {badge ? (
          <>
            <span className="font-mono text-[0.62rem] tracking-[0.22em] text-gold-400/90">
              {badge.day} {badge.date}
            </span>
            <span className="font-mono text-[0.62rem] tracking-[0.22em] text-paper/30">
              {badge.year}
            </span>
          </>
        ) : (
          <span className="font-mono text-[0.62rem] tracking-[0.22em] text-gold-400/90">NEWS</span>
        )}
        <span className="hidden font-mono text-[0.6rem] text-paper/25 sm:block">
          № {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-display text-xl font-medium leading-snug text-paper transition-colors duration-300 group-hover:text-gold-200">
            {e.title}
          </h3>
          <ArrowUpRight className="mt-1 size-4 shrink-0 text-paper/25 transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-gold-300" />
        </div>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-paper/55">{e.summary}</p>
        {e.sourceNote && (
          <p className="mt-3 inline-flex items-center gap-2 text-[0.68rem] uppercase tracking-[0.14em] text-paper/35">
            <ShieldCheck className="size-3.5 text-gold-500/70" />
            {e.sourceNote}
          </p>
        )}
      </div>
    </button>
  );
}

function CardSkeleton() {
  return (
    <div className="flex h-full min-h-[300px] flex-col rounded-2xl border border-paper/10 bg-ink-900 p-7 shadow-card">
      <div className="flex items-center justify-between">
        <div className="size-12 animate-pulse rounded-lg bg-paper/10" />
        <div className="h-5 w-20 animate-pulse rounded-full bg-paper/10" />
      </div>
      <div className="mt-6 h-6 w-3/4 animate-pulse rounded-full bg-paper/10" />
      <div className="mt-4 flex-1 space-y-2.5">
        <div className="h-3 w-full animate-pulse rounded-full bg-paper/[0.07]" />
        <div className="h-3 w-5/6 animate-pulse rounded-full bg-paper/[0.07]" />
      </div>
      <div className="mt-6 h-3 w-1/2 animate-pulse rounded-full bg-paper/[0.07]" />
    </div>
  );
}

function CountdownUnit({ value, label }: { value: string; label: string }) {
  return (
    <div className="min-w-[58px] rounded-lg border border-paper/10 bg-ink-950/90 px-2.5 py-2 text-center">
      <p className="font-mono text-xl font-semibold tabular-nums leading-none text-paper">{value}</p>
      <p className="mt-1.5 text-[0.5rem] font-bold uppercase tracking-[0.22em] text-paper/40">{label}</p>
    </div>
  );
}

const pad = (n: number) => String(n).padStart(2, "0");

// Shared 1s clock store — lint-safe (no setState in effects) and SSR-safe
// (the server snapshot is 0, so the first client paint matches the server).
let clockAt = 0;
let clockId: number | null = null;
const clockSubs = new Set<() => void>();
function subscribeClock(onChange: () => void) {
  clockSubs.add(onChange);
  if (clockId === null) {
    clockAt = Date.now();
    clockId = window.setInterval(() => {
      clockAt = Date.now();
      clockSubs.forEach((cb) => cb());
    }, 1000);
  }
  return () => {
    clockSubs.delete(onChange);
    if (clockSubs.size === 0 && clockId !== null) {
      window.clearInterval(clockId);
      clockId = null;
    }
  };
}

/** Live ticker for the next dated event — counts through the end of its day. */
function CountdownBanner({ item, onOpen }: { item: SchoolEvent; onOpen: (e: SchoolEvent) => void }) {
  const now = useSyncExternalStore(subscribeClock, () => clockAt, () => 0);

  const target = useMemo(() => {
    if (!item.dateISO) return null;
    const [y, m, d] = item.dateISO.split("-").map(Number);
    return new Date(y, (m ?? 1) - 1, d ?? 1, 23, 59, 59).getTime();
  }, [item.dateISO]);

  let units: [string, string][] | null = null;
  if (now > 0 && target !== null) {
    const diff = Math.max(0, target - now);
    const days = Math.floor(diff / 86_400_000);
    const hours = Math.floor((diff % 86_400_000) / 3_600_000);
    const mins = Math.floor((diff % 3_600_000) / 60_000);
    const secs = Math.floor((diff % 60_000) / 1000);
    units = [
      [pad(days), "days"],
      [pad(hours), "hrs"],
      [pad(mins), "min"],
      [pad(secs), "sec"],
    ];
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-gold-500/30 bg-gradient-to-r from-gold-500/[0.10] via-ink-900 to-ink-900 shadow-card">
      <div aria-hidden="true" className="grain pointer-events-none absolute inset-0 opacity-50" />
      <div className="relative flex flex-col gap-5 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
        <div className="flex min-w-0 items-center gap-4">
          <span className="relative grid size-10 shrink-0 place-items-center rounded-lg bg-gold-500/15">
            <Ticket className="size-4.5 text-gold-300" />
            <span className="absolute -right-0.5 -top-0.5 size-2 animate-[pulse-dot_2.4s_ease-in-out_infinite] rounded-full bg-gold-400" />
          </span>
          <div className="min-w-0">
            <p className="font-mono text-[0.58rem] tracking-[0.3em] text-gold-300">NEXT ON STAGE</p>
            <button
              type="button"
              onClick={() => onOpen(item)}
              className="mt-0.5 block max-w-full cursor-pointer truncate text-left font-display text-lg font-medium text-paper transition-colors duration-300 hover:text-gold-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400/70 sm:text-xl"
            >
              {item.title}
              <span className="ml-2 inline-block text-gold-400/80 transition-transform duration-300 hover:translate-x-0.5">→</span>
            </button>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          {(units ?? [["--", "days"], ["--", "hrs"], ["--", "min"], ["--", "sec"]]).map(([v, l], i) => (
            <div key={l} className="flex items-center gap-1.5 sm:gap-2">
              {i > 0 && (
                <span aria-hidden="true" className="animate-[pulse-dot_1s_ease-in-out_infinite] font-mono text-lg text-gold-400/70">
                  :
                </span>
              )}
              <CountdownUnit value={v} label={l} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ItemDialog({ item, onClose }: { item: SchoolEvent | null; onClose: () => void }) {
  const { toast } = useToast();
  const router = useRouter();
  const pathname = usePathname();
  const badge = item?.dateISO ? dateBadge(item.dateISO) : null;
  const longDate = item?.dateISO ? fullDate(item.dateISO) : null;

  const goTarget = () => {
    if (!item) return;
    const target = ctaTarget(item.ctaLabel);
    onClose();
    if (target.startsWith("/#")) {
      // Hash on the homepage — scroll if we're there, otherwise ride home first.
      const hash = target.slice(1);
      if (pathname === "/") {
        window.setTimeout(() => {
          document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
        }, 120);
      } else {
        router.push(target);
      }
    } else {
      router.push(target);
    }
  };

  return (
    <Dialog open={!!item} onOpenChange={(open) => !open && onClose()}>
      {item && (
        <DialogContent
          showCloseButton={false}
          className="top-[50%] grid max-h-[88dvh] w-full grid-rows-[auto_minmax(0,1fr)] gap-0 overflow-hidden rounded-3xl border-paper/15 bg-ink-900 p-0 shadow-lift sm:max-w-xl"
        >
          <div aria-hidden="true" className="grain pointer-events-none absolute inset-0 z-20 opacity-60" />

          {/* Header band */}
          <div className="relative shrink-0 overflow-hidden border-b border-paper/10 bg-gradient-to-br from-gold-500/[0.16] via-transparent to-crimson-500/[0.10] p-7 pb-6">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -right-3 -top-7 select-none font-display text-[9rem] font-bold leading-none text-outline-gold opacity-30"
            >
              {badge?.date ?? "ERSA"}
            </span>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close details"
              className="absolute right-4 top-4 z-30 grid size-9 place-items-center rounded-full border border-paper/20 bg-ink-950/60 text-paper/80 backdrop-blur-sm transition-all duration-300 hover:rotate-90 hover:border-gold-400 hover:text-gold-300"
            >
              <X className="size-4" />
            </button>

            <div className="relative z-10 pr-12">
              <div className="flex flex-wrap items-center gap-3">
                <p className="font-mono text-[0.6rem] tracking-[0.3em] text-gold-300">
                  {item.category === "event" ? "ON STAGE" : "IN THE NEWS"}
                </p>
                <StatusBadge status={item.status} tone={item.tone} />
              </div>
              <DialogTitle className="mt-3 font-display text-[1.7rem] font-medium leading-snug text-paper">
                {item.title}
              </DialogTitle>
              <DialogDescription className="sr-only">
                {item.summary}
              </DialogDescription>
              {longDate && (
                <p className="mt-2.5 flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-paper/50">
                  <CalendarDays className="size-3.5 text-gold-500" />
                  {longDate}
                </p>
              )}
            </div>
          </div>

          {/* Body */}
          <div className="scroll-gold min-h-0 flex-1 overflow-y-auto px-7 pb-7 pt-5">
            {item.venue && (
              <div className="mb-5 flex items-start gap-3 rounded-2xl border border-paper/10 bg-ink-950/60 px-4 py-3.5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-gold-500" />
                <div>
                  <p className="text-[0.6rem] font-bold uppercase tracking-[0.22em] text-paper/40">
                    Where
                  </p>
                  <p className="mt-1 text-sm text-paper/75">{item.venue}</p>
                </div>
              </div>
            )}

            <p className="text-[0.92rem] leading-[1.85] text-paper/70">{item.summary}</p>

            {item.sourceNote && (
              <div className="mt-6 rounded-2xl border border-gold-500/25 bg-gold-500/[0.05] p-5">
                <p className="flex items-center gap-2 text-[0.62rem] font-bold uppercase tracking-[0.22em] text-gold-300">
                  <ShieldCheck className="size-4" />
                  The receipt
                </p>
                <p className="mt-2.5 text-sm leading-relaxed text-paper/70">{item.sourceNote}</p>
              </div>
            )}

            <p className="mt-5 flex items-start gap-2 text-[0.72rem] leading-relaxed text-paper/40">
              <Phone className="mt-0.5 size-3.5 shrink-0 text-paper/40" />
              Dates, tickets and requirements are confirmed with the school office — please call
              before you travel or book.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-paper/10 pt-5">
              {item.ctaHref ? (
                <a
                  href={item.ctaHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-gold-400 px-6 py-3 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-ink-950 transition-all duration-300 hover:bg-gold-300 hover:shadow-[0_10px_30px_-10px_rgba(212,175,55,0.5)]"
                >
                  {item.ctaLabel ?? "Open the official link"}
                  <ExternalLink className="size-3.5" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              ) : (
                <button
                  type="button"
                  onClick={goTarget}
                  className="inline-flex items-center gap-2 rounded-full bg-gold-400 px-6 py-3 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-ink-950 transition-all duration-300 hover:bg-gold-300 hover:shadow-[0_10px_30px_-10px_rgba(212,175,55,0.5)]"
                >
                  {item.ctaLabel ?? "Contact the school office"}
                  <ArrowRight className="size-4" />
                </button>
              )}
              {item.category === "event" && item.dateISO && (
                <button
                  type="button"
                  onClick={() => downloadIcs(item)}
                  className="inline-flex items-center gap-2 rounded-full border border-gold-500/40 px-5 py-3 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-gold-300 transition-all duration-300 hover:bg-gold-500/10 hover:border-gold-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400/70"
                >
                  <CalendarPlus className="size-4" />
                  Add to calendar
                </button>
              )}
              <button
                type="button"
                onClick={() => shareItem(item, toast)}
                aria-label="Share this item"
                className="grid size-11 place-items-center rounded-full border border-paper/20 text-paper/60 transition-all duration-300 hover:rotate-12 hover:border-gold-400 hover:text-gold-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400/70"
              >
                <Share2 className="size-4" />
              </button>
              <span className="inline-flex items-center gap-2 text-[0.68rem] text-paper/40">
                <MapPin className="size-3.5" />
                1 Jones Street, Daveyton, Benoni
              </span>
            </div>
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
}

export function Events({
  /** Route shown as the section's "open the page" link (homepage only). */
  pageHref,
  pageLabel = "Open the full page",
}: {
  pageHref?: string;
  pageLabel?: string;
}) {
  const [items, setItems] = useState<SchoolEvent[] | null>(null);
  const [lastVerified, setLastVerified] = useState("September 2026");
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>("all");
  const [reloadKey, setReloadKey] = useState(0);
  const [active, setActive] = useState<SchoolEvent | null>(null);

  // Deep links: opening an item writes #notice-<slug>; closing clears it.
  // replaceState keeps the browser history clean (no extra back-button entries).
  const openItem = useCallback((e: SchoolEvent) => {
    setActive(e);
    history.replaceState(null, "", `#notice-${e.slug}`);
  }, []);
  const closeItem = useCallback(() => {
    setActive(null);
    history.replaceState(null, "", window.location.pathname + window.location.search);
  }, []);

  // On load, honour an incoming #notice-<slug> share link (done in the fetch
  // callback rather than an effect — cleaner ownership of the once-per-load read).
  const load = useCallback((signal: AbortSignal, key: number) => {
    fetch(`/api/events?v=${key}`, { signal })
      .then(async (res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data: { events: SchoolEvent[]; lastVerified?: string }) => {
        setItems(data.events);
        if (data.lastVerified) setLastVerified(data.lastVerified);
        const m = /^#notice-([a-z0-9-]+)$/i.exec(window.location.hash);
        if (m) {
          const match = data.events.find((e) => e.slug === m[1]);
          if (match) setActive(match);
        }
      })
      .catch((err) => {
        if ((err as Error).name !== "AbortError") setError("Could not load the notice board.");
      });
  }, []);

  useEffect(() => {
    const ctrl = new AbortController();
    load(ctrl.signal, reloadKey);
    return () => ctrl.abort();
  }, [load, reloadKey]);

  const filtered = useMemo(() => {
    if (!items) return null;
    return filter === "all" ? items : items.filter((e) => e.category === filter);
  }, [items, filter]);

  const eventItems = filtered?.filter((e) => e.category === "event") ?? [];
  const newsItems = filtered?.filter((e) => e.category === "news") ?? [];

  // The earliest dated, still-upcoming event — powers the live countdown strip.
  const nextUpcoming = useMemo(() => {
    if (!items) return null;
    const today = todayISO();
    return (
      items
        .filter((e) => e.category === "event" && e.dateISO && e.dateISO >= today)
        .sort((a, b) => (a.dateISO! < b.dateISO! ? -1 : 1))[0] ?? null
    );
  }, [items]);

  const counts = useMemo(() => {
    if (!items) return { all: 0, event: 0, news: 0 };
    return {
      all: items.length,
      event: items.filter((e) => e.category === "event").length,
      news: items.filter((e) => e.category === "news").length,
    };
  }, [items]);

  return (
    <section id="events" aria-label="News and events" className="relative bg-ink-950 grain">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-10 lg:py-32">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading
            kicker="What's happening next"
            title="The East Rand is the stage."
            accentWords={["stage."]}
            description="Festivals, auditions, showcases and press — every date a parent needs, every receipt a sceptic can check."
            pageHref={pageHref}
            pageLabel={pageLabel}
          />
          <p className="max-w-[240px] border-l border-gold-500/50 pl-4 text-xs leading-relaxed text-paper/45">
            Dates are confirmed with the school office. Last verified: {lastVerified}.
          </p>
        </div>

        {/* Season calendar — one subscribable feed for every dated event. */}
        <Reveal delay={0.02}>
          <a
            href="/api/calendar"
            download="ersa-season.ics"
            aria-label="Download or subscribe to the season calendar (.ics feed of every upcoming dated event)"
            className="group relative mt-10 flex w-full items-center gap-4 overflow-hidden rounded-2xl border border-dashed border-gold-500/40 bg-gold-500/[0.05] px-5 py-4 transition-all duration-500 hover:-translate-y-0.5 hover:border-gold-400 hover:bg-gold-500/[0.10] hover:shadow-[0_18px_40px_-24px_rgba(212,175,55,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400/70 sm:w-auto sm:min-w-[320px]"
          >
            <span className="grid size-11 shrink-0 place-items-center rounded-lg border border-gold-500/30 bg-ink-950 text-gold-300 transition-transform duration-500 group-hover:-rotate-6">
              <CalendarRange className="size-5" strokeWidth={1.9} />
            </span>
            <span className="min-w-0">
              <span className="block font-mono text-[0.62rem] font-bold tracking-[0.28em] text-gold-300">
                SEASON CALENDAR
              </span>
              <span className="mt-1 block text-xs leading-relaxed text-paper/55">
                Every upcoming date, one file — subscribe or download the .ics feed.
              </span>
            </span>
            <ArrowRight className="ml-auto size-4 shrink-0 text-gold-400/70 transition-transform duration-500 group-hover:translate-x-1" />
            {/* ticket notches */}
            <span aria-hidden="true" className="absolute -left-2.5 top-1/2 size-5 -translate-y-1/2 rounded-full bg-ink-950" />
            <span aria-hidden="true" className="absolute -right-2.5 top-1/2 size-5 -translate-y-1/2 rounded-full bg-ink-950" />
          </a>
        </Reveal>

        {/* Next-on-stage countdown */}
        {nextUpcoming && (
          <Reveal delay={0.05}>
            <div className="mt-10">
              <CountdownBanner item={nextUpcoming} onOpen={openItem} />
            </div>
          </Reveal>
        )}

        {/* Filter tabs */}
        <Reveal delay={0.1}>
          <div
            role="tablist"
            aria-label="Filter news and events"
            className="mt-8 inline-flex flex-wrap items-center gap-1 rounded-full border border-paper/10 bg-ink-900/80 p-1.5 backdrop-blur-sm"
          >
            {FILTERS.map((f) => {
              const active = filter === f.id;
              return (
                <button
                  key={f.id}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setFilter(f.id)}
                  className={cn(
                    "relative rounded-full px-5 py-2 text-[0.68rem] font-bold uppercase tracking-[0.18em] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400/70",
                    active ? "text-ink-950" : "text-paper/55 hover:text-paper"
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="events-tab-pill"
                      transition={{ type: "spring", bounce: 0.18, duration: 0.55 }}
                      className="absolute inset-0 rounded-full bg-gold-400"
                    />
                  )}
                  <span className="relative z-10">
                    {f.label}
                    <span className={cn("ml-2 font-mono text-[0.6rem]", active ? "text-ink-950/60" : "text-paper/30")}>
                      {counts[f.id]}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Content */}
        <div className="mt-10 min-h-[420px]">
          {error && (
            <div className="flex flex-col items-start gap-4 rounded-2xl border border-crimson-500/30 bg-crimson-500/[0.06] p-8">
              <p className="font-display text-xl text-paper">{error}</p>
              <p className="text-sm text-paper/50">
                The notice board could not be reached. Check your connection and try again.
              </p>
              <button
                onClick={() => {
                  setError(null);
                  setReloadKey((k) => k + 1);
                }}
                className="inline-flex items-center gap-2 rounded-full border border-gold-500/40 px-5 py-2.5 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-gold-300 transition-colors hover:bg-gold-500/10"
              >
                <RotateCcw className="size-3.5" />
                Try again
              </button>
            </div>
          )}

          {!error && !items && (
            <div className="grid gap-5 lg:grid-cols-3">
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
            </div>
          )}

          {!error && filtered && (
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={filter}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                {eventItems.length > 0 && (
                  <div
                    className={cn(
                      "grid gap-5",
                      eventItems.length >= 3 ? "lg:grid-cols-3" : eventItems.length === 2 ? "sm:grid-cols-2" : ""
                    )}
                  >
                    {eventItems.map((e) => (
                      <EventCard key={e.id} e={e} onOpen={openItem} />
                    ))}
                  </div>
                )}

                {newsItems.length > 0 && (
                  <div className={cn(eventItems.length > 0 && "mt-14")}>
                    {eventItems.length > 0 && (
                      <p className="mb-2 flex items-center gap-3 text-[0.62rem] font-bold uppercase tracking-[0.26em] text-paper/35">
                        <Newspaper className="size-3.5 text-gold-500/80" />
                        In the news — the public record
                      </p>
                    )}
                    <div>
                      {newsItems.map((e, i) => (
                        <NewsRow key={e.id} e={e} index={i} onOpen={openItem} />
                      ))}
                    </div>
                  </div>
                )}

                {eventItems.length === 0 && newsItems.length === 0 && (
                  <p className="py-16 text-center font-display text-xl italic text-paper/40">
                    Nothing in this drawer yet — check back soon.
                  </p>
                )}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>

      {/* Detail dialog */}
      <ItemDialog item={active} onClose={closeItem} />
    </section>
  );
}
