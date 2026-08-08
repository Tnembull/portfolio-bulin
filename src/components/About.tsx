"use client";

import { usePortfolio } from "@/context/PortfolioContext";

export default function About() {
  const { state } = usePortfolio();
  const { about } = state;

  return (
    <section id="about-details" className="w-full bg-background py-2 px-2 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-x border-line">
        {/* Header */}
        <div className="screen-line-top screen-line-bottom p-4 border-b border-line bg-muted/20">
          <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest mb-1">
            <span className="bg-[#48b685]/10 border border-[#48b685]/30 text-[#48b685] px-2.5 py-0.5 rounded-md font-bold text-[10px]">
              {about.sectionBadge || "01. BIOGRAPHY & OVERVIEW"}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground font-sans">
            <span className="text-[#48b685] font-mono font-normal">class</span>{" "}
            {about.titleMain || "SoftwareEngineering"}{" "}
            <span className="text-[#48b685]">
              {about.titleHighlight || "implements DevOps"}
            </span>
          </h2>
        </div>

        {/* Bio Text & Highlights Bento Grid */}
        <div className="p-4 sm:p-6 border-b border-line space-y-4">
          <p className="text-sm sm:text-base text-[#a392a3] leading-relaxed max-w-3xl border-l-2 border-[#48b685]/50 pl-3.5 font-sans">
            {about.bioText ||
              "Saya Muhammad Nur Ashiddiqi (Bulin), lulusan Sarjana Ilmu Komputer (S.Kom) Universitas Lampung yang kini berkarir sebagai Backend & DevOps Engineer di Newus Teknologi."}
          </p>

          {/* Highlights Bento Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
            {about.highlights?.map((item, idx) => {
              const isOddLast = about.highlights && about.highlights.length % 2 !== 0 && idx === about.highlights.length - 1;
              return (
                <div
                  key={item.id}
                  className={`cyber-card p-3.5 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-xs ${
                    isOddLast ? "sm:col-span-2" : ""
                  }`}
                >
                  <span className="text-[#f99b15] text-[10px] font-mono font-bold uppercase tracking-widest shrink-0 flex items-center gap-1.5">
                    <span className="text-[#48b685]">const</span>
                    {item.label}:
                  </span>
                  <span className="font-mono font-bold text-[#48b685] bg-[#48b685]/10 border border-[#48b685]/30 px-2.5 py-1 rounded-md text-[11px] break-words text-left sm:text-right">
                    &quot;{item.value}&quot;
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Core Principles Bento Grid */}
        <div className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 border-b border-line bg-background">
          {about.values?.map((val) => (
            <div
              key={val.id}
              className="cyber-card p-4 sm:p-5 rounded-xl border border-line space-y-2.5 hover:border-[#48b685] hover:bg-[#48b685]/5 transition-all transform hover:-translate-y-1 active:scale-[0.98] shadow-xs cursor-default"
            >
              <div className="flex items-center justify-between text-xs border-b border-line pb-2 font-mono">
                <span className="font-extrabold text-[#48b685] bg-[#48b685]/10 border border-[#48b685]/30 px-2 py-0.5 rounded text-[11px]">{val.num}</span>
                <span className="text-[10px] uppercase tracking-widest bg-[#48b685]/15 text-[#48b685] px-2 py-0.5 rounded border border-[#48b685]/40 font-bold">
                  CORE_PRINCIPLE
                </span>
              </div>
              <h3 className="text-base font-bold text-foreground tracking-tight font-sans">
                {val.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#a392a3] leading-relaxed font-sans">
                {val.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
