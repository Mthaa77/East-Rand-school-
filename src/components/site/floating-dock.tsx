"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { HandHeart, Mail, Phone, Music, Building2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

/* ------------------------------------------------------------------ */
/*  Shared pieces                                                      */
/* ------------------------------------------------------------------ */

const EASE = [0.22, 1, 0.36, 1] as const;

const iconBase =
  "relative grid size-10 shrink-0 place-items-center rounded-full border backdrop-blur-md transition-all duration-300 group-hover:-translate-y-0.5 lg:size-11";

/** Expanding glass label that reveals on hover / keyboard focus. */
function DockLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "pointer-events-none hidden overflow-hidden whitespace-nowrap rounded-full border border-paper/15 bg-ink-950/85 px-0 py-2 text-[0.62rem] font-bold uppercase tracking-[0.22em] text-paper/90 opacity-0 shadow-card backdrop-blur-md transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:px-4 group-hover:opacity-100 group-focus-within:px-4 group-focus-within:opacity-100 sm:block",
        "max-w-0 group-hover:max-w-[16rem] group-focus-within:max-w-[16rem]",
        className
      )}
    >
      {children}
    </span>
  );
}

/** WhatsApp brand glyph — lucide dropped brand icons, so it's inlined here. */
function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  );
}

/* Channel anchors — shared by the mobile bar and the desktop rail */

const channelBase =
  "grid size-10 place-items-center rounded-full border backdrop-blur-md transition-all duration-300 active:scale-95 lg:size-11";

function WhatsAppAnchor({ labelled = false }: { labelled?: boolean }) {
  if (labelled) {
    return (
      <a
        href="https://wa.me/27100071186"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp the school office on 010 007 1186"
        className="group flex items-center justify-end gap-2.5 outline-none"
      >
        <DockLabel>WhatsApp · 010 007 1186</DockLabel>
        <span
          className={cn(
            iconBase,
            "border-emerald-400/35 bg-ink-950/70 text-emerald-300 shadow-[0_8px_24px_-10px_rgba(0,0,0,0.8)] hover:border-emerald-300 hover:bg-emerald-400 hover:text-ink-950 hover:shadow-[0_10px_28px_-8px_rgba(52,211,153,0.55)]"
          )}
        >
          <WhatsAppGlyph className="size-5" />
        </span>
      </a>
    );
  }
  return (
    <a
      href="https://wa.me/27100071186"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp the school office on 010 007 1186"
      className={cn(
        channelBase,
        "border-emerald-400/35 bg-ink-950/60 text-emerald-300 hover:border-emerald-300 hover:bg-emerald-400 hover:text-ink-950"
      )}
    >
      <WhatsAppGlyph className="size-5" />
    </a>
  );
}

function PhoneAnchor({ labelled = false }: { labelled?: boolean }) {
  if (labelled) {
    return (
      <a
        href="tel:+270100071186"
        aria-label="Phone the school office on 010 007 1186"
        className="group flex items-center justify-end gap-2.5 outline-none"
      >
        <DockLabel>Call · 010 007 1186</DockLabel>
        <span
          className={cn(
            iconBase,
            "border-gold-500/45 bg-ink-950/70 text-gold-300 shadow-[0_8px_24px_-10px_rgba(0,0,0,0.8)] hover:border-gold-300 hover:bg-gold-400 hover:text-ink-950 hover:shadow-glow"
          )}
        >
          <Phone className="size-4.5" />
        </span>
      </a>
    );
  }
  return (
    <a
      href="tel:+270100071186"
      aria-label="Phone the school office on 010 007 1186"
      className={cn(
        channelBase,
        "border-gold-500/45 bg-ink-950/60 text-gold-300 hover:border-gold-300 hover:bg-gold-400 hover:text-ink-950"
      )}
    >
      <Phone className="size-4.5" />
    </a>
  );
}

function EmailAnchor({ labelled = false }: { labelled?: boolean }) {
  if (labelled) {
    return (
      <a
        href="mailto:admin@ersa.co.za"
        aria-label="Email the school office at admin@ersa.co.za"
        className="group flex items-center justify-end gap-2.5 outline-none"
      >
        <DockLabel>Email the office</DockLabel>
        <span
          className={cn(
            iconBase,
            "border-crimson-400/40 bg-ink-950/70 text-crimson-300 shadow-[0_8px_24px_-10px_rgba(0,0,0,0.8)] hover:border-crimson-300 hover:bg-crimson-500 hover:text-snow hover:shadow-glow-red"
          )}
        >
          <Mail className="size-4.5" />
        </span>
      </a>
    );
  }
  return (
    <a
      href="mailto:admin@ersa.co.za"
      aria-label="Email the school office at admin@ersa.co.za"
      className={cn(
        channelBase,
        "border-crimson-400/40 bg-ink-950/60 text-crimson-300 hover:border-crimson-300 hover:bg-crimson-500 hover:text-snow"
      )}
    >
      <Mail className="size-4.5" />
    </a>
  );
}

