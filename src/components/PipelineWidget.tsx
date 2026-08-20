"use client";

import React, { useState, useEffect } from "react";
import { PipelineStage } from "@/lib/supabase";
import {
  Code,
  Package,
  FlaskConical,
  Rocket,
  Activity,
  CheckCircle2,
  AlertCircle,
  Clock,
  Terminal,
  X,
  Copy,
  Check,
  ChevronRight,
  RefreshCw,
  Search,
  Maximize2,
  ExternalLink,
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

const getStageIcon = (iconName?: string) => {
  switch (iconName?.toLowerCase()) {
    case "code":
      return Code;
    case "build":
    case "package":
      return Package;
    case "test":
      return FlaskConical;
    case "deploy":
    case "rocket":
      return Rocket;
    case "monitor":
    case "activity":
      return Activity;
    default:
      return Terminal;
  }
};

const getStatusConfig = (status: PipelineStage["status"]) => {
  switch (status) {
    case "success":
      return {
        label: "SUCCESS",
        badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
        dot: "bg-emerald-500",
        pulseRing: "bg-emerald-500/40 animate-ping",
        iconColor: "text-emerald-400",
        cardBorder: "border-emerald-500/30 hover:border-emerald-500/60",
        glow: "shadow-emerald-500/5",
      };
    case "running":
      return {
        label: "RUNNING",
        badge: "bg-amber-500/10 text-amber-400 border-amber-500/30",
        dot: "bg-amber-400",
        pulseRing: "bg-amber-400/50 animate-ping",
        iconColor: "text-amber-400",
        cardBorder: "border-amber-500/40 hover:border-amber-500/70",
        glow: "shadow-amber-500/10",
      };
    case "failed":
      return {
        label: "FAILED",
        badge: "bg-rose-500/10 text-rose-400 border-rose-500/30",
        dot: "bg-rose-500",
        pulseRing: "bg-rose-500/50 animate-ping",
        iconColor: "text-rose-400",
        cardBorder: "border-rose-500/40 hover:border-rose-500/70",
        glow: "shadow-rose-500/10",
      };
    case "idle":
    default:
      return {
        label: "IDLE",
        badge: "bg-slate-800/80 text-slate-400 border-slate-700",
        dot: "bg-slate-500",
        pulseRing: "",
        iconColor: "text-slate-400",
        cardBorder: "border-slate-800 hover:border-slate-700",
        glow: "",
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

  // Close modal on Escape key press
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
    let colorClass = "text-slate-300";

    if (line.includes("[SUCCESS]")) {
      colorClass = "text-emerald-400 font-semibold";
    } else if (line.includes("[RUNNING]")) {
      colorClass = "text-amber-400 font-semibold";
    } else if (line.includes("[INFO]")) {
      colorClass = "text-cyan-400";
    } else if (line.includes("[FAIL]") || line.includes("[FAILED]") || line.includes("[ERROR]")) {
      colorClass = "text-rose-400 font-bold";
    } else if (line.startsWith("$") || line.startsWith(">")) {
      colorClass = "text-slate-100 font-bold";
    }

    return (
      <div
        key={index}
        className="flex items-start gap-3 py-1 px-2 rounded hover:bg-slate-900/80 transition-colors font-mono text-xs sm:text-sm"
      >
        <span className="text-slate-600 select-none w-6 text-right shrink-0">
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
    <section className="w-full py-6 font-mono">
      {/* Outer Monokrom Terminal Box */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl shadow-2xl overflow-hidden">
        {/* Top Terminal macOS Control Bar */}
        <div className="bg-slate-900/90 border-b border-slate-800 px-4 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {/* macOS Window Dots */}
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500/90 inline-block shadow-xs" />
              <span className="w-3 h-3 rounded-full bg-amber-500/90 inline-block shadow-xs" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/90 inline-block shadow-xs" />
            </div>
            <div className="h-4 w-px bg-slate-800 mx-1 hidden sm:block" />
            <span className="text-xs text-slate-400 font-semibold flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              devops@porto-bulin:~/pipeline
            </span>
          </div>

          {/* Status Metrics */}
          <div className="flex items-center gap-3 text-[11px] font-mono">
            <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {successCount} PASSED
            </span>
            {runningCount > 0 && (
              <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                {runningCount} ACTIVE
              </span>
            )}
            {failedCount > 0 && (
              <span className="px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/30 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-ping" />
                {failedCount} FAILED
              </span>
            )}
          </div>
        </div>

        {/* Stepper Node Progress Bar (Desktop & Tablet) */}
        <div className="p-4 sm:p-6 border-b border-slate-800/80 bg-slate-950/50">
          <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            {/* Horizontal Line Connector for Desktop */}
            <div className="hidden md:block absolute top-1/2 left-6 right-6 h-0.5 bg-slate-800 -translate-y-1/2 -z-0" />

            {pipelineStages.map((stage, idx) => {
              const IconComp = getStageIcon(stage.icon_name);
              const statusCfg = getStatusConfig(stage.status);
              const isSelected = activeStepIndex === idx;

              return (
                <button
                  key={stage.id}
                  onClick={() => {
                    setActiveStepIndex(idx);
                    setActiveModalStage(stage);
                  }}
                  className="relative z-10 w-full md:w-auto flex md:flex-col items-center gap-3 text-left md:text-center group cursor-pointer focus:outline-none"
                >
                  <div
                    className={`relative w-10 h-10 rounded-lg border flex items-center justify-center transition-all ${
                      statusCfg.cardBorder
                    } ${stage.status === "running" ? "bg-amber-950/30" : "bg-slate-900"} ${
                      isSelected ? "ring-2 ring-emerald-500/50 shadow-lg shadow-emerald-500/10" : ""
                    }`}
                  >
                    {/* Status Dot Ring */}
                    <div className="absolute top-1 right-1 flex items-center justify-center">
                      {statusCfg.pulseRing && (
                        <span className={`absolute w-2.5 h-2.5 rounded-full ${statusCfg.pulseRing}`} />
                      )}
                      <span className={`w-2 h-2 rounded-full ${statusCfg.dot}`} />
                    </div>

                    <IconComp className={`w-4 h-4 ${statusCfg.iconColor}`} />
                  </div>

                  <div>
                    <div className="flex items-center gap-2 md:justify-center">
                      <span className="text-[11px] font-bold text-slate-500">
                        {String(stage.order_index || idx + 1).padStart(2, "0")}.
                      </span>
                      <span className="text-xs font-semibold text-slate-200 group-hover:text-emerald-400 transition-colors">
                        {stage.title.replace(/^\d+\.\s*/, "")}
                      </span>
                    </div>
                    <span
                      className={`inline-block mt-0.5 px-1.5 py-0.2 rounded text-[10px] border font-bold ${statusCfg.badge}`}
                    >
                      {statusCfg.label}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Stage Cards Grid */}
        <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pipelineStages.map((stage, idx) => {
            const IconComp = getStageIcon(stage.icon_name);
            const statusCfg = getStatusConfig(stage.status);
            const lastLog = stage.logs?.[stage.logs.length - 1] || "No logs recorded.";

            return (
              <div
                key={stage.id}
                onClick={() => setActiveModalStage(stage)}
                className={`group relative rounded-xl border p-4 sm:p-5 transition-all duration-200 cursor-pointer flex flex-col justify-between ${statusCfg.cardBorder} bg-slate-900/40 hover:bg-slate-900/80 shadow-md ${statusCfg.glow}`}
              >
                <div>
                  {/* Card Top Row */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 group-hover:border-slate-700 transition-colors">
                        <IconComp className={`w-5 h-5 ${statusCfg.iconColor}`} />
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 font-bold block uppercase tracking-wider">
                          STAGE {String(stage.order_index || idx + 1).padStart(2, "0")}
                        </span>
                        <h3 className="text-sm font-bold text-slate-100 group-hover:text-emerald-400 transition-colors line-clamp-1">
                          {stage.title}
                        </h3>
                      </div>
                    </div>

                    <span
                      className={`px-2 py-0.5 rounded text-[10px] border font-bold flex items-center gap-1.5 shrink-0 ${statusCfg.badge}`}
                    >
                      {statusCfg.pulseRing && (
                        <span className={`w-1.5 h-1.5 rounded-full ${statusCfg.dot} animate-pulse`} />
                      )}
                      {statusCfg.label}
                    </span>
                  </div>

                  {/* Description */}
                  {stage.description && (
                    <p className="text-xs text-slate-400 mb-4 line-clamp-2 leading-relaxed font-sans">
                      {stage.description}
                    </p>
                  )}
                </div>

                {/* Mini Terminal Log Preview Box */}
                <div>
                  <div className="bg-slate-950 border border-slate-800/80 rounded-lg p-2.5 mb-3 text-[11px] font-mono text-slate-400 group-hover:border-slate-700 transition-colors">
                    <div className="flex items-center justify-between text-[10px] text-slate-500 border-b border-slate-800/60 pb-1 mb-1.5">
                      <span className="flex items-center gap-1">
                        <Terminal className="w-3 h-3 text-slate-400" />
                        last_log.txt
                      </span>
                      <span>{stage.logs?.length || 0} lines</span>
                    </div>
                    <p className="truncate text-slate-300 font-mono text-[11px]">{lastLog}</p>
                  </div>

                  {/* Action CTA */}
                  <div className="flex items-center justify-between text-xs text-emerald-400 font-semibold group-hover:translate-x-0.5 transition-transform">
                    <span className="flex items-center gap-1.5 text-xs text-slate-300 group-hover:text-emerald-400">
                      <Terminal className="w-3.5 h-3.5" />
                      View Terminal Logs
                    </span>
                    <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer info bar */}
        <div className="bg-slate-900/60 border-t border-slate-800/80 px-4 py-2.5 flex flex-wrap items-center justify-between text-[11px] text-slate-400 gap-2">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Live Pipeline Status: Connected to CI/CD Webhook Stream
          </span>
          <span className="text-slate-500 font-mono">
            Click any stage card to inspect live terminal logs
          </span>
        </div>
      </div>

      {/* Terminal Log Modal / Drawer */}
      {activeModalStage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setActiveModalStage(null)}
        >
          <div
            className="w-full max-w-4xl max-h-[85vh] bg-slate-950 border border-slate-800 rounded-xl shadow-2xl overflow-hidden font-mono flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-3 min-w-0">
                {/* macOS Controls */}
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => setActiveModalStage(null)}
                    className="w-3 h-3 rounded-full bg-rose-500 hover:bg-rose-600 transition-colors"
                    title="Close"
                  />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                </div>
                <div className="h-4 w-px bg-slate-800 mx-1 hidden sm:block shrink-0" />
                <div className="truncate">
                  <span className="text-xs text-slate-200 font-bold flex items-center gap-2 truncate">
                    <Terminal className="w-4 h-4 text-emerald-400 shrink-0" />
                    terminal@stage:{activeModalStage.id} ~ logs
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => handleCopyLogs(activeModalStage.logs || [])}
                  className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 border border-slate-700 transition-colors cursor-pointer"
                  title="Copy logs"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-400" />
                      <span>Copy Logs</span>
                    </>
                  )}
                </button>
                <button
                  onClick={() => setActiveModalStage(null)}
                  className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-slate-100 transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Subheader: Stage Title & Status */}
            <div className="bg-slate-900/50 border-b border-slate-800/80 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs shrink-0">
              <div className="flex items-center gap-2">
                <span className="text-slate-400 font-bold">STAGE:</span>
                <span className="text-slate-100 font-bold">{activeModalStage.title}</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative flex items-center">
                  <Search className="w-3.5 h-3.5 absolute left-2 text-slate-500" />
                  <input
                    type="text"
                    placeholder="Filter logs..."
                    value={logFilter}
                    onChange={(e) => setLogFilter(e.target.value)}
                    className="bg-slate-950 border border-slate-800 rounded pl-7 pr-2 py-0.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500/50 w-36 sm:w-48 font-mono"
                  />
                </div>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] border font-bold ${
                    getStatusConfig(activeModalStage.status).badge
                  }`}
                >
                  {getStatusConfig(activeModalStage.status).label}
                </span>
              </div>
            </div>

            {/* Modal Body: Scrollable Log Stream */}
            <div className="p-4 bg-slate-950 overflow-y-auto flex-1 font-mono text-xs sm:text-sm space-y-0.5 border-b border-slate-800">
              {activeModalStage.logs && activeModalStage.logs.length > 0 ? (
                activeModalStage.logs
                  .filter((line) => line.toLowerCase().includes(logFilter.toLowerCase()))
                  .map((line, idx) => renderLogLine(line, idx))
              ) : (
                <div className="py-8 text-center text-slate-500 italic">No log entries available for this stage.</div>
              )}
            </div>

            {/* Modal Footer Bar */}
            <div className="bg-slate-900/90 px-4 py-2 flex items-center justify-between text-[11px] text-slate-400 shrink-0">
              <span className="font-mono text-slate-500">
                Total lines: {activeModalStage.logs?.length || 0} | Filtered:{" "}
                {
                  (activeModalStage.logs || []).filter((line) =>
                    line.toLowerCase().includes(logFilter.toLowerCase())
                  ).length
                }
              </span>
              <span className="font-mono text-slate-500 hidden sm:inline">Press ESC or click outside to dismiss</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
