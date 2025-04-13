"use client";

import { useContext } from "react";
import { PortfolioContext } from "@/contexts/PortfolioContext";
import ProjectCard from "@/components/ui/ProjectCard";
import Link from "next/link";

import { WhatHowWhyCard } from "@/components/dash-component/WhatHowWhyCard";
import { ValuesCard } from "@/components/dash-component/Values";
import { ProfileCard } from "@/components/dash-component/Statusbar";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import ProgressBarTracker from "@/components/dash-component/ProgressBarTracker";
import BurgerMenu from "@/components/dash-component/BurgerMenu";

import { Open_Sans } from "next/font/google";
import { Nanum_Myeongjo } from "next/font/google";

const openSans = Open_Sans({ subsets: ["latin"] });
const nanumMyeongjo = Nanum_Myeongjo({ weight: "700", subsets: ["latin"] });

//
const PLACEHOLDER_IMAGE = "/skill.png";

export default function Home() {
  const { projects, techSkills } = useContext(PortfolioContext);
  return (
    <main className={`${openSans.className} min-h-screen p-4 m-7`}>
      <div className="flex items-end justify-end">
        <BurgerMenu />
      </div>
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
      {/* <div className="pt-32" />
      <div className="grid grid-cols-2">
        <div className="animate-slide-up">
          <WhatHowWhyCard />
        </div>
        <div>
          <ValuesCard />
        </div>
      </div> */}
      <p
        className={`${nanumMyeongjo.className} text-4xl font-extrabold flex items-center justify-center pt-44`}
      >
        P R O J E C T S
      </p>

      {/* Lägg till projektvisning här */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        {projects?.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {/* Visa tech skills om de finns */}
      {techSkills && techSkills.length > 0 && (
        <>
          <p
            className={`${nanumMyeongjo.className} text-4xl font-extrabold flex items-center justify-center pt-44 mb-12`}
          >
            T E C H N O L O G I E S
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            {techSkills.map((skill) => (
              <div key={`tech-${skill.name}`} className="text-center">
                <div className="w-20 h-20 mx-auto relative">
                  <Image
                    src={skill.url || PLACEHOLDER_IMAGE}
                    alt={skill.name}
                    fill
                    style={{ objectFit: "contain" }}
                  />
                </div>
                <p className="mt-2">{skill.name}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </main>
  );
}
