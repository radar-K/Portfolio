"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Mail, Zap, MessageSquare, Users, Database } from "lucide-react";

const cards = [
  {
    id: "bdr-agent",
    title: "AI Agent",
    subtitle: "Engages leads instantly",
    description: [
      "Automates research, follow-ups, and CRM updates—effortlessly",
      "Adapts to any sales motion. Fits any playbook",
      "Drives pipeline 24/7 with intelligent lead engagement",
    ],
    features: [
      { icon: Mail, title: "No cold leads" },
      { icon: Zap, title: "Speed to lead" },
      { icon: MessageSquare, title: "Less admin" },
    ],
    color: "from-pink-500 to-rose-600",
  },
  {
    id: "research-agent",
    title: "AI Research Agent",
    subtitle: "Handles research automatically",
    description: [
      "AI handles your research, so you don't have to",
      "Every call is fully prepped with the right insights",
      "Customize exactly how you need it",
    ],
    features: [
      { icon: Database, title: "Instant research" },
      { icon: Mail, title: "Fully prepped calls" },
      { icon: Users, title: "Custom insights" },
    ],
    color: "from-orange-400 to-yellow-500",
  },
  {
    id: "custom-agent",
    title: "AI Custom Agent",
    subtitle: "Build your own workflow",
    description: [
      "Create agents tailored to your specific workflow",
      "Visual builder with no code required",
      "Deploy instantly and scale effortlessly",
    ],
    features: [
      { icon: Users, title: "Visual builder" },
      { icon: Database, title: "Any data source" },
      { icon: Zap, title: "Quick deployment" },
    ],
    color: "from-emerald-500 to-teal-600",
  },
];

function Card({
  card,
  i,
  progress,
  range,
  targetScale,
}: {
  card: (typeof cards)[0];
  i: number;
  progress: any;
  range: [number, number];
  targetScale: number;
}) {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={container}
      className="h-screen flex items-end justify-center sticky top-0 pb-2"
    >
      <motion.div
        style={{
          scale,
          top: `-2vh`,
          zIndex: cards.length - i,
        }}
        className="relative h-[800px] md:h-[800px] lg:h-[900px] w-[95vw] origin-top"
      >
        <div className="w-full bg-[#f0f1fa] rounded-3xl shadow-lg border border-gray-200 overflow-hidden h-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-0 h-full">
            {/* Text Section */}
            <div className="p-4 md:p-6 lg:p-16 flex flex-col justify-center bg-[#f0f1fa] order-1">
              <div className="mb-4 lg:mb-6">
                <h1 className="text-lg md:text-2xl lg:text-4xl font-bold mb-3 lg:mb-6 text-gray-900">
                  <span className="text-indigo-600">{card.title}</span>
                </h1>

                <div className="space-y-2 lg:space-y-3">
                  {card.description.map((line, index) => (
                    <div key={index}>
                      <p className="text-xs md:text-sm lg:text-base text-gray-500 leading-relaxed">
                        {line}
                      </p>
                      {index < card.description.length - 1 && (
                        <div className="w-full h-px bg-gray-200 mt-2 lg:mt-3"></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Features - only on large screens */}
              <div className="hidden lg:grid grid-cols-3 gap-4">
                {card.features.map((feature, featureIndex) => (
                  <div
                    key={featureIndex}
                    className="flex flex-col items-center text-center space-y-2"
                  >
                    <div className="flex-shrink-0 w-10 h-10 bg-[#f0f1fa] rounded-xl shadow-sm border border-gray-200 flex items-center justify-center">
                      <feature.icon className="w-5 h-5 text-indigo-600" />
                    </div>
                    <h3 className="font-medium text-gray-900 text-sm">
                      {feature.title}
                    </h3>
                  </div>
                ))}
              </div>
            </div>

            {/* Image Section */}
            <div className="bg-[#f0f1fa] flex items-center justify-center p-4 md:p-6 lg:p-12 order-2">
              <motion.div
                style={{ scale: imageScale }}
                className={`w-40 h-40 md:w-48 md:h-48 lg:w-80 lg:h-80 bg-gradient-to-br ${card.color} rounded-2xl shadow-lg flex items-center justify-center`}
              >
                <div className="text-white text-3xl md:text-4xl lg:text-6xl font-bold opacity-20">
                  {i + 1}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function StackingCards() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <main ref={container} className="relative bg-white">
      {cards.map((card, i) => {
        const targetScale = 1 - (cards.length - i) * 0.2;
        return (
          <Card
            key={card.id}
            card={card}
            i={i}
            progress={scrollYProgress}
            range={[i * 0.25, 1]}
            targetScale={targetScale}
          />
        );
      })}
    </main>
  );
}
