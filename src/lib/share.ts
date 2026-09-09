/**
 * Clipboard write with a legacy fallback for permission-restricted contexts
 * (hardened browser settings, older engines). Shared by the notice board,
 * discipline deep-dives and anywhere else that hands a link to a parent.
 */
export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand("copy");
      ta.remove();
      return ok;
    } catch {
      return false;
    }
  }
}

/** Canonical discipline slugs — shared by finder results, deep links and labels. */
export const DISCIPLINE_SLUGS = {
  "visual-arts": "Visual Arts",
  design: "Design",
  drama: "Dramatic Arts",
  dance: "Dance Studies",
  music: "Music",
} as const;

export type DisciplineSlug = keyof typeof DISCIPLINE_SLUGS;

export function slugForTitle(title: string): DisciplineSlug | null {
  const entry = (Object.entries(DISCIPLINE_SLUGS) as [DisciplineSlug, string][]).find(
    ([, label]) => label === title
  );
  return entry ? entry[0] : null;
}

export function titleForSlug(slug: string): string | null {
  return DISCIPLINE_SLUGS[slug as DisciplineSlug] ?? null;
}
