/**
 * Central page registry for the ERSA multipage site (Task 13).
 * Single source of truth used by the navbar, footer, mobile menu,
 * command palette, homepage site-index, sitemap and page heroes.
 */

export type SitePage = {
  path: string;
  label: string;
  /** Short uppercase kicker used in the navbar/footer. */
  short: string;
  /** One-line description shown in the site index + palette. */
  description: string;
  /** Wide hero image used by PageHero + site-index hover preview. */
  image: string;
  imageAlt: string;
};

export const SITE_PAGES: SitePage[] = [
  {
    path: "/about",
    label: "Our Story",
    short: "About",
    description: "The school behind the spotlight — history, mission, values and governance.",
    image: "/images/page-about.webp",
    imageAlt: "Backstage at the school theatre, performers preparing in warm worklight",
  },
  {
    path: "/programmes",
    label: "Programmes",
    short: "Programmes",
    description: "Five specialist disciplines, from first sketch to final performance.",
    image: "/images/page-programmes.webp",
    imageAlt: "Studio table with instruments, sketches and drafting tools under warm light",
  },
  {
    path: "/admissions",
    label: "Admissions",
    short: "Admissions",
    description: "Audition-based entry for 2027 — the journey, requirements and enquiry form.",
    image: "/images/page-admissions.webp",
    imageAlt: "A learner auditioning under a single golden spotlight before adjudicators",
  },
  {
    path: "/gallery",
    label: "Gallery",
    short: "Gallery",
    description: "Learner work in focus — stage, studio and backstage moments.",
    image: "/images/page-gallery.webp",
    imageAlt: "Framed student artworks lit by brass picture lights on a dark gallery wall",
  },
  {
    path: "/news",
    label: "News & Events",
    short: "News",
    description: "The notice board — festivals, auditions, exhibitions and school news.",
    image: "/images/page-news.webp",
    imageAlt: "Auditorium curtain opening onto warm stage light, programmes on the seats",
  },
  {
    path: "/contact",
    label: "Contact",
    short: "Contact",
    description: "Visit 1 Jones Street, Daveyton — call, write or start an enquiry.",
    image: "/images/page-contact.webp",
    imageAlt: "School building exterior at dusk with warm light in the windows",
  },
];

/** Navbar order (desktop) — Contact stays reachable via CTA + footer. */
export const NAV_PAGES = SITE_PAGES;

export function pageByPath(path: string): SitePage | undefined {
  return SITE_PAGES.find((p) => p.path === path);
}
