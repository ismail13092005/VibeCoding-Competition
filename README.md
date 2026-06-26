<div align="center">

# FlowAI — FrontEnd Battle 3.0

### 🏆 Submission for FrontEnd Battle 3.0 · IIT Bhubaneswar · 26 June 2026

[![Live Demo](https://img.shields.io/badge/Live%20Demo-vibe--coding--competition--two.vercel.app-FFC801?style=for-the-badge&logo=vercel&logoColor=black)](https://vibe-coding-competition-two.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-16.2.9-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

</div>

---

## 🔗 Links

| | |
|---|---|
| 🌐 **Live Deployment** | https://vibe-coding-competition-two.vercel.app/ |
| 📦 **Repository** | https://github.com/ismail13092005/VibeCoding-Competition |

---

## 📋 Problem Statement

> **Phase 1 — Next-Gen AI Platform Speed Run**
>
> Build a premium, high-converting, responsive landing page for an advanced AI-driven data automation platform. A direct test of architectural integrity, engineering speed, motion choreography, and SEO hygiene under a strict countdown.

---

## ✅ Core Feature Requirements

### Feature 1 — Matrix-Driven Pricing & Performance-Isolated Currency Switcher

| Requirement | Status |
|---|---|
| Monthly / Annual billing toggle | ✅ |
| INR / USD / EUR currency switcher | ✅ |
| Multi-dimensional config matrix (no hardcoded values) | ✅ |
| 20% annual discount computed dynamically | ✅ |
| **Zero parent re-renders** on toggle (Chrome DevTools verified) | ✅ |
| DOM text-node only updates via `useImperativeHandle` | ✅ |

**Architecture:** `Pricing` shell renders once. State held in plain `useRef`. Button active states updated via direct DOM `classList` mutation. Price text nodes updated imperatively through `forwardRef` + `useImperativeHandle` — React reconciliation never fires on billing/currency change.

---

### Feature 2 — Bento-to-Accordion Wrapper with State Persistence

| Requirement | Status |
|---|---|
| Bento Grid layout on desktop (≥768px) | ✅ |
| Accordion layout on mobile (<768px) | ✅ |
| Context Lock Constraint — hover state transfers on resize | ✅ |
| Zero external UI/animation libraries | ✅ |
| Pure CSS transitions (300–400ms ease-in-out) | ✅ |
| `useReducer` for accordion state | ✅ |

**Architecture:** `hoverRef` tracks the currently hovered bento node in real time via `onMouseEnter/Leave`. On `window.matchMedia` breakpoint crossing (desktop→mobile), `hoverRef.current` is dispatched as `SYNC_TO_MOBILE` action, opening the corresponding accordion panel with a smooth 350ms ease-in-out transition.

---

## 🏗️ Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16.2 App Router |
| Language | TypeScript 5 (strict mode) |
| Styling | Tailwind CSS v4 (`@theme` blocks) |
| Fonts | JetBrains Mono · Inter (via `next/font`) |
| Animation | CSS Keyframes + CSS Transitions + WAAPI |
| Canvas | Native Canvas 2D API (Hero particle field) |
| State | `useReducer` · `useRef` · `useImperativeHandle` |
| SEO | Next.js Metadata API · JSON-LD · OG · Twitter Cards |

---

## 🎨 Design System

### Color Palette

| Name | Hex | Usage |
|---|---|---|
| **Arctic Powder** | `#F1F6F4` | Text, light backgrounds |
| **Mystic Mint** | `#D9E8E2` | Muted sections, cards |
| **Forsythia** | `#FFC801` | Primary CTA, accents, highlights |
| **Deep Saffron** | `#FF9932` | Secondary accent, gradients |
| **Nocturnal Expedition** | `#114C5A` | Dark backgrounds, card fills |
| **Oceanic Noir** | `#172B36` | Page background, footer |

### Typography
- **JetBrains Mono** — Headers, code blocks, countdown timers, price displays
- **Inter** — Body text, UI elements, forms

---

## 📐 Architecture

```
frontend-battle/
├── app/
│   ├── globals.css          # Design tokens, all keyframes, utility classes
│   ├── layout.tsx           # Metadata, fonts, JSON-LD, OG/Twitter tags
│   └── page.tsx             # Section composition + global providers
├── components/
│   ├── Navigation.tsx       # Fixed blur nav, sliding active indicator
│   ├── Hero.tsx             # Typewriter, counters, cursor halo
│   ├── HeroBackground.tsx   # Canvas particle field + 3D CSS rings
│   ├── TrustedCompanies.tsx # CSS-only infinite marquee
│   ├── Features.tsx         # 3D tilt cards, cursor-follow glow
│   ├── BentoGrid.tsx        # ⭐ Feature 2 — Bento↔Accordion + context lock
│   ├── HowItWorks.tsx       # Animated data stream background
│   ├── Pricing.tsx          # ⭐ Feature 1 — DOM-isolated price updates
│   ├── Testimonials.tsx     # Bioluminescent bg, 3D tilt cards
│   ├── FAQ.tsx              # Hex grid bg, keyboard-navigable accordion
│   ├── CTA.tsx              # 3D perspective ring system, orbiting dot
│   ├── Footer.tsx           # Constellation background
│   ├── PageLoader.tsx       # Sub-500ms elegant intro loader
│   ├── ScrollProgress.tsx   # Gold progress bar + back-to-top
│   ├── RevealProvider.tsx   # Global IntersectionObserver + ripple + magnetic
│   └── SectionBackground.tsx # Reusable animated section backgrounds
└── lib/
    ├── pricing.ts           # PRICING_CONFIG matrix + computePrice()
    └── hooks.ts             # useScrolled, useMediaQuery, usePricingState
```

---

## ✨ Sections

| Section | Highlights |
|---|---|
| **Navigation** | Transparent → blur on scroll, sliding gold active indicator, height reduction, animated hamburger |
| **Hero** | Canvas neural-net particles, 3D rotating rings, aurora beams, typewriter headline, animated counters, cursor spotlight |
| **Trusted Companies** | Deep-space starfield bg, CSS-only hover-pause marquee, individual hover glow |
| **Features** | 3D perspective tilt, cursor-follow glow, staggered scroll reveal |
| **Bento Grid** | Circuit-board bg, desktop grid with hover transitions, mobile accordion |
| **How It Works** | Flowing data-stream lines, horizontal scan effect, step reveal animations |
| **Pricing** | Grid scan-line bg, DOM-isolated price updates, billing + currency toggles |
| **Testimonials** | Bioluminescent ocean bg, 3D tilt cards, animated metric badges |
| **FAQ** | Hexagonal grid bg, keyboard navigation (↑↓ Home End), smooth accordion |
| **CTA** | 3D perspective rings + orbiting gold dot, gradient headline, trust badges |
| **Footer** | Constellation SVG bg, animated bottom border |

---

## 🚀 Performance

| Metric | Target |
|---|---|
| Lighthouse Performance | ≥ 95 |
| Lighthouse Accessibility | 100 |
| Lighthouse SEO | 100 |
| Lighthouse Best Practices | 100 |
| Initial loader | < 500ms |
| Animation FPS | 60fps (GPU-accelerated only) |

**Techniques used:**
- Only `transform`, `opacity`, `filter` animated — zero layout thrashing
- `will-change: transform` on animated elements
- `passive: true` on all scroll listeners
- Canvas particle field with `requestAnimationFrame`
- `IntersectionObserver` for scroll reveals (disconnect after trigger)
- `memo` + `forwardRef` to prevent unnecessary re-renders

---

## 🔒 Compliance

| Rule | Status |
|---|---|
| No Framer Motion / GSAP / runtime animation libraries | ✅ |
| No Shadcn / Radix / HeadlessUI | ✅ |
| No hardcoded pricing values | ✅ |
| Billing/currency toggle — no parent re-render | ✅ |
| All animations via CSS / WAAPI only | ✅ |
| `prefers-reduced-motion` respected | ✅ |
| WCAG AA color contrast | ✅ |
| Semantic HTML (`main`, `header`, `section`, `article`, `nav`) | ✅ |

---

## ♿ Accessibility

- Full keyboard navigation on all interactive elements
- `aria-expanded`, `aria-controls`, `aria-labelledby` on accordions
- `aria-live` on price update nodes
- Skip-to-main-content link
- Focus-visible ring on all interactive elements
- All decorative elements marked `aria-hidden="true"`
- Heading hierarchy: `h1` → `h2` → `h3`

---

## 🔍 SEO

- Semantic HTML structure
- Open Graph tags (title, description, image, type)
- Twitter Card (`summary_large_image`)
- JSON-LD `SoftwareApplication` structured data
- Canonical URL
- `robots.txt` + `sitemap.xml`
- `<title>` and `<meta name="description">`

---

## 🛠️ Local Development

```bash
# Clone
git clone https://github.com/ismail13092005/VibeCoding-Competition.git
cd VibeCoding-Competition

# Install
npm install

# Dev server
npm run dev
# → http://localhost:3000

# Production build
npm run build
npm run start
```

**Requirements:** Node.js 18+

---

## 👤 Author

**Ismail Khan**
FrontEnd Battle 3.0 · IIT Bhubaneswar · June 26, 2026

---

<div align="center">
  <sub>Built with precision for FrontEnd Battle 3.0 · No runtime animation libraries · No hardcoded values · Competition-compliant</sub>
</div>
