import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function IcosahedronWire() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.x += delta * 0.18;
    groupRef.current.rotation.y += delta * 0.26;
    groupRef.current.rotation.z += delta * 0.09;
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <icosahedronGeometry args={[1.3, 1]} />
        <meshStandardMaterial
          color="#5eead4"
          emissive="#0d9488"
          emissiveIntensity={1.2}
          wireframe
          transparent
          opacity={0.65}
        />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[0.85, 0]} />
        <meshStandardMaterial
          color="#22d3ee"
          emissive="#22d3ee"
          emissiveIntensity={2}
          wireframe
          transparent
          opacity={0.35}
        />
      </mesh>
    </group>
  );
}

const ContactOrb = () => (
  <div className="contact-orb-canvas" aria-hidden="true">
    <Canvas
      camera={{ position: [0, 0, 4], fov: 50 }}
      gl={{ alpha: true, antialias: true }}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[3, 3, 3]} intensity={1.5} color="#5eead4" />
      <pointLight position={[-3, -3, -3]} intensity={0.5} color="#0d9488" />
      <IcosahedronWire />
    </Canvas>
  </div>
);

export default ContactOrb;
