"use client";

import React, { useState } from "react";
import { usePortfolio } from "@/context/PortfolioContext";
import { ArrowUpRight, Copy, Check, Terminal, Server, Cpu, ShieldCheck } from "lucide-react";

type TerminalTab = "SYS_SPEC" | "K8S_NODES" | "CI_TELEMETRY";

export default function HeroEditorial() {
  const { state } = usePortfolio();
  const hero = state?.hero;
  const githubUrl = state?.github?.profileUrl || "https://github.com/Tnembull";

  const name = hero?.name || "Muhammad Nur Ashiddiqi";
  const role = hero?.role || "DevOps & Backend Engineer";
  const bio =
    hero?.bio ||
    "Backend Developer (S.Kom Unila) turned DevOps Engineer. Experienced in building structured REST APIs, PostgreSQL optimization, Docker containerization & automated CI/CD deployment pipelines.";
  const email = hero?.email || "muhammadnurashiddiqi@gmail.com";
  const statusText = hero?.statusText || "AVAILABLE FOR DEVOPS ENGAGEMENTS";

  const [activeTab, setActiveTab] = useState<TerminalTab>("SYS_SPEC");
  const [copied, setCopied] = useState(false);

  const getTerminalContent = () => {
    switch (activeTab) {
      case "SYS_SPEC":
        return `$ uname -a
Linux node-01 6.1.0-cloud #1 SMP x86_64
$ docker ps --format "table {{.Names}}\t{{.Status}}"
backend-api-core     Up 48 hours (healthy)
postgresql-db-clust  Up 48 hours (healthy)
redis-cache-layer    Up 48 hours (healthy)
nginx-reverse-proxy  Up 48 hours (healthy)`;

      case "K8S_NODES":
        return `$ kubectl get nodes -o wide
NAME            STATUS   ROLES           VERSION   INTERNAL-IP
k8s-master-01   Ready    control-plane   v1.30.0   10.0.1.10
k8s-worker-01   Ready    worker          v1.30.0   10.0.1.11
k8s-worker-02   Ready    worker          v1.30.0   10.0.1.12
k8s-worker-03   Ready    worker          v1.30.0   10.0.1.13`;

      case "CI_TELEMETRY":
        return `$ git log -1 --oneline
5b57734 (HEAD -> main) feat: automated pipeline rollout
$ gh run list --limit 3
✓ Test Suite Matrix   main  100% PASS (0.42s)
✓ Docker Multi-stage  main  IMAGE BUILT (134.8 MB)
✓ Health Check Probe  main  STATUS: 200 OK (99.98% UPTIME)`;
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getTerminalContent());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="overview"
      className="relative w-full bg-[#0b0e12] text-[#bababb] pt-20 pb-16 sm:pt-28 sm:pb-24 border-b border-[#303235]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Status Readout Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#181a1d] border border-[#303235] rounded-[1px] font-mono text-[11px] tracking-[0.064em] uppercase text-[#00d892] mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00d892] status-dot-pulse" />
          <span className="text-[#818284]">SYSTEM STATUS:</span>
          <span className="text-[#00d892]">{statusText}</span>
        </div>

        {/* Main Split Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Headline, Bio & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            {/* Role Header */}
            <div className="flex items-center gap-2 font-mono text-xs text-[#818284] tracking-[0.058em] uppercase">
              <span className="text-[#00d892] font-mono">//</span>
              <span>{role}</span>
            </div>

            {/* Display Headline */}
            <h1 className="text-4xl sm:text-6xl font-normal text-[#dedede] leading-[1.08] tracking-[-0.01em]">
              {name}
            </h1>

            {/* Bio Body Copy */}
            <p className="text-base sm:text-lg text-[#bababb] leading-[1.42] max-w-2xl font-normal">
              {bio}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-4 font-mono text-xs">
              <a
                href={`mailto:${email}`}
                className="oxide-button-filled inline-flex items-center gap-2 px-5 py-3 hover:shadow-lg transition-all"
              >
                <span>INITIATE CONTACT</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#00d892]" />
              </a>

              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="oxide-button-ghost inline-flex items-center gap-2 px-5 py-3 hover:shadow-md transition-all"
              >
                <span>GITHUB READOUT</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#bababb]" />
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Terminal Mockup Panel */}
          <div className="lg:col-span-5 oxide-panel p-0 overflow-hidden font-mono text-xs shadow-xl">
            {/* Terminal Window Top Bar with Interactive Tabs */}
            <div className="bg-[#1f2124] border-b border-[#303235] px-3 py-2 flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 overflow-x-auto">
                {(
                  [
                    { id: "SYS_SPEC", label: "SYS_SPEC.SH" },
                    { id: "K8S_NODES", label: "K8S_NODES" },
                    { id: "CI_TELEMETRY", label: "CI_METRICS" },
                  ] as const
                ).map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-2 py-1 text-[10px] tracking-[0.053em] uppercase rounded-[1px] border transition-colors cursor-pointer ${
                      activeTab === tab.id
                        ? "bg-[#0b0e12] border-[#00d892] text-[#00d892]"
                        : "border-transparent text-[#818284] hover:text-[#dedede]"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Copy output button */}
              <button
                onClick={handleCopy}
                className="text-[10px] text-[#818284] hover:text-[#00d892] flex items-center gap-1 p-1 rounded transition-colors cursor-pointer shrink-0"
                title="Copy terminal readout"
              >
                {copied ? <Check size={12} className="text-[#00d892]" /> : <Copy size={12} />}
                <span className="hidden sm:inline">{copied ? "COPIED" : "COPY"}</span>
              </button>
            </div>

            {/* Terminal Body Content */}
            <div className="p-4 bg-[#14171b] space-y-3 min-h-[170px] text-[11px] leading-relaxed text-[#bababb]">
              {activeTab === "SYS_SPEC" && (
                <div className="space-y-1.5">
                  <div className="flex gap-2 text-[#dedede]">
                    <span className="text-[#00d892]">$</span>
                    <span>uname -a</span>
                  </div>
                  <p className="text-[#818284] pl-3">Linux node-01 6.1.0-cloud #1 SMP x86_64</p>

                  <div className="flex gap-2 text-[#dedede] pt-1">
                    <span className="text-[#00d892]">$</span>
                    <span>docker ps --format json</span>
                  </div>
                  <div className="pl-3 space-y-0.5 text-[10px] text-[#00d892]">
                    <p>• backend-api-core     [STATUS: HEALTHY - PORT: 8080]</p>
                    <p>• postgresql-cluster   [STATUS: HEALTHY - PORT: 5432]</p>
                    <p>• redis-cache-layer    [STATUS: HEALTHY - PORT: 6379]</p>
                    <p>• nginx-reverse-proxy  [STATUS: HEALTHY - PORT: 80/443]</p>
                  </div>
                </div>
              )}

              {activeTab === "K8S_NODES" && (
                <div className="space-y-1.5">
                  <div className="flex gap-2 text-[#dedede]">
                    <span className="text-[#00d892]">$</span>
                    <span>kubectl get nodes -o wide</span>
                  </div>
                  <div className="pl-3 space-y-1 text-[10px] text-[#818284]">
                    <p className="text-[#00d892]">k8s-master-01   Ready   control-plane   v1.30.0   10.0.1.10</p>
                    <p>k8s-worker-01   Ready   worker          v1.30.0   10.0.1.11</p>
                    <p>k8s-worker-02   Ready   worker          v1.30.0   10.0.1.12</p>
                    <p>k8s-worker-03   Ready   worker          v1.30.0   10.0.1.13</p>
                  </div>
                </div>
              )}

              {activeTab === "CI_TELEMETRY" && (
                <div className="space-y-1.5">
                  <div className="flex gap-2 text-[#dedede]">
                    <span className="text-[#00d892]">$</span>
                    <span>gh run list --status=success</span>
                  </div>
                  <div className="pl-3 space-y-1 text-[10px]">
                    <p className="text-[#00d892]">✓ Test Suite Matrix: 34/34 specs passed (100%)</p>
                    <p className="text-[#dedede]">✓ Docker OCI Layer: Compressed (134.8 MB)</p>
                    <p className="text-[#818284]">✓ Deployment Pipeline: Staging → Production deployed</p>
                  </div>
                </div>
              )}
            </div>

            {/* Terminal Footer status bar */}
            <div className="bg-[#181a1d] border-t border-[#303235] px-3 py-1.5 flex items-center justify-between text-[10px] text-[#818284]">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00d892]" />
                CLI READY
              </span>
              <span>SHELL: ZSH / X86_64</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
