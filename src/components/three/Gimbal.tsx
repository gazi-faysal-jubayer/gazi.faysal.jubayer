"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { IcosahedronGeometry, type Group } from "three";
import { Viewport, Wire, type SceneProps } from "./Viewport";

// "Dual craft": mechanical gimbal rings around a code-node core.
const RINGS = [
  { r: 1.5, axis: "x", speed: 0.5 },
  { r: 1.2, axis: "y", speed: -0.7 },
  { r: 0.9, axis: "z", speed: 0.9 },
] as const;

function Scene({ color }: { color: string }) {
  const rings = useRef<(Group | null)[]>([]);
  const core = useRef<Group>(null);
  const node = useMemo(() => new IcosahedronGeometry(0.45, 1), []);
  useEffect(() => () => node.dispose(), [node]);

  useFrame((_, dt) => {
    RINGS.forEach((ring, i) => {
      const g = rings.current[i];
      if (g) g.rotation[ring.axis] += dt * ring.speed;
    });
    if (core.current) core.current.rotation.y -= dt * 0.4;
  });

  return (
    <group rotation={[0.4, 0.3, 0]}>
      {RINGS.map((ring, i) => (
        <group
          key={ring.r}
          ref={(el) => {
            rings.current[i] = el;
          }}
        >
          <Wire color={color} threshold={30} fill={0.08}>
            <torusGeometry args={[ring.r, 0.06, 6, 48]} />
          </Wire>
        </group>
      ))}
      <group ref={core}>
        <Wire geometry={node} color={color} threshold={1} fill={0.12} />
        <points geometry={node}>
          <pointsMaterial color={color} size={0.08} sizeAttenuation />
        </points>
      </group>
    </group>
  );
}

export default function Gimbal({ active, color }: SceneProps) {
  return (
    <Viewport active={active} camera={{ position: [0, 0, 5], fov: 40 }}>
      <Scene color={color} />
    </Viewport>
  );
}
