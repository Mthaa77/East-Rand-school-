"use client";
import { ENQUIRE_DISCIPLINE_EVENT } from "@/lib/interaction-events";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Footprints,
  Mic2,
  Music2,
  Palette,
  PenTool,
  RotateCcw,
  Sparkles,
  Users,
  Wand2,
  X,
} from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { useOpenFinder } from "@/components/site/palette-trigger";
import {
  finderQuestions,
  finderResults,
  scoreAnswers,
  type DisciplineKey,
} from "@/lib/discipline-finder";
import { cn } from "@/lib/utils";

const ICONS: Record<DisciplineKey, React.ComponentType<{ className?: string; strokeWidth?: number }>> = {
  "visual-arts": Palette,
  design: PenTool,
  drama: Mic2,
  dance: Footprints,
  music: Music2,
};

type Step = "intro" | number | "result";

export function DisciplineFinder({ onExplore }: { onExplore: (title: string) => void }) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("intro");
  const [answers, setAnswers] = useState<(DisciplineKey | null)[]>(
    () => Array(finderQuestions.length).fill(null)
  );
  const [picked, setPicked] = useState<number | null>(null);
  // Anonymous tally — populated by POST /api/finder when a quiz completes.
  const [tally, setTally] = useState<number | null>(null);
  const postedRef = useRef(false);

  // The ⌘K command palette can launch the finder from anywhere on the page.
  useOpenFinder(useCallback(() => setOpen(true), []));

  const qIndex = typeof step === "number" ? step : -1;
  const question = qIndex >= 0 ? finderQuestions[qIndex] : null;
  const progress =
    step === "intro" ? 0 : step === "result" ? 1 : (qIndex + 1) / finderQuestions.length;

  const resultKey = useMemo(
    () => (step === "result" ? scoreAnswers(answers) : null),
    [step, answers]
  );
  const result = resultKey ? finderResults[resultKey] : null;
  const ResultIcon = resultKey ? ICONS[resultKey] : null;

  // One anonymous tally per completed quiz — fire-and-forget, honestly silent
  // on failure. The response carries live counts so the result screen can show
  // real numbers only.
  useEffect(() => {
    if (step !== "result" || !resultKey || postedRef.current) return;
    postedRef.current = true;
    fetch("/api/finder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ discipline: resultKey }),
    })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((d: { counts?: Record<string, number> }) => {
        const n = d.counts?.[resultKey];
        if (typeof n === "number") setTally(n);
      })
      .catch(() => setTally(null));
  }, [step, resultKey]);

  const close = () => {
    setOpen(false);
    window.setTimeout(() => {
      setStep("intro");
      setAnswers(Array(finderQuestions.length).fill(null));
      setPicked(null);
      postedRef.current = false;
      setTally(null);
    }, 250);
  };

  const choose = (discipline: DisciplineKey, optionIndex: number) => {
    if (picked !== null) return;
    setPicked(optionIndex);
    window.setTimeout(() => {
      setAnswers((prev) => {
        const next = [...prev];
        next[qIndex] = discipline;
        return next;
      });
      setPicked(null);
      setStep(qIndex + 1 === finderQuestions.length ? "result" : qIndex + 1);
    }, 320);
  };

  const explore = () => {
    if (!result) return;
    const title = result.title;
    close();
    window.setTimeout(() => onExplore(title), 140);
  };

  const goApply = () => {
    const title = result?.title;
    close();
    window.setTimeout(() => {
      if (title) {
        window.dispatchEvent(
          new CustomEvent(ENQUIRE_DISCIPLINE_EVENT, { detail: { discipline: title } })
        );
      }
      document.getElementById("admissions")?.scrollIntoView({ behavior: "smooth" });
    }, 140);
  };

  return (
    <>
      {/* Launcher */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        className="group mt-6 flex w-full items-center gap-4 rounded-2xl border border-dashed border-gold-500/40 bg-gold-500/[0.04] px-5 py-4 text-left shadow-card transition-all duration-500 hover:-translate-y-0.5 hover:border-gold-400 hover:bg-gold-500/[0.09] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400/70"
      >
        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-gold-500/15 text-gold-300 transition-transform duration-500 group-hover:rotate-12">
          <Wand2 className="size-4.5" strokeWidth={1.9} />
        </span>
        <span className="min-w-0">
          <span className="block font-display text-base font-medium text-paper">
            Not sure which one is yours?
          </span>
          <span className="mt-0.5 block text-[0.62rem] font-bold uppercase tracking-[0.2em] text-gold-400/90">
            Take the 60-second finder
            <ArrowRight className="ml-1.5 inline size-3 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </span>
      </button>

      <Dialog open={open} onOpenChange={(o) => !o && close()}>
        <DialogContent
          showCloseButton={false}
          className="top-[50%] grid max-h-[88dvh] grid-rows-[auto_minmax(0,1fr)] gap-0 overflow-hidden rounded-3xl border-paper/15 bg-ink-900 p-0 shadow-lift sm:max-w-xl"
        >
          <div aria-hidden="true" className="grain pointer-events-none absolute inset-0 z-20 opacity-60" />

          {/* Header band */}
          <div className="relative shrink-0 overflow-hidden border-b border-paper/10 bg-gradient-to-br from-gold-500/[0.14] via-transparent to-crimson-500/[0.08] px-7 pb-5 pt-6">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -right-2 -top-6 select-none font-display text-[7.5rem] font-bold leading-none text-outline-gold opacity-30"
            >
              {step === "result" ? "★" : step === "intro" ? "?" : String(qIndex + 1).padStart(2, "0")}
            </span>
            <button
              type="button"
              onClick={close}
              aria-label="Close the finder"
              className="absolute right-4 top-4 z-30 grid size-9 place-items-center rounded-full border border-paper/20 bg-ink-950/60 text-paper/80 backdrop-blur-sm transition-all duration-300 hover:rotate-90 hover:border-gold-400 hover:text-gold-300"
            >
              <X className="size-4" />
            </button>

            <div className="relative z-10 flex items-center gap-3 pr-12">
              <p className="font-mono text-[0.6rem] tracking-[0.3em] text-gold-300">THE FINDER</p>
              {step !== "intro" && step !== "result" && (
                <p className="font-mono text-[0.6rem] tracking-[0.3em] text-paper/40">
                  {String(qIndex + 1).padStart(2, "0")} / {String(finderQuestions.length).padStart(2, "0")}
                </p>
              )}
            </div>
            <div className="relative z-10 mt-4 h-px w-full bg-paper/10">
              <motion.div
                animate={{ scaleX: progress }}
                transition={{ type: "spring", stiffness: 120, damping: 22 }}
                className="h-px origin-left bg-gold-400"
              />
            </div>
            <DialogTitle className="sr-only">Find your instrument — discipline finder</DialogTitle>
            <DialogDescription className="sr-only">
              A five-question guide that points you to the ERSA discipline that fits you.
            </DialogDescription>
          </div>

          {/* Body */}
          <div className="scroll-gold min-h-0 flex-1 overflow-y-auto px-7 py-6">
            <AnimatePresence mode="wait" initial={false}>
              {step === "intro" && (
                <motion.div
                  key="intro"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="flex items-center gap-2 text-[0.62rem] font-bold uppercase tracking-[0.22em] text-gold-300">
                    <Sparkles className="size-4" />
                    Five questions. No wrong answers.
                  </p>
                  <h3 className="mt-4 font-display text-[1.7rem] font-medium leading-snug text-paper">
                    Not everyone thinks in the same medium. Let&apos;s find{" "}
                    <span className="italic text-gold-400">your</span> instrument.
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-paper/60">
                    Answer honestly — the finder points you at the discipline your instincts
                    already lean toward. The audition and your own choice make the final call.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStep(0)}
                    className="mt-7 inline-flex items-center gap-2 rounded-full bg-gold-400 px-7 py-3.5 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-ink-950 transition-all duration-300 hover:bg-gold-300 hover:shadow-[0_10px_30px_-10px_rgba(212,175,55,0.5)]"
                  >
                    Start the finder
                    <ArrowRight className="size-4" />
                  </button>
                  <p className="mt-5 text-[0.68rem] leading-relaxed text-paper/35">
                    Takes about a minute. Nothing personal is stored — when you finish, only the
                    instrument you landed on is tallied, anonymously.
                  </p>
                </motion.div>
              )}

              {question && (
                <motion.div
                  key={`q-${qIndex}`}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                >
                  <h3 className="font-display text-[1.45rem] font-medium leading-snug text-paper">
                    {question.q}
                  </h3>
                  <div className="mt-5 space-y-2.5" role="radiogroup" aria-label={question.q}>
                    {question.options.map((opt, i) => {
                      const selected = picked === i;
                      return (
                        <button
                          key={opt.label}
                          type="button"
                          role="radio"
                          aria-checked={selected}
                          onClick={() => choose(opt.discipline, i)}
                          className={cn(
                            "group flex w-full items-center justify-between gap-3 rounded-xl border px-4 py-3.5 text-left transition-all duration-300",
                            selected
                              ? "border-gold-400 bg-gold-500/15"
                              : "border-paper/12 bg-paper/[0.02] hover:border-gold-500/50 hover:bg-paper/[0.05]"
                          )}
                        >
                          <span>
                            <span className={cn("block text-sm font-semibold transition-colors", selected ? "text-gold-200" : "text-paper/85")}>
                              {opt.label}
                            </span>
                            <span className="mt-0.5 block text-[0.65rem] uppercase tracking-[0.16em] text-paper/35">
                              {opt.hint}
                            </span>
                          </span>
                          <span
                            className={cn(
                              "grid size-5 shrink-0 place-items-center rounded-full border transition-all duration-300",
                              selected ? "border-gold-400 bg-gold-400" : "border-paper/25 group-hover:border-gold-400/70"
                            )}
                          >
                            <span className={cn("size-1.5 rounded-full bg-ink-950 transition-opacity", selected ? "opacity-100" : "opacity-0")} />
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  {qIndex > 0 && (
                    <button
                      type="button"
                      onClick={() => setStep(qIndex - 1)}
                      className="mt-5 inline-flex items-center gap-1.5 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-paper/40 transition-colors hover:text-gold-300"
                    >
                      <ArrowLeft className="size-3.5" />
                      Back
                    </button>
                  )}
                </motion.div>
              )}

              {step === "result" && result && ResultIcon && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="text-[0.62rem] font-bold uppercase tracking-[0.26em] text-gold-400">
                    Your instrument — a first pointer
                  </p>
                  <div className="mt-4 flex items-center gap-4 rounded-2xl border border-gold-500/25 bg-gold-500/[0.06] p-5">
                    <span className="grid size-14 shrink-0 place-items-center rounded-xl bg-ink-950 text-gold-300">
                      <ResultIcon className="size-6" strokeWidth={1.7} />
                    </span>
                    <div>
                      <h3 className="font-display text-3xl font-medium text-paper">{result.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-paper/65">{result.why}</p>
                      {tally !== null && tally > 0 && (
                        <p className="mt-2.5 flex items-center gap-2 text-[0.6rem] font-bold uppercase tracking-[0.2em] text-gold-400/80">
                          <Users className="size-3.5" />
                          {tally === 1
                            ? "1 explorer has landed here before you"
                            : `${tally} explorers have landed here before you`}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={explore}
                      className="inline-flex items-center gap-2 rounded-full bg-gold-400 px-6 py-3 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-ink-950 transition-all duration-300 hover:bg-gold-300 hover:shadow-[0_10px_30px_-10px_rgba(212,175,55,0.5)]"
                    >
                      Explore {result.title} in depth
                      <ArrowRight className="size-4" />
                    </button>
                    <button
                      type="button"
                      onClick={goApply}
                      className="inline-flex items-center gap-2 rounded-full border border-paper/25 px-6 py-3 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-paper transition-colors hover:border-gold-400 hover:text-gold-300"
                    >
                      How to apply
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setAnswers(Array(finderQuestions.length).fill(null));
                      postedRef.current = false;
                      setTally(null);
                      setStep(0);
                    }}
                    className="mt-5 inline-flex items-center gap-1.5 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-paper/40 transition-colors hover:text-gold-300"
                  >
                    <RotateCcw className="size-3.5" />
                    Try the finder again
                  </button>

                  <p className="mt-5 text-[0.68rem] leading-relaxed text-paper/35">
                    A guide, not a gate — many learners only discover their discipline at the
                    audition. Subject availability is confirmed annually by the school.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
