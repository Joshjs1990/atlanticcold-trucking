'use client';

import { useState } from 'react';
import { ContactShadows, Environment } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import {
  AtlanticColdTruck,
  HOTSPOTS,
} from './truck-viewer/AtlanticColdTruck.jsx';

const hotspotMap = Object.fromEntries(HOTSPOTS.map((spot) => [spot.id, spot]));

export function EquipmentViewer() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = selectedId ? hotspotMap[selectedId] : null;

  return (
    <section className="equipment-viewer" aria-label="Interactive truck viewer">
      <div className="equipment-viewer-head">
        <div>
          <span className="section-label section-label-light">
            Fleet equipment
          </span>
          <h2>Refrigerated straight truck</h2>
        </div>
        <span className="equipment-drag-hint">Drag to explore</span>
      </div>

      <div className="equipment-canvas-wrap">
        <Canvas
          shadows
          dpr={[1, 1.75]}
          camera={{ position: [13, 6.5, -14], fov: 34, near: 0.1, far: 100 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
          }}
          onCreated={({ gl }) => {
            gl.toneMapping = THREE.ACESFilmicToneMapping;
            gl.toneMappingExposure = 1.05;
            gl.outputColorSpace = THREE.SRGBColorSpace;
          }}
        >
          <color attach="background" args={['#07111d']} />
          <fog attach="fog" args={['#07111d', 18, 34]} />
          <ambientLight intensity={0.52} />
          <directionalLight
            castShadow
            intensity={2.05}
            position={[5, 11, 8]}
            shadow-mapSize={[2048, 2048]}
            shadow-bias={-0.0001}
          />
          <directionalLight
            intensity={1.15}
            color="#b8e7ef"
            position={[-8, 6, -9]}
          />
          <directionalLight
            intensity={1.05}
            color="#fffaf1"
            position={[4, 5, 12]}
          />
          <rectAreaLight
            width={9}
            height={6}
            intensity={5.5}
            color="#fff8ec"
            position={[6, 10, 5]}
            rotation={[0.35, 0.55, 0]}
          />
          <rectAreaLight
            width={7}
            height={5}
            intensity={3.2}
            color="#d8f5ff"
            position={[-7, 7, -6]}
            rotation={[-0.25, -0.65, 0]}
          />
          <Environment preset="city" environmentIntensity={0.78} />
          <AtlanticColdTruck selectedId={selectedId} onSelect={setSelectedId} />
          <ContactShadows
            position={[0, 0.04, 0]}
            opacity={0.46}
            scale={24}
            blur={2.6}
            far={7}
            resolution={1024}
            color="#000b12"
          />
        </Canvas>
        <span className="equipment-viewer-caption">
          <i /> Drag or tap a marker to explore the fleet
        </span>
      </div>

      <div
        className={`equipment-info-panel ${selected ? 'is-open' : ''}`}
        aria-live="polite"
      >
        {selected ? (
          <>
            <button
              className="equipment-panel-close"
              type="button"
              onClick={() => setSelectedId(null)}
              aria-label="Close hotspot detail"
            >
              ×
            </button>
            <span className="equipment-panel-kicker">
              {selected.number} / component
            </span>
            <h3>{selected.title}</h3>
            <p>{selected.description}</p>
            <button
              className="equipment-panel-action"
              type="button"
              onClick={() => setSelectedId(null)}
            >
              Back to overview <span>↗</span>
            </button>
          </>
        ) : (
          <>
            <span className="equipment-panel-kicker">
              Built for the route ahead
            </span>
            <h3>Designed around the delivery</h3>
            <p>
              Tap a marker to see the details that keep every load moving at the
              right temperature.
            </p>
            <div className="equipment-panel-tags">
              <span>01 · Cooling</span>
              <span>02 · Capacity</span>
              <span>03 · Access</span>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
