"use client";

import Image from "next/image";
import { Card } from "../components/ui/card";
import { useGLTF } from "@react-three/drei";
import ParticalText from "@/components/dash-component/ProjectParticalText";
import ProjectSection from "@/components/dash-component/ProjectSection";

import { WhatHowWhyCard } from "@/components/dash-component/WhatHowWhyCard";
import { ValuesCard } from "@/components/dash-component/Values";
import ProgressBarTracker from "@/components/dash-component/ProgressBarTracker";
import AnimatedLine from "@/components/dash-component/Roadmap";
import { MapWithPulsingRings } from "@/components/dash-component/adress Component/mainMap-pulsing-rings";
import { ConnectCard } from "@/components/dash-component/ProfileCard";

import { Open_Sans } from "next/font/google";
import { Nanum_Myeongjo } from "next/font/google";

const openSans = Open_Sans({ subsets: ["latin"] });
const nanumMyeongjo = Nanum_Myeongjo({ weight: "700", subsets: ["latin"] });

export function Model() {
  const { scene } = useGLTF("patrick_star.glb");
  return <primitive object={scene} />;
}

export default function Home() {
  return (
    <main className={`${openSans.className} min-h-screen p-4 m-7`}>
      <div className="flex items-center justify-center">
        <Image
          src="/port11.png"
          className="no-drag"
          alt="header text"
          width={300}
          height={300}
        />
      </div>
      <div>
        <ProgressBarTracker />
      </div>
      <div className="mt-30"></div>
      <div className="p-32 " />

      {/* Översta raden: 2 kolumner */}
      <div className="grid grid-cols-2 items-stretch gap-8">
        <div className="animate-slide-up pb-5">
          <WhatHowWhyCard />
        </div>
        {/* Höger kolumn med 40/80 fördelning på höjden */}
        <div className="grid grid-rows-[40%_60%] h-full pb-5">
          <ValuesCard />
          <Card />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full ">
        {/* Map Container - 1/3 width */}
        <div className="relative  h-[350px]  rounded-lg overflow-hidden shadow-sm">
          <MapWithPulsingRings />
        </div>

        {/* Connect Profile Card - 2/3 width */}
        <div className="md:col-span-2 ">
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
  );
}
