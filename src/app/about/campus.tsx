import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/site/proof-bar";
import { PageBand } from "@/components/site/page-hero";

/**
 * Real school photography (profile §11): facilities are described only as far
 * as public records go — a room-by-room inventory is still to be collected
 * from the school. Photos show the school's own learners and spaces.
 */
export function Campus() {
  return (
    <PageBand tone="paper" ariaLabel="The campus as a creative ecosystem">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-28 lg:px-10">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              dark
              kicker="The campus as a creative ecosystem"
              title="Rooms built for the work."
              accentWords={["work."]}
            />
            <Reveal delay={0.15}>
              <p className="mt-6 max-w-xl text-[0.95rem] leading-relaxed text-ink-800/75">
                The GDE&apos;s 2019 launch release recorded that these Schools of
                Specialisation were designed around facilities built to accommodate
                their different focus areas — and public coverage of ERSA since then
                points to dance, drama, design, music, and visual and applied-arts
                activity across the campus.
              </p>
            </Reveal>
            <Reveal delay={0.25}>
              <p className="mt-4 max-w-xl text-[0.95rem] leading-relaxed text-ink-800/75">
                A room-by-room inventory — studios, rehearsal rooms, instruments,
                stage, gallery, design labs — is still to be collected from the
                school itself. Until then, this page shows the school through its
                own learners and spaces.
              </p>
            </Reveal>
          </div>

          {/* layered real-photo cluster — one frame settles straight on hover */}
          <div className="relative">
            <Reveal>
              <div className="photo-frame relative aspect-[4/3] w-full">
                <Image
                  src="/images/real/learners-entrance.jpg"
                  alt="ERSA learners at the school entrance on a school day"
                  fill
                  sizes="(max-width: 1024px) 100vw, 560px"
                  className="object-cover"
                />
              </div>
            </Reveal>
            <Reveal
              delay={0.15}
              className="relative z-10 ml-auto -mt-10 w-[58%] max-w-[300px] sm:-mt-16"
            >
              <div className="photo-frame rotate-2 border-4 border-paper transition-transform duration-500 hover:rotate-0">
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src="/images/real/learners-stairs.jpg"
                    alt="Two learners on the school's front steps"
                    fill
                    sizes="(max-width: 1024px) 50vw, 300px"
                    className="object-cover"
                  />
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.25}>
              <p className="mt-6 text-right font-mono text-[0.65rem] uppercase tracking-[0.22em] text-ink-800/50">
                Photography — the school&apos;s own learners and spaces
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </PageBand>
  );
}
