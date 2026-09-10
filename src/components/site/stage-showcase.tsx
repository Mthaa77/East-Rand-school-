"use client";
import { OPEN_DISCIPLINE_EVENT } from "@/lib/interaction-events";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
  useMotionValueEvent,
  type MotionValue,
} from "framer-motion";
import { ArrowUpRight, ChevronDown, Clapperboard } from "lucide-react";
import { RevealHeading } from "@/components/site/reveal-heading";

/* ────────────────────────────────────────────────────────────────────────────
   THE PROGRAMME — "Five acts. One school."
   A scroll-pinned cinematic sequence: the stage re-lights for each of the
   five specialist disciplines as the visitor scrolls. Copy is written in the
   school's own voice; every fact points at a public source.
   ──────────────────────────────────────────────────────────────────────────── */

type ActChip = { k: string; v: string };

type Act = {
  numeral: string;
  title: string;
  voice: string;
  note: string;
  image: string;
  alt: string;
  /** Stage-light wash — a radial gradient string, in-palette per act. */
  wash: string;
  accent: "gold" | "crimson";
  chips: ActChip[];
  source: string;
};

const acts: Act[] = [
  {
    numeral: "I",
    title: "Visual Arts",
    voice: "The hand learns to obey the eye.",
    note: "Pencil first — then paint, print and sculpture, year after year. The portfolio is treated like any exam subject: built, moderated, and finally hung where Daveyton can come and see it.",
    image: "/images/disc-visual-arts.webp",
    alt: "A young artist painting on a large canvas in a golden-lit studio",
    wash: "radial-gradient(70% 60% at 28% 22%, oklch(0.76 0.14 76 / 0.17), transparent 62%)",
    accent: "gold",
    chips: [
      { k: "The audition", v: "Bring anything you have made — appetite over polish." },
      { k: "On the calendar", v: "ERSA Festival exhibitions" },
      { k: "After matric", v: "Fine art · Teaching · Galleries & curation" },
    ],
    source: "ERSA Festival briefs · 2024–2025",
  },
  {
    numeral: "II",
    title: "Design",
    voice: "Ideas, made useful.",
    note: "Briefs, prototypes, pitches — design is creative problem-solving with a client's clock ticking. Learners present and defend their thinking, then carry the same discipline into enterprise workshops that treat an idea like a small business.",
    image: "/images/disc-design.webp",
    alt: "A design student sketching ideas under a warm desk lamp",
    wash: "radial-gradient(66% 58% at 70% 24%, oklch(0.83 0.1 86 / 0.15), transparent 62%)",
    accent: "gold",
    chips: [
      { k: "The audition", v: "A short, brief-based exercise — ideas, not expensive tools." },
      { k: "On the calendar", v: "Enterprise & pitching workshops" },
      { k: "After matric", v: "Fashion · Product · Brand & media" },
    ],
    source: "GDE launch release · 27 Aug 2019",
  },
  {
    numeral: "III",
    title: "Dramatic Arts",
    voice: "Find the voice. Fill the room.",
    note: "Voice work in the morning, crew work at night — every learner learns what the spotlight hides as well as what it shows. The year ends on real stages, from the school hall to the Rhoo Hlatshwayo Arts Centre in Daveyton.",
    image: "/images/disc-drama.webp",
    alt: "A drama student performing under a warm stage spotlight",
    wash: "radial-gradient(68% 58% at 26% 28%, oklch(0.55 0.18 30 / 0.19), transparent 62%)",
    accent: "crimson",
    chips: [
      { k: "The audition", v: "A prepared poem or monologue — nerves welcome." },
      { k: "On the calendar", v: "Rhoo Hlatshwayo Arts Centre · Daveyton" },
      { k: "After matric", v: "Stage & screen · Directing · Media" },
    ],
    source: "ERSA Festival 2024 listings",
  },
  {
    numeral: "IV",
    title: "Dance Studies",
    voice: "Technique is the freedom.",
    note: "Technique class is the daily ritual — the unglamorous repetition that makes the freedom possible. It has already carried ERSA dancers onto national platforms, including the Y20 South Africa opening in 2025.",
    image: "/images/disc-dance.webp",
    alt: "Dancers rehearsing contemporary choreography in warm window light",
    wash: "radial-gradient(66% 58% at 62% 20%, oklch(0.72 0.15 70 / 0.16), transparent 62%)",
    accent: "gold",
    chips: [
      { k: "The audition", v: "A movement class and your best attempt at a solo." },
      { k: "On the calendar", v: "Y20 SA Opening · GDE posts, Aug 2025" },
      { k: "After matric", v: "Companies · Choreography · Teaching" },
    ],
    source: "GDE public posts · 18 Aug 2025",
  },
  {
    numeral: "V",
    title: "Music",
    voice: "Play until the hall answers.",
    note: "Theory in one room, ensemble in the next — the choir and youth bands carry the school's name wherever they play. From the ERSA Festival stage to youth-jazz programmes in the Joy of Jazz network, the training is done in public.",
    image: "/images/disc-music.webp",
    alt: "A young musician playing saxophone in golden rim light",
    wash: "radial-gradient(66% 58% at 46% 24%, oklch(0.55 0.18 30 / 0.17), transparent 62%)",
    accent: "crimson",
    chips: [
      { k: "The audition", v: "Play or sing anything — potential is trained here." },
      { k: "On the calendar", v: "Joy of Jazz youth programmes · 2025–2026" },
      { k: "After matric", v: "Performance · Production · Teaching" },
    ],
    source: "TUT pathway MOU · 2024",
  },
];

