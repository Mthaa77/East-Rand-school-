/**
 * ERSA verified facts — Research Dossier (September 2026).
 * Source: /upload/East_Rand_School_of_the_Arts_Research.md (public web sources:
 * GDE registers, Benoni City Times / The Citizen, Quicket, eryo.org, cached
 * ersa.org.za content). Every claim rendered on the site must trace back here.
 */

/** Community reach — towns ERSA draws learners from (Research Dossier §1). */
export const communityTowns = [
  "Daveyton",
  "Etwatwa",
  "Wattville",
  "Kwa-Thema",
  "Tsakane",
  "Duduza",
  "Tembisa",
] as const;

/** GDE 2019 relaunch focus areas — six, incl. the "arts + business" pair. */
export const focusAreas = [
  "Dance",
  "Art and Design",
  "Music",
  "Drama",
  "Hospitality",
  "Enterprise Management",
] as const;

/** Register snapshot (~2024, school-register data). */
export const registerStats = {
  learners: 567,
  teachers: 45,
  classSizeRange: "10–15",
} as const;

/** ERSA Festival — annual showcase/fundraiser at Rhoo Hlatshwayo Arts Centre. */
export const festival = {
  venue: "Rhoo Hlatshwayo Arts Centre, Daveyton",
  edition2024: { name: "Art You Are", dates: "25–26 October 2024" },
  edition2025: { dates: "24 October 2025", time: "10:00–17:00" },
  departments: ["Dance", "Drama", "Design", "Music", "Visual Arts", "Applied Arts"],
} as const;

/** Vision — quoted from the school's own description. */
export const vision =
  "ERSA is a community of creative people where everyone is committed to achieve through excellence and hard work in the Arts disciplines and Academics.";

/** ERYO / eMagnet School of Music pathway alumni (Research Dossier §7). */
export const eryoAlumni = [
  {
    name: "Pascali Mokadi",
    instrument: "Violin",
    line: "Led the East Rand Youth Orchestra 2008–2010; today first violin in the Johannesburg Symphony Orchestra and a two-time soloist at its Youth Concerto Festival — one of six South Africans selected for the Swiss Youth Orchestra's 2011 tour.",
  },
  {
    name: "David Nkosi",
    instrument: "Conducting",
    line: "Trained through the East Rand Youth Orchestra, completed an M.Mus at the University of Pretoria, and now works as a professional conductor.",
  },
  {
    name: "Gladys Ngobeni",
    instrument: "Violin",
    line: "Started lessons in 2006; plays first violin with the East Rand Youth Orchestra and the National Youth Orchestra.",
  },
] as const;

/** 2018 Ekurhuleni District educator awards. */
export const staffAwards = [
  { name: "Mrs Ndlovu", award: "Best Coach", reason: "mentoring learners in a Life Orientation competition" },
  { name: "Mr Seaga", award: "Best Educator in Design", reason: "district recognition for Design teaching" },
] as const;
