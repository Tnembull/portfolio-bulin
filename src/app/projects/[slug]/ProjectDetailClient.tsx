"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ExternalLink, Github, Maximize2, Layers, CheckCircle2, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { Project } from "@/data/projects";
import { usePortfolio } from "@/context/PortfolioContext";
import ImageLightbox from "@/components/ImageLightbox";

interface ProjectDetailClientProps {
  project?: Project;
}

export default function ProjectDetailClient({ project }: ProjectDetailClientProps) {
  const router = useRouter();
  const { state } = usePortfolio();
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const allProjects = state.projects?.items || [];

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-6 bg-background text-foreground font-mono">
        <h1 className="text-xl font-bold font-sans mb-3 text-foreground">Project Not Found</h1>
        <p className="text-xs text-secondary mb-5">The requested engineering case study does not exist or has been removed.</p>
        <Link
          href="/projects"
          className="px-4 py-2 rounded-md bg-surface border border-border text-xs text-accent hover:underline font-mono"
        >
          ← Back to All Projects
        </Link>
      </div>
    );
  }

  // Calculate Prev / Next Projects from live Supabase portfolio state
  const currentIndex = allProjects.findIndex(
    (p) => (p.slug && p.slug === project.slug) || p.id === project.id
  );
  const prevProject =
    currentIndex > 0 ? allProjects[currentIndex - 1] : allProjects[allProjects.length - 1];
  const nextProject =
    currentIndex >= 0 && currentIndex < allProjects.length - 1
      ? allProjects[currentIndex + 1]
      : allProjects[0];

  const githubUrl = project.githubUrl || project.link;
  const liveUrl = project.liveUrl || project.url;

  return (
    <div className="min-h-screen bg-background text-foreground pt-12 sm:pt-16 pb-20 px-4 sm:px-8 lg:px-12 antialiased selection:bg-accent selection:text-background">
      {/* Lightbox Modal */}
      {isLightboxOpen && project.image && (
        <ImageLightbox
          src={project.image}
          alt={project.title}
          category={project.category}
          onClose={() => setIsLightboxOpen(false)}
        />
      )}

      <article className="max-w-4xl mx-auto space-y-10">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between gap-4 pb-4 border-b border-border">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-1.5 font-mono text-xs text-secondary hover:text-foreground transition-colors cursor-pointer"
          >
            <ArrowLeft size={14} />
            <span>Back to Projects</span>
          </button>

          <div className="flex items-center gap-2 font-mono text-xs">
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border bg-surface hover:bg-surface-secondary text-foreground transition-colors"
                title="GitHub Repository"
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
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-accent hover:bg-accent-hover text-accent-text font-semibold transition-colors"
                title="Live Production Website"
              >
                <span>Live Demo</span>
                <ExternalLink size={13} />
              </a>
            )}
          </div>
        </div>

        {/* Case Study Header */}
        <header className="space-y-4">
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-accent uppercase tracking-wider">
            <span>{project.category || "ENGINEERING PROJECT"}</span>
            {project.year && <span>• {project.year}</span>}
          </div>

          <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight text-foreground leading-[1.15]">
            {project.title}
          </h1>

          <p className="text-base sm:text-lg text-secondary leading-relaxed max-w-3xl">
            {project.description}
          </p>

          {/* Tech Stack Chips */}
          <div className="flex flex-wrap gap-2 pt-2 font-mono text-xs">
            {(project.tech || project.tags || []).map((t, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-md border border-border bg-surface text-secondary"
              >
                {t}
              </span>
            ))}
          </div>
        </header>

        {/* Project Image Showcase */}
        {project.image && (
          <div
            onClick={() => setIsLightboxOpen(true)}
            className="relative w-full aspect-[16/10] sm:aspect-video rounded-lg overflow-hidden border border-border bg-surface cursor-pointer group"
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
              priority
              unoptimized
            />
            <div className="absolute bottom-3 right-3 px-2.5 py-1 bg-background/90 rounded-md border border-border text-[11px] font-mono text-foreground flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Maximize2 size={12} />
              <span>Expand Preview</span>
            </div>
          </div>
        )}

        {/* Metadata Summary Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-lg border border-border bg-surface font-mono text-xs">
          <div>
            <span className="text-[10px] text-muted uppercase block mb-1">YEAR</span>
            <span className="font-semibold text-foreground">{project.year || "2026"}</span>
          </div>
          <div>
            <span className="text-[10px] text-muted uppercase block mb-1">ROLE</span>
            <span className="font-semibold text-foreground truncate block">{project.role || "DevOps Engineer"}</span>
          </div>
          <div>
            <span className="text-[10px] text-muted uppercase block mb-1">ORGANIZATION / CLIENT</span>
            <span className="font-semibold text-foreground truncate block">{project.client || "Internal"}</span>
          </div>
          <div>
            <span className="text-[10px] text-muted uppercase block mb-1">CATEGORY</span>
            <span className="font-semibold text-foreground truncate block">{project.category || "Infrastructure"}</span>
          </div>
        </div>

        {/* Long Description / Full Case Study */}
        {project.longDescription && (
          <section className="space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-wider text-muted">
              System Architecture & Implementation
            </h2>
            <p className="text-sm sm:text-base text-secondary leading-relaxed whitespace-pre-line">
              {project.longDescription}
            </p>
          </section>
        )}

        {/* Engineering Challenges */}
        {project.challenges && project.challenges.length > 0 && (
          <section className="space-y-4 pt-4 border-t border-border">
            <h2 className="text-xs font-mono uppercase tracking-wider text-muted">
              Key Engineering Challenges
            </h2>
            <ul className="space-y-2.5 text-sm text-secondary">
              {project.challenges.map((challenge, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="font-mono text-accent font-semibold shrink-0">
                    {String(idx + 1).padStart(2, "0")}.
                  </span>
                  <span className="leading-relaxed">{challenge}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Implemented Technical Solutions */}
        {project.solutions && project.solutions.length > 0 && (
          <section className="space-y-4 pt-4 border-t border-border">
            <h2 className="text-xs font-mono uppercase tracking-wider text-accent">
              Implemented Technical Solutions
            </h2>
            <ul className="space-y-2.5 text-sm text-secondary">
              {project.solutions.map((solution, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="font-mono text-accent font-semibold shrink-0">
                    {String(idx + 1).padStart(2, "0")}.
                  </span>
                  <span className="leading-relaxed">{solution}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Impact & Outcomes */}
        {project.impact && project.impact.length > 0 && (
          <section className="space-y-4 pt-4 border-t border-border">
            <h2 className="text-xs font-mono uppercase tracking-wider text-muted">
              Measurable Impact & Outcomes
            </h2>
            <ul className="space-y-2.5 text-sm text-secondary">
              {project.impact.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle2 size={16} className="text-accent shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Bottom Pagination Links */}
        {allProjects.length > 1 && (
          <nav aria-label="Project pagination" className="pt-8 border-t border-border flex items-center justify-between font-mono text-xs">
            {prevProject && (
              <Link
                href={`/projects/${prevProject.slug || prevProject.id}`}
                className="flex items-center gap-2 text-secondary hover:text-foreground transition-colors max-w-[45%]"
              >
                <ArrowLeft size={13} className="shrink-0" />
                <span className="truncate">{prevProject.title}</span>
              </Link>
            )}

            {nextProject && (
              <Link
                href={`/projects/${nextProject.slug || nextProject.id}`}
                className="flex items-center gap-2 text-secondary hover:text-foreground transition-colors ml-auto max-w-[45%] text-right"
              >
                <span className="truncate">{nextProject.title}</span>
                <ArrowRight size={13} className="shrink-0" />
              </Link>
            )}
          </nav>
        )}
      </article>
    </div>
  );
}
