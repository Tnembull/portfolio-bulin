"use client";

import React from "react";
import { usePortfolio } from "@/context/PortfolioContext";
import { ArrowUpRight } from "lucide-react";

export default function HeroEditorial() {
  const { state } = usePortfolio();
  const hero = state?.hero;
  const githubUrl = state?.github?.profileUrl || "https://github.com/Tnembull";

  const name = hero?.name || "Muhammad Nur Ashiddiqi";
  const role = hero?.role || "DevOps & Backend Engineer";
  const bio =
    hero?.bio ||
    "Backend Developer (S.Kom Unila) turned DevOps Engineer. Experienced in building structured REST APIs, PostgreSQL optimization, Docker containerization & automated CI/CD deployment pipelines.";
  const email = hero?.email || "muhammadnurashiddiqi@gmail.com";
  const statusText = hero?.statusText || "AVAILABLE FOR DEVOPS ENGAGEMENTS";

  return (
    <section className="relative w-full bg-[#0b0e12] text-[#bababb] pt-20 pb-16 sm:pt-28 sm:pb-24 border-b border-[#303235]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Status Readout (Clean text, no FIG 1) */}
        <div className="inline-block px-2.5 py-1 bg-[#181a1d] border border-[#303235] rounded-[1px] font-mono text-[11px] tracking-[0.064em] uppercase text-[#00d892] mb-8">
          <span className="text-[#818284]">STATUS: </span>
          <span className="text-[#00d892]">{statusText}</span>
        </div>

        {/* Main Split Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Headline, Bio & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            {/* Role Header (No // prefix) */}
            <p className="font-mono text-xs text-[#818284] tracking-[0.058em] uppercase">
              {role}
            </p>

            {/* Display Headline */}
            <h1 className="text-4xl sm:text-6xl font-normal text-[#dedede] leading-[1.10] tracking-[-0.005em]">
              {name}
            </h1>

            {/* Bio Body Copy */}
            <p className="text-base sm:text-lg text-[#bababb] leading-[1.38] max-w-2xl font-normal">
              {bio}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-4 font-mono text-xs">
              <a
                href={`mailto:${email}`}
                className="oxide-button-filled inline-flex items-center gap-2 px-4 py-2.5"
              >
                <span>INITIATE CONTACT</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#00d892]" />
              </a>

              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="oxide-button-ghost inline-flex items-center gap-2 px-4 py-2.5"
              >
                <span>GITHUB READOUT</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#bababb]" />
              </a>
            </div>
          </div>

          {/* Right Column: Terminal Mockup Panel */}
          <div className="lg:col-span-5 oxide-panel p-5 font-mono text-xs space-y-4">
            <div className="flex items-center justify-between border-b border-[#303235] pb-2 text-[11px] tracking-[0.053em]">
              <span className="text-[#dedede]">SYS_SPEC.SH</span>
              <span className="text-[#00d892] text-[10px] uppercase">CLI READY</span>
            </div>

            <div className="space-y-2 text-[11px] leading-relaxed text-[#bababb]">
              <div className="flex gap-2">
                <span className="text-[#00d892]">$</span>
                <span className="text-[#dedede]">uname -a</span>
              </div>
              <p className="text-[#818284] pl-3">Linux node-01 6.1.0-cloud #1 SMP x86_64</p>

              <div className="flex gap-2 pt-1">
                <span className="text-[#00d892]">$</span>
                <span className="text-[#dedede]">kubectl get nodes -o wide</span>
              </div>
              <div className="pl-3 text-[#818284] space-y-0.5 text-[10px]">
                <p>k8s-master-01   Ready   v1.30.0   10.0.1.10</p>
                <p>k8s-worker-01   Ready   v1.30.0   10.0.1.11</p>
                <p>k8s-worker-02   Ready   v1.30.0   10.0.1.12</p>
              </div>

              <div className="flex gap-2 pt-1">
                <span className="text-[#00d892]">$</span>
                <span className="text-[#dedede]">docker ps --format json</span>
              </div>
              <p className="text-[#00d892] pl-3">STATUS: 4 CONTAINERS RUNNING</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
