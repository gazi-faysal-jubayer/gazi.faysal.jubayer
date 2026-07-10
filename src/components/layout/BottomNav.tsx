"use client";

import { usePathname } from "next/navigation";
import { PAGES } from "@/lib/constants";
import { PAGE_COLORS } from "@/lib/page-colors";
import { useDoorTransition } from "@/components/transition/TransitionProvider";
import { cn } from "@/lib/utils";

const SHORT_LABELS: Record<string, string> = {
  "/": "IDX",
  "/about": "ABT",
  "/experience": "LOG",
  "/work": "WRK",
  "/contact": "CNT",
};

export function BottomNav() {
  const pathname = usePathname();
  const { navigate } = useDoorTransition();

  const workIndex = PAGES.findIndex((p) => p.href === "/work");
  const activeIndex = pathname.startsWith("/projects")
    ? Math.max(0, workIndex)
    : Math.max(
        0,
        PAGES.findIndex((p) => p.href === pathname)
      );

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-void/90 backdrop-blur-sm"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <div className="flex h-12 items-center gap-2 px-2 sm:h-14 sm:gap-3 sm:px-4 md:px-10 lg:px-16">
        <p className="hidden shrink-0 font-mono text-[10px] tracking-[0.15em] text-dim min-[380px]:block sm:text-xs sm:tracking-[0.2em]">
          <span className="text-accent">
            {String(activeIndex + 1).padStart(2, "0")}
          </span>
          <span className="text-dim"> / {String(PAGES.length).padStart(2, "0")}</span>
        </p>

        <div className="flex min-w-0 flex-1 items-center justify-center gap-0.5 overflow-x-auto scrollbar-none sm:gap-1.5 md:justify-end md:gap-2">
          {PAGES.map((page, i) => {
            const isActive = i === activeIndex;
            const color = PAGE_COLORS[page.href]?.accent ?? "#FF5D73";
            return (
              <button
                key={page.href}
                type="button"
                onClick={() => navigate(page.href, page.label)}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "shrink-0 border font-mono uppercase transition-colors",
                  "px-1.5 py-1.5 text-[8px] tracking-[0.08em]",
                  "min-[380px]:px-2 min-[380px]:text-[9px] min-[380px]:tracking-[0.1em]",
                  "sm:px-3 sm:py-1.5 sm:text-[10px] sm:tracking-[0.12em]",
                  "md:px-4 md:text-[11px] md:tracking-[0.15em]",
                  !isActive && "border-line text-dim"
                )}
                style={
                  isActive
                    ? {
                        borderColor: color,
                        backgroundColor: color,
                        color: "#050505",
                      }
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
                <span className="sm:hidden">
                  {SHORT_LABELS[page.href] ?? page.label.slice(0, 3)}
                </span>
                <span className="hidden sm:inline">{page.label}</span>
              </button>
            );
          })}
        </div>

        <p className="hidden shrink-0 font-mono text-xs tracking-[0.2em] text-dim xl:block">
          <span className="animate-blink text-accent">▮</span> ONLINE
        </p>
      </div>
    </nav>
  );
}
