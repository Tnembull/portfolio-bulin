"use client";

import { usePortfolio } from "@/context/PortfolioContext";

export default function Stats() {
  const { state } = usePortfolio();
  const { stats } = state;

  const statItems = stats || [];

  return (
    <section id="stats" className="w-full bg-background py-2 px-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-x border-line">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-line border-b border-line">
          {statItems.map((stat) => (
            <div
              key={stat.id}
              className="p-6 bg-card text-center space-y-2 font-mono hover:bg-[#48b685]/15 transition-all border border-transparent hover:border-[#48b685] transform hover:-translate-y-0.5 shadow-xs cursor-default"
            >
              <div className="text-3xl sm:text-4xl font-extrabold text-[#48b685] tracking-tight">
                {stat.value}
                <span className="text-[#48b685]">{stat.suffix}</span>
              </div>
              <p className="text-[10px] text-[#48b685] font-extrabold uppercase tracking-widest bg-[#48b685]/15 border border-[#48b685]/40 px-3 py-1 rounded-md inline-block shadow-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
