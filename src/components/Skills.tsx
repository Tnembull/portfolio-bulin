"use client";

import { usePortfolio } from "@/context/PortfolioContext";
import CredlyBadges from "@/components/CredlyBadges";
import SkillBadges from "@/components/SkillBadges";

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

        {/* Tech Badges Pills ("Keahlian") */}
        <div className="py-4">
          <SkillBadges
            title=""
            items={skills?.pills}
          />
        </div>

        {/* Digital Certification Badges */}
        <div className="mt-14 sm:mt-18">
          <CredlyBadges />
        </div>
      </div>
    </section>
  );
}
