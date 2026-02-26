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

export default async function Page({ params }: { params: { slug: string } }) {

  // 🔥 MUST UNWRAP (Next.js App Router)
  const { slug } = await params;


  const post = await getPost(slug);
  if (!post) notFound();

  const allPosts = await getAllPostsMeta();
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
    <div className="post relative flex gap-6 mt-12 px-4 text-[var(--text-color)] dark:text-[var(--text-color-dark)] dark:bg-[var(--background-color-dark)]">

      {/* TOC giữ nguyên */}
      {headings.length > 0 && (
        <aside className="hidden xl:block fixed top-[100px] right-8 min-w-[200px] max-h-[calc(100vh-120px)] overflow-y-auto text-sm text-gray-500 dark:text-gray-400">
          <strong className="block text-base mb-4">Mục lục</strong>
          <ul className="space-y-1">
            {headings.map((heading, idx) => (
              <li key={idx} className={`toc-item level-${heading.level}`}>
                <a
                  href={`/post/${slug}#${heading.id}`}
                  // Sử dụng truncate và giới hạn chiều rộng
                  className="text-gray-600 hover:text-blue-500 dark:text-gray-300 max-w-[300px] truncate block" // <--- Đã sửa đổi
                >
                  {heading.text}
                </a>
              </li>
            ))}
            <li className="toc-item level-2"><a href={`/post/${slug}#comments`}>Thảo luận</a></li>
          </ul>
        </aside>
      )}

      <article className="prose lg:prose-lg dark:prose-invert max-w-4xl mx-auto w-full">

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
        <h2 >
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

        <div className="mt-10 flex flex-wrap justify-between items-center border-t pt-6 text-gray-500 dark:text-gray-400 gap-4 dark:border-[hsl(0_0%_100%/0.33)]">
          <a
            href={`${SITE_CONFIG.githubRepo}/edit/${SITE_CONFIG.githubBranch}/${SITE_CONFIG.postDir}/${post.slug}.md`}
            target="_blank"
            className="flex items-center gap-1 text-blue-500 hover:underline"
          >
            <MdRebaseEdit /> Chỉnh sửa trên GitHub
          </a>

          <div className="flex items-center gap-1">
            <MdHistory />
            <span>
              Cập nhật: {safeDateString(post.lastUpdated ?? post.date) ?? "Đang cập nhật"}
            </span>

          </div>
        </div>

        {(previous || next) && (
          <div className="mt-10 pt-6 border-t flex justify-between text-blue-500 text-sm dark:border-[hsl(0_0%_100%/0.33)]">
            <div>{previous && <Link href={`/post/${previous.slug}`}>← {previous.title}</Link>}</div>
            <div>{next && <Link href={`/post/${next.slug}`}>{next.title} →</Link>}</div>
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


  const post = await getPost(slug);
  if (!post) notFound();

  const url = `https://dangth.dev/post/${slug}`;
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
