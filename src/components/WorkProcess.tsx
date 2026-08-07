"use client";

import { usePortfolio } from "@/context/PortfolioContext";

export default function WorkProcess() {
  const { state } = usePortfolio();
  const { process } = state;

  const processItems = process.items || [];

  return (
    <section id="process" className="w-full bg-background py-2 px-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-x border-line">
        {/* Header */}
        <div className="screen-line-top screen-line-bottom p-4 border-b border-line bg-muted/20">
          <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest mb-1">
            <span className="bg-[#48b685]/10 border border-[#48b685]/30 text-[#48b685] px-2.5 py-0.5 rounded-md font-bold text-[10px]">
              {process.sectionBadge || "05. PIPELINE_EXECUTION_FLOW"}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground mt-1">
            <span className="text-[#48b685] font-normal">const</span>{" "}
            {process.titleMain || "Execution"}{" "}
            <span className="text-[#48b685]">
              {process.titleHighlight || "Pipeline Matrix"}
            </span>
          </h2>
          {process.subText && (
            <p className="text-xs font-mono text-[#a392a3] mt-1 italic">
              {process.subText}
            </p>
          )}
        </div>

        {/* Process Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-line border-b border-line">
          {processItems.map((step) => (
            <div
              key={step.id}
              className="cyber-card p-5 bg-card hover:bg-[#48b685]/10 transition-all space-y-2.5 border border-transparent hover:border-[#48b685] transform hover:-translate-y-0.5 shadow-xs"
            >
              <div className="flex items-center justify-between font-mono text-xs text-[#48b685] border-b border-line pb-2">
                <span className="font-extrabold tracking-widest text-[#f99b15] uppercase">{step.phase}</span>
                <span className="size-7 rounded-lg border border-[#48b685]/40 bg-[#48b685]/15 flex items-center justify-center text-xs font-extrabold text-[#48b685]">
                  {step.num}
                </span>
              </div>
              <h3 className="font-mono font-bold text-sm text-foreground pt-1">
                {step.title}
              </h3>
              <p className="text-xs text-[#a392a3] leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
