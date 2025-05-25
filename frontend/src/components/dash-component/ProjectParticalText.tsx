"use client";

import { Canvas, useFrame, useThree, extend } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import { useRef, useMemo, useEffect, useState } from "react";
import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

extend({ TextGeometry });

// Custom shader material with proper syntax
const ParticleShaderMaterial = shaderMaterial(
  {
    color: new THREE.Color(0x000000),
    pointTexture: null,
  },
  // Vertex shader
  `
    attribute float size;
    attribute vec3 customColor;
    varying vec3 vColor;

    void main() {
      vColor = customColor;
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      gl_PointSize = size * (300.0 / -mvPosition.z);
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  // Fragment shader
  `
    uniform vec3 color;
    uniform sampler2D pointTexture;
    varying vec3 vColor;

    void main() {
      gl_FragColor = vec4(color * vColor, 1.0);
      gl_FragColor = gl_FragColor * texture2D(pointTexture, gl_PointCoord);
    }
  `
);

extend({ ParticleShaderMaterial });

interface ParticleTextSystemProps {
  text: string;
}

function ParticleTextSystem({ text }: ParticleTextSystemProps) {
  const particlesRef = useRef<THREE.Points>(null);
  const planeRef = useRef<THREE.Mesh>(null);
  const { mouse, viewport, camera, raycaster } = useThree();
  const [particleData, setParticleData] = useState<{
    positions: Float32Array;
    colors: Float32Array;
    sizes: Float32Array;
    originalPositions: Float32Array;
  } | null>(null);

  const mousePressed = useRef(false);

  // Create particle texture
  const particleTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext("2d");

    if (ctx) {
      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, "rgba(0,0,0,1)");
      gradient.addColorStop(0.2, "rgba(0,0,0,1)");
      gradient.addColorStop(0.4, "rgba(0,0,0,0.8)");
      gradient.addColorStop(1, "rgba(0,0,0,0)");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 64, 64);
    }

    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  }, []);

  // Load font and create particles
  useEffect(() => {
    const loader = new FontLoader();
    loader.load(
      "https://threejs.org/examples/fonts/helvetiker_bold.typeface.json",
      (font) => {
        const shapes = font.generateShapes(text, 40);
        const geometry = new THREE.ShapeGeometry(shapes);
        geometry.computeBoundingBox();

        if (!geometry.boundingBox) return;

        const xMid = -geometry.boundingBox.max.x / 2;
        const yMid =
          (geometry.boundingBox.max.y - geometry.boundingBox.min.y) / 2.85;

        const holeShapes: any[] = [];
        for (let q = 0; q < shapes.length; q++) {
          const shape = shapes[q];
          if (shape.holes && shape.holes.length > 0) {
            for (let j = 0; j < shape.holes.length; j++) {
              holeShapes.push(shape.holes[j]);
            }
          }
        }
        shapes.push(...holeShapes);

        const thePoints: THREE.Vector3[] = [];
        const colors: number[] = [];
        const sizes: number[] = [];

        for (let x = 0; x < shapes.length; x++) {
          const shape = shapes[x];
          const amountPoints = shape.type === "Path" ? 1200 : 2500;
          const points = shape.getSpacedPoints(amountPoints);

          points.forEach((element) => {
            const point = new THREE.Vector3(
              element.x + xMid,
              element.y + yMid,
              0
            );
            thePoints.push(point);
            colors.push(0.1, 0.1, 0.1);
            sizes.push(1);
          });
        }

        const positions = new Float32Array(thePoints.length * 3);
        const originalPositions = new Float32Array(thePoints.length * 3);
        const colorArray = new Float32Array(colors.length);
        const sizeArray = new Float32Array(sizes.length);

        thePoints.forEach((point, i) => {
          positions[i * 3] = point.x;
          positions[i * 3 + 1] = point.y;
          positions[i * 3 + 2] = point.z;

          originalPositions[i * 3] = point.x;
          originalPositions[i * 3 + 1] = point.y;
          originalPositions[i * 3 + 2] = point.z;
        });

        colorArray.set(colors);
        sizeArray.set(sizes);

        setParticleData({
          positions,
          colors: colorArray,
          sizes: sizeArray,
          originalPositions,
        });
      }
    );
  }, [text]);

  // Mouse events
  useEffect(() => {
    const handleMouseDown = () => {
      mousePressed.current = true;
    };

    const handleMouseUp = () => {
      mousePressed.current = false;
    };

    if (typeof document !== "undefined") {
      document.addEventListener("mousedown", handleMouseDown);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      if (typeof document !== "undefined") {
        document.removeEventListener("mousedown", handleMouseDown);
        document.removeEventListener("mouseup", handleMouseUp);
      }
    };
  }, []);

  // Animation loop
  useFrame((state) => {
    if (!particlesRef.current || !particleData || !planeRef.current) return;

    const time = ((state.clock.elapsedTime * 0.001) % 12) / 12;
    const zigzagTime = (1 + Math.sin(time * 2 * Math.PI)) / 6;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(planeRef.current);

    if (intersects.length > 0) {
      const positions = particlesRef.current.geometry.attributes.position
        .array as Float32Array;
      const colors = particlesRef.current.geometry.attributes.customColor
        .array as Float32Array;
      const sizes = particlesRef.current.geometry.attributes.size
        .array as Float32Array;
      const originalPositions = particleData.originalPositions;

      const mx = intersects[0].point.x;
      const my = intersects[0].point.y;

      for (let i = 0; i < positions.length; i += 3) {
        const initX = originalPositions[i];
        const initY = originalPositions[i + 1];
        const initZ = originalPositions[i + 2];

        let px = positions[i];
        let py = positions[i + 1];
        let pz = positions[i + 2];

        const dx = mx - px;
        const dy = my - py;
        const mouseDistance = Math.sqrt(dx * dx + dy * dy);
        const d = dx * dx + dy * dy;
        const f = -250 / d;

        if (mousePressed.current) {
          const t = Math.atan2(dy, dx);
          const reducedForce = f * 0.4;
          px -= reducedForce * Math.cos(t);
          py -= reducedForce * Math.sin(t);

          const maxDistance = 40;
          const distanceFromOriginal = Math.sqrt(
            (px - initX) * (px - initX) + (py - initY) * (py - initY)
          );
          if (distanceFromOriginal > maxDistance) {
            const angle = Math.atan2(py - initY, px - initX);
            px = initX + Math.cos(angle) * maxDistance;
            py = initY + Math.sin(angle) * maxDistance;
          }

          const colorIndex = (i / 3) * 3;
          colors[colorIndex] = 0.5 + zigzagTime;
          colors[colorIndex + 1] = 1.0;
          colors[colorIndex + 2] = 0.5;

          if (
            px > initX + 40 ||
            px < initX - 40 ||
            py > initY + 40 ||
            py < initY - 40
          ) {
            colors[colorIndex] = 1.0;
            colors[colorIndex + 1] = 0.15;
            colors[colorIndex + 2] = 0.0;
          }
        } else {
          if (mouseDistance < 180) {
            const particleIndex = i / 3;
            if (particleIndex % 5 === 0) {
              const t = Math.atan2(dy, dx);
              px -= 0.03 * Math.cos(t);
              py -= 0.03 * Math.sin(t);

              const colorIndex = particleIndex * 3;
              colors[colorIndex] = 1.0;
              colors[colorIndex + 1] = 0.15;
              colors[colorIndex + 2] = 0.0;

              sizes[particleIndex] = 1 / 1.2;
            } else {
              const t = Math.atan2(dy, dx);
              px += f * Math.cos(t);
              py += f * Math.sin(t);

              sizes[particleIndex] = 1.3;
            }

            if (
              px > initX + 10 ||
              px < initX - 10 ||
              py > initY + 10 ||
              py < initY - 10
            ) {
              const colorIndex = particleIndex * 3;
              colors[colorIndex] = 1.0;
              colors[colorIndex + 1] = 0.15;
              colors[colorIndex + 2] = 0.0;

              sizes[particleIndex] = 1 / 1.8;
            }
          }
        }

        const ease = mousePressed.current ? 0.03 : 0.08;
        px += (initX - px) * ease;
        py += (initY - py) * ease;
        pz += (initZ - pz) * ease;

        positions[i] = px;
        positions[i + 1] = py;
        positions[i + 2] = pz;
      }

      particlesRef.current.geometry.attributes.position.needsUpdate = true;
      particlesRef.current.geometry.attributes.customColor.needsUpdate = true;
      particlesRef.current.geometry.attributes.size.needsUpdate = true;
    }
  });

  const planeGeometry = useMemo(() => {
    const width = viewport.width;
    const height = viewport.height;
    return new THREE.PlaneGeometry(width * 2, height * 2);
  }, [viewport]);

  return (
    <>
      <mesh ref={planeRef} geometry={planeGeometry} visible={false}>
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      {particleData && (
        <points ref={particlesRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[particleData.positions, 3]}
              count={particleData.positions.length / 3}
              array={particleData.positions}
              itemSize={3}
            />
            <bufferAttribute
              attach="attributes-customColor"
              args={[particleData.colors, 3]}
              count={particleData.colors.length / 3}
              array={particleData.colors}
              itemSize={3}
            />
            <bufferAttribute
              attach="attributes-size"
              args={[particleData.sizes, 1]}
              count={particleData.sizes.length}
              array={particleData.sizes}
              itemSize={1}
            />
          </bufferGeometry>
          // Med denna:
          <shaderMaterial
            uniforms={{
              color: { value: new THREE.Color(0x000000) },
              pointTexture: { value: particleTexture },
            }}
            vertexShader={`
    attribute float size;
    attribute vec3 customColor;
    varying vec3 vColor;

    void main() {
      vColor = customColor;
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      gl_PointSize = size * (300.0 / -mvPosition.z);
      gl_Position = projectionMatrix * mvPosition;
    }
  `}
            fragmentShader={`
    uniform vec3 color;
    uniform sampler2D pointTexture;
    varying vec3 vColor;

    void main() {
      gl_FragColor = vec4(color * vColor, 1.0);
      gl_FragColor = gl_FragColor * texture2D(pointTexture, gl_PointCoord);
    }
  `}
            blending={THREE.AdditiveBlending}
            depthTest={false}
            transparent
          />
        </points>
      )}
    </>
  );
}

export default function ParticleText() {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden py-16 px-4">
      <div className="fixed inset-0 pointer-events-none z-0">
        {Array.from({ length: 25 }, (_, i) => (
          <div
            key={i}
            className="absolute rounded-full w-1 h-1 bg-gray-300 opacity-20"
            style={{
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
              animationDelay: Math.random() * 2 + "s",
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="mb-4 h-56">
            <Canvas
              camera={{ position: [0, 0, 100], fov: 75 }}
              gl={{ antialias: true }}
            >
              <ParticleTextSystem text="PROJECTS" />
            </Canvas>
          </div>
        </div>
      </div>
    </div>
  );
}
