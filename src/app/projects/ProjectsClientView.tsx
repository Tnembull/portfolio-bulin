"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ProjectsTab from "@/components/tabs/ProjectsTab";

export default function ProjectsClientView() {
  return (
    <div className="min-h-screen bg-background text-foreground pt-12 sm:pt-16 pb-16 px-4 sm:px-8 lg:px-12">
      <main id="main-content" className="max-w-4xl mx-auto space-y-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-secondary hover:text-foreground transition-colors mb-2"
        >
          <ArrowLeft size={13} />
          <span>← Back to Portfolio</span>
        </Link>

        <ProjectsTab />
      </main>
    </div>
  );
}
