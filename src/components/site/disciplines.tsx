"use client";
import { ENQUIRE_DISCIPLINE_EVENT, OPEN_DISCIPLINE_EVENT } from "@/lib/interaction-events";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  ArrowUpRight,
  ArrowRight,
  Building2,
  Footprints,
  Link2,
  Mic2,
  Music2,
  Palette,
  PenTool,
  X,
} from "lucide-react";
import { SectionHeading } from "@/components/site/proof-bar";
import { Stagger, StaggerItem, Reveal } from "@/components/motion/reveal";
import { TiltCard } from "@/components/motion/tilt-card";
import { SpotlightCard } from "@/components/site/spotlight-card";
import { DisciplineFinder } from "@/components/site/discipline-finder";
import { ViewfinderCorners } from "@/components/site/viewfinder-corners";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { copyText, slugForTitle } from "@/lib/share";
import { cn } from "@/lib/utils";

type Discipline = {
  index: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  alt: string;
  /** Official crest component illustration (brand board) — enamel-badge crop. */
  medallion: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  studio: string[];
  pathways: string[];
  audition: string;
};

const disciplines: Discipline[] = [
  {
    index: "01",
    title: "Visual Arts",
    tagline: "Paint, draw, sculpt, exhibit",
    description:
      "From first pencil sketch to public exhibition — learners build portfolios that speak louder than marks.",
    image: "/images/disc-visual-arts.webp",
    alt: "A young artist painting on a large canvas in a golden-lit studio",
    medallion: "/images/brand/ill-visual-arts.webp",
    icon: Palette,
    studio: [
      "Drawing and painting fundamentals, year after year, until the hand obeys the eye",
      "Sculptural, printmaking and applied-art projects across the grades",
      "Portfolio building treated as seriously as any exam subject",
      "Learner work exhibited on campus and at community venues like the ERSA Festival",
    ],
    pathways: [
      "Fine art & illustration",
      "Art teaching & facilitation",
      "Gallery & curation work",
      "Creative entrepreneurship",
    ],
    audition:
      "A short practical drawing assessment and a look at anything you have made that you are proud of. Bring the work — polish is not the point, appetite is.",
  },
  {
    index: "02",
    title: "Design",
    tagline: "Sketch, prototype, solve",
    description:
      "Creative problem-solving across fashion, product and visual communication — craft turned into value.",
    image: "/images/disc-design.webp",
    alt: "A design student sketching ideas under a warm desk lamp",
    medallion: "/images/brand/ill-design.webp",
    icon: PenTool,
    studio: [
      "Sketch-to-prototype briefs that mirror real client problems",
      "Visual communication, fashion-oriented and product-oriented projects",
      "Presentation and pitching skills — defending an idea in front of a room",
      "Enterprise skills through school-run business and entrepreneurship workshops",
    ],
    pathways: [
      "Fashion & textile design",
      "Product & industrial design",
      "Branding, marketing & media",
      "Starting your own label or studio",
    ],
    audition:
      "A short, brief-based creative exercise and a conversation about how you think — we are watching for ideas, not expensive tools.",
  },
  {
    index: "03",
    title: "Dramatic Arts",
    tagline: "Speak, move, transform",
    description:
      "Theatre, performance and stagecraft that grow voice, presence and the confidence to hold a room.",
    image: "/images/disc-drama.webp",
    alt: "A drama student performing under a warm stage spotlight",
    medallion: "/images/brand/ill-drama.webp",
    icon: Mic2,
    studio: [
      "Voice, movement and character work in every timetable week",
      "Stagecraft behind the curtain too — production, staging and crew roles",
      "Performance nights on campus and at the Rhoo Hlatshwayo Arts Centre",
      "Poetry and spoken-word work featured in community showcases",
    ],
    pathways: [
      "Stage & screen performance",
      "Directing & production",
      "Speech & drama teaching",
      "Media, PR & communications",
    ],
    audition:
      "A short prepared piece — a poem, monologue or story — plus improvised exercises in a small group. Nerves are welcome; they are proof you care.",
  },
  {
    index: "04",
    title: "Dance Studies",
    tagline: "Train, sweat, soar",
    description:
      "Technique, choreography and live performance — discipline you can see in every controlled movement.",
    image: "/images/disc-dance.webp",
    alt: "Dancers rehearsing contemporary choreography in warm window light",
    medallion: "/images/brand/ill-dance.webp",
    icon: Footprints,
    studio: [
      "Technique class as daily ritual — the boring repetition behind the spotlight",
      "Choreography and composition, not only execution",
      "Performance fitness, conditioning and safe practice",
      "Stages that scale from school halls to national platforms like the Y20 Opening",
    ],
    pathways: [
      "Professional company work",
      "Choreography & creative direction",
      "Dance teaching & coaching",
      "Performance fitness careers",
    ],
    audition:
      "A movement class and a short solo (or your best attempt at one). No years of studio experience required — discipline and rhythm are the entry fee.",
  },
  {
    index: "05",
    title: "Music",
    tagline: "Play, sing, amplify",
    description:
      "Instrumental, vocal and ensemble training with real audiences — from classroom to festival stage.",
    image: "/images/disc-music.webp",
    alt: "A young musician playing saxophone in golden rim light",
    medallion: "/images/brand/ill-music.webp",
    icon: Music2,
    studio: [
      "Instrumental and vocal tuition inside the school day",
      "Ensemble and band training — the choir and youth bands that carry ERSA's name",
      "Theory, ear training and performance practice",
      "After-hours tuition in music, dance, art and drama — a tradition since the 2019 launch",
    ],
    pathways: [
      "Professional musicianship",
      "Sound, production & engineering",
      "Music teaching & choir direction",
      "Session, worship & industry work",
    ],
    audition:
      "Play or sing a short piece — any instrument, any level — and a short aptitude conversation. Potential is trained here; it is not required on day one.",
  },
];

