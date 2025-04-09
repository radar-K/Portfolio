"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function ValuesCard() {
  const values = [
    { id: 1, name: "Ärlighet" },
    { id: 2, name: "Nyfikenhet" },
    { id: 3, name: "Stresstålig" },
    { id: 4, name: "Kommunikativ" },
    { id: 5, name: "Resultatinriktad" },
    { id: 6, name: "Optimistisk" },
    { id: 7, name: "Anpassningsbar" },
  ];

  return (
    <Card className="bg-blue-100 overflow-hidden shadow">
      <CardHeader>
        <CardTitle className="text-sm font-bold tracking-wide">
          STYRKOR
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {values.map((value) => (
            <Badge
              key={value.id}
              variant="outline"
              className="bg-white hover:bg-grey text-black border-none rounded-full px-4 py-1"
            >
              {value.name}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
