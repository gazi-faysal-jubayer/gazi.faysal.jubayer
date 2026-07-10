"use client";

import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";

type HeroShutterTextProps = {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3";
  /** Delay before the shutter sequence starts */
  delay?: number;
};

function ShutterLine({
  text,
  delay = 0,
  className,
}: {
  text: string;
  delay?: number;
  className?: string;
}) {
  const characters = text.split("");

  return (
    <span className={cn("flex flex-wrap", className)}>
      {characters.map((char, i) => (
        <span
          key={`${char}-${i}`}
          className="relative inline-block overflow-hidden px-[0.02em]"
        >
          <motion.span
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ delay: delay + i * 0.04 + 0.3, duration: 0.8 }}
            className="inline-block"
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>

          {/* Top slice */}
          <motion.span
            aria-hidden
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: "100%", opacity: [0, 1, 0] }}
            transition={{
              duration: 0.7,
              delay: delay + i * 0.04,
              ease: "easeInOut",
            }}
            className="pointer-events-none absolute inset-0 z-10 text-accent"
            style={{ clipPath: "polygon(0 0, 100% 0, 100% 35%, 0 35%)" }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>

          {/* Middle slice */}
          <motion.span
            aria-hidden
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: "-100%", opacity: [0, 1, 0] }}
            transition={{
              duration: 0.7,
              delay: delay + i * 0.04 + 0.1,
              ease: "easeInOut",
            }}
            className="pointer-events-none absolute inset-0 z-10 text-bone"
            style={{
              clipPath: "polygon(0 35%, 100% 35%, 100% 65%, 0 65%)",
            }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>

          {/* Bottom slice */}
          <motion.span
            aria-hidden
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: "100%", opacity: [0, 1, 0] }}
            transition={{
              duration: 0.7,
              delay: delay + i * 0.04 + 0.2,
              ease: "easeInOut",
            }}
            className="pointer-events-none absolute inset-0 z-10 text-accent"
            style={{
              clipPath: "polygon(0 65%, 100% 65%, 100% 100%, 0 100%)",
            }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export default function HeroShutterText({
  text,
  className = "",
  as: Tag = "h1",
  delay = 0,
}: HeroShutterTextProps) {
  const reduce = useReducedMotion();
  const lines = text.split("\n");

  if (reduce) {
    return (
      <Tag className={cn("whitespace-pre-line", className)}>{text}</Tag>
    );
  }

  return (
    <Tag
      className={cn(
        "font-display font-bold uppercase leading-[0.88] tracking-tight",
        className
      )}
      aria-label={text.replace(/\n/g, " ")}
    >
      {lines.map((line, li) => (
        <span key={`${line}-${li}`} className="block">
          <ShutterLine text={line} delay={delay + li * 0.12} />
        </span>
      ))}
    </Tag>
  );
}