const CONFIRM_NOTE =
  "Subject availability, grades and audition requirements are confirmed annually by the school. Contact the office for the current season's requirements.";

export function Disciplines({
  /** Route shown as the section's "open the page" link (homepage only). */
  pageHref,
  pageLabel = "Open the full page",
}: {
  pageHref?: string;
  pageLabel?: string;
}) {
  const [active, setActive] = useState<Discipline | null>(null);

  // ⌘K palette items can open a studio directly.
  useEffect(() => {
    function onOpen(e: Event) {
      const title = (e as CustomEvent<{ discipline?: string }>).detail?.discipline;
      const found = disciplines.find((d) => d.title === title);
      if (found) setActive(found);
    }
    window.addEventListener(OPEN_DISCIPLINE_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_DISCIPLINE_EVENT, onOpen);
  }, []);

  const copyLink = async () => {
    if (!active) return;
    const slug = slugForTitle(active.title);
    if (!slug) return;
    const url = `${window.location.origin}/#enquire-${slug}`;
    const ok = await copyText(url);
    toast(
      ok
        ? {
            title: "Link copied",
            description: `Paste it anywhere — it opens the ${active.title} enquiry, pre-selected.`,
          }
        : { variant: "destructive", title: "Could not copy", description: url }
    );
  };

  const nextStudio = () => {
    if (!active) return;
    const i = disciplines.findIndex((d) => d.title === active.title);
    setActive(disciplines[(i + 1) % disciplines.length]);
  };

  const goAdmissions = (discipline?: string) => {
    const title = discipline ?? active?.title;
    setActive(null);
    window.setTimeout(() => {
      if (title) {
        window.dispatchEvent(
          new CustomEvent(ENQUIRE_DISCIPLINE_EVENT, { detail: { discipline: title } })
        );
      }
      document.getElementById("admissions")?.scrollIntoView({ behavior: "smooth" });
    }, 120);
  };

  return (
    <section
      id="disciplines"
      aria-label="The five disciplines"
      className="relative overflow-hidden bg-ink-950 grain"
    >
      {/* Giant background word */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap font-display text-[22vw] font-bold leading-none text-outline opacity-[0.07] select-none"
      >
        DISCIPLINES
      </div>

      <div className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-10 lg:py-32">
        <div className="grid gap-14 lg:grid-cols-12">
          {/* Left sticky intro */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <SectionHeading
                kicker="Five stages, one school"
                title="Choose your instrument of expression."
                accentWords={["expression."]}
                description="Every learner auditions into a specialist discipline and trains in it for their whole school journey — inside the full South African public curriculum."
                pageHref={pageHref}
                pageLabel={pageLabel}
              />
              <Reveal delay={0.25}>
                <div className="mt-8 space-y-3 border-t border-paper/10 pt-8">
                  {[
                    "Audition-based entry in your chosen art form",
                    "Academic subjects taught alongside specialist training",
                    "Public showcases, festivals and exhibitions each year",
                  ].map((line) => (
                    <p key={line} className="flex items-start gap-3 text-sm text-paper/60">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-gold-500" />
                      {line}
                    </p>
                  ))}
                </div>
              </Reveal>
              <Reveal delay={0.35}>
                <DisciplineFinder
                  onExplore={(title) =>
                    setActive(disciplines.find((d) => d.title === title) ?? null)
                  }
                />
              </Reveal>
            </div>
          </div>

          {/* Cards */}
          <Stagger className="lg:col-span-8" stagger={0.14}>
            <div className="grid gap-5 sm:grid-cols-2">
              {disciplines.map((d, i) => (
                <StaggerItem
                  key={d.title}
                  className={cn(
                    i === 0 && "sm:col-span-2",
                    i === 4 && "sm:col-span-2"
                  )}
                >
                  <TiltCard className="h-full">
                    <SpotlightCard className="h-full rounded-2xl">
                      <button
                        type="button"
                        onClick={() => setActive(d)}
                        aria-label={`${d.title} — ${d.tagline}. Open details.`}
                        aria-haspopup="dialog"
                        className="group sheen-top relative block h-full w-full cursor-pointer overflow-hidden rounded-2xl border border-paper/10 bg-ink-900 text-left shadow-card transition-all duration-500 hover:-translate-y-1 hover:border-gold-500/50 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400/70"
                      >
                      <div
                        className={cn(
                          "relative overflow-hidden",
                          i === 0 || i === 4 ? "aspect-[16/8] sm:aspect-[21/9]" : "aspect-[4/4.6]"
                        )}
                      >
                        <Image
                          src={d.image}
                          alt={d.alt}
                          fill
                          sizes="(max-width: 640px) 100vw, 50vw"
                          className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.07]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/25 to-transparent" />
                        <ViewfinderCorners />
                        <span className="absolute left-5 top-5 font-mono text-xs tracking-widest text-gold-300/90">
                          {d.index}
                        </span>
                        <span className="absolute right-5 top-5 grid size-10 place-items-center rounded-full border border-paper/20 bg-ink-950/40 backdrop-blur-sm transition-all duration-500 group-hover:rotate-45 group-hover:border-gold-400 group-hover:bg-gold-500/20">
                          <ArrowUpRight className="size-4 text-paper transition-colors group-hover:text-gold-300" />
                        </span>
                      </div>
                      <div className="relative -mt-14 p-6">
                        {/* Crest-board medallion — the discipline's component illustration */}
                        <span
                          aria-hidden="true"
                          className="absolute right-6 top-0 block size-14 -translate-y-1/2 rotate-3 overflow-hidden rounded-full shadow-lift ring-2 ring-gold-500/70 transition-all duration-500 group-hover:rotate-[8deg] group-hover:scale-110 sm:size-16"
                        >
                          <Image
                            src={d.medallion}
                            alt=""
                            fill
                            sizes="64px"
                            className="object-cover"
                          />
                        </span>
                        <h3 className="font-display text-2xl font-medium text-paper transition-colors duration-300 group-hover:text-gold-300">
                          {d.title}
                        </h3>
                        <p className="mt-1 text-[0.65rem] font-bold uppercase tracking-[0.24em] text-gold-500/80">
                          {d.tagline}
                        </p>
                        <p className="mt-3 max-w-md text-sm leading-relaxed text-paper/55 opacity-90 transition-opacity duration-500 group-hover:opacity-100">
                          {d.description}
                        </p>
                        <span className="mt-5 block h-px w-full bg-paper/10">
                          <span className="block h-px w-0 bg-gold-400 transition-all duration-700 ease-out group-hover:w-full" />
                        </span>
                        <span className="mt-4 inline-flex items-center gap-2 text-[0.62rem] font-bold uppercase tracking-[0.22em] text-paper/40 transition-colors duration-300 group-hover:text-gold-300">
                          Explore the discipline
                          <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                        </span>
                      </div>
                      </button>
                    </SpotlightCard>
                  </TiltCard>
                </StaggerItem>
              ))}
            </div>
          </Stagger>
        </div>

        {/* The 2019 charter — six GDE focus areas: the arts AND the business of them */}
        <Reveal delay={0.1}>
          <div className="mt-16 overflow-hidden rounded-3xl border border-paper/12 bg-ink-900/60 shadow-card">
            <div className="ribbon-band h-1.5" aria-hidden="true" />
            <div className="grid gap-8 p-8 sm:p-10 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-5">
                <p className="kicker text-crimson-300">
                  <span className="h-px w-9 bg-crimson-400" />
                  The 2019 charter
                </p>
                <h3 className="mt-4 font-display text-display-sm font-medium leading-tight text-balance text-paper">
                  Six focus areas — the arts, and{" "}
                  <em className="font-display-wonk font-light italic text-crimson-300">
                    the business of them.
                  </em>
                </h3>
              </div>
              <div className="lg:col-span-7">
                <p className="max-w-2xl text-sm leading-relaxed text-paper/60">
                  The GDE&apos;s relaunch paired the five arts disciplines with two
                  further focus areas — Hospitality and Enterprise Management — the
                  &ldquo;arts and business&rdquo; combination meant to ready learners
                  for the corporate world as well as the stage.
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {["Dance", "Art and Design", "Music", "Drama"].map((a) => (
                    <span
                      key={a}
                      className="inline-flex items-center gap-2 rounded-full border border-gold-500/35 bg-gold-500/[0.07] px-4 py-2 text-xs font-semibold text-gold-200 transition-colors duration-300 hover:border-gold-400 hover:text-gold-100"
                    >
                      <span className="size-1.5 rounded-full bg-gold-400" />
                      {a}
                    </span>
                  ))}
                  {["Hospitality", "Enterprise Management"].map((b) => (
                    <span
                      key={b}
                      className="inline-flex items-center gap-2 rounded-full border border-crimson-500/45 bg-crimson-500/[0.09] px-4 py-2 text-xs font-semibold text-crimson-200 transition-colors duration-300 hover:border-crimson-300 hover:text-crimson-100"
                    >
                      <span className="size-1.5 rounded-full bg-crimson-400" />
                      {b}
                    </span>
                  ))}
                </div>
                <p className="mt-5 font-mono text-[0.58rem] uppercase tracking-[0.16em] text-paper/35">
                  Source: GDE 2019 School of Specialisation launch announcement
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Deep-dive dialog */}
      <Dialog open={!!active} onOpenChange={(open) => !open && setActive(null)}>
        {active && (
          <DialogContent
            showCloseButton={false}
            className={cn(
              "top-[50%] grid max-h-[88dvh] grid-rows-[auto_minmax(0,1fr)] gap-0 overflow-hidden rounded-3xl border-paper/15 bg-ink-900 p-0 shadow-lift sm:max-w-2xl"
            )}
          >
            <div aria-hidden="true" className="grain pointer-events-none absolute inset-0 z-20 opacity-60" />
            {/* Header image */}
            <div className="relative aspect-[16/7] w-full shrink-0 overflow-hidden">
              <Image
                src={active.image}
                alt={active.alt}
                fill
                sizes="(max-width: 640px) 100vw, 672px"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/35 to-transparent" />
              <button
                type="button"
                onClick={() => setActive(null)}
                aria-label="Close discipline details"
                className="absolute right-4 top-4 z-30 grid size-9 place-items-center rounded-full border border-paper/20 bg-ink-950/60 text-paper/80 backdrop-blur-sm transition-all duration-300 hover:rotate-90 hover:border-gold-400 hover:text-gold-300"
              >
                <X className="size-4" />
              </button>
              <div className="absolute bottom-4 left-6 right-6 z-10">
                <span
                  aria-hidden="true"
                  className="absolute -top-2 right-0 block size-12 rotate-3 overflow-hidden rounded-full shadow-lift ring-2 ring-gold-500/70 sm:size-14"
                >
                  <Image
                    src={active.medallion}
                    alt=""
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </span>
                <p className="font-mono text-[0.6rem] tracking-[0.3em] text-gold-300">
                  DISCIPLINE {active.index}
                </p>
                <DialogTitle className="mt-1 font-display text-3xl font-medium text-paper">
                  {active.title}
                </DialogTitle>
                <DialogDescription className="sr-only">
                  {`Deep dive into the ${active.title} discipline at ERSA.`}
                </DialogDescription>
                <p className="mt-0.5 text-[0.62rem] font-bold uppercase tracking-[0.26em] text-gold-500/85">
                  {active.tagline}
                </p>
              </div>
            </div>

            {/* Scrollable body */}
            <div key={active.title} className="scroll-gold min-h-0 flex-1 overflow-y-auto px-6 pb-6 pt-5">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <p className="kicker text-gold-400 !text-[0.6rem]">
                    <span className="h-px w-6 bg-gold-400" />
                    Inside the studio
                  </p>
                  <ul className="mt-3 space-y-2.5">
                    {active.studio.map((line) => (
                      <li key={line} className="flex items-start gap-2.5 text-[0.82rem] leading-relaxed text-paper/65">
                        <span className="mt-[0.45rem] size-1 shrink-0 rounded-full bg-gold-500" />
                        {line}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="kicker text-gold-400 !text-[0.6rem]">
                    <span className="h-px w-6 bg-gold-400" />
                    Where it leads
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {active.pathways.map((p) => (
                      <span
                        key={p}
                        className="rounded-full border border-paper/15 bg-paper/[0.04] px-3.5 py-1.5 text-[0.72rem] text-paper/70 transition-colors duration-300 hover:border-gold-500/50 hover:text-gold-200"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Audition note */}
              <div className="mt-6 rounded-2xl border border-gold-500/25 bg-gold-500/[0.05] p-5">
                <p className="flex items-center gap-2 text-[0.62rem] font-bold uppercase tracking-[0.22em] text-gold-300">
                  <active.icon className="size-4" strokeWidth={1.9} />
                  The audition, honestly
                </p>
                <p className="mt-2.5 text-sm leading-relaxed text-paper/70">{active.audition}</p>
              </div>

              <p className="mt-4 text-[0.68rem] leading-relaxed text-paper/35">{CONFIRM_NOTE}</p>

              <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-paper/10 pt-5">
                <button
                  type="button"
                  onClick={() => goAdmissions(active.title)}
                  className="inline-flex items-center gap-2 rounded-full bg-gold-400 px-6 py-3 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-ink-950 transition-all duration-300 hover:bg-gold-300 hover:shadow-[0_10px_30px_-10px_rgba(212,175,55,0.5)]"
                >
                  Start your audition journey
                  <ArrowRight className="size-4" />
                </button>
                <button
                  type="button"
                  onClick={copyLink}
                  aria-label={`Copy a shareable link to the ${active.title} enquiry form`}
                  className="inline-flex items-center gap-2 rounded-full border border-paper/25 px-4 py-3 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-paper/70 transition-colors duration-300 hover:border-gold-400 hover:text-gold-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400/70"
                >
                  <Link2 className="size-3.5" />
                  Copy link
                </button>
                <span className="inline-flex items-center gap-2 text-[0.68rem] text-paper/40">
                  <Building2 className="size-3.5" />
                  1 Jones Street, Daveyton, Benoni
                </span>
              </div>

              {/* Studio pager — walk all five without leaving the dossier. */}
              <div className="mt-4 flex items-center justify-between gap-3 border-t border-paper/10 pb-1 pt-4">
                <p className="font-mono text-[0.6rem] tracking-[0.28em] text-paper/35">
                  STUDIO {active.index} / 05
                </p>
                <button
                  type="button"
                  onClick={nextStudio}
                  className="group/next inline-flex items-center gap-2 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-paper/50 transition-colors duration-300 hover:text-gold-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400/70"
                >
                  Next studio
                  <span className="font-display text-sm normal-case tracking-normal text-gold-300/90">
                    {disciplines[(disciplines.findIndex((d) => d.title === active.title) + 1) % disciplines.length].title}
                  </span>
                  <ArrowRight className="size-3.5 transition-transform duration-300 group-hover/next:translate-x-1" />
                </button>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </section>
  );
}
