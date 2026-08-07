"use client";

import { usePortfolio } from "@/context/PortfolioContext";

export default function Skills() {
  const { state } = usePortfolio();
  const { skills } = state;

  const skillItems = skills.items || [];

  return (
    <section id="skills" className="w-full bg-background py-2 px-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-x border-line">
        {/* Header */}
        <div className="screen-line-top screen-line-bottom p-4 border-b border-line bg-muted/20">
          <span className="bg-[#48b685]/10 border border-[#48b685]/30 text-[#48b685] px-2.5 py-0.5 rounded-md font-bold text-[10px] w-fit inline-block">
            {skills.sectionBadge || "04. CAPABILITIES_MATRIX"}
          </span>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground mt-1.5">
            <span className="text-[#48b685] font-normal">const</span>{" "}
            {skills.titleMain || "Capabilities"}{" "}
            <span className="text-[#48b685]">
              {skills.titleHighlight || "Matrix"}
            </span>
          </h2>
        </div>

        {/* Categorized Stack Rows */}
        <div className="divide-y divide-line border-b border-line bg-background font-mono text-xs">
          {skillItems.map((item, idx) => (
            <div
              key={item.id || idx}
              className="p-3.5 sm:p-5 grid grid-cols-1 sm:grid-cols-[140px_1fr] md:grid-cols-[180px_1fr] gap-2.5 sm:gap-3 items-start hover:bg-[#48b685]/5 transition-colors"
            >
              {/* Left Column: Number & Category Title */}
              <div className="text-[#48b685] flex items-center gap-2">
                <span className="font-bold bg-[#48b685]/10 border border-[#48b685]/30 px-1.5 py-0.5 rounded text-[10px]">{item.num}</span>
                <span className="font-semibold tracking-wide uppercase text-foreground">{item.title}</span>
              </div>

              {/* Right Column: Cyber Pill tags */}
              <div className="flex flex-wrap gap-2">
                {item.desc.split(",").map((tech, tIdx) => (
                  <div
                    key={tIdx}
                    className="cyber-card px-3 py-1.5 rounded-lg border border-line hover:border-[#48b685] text-[#48b685] hover:bg-[#48b685]/15 flex items-center gap-2 shadow-xs transition-all cursor-default transform hover:-translate-y-0.5"
                  >
                    <span className="size-1.5 rounded-full bg-[#48b685] animate-pulse shrink-0" />
                    <span className="font-mono text-xs font-bold">{tech.trim()}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
