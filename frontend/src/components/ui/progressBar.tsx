import React, { useEffect, useState } from "react";

interface ProgressBarProps {
  steps: string[];
  currentStep: number;
  onStepClick?: (stepIndex: number) => void;
  activeLoadingStep?: number;
}

const ProgressBar = ({
  steps,
  currentStep,
  onStepClick,
  activeLoadingStep,
}: ProgressBarProps) => {
  const [animatedStep, setAnimatedStep] = useState(currentStep);
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile viewport
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Animate the step change
  useEffect(() => {
    // Update, if we're moving backward
    if (currentStep < animatedStep) {
      setAnimatedStep(currentStep);
      return;
    }

    // If moving forward, animate with a small delay
    const timer = setTimeout(() => {
      setAnimatedStep(currentStep);
    }, 100);

    return () => clearTimeout(timer);
  }, [currentStep, animatedStep]);

  // Handle click with loading animation
  const handleStepClick = (index: number) => {
    if (!onStepClick) return;
    onStepClick(index);
  };

  // For mobile view, create a condensed selection of steps to show
  const visibleSteps = isMobile
    ? getVisibleStepsForMobile(steps, currentStep)
    : steps;

  // Main color - using Green-200
  const mainColor = "#BBF7D0";

  // Yellow-200 for pulse animation
  const pulseAnimationColor = "#FEF08A";

  return (
    <div>
      {/* Progress bar container with horizontal scroll for mobile */}
      <div
        className={`relative ${
          isMobile ? "overflow-x-auto pb-4 -mx-2 px-4" : ""
        }`}
      >
        {/* Steg-indikator */}
        <div className="text-center mb-4 text-sm text-gray-500">
          Steg {currentStep + 1} av {steps.length}:{" "}
          <span className="font-medium">{steps[currentStep]}</span>
          <div className="text-xs text-gray-400 mt-0 pt-2 ">
            Just nu i min frontendresa
          </div>
        </div>

        {/* Progress steps with both dots and labels */}
        <div
          className={`
          relative flex items-start
          ${isMobile ? "justify-start min-w-max space-x-10" : "justify-between"}
        `}
        >
          {/* Progress Line */}
          <div
            className={`
            absolute top-2.5 h-0.5 bg-gray-200
            ${isMobile ? "left-2.5 right-2.5" : "left-2.5 right-2.5"}
          `}
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

          {/* Steps with dots and labels */}
          {visibleSteps.map((step, displayIndex) => {
            // Get the actual index in the full steps array
            const actualIndex = isMobile
              ? steps.findIndex((s) => s === step) // For mobile, find real index
              : displayIndex; // For desktop, use current index

            // Determine if the step is completed, active, or upcoming
            const isCompleted = actualIndex < animatedStep;
            const wasCompleted = actualIndex < currentStep;
            const isActive = actualIndex === animatedStep;
            const isLoadingStep = actualIndex === activeLoadingStep;
            const isClickable = onStepClick !== undefined;

            // Determine if this dot should have an animation
            const shouldAnimate = wasCompleted && !isCompleted;

            return (
              <div
                key={step}
                className={`
                  flex flex-col items-center relative z-10
                  ${isMobile ? "min-w-[50px]" : "w-10"}
                `}
              >
                {/* Dot positioned on the line */}
                <div className="relative">
                  {/* Loading Circle Animation - Yellow-200 */}
                  {isLoadingStep && (
                    <div
                      className="absolute inset-0 -m-1 w-7 h-7 rounded-full border-2 border-t-transparent animate-spin-slow"
                      style={{
                        borderColor: pulseAnimationColor,
                        borderTopColor: "transparent",
                      }}
                    />
                  )}

                  {/* Secondary pulsing ring - Yellow-200 */}
                  {isLoadingStep && (
                    <div
                      className="absolute inset-0 -m-2 w-9 h-9 rounded-full border animate-ping opacity-75"
                      style={{
                        animationDuration: "3s",
                        borderColor: pulseAnimationColor,
                      }}
                    />
                  )}

                  {/* Actual Dot */}
                  <div
                    className={`
                      w-5 h-5 rounded-full flex items-center justify-center mb-3
                      ${
                        shouldAnimate
                          ? "animate-pulse bg-yellow-200"
                          : isCompleted
                          ? "bg-green-200 scale-110 text-white border border-transparent"
                          : isActive
                          ? "border-2 border-green-200 bg-white scale-110"
                          : "bg-white border border-gray-300"
                      }
                      ${isClickable ? "cursor-pointer" : "cursor-default"}
                      transition-all duration-300 ease-in-out
                    `}
                    onClick={() => isClickable && handleStepClick(actualIndex)}
                  >
                    {isCompleted && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3 animate-fadeIn"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="#059669" // Green-600 for the checkmark
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

                {/* Label - using Green-600 for text */}
                <span
                  className={`
                  text-xs text-center mt-3
                  ${
                    isCompleted || isActive
                      ? "font-medium text-green-600"
                      : "text-gray-700"
                  }
                  ${isLoadingStep ? "text-green-600" : ""}
                  transition-all duration-300
                  ${isMobile ? "w-16 sm:w-20" : ""}
                `}
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
};

// Helper function to get a subset of steps for mobile view
function getVisibleStepsForMobile(
  allSteps: string[],
  currentStep: number
): string[] {
  // Always show at least 4 steps on mobile centered around current step
  if (allSteps.length <= 4) return allSteps;

  // Determine which steps to show
  let startIndex = Math.max(0, currentStep - 1);
  let endIndex = Math.min(allSteps.length - 1, startIndex + 3);

  // Adjust if we're near the end
  if (endIndex >= allSteps.length - 1) {
    startIndex = Math.max(0, allSteps.length - 4);
    endIndex = allSteps.length - 1;
  }

  // Always include first and last step for context
  const visibleSteps = allSteps.slice(startIndex, endIndex + 1);
  if (startIndex > 0) {
    visibleSteps.unshift(allSteps[0]);
  }
  if (endIndex < allSteps.length - 1) {
    visibleSteps.push(allSteps[allSteps.length - 1]);
  }

  return visibleSteps;
}

export default ProgressBar;
