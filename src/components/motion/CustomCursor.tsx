"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { useFinePointer } from "@/lib/use-media";

const INTERACTIVE =
  "a, button, [role='link'], [role='button'], input, textarea, select, label, summary";

/** CAD-viewport crosshair; mouse devices only. */
export function CustomCursor() {
  const fine = useFinePointer();
  const reduce = useReducedMotion();
  const enabled = fine && !reduce;

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 450, damping: 38, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 450, damping: 38, mass: 0.5 });
  const [hover, setHover] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    const root = document.documentElement;
    root.classList.add("has-cursor");

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      setHover(!!(e.target as Element | null)?.closest?.(INTERACTIVE));
    };
    const onLeave = () => setVisible(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      root.classList.remove("has-cursor");
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[80] transition-opacity duration-200"
      style={{ opacity: visible ? 1 : 0 }}
    >
      {/* Precise dot + crosshair follow the pointer exactly */}
      <motion.div className="absolute left-0 top-0" style={{ x, y }}>
        <span className="absolute -left-[2px] -top-[2px] h-1 w-1 bg-accent" />
        <motion.span
          className="absolute left-0 top-0 h-px w-7 bg-accent opacity-70"
          style={{ x: "-50%" }}
          animate={{ scaleX: hover ? 0 : 1 }}
        />
        <motion.span
          className="absolute left-0 top-0 h-7 w-px bg-accent opacity-70"
          style={{ y: "-50%" }}
          animate={{ scaleY: hover ? 0 : 1 }}
        />
      </motion.div>

      {/* Trailing bracket frame grows over interactive targets */}
      <motion.div className="absolute left-0 top-0" style={{ x: sx, y: sy }}>
        <motion.div
          className="absolute left-0 top-0 border border-accent"
          style={{ x: "-50%", y: "-50%" }}
          initial={false}
          animate={{
            width: hover ? 44 : 18,
            height: hover ? 44 : 18,
            rotate: hover ? 0 : 45,
            opacity: hover ? 1 : 0.5,
            backgroundColor: hover
              ? "color-mix(in srgb, var(--page-accent) 14%, transparent)"
              : "rgba(0,0,0,0)",
          }}
          transition={{ type: "spring", stiffness: 380, damping: 26 }}
        />
      </motion.div>
    </div>
  );
}
