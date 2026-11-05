"use client";

// ============================================================
// PROVIDED COMPONENT - DO NOT MODIFY.
// Shows ONE planet rotating in 3D (React Three Fiber).
// Usage: <PlanetViewer planet={planet} />
// ============================================================

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import type { Group } from "three";
import type { Planet } from "@/types/planet";
import { createPlanetTexture } from "./planetTexture";

function Spinner({ planet }: { planet: Planet }) {
  const ref = useRef<Group>(null);
  const texture = useMemo(() => createPlanetTexture(planet), [planet]);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.4;
  });
  return (
    <group ref={ref}>
      <mesh>
        <sphereGeometry args={[planet.size, 64, 64]} />
        <meshStandardMaterial map={texture} roughness={0.85} />
      </mesh>
      {planet.hasRings && (
        <mesh rotation={[Math.PI / 2.4, 0, 0]}>
          <ringGeometry args={[planet.size * 1.4, planet.size * 2.2, 96]} />
          <meshBasicMaterial color={planet.color} side={2} transparent opacity={0.6} />
        </mesh>
      )}
    </group>
  );
}

export default function PlanetViewer({ planet }: { planet: Planet }) {
  return (
    <div className="h-80 w-full overflow-hidden rounded-box">
      <Canvas camera={{ position: [0, 1, planet.size * 4 + 2], fov: 50 }}>
        <color attach="background" args={["#05060f"]} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 3, 5]} intensity={2.5} />
        <Stars radius={50} depth={30} count={1500} factor={3} fade />
        <Spinner planet={planet} />
        <OrbitControls enablePan={false} enableZoom={false} />
      </Canvas>
    </div>
  );
}
