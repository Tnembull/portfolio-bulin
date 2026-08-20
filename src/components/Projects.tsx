"use client";

import { useState } from "react";
import Link from "next/link";
import { usePortfolio } from "@/context/PortfolioContext";
import { PROJECTS as INITIAL_PROJECTS } from "@/data/projects";
import { ArrowUpRight } from "lucide-react";

interface ProjectsProps {
  featuredOnly?: boolean;
}

export default function Projects({ featuredOnly = false }: ProjectsProps = {}) {
  const { state } = usePortfolio();
  const { projects } = state;
  const rawItems =
    projects?.items && projects.items.length >= 3
      ? projects.items
      : INITIAL_PROJECTS;
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  const categories = ["ALL", "BACKEND / API", "DEVOPS & CLOUD", "AUTOMATION"];

  const filteredItems = rawItems.filter((item) => {
    if (selectedCategory === "ALL") return true;
    if (selectedCategory === "BACKEND / API")
      return (
        item.category?.toLowerCase().includes("backend") ||
        item.category?.toLowerCase().includes("api")
      );
    if (selectedCategory === "DEVOPS & CLOUD")
      return (
        item.category?.toLowerCase().includes("devops") ||
        item.category?.toLowerCase().includes("cloud") ||
        item.category?.toLowerCase().includes("k8s") ||
        item.category?.toLowerCase().includes("infra")
      );
    if (selectedCategory === "AUTOMATION")
      return (
        item.category?.toLowerCase().includes("auto") ||
        item.category?.toLowerCase().includes("script") ||
        item.category?.toLowerCase().includes("ci")
      );
    return true;
  });

  const featuredItems = filteredItems.filter((item) => item.featured !== false);
  const itemsToDisplay = featuredOnly
    ? (featuredItems.length >= 3 ? featuredItems : filteredItems).slice(0, 3)
    : filteredItems;

  return (
    <section id="projects" className="w-full bg-slate-950 py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-6 border-b border-slate-800/80 gap-4">
          <div>
            <p className="font-mono text-xs tracking-wider text-cyan-400 uppercase mb-1">
              {projects?.sectionBadge || "06. FEATURED WORK"}
            </p>
            <h2 className="text-2xl sm:text-3xl font-sans font-bold tracking-tight text-slate-100">
              {projects?.titleMain || "Engineering"} {projects?.titleHighlight || "Projects"}
            </h2>
          </div>

          {/* Category Filter Tags */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`font-mono text-xs px-2.5 py-1 rounded transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-semibold"
                    : "bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Editorial Open Row List */}
        <div className="divide-y divide-slate-800/80">
          {itemsToDisplay.map((proj, idx) => {
            const techList = proj.tech || proj.tags || [];
            const projectLink = proj.link || proj.url || proj.githubUrl || proj.liveUrl;

            return (
              <div
                key={proj.id || idx}
                className="py-6 md:py-8 flex flex-col md:flex-row md:items-start justify-between gap-4 group transition-colors"
              >
                <div className="space-y-3 max-w-3xl">
                  {/* Title & Category Badge */}
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-sans font-bold text-slate-100 text-lg hover:text-cyan-400 transition-colors">
                      {projectLink ? (
                        <a
                          href={projectLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-cyan-400 transition-colors"
                        >
                          {proj.title}
                        </a>
                      ) : (
                        proj.title
                      )}
                    </h3>
                    {proj.category && (
                      <span className="font-mono text-xs text-slate-400 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded">
                        {proj.category}
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-slate-400 text-sm max-w-2xl leading-relaxed">
                    {proj.description}
                  </p>

                  {/* Tech stack tags line */}
                  {techList.length > 0 && (
                    <p className="font-mono text-xs text-slate-400">
                      {techList.join(" • ")}
                    </p>
                  )}
                </div>

                {/* External Link */}
                {projectLink && (
                  <div className="shrink-0 md:pt-1">
                    <a
                      href={projectLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-mono text-xs text-slate-300 hover:text-cyan-400 transition-colors"
                    >
                      <span>View System</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Featured Only Bottom Link */}
        {featuredOnly && (
          <div className="pt-8 border-t border-slate-800/80">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 font-mono text-xs text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
            >
              <span>View All Engineering & Infrastructure Projects →</span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
