"use client";

import { motion, useReducedMotion } from "framer-motion";

/** Editorial word-by-word clip reveal for display headings. */
export function WordReveal({
  text,
  className,
  delay = 0,
  stagger = 0.055,
  accentWords = [],
  accentClass = "text-gold-400 italic",
  once = true,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  accentWords?: string[];
  accentClass?: string;
  once?: boolean;
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  if (reduce) {
    return <span className={className}>{text}</span>;
  }

  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "-60px" }}
      aria-label={text}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {words.map((word, i) => {
        const clean = word.replace(/[.,&—]/g, "");
        // Accent words are matched punctuation-free so "spotlight." matches
        // the rendered word "spotlight." regardless of trailing punctuation.
        const accent = accentWords.some(
          (a) => clean.toLowerCase() === a.replace(/[.,&—]/g, "").toLowerCase()
        );
        return (
          <span key={i} className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
            <motion.span
              className={`inline-block will-change-transform ${accent ? accentClass : ""}`}
              variants={{
                hidden: { y: "115%", rotate: 4 },
                show: {
                  y: "0%",
                  rotate: 0,
                  transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
                },
              }}
            >
              {word}
              {i < words.length - 1 ? "\u00A0" : ""}
            </motion.span>
          </span>
        );
      })}
    </motion.span>
  );
}
