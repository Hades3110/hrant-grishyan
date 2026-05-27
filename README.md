# Hrant Grishyan — Portfolio Site

A personal portfolio site built as a **code sample** — the site itself demonstrates senior-level engineering across performance, accessibility, testing, and architecture. It exists because production code can't be shared due to NDA.

**Live site:** https://hrant-grishyan.vercel.app  
**Source:** https://github.com/USERNAME/REPO _(placeholder — to be updated before launch)_

---

## Tech Stack

| Layer     | Choice                                   | Rationale                                                                           |
| --------- | ---------------------------------------- | ----------------------------------------------------------------------------------- |
| Framework | **Next.js 16** (App Router)              | RSC, streaming, Turbopack, native perf primitives                                   |
| Language  | **TypeScript** (strict + extra flags)    | Non-negotiable senior signal; `exactOptionalPropertyTypes` catches subtle prop bugs |
| Styling   | **CSS Modules** + CSS custom properties  | Demonstrates real CSS skill without framework dependency; zero runtime cost         |
| Theme     | **`prefers-color-scheme`** media query   | Pure CSS approach — no JS theme switcher, no FOUC, a11y best practice               |
| Testing   | **Vitest** + **RTL** + **Playwright**    | Fast unit/component tests + smoke E2E; Lighthouse CI as quality gate                |
| Fonts     | **`next/font`** (JetBrains Mono + Inter) | Self-hosted, zero CLS, fonts-as-code                                                |
| Analytics | **Vercel Analytics**                     | Real-user performance data with zero cookie consent requirements                    |

---

## Architecture Decisions

### Server Components by default

Every component is a React Server Component unless it needs interactivity, browser APIs, or hooks. This keeps the JS bundle small and pushes data fetching to the server where it belongs. Client Components are explicitly opted into with `'use client'`.

### No state management library

This is a static site. There is no shared mutable state. Adding Redux/Zustand/Jotai would be a red flag to any reviewer — it would signal that the author reaches for abstractions before checking if they're needed.

### CSS Modules over Tailwind

Tailwind is a productivity tool. CSS Modules with custom properties demonstrates that the author actually knows CSS — specificity, cascade, custom properties, `clamp()` for fluid type, container queries. A Tailwind site tells reviewers nothing about CSS ability.

### Theming via `prefers-color-scheme`

All color tokens are defined as CSS custom properties in `styles/tokens.css` and overridden in a `@media (prefers-color-scheme: dark)` block. No JavaScript, no flash, no hydration mismatch. The `viewport` meta exports `colorScheme: 'light dark'` so browsers can style native UI elements correctly before first paint.

### Accessibility approach

- Semantic HTML first; ARIA only where HTML semantics are insufficient
- Custom focus ring via `:focus-visible` (not `:focus`) to avoid rings on mouse clicks
- `prefers-reduced-motion` handled globally in `styles/globals.css` — one place, catches everything including third-party animation
- WCAG 2.2 AA minimum; accent color (#3B82F6 light / #60A5FA dark) verified for contrast on both themes
- _Screen reader testing note: to be added after first deploy — VoiceOver on macOS Safari_

### Bundle size discipline

- Server Components produce zero client JS by default
- `next/font` self-hosts and tree-shakes unused font weights
- No animation library (CSS animations only)
- No UI library (components written from scratch)
- No client-side state library
- Target: initial route JS bundle < 80KB gzipped

---

## Performance

| Metric                | Target      | How enforced                                                      |
| --------------------- | ----------- | ----------------------------------------------------------------- |
| Lighthouse (all four) | **100/100** | `@lhci/cli` in CI — fails build on regression                     |
| LCP                   | < 1.5s      | SSR + optimised fonts + no render-blocking resources              |
| INP                   | < 100ms     | Minimal client JS; no heavy event handlers on first load          |
| CLS                   | < 0.05      | `next/font` eliminates font CLS; explicit dimensions on all media |
| JS bundle (initial)   | < 80KB gzip | Server Components default; no heavy dependencies                  |

_Lighthouse badge and live `/performance` page coming in Phase 6._

---

## Local Development

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Other scripts
pnpm typecheck      # tsc --noEmit
pnpm lint           # ESLint (zero warnings)
pnpm format:check   # Prettier check
pnpm format         # Prettier fix
pnpm test           # Vitest (watch mode)
pnpm test:run       # Vitest (single run)
pnpm test:coverage  # Vitest with coverage report
pnpm e2e            # Playwright E2E
pnpm build          # Production build
pnpm lhci           # Lighthouse CI (requires production build)
```

**Requirements:** Node ≥ 20.11, pnpm ≥ 11

---

## Project Structure

```
app/
  layout.tsx          Root layout — fonts, metadata, Vercel Analytics
  page.tsx            Home page (Server Component)
  fonts.ts            next/font exports (Inter + JetBrains Mono)
  robots.ts           robots.txt via Next.js Metadata Route
  sitemap.ts          sitemap.xml via Next.js Metadata Route
  icon.svg            HG monogram favicon
  sections/           Feature-based section components (Phase 2+)
    hero/
    experience/
    expertise/
    contact/
components/           Shared UI primitives only (Phase 2+)
lib/                  Pure utility functions and helpers
styles/
  tokens.css          All design tokens as CSS custom properties (light + dark)
  globals.css         CSS reset, base styles, prefers-reduced-motion
e2e/                  Playwright smoke tests
.github/
  workflows/
    ci.yml            CI pipeline: typecheck, lint, test, e2e, Lighthouse CI
```

---

## Testing

```bash
pnpm test:run       # Unit tests (Vitest + React Testing Library)
pnpm test:coverage  # With coverage — threshold: 80% lines/functions/branches
pnpm e2e            # Playwright smoke tests against production build
```

- Coverage threshold: **80%** on lines, functions, branches, statements (enforced in CI)
- UI scaffolding (layout, page shells) excluded from coverage — logic and utilities are measured
- Playwright runs against a real production build, not a dev server

---

## Deployment

Deployed on **Vercel** (connected to the `main` branch).

- Every PR gets a preview deployment automatically
- Lighthouse CI runs on every push — score regression fails the build
- Production deploys only after all CI checks pass

_Custom domain to be configured before public launch — update `SITE_URL` in `app/layout.tsx` and `app/robots.ts` / `app/sitemap.ts`._
