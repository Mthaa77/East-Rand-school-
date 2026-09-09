"use client";
import { OPEN_BACKSTAGE_EVENT } from "@/lib/interaction-events";

import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, MapPin, Phone, Mail, ShieldCheck, ArrowRight, KeyRound } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { AmbientDepth } from "@/components/site/ambient-depth";
import { SaFlag, SaFlagRule } from "@/components/site/sa-trust";
import { NewsletterSignup } from "@/components/site/newsletter-signup";
import { Backstage } from "@/components/site/backstage";

const quickLinks = [
  { label: "About & story", href: "/about" },
  { label: "Programmes", href: "/programmes" },
  { label: "Gallery", href: "/gallery" },
  { label: "News & events", href: "/news" },
  { label: "Admissions", href: "/admissions" },
  { label: "Contact & visits", href: "/contact" },
];

const resourceLinks = [
  { label: "GDE admissions portal", href: "https://www.gdeadmissions.gov.za/" },
  { label: "ERSA on Facebook", href: "https://www.facebook.com/p/East-Rand-School-of-the-Arts-100054238431861/" },
  { label: "ERSA on Instagram", href: "https://www.instagram.com/ersamedia/?hl=en" },
  { label: "ERSA Festival tickets", href: "https://www.quicket.co.za/organisers/85115-east-rand-school-of-the-arts" },
];

