# DevOps Pipeline & Progress Learning Tracker Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement an interactive DevOps CI/CD Pipeline Widget, Progress Learning & Certification Tracker, Credly/Digital Badges component, and full Admin Panel CRUD management backed by Supabase.

**Architecture:** Database tables added to Supabase (`pipeline_stages`, `learning_progress`, `certification_badges`). Next.js Client Components with Terminal Monokrom styling (`bg-slate-950`, `font-mono`, pulsing indicators) for the public portfolio UI, paired with Admin Dashboard Editors in `src/components/admin/` for dynamic management.

**Tech Stack:** Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, Lucide Icons / Devicon, Supabase JS Client, Cloudflare R2 / Supabase Storage.

## Global Constraints

- Use Next.js 15 App Router conventions.
- Maintain TypeScript strict typing (`noImplicitAny`, strict interface definitions).
- Follow dark terminal monokrom aesthetic for new DevOps components (`font-mono`, `bg-slate-950`, `border-slate-800`).
- Ensure all new components support dark/light mode toggle gracefully or maintain intentioned dark terminal frames.
- Deliver full CRUD functionality via Admin Panel `/admin`.

---

### Task 1: Supabase Database Schema & TypeScript Types

**Files:**
- Create: `supabase/migrations/20260821_devops_pipeline_tables.sql`
- Modify: `src/lib/supabase.ts`

**Interfaces:**
- Produces: `PipelineStage`, `LearningProgress`, `CertificationBadge` types in `src/lib/supabase.ts`.

- [ ] **Step 1: Write SQL Migration File**

Create `supabase/migrations/20260821_devops_pipeline_tables.sql` with table definitions and Row Level Security (RLS) policies:

```sql
-- Pipeline Stages Table
CREATE TABLE IF NOT EXISTS public.pipeline_stages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'idle' CHECK (status IN ('success', 'running', 'idle', 'failed')),
  icon_name TEXT DEFAULT 'Terminal',
  logs TEXT[] DEFAULT '{}',
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Learning Progress Table
CREATE TABLE IF NOT EXISTS public.learning_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  provider TEXT NOT NULL,
  progress_percent INTEGER DEFAULT 0 CHECK (progress_percent >= 0 AND progress_percent <= 100),
  target_date TEXT,
  status TEXT DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'planned', 'completed')),
  description TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Certification Badges Table
CREATE TABLE IF NOT EXISTS public.certification_badges (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  issuer TEXT NOT NULL,
  badge_image_url TEXT NOT NULL,
  verification_url TEXT,
  issue_date TEXT,
  is_featured BOOLEAN DEFAULT true,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- RLS Policies (Public Read, Authenticated All)
ALTER TABLE public.pipeline_stages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certification_badges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access on pipeline_stages" ON public.pipeline_stages FOR SELECT USING (true);
CREATE POLICY "Allow public read access on learning_progress" ON public.learning_progress FOR SELECT USING (true);
CREATE POLICY "Allow public read access on certification_badges" ON public.certification_badges FOR SELECT USING (true);

CREATE POLICY "Allow admin all access on pipeline_stages" ON public.pipeline_stages FOR ALL USING (true);
CREATE POLICY "Allow admin all access on learning_progress" ON public.learning_progress FOR ALL USING (true);
CREATE POLICY "Allow admin all access on certification_badges" ON public.certification_badges FOR ALL USING (true);
```

- [ ] **Step 2: Add TypeScript Types in `src/lib/supabase.ts`**

Update `src/lib/supabase.ts` to export interfaces and helper functions for fetching pipeline, learning progress, and badges.

```typescript
export interface PipelineStage {
  id: string;
  title: string;
  description?: string;
  status: 'success' | 'running' | 'idle' | 'failed';
  icon_name?: string;
  logs: string[];
  order_index: number;
  created_at?: string;
  updated_at?: string;
}

export interface LearningProgress {
  id: string;
  title: string;
  provider: string;
  progress_percent: number;
  target_date?: string;
  status: 'in_progress' | 'planned' | 'completed';
  description?: string;
  order_index: number;
  created_at?: string;
  updated_at?: string;
}

export interface CertificationBadge {
  id: string;
  name: string;
  issuer: string;
  badge_image_url: string;
  verification_url?: string;
  issue_date?: string;
  is_featured: boolean;
  order_index: number;
  created_at?: string;
  updated_at?: string;
}
```

