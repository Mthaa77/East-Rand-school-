import { Compass, Telescope } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/site/proof-bar";
import { PageBand } from "@/components/site/page-hero";

/**
 * Mission / vision are the profile's PROPOSED statements (profile §5) — no
 * official wording has been published, so every card carries the attribution.
 */
const CARDS = [
  {
    icon: Compass,
    label: "Proposed mission",
    quote:
      "To provide an inclusive, disciplined and professionally oriented arts education that enables learners to discover their voice, build craft, achieve academically and progress into further study, employment, entrepreneurship and meaningful cultural participation.",
    note: "The working mission this site presents — official wording pending the school's approval.",
  },
  {
    icon: Telescope,
    label: "Proposed vision",
    quote:
      "To be the East Rand's most visible public pipeline for creative excellence — a school where talent is trained, character is formed and young artists leave ready to contribute to South Africa and the wider world.",
    note: "The working vision this site presents — official wording pending the school's approval.",
  },
] as const;

export function PurposeVision() {
  return (
    <PageBand tone="ink" ariaLabel="Why we exist">
      <div className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-28 lg:px-10">
        <SectionHeading
          kicker="Why we exist"
          title="A pipeline, not a pastime."
          accentWords={["pipeline,"]}
          description="ERSA is not an arts club bolted onto a school day. The working purpose this site presents: academically grounded, creatively confident young people, shaped through specialist training, practical making, performance, portfolio development and exposure to the real creative economy."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {CARDS.map((card, i) => (
            <Reveal key={card.label} delay={i * 0.12} className="h-full">
              <article className="group h-full rounded-3xl border border-paper/10 bg-ink-900/60 p-8 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-400/40 hover:shadow-lift sm:p-10">
                <div className="flex items-center gap-4">
                  <span className="rounded-xl bg-gold-500/10 p-3 text-gold-400 ring-1 ring-gold-500/25">
                    <card.icon className="size-5" aria-hidden="true" />
                  </span>
                  <p className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-gold-500">
                    {card.label}
                  </p>
                </div>
                <blockquote className="mt-7 font-display text-2xl font-medium leading-snug text-paper sm:text-[1.65rem]">
                  &ldquo;{card.quote}&rdquo;
                </blockquote>
                <p className="mt-7 border-t border-paper/10 pt-5 text-xs leading-relaxed text-paper/40">
                  {card.note}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </PageBand>
  );
}
