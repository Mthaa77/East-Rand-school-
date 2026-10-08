import Link from "next/link";
import { ArrowRight, CalendarDays, Construction, Trophy } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/site/proof-bar";

const stories = [
  {
    label: "Learner achievement · August 2026",
    title: "Oarona Nkabinde takes first place",
    text: "Grade 11 learner Oarona Nkabinde took first position in the FSCA Business Studies competition in August 2026.",
    icon: Trophy,
  },
  {
    label: "External validation · July 2026",
    title: "ERSA on the youth-jazz stage",
    text: "ERSA learners joined the Jazz for Young People programme, with a workshop at ERSA on 22 July and the main event in Braamfontein on 25 July.",
    icon: CalendarDays,
  },
  {
    label: "Future-facing opportunity",
    title: "Preparing the next generation of artists",
    text: "Learners have engaged with creative-industry opportunities that strengthen practice, portfolios and pathways into tertiary study.",
    icon: ArrowRight,
  },
];

export function Ersa2026() {
  return (
    <section id="2026" aria-label="2026 at ERSA" className="relative overflow-hidden bg-ink-900 text-paper">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_80%_at_90%_10%,oklch(0.76_0.14_76/0.12),transparent_70%)]" />
      <div className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-10 lg:py-32">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            kicker="The year in motion"
            title="2026 — a year of creating, competing & performing."
            accentWords={["creating,", "performing."]}
            description="From classrooms and studios to national stages, ERSA learners continue to turn talent into practice, achievement and opportunity."
          />
          <Reveal delay={0.15} className="shrink-0">
            <span className="inline-flex items-center gap-2 rounded-full border border-gold-400/30 bg-gold-400/10 px-4 py-2 font-mono text-[0.62rem] font-bold uppercase tracking-[0.18em] text-gold-300">
              <span className="size-1.5 rounded-full bg-gold-300" /> Publicly reported · verify before publication
            </span>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-4 lg:grid-cols-3">
          {stories.map((story, index) => {
            const Icon = story.icon;
            return (
              <Reveal key={story.title} delay={index * 0.08}>
                <article className="group flex h-full flex-col rounded-2xl border border-paper/12 bg-ink-950/45 p-7 transition-transform duration-500 hover:-translate-y-1 hover:border-gold-400/35 sm:p-8">
                  <div className="flex items-center justify-between text-gold-300">
                    <Icon aria-hidden="true" className="size-5" />
                    <span className="font-mono text-[0.6rem] tracking-[0.18em] text-paper/35">0{index + 1}</span>
                  </div>
                  <p className="mt-10 text-[0.62rem] font-bold uppercase tracking-[0.2em] text-crimson-300">{story.label}</p>
                  <h3 className="mt-3 font-display text-2xl font-medium leading-tight text-paper">{story.title}</h3>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-paper/60">{story.text}</p>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-5 flex flex-col gap-5 rounded-2xl border border-gold-400/20 bg-ink-950/55 p-7 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div>
              <div className="flex items-center gap-3 text-gold-300">
                <Construction aria-hidden="true" className="size-5" />
                <p className="text-[0.62rem] font-bold uppercase tracking-[0.2em]">The next chapter</p>
              </div>
              <h3 className="mt-3 font-display text-2xl font-medium">The Creative Hub is being planned.</h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-paper/60">A proposed art gallery, recording studio and covered amphitheatre could expand ERSA&apos;s space for making, recording, exhibiting and performing.</p>
              <p className="mt-3 font-mono text-[0.58rem] uppercase tracking-[0.16em] text-paper/35">Development / procurement · subject to ERSA / GDE confirmation</p>
            </div>
            <Link href="/news" className="inline-flex shrink-0 items-center gap-2 rounded-full border border-paper/20 px-5 py-3 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-paper transition-colors hover:border-gold-400 hover:text-gold-300">Explore the stories <ArrowRight aria-hidden="true" className="size-3.5" /></Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default Ersa2026;
