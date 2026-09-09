import {
  Building2,
  GraduationCap,
  Info,
  UserCog,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/site/proof-bar";
import { PageBand } from "@/components/site/page-hero";

/**
 * Governance structures per profile §10 — deliberately nameless: leadership
 * names, portraits and the principal's welcome are pending school confirmation.
 */
type Structure = { icon: LucideIcon; title: string; body: string };

const STRUCTURES: Structure[] = [
  {
    icon: UserCog,
    title: "Principal & management team",
    body: "Day-to-day leadership of the full academic curriculum and the specialist arts programme.",
  },
  {
    icon: GraduationCap,
    title: "Educators",
    body: "45 dedicated teachers carry both the national curriculum and the five disciplines — in class and after hours.",
  },
  {
    icon: Users,
    title: "School Governing Body",
    body: "Parent, staff and community representatives overseeing governance — the same structure every Gauteng public school answers to.",
  },
  {
    icon: Building2,
    title: "GDE district & province",
    body: "District and provincial officials providing oversight and support within the Gauteng public-education system.",
  },
];

export function Governance() {
  return (
    <PageBand tone="ink" ariaLabel="How the school runs">
      <div className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-28 lg:px-10">
        <SectionHeading
          kicker="How the school runs"
          title="A public school, publicly accountable."
          accentWords={["accountable."]}
          description="ERSA operates inside the Gauteng public-education system — represented, governed and supported as a school, not a private arts business."
        />

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STRUCTURES.map((structure, i) => (
            <Reveal key={structure.title} delay={i * 0.08} className="h-full">
              <article className="group h-full rounded-2xl border border-paper/10 bg-ink-900/60 p-6 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-400/40 hover:shadow-lift">
                <span className="inline-flex rounded-xl bg-paper/5 p-3 text-gold-400 ring-1 ring-paper/10">
                  <structure.icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-display text-lg font-medium leading-snug text-paper">
                  {structure.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-paper/55">
                  {structure.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <p className="mt-10 flex max-w-2xl items-start gap-3 border-l-2 border-gold-500/60 pl-4 text-xs leading-relaxed text-paper/50">
            <Info className="mt-0.5 size-4 shrink-0 text-gold-400" aria-hidden="true" />
            Approved leadership profiles and the principal&apos;s welcome will be
            published once the school confirms them — no names appear here ahead of
            that confirmation.
          </p>
        </Reveal>
      </div>
    </PageBand>
  );
}
