export const navbarConfig = {
  items: [
    { label: 'Home', href: '/', icon: 'user' },
    { label: 'Projects', href: '/project', icon: 'projects' },
    { label: 'Certs', href: '/cert', icon: 'certificate' },
    { label: 'Tutorials', href: '/tutorial', icon: 'tutorials' },
    { label: 'Posts', href: '/post', icon: 'posts' },
    { label: 'Docs', href: '/docs', icon: 'docs' },
  ],
  themeToggle: {
    title: 'Toggle theme',
  },
} as const;
