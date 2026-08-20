# Technical Design Specification: DevOps Pipeline Widget & Progress Learning Tracker

**Date:** 2026-08-21  
**Author:** Antigravity AI & Portfolio Owner  
**Status:** Approved  
**Target Project:** `porto-bulin` Portfolio Website  

---

## 1. Overview & Goals

Inspired by features found on [mdrdani.my.id](https://mdrdani.my.id/), this project enhances the existing `porto-bulin` Next.js portfolio with interactive DevOps/Terminal-style features:

1. **Interactive CI/CD Pipeline Widget & Typewriter Hero**: Interactive terminal-style pipeline widget (Code → Build → Test → Deploy → Monitor) with clickable stages, status indicators, and live CLI terminal logs modal.
2. **Progress Learning & Certification Tracker**: Visual terminal progress bar component showing upcoming certification goals (e.g., KCNA, AWS, CKA), percentage, status, and target dates.
3. **Credly & Digital Certification Badges**: Interactive badge display with verification links and metadata.
4. **Full Supabase Database & Admin Dashboard Integration**: Complete CRUD management for all new features in `/admin` with Supabase tables and Cloudflare R2 storage support.

---

## 2. Architecture & Data Model

### 2.1 Database Schema (Supabase)

#### Table: `pipeline_stages`
```sql
CREATE TABLE IF NOT EXISTS public.pipeline_stages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'idle' CHECK (status IN ('success', 'running', 'idle', 'failed')),
  icon_name TEXT,
  logs TEXT[] DEFAULT '{}',
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
```

#### Table: `learning_progress`
```sql
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
```

#### Table: `certification_badges`
```sql
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
```

---

## 3. Frontend Component Specifications

### 3.1 `PipelineWidget.tsx` (`src/components/PipelineWidget.tsx`)
- **Theme**: Dark Monokrom Terminal aesthetic (`bg-slate-950/90`, `border-slate-800`, `font-mono`).
- **Features**:
  - Top bar with macOS-style window control buttons (red, yellow, green).
  - Horizontal/vertical pipeline stage steps with glowing pulsing indicators (Green for `running`/`success`, Amber for `idle`, Red for `failed`).
  - Clickable stages opening a Terminal Log Drawer/Modal rendering simulated CLI log streaming.
  - Interactive Typewriter headline effect integrated into the Hero or Widget header.

### 3.2 `ProgressTracker.tsx` (`src/components/ProgressTracker.tsx`)
- **Theme**: Clean terminal progress cards (`font-mono`, `border-emerald-500/20` highlight).
- **Features**:
  - Custom ASCII / CSS visual progress bar (`[████████░░] 80%`).
  - Filter / status badges (`IN_PROGRESS`, `PLANNED`, `COMPLETED`).
  - Target year and learning provider labels.

### 3.3 `CredlyBadges.tsx` (`src/components/CredlyBadges.tsx`)
- **Theme**: Interactive grid of verified badges.
- **Features**:
  - Hover zoom + subtle neon outline effect.
  - Direct links to official verification pages (Credly, Oracle, AWS, etc.).

---

## 4. Admin Dashboard Components

1. `src/components/admin/PipelineEditor.tsx`: Full CRUD for pipeline stages, stage order, status toggles, and terminal logs.
2. `src/components/admin/ProgressEditor.tsx`: CRUD for learning targets, progress percentage sliders (0-100%), and status tags.
3. `src/components/admin/BadgesEditor.tsx`: CRUD for badges with image upload to Cloudflare R2 / Supabase Storage.
4. **Admin Sidebar**: Updated `src/components/admin/` navigation panel with new tab shortcuts for Pipeline, Progress, and Badges.

---

## 5. Main Page Integration (`src/app/page.tsx`)

- Integrate `PipelineWidget` in the `Hero` section.
- Integrate `ProgressTracker` as a dedicated section ("Progress Learning & Target Certifications").
- Integrate `CredlyBadges` into the `Skills` section.
