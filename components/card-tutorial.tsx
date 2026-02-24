"use client";

import {
  useScroll,
  useMotionValueEvent,
  useTransform,
  motion,
} from "framer-motion";
import { useRef, useMemo, useState, useEffect } from "react";

type CardProps = {
  heading: string;
  imgBackground: "red" | "green" | "blue";
};

const Cards = ({ heading, imgBackground }: CardProps) => {
  const colors = {
    red: "bg-red-400",
    green: "bg-green-400",
    blue: "bg-blue-400",
  };

  return (
    <div className="flex bg-card max-w-[90%] h-full mx-auto px-10 gap-20 rounded-3xl shadow-xl">
      <div className="flex-1 grid content-center" style={{ gap: "2.5rem" }}>
        <h2 className="text-4xl lg:text-8xl text-foreground">{heading}</h2>
        <p className="text-foreground/80">
          {"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem vero reiciendis deleniti eos at, deserunt aperiam ut similique, quae quas dolor consequuntur eligendi maiores dolore temporibus ducimus mollitia quos nemo?"}
        </p>
        <button className="bg-card text-foreground max-w-xs px-6 py-2 rounded-3xl border border-border shadow hover:bg-muted transition w-auto">
          Find out more
        </button>
      </div>
      <div className="flex-1 h-full py-10">
        <div
          className={`${colors[imgBackground]} w-full h-full rounded-tr-[200px]`}
        />
      </div>
    </div>
  );
};

export default function CardTutorial() {
  const targetRef = useRef(null);
  const { scrollY } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const titleHeight = 500;
  const cardPadding = 80;

  const cardData: CardProps[] = [
    { heading: "Web design & development", imgBackground: "red" },
    { heading: "Branding", imgBackground: "green" },
    { heading: "Digital Marketing", imgBackground: "blue" },
  ];

  const [windowHeight, setWindowHeight] = useState(800);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowHeight(window.innerHeight);
      const handleResize = () => setWindowHeight(window.innerHeight);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const timeline = useMemo(() => {
    const cardTimeline = cardData.map((_, i) => {
      const start = titleHeight + i * windowHeight + cardPadding;
      const end = titleHeight + (i + 1) * windowHeight;
      return [start, end];
    });
    return [[0, titleHeight], ...cardTimeline];
  }, [cardData, windowHeight, titleHeight, cardPadding]);

  const animation = timeline.map((range) => ({
    scale: useTransform(scrollY, range, [1, 0.8]),
    opacity: useTransform(scrollY, range, [1, 0]),
  }));

  return (
    <div ref={targetRef} className="relative">
      <motion.div
        style={{
          scale: animation[0]?.scale ?? 1,
          opacity: animation[0]?.opacity ?? 1,
          height: `${titleHeight}px`,
        }}
        className="sticky top-0 flex items-end text-8xl lg:text-[160px] uppercase lg:leading-[140px] px-36 overflow-clip"
      >
        <h1 className="w-full h-max text-foreground">
          our <br />
          <span className="ml-20 lg:ml-52">service</span>
        </h1>
      </motion.div>

      {cardData.map((data, i) => (
        <motion.div
          key={data.heading}
          style={{
            scale: animation[i + 1]?.scale ?? 1,
            opacity: animation[i + 1]?.opacity ?? 1,
          }}
          className="h-dvh py-20 sticky top-0"
        >
          <Cards heading={data.heading} imgBackground={data.imgBackground} />
        </motion.div>
      ))}
    </div>
  );
}
