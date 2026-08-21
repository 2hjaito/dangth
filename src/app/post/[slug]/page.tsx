import React from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPost, getAllPostSlugs, getAllPostsMeta } from '@/lib/content/post'
import { extractHeadings } from '@/utils/extractHeadings'
import GiscusComments from '@/components/github/GiscusComments'
import { SITE_CONFIG } from '@/config/config'
import { MdDateRange, MdHistory, MdRebaseEdit } from "react-icons/md"
import { IoTimerOutline } from "react-icons/io5"
import type { Metadata } from "next";
import FloatingTOC from '@/components/post/FloatingTOC'
import StickyPostHeader from '@/components/post/StickyPostHeader'
import { getRequestLocale, localizePath } from '@/lib/i18n'

export default async function Page({ params }: { params: { slug: string } }) {

  // 🔥 MUST UNWRAP (Next.js App Router)
  const { slug } = await params;
  const locale = await getRequestLocale();

  const post = await getPost(slug, locale);
  if (!post) notFound();

  const allPosts = await getAllPostsMeta(locale);
  allPosts.sort((a, b) => a.slug.localeCompare(b.slug));

  // 🔥 FIX: dùng slug chứ không dùng params.slug
  const currentIndex = allPosts.findIndex(p => p.slug === slug);

  const previous = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const next = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  const contentWithLang = post.contentHtml.replace(
    /<pre><code class="[^"]*language-(\w+)"/g,
    `<pre data-lang="$1"><code class="hljs language-$1"`
  );

  const headings = extractHeadings(contentWithLang);

  function safeDateString(value?: string | number | Date) {
    if (!value) return null;
    const d = new Date(value);
    return isNaN(d.getTime()) ? null : d.toLocaleString();
  }

  return (
    <div className="post relative mt-12  xl:px-[320px] text-[var(--text-color)] dark:text-[var(--text-color-dark)] dark:bg-[var(--background-color-dark)]">

      <StickyPostHeader title={post.title} targetId="post-main-title" />

      {headings.length > 0 && <FloatingTOC slug={slug} headings={headings} />}

      <article className="prose lg:prose-lg dark:prose-invert mx-auto w-full max-w-3xl px-4 sm:px-8 lg:px-12">

        {Array.isArray(post.tags) && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag, idx) => (
              <span
                key={idx}
                className="rounded-full border border-[#414141] text-[#414141] dark:border-[#b1b1b1] dark:text-[#cfcfcf] text-[12px] px-[10px]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        <h2 id="post-main-title">
          {post.title}
        </h2>

        <div className="flex flex-wrap items-center gap-4 text-gray-600 dark:text-gray-400 mb-4">
          <div className="flex items-center gap-1">
            <MdDateRange />
            <span>{safeDateString(post.date) ?? post.date}</span>
          </div>

          <div className="flex items-center gap-1"><IoTimerOutline /> <span>{post.readingTime} phút đọc</span></div>
        </div>

        <div dangerouslySetInnerHTML={{ __html: contentWithLang }} className="mt-10" />

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t pt-6 text-sm text-gray-500 dark:border-[hsl(0_0%_100%/0.33)] dark:text-gray-400">
          <a
            href={`${SITE_CONFIG.githubRepo}/edit/${SITE_CONFIG.githubBranch}/${post.sourcePath ?? `${SITE_CONFIG.postDir}/${post.slug}.md`}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-blue-500 hover:underline"
          >
            <MdRebaseEdit />
            <span>Chỉnh sửa trên GitHub</span>
          </a>

          <div className="flex items-center gap-1">
            <MdHistory />
            <span>
              Cập nhật:{" "}
              {safeDateString(post.lastUpdated ?? post.date) ?? "Đang cập nhật"}
            </span>
          </div>
        </div>

        {(previous || next) && (
          <div className="mt-10 pt-6 border-t flex justify-between text-blue-500 text-sm dark:border-[hsl(0_0%_100%/0.33)]">
            <div className='pr-5'>{previous && <Link href={localizePath(`/${previous.slug}`, locale)}>← {previous.title}</Link>}</div>
            <div className='pl-5'>{next && <Link href={localizePath(`/${next.slug}`, locale)}>{next.title} →</Link>}</div>
          </div>
        )}

        <div id="comments" className="mt-[100px]">
          <GiscusComments />
        </div>
      </article>
    </div>
  );
}


// -------------------------
// 🔥 generateStaticParams()
// -------------------------
export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map(s => ({ slug: s.slug }));
}




// -------------------------
// 🔥 generateMetadata()
// -------------------------
export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {

  const { slug } = await params;
  const locale = await getRequestLocale();

  const post = await getPost(slug, locale);
  if (!post) notFound();

  const canonicalPath = localizePath(`/${slug}`, locale)
  const url = `https://dangth.dev${canonicalPath}`;
  const title = post.title;
  const raw = post.contentText || post.contentHtml.replace(/<[^>]+>/g, " ");
  const description = raw.slice(0, 160).trim() + "...";
  const ogImage = post.image || "/images/og-image.png";

  return {
    metadataBase: new URL("https://dangth.dev"),
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title,
      description,
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image", title, description, images: [ogImage] },
  };
}
