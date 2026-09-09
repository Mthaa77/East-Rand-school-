"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Loader2, Send, ShieldCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const topics = [
  "General question",
  "Visual Arts",
  "Design",
  "Dramatic Arts",
  "Dance Studies",
  "Music",
  "Media & partnerships",
];

const CHECK_SVG =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23ffffff' stroke-width='3.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 6 9 17l-5-5'/%3E%3C/svg%3E\")";

const inputClass =
  "w-full rounded-xl border border-paper/15 bg-ink-950/70 px-4 py-3 text-sm text-paper placeholder:text-paper/30 shadow-[inset_0_2px_6px_rgba(0,0,0,0.45)] transition-all duration-300 focus:border-gold-400/70 focus:outline-none focus:ring-2 focus:ring-gold-400/25";

/**
 * Dark-theme enquiry form for the /contact page — same /api/enquiry
 * contract as the admissions form (honeypot + POPIA consent + rate limit),
 * restyled for the ink background.
 */
export function ContactForm() {
  const { toast } = useToast();
  const hpRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    topic: topics[0],
    message: "",
  });
  const [consent, setConsent] = useState(false);
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!consent) {
      toast({
        title: "One thing first",
        description: "POPIA consent is required before we may store your details.",
      });
      return;
    }
    setState("sending");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          discipline: form.topic,
          message: form.message,
          company: hpRef.current?.value ?? "",
          consent,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? "Something went wrong.");
      }
      setState("sent");
    } catch (err) {
      setState("idle");
      toast({
        title: "Message not sent",
        description:
          err instanceof Error ? err.message : "Please phone the office on 010 007 1186.",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="relative overflow-hidden rounded-3xl border border-paper/12 bg-ink-900/70 p-6 shadow-lift sm:p-9">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 size-64 rounded-full bg-gold-500/10 blur-3xl"
      />
      <AnimatePresence mode="wait">
        {state === "sent" ? (
          <motion.div
            key="sent"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative py-10 text-center"
          >
            <span className="mx-auto grid size-14 place-items-center rounded-full bg-gold-500/15 ring-1 ring-gold-400/40 shadow-glow">
              <CheckCircle2 className="size-7 text-gold-300" />
            </span>
            <h3 className="mt-5 font-display text-2xl font-medium text-paper">
              Message received
            </h3>
            <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-paper/60">
              Thank you — the office will get back to you as soon as possible. For
              urgent matters, call <a href="tel:+270100071186" className="text-gold-300 underline-offset-4 hover:underline">010 007 1186</a>.
            </p>
            <button
              onClick={() => {
                setState("idle");
                setConsent(false);
                setForm({ name: "", email: "", phone: "", topic: topics[0], message: "" });
              }}
              className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-gold-400 underline-offset-4 hover:underline"
            >
              Send another message
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={onSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative space-y-4"
          >
            {/* Honeypot */}
            <div aria-hidden="true" className="absolute -left-[9999px] -top-[9999px] size-0 overflow-hidden">
              <label htmlFor="ct-company" className="sr-only">Company</label>
              <input
                ref={hpRef}
                id="ct-company"
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                defaultValue=""
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="ct-name" className="mb-1.5 block text-[0.68rem] font-bold uppercase tracking-[0.16em] text-paper/60">
                  Full name *
                </label>
                <input
                  id="ct-name"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your name"
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="ct-phone" className="mb-1.5 block text-[0.68rem] font-bold uppercase tracking-[0.16em] text-paper/60">
                  Phone *
                </label>
                <input
                  id="ct-phone"
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
              <label htmlFor="ct-email" className="mb-1.5 block text-[0.68rem] font-bold uppercase tracking-[0.16em] text-paper/60">
                Email *
              </label>
              <input
                id="ct-email"
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@example.com"
                className={inputClass}
              />
            </div>

            <div>
              <span id="ct-topic-label" className="mb-2 block text-[0.68rem] font-bold uppercase tracking-[0.16em] text-paper/60">
                What is it about?
              </span>
              <div className="flex flex-wrap gap-2" role="group" aria-labelledby="ct-topic-label">
                {topics.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setForm({ ...form, topic: t })}
                    aria-pressed={form.topic === t}
                    className={cn(
                      "rounded-full border px-4 py-2 text-xs font-semibold transition-all duration-300",
                      form.topic === t
                        ? "border-gold-400 bg-gold-500 text-ink-950 shadow-[0_6px_16px_-6px_var(--color-gold-500)]"
                        : "border-paper/20 text-paper/60 hover:border-gold-400/60 hover:text-paper"
                    )}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="ct-message" className="mb-1.5 block text-[0.68rem] font-bold uppercase tracking-[0.16em] text-paper/60">
                Your message
              </label>
              <textarea
                id="ct-message"
                rows={4}
                maxLength={2000}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="How can the school office help?"
                className={cn(inputClass, "resize-none")}
              />
              <p
                aria-live="polite"
                className={cn(
                  "mt-1 text-right font-mono text-[0.6rem] tabular-nums transition-colors duration-300",
                  form.message.length > 1800 ? "text-crimson-400" : "text-paper/30"
                )}
              >
                {form.message.length} / 2000
              </p>
            </div>

            <label
              htmlFor="ct-consent"
              className={cn(
                "flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition-all duration-300",
                consent
                  ? "border-gold-400/50 bg-gold-500/8"
                  : "border-paper/12 bg-ink-950/50 hover:border-paper/30"
              )}
            >
              <input
                id="ct-consent"
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-0.5 size-4 shrink-0 cursor-pointer appearance-none rounded-[3px] border border-paper/40 bg-ink-950 transition-all checked:border-gold-500 checked:bg-gold-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-400"
                style={{
                  backgroundImage: consent ? CHECK_SVG : undefined,
                  backgroundSize: "70%",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              />
              <span className="text-xs leading-relaxed text-paper/60">
                <ShieldCheck className="mr-1.5 inline size-3.5 text-gold-400" />
                POPIA consent — I agree that East Rand School of the Arts may store and
                use these details to answer this enquiry. No marketing, no sharing. *
              </span>
            </label>

            <button
              type="submit"
              disabled={state === "sending"}
              className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-gold-500 px-7 py-4 text-[0.72rem] font-bold uppercase tracking-[0.2em] text-ink-950 shadow-[0_10px_30px_-10px_var(--color-gold-500)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-300 hover:shadow-glow disabled:cursor-not-allowed disabled:opacity-70"
            >
              {state === "sending" ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Sending…
                </>
              ) : (
                <>
                  <Send className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                  Send message
                </>
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