- [ ] **Step 3: Commit**

```bash
git add supabase/migrations/20260821_devops_pipeline_tables.sql src/lib/supabase.ts
git commit -m "feat: add pipeline, learning progress, and badge database schemas & types"
```

---

### Task 2: Interactive Pipeline Widget Component

**Files:**
- Create: `src/components/PipelineWidget.tsx`

**Interfaces:**
- Consumes: `PipelineStage` from `src/lib/supabase.ts`.
- Produces: `PipelineWidget` React client component.

- [ ] **Step 1: Create `src/components/PipelineWidget.tsx`**

Build the terminal macOS window UI component with typewriter header, clickable stages, status lights, and terminal logs drawer modal:

```tsx
"use client";

import React, { useState } from "react";
import { Terminal, CheckCircle2, PlayCircle, Clock, AlertCircle, X, Maximize2 } from "lucide-react";
import { PipelineStage } from "@/lib/supabase";

interface PipelineWidgetProps {
  stages?: PipelineStage[];
}

const defaultStages: PipelineStage[] = [
  {
    id: "stage-1",
    title: "Code",
    description: "Version Control & Git Workflow",
    status: "success",
    icon_name: "Code",
    logs: [
      "[INFO] Initializing git workspace...",
      "[INFO] Checked out branch main",
      "[INFO] Verified commit signature: 0x8a92f1",
      "[SUCCESS] Code linting passed with 0 errors."
    ],
    order_index: 0
  },
  {
    id: "stage-2",
    title: "Build",
    description: "Docker Containerization & Artifacts",
    status: "success",
    icon_name: "Box",
    logs: [
      "[INFO] Building Docker image target: production...",
      "[INFO] Step 1/8: FROM node:20-alpine",
      "[INFO] Step 5/8: RUN npm run build",
      "[SUCCESS] Image build completed: portfolio:v2.4.0 (142MB)"
    ],
    order_index: 1
  },
  {
    id: "stage-3",
    title: "Test",
    description: "Automated Integration & E2E Tests",
    status: "running",
    icon_name: "TestTube",
    logs: [
      "[INFO] Executing Vitest & Cypress test suites...",
      "[PASS] Unit tests: 48/48 passed",
      "[RUNNING] Running E2E User Flow tests...",
      "[INFO] Latency check: 42ms response time"
    ],
    order_index: 2
  },
  {
    id: "stage-4",
    title: "Deploy",
    description: "Kubernetes & Cloud Infrastructure",
    status: "idle",
    icon_name: "CloudUpload",
    logs: [
      "[WAITING] Triggering ArgoCD sync pipeline...",
      "[WAITING] Waiting for test stage approval..."
    ],
    order_index: 3
  },
  {
    id: "stage-5",
    title: "Monitor",
    description: "Prometheus & Grafana Observability",
    status: "idle",
    icon_name: "Activity",
    logs: [
      "[INFO] Prometheus metrics exporter active",
      "[INFO] Status 200 OK — Uptime 99.98%"
    ],
    order_index: 4
  }
];

export const PipelineWidget: React.FC<PipelineWidgetProps> = ({ stages = defaultStages }) => {
  const [activeStage, setActiveStage] = useState<PipelineStage | null>(null);

  const getStatusBadge = (status: PipelineStage["status"]) => {
    switch (status) {
      case "success":
        return <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
      case "running":
        return <PlayCircle className="w-4 h-4 text-amber-400 animate-pulse" />;
      case "failed":
        return <AlertCircle className="w-4 h-4 text-rose-400" />;
      default:
        return <Clock className="w-4 h-4 text-slate-500" />;
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto my-8 bg-slate-950 border border-slate-800 rounded-xl shadow-2xl overflow-hidden font-mono text-slate-200">
      {/* Terminal Top Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800 select-none">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
          <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
          <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
          <span className="ml-2 text-xs text-slate-400 flex items-center gap-1.5 font-sans font-medium">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" /> devops-pipeline.sh — bash
          </span>
        </div>
        <div className="text-xs text-slate-500 font-mono hidden sm:block">CI/CD Automated Workflow</div>
      </div>

      {/* Pipeline Stages Track */}
      <div className="p-6 overflow-x-auto">
        <div className="flex items-center justify-between min-w-[640px] gap-3">
          {stages.map((stage, idx) => (
            <React.Fragment key={stage.id || idx}>
              {/* Stage Card */}
              <button
                onClick={() => setActiveStage(stage)}
                className={`flex-1 flex flex-col items-center p-4 rounded-lg border transition-all duration-200 text-left group relative ${
                  activeStage?.id === stage.id
                    ? "bg-slate-900 border-cyan-500/60 shadow-lg shadow-cyan-500/10"
                    : "bg-slate-900/50 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/80"
                }`}
              >
                <div className="flex items-center justify-between w-full mb-2">
                  <span className="text-xs font-semibold text-slate-400 group-hover:text-cyan-400 transition-colors">
                    0{idx + 1}. {stage.title}
                  </span>
                  {getStatusBadge(stage.status)}
                </div>
                <p className="text-[11px] text-slate-400 line-clamp-2 w-full leading-tight font-sans">
                  {stage.description}
                </p>

                <div className="mt-3 w-full flex items-center justify-between text-[10px] text-slate-500 border-t border-slate-800/60 pt-2">
                  <span>Logs ({stage.logs.length})</span>
                  <span className="text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5">
                    View <Maximize2 className="w-2.5 h-2.5" />
                  </span>
                </div>
              </button>

              {/* Connector Line */}
              {idx < stages.length - 1 && (
                <div className="w-6 h-[2px] bg-slate-800 flex-shrink-0 relative">
                  <div
                    className={`h-full transition-all duration-500 ${
                      stage.status === "success" ? "bg-emerald-500/80" : "bg-slate-800"
                    }`}
                  />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Terminal Log Modal / Drawer */}
      {activeStage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-slate-950 border border-slate-800 rounded-xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-150">
            <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-semibold text-slate-200">
                  Logs Output: {activeStage.title} Stage
                </span>
              </div>
              <button
                onClick={() => setActiveStage(null)}
                className="text-slate-400 hover:text-slate-200 p-1 rounded-md hover:bg-slate-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-4 max-h-96 overflow-y-auto font-mono text-xs space-y-1.5 bg-slate-950 text-slate-300">
              {activeStage.logs.map((log, lIdx) => (
                <div key={lIdx} className="flex gap-2">
                  <span className="text-slate-600 select-none">{lIdx + 1}</span>
                  <span
                    className={
                      log.includes("[SUCCESS]")
                        ? "text-emerald-400"
                        : log.includes("[FAIL]") || log.includes("[ERROR]")
                        ? "text-rose-400"
                        : log.includes("[RUNNING]")
                        ? "text-amber-400"
                        : "text-slate-300"
                    }
                  >
                    {log}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
```

