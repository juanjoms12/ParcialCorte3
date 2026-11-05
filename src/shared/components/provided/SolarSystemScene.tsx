"use client";

// ============================================================
// PROVIDED COMPONENT - DO NOT MODIFY.
// Renders every planet in a 3D scene (React Three Fiber).
// You only need to import it and pass the props below.
// ============================================================

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import type { Mesh } from "three";
import type { Planet } from "@/types/planet";
import { createPlanetTexture } from "./planetTexture";

interface SolarSystemSceneProps {
  /** Planets to display (already filtered by the page) */
  planets: Planet[];
  /** Id of the highlighted planet, or null */
  selectedId: string | null;
  /** Called with the planet id when a planet is clicked in the 3D scene */
  onSelect: (id: string) => void;
}

function PlanetMesh({
  planet,
  x,
  selected,
  onSelect,
}: {
  planet: Planet;
  x: number;
  selected: boolean;
  onSelect: (id: string) => void;
}) {
  const ref = useRef<Mesh>(null);
  const texture = useMemo(() => createPlanetTexture(planet), [planet]);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.5;
  });
  const scale = selected ? 1.25 : 1;
  return (
    <group position={[x, 0, 0]} scale={scale}>
      <mesh
        ref={ref}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(planet.id);
        }}
        onPointerOver={() => (document.body.style.cursor = "pointer")}
        onPointerOut={() => (document.body.style.cursor = "auto")}
      >
        <sphereGeometry args={[planet.size * 0.6, 48, 48]} />
        <meshStandardMaterial map={texture} roughness={0.8} emissive={planet.color} emissiveIntensity={selected ? 0.2 : 0.03} />
      </mesh>
      {planet.hasRings && (
        <mesh rotation={[Math.PI / 2.4, 0, 0]}>
          <ringGeometry args={[planet.size * 0.9, planet.size * 1.4, 64]} />
          <meshBasicMaterial color={planet.color} side={2} transparent opacity={0.6} />
        </mesh>
      )}
    </group>
  );
}

export default function SolarSystemScene({ planets, selectedId, onSelect }: SolarSystemSceneProps) {
  const spacing = 5;
  const offset = ((planets.length - 1) * spacing) / 2;
  return (
    <div className="h-full min-h-72 w-full">
      <Canvas camera={{ position: [0, 2.5, 15], fov: 55 }}>
        <color attach="background" args={["#05060f"]} />
        <ambientLight intensity={0.6} />
        <pointLight position={[0, 6, 8]} intensity={120} />
        <Stars radius={60} depth={40} count={2500} factor={3} fade speed={1} />
        {planets.map((planet, i) => (
          <PlanetMesh
            key={planet.id}
            planet={planet}
            x={i * spacing - offset}
            selected={planet.id === selectedId}
            onSelect={onSelect}
          />
        ))}
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
}
