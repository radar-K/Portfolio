// Define props for the pulsing rings component
export interface PulsingRingsProps {
  position: {
    left: string;
    top: string;
  };
  color: string;
}

export function CentralPulsingRings({ position, color }: PulsingRingsProps) {
  return (
    <div
      className="absolute transform -translate-x-1/2 -translate-y-1/2"
      style={{
        left: position.left,
        top: position.top,
      }}
    >
      {/* Rings - First two locked, third, fourth and fifth pulsing */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* First ring - static/locked */}
        <div
          className="absolute rounded-full"
          style={{
            backgroundColor: color,
            width: "100px",
            height: "100px",
            opacity: 0.25,
          }}
        />
        {/* Second ring - static/locked */}
        <div
          className="absolute rounded-full"
          style={{
            backgroundColor: color,
            width: "180px",
            height: "180px",
            opacity: 0.2,
          }}
        />
        {/* Third ring - pulsing with fill */}
        <div
          className="absolute rounded-full animate-pulse-fill-slow"
          style={{
            backgroundColor: color,
            width: "260px",
            height: "260px",
            opacity: 0.15,
          }}
        />
        {/* Fourth ring - pulsing with fill */}
        <div
          className="absolute rounded-full animate-pulse-fill"
          style={{
            backgroundColor: color,
            width: "340px",
            height: "340px",
            opacity: 0.1,
          }}
        />
        {/* Fifth ring - pulsing, outline only */}
        <div
          className="absolute rounded-full animate-pulse-outline"
          style={{
            border: `3px solid ${color}`,
            backgroundColor: "transparent",
            width: "420px",
            height: "420px",
            opacity: 0.3,
          }}
        />
      </div>

      {/* Center Point */}
      <div
        className="relative z-10 w-8 h-8 rounded-full border-2 border-white flex items-center justify-center shadow-md"
        style={{ backgroundColor: color }}
      >
        <div className="w-4 h-4 rounded-full bg-white" />
      </div>
    </div>
  );
}
