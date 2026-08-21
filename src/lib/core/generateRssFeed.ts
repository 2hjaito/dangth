import fs from 'fs';
import path from 'path';
import RSS from 'rss';
import { SITE_CONFIG } from '../../config/config';
import { getAllPostsMeta } from '../content/post';
import { getAllTutorialSlugs, getTutorial } from '../content/tutorial';

export async function generateRssFeed() {
  const siteUrl = SITE_CONFIG.url;

  const feed = new RSS({
    title: 'Dangth.dev',
    description: 'Personal blog & tutorials by Dang Tran Huu',
    feed_url: `${siteUrl}/rss.xml`,
    site_url: siteUrl,
    language: 'en',
    pubDate: new Date(),
    copyright: `© ${new Date().getFullYear()} Dang Tran Huu`,
  });

  // 👇 Gộp post vào RSS
  const posts = await getAllPostsMeta();
  posts.forEach((post) => {
    feed.item({
      title: post.title,
      description: post.subtitle || '',
      url: `${siteUrl}/post/${post.slug}`,
      date: post.date,
    });
  });

  // 👇 Gộp tutorial vào RSS
  const tutorialSlugs = getAllTutorialSlugs(); // [{ slug: ['path', 'to', 'file'] }]
  for (const { slug: slugParts } of tutorialSlugs) {
    const slug = slugParts.join('/');
    const tutorial = await getTutorial(slug);
    if (!tutorial) continue;

    feed.item({
      title: tutorial.title,
      description: tutorial.subtitle || '',
      url: `${siteUrl}/tutorial/${slug}`,
      date: tutorial.lastUpdated,
    });
  }

  // 👉 Xuất file RSS
  const rss = feed.xml({ indent: true });
  const rssPath = path.join(process.cwd(), 'public', 'rss.xml');
  fs.writeFileSync(rssPath, rss);
}
