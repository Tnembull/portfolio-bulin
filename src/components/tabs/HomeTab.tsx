"use client";

import React from "react";
import Image from "next/image";
import { usePortfolio } from "@/context/PortfolioContext";
import { Project } from "@/data/projects";
import { TabType } from "@/components/app-layout/types";
import { ArrowUpRight } from "lucide-react";

interface HomeTabProps {
  onNavigateTab: (tab: TabType) => void;
}

export default function HomeTab({ onNavigateTab }: HomeTabProps) {
  const { state } = usePortfolio();
  const { hero, projects, skills } = state;

  const name = hero?.name || "Muhammad Nur Ashiddiqi";
  const role = hero?.role || "DevOps & Backend Engineer";
  const bio = hero?.bio || "";
  const avatarSrc = hero?.avatarOff || hero?.avatarOn || "/avatar.jpg";

  const featuredProjects: Project[] = projects?.items?.slice(0, 3) || [];
  const capabilityList = skills?.items || [];

  return (
    <div className="space-y-16 pb-12">
      {/* 1. Hero Section - Open Editorial Layout */}
      <section className="space-y-8 pt-2">
        <div className="flex flex-col-reverse md:flex-row md:items-start justify-between gap-8">
          {/* Left: Content */}
          <div className="space-y-5 max-w-2xl">
            {/* Status Overline */}
            <div className="flex items-center gap-2 text-xs font-mono text-accent uppercase tracking-wider">
              <span className="size-1.5 rounded-full bg-accent" />
              <span>{hero?.statusText || "Available for collaboration"}</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight text-foreground leading-[1.15]">
              {name}
            </h1>

            {/* Role Subtitle */}
            <p className="text-base sm:text-lg text-secondary font-medium">
              {role}
            </p>

            {/* Bio Body */}
            {bio && (
              <p className="text-sm sm:text-base text-secondary leading-relaxed">
                {bio}
              </p>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onNavigateTab("contact")}
                className="px-4 py-2.5 rounded-md bg-accent hover:bg-accent-hover text-accent-text font-semibold text-sm transition-colors cursor-pointer"
              >
                Get in Touch
              </button>

              <button
                onClick={() => onNavigateTab("projects")}
                className="px-4 py-2.5 rounded-md bg-surface hover:bg-surface-secondary text-foreground border border-border text-sm font-medium transition-colors cursor-pointer"
              >
                View Projects
              </button>

              <a
                href={state.github?.profileUrl || "https://github.com/Tnembull"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium text-secondary hover:text-foreground transition-colors"
              >
                <span>GitHub</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>

          {/* Right: Clean Profile Image */}
          <div className="shrink-0 self-start">
            <div className="size-24 sm:size-32 rounded-lg overflow-hidden border border-border bg-surface">
              <Image
                src={avatarSrc}
                alt={name}
                width={128}
                height={128}
                className="w-full h-full object-cover"
                priority
                unoptimized
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Selected Projects Section - Editorial List (Only if projects exist) */}
      {featuredProjects.length > 0 && (
        <>
          <hr className="border-border" />
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-mono uppercase tracking-wider text-muted">
                Selected Projects
              </h2>
              <button
                onClick={() => onNavigateTab("projects")}
                className="text-xs text-secondary hover:text-accent transition-colors cursor-pointer"
              >
                View all ({projects?.items?.length || 0}) ↗
              </button>
            </div>

            <div className="divide-y divide-border">
              {featuredProjects.map((item, idx) => (
                <article
                  key={item.id}
                  className="py-6 first:pt-0 last:pb-0 grid grid-cols-1 md:grid-cols-[60px_1fr_auto] gap-4 items-start"
                >
                  {/* Index Number */}
                  <span className="font-mono text-xs text-muted">
                    {String(idx + 1).padStart(2, "0")}
                  </span>

                  {/* Details */}
                  <div className="space-y-2">
                    <h3 className="text-base font-semibold text-foreground">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-secondary leading-relaxed max-w-2xl">
                      {item.description}
                    </p>
                    <div className="text-xs text-muted font-mono">
                      {(item.tags || item.tech || []).join(" · ")}
                    </div>
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-4 text-xs font-mono self-start pt-1">
                    {(item.githubUrl || item.link) && (
                      <a
                        href={item.githubUrl || item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-secondary hover:text-foreground inline-flex items-center gap-1 transition-colors"
                      >
                        <span>GitHub</span>
                        <ArrowUpRight size={12} />
                      </a>
                    )}
                    {(item.liveUrl || item.url) && (
                      <a
                        href={item.liveUrl || item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent hover:underline inline-flex items-center gap-1 transition-colors"
                      >
                        <span>Demo</span>
                        <ArrowUpRight size={12} />
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>
        </>
      )}

      {/* 3. Core Capabilities Summary (Dynamic from state.skills.items) */}
      {capabilityList.length > 0 && (
        <>
          <hr className="border-border" />
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-mono uppercase tracking-wider text-muted">
                {skills?.sectionBadge || "Technical Capabilities"}
              </h2>
              <button
                onClick={() => onNavigateTab("skills")}
                className="text-xs text-secondary hover:text-accent transition-colors cursor-pointer font-mono"
              >
                View all ({capabilityList.length}) ↗
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
              {capabilityList.map((skill, idx) => (
                <div key={skill.id || idx} className="space-y-1.5">
                  <h3 className="font-mono font-semibold text-foreground uppercase">
                    {skill.title}
                  </h3>
                  <p className="text-secondary leading-relaxed">
                    {skill.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
