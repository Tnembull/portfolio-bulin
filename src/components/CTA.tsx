"use client";

import { Mail, Linkedin, Github, ArrowUpRight } from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";

export default function CTA() {
  const { state } = usePortfolio();
  const { cta } = state;

  return (
    <section id="contact" className="w-full bg-background py-2 px-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-x border-line">
        {/* Header */}
        <div className="screen-line-top screen-line-bottom p-6 sm:p-8 border-b border-line bg-muted/20 text-center space-y-4 relative overflow-hidden">
          <div className="scanline-overlay absolute inset-0 pointer-events-none" />
          
          <span className="text-[10px] font-mono text-[#48b685] uppercase tracking-widest bg-[#48b685]/10 border border-[#48b685]/30 px-3 py-1 rounded-md inline-block font-bold">
            [ INITIATE CONNECTION ]
          </span>

          <h2 className="text-2xl sm:text-4xl font-extrabold font-sans tracking-tight text-foreground">
            {cta.title || "Get In Touch"}
          </h2>

          <p className="text-xs font-mono text-[#a392a3] max-w-md mx-auto leading-relaxed italic">
            {cta.description ||
              "Interested in collaborating or have a question regarding DevOps, Kubernetes, or Cloud Infrastructure? Reach out anytime."}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 font-mono text-xs relative z-10">
            <a
              href={`mailto:${cta.email || "ashiddiqi.devops@gmail.com"}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[#48b685] bg-[#48b685]/20 text-[#48b685] font-bold hover:bg-[#48b685]/30 transition-all"
            >
              <Mail size={14} className="text-[#48b685]" />
              <span>{cta.email || "ashiddiqi.devops@gmail.com"}</span>
              <ArrowUpRight size={13} />
            </a>

            {cta.linkedinUrl && (
              <a
                href={cta.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-[#48b685]/30 bg-[#48b685]/10 hover:bg-[#48b685]/20 text-[#48b685] font-bold transition-all"
              >
                <Linkedin size={14} />
                <span>LinkedIn</span>
              </a>
            )}

            {cta.githubUrl && (
              <a
                href={cta.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-[#48b685]/30 bg-[#48b685]/10 hover:bg-[#48b685]/20 text-[#48b685] font-bold transition-all"
              >
                <Github size={14} />
                <span>GitHub</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
