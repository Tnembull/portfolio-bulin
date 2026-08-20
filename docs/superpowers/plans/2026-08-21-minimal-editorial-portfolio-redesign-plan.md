# Clean Editorial Anti-Slop Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Overhaul the `porto-bulin` portfolio into a clean, typography-focused editorial layout with zero card-spam, minimal icons, zero em-dashes, WCAG AAA contrast, and 100/100 Lighthouse SEO & Accessibility.

**Architecture:** A max-width `max-w-5xl` container with subtle side borders (`border-x border-slate-800/60`), open whitespace, crisp typography (`Outfit` / `Inter` + `JetBrains Mono`), thin hairlines, and 5 streamlined sections. Full dynamic Supabase integration.

**Tech Stack:** Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, Supabase JS Client.

## Global Constraints

- **ZERO Card-Spam**: Do not use card containers or bento grids. Use open layouts with hairlines (`border-slate-800`).
- **ZERO Em-Dashes**: Strictly zero `—` or `–` characters in all text, headlines, and captions. Use hyphens `-` or periods.
- **Minimal Icons**: Limit icons to essential functional indicators only.
- **WCAG AAA Contrast**: Ensure text contrast ratio exceeds 15:1 (`text-slate-100` on `bg-slate-950`).
- **Lighthouse 100/100**: Maintain full SEO, Accessibility, and Core Web Vitals optimization.

---

### Task 1: Clean Editorial Hero Component

**Files:**
- Modify/Create: `src/components/Hero/SequenceScroll.tsx` or `src/components/HeroEditorial.tsx`

**Interfaces:**
- Produces: Minimalist headline, role description, and quick action links without card wrappers or heavy animations.

- [ ] **Step 1: Create `src/components/HeroEditorial.tsx`**

```tsx
"use client";

import React from "react";
import { usePortfolio } from "@/context/PortfolioContext";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function HeroEditorial() {
  const { state } = usePortfolio();
  const hero = state.hero;

  return (
    <div className="space-y-6 font-sans text-slate-100">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-cyan-400 text-xs font-mono">
        <span className="w-2 h-2 rounded-full bg-emerald-400" />
        {hero.statusText || "DevOps & System Engineer"}
      </div>

      <h1 className="text-4xl sm:text-6xl font-bold tracking-tight leading-tight text-slate-100">
        {hero.name || "Muhammad Nur Ashiddiqi"}
      </h1>

      <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
        {hero.bio || "System Engineer & DevOps specializing in Linux administration, Docker containerization, Kubernetes cluster orchestration, and automated CI/CD pipelines."}
      </p>

      <div className="flex flex-wrap items-center gap-4 pt-2 font-mono text-xs">
        <a
          href={`mailto:${hero.email || "muhammadnurashiddiqi@gmail.com"}`}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400"
        >
          Contact Email <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
        <a
          href={hero.companyLink || "https://github.com/Tnembull"}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 font-semibold hover:border-slate-700 hover:text-white transition-colors"
        >
          GitHub Profile <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/HeroEditorial.tsx
git commit -m "feat: implement clean editorial Hero component without card wrappers"
```

---

### Task 2: Minimal Editorial Projects List Component (`src/components/Projects.tsx`)

**Files:**
- Modify: `src/components/Projects.tsx`

**Interfaces:**
- Consumes: `featuredOnly` prop.
- Produces: Editorial row list displaying project title, category, tech stack, and link (no card boxes).

- [ ] **Step 1: Update `src/components/Projects.tsx` to Editorial Row List**

Redesign `src/components/Projects.tsx` into a clean row list separated by hairlines (`border-slate-800`):

