# Material You / Native Web-App Style Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform Bulin's portfolio into a fluid, high-performance Material You / Native Web-App experience featuring 5 tab-based views (Home, Experience, Projects, Skills, Contact), an adaptive navigation shell (Bottom Navigation Dock on mobile, Left App Sidebar on desktop), dynamic bottom sheets/modals, and pill-based micro-interactions.

**Architecture:** A responsive App Shell architecture (`AppShell`) orchestrating active tab state with deep-link URL query/hash sync. Mobile viewports (< 768px) render a top sticky `MobileHeader` and bottom `BottomNavBar` with pill indicator. Desktop viewports (≥ 768px) render an adaptive `DesktopSidebar` rail. Views are modularized into dedicated tab components (`HomeTab`, `ExperienceTab`, `ProjectsTab`, `SkillsTab`, `ContactTab`) that pull data from the existing `PortfolioContext` and Supabase backend.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Lucide React, Supabase Client.

**Spec:** `docs/superpowers/specs/2026-09-02-mobile-app-redesign-design.md`

## Global Constraints

- **Theme Palette:** Material You Dark (`#0B0E14` base background, `#121722` surface container, `#1A2232` elevated container, `#38BDF8` & `#00D892` primary accents).
- **Responsive Breakpoints:** Mobile bottom dock active under `768px` (`md`), Desktop sidebar active at `≥ 768px`.
- **Navigation Tabs:** Exactly 5 tabs (`home`, `experience`, `projects`, `skills`, `contact`).
- **Feature Parity:** Keep all existing features working: Supabase live data sync, Credly badges, Project filters & detail modal, Experience/Education feeds, Contact messaging, Terminal/Pipeline widget, Music player widget, and Admin portal routes.
- **Build Cleanliness:** Zero TypeScript errors, zero lint warnings, verified Next.js production build (`npm run build`).

---

## File Structure Map

### New Components to Create:
- `src/components/app-layout/types.ts`: Tab navigation types, active tab union (`"home" | "experience" | "projects" | "skills" | "contact"`), tab configuration.
- `src/components/app-layout/BottomNavBar.tsx`: Mobile bottom navigation dock with pill highlight and icons.
- `src/components/app-layout/MobileHeader.tsx`: Mobile top sticky bar with avatar, status badge, theme switcher, and music trigger.
- `src/components/app-layout/DesktopSidebar.tsx`: Desktop fixed navigation rail with profile, navigation pills, and actions.
- `src/components/app-layout/AppShell.tsx`: Responsive container wrapping top bar, sidebar, active tab renderer, and bottom dock.
- `src/components/tabs/HomeTab.tsx`: Profile hero card, quick actions, key statistics, featured projects, and live learning roadmap summary.
- `src/components/tabs/ExperienceTab.tsx`: Segmented control filter `[Experience | Education | Awards]` with vertical feed cards.
- `src/components/tabs/ProjectsTab.tsx`: Search bar, category filter chips, project app card grid, and responsive detail bottom-sheet/modal.
- `src/components/tabs/SkillsTab.tsx`: Grouped capability chips (Frontend, Backend, Cloud, DevOps, Tools), Credly verified badges, and learning progress.
- `src/components/tabs/ContactTab.tsx`: 1-tap direct connect links, Material contact message form, and developer terminal/pipeline widget.

### Files to Modify:
- `src/app/page.tsx`: Update root page to render `AppShell`.
- `src/components/NavigationWrapper.tsx`: Adapt wrapper to let `AppShell` handle top-level app layout cleanly while maintaining custom cursor and admin isolation.

---

## Tasks

### Task 1: Navigation Types & Layout Configuration

**Files:**
- Create: `src/components/app-layout/types.ts`

**Interfaces:**
- Produces: `TabType = "home" | "experience" | "projects" | "skills" | "contact"`
- Produces: `NAV_TABS` configuration array with id, label, icon name, and badge info.

- [ ] **Step 1: Write `src/components/app-layout/types.ts`**
Define the `TabType` type, navigation item interface, and tab configuration with icons from `lucide-react`.

```typescript
export type TabType = "home" | "experience" | "projects" | "skills" | "contact";

export interface NavTabItem {
  id: TabType;
  label: string;
  shortLabel: string;
  icon: string;
  badge?: string;
}

export const NAV_TABS: NavTabItem[] = [
  { id: "home", label: "Home", shortLabel: "Home", icon: "Home" },
  { id: "experience", label: "Experience", shortLabel: "Exp", icon: "Briefcase" },
  { id: "projects", label: "Projects", shortLabel: "Projects", icon: "FolderGit2" },
  { id: "skills", label: "Skills", shortLabel: "Skills", icon: "Cpu" },
  { id: "contact", label: "Contact", shortLabel: "Contact", icon: "Send" },
];
```

- [ ] **Step 2: Commit Task 1**

