"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import {
  ExtrudeGeometry,
  IcosahedronGeometry,
  Path,
  Shape,
  Vector3,
  type BufferGeometry,
  type Group,
} from "three";
import type { ProjectType } from "@/lib/constants";
import { useFinePointer } from "@/lib/use-media";
import { Viewport, Wire, type SceneProps } from "./Viewport";
import { gearShape } from "./gear";

type ColorProps = { color: string };

function useDisposable<T extends BufferGeometry>(make: () => T) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const geometry = useMemo(make, []);
  useEffect(() => () => geometry.dispose(), [geometry]);
  return geometry;
}

function FlangedGear({ color }: ColorProps) {
  const gear = useDisposable(() => {
    const g = new ExtrudeGeometry(gearShape(22, 0.1, 0.18), {
      depth: 0.35,
      bevelEnabled: false,
      curveSegments: 8,
    });
    g.translate(0, 0, -0.175);
    return g;
  });
  return (
    <group rotation={[Math.PI / 2, 0, 0]}>
      <Wire geometry={gear} color={color} />
      <Wire rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.35]} color={color} threshold={40}>
        <cylinderGeometry args={[0.34, 0.34, 0.45, 24]} />
      </Wire>
    </group>
  );
}

function FeaMesh({ color }: ColorProps) {
  const geometry = useDisposable(() => {
    const g = new IcosahedronGeometry(1.15, 4);
    const pos = g.attributes.position;
    const v = new Vector3();
    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i);
      const n = 1 + 0.14 * Math.sin(3 * v.x) * Math.sin(3 * v.y) * Math.sin(3 * v.z);
      v.multiplyScalar(n);
      pos.setXYZ(i, v.x, v.y, v.z);
    }
    g.computeVertexNormals();
    return g;
  });
  return <Wire geometry={geometry} color={color} threshold={1} fill={0.08} />;
}

function hexShape(r: number, hole: number) {
  const s = new Shape();
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2;
    if (i === 0) s.moveTo(r * Math.cos(a), r * Math.sin(a));
    else s.lineTo(r * Math.cos(a), r * Math.sin(a));
  }
  s.closePath();
  const h = new Path();
  h.absarc(0, 0, hole, 0, Math.PI * 2, true);
  s.holes.push(h);
  return s;
}

function BoltAndNut({ color }: ColorProps) {
  const nut = useDisposable(() => {
    const g = new ExtrudeGeometry(hexShape(0.6, 0.3), {
      depth: 0.32,
      bevelEnabled: false,
      curveSegments: 16,
    });
    g.translate(0, 0, -0.16);
    return g;
  });
  return (
    <group>
      <Wire position={[0, 1, 0]} color={color}>
        <cylinderGeometry args={[0.58, 0.58, 0.36, 6]} />
      </Wire>
      <Wire color={color} threshold={40}>
        <cylinderGeometry args={[0.28, 0.28, 1.7, 20]} />
      </Wire>
      {/* Thread pitch lines */}
      {Array.from({ length: 9 }, (_, i) => (
        <mesh key={i} position={[0, 0.55 - i * 0.16, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.285, 0.008, 4, 32]} />
          <meshBasicMaterial color={color} />
        </mesh>
      ))}
      <Wire geometry={nut} position={[0, -0.35, 0]} rotation={[Math.PI / 2, 0, 0]} color={color} />
    </group>
  );
}

function NodeGraph({ color }: ColorProps) {
  const outer = useDisposable(() => new IcosahedronGeometry(1.15, 1));
  const inner = useRef<Group>(null);
  useFrame((_, dt) => {
    if (inner.current) inner.current.rotation.x -= dt * 0.6;
  });
  return (
    <group>
      <Wire geometry={outer} color={color} threshold={1} />
      <points geometry={outer}>
        <pointsMaterial color={color} size={0.09} sizeAttenuation />
      </points>
      <group ref={inner}>
        <Wire color={color} threshold={1} fill={0.12}>
          <octahedronGeometry args={[0.45, 0]} />
        </Wire>
      </group>
    </group>
  );
}

const MODELS: Record<ProjectType, (p: ColorProps) => JSX.Element> = {
  cad: FlangedGear,
  simulation: FeaMesh,
  "hands-on": BoltAndNut,
  programming: NodeGraph,
};

function Spinner({ children }: { children: React.ReactNode }) {
  const ref = useRef<Group>(null);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.35;
  });
  return (
    <group rotation={[0.35, 0, 0]}>
      <group ref={ref}>{children}</group>
    </group>
  );
}

export default function ProjectPart({
  active,
  color,
  type,
}: SceneProps & { type: ProjectType }) {
  const fine = useFinePointer();
  const Model = MODELS[type] ?? NodeGraph;
  return (
    <Viewport active={active} camera={{ position: [0, 0.4, 4.4], fov: 40 }}>
      <Spinner>
        <Model color={color} />
      </Spinner>
      {/* Touch devices skip drag controls so swipes keep scrolling the page. */}
      {fine && <OrbitControls enableZoom={false} enablePan={false} />}
    </Viewport>
  );
}
