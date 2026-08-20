"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePortfolio } from "@/context/PortfolioContext";
import { PROJECTS as INITIAL_PROJECTS, Project } from "@/data/projects";
import { ArrowUpRight, ExternalLink, X, FolderGit2 } from "lucide-react";

interface ProjectsProps {
  featuredOnly?: boolean;
}

export default function Projects({ featuredOnly = false }: ProjectsProps = {}) {
  const { state } = usePortfolio();
  const { projects } = state;
  const rawItems = (projects?.items && projects.items.length >= 3) ? projects.items : INITIAL_PROJECTS;
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = ["ALL", "BACKEND / API", "DEVOPS & CLOUD", "AUTOMATION"];

  const filteredItems = rawItems.filter((item) => {
    if (selectedCategory === "ALL") return true;
    if (selectedCategory === "BACKEND / API") return item.category?.toLowerCase().includes("backend") || item.category?.toLowerCase().includes("api");
    if (selectedCategory === "DEVOPS & CLOUD") return item.category?.toLowerCase().includes("devops") || item.category?.toLowerCase().includes("cloud") || item.category?.toLowerCase().includes("k8s") || item.category?.toLowerCase().includes("infra");
    if (selectedCategory === "AUTOMATION") return item.category?.toLowerCase().includes("auto") || item.category?.toLowerCase().includes("script") || item.category?.toLowerCase().includes("ci");
    return true;
  });

  const featuredItems = filteredItems.filter((item) => item.featured !== false);
  const itemsToDisplay = featuredOnly
    ? (featuredItems.length >= 3 ? featuredItems : filteredItems).slice(0, 3)
    : filteredItems;

  return (
    <section id="projects" className="w-full bg-background py-2 px-2 font-mono text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-x border-line">
        {/* Header */}
        <div className="screen-line-top screen-line-bottom p-4 border-b border-line bg-muted/20 flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="bg-[#48b685]/10 border border-[#48b685]/30 text-[#48b685] px-2.5 py-0.5 rounded-md font-bold text-[10px]">
                {projects.sectionBadge || "06. FEATURED WORK"}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <span className="text-[#48b685] font-normal">const</span>
              <span>{projects.titleMain || "Projects"}</span>
              <span className="text-[#48b685] font-extrabold">
                {projects.titleHighlight || "Vault"}
              </span>
              <span className="text-[#48b685] font-mono text-xs bg-[#48b685]/10 border border-[#48b685]/30 px-2 py-0.5 rounded font-bold">
                [{itemsToDisplay.length} NODES]
              </span>
            </h2>
          </div>

          {/* Interactive Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto [scrollbar-width:none] w-full sm:w-auto pb-1 sm:pb-0 shrink-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg border text-[10px] font-bold tracking-wider transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  selectedCategory === cat
                    ? "bg-[#48b685] text-[#19131a] border-[#48b685] shadow-[0_0_12px_rgba(72,182,133,0.4)]"
                    : "bg-[#2f1e2e] text-[#a392a3] border-[#483145] hover:border-[#48b685]/50 hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 3-Column Cyberpunk Data Vault Cards Grid (Max 3 Items on Landing Page) */}
        <div className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 border-b border-line bg-background">
          {itemsToDisplay.map((proj, idx) => {
            const fallbackImages = [
              "https://images.unsplash.com/photo-1667372335854-c072b9886360?q=80&w=1200&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=1200&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=1200&auto=format&fit=crop",
            ];
            const imgSrc = (proj.image && (proj.image.startsWith("http") || proj.image.startsWith("/"))) ? proj.image : fallbackImages[idx % fallbackImages.length];

            return (
              <div
                key={proj.id || idx}
                onClick={() => setSelectedProject(proj)}
                className="cyber-card group space-y-3 p-3.5 rounded-xl border border-line transition-all shadow-xs cursor-pointer hover:border-[#48b685]"
              >
                {/* Image Frame with Scanline Overlay */}
                <div className="relative aspect-[16/10] w-full rounded-lg overflow-hidden border border-line bg-[#19131a] transition-colors shadow-inner">
                  <Image
                    src={imgSrc}
                    alt={proj.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                    unoptimized
                  />
                  <div className="scanline-overlay absolute inset-0 pointer-events-none" />
                  <div className="absolute top-2.5 left-2.5 font-mono text-[9px] font-bold text-[#48b685] bg-[#2f1e2e]/90 border border-[#48b685]/40 px-2 py-0.5 rounded shadow-sm">
                    NODE_{String(idx + 1).padStart(2, "0")}
                  </div>
                </div>

                {/* Title & Tech Line */}
                <div className="space-y-1.5">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-bold text-sm text-foreground group-hover:text-[#48b685] transition-colors line-clamp-1">
                      {proj.title}
                    </h3>
                    {proj.link && (
                      <a
                        href={proj.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-[#48b685] hover:text-white p-1.5 rounded-md hover:bg-[#48b685]/20 border border-[#48b685]/30 transition-all shrink-0 font-bold"
                        title="View Repository / Link"
                      >
                        <ExternalLink size={13} />
                      </a>
                    )}
                  </div>

                  <p className="text-foreground/80 text-[11px] leading-relaxed line-clamp-2">
                    {proj.description}
                  </p>

                  <div className="flex items-center justify-between font-mono text-xs pt-1 border-t border-line">
                    <span className="text-[#a392a3] text-[10px] uppercase tracking-wider font-semibold">
                      {proj.category || "Backend / Infrastructure"}
                    </span>
                    <span className="text-[9px] font-extrabold text-[#48b685] bg-[#48b685]/10 border border-[#48b685]/30 px-2 py-0.5 rounded">
                      PROD_STABLE
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA to view all projects */}
        <div className="p-4 sm:p-5 border-b border-line bg-muted/10 flex items-center justify-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 bg-[#48b685] text-[#19131a] px-6 py-2.5 rounded-xl font-extrabold text-xs shadow-lg hover:bg-[#48b685]/90 hover:scale-[1.02] transition-all cursor-pointer"
          >
            <span>
              {featuredOnly
                ? "View All Engineering & Infrastructure Projects →"
                : `LIHAT SEMUA PROYEK (${rawItems.length})`}
            </span>
            {!featuredOnly && <ArrowUpRight size={15} />}
          </Link>
        </div>
      </div>

      {/* Expanded Project Detail Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="relative max-w-3xl w-full max-h-[90vh] overflow-y-auto rounded-2xl border border-[#483145] bg-[#2f1e2e] p-4 sm:p-5 space-y-4 sm:space-y-5 shadow-2xl animate-in fade-in zoom-in-95 font-mono"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-line pb-3">
              <div className="flex items-center gap-2 text-[#48b685] text-xs font-bold">
                <FolderGit2 size={18} />
                <span className="uppercase tracking-widest">[ PROJECT_NODE_SPECIFICATION ]</span>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="p-1 rounded-lg border border-line text-foreground/80 hover:text-foreground hover:bg-muted cursor-pointer transition-colors"
                title="Close"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden border border-line bg-black">
                <Image
                  src={(selectedProject.image && (selectedProject.image.startsWith("http") || selectedProject.image.startsWith("/"))) ? selectedProject.image : "https://images.unsplash.com/photo-1667372335854-c072b9886360?q=80&w=1200&auto=format&fit=crop"}
                  alt={selectedProject.title}
                  fill
                  className="object-cover"
                  unoptimized
                />
                <div className="scanline-overlay absolute inset-0 pointer-events-none" />
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-[10px] text-[#f99b15] font-bold uppercase tracking-wider block mb-1">
                    PROJECT TITLE
                  </span>
                  <h3 className="font-bold text-foreground text-lg leading-snug">
                    {selectedProject.title}
                  </h3>
                </div>

                <div>
                  <span className="text-[10px] text-[#a392a3] font-bold uppercase tracking-wider block mb-1">
                    ARCHITECTURE & PURPOSE
                  </span>
                  <p className="text-foreground/90 leading-relaxed text-xs">
                    {selectedProject.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-line flex items-center justify-between">
                  <span className="text-[10px] text-[#a392a3] font-bold">CATEGORY:</span>
                  <span className="font-bold text-[#48b685] uppercase text-[10px]">
                    {selectedProject.category || "Infrastructure & DevOps"}
                  </span>
                </div>
              </div>
            </div>

            {/* Modal Footer Controls */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-line">
              {selectedProject.link && (
                <a
                  href={selectedProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg border border-[#48b685]/50 bg-[#48b685]/20 text-[#48b685] hover:bg-[#48b685]/30 font-bold text-xs flex items-center gap-1.5 transition-all shadow-md"
                >
                  <span>Open Repository / Live System</span>
                  <ExternalLink size={13} />
                </a>
              )}
              <button
                onClick={() => setSelectedProject(null)}
                className="px-4 py-2 rounded-lg border border-line bg-muted/20 hover:bg-muted text-foreground font-bold text-xs cursor-pointer transition-colors"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
