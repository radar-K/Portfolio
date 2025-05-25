"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type * as THREE from "three";

export interface TechStack {
  type: // 🔤 Språk & pre-processorer
  | "html"
    | "css"
    | "sass"
    | "less"
    | "javascript"
    | "typescript"

    // ⚛️ Ramverk & bibliotek
    | "react"
    | "vue.js"
    | "angular"
    | "svelte"
    | "preact"
    | "next.js"
    | "nuxt.js"
    | "solid.js"

    // 🎨 UI-ramverk
    | "tailwindcss"
    | "bootstrap"
    | "material-ui"
    | "chakra-ui"
    | "ant-design"
    | "shadcn/ui"

    // ⚙️ State management
    | "redux"
    | "zustand"
    | "recoil"
    | "mobx"
    | "jotai"
    | "xstate"

    // 🧪 Testning
    | "jest"
    | "react-testing-library"
    | "cypress"
    | "playwright"
    | "mocha"
    | "vitest"

    // 🧱 Bundlers & byggverktyg
    | "webpack"
    | "vite"
    | "parcel"
    | "rollup"
    | "esbuild"

    // 🌐 Routing & formulär
    | "react-router"
    | "react-hook-form"
    | "formik"
    | "zod"
    | "yup"

    // 🌍 Internationellisering
    | "i18next"
    | "next-i18next"

    // ✨ Animation & grafik
    | "three.js"
    | "gsap"
    | "lottie"
    | "framer-motion"
    | "webgl"
    | "canvas"

    // 🧑‍🦯 Tillgänglighet
    | "wcag"

    // ☁️ Cloud & DevOps
    | "aws"
    | "docker";
}

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

  useFrame((state) => {
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

function Icon3D({
  type,
  onHover,
}: {
  type: TechIcon3DProps["type"];
  onHover?: (isHovered: boolean) => void;
}) {
  const colorMap = {
    javascript: "#FFFACD", // Light yellow for JavaScript
    aws: "#FFD4A3", // Light orange for AWS
    docker: "#B3E5FC", // Light blue for Docker
    postgresql: "#B3C6E7", // Light purple for PostgreSQL
    threejs: "#000000", // Black for Three.js
    react: "#B3E5FC", // Light blue for React
    css: "#B3E5FC", // Light blue for CSS
    webgl: "#990000", // Dark red for WebGL
  };

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[2, 2, 2]} intensity={0.8} />
      <CubeIcon color={colorMap[type]} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={false}
        rotateSpeed={0.5}
      />
    </>
  );
}

export default function TechIcon3D({ type, onHover }: TechIcon3DProps) {
  return (
    <div
      className="w-12 h-12 bg-white rounded-lg"
      onMouseEnter={() => onHover?.(true)}
      onMouseLeave={() => onHover?.(false)}
    >
      <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
        <Icon3D type={type} onHover={onHover} />
      </Canvas>
    </div>
  );
}
