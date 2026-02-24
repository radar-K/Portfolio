import React from "react";

export interface PulsingRingsProps {
  position: {
    left: string;
    top: string;
  };
  color: string;
}

export function BluePulsingRings({ position, color }: PulsingRingsProps) {
  return (
    <div
      className="absolute transform -translate-x-1/2 -translate-y-1/2"
      style={{ left: position.left, top: position.top, zIndex: 5 }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="absolute rounded-full"
          style={{ backgroundColor: color, width: "60px", height: "60px", opacity: 0.3 }}
        />
        <div
          className="absolute rounded-full animate-blue-pulse"
          style={{ backgroundColor: color, width: "100px", height: "100px", opacity: 0.2 }}
        />
        <div
          className="absolute rounded-full animate-blue-pulse-outline"
          style={{
            border: `2px solid ${color}`,
            backgroundColor: "transparent",
            width: "140px",
            height: "140px",
            opacity: 0.4,
          }}
        />
      </div>
      <div
        className="relative z-10 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center shadow-md"
        style={{ backgroundColor: color }}
      >
        <div className="w-3 h-3 rounded-full bg-white" />
      </div>
    </div>
  );
}
