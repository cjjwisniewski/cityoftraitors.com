# cityoftraitors.com

Source code, static assets, and markdown chronicles for [cityoftraitors.com](https://www.cityoftraitors.com) — a Magic: The Gathering blog focused on old-frame formats, Premodern, Legacy deck lists, and tournament reports.

## Repository Structure

```text
.
├── .github/workflows/main.yml      # CI/CD: builds static site and deploys to Azure Blob Storage ($web)
├── STYLE_GUIDE.md                  # Visual, typographic, and editorial style guide
└── cityoftraitors.com/             # SvelteKit application
    ├── svelte.config.js            # Static adapter + mdsvex markdown configuration
    ├── static/assets/              # Hero artwork, Goudy Medieval font, and post images
    └── src/
        ├── app.css                 # Design tokens and global base styles
        ├── app.html                # HTML shell and Google Fonts preconnects
        ├── lib/
        │   ├── assets/favicon.svg  # Site favicon
        │   ├── authors.js          # Author bio registry
        │   ├── posts/*.md          # Markdown blog posts (mdsvex)
        │   └── utils/format.js     # Timezone-safe date formatting & reading-time helpers
        └── routes/
            ├── +layout.svelte      # Persistent frosted header and footer
            ├── +page.svelte        # Hero showcase and Chronicles feed
            ├── +error.svelte       # Custom error / 404 page
            ├── about/+page.svelte  # About page and Seeker callout
            ├── api/posts/+server.js# Prerendered JSON index of posts
            └── blog/[slug]/        # Individual chronicle view with reading progress bar
```

## Local Development

All commands run inside `cityoftraitors.com/` (Node 20):

```sh
cd cityoftraitors.com
npm ci
npm run dev
```

### Verification & Build

```sh
npm run check   # Runs svelte-kit sync && svelte-check
npm run test    # Runs CI-only automated tests (requires GITHUB_ACTIONS=true)
npm run build   # Builds static output into cityoftraitors.com/build
npm run preview # Previews the production build locally
```

> **Note:** Unit and contract tests (`cityoftraitors.com/tests/site.test.mjs`) enforce `GITHUB_ACTIONS === 'true'` in `scripts/run-tests.mjs` and execute exclusively in GitHub Actions CI.

## Authoring a New Chronicle

1. Add a markdown file under `cityoftraitors.com/src/lib/posts/<slug>.md` with frontmatter:

```yaml
---
title: Your Post Title
date: 'YYYY-MM-DD'
description: A concise one-sentence summary for cards and meta tags.
author: Cameron Wisniewski
---
```

2. Place any post images in `cityoftraitors.com/static/assets/posts/<slug>/` and reference them as `/assets/posts/<slug>/image.jpg`.
3. If adding a new author, register their `name` and `bio` in `cityoftraitors.com/src/lib/authors.js`.

## Deployment

Pushes to `main` trigger `.github/workflows/main.yml`, which runs `npm ci` and `npm run build` in `cityoftraitors.com/` and uploads `./cityoftraitors.com/build` to the `$web` container in Azure Blob Storage.

## Style Guide

See [STYLE_GUIDE.md](./STYLE_GUIDE.md) for the full design system, color tokens, typography hierarchy, and component conventions.
