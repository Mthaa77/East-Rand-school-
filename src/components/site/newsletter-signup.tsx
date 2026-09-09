"use client";

import { useRef, useState } from "react";
import { ArrowRight, BellRing, CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

const AUDIENCE_OPTIONS: { id: string; label: string }[] = [
  { id: "parent", label: "Parent & family" },
  { id: "alumni", label: "Alumni" },
  { id: "artist", label: "Artist & community" },
  { id: "educator", label: "Educator" },
];

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [audience, setAudience] = useState<string>("parent");
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const hpRef = useRef<HTMLInputElement>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (state !== "idle") return;
    setState("sending");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, audience, source: "footer", company: hpRef.current?.value ?? "" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Subscription failed");
      setState("done");
      toast({ title: "Subscribed", description: data.message || "You're on the list." });
    } catch (err) {
      setState("idle");
      toast({
        title: "Could not subscribe",
        description: err instanceof Error ? err.message : "Please try again.",
        variant: "destructive",
      });
    }
  }

  return (
    <Reveal>
      <div className="relative overflow-hidden rounded-3xl border border-paper/12 bg-ink-900/60 px-7 py-8 shadow-lift sm:px-10">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-24 size-56 rounded-full bg-gold-500/10 blur-3xl"
        />
        <div className="relative grid items-center gap-6 lg:grid-cols-2">
          <div className="flex items-start gap-4">
            <span className="hidden size-11 shrink-0 place-items-center rounded-xl bg-gold-500/15 text-gold-400 sm:grid">
              <BellRing className="size-5" strokeWidth={1.9} />
            </span>
            <div>
              <h3 className="font-display text-2xl font-medium text-paper">
                Never miss a showcase date.
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-paper/55">
                Festival announcements, audition windows and term notices — a short
                email, only when there&apos;s news. Unsubscribe anytime.
              </p>
            </div>
          </div>

          {state === "done" ? (
            <p className="flex items-center gap-3 rounded-2xl border border-gold-500/40 bg-gold-500/10 px-5 py-4 text-sm font-semibold text-gold-300">
              <CheckCircle2 className="size-5 shrink-0" />
              You&apos;re on the list — see you at the next showcase.
            </p>
          ) : (
            <form onSubmit={onSubmit} className="relative flex flex-col gap-3">
              {/* Honeypot — silently dropped server-side with a fake success. */}
              <div aria-hidden="true" className="absolute -left-[9999px] -top-[9999px] size-0 overflow-hidden">
                <label htmlFor="nl-company" className="sr-only">Company</label>
                <input
                  ref={hpRef}
                  id="nl-company"
                  type="text"
                  name="company"
                  tabIndex={-1}
                  autoComplete="off"
                  defaultValue=""
                />
              </div>

              {/* Audience — so the office knows who it is writing to. */}
              <div role="group" aria-label="Which best describes you">
                <p className="font-mono text-[0.56rem] tracking-[0.26em] text-paper/35">
                  I AM A…
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {AUDIENCE_OPTIONS.map((a) => {
                    const selected = audience === a.id;
                    return (
                      <button
                        key={a.id}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => setAudience(a.id)}
                        className={cn(
                          "rounded-full border px-3.5 py-1.5 text-[0.62rem] font-bold uppercase tracking-[0.14em] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400/70",
                          selected
                            ? "border-gold-400 bg-gold-500/15 text-gold-200"
                            : "border-paper/15 text-paper/45 hover:border-paper/35 hover:text-paper/75"
                        )}
                      >
                        {a.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex gap-2.5">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="h-13 w-full flex-1 rounded-full border border-paper/20 bg-ink-950/70 px-5 py-3.5 text-sm text-paper placeholder:text-paper/35 transition-all duration-300 focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-400/20"
              />
              <button
                type="submit"
                disabled={state === "sending"}
                className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-gold-500 px-6 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-ink-950 shadow-[0_8px_22px_-8px_var(--color-gold-500)] transition-all duration-300 hover:bg-gold-300 hover:shadow-glow disabled:cursor-not-allowed disabled:opacity-70"
              >
                {state === "sending" ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <>
                    Notify me
                    <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </>
                )}
              </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </Reveal>
  );
}
