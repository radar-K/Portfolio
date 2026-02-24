"use client";

import { useState, useEffect, useRef } from "react";
import ProgressBar from "@/components/ui/progress-bar";
import Confetti from "react-confetti";

const skills = [
  "Javascript",
  "React",
  "next.js",
  "Backend Devops",
  "Projektmetodik Agilametoder",
  "React native",
  "Lia",
  "Typescript",
  "Projekt Arbete",
];

export default function ProgressBarTracker() {
  const [currentStep, setCurrentStep] = useState(4);
  const [isNavigating, setIsNavigating] = useState(false);
  const [clickedStep, setClickedStep] = useState<number>(4);
  const [showCelebration, setShowCelebration] = useState(false);
  const [confettiWidth, setConfettiWidth] = useState(0);
  const [confettiHeight, setConfettiHeight] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setConfettiWidth(window.innerWidth);
      setConfettiHeight(window.innerHeight);
      const handleResize = () => {
        setConfettiWidth(window.innerWidth);
        setConfettiHeight(window.innerHeight);
      };
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  useEffect(() => {
    if (clickedStep !== null) {
      const timer = setTimeout(() => setIsNavigating(false), 800);
      return () => clearTimeout(timer);
    }
  }, [clickedStep]);

  useEffect(() => {
    if (currentStep === skills.length - 1) {
      setShowCelebration(true);
      const timer = setTimeout(() => setShowCelebration(false), 6000);
      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  const handleStepClick = (index: number) => {
    if (isNavigating) return;
    setClickedStep(index);
    setIsNavigating(true);
    setTimeout(() => setCurrentStep(index), 500);
  };

  return (
    <div className="relative px-4 md:px-18" ref={containerRef}>
      {showCelebration && (
        <div className="fixed inset-0 z-10 pointer-events-none overflow-hidden">
          <Confetti
            width={confettiWidth}
            height={confettiHeight}
            recycle={false}
            numberOfPieces={500}
            gravity={0.2}
            confettiSource={{ x: 0, y: 0, w: confettiWidth, h: 0 }}
            initialVelocityY={3}
            tweenDuration={5000}
            wind={0.01}
            colors={[
              "#DCFCE7",
              "#BBF7D0",
              "#86EFAC",
              "#4ADE80",
              "#22C55E",
              "#FEF08A",
              "#ECFCCB",
              "#D9F99D",
              "#BEF264",
            ]}
          />
        </div>
      )}
      <ProgressBar
        steps={skills}
        currentStep={currentStep}
        onStepClick={handleStepClick}
        activeLoadingStep={clickedStep}
      />
    </div>
  );
}
