# LETAN Media — Premium Editorial Design System (v2)

> **Scope:** Complete website redesign — homepage, all feature pages, internal pages.
> **Direction:** Premium editorial + experimental digital studio.
> **Tone:** Cinematic, confident, technically sophisticated, minimal but visually striking.
> **Avoid:** Generic SaaS layouts, repeated 3-column cards, excessive rounded containers, generic gradients, glassmorphism, AI-landing-page patterns, unnecessary badges/icon grids.

---

## Design Dials

| Dial | Value | Intent |
|------|-------|--------|
| **Variance** | 8/10 | Bold, asymmetric, editorial compositions |
| **Motion** | 7/10 | Sophisticated scroll-driven animations, immersive transitions |
| **Density** | 4/10 | Spacious, cinematic breathing room |

---

## Brand Palette (Refined)

**Base:** True black / off-white only. No dark navy, no dark gray surfaces.

| Token | Hex | Use |
|-------|-----|-----|
| `--color-bg` | `#000000` | Primary canvas — true black |
| `--color-surface` | `#0A0A0A` | Elevated surfaces (cards, panels) — barely off-black |
| `--color-surface-raised` | `#121212` | Interactive raised states |
| `--color-text` | `#FAFAFA` | Primary copy — near white |
| `--color-text-secondary` | `#A3A3A3` | Supporting copy |
| `--color-text-muted` | `#6B6B6B` | Muted labels, placeholders |
| `--color-electric` | `#00D4FF` | **Primary accent — electric cyan/blue** |
| `--color-electric-dim` | `#00A8CC` | Hover/active electric |
| `--color-electric-glow` | `rgba(0, 212, 255, 0.15)` | Glow/shadow for electric |
| `--color-champagne` | `#C7AA6B` | **Secondary accent — brand heritage** (wordmark, select CTAs) |
| `--color-champagne-dim` | `#A89258` | Hover champagne |
| `--color-champagne-glow` | `rgba(199, 170, 107, 0.15)` | Glow for champagne |
| `--color-border` | `rgba(255, 255, 255, 0.06)` | Hairline borders |
| `--color-border-strong` | `rgba(255, 255, 255, 0.12)` | Stronger borders (focus, hover) |
| `--color-border-electric` | `rgba(0, 212, 255, 0.3)` | Electric accent borders |

**Semantic colors (interface feedback only, not decorative):**
- `--color-success`: `#10B981`
- `--color-warning`: `#F59E0B`
- `--color-error`: `#EF4444`

---

## Typography

**Display/Headlines:** **Space Grotesk** — variable weight (500–700), wide, technical, editorial
**Body/UI:** **Inter** — variable (400–600), clean, highly legible

```css
/* Font loading via <link rel="preload"> in index.html */
@font-face { font-family: 'Space Grotesk'; src: url('/fonts/SpaceGrotesk-Variable.woff2') format('woff2-variations'); font-weight: 300 700; font-display: swap; }
@font-face { font-family: 'Inter'; src: url('/fonts/Inter-Variable.woff2') format('woff2-variations'); font-weight: 100 900; font-display: swap; }
```

### Type Scale (Clamp-based, Fluid)

| Role | Size | Line Height | Tracking | Weight |
|------|------|-------------|----------|--------|
| **Display XL** | `clamp(4rem, 8vw, 8rem)` | 0.95 | -0.05em | 700 |
| **Display L** | `clamp(3rem, 6vw, 5.5rem)` | 0.98 | -0.04em | 700 |
| **Display M** | `clamp(2.25rem, 4.5vw, 3.5rem)` | 1.02 | -0.035em | 600 |
| **H1** | `clamp(2rem, 3.5vw, 3rem)` | 1.05 | -0.03em | 600 |
| **H2** | `clamp(1.75rem, 3vw, 2.5rem)` | 1.1 | -0.025em | 600 |
| **H3** | `clamp(1.375rem, 2.2vw, 1.75rem)` | 1.2 | -0.02em | 500 |
| **Body XL** | `clamp(1.125rem, 1.8vw, 1.25rem)` | 1.7 | 0 | 400 |
| **Body** | `1rem` | 1.65 | 0 | 400 |
| **Body SM** | `0.875rem` | 1.6 | 0 | 400 |
| **Label** | `0.75rem` | 1.4 | 0.08em | 600 |
| **Micro** | `0.6875rem` | 1.35 | 0.1em | 600 |

