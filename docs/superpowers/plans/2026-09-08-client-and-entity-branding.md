# Clients Showcase & Experience/Education Logos Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement a dynamic infinite logo marquee for clients/collaborations on the homepage, and add logo support for Experience and Education entries across the frontend and admin dashboard.

**Architecture:** Extend `PortfolioContext` with `ClientsData` and logo fields in `ExperienceItem` and `EducationItem`. Build a responsive `ClientsMarquee` component on the Homepage. Update `ExperienceTimeline`, `Education`, and `ExperienceTab` components to render logos with SVG fallbacks. Add `ClientsEditor` and logo inputs in `ExperienceEditor` and `EducationEditor` in `/admin`.

**Tech Stack:** Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, Lucide Icons, Supabase.

## Global Constraints

- Never break existing portfolio data: `clients`, `item.logo` must be optional with graceful fallbacks.
- Design must follow the existing cyberpunk/editorial dark theme (`#00d892`, `#48b685`, `#181a1d`, `#0b0e12`, border `#303235`).
- Keep all existing comments and structure intact.

---

### Task 1: Update Global Portfolio Types & State

**Files:**
- Modify: `src/context/PortfolioContext.tsx`

**Interfaces:**
- Produces: `ClientItem`, `ClientsData`, updated `ExperienceItem`, updated `EducationItem`, updated `PortfolioState`

- [ ] **Step 1: Modify `src/context/PortfolioContext.tsx`**
  - Add `ClientItem` and `ClientsData` interfaces.
  - Add `logo?: string;` to `ExperienceItem`.
  - Add `logo?: string;` to `EducationItem`.
  - Add `clients?: ClientsData;` to `PortfolioState`.
  - Add default `clients` object in `DEFAULT_PORTFOLIO_STATE`.

- [ ] **Step 2: Verify TypeScript compilation**
  Run: `npx tsc --noEmit`
  Expected: Success with 0 errors.

- [ ] **Step 3: Commit**
  ```bash
  git add src/context/PortfolioContext.tsx
  git commit -m "feat(context): add clients data model and logo fields to experience and education"
  ```

---

### Task 2: Create ClientsMarquee Component & Integrate into Homepage

**Files:**
- Create: `src/components/ClientsMarquee.tsx`
- Modify: `src/components/tabs/HomeTab.tsx`

**Interfaces:**
- Consumes: `usePortfolio` from `PortfolioContext`, `ClientItem`
- Produces: `<ClientsMarquee />`

- [ ] **Step 1: Create `src/components/ClientsMarquee.tsx`**
  - Read `state.clients` from `usePortfolio()`.
  - Return null if `!clients?.items || clients.items.length === 0`.
  - Render an infinite horizontal marquee with CSS animations, left/right edge fade gradients, and `pause-on-hover`.
  - Each item renders a logo image (with Next.js `<Image />` or fallback monogram), client name, and industry tag.

- [ ] **Step 2: Integrate into `src/components/tabs/HomeTab.tsx`**
  - Import `ClientsMarquee`.
  - Place `<ClientsMarquee />` directly below the Hero section and above the Selected Projects section.

- [ ] **Step 3: Verify TypeScript compilation**
  Run: `npx tsc --noEmit`
  Expected: Success with 0 errors.

- [ ] **Step 4: Commit**
  ```bash
  git add src/components/ClientsMarquee.tsx src/components/tabs/HomeTab.tsx
  git commit -m "feat(home): add ClientsMarquee component below hero section"
  ```

---

### Task 3: Add Company Logo Support to Experience Section

**Files:**
- Modify: `src/components/ExperienceTimeline.tsx`
- Modify: `src/components/tabs/ExperienceTab.tsx`

**Interfaces:**
- Consumes: `item.logo` from `ExperienceItem`

- [ ] **Step 1: Update `src/components/ExperienceTimeline.tsx`**
  - In the header row of each experience item, check if `item.logo` exists.
  - If present: render an `<Image />` or `<img>` inside the avatar container with `object-contain`.
  - If absent: render `<Briefcase size={16} />`.