```bash
git add src/components/app-layout/types.ts
git commit -m "feat(nav): define navigation tab types and configuration"
```

---

### Task 2: Mobile Top Header Component (`MobileHeader`)

**Files:**
- Create: `src/components/app-layout/MobileHeader.tsx`

**Interfaces:**
- Consumes: `HeroData` from `PortfolioContext`, `ThemeToggle`, `MusicPlayer`
- Produces: `MobileHeader` component for sticky top mobile view.

- [ ] **Step 1: Implement `MobileHeader.tsx`**
Create sticky top bar containing avatar image, live status badge (`🟢 Available`), name & role, Quick Theme switcher, and mini Audio player trigger.

- [ ] **Step 2: Verify component rendering and TypeScript compilation**
Run `npx tsc --noEmit` to verify type safety.

- [ ] **Step 3: Commit Task 2**

```bash
git add src/components/app-layout/MobileHeader.tsx
git commit -m "feat(ui): create MobileHeader top app bar component"
```

---

### Task 3: Mobile Bottom Navigation Bar (`BottomNavBar`)

**Files:**
- Create: `src/components/app-layout/BottomNavBar.tsx`

**Interfaces:**
- Consumes: `TabType`, `NAV_TABS`, `activeTab`, `onTabChange: (tab: TabType) => void`
- Produces: `BottomNavBar` component fixed at bottom with active pill indicators, touch ripple feedback, and safe-area inset support.

- [ ] **Step 1: Implement `BottomNavBar.tsx`**
Build a floating frosted bottom dock with Material You pill indicators for active tab, smooth icon state change, and haptic touch visual effects.

- [ ] **Step 2: Verify type safety with `npx tsc --noEmit`**

- [ ] **Step 3: Commit Task 3**

```bash
git add src/components/app-layout/BottomNavBar.tsx
git commit -m "feat(ui): create BottomNavBar mobile dock component"
```

---

### Task 4: Desktop Sidebar Rail (`DesktopSidebar`)

**Files:**
- Create: `src/components/app-layout/DesktopSidebar.tsx`

**Interfaces:**
- Consumes: `TabType`, `NAV_TABS`, `activeTab`, `onTabChange: (tab: TabType) => void`, `PortfolioContext` data
- Produces: `DesktopSidebar` component rendered on `md:` screens with profile avatar, status indicator, full vertical tab pills, social links, and theme toggle.

- [ ] **Step 1: Implement `DesktopSidebar.tsx`**
Construct the left rail layout (~260px wide) with active pill indicators, direct action buttons, live indicator, and profile metadata.

- [ ] **Step 2: Verify type safety with `npx tsc --noEmit`**

- [ ] **Step 3: Commit Task 4**

```bash
git add src/components/app-layout/DesktopSidebar.tsx
git commit -m "feat(ui): create DesktopSidebar adaptive navigation rail"
```

---

### Task 5: Tab 1 — Home Tab View (`HomeTab`)

**Files:**
- Create: `src/components/tabs/HomeTab.tsx`

**Interfaces:**
- Consumes: `PortfolioContext` (`hero`, `projects`, `stats`, `learningProgress`), `onNavigateTab: (tab: TabType) => void`
- Produces: `HomeTab` component rendering:
  1. Elevated profile card with animated avatar and online status
  2. Quick action pill buttons (Resume, Hire Me, View Projects, Connect)
  3. Metric highlight cards (Projects count, Certifications, Years exp)
  4. Featured project cards with 1-tap view
  5. Active focus widget

- [ ] **Step 1: Implement `HomeTab.tsx`**
Build the Material You dashboard layout with structured card containers, clean spacing, and quick navigation links.

- [ ] **Step 2: Verify type safety with `npx tsc --noEmit`**

- [ ] **Step 3: Commit Task 5**

```bash
git add src/components/tabs/HomeTab.tsx
git commit -m "feat(ui): implement HomeTab dashboard view"
```

---

### Task 6: Tab 2 — Experience & Journey Tab View (`ExperienceTab`)

**Files:**
- Create: `src/components/tabs/ExperienceTab.tsx`

**Interfaces:**
- Consumes: `PortfolioContext` (`experience`, `education`, `awards`)
- Produces: `ExperienceTab` component with segmented control pills `[Work Experience | Education | Awards]`, rendering feed-style timeline cards with company badges, dates, and achievements.

- [ ] **Step 1: Implement `ExperienceTab.tsx`**
Build the segmented control switch and styled card feed with verified badges and expandable details.

- [ ] **Step 2: Verify type safety with `npx tsc --noEmit`**

- [ ] **Step 3: Commit Task 6**

```bash
git add src/components/tabs/ExperienceTab.tsx
git commit -m "feat(ui): implement ExperienceTab with segmented feed"
```

---

### Task 7: Tab 3 — Projects Showcase Tab View (`ProjectsTab`)

**Files:**
- Create: `src/components/tabs/ProjectsTab.tsx`