**Text wrapping:** Headlines use `text-wrap: balance`; body uses `text-wrap: pretty`.

**Editorial measure:** Max 720px (45–72 chars) for long-form reading.

---

## Spacing & Layout

| Token | Value | Use |
|-------|-------|-----|
| `--space-xs` | `4px` | Micro gaps |
| `--space-sm` | `8px` | Tight gaps |
| `--space-md` | `16px` | Standard gaps |
| `--space-lg` | `24px` | Component padding |
| `--space-xl` | `32px` | Section inner padding |
| `--space-2xl` | `48px` | Component separation |
| `--space-3xl` | `64px` | Section separation (mobile) |
| `--space-4xl` | `96px` | Section separation (desktop) |
| `--space-5xl` | `128px` | Major section separation |

**Containers:**
- `--container-narrow`: `720px` (editorial measure)
- `--container-standard`: `1080px` (standard content)
- `--container-wide`: `1240px` (full-width compositions)
- `--container-full`: `100vw` (edge-to-edge sections)

**Grid:** CSS Grid for all homepage compositions. Flexbox only for linear alignment.

**Radius:**
- `--radius-sm`: `4px` (buttons, inputs)
- `--radius-md`: `8px` (cards, panels)
- `--radius-lg`: `16px` (major panels, modals)
- `--radius-none`: `0` (editorial images, full-bleed)

---

## Signature Element: Signal Field

A single, distinctive 3D/WebGL element representing "AI processing signals."

- **Implementation:** Three.js + GLSL shader (custom, not off-the-shelf)
- **Visual:** Dark geometric core (icosahedron) with subtle electric/champagne signal bands, responsive to pointer position
- **Performance:** Lazy-loaded, capped DPR (max 1.35), reduced particle count on mobile/low-power, pauses offscreen
- **Fallback:** Static poster image (`hero-poster.webp`) for reduced-motion, no-WebGL, loading states
- **Accessibility:** `aria-hidden="true"`, `pointer-events: none` on canvas, never blocks scroll/click
- **Uniqueness:** No other section has continuous decorative animation

---

## Motion & Animation

**Easing:**
- `--ease-standard`: `cubic-bezier(0.16, 1, 0.3, 1)` (brand easing — gentle exit, confident entry)
- `--ease-spring`: `cubic-bezier(0.34, 1.56, 0.64, 1)` (subtle spring for micro-interactions)
- `--ease-expo`: `cubic-bezier(0.87, 0, 0.13, 1)` (cinematic reveals)

**Durations:**
- Micro (hover, focus): `160–220ms`
- Component reveal: `400–600ms`
- Section transition: `600–900ms`
- Page transition: `800–1200ms`

**Principles:**
- Animate `opacity` + `transform` only for reveals (no layout thrashing)
- Stagger children with `0.05–0.08s` delay, grid-aware
- **Respect `prefers-reduced-motion`**: Instant final state, disable parallax/scroll-scrub, pause continuous animations
- Scroll-driven animations via GSAP ScrollTrigger (not Framer Motion) for precision
- Canvas 3D runs on separate render loop; pauses when `document.hidden` or offscreen

---

## Components

### Header
- Fixed, compact (72px → 64px scrolled)
- Wordmark: "LETAN Media" (Space Grotesk, champagne "Media")
- 5 nav links with numbered indices (01–05)
- Single CTA: "Tư vấn ngay" (champagne fill)
- Mobile: Full-screen drawer, focus trap, ESC to close

### Hero (Homepage)
- Full-screen (100svh), cinematic
- Left: Editorial content (eyebrow, massive headline, description, dual CTAs)
- Right: Signal Field (3D canvas, lazy-loaded)
- Trust bar below fold: "Một hệ năng lực kết nối" + 4 capability pills
- Scroll indicator: Subtle animated arrow

