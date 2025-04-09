import { WhatHowWhyCard } from "@/components/dash-component/WhatHowWhyCard";
import { ValuesCard } from "@/components/dash-component/Values";
import { ProfileCard } from "@/components/dash-component/Statusbar";

export default function Home() {
  return (
    <main className="min-h-screenp-4 m-7">
      <div className="grid grid-cols-2 ">
        <div className="animate-slide-up">
          <WhatHowWhyCard />
        </div>
        <div>
          <ValuesCard />
        </div>
        <ProfileCard />
      </div>
    </main>
  );
}
