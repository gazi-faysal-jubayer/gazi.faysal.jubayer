"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useReducedMotion } from "framer-motion";
import type { ProjectType } from "@/lib/constants";
import { getPageColor } from "@/lib/page-colors";
import { useMediaQuery } from "@/lib/use-media";
import type { SceneProps } from "./Viewport";

// three.js lives in these async chunks, never in first-load JS.
const GearAssembly = dynamic(() => import("./GearAssembly"), { ssr: false });
const ProjectPart = dynamic(() => import("./ProjectPart"), { ssr: false });
const OrbitSat = dynamic(() => import("./OrbitSat"), { ssr: false });

const PAGE_SCENES = {
  about: dynamic(() => import("./Gimbal"), { ssr: false }),
  work: dynamic(() => import("./ExplodedShaft"), { ssr: false }),
  experience: dynamic(() => import("./Trophy"), { ssr: false }),
};

export type PageObjectKind = keyof typeof PAGE_SCENES;

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

/** Decorative 3D slot: skipped for reduced motion / no WebGL, paused offscreen. */
function SceneSlot({
  className,
  children,
}: {
  className?: string;
  children: (p: SceneProps) => React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [supported, setSupported] = useState(false);
  const [active, setActive] = useState(false);
  const color = getPageColor(usePathname()).accent;

  useEffect(() => setSupported(hasWebGL()), []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setActive(e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} aria-hidden className={className}>
      {supported && !reduce && children({ active, color })}
    </div>
  );
}

export function HeroGears({ className }: { className?: string }) {
  const wide = useMediaQuery("(min-width: 768px)");
  return (
    <SceneSlot className={className}>
      {(p) => <GearAssembly {...p} compact={!wide} />}
    </SceneSlot>
  );
}

export function ProjectModel({
  type,
  className,
}: {
  type: ProjectType;
  className?: string;
}) {
  return (
    <SceneSlot className={className}>
      {(p) => <ProjectPart {...p} type={type} />}
    </SceneSlot>
  );
}

/** Decorative object beside a page heading; sits under the grid lines (-z-10). */
export function PageObject({ kind }: { kind: PageObjectKind }) {
  const Scene = PAGE_SCENES[kind];
  return (
    <SceneSlot className="pointer-events-none absolute right-2 top-14 -z-10 h-40 w-40 opacity-45 sm:right-6 sm:top-16 sm:h-64 sm:w-64 sm:opacity-70 md:right-10 lg:right-16 lg:top-20 lg:h-[300px] lg:w-[300px] lg:opacity-100 xl:h-[380px] xl:w-[380px]">
      {(p) => <Scene {...p} />}
    </SceneSlot>
  );
}

export function ContactOrbit({ className }: { className?: string }) {
  // Only shown on lg+; don't fetch three.js on phones for a hidden canvas.
  const lg = useMediaQuery("(min-width: 1024px)");
  return (
    <SceneSlot className={className}>
      {(p) => lg && <OrbitSat {...p} />}
    </SceneSlot>
  );
}
