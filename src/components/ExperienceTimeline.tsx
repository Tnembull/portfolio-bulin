"use client";

import { usePortfolio } from "@/context/PortfolioContext";
import { Briefcase, MapPin, Calendar, Terminal } from "lucide-react";

export default function ExperienceTimeline() {
  const { state } = usePortfolio();
  const { experience } = state;

  return (
    <section id="experience" className="w-full bg-background py-2 px-2 font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-x border-line">
        {/* Header */}
        <div className="screen-line-top screen-line-bottom p-4 border-b border-line bg-muted/20">
          <div className="flex items-center justify-between mb-1.5">
            <span className="bg-[#48b685]/10 border border-[#48b685]/30 text-[#48b685] px-2.5 py-0.5 rounded-md font-bold text-[10px]">
              {experience.sectionBadge || "02. CAREER TIMELINE"}
            </span>
            <span className="text-[10px] text-[#48b685] font-bold uppercase tracking-widest flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-[#48b685] animate-pulse" />
              SYSTEM_LOG_HISTORY
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
            <span className="text-[#48b685] font-normal">const</span>{" "}
            {experience.titleMain || "Experience"}{" "}
            <span className="text-[#48b685] font-extrabold">
              = &quot;{experience.titleHighlight || "Career Journey"}&quot;
            </span>
          </h2>
          {experience.subText && (
            <p className="text-xs text-[#a392a3] leading-relaxed italic mt-1">
              {experience.subText}
            </p>
          )}
        </div>

        {/* Experience Items List */}
        <div className="p-4 space-y-4 border-b border-line bg-background">
          {experience.items?.map((item, idx) => (
            <div
              key={item.id || idx}
              className="cyber-card p-4 sm:p-6 rounded-xl border border-line space-y-3.5 shadow-xs transition-all hover:border-[#48b685] hover:bg-[#48b685]/5 transform hover:-translate-y-0.5"
            >
              {/* Header row: Company badge + Company name + Location */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-line pb-3">
                <div className="flex items-center gap-3">
                  <div className="size-9 rounded-xl border border-[#48b685]/40 bg-[#48b685]/15 flex items-center justify-center text-[#48b685] shrink-0 font-bold">
                    <Briefcase size={16} />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-foreground tracking-tight flex items-center gap-2">
                      <span>{item.company}</span>
                      {idx === 0 && (
                        <span className="text-[9px] font-extrabold text-[#48b685] bg-[#48b685]/10 border border-[#48b685]/30 px-2 py-0.5 rounded">
                          CURRENT_NODE
                        </span>
                      )}
                    </h3>
                    <h4 className="text-xs font-bold text-[#f99b15]">
                      {item.role}
                    </h4>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 text-[10px] self-start sm:self-auto">
                  <span className="flex items-center gap-1.5 bg-[#48b685]/10 text-[#48b685] border border-[#48b685]/30 px-2.5 py-1 rounded-md font-bold">
                    <Calendar size={11} className="text-[#48b685]" />
                    {item.year}
                  </span>
                  <span className="flex items-center gap-1.5 bg-[#48b685]/10 text-[#48b685] border border-[#48b685]/30 px-2.5 py-1 rounded-md font-bold">
                    <span className="size-1.5 rounded-full bg-[#48b685] animate-pulse" />
                    {item.jobType || "Full-time"}
                  </span>
                </div>
              </div>

              {/* Location Tag */}
              {item.location && (
                <div className="text-[11px] text-[#a392a3] flex items-center gap-1.5 font-bold">
                  <MapPin size={12} className="text-[#48b685]" />
                  <span>{item.location}</span>
                </div>
              )}

              {/* Description */}
              <div className="text-xs text-foreground/90 leading-relaxed border-l-2 border-[#48b685]/50 pl-3.5 italic">
                <p>{item.description}</p>
              </div>

              {/* Tech Stack Pills at bottom */}
              {item.tags && item.tags.length > 0 && (
                <div className="pt-2 flex flex-wrap gap-2 border-t border-line">
                  {item.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 rounded-md border border-[#48b685]/30 bg-[#48b685]/10 text-[10px] text-[#48b685] font-bold hover:bg-[#48b685]/20 transition-colors"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
