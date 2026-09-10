"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePortfolio } from "@/context/PortfolioContext";
import { Project } from "@/data/projects";
import { TabType } from "@/components/app-layout/types";
import { ArrowUpRight, Github, LayoutGrid, List } from "lucide-react";
import ClientsMarquee from "@/components/ClientsMarquee";
import SkillBadges from "@/components/SkillBadges";
import CategorySkillIcon from "@/components/CategorySkillIcon";

interface HomeTabProps {
  onNavigateTab?: (tab: TabType) => void;
}

export default function HomeTab({ onNavigateTab }: HomeTabProps = {}) {
  const { state } = usePortfolio();
  const { hero, projects, skills } = state;

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

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

      {/* 2. Selected Projects Section - Grid & List View with Previews */}
      {featuredProjects.length > 0 && (
        <>
          <hr className="border-border" />
          <section className="space-y-6">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <h2 className="text-xs font-mono uppercase tracking-wider text-muted">
                  Selected Projects
                </h2>
                <span className="text-[10px] font-mono text-muted/80">
                  ({projects?.items?.length || 0})
                </span>
              </div>

              {/* View Switcher Controls (Grid / List) & View All Link */}
              <div className="flex items-center gap-3">
                <div className="flex items-center bg-surface-secondary border border-border rounded-md p-0.5">
                  <button
                    type="button"
                    onClick={() => setViewMode("grid")}
                    className={`p-1.5 rounded transition-colors cursor-pointer ${
                      viewMode === "grid"
                        ? "bg-surface text-accent shadow-xs border border-border/60"
                        : "text-muted hover:text-foreground"
                    }`}
                    title="Grid View"
                    aria-label="Switch to Grid View"
                  >
                    <LayoutGrid size={13} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode("list")}
                    className={`p-1.5 rounded transition-colors cursor-pointer ${
                      viewMode === "list"
                        ? "bg-surface text-accent shadow-xs border border-border/60"
                        : "text-muted hover:text-foreground"
                    }`}
                    title="List View"
                    aria-label="Switch to List View"
                  >
                    <List size={13} />
                  </button>
                </div>

                <Link
                  href="/projects"
                  className="text-xs text-secondary hover:text-accent transition-colors cursor-pointer font-mono"
                >
                  View all ↗
                </Link>
              </div>
            </div>

            {/* Grid Layout View (Visual Cards with Cover Images) */}
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredProjects.map((item) => {
                  const githubUrl = item.githubUrl || item.link;
                  const liveUrl = item.liveUrl || item.url;
                  const detailUrl = `/projects/${item.slug || item.id}`;

                  return (
                    <article
                      key={item.id}
                      className="group flex flex-col rounded-xl border border-border bg-surface hover:border-accent/50 transition-all duration-300 overflow-hidden shadow-xs hover:shadow-md"
                    >
                      {/* Project Image Preview */}
                      <Link
                        href={detailUrl}
                        className="relative aspect-video w-full overflow-hidden bg-surface-secondary border-b border-border block"
                      >
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            unoptimized
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-muted text-xs font-mono">
                            No Preview Available
                          </div>
                        )}
                        {item.category && (
                          <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-background/85 backdrop-blur-md border border-border/80 text-[10px] font-mono text-foreground font-medium">
                            {item.category}
                          </span>
                        )}
                      </Link>

                      {/* Card Content Details */}
                      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
                        <div className="space-y-2">
                          <h3 className="text-base font-semibold text-foreground group-hover:text-accent transition-colors">
                            <Link href={detailUrl} className="hover:underline">
                              {item.title}
                            </Link>
                          </h3>
                          <p className="text-xs sm:text-sm text-secondary leading-relaxed line-clamp-2">
                            {item.description}
                          </p>
                        </div>

                        {/* Tech Stack Pills & Action Links */}
                        <div className="space-y-3.5 pt-1">
                          <div className="flex flex-wrap gap-1.5">
                            {(item.tags || item.tech || []).slice(0, 4).map((tech) => (
                              <span
                                key={tech}
                                className="px-2 py-0.5 rounded bg-surface-secondary text-[10px] font-mono text-muted"
                              >
                                {tech}
                              </span>
                            ))}
                            {(item.tags || item.tech || []).length > 4 && (
                              <span className="px-1.5 py-0.5 text-[10px] font-mono text-muted">
                                +{(item.tags || item.tech || []).length - 4}
                              </span>
                            )}
                          </div>

                          <div className="flex items-center justify-between pt-3 border-t border-border text-xs font-mono">
                            <Link
                              href={detailUrl}
                              className="text-foreground hover:text-accent font-medium inline-flex items-center gap-1 transition-colors"
                            >
                              <span>Details</span>
                              <ArrowUpRight size={12} />
                            </Link>

                            <div className="flex items-center gap-3">
                              {githubUrl && (
                                <a
                                  href={githubUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-secondary hover:text-foreground inline-flex items-center gap-1 transition-colors"
                                  title="GitHub Repository"
                                >
                                  <Github size={13} />
                                  <span>Code</span>
                                </a>
                              )}
                              {liveUrl && (
                                <a
                                  href={liveUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-accent hover:underline inline-flex items-center gap-1 transition-colors"
                                >
                                  <span>Demo</span>
                                  <ArrowUpRight size={12} />
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              /* List Layout View (Clean Row Format with Thumbnails, Zero Numbers) */
              <div className="divide-y divide-border">
                {featuredProjects.map((item) => {
                  const githubUrl = item.githubUrl || item.link;
                  const liveUrl = item.liveUrl || item.url;
                  const detailUrl = `/projects/${item.slug || item.id}`;

                  return (
                    <article
                      key={item.id}
                      className="py-5 first:pt-0 last:pb-0 flex flex-col sm:flex-row gap-4 sm:gap-5 items-start group"
                    >
                      {/* Thumbnail Preview */}
                      {item.image && (
                        <Link
                          href={detailUrl}
                          className="relative w-full sm:w-44 aspect-video rounded-lg overflow-hidden border border-border bg-surface-secondary shrink-0 group-hover:border-accent/50 transition-colors block"
                        >
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 640px) 100vw, 176px"
                            unoptimized
                          />
                        </Link>
                      )}

                      {/* Project Info */}
                      <div className="space-y-2 flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-base font-semibold text-foreground group-hover:text-accent transition-colors">
                            <Link href={detailUrl} className="hover:underline">
                              {item.title}
                            </Link>
                          </h3>
                          {item.category && (
                            <span className="text-[10px] font-mono text-muted">
                              [{item.category}]
                            </span>
                          )}
                        </div>
                        <p className="text-xs sm:text-sm text-secondary leading-relaxed">
                          {item.description}
                        </p>
                        <div className="flex flex-wrap gap-1.5 pt-0.5">
                          {(item.tags || item.tech || []).slice(0, 5).map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-0.5 rounded bg-surface-secondary text-[10px] font-mono text-muted"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Action Links */}
                      <div className="flex items-center gap-3 text-xs font-mono self-start sm:self-center shrink-0">
                        {githubUrl && (
                          <a
                            href={githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-secondary hover:text-foreground inline-flex items-center gap-1 transition-colors"
                          >
                            <Github size={13} />
                            <span>GitHub</span>
                          </a>
                        )}
                        {liveUrl && (
                          <a
                            href={liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-accent hover:underline inline-flex items-center gap-1 transition-colors"
                          >
                            <span>Demo</span>
                            <ArrowUpRight size={12} />
                          </a>
                        )}
                        <Link
                          href={detailUrl}
                          className="text-foreground hover:text-accent inline-flex items-center gap-1 transition-colors font-medium"
                        >
                          <span>Page</span>
                          <ArrowUpRight size={12} />
                        </Link>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
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
