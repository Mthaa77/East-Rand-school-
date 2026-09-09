import {
  AlarmClock,
  Award,
  Briefcase,
  DoorOpen,
  ShieldCheck,
  Sparkles,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/site/proof-bar";
import { PageBand } from "@/components/site/page-hero";

/**
 * The seven values from profile §5 — inferred from the school's published
 * activities; the wording is the site's, pending leadership approval.
 */
type Value = { icon: LucideIcon; title: string; body: string };

const VALUES: Value[] = [
  {
    icon: Award,
    title: "Excellence",
    body: "Serious craft, academic progress and professional standards — in the studio and on the stage.",
  },
  {
    icon: AlarmClock,
    title: "Discipline",
    body: "Consistent practice, preparation and respect for the work.",
  },
  {
    icon: Sparkles,
    title: "Expression",
    body: "Confidence to explore identity, culture and original ideas.",
  },
  {
    icon: DoorOpen,
    title: "Opportunity",
    body: "Access to mentors, platforms, networks and career pathways.",
  },
  {
    icon: Briefcase,
    title: "Entrepreneurship",
    body: "Turning creative skill into sustainable work and value.",
  },
  {
    icon: Users,
    title: "Community",
    body: "Using the arts to connect, educate and strengthen Daveyton and the East Rand.",
  },
  {
    icon: ShieldCheck,
    title: "Integrity & care",
    body: "Safe, ethical and respectful learning environments.",
  },
];

export function ValuesGrid() {
  return (
    <PageBand tone="paper-deep" ariaLabel="What we stand for">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-28 lg:px-10">
        <SectionHeading
          dark
          kicker="What we stand for"
          title="Seven values behind the standard."
          accentWords={["standard."]}
          description="Drawn from what the school already does in public — classrooms, rehearsals, showcases and community work. The wording is this site's, awaiting leadership approval."
        />

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {VALUES.map((value, i) => (
            <Reveal
              key={value.title}
              delay={i * 0.06}
              className={
                i === VALUES.length - 1
                  ? "sm:col-span-2 lg:col-span-1 lg:col-start-2"
                  : undefined
              }
            >
              <article className="group relative h-full overflow-hidden rounded-2xl border border-ink-950/10 bg-paper p-6 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift sm:p-7">
                <span
                  aria-hidden="true"
                  className="absolute right-6 top-6 font-mono text-[0.65rem] text-ink-800/25"
                >
                  0{i + 1}
                </span>
                <span className="inline-flex rounded-xl bg-gold-500/15 p-2.5 text-gold-700 ring-1 ring-gold-600/20">
                  <value.icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-display text-xl font-medium text-ink-950">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-800/70">
                  {value.body}
                </p>
                <span
                  aria-hidden="true"
                  className="absolute bottom-0 left-0 h-[2px] w-0 bg-gold-500 transition-all duration-500 group-hover:w-full"
                />
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </PageBand>
  );
}
