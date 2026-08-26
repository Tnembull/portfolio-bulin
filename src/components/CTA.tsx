"use client";

import { ArrowUpRight } from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";

export default function CTA() {
  const { state } = usePortfolio();
  const { cta } = state;

  return (
    <section id="contact" className="w-full bg-[#0b0e12] py-16 sm:py-24 border-b border-[#303235]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="oxide-panel p-8 sm:p-12 text-center space-y-6">
          <p className="font-mono text-xs tracking-[0.064em] text-[#00d892] uppercase">
            INITIATE CONNECTION
          </p>

          <h2 className="text-3xl sm:text-5xl font-normal font-sans tracking-[-0.005em] text-[#dedede]">
            {cta.title || "Get In Touch"}
          </h2>

          <p className="text-sm sm:text-base font-sans text-[#bababb] max-w-xl mx-auto leading-[1.38] font-normal">
            {cta.description ||
              "Interested in collaborating or have a question regarding DevOps, Kubernetes, or Cloud Infrastructure? Reach out anytime."}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-4 font-mono text-xs">
            <a
              href={`mailto:${cta.email || "ashiddiqi.devops@gmail.com"}`}
              className="oxide-button-filled inline-flex items-center gap-2 px-5 py-2.5"
            >
              <span>{cta.email || "ashiddiqi.devops@gmail.com"}</span>
              <ArrowUpRight className="w-4 h-4 text-[#00d892]" />
            </a>

            {cta.linkedinUrl && (
              <a
                href={cta.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="oxide-button-ghost inline-flex items-center gap-2 px-4 py-2.5"
              >
                <span>LINKEDIN</span>
                <ArrowUpRight className="w-4 h-4 text-[#bababb]" />
              </a>
            )}

            {cta.githubUrl && (
              <a
                href={cta.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="oxide-button-ghost inline-flex items-center gap-2 px-4 py-2.5"
              >
                <span>GITHUB</span>
                <ArrowUpRight className="w-4 h-4 text-[#bababb]" />
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
