"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_PAGES } from "@/lib/navigation";
import { PaletteTrigger } from "@/components/site/palette-trigger";

/**
 * Premium floating navbar — the primary navigation lives inside a detached
 * glass capsule that hovers above the page. Two states:
 *   top-of-page  → whisper-light glass, full height
 *   scrolled     → the capsule "lifts": deeper glass, ring highlight,
 *                  panel shadow and a compacted height
 */
export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Lift the capsule once the page scrolls. Listener only; the initial
  // top-of-page state (false) is correct, and Next's scroll-to-top on
  // navigation fires the event for us.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 14);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="w-full px-2.5 pt-2.5 sm:px-4 sm:pt-3 lg:px-6"
      >
        <nav
          aria-label="Primary"
          className={cn(
            "sheen-top relative mx-auto flex max-w-7xl items-center justify-between rounded-2xl border px-3 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:rounded-full sm:px-4",
            scrolled
              ? "h-14 border-paper/15 bg-ink-950/78 shadow-panel backdrop-blur-xl lg:h-16"
              : "h-16 border-paper/10 bg-ink-950/30 shadow-none backdrop-blur-md lg:h-[72px]"
          )}
        >
          {/* lit inner hairline — glows along the capsule's base once it floats over content */}
          <span
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute inset-x-8 bottom-0 h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent transition-opacity duration-700",
              scrolled ? "opacity-100" : "opacity-0"
            )}
          />
          {/* corner spotlight — a faint gold bloom anchored top-left inside the capsule */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-10 left-10 h-24 w-56 rounded-full bg-gold-400/10 blur-2xl"
          />

          {/* Wordmark — official crest badge */}
          <Link
            href="/"
            className="group flex shrink-0 items-center gap-3 pl-1"
            aria-label="ERSA home"
          >
            <span className="relative size-9 overflow-hidden rounded-full ring-1 ring-gold-500/50 shadow-[0_4px_14px_-4px_rgba(0,0,0,0.6),0_0_18px_-6px_var(--color-gold-400)] transition-transform duration-500 group-hover:scale-105 lg:size-10">
              <Image
                src="/images/crest-circle.webp"
                alt=""
                fill
                sizes="40px"
                className="object-cover"
              />
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-display text-xl font-semibold tracking-wide text-paper">
                ERSA
              </span>
              <span className="hidden text-[0.55rem] uppercase tracking-[0.3em] text-paper/50 lg:hidden xl:block">
                School of the Arts
              </span>
            </span>
          </Link>

          {/* Desktop page links — glass pill rails inside the capsule */}
          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_PAGES.map((page) => {
              const isActive = pathname === page.path;
              return (
                <li key={page.path}>
                  <Link
                    href={page.path}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "group relative inline-flex items-center rounded-full px-3 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.18em] transition-colors xl:px-3.5",
                      isActive ? "text-gold-300" : "text-paper/70 hover:text-paper"
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-pill"
                        transition={{ type: "spring", bounce: 0.22, duration: 0.6 }}
                        className="absolute inset-0 -z-10 rounded-full bg-gold-400/10 ring-1 ring-gold-400/30 shadow-[inset_0_1px_0_rgba(212,175,55,0.18),0_4px_16px_-8px_rgba(212,175,55,0.5)]"
                      />
                    )}
                    {page.short}
                    {isActive ? (
                      <span
                        aria-hidden="true"
                        className="ml-2 inline-block size-1 rounded-full bg-gold-400 shadow-[0_0_8px_rgba(212,175,55,0.9)]"
                      />
                    ) : (
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-3.5 -bottom-px h-px origin-left scale-x-0 bg-gold-400/70 transition-transform duration-400 group-hover:scale-x-100"
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2 pr-0.5 sm:gap-2.5">
            <PaletteTrigger />
            <Link
              href="/admissions"
              className={cn(
                "hidden shrink-0 items-center gap-2 whitespace-nowrap rounded-full px-4 py-2.5 text-[0.7rem] font-bold uppercase tracking-[0.18em] shadow-[0_6px_18px_-6px_var(--color-gold-500)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glow sm:inline-flex",
                pathname === "/admissions"
                  ? "bg-gold-300 text-ink-950"
                  : "bg-gold-500 text-ink-950 hover:bg-gold-300"
              )}
            >
              Apply for 2027
            </Link>
            <button
              onClick={() => setOpen(true)}
              className="grid size-10 place-items-center rounded-full border border-paper/15 bg-ink-900/60 text-paper shadow-card transition-colors hover:border-gold-400/60 hover:text-gold-300 lg:hidden"
              aria-label="Open menu"
              aria-expanded={open}
            >
              <Menu className="size-5" />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile menu — full-page editorial index */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[100] flex flex-col bg-ink-950/98 backdrop-blur-2xl"
          >
            <div className="flex items-center justify-between px-5 h-16">
              <span className="flex items-center gap-2.5">
                <span className="relative size-9 overflow-hidden rounded-full ring-1 ring-gold-500/50">
                  <Image
                    src="/images/crest-circle.webp"
                    alt=""
                    fill
                    sizes="36px"
                    className="object-cover"
                  />
                </span>
                <span className="font-display text-xl font-semibold text-paper">ERSA</span>
              </span>
              <button
                onClick={() => setOpen(false)}
                className="grid size-10 place-items-center rounded-xl border border-paper/15 text-paper transition-colors hover:border-gold-400/60 hover:text-gold-300"
                aria-label="Close menu"
              >
                <X className="size-5" />
              </button>
            </div>
            <nav aria-label="Mobile" className="flex flex-1 flex-col justify-center px-8">
              <ul className="space-y-1">
                {NAV_PAGES.map((page, i) => {
                  const isActive = pathname === page.path;
                  return (
                    <motion.li
                      key={page.path}
                      initial={{ opacity: 0, x: -32 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -16 }}
                      transition={{ delay: 0.06 * i, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <Link
                        href={page.path}
                        onClick={() => setOpen(false)}
                        className="group flex items-baseline gap-4 py-3 border-b border-paper/8"
                      >
                        <span
                          className={cn(
                            "font-mono text-xs",
                            isActive ? "text-gold-300" : "text-gold-500"
                          )}
                        >
                          0{i + 1}
                        </span>
                        <span
                          className={cn(
                            "font-display text-3xl font-medium transition-colors",
                            isActive
                              ? "text-gold-300"
                              : "text-paper group-hover:text-gold-300"
                          )}
                        >
                          {page.label}
                          {isActive && (
                            <span className="ml-3 inline-block size-1.5 rounded-full bg-gold-400 align-middle shadow-[0_0_10px_rgba(212,175,55,0.9)]" />
                          )}
                        </span>
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-8 flex flex-wrap items-center gap-4"
              >
                <Link
                  href="/admissions"
                  onClick={() => setOpen(false)}
                  className="rounded-full bg-gold-500 px-6 py-3.5 text-[0.7rem] font-bold uppercase tracking-[0.2em] text-ink-950 shadow-[0_8px_24px_-8px_var(--color-gold-500)]"
                >
                  Apply for 2027
                </Link>
                <p className="text-xs uppercase tracking-[0.25em] text-paper/40">
                  1 Jones Street · Daveyton
                </p>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
