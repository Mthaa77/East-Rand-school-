import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";

/**
 * Official-brand bands built from the school's uploaded crest asset kit:
 *  - MottoBand: cream seal with the full crest, the gold ribbon and the motto.
 *  - CrestStrip: framed full-bleed brand scene with a caption chip.
 * All artwork comes from the school's official brand board (uploaded assets) —
 * no invented facts, only what is visible on the crest itself.
 */

export function MottoBand({ className = "" }: { className?: string }) {
  return (
    <section
      aria-label="The school crest and motto"
      className={`relative overflow-hidden border-y border-gold-500/25 bg-paper text-ink-950 ${className}`}
    >
      {/* the crest-board geometric pattern, faint, as paper texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.10] [background-image:url(/images/brand/pattern.webp)] [background-size:190px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-500/70 to-transparent"
      />
      <div className="relative mx-auto max-w-3xl px-5 py-16 text-center sm:px-8 sm:py-20">
        <Reveal>
          <p className="kicker justify-center text-ink-800/70">
            <span className="h-px w-9 bg-gold-600" />
            The school crest
            <span className="h-px w-9 bg-gold-600" />
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <span className="mx-auto mt-7 block w-fit drop-shadow-[0_18px_28px_rgba(90,62,10,0.25)]">
            <Image
              src="/images/brand/crest-full.webp"
              alt="The official ERSA crest — a green and gold shield carrying the painter's palette, drum, open book, dancer and theatrical masks, above the motto banner"
              width={427}
              height={377}
              sizes="140px"
              className="w-[112px] sm:w-[132px]"
              priority
            />
          </span>
        </Reveal>

        <Reveal delay={0.2}>
          <span className="mx-auto mt-5 block w-fit">
            <Image
              src="/images/brand/ribbon.webp"
              alt=""
              aria-hidden="true"
              width={537}
              height={166}
              sizes="300px"
              className="w-[240px] sm:w-[300px]"
            />
          </span>
          <h2 className="mt-4 font-display text-[clamp(1.5rem,3.4vw,2.2rem)] font-medium leading-tight text-ink-950">
            Achievement through{" "}
            <em className="font-display-wonk font-light italic text-crimson-700">
              excellence.
            </em>
          </h2>
          <p className="mx-auto mt-3 max-w-md font-newsreader text-[0.92rem] italic leading-relaxed text-ink-800/65">
            The motto carried on the school&apos;s crest — the standard behind
            every spotlight.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export function CrestStrip({
  src,
  alt,
  caption,
  kicker,
  priority = false,
}: {
  src: string;
  alt: string;
  caption: string;
  kicker: string;
  priority?: boolean;
}) {
  return (
    <section aria-label={alt} className="relative bg-ink-950">
      <div className="mx-auto max-w-7xl px-5 pt-14 sm:px-8 lg:px-10 lg:pt-16">
        <Reveal>
          <figure className="photo-frame relative aspect-[16/10] overflow-hidden rounded-3xl ring-1 ring-gold-500/25 shadow-lift sm:aspect-[21/8]">
            <Image
              src={src}
              alt={alt}
              fill
              priority={priority}
              sizes="(max-width: 640px) 100vw, (max-width: 1280px) 92vw, 1200px"
              className="object-cover"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-transparent to-ink-950/10"
            />
            <figcaption className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-gold-500/40 bg-ink-950/70 px-4 py-2 font-mono text-[0.58rem] font-bold uppercase tracking-[0.22em] text-gold-300 backdrop-blur-sm">
                {kicker}
              </span>
              <span className="mt-2 hidden max-w-lg font-display text-[0.95rem] font-medium italic leading-snug text-paper/85 sm:block">
                {caption}
              </span>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
