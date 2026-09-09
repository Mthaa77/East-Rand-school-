"use client";

import Image from "next/image";
import { SectionHeading } from "@/components/site/proof-bar";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { Parallax } from "@/components/motion/parallax";
import { Award, GraduationCap, HandHeart, Handshake, Music4, Trophy, Users } from "lucide-react";

const stories = [
  {
    icon: GraduationCap,
    year: "2025",
    title: "98.86% matric pass rate",
    text: "87 of 88 candidates passed the National Senior Certificate — the strongest cohort in the school's recent record.",
  },
  {
    icon: Handshake,
    year: "2024",
    title: "TUT partnership signed",
    text: "An MOU with Tshwane University of Technology opened masterclasses, portfolio preparation and audition training for learners.",
  },
  {
    icon: Music4,
    year: "2025",
    title: "Y20 South Africa stage",
    text: "ERSA performers were featured at the Y20 Opening event, and learners performed Hugh Masekela's 'Stimela' on national platforms.",
  },
  {
    icon: Users,
    year: "2023",
    title: "The Temptations come to Daveyton",
    text: "During a City of Ekurhuleni cultural tour, our choir, dancers, poets and painters hosted music royalty on home ground.",
  },
  {
    icon: Trophy,
    year: "2023",
    title: "Best-managed SSIP trophy",
    text: "District awards recognised ERSA's School Improvement Programme — and named ERSA educators among the recipients.",
  },
  {
    icon: Award,
    year: "2026",
    title: "Joy of Jazz youth pipeline",
    text: "ERSA hosted and joined the Standard Bank Joy of Jazz 'Jazz for Young People' workshops, bands and masterclasses.",
  },
];

export function Impact() {
  return (
    <section id="impact" aria-label="Impact and achievements" className="relative bg-paper text-ink-950">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-10 lg:py-32">
        <div className="grid items-start gap-14 lg:grid-cols-12">
          {/* Image column */}
          <div className="relative lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Reveal>
                <div className="photo-frame relative">
                  <Parallax distance={44}>
                    <div className="relative aspect-[4/4.8] w-full">
                      <Image
                        src="/images/real/choir-principal.jpg"
                        alt="ERSA choir learners with the principal on the school grounds"
                        fill
                        sizes="(max-width: 1024px) 100vw, 40vw"
                        className="object-cover"
                      />
                    </div>
                  </Parallax>
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
                    <p className="pull-quote text-lg leading-snug text-paper drop-shadow-[0_2px_8px_oklch(0.135_0.008_65/0.55)]">
                      &ldquo;The arts can be a career — we prove it to learners every day.&rdquo;
                    </p>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.15}>
                <div className="mt-6 overflow-hidden rounded-2xl border border-ink-950/10 bg-paper shadow-card">
                  <div className="relative aspect-[8/5] w-full">
                    <Image
                      src="/images/real/care-drive.jpg"
                      alt="ERSA learners holding donated sanitary packs in a classroom"
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex items-center justify-between gap-3 px-5 py-4">
                    <div>
                      <p className="text-[0.65rem] font-bold uppercase tracking-[0.22em] text-ink-800/60">
                        Care beyond the stage
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-ink-800/70">
                        Learner-led sanitary dignity drive — packs handed to families in
                        need.
                      </p>
                    </div>
                    <HandHeart className="size-6 shrink-0 text-crimson-600" strokeWidth={1.7} />
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="mt-4 flex items-center justify-between rounded-2xl border border-ink-950/10 bg-paper-200 px-5 py-4 shadow-card">
                  <p className="text-[0.65rem] font-bold uppercase tracking-[0.22em] text-ink-800/60">
                    ERSA Festival — community fundraiser
                  </p>
                  <span className="font-display text-lg font-semibold text-crimson-600">
                    Since 2024
                  </span>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Stories column */}
          <div className="lg:col-span-7">
            <SectionHeading
              dark
              kicker="Receipts, not slogans"
              title="A public school with a public record."
              accentWords={["record."]}
              description="Partnerships, stages and awards that show what disciplined arts education does for young people on the East Rand."
            />

            <Stagger className="mt-12 grid gap-4 sm:grid-cols-2" stagger={0.1}>
              {stories.map((s) => {
                const Icon = s.icon;
                return (
                  <StaggerItem key={s.title}>
                    <article className="group h-full rounded-2xl border border-ink-950/10 bg-paper p-6 shadow-card transition-all duration-500 hover:-translate-y-1.5 hover:border-ink-950/20 hover:shadow-lift">
                      <div className="flex items-center justify-between">
                        <span className="grid size-10 place-items-center rounded-xl bg-ink-950 text-gold-400 transition-colors duration-500 group-hover:bg-crimson-600 group-hover:text-paper">
                          <Icon className="size-4.5" strokeWidth={1.9} />
                        </span>
                        <span className="font-mono text-xs tracking-[0.2em] text-ink-800/40">
                          {s.year}
                        </span>
                      </div>
                      <h3 className="mt-5 font-display text-xl font-medium leading-snug">
                        {s.title}
                      </h3>
                      <p className="mt-2.5 text-sm leading-relaxed text-ink-800/65">
                        {s.text}
                      </p>
                    </article>
                  </StaggerItem>
                );
              })}
            </Stagger>

            <Reveal delay={0.2}>
              <p className="mt-8 border-l-2 border-gold-600 pl-4 text-xs leading-relaxed text-ink-800/55">
                Claims marked as reported or third-party are labelled accordingly and are
                pending official school sign-off before permanent publication.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
