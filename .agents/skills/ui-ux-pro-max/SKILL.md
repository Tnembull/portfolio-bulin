---
name: ui-ux-pro-max
description: Elite UI/UX & Design Engineering skill. Advanced design systems, micro-interactions, responsive architecture, anti-slop typography, heuristic audits, and accessible human-centered interfaces.
---

# Protocol: UI/UX Pro Max — Elite Design Systems & Product Experience Engineering

## 1. Protocol Overview
**UI/UX Pro Max** is an exhaustive design engineering specification and execution manual. It trains the AI to architect, audit, and build world-class digital products that combine aesthetic beauty with mathematical precision, emotional resonance, fluid motion physics, and uncompromising accessibility.

---

## 2. Absolute Negative Constraints (Banned AI Defaults)
To eliminate generic, cheap-looking AI interfaces, the following patterns are strictly forbidden:
- **NO Generic Font Stacks**: Never default to unstyled `Inter`, `Roboto`, or `Arial`. Use curated, distinctive typographic combinations (e.g. `Outfit` + `JetBrains Mono`, `Geist Sans` + `Geist Mono`, `Instrument Serif` + `Switzer`).
- **NO Heavy Uncalibrated Shadows**: Avoid `box-shadow: 0 20px 25px rgba(0,0,0,0.5)`. Use multi-layered, ultra-diffuse ambient shadows with `< 0.08` opacity or crisp hairline borders (`1px solid rgba(255,255,255,0.08)`).
- **NO Emojis as UI Icons**: Never use raw emojis (🚀, 💡, 🔥) as interface icons or section bullets. Use calibrated SVG icon systems (Lucide, Radix, Phosphor) with uniform stroke weights.
- **NO Unreachable Contrast**: Never use low-contrast muted gray text that fails WCAG AA (e.g. `#555` on `#111`). Ensure all body text meets at least 4.5:1 contrast ratio.
- **NO Card Nesting Syndrome**: Avoid cards inside cards inside cards. Use subtle surface elevation, hairline dividers, or whitespace grouping instead of infinite nested borders.
- **NO Unstyled Loading States**: Never leave blank flashes or default spinning wheels. Implement skeleton screens matching the exact layout topology.
- **NO AI Cliché Copywriting**: Ban buzzwords like "Next-Gen", "Seamless Experience", "Revolutionize", "Empower". Use concise, functional, and domain-specific terminology.

---

## 3. Design Tokens & Visual Hierarchy

### 3.1 The 8-Point Spatial Grid
- Base unit: `8px` (`4px` for sub-atomic spacing like icon-to-text gap).
- Margins & Padding scale: `4px (0.25rem)`, `8px (0.5rem)`, `16px (1rem)`, `24px (1.5rem)`, `32px (2rem)`, `48px (3rem)`, `64px (4rem)`, `96px (6rem)`.
- Section gaps: `py-16` to `py-24` for mobile, `py-24` to `py-32` for desktop.

### 3.2 Typography Hierarchy & Modular Scales
- **Display / Hero**: `3rem` to `4.5rem` (48px – 72px), `line-height: 1.05 - 1.15`, tracking `-0.03em`.
- **H1 Section Titles**: `2rem` to `2.75rem` (32px – 44px), `line-height: 1.2`, tracking `-0.02em`.
- **H2 Subsection Headers**: `1.25rem` to `1.75rem` (20px – 28px), `line-height: 1.3`, tracking `-0.01em`.
- **Body Regular**: `0.9375rem` to `1.0625rem` (15px – 17px), `line-height: 1.5 - 1.6`, regular weight (`400`).
- **Overline / Badges / Meta**: `0.6875rem` to `0.75rem` (11px – 12px), uppercase, tracking `0.06em`, font-mono or medium (`500`).

