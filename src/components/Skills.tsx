"use client";

import { usePortfolio } from "@/context/PortfolioContext";
import CredlyBadges from "@/components/CredlyBadges";

export default function Skills() {
  const { state } = usePortfolio();
  const { skills } = state;

  const skillItems = skills?.items || [];

  const rawBadge = skills?.sectionBadge || "CAPABILITIES MATRIX & SPECIFICATIONS";
  const cleanBadge = rawBadge.replace(/^(\/\/\s*|\d+\.\s*)*/i, "");

  return (
    <section id="skills" className="w-full bg-[#0b0e12] py-16 sm:py-24 border-b border-[#303235]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Section Header */}
        <div className="mb-10 pb-6 border-b border-[#303235]">
          <p className="font-mono text-xs tracking-[0.064em] text-[#00d892] uppercase mb-2">
            {cleanBadge}
          </p>
          <h2 className="text-2xl sm:text-4xl font-normal font-sans text-[#dedede] tracking-[-0.003em]">
            {skills?.titleMain || "Technical"}{" "}
            {skills?.titleHighlight || "Capabilities"}
          </h2>
        </div>

        {/* Skills Hairline Grid - Clean plain text tags, no SYS.01 prefixes */}
        <div className="divide-y divide-[#303235] border-b border-[#303235]">
          {skillItems.map((item, idx) => (
            <div
              key={item.id || idx}
              className="py-6 sm:py-8 grid grid-cols-1 md:grid-cols-[260px_1fr] gap-4 items-start hover:bg-[#181a1d]/50 px-3 -mx-3 rounded-[1px] transition-colors"
            >
              {/* Category Title */}
              <div>
                <span className="font-mono text-xs text-[#dedede] uppercase tracking-[0.058em]">
                  {item.title}
                </span>
              </div>

              {/* Plain text tech tags */}
              <div className="flex flex-wrap gap-x-4 gap-y-2 font-mono text-xs text-[#bababb] tracking-[0.053em]">
                {item.desc ? (
                  item.desc.split(",").map((tech, tIdx) => (
                    <span key={tIdx} className="hover:text-[#dedede] transition-colors">
                      {tech.trim()}
                    </span>
                  ))
                ) : null}
              </div>
            </div>
          ))}
        </div>

        {/* Digital Certification Badges */}
        <div className="mt-14 sm:mt-18">
          <CredlyBadges />
        </div>
      </div>
    </section>
  );
}
