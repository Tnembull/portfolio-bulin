"use client";

import React, { useState, useEffect } from "react";
import { PipelineStage } from "@/lib/supabase";
import {
  X,
  Copy,
  ChevronRight,
  Search,
} from "lucide-react";

interface PipelineWidgetProps {
  stages?: PipelineStage[];
}

const DEFAULT_STAGES: PipelineStage[] = [
  {
    id: "stage-code",
    title: "Code & Static Analysis",
    description: "Automated git commit validation, TypeScript type-checking & ESLint audit",
    status: "success",
    icon_name: "code",
    order_index: 1,
    logs: [
      "[INFO] Initializing CI pipeline runner v3.8.4 on branch main...",
      "[INFO] Repository checkout SHA: 8a4f9b2 (feat: implement pipeline widget)",
      "[INFO] Executing static code analysis (TypeScript v5.8, ESLint v9.2)...",
      "[SUCCESS] src/components/PipelineWidget.tsx passed strict typecheck.",
      "[SUCCESS] 0 lint errors, 0 warnings across 52 source files.",
      "[INFO] Verifying security policy compliance & secret scanning...",
      "[SUCCESS] 0 vulnerabilities or exposed credentials found.",
      "[SUCCESS] Stage 'Code & Static Analysis' completed in 1.4s.",
    ],
  },
  {
    id: "stage-build",
    title: "Docker Image Build",
    description: "Compiling production Next.js assets into multi-stage OCI container image",
    status: "success",
    icon_name: "build",
    order_index: 2,
    logs: [
      "[INFO] Spawning Docker daemon builder (BuildKit v0.12 enabled)...",
      "[INFO] Step 1/7: FROM node:20-alpine AS base",
      "[INFO] Step 3/7: RUN npm run build (Next.js 16.1.6)",
      "[INFO] Creating an optimized production build...",
      "[INFO] Compiled / (SSR & Static) successfully in 12.4s.",
      "[SUCCESS] Image tagged: ghcr.io/tnembull/porto-bulin:v2.4.0",
      "[SUCCESS] Artifact compressed: 134.8 MB container layer.",
      "[SUCCESS] Stage 'Docker Image Build' completed in 16.8s.",
    ],
  },
  {
    id: "stage-test",
    title: "Automated Test Suite",
    description: "Running Jest unit specs & Playwright end-to-end integration matrix",
    status: "success",
    icon_name: "test",
    order_index: 3,
    logs: [
      "[INFO] Initializing headless Chrome test runner environment...",
      "[INFO] Running Jest unit suite (34 test files found)...",
      "[SUCCESS] PASS src/__tests__/PipelineWidget.test.tsx (0.42s)",
      "[SUCCESS] PASS src/__tests__/supabase.test.ts (0.31s)",
      "[INFO] Launching Playwright E2E matrix on Chromium, Firefox & WebKit...",
      "[SUCCESS] 18/18 integration specs passed with 0 retries.",
      "[SUCCESS] Coverage summary: 95.4% statements, 92.1% branches.",
      "[SUCCESS] Stage 'Automated Test Suite' completed in 8.2s.",
    ],
  },
  {
    id: "stage-deploy",
    title: "Production Deployment",
    description: "Zero-downtime rolling deployment to Kubernetes production cluster",
    status: "running",
    icon_name: "deploy",
    order_index: 4,
    logs: [
      "[INFO] Target environment: Production (Cluster: k8s-us-east-1)",
      "[INFO] Applying Kubernetes deployment manifest k8s/production.yaml...",
      "[RUNNING] Provisioning new pod replicas: 2/3 ready...",
      "[INFO] Executing database schema migration script...",
      "[SUCCESS] Migration 004_pipeline_tracker.sql executed seamlessly.",
      "[RUNNING] Performing readiness & liveness HTTP probes (/api/health)...",
      "[RUNNING] Shifted 75% traffic target to new release release-v2.4.0...",
    ],
  },
  {
    id: "stage-monitor",
    title: "Observability & Telemetry",
    description: "Real-time Prometheus metric collection, Grafana dashboards & error tracking",
    status: "idle",
    icon_name: "monitor",
    order_index: 5,
    logs: [
      "[INFO] Telemetry agent configured for OpenTelemetry log ingestion.",
      "[INFO] Awaiting deployment completion signal from Stage 04 (Deploy)...",
      "[INFO] Scheduled synthetic latency ping probes at 10s intervals.",
      "[INFO] Standby mode active - alert thresholds armed.",
    ],
  },
];

const getStatusConfig = (status: PipelineStage["status"]) => {
  switch (status) {
    case "success":
      return {
        label: "[SUCCESS]",
        color: "text-[#00d892]",
        cardBorder: "border-[#303235] hover:border-[#00d892]",
      };
    case "running":
      return {
        label: "[RUNNING]",
        color: "text-[#00d892]",
        cardBorder: "border-[#00d892]/40 hover:border-[#00d892]",
      };
    case "failed":
      return {
        label: "[FAILED]",
        color: "text-[#9f3f53]",
        cardBorder: "border-[#9f3f53]/40 hover:border-[#9f3f53]",
      };
    case "idle":
    default:
      return {
        label: "[IDLE]",
        color: "text-[#818284]",
        cardBorder: "border-[#303235] hover:border-[#bababb]",
      };
  }
};