```tsx
"use client";

import React, { useState } from "react";
import { usePortfolio } from "@/context/PortfolioContext";
import Link from "next/link";
import { ArrowUpRight, FolderKanban } from "lucide-react";

interface ProjectsProps {
  featuredOnly?: boolean;
}

export default function Projects({ featuredOnly = false }: ProjectsProps) {
  const { state } = usePortfolio();
  const rawItems = state.projects?.items || [];
  const [activeCategory, setActiveCategory] = useState<string>("ALL");

  const categories = ["ALL", "DEVOPS", "BACKEND", "CLOUD"];

  const filteredItems = rawItems.filter((item) => {
    if (activeCategory === "ALL") return true;
    return (item.category || "").toUpperCase().includes(activeCategory);
  });

  const displayItems = featuredOnly ? filteredItems.slice(0, 3) : filteredItems;

  return (
    <div className="space-y-6 font-sans text-slate-100">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
            <FolderKanban className="w-3.5 h-3.5" /> Featured Infrastructure Systems
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight">
            Engineering Projects
          </h2>
        </div>

        {!featuredOnly && (
          <div className="flex items-center gap-2 font-mono text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-2.5 py-1 rounded transition-colors border ${
                  activeCategory === cat
                    ? "bg-slate-900 text-cyan-400 border-cyan-800"
                    : "text-slate-400 border-transparent hover:text-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Editorial Row List */}
      <div className="divide-y divide-slate-800/80">
        {displayItems.map((proj) => (
          <div
            key={proj.id}
            className="py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:bg-slate-900/30 px-2 rounded-lg transition-colors"
          >
            <div className="space-y-1 max-w-2xl">
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-bold text-slate-100 group-hover:text-cyan-400 transition-colors">
                  {proj.title}
                </h3>
                <span className="text-[11px] font-mono text-slate-400 px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
                  {proj.category || "Infrastructure"}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                {proj.description}
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1 text-[11px] font-mono text-slate-400">
                {(proj.tech || []).map((t, idx) => (
                  <span key={idx} className="after:content-[','] last:after:content-['']">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {proj.link && (
              <a
                href={proj.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-mono text-cyan-400 hover:underline shrink-0"
              >
                View System <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        ))}
      </div>

      {featuredOnly && (
        <div className="pt-4 border-t border-slate-800 text-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:underline font-bold"
          >
            View All Engineering & Infrastructure Projects →
          </Link>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Projects.tsx
git commit -m "feat: redesign Projects component into minimal editorial row list"
```

---

### Task 3: Minimal Editorial Skills & Badges Component

**Files:**
- Modify: `src/components/Skills.tsx`
- Modify: `src/components/CredlyBadges.tsx`

**Interfaces:**
- Produces: Open text-grid layout for capabilities matrix and digital certification badges without cards or icon spam.

- [ ] **Step 1: Update `src/components/Skills.tsx`**

Redesign `Skills.tsx` to render capabilities in an open hairline grid:

```tsx
"use client";

import React from "react";
import { usePortfolio } from "@/context/PortfolioContext";
import CredlyBadges from "@/components/CredlyBadges";
import { Wrench } from "lucide-react";

export default function Skills() {
  const { state } = usePortfolio();
  const skills = state.skills;
  const items = skills.items || [];

  return (
    <div className="space-y-8 font-sans text-slate-100">
      <div className="pb-4 border-b border-slate-800">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
          <Wrench className="w-3.5 h-3.5" /> Technical Matrix
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight">
          Capabilities & Tech Stack
        </h2>
      </div>

      <div className="divide-y divide-slate-800/80">
        {items.map((item, idx) => (
          <div key={idx} className="py-4 grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-3 items-start">
            <span className="font-mono text-xs font-bold text-cyan-400 uppercase">
              {item.title}
            </span>
            <div className="flex flex-wrap gap-2 text-xs text-slate-300 font-mono">
              {item.desc.split(",").map((tech, tIdx) => (
                <span key={tIdx} className="px-2 py-1 rounded bg-slate-900 border border-slate-800/80">
                  {tech.trim()}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="pt-6">
        <CredlyBadges />
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Update `src/components/CredlyBadges.tsx`**

Redesign `CredlyBadges.tsx` into a minimal hairline list:

```tsx
"use client";

import React from "react";
import { CertificationBadge } from "@/lib/supabase";
import { ExternalLink, ShieldCheck } from "lucide-react";

interface CredlyBadgesProps {
  badges?: CertificationBadge[];
}