**Interfaces:**
- Consumes: `PortfolioContext` (`projects`), Supabase projects
- Produces: `ProjectsTab` component with:
  1. Instant search input bar
  2. Category filter pills `[All | Fullstack | AI / ML | Mobile / Web | DevOps]`
  3. Responsive app card grid with live demo / github buttons
  4. Interactive Project Detail Modal / Bottom Sheet

- [ ] **Step 1: Implement `ProjectsTab.tsx`**
Build search, category filter state, interactive card grid, and responsive modal bottom-sheet for comprehensive project inspection.

- [ ] **Step 2: Verify type safety with `npx tsc --noEmit`**

- [ ] **Step 3: Commit Task 7**

```bash
git add src/components/tabs/ProjectsTab.tsx
git commit -m "feat(ui): implement ProjectsTab with search, filters, and modal sheet"
```

---

### Task 8: Tab 4 — Skills & Certifications Tab View (`SkillsTab`)

**Files:**
- Create: `src/components/tabs/SkillsTab.tsx`

**Interfaces:**
- Consumes: `PortfolioContext` (`skills`, `tools`, `certificationBadges`, `learningProgress`)
- Produces: `SkillsTab` component displaying:
  1. Categorized technical skill chips
  2. Verified Credly certification badges with external verify links
  3. Interactive learning roadmap progress cards

- [ ] **Step 1: Implement `SkillsTab.tsx`**
Build categorized capability surfaces, interactive Credly badge grid, and roadmap status tracker.

- [ ] **Step 2: Verify type safety with `npx tsc --noEmit`**

- [ ] **Step 3: Commit Task 8**

```bash
git add src/components/tabs/SkillsTab.tsx
git commit -m "feat(ui): implement SkillsTab with badges and capability chips"
```

---

### Task 9: Tab 5 — Contact & Terminal Tab View (`ContactTab`)

**Files:**
- Create: `src/components/tabs/ContactTab.tsx`

**Interfaces:**
- Consumes: `PortfolioContext`, `CTA` contact logic, `PipelineWidget`
- Produces: `ContactTab` component providing:
  1. 1-tap direct messaging channels (WhatsApp, Email, LinkedIn, GitHub)
  2. Material You contact form with input validation and instant toast feedback
  3. Interactive Developer Pipeline / Terminal widget

- [ ] **Step 1: Implement `ContactTab.tsx`**
Build contact hub, message dispatch form, and embed the developer terminal pipeline.

- [ ] **Step 2: Verify type safety with `npx tsc --noEmit`**

- [ ] **Step 3: Commit Task 9**

```bash
git add src/components/tabs/ContactTab.tsx
git commit -m "feat(ui): implement ContactTab with direct connect and terminal"
```

---

### Task 10: App Shell & Root Page Integration

**Files:**
- Create: `src/components/app-layout/AppShell.tsx`
- Modify: `src/app/page.tsx`
- Modify: `src/components/NavigationWrapper.tsx`

**Interfaces:**
- Consumes: `MobileHeader`, `BottomNavBar`, `DesktopSidebar`, all 5 Tab views (`HomeTab`, `ExperienceTab`, `ProjectsTab`, `SkillsTab`, `ContactTab`).
- Produces: Main responsive application shell with URL query sync (`?tab=...`), smooth view transitions, and top-level layout management.

- [ ] **Step 1: Implement `AppShell.tsx`**
Assemble the complete mobile & desktop app framework managing tab state, history navigation, and active view rendering.

- [ ] **Step 2: Update `src/app/page.tsx` to mount `AppShell`**
Replace previous linear multi-section structure with the dynamic `AppShell`.

- [ ] **Step 3: Update `src/components/NavigationWrapper.tsx`**
Ensure custom cursor and layout wrappers work seamlessly with the new shell without navbar collisions.

- [ ] **Step 4: Verify type safety and full build**
Run `npm run build` to confirm zero compilation errors.

- [ ] **Step 5: Commit Task 10**

```bash
git add src/components/app-layout/AppShell.tsx src/app/page.tsx src/components/NavigationWrapper.tsx
git commit -m "feat(core): integrate AppShell with responsive dual-navigation and 5-tab views"
```

---

### Task 11: End-to-End Polish, Responsiveness & Verification

**Files:**
- Review and polish all new components in `src/components/app-layout/` and `src/components/tabs/`.
- Review `src/app/globals.css` for any necessary mobile-safe styles (safe-area padding, overscroll handling).

- [ ] **Step 1: Polish responsive styles & touch feedback**
Ensure buttons have active scale feedback, bottom dock has backdrop blur, and scroll behavior is smooth on mobile viewports.

- [ ] **Step 2: Run full production build verification**
Run `npm run build` and ensure exit code 0.

- [ ] **Step 3: Final Commit**

```bash
git add -A
git commit -m "chore(ui): finalize Material You mobile web-app redesign and responsiveness polish"
```
