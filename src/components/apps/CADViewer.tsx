"use client";

import { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Environment, Grid } from "@react-three/drei";
import { Mesh, Group } from "three";
import {
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Grid3X3,
  Box,
  Layers,
  Eye,
} from "lucide-react";
import { useOSStore } from "@/store/useOSStore";
import { cn } from "@/lib/utils";

// Placeholder gear model
function Gear({ position = [0, 0, 0], scale = 1, color = "#4a90d9" }: {
  position?: [number, number, number];
  scale?: number;
  color?: string;
}) {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = state.clock.getElapsedTime() * 0.5;
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      scale={scale}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <torusGeometry args={[1, 0.3, 16, 32]} />
      <meshStandardMaterial
        color={hovered ? "#5ba0e9" : color}
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  );
}

// Placeholder shaft
function Shaft({ position = [0, 0, 0], length = 3 }: {
  position?: [number, number, number];
  length?: number;
}) {
  return (
    <mesh position={position} rotation={[Math.PI / 2, 0, 0]}>
      <cylinderGeometry args={[0.15, 0.15, length, 32]} />
      <meshStandardMaterial color="#666666" metalness={0.9} roughness={0.1} />
    </mesh>
  );
}

// Gearbox assembly
function GearboxAssembly() {
  const groupRef = useRef<Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Main gears */}
      <Gear position={[0, 0, 0]} scale={1.2} color="#4a90d9" />
      <Gear position={[2.2, 0, 0]} scale={0.8} color="#d94a4a" />
      <Gear position={[-2.2, 0, 0]} scale={0.9} color="#4ad94a" />
      
      {/* Shafts */}
      <Shaft position={[0, 0, 0]} length={2} />
      <Shaft position={[2.2, 0, 0]} length={2} />
      <Shaft position={[-2.2, 0, 0]} length={2} />

      {/* Housing (simplified) */}
      <mesh position={[0, 0, -0.8]}>
        <boxGeometry args={[6, 3, 0.3]} />
        <meshStandardMaterial
          color="#333333"
          metalness={0.7}
          roughness={0.3}
          transparent
          opacity={0.6}
        />
      </mesh>
    </group>
  );
}

// Loading component
function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color="#4a90d9" wireframe />
    </mesh>
  );
}

export default function CADViewer() {
  const { isDarkMode } = useOSStore();
  const [showGrid, setShowGrid] = useState(true);
  const [showWireframe, setShowWireframe] = useState(false);
  const [modelInfo] = useState({
    name: "Gearbox Assembly",
    parts: 6,
    triangles: "~12,000",
    format: "GLB (placeholder)",
  });

  const toolbarButtons = [
    { icon: RotateCcw, label: "Reset View", onClick: () => {} },
    { icon: ZoomIn, label: "Zoom In", onClick: () => {} },
    { icon: ZoomOut, label: "Zoom Out", onClick: () => {} },
    { icon: Maximize2, label: "Fit to Screen", onClick: () => {} },
    { icon: Grid3X3, label: "Toggle Grid", onClick: () => setShowGrid(!showGrid), active: showGrid },
    { icon: Box, label: "Wireframe", onClick: () => setShowWireframe(!showWireframe), active: showWireframe },
  ];

  return (
    <div className={cn("flex flex-col h-full", isDarkMode ? "bg-[#1a1a1a]" : "bg-[#f0f0f0]")}>
      {/* Toolbar */}
      <div
        className={cn(
          "flex items-center gap-1 px-3 py-2 border-b",
          isDarkMode ? "border-white/10 bg-white/5" : "border-black/10 bg-black/5"
        )}
      >
        {toolbarButtons.map((btn, i) => {
          const Icon = btn.icon;
          return (
            <button
              key={i}
              onClick={btn.onClick}
              className={cn(
                "p-2 rounded transition-colors",
                btn.active
                  ? "bg-accent text-white"
                  : isDarkMode
                  ? "text-white/70 hover:bg-white/10"
                  : "text-black/70 hover:bg-black/5"
              )}
              title={btn.label}
            >
              <Icon size={18} />
            </button>
          );
        })}

        <div className="flex-1" />

        <span
          className={cn(
            "text-sm",
            isDarkMode ? "text-white/60" : "text-black/60"
          )}
        >
          Drag to rotate • Scroll to zoom • Right-click to pan
        </span>
      </div>

      {/* 3D Viewport */}
      <div className="flex-1 relative">
        <Canvas>
          <PerspectiveCamera makeDefault position={[5, 3, 5]} fov={50} />
          <OrbitControls
            enableDamping
            dampingFactor={0.05}
            minDistance={3}
            maxDistance={20}
          />

          {/* Lighting */}
          <ambientLight intensity={0.4} />
          <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
          <directionalLight position={[-10, -10, -5]} intensity={0.3} />

          {/* Environment */}
          <Environment preset="studio" />

          {/* Grid */}
          {showGrid && (
            <Grid
              infiniteGrid
              fadeDistance={30}
              fadeStrength={1}
              cellSize={0.5}
              cellThickness={0.5}
              cellColor={isDarkMode ? "#333333" : "#cccccc"}
              sectionSize={2}
              sectionThickness={1}
              sectionColor={isDarkMode ? "#444444" : "#999999"}
            />
          )}

          {/* Model */}
          <Suspense fallback={<LoadingFallback />}>
            <GearboxAssembly />
          </Suspense>
        </Canvas>

        {/* Model info panel */}
        <div
          className={cn(
            "absolute bottom-4 left-4 rounded-win p-3 min-w-[200px]",
            isDarkMode ? "glass-dark" : "glass"
          )}
        >
          <div className="flex items-center gap-2 mb-2">
            <Layers size={16} className="text-accent" />
            <span
              className={cn(
                "text-sm font-medium",
                isDarkMode ? "text-white" : "text-black"
              )}
            >
              Model Info
            </span>
          </div>
          <div className="space-y-1 text-xs">
            {Object.entries(modelInfo).map(([key, value]) => (
              <div
                key={key}
                className={cn(
                  "flex justify-between",
                  isDarkMode ? "text-white/70" : "text-black/70"
                )}
              >
                <span className="capitalize">{key}:</span>
                <span className="font-medium">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* View cube placeholder */}
        <div
          className={cn(
            "absolute top-4 right-4 w-16 h-16 rounded-win flex items-center justify-center",
            isDarkMode ? "glass-dark" : "glass"
          )}
        >
          <Eye
            size={24}
            className={isDarkMode ? "text-white/50" : "text-black/50"}
          />
        </div>
      </div>

      {/* Status bar */}
      <div
        className={cn(
          "flex items-center justify-between px-4 py-1.5 text-xs border-t",
          isDarkMode ? "border-white/10 text-white/60" : "border-black/10 text-black/50"
        )}
      >
        <span>{modelInfo.name}</span>
        <div className="flex items-center gap-4">
          <span>Parts: {modelInfo.parts}</span>
          <span>Triangles: {modelInfo.triangles}</span>
          <span>{modelInfo.format}</span>
        </div>
      </div>
    </div>
  );
}

