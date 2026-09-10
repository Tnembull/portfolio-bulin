"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePortfolio } from "@/context/PortfolioContext";
import { Project } from "@/data/projects";
import { TabType } from "@/components/app-layout/types";
import { ArrowUpRight } from "lucide-react";
import ClientsMarquee from "@/components/ClientsMarquee";
import SkillBadges from "@/components/SkillBadges";
import CategorySkillIcon from "@/components/CategorySkillIcon";

interface HomeTabProps {
  onNavigateTab?: (tab: TabType) => void;
}

export default function HomeTab({ onNavigateTab }: HomeTabProps = {}) {
  const { state } = usePortfolio();
  const { hero, projects, skills } = state;

  const name = hero?.name || "Muhammad Nur Ashiddiqi";
  const role = hero?.role || "DevOps & Backend Engineer";
  const bio = hero?.bio || "";
  const avatarSrc = hero?.avatarOff || hero?.avatarOn || "/images/profile-hero.webp";

  const featuredProjects: Project[] = projects?.items?.slice(0, 3) || [];
  const capabilityList = skills?.items || [];

  return (
    <div className="space-y-16 pb-12">
      {/* 1. Hero Section - Open Editorial Layout */}
      <section className="space-y-8 pt-2">
        <div className="flex flex-col-reverse md:flex-row md:items-center justify-between gap-8 md:gap-12">
          {/* Left: Content */}
          <div className="space-y-5 max-w-2xl flex-1">
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

            {/* Action Buttons: 3 columns in 1 single row */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-2 w-full max-w-md">
              <Link
                href="/contact"
                className="px-2 sm:px-4 py-2 sm:py-2.5 rounded-md bg-accent hover:bg-accent-hover text-accent-text font-semibold text-xs sm:text-sm transition-colors cursor-pointer inline-flex items-center justify-center text-center truncate"
              >
                <span className="hidden min-[360px]:inline">Get in Touch</span>
                <span className="min-[360px]:hidden">Contact</span>
              </Link>

              <Link
                href="/projects"
                className="px-2 sm:px-4 py-2 sm:py-2.5 rounded-md bg-surface hover:bg-surface-secondary text-foreground border border-border text-xs sm:text-sm font-medium transition-colors cursor-pointer inline-flex items-center justify-center text-center truncate"
              >
                <span className="hidden min-[360px]:inline">View Projects</span>
                <span className="min-[360px]:hidden">Projects</span>
              </Link>

              <a
                href={state.github?.profileUrl || "https://github.com/Tnembull"}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2 sm:px-4 py-2 sm:py-2.5 rounded-md bg-surface hover:bg-surface-secondary text-foreground border border-border text-xs sm:text-sm font-medium transition-colors inline-flex items-center justify-center gap-1 text-center truncate"
              >
                <span>GitHub</span>
                <ArrowUpRight size={13} className="shrink-0" />
              </a>
            </div>
          </div>

          {/* Right: Seamless Unboxed Portrait (Grounded with Soft Natural Fade, Zero Boxes) */}
          <div className="shrink-0 self-center md:self-end flex justify-center w-full md:w-auto pt-4 md:pt-0">
            <div className="relative group flex flex-col items-center">
              {/* Soft Ambient Radial Glow Behind Person (Smooth, No Borders/Boxes) */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 sm:w-80 h-64 sm:h-80 bg-[radial-gradient(circle_at_center,var(--accent)_0%,transparent_70%)] opacity-15 dark:opacity-25 blur-3xl pointer-events-none -z-10 group-hover:opacity-35 transition-opacity duration-500" />

              {/* Portrait Image with Pure Smooth Bottom Gradient Fade */}
              <div className="relative w-52 sm:w-64 md:w-72 lg:w-80 [mask-image:linear-gradient(to_bottom,black_50%,transparent_96%)] [-webkit-mask-image:linear-gradient(to_bottom,black_50%,transparent_96%)]">
                <Image
                  src={avatarSrc}
                  alt={name}
                  width={720}
                  height={720}
                  className="w-full h-auto object-contain object-bottom group-hover:scale-[1.02] transition-transform duration-500"
                  priority
                  sizes="(max-width: 640px) 208px, (max-width: 768px) 256px, 320px"
                  unoptimized
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clients & Organizations Marquee */}
      <ClientsMarquee />

      {/* 2. Selected Projects Section - Editorial List (Only if projects exist) */}
      {featuredProjects.length > 0 && (
        <>
          <hr className="border-border" />
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-mono uppercase tracking-wider text-muted">
                Selected Projects
              </h2>
              <Link
                href="/projects"
                className="text-xs text-secondary hover:text-accent transition-colors cursor-pointer"
              >
                View all ({projects?.items?.length || 0}) ↗
              </Link>
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

      {/* 3. Core Capabilities Summary (Dynamic from state.skills.items & pills) */}
      {(capabilityList.length > 0 || (skills?.pills && skills.pills.length > 0)) && (
        <>
          <hr className="border-border" />
          <section className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-mono uppercase tracking-wider text-muted">
                {skills?.sectionBadge || "SKILLS"}
              </h2>
              <Link
                href="/skills"
                className="text-xs text-secondary hover:text-accent transition-colors cursor-pointer font-mono"
              >
                View all ({capabilityList.length}) ↗
              </Link>
            </div>

            {/* A. Tech Badges Pills ("Keahlian" Logos) */}
            {skills?.pills && skills.pills.length > 0 && (
              <div className="pb-1">
                <SkillBadges title="" items={skills.pills} />
              </div>
            )}

            {/* B. Core Capabilities Grid with Category Icons */}
            {capabilityList.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs pt-2">
                {capabilityList.map((skill, idx) => (
                  <div key={skill.id || idx} className="space-y-2 group">
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 rounded-md bg-accent/10 border border-accent/20 text-accent group-hover:scale-110 transition-transform shrink-0">
                        <CategorySkillIcon icon={skill.icon} title={skill.title} size={15} />
                      </div>
                      <h3 className="font-mono font-semibold text-foreground uppercase tracking-tight text-xs leading-snug">
                        {skill.title}
                      </h3>
                    </div>
                    <p className="text-secondary leading-relaxed">
                      {skill.desc}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
}
