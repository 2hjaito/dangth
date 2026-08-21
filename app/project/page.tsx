import React from "react";
import { searchReposByTopicAndUser } from "@/lib/utils/github";
import { GITHUB } from "@/config/config";
import { LangBadge } from "./badge/LangBadge";
import { FaRegStar } from "react-icons/fa";
import { ToolsSection } from "./Tools";

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



export default async function Projects() {
  const repos = await searchReposByTopicAndUser(
    GITHUB.username,
    GITHUB.topic,
    process.env.GITHUB_TOKEN!
  );
  const sortedRepos = [...repos].sort(
    (a, b) => new Date(b.lastUpdate).getTime() - new Date(a.lastUpdate).getTime()
  );

  return (
    <div className="container mx-auto max-w-3xl px-4 md:px-0 py-12">
      <h1 className="text-[32px] font-semibold mb-6 dark:text-[#E5E7EB]">
        Projects
      </h1>

      <div className="flex flex-col gap-4">
        {sortedRepos.map((repo) => (
          <RepoCard key={repo.name} {...repo} />
        ))}
      </div>

      <div id="tools">
        {/* Tools (tĩnh) */}
        <ToolsSection />
      </div>
    </div>
  );
}
