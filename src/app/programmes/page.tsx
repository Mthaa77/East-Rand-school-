import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Earth,
  GraduationCap,
  History,
  Mic2,
  Music,
  Music2,
  Palette,
  PenTool,
  Footprints,
  Tent,
} from "lucide-react";
import { PageHero, PageBand } from "@/components/site/page-hero";
import { Disciplines } from "@/components/site/disciplines";
import { SectionHeading } from "@/components/site/proof-bar";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { pageByPath } from "@/lib/navigation";
import { CrestStrip } from "@/components/site/brand-band";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Programmes",
  description:
    "Five specialist disciplines — Visual Arts, Design, Dramatic Arts, Dance Studies and Music — trained daily inside the full GDE curriculum, with audition-based entry.",
};

/**
 * Restated from the discipline dossier data (src/components/site/disciplines.tsx)
 * so the curriculum panel and pathways list stay in sync with the homepage.
 * Nothing here is invented — subject lists and staff leads stay pending.
 */
const disciplines = [
  {
    index: "01",
    title: "Visual Arts",
    icon: Palette,
    tagline: "Paint, draw, sculpt, exhibit",
    focus:
      "From first pencil sketch to public exhibition — learners build portfolios that speak louder than marks.",
    pathways: [
      "Fine art & illustration",
      "Art teaching & facilitation",
      "Gallery & curation work",
      "Creative entrepreneurship",
    ],
  },
  {
    index: "02",
    title: "Design",
    icon: PenTool,
    tagline: "Sketch, prototype, solve",
    focus:
      "Creative problem-solving across fashion, product and visual communication — craft turned into value.",
    pathways: [
      "Fashion & textile design",
      "Product & industrial design",
      "Branding, marketing & media",
      "Starting your own label or studio",
    ],
  },
  {
    index: "03",
    title: "Dramatic Arts",
    icon: Mic2,
    tagline: "Speak, move, transform",
    focus:
      "Theatre, performance and stagecraft that grow voice, presence and the confidence to hold a room.",
    pathways: [
      "Stage & screen performance",
      "Directing & production",
      "Speech & drama teaching",
      "Media, PR & communications",
    ],
  },
  {
    index: "04",
    title: "Dance Studies",
    icon: Footprints,
    tagline: "Train, sweat, soar",
    focus:
      "Technique, choreography and live performance — discipline you can see in every controlled movement.",
    pathways: [
      "Professional company work",
      "Choreography & creative direction",
      "Dance teaching & coaching",
      "Performance fitness careers",
    ],
  },
  {
    index: "05",
    title: "Music",
    icon: Music2,
    tagline: "Play, sing, amplify",
    focus:
      "Instrumental, vocal and ensemble training with real audiences — from classroom to festival stage.",
    pathways: [
      "Professional musicianship",
      "Sound, production & engineering",
      "Music teaching & choir direction",
      "Session, worship & industry work",
    ],
  },
] as const;

/** Publicly reported proof points (profile §12) — phrased as reports, not claims. */
const proof = [
  {
    year: "2024",
    icon: GraduationCap,
    label: "TUT collaboration",
    text: "Tshwane University of Technology's Faculty of Arts and Design describes an MOU pathway with ERSA — masterclasses, portfolio preparation, audition readiness and educator upskilling.",
  },
  {
    year: "2026",
    icon: Music,
    label: "Joy of Jazz / J4YP",
    text: "The Jazz for Young People programme records an ERSA workshop at 1 Jones Street, Daveyton, and lists ERSA among the participating youth bands and music institutions.",
  },
  {
    year: "2025",
    icon: Earth,
    label: "Y20 South Africa",
    text: "GDE public posts identify ERSA performing at the Y20 South Africa Opening event in August 2025 — learners on a national platform, in public view.",
  },
  {
    year: "Annual",
    icon: Tent,
    label: "ERSA Festival",
    text: "The school's own festival brief spans performances, exhibitions and career pathways across the disciplines, open to the Daveyton community at the Rhoo Hlatshwayo Arts Centre.",
  },
] as const;

const CONTINUE_LINKS = ["/admissions", "/gallery"] as const;

