import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin, Music2, Palette } from "lucide-react";
import { PageHero, PageBand } from "@/components/site/page-hero";
import { SectionHeading } from "@/components/site/proof-bar";
import { Reveal } from "@/components/motion/reveal";
import { StoryTimeline } from "./story-timeline";
import { PurposeVision } from "./purpose-vision";
import { ValuesGrid } from "./values-grid";
import { Governance } from "./governance";
import { Campus } from "./campus";
import { pageByPath } from "@/lib/navigation";
import { MottoBand } from "@/components/site/brand-band";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "The school behind the spotlight: ERSA's recorded history from the 1999 archive entry to the 2019 GDE School of Specialisation launch — mission, values, governance and campus in Daveyton, Benoni.",
};

const CONTINUE_LINKS = ["/programmes", "/gallery"];

/** At-a-glance facts — every item traced to the school profile or existing site copy. */
const GLANCE_FACTS = [
  { label: "Address", value: "1 Jones Street, Daveyton / Putfontein, Benoni", icon: MapPin },
  { label: "Status", value: "Public GDE School of Specialisation in the Arts", icon: null },
  { label: "Entry", value: "Audition- or placement-test based", icon: null },
  { label: "Disciplines", value: "Five — from Visual Arts to Music", icon: Palette },
  { label: "Stage", value: "Festivals, exhibitions & showcases through the year", icon: Music2 },
];

export default function AboutPage() {
  return (
    <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
      <PageHero
        kicker="The school behind the spotlight"
        title="Talent has a home in Daveyton."
        accentWords={["home"]}
        lede="East Rand School of the Arts is a public Gauteng Department of Education School of Specialisation in the Arts — an ordinary school day wrapped around an extraordinary training, five disciplines deep."
        crumb="About"
        image="/images/brand/crest-atelier-dark.webp"
        imageAlt="The official ERSA crest in gold and green on a dark wooden atelier desk, beside the drum, theatrical masks, open book and painter's palette"
      >
        <div className="flex flex-wrap gap-2">
          {["Public school", "Since the 2019 GDE launch", "Five disciplines", "Daveyton · Benoni"].map(
            (chip) => (
              <span
                key={chip}
                className="rounded-full border border-paper/15 bg-ink-900/70 px-4 py-2 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-paper/60 shadow-card"
              >
                {chip}
              </span>
            )
          )}
        </div>
      </PageHero>

      <StoryTimeline />
      <PurposeVision />
      <ValuesGrid />
      <Governance />
      <Campus />

      {/* ── At a glance ─────────────────────────────────────────────── */}
      <PageBand tone="ink" ariaLabel="ERSA at a glance">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10">
          <SectionHeading
            kicker="ERSA at a glance"
            title="The facts, in one breath."
            accentWords={["facts"]}
            description="Everything a first-time visitor needs — every line traceable to the school's public profile."
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {GLANCE_FACTS.map((fact, i) => (
              <Reveal key={fact.label} delay={i * 0.06} className="h-full">
                <div className="h-full rounded-2xl border border-paper/10 bg-ink-900/60 p-5 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-400/40 hover:shadow-lift">
                  <p className="font-mono text-[0.6rem] font-semibold uppercase tracking-[0.26em] text-gold-500">
                    {fact.label}
                  </p>
                  <p className="mt-3 flex items-start gap-2 text-sm leading-relaxed text-paper/75">
                    {fact.icon && <fact.icon className="mt-0.5 size-4 shrink-0 text-gold-400" aria-hidden="true" />}
                    {fact.value}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </PageBand>

      {/* ── Crest & motto seal ─────────────────────────────────────── */}
      <MottoBand />

      {/* ── Continue band ───────────────────────────────────────────── */}
      <PageBand tone="ink" className="border-t border-paper/5" ariaLabel="Keep exploring the site">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-28 lg:px-10">
          <SectionHeading
            kicker="Keep turning the pages"
            title="See what the training makes."
            accentWords={["makes."]}
            description="Meet the five disciplines, or go straight to the work they produce — both pages are one step from here."
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
  );
}
