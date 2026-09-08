"use client";

import React, { useState } from "react";
import { LucideIcon, ArrowRight, FolderKanban, Building2, Briefcase, Award, Cpu, ShieldCheck, CheckCircle2, Search } from "lucide-react";
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
          count: `${totalExperience} Riwayat Karir`,
          subtitle: totalExperience > 0 ? `${state.experience.items[0]?.role || "Posisi Terakhir"}` : "Belum ada entri",
        };
      case "education":
        return {
          count: `${state.education?.items?.length || 0} Pendidikan`,
          subtitle: state.education?.items?.[0]?.institution || "Riwayat Akademik",
        };
      case "skills":
        return {
          count: `${totalSkills} Capabilities`,
          subtitle: "Arsitektur & Keahlian",
        };
      case "tools":
        return {
          count: `${totalTools} Tech Tools`,
          subtitle: "DevOps & Infrastructure Stack",
        };
      case "process":
        return {
          count: `${state.process?.items?.length || 0} Tahapan`,
          subtitle: "Workflow & Engineering Flow",
        };
      case "projects":
        return {
          count: `${totalProjects} Proyek`,
          subtitle: totalProjects > 0 ? `${state.projects.items[0]?.title}` : "Belum ada proyek",
        };
      case "music":
        return {
          count: state.music?.enabled ? "Aktif" : "Non-aktif",
          subtitle: state.music?.title || "Audio Background Player",
        };
      case "stats":
        return {
          count: `${state.stats?.length || 0} Metrik SLA`,
          subtitle: "Statistik Uptime & Performance",
        };
      case "github":
        return {
          count: `@${state.github?.username || "Tnembull"}`,
          subtitle: "GitHub Open Source Sync",
        };
      case "faq":
        return {
          count: `${state.faq?.items?.length || 0} Pertanyaan`,
          subtitle: "Frequently Asked Questions",
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
          count: "Get in Touch",
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
          count: `${totalClients} Klien & Rekanan`,
          subtitle: "Organisasi & Kolaborasi",
        };
      case "seo":
        return {
          count: "Configured",
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
    <div className="w-full space-y-8 font-sans">
      {/* 1. Header Banner */}
      <div className="p-6 sm:p-7 rounded-2xl border border-border bg-surface shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <span className="text-[11px] font-mono text-accent font-bold uppercase tracking-wider block">
              [ EXECUTIVE CONTROL CENTER ]
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
              Pusat Kontrol & Metrik Portofolio
            </h1>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-surface-secondary text-xs font-mono text-foreground self-start sm:self-auto">
            <span className="size-2 rounded-full bg-accent animate-pulse" />
            <span className="font-semibold">Supabase Database: Online</span>
          </div>
        </div>
        <p className="text-sm text-secondary leading-relaxed max-w-3xl">
          Pantau ringkasan metrik real-time dan kelola 20 modul portofolio Anda secara terpusat. Setiap perubahan akan langsung tersinkronisasi dengan database produksi.
        </p>
      </div>

      {/* 2. Numerical KPI Counters Bar */}
      <div className="space-y-3">
        <h2 className="text-xs font-mono uppercase tracking-wider text-muted font-bold">
          RINGKASAN METRIK PORTFOLIO (REAL-TIME KPIS)
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
          {/* Projects Metric */}
          <div
            onClick={() => onSelectTab("projects")}
            className="p-4 rounded-xl border border-border bg-surface hover:border-accent/50 hover:bg-surface-secondary transition-all cursor-pointer group shadow-xs"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono text-secondary uppercase font-semibold">Projects</span>
              <div className="size-7 rounded-md bg-accent/10 border border-accent/30 flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                <FolderKanban size={15} />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight font-mono">
              {totalProjects}
            </div>
            <p className="text-[11px] text-secondary mt-1 truncate">
              {totalProjects > 0 ? "Active Builds" : "Belum ada proyek"}
            </p>
          </div>

          {/* Clients Metric */}
          <div
            onClick={() => onSelectTab("clients")}
            className="p-4 rounded-xl border border-border bg-surface hover:border-accent/50 hover:bg-surface-secondary transition-all cursor-pointer group shadow-xs"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono text-secondary uppercase font-semibold">Clients</span>
              <div className="size-7 rounded-md bg-accent/10 border border-accent/30 flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                <Building2 size={15} />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight font-mono">
              {totalClients}
            </div>
            <p className="text-[11px] text-secondary mt-1 truncate">
              {totalClients > 0 ? "Partners & Klien" : "Belum ada klien"}
            </p>
          </div>

          {/* Experience Metric */}
          <div
            onClick={() => onSelectTab("experience")}
            className="p-4 rounded-xl border border-border bg-surface hover:border-accent/50 hover:bg-surface-secondary transition-all cursor-pointer group shadow-xs"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono text-secondary uppercase font-semibold">Experience</span>
              <div className="size-7 rounded-md bg-accent/10 border border-accent/30 flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                <Briefcase size={15} />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight font-mono">
              {totalExperience}
            </div>
            <p className="text-[11px] text-secondary mt-1 truncate">
              Milestones Karir
            </p>
          </div>

          {/* Credentials Metric */}
          <div
            onClick={() => onSelectTab("awards")}
            className="p-4 rounded-xl border border-border bg-surface hover:border-accent/50 hover:bg-surface-secondary transition-all cursor-pointer group shadow-xs"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono text-secondary uppercase font-semibold">Credentials</span>
              <div className="size-7 rounded-md bg-accent/10 border border-accent/30 flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                <Award size={15} />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight font-mono">
              {totalCertificates + totalBadges}
            </div>
            <p className="text-[11px] text-secondary mt-1 truncate">
              {totalCertificates} Sertif · {totalBadges} Badges
            </p>
          </div>

          {/* Tools & Capabilities Metric */}
          <div
            onClick={() => onSelectTab("tools")}
            className="p-4 rounded-xl border border-border bg-surface hover:border-accent/50 hover:bg-surface-secondary transition-all cursor-pointer group shadow-xs col-span-2 sm:col-span-1"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono text-secondary uppercase font-semibold">Tech Ecosystem</span>
              <div className="size-7 rounded-md bg-accent/10 border border-accent/30 flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                <Cpu size={15} />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight font-mono">
              {totalTools + totalSkills}
            </div>
            <p className="text-[11px] text-secondary mt-1 truncate">
              {totalTools} Tools · {totalSkills} Skills
            </p>
          </div>
        </div>
      </div>

      {/* 3. Module Filter & Search Bar */}
      <div className="space-y-4 pt-2">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-border pb-4">
          <div className="flex flex-wrap items-center gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className={`px-3 py-1.5 rounded-md text-xs font-mono transition-colors cursor-pointer ${
                  selectedFilter === cat
                    ? "bg-surface-secondary text-accent border border-border font-bold shadow-xs"
                    : "text-secondary hover:text-foreground hover:bg-surface-secondary/60 border border-transparent"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-64">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari modul atau data..."
              className="w-full pl-9 pr-3 py-1.5 bg-surface border border-border rounded-md text-xs text-foreground outline-none"
            />
          </div>
        </div>

        {/* 4. Categorized Module Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {filteredItems.map((item) => {
            const Icon = item.icon;
            const summary = getModuleSummary(item.id);

            return (
              <div
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className="p-4 rounded-xl border border-border bg-surface hover:border-accent hover:bg-surface-secondary transition-all cursor-pointer space-y-3 group shadow-xs transform hover:-translate-y-0.5"
              >
                <div className="flex items-center justify-between">
                  <div className="size-9 rounded-lg border border-border bg-surface-secondary flex items-center justify-center text-accent group-hover:scale-105 group-hover:border-accent/40 transition-all font-bold">
                    <Icon size={16} />
                  </div>
                  <div className="flex items-center gap-1 text-xs font-mono text-accent font-semibold">
                    <span>{summary.count}</span>
                    <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-foreground group-hover:text-accent transition-colors">
                    {item.label}
                  </h3>
                  <p className="text-xs text-secondary truncate">
                    {summary.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {filteredItems.length === 0 && (
          <div className="py-12 text-center text-sm text-secondary border border-border rounded-xl">
            Tidak ada modul yang cocok dengan pencarian &ldquo;{searchQuery}&rdquo;.
          </div>
        )}
      </div>
    </div>
  );
}
