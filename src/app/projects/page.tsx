"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, FolderKanban } from "lucide-react";
import Projects from "@/components/Projects";

export default function AllProjectsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground pt-20 sm:pt-24 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8">
      <main id="main-content" className="max-w-7xl mx-auto space-y-6">
        {/* Header section */}
        <div className="space-y-3">
          <Link
            href="/"
            aria-label="Back to Home"
            className="inline-flex items-center gap-1.5 font-mono text-xs text-[#48b685] hover:underline focus:outline-none focus:ring-2 focus:ring-[#48b685] rounded transition-colors"
          >
            <ArrowLeft size={14} />
            <span>← Back to Home</span>
          </Link>

          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#48b685]/10 border border-[#48b685]/30 text-[#48b685] text-xs font-mono mb-3">
              <FolderKanban className="w-3.5 h-3.5" /> Full Infrastructure & Systems Catalog
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold font-sans tracking-tight text-foreground">
              All Engineering Projects
            </h1>
            <p className="text-muted-foreground text-sm font-sans mt-2 max-w-2xl leading-relaxed">
              Explore the complete repository of DevOps CI/CD pipelines, cloud infrastructure architecture, and backend systems.
            </p>
          </div>
        </div>

        {/* Projects Component displaying all projects with category filter tabs */}
        <Projects featuredOnly={false} />
      </main>
    </div>
  );
}
