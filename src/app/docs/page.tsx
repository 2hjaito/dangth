import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getMarkdownContent } from "@/lib/core/mdx";
import { getRequestLocale } from "@/lib/i18n";
import FloatingTOC from "@/components/post/FloatingTOC";
import GiscusComments from "@/components/github/GiscusComments";
import { extractHeadings } from "@/utils/extractHeadings";

export const metadata: Metadata = {
  title: "Block Docs",
  description: "Documentation for markdown page blocks used by this site.",
};

export default async function DocsPage() {
  const locale = await getRequestLocale();
  const docs = await getMarkdownContent("pages", "docs", locale);
  if (!docs) notFound();

  const headings = extractHeadings(docs.contentHtml);

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 pb-28 text-[var(--text-color)] dark:text-[var(--text-color-dark)]">
      {headings.length > 0 && <FloatingTOC slug="docs" headings={headings} />}
      <article
        className="prose lg:prose-lg dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: docs.contentHtml }}
      />

      <div id="comments" className="mt-[100px]">
        <GiscusComments />
      </div>
    </div>
  );
}
