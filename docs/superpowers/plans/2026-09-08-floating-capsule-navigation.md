# Floating Capsule Navigation & Full-Width Layout Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove the fixed left sidebar rail (`DesktopSidebar`) and replace it with a modern, glassmorphic Floating Capsule Navigation centered at the top of the screen, creating an expansive full-width portfolio layout.

**Architecture:** Create `FloatingNav.tsx` containing an avatar button, segmented tab buttons (`Home`, `Experience`, `Projects`, `Skills`, `Contact`), social links, and theme toggle in a pill capsule. Replace `DesktopSidebar` and `MobileHeader` across `AppShell.tsx`, `ProjectsClientView.tsx`, and `ProjectDetailClient.tsx` while expanding main content width to `max-w-5xl` with top padding.

**Tech Stack:** Next.js 15 (App Router), React 19, Tailwind CSS, Lucide React, TypeScript.

## Global Constraints
- Do not break existing Supabase state synchronization (`usePortfolio`).
- Preserve URL search parameter tab synchronization (`?tab=...`).
- Retain `BottomNavBar` on mobile (`md:hidden`) for thumb reachability.
- Maintain dark/light mode compatibility and glassmorphism contrast.

---

### Task 1: Create `FloatingNav.tsx`

**Files:**
- Create: `src/components/app-layout/FloatingNav.tsx`

**Interfaces:**
- Consumes:
  - `TabType`, `NAV_TABS` from `@/components/app-layout/types`
  - `usePortfolio` from `@/context/PortfolioContext`
  - `ThemeToggle` from `@/components/ThemeToggle`
- Produces:
  - `FloatingNav({ activeTab, onTabChange }: { activeTab: TabType; onTabChange: (tab: TabType) => void })`

- [ ] **Step 1: Create `src/components/app-layout/FloatingNav.tsx`**
Implement the component with:
- Fixed positioning `fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-50`
- Pill shape: `rounded-full bg-background/80 backdrop-blur-xl border border-border shadow-lg shadow-black/5 dark:shadow-black/40 p-1.5 flex items-center gap-1 sm:gap-2`
- Avatar button triggering `onTabChange("home")`
- Tab buttons mapped from `NAV_TABS` with active pill highlight
- GitHub & LinkedIn icon buttons
- Embedded `ThemeToggle`

- [ ] **Step 2: Verify component builds cleanly**
Run: `npm run build` or typecheck to ensure zero TypeScript errors.

- [ ] **Step 3: Commit component**
```bash
git add src/components/app-layout/FloatingNav.tsx
git commit -m "feat: add FloatingNav island navigation component"
```

---

### Task 2: Update `AppShell.tsx` to Use FloatingNav & Full-Width Layout

**Files:**
- Modify: `src/components/app-layout/AppShell.tsx`

**Interfaces:**
- Consumes: `FloatingNav` from `./FloatingNav`

- [ ] **Step 1: Replace DesktopSidebar & MobileHeader with FloatingNav**
- Change outer container from `flex flex-col md:flex-row` to `flex flex-col min-h-screen bg-background text-foreground antialiased`.
- Render `<FloatingNav activeTab={activeTab} onTabChange={handleTabChange} />`.
- Update `<main id="main-content">` to `max-w-5xl mx-auto px-4 sm:px-8 lg:px-12 pt-24 sm:pt-28 pb-24 md:pb-16`.

- [ ] **Step 2: Verify `AppShell.tsx` compiles and runs**
Run: `npm run build`
Expected: Success.

- [ ] **Step 3: Commit**
```bash
git add src/components/app-layout/AppShell.tsx
git commit -m "feat: integrate FloatingNav into AppShell and expand to full width"
```

---

### Task 3: Update `ProjectsClientView.tsx` & `ProjectDetailClient.tsx`

**Files:**
- Modify: `src/app/projects/ProjectsClientView.tsx`
- Modify: `src/app/projects/[slug]/ProjectDetailClient.tsx`

**Interfaces:**
- Consumes: `FloatingNav` from `@/components/app-layout/FloatingNav`

- [ ] **Step 1: Update `ProjectsClientView.tsx`**
Replace `DesktopSidebar` and `MobileHeader` with `<FloatingNav activeTab="projects" onTabChange={handleTabChange} />`.
Update layout classes to match full-width container with `pt-24 sm:pt-28 max-w-5xl`.

- [ ] **Step 2: Update `ProjectDetailClient.tsx`**
Replace `DesktopSidebar` and `MobileHeader` with `<FloatingNav activeTab="projects" onTabChange={handleTabChange} />` in both found and not-found views.
Update layout classes to match full-width container with `pt-24 sm:pt-28 max-w-5xl`.

- [ ] **Step 3: Verify build**
Run: `npm run build`
Expected: Success.

- [ ] **Step 4: Commit**
```bash
git add src/app/projects/ProjectsClientView.tsx src/app/projects/[slug]/ProjectDetailClient.tsx
git commit -m "feat: unify Projects views with FloatingNav and full-width layout"
```

---

### Task 4: Final Verification & Visual Polish

**Files:**
- Test all pages: Home, Experience, Projects, Skills, Contact, `/projects`, `/projects/[slug]`

- [ ] **Step 1: Run production build verification**
Run: `npm run build`
Verify all routes compile without errors.

- [ ] **Step 2: Test tab switching and responsiveness**
Verify tab transitions, URL query sync (`?tab=projects`), light/dark theme toggle, and mobile view.
