# Technical Design Specification: Clean Editorial Anti-Slop Portfolio Redesign

**Date:** 2026-08-21  
**Author:** Antigravity AI & Portfolio Owner  
**Status:** Approved  
**Target Project:** `porto-bulin` Portfolio Website  

---

## 1. Overview & Vision

Reading this as: Solo System & DevOps Engineer portfolio with an anti-slop, clean editorial / typography-focused language, leaning toward quiet, high-contrast, uncluttered typography, zero card-spam, minimal icons, and crisp, static elegance.

### Key Principles & Anti-Slop Rules:
1. **Zero Card-Spam**: Completely remove bento grids, nested card containers, and heavy background boxes. Information is separated by generous whitespace, subtle hairlines (`border-slate-800`), and clean typographic hierarchy.
2. **Minimal Icon & Animation Policy**: Remove decorative icon spam, infinite pulsing dots, mouse trail effects, and scroll pinning. Keep micro-interactions quiet, static, and responsive.
3. **Zero Em-Dashes**: Strictly zero em-dash (`—`) characters across all visible text, headlines, eyebrows, body copy, and captions.
4. **100/100 Lighthouse Performance, SEO & Accessibility**:
   - High contrast (`text-slate-100` on `bg-slate-950`, minimum 15.8:1 WCAG AAA ratio).
   - HTML5 semantic structure (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`).
   - Keyboard focus rings (`focus-visible:ring-2 focus-visible:ring-cyan-400`).
   - Person & WebSite JSON-LD Schema.
5. **Full Admin Control**: Dynamic content synchronization via Supabase database and `/admin` panel.

---

## 2. Page Architecture & Layout (`src/app/page.tsx`)

### Streamlined 5 Editorial Sections:

```tsx
<main id="main-content" className="relative min-h-screen bg-slate-950 text-slate-100 font-sans border-x border-slate-800/60 max-w-5xl mx-auto">
  {/* 1. Header Navigation */}
  <Navbar />

  {/* 2. Hero Header */}
  <section id="hero" className="py-20 px-6 border-b border-slate-800/80">
    <HeroEditorial />
  </section>

  {/* 3. Featured Systems & Infrastructure (Row/Bar Layout - No Card Boxes) */}
  <section id="projects" className="py-16 px-6 border-b border-slate-800/80">
    <ProjectsEditorial featuredOnly={true} />
  </section>

  {/* 4. Capabilities Matrix & Verified Badges (Clean Text Grid) */}
  <section id="skills" className="py-16 px-6 border-b border-slate-800/80">
    <CapabilitiesEditorial />
    <CredlyBadgesEditorial />
  </section>

  {/* 5. Minimal Terminal Console & Contact Footer */}
  <section id="contact" className="py-16 px-6">
    <PipelineWidgetEditorial />
    <ContactEditorial />
  </section>
  
  <FooterEditorial />
</main>
```

---

## 3. Dedicated Projects Catalog (`src/app/projects/page.tsx`)

- Dedicated clean page listing all infrastructure & backend projects in an editorial list layout.
- Category filtering tabs (All, DevOps, Backend, Cloud/K8s).
- Direct external links to live demos and GitHub source code.

---

## 4. Admin Dashboard Integration (`/admin`)

- Full Supabase database support: `portfolio_data`, `pipeline_stages`, `learning_progress`, `certification_badges`.
- Allows updating all hero copy, project lists, capabilities, and badges live from `/admin`.
