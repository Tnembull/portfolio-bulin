"use client";

import React, { useState } from "react";
import Image from "next/image";
import { usePortfolio } from "@/context/PortfolioContext";
import { Project } from "@/data/projects";
import { TabType } from "@/components/app-layout/types";
import {
  ArrowUpRight,
  Terminal,
  Server,
  Cpu,
  ShieldCheck,
  Sparkles,
  ExternalLink,
  FolderGit2,
  Briefcase,
  ChevronRight,
  Zap,
  CheckCircle2,
  Layers,
  Code2,
  FileText,
  Send,
} from "lucide-react";

interface HomeTabProps {
  onNavigateTab: (tab: TabType) => void;
}

export default function HomeTab({ onNavigateTab }: HomeTabProps) {
  const { state } = usePortfolio();
  const { hero, projects, skills, progress, stats } = state;

  const [terminalTab, setTerminalTab] = useState<"SYS_SPEC" | "K8S_NODES" | "CI_CD">("SYS_SPEC");
  const [avatarActive, setAvatarActive] = useState(false);

  const name = hero?.name || "Muhammad Nur Ashiddiqi";
  const role = hero?.role || "DevOps & Cloud Engineer";
  const bio =
    hero?.bio ||
    "Backend Developer turned DevOps & Cloud Engineer. Experienced in building high-availability Kubernetes clusters, automated CI/CD deployment pipelines, and optimized cloud architectures.";
  const avatarSrc = (avatarActive ? hero?.avatarOn : hero?.avatarOff) || hero?.avatarOff || "/avatar.jpg";

  // Top 2-3 Featured Projects
  const featuredProjects: Project[] = projects?.items?.slice(0, 3) || [];

  return (
    <div className="space-y-6 pb-6 animate-in fade-in duration-300">
      {/* 1. Hero Profile Card */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#161c28] to-[#10141e] border border-white/[0.08] p-5 sm:p-7 shadow-xl">
        {/* Subtle Ambient Glow */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-sky-500/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-5 sm:gap-6 justify-between">
          {/* Avatar & Info */}
          <div className="flex items-start sm:items-center gap-4 sm:gap-5">
            <div
              onClick={() => setAvatarActive(!avatarActive)}
              title="Tap to toggle expression"
              className="relative cursor-pointer group shrink-0"
            >
              <div className="size-20 sm:size-24 rounded-2xl overflow-hidden border-2 border-emerald-500/40 bg-slate-900 shadow-[0_0_20px_rgba(0,216,146,0.2)] group-hover:scale-105 transition-transform duration-200">
                <Image
                  src={avatarSrc}
                  alt={name}
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                  priority
                  unoptimized
                />
              </div>
              <span className="absolute -bottom-1 -right-1 flex items-center justify-center size-6 bg-[#0b0e14] border-2 border-emerald-500 rounded-full text-[10px]">
                ⚡
              </span>
            </div>

            <div className="space-y-1.5 min-w-0">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
                <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>{hero?.statusText || "AVAILABLE FOR CONTRACT"}</span>
              </div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-100 tracking-tight">
                {name}
              </h1>
              <p className="text-xs sm:text-sm text-sky-400 font-mono font-medium">
                {role}
              </p>
            </div>
          </div>

          {/* Location & Timezone Pill */}
          <div className="flex md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-2 pt-2 md:pt-0 border-t md:border-t-0 border-white/[0.06]">
            <div className="text-left md:text-right">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider font-mono">Base Location</span>
              <p className="text-xs font-medium text-slate-200">{hero?.location || "Indonesia (GMT+7)"}</p>
            </div>
          </div>
        </div>

        {/* Bio Copy */}
        <p className="mt-5 text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
          {bio}
        </p>

        {/* Quick Action Buttons */}
        <div className="mt-6 flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => onNavigateTab("contact")}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-[#0b0e14] font-bold text-xs sm:text-sm transition-all duration-200 shadow-[0_0_15px_rgba(0,216,146,0.3)] cursor-pointer active:scale-95"
          >
            <Send size={15} />
            <span>Get in Touch</span>
          </button>

          <button
            onClick={() => onNavigateTab("projects")}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-slate-200 border border-white/10 font-semibold text-xs sm:text-sm transition-all cursor-pointer active:scale-95"
          >
            <FolderGit2 size={15} />
            <span>Explore Projects</span>
          </button>

          <a
            href="https://github.com/Tnembull"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 border border-white/10 font-medium text-xs sm:text-sm transition-all"
          >
            <Code2 size={15} />
            <span>GitHub</span>
            <ArrowUpRight size={13} className="text-slate-400" />
          </a>
        </div>
      </section>

      {/* 2. Key Stats & Metrics Grid */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 rounded-2xl bg-[#121722] border border-white/[0.06] flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-mono uppercase tracking-wider">Deployments</span>
            <Server size={16} className="text-emerald-400" />
          </div>
          <div className="mt-2">
            <span className="text-2xl font-bold text-slate-100 font-mono">15+</span>
            <p className="text-[10px] text-slate-400 mt-0.5">Production Services</p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#121722] border border-white/[0.06] flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-mono uppercase tracking-wider">Uptime</span>
            <ShieldCheck size={16} className="text-sky-400" />
          </div>
          <div className="mt-2">
            <span className="text-2xl font-bold text-slate-100 font-mono">99.9%</span>
            <p className="text-[10px] text-slate-400 mt-0.5">High Availability SLA</p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#121722] border border-white/[0.06] flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-mono uppercase tracking-wider">Certifications</span>
            <CheckCircle2 size={16} className="text-amber-400" />
          </div>
          <div className="mt-2">
            <span className="text-2xl font-bold text-slate-100 font-mono">10+</span>
            <p className="text-[10px] text-slate-400 mt-0.5">Verified Badges</p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#121722] border border-white/[0.06] flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-mono uppercase tracking-wider">CI/CD Flow</span>
            <Zap size={16} className="text-purple-400" />
          </div>
          <div className="mt-2">
            <span className="text-2xl font-bold text-slate-100 font-mono">&lt; 3min</span>
            <p className="text-[10px] text-slate-400 mt-0.5">Build & Rollout</p>
          </div>
        </div>
      </section>

      {/* 3. Featured Projects Showcase */}
      <section className="space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-emerald-400" />
            <h2 className="text-sm sm:text-base font-bold text-slate-100">Featured Builds</h2>
          </div>
          <button
            onClick={() => onNavigateTab("projects")}
            className="text-xs text-emerald-400 hover:text-emerald-300 font-medium flex items-center gap-1 cursor-pointer"
          >
            <span>See All ({projects?.items?.length || 0})</span>
            <ChevronRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredProjects.map((proj) => (
            <div
              key={proj.id}
              onClick={() => onNavigateTab("projects")}
              className="group relative rounded-2xl bg-[#121722] border border-white/[0.06] overflow-hidden hover:border-emerald-500/30 transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              {proj.image && (
                <div className="relative h-36 w-full overflow-hidden bg-slate-800">
                  <Image
                    src={proj.image}
                    alt={proj.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121722] via-transparent to-transparent" />
                </div>
              )}

              <div className="p-4 space-y-2.5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-100 group-hover:text-emerald-400 transition-colors line-clamp-1">
                    {proj.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {proj.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {proj.tags?.slice(0, 3).map((tag, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 text-[10px] font-mono bg-white/[0.04] text-slate-300 border border-white/10 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Live Terminal Readout */}
      <section className="rounded-2xl bg-[#121722] border border-white/[0.06] overflow-hidden font-mono text-xs shadow-lg">
        <div className="flex items-center justify-between px-4 py-2.5 bg-white/[0.02] border-b border-white/[0.06]">
          <div className="flex items-center gap-2">
            <Terminal size={14} className="text-emerald-400" />
            <span className="text-[11px] font-bold text-slate-300 uppercase">Live Telemetry</span>
          </div>
          <div className="flex items-center gap-1">
            {(["SYS_SPEC", "K8S_NODES", "CI_CD"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setTerminalTab(tab)}
                className={`px-2.5 py-1 rounded-lg text-[10px] transition-all cursor-pointer ${
                  terminalTab === tab
                    ? "bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30"
                    : "text-slate-500 hover:text-slate-300"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 text-[11px] leading-relaxed text-slate-300 bg-[#0c0f16]/90 overflow-x-auto">
          {terminalTab === "SYS_SPEC" && (
            <pre className="text-emerald-400">
{`$ uname -a
Linux bulin-cluster-01 6.6.10-cloud #1 SMP PREEMPT_DYNAMIC
$ docker ps --format "table {{.Names}}\t{{.Status}}"
NAMES                   STATUS
backend-auth-api        Up 72 hours (healthy)
postgres-master-db      Up 72 hours (healthy)
redis-cache-layer       Up 72 hours (healthy)`}
            </pre>
          )}

          {terminalTab === "K8S_NODES" && (
            <pre className="text-sky-400">
{`$ kubectl get nodes -o wide
NAME             STATUS   ROLES           AGE   VERSION
k8s-master-01    Ready    control-plane   45d   v1.30.2
k8s-worker-01    Ready    worker          45d   v1.30.2
k8s-worker-02    Ready    worker          45d   v1.30.2`}
            </pre>
          )}

          {terminalTab === "CI_CD" && (
            <pre className="text-amber-400">
{`$ gh run list --limit 3
✓ CI / Lint & Test Suite (PASS - 42s)
✓ Docker Multi-Stage Build & Trivy Scan (0 CVEs)
✓ ArgoCD GitOps Sync: Production Cluster (HEALTHY)`}
            </pre>
          )}
        </div>
      </section>
    </div>
  );
}
