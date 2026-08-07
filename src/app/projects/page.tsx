"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, ChevronLeft, ChevronRight, Search, X } from "lucide-react";
import { PROJECTS } from "@/data/projects";

const ITEMS_PER_PAGE = 6;

export default function AllProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const categories = [
    "ALL",
    ...Array.from(new Set(PROJECTS.map((p) => p.category))),
  ];

  const filteredProjects = PROJECTS.filter((p) => {
    const matchesCat = selectedCategory === "ALL" || p.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    if (!q) return matchesCat;

    const matchesTitle = p.title.toLowerCase().includes(q);
    const matchesDesc = p.description.toLowerCase().includes(q);
    const matchesClient = (p.client || "").toLowerCase().includes(q);
    const matchesCategory = p.category.toLowerCase().includes(q);
    const matchesTech = (p.tech || []).some((t) => t.toLowerCase().includes(q));

    return matchesCat && (matchesTitle || matchesDesc || matchesClient || matchesCategory || matchesTech);
  });

  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE) || 1;
  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="min-h-screen bg-background text-foreground pt-14 sm:pt-20 pb-12 sm:pb-16 px-2 sm:px-4">
      <div className="max-w-7xl mx-auto border-x border-line">
        {/* Top Header Panel */}
        <div className="screen-line-top screen-line-bottom p-3.5 sm:p-6 border-b border-line bg-muted/10 space-y-3">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={14} />
            <span>BACK TO OVERVIEW</span>
          </Link>

          <div>
            <div className="text-[11px] font-mono text-muted-foreground uppercase tracking-widest mb-1">
              FULL PROJECT ARCHIVE ({filteredProjects.length})
            </div>
            <h1 className="text-xl sm:text-4xl font-bold font-sans tracking-tight text-foreground">
              Cloud Infrastructure & <span className="text-muted-foreground">DevOps Works</span>
            </h1>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-3 sm:p-4 border-b border-line bg-background flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 font-mono text-xs">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 [scrollbar-width:none] shrink-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-3 py-1 rounded-full border border-line text-xs font-mono transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-[#48b685] text-[#19131a] border-[#48b685] font-semibold"
                    : "bg-muted/40 text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground size-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Filter by title, stack..."
              className="w-full pl-8 pr-8 py-1.5 bg-muted/20 border border-line rounded-lg text-xs font-mono text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground/40 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setCurrentPage(1);
                }}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
              >
                <X size={12} />
              </button>
            )}
          </div>
        </div>

        {/* Projects Cards 3-Column Grid */}
        <div className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 border-b border-line bg-background">
          {paginatedProjects.map((project, idx) => {
            const fallbackImages = [
              "https://images.unsplash.com/photo-1667372335854-c072b9886360?q=80&w=1200&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=1200&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=1200&auto=format&fit=crop",
            ];
            const imgSrc = (project.image && (project.image.startsWith("http") || project.image.startsWith("/"))) ? project.image : fallbackImages[idx % fallbackImages.length];

            return (
              <Link
                key={project.id}
                href={project.link || project.url || "#"}
                target={project.link || project.url ? "_blank" : "_self"}
                className="group rounded-xl border border-line bg-[#19131a] p-4 hover:border-[#48b685] transition-all flex flex-col justify-between space-y-3.5 shadow-sm"
              >
                <div className="space-y-2.5">
                  {/* Image Showcase */}
                  <div className="relative aspect-[16/10] w-full rounded-lg overflow-hidden border border-line bg-black/40 group-hover:border-[#48b685]/40 transition-colors">
                    <Image
                      src={imgSrc}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                      unoptimized
                    />
                    <div className="scanline-overlay absolute inset-0 pointer-events-none" />
                    <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded border border-[#48b685]/30 bg-[#2f1e2e]/90 text-[10px] font-mono text-[#48b685] font-bold shadow-sm">
                      {project.category}
                    </div>
                  </div>

                {/* Details */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-sans font-bold text-sm text-foreground group-hover:underline line-clamp-1">
                      {project.title}
                    </h3>
                    <ArrowUpRight size={14} className="text-muted-foreground group-hover:text-foreground shrink-0" />
                  </div>
                  <p className="font-sans text-xs text-muted-foreground leading-relaxed line-clamp-2">
                    {project.description}
                  </p>
                </div>
              </div>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-1 pt-1 border-t border-line font-mono text-[10px]">
                {(project.tech || []).map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded border border-line bg-muted/20 text-muted-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </Link>
          );
        })}
        </div>

        {/* Pagination Bar */}
        {totalPages > 1 && (
          <div className="p-4 border-b border-line bg-background flex items-center justify-center gap-2 font-mono text-xs">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-1.5 rounded border border-line bg-muted text-foreground disabled:opacity-30 disabled:cursor-not-allowed hover:bg-muted/80 cursor-pointer"
            >
              <ChevronLeft size={14} />
            </button>

            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }).map((_, idx) => {
                const pageNum = idx + 1;
                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`size-7 rounded border border-line font-mono text-xs flex items-center justify-center transition-colors cursor-pointer ${
                      currentPage === pageNum
                        ? "bg-foreground text-background font-bold"
                        : "bg-muted/30 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded border border-line bg-muted text-foreground disabled:opacity-30 disabled:cursor-not-allowed hover:bg-muted/80 cursor-pointer"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
