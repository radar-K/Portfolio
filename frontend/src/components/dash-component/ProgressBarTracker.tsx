"use client";
import { useState, useEffect, useRef } from "react";
import ProgressBar from "@/components/ui/progressBar";
import Confetti from "react-confetti";

const skills = [
  "Javascript",
  "React",
  "next.js",
  "Backend Devops",
  "Projektmetoder Agilametoder",
  "React native",
  "Lia",
  "Typescript",
  "Projekt Arbete",
];

// Main colors
const mainColor = "#BBF7D0"; // Green-200
const pulseAnimationColor = "#FEF08A"; // Yellow-200 for animations

const ProgressBarTracker = () => {
  // Set Backend & Devops (index 3) as the initial active step
  const [currentStep, setCurrentStep] = useState(4);
  const [isNavigating, setIsNavigating] = useState(false);

  // Set Backend & Devops as the initial clicked step for animation
  const [clickedStep, setClickedStep] = useState<number>(4);

  // State for celebration animation
  const [showCelebration, setShowCelebration] = useState(false);

  // Confetti settings
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

  // Effect to clear the loading state after a delay
  useEffect(() => {
    if (clickedStep !== null) {
      const timer = setTimeout(() => {
        setIsNavigating(false);
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [clickedStep]);

  // Effect to handle celebration when reaching the last step
  useEffect(() => {
    if (currentStep === skills.length - 1) {
      setShowCelebration(true);

      // Hide celebration after 6 seconds
      const timer = setTimeout(() => {
        setShowCelebration(false);
      }, 6000);

      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  const handleStepClick = (index: number) => {
    // Prevent rapid clicks while navigating
    if (isNavigating) return;

    // Always set the clicked step and navigating state
    setClickedStep(index);
    setIsNavigating(true);

    // Simulate a short delay before changing steps
    setTimeout(() => {
      setCurrentStep(index);
    }, 500);
  };

  return (
    <div className="relative px-18 " ref={containerRef}>
      {/* Celebration animation when reaching the last step - confetti */}
      {showCelebration && (
        <div className="fixed inset-0 z-10 pointer-events-none overflow-hidden">
          <Confetti
            width={confettiWidth}
            height={confettiHeight}
            recycle={false}
            numberOfPieces={500}
            gravity={0.2}
            confettiSource={{
              x: 0,
              y: 0,
              w: confettiWidth,
              h: 0,
            }}
            initialVelocityY={3}
            tweenDuration={5000}
            wind={0.01}
            colors={[
              "#DCFCE7", // Green-100
              "#BBF7D0", // Green-200
              "#86EFAC", // Green-300
              "#4ADE80", // Green-400
              "#22C55E", // Green-500
              "#FEF08A", // Yellow-200
              "#ECFCCB", // Lime-100
              "#D9F99D", // Lime-200
              "#BEF264", // Lime-300
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
};

export default ProgressBarTracker;