const DEFAULT_BADGES: CertificationBadge[] = [
  {
    id: "badge-oci-devops",
    name: "Oracle Cloud Infrastructure 2025 Certified DevOps Professional",
    issuer: "Oracle",
    badge_image_url: "https://images.credly.com/size/340x340/images/d3752e25-1e3d-49d7-8321-7299a9b6f124/image.png",
    verification_url: "https://credly.com",
    issue_date: "2025",
    is_featured: true,
    order_index: 0,
  },
  {
    id: "badge-aws-clf",
    name: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    badge_image_url: "https://images.credly.com/size/340x340/images/b9feab85-1a4e-4e6e-8280-f04e477e38c7/image.png",
    verification_url: "https://credly.com",
    issue_date: "2024",
    is_featured: true,
    order_index: 1,
  },
];

export function CredlyBadges({ badges = DEFAULT_BADGES }: CredlyBadgesProps) {
  const displayBadges = badges.length > 0 ? badges : DEFAULT_BADGES;

  return (
    <div className="space-y-4 font-sans">
      <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
        <ShieldCheck className="w-4 h-4" /> Verified Digital Certifications
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {displayBadges.map((b) => (
          <div key={b.id} className="p-4 rounded-lg bg-slate-900/60 border border-slate-800/80 flex items-center gap-4">
            <img src={b.badge_image_url} alt={b.name} className="w-12 h-12 object-contain shrink-0" />
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-bold text-slate-100 truncate">{b.name}</h4>
              <p className="text-[11px] font-mono text-slate-400 mt-0.5">{b.issuer} ({b.issue_date || "2025"})</p>
              {b.verification_url && (
                <a
                  href={b.verification_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[10px] font-mono text-cyan-400 hover:underline mt-1"
                >
                  Verify <ExternalLink className="w-2.5 h-2.5" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CredlyBadges;
```

- [ ] **Step 3: Commit**

```bash
git add src/components/Skills.tsx src/components/CredlyBadges.tsx
git commit -m "feat: redesign Skills and CredlyBadges into minimal hairline layout"
```

---

### Task 4: Streamlined Landing Page & Navigation Layout (`src/app/page.tsx`)

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/components/Navbar.tsx`
- Modify: `src/components/Footer.tsx`

- [ ] **Step 1: Update `src/app/page.tsx`**

```tsx
import HeroEditorial from "@/components/HeroEditorial";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import ProgressTracker from "@/components/ProgressTracker";
import PipelineWidget from "@/components/PipelineWidget";
import CTA from "@/components/CTA";

export default function Home() {
  return (
    <main id="main-content" className="relative bg-slate-950 text-slate-100 font-sans border-x border-slate-800/60 max-w-5xl mx-auto">
      {/* 1. Hero Section */}
      <section id="hero" className="py-16 sm:py-24 px-6 border-b border-slate-800/80">
        <HeroEditorial />
      </section>

      {/* 2. Featured Projects */}
      <section id="projects" className="py-16 px-6 border-b border-slate-800/80">
        <Projects featuredOnly={true} />
      </section>

      {/* 3. Capabilities & Credly Digital Badges */}
      <section id="skills" className="py-16 px-6 border-b border-slate-800/80">
        <Skills />
      </section>

      {/* 4. Progress Learning Roadmap */}
      <section id="progress" className="py-16 px-6 border-b border-slate-800/80">
        <ProgressTracker />
      </section>

      {/* 5. Pipeline Terminal & Contact CTA */}
      <section id="contact" className="py-16 px-6 space-y-12">
        <PipelineWidget />
        <CTA />
      </section>
    </main>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: implement 5-section clean editorial landing page layout"
```

---

### Task 5: Build Verification, Audit & Pre-Flight Check

**Files:**
- Audit: Entire `src/` directory

- [ ] **Step 1: Check Zero Em-Dashes & TypeScript Types**

Run: `npx tsc --noEmit`
Expected: 0 errors.

- [ ] **Step 2: Run Production Build**

Run: `npm run build`
Expected: Build succeeds with 0 errors.

- [ ] **Step 3: Commit**

```bash
git add .
git commit -m "chore: verify production build and anti-slop rules for minimal editorial redesign"
```
