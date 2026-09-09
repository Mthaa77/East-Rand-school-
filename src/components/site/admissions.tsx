"use client";
import { ENQUIRE_DISCIPLINE_EVENT } from "@/lib/interaction-events";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2, ExternalLink, Loader2, Send, ShieldCheck } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { titleForSlug } from "@/lib/share";
import { SectionHeading } from "@/components/site/proof-bar";
import { Reveal } from "@/components/motion/reveal";
import { Faq } from "@/components/site/faq";
import { cn } from "@/lib/utils";

const checklist = [
  {
    n: "01",
    title: "Discover",
    text: "Explore the five disciplines and watch what current learners make and perform.",
  },
  {
    n: "02",
    title: "Understand",
    text: "Check eligibility, entry grades and the audition format for your art form.",
  },
  {
    n: "03",
    title: "Prepare",
    text: "Build your audition piece or portfolio using the school's checklist.",
  },
  {
    n: "04",
    title: "Apply",
    text: "Apply on the GDE admissions portal, then book ERSA's placement test.",
  },
  {
    n: "05",
    title: "Confirm",
    text: "The school confirms your audition slot, documents and arrival details.",
  },
  {
    n: "06",
    title: "Join",
    text: "Orientation, timetable, instruments and everything a new family needs.",
  },
];

const disciplineOptions = [
  "Visual Arts",
  "Design",
  "Dramatic Arts",
  "Dance Studies",
  "Music",
  "Not sure yet",
];

const inputClass =
  "w-full rounded-xl border border-ink-950/15 bg-paper px-4 py-3.5 text-sm text-ink-950 shadow-[inset_0_1px_2px_oklch(0.135_0.008_65/0.06)] placeholder:text-ink-800/40 transition-all duration-300 focus:border-crimson-500 focus:outline-none focus:ring-2 focus:ring-crimson-500/15";

const CHECK_SVG =
  "url('data:image/svg+xml,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"white\" stroke-width=\"3.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"%3E%3Cpolyline points=\"20 6 9 17 4 12\"/%3E%3C/svg%3E')";

