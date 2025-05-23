"use client";

import Image from "next/image";
import { Card } from "../components/ui/card";
import { useGLTF } from "@react-three/drei";
import Scene from "../components/Scene";

import { WhatHowWhyCard } from "@/components/dash-component/WhatHowWhyCard";
import { ValuesCard } from "@/components/dash-component/Values";
import ProgressBarTracker from "@/components/dash-component/ProgressBarTracker";
import AnimatedLine from "@/components/dash-component/Roadmap";
import { MapWithPulsingRings } from "@/components/dash-component/adress Component/mainMap-pulsing-rings";

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
      <div className="grid grid-cols-2">
        <div className="animate-slide-up">
          <WhatHowWhyCard />
        </div>
        <div>
          <ValuesCard />
        </div>
      </div>

      {/* Underrad: 3 kolumner */}
      <div className="grid grid-cols-3 ">
        <div className="flex gap-6 w-full max-w-7xl items-stretch">
          <div
            className="relative w-full max-h-[350px]
         rounded-lg overflow-hidden shadow-sm ml-6 "
          >
            <MapWithPulsingRings />
          </div>
        </div>

        <Card className="w-full max-w-lg h-[350px]">
          <Scene />
        </Card>
        <Card className="w-full max-w-lg h-[350px]" />
      </div>

      {/* <p
        className={`${nanumMyeongjo.className} text-4xl font-extrabold flex items-center justify-center pt-44`}
      >
        P R O J E C T S T E C H N O L O G I E S
      </p>
    */}
    </main>
  );
}
