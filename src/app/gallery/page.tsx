import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Camera } from "lucide-react";
import { PageHero, PageBand } from "@/components/site/page-hero";
import { Showcase } from "@/components/site/showcase";
import { SectionHeading } from "@/components/site/proof-bar";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { pageByPath } from "@/lib/navigation";
import { CrestStrip } from "@/components/site/brand-band";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Learner work in focus — stage lights, studio floors and school life at ERSA. Made after the bell, shown under lights, at 1 Jones Street, Daveyton.",
};

/**
 * Real school photography (school-supplied, Task 12). Kept at small display
 * widths — the source images are 415–800px wide, so nothing here renders
 * above ~900px display width.
 */
const realPhotos = [
  {
    src: "/images/real/learners-entrance.jpg",
    alt: "Three matric learners standing together at the school's front gate",
    caption: "Front gate, break time",
    aspect: "aspect-[3/4]",
  },
  {
    src: "/images/real/learners-stairs.jpg",
    alt: "Two learners seated on the front steps of the school building",
    caption: "On the front steps",
    aspect: "aspect-[3/4]",
  },
  {
    src: "/images/real/choir-principal.jpg",
    alt: "The school choir posed together with the principal",
    caption: "Festival choir with the principal",
    aspect: "aspect-[3/4]",
  },
  {
    src: "/images/real/care-drive.jpg",
    alt: "Learners and staff at the school's sanitary dignity drive handover",
    caption: "Care beyond the stage — dignity drive",
    aspect: "aspect-[4/3] lg:mt-10",
  },
] as const;

/**
 * The five discipline portraits (AI-generated studio imagery, same set the
 * homepage dossiers use) — each door links to the programmes page.
 */
const studioDoors = [
  {
    src: "/images/disc-visual-arts.webp",
    alt: "A young artist painting on a large canvas in a golden-lit studio",
    title: "Visual Arts",
  },
  {
    src: "/images/disc-design.webp",
    alt: "A design student sketching ideas under a warm desk lamp",
    title: "Design",
  },
  {
    src: "/images/disc-drama.webp",
    alt: "A drama student performing under a warm stage spotlight",
    title: "Dramatic Arts",
  },
  {
    src: "/images/disc-dance.webp",
    alt: "Dancers rehearsing contemporary choreography in warm window light",
    title: "Dance Studies",
  },
  {
    src: "/images/disc-music.webp",
    alt: "A young musician playing saxophone in golden rim light",
    title: "Music",
  },
] as const;

const CONTINUE_LINKS = ["/news", "/programmes"] as const;

