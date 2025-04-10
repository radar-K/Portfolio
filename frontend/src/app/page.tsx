import { WhatHowWhyCard } from "@/components/dash-component/WhatHowWhyCard";
import { ValuesCard } from "@/components/dash-component/Values";
import { ProfileCard } from "@/components/dash-component/Statusbar";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";
import Image from "next/image";

import ProgressBarTracker from "@/components/dash-component/ProgressBarTracker";

export default function Home() {
  return (
    <main className="min-h-screenp-4 m-7">
      <div className="flex items-center justify-center">
        <Image src="/port11.png" alt="header text" width={300} height={300} />
      </div>
      <div>
        <ProgressBarTracker />
      </div>
      <div className=" pt-30" />
      <div className="grid grid-cols-2 ">
        <div className="animate-slide-up">
          <WhatHowWhyCard />
        </div>
        <div>
          <ValuesCard />
        </div>
        <ProfileCard />
        <Slider />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card />
        <Card />
        <Card />
      </div>
    </main>
  );
}
