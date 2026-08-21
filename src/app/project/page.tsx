import React from "react";
import { notFound } from "next/navigation";
import { searchReposByTopicAndUser } from "@/lib/utils/github";
import { GITHUB } from "@/config/config";
import { LangBadge } from "./badge/LangBadge";
import { FaRegStar } from "react-icons/fa";
import { ToolsSection } from "./Tools";
import { getPage, type PageBlock } from "@/lib/content/page";
import type { ProcessedRepo } from "@/lib/utils/github";

type RepoCardProps = {
  url: string;
  name: string;
  description: string | null;
  languages: string[];
  license?: string;
  lastUpdate: string;
  stars: number;
  commitCount: number;
};

function MarkdownBlock({ html }: { html: string }) {
  return (
    <section
      className="project-markdown mb-6 text-[18px] leading-[1.55] [&_h1]:text-[32px] [&_h1]:font-semibold [&_h1]:mb-6 [&_h1]:mt-0 [&_p]:my-0"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

const RepoCard = ({
  url,
  name,
  description,
  languages,
  license,
  lastUpdate,
  stars,
}: RepoCardProps) => {
  return (
    <div className="w-full">
      <div className="group border border-border/60 rounded-none hover:bg-muted transition-colors duration-200 overflow-hidden">
        <div className="px-4 md:px-6 py-6">
          <div className="flex flex-col gap-2">
            {/* Header */}
            <div className="flex items-center justify-between flex-wrap gap-2">
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-semibold hover:underline dark:text-[#E5E7EB] break-all"
              >
                {name}
              </a>
              <span className="text-sm flex items-center gap-1 text-muted-foreground shrink-0 transition-colors duration-200 group-hover:text-yellow-400">
                <FaRegStar className="text-base transition-colors duration-200 group-hover:drop-shadow-[0_0_6px_rgba(250,204,21,0.85)]" /> {stars}
              </span>
            </div>

            {/* Description */}
            <p className="text-sm text-muted-foreground break-words">
              {description || "Không có mô tả"}
            </p>

            {/* Meta info */}
            <div className="flex flex-wrap items-center gap-2 text-sm mt-2">
              {languages.map((lang) => (
                <LangBadge key={lang} lang={lang} />
              ))}
              {license && (
                <span className="text-muted-foreground text-xs border border-border/40 px-2 py-1 rounded-md">
                  {license}
                </span>
              )}
              <span className="text-muted-foreground text-xs ml-auto">
                Last updated {new Date(lastUpdate).toLocaleDateString("vi-VN")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function sortRepositories(repos: ProcessedRepo[], sort: Extract<PageBlock, { type: "github-repositories" }>["data"]["sort"] = "updated-desc") {
  return [...repos].sort((a, b) => {
    switch (sort) {
      case "updated-asc":
        return new Date(a.lastUpdate).getTime() - new Date(b.lastUpdate).getTime();
      case "stars-desc":
        return b.stars - a.stars;
      case "stars-asc":
        return a.stars - b.stars;
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      case "updated-desc":
      default:
        return new Date(b.lastUpdate).getTime() - new Date(a.lastUpdate).getTime();
    }
  });
}

async function GithubRepositoriesBlock({ block }: { block: Extract<PageBlock, { type: "github-repositories" }> }) {
  const username = block.data.username ?? GITHUB.username;
  const topic = block.data.topic ?? GITHUB.topic;
  const repos = await searchReposByTopicAndUser(
    username,
    topic,
    process.env.GITHUB_TOKEN!
  );
  const sortedRepos = sortRepositories(repos, block.data.sort);

  return (
    <section>
      {block.title && (
        <h2 className="text-[28px] font-semibold mb-4 dark:text-[#E5E7EB]">
          {block.title}
        </h2>
      )}

      <div className="flex flex-col gap-4">
        {sortedRepos.map((repo) => (
          <RepoCard key={repo.name} {...repo} />
        ))}
      </div>
    </section>
  );
}



export default async function Projects() {
  const page = await getPage("project");
  if (!page) notFound();

  return (
    <div className="container mx-auto max-w-3xl px-4 md:px-0 py-12">
      {await Promise.all(page.blocks.map(async (block, index) => {
        switch (block.type) {
          case "markdown":
            return <MarkdownBlock key={index} html={block.html} />;
          case "github-repositories":
            return <GithubRepositoriesBlock key={index} block={block} />;
          case "tools":
            return (
              <div key={index} id="tools">
                <ToolsSection title={block.title} items={block.data} />
              </div>
            );
          default:
            return null;
        }
      }))}
    </div>
  );
}