export default function GalleryPage() {
  return (
    <div className="flex min-h-screen flex-col bg-ink-950 text-paper">
      <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
        {/* ── 1. Masthead ─────────────────────────────────────────────── */}
        <PageHero
          kicker="The work, in focus"
          title="Made after the bell. Shown under lights."
          accentWords={["lights"]}
          lede="Learner work and school life — on stage, in studio and everywhere in between. The bell ends the timetable; the work keeps going. Scroll the showcase, then meet the real campus."
          crumb="Gallery"
          image="/images/page-gallery.webp"
          imageAlt="Framed student artworks lit by brass picture lights on a dark gallery wall"
        />

        {/* ── 1b. Where the work starts — brand sketchbook scene ──────── */}
        <CrestStrip
          src="/images/brand/crest-sketchbook.webp"
          alt="The ERSA crest beside an open sketchbook, paints, brushes and drafting tools on marble and wood"
          kicker="The work behind the spotlight"
          caption="Every shown piece starts as unglamorous hours at a desk — pencil, paint and a page that waits."
        />

        {/* ── 2. Learner work showcase (own scroll-driven ink section) ─── */}
        <Showcase />

        {/* ── 3. Real learners, real campus ───────────────────────────── */}
        <PageBand
          tone="paper"
          className="py-24 sm:py-28"
          ariaLabel="Real learners, real campus"
        >
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <SectionHeading
              dark
              kicker="On campus"
              title="Real learners, real campus."
              accentWords={["campus"]}
              description="No stock models and no borrowed halls — the photographs below are the school's own learners, on the school's own steps, gates and stages."
            />

            <div className="mt-14 grid grid-cols-1 items-start gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <Stagger stagger={0.1} className="contents">
                {realPhotos.map((p) => (
                  <StaggerItem key={p.src} className="h-full">
                    <figure>
                      <div
                        className={cn(
                          "photo-frame relative w-full overflow-hidden",
                          p.aspect
                        )}
                      >
                        <Image
                          src={p.src}
                          alt={p.alt}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.04]"
                        />
                      </div>
                      <figcaption className="mt-3 flex items-baseline gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-ink-800/60">
                        {p.caption}
                      </figcaption>
                    </figure>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>

            <Reveal delay={0.1}>
              <p className="mt-10 max-w-3xl border-l-2 border-crimson-500 pl-4 text-xs leading-relaxed text-ink-800/60">
                Photography shows the school&apos;s own learners, captured at
                school events. It is published with care — and it stands in for
                a fuller gallery of credited learner work, which follows once
                the school confirms consent for each piece.
              </p>
            </Reveal>
          </div>
        </PageBand>

        {/* ── 4. Five studios, five doors — teaser to /programmes ─────── */}
        <PageBand
          tone="ink"
          className="py-24 sm:py-28"
          ariaLabel="Five studios, five doors"
        >
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <SectionHeading
              kicker="Where the work happens"
              title="Five studios, five doors."
              accentWords={["doors"]}
              description="Every canvas, note and step above was made inside one of the five disciplines. Pick a door — the training behind it happens daily."
            />

            <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {studioDoors.map((d, i) => (
                <Reveal key={d.title} delay={0.07 * i} className="h-full">
                  <Link
                    href="/programmes"
                    aria-label={`Explore the ${d.title} discipline on the programmes page`}
                    className="group relative block aspect-[3/4] h-full w-full overflow-hidden rounded-2xl border border-paper/10 shadow-card transition-all duration-500 hover:-translate-y-1 hover:border-gold-400/60 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400/70"
                  >
                    <Image
                      src={d.src}
                      alt={d.alt}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                      className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/20 to-transparent"
                    />
                    <span className="absolute inset-x-0 bottom-0 block p-4 sm:p-5">
                      <span className="block font-mono text-[0.6rem] tracking-[0.3em] text-gold-300/90">
                        0{i + 1}
                      </span>
                      <span className="mt-1 block font-display text-lg font-medium text-paper transition-colors duration-300 group-hover:text-gold-300 sm:text-xl">
                        {d.title}
                      </span>
                    </span>
                    <span
                      aria-hidden="true"
                      className="absolute right-3.5 top-3.5 grid size-9 place-items-center rounded-full border border-paper/20 bg-ink-950/40 opacity-0 backdrop-blur-sm transition-all duration-500 group-hover:rotate-45 group-hover:border-gold-400 group-hover:opacity-100"
                    >
                      <ArrowRight className="size-3.5 -rotate-45 text-gold-300" />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.15}>
              <p className="mt-8 flex items-center gap-2.5 text-[0.7rem] text-paper/40">
                <Camera className="size-4 text-gold-500/70" aria-hidden="true" />
                Studio imagery is illustrative — real learner work, credited and
                consented, replaces it as the school releases it.
              </p>
            </Reveal>
          </div>
        </PageBand>

        {/* ── 5. Continue band ─────────────────────────────────────────── */}
        <PageBand
          tone="ink"
          className="py-24 sm:py-28"
          ariaLabel="Keep exploring the site"
        >
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <SectionHeading
              kicker="Keep turning the pages"
              title="See it. Then come make it."
              accentWords={["make"]}
              description="Check the notice board for the next performance, or open the door to the discipline itself."
            />
            <div className="mt-12 grid gap-5 sm:grid-cols-2">
              {CONTINUE_LINKS.map((path, i) => {
                const page = pageByPath(path);
                if (!page) return null;
                return (
                  <Reveal key={path} delay={0.1 * i} className="h-full">
                    <Link
                      href={page.path}
                      className="group flex h-full items-center justify-between gap-6 rounded-2xl border border-paper/10 bg-ink-900/60 p-6 shadow-card transition-all duration-500 hover:-translate-y-0.5 hover:border-gold-400/50 hover:shadow-lift sm:p-7"
                    >
                      <span className="min-w-0">
                        <span className="block text-[0.62rem] font-bold uppercase tracking-[0.26em] text-gold-500/80">
                          {page.short}
                        </span>
                        <span className="mt-2 block font-display text-2xl font-medium text-paper transition-colors duration-300 group-hover:text-gold-300">
                          {page.label}
                        </span>
                        <span className="mt-2 block text-sm leading-relaxed text-paper/55">
                          {page.description}
                        </span>
                      </span>
                      <span
                        aria-hidden="true"
                        className="grid size-12 shrink-0 place-items-center rounded-full border border-paper/20 transition-all duration-500 group-hover:border-gold-400 group-hover:bg-gold-500/15"
                      >
                        <ArrowRight className="size-5 text-paper/70 transition-all duration-300 group-hover:translate-x-1 group-hover:text-gold-300" />
                      </span>
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </PageBand>
      </main>
    </div>
  );
}
