"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { usePortfolio } from "@/context/PortfolioContext";
import { PROJECTS as INITIAL_PROJECTS, Project } from "@/data/projects";
import { Search, X, ArrowUpRight } from "lucide-react";

export default function ProjectsTab() {
  const { state } = usePortfolio();
  const { projects } = state;

  const rawProjects: Project[] =
    projects?.items && projects.items.length > 0
      ? projects.items
      : INITIAL_PROJECTS;

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = [
    "ALL",
    "DEVOPS & CLOUD",
    "BACKEND / API",
    "AUTOMATION",
  ];

  const filteredProjects = useMemo(() => {
    return rawProjects.filter((item) => {
      // Category filter
      let matchesCat = true;
      if (selectedCategory === "BACKEND / API") {
        matchesCat =
          item.category?.toLowerCase().includes("backend") ||
          item.category?.toLowerCase().includes("api") ||
          item.category?.toLowerCase().includes("database") ||
          item.tags?.some((t) => /postgres|api|node|golang|python/i.test(t)) ||
          false;
      } else if (selectedCategory === "DEVOPS & CLOUD") {
        matchesCat =
          item.category?.toLowerCase().includes("devops") ||
          item.category?.toLowerCase().includes("cloud") ||
          item.category?.toLowerCase().includes("k8s") ||
          item.category?.toLowerCase().includes("kubernetes") ||
          item.category?.toLowerCase().includes("infra") ||
          item.tags?.some((t) => /k8s|kubernetes|terraform|docker|aws|gcp/i.test(t)) ||
          false;
      } else if (selectedCategory === "AUTOMATION") {
        matchesCat =
          item.category?.toLowerCase().includes("auto") ||
          item.category?.toLowerCase().includes("script") ||
          item.category?.toLowerCase().includes("ci") ||
          item.category?.toLowerCase().includes("gitops") ||
          item.tags?.some((t) => /argocd|ci\/cd|actions|helm/i.test(t)) ||
          false;
      }

      // Search filter
      let matchesSearch = true;
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        matchesSearch =
          item.title?.toLowerCase().includes(query) ||
          item.description?.toLowerCase().includes(query) ||
          item.category?.toLowerCase().includes(query) ||
          item.tags?.some((t) => t.toLowerCase().includes(query)) ||
          false;
      }

      return matchesCat && matchesSearch;
    });
  }, [rawProjects, selectedCategory, searchQuery]);

  return (
    <div className="space-y-8 pb-12">
      {/* Header, Search & Filter */}
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-[#f2f4f5] tracking-tight">
            Engineered Projects
          </h1>
          <p className="text-sm text-[#9aa1a9] mt-1">
            Production infrastructure, backend architectures, and automation systems.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6f7781]"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects by name, keyword, or technology..."
            className="w-full bg-[#111418] border border-[#252a30] text-[#f2f4f5] pl-10 pr-10 py-2.5 rounded-md text-sm outline-none placeholder:text-[#6f7781]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#6f7781] hover:text-[#f2f4f5]"
            >
              <X size={15} />
            </button>
          )}
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 border-b border-[#252a30] pb-2 overflow-x-auto">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-md text-xs font-mono whitespace-nowrap transition-colors cursor-pointer ${
                  isSelected
                    ? "bg-[#111418] text-[#00c896] border border-[#252a30] font-semibold"
                    : "text-[#9aa1a9] hover:text-[#f2f4f5]"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Projects Editorial List */}
      {filteredProjects.length === 0 ? (
        <div className="py-12 text-center text-sm text-[#9aa1a9]">
          No projects found matching &ldquo;{searchQuery}&rdquo;.
        </div>
      ) : (
        <div className="divide-y divide-[#252a30]">
          {filteredProjects.map((item, idx) => (
            <article
              key={item.id}
              className="py-6 first:pt-0 last:pb-0 grid grid-cols-1 md:grid-cols-[60px_1fr_auto] gap-4 items-start"
            >
              {/* Index Number */}
              <span className="font-mono text-xs text-[#6f7781]">
                {String(idx + 1).padStart(2, "0")}
              </span>

              {/* Core Info */}
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <h2
                    onClick={() => setSelectedProject(item)}
                    className="text-base font-semibold text-[#f2f4f5] hover:text-[#00c896] transition-colors cursor-pointer"
                  >
                    {item.title}
                  </h2>
                  {item.category && (
                    <span className="text-[11px] font-mono text-[#6f7781]">
                      [{item.category}]
                    </span>
                  )}
                </div>

                <p className="text-sm text-[#9aa1a9] leading-relaxed max-w-2xl">
                  {item.description}
                </p>

                <div className="text-xs font-mono text-[#6f7781]">
                  {(item.tags || item.tech || []).join(" · ")}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-4 text-xs font-mono self-start pt-1">
                <button
                  onClick={() => setSelectedProject(item)}
                  className="text-[#9aa1a9] hover:text-[#f2f4f5] transition-colors cursor-pointer"
                >
                  Details
                </button>

                {(item.githubUrl || item.link) && (
                  <a
                    href={item.githubUrl || item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#9aa1a9] hover:text-[#f2f4f5] inline-flex items-center gap-1 transition-colors"
                  >
                    <span>GitHub</span>
                    <ArrowUpRight size={12} />
                  </a>
                )}

                {(item.liveUrl || item.url) && (
                  <a
                    href={item.liveUrl || item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#00c896] hover:underline inline-flex items-center gap-1 transition-colors"
                  >
                    <span>Live</span>
                    <ArrowUpRight size={12} />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-black/70 p-4 flex items-center justify-center">
          <div className="bg-[#111418] border border-[#252a30] rounded-lg max-w-2xl w-full p-6 space-y-5 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 pb-3 border-b border-[#252a30]">
              <div>
                <span className="text-xs font-mono text-[#00c896]">
                  {selectedProject.category || "Project Spec"}
                </span>
                <h2 className="text-lg font-semibold text-[#f2f4f5] mt-0.5">
                  {selectedProject.title}
                </h2>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="p-1.5 rounded-md hover:bg-[#161a1f] text-[#9aa1a9] hover:text-[#f2f4f5] cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Image (if any) */}
            {selectedProject.image && (
              <div className="relative aspect-video w-full rounded-md overflow-hidden border border-[#252a30] bg-[#0b0d0f]">
                <Image
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            )}

            {/* Description */}
            <div className="space-y-1.5 text-sm">
              <h3 className="text-xs font-mono font-semibold uppercase text-[#6f7781]">
                Overview
              </h3>
              <p className="text-[#9aa1a9] leading-relaxed">
                {selectedProject.longDescription || selectedProject.description}
              </p>
            </div>

            {/* Challenges & Solutions */}
            {selectedProject.challenges && selectedProject.challenges.length > 0 && (
              <div className="space-y-1.5 text-sm">
                <h3 className="text-xs font-mono font-semibold uppercase text-[#6f7781]">
                  Challenges & Architecture
                </h3>
                <ul className="space-y-1 text-xs text-[#9aa1a9] list-disc list-inside">
                  {selectedProject.challenges.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>
            )}

            {selectedProject.solutions && selectedProject.solutions.length > 0 && (
              <div className="space-y-1.5 text-sm">
                <h3 className="text-xs font-mono font-semibold uppercase text-[#00c896]">
                  Engineering Solutions
                </h3>
                <ul className="space-y-1 text-xs text-[#9aa1a9] list-disc list-inside">
                  {selectedProject.solutions.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tech Stack */}
            <div className="space-y-1.5 text-xs font-mono">
              <h3 className="text-xs font-mono font-semibold uppercase text-[#6f7781]">
                Stack
              </h3>
              <p className="text-[#9aa1a9]">
                {(selectedProject.tags || selectedProject.tech || []).join(" · ")}
              </p>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#252a30]">
              <button
                onClick={() => setSelectedProject(null)}
                className="px-3 py-2 rounded-md bg-[#161a1f] hover:bg-[#252a30] text-[#9aa1a9] text-xs font-mono cursor-pointer"
              >
                Close
              </button>

              {(selectedProject.githubUrl || selectedProject.link) && (
                <a
                  href={selectedProject.githubUrl || selectedProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 rounded-md bg-[#161a1f] hover:bg-[#252a30] text-[#f2f4f5] text-xs font-mono inline-flex items-center gap-1.5"
                >
                  <span>GitHub</span>
                  <ArrowUpRight size={13} />
                </a>
              )}

              {(selectedProject.liveUrl || selectedProject.url) && (
                <a
                  href={selectedProject.liveUrl || selectedProject.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-md bg-[#00c896] hover:bg-[#00b084] text-[#0b0d0f] text-xs font-mono font-semibold inline-flex items-center gap-1.5"
                >
                  <span>Live Production</span>
                  <ArrowUpRight size={13} />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