export default function ProgrammesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-ink-950 text-paper">
      <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
        {/* ── 1. Masthead ─────────────────────────────────────────────── */}
        <PageHero
          kicker="Five disciplines, one full curriculum"
          title="Choose your craft. Train it daily."
          accentWords={["craft"]}
          lede="Every learner auditions into one specialist discipline and trains it for their whole school journey — inside the full South African public curriculum. The academics stay; the craft is added, every single day."
          crumb="Programmes"
          image="/images/page-programmes.webp"
          imageAlt="Studio table with instruments, sketches and drafting tools under warm light"
        >
          <div className="flex flex-wrap gap-2">
            {disciplines.map((d) => (
              <span
                key={d.title}
                className="rounded-full border border-paper/15 bg-paper/[0.04] px-4 py-2 text-xs text-paper/70 transition-colors duration-300 hover:border-gold-400/60 hover:text-gold-200"
              >
                {d.title}
              </span>
            ))}
          </div>
        </PageHero>

        {/* ── 1b. The crest in glass — official brand art ─────────────── */}
        <CrestStrip
          src="/images/brand/crest-glass-split.webp"
          alt="The official ERSA crest rendered in glass and gold on split wood and marble, surrounded by the palette, drum, masks and dancer figurine"
          kicker="One shield, five disciplines"
          caption="The crest's quarters carry the palette, the drum, the book, the dancer and the masks — every studio under one crest."
        />

        {/* ── 2. The five disciplines (own ink section, finder included) ── */}
        <Disciplines />

        {/* ── 3. What the training covers — curriculum honesty panel ───── */}
        <PageBand
          tone="paper"
          className="py-24 sm:py-28"
          ariaLabel="What the training covers"
        >
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <SectionHeading
              dark
              kicker="The curriculum, honestly"
              title="What the training covers."
              accentWords={["covers"]}
              description="ERSA combines the South African public-school curriculum with specialist arts learning. Current public programme information identifies the five disciplines below; subject availability, grades and audition requirements are confirmed annually by the school."
            />

            <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Stagger stagger={0.1} className="contents">
                {disciplines.map((d, i) => (
                  <StaggerItem
                    key={d.title}
                    className={cn("h-full", i === 0 && "sm:col-span-2")}
                  >
                    <article className="group flex h-full flex-col rounded-2xl border border-ink-950/10 bg-paper p-6 shadow-card transition-all duration-500 hover:-translate-y-0.5 hover:border-gold-600/40 hover:shadow-lift sm:p-7">
                      <div className="flex items-start justify-between gap-4">
                        <span className="font-mono text-xs tracking-[0.3em] text-gold-600">
                          {d.index}
                        </span>
                        <d.icon
                          className="size-5 text-ink-950/25 transition-colors duration-500 group-hover:text-gold-600"
                          strokeWidth={1.8}
                          aria-hidden="true"
                        />
                      </div>
                      <h3 className="mt-4 font-display text-2xl font-medium text-ink-950">
                        {d.title}
                      </h3>
                      <p className="mt-1.5 text-[0.62rem] font-bold uppercase tracking-[0.24em] text-crimson-600">
                        {d.tagline}
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-ink-800/65">
                        {d.focus}
                      </p>
                      <span className="mt-auto block pt-5">
                        <span className="block h-px w-full bg-ink-950/10">
                          <span className="block h-px w-0 bg-gold-500 transition-all duration-700 ease-out group-hover:w-full" />
                        </span>
                      </span>
                    </article>
                  </StaggerItem>
                ))}
              </Stagger>

              {/* Roots note — the 2019 six-area launch, kept in view */}
              <Reveal delay={0.15} className="sm:col-span-2 lg:col-span-3">
                <aside className="rounded-2xl border border-crimson-500/30 bg-crimson-500/[0.04] p-6 sm:p-7">
                  <p className="kicker text-crimson-600">
                    <span className="h-px w-9 bg-crimson-500" />
                    <History className="size-4" aria-hidden="true" />
                    The 2019 roots
                  </p>
                  <p className="mt-4 max-w-4xl text-sm leading-relaxed text-ink-800/75 sm:text-[0.95rem]">
                    When the school was launched as a GDE School of Specialisation
                    in 2019, the release described six focus areas — Dance, Art
                    &amp; Design, Music, Drama, Hospitality and Enterprise
                    Management — and noted after-hours tuition in Dance, Art,
                    Music and Drama. Today&apos;s public identity is the
                    five-discipline baseline above. How Hospitality and
                    Enterprise Management feature in the programme going forward
                    is a question for the school to confirm.
                  </p>
                </aside>
              </Reveal>
            </div>

            {/* Honesty footnote */}
            <Reveal delay={0.1}>
              <p className="mt-10 max-w-3xl border-l-2 border-crimson-500 pl-4 text-xs leading-relaxed text-ink-800/60">
                This page presents the school&apos;s public baseline. Approved
                subject lists, grade availability and staff leads are pending
                from the school — nothing here should be read as an official
                subject timetable or teacher allocation.
              </p>
            </Reveal>
          </div>
        </PageBand>

        {/* ── 4. Where the training leads ──────────────────────────────── */}
        <PageBand
          tone="paper-deep"
          className="py-24 sm:py-28"
          ariaLabel="Where the training leads"
        >
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <SectionHeading
              dark
              kicker="From studio to career"
              title="Where the training leads."
              accentWords={["leads"]}
              description="Every discipline keeps more than one door open. These are the post-school pathways each studio trains towards — read them next to a learner, and the daily practice starts to make sense."
            />

            {/* Five-row editorial pathways list */}
            <div className="mt-14 divide-y divide-ink-950/10 border-y border-ink-950/10">
              {disciplines.map((d, i) => (
                <Reveal key={d.title} delay={i * 0.06}>
                  <div className="group grid gap-4 py-7 transition-colors duration-500 hover:bg-paper/60 lg:grid-cols-12 lg:items-center lg:gap-8 lg:px-4">
                    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 lg:col-span-4">
                      <span className="font-mono text-xs tracking-[0.3em] text-gold-600">
                        {d.index}
                      </span>
                      <h3 className="font-display text-2xl font-medium text-ink-950">
                        {d.title}
                      </h3>
                      <span className="hidden text-[0.62rem] font-bold uppercase tracking-[0.22em] text-ink-800/40 xl:inline">
                        {d.tagline}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 lg:col-span-8 lg:justify-end">
                      {d.pathways.map((p) => (
                        <span
                          key={p}
                          className="inline-flex items-center gap-1.5 rounded-full border border-ink-950/15 bg-paper px-4 py-2 text-[0.78rem] text-ink-800/80 transition-all duration-300 hover:border-gold-600/60 hover:text-ink-950 hover:shadow-card"
                        >
                          {p}
                          <ArrowUpRight
                            className="size-3.5 text-ink-800/35 transition-colors duration-300 group-hover:text-gold-600"
                            aria-hidden="true"
                          />
                        </span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Proof strip — publicly reported, not claimed */}
            <Reveal delay={0.1}>
              <p className="kicker mt-16 text-gold-600">
                <span className="h-px w-9 bg-gold-600" />
                Reported in public sources
              </p>
            </Reveal>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {proof.map((p, i) => (
                <Reveal key={p.label} delay={0.08 * i} className="h-full">
                  <article className="h-full rounded-2xl border border-ink-950/10 bg-paper p-5 shadow-card transition-all duration-500 hover:-translate-y-0.5 hover:shadow-lift">
                    <div className="flex items-center justify-between">
                      <p.icon
                        className="size-5 text-gold-600"
                        strokeWidth={1.8}
                        aria-hidden="true"
                      />
                      <span className="font-mono text-[0.65rem] tracking-[0.25em] text-ink-800/40">
                        {p.year.toUpperCase()}
                      </span>
                    </div>
                    <h3 className="mt-3 text-[0.72rem] font-bold uppercase tracking-[0.18em] text-crimson-600">
                      {p.label}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-ink-800/65">
                      {p.text}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.15}>
              <p className="mt-6 max-w-3xl text-[0.7rem] leading-relaxed text-ink-800/50">
                Each point above is drawn from public reporting — the school
                itself still supplies the official confirmations. Read them as
                signals of trajectory, not as promises.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <Link
                href="/admissions"
                className="mt-12 inline-flex items-center gap-3 rounded-full bg-gold-500 px-7 py-4 text-[0.72rem] font-bold uppercase tracking-[0.2em] text-ink-950 shadow-[0_10px_30px_-10px_var(--color-gold-500)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-300 hover:shadow-glow"
              >
                See how admission works
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Reveal>
          </div>
        </PageBand>

        {/* ── 5. Continue band ─────────────────────────────────────────── */}
        <PageBand
          tone="ink"
          className="py-24 sm:py-28"
          ariaLabel="Keep exploring the site"
        >
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <SectionHeading
              kicker="Keep turning the pages"
              title="The next page is yours."
              accentWords={["yours"]}
              description="Read how the audition works, or see the work for yourself — both pages are one step from here."
            />
            <div className="mt-12 grid gap-5 sm:grid-cols-2">
              {CONTINUE_LINKS.map((path, i) => {
                const page = pageByPath(path);
                if (!page) return null;
                return (
                  <Reveal key={path} delay={0.1 * i} className="h-full">
                    <Link
                      href={page.path}
                      className="group flex h-full items-center justify-between gap-6 rounded-2xl border border-paper/10 bg-ink-900/60 p-6 shadow-card transition-all duration-500 hover:-translate-y-0.5 hover:border-gold-400/50 hover:shadow-lift sm:p-7"
                    >
                      <span className="min-w-0">
                        <span className="block text-[0.62rem] font-bold uppercase tracking-[0.26em] text-gold-500/80">
                          {page.short}
                        </span>
                        <span className="mt-2 block font-display text-2xl font-medium text-paper transition-colors duration-300 group-hover:text-gold-300">
                          {page.label}
                        </span>
                        <span className="mt-2 block text-sm leading-relaxed text-paper/55">
                          {page.description}
                        </span>
                      </span>
                      <span
                        aria-hidden="true"
                        className="grid size-12 shrink-0 place-items-center rounded-full border border-paper/20 transition-all duration-500 group-hover:border-gold-400 group-hover:bg-gold-500/15"
                      >
                        <ArrowRight className="size-5 text-paper/70 transition-all duration-300 group-hover:translate-x-1 group-hover:text-gold-300" />
                      </span>
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </PageBand>
      </main>
    </div>
  );
}
