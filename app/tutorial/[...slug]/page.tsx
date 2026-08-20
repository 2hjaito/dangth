import { getTutorial, getAllTutorialSlugs } from "@/lib/content/tutorial";
import { flattenSidebar, findNavContext } from "@/lib/content/tutorial-nav";
import { tutorialSidebar } from "@/config/tutorial.config";
import { SITE_CONFIG } from "@/config/config";
import TutorialLayoutClient from "@/components/layouts/TutorialLayoutClient"; // client
import GiscusComments from "@/components/github/GiscusComments"; // client
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return getAllTutorialSlugs().map((i) => ({ slug: i.slug }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const slugStr = slug.join("/");

  const tutorial = await getTutorial(slugStr);
  if (!tutorial) return { title: "Not found" };

  return {
    title: tutorial.title,
    openGraph: {
      title: tutorial.title,
      description: tutorial.subtitle,
      type: "article",
      images: tutorial.image ? [tutorial.image] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: tutorial.title,
      description: tutorial.subtitle,
      images: tutorial.image ? [tutorial.image] : [],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const slugStr = slug.join("/");
  const tutorial = await getTutorial(slugStr);

  if (!tutorial) notFound();

  // Navigation info
  const flat = flattenSidebar(tutorialSidebar);
  const navContext = findNavContext(flat, slugStr);

  return (
    <TutorialLayoutClient // CLIENT LAYOUT GIỮ LẠI Y NGUYÊN
      activeSlug={slugStr}
      tree={tutorialSidebar}
      isContentLoading={false}
    >
      <div className="dark:text-[var(--text-color-dark)]">

        {/* TITLE */}
        <h1 className="text-3xl font-bold mb-4">{tutorial.title}</h1>

        {/* SUBTITLE */}
        {tutorial.subtitle && (
          <p className="text-gray-500 dark:text-gray-300 mb-4">
            {tutorial.subtitle}
          </p>
        )}

        {/* CONTENT */}
        <div
          className="prose lg:prose-lg dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: tutorial.contentHtml }}
        />

        {/* EDIT / UPDATE */}
        <div className="mt-10 flex flex-wrap justify-between items-center text-[18px] 
                        text-gray-500 dark:text-gray-400 border-t pt-6 gap-4">
          <a
            href={`${SITE_CONFIG.githubRepo}/edit/${SITE_CONFIG.githubBranch}/${SITE_CONFIG.tutorialDir}/${tutorial.slug}.md`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-blue-500 hover:underline"
          >
            Chỉnh sửa trên GitHub
          </a>

          <div className="flex items-center gap-1">
            Cập nhật: {new Date(tutorial.lastUpdated).toLocaleString()}
          </div>
        </div>

        {/* NAVIGATION */}
        <div className="mt-10 flex justify-between text-[18px] text-blue-600 dark:text-blue-400">
          {navContext?.previous && (
            <Link href={navContext.previous.link || "#"}>
              ← {navContext.previous.text}
            </Link>
          )}

          <div className="flex-1" />

          {navContext?.next && (
            <Link href={navContext.next.link || "#"}>
              {navContext.next.text} →
            </Link>
          )}
        </div>

        {/* COMMENTS */}
        <div id="comments" className="mt-[5rem]">
          <GiscusComments />
        </div>
      </div>
    </TutorialLayoutClient>
  );
}
