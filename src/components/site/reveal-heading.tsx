"use client";

import { Children, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

/* Beat-based cinematic reveal for display headings with mixed inline
   children (gold <em>s, quotes, etc.). Plain text splits into words;
   each element becomes a single beat. Every beat rises out of a soft
   blur with a slight 3D tilt, staggered like a title sequence. Pair
   with .heading-craft + .heading-depth* classes from globals.css. */

type RevealHeadingProps = {
  children: ReactNode;
  as?: "h1" | "h2" | "h3";
  className?: string;
  delay?: number;
  stagger?: number;
};

export function RevealHeading({
  children,
  as = "h2",
  className,
  delay = 0,
  stagger = 0.085,
}: RevealHeadingProps) {
  const reduce = useReducedMotion();
  // framer's proxy accepts the tag dynamically; pin the type to h2.
  const Tag = motion[as] as typeof motion.h2;

  if (reduce) {
    return <Tag className={className}>{children}</Tag>;
  }

  /* Text nodes become word beats; element nodes (gold <em>s…) stay whole
     so their internal styling and wrapping behaviour are untouched. */
  const beats: ReactNode[] = [];
  Children.forEach(children, (child) => {
    if (typeof child === "string") {
      child
        .split(/\s+/)
        .filter(Boolean)
        .forEach((word) => beats.push(word));
    } else if (child !== null && child !== undefined && child !== false) {
      beats.push(child);
    }
  });

  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-70px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {beats.map((beat, i) => (
        <motion.span
          key={i}
          className="inline-block will-change-transform"
          style={{ transformPerspective: 700 }}
          variants={{
            hidden: {
              opacity: 0,
              y: "0.55em",
              rotateX: 14,
              filter: "blur(9px)",
            },
            show: {
              opacity: 1,
              y: "0em",
              rotateX: 0,
              filter: "blur(0px)",
              transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
            },
          }}
        >
          {beat}
          {/* NBSP survives inline-block whitespace collapsing, unlike " ". */}
          {i < beats.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </Tag>
  );
}