export function Admissions({
  /** Route shown as the section's "open the page" link (homepage only). */
  pageHref,
  pageLabel = "Open the full page",
}: {
  pageHref?: string;
  pageLabel?: string;
}) {
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const [consent, setConsent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    discipline: "",
    message: "",
  });

  const [flash, setFlash] = useState(false);
  const hpRef = useRef<HTMLInputElement>(null);

  // One audition funnel: deep-dives, the finder and shared #enquire-<slug>
  // links all land here with the discipline chip already chosen.
  const applyPrefill = useCallback(
    (discipline: string) => {
      setState((s) => (s === "sent" ? s : "idle"));
      setForm((f) => ({ ...f, discipline }));
      setFlash(true);
      window.setTimeout(() => setFlash(false), 2400);
      toast({
        title: `${discipline} selected`,
        description: "The enquiry form is ready — tell us about the learner.",
      });
    },
    [toast]
  );

  useEffect(() => {
    function onPreSelect(e: Event) {
      const discipline = (e as CustomEvent<{ discipline?: string }>).detail?.discipline;
      if (!discipline) return;
      applyPrefill(discipline);
    }
    window.addEventListener(ENQUIRE_DISCIPLINE_EVENT, onPreSelect);
    return () => window.removeEventListener(ENQUIRE_DISCIPLINE_EVENT, onPreSelect);
  }, [applyPrefill]);

  // Shareable deep links — the office can hand out /#enquire-music in a
  // WhatsApp message and the form arrives pre-selected on arrival.
  useEffect(() => {
    if (!window.location.hash.startsWith("#enquire-")) return;
    const title = titleForSlug(window.location.hash.replace("#enquire-", ""));
    if (!title) return;
    const t = window.setTimeout(() => {
      applyPrefill(title);
      history.replaceState(null, "", `${window.location.pathname}#admissions`);
      document.getElementById("admissions")?.scrollIntoView({ behavior: "smooth" });
    }, 300);
    return () => window.clearTimeout(t);
  }, [applyPrefill]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (state === "sending") return;
    if (!consent) {
      toast({
        title: "Consent required",
        description:
          "Please tick the POPIA consent box so we're allowed to keep your details.",
        variant: "destructive",
      });
      return;
    }
    setState("sending");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, consent, company: hpRef.current?.value ?? "" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setState("sent");
      toast({
        title: "Enquiry received",
        description:
          "Thank you — the ERSA admissions team will get back to you as soon as possible.",
      });
    } catch (err) {
      setState("idle");
      toast({
        title: "Could not send enquiry",
        description:
          err instanceof Error ? err.message : "Please try again or phone the school office.",
        variant: "destructive",
      });
    }
  }

  return (
    <section id="admissions" aria-label="Admissions" className="relative bg-paper-200 text-ink-950">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-10 lg:py-32">
        <SectionHeading
          dark
          kicker="Admissions 2027"
          title="Your next step, in six moves."
          accentWords={["six", "moves."]}
          description="ERSA admits through an audition or placement test in your chosen discipline. The GDE portal handles the application — the school handles the art."
          pageHref={pageHref}
          pageLabel={pageLabel}
        />

        {/* SA framework chips — the system your application sits inside */}
        <Reveal delay={0.1}>
          <ul
            aria-label="South African education framework"
            className="mt-8 flex flex-wrap items-center gap-2.5"
          >
            {[
              "School of Specialisation in the Arts",
              "GDE district · Ekurhuleni North",
              "Grade 8 entry · NSC matric",
            ].map((chip) => (
              <li
                key={chip}
                className="rounded-full border border-ink-950/15 bg-paper px-4 py-2 text-[0.62rem] font-bold uppercase tracking-[0.16em] text-ink-800/70 shadow-card"
              >
                {chip}
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="mt-16 grid gap-14 lg:grid-cols-12">
          {/* Checklist */}
          <div className="lg:col-span-6">
            {/* Real learners on the school steps — "your next step" */}
            <Reveal>
              <figure className="photo-frame relative mb-8">
                <div className="relative aspect-[16/9] w-full">
                  <Image
                    src="/images/real/learners-stairs.jpg"
                    alt="Two ERSA learners in uniform on the school steps"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/75 via-ink-950/10 to-transparent" />
                <figcaption className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
                  <span className="rounded-full bg-ink-950/70 px-4 py-2 text-[0.6rem] font-bold uppercase tracking-[0.22em] text-gold-300 backdrop-blur-sm shadow-card">
                    The class of 2026, on the front steps
                  </span>
                </figcaption>
              </figure>
            </Reveal>

            <ol className="space-y-0">
              {checklist.map((c, i) => (
                <Reveal key={c.n} delay={i * 0.06}>
                  <li className="group relative flex gap-6 border-b border-ink-950/10 py-6 transition-colors duration-300 hover:border-crimson-500/40">
                    <span className="font-mono text-sm text-crimson-600/80">{c.n}</span>
                    <div className="flex-1">
                      <h3 className="font-display text-xl font-medium transition-transform duration-300 group-hover:translate-x-1.5">
                        {c.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-ink-800/65">
                        {c.text}
                      </p>
                    </div>
                    <CheckCircle2 className="mt-1 size-5 shrink-0 text-ink-950/15 transition-all duration-500 group-hover:text-crimson-600" />
                  </li>
                </Reveal>
              ))}
            </ol>

            <Reveal delay={0.2}>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="https://www.gdeadmissions.gov.za/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2.5 rounded-full bg-ink-950 px-6 py-3.5 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-paper shadow-lift transition-all duration-300 hover:-translate-y-0.5 hover:bg-crimson-600"
                >
                  GDE admissions portal
                  <ExternalLink className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                <p className="text-xs text-ink-800/55">
                  Then call the office to book your audition.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Enquiry form */}
          <Reveal delay={0.15} className="lg:col-span-6">
            <div
              className={cn(
                "relative overflow-hidden rounded-3xl border border-ink-950/12 bg-paper p-8 shadow-lift transition-all duration-700 sm:p-10",
                flash && "border-gold-500/60 ring-2 ring-gold-500/40"
              )}
            >
              {flash && (
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 z-10 h-1 animate-pulse bg-gradient-to-r from-transparent via-gold-500 to-transparent"
                />
              )}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-16 size-44 rounded-full bg-gold-500/15 blur-2xl"
              />
              <p className="kicker text-crimson-600">Ask the school</p>
              <h3 className="mt-3 font-display text-3xl font-medium">
                Send an admissions enquiry
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-ink-800/60">
                Audition dates, documents, fees, transport — ask anything. The office
                responds during school hours.
              </p>

              {state === "sent" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-8 flex flex-col items-center gap-4 rounded-2xl border border-crimson-500/25 bg-crimson-500/5 px-8 py-14 text-center"
                >
                  <span className="grid size-14 place-items-center rounded-full bg-crimson-600 text-paper shadow-lift">
                    <CheckCircle2 className="size-7" />
                  </span>
                  <p className="font-display text-2xl font-medium">Enquiry sent</p>
                  <p className="max-w-sm text-sm text-ink-800/60">
                    Thank you for choosing the arts. Our admissions team will contact you
                    — keep an eye on your email and phone.
                  </p>
                  <button
                    onClick={() => {
                      setState("idle");
                      setConsent(false);
                      setForm({ name: "", email: "", phone: "", discipline: "", message: "" });
                    }}
                    className="mt-2 text-xs font-bold uppercase tracking-[0.2em] text-crimson-600 underline-offset-4 hover:underline"
                  >
                    Send another enquiry
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={onSubmit} className="mt-8 space-y-4" noValidate={false}>
                  {/* Honeypot — invisible to people, irresistible to bots. A filled
                      field is silently dropped by the API with a fake success. */}
                  <div aria-hidden="true" className="absolute -left-[9999px] -top-[9999px] size-0 overflow-hidden">
                    <label htmlFor="enq-company" className="sr-only">Company</label>
                    <input
                      ref={hpRef}
                      id="enq-company"
                      type="text"
                      name="company"
                      tabIndex={-1}
                      autoComplete="off"
                      defaultValue=""
                    />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="enq-name" className="mb-1.5 block text-[0.68rem] font-bold uppercase tracking-[0.16em] text-ink-800/70">
                        Full name *
                      </label>
                      <input
                        id="enq-name"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Parent / learner name"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="enq-phone" className="mb-1.5 block text-[0.68rem] font-bold uppercase tracking-[0.16em] text-ink-800/70">
                        Phone *
                      </label>
                      <input
                        id="enq-phone"
                        required
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="e.g. 082 000 0000"
                        className={inputClass}
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="enq-email" className="mb-1.5 block text-[0.68rem] font-bold uppercase tracking-[0.16em] text-ink-800/70">
                      Email *
                    </label>
                    <input
                      id="enq-email"
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="you@example.com"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="enq-discipline" className="mb-1.5 block text-[0.68rem] font-bold uppercase tracking-[0.16em] text-ink-800/70">
                      Discipline of interest
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {disciplineOptions.map((d) => (
                        <button
                          key={d}
                          type="button"
                          onClick={() => setForm({ ...form, discipline: d })}
                          aria-pressed={form.discipline === d}
                          className={cn(
                            "rounded-full border px-4 py-2 text-xs font-semibold transition-all duration-300",
                            form.discipline === d
                              ? "border-ink-950 bg-ink-950 text-gold-300"
                              : "border-ink-950/20 text-ink-800/70 hover:border-ink-950/45"
                          )}
                        >
                          {d}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label htmlFor="enq-message" className="mb-1.5 block text-[0.68rem] font-bold uppercase tracking-[0.16em] text-ink-800/70">
                      Your question
                    </label>
                    <textarea
                      id="enq-message"
                      rows={4}
                      maxLength={2000}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Tell us about the learner, their grade and what you'd like to know…"
                      className={cn(inputClass, "resize-none")}
                    />
                    <p
                      aria-live="polite"
                      className={cn(
                        "mt-1 text-right font-mono text-[0.6rem] tabular-nums transition-colors duration-300",
                        form.message.length > 1800 ? "text-crimson-600" : "text-ink-800/40"
                      )}
                    >
                      {form.message.length} / 2000
                    </p>
                  </div>
                  <label
                      htmlFor="enq-consent"
                      className={cn(
                        "flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition-all duration-300",
                        consent
                          ? "border-crimson-500/40 bg-crimson-500/5"
                          : "border-ink-950/15 bg-paper hover:border-ink-950/30"
                      )}
                    >
                      <input
                        id="enq-consent"
                        type="checkbox"
                        checked={consent}
                        onChange={(e) => setConsent(e.target.checked)}
                        className="mt-0.5 size-4 shrink-0 cursor-pointer appearance-none rounded-[3px] border border-ink-950/40 bg-paper transition-all checked:border-crimson-600 checked:bg-crimson-600 focus-visible:outline-2 focus-visible:outline-offset-2"
                        style={{
                          backgroundImage: consent ? CHECK_SVG : undefined,
                          backgroundSize: "70%",
                          backgroundPosition: "center",
                          backgroundRepeat: "no-repeat",
                        }}
                      />
                      <span className="text-xs leading-relaxed text-ink-800/70">
                        <ShieldCheck className="mr-1.5 inline size-3.5 text-crimson-600" />
                        POPIA consent — I agree that East Rand School of the Arts may
                        store and use these details for the purpose of answering this
                        admissions enquiry. No marketing, no sharing. *
                      </span>
                    </label>
                  <button
                    type="submit"
                    disabled={state === "sending"}
                    className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-crimson-600 px-7 py-4 text-[0.72rem] font-bold uppercase tracking-[0.2em] text-paper shadow-lift transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink-950 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {state === "sending" ? (
                      <>
                        <Loader2 className="size-4 animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        Send enquiry
                        <Send className="size-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                      </>
                    )}
                  </button>
                  <p className="text-center text-[0.65rem] leading-relaxed text-ink-800/45">
                    We only use these details to answer your enquiry (POPIA). Ask the
                    office to delete your record at any time.
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>

        {/* Parent FAQ */}
        <Faq />
      </div>
    </section>
  );
}
