"use client";

import Link from "next/link";
import {
  Linkedin,
  Phone,
  Mail,
  MessageCircle,
  Play,
  Pause,
} from "lucide-react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Box } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";

function RotatingCube() {
  const meshRef = useRef<any>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5;
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <Box ref={meshRef} args={[2, 2, 2]}>
      <meshStandardMaterial color="#6366f1" />
    </Box>
  );
}

function ManualAndAutoRotatingCube() {
  const meshRef = useRef<any>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5;
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <Box ref={meshRef} args={[1.2, 1.2, 1.2]}>
      <meshStandardMaterial color="#fed7aa" />
    </Box>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <RotatingCube />
      <OrbitControls enableZoom={false} enablePan={false} />
    </>
  );
}

function CubeScene() {
  return (
    <>
      <ambientLight intensity={0.8} />
      <pointLight position={[2, 2, 2]} />
      <ManualAndAutoRotatingCube />
      <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={1.5} />
    </>
  );
}

function AudioPlayer({ audioSrc = "/audio/sample.mp3" }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(audioSrc);
    audioRef.current = audio;

    const onLoadedMetadata = () => setDuration(audio.duration);
    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onEnded = () => setIsPlaying(false);

    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.pause();
      audio.src = "";
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("ended", onEnded);
    };
  }, [audioSrc]);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="px-4 sm:px-6 py-2 sm:py-3 bg-gray-100 rounded-full flex items-center gap-3 h-[40px] sm:h-[44px]">
      <button
        onClick={togglePlayPause}
        className="flex items-center justify-center text-black"
      >
        {isPlaying ? (
          <Pause size={16} className="sm:w-[18px] sm:h-[18px]" />
        ) : (
          <Play size={16} className="sm:w-[18px] sm:h-[18px] ml-0.5" />
        )}
      </button>

      <div className="w-12 sm:w-16 h-1 bg-gray-300 rounded-full relative">
        <div
          className="h-full bg-black rounded-full transition-all duration-300"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </div>
  );
}

interface ConnectCardProps {
  name?: string;
  title?: string;
  company?: string;
  companyUrl?: string;
  audioSrc?: string;
  showFlag?: boolean;
  className?: string;
}

export function ConnectCard({
  name = "Connect",
  title = "Frontend developer",
  company = "Chas Academy",
  companyUrl = "https://chasacademy.se/program/frontendutvecklare",
  audioSrc = "/audio/sample.mp3",
  showFlag = false,
  className = "",
}: ConnectCardProps) {
  const [showPulse, setShowPulse] = useState(false);
  const [pulseKey, setPulseKey] = useState(0);
  const [hasPulsed, setHasPulsed] = useState(false);

  const handleMouseEnter = () => {
    if (!hasPulsed) {
      setShowPulse(true);
      setPulseKey((prev) => prev + 1);
      setHasPulsed(true);
    }
  };

  const handleMouseLeave = () => {
    setShowPulse(false);
  };

  return (
    <div
      className={`rounded-2xl bg-white shadow-lg overflow-hidden h-full ${className}`}
    >
      <div className="flex flex-col md:flex-row h-full">
        {/* 3D Scene Section - Top on mobile, left on desktop */}
        <div
          className="w-full md:w-1/3 h-[200px] md:h-full relative flex-shrink-0"
          style={{
            background: `
              linear-gradient(to right, transparent 0%, transparent 50%, #ffffff 100%),
              linear-gradient(to bottom, #eff6ff 0%, #fff7ed 100%)
            `,
          }}
        >
          <Canvas
            camera={{ position: [0, 0, 6], fov: 50 }}
            className="!absolute inset-0"
            style={{ background: "transparent" }}
          >
            <Scene />
          </Canvas>
        </div>

        {/* Content Section - Bottom on mobile, right on desktop */}
        <div className="w-full md:w-2/3 p-3 sm:p-4 md:p-5 flex flex-col justify-center bg-white">
          {/* Name and Title */}
          <div className="mb-2 sm:mb-3">
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                {name}
              </h2>
              {showFlag && <span className="text-sm">🇺🇸</span>}
            </div>
            <p className="text-sm sm:text-base text-gray-600">
              {title} at{" "}
              <Link href={companyUrl} className="text-blue-600 hover:underline">
                {company}
              </Link>
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex gap-2 sm:gap-3 mb-3">
            <button
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Linkedin size={16} className="sm:w-[18px] sm:h-[18px]" />
              {showPulse && (
                <div
                  key={pulseKey}
                  className="absolute inset-0 rounded-full border-2"
                  style={{
                    borderColor: "#ffab4d",
                    animation: "slowPulse 0.8s ease-out",
                  }}
                ></div>
              )}
            </button>

            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center cursor-move">
              <div className="w-6 h-6 sm:w-7 sm:h-7">
                <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
                  <CubeScene />
                </Canvas>
              </div>
            </div>

            <button className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors">
              <Phone size={16} className="sm:w-[18px] sm:h-[18px]" />
            </button>
            <button className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors">
              <Mail size={16} className="sm:w-[18px] sm:h-[18px]" />
            </button>
            <button className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors">
              <MessageCircle size={16} className="sm:w-[18px] sm:h-[18px]" />
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2 items-center">
            <button className="px-3 sm:px-4 py-1.5 sm:py-2 bg-black text-white rounded-full text-sm sm:text-base hover:bg-gray-800 transition-colors">
              Call
            </button>
            <a
              href="mailto:karolina.rad@hotmail.com"
              className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-100 text-gray-800 rounded-full text-sm sm:text-base hover:bg-gray-200 transition-colors"
            >
              Email
            </a>

            <AudioPlayer audioSrc={audioSrc} />
          </div>
        </div>
      </div>
      <style jsx global>{`
        @keyframes slowPulse {
          0% {
            transform: scale(1);
            opacity: 0.8;
          }
          100% {
            transform: scale(2);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
