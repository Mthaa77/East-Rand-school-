"use client";

import Image from "next/image";
import { MapPin, TrainFront } from "lucide-react";
import { SectionHeading } from "@/components/site/proof-bar";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { communityTowns, vision } from "@/lib/school-facts";

/**
 * Moments — the school in its own colours. A snow-white contact sheet of
 * real ERSA photography (blazer red, shirt white), the learner catchment
 * it serves, and the school's own vision statement as the closing line.
 *
 * Facts: catchment towns (Daveyton, Etwatwa, Wattville, Kwa-Thema, Tsakane,
 * Duduza, Tembisa) and "the only GDE art school in Ekurhuleni" — Research
 * Dossier §1. Vision statement — Research Dossier §2 (the school's own words).
 */

const shots = [
  {
    src: "/images/real/matric-celebration.jpg",
    alt: "The matric class of 2025 celebrating outside the school building in red blazers",
    caption: "Matric 2025 · the class in red",
    span: "lg:col-span-7",
    aspect: "aspect-[16/10]",
    pos: "[object-position:50%_35%]",
  },
  {
    src: "/images/real/gallery-books.jpg",
    alt: "Learners in red blazers holding arts publications at a gallery exhibition",
    caption: "Be the Arts, in hand · gallery visit",
    span: "lg:col-span-5",
    aspect: "aspect-[4/3.35] lg:aspect-[4/3.53]",
    pos: "[object-position:50%_28%]",
  },
  {
    src: "/images/real/studio-drawing.jpg",
    alt: "A visual arts learner drawing a portrait from a phone reference in the studio",
    caption: "Studio hours · Visual Arts",
    span: "lg:col-span-4",
    aspect: "aspect-[4/3.4]",
    pos: "[object-position:50%_30%]",
  },
  {
    src: "/images/real/staff-learner.jpg",
    alt: "An educator talking with a learner in red blazer outside the school hall",
    caption: "Corridor conversations",
    span: "lg:col-span-4",
    aspect: "aspect-[4/3.4]",
    pos: "[object-position:50%_28%]",
  },
] as const;

export function Moments() {
  return (
    <section
      id="moments"
      aria-label="School life in photographs and the community we serve"
      className="relative overflow-hidden bg-snow text-ink-950"
    >
      {/* ghost word in blazer red */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-4 top-6 select-none whitespace-nowrap font-display text-[19vw] font-bold leading-none text-outline-red opacity-60"
      >
        ERSA
      </div>

      <div className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-10 lg:py-32">
        <SectionHeading
          dark
          kicker="In red & white"
          title="The school, in its colours."
          accentWords={["colours."]}
          description="Blazer red and shirt white aren't a design choice — they're the uniform the learners chose to be photographed in. This is the everyday work behind the spotlight, on real walls and real stages around the East Rand."
        />

        {/* Contact sheet */}
        <Stagger className="mt-16 grid gap-5 lg:grid-cols-12" stagger={0.1}>
          {shots.map((s) => (
            <StaggerItem key={s.src} className={s.span}>
              <figure className="group relative">
                <div className={`photo-frame relative w-full ${s.aspect}`}>
                  <Image
                    src={s.src}
                    alt={s.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    className={`object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05] ${s.pos}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950/55 via-transparent to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
                  <figcaption className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-ink-950/70 px-4 py-2 backdrop-blur-sm">
                    <span className="size-1.5 rounded-full bg-crimson-400" />
                    <span className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-snow">
                      {s.caption}
                    </span>
                  </figcaption>
                </div>
                <span
                  aria-hidden="true"
                  className="absolute -right-2 -top-2 h-full w-full rounded-3xl border border-crimson-500/25 transition-colors duration-500 group-hover:border-crimson-500/55"
                />
              </figure>
            </StaggerItem>
          ))}

          {/* The brand tile — the name on every banner */}
          <StaggerItem className="lg:col-span-4">
            <div className="group flex h-full flex-col overflow-hidden rounded-3xl border border-ink-950/10 bg-paper shadow-card transition-all duration-500 hover:-translate-y-1 hover:border-crimson-500/40 hover:shadow-lift">
              <div className="relative aspect-[16/8.4] w-full overflow-hidden">
                <Image
                  src="/images/real/logo-banner.jpg"
                  alt="East Rand School of the Arts — Creative and Performing Art — letterhead in school red"
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover transition-transform duration-[1.2s] group-hover:scale-[1.06]"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="text-[0.62rem] font-bold uppercase tracking-[0.22em] text-crimson-600">
                  The name on every banner
                </p>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-800/65">
                  East Rand School of the Arts — Creative and Performing Art. One
                  public school, five disciplines, six GDE focus areas, and a
                  register that reads like a map of the East Rand.
                </p>
                <p className="mt-auto pt-4 font-mono text-[0.58rem] uppercase tracking-[0.16em] text-ink-800/40">
                  Established 1999 · Benoni, Gauteng
                </p>
              </div>
            </div>
          </StaggerItem>
        </Stagger>

        {/* Community reach — the catchment, plainly */}
        <Reveal delay={0.1}>
          <div className="mt-20 rounded-3xl border border-ink-950/10 bg-paper p-8 shadow-card sm:p-10">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-5">
                <p className="kicker text-crimson-600">
                  <span className="h-px w-9 bg-crimson-600" />
                  Who we&apos;re here for
                </p>
                <h3 className="mt-4 font-display text-display-sm font-medium leading-tight text-balance text-ink-950">
                  Learners travel from{" "}
                  <em className="font-light italic text-crimson-600">
                    all over the East Rand.
                  </em>
                </h3>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-800/65">
                  As the only GDE arts school in Ekurhuleni, the register draws from
                  the whole metro — and beyond it. Specialist seats are worth the
                  commute.
                </p>
              </div>
              <div className="lg:col-span-7">
                <ul className="flex flex-wrap gap-2.5" aria-label="Communities our learners travel from">
                  {communityTowns.map((t) => (
                    <li
                      key={t}
                      className="inline-flex items-center gap-2 rounded-full border border-ink-950/12 bg-snow px-4 py-2.5 text-[0.72rem] font-semibold text-ink-800 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:border-crimson-500/60 hover:text-crimson-700"
                    >
                      <MapPin className="size-3.5 text-crimson-500" />
                      {t}
                    </li>
                  ))}
                </ul>
                <div className="rule-gradient-red mt-7" />
                <p className="mt-5 flex items-start gap-3 text-[0.68rem] leading-relaxed text-ink-800/50">
                  <TrainFront className="mt-0.5 size-4 shrink-0 text-ink-800/40" />
                  The campus — the former Daveyton College of Education site on the
                  Putfontein/Crystal Park border — sits off the N12, with Daveyton&apos;s
                  rail link to Benoni, Boksburg and Johannesburg close by.
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* The vision — the school's own words */}
        <Reveal delay={0.15}>
          <blockquote className="mx-auto mt-20 max-w-3xl text-center">
            <span
              aria-hidden="true"
              className="mx-auto block h-1 w-14 rounded-full bg-crimson-600"
            />
            <p className="drop-cap-red editorial mt-8 text-pretty text-ink-900">
              {vision}
            </p>
            <footer className="mt-6 font-mono text-[0.62rem] uppercase tracking-[0.24em] text-ink-800/45">
              — the school&apos;s own vision statement
            </footer>
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}
