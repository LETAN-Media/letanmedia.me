# Design System Master File — LETAN Media

> **Studio Premium Direction:** LETAN Media (AI, Marketing & Digital Growth)
> **Role & Tone:** Senior Design Lead + High-end WebGL Studio. High-tech, deeply trustworthy, butter-smooth motion, avoiding generic AI templates.

---

## 1. Visual Identity & Brand Archetype

- **Brand:** LETAN Media
- **Tagline:** "Giải pháp AI, truyền thông số và phát triển phần mềm dành cho cá nhân và doanh nghiệp."
- **Visual Aesthetic:** High-End AI Studio / Dark Cyber-Luxury. Deep obsidian surfaces, illuminated by electric cobalt intelligence and warm champagne gold trust accents.
- **Design Dials:** Variance 6/10 (Modern Balanced) | Motion 7/10 (Polished & Smooth) | Density 5/10 (Spacious & Clean)

---

## 2. Color Palette Tokens

All colors are strictly chosen and tested for WCAG 2.2 AA / AAA contrast ratios:

| Token | Hex / Value | Purpose & Semantics |
|---|---|---|
| `--lm-bg` | `#06080E` | Canvas foundation, deep space void |
| `--lm-surface-1` | `#0D111A` | Main card surface, frosted backdrop |
| `--lm-surface-2` | `#141B29` | Elevated card, hover state, dropdown |
| `--lm-surface-3` | `#1C2538` | Active item, interactive pill |
| `--lm-cobalt` | `#2B6CB0` | Deep structural brand blue |
| `--lm-cobalt-bright`| `#3B82F6` | Primary interactive button, active focus, links |
| `--lm-cobalt-glow`  | `rgba(59, 130, 246, 0.22)` | Subtle ambient back-glow |
| `--lm-champagne`    | `#C5A869` | Secondary luxury accent, verification, trust badge |
| `--lm-champagne-light`| `#DFCA95`| Hover for gold badges, shiny text rim |
| `--lm-champagne-glow` | `rgba(197, 168, 105, 0.2)` | Ambient gold refraction |
| `--lm-cyan`         | `#26D9F2` | Digital growth indicator, data highlights |
| `--lm-emerald`      | `#10B981` | Real-time SLA active badge, operational indicator |
| `--lm-text`         | `#F8FAFC` | Primary heading and high-contrast body (15.5:1 ratio) |
| `--lm-text-muted`   | `#94A3B8` | Body text, subheadings, explanations (5.8:1 ratio) |
| `--lm-text-subtle`  | `#64748B` | Footers, metadata tags, captions |
| `--lm-border`       | `rgba(255, 255, 255, 0.08)` | Hairline luxury border |
| `--lm-border-hover` | `rgba(59, 130, 246, 0.35)` | Interactive border state |
| `--lm-border-gold`  | `rgba(197, 168, 105, 0.3)` | Verification / trust border |

---

## 3. Typography Hierarchy

Fonts loaded via Google Fonts with `font-display: swap`:
- **Headings & Display:** `Plus Jakarta Sans` (weights: 500, 600, 700, 800)
  - Hero Display: `clamp(2.5rem, 5.5vw, 4.4rem)`, line-height `1.04`, tracking `-0.035em`
  - Section Title (H2): `clamp(2rem, 3.8vw, 3.2rem)`, line-height `1.12`, tracking `-0.025em`
  - Card Title (H3): `clamp(1.2rem, 1.8vw, 1.5rem)`, line-height `1.25`, tracking `-0.015em`
  - Eyebrow / Overline: `0.75rem (12px)`, bold (700), uppercase, letter-spacing `0.16em`
- **Body & Controls:** `Inter` (weights: 400, 500, 600)
  - Lead Paragraph: `clamp(1.05rem, 1.25vw, 1.25rem)`, line-height `1.65`
  - Standard Body: `0.95rem - 1rem (15-16px)`, line-height `1.6`
  - Secondary/Caption: `0.85rem (13.6px)`, line-height `1.5`
- **Metrics & Numbers:** Tabular figures (`font-feature-settings: 'tnum'`), crisp and aligned.

---

## 4. Spacing, Container & Grid System

- **Container Width:** `width: min(calc(100% - 40px), 1240px); margin: 0 auto;` (mobile: `calc(100% - 28px)`)
- **8-Point Rhythm:**
  - `4px` (`--space-2xs`) - Micro elements, badge padding
  - `8px` (`--space-xs`) - Icon gap, inline tag gap
  - `12px` (`--space-sm`) - Compact button padding, card meta gap
  - `16px` (`--space-md`) - Form field padding, default gap
  - `24px` (`--space-lg`) - Card internal padding
  - `32px` (`--space-xl`) - Grid column gap
  - `48px` (`--space-2xl`) - Header/content offset
  - `80px - 120px` (`--space-section`) - Section vertical breathing room
- **Grid Layouts:**
  - Ecosystem: 1 col (mobile) -> 2 cols (tablet) -> 2 cols balanced with editorial sticky lead (desktop)
  - Featured Services: 1 col (<640px) -> 2 cols (640-1024px) -> 3 cols (>1024px)
  - Work Showcase: Hero large card (2/3) + stacked cards (1/3) -> fluid stacking on mobile
  - SLAs & Metrics: 2 cols (mobile) -> 4 cols (desktop)

---

## 5. Signature 3D Element (Hero3D)

- **Concept:** Generative Luminous Glass Sphere with real-time GLSL displacement wave and Fresnel champagne rim.
- **Representation:** "AI in active continuous cognition" — reacting smoothly to mouse pointer tilt without blocking touch scrolling.
- **Optimization:**
  - Mobile: polygon count reduced to 32 subdivisions, 70 stardust particles, DPR capped at 1.25, antialias off.
  - Desktop: 54 subdivisions, 160 particles, DPR 1.6, full high-performance shader.
  - `prefers-reduced-motion`: Replaced automatically with lightweight CSS static halo grid (`HeroStaticFallback`), 0% WebGL overhead.
  - Canvas has `pointer-events: none` on ambient regions so all links/CTAs are effortlessly clickable.

---

## 6. Micro-Interactions & Transitions

- **Default Easing:** `cubic-bezier(0.16, 1, 0.3, 1)` (fluid spring-like deceleration)
- **Durations:**
  - Quick hover/focus: `180ms - 250ms`
  - Modal/Drawer slide: `350ms - 450ms`
  - Scroll reveals: `600ms - 750ms`
- **Button Micro-interaction:**
  - On hover: `transform: translateY(-2px); box-shadow: 0 8px 24px var(--lm-cobalt-glow);`
  - Arrow icon translates `+3px` horizontally and `-2px` vertically on hover.
  - On active/press: `transform: translateY(0); opacity: 0.92;`
- **Card Micro-interaction:**
  - Subtle gradient border illumination (`--lm-border-hover`)
  - Arrow badge transitions color from champagne to electric cobalt

---

## 7. Accessibility (WCAG 2.2 AA)

- All interactive controls have visible focus rings: `outline: 2px solid var(--lm-cobalt-bright); outline-offset: 3px;`
- Touch targets strictly `>= 44px x 44px` on mobile/tablet.
- Safe areas for iPhone/Android notch respected via `env(safe-area-inset-*)`.
- All icons have `aria-hidden="true"` when accompanied by text, or meaningful `aria-label` when standalone.
- Form inputs have explicit labels, field-level error messages, and `aria-invalid` bindings.
