"use client";

import React, { useState } from "react";
import { LearningProgress } from "@/lib/supabase";
import {
  BookOpen,
  Calendar,
  Award,
  Terminal,
  Filter,
  CheckCircle2,
  Clock,
  Sparkles,
  Layers,
  ChevronRight,
  TrendingUp,
} from "lucide-react";

interface ProgressTrackerProps {
  items?: LearningProgress[];
}

const DEFAULT_PROGRESS_ITEMS: LearningProgress[] = [
  {
    id: "kcna-cert",
    title: "Kubernetes & Cloud Native Associate (KCNA)",
    provider: "Linux Foundation / CNCF",
    progress_percent: 85,
    target_date: "Q4 2026",
    status: "in_progress",
    description:
      "Mastering cloud-native ecosystem fundamentals, container orchestration, Kubernetes architecture, and GitOps delivery pipelines.",
    order_index: 1,
  },
  {
    id: "aws-saa",
    title: "AWS Certified Solutions Architect",
    provider: "Amazon Web Services",
    progress_percent: 60,
    target_date: "Q1 2027",
    status: "in_progress",
    description:
      "Designing resilient, high-performing, cost-optimized, and secure multi-tier cloud architectures on AWS.",
    order_index: 2,
  },
  {
    id: "cka-cert",
    title: "Certified Kubernetes Administrator (CKA)",
    provider: "Linux Foundation",
    progress_percent: 25,
    target_date: "Q2 2027",
    status: "planned",
    description:
      "Hands-on cluster installation, networking configuration, storage volume management, ingress controllers, and troubleshooting.",
    order_index: 3,
  },
];

const renderAsciiProgressBar = (percent: number, length: number = 14) => {
  const safePercent = Math.min(100, Math.max(0, percent));
  const filled = Math.round((safePercent / 100) * length);
  const empty = length - filled;
  return `[${"█".repeat(filled)}${"░".repeat(empty)}] ${safePercent}%`;
};

const getStatusBadge = (status: LearningProgress["status"]) => {
  switch (status) {
    case "completed":
      return {
        label: "COMPLETED",
        chipClass: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
        dotClass: "bg-emerald-400",
        pulse: false,
      };
    case "in_progress":
      return {
        label: "IN_PROGRESS",
        chipClass: "bg-amber-500/10 text-amber-400 border-amber-500/30",
        dotClass: "bg-amber-400",
        pulse: true,
      };
    case "planned":
    default:
      return {
        label: "PLANNED",
        chipClass: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
        dotClass: "bg-cyan-400",
        pulse: false,
      };
  }
};

