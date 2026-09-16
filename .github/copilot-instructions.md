# AI Copilot Instructions for Dangth Portfolio & Blog

## Project Overview
Personal developer portfolio, blog, and tutorials website built with Next.js App Router, TypeScript, and Tailwind CSS.

## Architecture & Codebase Structure
- **App Router (`src/app/`)**:
  - `layout.tsx`: Global layout, theme variables, navbar, and footer shells.
  - `globals.css`: Global styles, CSS variables, dark/light theme tokens.
  - `home/`: Portfolio landing page, skills, experience, and overview.
  - `project/`: GitHub repository showcase, project cards, and tool filters.
  - `post/`: Blog post listings and reader views.
  - `tutorial/`: Step-by-step programming tutorials.
  - `cert/`: Certifications and credentials showcase.
- **Content & Docs (`docs/` & `lib/content/`)**:
  - Markdown content for posts, tutorials, and multilingual pages (`en/`, `zh/`).
- **Configuration & Utilities (`src/config/`, `src/utils/`, `scripts/`)**:
  - `src/config/config.ts`: Shared site metadata, personal links, and GitHub configuration.
  - `scripts/generate-rss.ts`: Production RSS feed generator.

## Commit Messages
- Use Conventional Commits: `type(scope): short description`
- Write messages in English, lowercase, concise, and without a trailing period.
- Always include a meaningful scope such as `project`, `post`, `tutorial`, `home`, `cert`, `layout`, `theme`, `content`, or `seo`.
- Use `feat` for new behavior, `fix` for bug fixes, `refactor` for internal changes, and `chore` for maintenance.
- When asked to generate a commit message, inspect the changed files and return one best message only.
- Examples:
  - `feat(project): sort repositories by latest update`
  - `fix(theme): use white light mode background`
  - `refactor(layout): simplify shared page structure`
