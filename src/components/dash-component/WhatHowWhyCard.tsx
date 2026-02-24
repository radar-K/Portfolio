"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Point {
  id: number;
  type: "what" | "how" | "why";
  position: string;
}

export function WhatHowWhyCard() {
  const [activePoint, setActivePoint] = useState<number | null>(null);

  const points: Point[] = [
    {
      id: 1,
      type: "what",
      position: "bottom-1/3 right-1",
    },
    {
      id: 2,
      type: "how",
      position: "top-1/3 left-44",
    },
    {
      id: 3,
      type: "why",
      position: "bottom-1/3 left-22",
    },
  ];

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle className="text-sm font-bold tracking-wide">
          WHAT, HOW, WHY
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 flex flex-col space-y-10">
            {/* First point - What */}
            <div
              className="flex flex-col space-y-1"
              onMouseEnter={() => setActivePoint(1)}
              onMouseLeave={() => setActivePoint(null)}
            >
              <div className="flex items-center">
                <hr className="flex-grow border-t border-black mr-2" />
                <div
                  className={`slider-dot cursor-pointer ${
                    activePoint === 1 ? "transform scale-125" : ""
                  }`}
                />
              </div>
              <p
                className={`text-xs font-medium transition-all duration-300 ${
                  activePoint === 1 ? "font-bold text-sm" : ""
                }`}
              >
                Jag strävar efter att bli en kreativ och självständig utvecklare
                som kan förverkliga egna idéer från grunden. Jag drivs av en
                stark vilja att kunna skapa och vara delaktig i den kreativa
                processen
              </p>
            </div>

            {/* Second point - How */}
            <div
              className="flex flex-col space-y-1"
              onMouseEnter={() => setActivePoint(2)}
              onMouseLeave={() => setActivePoint(null)}
            >
              <div className="flex items-center">
                <hr className="flex-grow border-t border-black mr-2" />
                <div
                  className={`slider-dot cursor-pointer ${
                    activePoint === 2 ? "transform scale-125" : ""
                  }`}
                />
              </div>
              <p
                className={`text-xs font-medium transition-all duration-300 ${
                  activePoint === 2 ? "font-bold text-sm" : ""
                }`}
              >
                Jag lär mig genom att testa, misslyckas och prova igen. Jag
                strävar efter att förstå grunderna, men vågar också
                experimentera. Jag söker inspiration från andra, bygger egna små
                projekt och ställer frågor när jag kör fast. Jag ser varje rad
                kod som ett steg närmare att kunna uttrycka mig fritt.
              </p>
            </div>

            {/* Third point - Why */}
            <div
              className="flex flex-col space-y-1"
              onMouseEnter={() => setActivePoint(3)}
              onMouseLeave={() => setActivePoint(null)}
            >
              <div className="flex items-center">
                <hr className="flex-grow border-t border-black mr-2" />
                <div
                  className={`slider-dot cursor-pointer ${
                    activePoint === 3 ? "transform scale-125" : ""
                  }`}
                />
              </div>
              <p
                className={`text-xs font-medium transition-all duration-300 ${
                  activePoint === 3 ? "font-bold text-sm" : ""
                }`}
              >
                Mitt mål är att bli en innovativ och pålitlig utvecklare som
                kombinerar teknisk kompetens med kreativ problemlösning. På sikt
                vill jag kunna ta ansvar för egna projekt, bidra i samarbeten
                och hålla mig uppdaterad i en snabbt föränderlig bransch.
              </p>
            </div>
          </div>

          {/* Gray Circular diagram */}
          <div className="w-full md:w-1/2 pt-8 md:pt-0 flex justify-center items-center">
            <div className="relative w-60 h-60">
              <div className="absolute inset-0 rounded-full bg-slate-200 opacity-20" />
              <div className="absolute inset-4 rounded-full bg-slate-200 opacity-30" />
              <div className="absolute inset-12 rounded-full bg-slate-200 opacity-40" />

              {/* Center labels */}
              <div
                className={`absolute inset-20 rounded-full bg-slate-300 opacity-50 flex items-center justify-center cursor-pointer transition-all duration-300 ${
                  activePoint === 3
                    ? "bg-slate-400 opacity-70 transform scale-110"
                    : ""
                }`}
                onMouseEnter={() => setActivePoint(3)}
                onMouseLeave={() => setActivePoint(null)}
              >
                <span className="text-xs font-medium">Why</span>
              </div>

              <div
                className={`absolute top-1/4 right-14 text-xs font-medium cursor-pointer transition-all duration-300 ${
                  activePoint === 2 ? "font-bold transform scale-110" : ""
                }`}
                onMouseEnter={() => setActivePoint(2)}
                onMouseLeave={() => setActivePoint(null)}
              >
                How
              </div>

              <div
                className={`absolute bottom-25 right-1 text-xs font-medium cursor-pointer transition-all duration-300 ${
                  activePoint === 1 ? "font-bold transform scale-110" : ""
                }`}
                onMouseEnter={() => setActivePoint(1)}
                onMouseLeave={() => setActivePoint(null)}
              >
                What
              </div>

              {/* Dots on the circle */}
              {points.map((point) => (
                <div
                  key={point.id}
                  className={`absolute ${
                    point.position
                  } slider-dot cursor-pointer ${
                    activePoint === point.id ? "transform scale-125" : ""
                  }`}
                  onMouseEnter={() => setActivePoint(point.id)}
                  onMouseLeave={() => setActivePoint(null)}
                />
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
