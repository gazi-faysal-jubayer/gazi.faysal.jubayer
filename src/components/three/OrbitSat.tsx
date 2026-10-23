"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";
import { Viewport, Wire, type SceneProps } from "./Viewport";

const ORBIT_R = 1.75;

function Satellite({ color }: { color: string }) {
  return (
    <group scale={0.9}>
      <Wire color={color} fill={0.15}>
        <boxGeometry args={[0.22, 0.22, 0.3]} />
      </Wire>
      {[-1, 1].map((side) => (
        <Wire key={side} position={[side * 0.4, 0, 0]} color={color} fill={0.2}>
          <boxGeometry args={[0.5, 0.02, 0.2]} />
        </Wire>
      ))}
      <Wire position={[0, 0, 0.24]} rotation={[-Math.PI / 2, 0, 0]} color={color} threshold={40}>
        <coneGeometry args={[0.12, 0.14, 16, 1, true]} />
      </Wire>
    </group>
  );
}

function Scene({ color }: { color: string }) {
  const globe = useRef<Group>(null);
  const sat = useRef<Group>(null);

  useFrame(({ clock }, dt) => {
    if (globe.current) globe.current.rotation.y += dt * 0.15;
    const t = clock.elapsedTime * 0.45;
    if (sat.current) {
      sat.current.position.set(Math.cos(t) * ORBIT_R, 0, Math.sin(t) * ORBIT_R);
      sat.current.rotation.y = -t;
    }
  });

  return (
    <group rotation={[0.35, 0, 0.25]}>
      <group ref={globe}>
        <mesh>
          <sphereGeometry args={[1, 20, 14]} />
          <meshBasicMaterial color={color} wireframe transparent opacity={0.22} />
        </mesh>
      </group>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[ORBIT_R, 0.005, 4, 160]} />
        <meshBasicMaterial color={color} transparent opacity={0.6} />
      </mesh>
      <group ref={sat}>
        <Satellite color={color} />
      </group>
    </group>
  );
}

export default function OrbitSat({ active, color }: SceneProps) {
  return (
    <Viewport active={active} camera={{ position: [0, 0.3, 6.4], fov: 40 }}>
      <Scene color={color} />
    </Viewport>
  );
}
