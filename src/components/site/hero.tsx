"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { ArrowDown, ArrowRight, GraduationCap, MapPin, Sparkles } from "lucide-react";
import { WordReveal } from "@/components/motion/word-reveal";
import { AmbientDepth } from "@/components/site/ambient-depth";
import { SaFlag } from "@/components/site/sa-trust";
import { ViewfinderCorners } from "@/components/site/viewfinder-corners";

const dust = [
  { left: "10%", top: "26%", size: 5, delay: 0 },
  { left: "20%", top: "64%", size: 3, delay: 1.2 },
  { left: "32%", top: "18%", size: 4, delay: 2.1 },
  { left: "56%", top: "74%", size: 3, delay: 0.6 },
  { left: "68%", top: "22%", size: 5, delay: 1.7 },
  { left: "82%", top: "56%", size: 3, delay: 0.3 },
  { left: "92%", top: "70%", size: 4, delay: 2.4 },
  { left: "44%", top: "84%", size: 3, delay: 1.0 },
];

/**
 * Hero — "the ensemble". A layered collage of real ERSA students at three
 * depths, framed by Gauteng public-education trust signals. The stage stays
 * dark; the learners are the light.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  // Scroll-linked fade for the whole stage
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  // Mouse spotlight across the whole stage
  const mx = useMotionValue(50);
  const my = useMotionValue(40);
  const sx = useSpring(mx, { stiffness: 50, damping: 20 });
  const sy = useSpring(my, { stiffness: 50, damping: 20 });
  const spotlight = useTransform(
    [sx, sy],
    ([x, y]) =>
      `radial-gradient(640px circle at ${x}% ${y}%, oklch(0.76 0.14 76 / 0.12), transparent 65%)`
  );

  // Mouse-parallax rates — one per collage layer, near layers move most
  const choirX = useTransform(sx, [0, 100], [10, -10]);
  const choirY = useTransform(sy, [0, 100], [7, -7]);
  const balletX = useTransform(sx, [0, 100], [-16, 16]);
  const balletY = useTransform(sy, [0, 100], [-10, 10]);
  const gateX = useTransform(sx, [0, 100], [6, -6]);
  const gateY = useTransform(sy, [0, 100], [4, -4]);
  const cardX = useTransform(sx, [0, 100], [20, -20]);
  const cardY = useTransform(sy, [0, 100], [12, -12]);
  const chipX = useTransform(sx, [0, 100], [-26, 26]);
  const chipY = useTransform(sy, [0, 100], [-14, 14]);

  function onPointerMove(e: React.PointerEvent) {
    if (reduce) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set(((e.clientX - rect.left) / rect.width) * 100);
    my.set(((e.clientY - rect.top) / rect.height) * 100);
  }

  const px = (v: number) => (reduce ? 0 : v);

  return (
    <section
      ref={ref}
      onPointerMove={onPointerMove}
      id="top"
      aria-label="East Rand School of the Arts — hero"
      className="relative overflow-hidden bg-ink-950 grain"
    >
      {/* ── Dark stage backdrop (the learners are the light) ── */}
      <div aria-hidden="true" className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(85%_70%_at_16%_-4%,oklch(0.76_0.14_76/0.15),transparent_62%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(55%_48%_at_90%_80%,oklch(0.55_0.18_30/0.17),transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(70%_55%_at_78%_18%,oklch(0.36_0.016_65/0.5),transparent_70%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/55 via-transparent to-ink-950" />
      </div>
      <motion.div style={{ background: spotlight }} className="absolute inset-0" />

      {/* Ambient light + edge falloff */}
      <AmbientDepth variant="trio" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 depth-vignette" />

      {/* Floating gold dust */}
      {!reduce &&
        dust.map((d, i) => (
          <motion.span
            key={i}
            aria-hidden="true"
            className="absolute rounded-full bg-gold-300/70 blur-[1px] animate-[float_7s_ease-in-out_infinite]"
            style={{
              left: d.left,
              top: d.top,
              width: d.size,
              height: d.size,
              animationDelay: `${d.delay}s`,
            }}
          />
        ))}

      {/* ── Content: editorial text + student collage ── */}
      <motion.div
        style={{ opacity: fade }}
        className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-14 px-5 pt-32 pb-20 sm:px-8 lg:grid-cols-12 lg:gap-8 lg:px-10 lg:pt-36 lg:pb-24"
      >
        {/* Left: the editorial voice */}
        <div className="lg:col-span-6 xl:col-span-7">
          {/* Kicker */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.45 }}
            className="mb-7 flex items-center gap-4"
          >
            <span className="h-px w-12 bg-gold-400" />
            <p className="kicker text-gold-300">
              <SaFlag className="size-5 shrink-0" />
              Gauteng School of Specialisation in the Arts
            </p>
          </motion.div>

          {/* Headline */}
          <h1 className="heading-craft heading-depth-xl max-w-[13ch] font-display text-[clamp(2.7rem,4.7vw,5.6rem)] font-medium leading-[1.02] tracking-[-0.022em] text-balance text-paper">
            <WordReveal
              text="Where East Rand talent becomes craft, confidence & opportunity."
              delay={0.6}
              stagger={0.07}
              accentWords={["craft,", "confidence", "opportunity."]}
              accentClass="text-gilded text-gilded-sheen italic font-light"
            />
          </h1>

          {/* Sub copy — the school's own voice */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.35 }}
            className="mt-7 max-w-xl font-editorial text-lede text-pretty text-paper/70"
          >
            We are Daveyton's public school for the arts — five disciplines inside one
            timetable, trained in the school day, rehearsed after the bell, and examined
            with everything else that matters. Visual Arts. Design. Dramatic Arts. Dance.
            Music.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.55 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a
              href="#disciplines"
              className="group inline-flex items-center gap-3 rounded-full bg-gold-500 px-7 py-4 text-[0.72rem] font-bold uppercase tracking-[0.2em] text-ink-950 shadow-[0_10px_30px_-10px_var(--color-gold-500)] transition-all duration-300 hover:bg-gold-300 hover:shadow-glow hover:-translate-y-0.5"
            >
              Explore the five disciplines
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1.5" />
            </a>
            <Link
              href="/admissions"
              className="group inline-flex items-center gap-3 rounded-full border border-paper/25 bg-ink-950/40 px-7 py-4 text-[0.72rem] font-bold uppercase tracking-[0.2em] text-paper backdrop-blur-sm transition-all duration-300 hover:border-gold-400 hover:text-gold-300"
            >
              How to apply
            </Link>
          </motion.div>

          {/* Stat strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 1.9 }}
            className="mt-12 flex flex-wrap gap-x-10 gap-y-4 border-t border-paper/12 pt-6"
          >
            {[
              ["5", "Specialist disciplines", "text-gold-300"],
              ["Since 1999", "Daveyton · Benoni", "text-crimson-300"],
              ["12", "Official languages welcome", "text-gold-300"],
            ].map(([v, l, accent]) => (
              <div key={l} className="flex items-baseline gap-3">
                <span className={`font-display stat-figure text-2xl font-semibold tabular ${accent}`}>
                  {v}
                </span>
                <span className="text-[0.65rem] uppercase tracking-[0.22em] text-paper/45">
                  {l}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: the ensemble — student photos at three depths */}
        <div className="relative lg:col-span-6 xl:col-span-5">
          <div className="relative mx-auto h-[440px] w-full max-w-[540px] sm:h-[520px] lg:h-[560px]">
            {/* echo frame behind the choir photo */}
            <motion.div
              aria-hidden="true"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 1.0 }}
              className="absolute left-[4%] top-[3%] h-[64%] w-[58%] rounded-[2rem] border border-gold-500/35 bg-ink-900/40 rotate-[-2.5deg]"
            />

            {/* Main — the choir & the principal, front and centre */}
            <motion.div
              initial={{ opacity: 0, y: 34 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
              style={{ x: px(choirX), y: px(choirY) }}
              className="group absolute left-0 top-0 z-10 w-[64%]"
            >
              <div
                className="photo-frame relative aspect-[4/5.4] rotate-[-2.5deg] ring-1 ring-gold-500/30"
              >
                <Image
                  src="/images/real/choir-principal.jpg"
                  alt="ERSA choir learners in uniform with the principal on the school grounds"
                  fill
                  loading="eager"
                  fetchPriority="high"
                  quality={85}
                  sizes="(max-width: 1024px) 64vw, 30vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <ViewfinderCorners />
                <span className="absolute left-3 top-3 hidden rounded-full bg-ink-950/70 px-3.5 py-1.5 text-[0.56rem] font-bold uppercase tracking-[0.2em] text-gold-300 backdrop-blur-sm sm:inline-flex">
                  The choir &amp; the principal
                </span>
              </div>
            </motion.div>

            {/* Mid — a dancer in motion, polaroid-style, drifting opposite */}
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 1.15, ease: [0.22, 1, 0.36, 1] }}
              style={{ x: px(balletX), y: px(balletY) }}
              className="absolute right-0 top-[14%] z-20 w-[54%] sm:w-[50%]"
            >
              <div
                className="bg-paper p-2 pb-3 shadow-float rotate-[3deg] transition-transform duration-700 hover:rotate-[1.5deg] sm:p-2.5 sm:pb-4"
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
                  <Image
                    src="/images/gallery-ballet.webp"
                    alt="A young dancer training at the barre under warm studio light"
                    fill
                    sizes="(max-width: 1024px) 54vw, 26vw"
                    className="object-cover"
                  />
                </div>
                <p className="mt-2 text-center font-display text-[0.7rem] font-medium italic text-ink-800/70">
                  training day
                </p>
              </div>
            </motion.div>

            {/* Front — learners at the school gate */}
            <motion.div
              initial={{ opacity: 0, y: 34 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
              style={{ x: px(gateX), y: px(gateY) }}
              className="group absolute bottom-0 left-[4%] z-30 hidden w-[42%] sm:block"
            >
              <div
                className="photo-frame relative aspect-[3/4] shadow-float rotate-[-1.5deg]"
              >
                <Image
                  src="/images/real/learners-entrance.jpg"
                  alt="ERSA learners in uniform at the school entrance in Daveyton"
                  fill
                  sizes="(max-width: 1024px) 42vw, 22vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <span className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-ink-950/70 px-3 py-1.5 text-[0.56rem] font-bold uppercase tracking-[0.18em] text-paper/90 backdrop-blur-sm">
                  <MapPin className="size-3 text-gold-400" />
                  At the gate · Daveyton
                </span>
              </div>
            </motion.div>

            {/* Floating trust card — the GDE credential */}
            {!reduce && (
              <motion.div
                aria-hidden="false"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.1, delay: 1.7, ease: [0.22, 1, 0.36, 1] }}
                style={{ x: px(cardX), y: px(cardY) }}
                className="absolute left-[-3%] top-[38%] z-40 sm:left-[-5%]"
              >
                <div className="animate-float-soft flex max-w-[264px] items-center gap-3 rounded-2xl border border-paper/15 bg-ink-950/70 px-4 py-3 shadow-float backdrop-blur-xl">
                  <span className="relative block size-10 shrink-0 overflow-hidden rounded-full ring-2 ring-gold-500/45">
                    <Image
                      src="/images/crest-circle.webp"
                      alt=""
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </span>
                  <span>
                    <span className="flex items-center gap-1.5">
                      <SaFlag className="h-2.5 w-3.5 shrink-0" />
                      <span className="font-display text-[0.82rem] font-semibold leading-tight text-paper">
                        Gauteng Dept of Education
                      </span>
                    </span>
                    <span className="mt-1 block text-[0.55rem] uppercase tracking-[0.2em] text-paper/55">
                      Public school · Since 1999
                    </span>
                  </span>
                </div>
              </motion.div>
            )}

            {/* Floating stat chip — the class of 2025 receipt */}
            {!reduce && (
              <motion.div
                aria-hidden="false"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.1, delay: 1.9, ease: [0.22, 1, 0.36, 1] }}
                style={{ x: px(chipX), y: px(chipY) }}
                className="absolute bottom-[8%] right-0 z-40"
              >
                <div className="animate-float-soft flex items-center gap-3 rounded-2xl border border-paper/15 bg-ink-950/70 py-3 pl-4 pr-5 shadow-float backdrop-blur-xl [animation-delay:2.4s]">
                  <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-crimson-500/20 text-crimson-400 ring-1 ring-crimson-500/40">
                    <GraduationCap className="size-4" />
                  </span>
                  <span>
                    <span className="font-display stat-figure block text-xl font-semibold leading-none text-gold-300 tabular">
                      98.86%
                    </span>
                    <span className="mt-1 block text-[0.55rem] uppercase tracking-[0.2em] text-paper/55">
                      Class of 2025 · NSC pass
                    </span>
                  </span>
                </div>
              </motion.div>
            )}

            {/* Audition pill */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 2.05 }}
              className="absolute right-[6%] top-0 z-40"
            >
              <span className="flex items-center gap-2 rounded-full border border-crimson-400/60 bg-crimson-500/15 px-4 py-2 text-[0.58rem] font-bold uppercase tracking-[0.2em] text-paper shadow-[0_0_24px_-6px_oklch(0.55_0.18_30/0.5)] backdrop-blur-sm">
                <Sparkles className="size-3.5 text-crimson-300" />
                Audition entry · Grade 8
              </span>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.a
        href="#gde-framework"
        aria-label="Scroll to content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 1 }}
        style={{ opacity: fade }}
        className="absolute bottom-7 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 sm:flex"
      >
        <span className="text-[0.6rem] uppercase tracking-[0.34em] text-paper/50">
          Scroll
        </span>
        <span className="relative h-12 w-px overflow-hidden bg-paper/15">
          <motion.span
            className="absolute left-0 top-0 h-5 w-px bg-gold-400"
            animate={{ y: [-20, 48] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
        <ArrowDown className="size-3.5 text-paper/50" />
      </motion.a>

      {/* Vertical side note */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="vertical-text absolute left-6 top-1/2 hidden -translate-y-1/2 xl:block text-[0.6rem] uppercase tracking-[0.4em] text-paper/35"
      >
        Est. 1999 — 1 Jones Street, Daveyton
      </motion.p>
    </section>
  );
}
