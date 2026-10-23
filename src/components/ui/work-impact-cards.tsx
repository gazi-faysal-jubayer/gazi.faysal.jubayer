"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/lib/constants";
import { useDoorTransition } from "@/components/transition/TransitionProvider";
import { cn } from "@/lib/utils";
import { Tilt } from "@/components/motion/Tilt";

const EASE = [0.22, 1, 0.36, 1] as const;
const SIZE_TRANSITION = { duration: 0.6, ease: EASE };
// Cursor must rest this long before a card opens, so sweeping across the row doesn't flip them all.
const HOVER_INTENT_MS = 140;

/** Re-mounts on open/close so the new layout fades in instead of snapping. */
function FadeSwap({ open, children }: { open: boolean; children: React.ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      key={open ? "open" : "closed"}
      className="h-full"
      initial={reduce ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: open ? 0.15 : 0, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

const TYPE_GRADIENTS: Record<string, string> = {
  cad: "linear-gradient(145deg, #FACC15 0%, #1a1605 55%, #050505 100%)",
  simulation: "linear-gradient(145deg, #60A5FA 0%, #0a1525 45%, #050505 100%)",
  "hands-on": "linear-gradient(145deg, #34D399 0%, #0a1a14 45%, #050505 100%)",
  programming:
    "linear-gradient(145deg, #A78BFA 0%, #140f25 45%, #050505 100%)",
};

function openProject(
  navigate: (href: string, label?: string) => void,
  project: Project
) {
  navigate(`/projects/${project.slug}`, project.title.toUpperCase());
}

function CardBody({
  project,
  idx,
  expanded,
}: {
  project: Project;
  idx: number;
  expanded: boolean;
}) {
  const gradient =
    TYPE_GRADIENTS[project.type] ?? TYPE_GRADIENTS.programming;

  if (expanded) {
    return (
      <div className="relative h-full">
        {project.cover && (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.cover}
              alt=""
              aria-hidden
              className="absolute inset-0 h-full w-full object-cover opacity-30 grayscale transition duration-500 group-hover:opacity-45 group-hover:grayscale-0"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-panel via-panel/75 to-panel/40"
            />
          </>
        )}
        <div className="relative flex h-full flex-col justify-between gap-4 p-4 sm:p-5 md:p-6 lg:p-7">
          <div className="min-w-0">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent sm:tracking-[0.2em]">
              {String(idx + 1).padStart(2, "0")} — {project.year}
            </p>
            <h3 className="mt-2 font-display text-lg font-bold uppercase leading-[1.05] tracking-tight text-bone sm:text-xl md:text-2xl lg:text-3xl">
              {project.title}
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-dim sm:mt-3 sm:text-sm">
              {project.summary}
            </p>
            <p className="mt-3 flex flex-wrap gap-x-2 gap-y-1 font-mono text-[9px] uppercase tracking-[0.12em] text-dim sm:gap-x-3 sm:text-[10px] sm:tracking-[0.15em]">
              {project.tech.slice(0, 3).map((t) => (
                <span key={t}>[{t}]</span>
              ))}
            </p>
          </div>

          <div className="flex items-end justify-between gap-3">
            <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-accent sm:text-[11px] sm:tracking-[0.2em]">
              Open file <ArrowRight size={13} className="shrink-0" />
            </span>
            {project.cover ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={project.cover}
                alt=""
                aria-hidden
                className="h-12 w-20 shrink-0 border border-line bg-[#f4f1ea] object-cover sm:h-14 sm:w-24 md:h-16 md:w-28"
              />
            ) : (
              <div
                aria-hidden
                className="h-12 w-20 shrink-0 border border-line sm:h-14 sm:w-24 md:h-16 md:w-28"
                style={{ background: gradient }}
              />
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full items-center justify-between gap-3 p-3.5 sm:p-4 lg:flex-col lg:items-start lg:justify-between lg:p-5">
      <p className="shrink-0 font-mono text-[10px] uppercase tracking-[0.18em] text-dim lg:text-xs">
        {String(idx + 1).padStart(2, "0")}
      </p>
      <h3 className="min-w-0 flex-1 truncate text-right font-display text-sm font-bold uppercase tracking-tight text-bone sm:text-base lg:flex-none lg:whitespace-normal lg:text-left lg:text-base lg:leading-tight xl:text-lg">
        {project.title}
      </h3>
    </div>
  );
}

export default function WorkImpactCards({
  projects,
}: {
  projects: Project[];
}) {
  const [openCard, setOpenCard] = useState(0);
  const { navigate } = useDoorTransition();
  const reduce = useReducedMotion();
  const hoverTimer = useRef<ReturnType<typeof setTimeout>>();
  const pendingCard = useRef<number | null>(null);
  const lastPointer = useRef({ x: -1, y: -1 });

  const cancelHover = () => {
    clearTimeout(hoverTimer.current);
    pendingCard.current = null;
  };
  // Driven by real pointer movement only: cards resizing under a still cursor
  // must not chain-open their neighbours.
  const hoverOpen = (idx: number, e: React.PointerEvent) => {
    const moved = e.clientX !== lastPointer.current.x || e.clientY !== lastPointer.current.y;
    lastPointer.current = { x: e.clientX, y: e.clientY };
    if (!moved || idx === openCard || pendingCard.current === idx) return;
    cancelHover();
    pendingCard.current = idx;
    hoverTimer.current = setTimeout(() => {
      pendingCard.current = null;
      setOpenCard(idx);
    }, HOVER_INTENT_MS);
  };
  useEffect(() => cancelHover, []);

  return (
    <>
      {/* Mobile + tablet: vertical accordion / 2-col grid */}
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3 lg:hidden">
        {projects.map((project, idx) => {
          const isOpen = openCard === idx;
          return (
            <motion.div
              key={project.slug}
              role="link"
              tabIndex={0}
              onClick={() => {
                if (isOpen) {
                  openProject(navigate, project);
                } else {
                  setOpenCard(idx);
                }
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  if (isOpen) openProject(navigate, project);
                  else setOpenCard(idx);
                }
              }}
              animate={
                reduce
                  ? undefined
                  : { height: isOpen ? "auto" : 64 }
              }
              initial={false}
              transition={SIZE_TRANSITION}
              className={cn(
                "cursor-pointer overflow-hidden border border-line bg-panel transition-colors",
                "hover:border-accent focus-visible:border-accent focus-visible:outline-none",
                isOpen && "border-accent/60 sm:col-span-2",
                !isOpen && "h-16"
              )}
            >
              <FadeSwap open={isOpen}>
                <CardBody project={project} idx={idx} expanded={isOpen} />
              </FadeSwap>
            </motion.div>
          );
        })}
      </div>

      {/* Desktop: horizontal expanding cards */}
      <div className="hidden h-[380px] gap-2 overflow-x-auto lg:flex xl:h-[420px]">
        {projects.map((project, idx) => {
          const isOpen = openCard === idx;
          return (
            <motion.div
              key={project.slug}
              role="link"
              tabIndex={0}
              onPointerMove={(e) => hoverOpen(idx, e)}
              onPointerLeave={cancelHover}
              onFocus={() => {
                cancelHover();
                setOpenCard(idx);
              }}
              onClick={() => openProject(navigate, project)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  openProject(navigate, project);
                }
              }}
              initial={false}
              animate={{
                flexGrow: isOpen ? 4.2 : 1,
                // px strings: bare numbers for these two never animate
                flexBasis: isOpen ? "280px" : "72px",
                minWidth: isOpen ? "280px" : "72px",
              }}
              transition={reduce ? { duration: 0 } : SIZE_TRANSITION}
              style={{ flexShrink: 0 }}
              className={cn(
                "group relative h-full cursor-pointer overflow-hidden border border-line bg-panel transition-colors",
                "hover:border-accent focus-visible:border-accent focus-visible:outline-none",
                isOpen && "border-accent/50"
              )}
            >
              <Tilt className="h-full" max={5}>
                <FadeSwap open={isOpen}>
                  <CardBody project={project} idx={idx} expanded={isOpen} />
                </FadeSwap>
              </Tilt>
            </motion.div>
          );
        })}
      </div>
    </>
  );
}
