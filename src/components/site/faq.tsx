"use client";

import { Plus } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "@/components/motion/reveal";
import { faqs } from "@/lib/faqs";

export function Faq() {
  return (
    <div id="faq" className="mt-20 grid scroll-mt-28 gap-10 lg:grid-cols-12">
      <div className="lg:col-span-4">
        <Reveal>
          <p className="kicker text-crimson-600">
            <span className="h-px w-9 bg-crimson-600" />
            Parent FAQ
          </p>
          <h3 className="mt-4 font-display text-3xl font-medium leading-tight text-ink-950 sm:text-4xl">
            The questions every family asks.
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-ink-800/65">
            Plain answers first — then phone the office for anything specific to your
            learner. Nothing here replaces the official GDE process.
          </p>
        </Reveal>
      </div>

      <Reveal delay={0.1} className="lg:col-span-8">
        <Accordion type="single" collapsible className="rounded-2xl border border-ink-950/10 bg-paper px-6 shadow-card">
          {faqs.map((f, i) => (
            <AccordionItem key={f.q} value={`faq-${i}`} className="border-ink-950/10">
              <AccordionTrigger className="group py-5 text-left font-display text-lg font-medium text-ink-950 hover:no-underline hover:text-crimson-600 [&[data-state=open]]:text-crimson-600 [&>svg:last-child]:hidden">
                <span className="flex items-baseline gap-4">
                  <span className="font-mono text-[0.7rem] tracking-[0.2em] text-ink-800/40">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {f.q}
                </span>
                <Plus className="pointer-events-none size-4 shrink-0 text-crimson-600 transition-transform duration-300 group-data-[state=open]:rotate-45 [&[data-state=open]>svg]:rotate-0" />
              </AccordionTrigger>
              <AccordionContent className="pl-9 pr-8 pb-6 text-sm leading-relaxed text-ink-800/70">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </div>
  );
}
