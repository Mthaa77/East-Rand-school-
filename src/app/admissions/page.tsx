import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ClipboardCheck,
  ExternalLink,
  Footprints,
  Globe,
  Info,
  MessagesSquare,
  Mic2,
  Music2,
  Palette,
  PenTool,
  Phone,
} from "lucide-react";
import { PageBand, PageHero } from "@/components/site/page-hero";
import { Admissions } from "@/components/site/admissions";
import { SectionHeading } from "@/components/site/proof-bar";
import { MottoBand } from "@/components/site/brand-band";
import { Reveal } from "@/components/motion/reveal";
import { pageByPath } from "@/lib/navigation";

export const metadata: Metadata = {
  title: "Admissions",
  description:
    "ERSA admits Grade 8 artists by audition or placement test in your chosen discipline. Apply on the GDE online portal, then book your audition with the school office.",
};

/* ------------------------------------------------------------------ */
/* The audition, studio by studio — restated from each discipline's    */
/* published audition brief (see src/components/site/disciplines.tsx). */
/* ------------------------------------------------------------------ */

const studioAuditions = [
  {
    title: "Visual Arts",
    icon: Palette,
    text: "A short practical drawing assessment and a look at anything you have made and are proud of — appetite matters more than polish.",
  },
  {
    title: "Design",
    icon: PenTool,
    text: "A short, brief-based creative exercise and a conversation about how you think — ideas are what the panel watches for, not expensive tools.",
  },
  {
    title: "Dramatic Arts",
    icon: Mic2,
    text: "A short prepared piece — a poem, monologue or story — plus improvised exercises in a small group. Nerves are welcome; they prove you care.",
  },
  {
    title: "Dance Studies",
    icon: Footprints,
    text: "A movement class and a short solo, or your best attempt at one — no years of studio experience required; discipline and rhythm are the entry fee.",
  },
  {
    title: "Music",
    icon: Music2,
    text: "Play or sing a short piece — any instrument, any level — plus a short aptitude conversation. Potential is trained here; it is not required on day one.",
  },
];

/* --------------------------------------- */
/* Key facts for 2027 — honest and sourced */
/* --------------------------------------- */

const keyFacts = [
  {
    icon: Globe,
    kicker: "The application",
    title: "Apply on the GDE portal",
    text: "Grade 8 applications run on the Gauteng Department of Education's online admissions portal — the authoritative place for the application itself.",
    action: {
      href: "https://www.gdeadmissions.gov.za/",
      label: "gdeadmissions.gov.za",
      external: true,
    },
  },
  {
    icon: Phone,
    kicker: "The audition",
    title: "Book your placement test",
    text: "ERSA admits through an audition or placement test in your chosen discipline. Parents are asked to contact the school for the placement-test date and time.",
    action: {
      href: "tel:+270100071186",
      label: "010 007 1186",
      external: false,
    },
  },
  {
    icon: ClipboardCheck,
    kicker: "The preparation",
    title: "Know what to prepare",
    text: "Every discipline sets its own audition — from a drawing assessment to a short solo. The studio briefs above are the honest shape of what is asked.",
    action: {
      href: "#studios",
      label: "The studio briefs",
      external: false,
    },
  },
  {
    icon: MessagesSquare,
    kicker: "The questions",
    title: "Ask the office",
    text: "Dates, documents, transport, anything unresolved — the enquiry form above reaches the admissions team directly, and it is the fastest route in.",
    action: {
      href: "#admissions",
      label: "Send an enquiry",
      external: false,
    },
  },
];

const continueLinks = [
  pageByPath("/programmes"),
  pageByPath("/contact"),
].filter((p): p is NonNullable<typeof p> => Boolean(p));

