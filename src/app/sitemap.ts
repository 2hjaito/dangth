import { getAllPostsMeta } from '@/lib/content/post';

export default async function sitemap() {
  const baseUrl = "https://dangth.dev";
  const posts = await getAllPostsMeta();

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

    ...posts
      .filter((post) => post.published)
      .map((post) => ({
        url: `${baseUrl}/post/${post.slug}`,
        lastModified: post.date ? new Date(post.date) : new Date(),
        changeFrequency: "yearly" as const,
        priority: 0.6,
      })),
  ];
}
