"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  ArrowUpRight,
  CalendarRange,
  Footprints,
  GraduationCap,
  Keyboard,
  Mail,
  Map,
  Mic2,
  Music2,
  Palette,
  PenTool,
  Phone,
  Sparkles,
  Ticket,
  Wand2,
} from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { SITE_PAGES } from "@/lib/navigation";

import {
  OPEN_DISCIPLINE_EVENT,
  OPEN_FINDER_EVENT,
  OPEN_PALETTE_EVENT,
  OPEN_SHORTCUTS_EVENT,
} from "@/lib/interaction-events";
 type NoticeItem = { id: string; title: string; category: "event" | "news" };

const SECTIONS = [
  { label: "Disciplines", href: "#disciplines", hint: "Five specialist streams" },
  { label: "The Method", href: "#method", hint: "How the school works" },
  { label: "Campus life", href: "#learner-life", hint: "A day at ERSA" },
  { label: "Showcase", href: "#showcase", hint: "Learner work" },
  { label: "Impact", href: "#impact", hint: "Results & proof" },
  { label: "Alumni", href: "#alumni", hint: "Where they go" },
  { label: "Notice board", href: "#events", hint: "Dates & news" },
  { label: "Admissions", href: "#admissions", hint: "How to join" },
  { label: "Contact", href: "#contact", hint: "Visit or call" },
];

const ACTIONS = [
  {
    id: "finder",
    label: "Take the discipline finder",
    hint: "60 seconds, five questions",
    icon: Wand2,
    run: () => window.dispatchEvent(new CustomEvent(OPEN_FINDER_EVENT)),
  },
  {
    id: "calendar",
    label: "Get the season calendar",
    hint: "every date as one .ics feed",
    icon: CalendarRange,
    run: () => window.setTimeout(() => (window.location.href = "/api/calendar"), 150),
  },
  {
    id: "shortcuts",
    label: "Keyboard shortcuts",
    hint: "? reveals the sheet",
    icon: Keyboard,
    run: () => window.dispatchEvent(new CustomEvent(OPEN_SHORTCUTS_EVENT)),
  },
  {
    id: "apply",
    label: "Apply for 2027",
    hint: "auditions & the GDE portal",
    icon: GraduationCap,
    run: () => (window.location.href = "/admissions"),
  },
  {
    id: "top",
    label: "Back to the homepage",
    hint: "start over",
    icon: Sparkles,
    run: () => (window.location.href = "/"),
  },
];

const STUDIOS = [
  {
    id: "visual-arts",
    label: "Visual Arts",
    hint: "paint, draw, sculpt, exhibit",
    icon: Palette,
  },
  { id: "design", label: "Design", hint: "sketch, prototype, solve", icon: PenTool },
  { id: "drama", label: "Dramatic Arts", hint: "speak, move, transform", icon: Mic2 },
  { id: "dance", label: "Dance Studies", hint: "train, sweat, soar", icon: Footprints },
  { id: "music", label: "Music", hint: "play, sing, amplify", icon: Music2 },
];

const CONTACT = [
  {
    id: "call",
    label: "Call the school office",
    hint: "010 007 1186",
    icon: Phone,
    href: "tel:+270100071186",
  },
  {
    id: "email",
    label: "Email the school",
    hint: "admin@ersa.co.za",
    icon: Mail,
    href: "mailto:admin@ersa.co.za",
  },
];

