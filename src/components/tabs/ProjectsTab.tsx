"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { usePortfolio } from "@/context/PortfolioContext";
import { PROJECTS as INITIAL_PROJECTS, Project } from "@/data/projects";
import {
  Search,
  FolderGit2,
  ExternalLink,
  Github,
  X,
  Sparkles,
  Layers,
  CheckCircle2,
  ArrowUpRight,
  SlidersHorizontal,
  Code2,
} from "lucide-react";

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

      // Search query filter
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
    <div className="space-y-6 pb-6 animate-in fade-in duration-300">
      {/* 1. Header & Search / Filters */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono mb-1.5">
              <FolderGit2 size={13} />
              <span>PRODUCTION SHOWCASE</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-100">
              Engineered Projects
            </h1>
          </div>

          <div className="text-xs font-mono text-slate-400">
            <span className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/10">
              {filteredProjects.length} of {rawProjects.length} Projects
            </span>
          </div>
        </div>

        {/* Search Bar Input */}
        <div className="relative">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects by name, keyword, or tech stack (e.g. Terraform, Kubernetes, Go)..."
            className="w-full bg-[#121722] border border-white/[0.08] focus:border-emerald-500 text-slate-100 pl-10 pr-10 py-3 rounded-2xl text-xs sm:text-sm outline-none transition-all placeholder:text-slate-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
            >
              <X size={15} />
            </button>
          )}
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`shrink-0 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-[0_0_12px_rgba(0,216,146,0.2)]"
                    : "bg-[#121722] text-slate-400 border border-white/[0.06] hover:text-slate-200 hover:bg-white/[0.04]"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="p-8 text-center rounded-3xl bg-[#121722] border border-white/[0.06] space-y-3">
          <FolderGit2 className="size-10 text-slate-500 mx-auto" />
          <p className="text-sm text-slate-300 font-medium">
            No projects found matching your search.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("ALL");
            }}
            className="text-xs text-emerald-400 hover:underline font-mono cursor-pointer"
          >
            Reset all filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProjects.map((item) => {
            const githubLink = item.githubUrl || item.link || "https://github.com/Tnembull";
            const demoLink = item.liveUrl || item.url;

            return (
              <div
                key={item.id}
                className="rounded-3xl bg-[#121722] border border-white/[0.06] hover:border-emerald-500/30 transition-all duration-300 overflow-hidden flex flex-col justify-between group shadow-sm"
              >
                {/* Image Banner */}
                <div
                  onClick={() => setSelectedProject(item)}
                  className="relative h-44 w-full overflow-hidden bg-slate-900 cursor-pointer"
                >
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      unoptimized
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-900 text-slate-600">
                      <Code2 size={32} />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121722] via-transparent to-transparent" />

                  {/* Category Pill on Image */}
                  <span className="absolute top-3 left-3 px-2.5 py-0.5 text-[10px] font-mono font-bold bg-[#0b0e14]/80 backdrop-blur-md text-emerald-400 border border-white/10 rounded-full">
                    {item.category || "Project"}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h2
                      onClick={() => setSelectedProject(item)}
                      className="text-base font-bold text-slate-100 group-hover:text-emerald-400 transition-colors cursor-pointer line-clamp-1"
                    >
                      {item.title}
                    </h2>
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Tech stack chips */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {(item.tags || item.tech || []).slice(0, 4).map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 text-[10px] font-mono bg-white/[0.04] text-slate-300 border border-white/10 rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Actions Bar */}
                  <div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
                    <button
                      onClick={() => setSelectedProject(item)}
                      className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <span>Overview</span>
                      <ArrowUpRight size={13} />
                    </button>

                    <div className="flex items-center gap-2">
                      {githubLink && (
                        <a
                          href={githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Source Code"
                          className="size-8 rounded-lg flex items-center justify-center bg-white/[0.03] border border-white/10 text-slate-400 hover:text-slate-100 hover:border-white/20 transition-all"
                        >
                          <Github size={14} />
                        </a>
                      )}
                      {demoLink && (
                        <a
                          href={demoLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Live Demo"
                          className="size-8 rounded-lg flex items-center justify-center bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500 hover:text-[#0b0e14] transition-all"
                        >
                          <ExternalLink size={14} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 3. Interactive Detail Bottom Sheet / Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md p-3 sm:p-6 flex items-end sm:items-center justify-center animate-in fade-in">
          <div className="bg-[#121722] border border-white/10 rounded-t-3xl sm:rounded-3xl max-w-2xl w-full p-5 sm:p-7 space-y-5 max-h-[85vh] overflow-y-auto shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 pb-3 border-b border-white/10">
              <div className="space-y-1">
                <span className="px-2.5 py-0.5 text-[10px] font-mono font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 rounded-full">
                  {selectedProject.category || "Architecture Build"}
                </span>
                <h2 className="text-lg sm:text-xl font-bold text-slate-100">
                  {selectedProject.title}
                </h2>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Banner */}
            {selectedProject.image && (
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-white/10 bg-slate-900">
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
            <div className="space-y-2">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                Project Overview
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {selectedProject.longDescription || selectedProject.description}
              </p>
            </div>

            {/* Challenges & Solutions */}
            {selectedProject.challenges && selectedProject.challenges.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
                  Engineering Challenges
                </h3>
                <ul className="space-y-1 text-xs text-slate-300 list-disc list-inside">
                  {selectedProject.challenges.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>
            )}

            {selectedProject.solutions && selectedProject.solutions.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                  Implemented Solutions
                </h3>
                <ul className="space-y-1 text-xs text-slate-300 list-disc list-inside">
                  {selectedProject.solutions.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tech Stack Full Breakdown */}
            <div className="space-y-2">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                Technologies & Tools
              </h3>
              <div className="flex flex-wrap gap-2">
                {(selectedProject.tags || selectedProject.tech || []).map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-xs font-mono bg-white/[0.04] text-emerald-300 border border-emerald-500/20 rounded-xl"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Bottom CTAs */}
            <div className="flex flex-wrap items-center justify-end gap-3 pt-3 border-t border-white/10">
              <button
                onClick={() => setSelectedProject(null)}
                className="px-4 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 text-xs font-medium cursor-pointer"
              >
                Close
              </button>

              {(selectedProject.githubUrl || selectedProject.link) && (
                <a
                  href={selectedProject.githubUrl || selectedProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] text-slate-100 border border-white/10 text-xs font-bold"
                >
                  <Github size={14} />
                  <span>GitHub Repository</span>
                </a>
              )}

              {(selectedProject.liveUrl || selectedProject.url) && (
                <a
                  href={selectedProject.liveUrl || selectedProject.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-[#0b0e14] text-xs font-bold shadow-[0_0_15px_rgba(0,216,146,0.3)]"
                >
                  <span>Live Production</span>
                  <ExternalLink size={14} />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
