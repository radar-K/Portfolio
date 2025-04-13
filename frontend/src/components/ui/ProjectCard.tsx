import type { Project } from "@/contexts/PortfolioContext";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

// Fallback-bild om projektet saknar bild
const PLACEHOLDER_IMAGE = "/skill"; // Webbild

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  // Använd en fallback-bild om project.image är tom
  const imageSrc = project.image || PLACEHOLDER_IMAGE;

  return (
    <Card className="overflow-hidden">
      <div className="h-48 relative">
        <Image
          src={imageSrc}
          alt={project.title}
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
      <CardContent className="p-4">
        <h3 className="font-bold mb-2">{project.title}</h3>
        <p className="text-sm mb-2">{project.description}</p>
        <div className="flex flex-wrap gap-1 mb-2">
          {project.tech.map((tech) => (
            <span
              key={`${project.id}-${tech}`}
              className="text-xs px-2 py-1 bg-gray-100 rounded"
            >
              {tech}
            </span>
          ))}
        </div>
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-500 hover:underline"
          >
            View Project
          </a>
        )}
      </CardContent>
    </Card>
  );
}
