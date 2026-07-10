"use client";

import { usePathname } from "next/navigation";
import { PAGES } from "@/lib/constants";
import { PAGE_COLORS } from "@/lib/page-colors";
import { useDoorTransition } from "@/components/transition/TransitionProvider";
import { cn } from "@/lib/utils";

export function BottomNav() {
  const pathname = usePathname();
  const { navigate } = useDoorTransition();

  const activeIndex = pathname.startsWith("/projects")
    ? 1
    : Math.max(
        0,
        PAGES.findIndex((p) => p.href === pathname)
      );

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-void/85 backdrop-blur-sm">
      <div className="section-pad flex h-12 items-center justify-between gap-2 sm:h-14 sm:gap-4">
        <p className="hidden font-mono text-xs tracking-[0.2em] text-dim min-[400px]:block">
          <span className="text-accent">
            {String(activeIndex + 1).padStart(2, "0")}
          </span>
          {" / "}
          {String(PAGES.length).padStart(2, "0")}
        </p>

        <div className="flex flex-1 items-center justify-center gap-1 min-[400px]:flex-initial min-[400px]:justify-end sm:gap-2">
          {PAGES.map((page, i) => {
            const isActive = i === activeIndex;
            const color = PAGE_COLORS[page.href]?.accent ?? "#FF5D73";
            return (
              <button
                key={page.href}
                type="button"
                onClick={() => navigate(page.href, page.label)}
                className={cn(
                  "border px-2 py-1.5 font-mono text-[9px] uppercase tracking-[0.1em] transition-colors",
                  "sm:px-4 sm:text-[11px] sm:tracking-[0.15em]",
                  !isActive && "border-line text-dim"
                )}
                style={
                  isActive
                    ? { borderColor: color, backgroundColor: color, color: "#050505" }
                    : undefined
                }
                onMouseEnter={(e) => {
                  if (isActive) return;
                  e.currentTarget.style.borderColor = color;
                  e.currentTarget.style.color = color;
                }}
                onMouseLeave={(e) => {
                  if (isActive) return;
                  e.currentTarget.style.borderColor = "";
                  e.currentTarget.style.color = "";
                }}
              >
                {page.label}
              </button>
            );
          })}
        </div>

        <p className="hidden font-mono text-xs tracking-[0.2em] text-dim lg:block">
          <span className="animate-blink text-accent">▮</span> ONLINE
        </p>
      </div>
    </nav>
  );
}
