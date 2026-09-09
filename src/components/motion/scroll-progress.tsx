"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Fixed gold progress bar pinned to the top of the viewport. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.4 });
  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[3px] z-[90] origin-left bg-gradient-to-r from-gold-600 via-gold-400 to-gold-300"
      style={{ scaleX }}
    />
  );
}
