"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

/* The pillars, in the school's plain voice — each line lights up as the
   reader reaches it, then a Newsreader aside says why we sound like this. */

const PILLARS = [
  { numeral: "I", text: "Talent has a home here." },
  { numeral: "II", text: "Training becomes opportunity." },
  { numeral: "III", text: "The East Rand is the stage." },
  { numeral: "IV", text: "Excellence is visible." },
  { numeral: "V", text: "This is a public school — and proud of it." },
];

function Line({
  numeral,
  text,
  range,
  progress,
}: {
  numeral: string;
  text: string;
  range: [number, number];
  progress: MotionValue<number>;
}) {
  const opacity = useTransform(progress, range, [0.1, 1]);
  const y = useTransform(progress, range, [14, 0]);
  const numeralX = useTransform(progress, range, [-10, 0]);
  return (
    <motion.span
      style={{ opacity, y }}
      className="flex items-baseline gap-5 will-change-transform sm:gap-7"
    >
      <motion.span
        style={{ x: numeralX }}
        aria-hidden="true"
        className="font-display font-display-wonk shrink-0 text-[0.55em] italic leading-none text-gold-300/85"
      >
        {numeral}
      </motion.span>
      <span className="inline-block">{text}</span>
    </motion.span>
  );
}

export function Manifesto() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.82", "end 0.45"],
  });

  const total = PILLARS.length;

  return (
    <section
      aria-label="ERSA message pillars"
      className="relative overflow-hidden bg-crimson-600"
    >
      {/* decorative rings */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 -top-40 size-[420px] rounded-full border border-paper/10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-52 -right-32 size-[520px] rounded-full border border-paper/10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -right-20 size-[360px] rounded-full border border-paper/15"
      />
      {/* stage-light wash */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_46%_at_18%_0%,oklch(0.76_0.14_76/0.14),transparent_62%)]"
      />

      <div ref={ref} className="relative mx-auto max-w-5xl px-5 py-28 sm:px-8 lg:py-40">
        <p className="mb-12 flex items-center gap-4 text-[0.65rem] font-bold uppercase tracking-[0.32em] text-paper/60">
          <span className="h-px w-9 bg-paper/50" />
          What we believe — plainly
        </p>
        <ul className="space-y-6 font-display text-display-md font-medium leading-[1.16] text-paper sm:space-y-8 sm:text-display-lg">
          {PILLARS.map((pillar, i) => {
            const start = i / total;
            const end = start + 1 / total;
            return (
              <li key={pillar.numeral}>
                <Line
                  numeral={pillar.numeral}
                  text={pillar.text}
                  range={[start, end]}
                  progress={scrollYProgress}
                />
              </li>
            );
          })}
        </ul>
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, delay: 0.15 }}
          className="mt-14 max-w-2xl text-pretty text-paper/80 [font-family:var(--font-newsreader)] [font-optical-sizing:auto] [font-style:italic] [font-weight:420] text-[1.05rem] leading-[1.75]"
        >
          Said plainly, because a Grade 7 learner and a busy parent both deserve the
          truth — no slogans, just the work, the results and the doors it opens.
        </motion.p>
        <p className="mt-10 text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-paper/55">
          — The ERSA message pillars
        </p>
      </div>
    </section>
  );
}
