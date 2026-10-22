import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Lightformer } from '@react-three/drei';
import { MathUtils } from 'three';

// Deux anneaux d'argent fins (gyroscope) + une perle émeraude en orbite.
// Les dimensions correspondent aux deux cercles de la maquette Figma.
function Orbit({ radius, tilt, speed, tube = 0.012, satellite = false, animate }) {
  const spin = useRef();
  useFrame((_, delta) => {
    if (animate && spin.current) spin.current.rotation.z += delta * speed;
  });
  return (
    <group rotation={tilt}>
      <group ref={spin}>
        <mesh>
          <torusGeometry args={[radius, tube, 24, 220]} />
          <meshStandardMaterial color="#c9ccd4" metalness={1} roughness={0.22} />
        </mesh>
        {satellite && (
          <mesh position={[radius, 0, 0]}>
            <sphereGeometry args={[0.058, 32, 32]} />
            <meshStandardMaterial color="#2a9d78" emissive="#2a9d78" emissiveIntensity={0.9} roughness={0.3} />
          </mesh>
        )}
      </group>
    </group>
  );
}

// Suit très légèrement le doigt / la souris.
function Rig({ animate, children }) {
  const group = useRef();
  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const rx = animate ? state.pointer.y * 0.22 : 0;
    const ry = animate ? state.pointer.x * 0.32 : 0;
    g.rotation.x = MathUtils.damp(g.rotation.x, rx, 3, delta);
    g.rotation.y = MathUtils.damp(g.rotation.y, ry, 3, delta);
  });
  return <group ref={group}>{children}</group>;
}

export default function HeroScene({ active = true, animate = true, onReady }) {
  return (
    <Canvas
      frameloop={active ? 'always' : 'never'}
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 6], fov: 35 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      onCreated={() => onReady && onReady()}
    >
      <ambientLight intensity={0.25} />
      <Rig animate={animate}>
        <Orbit radius={1.22} tilt={[1.15, 0.35, 0]} speed={0.18} satellite animate={animate} />
        <Orbit radius={0.9} tilt={[0.45, 1.1, 0.2]} speed={-0.12} tube={0.009} animate={animate} />
      </Rig>
      {/* Reflets métalliques générés localement : aucun fichier externe à télécharger. */}
      <Environment resolution={256}>
        <Lightformer form="rect" intensity={2.6} position={[0, 3, 3]} scale={[7, 2, 1]} color="#ffffff" />
        <Lightformer form="rect" intensity={1.6} position={[-4, 0, 2]} scale={[1, 5, 1]} color="#9b2b40" />
        <Lightformer form="rect" intensity={1.1} position={[4, -1, 2]} scale={[1, 4, 1]} color="#c9ccd4" />
      </Environment>
    </Canvas>
  );
}
