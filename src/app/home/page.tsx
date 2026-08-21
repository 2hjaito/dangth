import Image from "next/image";
import { notFound } from "next/navigation";
import ExpandItem from "@/components/home/ExpandItem";
import AvatarStack from "@/components/AvatarStack";
import GithubContributionsLazy from "@/components/home/GithubContributionsLazy";
import { getPage, type PageBlock } from "@/lib/content/page";
import { getRequestLocale } from "@/lib/i18n";
import { FiGithub, FiYoutube } from "react-icons/fi";
import { LuLinkedin, LuFacebook } from "react-icons/lu";
import { SiLeetcode, SiAngular, SiMongodb, SiRedis } from "react-icons/si";
import { TbBrandHackerrank, TbBrandTiktok, TbBrandNextjs } from "react-icons/tb";
import { BiLogoSpringBoot, BiLogoPostgresql } from "react-icons/bi";
import { DiMsqlServer } from "react-icons/di";
import { FaNodeJs, FaDocker } from "react-icons/fa";

const socialIconMap = {
  github: FiGithub,
  leetcode: SiLeetcode,
  hackerrank: TbBrandHackerrank,
  linkedin: LuLinkedin,
  youtube: FiYoutube,
  facebook: LuFacebook,
  tiktok: TbBrandTiktok,
} as const;

const skillIconMap = {
  angular: { icon: SiAngular, color: "#F3044C" },
  nextjs: { icon: TbBrandNextjs, color: "#000000" },
  springboot: { icon: BiLogoSpringBoot, color: "#76BC1E" },
  nodejs: { icon: FaNodeJs, color: "#43853d" },
  mssql: { icon: DiMsqlServer, color: "#E2302A" },
  postgresql: { icon: BiLogoPostgresql, color: "#336791" },
  mongodb: { icon: SiMongodb, color: "#16AA52" },
  redis: { icon: SiRedis, color: "#C8302B" },
  dockerfile: { icon: FaDocker, color: "#2496ED" },
} as const;

function MarkdownBlock({ html }: { html: string }) {
  return (
    <section
      className="home-markdown mt-12 space-y-4 fade-in text-[18px] leading-[1.55] [&_h2]:text-[32px] [&_h2]:font-semibold [&_h2]:mb-4 [&_h2]:mt-0 [&_p]:my-0"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

function HeroBlock({ block }: { block: Extract<PageBlock, { type: "hero" }> }) {
  return (
    <div className="relative mt-10">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
        <div>
          <h1
            style={{
              position: "absolute",
              width: 1,
              height: 1,
              padding: 0,
              margin: -1,
              overflow: "hidden",
              clip: "rect(0, 0, 0, 0)",
              whiteSpace: "nowrap",
              border: 0,
            }}
          >
            {block.data.srTitle ?? block.data.title}
          </h1>

          <p className="text-[40px] md:text-[50px] font-bold leading-tight">
            {block.data.title}
          </p>

          <p className="text-[#2b2c2f] dark:text-[#E5E7EB] font-semibold">
            {block.data.description}
          </p>
        </div>

        <div className="self-center sm:self-auto shrink-0">
          <AvatarStack />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-6">
        {block.data.socials.map((social) => {
          const Icon = socialIconMap[social.icon as keyof typeof socialIconMap];
          if (!Icon) return null;

          return (
            <a
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Mở ${social.label}`}
              title={social.label}
              key={social.label}
              className="group relative inline-flex h-9 w-9 items-center justify-center overflow-visible rounded bg-[#e2e6ee] text-[var(--contact-bc-dark)] transition-colors duration-200 ease-out hover:bg-[#d8dee8] dark:bg-[var(--contact-bc-dark)] dark:text-[var(--contact-bc)] dark:hover:bg-[#566174]"
            >
              <Icon size={20} className="relative z-10 origin-bottom transition-transform duration-200 ease-out group-hover:scale-150" />
            </a>
          );
        })}
      </div>
    </div>
  );
}

function SkillsBlock({ block }: { block: Extract<PageBlock, { type: "skills" }> }) {
  return (
    <div className="mt-4 flex flex-wrap gap-2 fade-in">
      <span>{block.data.label}</span>
      {block.data.items.map((key) => {
        const entry = skillIconMap[key as keyof typeof skillIconMap];
        if (!entry) return null;
        const Icon = entry.icon;

        return (
          <span
            key={key}
            title={key}
            style={{ color: entry.color, fontSize: "1.5rem", marginLeft: "0.5rem" }}
          >
            <Icon />
          </span>
        );
      })}
    </div>
  );
}

function ExpandListBlock({ block }: { block: Extract<PageBlock, { type: "expand-list" }> }) {
  return (
    <section className="mt-12 fade-in">
      {block.title && (
        <h2 className="text-[32px] font-semibold mb-4">{block.title}</h2>
      )}
      {block.data.map((item) => (
        <ExpandItem
          key={`${item.title}-${item.meta}`}
          title={item.title}
          subtitle={item.subtitle}
          meta={item.meta}
          logo={item.logo}
        >
          {item.content}
        </ExpandItem>
      ))}
    </section>
  );
}

function CertificationsBlock({ block }: { block: Extract<PageBlock, { type: "certifications" }> }) {
  return (
    <section className="mt-8 fade-in text-center">
      {block.title && (
        <h2 className="text-[32px] font-semibold mb-4">{block.title}</h2>
      )}
      <div className="flex flex-wrap gap-10 justify-center">
        {block.data.map((cert) => (
          <article key={cert.title} className="w-[250px]">
            <Image
              src={`/images/cert/${cert.img}`}
              alt={cert.title}
              width={100}
              height={100}
              className="mx-auto object-contain"
            />

            <div className="font-bold mt-2 text-[16px] whitespace-nowrap overflow-hidden text-ellipsis">
              {cert.title}
            </div>

            <div className="text-[14px] text-[#444] dark:text-gray-300">
              {cert.org}
            </div>

            <div className="text-[13px] text-[#666] dark:text-gray-300 mt-1">
              Issued {cert.date}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function renderBlock(block: PageBlock, index: number) {
  switch (block.type) {
    case "markdown":
      return <MarkdownBlock key={index} html={block.html} />;
    case "hero":
      return <HeroBlock key={index} block={block} />;
    case "skills":
      return <SkillsBlock key={index} block={block} />;
    case "expand-list":
      return <ExpandListBlock key={index} block={block} />;
    case "github-contributions":
      return (
        <section key={index} className="mt-12 fade-in">
          {block.title && (
            <h2 className="text-[32px] font-semibold mb-4">{block.title}</h2>
          )}
          <GithubContributionsLazy />
        </section>
      );
    case "certifications":
      return <CertificationsBlock key={index} block={block} />;
    default:
      return null;
  }
}

export default async function Home() {
  const locale = await getRequestLocale();
  const page = await getPage("home", locale);
  if (!page) notFound();

  return (
    <div className="pt-[50px] max-w-[700px] mx-auto px-4 pb-24 text-[var(--text-color)] dark:text-[var(--text-color-dark)]">
      {page.blocks.map(renderBlock)}
    </div>
  );
}
