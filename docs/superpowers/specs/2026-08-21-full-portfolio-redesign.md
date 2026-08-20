# Technical Design Specification: Full Portfolio Redesign & Optimization

**Date:** 2026-08-21  
**Author:** Antigravity AI & Portfolio Owner  
**Status:** Approved  
**Target Project:** `porto-bulin` Portfolio Website  

---

## 1. Overview & Objectives

This specification outlines the complete redesign of the `porto-bulin` portfolio website into a high-performance, streamlined, modern **Dark-Tech / Cyber-Minimalist** portfolio tailored for a **System Engineer & DevOps / Backend Engineer**.

### Primary Objectives:
1. **Streamlined Landing Page (`/`)**: Focus the main page on 5 high-impact sections (Hero + Interactive Pipeline Widget, Featured Projects Top 3, Capabilities & Digital Badges, Progress Learning, Contact & CTA).
2. **Dedicated Sub-pages & Views**:
   - `/projects`: Dedicated catalog page with category filtering and complete architecture details.
   - Separate modal/accordion views for detailed career & education experience.
3. **100/100 Lighthouse Benchmark (SEO, Accessibility, Best Practices, Performance)**:
   - Full WCAG 2.1 AAA color contrast compliance (`text-slate-100` on `bg-slate-950`).
   - Keyboard focus rings (`focus-visible:ring-2 focus-visible:ring-cyan-400`).
   - HTML5 semantic structure (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`).
   - JSON-LD Person & WebSite Schema structured data.
   - GPU-accelerated micro-interactions (zero layout reflow).
4. **Complete Admin Dashboard Integration (`/admin`)**: Full CRUD controls backed by Supabase tables and Cloudflare R2 storage.

---

## 2. Page Architecture & Section Layout

### 2.1 Main Landing Page (`src/app/page.tsx`)
```tsx
<main id="main-content" className="relative min-h-screen bg-slate-950 text-slate-100 font-sans">
  <Navbar />
  <HeroSection />          {/* Hero Header + Typewriter Role + Interactive PipelineWidget */}
  <FeaturedProjects />     {/* Top 3 Featured Projects with 'View All Projects' CTA */}
  <SkillsAndBadges />      {/* Capabilities Matrix + Credly Verification Badges */}
  <ProgressTrackerSection />{/* Progress Learning & Certification Roadmap */}
  <ContactSection />       {/* Contact CTA Form & Footer Links */}
</main>
```

### 2.2 Dedicated Projects Page (`src/app/projects/page.tsx`)
- Full project grid with category tabs (All, DevOps, Backend, Cloud/K8s).
- Detailed project cards with live demo buttons, source code links, architecture badges, and image lightbox.

---

## 3. SEO & Accessibility (a11y) Specifications

1. **Color Contrast & Theme Tokens**:
   - Background: Slate 950 (`#020617`), Cards: Slate 900 (`#0F172A`), Accent: Cyan 400 (`#22D3EE`) & Emerald 400 (`#34D399`).
   - Body text: Slate 100 (`#F1F5F9`) / Slate 300 (`#CBD5E1`) - Minimum 15.8:1 contrast ratio.
2. **Accessibility Features**:
   - Skip to main content link: `<a href="#main-content" className="sr-only focus:not-sr-only ...">Skip to content</a>`.
   - `aria-label`, `aria-expanded`, `aria-live="polite"` on terminal modals and dropdowns.
3. **Structured Data JSON-LD**:
   - Person Schema (`name`, `jobTitle`, `sameAs`, `knowsAbout`, `email`).
   - WebSite Schema (`url`, `name`, `author`).

---

## 4. Supabase & Admin Dashboard Integration

- `portfolio_data`: Stores hero, about, capabilities matrix, and CTA metadata.
- `pipeline_stages`: Stores interactive CI/CD pipeline steps, status, and CLI logs.
- `learning_progress`: Stores progress percentage, target dates, and status tags.
- `certification_badges`: Stores badge image URLs, verification links, and featured flags.
