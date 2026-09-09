/**
 * Cross-component custom events — the site's internal "bus".
 *
 * Every name lives here so producers and consumers stay decoupled from the
 * heavy components that listen for them (command palette, discipline dossier,
 * backstage pass, admissions form). Importing from this module costs nothing;
 * importing the same constants from `command-palette.tsx` used to drag the
 * entire palette + cmdk bundle into every importer's chunk graph.
 */

/** Opens the ⌘K command palette (dispatched by the navbar trigger). */
export const OPEN_PALETTE_EVENT = "ersa:open-palette";

/** Opens the discipline finder wizard (dispatched by palette + finder CTAs). */
export const OPEN_FINDER_EVENT = "ersa:open-finder";

/** Opens a discipline deep-dive dossier (handled in disciplines.tsx). */
export const OPEN_DISCIPLINE_EVENT = "ersa:open-discipline";

/** Opens the keyboard-shortcuts sheet (handled in shortcuts-dialog.tsx). */
export const OPEN_SHORTCUTS_EVENT = "ersa:open-shortcuts";

/** Opens the backstage pass overlay (footer badge → backstage.tsx). */
export const OPEN_BACKSTAGE_EVENT = "ersa:open-backstage";

/** Pre-selects a discipline in the admissions form. */
export const ENQUIRE_DISCIPLINE_EVENT = "ersa:enquire-discipline";

/** Typed helper for dispatching these window events. */
export function dispatchSiteEvent(name: string, detail?: unknown) {
  window.dispatchEvent(new CustomEvent(name, detail ? { detail } : undefined));
}
