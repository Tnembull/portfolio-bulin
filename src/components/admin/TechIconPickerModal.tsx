"use client";

import React, { useState, useMemo } from "react";
import { searchTechIcons, TechIconEntry, POPULAR_TECH_ICONS } from "@/data/techIcons";
import { Search, X, Sparkles, Check, Globe } from "lucide-react";

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

  const filteredIcons = useMemo(() => {
    return searchTechIcons(query, activeCategory);
  }, [query, activeCategory]);

  if (!isOpen) return null;

  const cleanQuery = query.trim().toLowerCase().replace(/[\s\.]+/g, "");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-2xl max-h-[85vh] flex flex-col rounded-2xl border border-[#483145] bg-[#1d141e] text-slate-100 shadow-2xl overflow-hidden font-mono"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#483145] bg-[#261826]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-[#48b685]/10 border border-[#48b685]/20 text-[#48b685]">
              <Sparkles size={16} />
            </div>
            <div>
              <h3 className="font-extrabold text-sm uppercase tracking-wide text-slate-100">
                PILIH LOGO TEKNOLOGI RESMI
              </h3>
              <p className="text-[11px] text-[#a392a3]">
                Pilih atau cari dari koleksi logo resmi Devicon & Simple Icons.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-[#a392a3] hover:text-slate-100 hover:bg-[#483145]/50 rounded-lg transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Search Input & Category Filters */}
        <div className="p-4 border-b border-[#483145] bg-[#19131a] space-y-3">
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#a392a3]"
            />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari icon teknologi (contoh: rust, supabase, vue, linux, redis)..."
              className="w-full pl-10 pr-10 py-2.5 bg-[#2f1e2e] border border-[#483145] focus:border-[#48b685] rounded-xl text-slate-100 placeholder-[#a392a3]/60 outline-none text-xs"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#a392a3] hover:text-slate-100 cursor-pointer"
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
                      ? "bg-[#48b685] text-[#19131a]"
                      : "bg-[#2f1e2e] text-[#a392a3] hover:text-slate-100 border border-[#483145]"
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
              {filteredIcons.map((tech) => (
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
                  className="group flex items-center gap-2.5 p-2.5 rounded-xl border border-[#483145] bg-[#261826]/70 hover:bg-[#2f1e2e] hover:border-[#48b685] transition-all text-left cursor-pointer"
                >
                  <div className="w-7 h-7 rounded-lg bg-white/95 p-1 flex items-center justify-center shrink-0 shadow-xs group-hover:scale-110 transition-transform">
                    <img
                      src={tech.iconUrl}
                      alt={tech.name}
                      className="w-5 h-5 object-contain"
                      loading="lazy"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-bold text-slate-100 truncate group-hover:text-[#48b685] transition-colors">
                      {tech.name}
                    </div>
                    <div className="text-[10px] text-[#a392a3] truncate uppercase">
                      {tech.category}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center space-y-3">
              <p className="text-xs text-[#a392a3]">
                Tidak ada icon bawaan yang cocok untuk &ldquo;
                <span className="text-slate-100 font-bold">{query}</span>&rdquo;.
              </p>

              {/* Dynamic Fallback Action */}
              {cleanQuery && (
                <div className="p-4 rounded-xl border border-[#483145] bg-[#261826] max-w-md mx-auto text-left space-y-3">
                  <span className="text-[10px] text-[#48b685] font-extrabold uppercase block">
                    + GUNAKAN NAMA KUSTOM & AUTO-FETCH LOGO
                  </span>
                  <p className="text-[11px] text-[#a392a3]">
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
                      className="flex-1 px-3 py-2 rounded-lg bg-[#48b685] text-[#19131a] font-bold text-xs hover:opacity-90 transition-opacity flex items-center justify-center gap-1.5 cursor-pointer"
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
        <div className="px-6 py-3 border-t border-[#483145] bg-[#261826] flex items-center justify-between text-[10px] text-[#a392a3]">
          <span className="flex items-center gap-1">
            <Globe size={12} className="text-[#48b685]" />
            Koleksi: {POPULAR_TECH_ICONS.length} Logo Resmi Terverifikasi
          </span>
          <span>Klik salah satu icon untuk memilih</span>
        </div>
      </div>
    </div>
  );
}
