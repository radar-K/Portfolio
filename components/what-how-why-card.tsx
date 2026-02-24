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
    { id: 1, type: "what", position: "bottom-1/3 right-1" },
    { id: 2, type: "how", position: "top-1/3 left-44" },
    { id: 3, type: "why", position: "bottom-1/3 left-22" },
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
          <div className="w-full md:w-1/2 flex flex-col" style={{ gap: "2.5rem" }}>
            {/* What */}
            <div
              className="flex flex-col"
              style={{ gap: "0.25rem" }}
              onMouseEnter={() => setActivePoint(1)}
              onMouseLeave={() => setActivePoint(null)}
            >
              <div className="flex items-center">
                <hr className="flex-grow border-t border-foreground mr-2" />
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
                {"Jag str\u00e4var efter att bli en kreativ och sj\u00e4lvst\u00e4ndig utvecklare som kan f\u00f6rverkliga egna id\u00e9er fr\u00e5n grunden. Jag drivs av en stark vilja att kunna skapa och vara delaktig i den kreativa processen"}
              </p>
            </div>

            {/* How */}
            <div
              className="flex flex-col"
              style={{ gap: "0.25rem" }}
              onMouseEnter={() => setActivePoint(2)}
              onMouseLeave={() => setActivePoint(null)}
            >
              <div className="flex items-center">
                <hr className="flex-grow border-t border-foreground mr-2" />
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
                {"Jag l\u00e4r mig genom att testa, misslyckas och prova igen. Jag str\u00e4var efter att f\u00f6rst\u00e5 grunderna, men v\u00e5gar ocks\u00e5 experimentera. Jag s\u00f6ker inspiration fr\u00e5n andra, bygger egna sm\u00e5 projekt och st\u00e4ller fr\u00e5gor n\u00e4r jag k\u00f6r fast. Jag ser varje rad kod som ett steg n\u00e4rmare att kunna uttrycka mig fritt."}
              </p>
            </div>

            {/* Why */}
            <div
              className="flex flex-col"
              style={{ gap: "0.25rem" }}
              onMouseEnter={() => setActivePoint(3)}
              onMouseLeave={() => setActivePoint(null)}
            >
              <div className="flex items-center">
                <hr className="flex-grow border-t border-foreground mr-2" />
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
                {"Mitt m\u00e5l \u00e4r att bli en innovativ och p\u00e5litlig utvecklare som kombinerar teknisk kompetens med kreativ probleml\u00f6sning. P\u00e5 sikt vill jag kunna ta ansvar f\u00f6r egna projekt, bidra i samarbeten och h\u00e5lla mig uppdaterad i en snabbt f\u00f6r\u00e4nderlig bransch."}
              </p>
            </div>
          </div>

          {/* Circular diagram */}
          <div className="w-full md:w-1/2 pt-8 md:pt-0 flex justify-center items-center">
            <div className="relative w-60 h-60">
              <div className="absolute inset-0 rounded-full bg-muted opacity-20" />
              <div className="absolute inset-4 rounded-full bg-muted opacity-30" />
              <div className="absolute inset-12 rounded-full bg-muted opacity-40" />

              <div
                className={`absolute inset-20 rounded-full bg-muted-foreground/20 opacity-50 flex items-center justify-center cursor-pointer transition-all duration-300 ${
                  activePoint === 3
                    ? "bg-muted-foreground/40 opacity-70 transform scale-110"
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

              {points.map((point) => (
                <div
                  key={point.id}
                  className={`absolute ${point.position} slider-dot cursor-pointer ${
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
