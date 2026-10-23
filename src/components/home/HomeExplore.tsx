"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLenis } from "lenis/react";
import { PAGE_COLORS } from "@/lib/page-colors";
import { TransitionLink } from "@/components/transition/TransitionLink";

export type ExploreItem = {
  href: string;
  /** Door-transition label */
  label: string;
  number: string;
  title: string;
  teaser: string;
  meta: string;
};

/** Window event BottomNav listens to, so the nav lights up with the active row. */
export const NAV_HINT_EVENT = "nav-hint";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Smooth-scrolls to an element id, or to the top when `to` is omitted. */
export function ScrollCue({
  to,
  children = "Scroll to explore",
}: {
  to?: string;
  children?: React.ReactNode;
}) {
  const lenis = useLenis();
  return (
    <button
      type="button"
      onClick={() => {
        const el = to ? document.getElementById(to) : null;
        if (to && !el) return;
        if (lenis) lenis.scrollTo(el ?? 0, { offset: el ? -48 : 0 });
        else if (el) el.scrollIntoView({ behavior: "smooth" });
        else window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      className="inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.25em] text-dim transition-colors hover:text-accent sm:text-xs"
    >
      <span aria-hidden className="relative h-8 w-px overflow-hidden bg-line">
        <span
          className={`absolute inset-x-0 top-0 h-1/2 bg-accent ${to ? "animate-scroll-cue" : "animate-scroll-cue [animation-direction:reverse]"}`}
        />
      </span>
      {children}
    </button>
  );
}

function ExploreRow({
  item,
  active,
  setActive,
  rowRef,
}: {
  item: ExploreItem;
  active: boolean;
  setActive: (href: string) => void;
  rowRef: (el: HTMLLIElement | null) => void;
}) {
  const reduce = useReducedMotion();
  const color = PAGE_COLORS[item.href]?.accent ?? "#FF5D73";
  const t = (duration: number) => (reduce ? { duration: 0 } : { duration, ease: EASE });

  return (
    <li ref={rowRef} className="border-b border-line" onMouseEnter={() => setActive(item.href)}>
      <TransitionLink href={item.href} label={item.label} className="relative block overflow-hidden">
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0 origin-left"
          style={{ backgroundColor: color }}
          initial={false}
          animate={{ scaleX: active ? 1 : 0, opacity: active ? 0.1 : 0 }}
          transition={t(0.7)}
        />
        <motion.span
          aria-hidden
          className="pointer-events-none absolute left-0 top-0 w-[3px]"
          style={{ backgroundColor: color }}
          initial={false}
          animate={{ height: active ? "100%" : "0%" }}
          transition={t(0.5)}
        />
        <div className="relative grid grid-cols-[auto_1fr_auto] items-center gap-4 py-6 pl-5 pr-2 sm:gap-8 sm:py-8 sm:pl-8 sm:pr-4 md:py-10">
          <span
            className="self-start pt-1 font-mono text-xs tracking-[0.2em] text-dim transition-colors duration-500 sm:pt-2 sm:text-sm"
            style={{ color: active ? color : undefined }}
          >
            {item.number}
          </span>
          <div className="min-w-0">
            <h3
              className="font-display text-3xl font-bold uppercase leading-none tracking-tight text-bone transition-colors duration-500 sm:text-5xl md:text-6xl"
              style={{ color: active ? color : undefined }}
            >
              {item.title}
            </h3>
            <p className="mt-2 max-w-2xl text-xs leading-relaxed text-dim sm:mt-3 sm:text-base">
              {item.teaser}
            </p>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.15em] text-dim sm:text-[11px]">
              {item.meta}
            </p>
          </div>
          <motion.span
            aria-hidden
            className="text-dim"
            style={{ color: active ? color : undefined }}
            initial={false}
            animate={{ x: active ? 0 : -12, opacity: active ? 1 : 0.25 }}
            transition={t(0.5)}
          >
            <ArrowRight className="h-6 w-6 sm:h-8 sm:w-8" />
          </motion.span>
        </div>
      </TransitionLink>
    </li>
  );
}

/** Below-the-fold index: rows light up one by one as they pass through mid-screen. */
export function HomeExplore({ items }: { items: ExploreItem[] }) {
  const section = useRef<HTMLElement>(null);
  const rows = useRef<(HTMLLIElement | null)[]>([]);
  const [active, setActive] = useState<string | null>(null);
  const { scrollY } = useScroll();

  // Light the row nearest mid-screen; at the very bottom the last row wins,
  // since it can never scroll up to the middle.
  useMotionValueEvent(scrollY, "change", (y) => {
    const box = section.current?.getBoundingClientRect();
    const mid = window.innerHeight / 2;
    if (!box || box.top > mid || box.bottom < 0) return setActive(null);
    if (y + window.innerHeight >= document.documentElement.scrollHeight - 4) {
      return setActive(items[items.length - 1].href);
    }
    let best = 0;
    let bestDist = Infinity;
    rows.current.forEach((el, i) => {
      if (!el) return;
      const r = el.getBoundingClientRect();
      const dist = Math.abs((r.top + r.bottom) / 2 - mid);
      if (dist < bestDist) [best, bestDist] = [i, dist];
    });
    setActive(items[best].href);
  });

  useEffect(() => {
    window.dispatchEvent(new CustomEvent(NAV_HINT_EVENT, { detail: active }));
  }, [active]);
  useEffect(
    () => () => {
      window.dispatchEvent(new CustomEvent(NAV_HINT_EVENT, { detail: null }));
    },
    []
  );

  return (
    <section
      id="explore"
      ref={section}
      className="mx-auto w-full max-w-content px-4 pt-16 sm:px-6 sm:pt-24 md:px-10 lg:px-16"
    >
      <p className="tech-label">
        <span className="text-accent">&gt;</span> CONTINUE — SELECT A FILE
      </p>
      <ul className="mt-6 border-t border-line sm:mt-10">
        {items.map((item, i) => (
          <ExploreRow
            key={item.href}
            item={item}
            active={active === item.href}
            setActive={setActive}
            rowRef={(el) => {
              rows.current[i] = el;
            }}
          />
        ))}
      </ul>
    </section>
  );
}
