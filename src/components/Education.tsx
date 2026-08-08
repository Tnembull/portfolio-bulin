"use client";

import { usePortfolio, EducationItem } from "@/context/PortfolioContext";
import { GraduationCap, Calendar} from "lucide-react";

export default function Education() {
  const { state } = usePortfolio();
  const education = state.education;

  if (!education || !education.items || education.items.length === 0) {
    return null;
  }

  return (
    <section id="education" className="w-full bg-background border-b border-line py-2 font-mono text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-x border-line p-4 sm:p-6 space-y-6">
        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-line pb-4">
          <div className="flex items-center gap-2">
            <span className="bg-[#48b685]/10 border border-[#48b685]/30 text-[#48b685] px-2.5 py-0.5 rounded-md font-bold text-[10px]">
              {education.sectionBadge || "03. ACADEMIC BACKGROUND"}
            </span>
          </div>
          <span className="text-[10px] text-[#48b685] font-bold uppercase tracking-widest bg-[#48b685]/10 border border-[#48b685]/30 px-2 py-0.5 rounded">
            [ ACADEMIC_MATRIX_LOGS ]
          </span>
        </div>

        {/* Title */}
        <div className="space-y-1">
          <h2 className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight">
            <span className="text-[#48b685] font-normal">const</span>{" "}
            {education.titleMain}{" "}
            <span className="text-[#48b685] font-extrabold">{education.titleHighlight}</span>
          </h2>
          <p className="text-[#a392a3] text-xs leading-relaxed italic">
            Rekam jejak akademik & riwayat pendidikan formal Muhammad Nur Ashiddiqi (Bulin).
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 gap-4 p-4 sm:p-6 border-b border-line bg-background font-mono text-xs">
          {education.items.map((item: EducationItem) => (
            <div
              key={item.id}
              className="cyber-card p-4 sm:p-6 rounded-xl border border-line space-y-3.5 shadow-xs transition-all hover:border-[#48b685] hover:bg-[#48b685]/5 transform hover:-translate-y-0.5"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-line pb-3">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-xl bg-[#48b685]/15 border border-[#48b685]/40 flex items-center justify-center text-[#48b685] shrink-0">
                    <GraduationCap size={18} />
                  </div>
                  <div className="space-y-0.5">
                    <h3 className="font-bold text-foreground text-sm sm:text-base tracking-tight">
                      {item.institution}
                    </h3>
                    <p className="text-[#f99b15] font-bold text-xs">
                      {item.degree}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-[10px] shrink-0 self-start sm:self-auto">
                  <span className="flex items-center gap-1.5 bg-[#48b685]/10 text-[#48b685] px-2.5 py-1 rounded-md border border-[#48b685]/30 font-bold">
                    <Calendar size={11} className="text-[#48b685]" />
                    {item.year}
                  </span>
                  {item.gpa && (
                    <span className="flex items-center gap-1 bg-[#48b685] text-[#19131a] border border-[#48b685] px-3 py-1 rounded-md font-extrabold shadow-[0_0_12px_rgba(72,182,133,0.4)]">
                      {item.gpa}
                    </span>
                  )}
                </div>
              </div>

              {item.details && (
                <p className="text-foreground/90 text-xs leading-relaxed border-l-2 border-[#48b685]/50 pl-3.5 italic">
                  {item.details}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
