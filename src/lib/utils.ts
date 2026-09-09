import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

/**
 * tailwind-merge defaults don't know the custom fluid display type scale
 * (text-display-xl/lg/md/sm) — unrecognised `text-*` values fall into the
 * text-COLOR group, so `cn("text-display-lg", "text-paper")` would silently
 * drop the size class. Register them explicitly as font-size classes.
 */
const twMergeCustom = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: ["display-xl", "display-lg", "display-md", "display-sm"] }],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMergeCustom(clsx(inputs))
}
