"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type ValuesCardProps = {
  className?: string;
};

export function ValuesCard({ className }: ValuesCardProps) {
  const values = [
    { id: 1, name: "\u00c4rlighet" },
    { id: 2, name: "Nyfikenhet" },
    { id: 3, name: "Stresst\u00e5lig" },
    { id: 4, name: "Kommunikativ" },
    { id: 5, name: "Resultatinriktad" },
    { id: 6, name: "Optimistisk" },
    { id: 7, name: "Anpassningsbar" },
  ];

  return (
    <div>
      <Card className={`bg-blue-100 overflow-hidden shadow ${className}`}>
        <CardHeader>
          <CardTitle className="text-sm font-bold tracking-wide text-foreground">
            STYRKOR
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {values.map((value) => (
              <Badge
                key={value.id}
                variant="outline"
                className="bg-card hover:bg-muted text-foreground border-none rounded-full px-4 py-1"
              >
                {value.name}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
