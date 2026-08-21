import { getAllPostsMeta } from '@/lib/content/post';
import { SUPPORTED_LOCALES } from '@/lib/i18n';

export default async function sitemap() {
  const baseUrl = "https://dangth.dev";
  const posts = await getAllPostsMeta('vi');

  const localizedStaticPaths = ['/project', '/cert', '/tutorial', '/post'];

  const localizedStatics = SUPPORTED_LOCALES
    .filter((locale) => locale !== 'vi')
    .flatMap((locale) =>
      localizedStaticPaths.map((pathname) => ({
        url: `${baseUrl}/${locale}${pathname}`,
        lastModified: new Date(),
        changeFrequency: pathname === '/post' ? 'weekly' : 'monthly',
        priority: pathname === '/post' ? 0.7 : 0.6,
      }))
    );

  return [
    // Static pages
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/project`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/cert`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/tutorial`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/post`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },

    ...localizedStatics,

    ...posts
      .filter((post) => post.published)
      .flatMap((post) => {
        const lastModified = post.date ? new Date(post.date) : new Date();

        return SUPPORTED_LOCALES.map((locale) => ({
          url: locale === 'vi'
            ? `${baseUrl}/${post.slug}`
            : `${baseUrl}/${locale}/${post.slug}`,
          lastModified,
          changeFrequency: "yearly" as const,
          priority: 0.6,
        }));
      }),
  ];
}