export default function AdmissionsPage() {
  return (
    <>
      <PageHero
        kicker="Admissions 2027"
        title="Your audition is your application."
        accentWords={["audition", "application"]}
        lede="ERSA admits through an audition or placement test in your chosen discipline. The GDE online portal handles the application — the school handles the art."
        crumb="Admissions"
        image="/images/page-admissions.webp"
        imageAlt="A learner auditioning under a single golden spotlight before adjudicators"
      />

      {/* The full admissions journey: six-step checklist, real front-steps
          photo, enquiry form and FAQ — the section carries its own band. */}
      <Admissions />

      {/* Audition briefs, studio by studio */}
      <PageBand
        tone="paper"
        id="studios"
        ariaLabel="The audition, studio by studio"
        className="border-t border-ink-950/10"
      >
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-10 sm:py-28">
          <SectionHeading
            dark
            kicker="Studio by studio"
            title="The audition, studio by studio."
            accentWords={["studio"]}
            description="Each discipline runs its own audition or placement test. Here is the honest shape of what every studio asks for — the office confirms the details when you book."
          />

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {studioAuditions.map((s, i) => {
              const Icon = s.icon;
              return (
                <Reveal key={s.title} delay={i * 0.06}>
                  <div className="group flex h-full flex-col rounded-2xl border border-ink-950/10 bg-paper p-6 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift">
                    <div className="flex items-center justify-between">
                      <span className="grid size-11 place-items-center rounded-xl border border-ink-950/10 bg-paper-200 text-crimson-600 transition-colors duration-300 group-hover:border-gold-500/40 group-hover:bg-gold-500/10 group-hover:text-gold-600">
                        <Icon className="size-5" strokeWidth={1.9} />
                      </span>
                      <span className="font-mono text-xs text-ink-950/25">
                        0{i + 1}
                      </span>
                    </div>
                    <h3 className="mt-5 font-display text-xl font-medium text-ink-950">
                      {s.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-800/65">
                      {s.text}
                    </p>
                    <Link
                      href="/programmes"
                      className="group/link mt-5 inline-flex items-center gap-2 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-ink-800/70 transition-colors duration-300 hover:text-crimson-600"
                    >
                      See the studio
                      <ArrowRight className="size-3.5 transition-transform duration-300 group-hover/link:translate-x-1" />
                    </Link>
                    <span
                      aria-hidden="true"
                      className="mt-4 block h-[2px] w-0 bg-gold-500 transition-all duration-500 group-hover:w-full"
                    />
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </PageBand>

      {/* Key facts for 2027 */}
      <PageBand tone="ink" ariaLabel="Key facts for 2027">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-10 sm:py-28">
          <SectionHeading
            kicker="Key facts for 2027"
            title="Four things to know."
            accentWords={["know."]}
            description="The application lives on the GDE portal; the audition lives at the school. Everything else follows from those two doors."
          />

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {keyFacts.map((f, i) => {
              const Icon = f.icon;
              return (
                <Reveal key={f.title} delay={i * 0.08}>
                  <div className="group flex h-full flex-col rounded-2xl border border-paper/10 bg-ink-900/60 p-6 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-400/50 hover:shadow-lift">
                    <div className="flex items-center justify-between">
                      <span className="grid size-11 place-items-center rounded-xl border border-gold-500/25 bg-gold-500/10 text-gold-300 transition-colors duration-300 group-hover:border-gold-400/60 group-hover:bg-gold-500/15">
                        <Icon className="size-5" strokeWidth={1.9} />
                      </span>
                      <span className="font-mono text-xs text-paper/25">
                        0{i + 1}
                      </span>
                    </div>
                    <p className="mt-5 text-[0.62rem] font-bold uppercase tracking-[0.24em] text-gold-500/90">
                      {f.kicker}
                    </p>
                    <h3 className="mt-2 font-display text-xl font-medium text-paper">
                      {f.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-paper/55">
                      {f.text}
                    </p>
                    {f.action.external ? (
                      <a
                        href={f.action.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-5 inline-flex items-center gap-2 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-gold-300 transition-colors duration-300 hover:text-gold-200"
                      >
                        {f.action.label}
                        <ExternalLink className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>
                    ) : (
                      <a
                        href={f.action.href}
                        className="mt-5 inline-flex items-center gap-2 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-gold-300 transition-colors duration-300 hover:text-gold-200"
                      >
                        {f.action.label}
                        <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                      </a>
                    )}
                  </div>
                </Reveal>
              );
            })}
          </div>

          {/* Honesty note — the dates live on the portals, not here */}
          <Reveal delay={0.15}>
            <p className="mt-10 flex items-start gap-3 border-t border-paper/10 pt-6 text-xs leading-relaxed text-paper/45">
              <Info className="mt-0.5 size-4 shrink-0 text-gold-500/80" aria-hidden="true" />
              Exact application-window dates for 2027 are published on the GDE
              portal and the school&apos;s official channels. Audition dates are
              confirmed with the school office when you book. This page
              describes the journey — the portals carry the dates.
            </p>
          </Reveal>
        </div>
      </PageBand>

      {/* The official crest and motto — the seal on the admissions page */}
      <MottoBand />

      {/* Continue reading */}
      <ContinueBand links={continueLinks} />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Shared page ending — "keep turning the pages" (admissions edition). */
/* ------------------------------------------------------------------ */

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
