"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import {
  Compass,
  Dumbbell,
  Paintbrush,
  Mic2,
  TrendingUp,
} from "lucide-react";
import { SectionHeading } from "@/components/site/proof-bar";
import { Reveal } from "@/components/motion/reveal";

const steps = [
  {
    n: "01",
    icon: Compass,
    title: "Discover",
    text: "Learners audition into their chosen discipline and find out what their talent can become with real training behind it.",
  },
  {
    n: "02",
    icon: Dumbbell,
    title: "Train",
    text: "Daily craft inside the full public-school curriculum — technique, theory and repetition until excellence is habit.",
  },
  {
    n: "03",
    icon: Paintbrush,
    title: "Create",
    text: "Original work is made in studios and rehearsal rooms: paintings, designs, productions, choreography and compositions.",
  },
  {
    n: "04",
    icon: Mic2,
    title: "Perform",
    text: "Festivals, exhibitions, eisteddfods and community stages — the East Rand becomes the audience and the spotlight.",
  },
  {
    n: "05",
    icon: TrendingUp,
    title: "Progress",
    text: "Portfolios, auditions, tertiary pathways and entrepreneurship — talent leaves ERSA as a plan, not just a dream.",
  },
];

function MethodStep({
  step,
  i,
}: {
  step: (typeof steps)[number];
  i: number;
}) {
  const Icon = step.icon;
  const left = i % 2 === 0;
  return (
    <div className="relative grid gap-6 pb-16 pl-16 last:pb-0 md:pl-0 md:grid-cols-2 md:gap-0">
      {/* Node dot */}
      <span className="absolute left-[9px] top-1 z-10 grid size-[19px] -translate-x-1/2 place-items-center md:left-1/2">
        <motion.span
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: "spring", stiffness: 260, damping: 16 }}
          className="size-[19px] rounded-full border-2 border-gold-400 bg-ink-950"
        >
          <span className="mx-auto block size-[7px] rounded-full bg-gold-400 animate-[pulse-dot_2.4s_ease-in-out_infinite]" />
        </motion.span>
      </span>

      {/* Content */}
      <Reveal
        className={
          left
            ? "md:col-start-1 md:pr-16 md:text-right"
            : "md:col-start-2 md:pl-16"
        }
      >
        <div
          className={`group inline-block rounded-2xl border border-paper/10 bg-ink-900/80 p-7 shadow-card backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-gold-500/40 hover:bg-ink-800/80 hover:shadow-lift ${
            left ? "md:text-right" : ""
          }`}
        >
          <div className={`flex items-center gap-4 ${left ? "md:flex-row-reverse" : ""}`}>
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-gold-500/12 text-gold-400 transition-all duration-500 group-hover:bg-gold-500 group-hover:text-ink-950">
              <Icon className="size-5" strokeWidth={1.8} />
            </span>
            <div>
              <p className="font-mono text-[0.65rem] tracking-[0.3em] text-gold-500/70">
                STEP {step.n}
              </p>
              <h3 className="font-display text-2xl font-medium text-paper">
                {step.title}
              </h3>
            </div>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-paper/55">{step.text}</p>
        </div>
      </Reveal>
    </div>
  );
}

export function Method({
  /** Route shown as the section's "open the page" link (homepage only). */
  pageHref,
  pageLabel = "Open the full page",
}: {
  pageHref?: string;
  pageLabel?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.72", "end 0.55"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });
  const glowY = useTransform(scaleY, (v) => `${v * 100}%`);

  return (
    <section
      id="method"
      aria-label="The ERSA method"
      className="relative overflow-hidden bg-ink-900"
    >
      {/* subtle radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[560px] w-[900px] -translate-x-1/2 rounded-full opacity-25"
        style={{
          background:
            "radial-gradient(closest-side, oklch(0.76 0.14 76 / 0.2), transparent)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-10 lg:py-32">
        <SectionHeading
          align="center"
          className="mx-auto"
          kicker="The ERSA Method"
          title="Talent is the audition. This is the training."
          accentWords={["training."]}
          description="Five movements, one journey — the pipeline every ERSA learner walks from Grade 8 to the world of work."
          pageHref={pageHref}
          pageLabel={pageLabel}
        />

        <div ref={ref} className="relative mx-auto mt-20 max-w-4xl">
          {/* Rail */}
          <div className="absolute left-[9px] top-0 bottom-0 w-px bg-paper/10 md:left-1/2 md:-translate-x-1/2" />
          <motion.div
            aria-hidden="true"
            style={{ scaleY }}
            className="absolute left-[9px] top-0 bottom-0 w-px origin-top bg-gradient-to-b from-gold-300 via-gold-500 to-gold-600 md:left-1/2 md:-translate-x-1/2"
          />
          {/* Travelling glow */}
          <motion.span
            aria-hidden="true"
            style={{ top: glowY }}
            className="absolute left-[9px] hidden size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-300 shadow-[0_0_18px_4px_var(--color-gold-500)] md:left-1/2 md:block"
          />

          <div className="pt-2">
            {steps.map((s, i) => (
              <MethodStep key={s.n} step={s} i={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
