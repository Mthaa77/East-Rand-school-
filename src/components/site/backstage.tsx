"use client";
import { OPEN_BACKSTAGE_EVENT } from "@/lib/interaction-events";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Archive,
  ArrowRight,
  Check,
  Download,
  KeyRound,
  Lock,
  Mail,
  Phone,
  RefreshCw,
  RotateCcw,
  Ticket,
  X,
} from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

type AdminEnquiry = {
  id: string;
  name: string;
  email: string;
  phone: string;
  discipline: string | null;
  message: string | null;
  status: string; // new | contacted | closed
  createdAt: string;
};

type AdminStory = {
  id: string;
  name: string;
  email: string;
  cohort: string;
  discipline: string;
  path: string | null;
  story: string;
  status: string; // new | approved | archived
  createdAt: string;
};

type AdminSubscriber = {
  id: string;
  email: string;
  source: string;
  audience: string; // parent | alumni | artist | educator
  createdAt: string;
};

type AdminData = {
  counts: {
    enquiries: { new: number; contacted: number; closed: number };
    stories: { new: number; approved: number; archived: number };
    subscribers: number;
    subscribersByAudience: { audience: string; count: number }[];
    finder: { discipline: string; count: number }[];
  };
  enquiries: AdminEnquiry[];
  stories: AdminStory[];
  subscribers: AdminSubscriber[];
  generatedAt: string;
};

type Phase = "locked" | "loading" | "ready";
type Tab = "enquiries" | "stories" | "subscribers" | "pulse";

const DISCIPLINE_LABEL: Record<string, string> = {
  "visual-arts": "Visual Arts",
  design: "Design",
  drama: "Dramatic Arts",
  dance: "Dance Studies",
  music: "Music",
};

const AUDIENCE_LABEL: Record<string, string> = {
  parent: "Parent & family",
  alumni: "Alumni",
  artist: "Artist & community",
  educator: "Educator",
};

function shortDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-ZA", { day: "numeric", month: "short" });
}

function shortTime(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleTimeString("en-ZA", { hour: "2-digit", minute: "2-digit" });
}

/** RFC-4180-ish CSV with a BOM so Excel opens it cleanly. */
function toCsv(rows: Record<string, string>[]): string {
  if (rows.length === 0) return "";
  const headers = Object.keys(rows[0]);
  const esc = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""').replace(/\r?\n/g, " ")}"`;
  const lines = [headers.join(","), ...rows.map((r) => headers.map((h) => esc(r[h])).join(","))];
  return `\uFEFF${lines.join("\n")}`;
}

function downloadCsv(name: string, rows: Record<string, string>[]) {
  if (rows.length === 0) return;
  const blob = new Blob([toCsv(rows)], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${name}-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function StatusPill({ status, tone }: { status: string; tone: "enquiry" | "story" }) {
  const map: Record<string, string> =
    tone === "enquiry"
      ? {
          new: "bg-gold-500/15 text-gold-300",
          contacted: "bg-paper/10 text-paper/70",
          closed: "bg-paper/[0.04] text-paper/35",
        }
      : {
          new: "bg-crimson-500/15 text-crimson-400",
          approved: "bg-gold-500/15 text-gold-300",
          archived: "bg-paper/[0.04] text-paper/35",
        };
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[0.58rem] font-bold uppercase tracking-[0.16em]",
        map[status] ?? "bg-paper/10 text-paper/60"
      )}
    >
      <span className="size-1 rounded-full bg-current" />
      {status}
    </span>
  );
}

