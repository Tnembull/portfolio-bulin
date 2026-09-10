"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePortfolio } from "@/context/PortfolioContext";
import { Project } from "@/data/projects";
import { Search, X, ArrowUpRight, Github, ExternalLink, FileText, LayoutGrid, List } from "lucide-react";

export default function ProjectsTab() {
  const { state } = usePortfolio();
  const { projects } = state;

  const rawProjects: Project[] = projects?.items || [];

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // 100% Dynamic categories extracted from Supabase project list
  const categories = useMemo(() => {
    const cats = new Set<string>();
    cats.add("ALL");
    rawProjects.forEach((p) => {
      if (p.category && p.category.trim()) {
        cats.add(p.category.trim());
      }
    });
    return Array.from(cats);
  }, [rawProjects]);

  // Dynamic filter by search query & category
  const filteredProjects = useMemo(() => {
    return rawProjects.filter((item) => {
      const matchesSearch =
        searchQuery === "" ||
        item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.tags &&
          item.tags.some((t) =>
            t.toLowerCase().includes(searchQuery.toLowerCase())
          )) ||
        (item.tech &&
          item.tech.some((t) =>
            t.toLowerCase().includes(searchQuery.toLowerCase())
          ));

      const matchesCategory =
        selectedCategory === "ALL" || item.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [rawProjects, searchQuery, selectedCategory]);

  return (
    <div className="space-y-8">
      {/* Header & Controls */}
      <div className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-foreground tracking-tight">
              Engineered Projects
            </h1>
            <p className="text-sm text-secondary mt-1">
              Production infrastructure, backend architectures, and automation systems.
            </p>
          </div>

          {/* View Mode Switcher (Grid / List) */}
          <div className="flex items-center self-start sm:self-auto bg-surface-secondary border border-border rounded-md p-0.5 shrink-0">
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded transition-colors cursor-pointer ${
                viewMode === "grid"
                  ? "bg-surface text-accent shadow-xs border border-border/60"
                  : "text-muted hover:text-foreground"
              }`}
              title="Grid View"
              aria-label="Switch to Grid View"
            >
              <LayoutGrid size={14} />
            </button>
            <button
              type="button"
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded transition-colors cursor-pointer ${
                viewMode === "list"
                  ? "bg-surface text-accent shadow-xs border border-border/60"
                  : "text-muted hover:text-foreground"
              }`}
              title="List View"
              aria-label="Switch to List View"
            >
              <List size={14} />
            </button>
          </div>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects by name, keyword, or technology..."
            className="w-full bg-surface border border-border text-foreground pl-10 pr-10 py-2.5 rounded-md text-sm outline-none placeholder:text-muted"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted hover:text-foreground"
            >
              <X size={15} />
            </button>
          )}
        </div>

        {/* Dynamic Category Filters from Supabase */}
        {categories.length > 1 && (
          <div className="flex items-center gap-2 border-b border-border pb-2 overflow-x-auto">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-md text-xs font-mono whitespace-nowrap transition-colors cursor-pointer ${
                    isSelected
                      ? "bg-surface text-accent border border-border font-semibold"
                      : "text-secondary hover:text-foreground"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Projects Display: Grid or List */}
      {filteredProjects.length === 0 ? (
        <div className="py-12 text-center text-sm text-secondary">
          No projects found matching &ldquo;{searchQuery}&rdquo;.
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((item) => {
            const githubUrl = item.githubUrl || item.link;
            const liveUrl = item.liveUrl || item.url;
            const detailUrl = `/projects/${item.slug || item.id}`;

            return (
              <article
                key={item.id}
                className="group flex flex-col rounded-xl border border-border bg-surface hover:border-accent/50 transition-all duration-300 overflow-hidden shadow-xs hover:shadow-md"
              >
                {/* Project Image Preview */}
                <Link
                  href={detailUrl}
                  className="relative aspect-video w-full overflow-hidden bg-surface-secondary border-b border-border block"
                >
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      unoptimized
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted text-xs font-mono">
                      No Preview Available
                    </div>
                  )}
                  {item.category && (
                    <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-background/85 backdrop-blur-md border border-border/80 text-[10px] font-mono text-foreground font-medium">
                      {item.category}
                    </span>
                  )}
                </Link>

                {/* Card Content Details */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h2 className="text-base font-semibold text-foreground group-hover:text-accent transition-colors">
                      <Link href={detailUrl} className="hover:underline">
                        {item.title}
                      </Link>
                    </h2>
                    <p className="text-xs sm:text-sm text-secondary leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  {/* Tech Stack Pills & Action Links */}
                  <div className="space-y-3.5 pt-1">
                    <div className="flex flex-wrap gap-1.5">
                      {(item.tags || item.tech || []).slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded bg-surface-secondary text-[10px] font-mono text-muted"
                        >
                          {tech}
                        </span>
                      ))}
                      {(item.tags || item.tech || []).length > 4 && (
                        <span className="px-1.5 py-0.5 text-[10px] font-mono text-muted">
                          +{(item.tags || item.tech || []).length - 4}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-border text-xs font-mono">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setSelectedProject(item)}
                          className="text-secondary hover:text-foreground cursor-pointer transition-colors"
                        >
                          Quick View
                        </button>
                        <span className="text-border">·</span>
                        <Link
                          href={detailUrl}
                          className="text-foreground hover:text-accent font-medium inline-flex items-center gap-1 transition-colors"
                        >
                          <span>Page</span>
                          <ArrowUpRight size={12} />
                        </Link>
                      </div>

                      <div className="flex items-center gap-2.5">
                        {githubUrl && (
                          <a
                            href={githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-secondary hover:text-foreground inline-flex items-center gap-1 transition-colors"
                            title="GitHub Repository"
                          >
                            <Github size={13} />
                          </a>
                        )}
                        {liveUrl && (
                          <a
                            href={liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-accent hover:underline inline-flex items-center gap-1 transition-colors"
                            title="Live Production"
                          >
                            <ExternalLink size={13} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        /* List Layout View (Clean Row Format with Thumbnails, Zero Numbers) */
        <div className="divide-y divide-border">
          {filteredProjects.map((item) => {
            const githubUrl = item.githubUrl || item.link;
            const liveUrl = item.liveUrl || item.url;
            const detailUrl = `/projects/${item.slug || item.id}`;

            return (
              <article
                key={item.id}
                className="py-5 first:pt-0 last:pb-0 flex flex-col sm:flex-row gap-4 sm:gap-5 items-start group"
              >
                {/* Thumbnail Preview */}
                {item.image && (
                  <Link
                    href={detailUrl}
                    className="relative w-full sm:w-44 aspect-video rounded-lg overflow-hidden border border-border bg-surface-secondary shrink-0 group-hover:border-accent/50 transition-colors block"
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, 176px"
                      unoptimized
                    />
                  </Link>
                )}

                {/* Core Info */}
                <div className="space-y-2 flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2
                      onClick={() => setSelectedProject(item)}
                      className="text-base font-semibold text-foreground hover:text-accent transition-colors cursor-pointer"
                    >
                      {item.title}
                    </h2>
                    {item.category && (
                      <span className="text-[10px] font-mono text-muted">
                        [{item.category}]
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-secondary leading-relaxed max-w-2xl">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-0.5">
                    {(item.tags || item.tech || []).slice(0, 5).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded bg-surface-secondary text-[10px] font-mono text-muted"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-3 text-xs font-mono self-start sm:self-center shrink-0 pt-1">
                  <button
                    onClick={() => setSelectedProject(item)}
                    className="text-secondary hover:text-foreground transition-colors cursor-pointer"
                  >
                    Quick View
                  </button>

                  <Link
                    href={detailUrl}
                    className="text-accent hover:underline inline-flex items-center gap-1 transition-colors"
                  >
                    <span>Page</span>
                    <ArrowUpRight size={12} />
                  </Link>

                  {githubUrl && (
                    <a
                      href={githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-secondary hover:text-foreground inline-flex items-center gap-1 transition-colors"
                      title="GitHub Repository"
                    >
                      <Github size={13} />
                    </a>
                  )}

                  {liveUrl && (
                    <a
                      href={liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:underline inline-flex items-center gap-1 transition-colors"
                      title="Live Production"
                    >
                      <ExternalLink size={13} />
                    </a>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-black/70 p-4 flex items-center justify-center">
          <div className="bg-surface border border-border rounded-lg max-w-2xl w-full p-6 space-y-5 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 pb-3 border-b border-border">
              <div>
                <span className="text-xs font-mono text-accent">
                  {selectedProject.category || "Project Spec"}
                </span>
                <h2 className="text-lg font-semibold text-foreground mt-0.5">
                  {selectedProject.title}
                </h2>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="p-1.5 rounded-md hover:bg-surface-secondary text-secondary hover:text-foreground cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Image (if any) */}
            {selectedProject.image && (
              <div className="relative aspect-video w-full rounded-md overflow-hidden border border-border bg-background">
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
              <h3 className="text-xs font-mono font-semibold uppercase text-muted">
                Overview
              </h3>
              <p className="text-secondary leading-relaxed">
                {selectedProject.longDescription || selectedProject.description}
              </p>
            </div>

            {/* Challenges & Solutions */}
            {selectedProject.challenges && selectedProject.challenges.length > 0 && (
              <div className="space-y-1.5 text-sm">
                <h3 className="text-xs font-mono font-semibold uppercase text-muted">
                  Challenges & Architecture
                </h3>
                <ul className="space-y-1 text-xs text-secondary list-disc list-inside">
                  {selectedProject.challenges.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>
            )}

            {selectedProject.solutions && selectedProject.solutions.length > 0 && (
              <div className="space-y-1.5 text-sm">
                <h3 className="text-xs font-mono font-semibold uppercase text-accent">
                  Engineering Solutions
                </h3>
                <ul className="space-y-1 text-xs text-secondary list-disc list-inside">
                  {selectedProject.solutions.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tech Stack */}
            <div className="space-y-1.5 text-xs font-mono">
              <h3 className="text-xs font-mono font-semibold uppercase text-muted">
                Stack
              </h3>
              <p className="text-secondary">
                {(selectedProject.tags || selectedProject.tech || []).join(" · ")}
              </p>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-wrap items-center justify-end gap-3 pt-3 border-t border-border">
              <button
                onClick={() => setSelectedProject(null)}
                className="px-3 py-2 rounded-md bg-surface-secondary hover:bg-border text-secondary text-xs font-mono cursor-pointer"
              >
                Close
              </button>

              <Link
                href={`/projects/${selectedProject.slug || selectedProject.id}`}
                className="px-3 py-2 rounded-md bg-surface-secondary hover:bg-border text-foreground text-xs font-mono inline-flex items-center gap-1.5 transition-colors"
              >
                <FileText size={13} />
                <span>Full Project Page</span>
                <ArrowUpRight size={13} />
              </Link>

              {(selectedProject.githubUrl || selectedProject.link) && (
                <a
                  href={selectedProject.githubUrl || selectedProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 rounded-md bg-surface-secondary hover:bg-border text-foreground text-xs font-mono inline-flex items-center gap-1.5"
                >
                  <Github size={13} />
                  <span>GitHub</span>
                  <ArrowUpRight size={13} />
                </a>
              )}

              {(selectedProject.liveUrl || selectedProject.url) && (
                <a
                  href={selectedProject.liveUrl || selectedProject.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-md bg-accent hover:bg-accent-hover text-accent-text text-xs font-mono font-semibold inline-flex items-center gap-1.5"
                >
                  <span>Live Production</span>
                  <ExternalLink size={13} />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
