"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { Card } from "@/components/ui/card";
import { WhatHowWhyCard } from "@/components/what-how-why-card";
import { ValuesCard } from "@/components/values-card";
import ProgressBarTracker from "@/components/progress-bar-tracker";
import { MapWithPulsingRings } from "@/components/map-with-pulsing-rings";
import { ConnectCard } from "@/components/connect-card";
import { Nanum_Myeongjo } from "next/font/google";

const CardTutorial = dynamic(() => import("@/components/card-tutorial"), {
  ssr: false,
});

const ProjectSection = dynamic(() => import("@/components/project-section"), {
  ssr: false,
});

const nanumMyeongjo = Nanum_Myeongjo({ weight: "700", subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <CardTutorial />

      <main className="font-sans min-h-screen p-4 m-7">
        <div className="flex items-center justify-center">
          <Image
            src="/port11.png"
            className="no-drag"
            alt="Portfolio header"
            width={300}
            height={300}
          />
        </div>
        <div>
          <ProgressBarTracker />
        </div>
        <div className="mt-30" />
        <div className="p-32" />

        {/* Top row: 2 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 items-stretch gap-8">
          <div className="pb-5">
            <WhatHowWhyCard />
          </div>
          <div className="grid grid-rows-[40%_60%] h-full pb-5">
            <ValuesCard />
            <Card />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {/* Map Container */}
          <div className="relative h-[350px] rounded-lg overflow-hidden shadow-sm">
            <MapWithPulsingRings />
          </div>

          {/* Connect Profile Card */}
          <div className="md:col-span-2">
            <ConnectCard />
          </div>
        </div>

        <p
          className={`${nanumMyeongjo.className} text-4xl font-extrabold flex items-center justify-center pt-44`}
        >
          P R O J E C T S
        </p>
        <ProjectSection />
      </main>
    </>
  );
}
