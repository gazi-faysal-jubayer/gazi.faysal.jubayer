import { cn } from "@/lib/utils";

type VerticalTickerProps = {
  images: string[];
  /** Seconds for one full loop */
  duration?: number;
  reverse?: boolean;
  className?: string;
};

export function VerticalTicker({
  images,
  duration = 32,
  reverse = false,
  className,
}: VerticalTickerProps) {
  if (images.length === 0) {
    return (
      <div
        className={cn(
          "flex h-full items-center justify-center border border-dashed border-line",
          className
        )}
      >
        <p className="px-4 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-dim">
          Drop images here
        </p>
      </div>
    );
  }

  // Duplicate the list so translateY(-50%) loops seamlessly
  const loop = [...images, ...images];

  return (
    <div className={cn("group relative h-full overflow-hidden", className)}>
      <div
        className={cn(
          "animate-ticker-y flex flex-col group-hover:[animation-play-state:paused]"
        )}
        style={{
          animationDuration: `${duration}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {loop.map((src, i) => (
          <div key={`${src}-${i}`} className="pb-3 sm:pb-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt=""
              loading="lazy"
              className="w-full border border-line object-cover grayscale transition-[filter] duration-500 hover:grayscale-0"
            />
          </div>
        ))}
      </div>

      {/* Edge fades */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-void to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-void to-transparent"
      />
    </div>
  );
}
