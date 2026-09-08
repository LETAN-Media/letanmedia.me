# LETAN Media — Homepage Design System

> Scope: homepage first. Internal product and service pages retain their current page-specific systems until a later approved phase.

## Direction

- **Positioning:** AI-first digital studio for technology, media, software, automation, and brand protection.
- **Tone:** premium, technical, editorial, minimal, confident.
- **Composition:** hero-centric opening, editorial capability ledger, asymmetric service and work grids, focused closing CTA.
- **Avoid:** generic neon SaaS visuals, liquid-glass everywhere, decorative dashboard charts, unverified metrics, repeated three-card rows, and gradient text as a default treatment.
- **Design dials:** variance 6/10, motion 5/10, density 5/10.

## Brand palette

The visible brand palette is intentionally limited. Alpha variants and borders are derived from these colors.

| Token | Hex | Use |
|---|---:|---|
| `--lm-bg` | `#07090F` | Primary ink canvas |
| `--lm-surface` | `#10141C` | Cards and navigation surfaces |
| `--lm-text` | `#F5F3EE` | Primary copy |
| `--lm-text-secondary` | `#A3AAB8` | Supporting copy |
| `--lm-champagne` | `#C7AA6B` | Brand wordmark, primary CTA, selected details |
| `--lm-cobalt` | `#6E8FFF` | Technical state and focus indication only |

Semantic error/success colors are reserved for real interface feedback and are not decorative brand accents.
Elevated surfaces and borders are derived with `color-mix()` and alpha variants rather than adding palette colors.

## Typography

- **Display, H1-H4:** Plus Jakarta Sans, weights 500-700.
- **Body and controls:** Inter, weights 400-600.
- **Display:** `clamp(2.75rem, 5.2vw, 4.75rem)`, line-height 1.02, tracking -0.04em.
- **H2:** `clamp(2rem, 3.6vw, 3.25rem)`, line-height 1.1, tracking -0.03em.
- **Body:** 1rem minimum, line-height 1.65; editorial measure 45-72 characters.
- **Labels:** 0.72-0.78rem, uppercase only for short taxonomy or status copy.
- Headings use balanced wrapping where supported; body copy uses pretty wrapping.

## Spacing and layout

- **Wide container:** 1240px maximum.
- **Standard container:** 1080px maximum.
- **Editorial measure:** 720px maximum.
- **Gutters:** 24px desktop, 20px tablet, 18px phone.
- **Section rhythm:** `clamp(72px, 8vw, 112px)`.
- **Radius:** 8px controls, 14px cards, 20px major panels. Pills are limited to compact status or taxonomy controls.
- Use CSS Grid for homepage compositions and Flexbox only for linear alignment.

## Signature element — Signal Orb

- One custom Three.js/GLSL orb represents an AI system processing signals.
- The core stays dark; champagne and cobalt appear as restrained edge/signal light, never as a blown-out white globe.
- The scene is lazy-loaded, capped at low DPR, simplified on low-power/mobile hardware, paused offscreen, and non-interactive for pointer/scroll hit-testing.
- A local `hero-poster.webp` provides the loading, reduced-motion, and WebGL-unavailable fallback.
- No other section introduces a competing continuous decorative animation.

## Components

- Header: compact wordmark, five links, one CTA, accessible mobile dialog.
- Hero: one value statement, concise support copy, primary and secondary actions, Signal Orb.
- Ecosystem: editorial lead plus capability ledger.
- Featured services: asymmetric hierarchy rather than six identical cards.
- Selected work: one lead project plus supporting work using real repository data only.
- Principles: qualitative operating standards; no unsupported percentages, uptime, or client counts.
- LETAN AI: interactive product demonstration connected to the existing chat widget.
- Footer: brand endpoint with verified contact and legal links only.

## Motion

- Default easing: `cubic-bezier(0.16, 1, 0.3, 1)`.
- Hover/focus: 160-220ms. Section reveals: 480-650ms.
- Animate opacity and transform only for reveals; no bounce, elastic overshoot, or layout-changing hover states.
- Respect `prefers-reduced-motion`; remove continuous pulse effects and render content in its final state.

## Accessibility and performance gates

- Visible focus on every operable element; no global outline removal.
- Mobile menu moves focus into the dialog, traps focus, closes on Escape, and returns focus to its trigger.
- Minimum touch target: 44px. No horizontal overflow at 375px.
- Canvas is `aria-hidden`, has `pointer-events: none`, and never blocks navigation.
- Above-the-fold text renders before the Three.js chunk; below-fold images lazy-load with dimensions.
- Validate at 375, 390, 430, 768, 1024, 1280, 1440, and 1920px, including reduced motion.

## Content integrity

- Use only content, projects, services, and contact channels present in the repository.
- Do not display unverified client counts, satisfaction percentages, response times, availability figures, awards, testimonials, or partnerships.
- Copy may be tightened for clarity, but business claims and URLs remain unchanged unless evidence supports a correction.
