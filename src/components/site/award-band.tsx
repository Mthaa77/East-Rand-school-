"use client";

import Image from "next/image";
import { Award, CalendarDays, Megaphone, Trophy, Users } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { ViewfinderCorners } from "@/components/site/viewfinder-corners";

/**
 * AwardBand — the newest receipt, in the school's own colours.
 * A deep red "ribbon" band celebrating the Gauteng Art win at the
 * "Be the Voice" exhibition (Springs Art Gallery), plus the public
 * festival record that frames it.
 *
 * Facts: winner board "GAUTENG ART · WINNER · MPHO MOLOI · R5 000" and the
 * exhibition banner text visible in the school's own photographs:
 * "an anti-bullying group exhibition featuring artworks by 20 high school
 * learners from public schools around Gauteng", 6 December 2025 –
 * 30 January 2026, Springs Art Gallery. Festival dates: ERSA Festival 2024
 * "Art You Are" (25–26 Oct 2024) and ERSA Festival 2025 (24 Oct, 10:00–17:00),
 * Rhoo Hlatshwayo Arts Centre/Theatre, Daveyton. Art Awareness Week, April
 * 2022, with guests Aus Tebza, Buhlebendalo Mda and Fundile Dlamini.
 */

const festivalDepartments = [
  "Dance",
  "Drama",
  "Design",
  "Music",
  "Visual Arts",
  "Applied Arts",
];

export function AwardBand() {
  return (
    <section
      id="award"
      aria-label="Learner award — Gauteng Art winner at Be the Voice"
      className="relative overflow-hidden"
    >
      {/* ribbon edges — the blazer stripe, top and bottom */}
      <div aria-hidden="true" className="ribbon-band h-2.5" />

      <div className="relative bg-gradient-to-b from-crimson-700 via-crimson-600 to-crimson-700 text-snow">
        <div aria-hidden="true" className="grain pointer-events-none absolute inset-0" />
        {/* spotlight washes */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_55%_at_18%_0%,oklch(0.995_0.004_95/0.14),transparent_60%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_88%_100%,oklch(0.135_0.008_65/0.4),transparent_65%)]"
        />
        {/* ghost word */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-6 bottom-0 select-none whitespace-nowrap font-display text-[17vw] font-bold leading-none text-outline opacity-25"
        >
          BRAVO
        </div>

        <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
            {/* The photograph */}
            <Reveal className="lg:col-span-5">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <span
                  aria-hidden="true"
                  className="absolute -left-3 -top-3 h-full w-full rounded-3xl border border-snow/40"
                />
                <div className="photo-frame group relative ring-2 ring-snow/50">
                  <div className="relative aspect-[4/4.7] w-full">
                    <Image
                      src="/images/real/award-winner.jpg"
                      alt="ERSA learners and educators with the Gauteng Art winner board — Mpho Moloi, R5 000 — at the Be the Voice exhibition, Springs Art Gallery"
                      fill
                      sizes="(max-width: 1024px) 90vw, 40vw"
                      className="object-cover [object-position:50%_30%]"
                    />
                  </div>
                  <ViewfinderCorners className="text-snow" />
                  <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-crimson-700/85 via-crimson-700/25 to-transparent" />
                  <div className="absolute bottom-5 left-5 flex items-center gap-2.5 rounded-full bg-ink-950/65 px-4 py-2.5 backdrop-blur-sm">
                    <Trophy className="size-4 text-gold-300" />
                    <p className="text-[0.62rem] font-bold uppercase tracking-[0.2em] text-snow">
                      Mpho Moloi · R5 000 winner
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* The record */}
            <div className="lg:col-span-7">
              <Reveal>
                <p className="kicker text-snow">
                  <span className="h-px w-9 bg-snow/70" />
                  The newest receipt · Summer 2025/26
                </p>
                <h2 className="mt-5 max-w-2xl font-display text-display-lg font-medium leading-[1.05] text-balance text-snow">
                  The work took a bow at{" "}
                  <em className="font-display-wonk font-light italic text-gold-200">
                    &ldquo;Be the Voice.&rdquo;
                  </em>
                </h2>
              </Reveal>

              <Reveal delay={0.12}>
                <p className="mt-6 max-w-2xl font-editorial text-lede text-pretty text-snow/85">
                  At Springs Art Gallery — in a group exhibition of works by twenty
                  high-school learners from public schools around Gauteng, mounted
                  against bullying — an ERSA learner carried home the winner&apos;s
                  board:{" "}
                  <span className="font-semibold text-snow">
                    Gauteng Art · Mpho Moloi · R5&nbsp;000
                  </span>
                  . Same verdict as always: the behind-the-scenes hours travel.
                </p>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full bg-snow px-5 py-2.5 text-[0.66rem] font-bold uppercase tracking-[0.18em] text-crimson-700 shadow-card">
                    <Award className="size-4" />
                    Gauteng Art · Winner
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-snow/45 px-5 py-2.5 text-[0.66rem] font-bold uppercase tracking-[0.18em] text-snow/90">
                    <CalendarDays className="size-4" />
                    6 Dec 2025 – 30 Jan 2026
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-snow/45 px-5 py-2.5 text-[0.66rem] font-bold uppercase tracking-[0.18em] text-snow/90">
                    <Users className="size-4" />
                    20 public-school exhibitors
                  </span>
                </div>
              </Reveal>

              {/* The public-stage record alongside */}
              <Reveal delay={0.28}>
                <div className="mt-10 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-snow/25 bg-crimson-700/40 p-6 backdrop-blur-sm transition-colors duration-300 hover:bg-crimson-700/60">
                    <p className="flex items-center gap-2 text-[0.62rem] font-bold uppercase tracking-[0.22em] text-gold-200">
                      <Megaphone className="size-4" />
                      ERSA Festival · annual
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-snow/80">
                      24 October 2025, 10:00–17:00 at the Rhoo Hlatshwayo Theatre,
                      Daveyton — and &ldquo;Art You Are&rdquo; the year before. The
                      whole school opens its terms of work to the community.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-snow/25 bg-crimson-700/40 p-6 backdrop-blur-sm transition-colors duration-300 hover:bg-crimson-700/60">
                    <p className="flex items-center gap-2 text-[0.62rem] font-bold uppercase tracking-[0.22em] text-gold-200">
                      <Users className="size-4" />
                      Industry at the door
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-snow/80">
                      Art Awareness Week has brought working artists to the campus —
                      Aus Tebza, Buhlebendalo Mda, Fundile Dlamini — &ldquo;to inspire
                      learners that the arts can be a career.&rdquo;
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.34}>
                <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-snow/25 pt-6">
                  <span className="text-[0.6rem] font-bold uppercase tracking-[0.22em] text-snow/60">
                    Festival departments on show:
                  </span>
                  {festivalDepartments.map((d) => (
                    <span
                      key={d}
                      className="rounded-full bg-snow/12 px-3 py-1 text-[0.62rem] font-semibold text-snow/85 transition-colors duration-300 hover:bg-snow/25"
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={0.4}>
                <p className="mt-6 font-mono text-[0.58rem] uppercase leading-relaxed tracking-[0.14em] text-snow/45">
                  Source: &ldquo;Be the Voice&rdquo; exhibition banner &amp; winner board,
                  Springs Art Gallery · ERSA Festival listings (Quicket) · Art Awareness
                  Week press, Apr 2022
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </div>

      <div aria-hidden="true" className="ribbon-band h-2.5" />
    </section>
  );
}
