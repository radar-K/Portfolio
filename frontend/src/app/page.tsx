import { WhatHowWhyCard } from "@/components/dash-component/WhatHowWhyCard";
import { ValuesCard } from "@/components/dash-component/Values";
import { ProfileCard } from "@/components/dash-component/Statusbar";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import ProgressBarTracker from "@/components/dash-component/ProgressBarTracker";
import BurgerMenu from "@/components/dash-component/BurgerMenu";

import { Open_Sans } from "next/font/google";
import { EB_Garamond } from "next/font/google";
import { Nanum_Myeongjo } from "next/font/google";

const openSans = Open_Sans({ subsets: ["latin"] });
const nanumMyeongjo = Nanum_Myeongjo({ weight: "700", subsets: ["latin"] });

export default function Home() {
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
      <div className="pt-32" />
      <div className="grid grid-cols-2">
        <div className="animate-slide-up">
          <WhatHowWhyCard />
        </div>
        <div>
          <ValuesCard />
        </div>
      </div>
      <p
        className={`${nanumMyeongjo.className} text-4xl font-extrabold flex items-center justify-center pt-44`}
      >
        P R O J E C T S
      </p>
      <div className="grid grid-cols-3 gap-4">
        <Card />
        <Card />
        <Card />
      </div>
    </main>
  );
}
