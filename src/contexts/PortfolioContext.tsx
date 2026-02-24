"use client";

import { createContext, useState, useEffect, type ReactNode } from "react";

export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  link: string;
  image: string;
}

export interface TechSkill {
  name: string;
  url: string;
}

export interface PortfolioContextType {
  projects: Project[];
  addProject: (project: Project) => void;
  updateProject: (project: Project) => void;
  deleteProject: (id: string) => void;
  techSkills: TechSkill[];
  addTechSkill: (skill: TechSkill) => void;
  deleteTechSkill: (skillName: string) => void;
}

export const PortfolioContext = createContext<PortfolioContextType>({
  projects: [],
  addProject: () => {},
  updateProject: () => {},
  deleteProject: () => {},
  techSkills: [],
  addTechSkill: () => {},
  deleteTechSkill: () => {},
});

const startingProjects: Project[] = [
  {
    id: "1",
    title: "Project One",
    description: "A webbsite about something interesting",
    tech: ["React", "Tailwind CSS", "Next.js"],
    link: "https://example.com/project-one",
    image: "/port0.png",
  },
  {
    id: "2",
    title: "Project Two",
    description: "A webbsite about something interesting",
    tech: ["Next.js", "React", "Tailwind CSS"],
    link: "https://example.com/project-two",
    image: "/port0.png",
  },
  {
    id: "3",
    title: "Project Three",
    description: "A webbsite about something interesting",
    tech: ["Next.js", "DaisyUI", "Javascript"],
    link: "https://example.com/project-three",
    image: "/port0.png",
  },
];

const startingTechSkills: TechSkill[] = [
  { name: "React", url: "/react.png" },
  { name: "JavaScript", url: "/java.png" },
  { name: "CSS", url: "/css.png" },
];

interface PortfolioProviderProps {
  children: ReactNode;
}

export default function PortfolioProvider({
  children,
}: PortfolioProviderProps) {
  const [projects, setProjects] = useState<Project[]>(startingProjects);
  const [techSkills, setTechSkills] = useState<TechSkill[]>(startingTechSkills);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedProjects = localStorage.getItem("projects");
      if (storedProjects && JSON.parse(storedProjects).length > 0) {
        setProjects(JSON.parse(storedProjects));
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("projects", JSON.stringify(projects));
    }
  }, [projects]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedTechSkills = localStorage.getItem("techSkills");
      if (storedTechSkills && JSON.parse(storedTechSkills).length > 0) {
        setTechSkills(JSON.parse(storedTechSkills));
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("techSkills", JSON.stringify(techSkills));
    }
  }, [techSkills]);

  function addProject(project: Project) {
    setProjects([...projects, project]);
  }

  function updateProject(updatedProject: Project) {
    setProjects(
      projects.map((project) =>
        project.id === updatedProject.id ? updatedProject : project
      )
    );
  }

  function deleteProject(id: string) {
    setProjects(projects.filter((project) => project.id !== id));
  }

  function addTechSkill(skill: TechSkill) {
    setTechSkills([...techSkills, skill]);
  }

  function deleteTechSkill(skillName: string) {
    setTechSkills(techSkills.filter((skill) => skill.name !== skillName));
  }

  return (
    <PortfolioContext.Provider
      value={{
        projects,
        addProject,
        updateProject,
        deleteProject,
        techSkills,
        addTechSkill,
        deleteTechSkill,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}