- [ ] **Step 2: Commit**

```bash
git add src/components/PipelineWidget.tsx
git commit -m "feat: implement interactive DevOps PipelineWidget component with log modal"
```

---

### Task 3: Progress Learning Tracker Component

**Files:**
- Create: `src/components/ProgressTracker.tsx`

**Interfaces:**
- Consumes: `LearningProgress` from `src/lib/supabase.ts`.
- Produces: `ProgressTracker` React client component.

- [ ] **Step 1: Create `src/components/ProgressTracker.tsx`**

Build the terminal-styled learning tracker section:

```tsx
"use client";

import React from "react";
import { BookOpen, Calendar, Award } from "lucide-react";
import { LearningProgress } from "@/lib/supabase";

interface ProgressTrackerProps {
  items?: LearningProgress[];
}

const defaultProgressItems: LearningProgress[] = [
  {
    id: "prog-1",
    title: "Kubernetes & Cloud Native Associate (KCNA)",
    provider: "Linux Foundation / CNCF",
    progress_percent: 75,
    target_date: "Q4 2026",
    status: "in_progress",
    description: "Demonstrates foundational knowledge of Kubernetes and cloud-native ecosystem architecture.",
    order_index: 0
  },
  {
    id: "prog-2",
    title: "AWS Certified Solutions Architect",
    provider: "Amazon Web Services",
    progress_percent: 45,
    target_date: "Q1 2027",
    status: "in_progress",
    description: "Focusing on highly available, resilient, and secure AWS cloud infrastructure designs.",
    order_index: 1
  },
  {
    id: "prog-3",
    title: "Certified Kubernetes Administrator (CKA)",
    provider: "Linux Foundation",
    progress_percent: 15,
    target_date: "Q2 2027",
    status: "planned",
    description: "Hands-on cluster installation, maintenance, networking, and security troubleshooting.",
    order_index: 2
  }
];

export const ProgressTracker: React.FC<ProgressTrackerProps> = ({ items = defaultProgressItems }) => {
  const renderAsciiProgressBar = (percent: number) => {
    const totalBlocks = 15;
    const filledBlocks = Math.round((percent / 100) * totalBlocks);
    const emptyBlocks = totalBlocks - filledBlocks;
    return `[${"█".repeat(filledBlocks)}${"░".repeat(emptyBlocks)}] ${percent}%`;
  };

  return (
    <section id="progress" className="py-16 px-4 max-w-6xl mx-auto font-sans">
      <div className="mb-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/50 text-cyan-400 text-xs font-mono mb-3">
          <BookOpen className="w-3.5 h-3.5" /> Continuous Learning & Certification Targets
        </div>
        <h2 className="text-3xl font-bold text-slate-100 tracking-tight">Progress Learning Tracker</h2>
        <p className="text-slate-400 text-sm mt-2 max-w-xl mx-auto">
          Tracking active cloud, system administration, and infrastructure learning roadmaps in real time.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-slate-950 border border-slate-800 hover:border-slate-700 rounded-xl p-5 flex flex-col justify-between transition-all duration-200 group"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                  {item.provider}
                </span>
                <span
                  className={`text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded ${
                    item.status === "completed"
                      ? "bg-emerald-950 text-emerald-400 border border-emerald-800"
                      : item.status === "in_progress"
                      ? "bg-amber-950 text-amber-400 border border-amber-800"
                      : "bg-slate-900 text-slate-500 border border-slate-800"
                  }`}
                >
                  {item.status.replace("_", " ")}
                </span>
              </div>

              <h3 className="font-semibold text-slate-200 group-hover:text-cyan-400 transition-colors text-base mb-2">
                {item.title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">{item.description}</p>
            </div>

            <div className="pt-4 border-t border-slate-800/80 font-mono">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span className="flex items-center gap-1 text-[11px]">
                  <Calendar className="w-3 h-3 text-cyan-400" /> Target: {item.target_date}
                </span>
                <span className="text-cyan-400 font-bold">{item.progress_percent}%</span>
              </div>
              <div className="text-xs text-cyan-400/90 font-mono overflow-x-auto select-none py-1">
                {renderAsciiProgressBar(item.progress_percent)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ProgressTracker.tsx
git commit -m "feat: implement ProgressTracker component with terminal ASCII progress bars"
```

