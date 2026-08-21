
## Commit Messages
- Use Conventional Commits: `type(scope): short description`
- Write messages in English, lowercase, concise, and without a trailing period
- Always include a meaningful scope such as `project`, `post`, `tutorial`, `home`, `cert`, `layout`, `theme`, `content`, or `seo`
- Use `feat` for new behavior, `fix` for bug fixes, `refactor` for internal changes, and `chore` for maintenance
- When asked to generate a commit message, inspect the changed files and return one best message only
- Examples: `feat(project): sort repositories by latest update`, `fix(theme): use white light mode background`, `refactor(layout): simplify shared page structure`

## Important Files Reference
- **Root layout**: [../src/app/layout.tsx](../src/app/layout.tsx) - global metadata, fonts, navbar, footer, and page shell
- **Global styles**: [../src/app/globals.css](../src/app/globals.css) - Tailwind theme variables and site-wide CSS tokens
- **Home page**: [../src/app/home/page.tsx](../src/app/home/page.tsx) - main portfolio landing content
- **Projects**: [../src/app/project/page.tsx](../src/app/project/page.tsx) - GitHub repository listing and project cards
- **Tools**: [../src/app/project/Tools.tsx](../src/app/project/Tools.tsx) - static tools dropdown on the projects page
- **Posts**: [../src/app/post/page.tsx](../src/app/post/page.tsx) - blog post listing entry
- **Tutorials**: [../src/app/tutorial/page.tsx](../src/app/tutorial/page.tsx) - tutorial listing entry
- **Site config**: [../src/config/config.ts](../src/config/config.ts) - shared site and GitHub configuration
