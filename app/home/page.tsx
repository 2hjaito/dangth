import Image from "next/image";
import ExpandItem from "@/components/home/ExpandItem";
import AvatarStack from "@/components/AvatarStack";
import GithubContributionsLazy from "@/components/home/GithubContributionsLazy";
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

export default function Home() {
  const mySkills = [
    "angular", "nextjs", "springboot", "nodejs",
    "mssql", "postgresql", "mongodb", "redis", "dockerfile"
  ];

  const renderSkillIcons = (keys: string[]) =>
    keys.map((key) => {
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
    });

  return (
    <div className="pt-[50px] max-w-[700px] mx-auto px-4 pb-24 text-[var(--text-color)] dark:text-[var(--text-color-dark)]">

      {/* HEADER */}
      <div className={`relative mt-10`}>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* AvatarStack */}
          <div className="order-2 md:order-none">
            <h1 className="sr-only">
              Trần Hữu Đang – Fullstack Developer
            </h1>

            <p className="text-[40px] md:text-[50px] font-bold">
              Tran Huu Dang
            </p>

            <p className="text-[#2b2c2f] dark:text-[#E5E7EB] font-semibold">Fullstack developer</p>
          </div>

          <div className="md:static mx-auto mb-[50px] ml-[30%] md:ml-0 md:mb-0 md:mx-0">
            <AvatarStack />
          </div>

        </div>

        {/* SOCIAL */}
        <div className="flex flex-wrap gap-2 mt-6">
          {[
            { icon: "github", link: "https://github.com/2hjaito", label: "GitHub" },
            { icon: "leetcode", link: "https://leetcode.com/tranhuudang", label: "LeetCode" },
            { icon: "hackerrank", link: "https://www.hackerrank.com/tranhuudang", label: "HackerRank" },
            { icon: "linkedin", link: "https://www.linkedin.com/in/tranhuudang", label: "LinkedIn" },
            { icon: "youtube", link: "https://www.youtube.com/@2hjaito", label: "YouTube" },
            { icon: "facebook", link: "https://www.facebook.com/dangth.dev/", label: "Facebook" },
            { icon: "tiktok", link: "https://www.tiktok.com/@2hjato", label: "TikTok" },
          ].map((s, i) => {
            const Icon = socialIconMap[s.icon as keyof typeof socialIconMap];
            return (
              <a
                href={s.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Mở ${s.label}`}
                title={s.label}
                key={i}
                className="
            bg-[var(--contact-bc)] 
            dark:bg-[var(--contact-bc-dark)]

            text-[var(--contact-bc-dark)] 
            dark:text-[var(--contact-bc)]

            inline-flex items-center justify-center
            px-3 py-1 rounded text-[18px]

            transition-all duration-200 ease-out
            hover:scale-110 hover:-translate-y-[2px]
            hover:shadow-lg hover:shadow-[var(--contact-bc)/50]
            dark:hover:shadow-[var(--contact-bc-dark)/50]
          "
              >
                <Icon size={20} />
              </a>
            );
          })}
        </div>

      </div>

      {/* ABOUT */}
      <section className="mt-12 space-y-4 fade-in">
        <p>
          I'm Tran Huu Dang, a Fullstack Developer focused on building modern web
          applications with React, Next.js, Angular, Node.js, Spring Boot,
          PostgreSQL, MongoDB, and Redis.
        </p>

        <p>
          Over the past few years, I have worked on internal business systems,
          management platforms, and web applications serving hundreds of active users.
          My experience covers both frontend and backend development, from designing
          responsive user interfaces to building scalable APIs and database
          architectures.
        </p>

        <p>
          I regularly work with real-time technologies such as WebSocket, Server-Sent
          Events (SSE), webhooks, background jobs, caching strategies, and database
          optimization techniques to improve performance and reliability.
        </p>

        <p>
          Recently, I have been exploring AI-powered applications, including RAG
          pipelines, semantic search, vector databases, document processing, and LLM
          integrations. I enjoy finding practical ways to incorporate AI into
          real-world workflows and products.
        </p>

        <p>
          Besides software development, I have hands-on experience with Docker, Linux
          servers, Nginx, CI/CD pipelines, and cloud deployment. I value clean code,
          maintainable architecture, and continuous learning.
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          <span>Core skills:</span>
          {renderSkillIcons(mySkills)}
        </div>
      </section>

      <section className="mt-12 fade-in">
        <h2 className="text-[32px] font-semibold mb-4">Experience</h2>

        <ExpandItem
          title="Fullstack Development"
          subtitle="Web Applications & Internal Platforms"
          time="2023 – Present"
        >
          Built and maintained web-based systems used by hundreds of users. Worked
          across the entire stack, including frontend development, API design,
          database modeling, authentication, authorization, performance optimization,
          and deployment workflows.
        </ExpandItem>

        <ExpandItem
          title="AI & Automation"
          subtitle="LLM Integration and RAG Systems"
          time="2024 – Present"
        >
          Developed AI-assisted features using modern language models, vector search,
          retrieval-augmented generation, document processing, semantic search,
          streaming responses, and workflow automation.
        </ExpandItem>

        <ExpandItem
          title="Realtime & Infrastructure"
          subtitle="Performance and Scalability"
          time="Ongoing"
        >
          Worked with WebSocket, SSE, Redis, caching, queues, Docker, Linux servers,
          Nginx, CI/CD pipelines, and monitoring tools to improve application
          performance, reliability, and maintainability.
        </ExpandItem>
      </section>

      {/* EDUCATION */}
      <section className="mt-12 fade-in">
        <h2 className="text-[32px] font-semibold mb-4">Education</h2>

        <ExpandItem
          title="Can Tho University"
          subtitle="Information Technology"
          time="Sep 2025 – Jan 2027"
          logo="/images/education/ctu.png"
        >
          Studying programming, databases, system analysis, software engineering
          fundamentals, and core information technology concepts.
        </ExpandItem>

        <ExpandItem
          title="FPT Polytechnic"
          subtitle="Software Development"
          time="Sep 2021 – Jan 2024"
          logo="/images/education/fpoly.jpg"
        >
          Focused on practical software development, including object-oriented
          programming, web development, backend development, testing, and building
          real-world applications.
        </ExpandItem>
      </section>

      {/* GITHUB CONTRIBUTIONS */}
      <section className="mt-12 fade-in">
        <h2 className="text-[32px] font-semibold mb-4">Github Contributions</h2>
        <GithubContributionsLazy />
      </section>

      {/* CERTIFICATIONS */}
      <section className="mt-12 fade-in text-center">
        <h2 className="text-[32px] font-semibold mb-4">Certifications</h2>

        <p className="mb-8 text-gray-700 dark:text-gray-300">
          I have completed several certifications that strengthen my foundation in
          backend development, cloud computing, and data handling.
        </p>

        <div className="flex flex-wrap gap-10 justify-center">
          {[
            {
              img: "udemy.png",
              title: "Master Microservices with Spring Boot & Spring Cloud",
              org: "Udemy",
              date: "Feb 08, 2024",
            },
            {
              img: "aws-cloudfoundations.png",
              title: "AWS Academy Cloud Foundations",
              org: "AWS Academy",
              date: "Jul 03, 2022",
            },
            {
              img: "datacamp/statement-of-accomplishment.png",
              title: "Intermediate SQL Queries",
              org: "DataCamp",
              date: "Apr 15, 2022",
            },
          ].map((cert, idx) => (
            <article key={idx} className="w-[250px]">
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
    </div>
  );
}
