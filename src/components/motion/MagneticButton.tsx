"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { useDoorTransition } from "@/components/transition/TransitionProvider";

type MagneticButtonProps = {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "ghost";
  external?: boolean;
  transitionLabel?: string;
};

export function MagneticButton({
  children,
  className,
  href,
  onClick,
  variant = "primary",
  external,
  transitionLabel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
  const reduce = useReducedMotion();
  const { navigate } = useDoorTransition();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 280, damping: 20 });
  const springY = useSpring(y, { stiffness: 280, damping: 20 });

  function handleMove(e: React.MouseEvent) {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    x.set(dx * 0.28);
    y.set(dy * 0.28);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  const styles = cn(
    "inline-flex items-center justify-center gap-2 border px-5 py-3 font-mono text-[10px] uppercase tracking-[0.15em] transition-colors sm:px-7 sm:py-3.5 sm:text-xs sm:tracking-[0.2em]",
    variant === "primary" &&
      "border-accent bg-accent text-void hover:bg-transparent hover:text-accent",
    variant === "ghost" &&
      "border-line bg-transparent text-bone hover:border-accent hover:text-accent",
    className
  );

  const motionProps = {
    style: { x: springX, y: springY },
    onMouseMove: handleMove,
    onMouseLeave: handleLeave,
    whileTap: reduce ? undefined : { scale: 0.97 },
  };

  const isInternal = href?.startsWith("/") && !external;

  if (href) {
    return (
      <motion.a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        className={styles}
        {...(external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
        onClick={(e) => {
          if (!isInternal) return;
          if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
          e.preventDefault();
          navigate(href, transitionLabel);
        }}
        {...motionProps}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type="button"
      onClick={onClick}
      className={styles}
      {...motionProps}
    >
      {children}
    </motion.button>
  );
}
