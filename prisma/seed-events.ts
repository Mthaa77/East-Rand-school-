/**
 * Seed SchoolEvent rows for the News & Events section.
 * Every item is sourced from the ERSA comprehensive profile document
 * (/home/z/my-project/upload/...Profile_2026-09-03.md) with a sourceNote
 * per the site's governance rules ("verified, not exaggerated").
 *
 * Run: bun run prisma/seed-events.ts
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const items = [
  // ── Events ────────────────────────────────────────────────────────────────
  {
    slug: "ersa-festival-2026",
    title: "ERSA Festival 2026 — Art Is You",
    summary:
      "The school's flagship community festival: performances, exhibitions, industry guests and the Daveyton stage at full volume. Open to learners, the community and surrounding areas.",
    category: "event",
    status: "upcoming",
    tone: "gold",
    dateISO: "2026-10-03",
    venue: "ERSA campus & Rhoo Hlatshwayo Arts Centre, Daveyton",
    ctaLabel: "Get tickets via Quicket",
    sourceNote: "Quicket organiser listing · last verified Sep 2026",
    sortOrder: 1,
  },
  {
    slug: "2027-grade-8-admissions",
    title: "2027 Grade 8 admissions open",
    summary:
      "GDE online applications for Grade 8 open. Apply on the GDE portal, then book ERSA's audition / placement test in your chosen discipline.",
    category: "event",
    status: "admissions",
    tone: "crimson",
    dateISO: "2026-08-05",
    venue: "gdeadmissions.gov.za — then contact the school office",
    ctaLabel: "See the audition checklist",
    ctaHref: "https://www.gdeadmissions.gov.za/",
    sourceNote: "GDE admissions calendar · confirmed with school office",
    sortOrder: 2,
  },
  {
    slug: "joy-of-jazz-j4yp-2026",
    title: "Jazz for Young People showcase",
    summary:
      "Our youth bands join the Standard Bank Joy of Jazz J4YP programme — masterclasses, marketplace and youth-led event roles, following the July workshop hosted at 1 Jones Street.",
    category: "event",
    status: "upcoming",
    tone: "gold",
    dateISO: "2026-09-26",
    venue: "Joy of Jazz venues, Johannesburg",
    ctaLabel: "Meet the bands",
    sourceNote: "NSA 2026 J4YP page · Sunday World, Jul 2026",
    sortOrder: 3,
  },
  // ── News / press archive ─────────────────────────────────────────────────
  {
    slug: "nsc-pass-rate-2025",
    title: "Class of 2025 delivers a 98.86% NSC pass rate",
    summary:
      "87 of 88 matric candidates passed the National Senior Certificate — the strongest cohort in the school's recent record, and proof that arts specialisation and academic rigour share one timetable.",
    category: "news",
    status: "press",
    tone: "gold",
    dateISO: "2026-01-15",
    venue: null,
    ctaLabel: "See the proof bar",
    sourceNote: "Third-party compilation of DBE data · pending school sign-off",
    sortOrder: 4,
  },
  {
    slug: "y20-opening-performance",
    title: "ERSA on the Y20 South Africa stage",
    summary:
      "GDE public posts featured ERSA performers at the Y20 South Africa Opening event — and separately captured learners performing Hugh Masekela's 'Stimela' on a national platform.",
    category: "news",
    status: "press",
    tone: "gold",
    dateISO: "2025-08-18",
    venue: null,
    ctaLabel: "Watch the GDE post",
    sourceNote: "GDE Facebook post, Aug 2025 · media files pending permission",
    sortOrder: 5,
  },
  {
    slug: "bridging-the-gap-workshop",
    title: "'Bridging the Gap' brings enterprise skills to Daveyton",
    summary:
      "A two-day entrepreneurship workshop at ERSA connected youth to funding and business-plan skills with SEDFA, NYDA, dtic, Ekurhuleni East TVET College and local partners.",
    category: "news",
    status: "press",
    tone: "gold",
    dateISO: "2025-06-30",
    venue: "ERSA campus, Daveyton",
    ctaLabel: "Read the coverage",
    sourceNote: "Ekurhuleni News, 30 Jun 2025",
    sortOrder: 6,
  },
  {
    slug: "joy-of-jazz-workshop-2026",
    title: "Joy of Jazz workshop lands at 1 Jones Street",
    summary:
      "The Standard Bank Joy of Jazz 'Jazz for Young People' programme brought a performance-and-masterclass workshop to ERSA, with our bands listed among the participating youth ensembles.",
    category: "news",
    status: "press",
    tone: "gold",
    dateISO: "2026-07-22",
    venue: "ERSA campus, Daveyton",
    ctaLabel: "See the programme",
    sourceNote: "NSA 2026 J4YP page · Sunday World, 16 Jul 2026",
    sortOrder: 7,
  },
  {
    slug: "tut-mou-partnership",
    title: "TUT partnership opens the tertiary pathway",
    summary:
      "An MOU with Tshwane University of Technology's Faculty of Arts and Design set up masterclasses, digital portfolios, audition preparation and educator upskilling for the ERSA community.",
    category: "news",
    status: "press",
    tone: "gold",
    dateISO: "2024-03-12",
    venue: null,
    ctaLabel: "Read the TUT story",
    sourceNote: "TUT Faculty of Arts and Design, 12 Mar 2024",
    sortOrder: 8,
  },
  {
    slug: "temptations-visit-2023",
    title: "The Temptations come to Daveyton",
    summary:
      "During a City of Ekurhuleni cultural tour, learners performed for the legendary group — and the school choir, dance club, poets and painters were featured in the visit.",
    category: "news",
    status: "press",
    tone: "gold",
    dateISO: "2023-03-01",
    venue: "ERSA campus, Daveyton",
    ctaLabel: "Read Benoni City Times",
    sourceNote: "Benoni City Times, 1 Mar 2023",
    sortOrder: 9,
  },
  {
    slug: "sos-festival-third-place",
    title: "Third place at Gauteng's first Schools of Specialisation Festival",
    summary:
      "ERSA placed third in the Performing & Creative Arts category at the inaugural Gauteng Schools of Specialisation Festival. Reported in the press — official result pending school sign-off.",
    category: "news",
    status: "press",
    tone: "crimson",
    dateISO: "2022-10-24",
    venue: null,
    ctaLabel: "Read the report",
    sourceNote: "Sunday World sponsored report, 24 Oct 2022 · reported result",
    sortOrder: 10,
  },
  {
    slug: "youth-tech-expo-2022",
    title: "Gauteng Youth Tech Expo hosted at ERSA",
    summary:
      "Gauteng e-Government brought the Youth Tech Expo to Daveyton with SEDA, Huawei, Siyafunda, EOH, FNB and partners — creativity meeting technology on our own campus.",
    category: "news",
    status: "press",
    tone: "gold",
    dateISO: "2022-12-14",
    venue: "ERSA campus, Daveyton",
    ctaLabel: "Read the statement",
    sourceNote: "South African Government media statement, 14 Dec 2022",
    sortOrder: 11,
  },
];

async function main() {
  for (const item of items) {
    await prisma.schoolEvent.upsert({
      where: { slug: item.slug },
      update: { ...item },
      create: { ...item },
    });
  }
  const count = await prisma.schoolEvent.count();
  console.log(`Seeded SchoolEvent table — ${count} items present.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
