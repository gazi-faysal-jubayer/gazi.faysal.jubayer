"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { PAGES, PROFILE } from "@/lib/constants";
import { PAGE_COLORS } from "@/lib/page-colors";
import { TransitionLink } from "@/components/transition/TransitionLink";

function useClock() {
  const [time, setTime] = useState("--:--:--");

  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour12: false,
          timeZone: "Asia/Dhaka",
        })
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return time;
}

export function TopBar() {
  const pathname = usePathname();
  const time = useClock();

  const section = pathname.startsWith("/projects")
    ? "WORK / DETAIL"
    : PAGES.find((p) => p.href === pathname)?.label ??
      PAGE_COLORS[pathname]?.label ??
      "INDEX";

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-line bg-void/80 backdrop-blur-sm">
      <div className="flex h-10 items-center justify-between gap-2 px-4 sm:h-12 sm:gap-4 sm:px-6 md:px-10 lg:px-16">
        <TransitionLink
          href="/"
          label="INDEX"
          className="shrink-0 transition-opacity hover:opacity-80"
        >
          <Image
            src="/logo.png"
            alt={PROFILE.name}
            width={120}
            height={120}
            priority
            className="h-7 w-auto object-contain sm:h-8"
          />
        </TransitionLink>

        <div className="hidden flex-1 items-center gap-3 md:flex">
          <span className="text-accent">+</span>
          <span className="h-px flex-1 bg-line" />
          <span className="tech-label whitespace-nowrap">
            PORTFOLIO / {section}
          </span>
          <span className="h-px flex-1 bg-line" />
          <span className="text-accent">+</span>
        </div>

        <p className="shrink-0 font-mono text-[10px] uppercase tracking-[0.1em] text-dim sm:text-xs sm:tracking-[0.15em]">
          <span className="hidden min-[480px]:inline">KHULNA, BD — </span>
          <span className="text-bone">{time}</span>
        </p>
      </div>
    </header>
  );
}
