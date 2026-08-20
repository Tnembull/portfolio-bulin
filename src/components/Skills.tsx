"use client";

import { usePortfolio } from "@/context/PortfolioContext";
import CredlyBadges from "@/components/CredlyBadges";

export default function Skills() {
  const { state } = usePortfolio();
  const { skills } = state;

  const skillItems = skills?.items || [];

  return (
    <section id="skills" className="w-full bg-slate-950 py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-8 pb-6 border-b border-slate-800/80">
          <p className="font-mono text-xs tracking-wider text-cyan-400 uppercase mb-1">
            {skills?.sectionBadge || "04. CAPABILITIES MATRIX"}
          </p>
          <h2 className="text-2xl sm:text-3xl font-sans font-bold tracking-tight text-slate-100">
            {skills?.titleMain || "Technical"}{" "}
            {skills?.titleHighlight || "Capabilities"}
          </h2>
        </div>

        {/* Skills Open Hairline Grid */}
        <div className="divide-y divide-slate-800/80 border-b border-slate-800/80">
          {skillItems.map((item, idx) => (
            <div
              key={item.id || idx}
              className="py-6 sm:py-8 grid grid-cols-1 md:grid-cols-[220px_1fr] gap-4 items-start"
            >
              {/* Category Title */}
              <div>
                <span className="font-mono text-xs font-bold text-cyan-400 uppercase tracking-wider">
                  {item.title}
                </span>
              </div>

              {/* Plain Text Tech Tags */}
              <div className="flex flex-wrap gap-2">
                {item.desc ? (
                  item.desc.split(",").map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="font-mono text-xs text-slate-200 px-2 py-1 rounded bg-slate-900 border border-slate-800/80"
                    >
                      {tech.trim()}
                    </span>
                  ))
                ) : null}
              </div>
            </div>
          ))}
        </div>

        {/* Digital Certification Badges */}
        <div className="mt-12 sm:mt-16">
          <CredlyBadges />
        </div>
      </div>
    </section>
  );
}
