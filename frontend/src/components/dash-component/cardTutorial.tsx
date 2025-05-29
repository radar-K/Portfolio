import {
  useScroll,
  useMotionValueEvent,
  useTransform,
  motion,
} from "framer-motion";
import { useRef } from "react";

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
    <div className="flex bg-white max-w-[90%] h-full mx-auto px-10 gap-20 rounded-3xl shadow-xl">
      <div className="flex-1 grid content-center gap-10">
        <h2 className="text-4xl lg:text-8xl">{heading}</h2>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem vero
          reiciendis deleniti eos at, deserunt aperiam ut similique, quae quas
          dolor consequuntur eligendi maiores dolore temporibus ducimus mollitia
          quos nemo?
        </p>
        <button className="bg-white text-black max-w-xs px-6 py-2 rounded-3xl border shadow hover:bg-gray-100 transition w-auto">
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

  const title_height = 500;
  const card_padding = 80;

  useMotionValueEvent(scrollY, "change", () => {
    console.log(scrollY.get());
  });

  const cardData: CardProps[] = [
    {
      heading: "Web design & development",
      imgBackground: "red",
    },
    {
      heading: "Branding",
      imgBackground: "green",
    },
    {
      heading: "Digital Marketing",
      imgBackground: "blue",
    },
  ];

  let cardTimeline: number[][] = [];

  if (typeof window !== "undefined") {
    cardTimeline = cardData.map((_, i) => {
      const start = title_height + i * window.innerHeight + card_padding;
      const end = title_height + (i + 1) * window.innerHeight;
      return [start, end];
    });
  }

  const timeline = [[0, title_height], ...cardTimeline];
  const animation = timeline.map((data) => ({
    scale: useTransform(scrollY, data, [1, 0.8]),
    opacity: useTransform(scrollY, data, [1, 0]),
  }));

  return (
    <div ref={targetRef} className="relative">
      <motion.div
        style={{
          scale: animation[0].scale,
          opacity: animation[0].opacity,
          height: `${title_height}px`,
        }}
        className=" sticky top-0 flex items-end text-8xl lg:text-[160px] uppercase lg:leading-[140px] px-36 overflow-clip"
      >
        <h1 className="w-full h-max">
          our <br />
          <span className="ml-20 lg:ml-52">service</span>
        </h1>
      </motion.div>
      {cardData.map((data, i) => (
        <motion.div
          style={{
            scale: animation[i + 1].scale,
            opacity: animation[i + 1].opacity,
          }}
          key={data.heading}
          className="h-dvh py-20 sticky top-0"
        >
          <Cards heading={data.heading} imgBackground={data.imgBackground} />
        </motion.div>
      ))}
    </div>
  );
}
