"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import type { Achievement } from "@/lib/constants";
import type { AchievementMedia } from "@/lib/achievement-media";
import { cn } from "@/lib/utils";
import PolaroidFlickThrough from "@/components/ui/polaroid-flick-through";

export type AchievementWithMedia = Achievement & {
  media: AchievementMedia[];
  thumbnail?: string;
};

type AchievementDockProps = {
  achievements: AchievementWithMedia[];
};

const SPRING = { type: "spring" as const, stiffness: 380, damping: 32 };

export function AchievementDock({ achievements }: AchievementDockProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);
  const reduce = useReducedMotion();

  const active = achievements.find((a) => a.id === activeId) ?? null;

  useEffect(() => {
    if (!activeId) setExpanded(false);
  }, [activeId]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setExpanded(false);
        setActiveId(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <ul className="space-y-4 sm:space-y-6">
        {achievements.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => {
                  if (isActive) {
                    setExpanded((v) => !v);
                  } else {
                    setActiveId(item.id);
                    setExpanded(true);
                  }
                }}
                className={cn(
                  "group w-full border-b border-line pb-4 text-left transition-colors sm:pb-6",
                  isActive && "border-accent/40"
                )}
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-accent sm:text-[11px] sm:tracking-[0.2em]">
                  {item.date}
                </p>
                <h3 className="mt-1.5 font-display text-base font-bold uppercase tracking-tight text-bone transition-colors group-hover:text-accent sm:mt-2 sm:text-lg">
                  {item.title}
                </h3>
                <p className="mt-0.5 font-mono text-[10px] text-dim sm:mt-1 sm:text-xs">
                  {item.event}
                  {item.media.length > 0 && (
                    <span className="ml-2 text-accent">
                      · {item.media.length} media
                    </span>
                  )}
                </p>
              </button>
            </li>
          );
        })}
      </ul>

      <AnimatePresence>
        {active && (
          <>
            {expanded && (
              <motion.button
                type="button"
                aria-label="Close achievement details"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-40 bg-void/65 backdrop-blur-[2px]"
                onClick={() => {
                  setExpanded(false);
                  setActiveId(null);
                }}
              />
            )}

            <motion.div
              layout
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.98 }}
              transition={reduce ? { duration: 0.2 } : SPRING}
              className={cn(
                "fixed inset-x-2 bottom-[calc(3.5rem+env(safe-area-inset-bottom))] z-50 mx-auto",
                "max-w-xl sm:inset-x-4 sm:bottom-[calc(4rem+env(safe-area-inset-bottom))] sm:max-w-2xl",
                "md:max-w-3xl lg:max-w-4xl"
              )}
            >
              <motion.div
                layout
                data-lenis-prevent
                className="max-h-[min(82svh,760px)] overflow-y-auto overflow-x-hidden rounded-2xl border border-line bg-panel/95 shadow-[0_20px_60px_rgba(0,0,0,0.55)] backdrop-blur-md scrollbar-none"
              >
                <div className="sticky top-0 z-10 flex w-full items-center gap-3 border-b border-line bg-panel/95 p-3 backdrop-blur-md sm:gap-4 sm:p-4">
                  <button
                    type="button"
                    onClick={() => setExpanded((v) => !v)}
                    className="flex min-w-0 flex-1 items-center gap-3 text-left sm:gap-4"
                  >
                    <div className="h-11 w-11 shrink-0 overflow-hidden border border-line bg-void sm:h-12 sm:w-12">
                      {active.thumbnail ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={active.thumbnail}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center font-mono text-[10px] text-accent">
                          {String(
                            achievements.findIndex(
                              (a) => a.id === active.id
                            ) + 1
                          ).padStart(2, "0")}
                        </div>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate font-display text-sm font-bold uppercase tracking-tight text-bone sm:text-base">
                        {active.title}
                      </p>
                      <p className="truncate font-mono text-[10px] text-dim sm:text-[11px]">
                        {active.event}
                      </p>
                    </div>
                  </button>

                  <div className="flex shrink-0 items-center gap-1">
                    <button
                      type="button"
                      aria-label={expanded ? "Collapse" : "Expand"}
                      onClick={() => setExpanded((v) => !v)}
                      className="rounded border border-line p-1 text-dim transition-colors hover:border-accent hover:text-accent"
                    >
                      {expanded ? (
                        <ChevronDown size={18} />
                      ) : (
                        <ChevronUp size={18} />
                      )}
                    </button>
                    <button
                      type="button"
                      aria-label="Close"
                      onClick={() => {
                        setExpanded(false);
                        setActiveId(null);
                      }}
                      className="rounded border border-line p-1 text-dim transition-colors hover:border-accent hover:text-accent"
                    >
                      <X size={14} />
                    </button>
                  </div>
                </div>

                <AnimatePresence initial={false}>
                  {expanded && (
                    <motion.div
                      key="body"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={
                        reduce
                          ? { duration: 0.2 }
                          : { ...SPRING, opacity: { duration: 0.15 } }
                      }
                      className="overflow-hidden"
                    >
                      <div className="px-3 pb-5 pt-4 sm:px-5 sm:pb-6 sm:pt-5 md:px-6">
                        <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-accent">
                          {active.date}
                        </p>
                        <p className="mt-2 max-w-2xl text-xs leading-relaxed text-dim sm:text-sm">
                          {active.description}
                        </p>

                        {active.media.length > 0 ? (
                          <div className="mt-5 sm:mt-6">
                            <PolaroidFlickThrough
                              key={active.id}
                              media={active.media}
                            />
                          </div>
                        ) : (
                          <p className="mt-5 border border-dashed border-line px-3 py-8 text-center font-mono text-[10px] uppercase tracking-[0.15em] text-dim">
                            Drop images or videos in
                            <br />
                            public/achievements/{active.id}/
                          </p>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
