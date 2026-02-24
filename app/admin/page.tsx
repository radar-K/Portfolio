"use client";
import { useContext, useState, type FormEvent } from "react";
import {
  PortfolioContext,
  type Project,
  type TechSkill,
} from "@/components/portfolio-context";
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

  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin() {
    if (username === "admin" && password === "password") {
      setLoggedIn(true);
    } else {
      alert("Invalid login");
    }
  }

  function handleProjectSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    addProject({
      id: Date.now().toString(),
      title: newProject.title || "",
      description: newProject.description || "",
      tech: newProject.tech || [],
      link: newProject.link || "",
      image: newProject.image || "",
    });
    setNewProject({ title: "", description: "", tech: [], link: "", image: "" });
  }

  function handleAddTech(e: FormEvent) {
    e.preventDefault();
    if (!newTech) return;
    setNewProject({ ...newProject, tech: [...(newProject.tech || []), newTech] });
    setNewTech("");
  }

  function handleTechSkillSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!newTechSkill.name || !newTechSkill.url) {
      alert("Please fill in all tech skill fields");
      return;
    }
    addTechSkill(newTechSkill);
    setNewTechSkill({ name: "", url: "" });
  }

  if (!loggedIn) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mt-6 mb-4 text-foreground">Admin Login</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
          className="max-w-md"
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          <div>
            <label className="block mb-1 text-foreground">Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border border-border rounded bg-card text-foreground"
            />
          </div>
          <div>
            <label className="block mb-1 text-foreground">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-border rounded bg-card text-foreground"
            />
          </div>
          <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded">
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <main className="container mx-auto p-4">
      <Link href="/" className="text-foreground hover:underline">
        {"← Back to Portfolio"}
      </Link>

      <h1 className="text-2xl font-bold mt-6 mb-4 text-foreground">Admin Panel</h1>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4 text-foreground">Add New Project</h2>
          <form onSubmit={handleProjectSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div>
              <label className="block mb-1 text-foreground">Title:</label>
              <input
                type="text"
                value={newProject.title}
                onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                className="w-full p-2 border border-border rounded bg-card text-foreground"
              />
            </div>
            <div>
              <label className="block mb-1 text-foreground">Description:</label>
              <textarea
                value={newProject.description}
                onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                className="w-full p-2 border border-border rounded bg-card text-foreground"
              />
            </div>
            <div>
              <label className="block mb-1 text-foreground">Technologies:</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newTech}
                  onChange={(e) => setNewTech(e.target.value)}
                  className="flex-1 p-2 border border-border rounded bg-card text-foreground"
                />
                <button
                  type="button"
                  onClick={handleAddTech}
                  className="px-3 py-2 bg-blue-500 text-white rounded"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {newProject.tech?.map((tech, index) => (
                  <span key={index} className="px-2 py-1 bg-muted text-foreground rounded">
                    {tech}
                    <button
                      type="button"
                      onClick={() =>
                        setNewProject({
                          ...newProject,
                          tech: newProject.tech?.filter((_, i) => i !== index),
                        })
                      }
                      className="ml-2 text-destructive"
                    >
                      {"×"}
                    </button>
                  </span>
                ))}
              </div>
            </div>
            <div>
              <label className="block mb-1 text-foreground">Link:</label>
              <input
                type="text"
                value={newProject.link}
                onChange={(e) => setNewProject({ ...newProject, link: e.target.value })}
                className="w-full p-2 border border-border rounded bg-card text-foreground"
              />
            </div>
            <div>
              <label className="block mb-1 text-foreground">Image URL:</label>
              <input
                type="text"
                value={newProject.image}
                onChange={(e) => setNewProject({ ...newProject, image: e.target.value })}
                className="w-full p-2 border border-border rounded bg-card text-foreground"
              />
            </div>
            <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded">
              Add Project
            </button>
          </form>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4 text-foreground">Current Projects</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {projects.map((project) => (
              <div key={project.id} className="border border-border p-4 rounded bg-card">
                <h3 className="font-semibold text-foreground">{project.title}</h3>
                <p className="text-sm text-muted-foreground">{project.description}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {project.tech.map((tech) => (
                    <span key={tech} className="text-xs px-2 py-1 bg-muted text-foreground rounded">
                      {tech}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => deleteProject(project.id)}
                  className="mt-2 text-destructive text-sm"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>

          <h2 className="text-xl font-semibold mt-8 mb-4 text-foreground">Current Tech Skills</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {techSkills.map((skill) => (
              <div key={skill.name} className="flex items-center gap-2 border border-border p-2 rounded bg-card">
                <span className="text-foreground">{skill.name}</span>
                <span className="text-muted-foreground text-xs">{skill.url}</span>
                <button onClick={() => deleteTechSkill(skill.name)} className="ml-auto text-destructive">
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
