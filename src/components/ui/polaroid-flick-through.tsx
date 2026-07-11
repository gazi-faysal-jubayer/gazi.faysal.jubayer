"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  type PanInfo,
} from "framer-motion";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import type { AchievementMedia } from "@/lib/achievement-media";
import { cn } from "@/lib/utils";

const SWIPE_THRESHOLD = 80;

type PolaroidFlickThroughProps = {
  media: AchievementMedia[];
  className?: string;
};

function PolaroidCard({
  item,
  depth,
  isFront,
  total,
  labelIndex,
  onFlick,
}: {
  item: AchievementMedia;
  depth: number;
  isFront: boolean;
  total: number;
  labelIndex: number;
  onFlick: (dir: 1 | -1) => void;
}) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-14, 14]);
  const opacity = useTransform(x, [-200, -80, 0, 80, 200], [0.45, 1, 1, 1, 0.45]);

  const stackRotate = isFront ? 0 : (depth % 2 === 0 ? -1 : 1) * (2 + depth * 1.5);
  const stackY = isFront ? 0 : depth * 10;
  const stackScale = isFront ? 1 : 1 - depth * 0.045;

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (!isFront) return;
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    if (Math.abs(offset) > SWIPE_THRESHOLD || Math.abs(velocity) > 500) {
      const dir: 1 | -1 = offset > 0 || velocity > 0 ? 1 : -1;
      void animate(x, dir * 440, {
        type: "spring",
        stiffness: 280,
        damping: 28,
      }).then(() => {
        x.set(0);
        onFlick(dir);
      });
    } else {
      void animate(x, 0, { type: "spring", stiffness: 400, damping: 30 });
    }
  };

  return (
    <motion.div
      className={cn(
        "absolute left-1/2 top-0 w-[min(100%,280px)] -translate-x-1/2 sm:w-[min(100%,320px)] md:w-[340px]",
        isFront
          ? "z-20 cursor-grab touch-pan-y active:cursor-grabbing"
          : "pointer-events-none"
      )}
      style={{
        zIndex: 20 - depth,
        ...(isFront ? { x, rotate, opacity } : {}),
      }}
      initial={false}
      animate={
        isFront
          ? { y: 0, scale: 1 }
          : { y: stackY, scale: stackScale, rotate: stackRotate, x: 0 }
      }
      drag={isFront ? "x" : false}
      dragListener={isFront}
      dragConstraints={{ left: -320, right: 320 }}
      dragElastic={0.2}
      onDragEnd={handleDragEnd}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
    >
      <div className="rounded-sm border border-black/10 bg-[#f4f1ea] p-2.5 pb-8 shadow-[0_16px_48px_rgba(0,0,0,0.5)] sm:p-3 sm:pb-10">
        <div className="relative aspect-[4/3] overflow-hidden bg-[#111]">
          {item.type === "video" ? (
            isFront ? (
              <video
                key={item.src}
                src={item.src}
                poster={item.poster}
                controls
                playsInline
                preload="metadata"
                className="h-full w-full object-cover"
                onPointerDown={(e) => e.stopPropagation()}
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <div className="relative h-full w-full">
                {item.poster ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.poster}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-[#1a1a1a]">
                    <Play className="text-[#888]" size={28} />
                  </div>
                )}
                <div className="absolute inset-0 flex items-center justify-center bg-black/35">
                  <Play className="text-white" size={28} />
                </div>
              </div>
            )
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={item.src}
              alt=""
              draggable={false}
              className="h-full w-full select-none object-cover"
            />
          )}
        </div>
        <p className="mt-2 text-center font-mono text-[9px] uppercase tracking-[0.18em] text-[#3a3a3a] sm:mt-3 sm:text-[10px]">
          {item.type === "video" ? "Video" : "Photo"} · {labelIndex}/{total}
        </p>
      </div>
    </motion.div>
  );
}

export default function PolaroidFlickThrough({
  media,
  className,
}: PolaroidFlickThroughProps) {
  const mediaKey = media.map((m) => m.src).join("|");
  const [order, setOrder] = useState<number[]>(() => media.map((_, i) => i));

  useEffect(() => {
    setOrder(media.map((_, i) => i));
  }, [mediaKey, media]);

  if (media.length === 0 || order.length === 0) return null;

  const cycle = (dir: 1 | -1) => {
    setOrder((prev) => {
      if (prev.length < 2) return prev;
      const next = [...prev];
      if (dir === 1) {
        const first = next.shift()!;
        next.push(first);
      } else {
        const last = next.pop()!;
        next.unshift(last);
      }
      return next;
    });
  };

  const frontMediaIndex = order[0];
  const stack = order.slice(0, Math.min(4, order.length));

  return (
    <div className={cn("w-full select-none", className)}>
      <div className="relative mx-auto h-[270px] w-full max-w-lg touch-pan-y sm:h-[310px] md:h-[340px]">
        {[...stack].reverse().map((mediaIndex, reverseIndex) => {
          const depth = stack.length - 1 - reverseIndex;
          return (
            <PolaroidCard
              key={`${media[mediaIndex].src}-${mediaIndex}`}
              item={media[mediaIndex]}
              depth={depth}
              isFront={depth === 0}
              total={media.length}
              labelIndex={mediaIndex + 1}
              onFlick={cycle}
            />
          );
        })}
      </div>

      {media.length > 1 && (
        <div className="mt-2 flex items-center justify-center gap-3 sm:mt-3">
          <button
            type="button"
            aria-label="Previous media"
            onClick={() => cycle(-1)}
            className="inline-flex h-9 w-9 items-center justify-center border border-line text-dim transition-colors hover:border-accent hover:text-accent"
          >
            <ChevronLeft size={16} />
          </button>
          <p className="min-w-[4.5rem] text-center font-mono text-[10px] uppercase tracking-[0.18em] text-dim">
            {frontMediaIndex + 1} / {media.length}
          </p>
          <button
            type="button"
            aria-label="Next media"
            onClick={() => cycle(1)}
            className="inline-flex h-9 w-9 items-center justify-center border border-line text-dim transition-colors hover:border-accent hover:text-accent"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}

      <p className="mt-2 text-center font-mono text-[9px] uppercase tracking-[0.15em] text-dim/70 sm:text-[10px]">
        Drag the polaroid or use arrows · Videos play on front
      </p>
    </div>
  );
}
