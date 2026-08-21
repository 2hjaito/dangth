import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getMarkdownContent } from "@/lib/core/mdx";

export const metadata: Metadata = {
  title: "Block Docs",
  description: "Documentation for markdown page blocks used by this site.",
};

export default async function DocsPage() {
  const docs = await getMarkdownContent("pages", "docs");
  if (!docs) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 pb-28 text-[var(--text-color)] dark:text-[var(--text-color-dark)]">
      <article
        className="prose lg:prose-lg dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: docs.contentHtml }}
      />
    </div>
  );
}