/** In-page staff panel: enquiry triage, story moderation and the anonymous pulse. */
export function Backstage() {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [phase, setPhase] = useState<Phase>("locked");
  const [keyInput, setKeyInput] = useState("");
  const [adminKey, setAdminKey] = useState<string | null>(null);
  const [data, setData] = useState<AdminData | null>(null);
  const [tab, setTab] = useState<Tab>("enquiries");
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [auto, setAuto] = useState(false);
  const lastAutoRef = useRef<string | null>(null);

  // ⌘/Ctrl+Shift+A — the staff door. Not advertised anywhere on the page.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key.toLowerCase() === "a") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    }
    function onOpenRequest() {
      setOpen(true);
    }
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_BACKSTAGE_EVENT, onOpenRequest);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_BACKSTAGE_EVENT, onOpenRequest);
    };
  }, []);

  const load = useCallback(async (key: string) => {
    const res = await fetch("/api/admin", { headers: { "x-admin-key": key }, cache: "no-store" });
    if (res.status === 401) return { ok: false as const, unauthorized: true };
    if (!res.ok) return { ok: false as const, unauthorized: false };
    const json = (await res.json()) as AdminData;
    return { ok: true as const, json };
  }, []);

  const refresh = useCallback(
    async (key: string) => {
      const result = await load(key);
      if (result.ok) {
        setData(result.json);
        return true;
      }
      if (result.unauthorized) {
        toast({ variant: "destructive", title: "Key no longer valid", description: "The backstage pass has been revoked." });
      } else {
        toast({ variant: "destructive", title: "Could not refresh", description: "The office data is unreachable right now." });
      }
      return false;
    },
    [load, toast]
  );

  // Optional 60s live polling while the desk is unlocked — silent unless the
  // key stops working. Pauses when the tab is hidden.
  useEffect(() => {
    if (!open || phase !== "ready" || !adminKey || !auto) return;
    const id = window.setInterval(() => {
      if (document.hidden) return;
      load(adminKey).then((r) => {
        if (r.ok) {
          setData(r.json);
          lastAutoRef.current = shortTime(r.json.generatedAt);
        } else if (r.unauthorized) {
          setAuto(false);
          toast({ variant: "destructive", title: "Key no longer valid" });
          lock();
        }
      });
    }, 60_000);
    return () => window.clearInterval(id);
  }, [open, phase, adminKey, auto, load, toast]);

  function unlock(e: React.FormEvent) {
    e.preventDefault();
    const key = keyInput.trim();
    if (!key) return;
    setPhase("loading");
    setError(null);
    load(key).then((result) => {
      if (result.ok) {
        setAdminKey(key);
        setData(result.json);
        setPhase("ready");
        toast({ title: "Welcome backstage", description: "Showing live office data." });
      } else {
        setPhase("locked");
        setError(
          result.unauthorized
            ? "That key doesn't fit this door."
            : "The office data is unreachable right now."
        );
      }
    });
  }

  function lock() {
    setAdminKey(null);
    setData(null);
    setKeyInput("");
    setPhase("locked");
    setTab("enquiries");
    setAuto(false);
  }

  async function act(
    kind: "enquiry" | "story",
    id: string,
    action: string
  ) {
    if (!adminKey) return;
    setBusyId(id);
    try {
      const url = kind === "enquiry" ? "/api/enquiry" : "/api/alumni-story";
      const res = await fetch(url, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", "x-admin-key": adminKey },
        body: JSON.stringify({ id, action }),
      });
      if (res.status === 401) {
        toast({ variant: "destructive", title: "Key no longer valid" });
        lock();
        return;
      }
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const ok = await refresh(adminKey);
      if (ok) {
        toast({
          title:
            kind === "story" && action === "approve"
              ? "Story published"
              : kind === "story"
                ? "Story archived"
                : action === "reopen"
                  ? "Enquiry reopened"
                  : `Enquiry marked ${action}`,
          description: kind === "story" && action === "approve" ? "It now appears in the alumni register." : undefined,
        });
      }
    } catch {
      toast({ variant: "destructive", title: "Action failed", description: "Please try again." });
    } finally {
      setBusyId(null);
    }
  }

  const storyActions = (s: AdminStory) =>
    s.status === "approved"
      ? [{ action: "archive", label: "Archive", icon: Archive }]
      : [{ action: "approve", label: "Approve", icon: Check }];

  const enquiryActions = (e: AdminEnquiry) => {
    if (e.status === "new") return [{ action: "contacted", label: "Mark contacted", icon: Phone }];
    if (e.status === "contacted")
      return [
        { action: "closed", label: "Close", icon: Check },
        { action: "reopen", label: "Reopen", icon: RotateCcw },
      ];
    return [{ action: "reopen", label: "Reopen", icon: RotateCcw }];
  };

  return (
    <Dialog open={open} onOpenChange={(o) => setOpen(o)}>
      <DialogContent
        showCloseButton={false}
        className="top-[50%] grid max-h-[88dvh] grid-rows-[auto_minmax(0,1fr)] gap-0 overflow-hidden rounded-3xl border-paper/15 bg-ink-900 p-0 shadow-lift sm:max-w-2xl"
      >
        <DialogTitle className="sr-only">Backstage pass — staff panel</DialogTitle>
        <DialogDescription className="sr-only">
          Office-only panel for enquiries, alumni story moderation and the anonymous interest pulse.
        </DialogDescription>
        <div aria-hidden="true" className="grain pointer-events-none absolute inset-0 z-20 opacity-60" />

        {/* Header band */}
        <div className="relative shrink-0 overflow-hidden border-b border-paper/10 bg-gradient-to-br from-gold-500/[0.14] via-transparent to-crimson-500/[0.08] px-7 pb-5 pt-6">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-2 -top-6 select-none font-display text-[7.5rem] font-bold leading-none text-outline-gold opacity-25"
          >
            ★
          </span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close the backstage panel"
            className="absolute right-4 top-4 z-30 grid size-9 place-items-center rounded-full border border-paper/20 bg-ink-950/60 text-paper/80 backdrop-blur-sm transition-all duration-300 hover:rotate-90 hover:border-gold-400 hover:text-gold-300"
          >
            <X className="size-4" />
          </button>
          <div className="relative z-10 flex items-center gap-3 pr-12">
            <p className="font-mono text-[0.6rem] tracking-[0.3em] text-gold-300">BACKSTAGE PASS</p>
            {phase === "ready" && data && (
              <p className="font-mono text-[0.6rem] tracking-[0.3em] text-paper/40">
                {shortDate(data.generatedAt)}
                <span className="ml-3 text-paper/25">·</span>
                <span className="ml-3 tabular-nums">
                  {lastAutoRef.current && auto ? lastAutoRef.current : shortTime(data.generatedAt)}
                </span>
              </p>
            )}
          </div>
          <div className="relative z-10 mt-3 flex items-end justify-between gap-4">
            <div>
              <p className="font-display text-2xl font-medium text-paper">
                {phase === "ready" ? "The office desk." : "Staff only."}
              </p>
              <p className="mt-1 text-xs text-paper/45">
                {phase === "ready"
                  ? "Enquiries, stories and the anonymous pulse — live from the school's records."
                  : "Enquiries, story moderation and the interest pulse, behind one key."}
              </p>
            </div>
            {phase === "ready" && (
              <div className="flex shrink-0 gap-2">
                <button
                  type="button"
                  onClick={() => setAuto((a) => !a)}
                  aria-pressed={auto}
                  aria-label="Auto-refresh every 60 seconds"
                  title="Auto-refresh every 60 seconds"
                  className={cn(
                    "inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-[0.62rem] font-bold uppercase tracking-[0.18em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400/70",
                    auto
                      ? "border-gold-400/70 bg-gold-500/10 text-gold-300"
                      : "border-paper/20 text-paper/60 hover:border-gold-400 hover:text-gold-300"
                  )}
                >
                  <span className="relative flex size-2">
                    {auto && (
                      <span className="absolute inline-flex size-2 animate-ping rounded-full bg-gold-400 opacity-60" />
                    )}
                    <span
                      className={cn(
                        "relative inline-flex size-2 rounded-full",
                        auto ? "bg-gold-400" : "bg-paper/30"
                      )}
                    />
                  </span>
                  Auto 60s
                </button>
                <button
                  type="button"
                  onClick={() => adminKey && refresh(adminKey)}
                  aria-label="Refresh backstage data"
                  className="inline-flex shrink-0 items-center gap-2 rounded-full border border-paper/20 px-4 py-2 text-[0.62rem] font-bold uppercase tracking-[0.18em] text-paper/60 transition-colors hover:border-gold-400 hover:text-gold-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400/70"
                >
                  <RefreshCw className="size-3.5" />
                  Refresh
                </button>
                <button
                  type="button"
                  onClick={lock}
                  aria-label="Lock the backstage panel"
                  className="inline-flex shrink-0 items-center gap-2 rounded-full border border-paper/20 px-4 py-2 text-[0.62rem] font-bold uppercase tracking-[0.18em] text-paper/60 transition-colors hover:border-gold-400 hover:text-gold-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400/70"
                >
                  <Lock className="size-3.5" />
                  Lock
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Body */}
        <div className="scroll-gold min-h-0 flex-1 overflow-y-auto px-7 py-6">
          {phase !== "ready" && (
            <form onSubmit={unlock} className="mx-auto flex max-w-sm flex-col items-center py-6 text-center">
              <span className="grid size-14 place-items-center rounded-full border border-gold-500/40 bg-gold-500/10">
                <KeyRound className="size-6 text-gold-300" />
              </span>
              <label htmlFor="backstage-key" className="mt-5 text-sm font-semibold text-paper">
                Present the office key
              </label>
              <p className="mt-1.5 text-xs leading-relaxed text-paper/45">
                The key is held by the school office — it never leaves this device once entered.
              </p>
              <input
                id="backstage-key"
                type="password"
                autoComplete="off"
                value={keyInput}
                onChange={(e) => setKeyInput(e.target.value)}
                placeholder="••••••••••"
                className="mt-5 w-full rounded-xl border border-paper/20 bg-ink-950 px-4 py-3 text-center font-mono text-sm tracking-[0.3em] text-paper placeholder:text-paper/25 focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-400/50"
              />
              {error && (
                <p role="alert" className="mt-3 text-xs font-semibold text-crimson-400">
                  {error}
                </p>
              )}
              <button
                type="submit"
                disabled={phase === "loading" || !keyInput.trim()}
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold-500 px-6 py-3 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-ink-950 shadow-[0_8px_22px_-8px_var(--color-gold-500)] transition-all duration-300 hover:bg-gold-300 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400/70"
              >
                {phase === "loading" ? (
                  <>
                    <RefreshCw className="size-4 animate-spin" />
                    Checking…
                  </>
                ) : (
                  <>
                    Unlock the desk
                    <ArrowRight className="size-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {phase === "ready" && data && (
            <>
              {/* Tabs */}
              <div
                role="tablist"
                aria-label="Backstage sections"
                className="flex flex-wrap gap-1 rounded-full border border-paper/10 bg-ink-950/70 p-1"
              >
                {(
                  [
                    { id: "enquiries", label: "Enquiries", badge: data.counts.enquiries.new },
                    { id: "stories", label: "Stories", badge: data.counts.stories.new },
                    { id: "subscribers", label: "Subscribers", badge: 0 },
                    { id: "pulse", label: "Pulse", badge: 0 },
                  ] as { id: Tab; label: string; badge: number }[]
                ).map((t) => {
                  const activeTab = tab === t.id;
                  return (
                    <button
                      key={t.id}
                      role="tab"
                      aria-selected={activeTab}
                      onClick={() => setTab(t.id)}
                      className={cn(
                        "flex-1 rounded-full px-4 py-2 text-[0.64rem] font-bold uppercase tracking-[0.18em] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400/70",
                        activeTab ? "bg-gold-400 text-ink-950" : "text-paper/55 hover:text-paper"
                      )}
                    >
                      {t.label}
                      {t.badge > 0 && (
                        <span
                          className={cn(
                            "ml-2 rounded-full px-1.5 py-0.5 font-mono text-[0.55rem]",
                            activeTab ? "bg-ink-950/20 text-ink-950" : "bg-crimson-500/20 text-crimson-400"
                          )}
                        >
                          {t.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Enquiries */}
              {tab === "enquiries" && (
                <div className="mt-5 space-y-3">
                  {data.enquiries.length === 0 ? (
                    <p className="py-10 text-center font-display text-lg italic text-paper/40">
                      No enquiries yet — the inbox is quiet.
                    </p>
                  ) : (
                    <div className="flex items-center justify-between">
                      <p className="font-mono text-[0.58rem] tracking-[0.26em] text-paper/40">
                        {data.enquiries.length} ON FILE · LATEST 50
                      </p>
                      <button
                        type="button"
                        onClick={() =>
                          downloadCsv(
                            "ersa-enquiries",
                            data.enquiries.map((e) => ({
                              received: e.createdAt,
                              name: e.name,
                              email: e.email,
                              phone: e.phone,
                              discipline: DISCIPLINE_LABEL[e.discipline ?? ""] ?? e.discipline ?? "",
                              status: e.status,
                              message: e.message ?? "",
                            }))
                          )
                        }
                        aria-label="Download enquiries as CSV"
                        className="inline-flex items-center gap-1.5 rounded-full border border-paper/20 px-3.5 py-1.5 text-[0.6rem] font-bold uppercase tracking-[0.16em] text-paper/70 transition-all hover:border-gold-400 hover:text-gold-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400/70"
                      >
                        <Download className="size-3" />
                        CSV
                      </button>
                    </div>
                  )}
                  {data.enquiries.map((e) => (
                    <article
                      key={e.id}
                      className="rounded-xl border border-paper/10 bg-ink-950/60 p-4 transition-colors hover:border-paper/20"
                    >
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                        <p className="font-display text-base font-medium text-paper">{e.name}</p>
                        <StatusPill status={e.status} tone="enquiry" />
                        <span className="ml-auto font-mono text-[0.6rem] text-paper/35">
                          {shortDate(e.createdAt)}
                        </span>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 font-mono text-[0.68rem] text-paper/50">
                        <a href={`mailto:${e.email}`} className="inline-flex items-center gap-1.5 hover:text-gold-300">
                          <Mail className="size-3" />
                          {e.email}
                        </a>
                        <a href={`tel:${e.phone.replace(/\s/g, "")}`} className="inline-flex items-center gap-1.5 hover:text-gold-300">
                          <Phone className="size-3" />
                          {e.phone}
                        </a>
                        {e.discipline && (
                          <span className="text-gold-300/80">{DISCIPLINE_LABEL[e.discipline] ?? e.discipline}</span>
                        )}
                      </div>
                      {e.message && (
                        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-paper/60">{e.message}</p>
                      )}
                      <div className="mt-3 flex flex-wrap gap-2">
                        {enquiryActions(e).map((a) => (
                          <button
                            key={a.action}
                            type="button"
                            disabled={busyId === e.id}
                            onClick={() => act("enquiry", e.id, a.action)}
                            className="inline-flex items-center gap-1.5 rounded-full border border-paper/20 px-3.5 py-1.5 text-[0.6rem] font-bold uppercase tracking-[0.16em] text-paper/70 transition-all hover:border-gold-400 hover:text-gold-300 disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400/70"
                          >
                            <a.icon className="size-3" />
                            {a.label}
                          </button>
                        ))}
                      </div>
                    </article>
                  ))}
                </div>
              )}

              {/* Stories */}
              {tab === "stories" && (
                <div className="mt-5 space-y-3">
                  {data.stories.length === 0 ? (
                    <p className="py-10 text-center font-display text-lg italic text-paper/40">
                      No stories yet — the register stays honest and empty.
                    </p>
                  ) : (
                    <div className="flex items-center justify-between">
                      <p className="font-mono text-[0.58rem] tracking-[0.26em] text-paper/40">
                        {data.stories.length} ON FILE · LATEST 50
                      </p>
                      <button
                        type="button"
                        onClick={() =>
                          downloadCsv(
                            "ersa-alumni-stories",
                            data.stories.map((s) => ({
                              submitted: s.createdAt,
                              name: s.name,
                              email: s.email,
                              cohort: s.cohort,
                              discipline: DISCIPLINE_LABEL[s.discipline] ?? s.discipline,
                              path: s.path ?? "",
                              status: s.status,
                              story: s.story,
                            }))
                          )
                        }
                        aria-label="Download alumni stories as CSV"
                        className="inline-flex items-center gap-1.5 rounded-full border border-paper/20 px-3.5 py-1.5 text-[0.6rem] font-bold uppercase tracking-[0.16em] text-paper/70 transition-all hover:border-gold-400 hover:text-gold-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400/70"
                      >
                        <Download className="size-3" />
                        CSV
                      </button>
                    </div>
                  )}
                  {data.stories.map((s) => (
                    <article
                      key={s.id}
                      className="rounded-xl border border-paper/10 bg-ink-950/60 p-4 transition-colors hover:border-paper/20"
                    >
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                        <p className="font-display text-base font-medium text-paper">{s.name}</p>
                        <span className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-gold-300/80">
                          {DISCIPLINE_LABEL[s.discipline] ?? s.discipline} · {s.cohort}
                        </span>
                        <StatusPill status={s.status} tone="story" />
                        <span className="ml-auto font-mono text-[0.6rem] text-paper/35">
                          {shortDate(s.createdAt)}
                        </span>
                      </div>
                      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-paper/60">“{s.story}”</p>
                      {s.path && <p className="mt-1.5 text-xs italic text-paper/40">Path: {s.path}</p>}
                      <p className="mt-1.5 font-mono text-[0.62rem] text-paper/35">{s.email}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {storyActions(s).map((a) => (
                          <button
                            key={a.action}
                            type="button"
                            disabled={busyId === s.id}
                            onClick={() => act("story", s.id, a.action)}
                            className="inline-flex items-center gap-1.5 rounded-full border border-gold-500/40 px-3.5 py-1.5 text-[0.6rem] font-bold uppercase tracking-[0.16em] text-gold-300 transition-all hover:bg-gold-500/10 disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400/70"
                          >
                            <a.icon className="size-3" />
                            {a.label}
                          </button>
                        ))}
                      </div>
                    </article>
                  ))}
                </div>
              )}

              {/* Subscribers */}
              {tab === "subscribers" && (
                <div className="mt-5 space-y-3">
                  {data.subscribers.length === 0 ? (
                    <p className="py-10 text-center font-display text-lg italic text-paper/40">
                      No subscribers yet — the notice list starts with the first sign-up.
                    </p>
                  ) : (
                    <div className="flex items-center justify-between">
                      <p className="font-mono text-[0.58rem] tracking-[0.26em] text-paper/40">
                        {data.subscribers.length} ON FILE · LATEST 50
                      </p>
                      <button
                        type="button"
                        onClick={() =>
                          downloadCsv(
                            "ersa-newsletter-subscribers",
                            data.subscribers.map((s) => ({
                              joined: s.createdAt,
                              email: s.email,
                              audience: AUDIENCE_LABEL[s.audience] ?? s.audience,
                              source: s.source,
                            }))
                          )
                        }
                        aria-label="Download subscribers as CSV"
                        className="inline-flex items-center gap-1.5 rounded-full border border-paper/20 px-3.5 py-1.5 text-[0.6rem] font-bold uppercase tracking-[0.16em] text-paper/70 transition-all hover:border-gold-400 hover:text-gold-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400/70"
                      >
                        <Download className="size-3" />
                        CSV
                      </button>
                    </div>
                  )}
                  {data.subscribers.map((s) => (
                    <article
                      key={s.id}
                      className="flex flex-wrap items-center gap-x-3 gap-y-1.5 rounded-xl border border-paper/10 bg-ink-950/60 px-4 py-3 transition-colors hover:border-paper/20"
                    >
                      <p className="font-mono text-sm text-paper/85">{s.email}</p>
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-gold-500/15 px-2.5 py-0.5 text-[0.58rem] font-bold uppercase tracking-[0.16em] text-gold-300">
                        {AUDIENCE_LABEL[s.audience] ?? s.audience}
                      </span>
                      <span className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-paper/30">
                        via {s.source}
                      </span>
                      <span className="ml-auto font-mono text-[0.6rem] text-paper/35">
                        {shortDate(s.createdAt)}
                      </span>
                    </article>
                  ))}
                  {data.counts.subscribersByAudience.length > 0 && (
                    <div className="rounded-xl border border-paper/10 bg-ink-950/60 p-4">
                      <p className="font-mono text-[0.58rem] tracking-[0.26em] text-paper/40">
                        WHO THE LIST SERVES
                      </p>
                      <ul className="mt-3 flex flex-wrap gap-2">
                        {data.counts.subscribersByAudience.map((g) => (
                          <li
                            key={g.audience}
                            className="inline-flex items-baseline gap-1.5 rounded-full border border-paper/10 px-3 py-1 text-xs text-paper/65"
                          >
                            {AUDIENCE_LABEL[g.audience] ?? g.audience}
                            <span className="font-mono text-[0.62rem] tabular-nums text-gold-300">
                              {g.count}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* Pulse */}
              {tab === "pulse" && (
                <div className="mt-5 space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl border border-paper/10 bg-ink-950/60 p-4">
                      <p className="font-mono text-[0.58rem] tracking-[0.26em] text-paper/40">NOTICE SUBSCRIBERS</p>
                      <p className="mt-2 font-display text-3xl font-semibold text-gold-300">
                        {data.counts.subscribers}
                      </p>
                    </div>
                    <div className="rounded-xl border border-paper/10 bg-ink-950/60 p-4">
                      <p className="font-mono text-[0.58rem] tracking-[0.26em] text-paper/40">OPEN ENQUIRIES</p>
                      <p className="mt-2 font-display text-3xl font-semibold text-gold-300">
                        {data.counts.enquiries.new}
                      </p>
                    </div>
                  </div>
                  <div className="rounded-sm border border-paper/10 bg-ink-950/60 p-4">
                    <p className="flex items-center gap-2 font-mono text-[0.58rem] tracking-[0.26em] text-paper/40">
                      <Ticket className="size-3 text-gold-500" />
                      WHERE CURIOSITY LANDS — FINDER RESULTS
                    </p>
                    {data.counts.finder.length === 0 ? (
                      <p className="mt-4 text-sm italic text-paper/40">
                        No explorers yet — the tally begins with the first quiz.
                      </p>
                    ) : (
                      <ul className="mt-4 space-y-2.5">
                        {data.counts.finder.map((f) => {
                          const max = data.counts.finder[0]?.count || 1;
                          return (
                            <li key={f.discipline} className="flex items-center gap-3">
                              <span className="w-24 shrink-0 text-xs font-semibold text-paper/70">
                                {DISCIPLINE_LABEL[f.discipline] ?? f.discipline}
                              </span>
                              <span className="h-2 flex-1 overflow-hidden rounded-full bg-paper/[0.06]">
                                <span
                                  className="block h-full rounded-full bg-gradient-to-r from-gold-500/70 to-gold-300"
                                  style={{ width: `${Math.max(6, Math.round((f.count / max) * 100))}%` }}
                                />
                              </span>
                              <span className="w-8 text-right font-mono text-xs tabular-nums text-gold-300">
                                {f.count}
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                    <p className="mt-4 text-[0.65rem] leading-relaxed text-paper/35">
                      Anonymous quiz tallies only — no names, no emails, nothing personal.
                    </p>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
