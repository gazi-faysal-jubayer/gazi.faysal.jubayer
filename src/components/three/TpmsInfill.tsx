"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { BufferAttribute, BufferGeometry, type LineSegments } from "three";
import { Wire } from "./Viewport";
import { contourLayers, schoenIWP, schwarzP } from "./tpms";

// Slicer-preview loop: build TPMS-P layer by layer, hold, then TPMS-IWP.
const PATTERNS = [schwarzP, schoenIWP];
const BUILD_S = 4;
const CYCLE_S = 7;

export function TpmsInfill({ color }: { color: string }) {
  const sets = useMemo(
    () =>
      PATTERNS.map((fn) => {
        const { positions, layerEnd } = contourLayers(fn, { layers: 28, grid: 40, periods: 2 });
        const geometry = new BufferGeometry();
        geometry.setAttribute("position", new BufferAttribute(positions, 3));
        return { geometry, layerEnd };
      }),
    []
  );
  useEffect(() => () => sets.forEach((s) => s.geometry.dispose()), [sets]);

  const lines = useRef<(LineSegments | null)[]>([]);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const active = Math.floor(t / CYCLE_S) % sets.length;
    const progress = Math.min(1, (t % CYCLE_S) / BUILD_S);
    sets.forEach((s, i) => {
      const ls = lines.current[i];
      if (!ls) return;
      ls.visible = i === active;
      if (i !== active) return;
      const layer = Math.min(s.layerEnd.length - 1, Math.floor(progress * s.layerEnd.length));
      s.geometry.setDrawRange(0, s.layerEnd[layer]);
    });
  });

  return (
    <group scale={0.85}>
      <Wire color={color} fill={0.03}>
        <boxGeometry args={[2, 2, 2]} />
      </Wire>
      {sets.map((s, i) => (
        <lineSegments
          key={i}
          ref={(el) => {
            lines.current[i] = el;
          }}
          geometry={s.geometry}
        >
          <lineBasicMaterial color={color} transparent opacity={0.85} />
        </lineSegments>
      ))}
    </group>
  );
}
