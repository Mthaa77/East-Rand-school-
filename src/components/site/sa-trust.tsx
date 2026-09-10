import { Landmark, GraduationCap, ScrollText, Scale, MapPin, ChevronRight, ShieldCheck, Hand, University } from "lucide-react";
import { Marquee } from "@/components/motion/marquee";
import { RevealHeading } from "@/components/site/reveal-heading";
import { cn } from "@/lib/utils";

/**
 * South African trust signals — the institutional facts that make ERSA
 * credible to local families: GDE registration, the specialisation status,
 * the NSC school-leaving qualification and the legal framework that governs
 * admissions. Everything here is a system fact of South African public
 * schooling or published ERSA data (98.86% · Class of 2025).
 */

/** Simplified flat South African flag (stroke-built Y and hoist triangle). */
export function SaFlag({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-block overflow-hidden rounded-[4px] ring-1 ring-ink-950/20 shadow-[0_1px_3px_oklch(0.135_0.008_65/0.3)]",
        className
      )}
    >
      <svg viewBox="0 0 36 24" className="block size-full">
        <rect width="36" height="12" fill="#E03C31" />
        <rect y="12" width="36" height="12" fill="#001489" />
        {/* white fimbriation of the Y */}
        <path
          d="M0 1.5 L15 12 L36 12 M0 22.5 L15 12"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="5.6"
        />
        {/* green Y */}
        <path
          d="M0 1.5 L15 12 L36 12 M0 22.5 L15 12"
          fill="none"
          stroke="#007749"
          strokeWidth="3.1"
        />
        {/* gold fimbriation of the hoist triangle */}
        <path
          d="M1.4 2.8 L11.6 12 L1.4 21.2"
          fill="none"
          stroke="#FFB81C"
          strokeWidth="5.4"
        />
        {/* black triangle */}
        <path
          d="M1.4 2.8 L11.6 12 L1.4 21.2"
          fill="none"
          stroke="#000000"
          strokeWidth="2.9"
        />
      </svg>
    </span>
  );
}

/** A thin flag-coloured hairline — used as a deliberate national accent. */
export function SaFlagRule({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn("block h-[3px] w-full", className)}
      style={{
        background:
          "linear-gradient(90deg, #E03C31 0 20%, #007749 20% 52%, #FFB81C 52% 64%, #001489 64% 100%)",
      }}
    />
  );
}

const credentials = [
  {
    icon: Landmark,
    title: "Gauteng Department of Education",
    text: "A registered public school inside the national system — not a private studio.",
    tag: "Registered public school",
  },
  {
    icon: GraduationCap,
    title: "School of Specialisation in the Arts",
    text: "One of Gauteng's art-focused public schools, admitting by audition.",
    tag: "Gauteng status",
  },
  {
    icon: ScrollText,
    title: "National Senior Certificate",
    text: "Learners graduate with the NSC — the country's standard matric qualification.",
    tag: "98.86% pass · 2025",
  },
  {
    icon: Scale,
    title: "South African Schools Act",
    text: "Admissions follow the GDE calendar and the legal framework every family can rely on.",
    tag: "Your rights protected",
  },
];

/** Geographic hierarchy — from the school gate to the nation. */
const geoPath = ["Daveyton", "Benoni", "Ekurhuleni", "Gauteng"];

/** South Africa's twelve official languages (SASL joined in 2023). */
const languages = [
  { text: "Sawubona", lang: "isiZulu" },
  { text: "Molo", lang: "isiXhosa" },
  { text: "Goeiedag", lang: "Afrikaans" },
  { text: "Thobela", lang: "Sepedi" },
  { text: "Dumela", lang: "Setswana" },
  { text: "Lumela", lang: "Sesotho" },
  { text: "Avuxeni", lang: "Xitsonga" },
  { text: "Sawubona", lang: "siSwati" },
  { text: "Ndaa", lang: "Tshivenda" },
  { text: "Lotjhani", lang: "isiNdebele" },
  { text: "Welcome", lang: "English" },
];

