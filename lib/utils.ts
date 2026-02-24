import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculatePosition(x: number, y: number) {
  const originalWidth = 1080;
  const originalHeight = 1080;

  const percentX = x / originalWidth;
  const percentY = y / originalHeight;

  return {
    left: `${percentX * 100}%`,
    top: `${percentY * 100}%`,
  };
}
