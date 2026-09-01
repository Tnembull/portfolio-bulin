"use client";

import React, { useState } from "react";
import { ArrowUpRight, Copy, Check, Mail, Github, Linkedin, MessageSquare } from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";

export default function CTA() {
  const { state } = usePortfolio();
  const { cta } = state;
  const [copied, setCopied] = useState(false);

  const email = cta?.email || "muhammadnurashiddiqi@gmail.com";
  const linkedinUrl = cta?.linkedinUrl || "https://www.linkedin.com/in/muhammadnurashiddiqi";
  const githubUrl = cta?.githubUrl || "https://github.com/Tnembull";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="w-full bg-[#0b0e12] py-16 sm:py-24 border-b border-[#303235]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="oxide-panel p-8 sm:p-14 text-center space-y-6 relative overflow-hidden">
          {/* Subtle Ambient Top Border Line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00d892] to-transparent opacity-50" />

          {/* Overline Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#14171b] border border-[#303235] rounded-[1px] font-mono text-[11px] tracking-[0.064em] uppercase text-[#00d892]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00d892] status-dot-pulse" />
            <span>INITIATE CONNECTION</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-normal font-sans tracking-[-0.01em] text-[#dedede]">
            {cta.title || "Get In Touch"}
          </h2>

          <p className="text-sm sm:text-base font-sans text-[#bababb] max-w-xl mx-auto leading-[1.42] font-normal">
            {cta.description ||
              "Interested in collaborating or have a question regarding DevOps, Kubernetes, or Cloud Infrastructure? Reach out anytime."}
          </p>

          {/* Action Row */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4 font-mono text-xs">
            <a
              href={`mailto:${email}`}
              className="oxide-button-filled inline-flex items-center gap-2 px-5 py-3 hover:shadow-lg transition-all"
            >
              <Mail size={14} className="text-[#00d892]" />
              <span>SEND EMAIL DIRECTLY</span>
              <ArrowUpRight className="w-4 h-4 text-[#00d892]" />
            </a>

            <button
              onClick={handleCopyEmail}
              className="oxide-button-ghost inline-flex items-center gap-2 px-4 py-3 hover:border-[#00d892] cursor-pointer transition-all"
              title="Copy email to clipboard"
            >
              {copied ? <Check size={14} className="text-[#00d892]" /> : <Copy size={14} className="text-[#818284]" />}
              <span>{copied ? "COPIED TO CLIPBOARD!" : "COPY EMAIL"}</span>
            </button>

            {linkedinUrl && (
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="oxide-button-ghost inline-flex items-center gap-2 px-4 py-3 hover:border-[#00d892] transition-all"
              >
                <Linkedin size={14} className="text-[#818284]" />
                <span>LINKEDIN</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#bababb]" />
              </a>
            )}

            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="oxide-button-ghost inline-flex items-center gap-2 px-4 py-3 hover:border-[#00d892] transition-all"
              >
                <Github size={14} className="text-[#818284]" />
                <span>GITHUB</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#bababb]" />
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
