import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CalendarRange,
  Facebook,
  Instagram,
  Ticket,
} from "lucide-react";
import { PageBand, PageHero } from "@/components/site/page-hero";
import { Events } from "@/components/site/events";
import { SectionHeading } from "@/components/site/proof-bar";
import { CrestStrip } from "@/components/site/brand-band";
import { Reveal } from "@/components/motion/reveal";
import { pageByPath } from "@/lib/navigation";

export const metadata: Metadata = {
  title: "News & Events",
  description:
    "The ERSA notice board — festivals, auditions, exhibitions and school news, every claim sourced, with a subscribable .ics season calendar of every dated event.",
};

/* ------------------------------------------------------------------- */
/* "Never miss a date" — distribution channels, honestly described.     */
/* ------------------------------------------------------------------- */

const facebookUrl =
  "https://www.facebook.com/p/East-Rand-School-of-the-Arts-100054238431861/";
const instagramUrl = "https://www.instagram.com/ersamedia/?hl=en";
const quicketUrl =
  "https://www.quicket.co.za/organisers/85115-east-rand-school-of-the-arts";

const continueLinks = [
  pageByPath("/gallery"),
  pageByPath("/contact"),
].filter((p): p is NonNullable<typeof p> => Boolean(p));

export default function NewsPage() {
  return (
    <>
      <PageHero
        kicker="The notice board"
        title="The East Rand is the stage."
        accentWords={["stage."]}
        lede="Festivals, auditions, exhibitions and school news — every date a family needs, every claim sourced. The board is confirmed with the school office and stamped with a last-verified date."
        crumb="News & Events"
        image="/images/page-news.webp"
        imageAlt="Auditorium curtain opening onto warm stage light, programmes on the seats"
      />

      {/* The live notice board: category tabs, notice cards, detail
          dialogs, live countdown and the season-calendar ticket — the
          section carries its own ink band and fetches /api/events. */}
      <Events />

      {/* The crest in festival colour — official brand art */}
      <CrestStrip
        src="/images/brand/crest-kente-vibrant.webp"
        alt="The ERSA crest rendered in vibrant kente-inspired colour and stained-glass patterns, with a djembe, bronze theatrical masks and sheet music"
        kicker="The crest, in full colour"
        caption="Five disciplines on one shield — the school's emblem rendered in celebration colour."
      />

      {/* Distribution channels */}
      <PageBand
        tone="paper"
        id="never-miss"
        ariaLabel="Never miss a date"
        className="border-t border-ink-950/10"
      >
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-10 sm:py-28">
          <SectionHeading
            dark
            kicker="Never miss a date"
            title="Every date, where you already look."
            accentWords={["already"]}
            description="The notice board keeps itself honest — subscribe once and every dated event lands in the calendar, ticket wallet or feed you already use."
          />

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {/* Season calendar (.ics feed) */}
            <Reveal>
              <div className="group flex h-full flex-col rounded-2xl border border-ink-950/10 bg-paper p-6 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift">
                <div className="flex items-center justify-between">
                  <span className="grid size-11 place-items-center rounded-xl border border-ink-950/10 bg-paper-200 text-crimson-600 transition-colors duration-300 group-hover:border-gold-500/40 group-hover:bg-gold-500/10 group-hover:text-gold-600">
                    <CalendarRange className="size-5" strokeWidth={1.9} />
                  </span>
                  <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-ink-950/30">
                    .ics feed
                  </span>
                </div>
                <h3 className="mt-5 font-display text-xl font-medium text-ink-950">
                  Season calendar
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-800/65">
                  Subscribe to every dated event as one calendar feed — it
                  refreshes automatically and opens in Google Calendar, Apple
                  Calendar and Outlook.
                </p>
                <a
                  href="/api/calendar"
                  download="ersa-season.ics"
                  className="group/link mt-5 inline-flex items-center gap-2 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-ink-800/70 transition-colors duration-300 hover:text-crimson-600"
                >
                  Get the .ics feed
                  <ArrowRight className="size-3.5 transition-transform duration-300 group-hover/link:translate-x-1" />
                </a>
                <span
                  aria-hidden="true"
                  className="mt-4 block h-[2px] w-0 bg-gold-500 transition-all duration-500 group-hover:w-full"
                />
              </div>
            </Reveal>

            {/* Tickets on Quicket */}
            <Reveal delay={0.08}>
              <div className="group flex h-full flex-col rounded-2xl border border-ink-950/10 bg-paper p-6 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift">
                <div className="flex items-center justify-between">
                  <span className="grid size-11 place-items-center rounded-xl border border-ink-950/10 bg-paper-200 text-crimson-600 transition-colors duration-300 group-hover:border-gold-500/40 group-hover:bg-gold-500/10 group-hover:text-gold-600">
                    <Ticket className="size-5" strokeWidth={1.9} />
                  </span>
                  <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-ink-950/30">
                    Official
                  </span>
                </div>
                <h3 className="mt-5 font-display text-xl font-medium text-ink-950">
                  Tickets
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-800/65">
                  ERSA Festival ticketing runs on Quicket — the school&apos;s
                  organiser page lists every event currently on sale.
                </p>
                <a
                  href={quicketUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link mt-5 inline-flex items-center gap-2 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-ink-800/70 transition-colors duration-300 hover:text-crimson-600"
                >
                  Visit Quicket
                  <ArrowRight className="size-3.5 transition-transform duration-300 group-hover/link:translate-x-1" />
                </a>
                <span
                  aria-hidden="true"
                  className="mt-4 block h-[2px] w-0 bg-gold-500 transition-all duration-500 group-hover:w-full"
                />
              </div>
            </Reveal>

            {/* Social channels */}
            <Reveal delay={0.16}>
              <div className="group flex h-full flex-col rounded-2xl border border-ink-950/10 bg-paper p-6 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift">
                <div className="flex items-center justify-between">
                  <span className="grid size-11 place-items-center rounded-xl border border-ink-950/10 bg-paper-200 text-crimson-600 transition-colors duration-300 group-hover:border-gold-500/40 group-hover:bg-gold-500/10 group-hover:text-gold-600">
                    <Instagram className="size-5" strokeWidth={1.9} />
                  </span>
                  <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-ink-950/30">
                    Social
                  </span>
                </div>
                <h3 className="mt-5 font-display text-xl font-medium text-ink-950">
                  Follow the school
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-800/65">
                  Rehearsal and festival coverage is posted on the school&apos;s
                  official pages — results, photos and thank-yous included.
                </p>
                <div className="mt-5 flex flex-wrap gap-2.5">
                  <a
                    href={facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-ink-950/20 px-4 py-2 text-[0.66rem] font-bold uppercase tracking-[0.18em] text-ink-800 transition-all duration-300 hover:-translate-y-0.5 hover:border-ink-950/60 hover:shadow-card"
                  >
                    <Facebook className="size-3.5" aria-hidden="true" />
                    Facebook
                  </a>
                  <a
                    href={instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-ink-950/20 px-4 py-2 text-[0.66rem] font-bold uppercase tracking-[0.18em] text-ink-800 transition-all duration-300 hover:-translate-y-0.5 hover:border-ink-950/60 hover:shadow-card"
                  >
                    <Instagram className="size-3.5" aria-hidden="true" />
                    Instagram
                  </a>
                </div>
                <span
                  aria-hidden="true"
                  className="mt-4 block h-[2px] w-0 bg-gold-500 transition-all duration-500 group-hover:w-full"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </PageBand>

      {/* Continue reading */}
      <ContinueBand links={continueLinks} />
    </>
  );
}

/* --------------------------------------------------------------- */
/* Shared page ending — "keep turning the pages" (news edition).    */
/* --------------------------------------------------------------- */

function ContinueBand({
  links,
}: {
  links: { path: string; label: string; short: string; description: string }[];
}) {
  return (
    <PageBand
      tone="ink"
      className="border-t border-paper/10"
      ariaLabel="Continue exploring the site"
    >
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 sm:py-24">
        <Reveal>
          <h2 className="sr-only">Continue exploring</h2>
          <p aria-hidden="true" className="kicker text-gold-400">
            <span className="h-px w-9 bg-gold-400" />
            Keep turning the pages
          </p>
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {links.map((p, i) => (
            <Reveal key={p.path} delay={i * 0.1}>
              <Link
                href={p.path}
                className="group flex h-full items-start justify-between gap-6 rounded-2xl border border-paper/10 bg-ink-900/60 p-6 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-400/50 hover:shadow-lift"
              >
                <span className="min-w-0">
                  <span className="block font-mono text-[0.6rem] uppercase tracking-[0.26em] text-gold-500/80">
                    {p.short}
                  </span>
                  <span className="mt-2 block font-display text-2xl font-medium text-paper">
                    {p.label}
                  </span>
                  <span className="mt-2 block text-sm leading-relaxed text-paper/55">
                    {p.description}
                  </span>
                </span>
                <ArrowRight className="mt-1 size-5 shrink-0 text-gold-400 transition-transform duration-300 group-hover:translate-x-1.5" />
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </PageBand>
  );
}
