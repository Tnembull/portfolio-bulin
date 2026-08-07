"use client";

import { usePortfolio } from "@/context/PortfolioContext";

export default function ToolsSlider() {
  const { state } = usePortfolio();
  const { tools } = state;

  const toolItems = tools.items || [];

  return (
    <section id="tools" className="w-full bg-background py-2 px-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-x border-line">
        {/* Header */}
        <div className="screen-line-top screen-line-bottom p-4 border-b border-line bg-muted/20 space-y-1">
          <span className="text-[10px] font-mono text-[#48b685] uppercase tracking-widest block bg-[#48b685]/10 border border-[#48b685]/30 px-2 py-0.5 rounded-md w-fit font-bold">
            {tools.sectionBadge || "05. TECH TOOLBOX"}
          </span>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground mt-1">
            <span className="text-[#48b685] font-normal">const</span>{" "}
            {tools.titleMain || "Backed by"}{" "}
            <span className="text-[#48b685]">
              {tools.titleHighlight || "DevOps Stack"}
            </span>
          </h2>
          <p className="text-xs font-mono text-[#a392a3] italic">
            Technologies & high-availability platforms powering SRE infrastructure.
          </p>
        </div>

        {/* Cyber Matrix Grid Cells */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-px bg-line border-b border-line">
          {toolItems.map((tool) => (
            <div
              key={tool.id}
              className="h-28 bg-card p-4 flex flex-col items-center justify-center hover:bg-[#48b685]/15 transition-all font-mono text-xs text-center space-y-1.5 group border border-transparent hover:border-[#48b685] cursor-default transform hover:-translate-y-0.5 shadow-xs"
            >
              <span className="font-bold text-foreground text-sm group-hover:text-[#48b685] transition-colors">{tool.name}</span>
              <span className="text-[10px] text-[#48b685] bg-[#48b685]/10 border border-[#48b685]/30 px-2 py-0.5 rounded-md font-extrabold uppercase tracking-wider">{tool.category}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
