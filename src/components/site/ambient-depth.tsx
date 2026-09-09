"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * AmbientDepth — the "air between the layers".
 * Large blurred light orbs that sit behind content and drift on scroll at
 * different speeds (background layers move slower than foreground), plus a
 * slow glow-breathing animation. Purely decorative; hidden from AT.
 *
 * `variant="duo"`  — gold + crimson pair (default)
 * `variant="trio"` — adds a third paper-white orb for busier sections
 * `float`          — adds the soft drift keyframe on top of scroll parallax
 */
export function AmbientDepth({
  className,
  variant = "duo",
  float = true,
}: {
  className?: string;
  variant?: "duo" | "trio";
  float?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Each layer gets its own speed — the core of the parallax depth illusion.
  const y1 = useTransform(scrollYProgress, [0, 1], [70, -70]);
  const y2 = useTransform(scrollYProgress, [0, 1], [120, -110]);
  const y3 = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const drift = float && !reduce ? "animate-float-soft" : "";

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className
      )}
    >
      {/* gold key light — upper left, nearest the "stage lamp" */}
      <motion.div
        style={reduce ? undefined : { y: y1 }}
        className="absolute -left-36 top-[8%] size-[26rem] rounded-full bg-gold-500/12 blur-[130px] animate-breathe"
      />
      {/* crimson rim light — mid right, further away */}
      <motion.div
        style={reduce ? undefined : { y: y2 }}
        className={cn(
          "absolute -right-28 top-[48%] size-[22rem] rounded-full bg-crimson-500/10 blur-[120px]",
          drift
        )}
      />
      {variant === "trio" && (
        <motion.div
          style={reduce ? undefined : { y: y3 }}
          className="absolute left-[38%] -bottom-32 size-[30rem] rounded-full bg-paper/[0.045] blur-[140px] animate-breathe [animation-delay:3s]"
        />
      )}
    </div>
  );
}
