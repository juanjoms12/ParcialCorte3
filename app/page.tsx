/* eslint-disable react/jsx-no-undef */
'use client';
import { useState } from 'react';
import { planets } from '@/features/planets/data/planets'; 
import { select } from 'three/tsl';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { VisibilityBufferDrawingPipeline } from 'three/examples/jsm/pipelines/VisibilityBufferDrawingPipeline.js';

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

export default function SolarSystemScene({ planets }: { visiblePlanet: VisibilityBufferDrawingPipeline }) {
  return (
    <div className="h-80 w-full overflow-hidden rounded-box">
      
    </div>
  );
}
