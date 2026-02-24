"use client";

import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface SnailSliderProps {
  className?: string;
  initialProgress?: number;
  min?: number;
  max?: number;
  interactive?: boolean;
  backgroundColor?: string;
  progressColor?: string;
  showValue?: boolean;
  valueFormat?: (value: number) => string;
  onProgressChange?: (value: number) => void;
}

// ...rest of your imports remain unchanged

export function Slider({
  className,
  initialProgress = 45,
  min = 0,
  max = 100,
  interactive = true,
  backgroundColor = "bg-blue-100",
  progressColor = "bg-blue-200",
  showValue = true,
  valueFormat = (value: number) => `${value}%`,
  onProgressChange,
}: SnailSliderProps) {
  const [progress, setProgress] = useState(initialProgress);
  const [isDragging, setIsDragging] = useState(false);
  const [trail, setTrail] = useState<number[]>([]);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const progressPercentage = ((progress - min) / (max - min)) * 100;

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!interactive) return;
    setIsDragging(true);
    updateProgressFromEvent(e);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!interactive) return;
    setIsDragging(true);
    updateProgressFromTouch(e);
  };

  const updateProgressFromEvent = (e: React.MouseEvent | MouseEvent) => {
    if (!interactive || !progressBarRef.current) return;

    const rect = progressBarRef.current.getBoundingClientRect();
    const x = Math.min(rect.width, Math.max(0, e.clientX - rect.left));
    const percentage = (x / rect.width) * 100;
    const newProgress = Math.round(((max - min) * percentage) / 100 + min);

    updateProgress(newProgress);
  };

  const updateProgressFromTouch = (e: React.TouchEvent | TouchEvent) => {
    if (!interactive || !progressBarRef.current || !e.touches[0]) return;

    const rect = progressBarRef.current.getBoundingClientRect();
    const x = Math.min(
      rect.width,
      Math.max(0, e.touches[0].clientX - rect.left)
    );
    const percentage = (x / rect.width) * 100;
    const newProgress = Math.round(((max - min) * percentage) / 100 + min);

    updateProgress(newProgress);
  };

  const updateProgress = (newValue: number) => {
    const boundedValue = Math.max(min, Math.min(max, newValue));
    setProgress(boundedValue);
    setTrail((prev) => [...prev.slice(-5), boundedValue]);
    if (onProgressChange) {
      onProgressChange(boundedValue);
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      updateProgressFromEvent(e);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      updateProgressFromTouch(e);
    };

    const handleEnd = () => {
      setIsDragging(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleEnd);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleEnd);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleEnd);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleEnd);
    };
  }, [isDragging]);

  const getTrailOpacity = (index: number, total: number) => {
    return (index / total) * 0.15;
  };

  return (
    <div className={cn("w-full max-w-xl mx-auto", className)}>
      <div className="rounded-2xl shadow-md border border-gray-200 bg-white p-6">
        <div className="relative py-8">
          <div
            ref={progressBarRef}
            className={`h-4 ${backgroundColor} rounded-full shadow-inner overflow-hidden cursor-pointer relative`}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
          >
            {trail.map((trailPoint, index) => {
              const trailPercentage = ((trailPoint - min) / (max - min)) * 100;
              return (
                <div
                  key={index}
                  className="absolute h-full bg-gray-400"
                  style={{
                    width: "4px",
                    left: `${trailPercentage}%`,
                    opacity: getTrailOpacity(index, trail.length),
                  }}
                />
              );
            })}

            <div
              className={`absolute top-0 left-0 h-full ${progressColor} transition-all`}
              style={{ width: `${progressPercentage}%` }}
            />

            {/* Round draggable thumb */}
            <div
              className="absolute top-1/2 w-6 h-6 bg-blue-600 rounded-full border-2 border-white shadow -translate-x-1/2 -translate-y-1/2 transition-all duration-150"
              style={{ left: `${progressPercentage}%` }}
            />
          </div>

          {showValue && (
            <div
              className={`absolute bottom-full mb-2 text-sm font-medium text-center px-2 py-1 bg-white/80 rounded-md transform -translate-x-1/2 transition-all ${
                isDragging ? "opacity-100 scale-110" : "opacity-80"
              }`}
              style={{ left: `${progressPercentage}%` }}
            >
              {valueFormat(progress)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
