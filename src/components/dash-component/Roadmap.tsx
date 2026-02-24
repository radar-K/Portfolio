"use client";
import { useEffect, useState } from "react";

interface AnimatedLineProps {
  duration?: number;
  color?: string;
  height?: number;
  width?: string;
  loop?: boolean;
}

const AnimatedLine = ({
  duration = 3000,
  color = "#BBF7D0", // Light green by default
  height = 2,
  width = "100%",
  loop = true,
}: AnimatedLineProps) => {
  const [position, setPosition] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    if (!isAnimating) return;

    const startTime = Date.now();
    let animationFrame: number;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setPosition(progress * 100);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else if (loop) {
        // Reset animation if looping is enabled
        setPosition(0);
        setTimeout(() => {
          setIsAnimating(true);
        }, 500); // Small delay before restarting
        setIsAnimating(false);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [duration, loop, isAnimating]);

  return (
    <div
      className="relative overflow-hidden rounded-full"
      style={{
        height: `${height}px`,
        width,
        backgroundColor: "#E5E7EB", // Gray line
      }}
    >
      {/* Pulsing light effect */}
      <div
        className="absolute top-0 h-full rounded-full"
        style={{
          left: `${position - 10}%`,
          width: "20%",
          background: `linear-gradient(90deg, transparent 0%, ${color} 50%, transparent 100%)`,
          boxShadow: `0 0 10px ${color}, 0 0 5px ${color}`,
          opacity: 0.8,
        }}
      />
    </div>
  );
};

export default AnimatedLine;
