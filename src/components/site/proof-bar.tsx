"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { WordReveal } from "@/components/motion/word-reveal";
import { Counter } from "@/components/motion/counter";
import { cn } from "@/lib/utils";

export function SectionHeading({
  kicker,
  title,
  accentWords = [],
  description,
  align = "left",
  dark = false,
  className,
  /** Optional route to the full page — renders an editorial "open the page" link. */
  pageHref,
  pageLabel = "Open the full page",
}: {
  kicker: string;
  title: string;
  accentWords?: string[];
  description?: string;
  align?: "left" | "center";
  dark?: boolean;
  className?: string;
  pageHref?: string;
  pageLabel?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      <Reveal>
        <p className={cn("kicker", dark ? "text-gold-600" : "text-gold-400")}>
          <span className={cn("h-px w-9", dark ? "bg-gold-600" : "bg-gold-400")} />
          {kicker}
        </p>
      </Reveal>
      <h2
        className={cn(
          "heading-craft mt-5 font-display text-display-lg font-medium text-balance",
          dark ? "heading-depth-light text-ink-950" : "heading-depth text-paper"
        )}
      >
        <WordReveal text={title} accentWords={accentWords} accentClass={dark ? "text-crimson-500 italic font-light" : "text-gilded text-gilded-sheen italic font-light"} />
      </h2>
      {description && (
        <Reveal delay={0.15}>
          <p
            className={cn(
              "mt-5 max-w-xl text-pretty text-base leading-relaxed",
              align === "center" && "mx-auto",
              dark ? "text-ink-800/75" : "text-paper/60"
            )}
          >
            {description}
          </p>
        </Reveal>
      )}
      {pageHref && (
        <Reveal delay={0.25}>
          <Link
            href={pageHref}
            className={cn(
              "group mt-6 inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-[0.68rem] font-bold uppercase tracking-[0.2em] transition-all duration-300",
              dark
                ? "border-ink-950/20 text-ink-800 hover:border-ink-950/50 hover:shadow-card"
                : "border-paper/20 text-paper/80 hover:border-gold-400/70 hover:text-gold-300 hover:shadow-card"
            )}
          >
            {pageLabel}
            <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Reveal>
      )}
    </div>
  );
}

const stats = [
  {
    value: 98.86,
    decimals: 2,
    suffix: "%",
    label: "2025 NSC pass rate",
    note: "87 of 88 matric candidates passed",
  },
  {
    value: 5,
    decimals: 0,
    suffix: "",
    label: "Specialist disciplines",
    note: "Visual Arts · Design · Drama · Dance · Music",
  },
  {
    value: 567,
    decimals: 0,
    suffix: "",
    label: "Learners on register",
    note: "Taught in classes of 10–15 · 45 teachers",
  },
  {
    value: 27,
    decimals: 0,
    suffix: "+",
    label: "Years on the East Rand",
    note: "Rooted in Daveyton since 1999",
  },
];

export function ProofBar() {
  return (
    <section id="proof" aria-label="School proof points" className="relative bg-paper text-ink-950">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            dark
            kicker="Verified, not exaggerated"
            title="Excellence you can check."
            accentWords={["check."]}
            description="Every number on this page is published with its source and a last-verified date — because a school that trains artists should also practise honesty."
          />
          <Reveal delay={0.2} className="shrink-0">
            <p className="max-w-[220px] border-l-2 border-crimson-500 pl-4 text-xs leading-relaxed text-ink-800/60">
              Results shown are third-party compilations of DBE data, pending official
              school sign-off.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-ink-950/10 bg-paper p-8 shadow-card transition-all duration-500 hover:-translate-y-1 hover:bg-paper-200 hover:shadow-lift">
                <span className="absolute right-5 top-5 font-mono text-[0.65rem] text-ink-800/30">
                  0{i + 1}
                </span>
                <p className="font-display stat-figure tabular text-[2.9rem] font-semibold leading-none tracking-tight text-ink-950">
                  <Counter value={s.value} decimals={s.decimals} suffix={s.suffix} />
                </p>
                <p className="mt-3 text-[0.72rem] font-bold uppercase tracking-[0.2em] text-crimson-600">
                  {s.label}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-ink-800/60">{s.note}</p>
                <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-crimson-500 transition-all duration-500 group-hover:w-full" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
