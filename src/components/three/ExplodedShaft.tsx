"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { ExtrudeGeometry, type Group } from "three";
import { Viewport, Wire, type SceneProps } from "./Viewport";
import { gearShape } from "./gear";

// Parts sit along the shaft (y axis); `spread` is how far each moves out when exploded.
const PARTS = [
  { kind: "bearing", y: -0.9, spread: -0.7 },
  { kind: "gear", y: 0, spread: 0 },
  { kind: "bearing", y: 0.9, spread: 0.7 },
] as const;

function Gear({ color }: { color: string }) {
  const geometry = useMemo(() => {
    const g = new ExtrudeGeometry(gearShape(20, 0.1, 0.2), {
      depth: 0.3,
      bevelEnabled: false,
      curveSegments: 8,
    });
    g.translate(0, 0, -0.15);
    return g;
  }, []);
  useEffect(() => () => geometry.dispose(), [geometry]);
  return <Wire geometry={geometry} rotation={[Math.PI / 2, 0, 0]} color={color} />;
}

function Scene({ color }: { color: string }) {
  const spin = useRef<Group>(null);
  const parts = useRef<(Group | null)[]>([]);

  useFrame(({ clock }, dt) => {
    if (spin.current) spin.current.rotation.y += dt * 0.3;
    // 0 = assembled, 1 = exploded; eased so it pauses at both ends.
    const e = (1 - Math.cos(clock.elapsedTime * 0.8)) / 2;
    PARTS.forEach((part, i) => {
      const g = parts.current[i];
      if (g) g.position.y = part.y + part.spread * e;
    });
  });

  return (
    <group rotation={[0.35, 0, -0.5]}>
      <group ref={spin}>
        <Wire color={color} threshold={40}>
          <cylinderGeometry args={[0.18, 0.18, 3.4, 20]} />
        </Wire>
        {PARTS.map((part, i) => (
          <group
            key={i}
            ref={(el) => {
              parts.current[i] = el;
            }}
          >
            {part.kind === "gear" ? (
              <Gear color={color} />
            ) : (
              <Wire color={color} threshold={40} fill={0.1}>
                <cylinderGeometry args={[0.42, 0.42, 0.22, 28]} />
              </Wire>
            )}
          </group>
        ))}
      </group>
    </group>
  );
}

export default function ExplodedShaft({ active, color }: SceneProps) {
  return (
    <Viewport active={active} camera={{ position: [0, 0, 5.2], fov: 40 }}>
      <Scene color={color} />
    </Viewport>
  );
}
