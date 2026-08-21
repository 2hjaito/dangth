import { SITE_CONFIG } from './config';

export const footerConfig = {
  copyright: '© Davis 2025',
  attribution: {
    label: 'Developer at',
    text: 'Devlands',
    href: 'https://devlands.io.vn',
    external: true,
  },
  links: [
    {
      type: 'source',
      label: 'SRC',
      href: SITE_CONFIG.githubRepo,
      ariaLabel: 'Xem mã nguồn trên GitHub',
      external: true,
    },
    {
      type: 'rss',
      label: 'RSS',
      href: '/rss.xml',
      ariaLabel: 'Xem RSS feed',
      external: false,
    },
  ],
} as const;
