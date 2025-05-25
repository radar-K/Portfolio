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
      <div className="pt-32" />

      {/* Översta raden: 2 kolumner */}
      <div className="grid grid-cols-2 gap-4 items-stretch">
        <div className="animate-slide-up">
          <WhatHowWhyCard />
        </div>
        {/* Höger kolumn med 40/80 fördelning på höjden */}
        <div className="grid grid-rows-[40%_60%] h-full">
          <ValuesCard />
          <Card />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
        {/* Vänster kolumn - tar 1 av 3 kolumner på md+ */}
        <div className="flex justify-center md:ml-6">
          <div className="relative w-full max-h-[350px] rounded-lg overflow-hidden shadow-sm">
            <MapWithPulsingRings />
          </div>
        </div>

        {/* Höger kolumn - tar 2 av 3 kolumner på md+ */}
        <div className="p-8 md:col-span-2 flex flex-col h-full">
          <ConnectCard
            name="Connect"
            title="Fullstack junior developer"
            company="Chas academy"
            companyUrl="https://chasacademy.se/program/frontendutvecklare"
            audioSrc="/audio/anna-intro.mp3"
            showFlag={false}
          />
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
