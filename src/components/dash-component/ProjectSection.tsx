"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import TechIcon3D from "@/components/dash-component/tech-icon";
import { gsap } from "gsap";

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
      "En interaktiv finansiell dashboard-applikation byggd med Next.js och Javascript som låter användare hantera och visualisera sina transaktioner i realtid. Appen använder shadcn/ui komponenter och Tailwind CSS för modern styling, medan Recharts driver de interaktiva diagrammen. Applikationen visar en översikt av ekonomisk status med statistik, interaktiva diagram och transaktionshistorik, allt renderat med React Hooks för smidig state management och responsiv design som fungerar på alla enheter.",
    techStack: [
      {
        name: "JavaScript",
        icon: "javascript",
        // GLB Support - Uncomment when GLB file is available
        // ,useGLB: true,
        // glbPath: "/models/javascript-logo.glb",
      },

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
      "I 3D Room Planner kan användaren skapa rum, placera och justera objekt, hantera ljussättning samt spara och ladda sina designer lokalt. Systemet är byggt med Next.js 15, React 18 och TypeScript, och använder Three.js tillsammans med React Three Fiber och Drei för effektiv 3D-rendering. Gränssnittet är responsivt och utvecklat med Tailwind CSS, shadcn/ui och Lucide React. Drag-och-släpp-funktionalitet hanteras med @use-gesture/react, och data lagras via localStorage.",
    techStack: [
      { name: "Three.js", icon: "threejs" },
      { name: "React", icon: "react" },
      { name: "CSS", icon: "css" },
      { name: "WebGL", icon: "webgl" },
    ],
    slug: "3d-gym-planner",
    previewImage: "/images/css-art-preview.png",
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
    previewImage:
      "/placeholder.svg?height=300&width=500&text=E-Commerce+Dashboard",
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
    previewImage:
      "/placeholder.svg?height=300&width=500&text=AI+Content+Generator",
  },
];

function HighlightedText({
  text,
  highlightedTech,
}: {
  text: string;
  highlightedTech: string | null;
}) {
  // Comprehensive safety checks
  if (!text) {
    return <span></span>;
  }

  if (typeof text !== "string") {
    return <span>{String(text)}</span>;
  }

  if (!highlightedTech) {
    return <span>{text}</span>;
  }

  if (typeof highlightedTech !== "string") {
    return <span>{text}</span>;
  }

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

  if (
    !wordsToHighlight ||
    !Array.isArray(wordsToHighlight) ||
    wordsToHighlight.length === 0
  ) {
    return <span>{text}</span>;
  }

  let result = text;

  try {
    for (const word of wordsToHighlight) {
      // Multiple safety checks without using trim()
      if (!word) continue;
      if (typeof word !== "string") continue;
      if (word.length === 0) continue;

      // Escape special regex characters
      const escapedWord = word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(`\\b(${escapedWord})\\b`, "gi");

      result = result.replace(
        regex,
        '<mark class="bg-yellow-200 text-yellow-900 px-1 rounded">$1</mark>'
      );
    }
  } catch (error) {
    console.warn("Error in text highlighting:", error);
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

  // Advanced GSAP mouse following with speed-based rotation
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      try {
        const mousePos = { x: e.clientX, y: e.clientY };

        // Calculate speed based on mouse movement
        const speed = Math.sqrt(
          Math.pow(mousePos.x - lastMousePos.current.x, 2) +
            Math.pow(mousePos.y - lastMousePos.current.y, 2)
        );

        // Calculate boundaries to keep image within viewport
        const maxY = window.innerHeight - 250;
        const maxX = window.innerWidth - 320;

        if (imageRef.current && showImage) {
          // Position animation with clamping
          gsap.to(imageRef.current, {
            x: gsap.utils.clamp(0, maxX, mousePos.x - 110),
            y: gsap.utils.clamp(0, maxY, mousePos.y - 160),
            rotation:
              speed * (mousePos.x > lastMousePos.current.x ? 1 : -1) * 0.1,
            ease: "back.out(2)",
            duration: 1.3,
          });

          // Opacity and visibility animation
          gsap.to(imageRef.current, {
            opacity: 1,
            visibility: "visible",
            ease: "power3.out",
            duration: 0.6,
          });
        }

        lastMousePos.current = mousePos;
      } catch (error) {
        console.warn("Error in mouse move handler:", error);
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

  // Show/hide image with GSAP animations
  useEffect(() => {
    try {
      if (
        hoveredProject &&
        !isHoveringLaunchLink &&
        !hoveredTech &&
        !isHoveringTechArea
      ) {
        setShowImage(true);

        if (imageRef.current) {
          // Set initial position and state
          gsap.set(imageRef.current, {
            x: lastMousePos.current.x - 110,
            y: lastMousePos.current.y - 160,
            scale: 0,
            rotation: -10,
            opacity: 0,
            visibility: "hidden",
          });

          // Animate in with bounce
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
          // Animate out
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
    } catch (error) {
      console.warn("Error in image animation:", error);
    }
  }, [hoveredProject, isHoveringLaunchLink, hoveredTech, isHoveringTechArea]);

  return (
    <div className="min-h-screen bg-white relative overflow-x-hidden">
      <div className="relative z-10 bg-white py-16 px-0">
        <div className="max-w-full mx-auto px-4">
          <div className="space-y-0">
            {projects.map((project) => (
              <article
                key={project.id}
                className="group border-b border-gray-200 py-8 cursor-pointer"
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-3">
                      {project.title || ""}
                    </h2>

                    <p className="text-gray-600 mb-6 text-base leading-relaxed transition-all duration-300">
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
                        href={
                          project.externalUrl ||
                          `/projects/${project.slug}` ||
                          "#"
                        }
                        className="group/button relative inline-flex items-center justify-center px-6 py-3 bg-orange-50/30 backdrop-blur-md border border-white/20 hover:bg-orange-100/40 rounded-2xl transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105 active:scale-95 flex-shrink-0"
                        onMouseEnter={() => setIsHoveringLaunchLink(true)}
                        onMouseLeave={() => setIsHoveringLaunchLink(false)}
                        target={project.externalUrl ? "_blank" : "_self"}
                        rel={
                          project.externalUrl
                            ? "noopener noreferrer"
                            : undefined
                        }
                      >
                        <span className="font-medium text-gray-800 text-sm mr-2 relative z-10 whitespace-nowrap">
                          Launch website
                        </span>
                        <ArrowRight className="w-4 h-4 text-gray-700 group-hover/button:translate-x-1 transition-all duration-300 relative z-10 flex-shrink-0" />

                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/40 via-white/10 to-transparent opacity-60"></div>
                        <div className="absolute top-0 left-4 right-4 h-px bg-white/50 rounded-full"></div>
                        <div className="absolute top-4 bottom-4 left-0 w-px bg-white/30 rounded-full"></div>
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/button:translate-x-full transition-transform duration-700 ease-out"></div>
                        <div className="absolute inset-0 rounded-2xl shadow-inner shadow-white/20"></div>
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
          style={{
            left: 0,
            top: 0,
            visibility: "hidden",
          }}
        >
          <div className="bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden">
            <img
              src={
                projects.find((project) => project.id === hoveredProject)
                  ?.previewImage ||
                "/placeholder.svg?height=300&width=500&text=Project+Preview" ||
                "/placeholder.svg"
              }
              alt="Project preview"
              className="w-80 h-48 object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                if (target) {
                  target.src =
                    "/placeholder.svg?height=300&width=500&text=Project+Preview";
                }
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
