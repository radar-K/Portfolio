"use client";

import Image from "next/image";
import { calculatePosition } from "@/lib/utils";
import { CentralPulsingRings } from "@/components/grey-pulsing-rings";
import { BluePulsingRings } from "@/components/blue-pulsing-rings";

export interface Coordinate {
  x: number;
  y: number;
}

export interface MapProps {
  mapSrc?: string;
  centralPoint?: Coordinate;
  hemPoint?: Coordinate;
}

const DEFAULT_CENTRAL_POINT: Coordinate = { x: 590, y: 670 };
const DEFAULT_HEM_POINT: Coordinate = { x: 700, y: 275 };

const COLORS = {
  gray: "#666666",
  blue: "#1E90FF",
};

export function MapWithPulsingRings({
  mapSrc = "/BlackWhitemapAdress.jpg",
  centralPoint = DEFAULT_CENTRAL_POINT,
  hemPoint = DEFAULT_HEM_POINT,
}: MapProps) {
  const centralPosition = calculatePosition(centralPoint.x, centralPoint.y);
  const hemPosition = calculatePosition(hemPoint.x, hemPoint.y);

  return (
    <div className="relative w-full h-full">
      <Image
        src={mapSrc}
        alt="Map"
        width={1080}
        height={1080}
        className="w-full h-full object-cover"
        priority
      />
      <CentralPulsingRings position={centralPosition} color={COLORS.gray} />
      <BluePulsingRings position={hemPosition} color={COLORS.blue} />
    </div>
  );
}
