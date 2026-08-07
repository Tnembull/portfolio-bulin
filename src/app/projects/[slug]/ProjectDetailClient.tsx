"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ExternalLink, Maximize2 } from "lucide-react";
import { useState } from "react";
import { Project, PROJECTS } from "@/data/projects";
import ImageLightbox from "@/components/ImageLightbox";

interface ProjectDetailClientProps {
  project?: Project;
}

export default function ProjectDetailClient({ project }: ProjectDetailClientProps) {
  const router = useRouter();
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-6 bg-background text-foreground font-mono">
        <h1 className="text-2xl font-bold font-sans mb-4">Project Not Found</h1>
        <Link href="/projects" className="text-muted-foreground hover:text-foreground underline text-xs">
          ← Back to All Projects
        </Link>
      </div>
    );
  }

  // Calculate Prev / Next Projects
  const currentIndex = PROJECTS.findIndex((p) => p.slug === project.slug);
  const nextProject = PROJECTS[(currentIndex + 1) % PROJECTS.length];
  const prevProject = PROJECTS[(currentIndex - 1 + PROJECTS.length) % PROJECTS.length];

  return (
    <div className="min-h-screen bg-background text-foreground pt-20 pb-16 px-2">
      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <ImageLightbox
          src={project.image}
          alt={project.title}
          category={project.category}
          onClose={() => setIsLightboxOpen(false)}
        />
      )}

      <div className="max-w-3xl mx-auto border-x border-line">
        {/* Top Header Panel */}
        <div className="screen-line-top screen-line-bottom p-4 sm:p-6 border-b border-line bg-muted/10 space-y-4">
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={() => router.back()}
              className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              <ArrowLeft size={14} />
              <span>BACK TO ARCHIVE</span>
            </button>

            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-line bg-foreground text-background font-mono text-xs font-semibold hover:opacity-90 transition-opacity"
              >
                <span>LIVE / REPO</span>
                <ExternalLink size={13} />
              </a>
            )}
          </div>

          <div className="space-y-1">
            <div className="text-[11px] font-mono text-muted-foreground uppercase tracking-widest">
              {project.year} // {project.category}
            </div>
            <h1 className="text-2xl sm:text-4xl font-bold font-sans tracking-tight text-foreground">
              {project.title}
            </h1>
          </div>

          {/* Tech Pills */}
          <div className="flex flex-wrap gap-1.5 pt-1 font-mono text-[10px]">
            {(project.tech || []).map((t) => (
              <span
                key={t}
                className="px-2 py-0.5 rounded border border-line bg-muted/40 text-muted-foreground"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Hero Image Showcase Box Frame */}
        <div className="p-4 border-b border-line bg-background">
          <div
            onClick={() => setIsLightboxOpen(true)}
            className="relative w-full aspect-[16/10] rounded-xl overflow-hidden border border-line bg-muted/20 cursor-pointer group"
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              priority
              unoptimized
            />
            <div className="absolute inset-0 bg-background/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-3 right-3 px-2.5 py-1 bg-background/90 backdrop-blur-md rounded-md border border-line text-[10px] font-mono text-foreground font-semibold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Maximize2 size={12} />
              <span>Expand Image</span>
            </div>
          </div>
        </div>

        {/* Technical Metadata Summary Grid */}
        <div className="p-4 grid grid-cols-2 sm:grid-cols-4 gap-2 border-b border-line bg-background font-mono text-xs">
          <div className="p-2.5 rounded-lg border border-line bg-muted/20">
            <span className="text-[10px] text-muted-foreground uppercase block mb-0.5">YEAR</span>
            <span className="font-bold text-foreground">{project.year || "2026"}</span>
          </div>
          <div className="p-2.5 rounded-lg border border-line bg-muted/20">
            <span className="text-[10px] text-muted-foreground uppercase block mb-0.5">CLIENT</span>
            <span className="font-bold text-foreground truncate block">{project.client || "Internal"}</span>
          </div>
          <div className="p-2.5 rounded-lg border border-line bg-muted/20">
            <span className="text-[10px] text-muted-foreground uppercase block mb-0.5">ROLE</span>
            <span className="font-bold text-foreground truncate block">{project.role || "DevOps Engineer"}</span>
          </div>
          <div className="p-2.5 rounded-lg border border-line bg-muted/20">
            <span className="text-[10px] text-muted-foreground uppercase block mb-0.5">CATEGORY</span>
            <span className="font-bold text-foreground truncate block">{project.category}</span>
          </div>
        </div>

        {/* Case Study Description */}
        <div className="p-4 sm:p-6 border-b border-line bg-background space-y-3">
          <h2 className="text-lg font-bold font-sans text-foreground tracking-tight">
            System Overview & Vision
          </h2>
          <p className="text-xs sm:text-sm font-sans text-muted-foreground leading-relaxed">
            {project.longDescription || project.description}
          </p>
        </div>

        {/* Key Challenges & Architecture */}
        {project.challenges && project.challenges.length > 0 && (
          <div className="p-4 sm:p-6 border-b border-line bg-background space-y-3">
            <h2 className="text-lg font-bold font-sans text-foreground tracking-tight">
              Key Engineering Challenges
            </h2>
            <ul className="space-y-2 text-xs font-sans text-muted-foreground">
              {project.challenges.map((challenge, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="font-mono text-foreground font-bold">0{idx + 1}.</span>
                  <span>{challenge}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Navigation Bar at Bottom */}
        <div className="p-4 border-b border-line bg-background flex items-center justify-between font-mono text-xs">
          <Link
            href={`/projects/${prevProject.slug}`}
            className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={13} />
            <span className="truncate max-w-[140px] sm:max-w-[200px]">{prevProject.title}</span>
          </Link>

          <Link
            href={`/projects/${nextProject.slug}`}
            className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
          >
            <span className="truncate max-w-[140px] sm:max-w-[200px]">{nextProject.title}</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </div>
  );
}