function scrollTo(target: string) {
  window.setTimeout(() => {
    document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
  }, 120);
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [notices, setNotices] = useState<NoticeItem[] | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  const loadNotices = useCallback((signal: AbortSignal) => {
    // Fetch once per open — fresh dates, cheap query.
    fetch("/api/events", { signal })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((d: { events?: NoticeItem[] }) => setNotices((d.events ?? []).slice(0, 6)))
      .catch((err) => {
        if ((err as Error).name !== "AbortError") setNotices([]);
      });
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_PALETTE_EVENT, onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_PALETTE_EVENT, onOpen);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const ctrl = new AbortController();
    loadNotices(ctrl.signal);
    return () => ctrl.abort();
  }, [open, loadNotices]);

  const run = (fn: () => void) => {
    setOpen(false);
    fn();
  };

  /** Section anchors live on the homepage — scroll there, or ride home first. */
  const gotoSection = (hash: string) => {
    if (pathname === "/") scrollTo(hash);
    else router.push(`/${hash}`);
  };

  /** Discipline dossiers listen on the homepage and /programmes. */
  const openStudio = (label: string) => {
    if (pathname === "/" || pathname === "/programmes") {
      if (pathname === "/") scrollTo("#disciplines");
      window.dispatchEvent(
        new CustomEvent(OPEN_DISCIPLINE_EVENT, { detail: { discipline: label } })
      );
    } else {
      router.push("/programmes");
      window.setTimeout(
        () =>
          window.dispatchEvent(
            new CustomEvent(OPEN_DISCIPLINE_EVENT, { detail: { discipline: label } })
          ),
        650
      );
    }
  };

  return (
    <CommandDialog
      open={open}
      onOpenChange={setOpen}
      title="Site search — quick jump"
      description="Search sections, dates and ways to reach the school."
      className="top-[24%] translate-y-0 rounded-3xl border-paper/15 bg-ink-900 shadow-lift sm:max-w-lg [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[0.6rem] [&_[cmdk-group-heading]]:tracking-[0.28em] [&_[cmdk-group-heading]]:text-gold-400/80 [&_[cmdk-input-wrapper]]:border-paper/10 [&_[cmdk-input]]:h-14 [&_[cmdk-input]]:font-display [&_[cmdk-input]]:text-base [&_[cmdk-input]]:text-paper [&_[cmdk-input]]:placeholder:text-paper/30 [&_[cmdk-item]]:rounded-lg [&_[cmdk-item][data-selected=true]]:bg-gold-500/12 [&_[cmdk-item][data-selected=true]]:text-gold-100"
    >
      <div aria-hidden="true" className="grain pointer-events-none absolute inset-0 z-20 opacity-40" />

      <CommandInput placeholder="Type a section, a date, an action…" />
      <CommandList className="scroll-gold">
        <CommandEmpty className="py-10 text-center font-display text-sm italic text-paper/40">
          Nothing matches — try &ldquo;audition&rdquo;, &ldquo;dance&rdquo; or &ldquo;call&rdquo;.
        </CommandEmpty>

        <CommandGroup heading="Go to a page">
          {SITE_PAGES.map((p) => (
            <CommandItem
              key={p.path}
              value={`${p.label} ${p.short} page ${p.description}`}
              onSelect={() => run(() => router.push(p.path))}
              className="group cursor-pointer gap-3"
            >
              <Map className="size-4 shrink-0 text-gold-400/70 transition-colors group-data-[selected=true]:text-gold-300" />
              <span className="flex min-w-0 flex-1 items-baseline justify-between gap-3">
                <span className="truncate text-sm font-semibold">{p.label}</span>
                <span className="shrink-0 text-[0.6rem] uppercase tracking-[0.18em] text-paper/30">
                  {p.path}
                </span>
              </span>
              <ArrowUpRight className="size-3.5 shrink-0 text-paper/25 transition-all duration-300 group-data-[selected=true]:translate-x-0.5 group-data-[selected=true]:-translate-y-0.5 group-data-[selected=true]:text-gold-300" />
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator className="bg-paper/10" />

        <CommandGroup heading="Jump on the homepage">
          {SECTIONS.map((s) => (
            <CommandItem
              key={s.href}
              value={`${s.label} ${s.hint}`}
              onSelect={() => run(() => gotoSection(s.href))}
              className="group cursor-pointer gap-3"
            >
              <Map className="size-4 shrink-0 text-paper/35 transition-colors group-data-[selected=true]:text-gold-300" />
              <span className="flex min-w-0 flex-1 items-baseline justify-between gap-3">
                <span className="truncate text-sm font-semibold">{s.label}</span>
                <span className="shrink-0 text-[0.6rem] uppercase tracking-[0.18em] text-paper/30">
                  {s.hint}
                </span>
              </span>
              <ArrowUpRight className="size-3.5 shrink-0 text-paper/25 transition-all duration-300 group-data-[selected=true]:translate-x-0.5 group-data-[selected=true]:-translate-y-0.5 group-data-[selected=true]:text-gold-300" />
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator className="bg-paper/10" />

        <CommandGroup heading="Do something">
          {ACTIONS.map((a) => (
            <CommandItem
              key={a.id}
              value={`${a.label} ${a.hint}`}
              onSelect={() => run(a.run)}
              className="group cursor-pointer gap-3"
            >
              <a.icon className="size-4 shrink-0 text-paper/35 transition-colors group-data-[selected=true]:text-gold-300" />
              <span className="flex min-w-0 flex-1 items-baseline justify-between gap-3">
                <span className="truncate text-sm font-semibold">{a.label}</span>
                <span className="shrink-0 text-[0.6rem] uppercase tracking-[0.18em] text-paper/30">
                  {a.hint}
                </span>
              </span>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator className="bg-paper/10" />

        <CommandGroup heading="Open a studio">
          {STUDIOS.map((s) => (
            <CommandItem
              key={s.id}
              value={`${s.label} ${s.hint} studio discipline`}
              onSelect={() =>
                run(() => openStudio(s.label))
              }
              className="group cursor-pointer gap-3"
            >
              <s.icon className="size-4 shrink-0 text-gold-400/70 transition-colors group-data-[selected=true]:text-gold-300" />
              <span className="flex min-w-0 flex-1 items-baseline justify-between gap-3">
                <span className="truncate text-sm font-semibold">{s.label}</span>
                <span className="shrink-0 text-[0.6rem] uppercase tracking-[0.18em] text-paper/30">
                  {s.hint}
                </span>
              </span>
              <ArrowUpRight className="size-3.5 shrink-0 text-paper/25 transition-all duration-300 group-data-[selected=true]:translate-x-0.5 group-data-[selected=true]:-translate-y-0.5 group-data-[selected=true]:text-gold-300" />
            </CommandItem>
          ))}
        </CommandGroup>

        {notices && notices.length > 0 && (
          <>
            <CommandSeparator className="bg-paper/10" />
            <CommandGroup heading="On the notice board">
              {notices.map((n) => (
                <CommandItem
                  key={n.id}
                  value={`${n.title} ${n.category}`}
                  onSelect={() => run(() => router.push("/news"))}
                  className="group cursor-pointer gap-3"
                >
                  {n.category === "event" ? (
                    <Ticket className="size-4 shrink-0 text-gold-400/80 transition-colors group-data-[selected=true]:text-gold-300" />
                  ) : (
                    <CalendarRange className="size-4 shrink-0 text-crimson-400/80 transition-colors group-data-[selected=true]:text-crimson-300" />
                  )}
                  <span className="truncate text-sm text-paper/80 transition-colors group-data-[selected=true]:text-gold-100">
                    {n.title}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          </>
        )}

        <CommandSeparator className="bg-paper/10" />

        <CommandGroup heading="Reach the school">
          {CONTACT.map((c) => (
            <CommandItem
              key={c.id}
              value={`${c.label} ${c.hint}`}
              onSelect={() => run(() => (window.location.href = c.href))}
              className="group cursor-pointer gap-3"
            >
              <c.icon className="size-4 shrink-0 text-paper/35 transition-colors group-data-[selected=true]:text-gold-300" />
              <span className="flex min-w-0 flex-1 items-baseline justify-between gap-3">
                <span className="truncate text-sm font-semibold">{c.label}</span>
                <span className="shrink-0 font-mono text-[0.62rem] text-paper/35">{c.hint}</span>
              </span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>

      <div className="flex items-center justify-between border-t border-paper/10 px-4 py-2.5">
        <p className="font-mono text-[0.58rem] tracking-[0.22em] text-paper/30">
          EAST RAND SCHOOL OF THE ARTS
        </p>
        <p className="flex items-center gap-1.5 text-[0.58rem] text-paper/30">
          <kbd className="rounded-md border border-paper/20 bg-ink-950 px-1.5 py-0.5 font-mono text-[0.58rem] text-paper/50">
            ↑↓
          </kbd>
          browse
          <kbd className="rounded-md border border-paper/20 bg-ink-950 px-1.5 py-0.5 font-mono text-[0.58rem] text-paper/50">
            ↵
          </kbd>
          open
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              window.dispatchEvent(new CustomEvent(OPEN_SHORTCUTS_EVENT));
            }}
            aria-label="Open the keyboard shortcuts sheet"
            className="cursor-pointer rounded-md border border-paper/20 bg-ink-950 px-1.5 py-0.5 font-mono text-[0.58rem] text-paper/50 transition-colors hover:border-gold-400/60 hover:text-gold-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400/70"
          >
            ?
          </button>
          help
        </p>
      </div>
    </CommandDialog>
  );
}
