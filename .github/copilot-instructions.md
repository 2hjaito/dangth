
## Commit Messages
- Use Conventional Commits: `type(scope): short description`
- Write messages in English, lowercase, concise, and without a trailing period
- Always include a meaningful scope such as `project`, `post`, `tutorial`, `home`, `cert`, `layout`, `theme`, `content`, or `seo`
- Use `feat` for new behavior, `fix` for bug fixes, `refactor` for internal changes, and `chore` for maintenance
- When asked to generate a commit message, inspect the changed files and return one best message only
- Examples: `feat(project): sort repositories by latest update`, `fix(theme): use white light mode background`, `refactor(layout): simplify shared page structure`

## Important Files Reference
- **Root layout**: [../app/layout.tsx](../app/layout.tsx) - global metadata, fonts, navbar, footer, and page shell
- **Global styles**: [../app/globals.css](../app/globals.css) - Tailwind theme variables and site-wide CSS tokens
- **Home page**: [../app/home/page.tsx](../app/home/page.tsx) - main portfolio landing content
- **Projects**: [../app/project/page.tsx](../app/project/page.tsx) - GitHub repository listing and project cards
- **Tools**: [../app/project/Tools.tsx](../app/project/Tools.tsx) - static tools dropdown on the projects page
- **Posts**: [../app/post/page.tsx](../app/post/page.tsx) - blog post listing entry
- **Tutorials**: [../app/tutorial/page.tsx](../app/tutorial/page.tsx) - tutorial listing entry
- **Site config**: [../config/config.ts](../config/config.ts) - shared site and GitHub configuration
