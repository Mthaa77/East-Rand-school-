"use client";

import { useEffect, useRef, useState } from "react";
import {
  AudioLines,
  Briefcase,
  CheckCircle2,
  GraduationCap,
  Music4,
  Send,
  ShieldCheck,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { SectionHeading } from "@/components/site/proof-bar";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { eryoAlumni } from "@/lib/school-facts";
import { cn } from "@/lib/utils";

const pathways = [
  {
    icon: GraduationCap,
    title: "Study further",
    text: "An MOU with Tshwane University of Technology opens masterclasses, digital portfolios, audition preparation and educator upskilling — a mapped route from Daveyton to tertiary arts study.",
    source: "TUT Faculty of Arts and Design, Mar 2024",
  },
  {
    icon: Music4,
    title: "Perform & represent",
    text: "From the Y20 South Africa Opening to Standard Bank Joy of Jazz youth programmes, ERSA learners collect real stages — the kind that turn into industry doors.",
    source: "GDE posts 2025 · NSA J4YP 2026",
  },
  {
    icon: Briefcase,
    title: "Create & earn",
    text: "Enterprise workshops like 'Bridging the Gap' — with SEDFA, NYDA, dtic and TVET colleges — teach funding, business plans and self-employment in the creative economy.",
    source: "Ekurhuleni News, Jun 2025",
  },
  {
    icon: AudioLines,
    title: "Orchestras & strings",
    text: "Through the East Rand's music pipeline — the eMagnet School of Music and East Rand Youth Orchestra connected to ERSA — players have gone from first lessons to first violin in the Johannesburg Symphony Orchestra.",
    source: "ERYO / eMagnet records · eryo.org",
  },
];

const darkInput =
  "w-full rounded-xl border border-paper/15 bg-ink-950/60 px-4 py-3 text-sm text-paper placeholder:text-paper/30 transition-all duration-300 focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-400/15";

const disciplineOptions = [
  "Visual Arts",
  "Design",
  "Dramatic Arts",
  "Dance Studies",
  "Music",
];

type PublicStory = {
  name: string;
  cohort: string;
  discipline: string;
  path: string | null;
  story: string;
  createdAt: string;
};

/** Approved-and-published alumni stories — moderated via PATCH /api/alumni-story. */
function PublishedStories() {
  const [stories, setStories] = useState<PublicStory[] | null>(null);

  useEffect(() => {
    const ctrl = new AbortController();
    fetch("/api/alumni-story", { signal: ctrl.signal })
      .then(async (res) => {
        if (!res.ok) throw new Error(String(res.status));
        return res.json() as Promise<{ stories: PublicStory[] }>;
      })
      .then((data) => setStories(data.stories))
      .catch(() => {
        /* the register stays quietly hidden if it cannot be reached */
      });
    return () => ctrl.abort();
  }, []);

  if (!stories || stories.length === 0) return null;

  return (
    <div className="mt-16 border-t border-ink-950/10 pt-12">
      <Reveal>
        <p className="kicker text-crimson-600">
          <span className="h-px w-9 bg-crimson-600" />
          From the register
        </p>
        <h3 className="mt-4 font-display text-3xl font-medium leading-tight text-ink-950 sm:text-4xl">
          Stories from the stage.
        </h3>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-800/60">
          Published with each alumnus&apos;s consent and verified by the school — proof that the
          training travels.
        </p>
      </Reveal>
      <Stagger className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.12}>
        {stories.map((s) => (
          <StaggerItem key={s.name + s.cohort}>
            <article className="group relative flex h-full flex-col rounded-2xl border border-ink-950/10 bg-paper p-7 shadow-card transition-all duration-500 hover:-translate-y-1 hover:border-gold-600/40 hover:shadow-lift">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute right-5 top-3 select-none font-display text-7xl leading-none text-gold-600/15 transition-colors duration-500 group-hover:text-gold-600/30"
              >
                &ldquo;
              </span>
              <p className="relative font-editorial text-[0.95rem] leading-[1.8] text-ink-800/80">{s.story}</p>
              <div className="mt-auto border-t border-ink-950/10 pt-5 [&>*]:relative">
                <p className="font-display text-lg font-medium text-ink-950">{s.name}</p>
                <p className="mt-0.5 text-[0.62rem] font-bold uppercase tracking-[0.2em] text-gold-700">
                  {s.discipline} · Class of {s.cohort}
                </p>
                {s.path && (
                  <p className="mt-2 text-xs leading-relaxed text-ink-800/55">{s.path}</p>
                )}
              </div>
            </article>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}

export function Alumni() {
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const [consent, setConsent] = useState(false);
  const hpRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    cohort: "",
    discipline: "",
    path: "",
    story: "",
  });

  const set = (key: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setForm((f) => ({ ...f, [key]: e.target.value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (state === "sending") return;
    if (!consent) {
      toast({
        title: "Consent required",
        description: "Please tick the POPIA consent box so the school may review and store your story.",
        variant: "destructive",
      });
      return;
    }
    setState("sending");
    try {
      const res = await fetch("/api/alumni-story", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, consent, company: hpRef.current?.value ?? "" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setState("sent");
      toast({
        title: "Story received — thank you",
        description: "The school reviews every submission before anything is published.",
      });
    } catch (err) {
      setState("idle");
      toast({
        title: "Could not send your story",
        description: err instanceof Error ? err.message : "Please try again shortly.",
        variant: "destructive",
      });
    }
  }

  return (
    <section id="alumni" aria-label="Alumni pathways and stories" className="relative bg-paper-200 text-ink-950">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-10 lg:py-32">
        <div className="grid gap-14 lg:grid-cols-12">
          {/* Pathways */}
          <div className="lg:col-span-6">
            <SectionHeading
              dark
              kicker="After the bell"
              title="Where the training lands."
              accentWords={["lands."]}
              description="The work behind the spotlight doesn't end at matric. Three verified routes carry ERSA learners from the studio into the future — and alumni are helping draw the map."
            />

            <Stagger className="mt-12 space-y-4" stagger={0.12}>
              {pathways.map((p) => {
                const Icon = p.icon;
                return (
                  <StaggerItem key={p.title}>
                    <article className="group flex gap-5 rounded-2xl border border-ink-950/10 bg-paper p-6 shadow-card transition-all duration-500 hover:-translate-y-1 hover:border-ink-950/25 hover:shadow-lift">
                      <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-ink-950 text-gold-400 transition-colors duration-500 group-hover:bg-crimson-600 group-hover:text-paper">
                        <Icon className="size-5" strokeWidth={1.8} />
                      </span>
                      <div className="min-w-0">
                        <h3 className="font-display text-xl font-medium">{p.title}</h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-ink-800/65">{p.text}</p>
                        <p className="mt-3 text-[0.62rem] font-bold uppercase tracking-[0.18em] text-ink-800/40">
                          {p.source}
                        </p>
                      </div>
                    </article>
                  </StaggerItem>
                );
              })}
            </Stagger>

            {/* Honours roll — the strings pipeline, by name */}
            <Reveal delay={0.15}>
              <div className="mt-8 rounded-2xl border border-ink-950/10 bg-snow p-6 shadow-card transition-shadow duration-500 hover:shadow-lift sm:p-7">
                <p className="kicker text-crimson-600">
                  <span className="h-px w-9 bg-crimson-600" />
                  The honours roll · strings pipeline
                </p>
                <ul className="mt-5 space-y-4">
                  {eryoAlumni.map((a) => (
                    <li
                      key={a.name}
                      className="border-l-2 border-crimson-500 pl-4 transition-colors duration-300 hover:border-crimson-600"
                    >
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <span className="font-display text-base font-semibold text-ink-950">
                          {a.name}
                        </span>
                        <span className="font-mono text-[0.58rem] uppercase tracking-[0.18em] text-crimson-600">
                          {a.instrument}
                        </span>
                      </div>
                      <p className="mt-1 text-xs leading-relaxed text-ink-800/60">
                        {a.line}
                      </p>
                    </li>
                  ))}
                </ul>
                <p className="mt-5 border-t border-ink-950/8 pt-4 text-[0.62rem] leading-relaxed text-ink-800/40">
                  The eMagnet School of Music / East Rand Youth Orchestra is a closely
                  linked but separately administered development programme (eryo.org).
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="mt-8 border-l-2 border-gold-600 pl-4 text-xs leading-relaxed text-ink-800/55">
                Alumni stories will be published here once verified by the school — names, portraits
                and pathways only appear with consent.
              </p>
            </Reveal>
          </div>

          {/* Story submission card */}
          <Reveal delay={0.15} className="lg:col-span-6">
            <div className="relative overflow-hidden rounded-3xl border border-ink-950 bg-ink-950 p-7 text-paper shadow-lift sm:p-9">
              <div aria-hidden="true" className="grain pointer-events-none absolute inset-0 opacity-70" />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-20 -top-20 size-64 rounded-full bg-gold-500/10 blur-3xl"
              />
              <div className="relative">
                <p className="kicker text-gold-400">
                  <span className="h-px w-9 bg-gold-400" />
                  Alumni register
                </p>
                <h3 className="mt-4 font-display text-[clamp(1.6rem,3vw,2.3rem)] font-medium leading-tight">
                  Took the stage with us?
                  <br />
                  <span className="italic text-gold-400">Take a bow here.</span>
                </h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-paper/55">
                  If you walked these corridors — choir, band, stage, studio — tell us where the
                  training took you. Approved stories become proof for the next generation.
                </p>

                {state === "sent" ? (
                  <div className="mt-8 rounded-2xl border border-gold-500/30 bg-gold-500/[0.07] p-8 text-center">
                    <CheckCircle2 className="mx-auto size-10 text-gold-400" strokeWidth={1.6} />
                    <p className="mt-4 font-display text-2xl text-paper">Your story is with us.</p>
                    <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-paper/55">
                      Thank you for giving back. The school reviews every submission — if it&apos;s
                      approved, we&apos;ll contact you about featuring it here.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={onSubmit} className="mt-8 space-y-4" noValidate>
                    {/* Honeypot — silently dropped server-side with a fake success. */}
                    <div aria-hidden="true" className="absolute -left-[9999px] -top-[9999px] size-0 overflow-hidden">
                      <label htmlFor="al-company" className="sr-only">Company</label>
                      <input
                        ref={hpRef}
                        id="al-company"
                        type="text"
                        name="company"
                        tabIndex={-1}
                        autoComplete="off"
                        defaultValue=""
                      />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="al-name" className="mb-1.5 block text-[0.62rem] font-bold uppercase tracking-[0.2em] text-paper/45">
                          Your name
                        </label>
                        <input
                          id="al-name"
                          required
                          value={form.name}
                          onChange={set("name")}
                          placeholder="e.g. Lerato Mokoena"
                          className={darkInput}
                        />
                      </div>
                      <div>
                        <label htmlFor="al-email" className="mb-1.5 block text-[0.62rem] font-bold uppercase tracking-[0.2em] text-paper/45">
                          Email (not published)
                        </label>
                        <input
                          id="al-email"
                          type="email"
                          required
                          value={form.email}
                          onChange={set("email")}
                          placeholder="you@example.co.za"
                          className={darkInput}
                        />
                      </div>
                      <div>
                        <label htmlFor="al-cohort" className="mb-1.5 block text-[0.62rem] font-bold uppercase tracking-[0.2em] text-paper/45">
                          Matric year (or &ldquo;current learner&rdquo;)
                        </label>
                        <input
                          id="al-cohort"
                          required
                          value={form.cohort}
                          onChange={set("cohort")}
                          placeholder="e.g. 2016"
                          className={darkInput}
                        />
                      </div>
                      <div>
                        <label htmlFor="al-discipline" className="mb-1.5 block text-[0.62rem] font-bold uppercase tracking-[0.2em] text-paper/45">
                          Your discipline
                        </label>
                        <select
                          id="al-discipline"
                          required
                          value={form.discipline}
                          onChange={set("discipline")}
                          className={cn(darkInput, "appearance-none bg-ink-950", !form.discipline && "text-paper/30")}
                        >
                          <option value="" disabled className="bg-ink-950 text-paper/50">
                            Choose…
                          </option>
                          {disciplineOptions.map((d) => (
                            <option key={d} value={d} className="bg-ink-950 text-paper">
                              {d}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="al-path" className="mb-1.5 block text-[0.62rem] font-bold uppercase tracking-[0.2em] text-paper/45">
                        Where are you now? <span className="normal-case text-paper/30">(one line)</span>
                      </label>
                      <input
                        id="al-path"
                        value={form.path}
                        onChange={set("path")}
                        placeholder="e.g. 3rd-year music student / running a design studio"
                        className={darkInput}
                      />
                    </div>

                    <div>
                      <label htmlFor="al-story" className="mb-1.5 block text-[0.62rem] font-bold uppercase tracking-[0.2em] text-paper/45">
                        Your ERSA story
                      </label>
                      <textarea
                        id="al-story"
                        required
                        rows={4}
                        maxLength={2000}
                        value={form.story}
                        onChange={set("story")}
                        placeholder="The teacher who pushed you, the stage that changed you, where it all led…"
                        className={cn(darkInput, "resize-none")}
                      />
                      <p
                        aria-live="polite"
                        className={cn(
                          "mt-1 text-right font-mono text-[0.6rem] tabular-nums transition-colors duration-300",
                          form.story.length > 1800 ? "text-gold-400" : "text-paper/30"
                        )}
                      >
                        {form.story.length} / 2000
                      </p>
                    </div>

                    <label
                      htmlFor="al-consent"
                      className="flex cursor-pointer items-start gap-3 rounded-xl border border-paper/10 bg-paper/[0.03] p-4 transition-colors hover:border-gold-500/40"
                    >
                      <input
                        id="al-consent"
                        type="checkbox"
                        checked={consent}
                        onChange={(e) => setConsent(e.target.checked)}
                        className="peer sr-only"
                      />
                      <span
                        aria-hidden="true"
                        className={cn(
                          "mt-0.5 grid size-5 shrink-0 place-items-center rounded-[3px] border transition-all duration-200",
                          consent ? "border-gold-400 bg-gold-400" : "border-paper/30 bg-transparent",
                          "peer-focus-visible:ring-2 peer-focus-visible:ring-gold-400/50"
                        )}
                      >
                        <svg viewBox="0 0 24 24" className={cn("size-3.5 text-ink-950 transition-opacity", consent ? "opacity-100" : "opacity-0")} fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </span>
                      <span className="text-[0.72rem] leading-relaxed text-paper/55">
                        <ShieldCheck className="mr-1.5 inline size-3.5 text-gold-500" />
                        POPIA consent — the school may store these details and contact me about my
                        story. Nothing is published without my separate approval.
                      </span>
                    </label>

                    <button
                      type="submit"
                      disabled={state === "sending"}
                      className="group inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-gold-400 px-6 py-4 text-[0.7rem] font-bold uppercase tracking-[0.2em] text-ink-950 shadow-[0_12px_36px_-12px_rgba(212,175,55,0.55)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-300 hover:shadow-glow disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                    >
                      {state === "sending" ? (
                        <>
                          <span className="size-3.5 animate-spin rounded-full border-2 border-ink-950/30 border-t-ink-950" />
                          Sending…
                        </>
                      ) : (
                        <>
                          Share my story
                          <Send className="size-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </Reveal>
        </div>

        {/* Approved stories — renders only once the school has verified submissions */}
        <PublishedStories />
      </div>
    </section>
  );
}
