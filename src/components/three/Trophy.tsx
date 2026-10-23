"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { LatheGeometry, Vector2, type Group } from "three";
import { Viewport, Wire, type SceneProps } from "./Viewport";

// Half-profile (radius, height) revolved into base → stem → cup.
const PROFILE: [number, number][] = [
  [0, -1.2], [0.7, -1.2], [0.7, -1.0], [0.45, -0.95], [0.4, -0.8],
  [0.12, -0.7], [0.1, -0.2], [0.18, -0.05], [0.55, 0.15], [0.8, 0.55],
  [0.9, 1.1], [0.86, 1.15],
];

function Scene({ color }: { color: string }) {
  const ref = useRef<Group>(null);
  const cup = useMemo(
    () => new LatheGeometry(PROFILE.map(([x, y]) => new Vector2(x, y)), 18),
    []
  );
  useEffect(() => () => cup.dispose(), [cup]);

  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.4;
  });

  return (
    <group rotation={[0.25, 0, 0]}>
      <group ref={ref}>
        <Wire geometry={cup} color={color} threshold={10} />
        {[-1, 1].map((side) => (
          <Wire
            key={side}
            position={[side * 0.82, 0.6, 0]}
            rotation={[0, 0, (-side * Math.PI) / 2]}
            color={color}
            threshold={30}
          >
            <torusGeometry args={[0.3, 0.04, 6, 24, Math.PI]} />
          </Wire>
        ))}
      </group>
    </group>
  );
}

export default function Trophy({ active, color }: SceneProps) {
  return (
    <Viewport active={active} camera={{ position: [0, 0, 5], fov: 40 }}>
      <Scene color={color} />
    </Viewport>
  );
}
