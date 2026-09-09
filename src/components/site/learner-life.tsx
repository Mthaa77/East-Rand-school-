"use client";

import Image from "next/image";
import {
  Backpack,
  BookOpen,
  Clock3,
  Drama,
  Palette,
  Sun,
  MoonStar,
} from "lucide-react";
import { SectionHeading } from "@/components/site/proof-bar";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { Parallax } from "@/components/motion/parallax";

const rhythm = [
  {
    icon: Backpack,
    time: "07:45",
    title: "Arrival & registration",
    text: "The school day opens like any public school in Ekurhuleni — registers, announcements, and a quick check-in with register teachers.",
  },
  {
    icon: BookOpen,
    time: "08:00",
    title: "Academic blocks",
    text: "The full CAPS curriculum first: languages, mathematics, sciences and the rest. The academics carry the arts, not the other way around.",
  },
  {
    icon: Palette,
    time: "11:00",
    title: "Specialist studios",
    text: "Learners break into their disciplines — canvases, drafting tables, rehearsal rooms and practice spaces take over the timetable.",
  },
  {
    icon: Sun,
    time: "14:30",
    title: "Create & rehearse",
    text: "Ensembles, productions and portfolio sessions. This is where exam pieces, festival sets and exhibition work actually get made.",
  },
  {
    icon: MoonStar,
    time: "16:00",
    title: "After-hours tuition",
    text: "Since the 2019 launch, extended-hours classes in Dance, Art, Music and Drama push the craft further — the spotlight hours.",
  },
];

const facilities = [
  "Dance studios",
  "Drama & rehearsal halls",
  "Design lab",
  "Music rooms & instruments",
  "Visual art studios",
  "Exhibition & performance spaces",
];

export function LearnerLife({
  /** Route shown as the section's "open the page" link (homepage only). */
  pageHref,
  pageLabel = "Open the full page",
}: {
  pageHref?: string;
  pageLabel?: string;
}) {
  return (
    <section
      id="learner-life"
      aria-label="Learner life on campus"
      className="relative overflow-hidden bg-ink-900"
    >
      {/* ghost word */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 whitespace-nowrap font-display text-[18vw] font-bold leading-none text-outline opacity-[0.05] select-none"
      >
        CAMPUS
      </div>

      <div className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-10 lg:py-32">
        <SectionHeading
          kicker="Learner life"
          title="A day in the rhythm of the school."
          accentWords={["rhythm"]}
          description="ERSA runs on a double heartbeat: the academic timetable and the artist's day that unfolds around it — from first bell to after-hours rehearsal."
          pageHref={pageHref}
          pageLabel={pageLabel}
        />

        <div className="mt-16 grid items-start gap-14 lg:grid-cols-12">
          {/* Campus image */}
          <div className="lg:col-span-5">
            <Reveal className="lg:sticky lg:top-36">
              <div className="relative">
                {/* photo group — frame + photo + stacked tile anchored to the photo only */}
                <div className="relative">
                  {/* offset gold frame */}
                  <span
                    aria-hidden="true"
                    className="absolute -left-3 -top-3 h-full w-full rounded-3xl border border-gold-500/40"
                  />
                  <div className="photo-frame relative">
                    <Parallax distance={36}>
                      <div className="relative aspect-[4/4.6] w-full">
                        <Image
                          src="/images/real/learners-entrance.jpg"
                          alt="ERSA learners smiling outside the school entrance in uniform"
                          fill
                          sizes="(max-width: 1024px) 100vw, 40vw"
                          className="object-cover"
                        />
                      </div>
                    </Parallax>
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent" />
                    <div className="absolute bottom-5 left-5 flex items-center gap-2.5 rounded-full bg-ink-950/70 px-4 py-2.5 backdrop-blur-sm shadow-card">
                      <Clock3 className="size-4 text-gold-400" />
                      <p className="text-[0.62rem] font-bold uppercase tracking-[0.22em] text-paper/85">
                        1 Jones Street · Daveyton
                      </p>
                    </div>
                  </div>

                  {/* stacked brand tile — the name on every banner */}
                  <Reveal
                    delay={0.25}
                    className="absolute -bottom-8 -right-3 w-32 sm:-right-6 sm:w-40"
                  >
                    <div className="photo-frame rotate-3 overflow-hidden rounded-2xl ring-1 ring-gold-500/40 transition-transform duration-500 hover:rotate-0">
                      <div className="relative aspect-square w-full">
                        <Image
                          src="/images/real/brand-banner.jpg"
                          alt="ERSA-branded school banner with repeating crest"
                          fill
                          sizes="160px"
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </Reveal>
                </div>

                {/* facilities */}
                <Stagger className="mt-16 flex flex-wrap gap-2" stagger={0.06}>
                  {facilities.map((f) => (
                    <StaggerItem key={f}>
                      <span className="inline-flex items-center gap-2 rounded-full border border-paper/15 bg-ink-950/60 px-4 py-2 text-xs font-semibold text-paper/70 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-500/50 hover:text-gold-300">
                        <span className="size-1.5 rounded-full bg-gold-500" />
                        {f}
                      </span>
                    </StaggerItem>
                  ))}
                </Stagger>
                <Reveal delay={0.2}>
                  <p className="mt-4 text-[0.65rem] leading-relaxed text-paper/35">
                    Specialist facilities were purpose-built for the school&apos;s focus
                    areas (GDE, 2019). A full room-by-room inventory is being confirmed
                    with the school.
                  </p>
                </Reveal>
              </div>
            </Reveal>
          </div>

          {/* Daily rhythm */}
          <div className="lg:col-span-7">
            <ol className="relative space-y-3">
              {rhythm.map((r, i) => {
                const Icon = r.icon;
                return (
                  <Reveal key={r.time} delay={i * 0.07}>
                    <li className="group relative flex gap-6 rounded-2xl border border-paper/10 bg-ink-950/50 p-6 shadow-card backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-gold-500/40 hover:bg-ink-950/80 hover:shadow-lift">
                      <div className="flex flex-col items-center">
                        <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-gold-500/12 text-gold-400 transition-all duration-500 group-hover:bg-gold-500 group-hover:text-ink-950">
                          <Icon className="size-5" strokeWidth={1.8} />
                        </span>
                        {i < rhythm.length - 1 && (
                          <span className="mt-2 w-px flex-1 bg-gradient-to-b from-gold-500/50 to-paper/10" />
                        )}
                      </div>
                      <div className="flex-1 pb-1">
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                          <h3 className="font-display text-2xl font-medium text-paper">
                            {r.title}
                          </h3>
                          <span className="font-mono text-xs tracking-[0.24em] text-gold-400">
                            {r.time}
                          </span>
                        </div>
                        <p className="mt-2.5 max-w-xl text-sm leading-relaxed text-paper/55">
                          {r.text}
                        </p>
                      </div>
                    </li>
                  </Reveal>
                );
              })}
            </ol>

            <Reveal delay={0.25}>
              <div className="mt-8 flex items-center gap-4 rounded-2xl border border-gold-500/25 bg-gradient-to-r from-gold-500/10 to-transparent p-6 shadow-card">
                <Drama className="size-8 shrink-0 text-gold-400" strokeWidth={1.5} />
                <p className="text-sm leading-relaxed text-paper/70">
                  Beyond class: festivals, eisteddfods, industry guest talks and the
                  annual <span className="font-semibold text-gold-300">ERSA Festival</span>{" "}
                  — learners don&apos;t wait for graduation to face an audience.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