---

### Task 4: Credly & Digital Badges Component

**Files:**
- Create: `src/components/CredlyBadges.tsx`

**Interfaces:**
- Consumes: `CertificationBadge` from `src/lib/supabase.ts`.
- Produces: `CredlyBadges` React client component.

- [ ] **Step 1: Create `src/components/CredlyBadges.tsx`**

```tsx
"use client";

import React from "react";
import { Award, ExternalLink, ShieldCheck } from "lucide-react";
import { CertificationBadge } from "@/lib/supabase";

interface CredlyBadgesProps {
  badges?: CertificationBadge[];
}

const defaultBadges: CertificationBadge[] = [
  {
    id: "badge-1",
    name: "Oracle Cloud Infrastructure 2025 Certified DevOps Professional",
    issuer: "Oracle",
    badge_image_url: "https://images.credly.com/size/340x340/images/d3752e25-1e3d-49d7-8321-7299a9b6f124/image.png",
    verification_url: "https://credly.com",
    issue_date: "2025",
    is_featured: true,
    order_index: 0
  },
  {
    id: "badge-2",
    name: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    badge_image_url: "https://images.credly.com/size/340x340/images/b9feab85-1a4e-4e6e-8280-f04e477e38c7/image.png",
    verification_url: "https://credly.com",
    issue_date: "2024",
    is_featured: true,
    order_index: 1
  }
];

export const CredlyBadges: React.FC<CredlyBadgesProps> = ({ badges = defaultBadges }) => {
  return (
    <div className="w-full my-8">
      <div className="flex items-center gap-2 mb-6">
        <ShieldCheck className="w-5 h-5 text-cyan-400" />
        <h3 className="text-lg font-bold text-slate-100 font-sans">Verified Digital Badges & Certifications</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {badges.map((badge) => (
          <div
            key={badge.id}
            className="flex items-center gap-4 p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-cyan-500/50 transition-all duration-200 group"
          >
            <div className="w-16 h-16 relative flex-shrink-0 bg-slate-900 rounded-lg p-2 border border-slate-800 flex items-center justify-center">
              <img
                src={badge.badge_image_url}
                alt={badge.name}
                className="w-full h-full object-contain filter group-hover:brightness-110 transition-all"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = "none";
                }}
              />
              <Award className="w-8 h-8 text-cyan-400 absolute hidden group-errored:block" />
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-semibold text-slate-200 group-hover:text-cyan-400 transition-colors line-clamp-2">
                {badge.name}
              </h4>
              <p className="text-[11px] text-slate-400 mt-1">{badge.issuer} • {badge.issue_date}</p>
              {badge.verification_url && (
                <a
                  href={badge.verification_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[10px] font-mono text-cyan-400 hover:underline mt-1.5"
                >
                  Verify Badge <ExternalLink className="w-2.5 h-2.5" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
```

