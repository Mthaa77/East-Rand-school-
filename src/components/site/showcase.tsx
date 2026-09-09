"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2, MoveRight, X } from "lucide-react";
import { WordReveal } from "@/components/motion/word-reveal";
import { ViewfinderCorners } from "@/components/site/viewfinder-corners";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const works = [
  {
    src: "/images/gallery-singer.webp",
    title: "Solo voice, sold-out night",
    meta: "Music · 2026",
    alt: "A young singer performing into a vintage microphone under a golden spotlight",
  },
  {
    src: "/images/disc-dance.webp",
    title: "Contemporary intensive",
    meta: "Dance Studies · 2026",
    alt: "Dancers rehearsing contemporary choreography in warm studio light",
  },
  {
    src: "/images/gallery-potter.webp",
    title: "Hands in the clay",
    meta: "Visual Arts · 2025",
    alt: "Close-up of an artist shaping clay in warm task light",
  },
  {
    src: "/images/disc-drama.webp",
    title: "Monologue week",
    meta: "Dramatic Arts · 2026",
    alt: "A drama student performing under a stage spotlight",
  },
  {
    src: "/images/gallery-ballet.webp",
    title: "First pointe",
    meta: "Dance Studies · 2025",
    alt: "A ballet dancer en pointe in dramatic backlight",
  },
  {
    src: "/images/disc-design.webp",
    title: "Portfolio lab",
    meta: "Design · 2026",
    alt: "A design student working on sketches at a drafting table",
  },
  {
    src: "/images/gallery-trumpet.webp",
    title: "Joy of Jazz sessions",
    meta: "Music · 2026",
    alt: "A young trumpet player at a night jazz event",
  },
  {
    src: "/images/disc-visual-arts.webp",
    title: "Canvas & courage",
    meta: "Visual Arts · 2026",
    alt: "A young artist painting on a large canvas",
  },
];

