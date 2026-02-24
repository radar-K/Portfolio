import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculatePosition(x: number, y: number) {
  // Original image dimensions
  const originalWidth = 1080;
  const originalHeight = 1080;

  // Calculate percentage position
  const percentX = x / originalWidth;
  const percentY = y / originalHeight;

  // Return scaled position
  return {
    left: `${percentX * 100}%`,
    top: `${percentY * 100}%`,
  };
}
