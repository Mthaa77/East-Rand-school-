"use client";

import { useRef, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Premium interactive surface — a soft gold spotlight follows the pointer and
 * a lit hairline brightens toward the cursor. Driven entirely by CSS
 * variables written straight to the node (no React state, no re-renders).
 * Falls back to static styling under prefers-reduced-motion.
 *
 * The wrapper must carry the rounding class so the layers clip correctly;
 * children keep their own markup (buttons/links stay real interactive nodes).
 */
export function SpotlightCard({
  children,
  className,
  glowClassName,
  ringClassName,
}: {
  children: ReactNode;
  className?: string;
  glowClassName?: string;
  ringClassName?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (reduce || !ref.current) return;
    const el = ref.current;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--sx", `${((e.clientX - rect.left) / rect.width) * 100}%`);
    el.style.setProperty("--sy", `${((e.clientY - rect.top) / rect.height) * 100}%`);
    el.style.setProperty("--sopacity", "1");
  }

  function onPointerLeave() {
    ref.current?.style.setProperty("--sopacity", "0");
  }

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className={cn("group/spot relative isolate", className)}
    >
      {children}
      {/* lit border ring that leans toward the cursor */}
      <span
        aria-hidden="true"
        className={cn(
          "spotlight-ring pointer-events-none absolute inset-0 z-[3] rounded-[inherit] opacity-[var(--sopacity,0)] transition-opacity duration-500",
          ringClassName
        )}
      />
      {/* soft interior glow under the cursor */}
      <span
        aria-hidden="true"
        className={cn(
          "spotlight-glow pointer-events-none absolute inset-0 z-[2] rounded-[inherit] opacity-[var(--sopacity,0)] transition-opacity duration-500",
          glowClassName
        )}
      />
    </div>
  );
}