export function Showcase() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [direction, setDirection] = useState(0);

  const { scrollYProgress } = useScroll({ target: ref });
  const xRaw = useTransform(scrollYProgress, [0, 1], ["2%", "-72.5%"]);
  const x = useSpring(xRaw, { stiffness: 90, damping: 26, mass: 0.6 });
  const barScale = useTransform(scrollYProgress, [0, 1], [0.04, 1]);
  const barScaleSpring = useSpring(barScale, { stiffness: 120, damping: 24 });

  const step = useCallback(
    (delta: number) => {
      setLightbox((cur) => {
        if (cur === null) return cur;
        setDirection(delta);
        return (cur + delta + works.length) % works.length;
      });
    },
    []
  );

  // Arrow-key navigation while the lightbox is open
  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, step]);

  // Keep the active thumbnail centered in the film-strip.
  useEffect(() => {
    if (lightbox === null) return;
    const t = window.setTimeout(() => {
      document
        .querySelector('[aria-label="Showcase works"] [aria-selected="true"]')
        ?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
    }, 60);
    return () => window.clearTimeout(t);
  }, [lightbox]);

  const current = lightbox !== null ? works[lightbox] : null;

  return (
    <section
      id="showcase"
      aria-label="Learner work showcase"
      ref={ref}
      className="relative h-[420vh] bg-ink-950"
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden grain">
        {/* Header */}
        <div className="mx-auto w-full max-w-7xl px-5 pt-24 pb-10 sm:px-8 lg:px-10">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="kicker text-gold-400">
                <span className="h-px w-9 bg-gold-400" />
                Learner work
              </p>
              <h2 className="mt-4 font-display text-[clamp(2rem,4.6vw,3.6rem)] font-medium leading-[1.05] text-paper">
                <WordReveal
                  text="The work behind the spotlight."
                  accentWords={["spotlight."]}
                  accentClass="text-gold-400 italic font-light"
                />
              </h2>
            </div>
            <p className="flex items-center gap-3 text-[0.65rem] uppercase tracking-[0.28em] text-paper/40">
              Keep scrolling
              <MoveRight className="size-4 animate-[float_2.6s_ease-in-out_infinite] text-gold-400" />
            </p>
          </div>
        </div>

        {/* Horizontal track */}
        <motion.div
          style={reduce ? undefined : { x }}
          className="flex w-max items-start gap-5 px-5 sm:px-8 lg:px-10 will-change-transform"
        >
          {works.map((w, i) => (
            <figure
              key={w.title}
              className={cn(
                "group relative w-[78vw] shrink-0 overflow-hidden rounded-2xl border border-paper/10 shadow-lift sm:w-[46vw] lg:w-[30vw]",
                i % 3 === 1 ? "mt-10" : "",
                i % 3 === 2 ? "mt-4" : ""
              )}
            >
              <button
                type="button"
                onClick={() => {
                  setDirection(0);
                  setLightbox(i);
                }}
                aria-haspopup="dialog"
                aria-label={`${w.title} — ${w.meta}. Open in fullscreen.`}
                className="block w-full cursor-zoom-in text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400/70"
              >
                <div className="relative aspect-[3/4.1] overflow-hidden">
                  <Image
                    src={w.src}
                    alt={w.alt}
                    fill
                    sizes="(max-width: 640px) 78vw, 30vw"
                    className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950/95 via-ink-950/15 to-transparent" />
                  <ViewfinderCorners />
                  <span className="absolute left-4 top-4 font-mono text-[0.62rem] tracking-[0.25em] text-paper/70">
                    {String(i + 1).padStart(2, "0")} / {String(works.length).padStart(2, "0")}
                  </span>
                  <span className="absolute right-4 top-4 grid size-9 place-items-center rounded-full border border-paper/20 bg-ink-950/50 opacity-0 backdrop-blur-sm transition-all duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
                    <Maximize2 className="size-3.5 text-gold-300" />
                  </span>
                </div>
                <span className="absolute inset-x-0 bottom-0 block p-6">
                  <span className="block font-display text-xl font-medium text-paper">
                    {w.title}
                  </span>
                  <span className="mt-1 block text-[0.62rem] font-bold uppercase tracking-[0.26em] text-gold-400">
                    {w.meta}
                  </span>
                </span>
              </button>
              <figcaption className="sr-only">
                {w.title} — {w.meta}
              </figcaption>
            </figure>
          ))}

          {/* End card */}
          <div className="flex w-[78vw] shrink-0 items-center justify-center sm:w-[40vw] lg:w-[26vw]">
            <Link
              href="/admissions"
              className="group flex flex-col items-center gap-5 text-center"
            >
              <span className="grid size-24 place-items-center rounded-full border border-gold-500/40 transition-all duration-500 group-hover:scale-110 group-hover:bg-gold-500/15">
                <span className="font-display text-3xl italic text-gold-300">+</span>
              </span>
              <p className="font-display text-2xl font-medium text-paper">
                Your work here, next term.
              </p>
              <p className="text-[0.68rem] uppercase tracking-[0.26em] text-paper/50 group-hover:text-gold-300">
                Start your audition →
              </p>
            </Link>
          </div>
        </motion.div>

        {/* Progress */}
        <div className="mx-auto mt-12 w-full max-w-7xl px-5 pb-10 sm:px-8 lg:px-10">
          <div className="h-px w-full bg-paper/12">
            <motion.div
              style={{ scaleX: reduce ? 1 : barScaleSpring }}
              className="h-px origin-left bg-gold-400"
            />
          </div>
        </div>
      </div>

      {/* ── Lightbox ── */}
      <Dialog
        open={lightbox !== null}
        onOpenChange={(open) => {
          if (!open) setLightbox(null);
        }}
      >
        {current && (
          <DialogContent
            showCloseButton={false}
            className="top-[50%] h-[100dvh] max-h-none w-full max-w-none grid-rows-[auto_minmax(0,1fr)_auto] gap-0 overflow-hidden rounded-none border-none bg-ink-950/98 p-0 sm:max-w-none backdrop-blur-xl"
          >
            <div aria-hidden="true" className="grain pointer-events-none absolute inset-0 z-10 opacity-70" />
            <DialogTitle className="sr-only">{`${current.title} — ${current.meta}`}</DialogTitle>
            <DialogDescription className="sr-only">
              Fullscreen view of a learner work from the ERSA showcase.
            </DialogDescription>

            {/* Top bar */}
            <div className="relative z-20 flex items-center justify-between px-5 py-4 sm:px-8">
              <p className="font-mono text-[0.65rem] tracking-[0.3em] text-paper/60">
                {String((lightbox ?? 0) + 1).padStart(2, "0")} / {String(works.length).padStart(2, "0")}
                <span className="ml-4 hidden text-paper/35 sm:inline">SHOWCASE</span>
              </p>
              <button
                type="button"
                onClick={() => setLightbox(null)}
                aria-label="Close fullscreen view"
                className="grid size-10 place-items-center rounded-full border border-paper/20 text-paper/80 transition-all duration-300 hover:rotate-90 hover:border-gold-400 hover:text-gold-300"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Stage */}
            <div className="relative z-20 mx-auto flex min-h-0 w-full max-w-5xl flex-1 items-center justify-center px-4 sm:px-14">
              <AnimatePresence mode="wait" custom={direction} initial={false}>
                <motion.div
                  key={current.src + (lightbox ?? 0)}
                  custom={direction}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, x: direction >= 0 ? 60 : -60 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, x: direction >= 0 ? -60 : 60 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="flex min-h-0 h-full w-full flex-col justify-center py-4"
                >
                  <div className="relative aspect-[16/10] max-h-[54dvh] w-full overflow-hidden rounded-2xl border border-paper/10 shadow-[0_60px_120px_-40px_rgba(0,0,0,0.9)] sm:aspect-[16/8.5]">
                    <Image
                      src={current.src}
                      alt={current.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 1024px"
                      className="object-cover"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent" />
                  </div>
                  <div className="mt-4 flex flex-wrap items-end justify-between gap-3 px-1 sm:mt-5">
                    <div>
                      <p className="font-display text-2xl font-medium text-paper sm:text-3xl">
                        {current.title}
                      </p>
                      <p className="mt-1.5 text-[0.65rem] font-bold uppercase tracking-[0.28em] text-gold-400">
                        {current.meta}
                      </p>
                    </div>
                    <p className="hidden text-[0.62rem] uppercase tracking-[0.22em] text-paper/35 sm:block">
                      AI-generated imagery — real learner work to follow with consent
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Film-strip thumbnails */}
            <div
              role="tablist"
              aria-label="Showcase works"
              className="scroll-gold relative z-20 mx-auto flex w-full max-w-5xl items-center gap-2 overflow-x-auto px-4 pb-3 pt-1 sm:gap-2.5"
            >
              {works.map((w, i) => (
                <button
                  key={w.src}
                  type="button"
                  role="tab"
                  aria-selected={lightbox === i}
                  aria-label={`${w.title} — ${w.meta}`}
                  onClick={() => {
                    setDirection(i > (lightbox ?? 0) ? 1 : -1);
                    setLightbox(i);
                  }}
                  className={cn(
                    "relative aspect-[3/4] w-11 shrink-0 overflow-hidden rounded-md border transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400/70 sm:w-14",
                    lightbox === i
                      ? "border-gold-400 opacity-100 shadow-[0_0_16px_-4px_var(--color-gold-400)]"
                      : "border-paper/15 opacity-45 hover:opacity-80"
                  )}
                >
                  <Image src={w.src} alt="" fill sizes="56px" className="object-cover" />
                  {lightbox === i && (
                    <span className="absolute inset-x-0 bottom-0 bg-gold-400/90 py-px text-center font-mono text-[0.5rem] font-bold tracking-widest text-ink-950">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Prev / next */}
            <div className="relative z-20 flex items-center justify-center gap-4 pb-6 pt-1">
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Previous work"
                className="group inline-flex items-center gap-2 rounded-full border border-paper/20 px-5 py-2.5 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-paper/70 transition-all duration-300 hover:border-gold-400 hover:text-gold-300"
              >
                <ChevronLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-1" />
                Prev
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Next work"
                className="group inline-flex items-center gap-2 rounded-full border border-paper/20 px-5 py-2.5 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-paper/70 transition-all duration-300 hover:border-gold-400 hover:text-gold-300"
              >
                Next
                <ChevronRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </section>
  );
}
