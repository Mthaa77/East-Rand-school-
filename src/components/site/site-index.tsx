"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/site/proof-bar";
import { Reveal } from "@/components/motion/reveal";
import { SpotlightCard } from "@/components/site/spotlight-card";
import { SITE_PAGES } from "@/lib/navigation";
import { cn } from "@/lib/utils";

/**
 * "Explore the whole school" — the homepage index of the multipage site.
 * Editorial numbered rows; hovering a row floats its photo preview beside
 * the list (desktop) while mobile shows a rounded thumbnail per row.
 */
export function SiteIndex() {
  const [active, setActive] = useState<number | null>(null);
  const reduce = useReducedMotion();

  return (
    <section
      id="index"
      aria-label="Explore the rest of the site"
      className="relative bg-ink-950 grain"
    >
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-28 lg:px-10">
        <div className="lg:grid lg:grid-cols-12 lg:gap-14">
          {/* Heading column */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-36">
              <SectionHeading
                kicker="Six rooms, one school"
                title="Keep exploring the whole story"
                accentWords={["whole", "story"]}
                description="The homepage is the trailer. Each page goes deeper — the story, the five disciplines, the audition journey, the work, the dates and the front desk."
              />
              <Reveal delay={0.2}>
                <p className="mt-7 hidden items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.25em] text-paper/35 lg:flex">
                  <span className="inline-block size-1.5 rounded-full bg-gold-400 shadow-[0_0_8px_rgba(212,175,55,0.8)]" />
                  hover a room to preview it
                </p>
              </Reveal>
            </div>
          </div>

          {/* Rows column */}
          <div className="mt-12 lg:col-span-8 lg:mt-0">
            <ul className="space-y-3">
              {SITE_PAGES.map((page, i) => {
                const isActive = active === i;
                return (
                  <Reveal key={page.path} delay={0.05 * i}>
                    <li>
                      <SpotlightCard className="rounded-2xl">
                      <Link
                        href={page.path}
                        onMouseEnter={() => setActive(i)}
                        onMouseLeave={() => setActive(null)}
                        onFocus={() => setActive(i)}
                        onBlur={() => setActive(null)}
                        className={cn(
                          "group relative flex items-center gap-5 overflow-hidden rounded-2xl border bg-ink-900/60 p-5 shadow-card backdrop-blur-sm transition-all duration-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400/70 sm:gap-7 sm:p-6",
                          isActive
                            ? "-translate-y-0.5 border-gold-400/50 shadow-lift"
                            : "border-paper/10 hover:border-gold-400/40"
                        )}
                      >
                        {/* mobile thumbnail */}
                        <span className="photo-frame relative block size-20 shrink-0 overflow-hidden rounded-xl sm:hidden">
                          <Image
                            src={page.image}
                            alt=""
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        </span>

                        <span
                          className={cn(
                            "hidden font-mono text-xs transition-colors duration-300 sm:block",
                            isActive ? "text-gold-300" : "text-gold-500"
                          )}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>

                        <span className="min-w-0 flex-1">
                          <span
                            className={cn(
                              "block font-display text-2xl font-medium transition-colors duration-300 sm:text-3xl",
                              isActive ? "text-gold-300" : "text-paper group-hover:text-gold-200"
                            )}
                          >
                            {page.label}
                          </span>
                          <span className="mt-1 block text-sm leading-relaxed text-paper/50">
                            {page.description}
                          </span>
                        </span>

                        <span
                          aria-hidden="true"
                          className={cn(
                            "grid size-11 shrink-0 place-items-center rounded-full border transition-all duration-400",
                            isActive
                              ? "rotate-45 border-gold-400 bg-gold-500 text-ink-950 shadow-glow"
                              : "border-paper/20 text-paper/60 group-hover:rotate-45 group-hover:border-gold-400/60 group-hover:text-gold-300"
                          )}
                        >
                          <ArrowUpRight className="size-4.5" />
                        </span>

                        {/* sweep highlight */}
                        <span
                          aria-hidden="true"
                          className={cn(
                            "pointer-events-none absolute inset-y-0 left-0 w-1.5 rounded-r-full bg-gradient-to-b from-gold-300 to-gold-600 transition-all duration-500",
                            isActive ? "opacity-100" : "opacity-0"
                          )}
                        />
                      </Link>
                      </SpotlightCard>
                    </li>
                  </Reveal>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      {/* Floating preview — desktop only */}
      <AnimatePresence>
        {active !== null && !reduce && (
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16, scale: 0.96, rotate: -2 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotate: 2 }}
            exit={{ opacity: 0, y: 10, scale: 0.97, rotate: 3 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            aria-hidden="true"
            className="pointer-events-none fixed left-[46%] top-[38%] z-[60] hidden xl:block"
          >
            <div className="photo-frame relative h-56 w-96 overflow-hidden rounded-2xl shadow-lift">
              <Image
                src={SITE_PAGES[active].image}
                alt=""
                fill
                sizes="384px"
                className="object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-ink-950/60 via-transparent to-transparent"
              />
              <p className="absolute bottom-3 left-4 font-mono text-[0.6rem] uppercase tracking-[0.28em] text-gold-300">
                ersa.co.za{SITE_PAGES[active].path}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
