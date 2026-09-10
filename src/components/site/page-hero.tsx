"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { WordReveal } from "@/components/motion/word-reveal";
import { Parallax } from "@/components/motion/parallax";
import { ViewfinderCorners } from "@/components/site/viewfinder-corners";
import { cn } from "@/lib/utils";

/**
 * Shared editorial masthead for every subpage — breadcrumb, kicker,
 * fluid display title, lede and a rounded photo band with the layered
 * warm shadow treatment. Ink background with grain + gold glow.
 */
export function PageHero({
  kicker,
  title,
  accentWords = [],
  lede,
  crumb,
  image,
  imageAlt,
  children,
}: {
  kicker: string;
  title: string;
  accentWords?: string[];
  lede: string;
  crumb: string;
  image: string;
  imageAlt: string;
  /** Optional extra row under the lede (chips, meta…). */
  children?: React.ReactNode;
}) {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-ink-950 pb-14 pt-36 sm:pb-20 sm:pt-44 grain">
      {/* spotlight glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-gold-500/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* breadcrumb */}
        <motion.nav
          aria-label="Breadcrumb"
          initial={reduce ? false : { opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-paper/40"
        >
          <Link href="/" className="transition-colors hover:text-gold-300">
            Home
          </Link>
          <ChevronRight className="size-3 text-paper/25" aria-hidden="true" />
          <span aria-current="page" className="text-gold-400">
            {crumb}
          </span>
        </motion.nav>

        {/* kicker + title */}
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="kicker mt-7 text-gold-400"
        >
          <span className="h-px w-9 bg-gold-400" />
          {kicker}
        </motion.p>

        <h1 className="heading-craft heading-depth-xl mt-5 max-w-4xl font-display text-display-xl font-medium text-paper">
          <WordReveal
            text={title}
            accentWords={accentWords}
            accentClass="text-gilded text-gilded-sheen italic font-light"
          />
        </h1>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-2xl text-pretty font-editorial text-lede text-paper/65"
        >
          {lede}
        </motion.p>

        {children && (
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7"
          >
            {children}
          </motion.div>
        )}

        {/* photo band — stacked depth: glow → echo frame → live frame */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 28, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}
          className="group relative mt-12"
        >
          {/* corner glow behind the frame — lifts the band off the ink */}
          <div
            aria-hidden="true"
            className="absolute -right-8 -top-10 size-64 rounded-full bg-gold-500/14 blur-[90px] animate-breathe"
          />
          {/* echo frame — the “print slipped behind the frame” depth cue */}
          <div
            aria-hidden="true"
            className="absolute inset-x-4 -top-4 bottom-8 -rotate-[1.6deg] rounded-[2rem] border border-gold-500/25 bg-ink-800/50 shadow-panel sm:inset-x-6"
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-10 -top-7 bottom-16 rotate-[1.1deg] rounded-[2rem] border border-paper/8 bg-ink-900/35 sm:inset-x-14"
          />
          <Parallax distance={22} className="relative">
            <div className="photo-frame relative aspect-[16/7] w-full overflow-hidden sm:aspect-[16/6]">
              <Image
                src={image}
                alt={imageAlt}
                fill
                priority
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-ink-950/45 via-transparent to-transparent"
              />
            </div>
          </Parallax>
          <ViewfinderCorners className="pointer-events-none absolute -inset-3 hidden text-gold-400/60 sm:block" />
        </motion.div>
      </div>
    </section>
  );
}

/**
 * Consistent page shell rhythm helper — a full-width band that alternates
 * ink/paper like the homepage. `tone` picks the surface.
 */
export function PageBand({
  tone = "ink",
  className,
  id,
  children,
  ariaLabel,
}: {
  tone?: "ink" | "paper" | "paper-deep";
  className?: string;
  id?: string;
  children: React.ReactNode;
  ariaLabel?: string;
}) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={cn(
        "relative",
        tone === "ink" && "bg-ink-950 text-paper grain",
        tone === "paper" && "bg-paper text-ink-950",
        tone === "paper-deep" && "bg-paper-200 text-ink-950",
        className
      )}
    >
      {children}
    </section>
  );
}
