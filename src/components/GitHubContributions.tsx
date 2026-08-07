"use client";

import { GitHubCalendar } from "react-github-calendar";
import { ArrowUpRight } from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";

export default function GitHubContributions() {
  const { state } = usePortfolio();
  const { github } = state;

  const calendarTheme = {
    light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
    dark: ["#07090e", "#0e4429", "#006d32", "#26a641", "#39d353"],
  };

  return (
    <section id="github" className="w-full bg-background py-2 px-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-x border-line">
        {/* Header */}
        <div className="screen-line-top screen-line-bottom p-4 border-b border-line bg-muted/20 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest mb-1">
              <span className="bg-[#48b685]/10 border border-[#48b685]/30 text-[#48b685] px-2.5 py-0.5 rounded-md font-bold text-[10px]">
                {github.sectionBadge || "07. MATRIX_CONTRIBUTION_GRAPH"}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground mt-1">
              <span className="text-[#48b685] font-normal">const</span>{" "}
              {github.titleMain || "GitHub Activity &"}{" "}
              <span className="text-[#48b685]">
                {github.titleHighlight || "Matrix Logs"}
              </span>
            </h2>
          </div>

          <a
            href={github.profileUrl || "https://github.com/ashiddiqi"}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-[#48b685] hover:text-white inline-flex items-center gap-1 border border-[#48b685]/30 bg-[#48b685]/10 px-3 py-1.5 rounded-lg hover:border-[#48b685] transition-all font-bold"
          >
            <span>@{github.username || "ashiddiqi"}</span>
            <ArrowUpRight size={13} />
          </a>
        </div>

        {/* Calendar Box */}
        <div className="p-4 sm:p-5 border-b border-line bg-card flex justify-center overflow-x-auto">
          <GitHubCalendar
            username={github.username || "Tnembull"}
            theme={calendarTheme}
            fontSize={11}
            blockSize={10}
            blockMargin={3}
          />
        </div>
      </div>
    </section>
  );
}
