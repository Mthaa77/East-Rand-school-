import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  AtSign,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Navigation,
  Phone,
} from "lucide-react";
import { PageBand, PageHero } from "@/components/site/page-hero";
import { ContactForm } from "@/components/site/contact-form";
import { SectionHeading } from "@/components/site/proof-bar";
import { CrestStrip } from "@/components/site/brand-band";
import { Reveal } from "@/components/motion/reveal";
import { pageByPath } from "@/lib/navigation";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Call 010 007 1186, email admin@ersa.co.za or visit 1 Jones Street, Daveyton, Benoni. Admissions questions, media requests and the school enquiry form.",
};

const facebookUrl =
  "https://www.facebook.com/p/East-Rand-School-of-the-Arts-100054238431861/";
const instagramUrl = "https://www.instagram.com/ersamedia/?hl=en";
const mapsUrl =
  "https://www.google.com/maps/search/?api=1&query=East+Rand+School+of+the+Arts+Benoni";

/* --------------------------------------------------------- */
/* Reach us directly — four doors to the front desk.         */
/* --------------------------------------------------------- */

const beforeYouCall = [
  {
    href: "/admissions",
    label: "Admissions questions",
    desc: "Auditions, the GDE portal and 2027 entry",
  },
  {
    href: "/news",
    label: "Dates",
    desc: "Festivals, auditions and the season calendar",
  },
  {
    href: "/programmes",
    label: "The five disciplines",
    desc: "What each studio teaches and auditions for",
  },
];

const continueLinks = [
  pageByPath("/about"),
  pageByPath("/admissions"),
].filter((p): p is NonNullable<typeof p> => Boolean(p));

