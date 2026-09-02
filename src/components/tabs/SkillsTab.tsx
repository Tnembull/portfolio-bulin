"use client";

import React, { useState } from "react";
import { usePortfolio } from "@/context/PortfolioContext";
import { ArrowUpRight } from "lucide-react";
import { CertificationBadge } from "@/lib/supabase";

export default function SkillsTab() {
  const { state } = usePortfolio();
  const { skills, badges, progress } = state;

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

      {/* Divider */}
      <hr className="border-[#252a30]" />

      {/* 2. Verified Digital Badges (Credly) */}
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

      {/* 3. Learning Roadmap (if any) */}
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
