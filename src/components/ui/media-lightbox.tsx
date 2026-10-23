"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Minimize2 } from "lucide-react";
import { useLenis } from "lenis/react";
import type { AchievementMedia } from "@/lib/achievement-media";

type MediaLightboxProps = {
  media: AchievementMedia[];
  /** Index of the item to show; null = closed */
  index: number | null;
  onClose: () => void;
  onStep: (dir: 1 | -1) => void;
};

/** Full-screen viewer; portalled to <body> so transformed parents can't trap `fixed`. */
export function MediaLightbox({ media, index, onClose, onStep }: MediaLightboxProps) {
  const open = index !== null;
  const reduce = useReducedMotion();
  const lenis = useLenis();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const returnFocus = document.activeElement as HTMLElement | null;
    const root = document.documentElement;
    const prevOverflow = root.style.overflow;
    root.style.overflow = "hidden";
    lenis?.stop();
    closeRef.current?.focus();

    // Capture phase + stopPropagation so Esc doesn't also close a parent dialog.
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") onStep(1);
      else if (e.key === "ArrowLeft") onStep(-1);
      else return;
      e.stopPropagation();
      e.preventDefault();
    };
    window.addEventListener("keydown", onKey, true);

    return () => {
      window.removeEventListener("keydown", onKey, true);
      root.style.overflow = prevOverflow;
      lenis?.start();
      returnFocus?.focus();
    };
  }, [open, lenis, onClose, onStep]);

  if (typeof document === "undefined") return null;

  const item = open ? media[index] : null;

  return createPortal(
    <AnimatePresence>
      {item && (
        <motion.div
          key="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Media viewer"
          data-lenis-prevent
          className="fixed inset-0 z-[75] flex items-center justify-center bg-void/90 p-3 backdrop-blur-sm sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.25 }}
          onClick={onClose}
        >
          <div className="absolute inset-x-0 top-0 flex items-center justify-between p-3 sm:p-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-dim sm:text-xs">
              {item.type === "video" ? "Video" : "Photo"} · {index! + 1} / {media.length}
            </p>
            <button
              ref={closeRef}
              type="button"
              aria-label="Minimize media"
              onClick={onClose}
              className="inline-flex h-10 w-10 items-center justify-center border border-line bg-panel text-bone transition-colors hover:border-accent hover:text-accent"
            >
              <Minimize2 size={18} />
            </button>
          </div>

          <motion.div
            key={item.src}
            className="flex max-h-full max-w-full items-center justify-center"
            initial={reduce ? false : { scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
          >
            {item.type === "video" ? (
              <video
                src={item.src}
                poster={item.poster}
                controls
                autoPlay
                playsInline
                className="max-h-[calc(100svh-7rem)] max-w-full border border-line bg-black"
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.src}
                alt=""
                className="max-h-[calc(100svh-7rem)] max-w-full border border-line bg-[#f4f1ea] object-contain"
              />
            )}
          </motion.div>

          {media.length > 1 && (
            <>
              <button
                type="button"
                aria-label="Previous media"
                onClick={(e) => {
                  e.stopPropagation();
                  onStep(-1);
                }}
                className="absolute left-2 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center border border-line bg-panel/90 text-bone transition-colors hover:border-accent hover:text-accent sm:left-5 sm:h-12 sm:w-12"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                aria-label="Next media"
                onClick={(e) => {
                  e.stopPropagation();
                  onStep(1);
                }}
                className="absolute right-2 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center border border-line bg-panel/90 text-bone transition-colors hover:border-accent hover:text-accent sm:right-5 sm:h-12 sm:w-12"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