export default function ContactPage() {
  return (
    <>
      <PageHero
        kicker="The front desk"
        title="Come and see the work for yourself."
        accentWords={["yourself."]}
        lede="Phone, write or visit — 1 Jones Street, Daveyton. The office answers admissions questions, media requests and everything in between."
        crumb="Contact"
        image="/images/page-contact.webp"
        imageAlt="School building exterior at dusk with warm light in the windows"
      />

      {/* The letters on the gate — official brand art */}
      <CrestStrip
        src="/images/brand/crest-letters-banner.webp"
        alt="Golden E.R.S.A. letters above the school motto banner, on split wood and marble with the theatrical masks and drum"
        kicker="The letters on the gate"
        caption="1 Jones Street, Daveyton — the name on the crest, and the standard it carries: achievement through excellence."
      />

      {/* Reach us directly */}
      <PageBand tone="ink" ariaLabel="Reach us directly">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-10 sm:py-28">
          <SectionHeading
            kicker="Reach us directly"
            title="Four ways to the front desk."
            accentWords={["front"]}
            description="Every route below lands with the school office — the same team that handles admissions enquiries, media requests and everything in between."
          />

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {/* Address card */}
            <Reveal>
              <div className="group sheen-top flex h-full flex-col rounded-2xl border border-paper/10 bg-ink-900/60 p-6 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-400/50 hover:shadow-lift">
                <div className="flex items-center justify-between">
                  <span className="grid size-11 place-items-center rounded-xl border border-gold-500/25 bg-gold-500/10 text-gold-300">
                    <MapPin className="size-5" strokeWidth={1.9} />
                  </span>
                  <span className="font-mono text-xs text-paper/25">01</span>
                </div>
                <p className="mt-5 text-[0.62rem] font-bold uppercase tracking-[0.24em] text-gold-500/90">
                  Visit
                </p>
                <h3 className="mt-2 font-display text-xl font-medium leading-snug text-paper">
                  1 Jones Street, Daveyton
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-paper/55">
                  Daveyton / Putfontein,
                  <br />
                  Benoni, Gauteng
                </p>
                <p className="mt-auto pt-4 text-[0.68rem] leading-relaxed text-paper/35">
                  Best publicly available records — being verified with the
                  office.
                </p>
              </div>
            </Reveal>

            {/* Phone card */}
            <Reveal delay={0.08}>
              <div className="group sheen-top flex h-full flex-col rounded-2xl border border-paper/10 bg-ink-900/60 p-6 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-400/50 hover:shadow-lift">
                <div className="flex items-center justify-between">
                  <span className="grid size-11 place-items-center rounded-xl border border-gold-500/25 bg-gold-500/10 text-gold-300">
                    <Phone className="size-5" strokeWidth={1.9} />
                  </span>
                  <span className="font-mono text-xs text-paper/25">02</span>
                </div>
                <p className="mt-5 text-[0.62rem] font-bold uppercase tracking-[0.24em] text-gold-500/90">
                  Call
                </p>
                <a
                  href="tel:+270100071186"
                  className="mt-2 font-display text-xl font-medium text-paper underline-offset-4 transition-colors duration-300 hover:text-gold-300 hover:underline"
                >
                  010 007 1186
                </a>
                <p className="mt-2 text-sm leading-relaxed text-paper/55">
                  Admissions, media and general questions — the office responds
                  during school hours.
                </p>
                <p className="mt-auto pt-4 text-[0.68rem] leading-relaxed text-paper/35">
                  A direct human voice, not a switchboard.
                </p>
              </div>
            </Reveal>

            {/* Email card */}
            <Reveal delay={0.16}>
              <div className="group sheen-top flex h-full flex-col rounded-2xl border border-paper/10 bg-ink-900/60 p-6 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-400/50 hover:shadow-lift">
                <div className="flex items-center justify-between">
                  <span className="grid size-11 place-items-center rounded-xl border border-gold-500/25 bg-gold-500/10 text-gold-300">
                    <Mail className="size-5" strokeWidth={1.9} />
                  </span>
                  <span className="font-mono text-xs text-paper/25">03</span>
                </div>
                <p className="mt-5 text-[0.62rem] font-bold uppercase tracking-[0.24em] text-gold-500/90">
                  Write
                </p>
                <a
                  href="mailto:admin@ersa.co.za"
                  className="mt-2 break-words font-display text-xl font-medium text-paper underline-offset-4 transition-colors duration-300 hover:text-gold-300 hover:underline"
                >
                  admin@ersa.co.za
                </a>
                <p className="mt-2 text-sm leading-relaxed text-paper/55">
                  Documents and formal enquiries — the paper trail starts here.
                </p>
                <p className="mt-auto pt-4 text-[0.68rem] leading-relaxed text-paper/35">
                  Attach certified copies, never originals.
                </p>
              </div>
            </Reveal>

            {/* Socials card */}
            <Reveal delay={0.24}>
              <div className="group sheen-top flex h-full flex-col rounded-2xl border border-paper/10 bg-ink-900/60 p-6 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-400/50 hover:shadow-lift">
                <div className="flex items-center justify-between">
                  <span className="grid size-11 place-items-center rounded-xl border border-gold-500/25 bg-gold-500/10 text-gold-300">
                    <AtSign className="size-5" strokeWidth={1.9} />
                  </span>
                  <span className="font-mono text-xs text-paper/25">04</span>
                </div>
                <p className="mt-5 text-[0.62rem] font-bold uppercase tracking-[0.24em] text-gold-500/90">
                  Follow
                </p>
                <h3 className="mt-2 font-display text-xl font-medium text-paper">
                  The school online
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-paper/55">
                  Rehearsal and festival coverage, posted by the school itself.
                </p>
                <div className="mt-auto flex flex-wrap gap-2.5 pt-4">
                  <a
                    href={facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="East Rand School of the Arts on Facebook"
                    className="inline-flex items-center gap-2 rounded-full border border-paper/20 px-4 py-2 text-[0.66rem] font-bold uppercase tracking-[0.18em] text-paper/80 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-400/70 hover:text-gold-300 hover:shadow-card"
                  >
                    <Facebook className="size-3.5" aria-hidden="true" />
                    Facebook
                  </a>
                  <a
                    href={instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="East Rand School of the Arts on Instagram"
                    className="inline-flex items-center gap-2 rounded-full border border-paper/20 px-4 py-2 text-[0.66rem] font-bold uppercase tracking-[0.18em] text-paper/80 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-400/70 hover:text-gold-300 hover:shadow-card"
                  >
                    <Instagram className="size-3.5" aria-hidden="true" />
                    Instagram
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </PageBand>

      {/* Write or visit — form + practical info */}
      <PageBand
        tone="paper"
        ariaLabel="Enquiry form and practical information"
        className="border-t border-ink-950/10"
      >
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-10 sm:py-28">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            {/* Left — the enquiry form on an ink card */}
            <div className="lg:col-span-7">
              <Reveal>
                <div className="rounded-3xl bg-ink-950 p-4 shadow-lift ring-1 ring-ink-950/50 sm:p-6 grain">
                  <div className="px-2 pt-2 sm:px-3">
                    <p className="kicker text-gold-400">
                      <span className="h-px w-9 bg-gold-400" />
                      The enquiry form
                    </p>
                    <h3 className="mt-3 font-display text-2xl font-medium text-paper sm:text-3xl">
                      Write to the school.
                    </h3>
                    <p className="mt-2 max-w-lg text-sm leading-relaxed text-paper/55">
                      The form reaches the school office directly — admissions
                      questions, media requests and partnerships all welcome.
                    </p>
                  </div>
                  <div className="mt-5">
                    <ContactForm />
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right — practical info, stacked */}
            <div className="flex flex-col gap-5 lg:col-span-5">
              {/* Before you call */}
              <Reveal delay={0.1}>
                <div className="rounded-2xl border border-ink-950/15 bg-paper p-6 shadow-card">
                  <h3 className="font-display text-xl font-medium text-ink-950">
                    Before you call
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-800/60">
                    Many answers are already on the site — start here.
                  </p>
                  <div className="mt-4 space-y-2.5">
                    {beforeYouCall.map((q) => (
                      <Link
                        key={q.href}
                        href={q.href}
                        className="group flex items-center justify-between gap-3 rounded-xl border border-ink-950/15 bg-paper px-4 py-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-ink-950/45 hover:shadow-card"
                      >
                        <span className="min-w-0">
                          <span className="block text-sm font-semibold text-ink-950">
                            {q.label}
                          </span>
                          <span className="mt-0.5 block text-xs text-ink-800/55">
                            {q.desc}
                          </span>
                        </span>
                        <ArrowRight className="size-4 shrink-0 text-ink-950/35 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-crimson-600" />
                      </Link>
                    ))}
                  </div>
                </div>
              </Reveal>

              {/* Finding us */}
              <Reveal delay={0.18}>
                <div className="rounded-2xl border border-ink-950/15 bg-paper p-6 shadow-card">
                  <h3 className="font-display text-xl font-medium text-ink-950">
                    Finding us
                  </h3>
                  <p className="mt-2 flex items-start gap-2.5 text-sm leading-relaxed text-ink-800/65">
                    <MapPin
                      className="mt-0.5 size-4 shrink-0 text-crimson-600"
                      aria-hidden="true"
                    />
                    1 Jones Street, Daveyton / Putfontein, Benoni, Gauteng
                  </p>
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener"
                    className="group mt-4 inline-flex items-center gap-2 rounded-full border border-ink-950/25 px-5 py-2.5 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-ink-950 transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink-950 hover:text-paper hover:shadow-lift"
                  >
                    <Navigation className="size-3.5 transition-transform duration-300 group-hover:rotate-12" />
                    Open in Google Maps
                  </a>
                  <p className="mt-3 text-[0.68rem] leading-relaxed text-ink-800/45">
                    The official Maps pin is pending school confirmation — the
                    link searches the school by name.
                  </p>
                </div>
              </Reveal>

              {/* Visiting the campus */}
              <Reveal delay={0.26}>
                <div className="rounded-2xl border border-ink-950/15 bg-paper p-6 shadow-card">
                  <h3 className="font-display text-xl font-medium text-ink-950">
                    Visiting the campus
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-800/65">
                    Visitors are welcome by appointment during school terms.
                    Through the year the campus also hosts festivals,
                    exhibitions and auditions — the notice board carries
                    what&apos;s next.
                  </p>
                  <Link
                    href="/news"
                    className="group/link mt-4 inline-flex items-center gap-2 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-ink-800/70 transition-colors duration-300 hover:text-crimson-600"
                  >
                    Open the notice board
                    <ArrowRight className="size-3.5 transition-transform duration-300 group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </PageBand>

      {/* Continue reading */}
      <ContinueBand links={continueLinks} />
    </>
  );
}

/* ------------------------------------------------------------ */
/* Shared page ending — "keep turning the pages" (contact end).  */
/* ------------------------------------------------------------ */

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
