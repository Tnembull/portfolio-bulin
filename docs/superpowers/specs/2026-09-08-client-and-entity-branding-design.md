# Design Specification: Clients Showcase & Organization/Institution Logos

**Date**: 2026-09-08  
**Topic**: Clients Infinite Marquee & Logo Support for Experience and Education  
**Status**: Proposed / Awaiting Review  

---

## 1. Overview & Goals

This specification outlines the integration of client and institutional branding into Muhammad Nur Ashiddiqi's portfolio website (`porto-bulin`). The goals are:
1. Provide social proof on the Homepage by displaying a smooth infinite marquee slider of organizations and clients handled.
2. Allow complete dynamic management of clients via Supabase and the Admin Dashboard (`/admin`).
3. Add company/client logo display support in the **Experience** section (replacing the default briefcase icon when a logo is provided).
4. Add institution logo display support in the **Education** section (replacing the default graduation cap icon when a logo is provided).

---

## 2. Data Architecture (`src/context/PortfolioContext.tsx`)

### 2.1 Clients Data Schema
```typescript
export interface ClientItem {
  id: string;
  name: string;          // e.g. "CloudScale Architecture", "Fintech Enterprise"
  logoSrc?: string;       // Image URL or SVG path for client logo
  industry?: string;      // e.g. "Fintech & Banking", "Cloud SaaS", "E-Commerce"
  url?: string;           // External URL or case study link
}

export interface ClientsData {
  sectionBadge: string;   // e.g. "02 // TRUSTED BY"
  titleMain: string;      // e.g. "Selected Clients &"
  titleHighlight: string; // e.g. "Collaborations"
  subText?: string;
  items: ClientItem[];
}
```

### 2.2 ExperienceItem & EducationItem Schema Updates
```typescript
export interface ExperienceItem {
  id: string;
  year: string;
  role: string;
  company: string;
  logo?: string;          // NEW: Company/Client logo URL
  description: string;
  tags?: string[];
  location?: string;
  jobType?: string;
}

export interface EducationItem {
  id: string;
  year: string;
  degree: string;
  institution: string;
  logo?: string;          // NEW: Institution/University logo URL
  gpa?: string;
  details?: string;
}
```

### 2.3 Global State & Supabase Persistence
- `PortfolioState` will include `clients?: ClientsData`.
- `DEFAULT_PORTFOLIO_STATE` will provide default fallback items for `clients`.
- `fetchPortfolioFromSupabase` and `savePortfolioToSupabase` automatically serialize and sync the state JSON with Supabase table `portfolio_data`.

---

## 3. UI Components & Presentations

### 3.1 Homepage: `ClientsMarquee.tsx`
- **Location**: In `src/components/ClientsMarquee.tsx`, integrated into `src/components/tabs/HomeTab.tsx` directly below the Hero section (before Selected Projects).
- **Layout & Motion**:
  - Horizontal CSS marquee with continuous smooth translation and `hover:pause`.
  - Responsive container with fade gradients on the left and right edges for a seamless edge-blend.
  - Card/Pill item showing the client logo (rendered with Next.js `Image` or styled typography badge fallback) + client name + industry tag.
  - Dark cyberpunk / editorial aesthetics conforming to the existing design system (`#00d892` / `#48b685` accent, dark surface background).

### 3.2 Experience Section: `ExperienceTimeline.tsx` & `ExperienceTab.tsx`
- In `ExperienceTimeline.tsx`:
  - Check if `item.logo` is provided and non-empty.
  - If present: Render a rounded image box (`size-10` or `size-11`) displaying the company logo (with `object-contain` or `object-cover` and subtle border).
  - If absent: Gracefully render the existing `<Briefcase size={16} />` icon.
- In `ExperienceTab.tsx`:
  - Display the company logo in the timeline record next to role and company name.

### 3.3 Education Section: `Education.tsx` & `ExperienceTab.tsx`
- In `Education.tsx`:
  - Check if `item.logo` is provided and non-empty.
  - If present: Render the institution logo in the avatar square (`size-10`).
  - If absent: Gracefully render the existing `<GraduationCap size={18} />` icon.
- In `ExperienceTab.tsx` (under Education sub-tab):
  - Display the institution logo alongside degree and university name.

---

## 4. Admin Dashboard Management (`/admin`)

### 4.1 New Tab: Clients (`src/components/admin/ClientsEditor.tsx`)
- Add `"clients"` to `SectionTab` type in `src/app/admin/page.tsx`.
- Add sidebar menu item `CLIENTS & PARTNERS` with an icon (e.g. `Building2` or `Handshake`).
- Create `ClientsEditor.tsx`:
  - Section badge, titleMain, titleHighlight, and subText editor.
  - CRUD operations on `items`: Add new client, delete client, edit name, industry, logo URL, and link.
  - Instant preview of the client card.

### 4.2 Updated: `ExperienceEditor.tsx`
- Add input field: **"Logo Perusahaan / Klien (URL)"** with a live thumbnail preview and clear/reset button.

### 4.3 Updated: `EducationEditor.tsx`
- Add input field: **"Logo Institusi / Universitas (URL)"** with a live thumbnail preview and clear/reset button.

---

## 5. Non-Functional Requirements & Error Handling
- **Image Fallbacks**: If any logo URL fails to load or is invalid, the UI must fall back gracefully to the styled icon or letter avatar without throwing runtime errors or layout shifts.
- **Mobile Responsiveness**: Sliders and grids must be fully responsive across mobile (360px+), tablet, and desktop viewports.
- **Zero Breaking Changes**: Existing Supabase state records without `clients` or without `logo` fields will parse without errors via optional chaining (`?.`) and default values.
