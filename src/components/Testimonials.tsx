"use client";

import { usePortfolio } from "@/context/PortfolioContext";
import { ArrowRight } from "lucide-react";

export default function Testimonials() {
  const { state } = usePortfolio();
  const { testimonials } = state;

  const testimonialItems = testimonials.items || [];

  return (
    <section id="testimonials" className="w-full bg-background py-2 px-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-x border-line">
        {/* Header */}
        <div className="screen-line-top screen-line-bottom p-4 border-b border-line bg-muted/20">
          <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest mb-1">
            <span className="bg-[#48b685]/10 border border-[#48b685]/30 text-[#48b685] px-2.5 py-0.5 rounded-md font-bold text-[10px]">
              {testimonials.sectionBadge || "10. RECOMMENDATIONS"}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground mt-1">
            <span className="text-[#48b685] font-normal">const</span>{" "}
            {testimonials.titleMain || "Trusted by Leaders &"}{" "}
            <span className="text-[#48b685]">
              {testimonials.titleHighlight || "Peers"}
            </span>
          </h2>
        </div>

        {/* Testimonial Cards Grid */}
        <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-3 gap-5 border-b border-line bg-background">
          {testimonialItems.map((item) => (
            <div
              key={item.id}
              className="cyber-card p-4 rounded-xl border border-line hover:border-[#48b685]/40 transition-all flex flex-col justify-between space-y-3"
            >
              <blockquote className="font-mono text-xs text-foreground leading-relaxed border-l-2 border-[#48b685]/30 pl-2.5">
                &ldquo;{item.content}&rdquo;
              </blockquote>

              <div className="flex items-center gap-3 pt-2 border-t border-line font-mono">
                <div className="size-8 rounded-lg bg-[#48b685]/10 border border-[#48b685]/30 flex items-center justify-center font-mono text-xs font-bold text-[#48b685] shrink-0">
                  {item.author ? item.author.charAt(0) : "A"}
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-foreground truncate">
                    {item.author}
                  </h4>
                  <p className="text-[11px] text-[#f99b15] truncate font-semibold">
                    {item.role} {item.company ? `@ ${item.company}` : ""}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Button */}
        <div className="p-3 border-b border-line bg-background flex justify-center">
          <button className="px-4 py-1.5 rounded-lg border border-[#48b685]/30 bg-[#48b685]/10 font-mono text-xs text-[#48b685] flex items-center gap-1.5 hover:bg-[#48b685]/20 hover:border-[#48b685] transition-all cursor-pointer font-bold">
            <span>ALL SYSTEM ENDORSEMENTS</span>
            <ArrowRight size={13} />
          </button>
        </div>
      </div>
    </section>
  );
}
