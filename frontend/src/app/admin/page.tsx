"use client";
import { useContext, useState, FormEvent, ChangeEvent } from "react";
import {
  PortfolioContext,
  Project,
  TechSkill,
} from "@/contexts/PortfolioContext";
import Link from "next/link";

export default function AdminPanel() {
  const {
    projects,
    addProject,
    deleteProject,
    techSkills,
    addTechSkill,
    deleteTechSkill,
  } = useContext(PortfolioContext);

  const [newProject, setNewProject] = useState<Partial<Project>>({
    title: "",
    description: "",
    tech: [],
    link: "",
    image: "",
  });

  const [newTech, setNewTech] = useState("");
  const [newTechSkill, setNewTechSkill] = useState<TechSkill>({
    name: "",
    url: "",
  });

  function handleProjectSubmit(e: FormEvent<HTMLFormElement>) {
    addProject({
      id: Date.now().toString(),
      title: newProject.title || "",
      description: newProject.description || "",
      tech: newProject.tech || [],
      link: newProject.link || "",
      image: newProject.image || "",
    });

    setNewProject({
      title: "",
      description: "",
      tech: [],
      link: "",
      image: "",
    });
  }

  // Lägga till en teknologi till projektet:
  function handleAddTech(e: FormEvent) {
    e.preventDefault();
    if (!newTech) return;

    setNewProject({
      ...newProject,
      tech: [...(newProject.tech || []), newTech],
    });
    setNewTech("");
  }

  // ny skill
  function handleTechSkillSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!newTechSkill.name || !newTechSkill.url) {
      alert("Please fill in all tech skill fields");
      return;
    }

    addTechSkill(newTechSkill);
    setNewTechSkill({
      name: "",
      url: "",
    });
  }

  return (
    <main className="container mx-auto p-4">
      <Link href="/">← Back to Portfolio</Link>

      <h1 className="text-2xl font-bold mt-6 mb-4">Admin Panel</h1>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Add New Project</h2>
          <form onSubmit={handleProjectSubmit} className="space-y-4">
            <div>
              <label className="block mb-1">Title:</label>
              <input
                type="text"
                value={newProject.title}
                onChange={(e) =>
                  setNewProject({ ...newProject, title: e.target.value })
                }
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block mb-1">Description:</label>
              <textarea
                value={newProject.description}
                onChange={(e) =>
                  setNewProject({ ...newProject, description: e.target.value })
                }
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block mb-1">Technologies:</label>
              <div className="flex gap-2 mb-2">
                <div onSubmit={handleAddTech} className="flex gap-2 w-full">
                  <input
                    type="text"
                    value={newTech}
                    onChange={(e) => setNewTech(e.target.value)}
                    className="flex-1 p-2 border rounded"
                  />
                  <button
                    type="submit"
                    className="px-3 py-2 bg-blue-500 text-white rounded"
                  >
                    Add
                  </button>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {newProject.tech?.map((tech, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-200 rounded">
                    {tech}
                    <button
                      type="button"
                      onClick={() =>
                        setNewProject({
                          ...newProject,
                          tech: newProject.tech?.filter((_, i) => i !== index),
                        })
                      }
                      className="ml-2 text-red-500"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div>
              <label className="block mb-1">Link:</label>
              <input
                type="text"
                value={newProject.link}
                onChange={(e) =>
                  setNewProject({ ...newProject, link: e.target.value })
                }
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block mb-1">Image URL:</label>
              <input
                type="text"
                value={newProject.image}
                onChange={(e) =>
                  setNewProject({ ...newProject, image: e.target.value })
                }
                className="w-full p-2 border rounded"
              />
            </div>

            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded"
            >
              Add Project
            </button>
          </form>

          <h2 className="text-xl font-semibold mt-8 mb-4">Add Tech Skill</h2>
          <form onSubmit={handleTechSkillSubmit} className="space-y-4">
            <div>
              <label className="block mb-1">Name:</label>
              <input
                type="text"
                value={newTechSkill.name}
                onChange={(e) =>
                  setNewTechSkill({ ...newTechSkill, name: e.target.value })
                }
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block mb-1">Icon URL:</label>
              <input
                type="text"
                value={newTechSkill.url}
                onChange={(e) =>
                  setNewTechSkill({ ...newTechSkill, url: e.target.value })
                }
                className="w-full p-2 border rounded"
              />
            </div>

            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded"
            >
              Add Tech Skill
            </button>
          </form>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Current Projects</h2>
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id} className="border p-4 rounded">
                <h3 className="font-semibold">{project.title}</h3>
                <p className="text-sm text-gray-600">{project.description}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-2 py-1 bg-gray-100 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => deleteProject(project.id)}
                  className="mt-2 text-red-500 text-sm"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>

          <h2 className="text-xl font-semibold mt-8 mb-4">
            Current Tech Skills
          </h2>
          <div className="space-y-2">
            {techSkills.map((skill) => (
              <div
                key={skill.name}
                className="flex items-center gap-2 border p-2 rounded"
              >
                <span>{skill.name}</span>
                <span className="text-gray-500 text-xs">{skill.url}</span>
                <button
                  onClick={() => deleteTechSkill(skill.name)}
                  className="ml-auto text-red-500"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