export function ProgressTracker({ items }: ProgressTrackerProps) {
  const displayItems =
    items && items.length > 0
      ? [...items].sort((a, b) => a.order_index - b.order_index)
      : DEFAULT_PROGRESS_ITEMS;

  const [activeFilter, setActiveFilter] = useState<"ALL" | "IN_PROGRESS" | "PLANNED" | "COMPLETED">("ALL");

  const filteredItems = displayItems.filter((item) => {
    if (activeFilter === "ALL") return true;
    if (activeFilter === "IN_PROGRESS") return item.status === "in_progress";
    if (activeFilter === "PLANNED") return item.status === "planned";
    if (activeFilter === "COMPLETED") return item.status === "completed";
    return true;
  });

  const totalCount = displayItems.length;
  const inProgressCount = displayItems.filter((i) => i.status === "in_progress").length;
  const plannedCount = displayItems.filter((i) => i.status === "planned").length;
  const completedCount = displayItems.filter((i) => i.status === "completed").length;

  const avgProgress =
    totalCount > 0
      ? Math.round(displayItems.reduce((acc, curr) => acc + curr.progress_percent, 0) / totalCount)
      : 0;

  return (
    <section id="progress" className="w-full py-12 px-4 max-w-6xl mx-auto font-mono text-slate-200">
      {/* Outer Monokrom Card Container */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl shadow-2xl overflow-hidden">
        {/* Terminal Header */}
        <div className="bg-slate-900/90 border-b border-slate-800 px-4 py-3 flex flex-wrap items-center justify-between gap-3 select-none">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            </div>
            <div className="h-4 w-px bg-slate-800 mx-1 hidden sm:block" />
            <span className="text-xs text-slate-400 font-semibold flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              devops@porto-bulin:~/learning-tracker.sh
            </span>
          </div>

          <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
            <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
            <span>Overall Roadmap: <strong className="text-cyan-400">{avgProgress}%</strong></span>
          </div>
        </div>

        {/* Section Intro & Filter Toolbar */}
        <div className="p-6 border-b border-slate-800/80 bg-slate-950/60">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-cyan-950/60 border border-cyan-800/50 text-cyan-400 text-xs font-mono mb-2">
                <BookOpen className="w-3.5 h-3.5" /> DevOps & Cloud Certification Roadmap
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight font-sans">
                Progress Learning Tracker
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-2xl font-sans leading-relaxed">
                Real-time technical learning objectives, active certification targets, and infrastructure study logs.
              </p>
            </div>

            {/* Status Filter Chips */}
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <span className="text-xs text-slate-500 font-medium flex items-center gap-1 mr-1">
                <Filter className="w-3 h-3" /> Filter:
              </span>
              {(
                [
                  { id: "ALL", label: "ALL", count: totalCount },
                  { id: "IN_PROGRESS", label: "IN_PROGRESS", count: inProgressCount },
                  { id: "PLANNED", label: "PLANNED", count: plannedCount },
                  { id: "COMPLETED", label: "COMPLETED", count: completedCount },
                ] as const
              ).map((chip) => {
                const isActive = activeFilter === chip.id;
                return (
                  <button
                    key={chip.id}
                    onClick={() => setActiveFilter(chip.id)}
                    className={`px-2.5 py-1 rounded text-xs font-mono font-semibold transition-all border cursor-pointer ${
                      isActive
                        ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-xs"
                        : "bg-slate-900/60 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200"
                    }`}
                  >
                    {chip.label} <span className="opacity-60 text-[10px]">({chip.count})</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-slate-950">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => {
              const statusCfg = getStatusBadge(item.status);
              const asciiBar = renderAsciiProgressBar(item.progress_percent);

              return (
                <div
                  key={item.id}
                  className="bg-slate-900/50 border border-slate-800/90 hover:border-slate-700 rounded-xl p-5 flex flex-col justify-between transition-all duration-200 group hover:bg-slate-900/80 hover:shadow-xl hover:shadow-cyan-950/20"
                >
                  <div>
                    {/* Header Row: Provider & Status Chip */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800 group-hover:border-slate-700 transition-colors">
                        {item.provider}
                      </span>
                      <span
                        className={`text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded border flex items-center gap-1.5 ${statusCfg.chipClass}`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${statusCfg.dotClass} ${
                            statusCfg.pulse ? "animate-pulse" : ""
                          }`}
                        />
                        {statusCfg.label}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-semibold text-slate-100 group-hover:text-cyan-400 transition-colors text-base mb-2 font-sans line-clamp-2 leading-snug">
                      {item.title}
                    </h3>

                    {/* Description */}
                    {item.description && (
                      <p className="text-xs text-slate-400 font-sans leading-relaxed mb-4 line-clamp-3">
                        {item.description}
                      </p>
                    )}
                  </div>

                  {/* Footer & Progress Display */}
                  <div className="pt-4 border-t border-slate-800/80 font-mono">
                    {/* Target Date & Percentage */}
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                      <span className="flex items-center gap-1.5 text-[11px] text-slate-400">
                        <Calendar className="w-3 h-3 text-cyan-400" />
                        Target: <strong className="text-slate-200">{item.target_date || "TBD"}</strong>
                      </span>
                      <span className="text-cyan-400 font-bold">{item.progress_percent}%</span>
                    </div>

                    {/* ASCII Progress Bar Line */}
                    <div className="text-xs text-cyan-400/90 font-mono overflow-x-auto select-none py-1 bg-slate-950 px-2 rounded border border-slate-800/80 mb-2">
                      {asciiBar}
                    </div>

                    {/* CSS Animated Progress Bar Track */}
                    <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800/80 p-0.5">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          item.status === "completed"
                            ? "bg-gradient-to-r from-emerald-500 to-teal-400"
                            : item.status === "in_progress"
                            ? "bg-gradient-to-r from-amber-500 to-cyan-400"
                            : "bg-slate-700"
                        }`}
                        style={{ width: `${Math.min(100, Math.max(0, item.progress_percent))}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full py-12 text-center text-slate-500 font-mono text-sm border border-dashed border-slate-800 rounded-xl">
              No learning items found matching filter &quot;{activeFilter}&quot;.
            </div>
          )}
        </div>

        {/* Terminal Footer Bar */}
        <div className="bg-slate-900/60 border-t border-slate-800/80 px-4 py-2.5 flex flex-wrap items-center justify-between text-[11px] text-slate-400 gap-2 font-mono">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            Active Target Certifications: {displayItems.length}
          </span>
          <span className="text-slate-500">
            Updated dynamically via Supabase database
          </span>
        </div>
      </div>
    </section>
  );
}

export default ProgressTracker;