export function SaTrust() {
  return (
    <section
      aria-label="South African public education credentials"
      className="relative bg-paper-200 text-ink-950"
    >
      <SaFlagRule />
      {/* soft paper grain keeps the light band editorial */}
      <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
          {/* Left: statement + geography + public-record verification */}
          <div className="lg:col-span-4">
            <p className="kicker text-crimson-600">
              <SaFlag className="mr-1 size-5 rounded-[3px]" />
              Proudly South African education
            </p>
            <RevealHeading
              as="h2"
              className="heading-craft heading-depth-light mt-5 font-display text-display-md font-medium leading-tight text-ink-950"
            >
              A public school,{" "}
              <em className="font-light text-crimson-600">answerable</em> to
              its community.
            </RevealHeading>
            <p className="editorial mt-5 max-w-md text-ink-800/75">
              ERSA is part of the South African public education system — the
              same curriculum, the same matric certificate, the same
              admissions rights as every public school in the country. The
              arts specialisation is the difference; the accountability is
              the guarantee.
            </p>

            {/* From the school gate to the nation */}
            <nav aria-label="Where the school sits" className="mt-7">
              <p className="text-[0.6rem] font-bold uppercase tracking-[0.24em] text-ink-800/45">
                Where you&apos;ll find us
              </p>
              <ul className="mt-3 flex flex-wrap items-center gap-x-1.5 gap-y-2">
                <li className="flex items-center gap-1.5">
                  <MapPin className="size-3.5 text-crimson-600" aria-hidden="true" />
                  <span className="font-display text-base font-semibold text-ink-950">
                    Daveyton
                  </span>
                </li>
                {geoPath.slice(1).map((place) => (
                  <li key={place} className="flex items-center gap-1.5">
                    <ChevronRight className="size-3 text-ink-800/30" aria-hidden="true" />
                    <span className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-ink-800/60">
                      {place}
                    </span>
                  </li>
                ))}
                <li className="flex items-center gap-1.5">
                  <ChevronRight className="size-3 text-ink-800/30" aria-hidden="true" />
                  <SaFlag className="h-3 w-4.5" />
                  <span className="font-display text-base font-semibold text-crimson-600">
                    South Africa
                  </span>
                </li>
              </ul>
            </nav>

            {/* Public-record verification panel */}
            <div className="mt-7 rounded-xl border border-dashed border-ink-950/20 bg-paper p-4 shadow-card">
              <p className="flex items-center gap-2 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-ink-800/70">
                <ShieldCheck className="size-4 text-gold-700" aria-hidden="true" />
                Check us in the public record
              </p>
              <dl className="mt-3 space-y-1.5 font-mono text-[0.68rem] tracking-[0.04em] text-ink-800/75">
                <div className="flex items-baseline justify-between gap-3">
                  <dt className="text-ink-800/45">EMIS</dt>
                  <dd className="tabular">700312124</dd>
                </div>
                <div className="flex items-baseline justify-between gap-3">
                  <dt className="text-ink-800/45">Exam centre</dt>
                  <dd className="tabular">8312124</dd>
                </div>
                <div className="flex items-baseline justify-between gap-3">
                  <dt className="text-ink-800/45">GDE district</dt>
                  <dd>Ekurhuleni North</dd>
                </div>
              </dl>
              <p className="mt-3 border-t border-ink-950/10 pt-2.5 text-[0.62rem] leading-relaxed text-ink-800/45">
                Directory records, published for transparency — please confirm
                current details with the school office.
              </p>
            </div>
          </div>

          {/* Right: credential cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
            {credentials.map((c) => {
              const Icon = c.icon;
              return (
                <div
                  key={c.title}
                  className="sheen-top group relative flex h-full flex-col rounded-2xl border border-ink-950/10 bg-paper p-6 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-600/40 hover:shadow-lift"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-ink-950/10 bg-paper-200 text-ink-800 transition-colors duration-300 group-hover:border-gold-600/40 group-hover:text-gold-700">
                      <Icon className="size-5" strokeWidth={1.8} />
                    </span>
                    <span className="rounded-full border border-ink-950/10 bg-paper-200 px-3 py-1 font-mono text-[0.56rem] font-medium uppercase tracking-[0.12em] text-ink-800/70">
                      {c.tag}
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-lg font-medium leading-snug text-ink-950">
                    {c.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-800/65">
                    {c.text}
                  </p>
                </div>
              );
            })}
            {/* Tertiary pathway — wide card closes the grid */}
            <div className="sheen-top group relative flex h-full flex-col gap-4 rounded-2xl border border-ink-950/10 bg-ink-950 p-6 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift sm:col-span-2 sm:flex-row sm:items-center">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-paper/15 bg-ink-900 text-gold-400">
                <University className="size-5" strokeWidth={1.8} />
              </span>
              <div className="flex-1">
                <h3 className="font-display text-lg font-medium leading-snug text-paper">
                  Tertiary pathway — TUT memorandum
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-paper/60">
                  A signed MOU with Tshwane University of Technology opens
                  masterclasses, portfolio preparation and audition training
                  for ERSA learners.
                </p>
              </div>
              <span className="shrink-0 self-start rounded-full border border-paper/15 bg-ink-900 px-3 py-1 font-mono text-[0.56rem] font-medium uppercase tracking-[0.12em] text-gold-300/90 sm:self-center">
                Since 2024
              </span>
            </div>
            <p className="text-xs leading-relaxed text-ink-800/45 sm:col-span-2">
              Registry references are available from the school office on
              request · Content last verified September 2026.
            </p>
          </div>
        </div>
      </div>

      {/* Twelve languages, one welcome — the national accent as a moving band */}
      <div className="border-t border-ink-950/10 bg-paper py-9">
        <p className="mb-6 text-center text-[0.62rem] font-bold uppercase tracking-[0.32em] text-ink-800/45">
          One school · Twelve official languages
        </p>
        <div className="mask-fade-x">
          <Marquee speed="slow" pauseOnHover>
            {languages.map((g) => (
              <span key={g.lang} className="flex items-baseline gap-2.5 px-7">
                <span className="whitespace-nowrap font-display text-2xl font-medium text-ink-950 transition-colors duration-300 hover:text-gold-700 sm:text-3xl">
                  {g.text}
                </span>
                <span className="whitespace-nowrap font-mono text-[0.58rem] uppercase tracking-[0.16em] text-ink-800/40">
                  {g.lang}
                </span>
                <span
                  aria-hidden="true"
                  className="ml-5 size-1.5 self-center rounded-full bg-gold-600/50"
                />
              </span>
            ))}
            {/* The twelfth language is signed — SASL joined the canon in 2023 */}
            <span className="flex items-center gap-2.5 px-7">
              <Hand className="size-6 text-crimson-600" strokeWidth={1.8} aria-hidden="true" />
              <span className="whitespace-nowrap font-display text-2xl font-medium text-crimson-600 sm:text-3xl">
                Signed welcome
              </span>
              <span className="whitespace-nowrap font-mono text-[0.58rem] uppercase tracking-[0.16em] text-ink-800/40">
                SASL
              </span>
              <span
                aria-hidden="true"
                className="ml-5 size-1.5 self-center rounded-full bg-gold-600/50"
              />
            </span>
          </Marquee>
        </div>
        <p className="mx-auto mt-5 max-w-xl px-5 text-center text-xs leading-relaxed text-ink-800/50">
          Every South African child is welcome at this school — in every
          language our community speaks.
        </p>
      </div>
      <SaFlagRule className="opacity-60" />
    </section>
  );
}