/* ------------------------------------------------------------------ */
/*  Contact rail — right edge (sm and up)                              */
/* ------------------------------------------------------------------ */

function ContactRail() {
  return (
    <motion.aside
      initial={{ opacity: 0, x: 28 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.9, delay: 1.15, ease: EASE }}
      className="fixed top-1/2 right-4 z-[75] hidden -translate-y-1/2 sm:block"
      aria-label="Contact the school"
    >
      <div className="flex flex-col items-end gap-2">
        <span
          aria-hidden="true"
          className="mb-1 mr-[7px] hidden text-[0.55rem] font-semibold uppercase tracking-[0.34em] text-paper/30 [writing-mode:vertical-rl] lg:block"
        >
          Talk to us
        </span>
        <WhatsAppAnchor labelled />
        <PhoneAnchor labelled />
        <EmailAnchor labelled />
      </div>
    </motion.aside>
  );
}

/* ------------------------------------------------------------------ */
/*  Support rail — left edge (sm and up)                               */
/* ------------------------------------------------------------------ */

const supportPaths = [
  {
    icon: Building2,
    title: "Partner with a School of Specialisation",
    line: "Institutional partners already share our stage — Tshwane University of Technology (MoU since 2024), the National School of the Arts and Pro Arte Alphen Park. Add your organisation to that programme.",
  },
  {
    icon: Sparkles,
    title: "Sponsor the ERSA Festival",
    line: "The annual ERSA Festival, hosted with the Rhoo Hlatshwayo Arts Centre, puts every discipline on a public stage. Talk to the office about backing the next edition.",
  },
  {
    icon: Music,
    title: "Give instruments, materials & time",
    line: "From music instruments to art materials and guest masterclasses — ask the office what the studios and ensembles need this term.",
  },
] as const;

/** Slow radar ping behind the donation beacon. */
function SupportPing() {
  return (
    <span
      aria-hidden="true"
      className="absolute inset-0 rounded-full bg-crimson-400/50 animate-ping [animation-duration:3.4s]"
    />
  );
}

function SupportRail({
  supportOpen,
  onOpen,
}: {
  supportOpen: boolean;
  onOpen: () => void;
}) {
  return (
    <motion.aside
      initial={{ opacity: 0, x: -28 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.9, delay: 1.15, ease: EASE }}
      className="fixed top-1/2 left-4 z-[75] hidden -translate-y-1/2 sm:block"
      aria-label="Support the school"
    >
      <div className="flex flex-col items-start gap-2">
        <button
          onClick={onOpen}
          aria-haspopup="dialog"
          aria-expanded={supportOpen}
          className="group flex items-center gap-2.5 outline-none"
        >
          <span className="relative">
            <SupportPing />
            <span
              className={cn(
                iconBase,
                "border-crimson-300/60 bg-crimson-600 text-snow shadow-glow-red hover:border-crimson-300 hover:bg-crimson-500"
              )}
            >
              <HandHeart className="size-5" />
            </span>
          </span>
          <DockLabel className="text-snow">Support ERSA</DockLabel>
        </button>
        <span
          aria-hidden="true"
          className="mt-1 ml-[7px] hidden text-[0.55rem] font-semibold uppercase tracking-[0.34em] text-paper/30 [writing-mode:vertical-rl] lg:block"
        >
          Support the arts
        </span>
      </div>
    </motion.aside>
  );
}

/* ------------------------------------------------------------------ */
/*  Support & donations dialog                                         */
/* ------------------------------------------------------------------ */

function SupportDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] overflow-y-auto rounded-3xl border-paper/15 bg-ink-900/97 text-paper shadow-panel backdrop-blur-xl sm:max-w-lg">
        {/* top sheen hairline — .sheen-top itself forces position:relative,
            which would break the dialog's fixed positioning, so it's applied
            to an overlay child instead */}
        <span
          aria-hidden="true"
          className="sheen-top pointer-events-none absolute inset-x-0 top-0 block h-0"
        />
        <DialogHeader className="gap-3 text-left">
          <div className="flex items-center gap-3.5">
            <span className="relative size-12 shrink-0 overflow-hidden rounded-full shadow-lift ring-2 ring-gold-500/60">
              <Image
                src="/images/brand/flat-icon.webp"
                alt="The ERSA crest"
                fill
                sizes="48px"
                className="object-cover"
              />
            </span>
            <div className="min-w-0">
              <span className="inline-flex items-center gap-2 font-mono text-[0.62rem] font-bold uppercase tracking-[0.3em] text-crimson-300">
                <HandHeart className="size-3.5" aria-hidden="true" />
                Support ERSA
              </span>
              <DialogTitle className="mt-1 font-display text-2xl font-semibold text-balance text-paper sm:text-[1.75rem]">
                Help keep the stage lights on.
              </DialogTitle>
            </div>
          </div>
          <DialogDescription className="font-newsreader text-base leading-relaxed text-paper/75 italic">
            ERSA is a public school. Partners, alumni and friends of the arts
            are invited to invest in Daveyton&apos;s creative future — every
            enquiry is routed through the school office.
          </DialogDescription>
        </DialogHeader>

        <ul className="mt-0.5 space-y-2">
          {supportPaths.map((path) => (
            <li
              key={path.title}
              className="group flex gap-3.5 rounded-2xl border border-paper/10 bg-ink-950/60 p-3.5 transition-colors duration-300 hover:border-gold-500/40"
            >
              <span className="grid size-9 shrink-0 place-items-center rounded-full border border-gold-500/40 bg-gold-500/10 text-gold-300">
                <path.icon className="size-4" aria-hidden="true" />
              </span>
              <div className="space-y-1">
                <p className="text-sm font-semibold text-paper">{path.title}</p>
                <p className="text-[0.8rem] leading-relaxed text-paper/65">{path.line}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-1 flex flex-col gap-2.5 rounded-2xl border border-crimson-400/25 bg-crimson-700/25 p-3.5 sm:flex-row sm:items-center">
          <p className="flex-1 text-[0.78rem] leading-relaxed text-paper/75">
            Nothing is collected on this website — donations and sponsorships
            are arranged directly with the school office.
          </p>
        </div>

        <div className="mt-1 flex flex-col gap-2.5 sm:flex-row">
          <a
            href="tel:+270100071186"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-gold-500 px-5 py-3 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-ink-950 shadow-[0_8px_22px_-8px_var(--color-gold-500)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-300"
          >
            <Phone className="size-4" aria-hidden="true" />
            010 007 1186
          </a>
          <a
            href="mailto:admin@ersa.co.za?subject=Supporting%20ERSA"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-paper/20 bg-ink-950/70 px-5 py-3 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-paper transition-all duration-300 hover:-translate-y-0.5 hover:border-crimson-300/60 hover:text-crimson-300"
          >
            <Mail className="size-4" aria-hidden="true" />
            Email the office
          </a>
        </div>

        <p className="mt-1 text-center font-mono text-[0.6rem] uppercase tracking-[0.26em] text-paper/40">
          1 Jones Street · Daveyton · Benoni
        </p>
      </DialogContent>
    </Dialog>
  );
}

/* ------------------------------------------------------------------ */
/*  FloatingDocks — mounted once in the root layout                    */
/*  · mobile  → one merged bottom capsule (support | WA · tel · mail)  */
/*  · sm+     → left support rail + right contact rail                 */
/* ------------------------------------------------------------------ */

export function FloatingDocks() {
  const [supportOpen, setSupportOpen] = useState(false);
  const openSupport = () => setSupportOpen(true);

  return (
    <>
      {/* Mobile — merged bottom capsule bar */}
      <motion.nav
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.15, ease: EASE }}
        className="fixed inset-x-0 bottom-4 z-[75] flex justify-center px-4 sm:hidden"
        aria-label="Contact and support"
      >
        <div className="flex items-center gap-1.5 rounded-full border border-paper/15 bg-ink-950/90 p-1.5 shadow-panel backdrop-blur-xl">
          <button
            onClick={openSupport}
            aria-haspopup="dialog"
            aria-expanded={supportOpen}
            aria-label="Support ERSA — donations and partnerships"
            className={cn(
              channelBase,
              "relative border-crimson-300/60 bg-crimson-600 text-snow shadow-glow-red hover:bg-crimson-500"
            )}
          >
            <SupportPing />
            <HandHeart className="size-5" />
          </button>
          <span aria-hidden="true" className="mx-0.5 h-6 w-px bg-paper/15" />
          <WhatsAppAnchor />
          <PhoneAnchor />
          <EmailAnchor />
        </div>
      </motion.nav>

      {/* sm+ — side rails */}
      <ContactRail />
      <SupportRail supportOpen={supportOpen} onOpen={openSupport} />

      <SupportDialog open={supportOpen} onOpenChange={setSupportOpen} />
    </>
  );
}
