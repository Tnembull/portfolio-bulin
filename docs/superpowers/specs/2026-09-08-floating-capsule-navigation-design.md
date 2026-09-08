# Specification: Floating Capsule Navigation & Full-Width Layout

## Overview
Transform the portfolio layout from a fixed desktop left-sidebar (`w-64` sidebar rail) to a modern, expansive full-width layout featuring a centered **Floating Capsule Navigation (Island Navigation)** at the top of the viewport.

The tab-based architecture (`home`, `experience`, `projects`, `skills`, `contact`) remains intact, preserving existing Supabase integrations, URL query synchronization (`?tab=...`), and mobile thumb navigation.

---

## Architecture & Components

### 1. New Component: `FloatingNav.tsx`
* **File Location**: `src/components/app-layout/FloatingNav.tsx`
* **Styling & Positioning**:
  * `fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-50`
  * Capsule shape with glassmorphism:
    `flex items-center gap-1 sm:gap-2 p-1.5 rounded-full bg-background/80 backdrop-blur-xl border border-border shadow-lg shadow-black/5 dark:shadow-black/40`
  * Responsive constraints: `max-w-[calc(100vw-2rem)]` with smooth horizontal scrolling if needed on compact screens.
* **Internal Elements**:
  1. **Brand / Avatar Button**:
     * Circular avatar (`size-8 rounded-full overflow-hidden border border-border bg-surface shrink-0`).
     * Clicking returns user to the `home` tab.
     * Name and status indicator visible on hover or tooltip.
  2. **Divider**:
     * Subtle vertical separator: `h-4 w-px bg-border/60`.
  3. **Segmented Tab Buttons (`NAV_TABS`)**:
     * 5 tabs: `Home`, `Experience`, `Projects`, `Skills`, `Contact`.
     * Active state: `rounded-full bg-surface text-accent border border-border font-semibold shadow-xs px-3 py-1.5 text-xs sm:text-sm`.
     * Inactive state: `text-secondary hover:text-foreground hover:bg-surface/50 border border-transparent px-3 py-1.5 text-xs sm:text-sm transition-all`.
  4. **Divider**:
     * Subtle vertical separator: `h-4 w-px bg-border/60`.
  5. **Quick Actions**:
     * GitHub icon link (`size-8 rounded-full flex items-center justify-center text-secondary hover:text-foreground hover:bg-surface`).
     * LinkedIn icon link (`size-8 rounded-full flex items-center justify-center text-secondary hover:text-foreground hover:bg-surface`).
     * `ThemeToggle` component adapted for pill/rounded layout.

---

### 2. Layout Updates: Replacing `DesktopSidebar`

#### Files to update:
1. `src/components/app-layout/AppShell.tsx`
   * Remove `DesktopSidebar` and `MobileHeader`.
   * Insert `FloatingNav` at the root of `AppShellContent`.
   * Change layout container from `flex-col md:flex-row` to a clean single column `flex-col`.
   * Increase `<main id="main-content">` max-width to `max-w-5xl` (or `max-w-6xl`) with top padding `pt-24 sm:pt-28` to accommodate the floating capsule cleanly without obscuring hero content.
   * Retain `BottomNavBar` on mobile (`md:hidden`) for thumb reachability, while `FloatingNav` provides brand & desktop navigation.

2. `src/app/projects/ProjectsClientView.tsx`
   * Replace `DesktopSidebar` and `MobileHeader` with `FloatingNav`.
   * Update wrapper to single column `flex-col` with `pt-24 sm:pt-28 max-w-5xl`.

3. `src/app/projects/[slug]/ProjectDetailClient.tsx`
   * Replace `DesktopSidebar` and `MobileHeader` with `FloatingNav` in both project found and project not found views.
   * Update wrapper to single column `flex-col` with `pt-24 sm:pt-28 max-w-5xl`.

---

## Responsive Behavior & Accessibility
* **Desktop (>= 768px)**:
  * Floating Capsule sits centered at the top.
  * Sidebar is completely removed, giving 100% of horizontal real estate to content.
* **Mobile (< 768px)**:
  * Top Floating Capsule shows a compact version (Avatar + Active Tab Indicator + Theme Toggle).
  * `BottomNavBar` handles one-handed thumb tab switching.
* **Keyboard Navigation & ARIA**:
  * Full `role="tablist"` and `role="tab"` semantic markup.
  * Skip link `#main-content` properly lands below the floating nav.

---

## Verification Plan
1. **Compilation & Build**:
   * Run `npm run build` to verify no TypeScript or JSX errors.
2. **Visual & Interaction Verification**:
   * Verify tab switching (`home`, `experience`, `projects`, `skills`, `contact`) correctly updates active state in `FloatingNav`.
   * Verify URL query `?tab=...` syncs properly on tab change and direct URL load.
   * Verify navigation on `/projects` catalog page and `/projects/[slug]` detail page works seamlessly.
   * Verify responsive views (desktop, tablet, mobile) for clean spacing and no element overlap.
