"use client";

import React, { useState, useMemo } from "react";
import { searchTechIcons, POPULAR_TECH_ICONS } from "@/data/techIcons";
import { Search, X, Sparkles, Check, Globe, Code } from "lucide-react";

interface TechIconPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (tech: { name: string; slug: string; iconUrl: string }) => void;
}

const CATEGORY_TABS = [
  { id: "all", label: "Semua" },
  { id: "devops", label: "DevOps & Cloud" },
  { id: "languages", label: "Languages" },
  { id: "frameworks", label: "Frameworks" },
  { id: "database", label: "Database & Cache" },
  { id: "tools", label: "Tools & Analytics" },
];

export default function TechIconPickerModal({
  isOpen,
  onClose,
  onSelect,
}: TechIconPickerModalProps) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const filteredIcons = useMemo(() => {
    return searchTechIcons(query, activeCategory);
  }, [query, activeCategory]);

  if (!isOpen) return null;

  const cleanQuery = query.trim().toLowerCase().replace(/[\s\.]+/g, "");

  const handleImageError = (slug: string) => {
    setFailedImages((prev) => ({ ...prev, [slug]: true }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-2xl max-h-[85vh] flex flex-col rounded-2xl border border-border bg-surface text-foreground shadow-2xl overflow-hidden font-mono"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-surface-secondary">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-accent/10 border border-accent/20 text-accent">
              <Sparkles size={16} />
            </div>
            <div>
              <h3 className="font-extrabold text-sm uppercase tracking-wide text-foreground">
                PILIH LOGO TEKNOLOGI RESMI
              </h3>
              <p className="text-[11px] text-secondary">
                Pilih atau cari logo resmi teknologi untuk portofolio Anda.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-muted hover:text-foreground hover:bg-surface rounded-lg transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Search Input & Category Filters */}
        <div className="p-4 border-b border-border bg-surface-secondary/50 space-y-3">
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
            />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari icon teknologi (contoh: rust, supabase, vue, linux, redis)..."
              className="w-full pl-10 pr-10 py-2.5 bg-surface border border-border focus:border-accent rounded-xl text-foreground placeholder-muted outline-none text-xs"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground cursor-pointer"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-[11px]">
            {CATEGORY_TABS.map((tab) => {
              const isActive = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveCategory(tab.id)}
                  className={`px-3 py-1.5 rounded-lg font-bold shrink-0 transition-all cursor-pointer ${
                    isActive
                      ? "bg-accent text-accent-text"
                      : "bg-surface text-secondary hover:text-foreground border border-border"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Icons Grid Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[50vh]">
          {filteredIcons.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
              {filteredIcons.map((tech) => {
                const isFailed = failedImages[tech.slug];
                return (
                  <button
                    key={tech.slug}
                    type="button"
                    onClick={() => {
                      onSelect({
                        name: tech.name,
                        slug: tech.slug,
                        iconUrl: tech.iconUrl,
                      });
                      onClose();
                    }}
                    className="group flex items-center gap-2.5 p-2.5 rounded-xl border border-border bg-surface hover:bg-surface-secondary hover:border-accent/60 transition-all text-left cursor-pointer shadow-2xs"
                  >
                    <div className="w-8 h-8 rounded-lg bg-surface-secondary border border-border/80 p-1.5 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      {!isFailed ? (
                        <img
                          src={tech.iconUrl}
                          alt={tech.name}
                          className="w-5 h-5 object-contain"
                          onError={() => handleImageError(tech.slug)}
                        />
                      ) : (
                        <Code size={14} className="text-accent" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-semibold text-foreground truncate group-hover:text-accent transition-colors">
                        {tech.name}
                      </div>
                      <div className="text-[10px] text-muted truncate uppercase">
                        {tech.category}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="py-8 text-center space-y-3">
              <p className="text-xs text-muted">
                Tidak ada icon bawaan yang cocok untuk &ldquo;
                <span className="text-foreground font-bold">{query}</span>&rdquo;.
              </p>

              {/* Dynamic Fallback Action */}
              {cleanQuery && (
                <div className="p-4 rounded-xl border border-border bg-surface-secondary max-w-md mx-auto text-left space-y-3">
                  <span className="text-[10px] text-accent font-extrabold uppercase block">
                    + GUNAKAN NAMA KUSTOM & AUTO-FETCH LOGO
                  </span>
                  <p className="text-[11px] text-secondary">
                    Sistem akan mencoba mengambil logo resmi untuk &ldquo;{query}&rdquo; langsung dari CDN.
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        onSelect({
                          name: query,
                          slug: cleanQuery,
                          iconUrl: cleanQuery,
                        });
                        onClose();
                      }}
                      className="flex-1 px-3 py-2 rounded-lg bg-accent text-accent-text font-bold text-xs hover:opacity-90 transition-opacity flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Check size={14} />
                      <span>Gunakan &ldquo;{query}&rdquo;</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-6 py-3 border-t border-border bg-surface-secondary flex items-center justify-between text-[10px] text-muted">
          <span className="flex items-center gap-1">
            <Globe size={12} className="text-accent" />
            Koleksi: {POPULAR_TECH_ICONS.length} Logo Resmi Terverifikasi
          </span>
          <span>Klik salah satu icon untuk memilih</span>
        </div>
      </div>
    </div>
  );
}
