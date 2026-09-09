import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/site/proof-bar";
import { PageBand } from "@/components/site/page-hero";

type Milestone = {
  year: string;
  title: string;
  body: string;
  chips?: string[];
};

/**
 * Facts sourced from the ERSA comprehensive profile (sections 2, 4, 5, 7, 12):
 * - 1999: a historical secondary source (Stellenbosch ESAT entry), phrased as
 *   "records list…" — never an official founding claim.
 * - 27 August 2019: documented GDE launch of ERSA / NSA / Pro-Arte Alphen Park
 *   as Performing & Creative Arts Schools of Specialisation, hosted at ERSA.
 * - Today: five disciplines (current public positioning), 567 learners /
 *   45 teachers (directory listing) and the 98.86% NSC pass rate reported for
 *   the Class of 2025.
 */
const MILESTONES: Milestone[] = [
  {
    year: "1999",
    title: "A starting line in the records",
    body: "The University of Stellenbosch's ESAT records list a school of the arts in Benoni from 1999. It is a useful historical marker — not an official founding claim — and the school's own archive may one day refine it.",
  },
  {
    year: "27 August 2019",
    title: "The launch that made it official",
    body: "The Gauteng MEC for Education and Youth Development formally launched ERSA — together with the National School of the Arts and Pro-Arte Alphen Park — as Performing & Creative Arts Schools of Specialisation, at a joint function hosted at ERSA. The GDE's release described specialist facilities built around the focus areas, audition-based entry into a learner's chosen discipline, and after-hours tuition in dance, art, music and drama.",
  },
  {
    year: "Today",
    title: "The work behind the spotlight, daily",
    body: "Five disciplines — Visual Arts, Design, Dramatic Arts, Dance Studies and Music — train 567 learners inside the full public curriculum, supported by 45 dedicated teachers. The Class of 2025 closed the year on a 98.86% NSC pass rate.",
    chips: ["567 learners", "45 teachers", "98.86% NSC · Class of 2025"],
  },
];

export function StoryTimeline() {
  return (
    <PageBand tone="paper" ariaLabel="The story so far">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-28 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          {/* sticky editorial heading */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading
              dark
              kicker="The story so far"
              title="Three markers, told honestly."
              accentWords={["honestly."]}
              description="An archive entry, a provincial launch and a working school — this page keeps each marker at its recorded size."
            />
          </div>

          {/* gold-rail chronology */}
          <div className="ml-2 space-y-14 border-l-2 border-gold-500/30 pl-10 sm:ml-4 sm:pl-14">
            {MILESTONES.map((milestone, i) => (
              <Reveal key={milestone.year} delay={i * 0.08}>
                <article className="relative">
                  <span
                    aria-hidden="true"
                    className="absolute -left-[45px] top-2 size-3 rounded-full bg-gold-500 ring-4 ring-gold-500/15 sm:-left-[61px]"
                  />
                  <p className="font-mono text-xs font-semibold uppercase tracking-[0.3em] text-gold-700">
                    {milestone.year}
                  </p>
                  <h3 className="mt-3 font-display text-2xl font-medium text-ink-950 sm:text-3xl">
                    {milestone.title}
                  </h3>
                  <p className="mt-3 max-w-xl text-[0.95rem] leading-relaxed text-ink-800/75">
                    {milestone.body}
                  </p>
                  {milestone.chips && (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {milestone.chips.map((chip) => (
                        <span
                          key={chip}
                          className="rounded-full border border-ink-950/15 bg-paper px-4 py-2 font-mono text-[0.7rem] text-ink-800 shadow-card"
                        >
                          {chip}
                        </span>
                      ))}
                    </div>
                  )}
                </article>
              </Reveal>
            ))}

            <Reveal delay={0.1}>
              <p className="flex items-start gap-3 border-l-2 border-crimson-500 pl-4 text-xs leading-relaxed text-ink-800/60">
                Historical markers follow public records; the school&apos;s own archive
                may refine them.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </PageBand>
  );
}
