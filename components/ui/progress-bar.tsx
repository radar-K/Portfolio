"use client";

import React, { useEffect, useState } from "react";

interface ProgressBarProps {
  steps: string[];
  currentStep: number;
  onStepClick?: (stepIndex: number) => void;
  activeLoadingStep?: number;
}

const mainColor = "#BBF7D0";
const pulseAnimationColor = "#FEF08A";

function getVisibleStepsForMobile(
  allSteps: string[],
  currentStep: number
): string[] {
  if (allSteps.length <= 4) return allSteps;
  let startIndex = Math.max(0, currentStep - 1);
  let endIndex = Math.min(allSteps.length - 1, startIndex + 3);
  if (endIndex >= allSteps.length - 1) {
    startIndex = Math.max(0, allSteps.length - 4);
    endIndex = allSteps.length - 1;
  }
  const visibleSteps = allSteps.slice(startIndex, endIndex + 1);
  if (startIndex > 0) visibleSteps.unshift(allSteps[0]);
  if (endIndex < allSteps.length - 1) visibleSteps.push(allSteps[allSteps.length - 1]);
  return visibleSteps;
}

export default function ProgressBar({
  steps,
  currentStep,
  onStepClick,
  activeLoadingStep,
}: ProgressBarProps) {
  const [animatedStep, setAnimatedStep] = useState(currentStep);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (currentStep < animatedStep) {
      setAnimatedStep(currentStep);
      return;
    }
    const timer = setTimeout(() => setAnimatedStep(currentStep), 100);
    return () => clearTimeout(timer);
  }, [currentStep, animatedStep]);

  const handleStepClick = (index: number) => {
    if (!onStepClick) return;
    onStepClick(index);
  };

  const visibleSteps = isMobile
    ? getVisibleStepsForMobile(steps, currentStep)
    : steps;

  return (
    <div>
      <div className={`relative ${isMobile ? "overflow-x-auto pb-4 -mx-2 px-4" : ""}`}>
        <div className="text-center mb-4 text-sm text-muted-foreground">
          {"Steg"} {currentStep + 1} {"av"} {steps.length}:{" "}
          <span className="font-medium">{steps[currentStep]}</span>
          <div className="text-xs text-muted-foreground/60 mt-0 pt-2">
            {"Just nu i min frontendresa"}
          </div>
        </div>

        <div
          className={`relative flex items-start ${
            isMobile ? "justify-start min-w-max" : "justify-between"
          }`}
          style={{ gap: isMobile ? "2.5rem" : undefined }}
        >
          <div
            className={`absolute top-2.5 h-0.5 bg-border ${
              isMobile ? "left-2.5 right-2.5" : "left-2.5 right-2.5"
            }`}
          >
            <div
              className="absolute top-0 left-0 h-full transition-all duration-700 ease-in-out"
              style={{
                width:
                  isMobile && visibleSteps.length !== steps.length
                    ? `${100 * (currentStep / (steps.length - 1))}%`
                    : `${(100 * animatedStep) / (steps.length - 1)}%`,
                backgroundColor: mainColor,
              }}
            />
          </div>

          {visibleSteps.map((step, displayIndex) => {
            const actualIndex = isMobile
              ? steps.findIndex((s) => s === step)
              : displayIndex;

            const isCompleted = actualIndex < animatedStep;
            const wasCompleted = actualIndex < currentStep;
            const isActive = actualIndex === animatedStep;
            const isLoadingStep = actualIndex === activeLoadingStep;
            const isClickable = onStepClick !== undefined;
            const shouldAnimate = wasCompleted && !isCompleted;

            return (
              <div
                key={step}
                className={`flex flex-col items-center relative z-10 ${
                  isMobile ? "min-w-[50px]" : "w-10"
                }`}
              >
                <div className="relative">
                  {isLoadingStep && (
                    <div
                      className="absolute inset-0 -m-1 w-7 h-7 rounded-full border-2 border-t-transparent animate-spin"
                      style={{
                        borderColor: pulseAnimationColor,
                        borderTopColor: "transparent",
                        animationDuration: "1.5s",
                      }}
                    />
                  )}
                  {isLoadingStep && (
                    <div
                      className="absolute inset-0 -m-2 w-9 h-9 rounded-full border animate-ping opacity-75"
                      style={{
                        animationDuration: "3s",
                        borderColor: pulseAnimationColor,
                      }}
                    />
                  )}
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center mb-3 ${
                      shouldAnimate
                        ? "animate-pulse bg-yellow-200"
                        : isCompleted
                        ? "bg-green-200 scale-110 text-white border border-transparent"
                        : isActive
                        ? "border-2 border-green-200 bg-card scale-110"
                        : "bg-card border border-border"
                    } ${isClickable ? "cursor-pointer" : "cursor-default"} transition-all duration-300 ease-in-out`}
                    onClick={() => isClickable && handleStepClick(actualIndex)}
                  >
                    {isCompleted && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="#059669"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </div>
                </div>
                <span
                  className={`text-xs text-center mt-3 ${
                    isCompleted || isActive
                      ? "font-medium text-green-600"
                      : "text-foreground/70"
                  } ${isLoadingStep ? "text-green-600" : ""} transition-all duration-300 ${
                    isMobile ? "w-16 sm:w-20" : ""
                  }`}
                >
                  {step}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
