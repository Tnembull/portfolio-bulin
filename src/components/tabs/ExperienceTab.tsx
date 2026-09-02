"use client";

import React, { useState } from "react";
import Image from "next/image";
import { usePortfolio, ExperienceItem, EducationItem, AwardItem } from "@/context/PortfolioContext";
import {
  Briefcase,
  GraduationCap,
  Award,
  Calendar,
  MapPin,
  ExternalLink,
  CheckCircle2,
  FileText,
  X,
  ChevronRight,
  Sparkles,
} from "lucide-react";

type SubSection = "experience" | "education" | "awards";

export default function ExperienceTab() {
  const { state } = usePortfolio();
  const { experience, education, awards } = state;

  const [activeSub, setActiveSub] = useState<SubSection>("experience");
  const [selectedAward, setSelectedAward] = useState<AwardItem | null>(null);

  const experienceItems: ExperienceItem[] = experience?.items || [];
  const educationItems: EducationItem[] = education?.items || [];
  const awardsList: AwardItem[] = awards || [];

  return (
    <div className="space-y-6 pb-6 animate-in fade-in duration-300">
      {/* 1. Header & Segmented Pill Switcher */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono mb-1.5">
              <Briefcase size={13} />
              <span>CAREER & ACADEMICS</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-100">
              Professional Journey
            </h1>
          </div>

          {/* Quick counts */}
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <span className="px-2 py-1 rounded-lg bg-white/[0.04] border border-white/10">
              {experienceItems.length} Roles
            </span>
            <span className="px-2 py-1 rounded-lg bg-white/[0.04] border border-white/10">
              {awardsList.length} Certs
            </span>
          </div>
        </div>

        {/* Material You Segmented Control */}
        <div className="flex p-1 bg-[#121722] border border-white/[0.06] rounded-2xl gap-1">
          <button
            onClick={() => setActiveSub("experience")}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeSub === "experience"
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-[0_0_12px_rgba(0,216,146,0.2)]"
                : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.02]"
            }`}
          >
            <Briefcase size={15} />
            <span>Experience</span>
          </button>

          <button
            onClick={() => setActiveSub("education")}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeSub === "education"
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-[0_0_12px_rgba(0,216,146,0.2)]"
                : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.02]"
            }`}
          >
            <GraduationCap size={15} />
            <span>Education</span>
          </button>

          <button
            onClick={() => setActiveSub("awards")}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeSub === "awards"
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-[0_0_12px_rgba(0,216,146,0.2)]"
                : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.02]"
            }`}
          >
            <Award size={15} />
            <span>Certificates</span>
          </button>
        </div>
      </div>

      {/* 2. Sub-view 1: Work Experience */}
      {activeSub === "experience" && (
        <div className="space-y-4 animate-in fade-in duration-200">
          {experienceItems.map((item, idx) => (
            <div
              key={item.id || idx}
              className="p-5 rounded-2xl bg-[#121722] border border-white/[0.06] hover:border-emerald-500/30 transition-all space-y-3.5 shadow-sm"
            >
              {/* Role Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/[0.06]">
                <div className="flex items-start gap-3">
                  <div className="size-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                    <Briefcase size={18} />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
                      <span>{item.company}</span>
                      {idx === 0 && (
                        <span className="px-2 py-0.5 text-[9px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full">
                          PRESENT
                        </span>
                      )}
                    </h2>
                    <p className="text-xs font-mono font-medium text-sky-400 mt-0.5">
                      {item.role}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-[11px] font-mono self-start sm:self-auto">
                  <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.04] text-slate-300 border border-white/10">
                    <Calendar size={12} className="text-emerald-400" />
                    <span>{item.year}</span>
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-white/[0.04] text-emerald-400 border border-emerald-500/20 font-semibold">
                    {item.jobType || "Full-time"}
                  </span>
                </div>
              </div>

              {/* Location */}
              {item.location && (
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <MapPin size={13} className="text-emerald-400" />
                  <span>{item.location}</span>
                </div>
              )}

              {/* Description */}
              <div className="text-xs sm:text-sm text-slate-300 leading-relaxed border-l-2 border-emerald-500/40 pl-3.5">
                <p>{item.description}</p>
              </div>

              {/* Tech Stack Tags */}
              {item.tags && item.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {item.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 text-[10px] font-mono bg-emerald-500/5 text-emerald-300 border border-emerald-500/20 rounded-md"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* 3. Sub-view 2: Education */}
      {activeSub === "education" && (
        <div className="space-y-4 animate-in fade-in duration-200">
          {educationItems.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-2xl bg-[#121722] border border-white/[0.06] hover:border-emerald-500/30 transition-all space-y-3.5"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/[0.06]">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
                    <GraduationCap size={18} />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-slate-100">{item.institution}</h2>
                    <p className="text-xs font-mono font-medium text-purple-400 mt-0.5">
                      {item.degree}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-[11px] font-mono self-start sm:self-auto">
                  <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.04] text-slate-300 border border-white/10">
                    <Calendar size={12} className="text-purple-400" />
                    <span>{item.year}</span>
                  </span>
                  {item.gpa && (
                    <span className="px-2.5 py-1 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/30 font-bold">
                      GPA {item.gpa}
                    </span>
                  )}
                </div>
              </div>

              {item.details && (
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed border-l-2 border-purple-500/40 pl-3.5">
                  {item.details}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* 4. Sub-view 3: Awards & Certificates */}
      {activeSub === "awards" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-in fade-in duration-200">
          {awardsList.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedAward(item)}
              className="p-4 rounded-2xl bg-[#121722] border border-white/[0.06] hover:border-amber-500/30 transition-all cursor-pointer flex flex-col justify-between space-y-3 group"
            >
              {item.image && (
                <div className="relative h-32 w-full rounded-xl overflow-hidden bg-slate-900 border border-white/10">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                    unoptimized
                  />
                </div>
              )}

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-amber-400 uppercase">
                    {item.issuer || "Verified Issuer"}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">{item.date}</span>
                </div>
                <h2 className="text-sm font-bold text-slate-100 group-hover:text-amber-300 transition-colors line-clamp-2">
                  {item.title}
                </h2>
                {item.credentialId && (
                  <p className="text-[10px] font-mono text-slate-400 truncate">
                    ID: {item.credentialId}
                  </p>
                )}
              </div>

              <div className="pt-2 flex items-center justify-between text-xs text-amber-400 font-medium">
                <span>View Credential</span>
                <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Certificate Modal Preview */}
      {selectedAward && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm p-4 flex items-center justify-center animate-in fade-in">
          <div className="bg-[#121722] border border-white/10 rounded-3xl max-w-lg w-full p-5 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <span className="text-[10px] font-mono text-amber-400 font-bold uppercase">
                  {selectedAward.issuer}
                </span>
                <h2 className="text-base font-bold text-slate-100">{selectedAward.title}</h2>
              </div>
              <button
                onClick={() => setSelectedAward(null)}
                className="p-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {selectedAward.image && (
              <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden border border-white/10 bg-slate-900">
                <Image
                  src={selectedAward.image}
                  alt={selectedAward.title}
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
            )}

            <div className="flex items-center justify-between pt-2">
              {selectedAward.credentialId && (
                <span className="text-xs font-mono text-slate-400">
                  ID: {selectedAward.credentialId}
                </span>
              )}
              {selectedAward.link && (
                <a
                  href={selectedAward.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-[#0b0e14] font-bold text-xs"
                >
                  <span>Verify Online</span>
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
