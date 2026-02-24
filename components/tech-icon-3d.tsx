"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import type * as THREE from "three";

interface TechIcon3DProps {
  type:
    | "javascript"
    | "aws"
    | "docker"
    | "postgresql"
    | "threejs"
    | "react"
    | "css"
    | "webgl";
  onHover?: (isHovered: boolean) => void;
}

function CubeIcon({ color }: { color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.rotation.x += 0.005;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

const colorMap: Record<string, string> = {
  javascript: "#FFFACD",
  aws: "#FFD4A3",
  docker: "#B3E5FC",
  postgresql: "#B3C6E7",
  threejs: "#000000",
  react: "#B3E5FC",
  css: "#B3E5FC",
  webgl: "#990000",
};

export default function TechIcon3D({ type, onHover }: TechIcon3DProps) {
  return (
    <div
      className="w-12 h-12 bg-card rounded-lg"
      onMouseEnter={() => onHover?.(true)}
      onMouseLeave={() => onHover?.(false)}
    >
      <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[2, 2, 2]} intensity={0.8} />
        <CubeIcon color={colorMap[type] || "#cccccc"} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
          rotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}
