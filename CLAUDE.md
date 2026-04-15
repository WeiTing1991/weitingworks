# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Stack

Next.js 15 (Pages Router) + React 18 + TypeScript. Styling is SCSS-first (`src/scss/`) with Tailwind v4 and MUI v6 also installed. Bun is the package manager (see `bun.lock`).

## Commands

- `bun run dev` — start the dev server
- `bun run build` — production build
- `bun run start` — run the built app
- `bun run lint` — `next lint` (uses `next/core-web-vitals`)
- `bun run deploy` — runs `predeploy` (build) then publishes `out/` to GitHub Pages via `gh-pages`

There is no test runner configured.

## Architecture

- **Pages Router** under `src/pages/` (not App Router). `_app.tsx` wraps everything in `ThemeContextProvider` and injects Google fonts (`Source_Sans_3`, `Roboto_Mono`) as CSS variables `--raleway` / `--fira-code` consumed by SCSS.
- **Routes**: `index.tsx` is a single-page composition that mounts `Loader` first and only renders page sections after the loader finishes (`showContent` state gate). `projects.tsx` reuses the same section components on a dedicated route.
- **Layout model**: page files compose high-level blocks from `src/sections/` (`Hero`, `About`, `Experience`, `Projects`, `Contact`, `Navbar`, `Footer`). `src/components/` holds reusable widgets (`Loader`, `BackHome`, `SocialIcons`, `ModalPage`, `MarkdownContent`, `ThemeIcon`, `CustomParticles`, `Button`). When adding a new page, follow this compose-sections pattern rather than building monolithic pages.
- **Theming**: `src/provider/ThemeContext.tsx` exposes `useTheme()` with `light | dark | system`. It toggles a `light` class on `<html>`; SCSS variables in `src/scss/_variables.scss` / `globals.css` branch on that class. Default theme is `dark`. Theme state is in-memory only (not persisted).
- **Styles**: `src/scss/index.scss` is the entry imported from `_app.tsx` and pulls in partials from `src/scss/components/` and `src/scss/sections/` via their `_index.scss` barrels. Keep new styles inside this structure; don't introduce per-component CSS Modules unless extending the existing `App.module.css` pattern.
- **Content**: `public/projects.json` and `public/constant.json` drive the Projects/Experience data; project markdown/assets live under `public/project/`, Lottie JSON under `public/animation/`. Edit JSON to add projects — don't hardcode in TSX.
- **Path alias**: `@/*` → `src/*` (see `tsconfig.json`).

## Deployment

`next.config.js` currently has GitHub Pages settings (`basePath`, `assetPrefix`, `output: 'standalone'`, image `unoptimized`) commented out. The `deploy` script publishes `out/` via `gh-pages`, which requires `next export`-style output — re-enabling those config options is needed before a working GH Pages deploy. The workflow at `.github/workflows/build.yml` is fully commented out (disabled); deploys are currently manual via `bun run deploy`.
