"use client";

import React from "react";
import { usePortfolio } from "@/context/PortfolioContext";
import { ArrowUpRight } from "lucide-react";

export default function SkillsTab() {
  const { state } = usePortfolio();
  const { skills, badges, progress } = state;

  const displayBadges = badges || [];
  const skillList = skills?.items || [];
  const progressList = progress || [];

  return (
    <div className="space-y-12 pb-12">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-semibold text-[#f2f4f5] tracking-tight">
          Technical Capabilities & Certifications
        </h1>
        <p className="text-sm text-[#9aa1a9]">
          Infrastructure automation, backend systems engineering, and verified credentials.
        </p>
      </div>

      {/* 1. Grouped Technical Lists */}
      {skillList.length > 0 && (
        <section className="space-y-6">
          <h2 className="text-xs font-mono uppercase tracking-wider text-[#6f7781]">
            Core Capabilities
          </h2>

          <div className="divide-y divide-[#252a30]">
            {skillList.map((skill, idx) => {
              const tags = skill.desc
                ? skill.desc.split(",").map((s) => s.trim())
                : [];

              return (
                <div
                  key={skill.id || idx}
                  className="py-5 first:pt-0 last:pb-0 grid grid-cols-1 md:grid-cols-[200px_1fr] gap-3 items-baseline"
                >
                  <div className="font-mono text-xs font-semibold uppercase text-[#f2f4f5]">
                    {skill.title}
                  </div>
                  <div className="text-sm text-[#9aa1a9] leading-relaxed">
                    {tags.join(" · ")}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* 2. Verified Digital Badges (Credly) - Only rendered if real badges exist */}
      {displayBadges.length > 0 && (
        <>
          <hr className="border-[#252a30]" />
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-mono uppercase tracking-wider text-[#6f7781]">
                Verified Digital Credentials ({displayBadges.length})
              </h2>
              <span className="text-xs font-mono text-[#00c896]">
                Credly Verified
              </span>
            </div>

            <div className="divide-y divide-[#252a30]">
              {displayBadges.map((badge) => (
                <article
                  key={badge.id}
                  className="py-5 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <h3 className="text-sm font-semibold text-[#f2f4f5]">
                      {badge.name}
                    </h3>
                    <div className="text-xs text-[#9aa1a9] font-mono">
                      {badge.issuer}
                      {badge.issue_date && <span> · {badge.issue_date}</span>}
                    </div>
                  </div>

                  {badge.verification_url && (
                    <a
                      href={badge.verification_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono text-[#00c896] hover:underline inline-flex items-center gap-1 self-start sm:self-auto shrink-0"
                    >
                      <span>Verify on Credly</span>
                      <ArrowUpRight size={12} />
                    </a>
                  )}
                </article>
              ))}
            </div>
          </section>
        </>
      )}

      {/* 3. Learning Roadmap - Only rendered if real progress records exist */}
      {progressList.length > 0 && (
        <>
          <hr className="border-[#252a30]" />
          <section className="space-y-6">
            <h2 className="text-xs font-mono uppercase tracking-wider text-[#6f7781]">
              Active Learning Roadmap
            </h2>

            <div className="divide-y divide-[#252a30]">
              {progressList.map((item) => (
                <div
                  key={item.id}
                  className="py-4 first:pt-0 last:pb-0 grid grid-cols-1 md:grid-cols-[140px_1fr_80px] gap-3 items-center"
                >
                  <span className="text-xs font-mono uppercase text-[#6f7781]">
                    [{item.status || "In Progress"}]
                  </span>
                  <div>
                    <h4 className="text-sm font-semibold text-[#f2f4f5]">
                      {item.title}
                    </h4>
                    {item.description && (
                      <p className="text-xs text-[#9aa1a9] mt-0.5">
                        {item.description}
                      </p>
                    )}
                  </div>
                  <span className="text-xs font-mono text-[#00c896] md:text-right">
                    {item.progress_percent}%
                  </span>
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
