"use client";

import { Canvas, type MeshProps, type Props as CanvasProps } from "@react-three/fiber";
import { Edges } from "@react-three/drei";
import { useFinePointer } from "@/lib/use-media";

export type SceneProps = { active: boolean; color: string };

/** Shared canvas: pauses when offscreen, lighter on touch devices. */
export function Viewport({
  active,
  ...props
}: CanvasProps & { active: boolean }) {
  const fine = useFinePointer();
  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={fine ? [1, 2] : [1, 1.5]}
      gl={{ antialias: fine, alpha: true, powerPreference: "low-power" }}
      {...props}
    />
  );
}

/** Blueprint look: faint translucent fill + accent-coloured feature edges. */
export function Wire({
  color,
  fill = 0.05,
  threshold = 15,
  children,
  ...props
}: MeshProps & { color: string; fill?: number; threshold?: number }) {
  return (
    <mesh {...props}>
      {children}
      <meshBasicMaterial
        color={color}
        transparent
        opacity={fill}
        depthWrite={false}
      />
      <Edges threshold={threshold} color={color} />
    </mesh>
  );
}
