import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Core() {
  const mesh = useRef<THREE.Mesh>(null);
  const glow = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (mesh.current) { mesh.current.rotation.y = t * 0.4; mesh.current.rotation.x = Math.sin(t * 0.3) * 0.2; }
    if (glow.current) { glow.current.scale.setScalar(1 + Math.sin(t * 1.2) * 0.04); (glow.current.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.6 + Math.sin(t * 1.5) * 0.3; }
  });
  return (
    <group>
      <mesh ref={mesh}>
        <icosahedronGeometry args={[0.9, 4]} />
        <meshStandardMaterial color="#0d9488" emissive="#5eead4" emissiveIntensity={0.8} roughness={0.15} metalness={0.7} />
      </mesh>
      <mesh ref={glow}>
        <sphereGeometry args={[1.05, 32, 32]} />
        <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={0.6} transparent opacity={0.15} side={THREE.BackSide} />
      </mesh>
    </group>
  );
}

function Ring({ radius, speed, tiltX, tiltZ, color }: { radius: number; speed: number; tiltX: number; tiltZ: number; color: string }) {
  const r = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => { if (r.current) r.current.rotation.z = clock.getElapsedTime() * speed; });
  return (
    <mesh ref={r} rotation={[tiltX, 0, tiltZ]}>
      <torusGeometry args={[radius, 0.025, 8, 80]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.2} transparent opacity={0.7} />
    </mesh>
  );
}

function Particle({ angle, radius, speed, phase, y }: { angle: number; radius: number; speed: number; phase: number; y: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed + phase;
    if (ref.current) { ref.current.position.x = Math.cos(t + angle) * radius; ref.current.position.z = Math.sin(t + angle) * radius; ref.current.position.y = y + Math.sin(t * 0.7) * 0.2; }
  });
  return <mesh ref={ref}><sphereGeometry args={[0.05, 6, 6]} /><meshStandardMaterial color="#67e8f9" emissive="#67e8f9" emissiveIntensity={3} transparent opacity={0.9} /></mesh>;
}

function WireShell() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => { const t = clock.getElapsedTime(); if (ref.current) { ref.current.rotation.y = -t * 0.2; ref.current.rotation.x = Math.cos(t * 0.25) * 0.3; } });
  return <mesh ref={ref}><icosahedronGeometry args={[1.45, 1]} /><meshStandardMaterial color="#5eead4" emissive="#5eead4" emissiveIntensity={0.4} transparent opacity={0.12} wireframe /></mesh>;
}

function OrbScene() {
  const group = useRef<THREE.Group>(null);
  const particles = Array.from({ length: 16 }, (_, i) => ({ angle: (i / 16) * Math.PI * 2, radius: 1.7 + (i % 3) * 0.15, speed: 0.3 + (i % 5) * 0.08, phase: i * 0.7, y: ((i % 5) - 2) * 0.2 }));
  useFrame(({ clock }) => { const t = clock.getElapsedTime(); if (group.current) { group.current.position.y = Math.sin(t * 0.8) * 0.18; group.current.rotation.y = t * 0.1; } });
  return (
    <group ref={group}>
      <Core />
      <WireShell />
      <Ring radius={1.55} speed={0.6}  tiltX={Math.PI / 2.2} tiltZ={0.1}  color="#5eead4" />
      <Ring radius={1.7}  speed={-0.4} tiltX={0.4}           tiltZ={1.1}  color="#22d3ee" />
      <Ring radius={1.3}  speed={0.9}  tiltX={1.1}           tiltZ={-0.3} color="#0d9488" />
      {particles.map((p, i) => <Particle key={i} {...p} />)}
    </group>
  );
}

const FloatingAstronaut = () => (
  <Canvas
    style={{ width: "100%", height: "100%", display: "block" }}
    camera={{ position: [0, 0, 5.5], fov: 40 }}
    gl={{ alpha: true, antialias: true }}
  >
    <ambientLight intensity={0.2} />
    <pointLight position={[3, 3, 3]}   intensity={2}   color="#5eead4" />
    <pointLight position={[-3, -2, 2]} intensity={1.2} color="#22d3ee" />
    <pointLight position={[0, -3, -2]} intensity={0.6} color="#0d9488" />
    <OrbScene />
  </Canvas>
);

export default FloatingAstronaut;
