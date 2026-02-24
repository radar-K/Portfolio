"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Trait {
  name: string;
  percentage: number;
  color?: string;
}

interface PsychologicalProfileCardProps {
  name?: string;
  traits?: Trait[];
  className?: string;
}

export function ProfileCard({
  name = "Radars",
  traits = defaultTraits,
  className,
}: PsychologicalProfileCardProps) {
  return (
    <Card className={`bg-amber-50 overflow-hidden ${className}`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">
          Psychological profile and traits
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {traits.map((trait, index) => (
            <div key={trait.name} className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="font-medium text-sm">{trait.name}</span>
                <span className="text-sm font-semibold">
                  {trait.percentage}%
                </span>
              </div>
              <div className="h-6 w-full bg-white border border-gray-200 rounded-sm overflow-hidden">
                <div
                  className="h-full bg-salmon-300"
                  style={{
                    width: `${trait.percentage}%`,
                    backgroundColor: trait.color || "#E9967A",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

const defaultTraits: Trait[] = [
  { name: "Variation", percentage: 95, color: "#E9967A" },
  { name: "Bidra", percentage: 90, color: "#E9967A" },
  { name: "Samhörighet", percentage: 80, color: "#E9967A" },
  { name: "Utveckling", percentage: 50, color: "#E9967A" },
  { name: "Signifikans", percentage: 18, color: "#E9967A" },
  { name: "Trygghet", percentage: 8, color: "#E9967A" },
];
