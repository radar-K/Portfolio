"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { gsap } from "gsap";

const TechIcon3D = dynamic(() => import("@/components/tech-icon-3d"), {
  ssr: false,
  loading: () => <div className="w-12 h-12 bg-muted rounded-lg animate-pulse" />,
});

interface TechStack {
  name: string;
  icon:
    | "javascript"
    | "aws"
    | "docker"
    | "postgresql"
    | "threejs"
    | "react"
    | "css"
    | "webgl";
}

interface Project {
  id: string;
  title: string;
  description: string;
  techStack: TechStack[];
  slug: string;
  previewImage: string;
  externalUrl?: string;
}

const projects: Project[] = [
  {
    id: "1",
    title: "Banking Transactions",
    description:
      "En interaktiv finansiell dashboard-applikation byggd med Next.js och Javascript som l\u00e5ter anv\u00e4ndare hantera och visualisera sina transaktioner i realtid. Appen anv\u00e4nder shadcn/ui komponenter och Tailwind CSS f\u00f6r modern styling, medan Recharts driver de interaktiva diagrammen. Applikationen visar en \u00f6versikt av ekonomisk status med statistik, interaktiva diagram och transaktionshistorik, allt renderat med React Hooks f\u00f6r smidig state management och responsiv design som fungerar p\u00e5 alla enheter.",
    techStack: [
      { name: "JavaScript", icon: "javascript" },
      { name: "AWS", icon: "aws" },
      { name: "Docker", icon: "docker" },
      { name: "PostgreSQL", icon: "postgresql" },
    ],
    slug: "banking-transactions",
    previewImage: "/awsPreview.png",
    externalUrl: "http://13.49.18.194:3000/",
  },
  {
    id: "2",
    title: "3D Gym Room Planner",
    description:
      "I 3D Room Planner kan anv\u00e4ndaren skapa rum, placera och justera objekt, hantera ljuss\u00e4ttning samt spara och ladda sina designer lokalt. Systemet \u00e4r byggt med Next.js 15, React 18 och TypeScript, och anv\u00e4nder Three.js tillsammans med React Three Fiber och Drei f\u00f6r effektiv 3D-rendering. Gr\u00e4nssnittet \u00e4r responsivt och utvecklat med Tailwind CSS, shadcn/ui och Lucide React. Drag-och-sl\u00e4pp-funktionalitet hanteras med @use-gesture/react, och data lagras via localStorage.",
    techStack: [
      { name: "Three.js", icon: "threejs" },
      { name: "React", icon: "react" },
      { name: "CSS", icon: "css" },
      { name: "WebGL", icon: "webgl" },
    ],
    slug: "3d-gym-planner",
    previewImage: "/port0.png",
  },
  {
    id: "3",
    title: "E-Commerce Dashboard",
    description:
      "A modern e-commerce analytics dashboard featuring real-time sales tracking, inventory management, and customer insights. Built with modern technologies for scalability.",
    techStack: [
      { name: "React", icon: "react" },
      { name: "JavaScript", icon: "javascript" },
      { name: "AWS", icon: "aws" },
    ],
    slug: "ecommerce-dashboard",
    previewImage: "/port0.png",
  },
  {
    id: "4",
    title: "AI Content Generator",
    description:
      "An intelligent content generation platform powered by machine learning algorithms and natural language processing. The application helps content creators with modern interfaces.",
    techStack: [
      { name: "React", icon: "react" },
      { name: "JavaScript", icon: "javascript" },
      { name: "AWS", icon: "aws" },
    ],
    slug: "ai-content-generator",
    previewImage: "/port0.png",
  },
];

function HighlightedText({
  text,
  highlightedTech,
}: {
  text: string;
  highlightedTech: string | null;
}) {
  if (!text || typeof text !== "string") return <span>{String(text || "")}</span>;
  if (!highlightedTech || typeof highlightedTech !== "string") return <span>{text}</span>;

  const techMap: Record<string, string[]> = {
    javascript: ["JavaScript", "JS"],
    aws: ["AWS"],
    docker: ["Docker"],
    postgresql: ["PostgreSQL"],
    threejs: ["Three.js", "React Three Fiber"],
    react: ["React", "React 18"],
    css: ["CSS", "Tailwind CSS"],
    webgl: ["WebGL"],
  };

  const wordsToHighlight = techMap[highlightedTech];
  if (!wordsToHighlight || wordsToHighlight.length === 0) return <span>{text}</span>;

  let result = text;
  try {
    for (const word of wordsToHighlight) {
      if (!word || typeof word !== "string" || word.length === 0) continue;
      const escapedWord = word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(`\\b(${escapedWord})\\b`, "gi");
      result = result.replace(
        regex,
        '<mark class="bg-yellow-200 text-yellow-900 px-1 rounded">$1</mark>'
      );
    }
  } catch {
    return <span>{text}</span>;
  }
  return <span dangerouslySetInnerHTML={{ __html: result }} />;
}