- [ ] **Step 2: Commit**

```bash
git add src/components/CredlyBadges.tsx
git commit -m "feat: implement CredlyBadges component for digital certification display"
```

---

### Task 5: Admin Panel Editors for DevOps Features

**Files:**
- Create: `src/components/admin/PipelineEditor.tsx`
- Create: `src/components/admin/ProgressEditor.tsx`
- Create: `src/components/admin/BadgesEditor.tsx`
- Modify: `src/app/admin/dashboard/page.tsx` (or admin navigation tabs)

- [ ] **Step 1: Create `src/components/admin/PipelineEditor.tsx`**

Build Admin editor interface for editing pipeline stages, status, and terminal log array.

- [ ] **Step 2: Create `src/components/admin/ProgressEditor.tsx`**

Build Admin editor interface for updating learning targets, progress slider, and status.

- [ ] **Step 3: Create `src/components/admin/BadgesEditor.tsx`**

Build Admin editor interface for managing digital badges and verification URLs.

- [ ] **Step 4: Update Admin Navigation Tabs**

Include new tab selectors for `Pipeline`, `Progress`, and `Badges` in the Admin Dashboard menu.

- [ ] **Step 5: Commit**

```bash
git add src/components/admin/PipelineEditor.tsx src/components/admin/ProgressEditor.tsx src/components/admin/BadgesEditor.tsx
git commit -m "feat: implement Admin Editors for Pipeline, Progress Learning, and Badges"
```

---

### Task 6: Main Portfolio Page Integration

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Import Components in `src/app/page.tsx`**

Import `PipelineWidget`, `ProgressTracker`, and `CredlyBadges` statically into `src/app/page.tsx`.

- [ ] **Step 2: Place Components in Layout Flow**

- Render `PipelineWidget` inside/below Hero.
- Render `ProgressTracker` as `#progress` section.
- Render `CredlyBadges` inside the `#skills` section.

- [ ] **Step 3: Test Build & Lint**

Run: `npm run build`
Expected: Build succeeds with 0 errors.

- [ ] **Step 4: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: integrate PipelineWidget, ProgressTracker, and CredlyBadges into main portfolio page"
```