export function Footer() {
  return (
    <footer id="contact" className="relative mt-auto overflow-hidden border-t border-paper/10 bg-ink-950">
      {/* lit top edge + ambient air behind the footer surface */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent"
      />
      <AmbientDepth variant="duo" float={false} className="opacity-70" />
      {/* Staff-only backstage panel (also ⌘/Ctrl+Shift+A) */}
      <Backstage />
      {/* CTA band */}
      <div className="mx-auto max-w-7xl px-5 pt-20 sm:px-8 lg:px-10">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-gold-500/25 bg-gradient-to-br from-ink-900 via-ink-800 to-ink-900 px-8 py-14 text-center shadow-lift sheen-top sm:px-14">
            {/* school-banner fabric texture */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-[0.13] [background-image:url(/images/real/brand-banner.jpg)] [background-size:220px]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-900/85 via-ink-900/55 to-ink-900/85"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -top-24 left-1/2 h-48 w-[520px] -translate-x-1/2 rounded-full bg-gold-500/15 blur-3xl"
            />
            <div className="relative">
              <div className="mx-auto mb-6 w-fit">
                <span className="block overflow-hidden rounded-full shadow-photo ring-2 ring-gold-500/45">
                  <span className="relative block size-16">
                    <Image
                      src="/images/crest-circle.webp"
                      alt=""
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </span>
                </span>
              </div>
              <p className="kicker justify-center text-gold-400">Talent has a home</p>
              <h2 className="mx-auto mt-4 max-w-3xl font-display text-[clamp(1.9rem,4.4vw,3.4rem)] font-medium leading-tight text-paper">
                Ready to audition for the class of 2027?
              </h2>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/admissions"
                  className="rounded-full bg-gold-500 px-7 py-4 text-[0.72rem] font-bold uppercase tracking-[0.2em] text-ink-950 shadow-[0_10px_30px_-10px_var(--color-gold-500)] transition-all duration-300 hover:bg-gold-300 hover:-translate-y-0.5 hover:shadow-glow"
                >
                  Start an enquiry
                </Link>
                <a
                  href="https://www.gdeadmissions.gov.za/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-paper/25 bg-ink-950/40 px-7 py-4 text-[0.72rem] font-bold uppercase tracking-[0.2em] text-paper backdrop-blur-sm transition-colors duration-300 hover:border-gold-400 hover:text-gold-300"
                >
                  Apply on GDE portal
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Newsletter band */}
      <div className="mx-auto max-w-7xl px-5 pt-14 sm:px-8 lg:px-10">
        <NewsletterSignup />
      </div>

      {/* Main footer */}
      <div className="mx-auto max-w-7xl px-5 pb-10 pt-14 sm:px-8 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Link href="/" className="group flex items-center gap-3">
              <span className="relative size-12 shrink-0 overflow-hidden rounded-full ring-1 ring-gold-500/50 shadow-[0_6px_18px_-6px_rgba(0,0,0,0.7)] transition-transform duration-500 group-hover:scale-105">
                <Image
                  src="/images/crest-circle.webp"
                  alt=""
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </span>
              <span className="flex flex-col leading-none">
                <span className="font-display text-2xl font-semibold text-paper">ERSA</span>
                <span className="text-[0.55rem] uppercase tracking-[0.3em] text-paper/50">
                  East Rand School of the Arts
                </span>
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-paper/55">
              A public Gauteng Department of Education School of Specialisation in the
              Arts — where Daveyton and Benoni train their dancers, designers, actors,
              artists and musicians.
            </p>
            <p className="mt-4 font-mono text-[0.58rem] uppercase tracking-[0.26em] text-gold-500/80">
              Achievement through excellence — the school motto
            </p>
            <p className="font-display font-display-wonk mt-2 text-[0.95rem] italic text-gold-300/90">
              The work behind the spotlight.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href="https://www.facebook.com/p/East-Rand-School-of-the-Arts-100054238431861/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="ERSA on Facebook"
                className="grid size-10 place-items-center rounded-full border border-paper/15 bg-ink-900/50 text-paper/60 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-400 hover:text-gold-300"
              >
                <Facebook className="size-4" />
              </a>
              <a
                href="https://www.instagram.com/ersamedia/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="ERSA on Instagram"
                className="grid size-10 place-items-center rounded-full border border-paper/15 bg-ink-900/50 text-paper/60 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-400 hover:text-gold-300"
              >
                <Instagram className="size-4" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="lg:col-span-2">
            <h3 className="text-[0.68rem] font-bold uppercase tracking-[0.26em] text-gold-400">
              Explore
            </h3>
            <ul className="mt-5 space-y-3">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="group inline-flex items-center gap-2 text-sm text-paper/55 transition-all duration-300 hover:translate-x-1 hover:text-gold-300"
                  >
                    {l.label}
                    <ArrowRight className="size-3 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="lg:col-span-3">
            <h3 className="text-[0.68rem] font-bold uppercase tracking-[0.26em] text-gold-400">
              Official channels
            </h3>
            <ul className="mt-5 space-y-3">
              {resourceLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 text-sm text-paper/55 transition-colors hover:text-paper"
                  >
                    {l.label}
                    <span className="opacity-0 transition-opacity duration-300 group-hover:opacity-60">
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h3 className="text-[0.68rem] font-bold uppercase tracking-[0.26em] text-gold-400">
              Visit & contact
            </h3>
            <ul className="mt-5 space-y-4 text-sm text-paper/55">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-gold-500" />
                1 Jones Street, Daveyton / Putfontein,
                <br />
                Benoni, Gauteng, South Africa
              </li>
              <li className="flex items-center gap-3">
                <Phone className="size-4 shrink-0 text-gold-500" />
                <a href="tel:+270100071186" className="transition-colors hover:text-paper">
                  010 007 1186
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="size-4 shrink-0 text-gold-500" />
                <a
                  href="mailto:admin@ersa.co.za"
                  className="transition-colors hover:text-paper"
                >
                  admin@ersa.co.za
                </a>
              </li>
            </ul>
            <p className="mt-5 text-[0.65rem] leading-relaxed text-paper/35">
              Contact details shown are the best publicly available records and are being
              verified with the school office.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-paper/10 pt-7 sm:flex-row">
          <p className="flex items-center gap-2.5 text-xs text-paper/40">
            <span
              aria-hidden="true"
              className="relative hidden size-4 shrink-0 sm:block"
            >
              <Image
                src="/images/brand/motif.webp"
                alt=""
                fill
                sizes="16px"
                className="object-contain"
              />
            </span>
            <SaFlag className="h-3 w-4.5" />
            <span>
              © 2026 East Rand School of the Arts. A Gauteng Department of
              Education school — proudly South African.
            </span>
          </p>
          <p className="flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.18em] text-paper/35">
            <ShieldCheck className="size-3.5 text-gold-500/70" />
            Content last verified · September 2026 · All times SAST (UTC+02:00)
            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent(OPEN_BACKSTAGE_EVENT))}
              aria-label="Backstage access — staff only"
              title="Backstage access — staff only"
              className="ml-1 grid size-7 place-items-center rounded-full text-paper/30 transition-all duration-300 hover:bg-paper/10 hover:text-gold-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400/70"
            >
              <KeyRound className="size-3.5" />
            </button>
          </p>
        </div>
      </div>

      {/* national accent above the giant wordmark */}
      <SaFlagRule className="mt-16 opacity-50" />

      {/* Giant wordmark */}
      <div aria-hidden="true" className="overflow-hidden pb-2">
        <p className="text-center font-display text-[18.5vw] font-bold leading-[0.8] text-outline opacity-[0.16] select-none">
          ERSA
        </p>
      </div>
    </footer>
  );
}