### 3.3 Color Systems & Dark Mode Elevation
- **Level 0 (Canvas Base)**: `#0b0e12` or `#090a0d` (Deep Dark, never pure `#000000` except for high-contrast OLED).
- **Level 1 (Surface / Panels)**: `#14171b` or `#181a1d` with `border: 1px solid #303235`.
- **Level 2 (Active / Raised Containers)**: `#1f2124` or `#25282c`.
- **Level 3 (Overlay / Modal / Flyout)**: `#2a2d32` with ambient backlight.
- **Accents**: Neon Emerald (`#00d892`), Cyan Glow (`#00e5ff`), Electric Violet (`#8a2be2`), or Signal Orange (`#ff6b4a`). Use accent color selectively (≤ 10% visual mass).

---

## 4. Component State Matrix (The 8 Mandatory States)
Every interactive element must define all 8 states:
1. **Default**: Calibrated resting visual appearance.
2. **Hover**: Visual affordance change (e.g. border illumination, subtle elevation `translateY(-2px)`, text color brightness boost).
3. **Active / Pressed**: Tactile feedback (e.g. `scale(0.98)` or inset shadow).
4. **Focus-Visible**: Accessible keyboard focus ring (`ring-2 ring-emerald-500 ring-offset-2 ring-offset-slate-950`).
5. **Disabled**: Reduced opacity (`0.4`), `cursor: not-allowed`, pointer events disabled.
6. **Loading / Pending**: Animated skeleton pulse or custom micro-spinner inside button without layout shift.
7. **Empty State**: Purpose-built placeholder illustration, descriptive prompt, and clear action button.
8. **Error State**: Non-destructive error message with inline validation icon and guidance for recovery.

---

## 5. Micro-Interactions & Motion Physics
- **Easting Curves**:
  - Snappy Spring / Natural: `cubic-bezier(0.16, 1, 0.3, 1)` (Out Quint).
  - Smooth Deceleration: `cubic-bezier(0.25, 1, 0.5, 1)`.
- **Durations**:
  - Micro-toggles (buttons, checkboxes, chips): `150ms – 200ms`.
  - Panel reveals, drawers, dialogs: `250ms – 350ms`.
  - Page transitions & staggered reveals: `400ms – 600ms`.
- **Hardware Acceleration**: Always animate `transform` (`translate3d`, `scale`) and `opacity`. Never animate `width`, `height`, `top`, or `margin`.

---

## 6. Layout Archetypes & Bento Grids
- **Asymmetric Bento Matrix**: Variable column spans (`col-span-12 lg:col-span-8` paired with `col-span-12 lg:col-span-4`).
- **Interactive Metric Cards**: Large numerals with live comparison deltas (`+12.4%`), micro-sparklines, and contextual status dots.
- **Terminal & Spec Panels**: Dark utilitarian console frames with simulated syntax highlighting, monospace readout, and copy-to-clipboard micro-action.

---

## 7. Accessibility (a11y) & Heuristic Audit Checklist
- [x] **Color Contrast**: 4.5:1 for standard text, 3:1 for large text and UI components.
- [x] **Keyboard Navigability**: Full tab order traversal, focus traps in modals, `Esc` key dismissal.
- [x] **Screen Reader Semantics**: Proper `<main>`, `<header>`, `<nav>`, `<section>`, `<article>`, and `aria-label` attributes.
- [x] **Touch Targets**: Minimum `44x44px` clickable area for all mobile interactive elements.
- [x] **Reduced Motion**: Wrap motion queries in `@media (prefers-reduced-motion: reduce)`.

---

## 8. Execution Strategy for Claude Code
When applying `ui-ux-pro-max` to any user interface task:
1. **Audit First**: Evaluate existing contrast, spacing, typography, and hierarchy flaws.
2. **Standardize Design Tokens**: Unify colors, border radii, font variables, and transition curves.
3. **Refine Components**: Upgrade components into clean, tactile, accessible elements with all 8 states covered.
4. **Implement Polished Details**: Add subtle micro-motion, responsive layouts, and zero-layout-shift skeletons.
5. **Verify**: Test on mobile (375px), tablet (768px), and wide screens (1440px+).
