"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";
import { Wire } from "./Viewport";

// Layout follows the "Mine Shredder Machine" assembly drawing (GrabCAD, 2024):
// 4-leg stand, chamber + inclined hopper on top, motor on the lower shelf,
// two identical pulleys joined by a vertical belt (1:1), 4 rotor blades.
const ROTOR_Y = 0.35;
const MOTOR_Y = -0.78;
const PULLEY_X = -0.85;
const PULLEY_R = 0.25;
const LEGS = [
  [0.55, 0.5],
  [-0.55, 0.5],
  [0.55, -0.5],
  [-0.55, -0.5],
] as const;

/** Cylinder lying along the x axis. */
function XCyl({
  color,
  r,
  len,
  x = 0,
  y = 0,
  segments = 20,
  fill,
}: {
  color: string;
  r: number;
  len: number;
  x?: number;
  y?: number;
  segments?: number;
  fill?: number;
}) {
  return (
    <Wire position={[x, y, 0]} rotation={[0, 0, Math.PI / 2]} color={color} threshold={40} fill={fill}>
      <cylinderGeometry args={[r, r, len, segments]} />
    </Wire>
  );
}

export function Shredder({ color }: { color: string }) {
  const rotor = useRef<Group>(null);
  const motor = useRef<Group>(null);

  useFrame((_, dt) => {
    // Same-size pulleys → rotor and motor turn at the same speed.
    if (rotor.current) rotor.current.rotation.x += dt * 2.2;
    if (motor.current) motor.current.rotation.x += dt * 2.2;
  });

  return (
    <group scale={0.8}>
      {/* Stand: legs, foot pads, lower shelf (mounting frame + pad) */}
      {LEGS.map(([x, z]) => (
        <group key={`${x}${z}`}>
          <Wire position={[x, -0.725, z]} color={color} threshold={40}>
            <cylinderGeometry args={[0.045, 0.045, 1.45, 12]} />
          </Wire>
          <Wire position={[x, -1.46, z]} color={color} threshold={40}>
            <cylinderGeometry args={[0.1, 0.1, 0.03, 16]} />
          </Wire>
        </group>
      ))}
      <Wire position={[0, -1.0, 0]} color={color} fill={0.08}>
        <boxGeometry args={[1.2, 0.04, 1.1]} />
      </Wire>

      {/* Cutting chamber + top cover */}
      <Wire position={[0, ROTOR_Y, 0]} color={color} fill={0.04}>
        <boxGeometry args={[1.3, 0.7, 1.2]} />
      </Wire>

      {/* Inclined hopper (open 4-sided funnel) */}
      <Wire
        position={[0, 1.05, 0.1]}
        rotation={[0.35, Math.PI / 4, 0]}
        color={color}
        threshold={10}
        fill={0.06}
      >
        <cylinderGeometry args={[0.95, 0.6, 0.7, 4, 1, true]} />
      </Wire>

      {/* Discharge tray under the chamber */}
      <Wire position={[0, -0.22, 0.72]} rotation={[0.5, 0, 0]} color={color} fill={0.08}>
        <boxGeometry args={[0.8, 0.02, 0.6]} />
      </Wire>

      {/* Rotor: shaft, hub, 4 blades — spins */}
      <group ref={rotor} position={[0, ROTOR_Y, 0]}>
        <XCyl color={color} r={0.05} len={1.75} x={-0.12} />
        <XCyl color={color} r={0.2} len={1.0} segments={28} fill={0.1} />
        {[0, 1, 2, 3].map((k) => (
          <group key={k} rotation={[(k * Math.PI) / 2, 0, 0]}>
            <Wire position={[0, 0.23, 0]} color={color} fill={0.15}>
              <boxGeometry args={[0.95, 0.09, 0.04]} />
            </Wire>
          </group>
        ))}
        <XCyl color={color} r={PULLEY_R} len={0.07} x={PULLEY_X} segments={28} fill={0.1} />
      </group>

      {/* Adjustable bed blade + 6008 bearings + bearing cover (static) */}
      <Wire position={[0, ROTOR_Y - 0.12, 0.3]} color={color} fill={0.2}>
        <boxGeometry args={[1.05, 0.04, 0.12]} />
      </Wire>
      <XCyl color={color} r={0.1} len={0.08} x={0.69} y={ROTOR_Y} />
      <XCyl color={color} r={0.1} len={0.08} x={-0.69} y={ROTOR_Y} />

      {/* Motor on the shelf, with its pulley */}
      <XCyl color={color} r={0.2} len={0.5} x={-0.3} y={MOTOR_Y} fill={0.1} />
      <group ref={motor} position={[0, MOTOR_Y, 0]}>
        <XCyl color={color} r={0.035} len={0.35} x={-0.68} />
        <XCyl color={color} r={PULLEY_R} len={0.07} x={PULLEY_X} segments={28} fill={0.1} />
      </group>

      {/* Belt: two vertical runs tangent to both pulleys */}
      {[-1, 1].map((side) => (
        <mesh
          key={side}
          position={[PULLEY_X, (ROTOR_Y + MOTOR_Y) / 2, side * PULLEY_R]}
        >
          <boxGeometry args={[0.05, ROTOR_Y - MOTOR_Y, 0.012]} />
          <meshBasicMaterial color={color} />
        </mesh>
      ))}
    </group>
  );
}
