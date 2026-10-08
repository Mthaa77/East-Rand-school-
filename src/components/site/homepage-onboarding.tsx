"use client";

import { useMemo, useState } from "react";
import { ArrowRight, Check, GraduationCap, HeartHandshake, Sparkles } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Audience = "learner" | "parent";
type Interest = "discipline" | "admissions" | "school-life" | "achievements";

const interests: Array<{ id: Interest; label: string; description: string }> = [
  { id: "discipline", label: "Find my creative path", description: "Explore the five arts disciplines and discover where your talent could grow." },
  { id: "admissions", label: "Understand admissions", description: "See the journey from requirements and applications to auditions and placement." },
  { id: "school-life", label: "Experience school life", description: "Get a feel for the studios, stages, people and rhythm of ERSA." },
  { id: "achievements", label: "See what is possible", description: "Meet the work, milestones and opportunities shaping ERSA learners." },
];

const destinations: Record<Interest, { href: string; label: string }> = {
  discipline: { href: "#disciplines", label: "Explore disciplines" },
  admissions: { href: "/admissions", label: "View admissions" },
  "school-life": { href: "#learner-life", label: "See school life" },
  achievements: { href: "#impact", label: "Explore achievements" },
};

export function HomepageOnboarding() {
  const [audience, setAudience] = useState<Audience | null>(null);
  const [interest, setInterest] = useState<Interest | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const selected = useMemo(() => (interest ? interests.find((item) => item.id === interest) : null), [interest]);

  const reset = () => {
    setAudience(null);
    setInterest(null);
    setSubmitted(false);
  };

  return (
    <section aria-labelledby="onboarding-title" className="relative overflow-hidden bg-snow px-5 py-20 text-ink-950 [content-visibility:auto] [contain-intrinsic-size:0_760px] sm:px-8 lg:px-12 lg:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 top-12 size-72 rounded-full bg-gold-400/20 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -left-24 bottom-0 size-80 rounded-full bg-crimson-500/10 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-20">
        <div className="max-w-xl">
          <p className="flex items-center gap-2 text-[0.62rem] font-bold uppercase tracking-[0.24em] text-crimson-600">
            <Sparkles className="size-3.5" /> Start here
          </p>
          <h2 id="onboarding-title" className="mt-5 max-w-lg font-display text-display-lg font-medium tracking-tight text-ink-950">
            Your ERSA story can start with one good question.
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-ink-700/75 sm:text-lg">
            Whether you are choosing a creative home or helping someone find theirs, tell us what matters most. We&apos;ll point you to the right part of the school.
          </p>
          <p className="mt-8 max-w-sm border-l-2 border-gold-500 pl-4 font-editorial text-lg italic leading-relaxed text-ink-700/70">
            A considered first step for learners and families across Gauteng.
          </p>
        </div>

        <div className="rounded-[2rem] border border-ink-950/10 bg-white/75 p-5 shadow-panel backdrop-blur-sm sm:p-8">
          <div className="flex items-center justify-between gap-4 border-b border-ink-950/10 pb-5">
            <div>
              <p className="font-mono text-[0.62rem] tracking-[0.22em] text-ink-500">YOUR STARTING POINT</p>
              <p className="mt-2 font-display text-xl font-medium text-ink-950">Let&apos;s make the next step clear.</p>
            </div>
            <span className="grid size-11 shrink-0 place-items-center rounded-full bg-ink-950 text-gold-300">
              {submitted ? <Check className="size-5" /> : <span className="font-mono text-xs">01</span>}
            </span>
          </div>

          {!audience && (
            <div className="pt-7">
              <p className="text-sm font-semibold text-ink-950">I&apos;m exploring ERSA as a...</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <button type="button" onClick={() => setAudience("learner")} className="group rounded-2xl border border-ink-950/10 bg-snow-200/60 p-5 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-600 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500">
                  <GraduationCap className="size-6 text-crimson-600 transition-transform duration-300 group-hover:-rotate-6" />
                  <span className="mt-7 block font-display text-xl font-medium">A learner</span>
                  <span className="mt-1 block text-xs leading-relaxed text-ink-600">I&apos;m finding my discipline and next move.</span>
                </button>
                <button type="button" onClick={() => setAudience("parent")} className="group rounded-2xl border border-ink-950/10 bg-snow-200/60 p-5 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-600 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500">
                  <HeartHandshake className="size-6 text-crimson-600 transition-transform duration-300 group-hover:rotate-6" />
                  <span className="mt-7 block font-display text-xl font-medium">A parent or guardian</span>
                  <span className="mt-1 block text-xs leading-relaxed text-ink-600">I&apos;m helping a young artist choose well.</span>
                </button>
              </div>
            </div>
          )}

          {audience && !interest && (
            <div className="pt-7">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-ink-950">What would be most useful right now?</p>
                <button type="button" onClick={() => setAudience(null)} className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-ink-500 transition-colors hover:text-crimson-600">Change</button>
              </div>
              <div className="mt-4 grid gap-2.5">
                {interests.map((item) => (
                  <button key={item.id} type="button" onClick={() => setInterest(item.id)} className="group flex items-center justify-between gap-4 rounded-xl border border-ink-950/10 bg-snow-200/50 px-4 py-4 text-left transition-all duration-300 hover:border-gold-600 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500">
                    <span><span className="block text-sm font-semibold text-ink-950">{item.label}</span><span className="mt-1 block text-xs leading-relaxed text-ink-600">{item.description}</span></span>
                    <ArrowRight className="size-4 shrink-0 text-ink-400 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-crimson-600" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {interest && selected && (
            <div className="pt-7">
              <p className="text-[0.62rem] font-bold uppercase tracking-[0.2em] text-crimson-600">A thoughtful next step</p>
              <h3 className="mt-3 font-display text-3xl font-medium text-ink-950">{selected.label}</h3>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-ink-700/75">{selected.description} You can keep exploring at your own pace — this is a guide, not a gate.</p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link href={destinations[interest].href} onClick={() => setSubmitted(true)} className="inline-flex items-center gap-2 rounded-full bg-ink-950 px-5 py-3 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-paper transition-colors hover:bg-crimson-700">{destinations[interest].label}<ArrowRight className="size-4" /></Link>
                <button type="button" onClick={reset} className="rounded-full border border-ink-950/15 px-5 py-3 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-ink-700 transition-colors hover:border-crimson-600 hover:text-crimson-600">Start again</button>
              </div>
              <p className="mt-6 text-[0.68rem] text-ink-500">Exploring as a {audience === "learner" ? "learner" : "parent or guardian"}. No information is stored.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
