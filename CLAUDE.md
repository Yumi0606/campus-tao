# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**校园淘 (campus-tao)** — a React campus marketplace for university students. Features: secondhand trading, group buying, campus forum, user profiles, and in-app chat. Entirely frontend with mock data; no backend.

## Commands

```bash
pnpm dev          # Start dev server (Vite)
pnpm build        # Type-check + production build (tsc -b && vite build)
pnpm lint         # ESLint check
pnpm preview      # Preview production build
```

No test framework is configured.

## Architecture

### Routing (`src/router/config.tsx`)

All routes defined as `RouteObject[]`. Key paths: `/` (home), `/secondhand`, `/secondhand/:id`, `/groupbuy`, `/groupbuy/:id`, `/forum`, `/forum/:id`, `/profile`, `/profile/edit`, `/chat`, `/chat/:contactId`. `src/router/index.tsx` exports `AppRoutes` and exposes `window.REACT_APP_NAVIGATE` for programmatic navigation.

### Auto-imports

`unplugin-auto-import` makes React hooks (`useState`, `useEffect`, `useRef`, etc.) and React Router exports (`Link`, `useNavigate`, `useParams`, `useLocation`) available globally — no explicit imports needed in components. The generated declarations are in `src/auto-imports.d.ts`.

### Styling — Tailwind CSS v4

Theme is configured entirely in `src/index.css` via `@theme` block (no separate tailwind.config file). Color palette uses `oklch()` values:

- **Background**: warm cream white (50–950)
- **Primary**: warm amber/honey gold (50–950)
- **Accent**: coral/warm rose (50–950)
- **Secondary**: warm sand/taupe (50–950)
- **Foreground**: warm dark brown (50–950)
- **Status**: `success`, `warning`, `error`

Global CSS rules: box-shadow disabled (`--tw-shadow: 0 0 #0000 !important`), min-width 1024px, custom scrollbar, `.img-hover` utility class. Font: `Noto Sans SC`.

**Important**: Tailwind v4 preflight resets `button` cursor to `default` — always add `cursor-pointer` to interactive buttons explicitly.

### Icons

Remix Icon (`ri-*` classes) loaded via CDN in `index.html`. No icon npm package.

### Component Structure

- `src/components/base/` — reusable: `Breadcrumb`, `ProductCard`, `GroupBuyCard`, `PostCard`, `PaymentModal`, `Toast` (context + `useToast` hook)
- `src/components/feature/` — layout: `Navbar`, `Footer`
- `src/pages/<feature>/components/` — co-located modals: `PublishProductModal`, `PublishGroupBuyModal`, `PublishPostModal`
- `src/pages/<feature>/detail/` — detail pages for secondhand/groupbuy/forum

### Mock Data (`src/mocks/`)

All data is static mock. `types.ts` defines core types (`Product`, `GroupBuy`, `Post`, `Comment`, `User`, `Contact`, `Message`, etc.). Each domain file (`secondhand.ts`, `groupbuy.ts`, `forum.ts`, `profile.ts`, `chat.ts`) exports data arrays and helper query functions (e.g., `getProductById`, `getPostsByCategory`). `index.ts` re-exports everything.

CRUD operations are simulated with local `useState` and `setTimeout` — no persistence.

### State Management

No external state library. Pure `useState`/`useContext`. `ToastProvider` is the only context provider, wrapping the entire app in `App.tsx`.

## Key Conventions

- Path alias: `@` → `./src` (configured in both vite.config.ts and tsconfig.json)
- `__BASE_PATH__` env var for deployment subpath
- Images: Unsplash URLs for products, pravatar.cc for avatars
- `react-i18next` is listed in auto-import config but is **not** a dependency and is not used
- Payment flow: simulated QR-code scan → confirm → success animation
