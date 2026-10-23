"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { ExtrudeGeometry, type Group } from "three";
import { Viewport, Wire, type SceneProps } from "./Viewport";
import { gearShape, meshGears } from "./gear";

const M = 0.1;
const DEPTH = 0.32;
const TRAIN = [{ z: 26 }, { z: 14, dir: -0.55 }, { z: 20, dir: 0.95 }];

function Gear({ z, color }: { z: number; color: string }) {
  const geometry = useMemo(() => {
    const g = new ExtrudeGeometry(gearShape(z, M), {
      depth: DEPTH,
      bevelEnabled: false,
      curveSegments: 8,
    });
    g.translate(0, 0, -DEPTH / 2);
    return g;
  }, [z]);
  useEffect(() => () => geometry.dispose(), [geometry]);

  const shaftR = ((M * z) / 2) * 0.28 * 0.85;
  return (
    <>
      <Wire geometry={geometry} color={color} />
      <Wire rotation={[Math.PI / 2, 0, 0]} color={color} threshold={40}>
        <cylinderGeometry args={[shaftR, shaftR, DEPTH * 2.6, 16]} />
      </Wire>
    </>
  );
}

function Train({ color, compact }: { color: string; compact: boolean }) {
  const gears = useMemo(
    () => meshGears(compact ? TRAIN.slice(0, 2) : TRAIN, M),
    [compact]
  );
  // Centre the assembly and fit it to the canvas width.
  const { cx, cy, span } = useMemo(() => {
    const xs = gears.flatMap((g) => [g.x - (M * g.z) / 2, g.x + (M * g.z) / 2]);
    const ys = gears.flatMap((g) => [g.y - (M * g.z) / 2, g.y + (M * g.z) / 2]);
    const w = Math.max(...xs) - Math.min(...xs);
    const h = Math.max(...ys) - Math.min(...ys);
    return {
      cx: (Math.max(...xs) + Math.min(...xs)) / 2,
      cy: (Math.max(...ys) + Math.min(...ys)) / 2,
      span: Math.max(w, h) + 0.6,
    };
  }, [gears]);

  const viewport = useThree((s) => s.viewport);
  const scale = Math.min(1.25, Math.min(viewport.width, viewport.height) / span);

  const group = useRef<Group>(null);
  const parts = useRef<(Group | null)[]>([]);
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame(({ clock }) => {
    // Time spins the train; scrolling winds it further.
    const a = clock.elapsedTime * 0.25 + window.scrollY * 0.004;
    gears.forEach((g, i) => {
      const p = parts.current[i];
      if (p) p.rotation.z = g.base + g.ratio * a;
    });
    const grp = group.current;
    if (!grp) return;
    grp.rotation.x += (-0.5 + pointer.current.y * 0.18 - grp.rotation.x) * 0.05;
    grp.rotation.y += (0.5 + pointer.current.x * 0.28 - grp.rotation.y) * 0.05;
  });

  return (
    <group ref={group} scale={scale}>
      <group position={[-cx, -cy, 0]}>
        {gears.map((g, i) => (
          <group
            key={g.z}
            position={[g.x, g.y, 0]}
            ref={(el) => {
              parts.current[i] = el;
            }}
          >
            <Gear z={g.z} color={color} />
          </group>
        ))}
      </group>
    </group>
  );
}

export default function GearAssembly({
  active,
  color,
  compact = false,
}: SceneProps & { compact?: boolean }) {
  return (
    <Viewport active={active} camera={{ position: [0, 0, 7], fov: 35 }}>
      <Train color={color} compact={compact} />
    </Viewport>
  );
}
