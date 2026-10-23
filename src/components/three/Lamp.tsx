"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { LatheGeometry, Vector2, type MeshBasicMaterial } from "three";
import { Wire } from "./Viewport";

// Half-profiles (radius, height) of the printed base and the rounded diffuser shade.
const BASE: [number, number][] = [
  [0, -1.05], [0.6, -1.05], [0.66, -0.95], [0.64, -0.7], [0.56, -0.6], [0, -0.6],
];
const SHADE: [number, number][] = [
  [0.56, -0.6], [0.78, -0.35], [0.9, 0.05], [0.92, 0.5], [0.84, 0.85], [0.6, 1.02], [0, 1.06],
];

const lathe = (pts: [number, number][], segments: number) =>
  new LatheGeometry(pts.map(([r, y]) => new Vector2(r, y)), segments);

export function Lamp({ color }: { color: string }) {
  const base = useMemo(() => lathe(BASE, 28), []);
  const shade = useMemo(() => lathe(SHADE, 20), []);
  useEffect(
    () => () => {
      base.dispose();
      shade.dispose();
    },
    [base, shade]
  );

  const glow = useRef<MeshBasicMaterial>(null);
  useFrame(({ clock }) => {
    if (glow.current) glow.current.opacity = 0.35 + 0.15 * Math.sin(clock.elapsedTime * 2);
  });

  return (
    <group>
      <Wire geometry={base} color={color} threshold={20} fill={0.12} />
      <Wire geometry={shade} color={color} threshold={8} fill={0.06} />
      {/* Bulb glowing through the diffuser */}
      <mesh position={[0, 0.15, 0]}>
        <sphereGeometry args={[0.4, 24, 16]} />
        <meshBasicMaterial ref={glow} color={color} transparent opacity={0.4} depthWrite={false} />
      </mesh>
    </group>
  );
}
