"use client";

import React, { useState } from "react";
import { usePortfolio, ExperienceItem, EducationItem, AwardItem } from "@/context/PortfolioContext";
import { ArrowUpRight } from "lucide-react";

type SubSection = "experience" | "education" | "awards";

export default function ExperienceTab() {
  const { state } = usePortfolio();
  const { experience, education, awards } = state;

  const [activeSub, setActiveSub] = useState<SubSection>("experience");

  const experienceItems: ExperienceItem[] = experience?.items || [];
  const educationItems: EducationItem[] = education?.items || [];
  const awardsList: AwardItem[] = awards || [];

  return (
    <div className="space-y-8 pb-12">
      {/* Header & Segment Switcher */}
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-foreground tracking-tight">
            Experience & Background
          </h1>
          <p className="text-sm text-secondary mt-1">
            Career history, academic background, and industry credentials.
          </p>
        </div>

        {/* Clean Segment Switcher */}
        <div className="flex items-center gap-2 border-b border-border pb-2 overflow-x-auto">
          <button
            onClick={() => setActiveSub("experience")}
            className={`px-3 py-1.5 rounded-md text-xs font-mono whitespace-nowrap transition-colors cursor-pointer ${
              activeSub === "experience"
                ? "bg-surface text-accent border border-border font-semibold"
                : "text-secondary hover:text-foreground"
            }`}
          >
            Work Experience ({experienceItems.length})
          </button>

          <button
            onClick={() => setActiveSub("education")}
            className={`px-3 py-1.5 rounded-md text-xs font-mono whitespace-nowrap transition-colors cursor-pointer ${
              activeSub === "education"
                ? "bg-surface text-accent border border-border font-semibold"
                : "text-secondary hover:text-foreground"
            }`}
          >
            Education ({educationItems.length})
          </button>

          <button
            onClick={() => setActiveSub("awards")}
            className={`px-3 py-1.5 rounded-md text-xs font-mono whitespace-nowrap transition-colors cursor-pointer ${
              activeSub === "awards"
                ? "bg-surface text-accent border border-border font-semibold"
                : "text-secondary hover:text-foreground"
            }`}
          >
            Certificates ({awardsList.length})
          </button>
        </div>
      </div>

      {/* Sub-view 1: Work Experience Timeline */}
      {activeSub === "experience" && (
        experienceItems.length === 0 ? (
          <div className="py-12 text-center text-sm text-secondary">
            No experience records added yet.
          </div>
        ) : (
          <div className="divide-y divide-border">
            {experienceItems.map((item, idx) => (
              <article
                key={item.id || idx}
                className="py-6 first:pt-0 last:pb-0 grid grid-cols-1 md:grid-cols-[160px_1fr] gap-4 items-start"
              >
                {/* Date column */}
                <div className="text-xs font-mono text-muted pt-0.5">
                  {item.year}
                </div>

                {/* Content column */}
                <div className="space-y-3">
                  <div>
                    <h2 className="text-base font-semibold text-foreground">
                      {item.role}
                    </h2>
                    <div className="text-sm font-medium text-secondary">
                      {item.company}
                      {item.location && <span> · {item.location}</span>}
                      {item.jobType && <span className="text-xs text-muted"> ({item.jobType})</span>}
                    </div>
                  </div>

                  <p className="text-sm text-secondary leading-relaxed max-w-2xl">
                    {item.description}
                  </p>

                  {item.tags && item.tags.length > 0 && (
                    <div className="text-xs font-mono text-muted">
                      {item.tags.join(" · ")}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        )
      )}

      {/* Sub-view 2: Education List */}
      {activeSub === "education" && (
        educationItems.length === 0 ? (
          <div className="py-12 text-center text-sm text-secondary">
            No education records added yet.
          </div>
        ) : (
          <div className="divide-y divide-border">
            {educationItems.map((item) => (
              <article
                key={item.id}
                className="py-6 first:pt-0 last:pb-0 grid grid-cols-1 md:grid-cols-[160px_1fr] gap-4 items-start"
              >
                {/* Date */}
                <div className="text-xs font-mono text-muted pt-0.5">
                  {item.year}
                </div>

                {/* Degree & School */}
                <div className="space-y-2">
                  <div>
                    <h2 className="text-base font-semibold text-foreground">
                      {item.degree}
                    </h2>
                    <div className="text-sm text-secondary">
                      {item.institution}
                      {item.gpa && <span> · GPA {item.gpa}</span>}
                    </div>
                  </div>

                  {item.details && (
                    <p className="text-sm text-secondary leading-relaxed max-w-2xl">
                      {item.details}
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>
        )
      )}

      {/* Sub-view 3: Certifications */}
      {activeSub === "awards" && (
        awardsList.length === 0 ? (
          <div className="py-12 text-center text-sm text-secondary">
            No certificates added yet.
          </div>
        ) : (
          <div className="divide-y divide-border">
            {awardsList.map((item) => (
              <article
                key={item.id}
                className="py-5 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <h2 className="text-sm font-semibold text-foreground">
                    {item.title}
                  </h2>
                  <div className="text-xs text-secondary font-mono">
                    {item.issuer}
                    {item.date && <span> · {item.date}</span>}
                    {item.credentialId && (
                      <span className="text-muted"> · ID: {item.credentialId}</span>
                    )}
                  </div>
                </div>

                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-accent hover:underline inline-flex items-center gap-1 self-start sm:self-auto shrink-0"
                  >
                    <span>Verify</span>
                    <ArrowUpRight size={12} />
                  </a>
                )}
              </article>
            ))}
          </div>
        )
      )}
    </div>
  );
}