export default function ProjectSection() {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [isHoveringLaunchLink, setIsHoveringLaunchLink] = useState(false);
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const [isHoveringTechArea, setIsHoveringTechArea] = useState(false);
  const [showImage, setShowImage] = useState(false);

  const imageRef = useRef<HTMLDivElement>(null);
  const lastMousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      try {
        const mousePos = { x: e.clientX, y: e.clientY };
        const speed = Math.sqrt(
          Math.pow(mousePos.x - lastMousePos.current.x, 2) +
            Math.pow(mousePos.y - lastMousePos.current.y, 2)
        );
        const maxY = window.innerHeight - 250;
        const maxX = window.innerWidth - 320;

        if (imageRef.current && showImage) {
          gsap.to(imageRef.current, {
            x: gsap.utils.clamp(0, maxX, mousePos.x - 110),
            y: gsap.utils.clamp(0, maxY, mousePos.y - 160),
            rotation: speed * (mousePos.x > lastMousePos.current.x ? 1 : -1) * 0.1,
            ease: "back.out(2)",
            duration: 1.3,
          });
          gsap.to(imageRef.current, {
            opacity: 1,
            visibility: "visible",
            ease: "power3.out",
            duration: 0.6,
          });
        }
        lastMousePos.current = mousePos;
      } catch {
        // silently handle
      }
    };

    if (showImage && typeof window !== "undefined") {
      window.addEventListener("mousemove", handleMouseMove);
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, [showImage]);

  useEffect(() => {
    try {
      if (hoveredProject && !isHoveringLaunchLink && !hoveredTech && !isHoveringTechArea) {
        setShowImage(true);
        if (imageRef.current) {
          gsap.set(imageRef.current, {
            x: lastMousePos.current.x - 110,
            y: lastMousePos.current.y - 160,
            scale: 0,
            rotation: -10,
            opacity: 0,
            visibility: "hidden",
          });
          gsap.to(imageRef.current, {
            scale: 1,
            rotation: 0,
            opacity: 1,
            visibility: "visible",
            duration: 0.8,
            ease: "back.out(1.7)",
          });
        }
      } else {
        if (imageRef.current) {
          gsap.to(imageRef.current, {
            scale: 0.8,
            rotation: 10,
            opacity: 0,
            duration: 0.5,
            ease: "power2.in",
            onComplete: () => {
              setShowImage(false);
              if (imageRef.current) {
                gsap.set(imageRef.current, { visibility: "hidden" });
              }
            },
          });
        } else {
          setShowImage(false);
        }
      }
    } catch {
      // silently handle
    }
  }, [hoveredProject, isHoveringLaunchLink, hoveredTech, isHoveringTechArea]);

  return (
    <div className="min-h-screen bg-card relative overflow-x-hidden">
      <div className="relative z-10 bg-card py-16 px-0">
        <div className="max-w-full mx-auto px-4">
          <div>
            {projects.map((project) => (
              <article
                key={project.id}
                className="group border-b border-border py-8 cursor-pointer"
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-3">
                      {project.title || ""}
                    </h2>
                    <p className="text-muted-foreground mb-6 text-base leading-relaxed transition-all duration-300">
                      <HighlightedText
                        text={project.description || ""}
                        highlightedTech={hoveredTech}
                      />
                    </p>
                    <div className="flex items-center justify-between">
                      <div
                        className="flex items-center gap-3 p-4 -m-4"
                        onMouseEnter={() => setIsHoveringTechArea(true)}
                        onMouseLeave={() => setIsHoveringTechArea(false)}
                      >
                        {project.techStack?.map((tech, index) => (
                          <div key={index}>
                            <TechIcon3D
                              type={tech.icon}
                              onHover={(isHovered) =>
                                setHoveredTech(isHovered ? tech.icon : null)
                              }
                            />
                          </div>
                        )) || null}
                      </div>
                      <Link
                        href={project.externalUrl || `/projects/${project.slug}` || "#"}
                        className="group/button relative inline-flex items-center justify-center px-6 py-3 bg-orange-50/30 backdrop-blur-md border border-card/20 hover:bg-orange-100/40 rounded-2xl transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105 active:scale-95 flex-shrink-0"
                        onMouseEnter={() => setIsHoveringLaunchLink(true)}
                        onMouseLeave={() => setIsHoveringLaunchLink(false)}
                        target={project.externalUrl ? "_blank" : "_self"}
                        rel={project.externalUrl ? "noopener noreferrer" : undefined}
                      >
                        <span className="font-medium text-foreground text-sm mr-2 relative z-10 whitespace-nowrap">
                          Launch website
                        </span>
                        <ArrowRight className="w-4 h-4 text-foreground/70 group-hover/button:translate-x-1 transition-all duration-300 relative z-10 flex-shrink-0" />
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/40 via-white/10 to-transparent opacity-60" />
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/button:translate-x-full transition-transform duration-700 ease-out" />
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      {showImage && hoveredProject && (
        <div
          ref={imageRef}
          className="fixed pointer-events-none z-50"
          style={{ left: 0, top: 0, visibility: "hidden" }}
        >
          <div className="bg-card rounded-lg shadow-2xl border border-border overflow-hidden">
            <img
              src={
                projects.find((p) => p.id === hoveredProject)?.previewImage || "/port0.png"
              }
              alt="Project preview"
              className="w-80 h-48 object-cover"
              crossOrigin="anonymous"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                if (target) target.src = "/port0.png";
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