/** Scroll timeline: an intro window, then one equal window per act. */
const INTRO_END = 0.1;
const WINDOW = (1 - INTRO_END) / acts.length;

function actWindow(i: number) {
  const start = INTRO_END + i * WINDOW;
  return {
    start,
    enter: start + 0.05,
    exitStart: start + WINDOW - 0.05,
    end: Math.min(start + WINDOW, 1),
  };
}

/** One cinematic act — photo layer, stage-light wash and content block. */
function ActLayer({
  act,
  index,
  progress,
}: {
  act: Act;
  index: number;
  progress: MotionValue<number>;
}) {
  const { start, enter, exitStart, end } = actWindow(index);
  const isLast = index === acts.length - 1;

  // The last act holds the stage until the section scrolls away.
  const opacity = useTransform(
    progress,
    isLast ? [start, enter, 0.999, 1] : [start, enter, exitStart, end],
    isLast ? [0, 1, 1, 1] : [0, 1, 1, 0]
  );
  // Slow Ken Burns settle — continuous, never bouncy.
  const scale = useTransform(progress, [start, end], [1.16, 1.03]);
  const contentY = useTransform(progress, [start, enter], [64, 0]);
  const ghostY = useTransform(progress, [start, end], [40, -40]);

  // Visibility + pointer plumbing keeps hidden acts out of the tab order.
  const visibility = useTransform(opacity, (v) => (v > 0.04 ? "visible" : "hidden"));
  const pointerEvents = useTransform(opacity, (v) => (v > 0.04 ? "auto" : "none"));

  return (
    <>
      {/* Photo + wash layer */}
      <motion.div style={{ opacity }} className="absolute inset-0" aria-hidden="true">
        <motion.div style={{ scale }} className="absolute inset-0 will-change-transform">
          <Image
            src={act.image}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
        <div style={{ background: act.wash }} className="absolute inset-0" />
      </motion.div>

      {/* Content block */}
      <motion.div
        style={{ opacity, visibility, pointerEvents, y: contentY }}
        className="absolute inset-0 z-20 flex items-end"
      >
        <div className="relative mx-auto w-full max-w-7xl px-5 pb-24 sm:px-8 sm:pb-28 lg:px-10 lg:pb-32">
          <div className="max-w-2xl">
            {/* Ghost numeral — huge, wonky, engraved light */}
            <motion.span
              aria-hidden="true"
              style={{ y: ghostY }}
              className="font-display font-display-wonk pointer-events-none absolute right-0 top-0 hidden select-none text-display-3xl italic leading-none [-webkit-text-stroke:1.5px_oklch(0.82_0.125_82/0.55)] text-gold-200/10 sm:block"
            >
              {act.numeral}
            </motion.span>

            <p
              className={`kicker ${act.accent === "gold" ? "text-gold-400" : "text-crimson-400"}`}
            >
              <span className="h-px w-9 bg-current" />
              Act {act.numeral} · of V
            </p>

            <h3 className="mt-4 font-display text-display-md font-medium text-balance text-paper sm:text-display-lg">
              {act.title}
            </h3>

            <p
              className={`font-display font-display-wonk mt-2 text-display-sm italic ${
                act.accent === "gold" ? "text-gold-300" : "text-crimson-400"
              }`}
            >
              {act.voice}
            </p>

            <p className="font-editorial mt-5 max-w-xl text-[0.98rem] leading-[1.75] text-paper/75 sm:text-editorial">
              {act.note}
            </p>

            {/* Fact chips — audition / calendar / pathway */}
            <div className="mt-6 flex flex-wrap gap-2.5">
              {act.chips.map((chip) => (
                <span
                  key={chip.k}
                  className="flex max-w-[280px] flex-col gap-1 rounded-xl border border-paper/15 bg-ink-950/55 px-4 py-2.5 backdrop-blur-md"
                >
                  <span className="font-mono text-[0.55rem] uppercase tracking-[0.2em] text-gold-400/90">
                    {chip.k}
                  </span>
                  <span className="text-[0.78rem] leading-snug text-paper/80">{chip.v}</span>
                </span>
              ))}
            </div>

            {/* Actions + source */}
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() =>
                  window.dispatchEvent(
                    new CustomEvent(OPEN_DISCIPLINE_EVENT, {
                      detail: { discipline: act.title },
                    })
                  )
                }
                className="group inline-flex items-center gap-2.5 rounded-full bg-gold-500 px-6 py-3 text-[0.66rem] font-bold uppercase tracking-[0.2em] text-ink-950 shadow-[0_10px_30px_-10px_var(--color-gold-500)] transition-all duration-300 hover:bg-gold-300 hover:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400/70"
              >
                <Clapperboard className="size-3.5" />
                Open the studio dossier
                <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </button>
              <Link
                href="/programmes"
                className="inline-flex items-center gap-2 rounded-full border border-paper/25 bg-ink-950/40 px-5 py-3 text-[0.66rem] font-bold uppercase tracking-[0.2em] text-paper/85 backdrop-blur-sm transition-colors duration-300 hover:border-gold-400 hover:text-gold-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400/70"
              >
                Programmes page
              </Link>
              <span className="font-mono text-[0.56rem] uppercase tracking-[0.16em] text-paper/35">
                Source · {act.source}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}