- [ ] **Step 2: Update `src/components/tabs/ExperienceTab.tsx`**
  - In the Work Experience sub-tab list, render the company logo if `item.logo` is provided, alongside role and company name.

- [ ] **Step 3: Verify TypeScript compilation**
  Run: `npx tsc --noEmit`
  Expected: Success with 0 errors.

- [ ] **Step 4: Commit**
  ```bash
  git add src/components/ExperienceTimeline.tsx src/components/tabs/ExperienceTab.tsx
  git commit -m "feat(experience): support company and client logos in experience views"
  ```

---

### Task 4: Add Institution Logo Support to Education Section

**Files:**
- Modify: `src/components/Education.tsx`
- Modify: `src/components/tabs/ExperienceTab.tsx`

**Interfaces:**
- Consumes: `item.logo` from `EducationItem`

- [ ] **Step 1: Update `src/components/Education.tsx`**
  - Check if `item.logo` exists for each education card.
  - If present: render the institution logo image with `object-contain`.
  - If absent: render `<GraduationCap size={18} />`.

- [ ] **Step 2: Update `src/components/tabs/ExperienceTab.tsx`**
  - In the Education sub-tab list, display the institution logo if `item.logo` is present.

- [ ] **Step 3: Verify TypeScript compilation**
  Run: `npx tsc --noEmit`
  Expected: Success with 0 errors.

- [ ] **Step 4: Commit**
  ```bash
  git add src/components/Education.tsx src/components/tabs/ExperienceTab.tsx
  git commit -m "feat(education): support institution logos in education views"
  ```

---

### Task 5: Implement Admin Dashboard Editors for Clients, Experience Logos, & Education Logos

**Files:**
- Create: `src/components/admin/ClientsEditor.tsx`
- Modify: `src/components/admin/ExperienceEditor.tsx`
- Modify: `src/components/admin/EducationEditor.tsx`
- Modify: `src/app/admin/page.tsx`

**Interfaces:**
- Consumes: `ClientsData`, `ExperienceData`, `EducationData`

- [ ] **Step 1: Create `src/components/admin/ClientsEditor.tsx`**
  - Follow the existing admin editor patterns (`ToolsEditor.tsx`, `ExperienceEditor.tsx`).
  - Allow editing `sectionBadge`, `titleMain`, `titleHighlight`, `subText`.
  - Add, remove, and update `items` (name, logoSrc, industry, url).
  - Include thumbnail preview for logo.

- [ ] **Step 2: Update `src/components/admin/ExperienceEditor.tsx`**
  - Add input field for **Company / Client Logo URL** (`item.logo`) with preview.

- [ ] **Step 3: Update `src/components/admin/EducationEditor.tsx`**
  - Add input field for **Institution Logo URL** (`item.logo`) with preview.

- [ ] **Step 4: Update `src/app/admin/page.tsx`**
  - Add `"clients"` to `SectionTab` union type.
  - Add sidebar button for **Clients & Partners** with `Building2` icon.
  - Add condition to render `<ClientsEditor />` when `activeTab === "clients"`.

- [ ] **Step 5: Verify build & TypeScript compilation**
  Run: `npx tsc --noEmit`
  Expected: Success with 0 errors.

- [ ] **Step 6: Commit**
  ```bash
  git add src/components/admin/ClientsEditor.tsx src/components/admin/ExperienceEditor.tsx src/components/admin/EducationEditor.tsx src/app/admin/page.tsx
  git commit -m "feat(admin): add ClientsEditor and logo inputs for experience and education"
  ```

---

### Task 6: End-to-End Verification & Walkthrough

**Files:**
- Test across responsive views and admin dashboard

- [ ] **Step 1: Verify Next.js build**
  Run: `npm run build`
  Expected: Build succeeds without errors or missing imports.

- [ ] **Step 2: Commit any final polish**
  ```bash
  git status
  ```
