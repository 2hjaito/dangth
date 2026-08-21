# i18n docs structure

This project supports localized markdown content in:

- `docs/vi/pages`, `docs/vi/posts`, `docs/vi/tutorials`
- `docs/en/pages`, `docs/en/posts`, `docs/en/tutorials`
- `docs/zh/pages`, `docs/zh/posts`, `docs/zh/tutorials`

Resolution order when loading markdown:

1. `docs/{locale}/{type}/{slug}.md`
2. `docs/vi/{type}/{slug}.md`
3. `docs/{type}/{slug}.md` (legacy fallback)

Examples:

- `/post/my-article` -> loads `vi` by default
- `/vi/post/my-article` -> accepted and normalized to `/post/my-article`
- `/en/post/my-article` -> loads English content when available
- `/zh/post/my-article` -> loads Chinese content when available