### Service Ecosystem
- Asymmetric split: Left = editorial lead (sticky), Right = capability cards
- Cards: Horizontal, numbered, hover = translateX + border glow
- No 3-column grid

### Featured Services
- Asymmetric grid: 2 columns, varied heights
- Lead service spans full width; others compact
- Hover: subtle lift + electric border glow
- Bottom: Contextual CTA bar

### Project Showcase
- Hero project: Large, cinematic (1.3fr), image + full metadata
- Secondary projects: Stacked (1fr), smaller
- Hover: Image scale(1.04) + border glow
- Category badge + tech tags

### Why LETAN (Principles)
- 4 principles in 2×2 grid (desktop), stacked (mobile)
- Numbered, icon + title + description
- Below: Delivery standards as metrics (01–04) — qualitative, not fake numbers

### LETAN AI
- Split: Left = narrative, Right = interactive console demo
- Console: Real chat UI with suggestion chips, working input
- Connects to existing HomeChatWidget

### Final CTA
- Monolithic panel, subtle ambient glow
- Large headline with champagne accent word
- Dual CTA: Primary (champagne) + Secondary (outline)

### Footer
- 4-column grid: Brand + socials, Services, Company, Contact
- Divider + copyright/legal/back-to-top

---

## Page-Specific Patterns

### Work Page (/work)
- Hero: Editorial headline + filter tabs (All, AI, Digital, Web, Protection)
- Featured projects: Wide cards with category gradient accents
- All projects: Filterable grid
- Capabilities strip
- Final CTA

### Case Study (/work/:slug)
- Editorial article layout: Hero image, meta tags, Challenge/Solution/Gallery/Results sections
- Numbered section markers (01, 02, 03, 04)
- Next project navigation
- Climax CTA

### About Page (/about)
- Manifesto hero: Bold headline, lead paragraph
- Philosophy: Split layout + quote card
- 4 Pillars: Asymmetric cards with large numbers
- 4-Step Methodology: Horizontal cards
- SLAs: Metric cards (qualitative)
- Climax CTA

### Contact Page (/contact)
- Split: Form (left) + Direct channels (right)
- Form: Inline validation, honeypot, timing check, UTM capture
- Success state: Elegant confirmation
- Process steps + FAQ accordion

### TikTok Report / YouTube Report
- Hero: 3D canvas (brand-specific) + bold headline + urgent CTA
- Services: Accordion cards (not repeated small cards)
- Workflow: Numbered steps with hover glow
- Commitment card
- Feedback carousel
- AI Chat widget

---

## Accessibility & Performance Gates

- [ ] Visible focus on every operable element (`outline: 2px solid var(--color-electric)`)
- [ ] No global outline removal
- [ ] Mobile menu: focus trap, ESC close, focus return
- [ ] Minimum touch target: `44×44px`
- [ ] No horizontal overflow at 375px
- [ ] Canvas: `aria-hidden`, `pointer-events: never`, never blocks navigation
- [ ] Above-fold text renders before Three.js chunk
- [ ] Images: lazy-load with `width`/`height`, `decoding="async"`
- [ ] Validate at: 375, 390, 430, 768, 1024, 1280, 1440, 1920px + reduced motion
- [ ] LCP < 2.5s, INP < 200ms, CLS < 0.1

---

## Content Integrity

- Use only real content from repository (services.js, caseStudies.js, insights.js)
- No fake metrics, percentages, client counts, testimonials
- Copy may be tightened for clarity; business claims unchanged
- All routes, APIs, SEO metadata preserved

---

## Implementation Stack

- **Framework:** React 19 + Vite + React Router v7
- **Styling:** CSS Custom Properties + Tailwind v4 (via `@theme` for utilities)
- **Animation:** GSAP (ScrollTrigger) for scroll-driven; Framer Motion for component transitions
- **3D:** Three.js + @react-three/fiber + @react-three/drei + @react-three/postprocessing
- **Icons:** Lucide React (consistent stroke width 1.5–1.8)
- **Fonts:** Self-hosted variable WOFF2 (Space Grotesk, Inter)
- **Deploy:** Cloudflare Pages