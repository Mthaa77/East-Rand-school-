import { Landmark, GraduationCap, ScrollText, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { RevealHeading } from "@/components/site/reveal-heading";
import { SaFlag } from "@/components/site/sa-trust";

/**
 * The GDE framework band — one honest screen-deep explanation of what
 * "School of Specialisation" legally means in Gauteng, for families who
 * are comparing schools. Facts sourced from the GDE's own publications:
 * the 2019 provincial launch of the arts SOS schools and the department's
 * admissions guidance (placement by audition/test within the GDE process).
 */
const facts = [
  {
    icon: Landmark,
    title: "Public since 1999",
    text: "Founded in 1999, when the RDP named arts and culture as core to developing the country — and relaunched by the Gauteng MEC on 27 August 2019 as an arts School of Specialisation, alongside the National School of the Arts and Pro-Arte Alphen Park.",
    note: "Research dossier · GDE launch, 27 Aug 2019",
  },
  {
    icon: GraduationCap,
    title: "Entry by audition",
    text: "Admission is audition-only: placement follows an audition or test in your art form, inside the official GDE admissions process. The art form you choose in Grade 8–9 carries through to Grade 12.",
    note: "GDE admissions guidance · audition-only entry",
  },
  {
    icon: ScrollText,
    title: "The full NSC",
    text: "The national curriculum and matric certificate — with specialist arts training woven into the school day, and after-hours tuition in dance, art, music and drama beyond it.",
    note: "National Senior Certificate · extended tuition",
  },
];

export function SosBand() {
  return (
    <section
      id="gde-framework"
      aria-label="What a School of Specialisation means"
      className="relative border-y border-paper/10 bg-ink-900 sheen-top"
    >
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-8">
          {/* Statement */}
          <div className="lg:col-span-4">
            <Reveal>
              <p className="kicker text-gold-400">
                <span className="h-px w-9 bg-gold-400" />
                The GDE framework
              </p>
              <RevealHeading
                as="h2"
                className="heading-craft heading-depth mt-4 font-display text-display-sm font-medium leading-tight text-balance text-paper"
              >
                What a{" "}
                <em className="font-light text-gilded text-gilded-sheen">School of Specialisation</em>{" "}
                means — and how long we&apos;ve meant it.
              </RevealHeading>
            </Reveal>
          </div>

          {/* Three system facts */}
          <Reveal delay={0.15} className="sm:col-span-7 lg:col-span-6">
            <dl className="grid gap-6 sm:grid-cols-3">
              {facts.map((f) => {
                const Icon = f.icon;
                return (
                  <div key={f.title} className="group">
                    <dt className="flex items-center gap-2.5">
                      <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-gold-500/25 bg-ink-950/60 text-gold-400 transition-colors duration-300 group-hover:border-gold-500/60 group-hover:text-gold-300">
                        <Icon className="size-4" strokeWidth={1.8} />
                      </span>
                      <span className="font-display text-base font-medium text-paper">
                        {f.title}
                      </span>
                    </dt>
                    <dd className="mt-2.5">
                      <p className="text-[0.8rem] leading-relaxed text-paper/60">
                        {f.text}
                      </p>
                      <p className="mt-2 font-mono text-[0.56rem] uppercase tracking-[0.16em] text-paper/30">
                        {f.note}
                      </p>
                    </dd>
                  </div>
                );
              })}
            </dl>
          </Reveal>

          {/* GDE portal link */}
          <Reveal delay={0.25} className="sm:col-span-5 lg:col-span-2 lg:justify-self-end">
            <a
              href="https://www.gdeadmissions.gov.za/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 rounded-full border border-gold-500/35 bg-ink-950/50 px-5 py-3 text-[0.64rem] font-bold uppercase tracking-[0.18em] text-gold-300 transition-all duration-300 hover:border-gold-400 hover:bg-ink-950/80 hover:shadow-glow"
            >
              <SaFlag className="h-2.5 w-3.5" />
              GDE portal
              <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
