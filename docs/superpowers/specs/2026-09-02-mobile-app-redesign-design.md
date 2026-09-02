# Design Specification: Material You / Native Web-App Style Redesign

**Date:** 2026-09-02  
**Author:** Pair Programming Session with Bulin  
**Status:** Approved by User  
**Theme:** Material You / Modern Dark Android Mobile App Aesthetic

---

## 1. Executive Summary & Vision

Transform the existing developer portfolio into a high-performance, fluid **Native Web-App (PWA style)** experience. The user interface adopts **Material You / Modern Dark Android** design patterns, featuring:
- Seamless tab-based screen navigation with smooth animated transitions.
- Responsive dual-navigation architecture: **Bottom Navigation Bar** on mobile devices and an **Adaptive Left App Sidebar Rail** on tablet/desktop displays.
- Segmented control chips, dynamic surface elevations, pill-shaped action buttons, responsive bottom sheets/modals, and interactive widgets.
- Full integration with existing Supabase dynamic data and local portfolio context.

---

## 2. Navigation Architecture & Layout

### 2.1 Adaptive App Frame Layout
- **Mobile (< 768px):**
  - **Top App Bar (`MobileHeader`):** Sticky frosted header with user avatar, name, live status badge (`🟢 Available`), quick theme toggle, and audio widget trigger.
  - **Main Viewport Stage:** Fluid full-width container with bottom padding (`pb-24`) to prevent content overlap with the bottom dock.
  - **Bottom Navigation Bar (`BottomNavBar`):** Sticky bottom dock with 5 Material You pill-indicator tabs:
    1. `home` (🏠 Home)
    2. `experience` (💼 Experience)
    3. `projects` (🚀 Projects)
    4. `skills` (⚡ Skills)
    5. `contact` (📬 Contact)
- **Desktop (≥ 768px):**
  - **Left Sidebar App Rail (`DesktopSidebar`):** Fixed left navigation rail (~260px width) with profile overview, active tab pill indicators, social links, theme switcher, and music mini-player.
  - **Main Content Stage:** Scrollable content area taking remaining width (`max-w-5xl` centered inside the main pane).

### 2.2 Navigation State Management & URL Sync
- Active tab state managed via React state & synced with URL search params / hash (e.g. `/?tab=projects` or `/#projects`).
- Deep-linking support: Direct URL navigation lands users on the intended tab seamlessly.
- Smooth tab transitions powered by `framer-motion` (instantaneous switch feel with subtle horizontal slide/fade).

---

## 3. Screen Specifications (5 Tabs)

### 3.1 Tab 1: 🏠 Home (App Dashboard)
- **Hero Profile Card:** Modern elevated surface featuring Bulin's dynamic avatar, role tags, bio summary, location/timezone chip, and status pill.
- **Quick Action Bar:** Pill buttons for *"Resume / CV"*, *"Hire Me"*, *"GitHub"*, and *"LinkedIn"*.
- **Quick Metric Cards:** 4-column compact grid (Total Projects, Certifications, Years Experience, Core Technologies).
- **Featured Projects Showcase:** Top 2-3 highlighted projects rendered as interactive cards with quick action buttons.
- **Current Focus / Live Learning:** Interactive widget showing current focus technologies and ongoing roadmaps.

### 3.2 Tab 2: 💼 Experience (Journey, Education & Awards)
- **Segmented Control Pill Bar:** `[💼 Work Experience | 🎓 Education | 🏆 Awards & Honors]`.
- **Feed-style Timeline Cards:** Clean vertical feed cards with company logo/icon, role, date duration pill, job type tag, and key achievements.
- **Education Section:** University/school details, GPA/honors, relevant coursework chips.
- **Awards Marquee / Cards:** Hackathons, competitions, and notable recognitions.

### 3.3 Tab 3: 🚀 Projects (Portfolio Showcase)
- **Search & Filter Header:** Instant search input field + category chip selector `[All | Fullstack | AI / ML | Mobile / Web | DevOps]`.
- **App Store / Card Grid:** Responsive card grid showing project cover image, title, summary, tech stack chips, and primary actions (`Live Demo`, `Source Code`).
- **Interactive Project Modal / Bottom Sheet:** Detailed slide-up view (bottom sheet on mobile, centered modal on desktop) showing project overview, gallery, tech stack breakdown, and key challenge solutions.

