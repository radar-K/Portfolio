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
      style={{ left: position.left, top: position.top }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="absolute rounded-full"
          style={{ backgroundColor: color, width: "100px", height: "100px", opacity: 0.25 }}
        />
        <div
          className="absolute rounded-full"
          style={{ backgroundColor: color, width: "180px", height: "180px", opacity: 0.2 }}
        />
        <div
          className="absolute rounded-full animate-pulse-fill-slow"
          style={{ backgroundColor: color, width: "260px", height: "260px", opacity: 0.15 }}
        />
        <div
          className="absolute rounded-full animate-pulse-fill"
          style={{ backgroundColor: color, width: "340px", height: "340px", opacity: 0.1 }}
        />
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
      <div
        className="relative z-10 w-8 h-8 rounded-full border-2 border-white flex items-center justify-center shadow-md"
        style={{ backgroundColor: color }}
      >
        <div className="w-4 h-4 rounded-full bg-white" />
      </div>
    </div>
  );
}
