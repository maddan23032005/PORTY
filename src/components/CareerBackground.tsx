import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

type OrbProps = {
  position: [number, number, number];
  color: string;
  speed: number;
  radius: number;
  phase: number;
};

function FloatingOrb({ position, color, speed, radius, phase }: OrbProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const t = useRef(phase);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    t.current += delta * speed;
    meshRef.current.position.x = position[0] + Math.sin(t.current) * radius;
    meshRef.current.position.y = position[1] + Math.cos(t.current * 0.7) * radius * 0.5;
    meshRef.current.rotation.x += delta * 0.4;
    meshRef.current.rotation.y += delta * 0.3;
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.14, 12, 12]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={3}
        transparent
        opacity={0.75}
      />
    </mesh>
  );
}

const ORBS: OrbProps[] = [
  { position: [-5, 2, 0],   color: "#5eead4", speed: 0.35, radius: 1.8, phase: 0 },
  { position: [4, -1.5, -1], color: "#0d9488", speed: 0.28, radius: 2.2, phase: 1 },
  { position: [-2, -2, 0],  color: "#22d3ee", speed: 0.50, radius: 1.2, phase: 2 },
  { position: [5, 2, -2],   color: "#14b8a6", speed: 0.22, radius: 2.5, phase: 3 },
  { position: [1, 1, -1],   color: "#67e8f9", speed: 0.60, radius: 0.9, phase: 4 },
  { position: [-4, -0.5, -1], color: "#5eead4", speed: 0.32, radius: 1.5, phase: 5 },
  { position: [2, -3, 0],   color: "#a5f3fc", speed: 0.45, radius: 1.0, phase: 0.5 },
  { position: [-1, 3, -2],  color: "#0d9488", speed: 0.38, radius: 1.4, phase: 2.5 },
];

function Scene() {
  return (
    <>
      <ambientLight intensity={0.15} />
      <pointLight position={[0, 0, 5]} intensity={0.8} color="#5eead4" />
      <pointLight position={[-5, 5, 2]} intensity={0.4} color="#22d3ee" />
      {ORBS.map((orb, i) => (
        <FloatingOrb key={i} {...orb} />
      ))}
    </>
  );
}

const CareerBackground = () => (
  <div className="career-bg-canvas" aria-hidden="true">
    <Canvas
      camera={{ position: [0, 0, 8], fov: 65 }}
      gl={{ alpha: true, antialias: false }}
    >
      <Scene />
    </Canvas>
  </div>
);

export default CareerBackground;
