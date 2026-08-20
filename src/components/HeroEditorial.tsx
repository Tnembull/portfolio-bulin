"use client";

import React from "react";
import { usePortfolio } from "@/context/PortfolioContext";
import { ArrowUpRight, Github, Mail } from "lucide-react";

export default function HeroEditorial() {
  const { state } = usePortfolio();
  const hero = state?.hero;
  const githubUrl = state?.github?.profileUrl || "https://github.com/Tnembull";

  const name = hero?.name || "Muhammad Nur Ashiddiqi";
  const role = hero?.role || "DevOps & Backend Engineer";
  const bio = hero?.bio || "Backend Developer (S.Kom Unila) turned DevOps Engineer. Experienced in building structured REST APIs, PostgreSQL optimization, Docker containerization & automated CI/CD deployment pipelines.";
  const email = hero?.email || "muhammadnurashiddiqi@gmail.com";
  const statusText = hero?.statusText || "Available for Engineering & DevOps Projects";

  return (
    <section className="relative w-full pt-28 pb-16 sm:pt-36 sm:pb-24 border-b border-slate-800/80 bg-slate-950 text-slate-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Status Tag */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-800 bg-slate-900/60 font-mono text-xs text-slate-300 mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-semibold text-slate-400">[LIVE_STATUS]</span>
          <span>{statusText}</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-slate-100 mb-4 leading-tight">
          {name}
        </h1>

        {/* Sub-headline / Role */}
        <p className="font-mono text-sm sm:text-base text-slate-400 mb-6 uppercase tracking-wider">
          {role}
        </p>

        {/* Subtext / Bio */}
        <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed mb-10">
          {bio}
        </p>

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap items-center gap-4">
          <a
            href={`mailto:${email}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded border border-slate-700 bg-slate-100 text-slate-950 font-medium text-sm hover:bg-white hover:border-white transition-colors duration-200"
          >
            <Mail className="w-4 h-4" />
            <span>Contact Email</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>

          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded border border-slate-800 bg-slate-900 text-slate-200 font-medium text-sm hover:bg-slate-800 hover:text-white hover:border-slate-700 transition-colors duration-200"
          >
            <Github className="w-4 h-4" />
            <span>GitHub Profile</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
