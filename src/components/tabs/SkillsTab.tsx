"use client";

import React, { useState } from "react";
import Image from "next/image";
import { usePortfolio } from "@/context/PortfolioContext";
import {
  Cpu,
  Award,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  BookOpen,
  Layers,
  Sparkles,
  Zap,
  Terminal,
  Server,
  Cloud,
  X,
  TrendingUp,
} from "lucide-react";
import { CertificationBadge } from "@/lib/supabase";

export default function SkillsTab() {
  const { state } = usePortfolio();
  const { skills, tools, badges, progress } = state;

  const [selectedBadge, setSelectedBadge] = useState<CertificationBadge | null>(null);

  const defaultBadges: CertificationBadge[] = [
    {
      id: "badge-oci-devops",
      name: "Oracle Cloud Infrastructure 2025 Certified DevOps Professional",
      issuer: "Oracle Corporation",
      badge_image_url:
        "https://images.credly.com/size/340x340/images/d3752e25-1e3d-49d7-8321-7299a9b6f124/image.png",
      verification_url:
        "https://www.credly.com/org/oracle/badge/oracle-cloud-infrastructure-2025-certified-devops-professional",
      issue_date: "2025",
      is_featured: true,
      order_index: 0,
    },
    {
      id: "badge-aws-clf",
      name: "AWS Certified Cloud Practitioner",
      issuer: "Amazon Web Services (AWS)",
      badge_image_url:
        "https://images.credly.com/size/340x340/images/b9feab85-1a4e-4e6e-8280-f04e477e38c7/image.png",
      verification_url:
        "https://www.credly.com/org/amazon-web-services/badge/aws-certified-cloud-practitioner",
      issue_date: "2024",
      is_featured: true,
      order_index: 1,
    },
  ];

  const displayBadges = badges && badges.length > 0 ? badges : defaultBadges;
  const skillList = skills?.items || [];
  const progressList = progress || [];

  return (
    <div className="space-y-8 pb-6 animate-in fade-in duration-300">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono mb-1.5">
            <Cpu size={13} />
            <span>CAPABILITIES & ACCREDITATIONS</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-100">
            Skills & Digital Badges
          </h1>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <span className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/10">
            {displayBadges.length} Verified Badges
          </span>
        </div>
      </div>

      {/* 2. Technical Capabilities Matrix Cards */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Layers size={16} className="text-emerald-400" />
          <h2 className="text-sm sm:text-base font-bold text-slate-100">
            Core Technical Matrix
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {skillList.map((skill, idx) => {
            const tags = skill.desc ? skill.desc.split(",").map((s) => s.trim()) : [];

            return (
              <div
                key={skill.id || idx}
                className="p-5 rounded-2xl bg-[#121722] border border-white/[0.06] hover:border-emerald-500/30 transition-all space-y-3.5 shadow-sm flex flex-col justify-between"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="size-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-xs">
                      {String(idx + 1).padStart(2, "0")}
                    </div>
                    <h3 className="text-sm font-bold text-slate-100 uppercase tracking-tight">
                      {skill.title}
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                    {tags.length} Tools
                  </span>
                </div>

                {/* Tech Chips */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 text-xs font-mono bg-white/[0.04] text-slate-300 border border-white/10 rounded-lg hover:text-emerald-300 hover:border-emerald-500/30 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Verified Digital Credentials (Credly Badges) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award size={16} className="text-amber-400" />
            <h2 className="text-sm sm:text-base font-bold text-slate-100">
              Verified Credly Credentials
            </h2>
          </div>
          <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
            <ShieldCheck size={14} />
            <span>Cryptographically Verified</span>
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayBadges.map((badge) => (
            <div
              key={badge.id}
              onClick={() => setSelectedBadge(badge)}
              className="p-4 rounded-2xl bg-[#121722] border border-white/[0.06] hover:border-amber-500/30 transition-all cursor-pointer flex flex-col justify-between space-y-4 group shadow-sm"
            >
              <div className="flex items-start gap-3.5">
                <div className="size-14 rounded-xl bg-slate-900 border border-white/10 p-1 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  {badge.badge_image_url ? (
                    <img
                      src={badge.badge_image_url}
                      alt={badge.name}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <Award className="size-7 text-amber-400" />
                  )}
                </div>

                <div className="space-y-1 min-w-0">
                  <h3 className="text-xs sm:text-sm font-bold text-slate-100 group-hover:text-amber-300 transition-colors line-clamp-2 leading-snug">
                    {badge.name}
                  </h3>
                  <p className="text-[11px] font-mono text-slate-400 truncate">
                    {badge.issuer}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-white/[0.06] text-xs font-mono">
                <span className="text-slate-500">{badge.issue_date || "Verified"}</span>
                <span className="text-amber-400 font-medium flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  <span>Details</span>
                  <ExternalLink size={12} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Live Learning Roadmap & Progress */}
      {progressList.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <TrendingUp size={16} className="text-sky-400" />
            <h2 className="text-sm sm:text-base font-bold text-slate-100">
              Active Learning Roadmap
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {progressList.map((item) => (
              <div
                key={item.id}
                className="p-5 rounded-2xl bg-[#121722] border border-white/[0.06] hover:border-sky-500/30 transition-all space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20 font-bold">
                    {item.status || "IN PROGRESS"}
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-100">
                    {item.progress_percent}%
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-100">{item.title}</h3>

                {/* Progress bar */}
                <div className="w-full h-2 rounded-full bg-white/[0.05] overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-sky-500 to-emerald-400 rounded-full transition-all duration-500"
                    style={{ width: `${item.progress_percent}%` }}
                  />
                </div>

                {item.description && (
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Badge Modal Detail */}
      {selectedBadge && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm p-4 flex items-center justify-center animate-in fade-in">
          <div className="bg-[#121722] border border-white/10 rounded-3xl max-w-md w-full p-6 space-y-5">
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-amber-400 font-bold uppercase">
                  Digital Credential
                </span>
                <h3 className="text-base font-bold text-slate-100">
                  {selectedBadge.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedBadge(null)}
                className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex justify-center p-4 bg-slate-900 rounded-2xl border border-white/10">
              <div className="size-32 relative">
                {selectedBadge.badge_image_url ? (
                  <img
                    src={selectedBadge.badge_image_url}
                    alt={selectedBadge.name}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <Award className="size-20 text-amber-400 m-auto" />
                )}
              </div>
            </div>

            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between py-1 border-b border-white/[0.06]">
                <span className="text-slate-400">Issuer:</span>
                <span className="text-slate-200 font-bold">{selectedBadge.issuer}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/[0.06]">
                <span className="text-slate-400">Issue Date:</span>
                <span className="text-slate-200">{selectedBadge.issue_date || "Verified"}</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setSelectedBadge(null)}
                className="px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 text-xs font-medium cursor-pointer"
              >
                Close
              </button>
              {selectedBadge.verification_url && (
                <a
                  href={selectedBadge.verification_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-[#0b0e14] font-bold text-xs shadow-[0_0_15px_rgba(245,158,11,0.3)]"
                >
                  <span>Verify on Credly</span>
                  <ExternalLink size={13} />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
