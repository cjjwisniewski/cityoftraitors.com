# cityoftraitors.com — Agent Guidelines & Repository Specifics

This repository contains the SvelteKit static blog for **`https://cityoftraitors.com`** (`cjjwisniewski/cityoftraitors.com`).

## 1. Git, CI/CD & Documentation Continuity
- **Commit & Push**: Use [Conventional Commits](https://www.conventionalcommits.org/) (`feat(scope):`, `fix(scope):`, `chore(scope):`, `docs(scope):`, `style(scope):`) and push to `origin/main`.
- **Auto-Deploy on `main`**: Pushing to `main` triggers `.github/workflows/main.yml`, which runs `npm ci` and `npm run build` inside `cityoftraitors.com/` and uploads `./cityoftraitors.com/build` to the `$web` container of Azure Storage Account `cityoftraitorscom` via Azure OIDC.
- **Keep BookStack up to date**: When routes, post authoring/rendering, or deployment behavior change, update the **`City of Traitors`** book in BookStack (`HomeLab` shelf, via `bookstack-mcp` at `http://127.0.0.1:8002/mcp`).

## 2. Architecture & Content Invariants
- **Nested App Root**: The SvelteKit project lives in the `cityoftraitors.com/` subdirectory (not the repo root). All `npm` commands run from `cityoftraitors.com/`.
- **Static Adapter & Trailing Slashes**:
  - `cityoftraitors.com/svelte.config.js` uses `@sveltejs/adapter-static` outputting to `build/` (`strict: true`) with `mdsvex` for `.md` posts.
  - `cityoftraitors.com/src/routes/+layout.js` sets `prerender = true` and `trailingSlash = 'always'` for Azure Blob `$web` directory index compatibility.
- **Chronicles & Assets**:
  - Blog posts live in `cityoftraitors.com/src/lib/posts/*.md` with `title`, `date` (`YYYY-MM-DD`), `description`, and `author` frontmatter; author bios live in `cityoftraitors.com/src/lib/authors.js`.
  - Post images live in `cityoftraitors.com/static/assets/posts/<slug>/`.
- **Style & Verification**: Follow `STYLE_GUIDE.md`. `npm run check` (`svelte-check`) and `npm run test` (`scripts/run-tests.mjs`) run as pre-deploy gates in GitHub Actions. Automated tests enforce `GITHUB_ACTIONS === 'true'` and are designed for CI-only execution (do not run unit tests locally).

## 3. Privacy & GDPR Compliance
- **Self-Host Fonts & Assets**: Do not load fonts, icons, stylesheets, or scripts from third-party CDNs (e.g., `fonts.googleapis.com`, `fonts.gstatic.com`, `cdnjs.cloudflare.com`, `unpkg.com`, `jsdelivr.net`). Keep `Inter`, `JetBrains Mono`, and `Newsreader` self-hosted via `@fontsource-variable/*` and host post images locally under `static/assets/posts/`.
- **No Third-Party Trackers**: Do not add Google Analytics, third-party tracking scripts, external embeds, or non-essential cookies.
- **Keep CSP Tight**: Keep `style-src`, `font-src`, and `img-src` restricted to `'self'` (plus `'unsafe-inline'` / `data:` where required) in `seeker_infra/dns/main.tf` so external asset leaks fail closed.
