"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";

export function ScrollProgress() {
  const { scrollY, scrollYProgress } = useScroll();
  // Progress reads 1 on pages that cannot scroll; only show once the user scrolls.
  const opacity = useTransform(scrollY, [0, 40], [0, 1]);
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-10 z-40 h-0.5 origin-left bg-accent sm:top-12"
      style={{ scaleX, opacity }}
    />
  );
}