export function StageShowcase() {
  const reduce = useReducedMotion();
  const wrapRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(-1);

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end end"],
  });
  const curtain = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.001,
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx =
      v < INTRO_END - 0.02
        ? -1
        : Math.min(acts.length - 1, Math.floor((v - INTRO_END) / WINDOW));
    setActive((prev) => (prev === idx ? prev : idx));
  });

  const jumpTo = (i: number) => {
    const el = wrapRef.current;
    if (!el) return;
    const vh = window.innerHeight;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const scrollable = el.offsetHeight - vh;
    const w = actWindow(i);
    window.scrollTo({
      top: top + (w.start + WINDOW * 0.55) * scrollable,
      behavior: reduce ? "auto" : "smooth",
    });
  };

  /* Reduced motion — a calm, stacked programme instead of the pinned stage. */
  if (reduce) {
    return (
      <section
        id="programme"
        aria-label="The programme — five acts, one school"
        className="grain relative bg-ink-950"
      >
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-10">
          <header className="max-w-3xl">
            <p className="kicker text-gold-400">
              <span className="h-px w-9 bg-gold-400" />
              The programme
            </p>
            <RevealHeading
              as="h2"
              className="heading-craft heading-depth mt-5 font-display text-display-lg font-medium text-balance text-paper"
            >
              Five acts. <em className="font-display-wonk font-light italic text-gilded text-gilded-sheen">One school.</em>
            </RevealHeading>
            <p className="font-editorial drop-cap mt-6 text-editorial text-paper/70">
              Each act is one of the five specialist disciplines — a full subject on the
              national curriculum, trained in the timetable and performed in public.
            </p>
          </header>
          <ol className="mt-14 space-y-10">
            {acts.map((act) => (
              <li
                key={act.numeral}
                className="overflow-hidden rounded-3xl border border-paper/10 bg-ink-900 shadow-card"
              >
                <div className="relative aspect-[16/8]">
                  <Image src={act.image} alt={act.alt} fill sizes="100vw" className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-transparent to-transparent" />
                </div>
                <div className="p-6 sm:p-8">
                  <p className="kicker text-gold-400">
                    <span className="h-px w-9 bg-gold-400" />
                    Act {act.numeral} · of V
                  </p>
                  <h3 className="mt-3 font-display text-display-sm font-medium text-paper">
                    {act.title}{" "}
                    <em className="font-display-wonk font-light italic text-gold-300">
                      — {act.voice}
                    </em>
                  </h3>
                  <p className="font-editorial mt-4 text-[0.98rem] leading-[1.75] text-paper/70">
                    {act.note}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2.5">
                    {act.chips.map((chip) => (
                      <span
                        key={chip.k}
                        className="rounded-xl border border-paper/15 bg-ink-950/50 px-3.5 py-2 text-[0.75rem] text-paper/75"
                      >
                        <span className="font-mono text-[0.55rem] uppercase tracking-[0.2em] text-gold-400/90">
                          {chip.k}:{" "}
                        </span>
                        {chip.v}
                      </span>
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={wrapRef}
      id="programme"
      aria-label="The programme — five acts, one school"
      className="relative bg-ink-950"
      style={{ height: "560vh" }}
    >
      {/* Screen-reader programme (the pinned stage is decorative choreography) */}
      <ol className="sr-only">
        {acts.map((act) => (
          <li key={act.numeral}>
            <h3>
              Act {act.numeral} — {act.title}: {act.voice}
            </h3>
            <p>{act.note}</p>
          </li>
        ))}
      </ol>

      <div className="sticky top-0 h-[100svh] overflow-hidden bg-ink-950">
        {/* ── The stage ── */}
        <div aria-hidden="true" className="absolute inset-0">
          {acts.map((act, i) => (
            <ActLayer key={act.numeral} act={act} index={i} progress={scrollYProgress} />
          ))}
          {/* Shared scrims — keep the left text column readable on any photo */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,oklch(0.135_0.008_65/0.94)_2%,oklch(0.135_0.008_65/0.6)_36%,transparent_64%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_top,oklch(0.135_0.008_65/0.88),transparent_42%)]" />
          <div className="absolute inset-0 depth-vignette" />
          <div className="grain absolute inset-0 opacity-50" />
        </div>

        {/* ── Film playhead — scroll progress across the whole programme ──
            Lives at the bottom edge: the fixed site header would cover it. */}
        <motion.div
          aria-hidden="true"
          style={{ scaleX: curtain }}
          className="absolute bottom-0 left-0 z-30 h-[3px] w-full origin-left bg-gradient-to-r from-gold-600 via-gold-400 to-gold-300"
        />

        {/* ── Intro overture ── */}
        <Intro progress={scrollYProgress} onJump={jumpTo} />

        {/* ── Act rail (desktop) ── */}
        <nav
          aria-label="Programme acts"
          className="absolute right-8 top-1/2 z-30 hidden -translate-y-1/2 lg:block"
        >
          <ul className="space-y-1.5">
            {acts.map((act, i) => (
              <li key={act.numeral}>
                <button
                  type="button"
                  onClick={() => jumpTo(i)}
                  aria-current={active === i ? "true" : undefined}
                  className={`group flex items-center gap-3 rounded-full py-1.5 pl-2 pr-3 text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400/70 ${
                    active === i ? "bg-ink-950/60 backdrop-blur-md" : ""
                  }`}
                >
                  <span
                    className={`font-display text-[0.72rem] italic tabular transition-colors duration-300 ${
                      active === i ? "text-gold-300" : "text-paper/35 group-hover:text-paper/70"
                    }`}
                  >
                    {act.numeral}
                  </span>
                  <span
                    className={`text-[0.62rem] font-bold uppercase tracking-[0.2em] transition-all duration-300 ${
                      active === i
                        ? "text-paper"
                        : "text-paper/35 group-hover:text-paper/70"
                    }`}
                  >
                    {act.title}
                  </span>
                  <span
                    className={`h-px transition-all duration-500 ${
                      active === i ? "w-7 bg-gold-400" : "w-0 bg-paper/40 group-hover:w-4"
                    }`}
                  />
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* ── Mobile act dots ── */}
        <div className="absolute bottom-6 right-5 z-30 flex items-center gap-2 lg:hidden">
          {acts.map((act, i) => (
            <button
              key={act.numeral}
              type="button"
              onClick={() => jumpTo(i)}
              aria-label={`Go to Act ${act.numeral} — ${act.title}`}
              aria-current={active === i ? "true" : undefined}
              className={`rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400/70 ${
                active === i
                  ? "h-2 w-6 bg-gold-400"
                  : "size-2 bg-paper/30 hover:bg-paper/60"
              }`}
            />
          ))}
        </div>

        {/* ── Now playing (desktop) ── */}
        <div className="absolute bottom-8 left-10 z-30 hidden items-center gap-3 font-mono text-[0.6rem] uppercase tracking-[0.3em] text-paper/40 lg:flex">
          <span
            className={`size-1.5 rounded-full transition-colors duration-500 ${
              active >= 0 ? "bg-gold-400 shadow-[0_0_10px_rgba(212,175,55,0.9)]" : "bg-paper/30"
            }`}
          />
          {active < 0 ? "ERSA · The programme" : `Act ${acts[active].numeral} · ${acts[active].title}`}
        </div>
      </div>
    </section>
  );
}

/** The overture — fades out as the first act begins. */
function Intro({
  progress,
  onJump,
}: {
  progress: MotionValue<number>;
  onJump: (i: number) => void;
}) {
  const opacity = useTransform(progress, [0, INTRO_END * 0.72], [1, 0]);
  const y = useTransform(progress, [0, INTRO_END * 0.72], [0, -36]);
  const visibility = useTransform(opacity, (v) => (v > 0.04 ? "visible" : "hidden"));

  return (
    <motion.div
      style={{ opacity, y, visibility }}
      className="absolute inset-0 z-20 flex items-center"
    >
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="max-w-2xl">
          <p className="kicker text-gold-400">
            <span className="h-px w-9 bg-gold-400" />
            The programme
          </p>
          <RevealHeading
            as="h2"
            className="heading-craft heading-depth mt-5 font-display text-display-xl font-medium text-balance text-paper"
          >
            Five acts.{" "}
            <em className="font-display-wonk font-light italic text-gilded text-gilded-sheen">
              One school.
            </em>
          </RevealHeading>
          <p className="font-editorial drop-cap mt-7 max-w-xl text-editorial text-paper/75">
            Each act is one of the five specialist disciplines — a full subject on the
            national curriculum, trained inside the timetable and performed in public.
            Scroll, and the stage will change for each one.
          </p>
          <button
            type="button"
            onClick={() => onJump(0)}
            className="group mt-9 inline-flex items-center gap-3 rounded-full border border-paper/25 bg-ink-950/40 px-6 py-3.5 text-[0.66rem] font-bold uppercase tracking-[0.22em] text-paper/85 backdrop-blur-sm transition-colors duration-300 hover:border-gold-400 hover:text-gold-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400/70"
          >
            Raise the curtain
            <ChevronDown className="size-4 animate-bounce text-gold-400" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
