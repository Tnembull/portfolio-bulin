"use client";

import { useState } from "react";
import Link from "next/link";
import { usePortfolio } from "@/context/PortfolioContext";
import { PROJECTS as INITIAL_PROJECTS, Project } from "@/data/projects";
import { ArrowUpRight, FolderKanban, ExternalLink, RotateCcw } from "lucide-react";

interface ProjectsProps {
  featuredOnly?: boolean;
}

export default function Projects({ featuredOnly = false }: ProjectsProps = {}) {
  const { state } = usePortfolio();
  const { projects } = state;
  const rawItems: Project[] =
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
        item.category?.toLowerCase().includes("api") ||
        item.category?.toLowerCase().includes("database")
      );
    if (selectedCategory === "DEVOPS & CLOUD")
      return (
        item.category?.toLowerCase().includes("devops") ||
        item.category?.toLowerCase().includes("cloud") ||
        item.category?.toLowerCase().includes("k8s") ||
        item.category?.toLowerCase().includes("kubernetes") ||
        item.category?.toLowerCase().includes("infra")
      );
    if (selectedCategory === "AUTOMATION")
      return (
        item.category?.toLowerCase().includes("auto") ||
        item.category?.toLowerCase().includes("script") ||
        item.category?.toLowerCase().includes("ci") ||
        item.category?.toLowerCase().includes("gitops")
      );
    return true;
  });

  const featuredItems = filteredItems.filter((item) => item.featured !== false);
  const itemsToDisplay = featuredOnly
    ? (featuredItems.length >= 3 ? featuredItems : filteredItems).slice(0, 3)
    : filteredItems;

  const rawBadge = projects?.sectionBadge || "FEATURED WORK";
  const cleanBadge = rawBadge.replace(/^(\/\/\s*|\d+\.\s*)*/i, "");

  return (
    <section id="projects" className="w-full bg-[#0b0e12] py-16 sm:py-24 border-b border-[#303235]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-[#303235] gap-4">
          <div>
            <p className="font-mono text-xs tracking-[0.064em] text-[#00d892] uppercase mb-2">
              {cleanBadge}
            </p>
            <h2 className="text-2xl sm:text-4xl font-normal font-sans text-[#dedede] tracking-[-0.003em]">
              {projects?.titleMain || "Infrastructure &"} {projects?.titleHighlight || "Systems"}
            </h2>
          </div>

          {/* Category Filter Tags */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`font-mono text-[11px] tracking-[0.053em] uppercase px-3 py-1.5 rounded-[1px] border transition-all cursor-pointer ${
                    isSelected
                      ? "bg-[#002923] text-[#00d892] border-[#00d892] font-normal shadow-sm"
                      : "bg-[#181a1d] text-[#818284] border-[#303235] hover:text-[#dedede] hover:border-[#bababb]"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Technical Row List */}
        {itemsToDisplay.length === 0 ? (
          <div className="py-16 text-center space-y-4 border border-[#303235] bg-[#14171b] rounded-[1px] p-8">
            <FolderKanban className="w-8 h-8 text-[#818284] mx-auto opacity-50" />
            <p className="font-mono text-xs text-[#818284] uppercase">
              No matching systems found in category &ldquo;{selectedCategory}&rdquo;
            </p>
            <button
              onClick={() => setSelectedCategory("ALL")}
              className="oxide-button-ghost inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono"
            >
              <RotateCcw size={12} />
              <span>RESET CATEGORY FILTER</span>
            </button>
          </div>
        ) : (
          <div className="divide-y divide-[#303235]">
            {itemsToDisplay.map((proj, idx) => {
              const techList = proj.tech || proj.tags || [];
              const projectLink = proj.link || proj.url || proj.githubUrl || proj.liveUrl;
              const detailUrl = proj.slug ? `/projects/${proj.slug}` : undefined;

              return (
                <div
                  key={proj.id || idx}
                  className="py-8 flex flex-col md:flex-row md:items-start justify-between gap-6 group transition-all hover:bg-[#181a1d]/40 px-3 -mx-3 rounded-[1px]"
                >
                  <div className="space-y-3 max-w-4xl">
                    {/* Title & Plain Text Category Label */}
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="font-sans font-normal text-[#dedede] text-xl group-hover:text-[#00d892] transition-colors">
                        {detailUrl ? (
                          <Link href={detailUrl} className="hover:text-[#00d892] transition-colors">
                            {proj.title}
                          </Link>
                        ) : projectLink ? (
                          <a
                            href={projectLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-[#00d892] transition-colors"
                          >
                            {proj.title}
                          </a>
                        ) : (
                          proj.title
                        )}
                      </h3>
                      {proj.category && (
                        <span className="font-mono text-[11px] tracking-[0.058em] text-[#00d892] uppercase">
                          [{proj.category}]
                        </span>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-[#bababb] text-sm leading-[1.42] font-normal">
                      {proj.description}
                    </p>

                    {/* Tech stack tags */}
                    {techList.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-1">
                        {techList.map((t, tIdx) => (
                          <span
                            key={tIdx}
                            className="font-mono text-[11px] px-2 py-0.5 bg-[#181a1d] border border-[#303235] text-[#818284] group-hover:text-[#bababb] rounded-[1px] transition-colors"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* System Action Links */}
                  <div className="shrink-0 flex items-center gap-2 md:pt-1">
                    {detailUrl && (
                      <Link
                        href={detailUrl}
                        className="oxide-button-ghost inline-flex items-center gap-1.5 px-3 py-1.5 text-xs"
                      >
                        <span>DETAILS</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#00d892]" />
                      </Link>
                    )}
                    {projectLink && (
                      <a
                        href={projectLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="oxide-button-filled inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs"
                      >
                        <span>VIEW SYSTEM</span>
                        <ExternalLink className="w-3.5 h-3.5 text-[#00d892]" />
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Bottom Link for Home Page */}
        {featuredOnly && (
          <div className="pt-10 border-t border-[#303235]">
            <Link
              href="/projects"
              className="oxide-button-filled inline-flex items-center gap-2 px-5 py-3 hover:shadow-lg transition-all"
            >
              <span>VIEW FULL SYSTEMS CATALOG ({rawItems.length} PROJECTS)</span>
              <ArrowUpRight className="w-4 h-4 text-[#00d892]" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
