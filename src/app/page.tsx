import dynamic from "next/dynamic";
import { faqs } from "@/lib/faqs";
import { db } from "@/lib/db";
import { Hero } from "@/components/site/hero";
import { SosBand } from "@/components/site/sos-band";
import { ProofBar } from "@/components/site/proof-bar";
import { AwardBand } from "@/components/site/award-band";
import { Disciplines } from "@/components/site/disciplines";

/* Below-the-fold sections load as async chunks: the server still renders
   their full HTML (SEO intact), but their JS hydrates after the main bundle,
   cutting time-to-interactive on this 16-section page. Above-the-fold
   sections (Hero → Disciplines) stay in the first bundle. */
const PrincipalsWelcome = dynamic(() =>
  import("@/components/site/principals-welcome").then(
    (m) => m.PrincipalsWelcome
  )
);
const StageShowcase = dynamic(() =>
  import("@/components/site/stage-showcase").then((m) => m.StageShowcase)
);
const Manifesto = dynamic(() => import("@/components/site/manifesto").then((m) => m.Manifesto));
const Method = dynamic(() => import("@/components/site/method").then((m) => m.Method));
const LearnerLife = dynamic(() =>
  import("@/components/site/learner-life").then((m) => m.LearnerLife)
);
const Moments = dynamic(() => import("@/components/site/moments").then((m) => m.Moments));
const Showcase = dynamic(() => import("@/components/site/showcase").then((m) => m.Showcase));
const Impact = dynamic(() => import("@/components/site/impact").then((m) => m.Impact));
const Alumni = dynamic(() => import("@/components/site/alumni").then((m) => m.Alumni));
const Events = dynamic(() => import("@/components/site/events").then((m) => m.Events));
const Admissions = dynamic(() =>
  import("@/components/site/admissions").then((m) => m.Admissions)
);
const SaTrust = dynamic(() => import("@/components/site/sa-trust").then((m) => m.SaTrust));
const SiteIndex = dynamic(() => import("@/components/site/site-index").then((m) => m.SiteIndex));
import { MottoBand } from "@/components/site/brand-band";

/* ISR: the front page is fully static HTML that quietly rebuilds every 5 min
   (prod only — dev always renders fresh). The notice board itself stays live
   via the client-side /api/events fetch, so nothing visible goes stale. */
export const revalidate = 300;

const schoolJsonLd = {
  "@context": "https://schema.org",
  "@type": "School",
  name: "East Rand School of the Arts",
  alternateName: "ERSA",
  description:
    "A public Gauteng Department of Education School of Specialisation in the Arts in Daveyton, Benoni — offering Visual Arts, Design, Dramatic Arts, Dance Studies and Music.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "1 Jones Street, Daveyton / Putfontein",
    addressLocality: "Benoni",
    addressRegion: "Gauteng",
    addressCountry: "ZA",
  },
  sameAs: [
    "https://www.facebook.com/p/East-Rand-School-of-the-Arts-100054238431861/",
    "https://www.instagram.com/ersamedia/?hl=en",
  ],
  telephone: "+27 10 007 1186",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

// schema.org/Event entries for published, dated, upcoming events — keeps the
// notice board machine-readable for search. Silent no-op if the DB is down.
async function getEventJsonLd(): Promise<unknown[] | null> {
  try {
    const today = new Date().toISOString().slice(0, 10);
    const events = await db.schoolEvent.findMany({
      where: { published: true, category: "event", dateISO: { gte: today } },
      orderBy: [{ sortOrder: "asc" }],
      select: {
        title: true,
        summary: true,
        dateISO: true,
        venue: true,
        ctaHref: true,
      },
    });
    return events.map((e) => ({
      "@context": "https://schema.org",
      "@type": "Event",
      name: e.title,
      description: e.summary,
      startDate: e.dateISO,
      eventStatus: "https://schema.org/EventScheduled",
      location: {
        "@type": "Place",
        name: e.venue ?? "East Rand School of the Arts",
        address: {
          "@type": "PostalAddress",
          streetAddress: "1 Jones Street, Daveyton / Putfontein",
          addressLocality: "Benoni",
          addressRegion: "Gauteng",
          addressCountry: "ZA",
        },
      },
      ...(e.ctaHref ? { url: e.ctaHref } : {}),
      organizer: {
        "@type": "School",
        name: "East Rand School of the Arts",
        telephone: "+27 10 007 1186",
      },
    }));
  } catch {
    return null;
  }
}

export default async function Home() {
  const eventJsonLd = await getEventJsonLd();

  return (
    <div className="flex min-h-screen flex-col bg-ink-950 text-paper">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schoolJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {eventJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
        />
      )}
      <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
        <Hero />
        {/* Cinematic welcome + the Principal's Desk message */}
        <PrincipalsWelcome />
        {/* What "School of Specialisation" legally means — GDE-sourced facts */}
        <SosBand />
        <ProofBar />
        {/* The newest receipt — Gauteng Art win at "Be the Voice", in school red */}
        <AwardBand />
        {/* South African public-education trust signals */}
        <SaTrust />
        {/* Each reusable section carries a link to its dedicated page. */}
        <Disciplines pageHref="/programmes" pageLabel="Open the programmes page" />
        {/* Cinematic pinned sequence — the five disciplines as five acts */}
        <StageShowcase />
        <Manifesto />
        <Method pageHref="/about" pageLabel="Open our story" />
        <LearnerLife pageHref="/about" pageLabel="More about school life" />
        {/* The school in its colours — snow-white contact sheet + catchment */}
        <Moments />
        <Showcase />
        <Impact />
        <Alumni />
        <Events pageHref="/news" pageLabel="Open the notice board" />
        <Admissions pageHref="/admissions" pageLabel="Open the admissions page" />
        {/* The official crest and motto — the seal on the front page */}
        <MottoBand />
        <SiteIndex />
      </main>
    </div>
  );
}
