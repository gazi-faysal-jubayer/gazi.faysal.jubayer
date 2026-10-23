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

export function ContactOrbit({ className }: { className?: string }) {
  // Only shown on lg+; don't fetch three.js on phones for a hidden canvas.
  const lg = useMediaQuery("(min-width: 1024px)");
  return (
    <SceneSlot className={className}>
      {(p) => lg && <OrbitSat {...p} />}
    </SceneSlot>
  );
}