### 3.4 Tab 4: ⚡ Skills (Capabilities & Certifications)
- **Grouped Capability Chips:** Categorized cards for Frontend, Backend, Cloud & Databases, and Tooling with proficiency indicators.
- **Credly Certification Badges:** Interactive badge grid with verification links (AWS, Google, Dicoding, etc.).
- **Interactive Learning Roadmap:** Step-by-step progress tracker for active learning goals.

### 3.5 Tab 5: 📬 Contact (Connect & Interactive Terminal)
- **Quick Connect Actions:** 1-tap contact buttons for WhatsApp, Email, LinkedIn, Telegram, and GitHub.
- **Direct Message Form:** Material You styled form (Name, Email, Message) with real-time feedback and submission handling.
- **Interactive Developer Terminal / Pipeline Widget:** Collapsible command-line pipeline widget showcasing developer tools, scripts, and status check commands.

---

## 4. Visual Design System & Styling (Material You Dark)

- **Color Palette:**
  - Base Background: `#0B0E14` (Deep dark slate)
  - Surface Containers: `#121722` (Card surface), `#1A2232` (Elevated surface), `#222E42` (Interactive hover)
  - Accent / Primary: `#38BDF8` (Sky blue) & `#818CF8` (Indigo) / `#34D399` (Emerald for online status)
  - Surface Stroke: `rgba(255, 255, 255, 0.08)`
  - Typography: Inter / SF Pro / Material-compliant sans-serif with clear weights (font-bold titles, medium labels, regular body).
- **Interactive Components:**
  - Pill active indicator with spring animation (`layoutId="activeTabPill"`).
  - Touch feedback micro-interactions (`active:scale-95`).
  - Native feel: `overscroll-behavior-y: contain`, smooth inertial scrolling, safe-area-inset padding for iOS home indicator.

---

## 5. Implementation Strategy & File Structure

1. **New / Updated Core Components:**
   - `src/components/app-layout/AppShell.tsx`: Top-level responsive wrapper (Bottom Nav on mobile, Sidebar on desktop).
   - `src/components/app-layout/BottomNavBar.tsx`: Material You bottom navigation dock.
   - `src/components/app-layout/MobileHeader.tsx`: Sticky top mobile header.
   - `src/components/app-layout/DesktopSidebar.tsx`: Left rail desktop navigation.
   - `src/components/tabs/HomeTab.tsx`: Tab 1 content.
   - `src/components/tabs/ExperienceTab.tsx`: Tab 2 content (with segmented sub-tabs).
   - `src/components/tabs/ProjectsTab.tsx`: Tab 3 content (with search, filters & modal).
   - `src/components/tabs/SkillsTab.tsx`: Tab 4 content (skills & badges).
   - `src/components/tabs/ContactTab.tsx`: Tab 5 content (contact form & terminal widget).
2. **Main Page Integration:**
   - `src/app/page.tsx`: Render `AppShell` managing active tab state and rendering the respective tab views.
3. **Preservation:**
   - Retain full functionality of `PortfolioContext`, Supabase dynamic content, music player, admin routes, and SEO metadata.

---

## 6. Testing & Quality Verification Plan

1. **Responsive Verification:**
   - Test on mobile viewport (< 768px): Verify bottom nav bar layout, tap response, safe area padding, and top header.
   - Test on tablet & desktop (≥ 768px): Verify sidebar rail positioning, content scaling, and keyboard accessibility.
2. **Tab Navigation Verification:**
   - Verify switching between all 5 tabs is instantaneous, transitions are smooth, and back-button / URL hash sync works properly.
3. **Feature Parity Verification:**
   - Verify all existing portfolio features (Projects filtering/modal, Credly badges, Timeline, Contact Form, Audio Player, Admin access) continue to work flawlessly.
4. **Build & Typecheck:**
   - Run `npm run build` and `npm run lint` (or TypeScript check) to ensure zero compilation errors.
