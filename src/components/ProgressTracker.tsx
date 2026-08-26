"use client";

import React, { useState } from "react";
import { LearningProgress } from "@/lib/supabase";

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

const getStatusLabel = (status: LearningProgress["status"]) => {
  switch (status) {
    case "completed":
      return { label: "[COMPLETED]", color: "text-[#00d892]" };
    case "in_progress":
      return { label: "[IN_PROGRESS]", color: "text-[#00d892]" };
    case "planned":
    default:
      return { label: "[PLANNED]", color: "text-[#818284]" };
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
    <section id="progress" className="w-full bg-[#0b0e12] py-16 sm:py-24 border-b border-[#303235] font-mono text-[#bababb]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Oxide Panel Container */}
        <div className="oxide-panel">
          {/* Header Bar */}
          <div className="bg-[#1f2124] border-b border-[#303235] px-4 py-3 flex flex-wrap items-center justify-between gap-3 text-xs">
            <span className="text-[#dedede] font-normal">devops@sys-node:~/learning_spec.sh</span>
            <span className="text-[#818284]">
              ROADMAP AVG: <strong className="text-[#00d892] font-normal">{avgProgress}%</strong>
            </span>
          </div>

          {/* Section Intro & Filter Toolbar */}
          <div className="p-6 border-b border-[#303235] bg-[#181a1d]">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <p className="font-mono text-xs tracking-[0.064em] text-[#00d892] uppercase mb-1">
                  CERTIFICATION ROADMAP
                </p>
                <h2 className="text-2xl sm:text-3xl font-normal text-[#dedede] font-sans tracking-tight">
                  Progress Learning Tracker
                </h2>
                <p className="text-[#818284] text-xs sm:text-sm mt-1 max-w-2xl font-sans leading-[1.38]">
                  Real-time technical learning objectives, active certification targets, and infrastructure study logs.
                </p>
              </div>

              {/* Status Filter Tabs */}
              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <span className="text-xs text-[#818284] mr-1">FILTER:</span>
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
                      className={`px-2.5 py-1 rounded-[1px] text-[11px] font-mono tracking-[0.053em] transition-all border cursor-pointer ${
                        isActive
                          ? "bg-[#002923] text-[#00d892] border-[#002923]"
                          : "bg-[#1f2124] text-[#818284] border-[#303235] hover:text-[#dedede]"
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
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-[#0b0e12]">
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => {
                const statusCfg = getStatusLabel(item.status);
                const asciiBar = renderAsciiProgressBar(item.progress_percent);

                return (
                  <div
                    key={item.id}
                    className="oxide-panel p-5 flex flex-col justify-between hover:border-[#bababb] transition-colors"
                  >
                    <div>
                      {/* Header Row: Provider & Plain Status Label */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-[11px] font-mono text-[#818284]">
                          {item.provider}
                        </span>
                        <span className={`text-[11px] font-mono ${statusCfg.color}`}>
                          {statusCfg.label}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-normal text-[#dedede] hover:text-[#00d892] transition-colors text-base mb-2 font-sans line-clamp-2 leading-snug">
                        {item.title}
                      </h3>

                      {/* Description */}
                      {item.description && (
                        <p className="text-xs text-[#818284] font-sans leading-[1.38] mb-4 line-clamp-3">
                          {item.description}
                        </p>
                      )}
                    </div>

                    {/* Footer & Progress Display */}
                    <div className="pt-4 border-t border-[#303235] font-mono">
                      {/* Target Date & Percentage */}
                      <div className="flex items-center justify-between text-xs text-[#818284] mb-2">
                        <span className="text-[11px]">
                          TARGET: <strong className="text-[#dedede] font-normal">{item.target_date || "TBD"}</strong>
                        </span>
                        <span className="text-[#00d892] font-normal">{item.progress_percent}%</span>
                      </div>

                      {/* ASCII Progress Bar Line */}
                      <div className="text-xs text-[#00d892] font-mono overflow-x-auto select-none py-1 bg-[#181a1d] px-2 rounded-[1px] border border-[#303235] mb-2">
                        {asciiBar}
                      </div>

                      {/* Progress Track */}
                      <div className="w-full bg-[#181a1d] h-1.5 rounded-[1px] overflow-hidden border border-[#303235]">
                        <div
                          className="h-full bg-[#00d892] transition-all duration-500"
                          style={{ width: `${Math.min(100, Math.max(0, item.progress_percent))}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-span-full py-12 text-center text-[#818284] font-mono text-xs border border-dashed border-[#303235] rounded-[1px]">
                NO LEARNING ITEMS MATCHING FILTER &quot;{activeFilter}&quot;.
              </div>
            )}
          </div>

          {/* Footer Bar */}
          <div className="bg-[#1f2124] border-t border-[#303235] px-4 py-2.5 flex flex-wrap items-center justify-between text-[11px] text-[#818284]">
            <span>ACTIVE TARGET CERTIFICATIONS: {displayItems.length}</span>
            <span>UPDATED VIA SUPABASE DATABASE</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProgressTracker;
