# Full Portfolio Redesign & Optimization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the `porto-bulin` portfolio into a high-performance, streamlined **Dark-Tech / Cyber-Minimalist** website with 100/100 Lighthouse SEO & Accessibility scores, a 5-section landing page, and a dedicated `/projects` catalog page.

**Architecture:** Streamlined App Router structure with Next.js 15 (`src/app/page.tsx` for 5 key sections, `src/app/projects/page.tsx` for full project catalog). JSON-LD Person & WebSite Schema injection for Google Search rich snippets. Full Supabase backend sync.

**Tech Stack:** Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, Lucide Icons, Supabase JS Client, Framer Motion / CSS GPU Acceleration.

## Global Constraints

- Achieve 100/100 Lighthouse benchmark for SEO and Accessibility.
- Ensure WCAG 2.1 AAA contrast compliance (`text-slate-100` on `bg-slate-950`).
- Maintain Next.js 15 App Router conventions.
- Keep the main landing page (`/`) streamlined to 5 core sections.
- Deliver full CRUD functionality via Admin Panel `/admin`.

---

### Task 1: SEO, JSON-LD Schema & Accessibility Foundation

**Files:**
- Create: `src/components/JSONLDSchema.tsx`
- Modify: `src/app/layout.tsx`

**Interfaces:**
- Produces: `JSONLDSchema` component for structured data injection.

- [ ] **Step 1: Create `src/components/JSONLDSchema.tsx`**

```tsx
import React from "react";

export const JSONLDSchema: React.FC = () => {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Muhammad Nur Ashiddiqi",
    "alternateName": "Bulin",
    "url": "https://bulindev.tech",
    "jobTitle": "System Engineer & DevOps",
    "worksFor": {
      "@type": "Organization",
      "name": "Newus Teknologi"
    },
    "knowsAbout": [
      "DevOps",
      "System Engineering",
      "Linux System Administration",
      "Docker & Kubernetes",
      "CI/CD Automation",
      "Cloud Infrastructure",
      "PostgreSQL & Node.js"
    ],
    "sameAs": [
      "https://github.com/Tnembull",
      "https://www.linkedin.com/in/muhammadnurashiddiqi"
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Muhammad Nur Ashiddiqi | System Engineer & DevOps Portfolio",
    "url": "https://bulindev.tech",
    "author": {
      "@type": "Person",
      "name": "Muhammad Nur Ashiddiqi"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
};

export default JSONLDSchema;
```

- [ ] **Step 2: Update `src/app/layout.tsx` to include `JSONLDSchema` and Skip Link**

Modify `src/app/layout.tsx` to include `<JSONLDSchema />` and a skip-to-main-content accessible link.

```tsx
import JSONLDSchema from "@/components/JSONLDSchema";

// Inside RootLayout body:
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-cyan-500 focus:text-slate-950 focus:font-mono focus:font-bold focus:rounded-lg focus:shadow-2xl"
>
  Skip to main content
</a>
<JSONLDSchema />
```

- [ ] **Step 3: Commit**

```bash
git add src/components/JSONLDSchema.tsx src/app/layout.tsx
git commit -m "feat: add JSON-LD Schema and skip-to-content accessibility link"
```

---

### Task 2: Streamlined 5-Section Landing Page (`src/app/page.tsx`)

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/components/Projects.tsx` (add `featuredOnly` prop)

**Interfaces:**
- Consumes: `PipelineWidget`, `Projects`, `Skills`, `ProgressTracker`, `CTA` components.

- [ ] **Step 1: Add `featuredOnly` Prop to `src/components/Projects.tsx`**

Update `src/components/Projects.tsx` to accept an optional `featuredOnly?: boolean` prop that limits display to the top 3 featured projects on the landing page with a CTA button to view all projects:

```tsx
interface ProjectsProps {
  featuredOnly?: boolean;
}
```

- [ ] **Step 2: Restructure `src/app/page.tsx` into 5 Key Sections**

Update `src/app/page.tsx` to display:
1. **Hero Header & PipelineWidget**: `SequenceScroll` + `PipelineWidget`.
2. **Featured Projects**: `Projects` with `featuredOnly={true}` + Link to `/projects`.
3. **Capabilities Matrix & Badges**: `Skills` (which includes `CredlyBadges`).
4. **Progress Learning Roadmap**: `ProgressTracker`.
5. **Contact & CTA**: `CTA` + `Footer`.

```tsx
import SequenceScroll from "@/components/Hero/SequenceScroll";
import PipelineWidget from "@/components/PipelineWidget";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import ProgressTracker from "@/components/ProgressTracker";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main id="main-content" className="relative pb-12 bg-slate-950 text-slate-100 font-sans">
      {/* 1. Hero Header & Interactive Pipeline */}
      <SequenceScroll />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 mb-12">
        <PipelineWidget />
      </div>

      {/* 2. Top 3 Featured Projects */}
      <Projects featuredOnly={true} />

      {/* 3. Capabilities & Credly Digital Badges */}
      <Skills />

      {/* 4. Progress Learning Tracker */}
      <ProgressTracker />

      {/* 5. Contact CTA & Footer */}
      <CTA />
      <Footer />
    </main>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/app/page.tsx src/components/Projects.tsx
git commit -m "feat: restructure landing page into 5 streamlined high-impact sections"
```

---

### Task 3: Dedicated Projects Catalog Page (`src/app/projects/page.tsx`)

**Files:**
- Create/Modify: `src/app/projects/page.tsx`

**Interfaces:**
- Produces: Dedicated `/projects` route with category filters (All, DevOps, Backend, Cloud/K8s).

- [ ] **Step 1: Create `src/app/projects/page.tsx`**

Build the complete catalog page rendering all projects with category filter tabs and search:

```tsx
"use client";

import React, { useState } from "react";
import Projects from "@/components/Projects";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FolderKanban, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <Navbar />
      <main id="main-content" className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 hover:underline mb-4"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/50 text-cyan-400 text-xs font-mono mb-2">
            <FolderKanban className="w-3.5 h-3.5" /> Full Infrastructure & Systems Catalog
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-100">
            All Engineering Projects
          </h1>
          <p className="text-slate-400 text-sm mt-2 max-w-2xl">
            Explore the complete repository of DevOps CI/CD pipelines, cloud infrastructure architecture, and backend systems.
          </p>
        </div>

        <Projects featuredOnly={false} />
      </main>
      <Footer />
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/projects/page.tsx
git commit -m "feat: implement dedicated /projects catalog page with category filtering"
```

---

### Task 4: Build Verification & Accessibility Audit

**Files:**
- Audit: All modified files in `src/`

- [ ] **Step 1: Run TypeScript Type Check**

Run: `npx tsc --noEmit`
Expected: 0 errors.

- [ ] **Step 2: Run Production Build**

Run: `npm run build`
Expected: Build succeeds with 0 errors and all static/dynamic routes generated cleanly.

- [ ] **Step 3: Commit**

```bash
git add .
git commit -m "chore: verify production build and type checking for full portfolio redesign"
```
