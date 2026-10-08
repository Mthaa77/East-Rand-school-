"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, Compass, GraduationCap, Heart, Sparkles, Users } from "lucide-react";
import { cn } from "@/lib/utils";

type Audience = "learner" | "parent";
type Interest = "disciplines" | "admissions" | "life" | "opportunities";

const interestCopy: Record<Interest, { label: string; detail: string; href: string }> = {
  disciplines: { label: "Find a creative discipline", detail: "See Visual Arts, Design, Drama, Dance and Music.", href: "#disciplines" },
  admissions: { label: "Understand admissions", detail: "Follow the Grade 8 journey, auditions and placement information.", href: "#admissions" },
  life: { label: "Experience learner life", detail: "Meet the rhythms, spaces and people that make ERSA feel like home.", href: "#learner-life" },
  opportunities: { label: "Explore creative futures", detail: "Discover performances, achievements and pathways beyond school.", href: "#impact" },
};

export function VisitorOnboarding() {
  const [audience, setAudience] = useState<Audience | null>(null);
  const [interest, setInterest] = useState<Interest | null>(null);
  const [complete, setComplete] = useState(false);

  const recommendation = useMemo(() => (interest ? interestCopy[interest] : null), [interest]);

  const reset = () => {
    setAudience(null);
    setInterest(null);
    setComplete(false);
  };

  return (
    <section aria-labelledby="onboarding-title" className="relative overflow-hidden bg-snow text-ink-950">
      <div className="pointer-events-none absolute -left-20 top-12 size-64 rounded-full bg-gold-300/25 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-0 size-72 rounded-full bg-sky-200/40 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-20 lg:px-12 lg:py-24">
        <div>
          <p className="kicker text-crimson-600"><Compass className="size-3.5" /> Start here</p>
          <h2 id="onboarding-title" className="mt-5 max-w-xl font-display text-display-lg font-medium leading-[1.02] tracking-tight text-ink-950">
            A clearer way into <span className="italic text-crimson-600">your ERSA story.</span>
          </h2>
          <p className="mt-5 max-w-lg font-editorial text-lede text-ink-700">
            Tell us what brings you here and we&apos;ll point you towards the information that matters most — whether you are imagining your future or helping someone find theirs.
          </p>
          <div className="mt-7 flex items-center gap-3 text-[0.62rem] font-bold uppercase tracking-[0.2em] text-ink-600">
            <span className="grid size-7 place-items-center rounded-full border border-crimson-600/30 text-crimson-600">01</span>
            <span>Personalised, not complicated</span>
          </div>
        </div>

        <div className="relative rounded-[2rem] border border-ink-950/10 bg-white/80 p-3 shadow-[0_28px_80px_-36px_rgba(22,24,30,0.38)] backdrop-blur-sm sm:p-4">
          <div className="rounded-[1.5rem] border border-ink-950/8 bg-paper/70 p-6 sm:p-8">
            <div className="flex items-center justify-between gap-4 border-b border-ink-950/10 pb-5">
              <div>
                <p className="font-mono text-[0.6rem] font-bold uppercase tracking-[0.24em] text-crimson-600">The ERSA guide</p>
                <p className="mt-2 font-display text-xl text-ink-950">What are you exploring?</p>
              </div>
              <span className="grid size-10 place-items-center rounded-full bg-gold-300/45 text-crimson-700"><Sparkles className="size-4" /></span>
            </div>

            <AnimatePresence mode="wait" initial={false}>
              {!audience && (
                <motion.div key="audience" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="pt-6">
                  <p className="text-sm text-ink-600">Choose the view that feels closest to you.</p>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <ChoiceButton active={false} onClick={() => setAudience("learner")} icon={<GraduationCap />} title="I'm a learner" detail="I want to see where my talent could take me." />
                    <ChoiceButton active={false} onClick={() => setAudience("parent")} icon={<Users />} title="I'm a parent or guardian" detail="I want to understand the school and next steps." />
                  </div>
                </motion.div>
              )}

              {audience && !interest && (
                <motion.div key="interest" initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -18 }} className="pt-6">
                  <div className="flex items-center gap-2 text-xs text-ink-600"><Check className="size-3.5 text-crimson-600" /> {audience === "learner" ? "Great — let's follow your curiosity." : "Great — let's make the important details easy to find."}</div>
                  <p className="mt-4 text-sm text-ink-600">What would you like to discover first?</p>
                  <div className="mt-4 grid gap-2.5">
                    {(Object.keys(interestCopy) as Interest[]).map((key) => (
                      <button key={key} type="button" onClick={() => setInterest(key)} className="group flex items-center justify-between gap-4 rounded-xl border border-ink-950/10 bg-white/70 px-4 py-3.5 text-left transition duration-300 hover:-translate-y-0.5 hover:border-crimson-600/45 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson-500/50">
                        <span><span className="block text-sm font-semibold text-ink-950">{interestCopy[key].label}</span><span className="mt-1 block text-xs leading-relaxed text-ink-600">{interestCopy[key].detail}</span></span>
                        <ArrowRight className="size-4 shrink-0 text-crimson-600 transition-transform group-hover:translate-x-1" />
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {interest && recommendation && (
                <motion.div key="recommendation" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="pt-6">
                  <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-crimson-600"><Heart className="size-3.5 fill-current" /> Your recommended next step</p>
                  <h3 className="mt-4 font-display text-display-sm font-medium text-ink-950">{recommendation.label}</h3>
                  <p className="mt-3 max-w-md font-editorial text-lg leading-relaxed text-ink-700">{recommendation.detail}</p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <a href={recommendation.href} onClick={() => setComplete(true)} className="inline-flex items-center gap-2 rounded-full bg-crimson-600 px-5 py-3 text-[0.65rem] font-bold uppercase tracking-[0.17em] text-white transition hover:bg-crimson-700">Continue exploring <ArrowRight className="size-4" /></a>
                    <button type="button" onClick={reset} className="rounded-full border border-ink-950/15 px-5 py-3 text-[0.65rem] font-bold uppercase tracking-[0.17em] text-ink-700 transition hover:border-crimson-600 hover:text-crimson-700">Start again</button>
                  </div>
                  <p className="mt-6 text-xs text-ink-500">{complete ? "Taking you to the right part of the ERSA story." : "No account or personal details required."}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

function ChoiceButton({ icon, title, detail, onClick, active }: { icon: React.ReactNode; title: string; detail: string; onClick: () => void; active: boolean }) {
  return <button type="button" onClick={onClick} aria-pressed={active} className="group rounded-2xl border border-ink-950/10 bg-white/70 p-4 text-left transition duration-300 hover:-translate-y-1 hover:border-crimson-600/45 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson-500/50"><span className="grid size-10 place-items-center rounded-xl bg-gold-300/45 text-crimson-700 transition-transform group-hover:rotate-3">{icon}</span><span className="mt-4 block text-sm font-semibold text-ink-950">{title}</span><span className="mt-1 block text-xs leading-relaxed text-ink-600">{detail}</span></button>;
}

export default VisitorOnboarding;
