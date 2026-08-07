"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";

export default function FAQ() {
  const { state } = usePortfolio();
  const { faq } = state;
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqItems = faq.items || [];

  return (
    <section id="faq" className="w-full bg-background py-2 px-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-x border-line">
        {/* Header */}
        <div className="screen-line-top screen-line-bottom p-4 border-b border-line bg-muted/20">
          <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest mb-1">
            <span className="bg-[#48b685]/10 border border-[#48b685]/30 text-[#48b685] px-2.5 py-0.5 rounded-md font-bold text-[10px]">
              {faq.sectionBadge || "09. CYBER_VAULT_FAQ"}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground mt-1">
            <span className="text-[#48b685] font-normal">const</span>{" "}
            {faq.titleMain || "Questions &"}{" "}
            <span className="text-[#48b685]">
              {faq.titleHighlight || "Answers"}
            </span>
          </h2>
        </div>

        {/* Accordion List */}
        <div className="divide-y divide-line border-b border-line">
          {faqItems.map((item, i) => (
            <div key={item.id || i} className="bg-background font-mono">
              <button
                onClick={() => setActiveIndex(activeIndex === i ? null : i)}
                className="w-full p-4 flex items-center justify-between gap-4 text-left hover:bg-[#48b685]/5 transition-colors cursor-pointer"
              >
                <span className="font-mono font-bold text-xs sm:text-sm text-foreground flex items-center gap-2">
                  <span className="text-[#48b685] text-[11px]">[{String(i + 1).padStart(2, "0")}]</span>
                  <span className="hover:text-[#48b685] transition-colors">{item.question}</span>
                </span>
                <ChevronDown
                  size={14}
                  className={`text-[#48b685] transition-transform duration-200 shrink-0 ${
                    activeIndex === i ? "rotate-180 text-[#48b685]" : ""
                  }`}
                />
              </button>

              {activeIndex === i && (
                <div className="px-4 pb-4 font-mono text-xs text-foreground/80 leading-relaxed pl-10 border-l-2 border-[#48b685]/40 ml-4 mb-2">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
