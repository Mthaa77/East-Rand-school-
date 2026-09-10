"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Clapperboard } from "lucide-react";

/* A cinematic welcome in two acts, staged like a title sequence.
   ACT I — a letterboxed "screen" plays the glass crest with a light sweep
   and scroll-driven parallax. ACT II — the Principal's message, set like
   film credits with a drop cap, a gold pull-quote and a crest signature.
   Leadership names/portraits are withheld until the school confirms the
   current principal (per the source profile) — the block is signed from
   the Principal's Desk, so one line adds the name when approved. */

const GRAIN =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")";

const HEADLINE = [
  "Every",
  "spotlight",
  "you",
  "will",
  "ever",
  "applaud",
  "begins",
  "here.",
];

function ScreenCorners() {
  const base =
    "absolute size-5 rounded-[4px] border-gold-300/70 sm:size-6";
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-4 z-20 sm:inset-6"
    >
      <span className={`${base} left-0 top-0 border-l-2 border-t-2`} />
      <span className={`${base} right-0 top-0 border-r-2 border-t-2`} />
      <span className={`${base} bottom-0 left-0 border-b-2 border-l-2`} />
      <span className={`${base} bottom-0 right-0 border-b-2 border-r-2`} />
    </span>
  );
}

export function PrincipalsWelcome() {
  const sectionRef = useRef<HTMLElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  /* ACT I — the screen wakes as it reaches centre stage */
  const { scrollYProgress: screenIn } = useScroll({
    target: screenRef,
    offset: ["start end", "center 0.42"],
  });
  const screenScale = useTransform(screenIn, [0, 1], [0.92, 1]);
  const screenDim = useTransform(screenIn, [0, 1], [0.55, 0]);
  const barTop = useTransform(screenIn, [0, 1], ["13%", "0%"]);
  const barBottom = useTransform(screenIn, [0, 1], ["13%", "0%"]);
  const sweepX = useTransform(screenIn, [0.15, 1], ["-130%", "430%"]);

  /* section-long parallax for the crest inside the screen */
  const { scrollYProgress: sectionTravel } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const crestY = useTransform(sectionTravel, [0, 1], ["-5%", "5%"]);
  const crestScale = useTransform(sectionTravel, [0, 1], [1.14, 1.2]);
  const spotlight = useTransform(
    sectionTravel,
    [0.25, 0.55, 0.9],
    [0, 0.9, 0.25]
  );

  return (
    <section
      id="welcome"
      ref={sectionRef}
      aria-label="A welcome from the Principal's desk"
      className="relative overflow-hidden bg-ink-950 text-paper"
    >
      {/* cinema light + vignette */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(56%_34%_at_50%_0%,oklch(0.76_0.14_76/0.15),transparent_70%)]"
      />
      <motion.div
        aria-hidden="true"
        style={{ opacity: reduce ? 0.4 : spotlight }}
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[60%] bg-[radial-gradient(46%_60%_at_50%_100%,oklch(0.76_0.14_76/0.12),transparent_72%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 shadow-[inset_0_0_140px_60px_rgba(0,0,0,0.55)]"
      />
      {/* film grain */}
      <div
        aria-hidden="true"
        style={{ backgroundImage: GRAIN }}
        className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
      />

      <div className="relative mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28 lg:py-32">
        {/* ─────────── ACT I · THE SCREEN ─────────── */}
        <motion.div
          ref={screenRef}
          style={{
            scale: reduce ? undefined : screenScale,
            transformPerspective: 1200,
          }}
          className="group relative overflow-hidden rounded-xl border border-gold-300/25 bg-black shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)] will-change-transform"
        >
          <div className="relative aspect-[16/11] overflow-hidden sm:aspect-[21/9]">
            <motion.div
              style={{
                y: reduce ? "0%" : crestY,
                scale: reduce ? 1.05 : crestScale,
              }}
              className="absolute inset-0 will-change-transform"
            >
              <Image
                src="/images/brand/crest-glass-split.webp"
                alt="The ERSA school crest rendered as a dark glass emblem split by a blade of gold light — official brand artwork"
                fill
                sizes="(max-width: 640px) 100vw, 1152px"
                className="object-cover"
              />
            </motion.div>

            {/* legibility gradients */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.42),transparent_30%,transparent_62%,rgba(0,0,0,0.6))]"
            />

            {/* projector light sweep */}
            <motion.div
              aria-hidden="true"
              style={{ x: reduce ? undefined : sweepX }}
              className="absolute inset-y-0 left-0 z-10 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/12 to-transparent"
            />

            {/* letterbox bars — the screen 'opens' as you arrive */}
            <motion.span
              aria-hidden="true"
              style={{ height: reduce ? "0%" : barTop }}
              className="absolute inset-x-0 top-0 z-20 bg-black"
            />
            <motion.span
              aria-hidden="true"
              style={{ height: reduce ? "0%" : barBottom }}
              className="absolute inset-x-0 bottom-0 z-20 bg-black"
            />

            <ScreenCorners />

            {/* slate caption */}
            <p className="absolute left-5 top-5 z-20 flex items-center gap-2.5 text-[0.6rem] font-bold uppercase tracking-[0.28em] text-gold-300 sm:left-8 sm:top-7 sm:text-[0.65rem]">
              <span
                aria-hidden="true"
                className="relative flex size-1.5 sm:size-2"
              >
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-crimson-400 opacity-70 motion-reduce:animate-none" />
                <span className="relative inline-flex size-1.5 rounded-full bg-crimson-500 sm:size-2" />
              </span>
              Scene 01 — A Welcome
            </p>
            <p className="absolute right-5 top-5 z-20 hidden font-mono text-[0.6rem] uppercase tracking-[0.2em] text-paper/60 sm:right-8 sm:top-7 sm:block">
              00:00:01 · Daveyton, Gauteng
            </p>
            <p className="absolute bottom-5 left-5 z-20 max-w-[70%] text-[0.6rem] font-semibold uppercase tracking-[0.24em] text-paper/70 sm:bottom-7 sm:left-8 sm:text-[0.65rem]">
              The crest of the East Rand School of the Arts
            </p>
          </div>
        </motion.div>

        {/* ─────────── ACT II · THE MESSAGE ─────────── */}
        <div className="relative mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-28">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center gap-3 text-[0.65rem] font-bold uppercase tracking-[0.32em] text-gold-300/90 sm:text-[0.7rem]"
          >
            <Clapperboard aria-hidden="true" className="size-3.5" />
            From the Principal&rsquo;s Desk
          </motion.p>

          <h2
            aria-label="Every spotlight you will ever applaud begins here."
            className="heading-craft heading-depth-xl mt-7 text-balance text-center font-display text-display-md font-medium leading-[1.08] sm:text-display-lg"
          >
            <span aria-hidden="true">
              {HEADLINE.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: "0.55em", rotate: 1.5, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, y: 0, rotate: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-70px" }}
                transition={{
                  duration: 0.7,
                  delay: 0.05 * i,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mr-[0.28em] inline-block will-change-transform"
              >
                {i === HEADLINE.length - 1 ? (
                  <span className="text-gilded text-gilded-sheen italic">{word}</span>
                ) : (
                  word
                )}
              </motion.span>
            ))}
            </span>
          </h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-70px" }}
            transition={{ duration: 0.9, delay: 0.25 }}
            className="mt-9 space-y-6 text-pretty [font-family:var(--font-newsreader)] [font-optical-sizing:auto] text-[1.05rem] leading-[1.8] text-paper/85 sm:text-[1.1rem]"
          >
            <p className="first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-[3.4rem] first-letter:font-semibold first-letter:leading-[0.85] first-letter:text-gold-300">
              Every production you will ever see — every note, every step, every
              scene — begins long before the curtain rises. It begins here in
              Daveyton, in rehearsal rooms where paint, practice and patience
              meet, and where young artists learn that excellence is a habit
              built one disciplined hour at a time.
            </p>
            <p>
              As a public school of specialisation in the arts, we open our
              doors to every learner with the talent and the will to work.
              Across five disciplines — visual arts, design, music, dance and
              drama — our educators, families and community stand behind each
              learner the way a crew stands behind a stage: unseen,
              unglamorous, essential.
            </p>
          </motion.div>

          <motion.blockquote
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-70px" }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="relative my-10 border-y border-gold-300/25 py-7 text-center sm:my-12 sm:py-8"
          >
            <p className="text-balance font-display text-[1.35rem] font-medium italic leading-snug text-gold-200 sm:text-[1.6rem]">
              &ldquo;Achievement through excellence&rdquo; is not our slogan.
              It is our standard — taught, rehearsed and earned here every
              day.
            </p>
          </motion.blockquote>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8 }}
            className="text-pretty text-center [font-family:var(--font-newsreader)] [font-optical-sizing:auto] text-[1.02rem] leading-[1.8] text-paper/85 sm:text-[1.06rem]"
          >
            Wherever our learners perform next — on a national stage, or behind
            the industry that builds one — this is where it starts. Welcome to
            the East Rand School of the Arts.
          </motion.p>

          {/* signature */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="mt-12 flex flex-col items-center gap-4"
          >
            <motion.div
              initial={{ rotate: -7, scale: 0.9 }}
              whileInView={{ rotate: 0, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative size-16 overflow-hidden rounded-full border border-gold-300/40 bg-ink-800 shadow-[0_0_0_5px_oklch(0.76_0.14_76/0.08)] sm:size-[4.5rem]"
            >
              <Image
                src="/images/brand/crest-full.webp"
                alt="The ERSA crest with its motto banner — Achievement through excellence"
                fill
                sizes="72px"
                className="object-contain p-1.5"
              />
            </motion.div>
            <div className="text-center">
              <p className="font-display text-lg italic text-paper sm:text-xl">
                The Principal&rsquo;s Desk
              </p>
              <p className="mt-1.5 font-mono text-[0.62rem] uppercase tracking-[0.26em] text-paper/60">
                East Rand School of the Arts · 1 Jones Street, Daveyton
              </p>
            </div>
            <span aria-hidden="true" className="h-px w-24 bg-gold-300/50" />
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.34em] text-gold-300/85">
              Achievement through excellence
            </p>
          </motion.div>
        </div>

        {/* end card */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 1.2, delay: 0.2 }}
          aria-hidden="true"
          className="mt-16 text-center font-mono text-[0.58rem] uppercase tracking-[0.4em] text-paper/35 sm:mt-20"
        >
          End of Scene 01 — the work continues below
        </motion.p>
      </div>
    </section>
  );
}
