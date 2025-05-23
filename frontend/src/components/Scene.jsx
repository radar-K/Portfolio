import React, { useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

function Model({ mouseX, mouseY }) {
  const gltf = useGLTF("/d_trump.glb");

  useFrame(() => {
    gltf.scene.rotation.y = Math.PI * 0.85 + (mouseX * Math.PI) / 6;
    gltf.scene.rotation.x = (mouseY * Math.PI) / 12;
    // gltf.scene.rotation.y = (mouseX * Math.PI) / 4; // snurra sidledes
    // gltf.scene.rotation.x = (mouseY * Math.PI) / 8; // luta upp/ner
  });

  return <primitive object={gltf.scene} scale={3} />;
}

export default function Scene() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      });
    };
    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  return (
    <Canvas camera={{ position: [10, 10, 10], fov: 10 }}>
      <ambientLight intensity={4.5} />
      <directionalLight position={[5, 10, 7]} intensity={1} />
      <Model mouseX={mousePos.x} mouseY={mousePos.y} />
    </Canvas>
  );
}