export default function PipelineWidget({ stages }: PipelineWidgetProps) {
  const pipelineStages =
    stages && stages.length > 0
      ? [...stages].sort((a, b) => a.order_index - b.order_index)
      : DEFAULT_STAGES;

  const [activeModalStage, setActiveModalStage] = useState<PipelineStage | null>(null);
  const [copied, setCopied] = useState(false);
  const [logFilter, setLogFilter] = useState("");
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveModalStage(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleCopyLogs = (logs: string[]) => {
    navigator.clipboard.writeText(logs.join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderLogLine = (line: string, index: number) => {
    let colorClass = "text-[#bababb]";

    if (line.includes("[SUCCESS]")) {
      colorClass = "text-[#00d892]";
    } else if (line.includes("[RUNNING]")) {
      colorClass = "text-[#00d892]";
    } else if (line.includes("[INFO]")) {
      colorClass = "text-[#bababb]";
    } else if (line.includes("[FAIL]") || line.includes("[FAILED]") || line.includes("[ERROR]")) {
      colorClass = "text-[#9f3f53]";
    }

    return (
      <div
        key={index}
        className="flex items-start gap-3 py-1 px-2 hover:bg-[#1f2124] rounded-[1px] transition-colors font-mono text-xs"
      >
        <span className="text-[#818284] select-none w-6 text-right shrink-0">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className={`break-all leading-relaxed ${colorClass}`}>{line}</span>
      </div>
    );
  };

  const successCount = pipelineStages.filter((s) => s.status === "success").length;
  const runningCount = pipelineStages.filter((s) => s.status === "running").length;
  const failedCount = pipelineStages.filter((s) => s.status === "failed").length;

  return (
    <section className="w-full bg-[#0b0e12] py-12 border-b border-[#303235] font-mono text-[#bababb]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Oxide Terminal Panel Container */}
        <div className="oxide-panel">
          {/* Top Bar */}
          <div className="bg-[#1f2124] border-b border-[#303235] px-4 py-3 flex flex-wrap items-center justify-between gap-3 text-xs">
            <span className="text-[#dedede] font-normal">devops@sys-node:~/ci_pipeline</span>

            {/* Status Metrics */}
            <div className="flex items-center gap-4 text-[11px] font-mono">
              <span className="text-[#00d892]">
                {successCount} PASSED
              </span>
              {runningCount > 0 && (
                <span className="text-[#00d892]">
                  {runningCount} ACTIVE
                </span>
              )}
              {failedCount > 0 && (
                <span className="text-[#9f3f53]">
                  {failedCount} FAILED
                </span>
              )}
            </div>
          </div>

          {/* Stepper Node Progress Bar */}
          <div className="p-4 sm:p-6 border-b border-[#303235] bg-[#181a1d]">
            <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="hidden md:block absolute top-1/2 left-6 right-6 h-[1px] bg-[#303235] -translate-y-1/2 -z-0" />

              {pipelineStages.map((stage, idx) => {
                const statusCfg = getStatusConfig(stage.status);
                const isSelected = activeStepIndex === idx;

                return (
                  <button
                    key={stage.id}
                    onClick={() => {
                      setActiveStepIndex(idx);
                      setActiveModalStage(stage);
                    }}
                    className="relative z-10 w-full md:w-auto flex md:flex-col items-center gap-2 text-left md:text-center group cursor-pointer focus:outline-none"
                  >
                    <div
                      className={`relative w-8 h-8 rounded-[1px] border flex items-center justify-center transition-all bg-[#181a1d] text-xs font-mono ${
                        statusCfg.cardBorder
                      } ${isSelected ? "border-[#00d892] bg-[#002923] text-[#00d892]" : "text-[#818284]"}`}
                    >
                      {idx + 1}
                    </div>

                    <div>
                      <span className="text-xs text-[#dedede] group-hover:text-[#00d892] transition-colors block">
                        {stage.title.replace(/^\d+\.\s*/, "")}
                      </span>
                      <span className={`text-[10px] font-mono ${statusCfg.color}`}>
                        {statusCfg.label}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Stage Cards Grid */}
          <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-[#0b0e12]">
            {pipelineStages.map((stage, idx) => {
              const statusCfg = getStatusConfig(stage.status);
              const lastLog = stage.logs?.[stage.logs.length - 1] || "No logs recorded.";

              return (
                <div
                  key={stage.id}
                  onClick={() => setActiveModalStage(stage)}
                  className={`group relative rounded-[1px] border p-4 sm:p-5 transition-all cursor-pointer flex flex-col justify-between ${statusCfg.cardBorder} bg-[#181a1d]`}
                >
                  <div>
                    {/* Card Top Row */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <span className="text-[10px] text-[#818284] uppercase tracking-[0.064em] block">
                          STAGE {idx + 1}
                        </span>
                        <h3 className="text-sm font-normal text-[#dedede] group-hover:text-[#00d892] transition-colors line-clamp-1">
                          {stage.title}
                        </h3>
                      </div>

                      <span className={`text-[11px] font-mono ${statusCfg.color}`}>
                        {statusCfg.label}
                      </span>
                    </div>

                    {/* Description */}
                    {stage.description && (
                      <p className="text-xs text-[#818284] mb-4 line-clamp-2 leading-[1.38] font-sans font-normal">
                        {stage.description}
                      </p>
                    )}
                  </div>

                  {/* Mini Terminal Log Preview Box */}
                  <div>
                    <div className="bg-[#0b0e12] border border-[#303235] rounded-[1px] p-2.5 mb-3 text-[11px] font-mono text-[#818284]">
                      <div className="flex items-center justify-between text-[10px] text-[#818284] border-b border-[#303235] pb-1 mb-1.5">
                        <span>last_log.txt</span>
                        <span>{stage.logs?.length || 0} LINES</span>
                      </div>
                      <p className="truncate text-[#bababb] text-[11px]">{lastLog}</p>
                    </div>

                    {/* Action CTA */}
                    <div className="flex items-center justify-between text-xs text-[#00d892]">
                      <span className="text-xs text-[#bababb] group-hover:text-[#00d892] transition-colors">
                        INSPECT LOGS
                      </span>
                      <ChevronRight className="w-4 h-4 text-[#818284] group-hover:text-[#00d892] transition-colors" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer info bar */}
          <div className="bg-[#1f2124] border-t border-[#303235] px-4 py-2.5 flex flex-wrap items-center justify-between text-[11px] text-[#818284]">
            <span>LIVE WEBHOOK STREAM ACTIVE</span>
            <span>CLICK CARD TO INSPECT REAL-TIME TERMINAL LOGS</span>
          </div>
        </div>
      </div>

      {/* Terminal Log Modal */}
      {activeModalStage && (
        <div
          className="fixed inset-0 z-50 bg-[#0b0e12]/90 flex items-center justify-center p-3 sm:p-6"
          onClick={() => setActiveModalStage(null)}
        >
          <div
            className="w-full max-w-4xl max-h-[85vh] bg-[#181a1d] border border-[#303235] rounded-[1px] shadow-none font-mono flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-[#1f2124] border-b border-[#303235] px-4 py-3 flex items-center justify-between gap-3 shrink-0">
              <span className="text-xs text-[#dedede] truncate uppercase tracking-[0.053em]">
                terminal@stage:{activeModalStage.id} ~ logs
              </span>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => handleCopyLogs(activeModalStage.logs || [])}
                  className="oxide-button-ghost inline-flex items-center gap-1.5 px-2.5 py-1 text-xs"
                  title="Copy logs"
                >
                  {copied ? (
                    <span className="text-[#00d892]">COPIED</span>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#bababb]" />
                      <span>COPY LOGS</span>
                    </>
                  )}
                </button>
                <button
                  onClick={() => setActiveModalStage(null)}
                  className="p-1 rounded-[1px] border border-[#303235] text-[#818284] hover:text-[#dedede] hover:border-[#bababb] transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Subheader */}
            <div className="bg-[#181a1d] border-b border-[#303235] px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs shrink-0">
              <div className="flex items-center gap-2">
                <span className="text-[#818284]">STAGE:</span>
                <span className="text-[#dedede]">{activeModalStage.title}</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative flex items-center">
                  <Search className="w-3.5 h-3.5 absolute left-2 text-[#818284]" />
                  <input
                    type="text"
                    placeholder="Filter logs..."
                    value={logFilter}
                    onChange={(e) => setLogFilter(e.target.value)}
                    className="bg-[#0b0e12] border border-[#303235] rounded-[1px] pl-7 pr-2 py-1 text-xs text-[#dedede] focus:outline-none focus:border-[#00d892] w-36 sm:w-48 font-mono"
                  />
                </div>
                <span className={`text-[11px] font-mono ${getStatusConfig(activeModalStage.status).color}`}>
                  {getStatusConfig(activeModalStage.status).label}
                </span>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-4 bg-[#0b0e12] overflow-y-auto flex-1 font-mono text-xs space-y-0.5 border-b border-[#303235]">
              {activeModalStage.logs && activeModalStage.logs.length > 0 ? (
                activeModalStage.logs
                  .filter((line) => line.toLowerCase().includes(logFilter.toLowerCase()))
                  .map((line, idx) => renderLogLine(line, idx))
              ) : (
                <div className="py-8 text-center text-[#818284]">NO LOG ENTRIES RECORDED FOR THIS STAGE.</div>
              )}
            </div>

            {/* Modal Footer Bar */}
            <div className="bg-[#1f2124] px-4 py-2 flex items-center justify-between text-[11px] text-[#818284] shrink-0">
              <span>TOTAL: {activeModalStage.logs?.length || 0} LINES</span>
              <span>PRESS ESC TO DISMISS</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
