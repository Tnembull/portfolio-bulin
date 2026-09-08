"use client";

import React, { useState } from "react";
import { LucideIcon, ArrowRight, FolderKanban, Building2, Briefcase, Award, Cpu, Search } from "lucide-react";
import { PortfolioState } from "@/context/PortfolioContext";

interface MenuItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface OverviewEditorProps {
  items: MenuItem[];
  onSelectTab: (tab: string) => void;
  state: PortfolioState;
}

export default function OverviewEditor({ items, onSelectTab, state }: OverviewEditorProps) {
  const [selectedFilter, setSelectedFilter] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  // Numerical metrics
  const totalProjects = state.projects?.items?.length || 0;
  const totalClients = state.clients?.items?.length || 0;
  const totalExperience = state.experience?.items?.length || 0;
  const totalCertificates = state.awards?.length || 0;
  const totalBadges = state.badges?.length || 0;
  const totalTools = state.tools?.items?.length || 0;
  const totalSkills = state.skills?.items?.length || 0;

  // Helper to get real-time summary text for each module
  const getModuleSummary = (id: string): { count: string; subtitle: string } => {
    switch (id) {
      case "hero":
        return {
          count: state.hero?.name ? "Active" : "Empty",
          subtitle: state.hero?.role || "DevOps & Backend Engineer",
        };
      case "about":
        return {
          count: `${state.about?.highlights?.length || 0} Highlights`,
          subtitle: `${state.about?.values?.length || 0} Core Principles`,
        };
      case "experience":
        return {
          count: `${totalExperience} Karir`,
          subtitle: totalExperience > 0 ? `${state.experience.items[0]?.role || "Posisi Terakhir"}` : "Belum ada entri",
        };
      case "education":
        return {
          count: `${state.education?.items?.length || 0} Pendidikan`,
          subtitle: state.education?.items?.[0]?.institution || "Riwayat Akademik",
        };
      case "skills":
        return {
          count: `${totalSkills} Skills`,
          subtitle: "Arsitektur & Keahlian",
        };
      case "tools":
        return {
          count: `${totalTools} Tools`,
          subtitle: "DevOps & Cloud Stack",
        };
      case "process":
        return {
          count: `${state.process?.items?.length || 0} Phases`,
          subtitle: "Engineering Workflow",
        };
      case "projects":
        return {
          count: `${totalProjects} Proyek`,
          subtitle: totalProjects > 0 ? `${state.projects.items[0]?.title}` : "Belum ada proyek",
        };
      case "music":
        return {
          count: state.music?.enabled ? "Aktif" : "Muted",
          subtitle: state.music?.title || "Audio Background Player",
        };
      case "stats":
        return {
          count: `${state.stats?.length || 0} SLA`,
          subtitle: "Uptime & Metrics SLA",
        };
      case "github":
        return {
          count: `@${state.github?.username || "Tnembull"}`,
          subtitle: "GitHub Open Source Sync",
        };
      case "faq":
        return {
          count: `${state.faq?.items?.length || 0} FAQ`,
          subtitle: "Pertanyaan & Jawaban",
        };
      case "awards":
        return {
          count: `${totalCertificates} Sertifikat`,
          subtitle: "Lisensi & Akreditasi Resmi",
        };
      case "testimonials":
        return {
          count: `${state.testimonials?.items?.length || 0} Ulasan`,
          subtitle: "Endorsements & Rekomendasi",
        };
      case "cta":
        return {
          count: "Active",
          subtitle: state.cta?.email || "Saluran Komunikasi",
        };
      case "pipeline":
        return {
          count: `${state.pipeline?.length || 0} Stages`,
          subtitle: "CI/CD Deployment Pipeline",
        };
      case "progress":
        return {
          count: `${state.progress?.length || 0} Goals`,
          subtitle: "Learning & Certification Track",
        };
      case "badges":
        return {
          count: `${totalBadges} Badges`,
          subtitle: "Credly Digital Badges",
        };
      case "clients":
        return {
          count: `${totalClients} Klien`,
          subtitle: "Organisasi & Rekanan",
        };
      case "seo":
        return {
          count: "Ready",
          subtitle: state.seo?.metaTitle || "SEO, OG Meta & Analytics",
        };
      default:
        return { count: "Module", subtitle: "Kelola data modul" };
    }
  };

  // Categorization
  const getCategory = (id: string): string => {
    if (["hero", "about", "cta"].includes(id)) return "PROFILE";
    if (["experience", "education", "awards", "badges", "clients"].includes(id)) return "EXPERIENCE & CLIENTS";
    if (["projects", "tools", "skills", "process", "pipeline", "progress"].includes(id)) return "PROJECTS & TECH";
    return "SYSTEM & MEDIA";
  };

  const categories = ["ALL", "PROFILE", "EXPERIENCE & CLIENTS", "PROJECTS & TECH", "SYSTEM & MEDIA"];

  const filteredItems = items.filter((item) => {
    const matchesFilter = selectedFilter === "ALL" || getCategory(item.id) === selectedFilter;
    const matchesSearch =
      item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      getModuleSummary(item.id).count.toLowerCase().includes(searchQuery.toLowerCase()) ||
      getModuleSummary(item.id).subtitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="w-full space-y-5 sm:space-y-7 font-sans">
      {/* 1. Header Banner - Responsive from 320px */}
      <div className="p-3.5 sm:p-6 md:p-7 rounded-xl sm:rounded-2xl border border-border bg-surface shadow-xs space-y-2.5 sm:space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 sm:gap-3">
          <div className="space-y-1 min-w-0">
            <span className="text-[10px] sm:text-[11px] font-mono text-accent font-bold uppercase tracking-wider block">
              [ EXECUTIVE CONTROL CENTER ]
            </span>
            <h1 className="text-lg sm:text-2xl md:text-3xl font-bold text-foreground tracking-tight break-words">
              Pusat Kontrol & Metrik Portofolio
            </h1>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md sm:rounded-lg border border-border bg-surface-secondary text-[10px] sm:text-xs font-mono text-foreground shrink-0 self-start">
            <span className="size-1.5 rounded-full bg-accent animate-pulse" />
            <span className="font-semibold whitespace-nowrap">Supabase: Online</span>
          </div>
        </div>
        <p className="text-xs sm:text-sm text-secondary leading-relaxed max-w-3xl">
          Pantau ringkasan metrik real-time dan kelola 20 modul portofolio Anda secara terpusat. Setiap perubahan tersinkronisasi otomatis.
        </p>
      </div>

      {/* 2. Numerical KPI Counters Bar - Fitted for 320px+ */}
      <div className="space-y-2.5">
        <h2 className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-muted font-bold">
          METRIK UTAMA (REAL-TIME KPIS)
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3.5">
          {/* Projects Metric */}
          <div
            onClick={() => onSelectTab("projects")}
            className="p-2.5 sm:p-4 rounded-lg sm:rounded-xl border border-border bg-surface hover:border-accent/50 hover:bg-surface-secondary transition-all cursor-pointer group shadow-xs min-w-0"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] sm:text-[11px] font-mono text-secondary uppercase font-semibold truncate mr-1">
                Projects
              </span>
              <div className="size-6 sm:size-7 rounded-md bg-accent/10 border border-accent/30 flex items-center justify-center text-accent group-hover:scale-110 transition-transform shrink-0">
                <FolderKanban size={13} className="sm:w-3.5 sm:h-3.5" />
              </div>
            </div>
            <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-foreground tracking-tight font-mono">
              {totalProjects}
            </div>
            <p className="text-[10px] sm:text-[11px] text-secondary mt-0.5 truncate">
              {totalProjects > 0 ? "Active Builds" : "Kosong"}
            </p>
          </div>

          {/* Clients Metric */}
          <div
            onClick={() => onSelectTab("clients")}
            className="p-2.5 sm:p-4 rounded-lg sm:rounded-xl border border-border bg-surface hover:border-accent/50 hover:bg-surface-secondary transition-all cursor-pointer group shadow-xs min-w-0"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] sm:text-[11px] font-mono text-secondary uppercase font-semibold truncate mr-1">
                Clients
              </span>
              <div className="size-6 sm:size-7 rounded-md bg-accent/10 border border-accent/30 flex items-center justify-center text-accent group-hover:scale-110 transition-transform shrink-0">
                <Building2 size={13} className="sm:w-3.5 sm:h-3.5" />
              </div>
            </div>
            <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-foreground tracking-tight font-mono">
              {totalClients}
            </div>
            <p className="text-[10px] sm:text-[11px] text-secondary mt-0.5 truncate">
              {totalClients > 0 ? "Partners" : "Kosong"}
            </p>
          </div>

          {/* Experience Metric */}
          <div
            onClick={() => onSelectTab("experience")}
            className="p-2.5 sm:p-4 rounded-lg sm:rounded-xl border border-border bg-surface hover:border-accent/50 hover:bg-surface-secondary transition-all cursor-pointer group shadow-xs min-w-0"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] sm:text-[11px] font-mono text-secondary uppercase font-semibold truncate mr-1">
                Experience
              </span>
              <div className="size-6 sm:size-7 rounded-md bg-accent/10 border border-accent/30 flex items-center justify-center text-accent group-hover:scale-110 transition-transform shrink-0">
                <Briefcase size={13} className="sm:w-3.5 sm:h-3.5" />
              </div>
            </div>
            <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-foreground tracking-tight font-mono">
              {totalExperience}
            </div>
            <p className="text-[10px] sm:text-[11px] text-secondary mt-0.5 truncate">
              Milestones
            </p>
          </div>

          {/* Credentials Metric */}
          <div
            onClick={() => onSelectTab("awards")}
            className="p-2.5 sm:p-4 rounded-lg sm:rounded-xl border border-border bg-surface hover:border-accent/50 hover:bg-surface-secondary transition-all cursor-pointer group shadow-xs min-w-0"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] sm:text-[11px] font-mono text-secondary uppercase font-semibold truncate mr-1">
                Credentials
              </span>
              <div className="size-6 sm:size-7 rounded-md bg-accent/10 border border-accent/30 flex items-center justify-center text-accent group-hover:scale-110 transition-transform shrink-0">
                <Award size={13} className="sm:w-3.5 sm:h-3.5" />
              </div>
            </div>
            <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-foreground tracking-tight font-mono">
              {totalCertificates + totalBadges}
            </div>
            <p className="text-[10px] sm:text-[11px] text-secondary mt-0.5 truncate">
              {totalCertificates} Cert · {totalBadges} Badge
            </p>
          </div>

          {/* Tools & Capabilities Metric */}
          <div
            onClick={() => onSelectTab("tools")}
            className="p-2.5 sm:p-4 rounded-lg sm:rounded-xl border border-border bg-surface hover:border-accent/50 hover:bg-surface-secondary transition-all cursor-pointer group shadow-xs col-span-2 sm:col-span-1 min-w-0"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] sm:text-[11px] font-mono text-secondary uppercase font-semibold truncate mr-1">
                Ecosystem
              </span>
              <div className="size-6 sm:size-7 rounded-md bg-accent/10 border border-accent/30 flex items-center justify-center text-accent group-hover:scale-110 transition-transform shrink-0">
                <Cpu size={13} className="sm:w-3.5 sm:h-3.5" />
              </div>
            </div>
            <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-foreground tracking-tight font-mono">
              {totalTools + totalSkills}
            </div>
            <p className="text-[10px] sm:text-[11px] text-secondary mt-0.5 truncate">
              {totalTools} Tool · {totalSkills} Skill
            </p>
          </div>
        </div>
      </div>

      {/* 3. Module Filter & Search Bar - Horizontal Scroll on 320px */}
      <div className="space-y-3.5 pt-1">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2.5 sm:gap-3 border-b border-border pb-3 sm:pb-4">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 md:pb-0 -mx-1 px-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className={`px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-md text-[10px] sm:text-xs font-mono whitespace-nowrap transition-colors cursor-pointer shrink-0 ${
                  selectedFilter === cat
                    ? "bg-surface-secondary text-accent border border-border font-bold shadow-xs"
                    : "text-secondary hover:text-foreground hover:bg-surface-secondary/60 border border-transparent"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-60">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari modul..."
              className="w-full pl-8 pr-3 py-1.5 bg-surface border border-border rounded-md text-xs text-foreground outline-none"
            />
          </div>
        </div>

        {/* 4. Categorized Module Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3.5">
          {filteredItems.map((item) => {
            const Icon = item.icon;
            const summary = getModuleSummary(item.id);

            return (
              <div
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className="p-3 sm:p-4 rounded-lg sm:rounded-xl border border-border bg-surface hover:border-accent hover:bg-surface-secondary transition-all cursor-pointer space-y-2.5 group shadow-xs transform hover:-translate-y-0.5 min-w-0"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="size-8 sm:size-9 rounded-lg border border-border bg-surface-secondary flex items-center justify-center text-accent group-hover:scale-105 group-hover:border-accent/40 transition-all font-bold shrink-0">
                    <Icon size={15} />
                  </div>
                  <div className="flex items-center gap-1 text-[11px] sm:text-xs font-mono text-accent font-semibold truncate">
                    <span className="truncate">{summary.count}</span>
                    <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform shrink-0" />
                  </div>
                </div>

                <div className="space-y-0.5 min-w-0">
                  <h3 className="text-xs sm:text-sm font-bold text-foreground group-hover:text-accent transition-colors truncate">
                    {item.label}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-secondary truncate">
                    {summary.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {filteredItems.length === 0 && (
          <div className="py-10 text-center text-xs sm:text-sm text-secondary border border-border rounded-xl">
            Tidak ada modul yang cocok dengan pencarian &ldquo;{searchQuery}&rdquo;.
          </div>
        )}
      </div>
    </div>
  );
}
