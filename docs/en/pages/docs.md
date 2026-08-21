---
title: Block Docs
subtitle: Markdown blocks used by this site
---

# Block Docs

This page documents how content is written inside `docs/pages`. Regular markdown is converted to HTML similarly to post/tutorial pages: `#` becomes `h1`, `##` becomes `h2`, paragraphs become `p`, lists become `ul/ol`, code fences become `pre > code`, and GitHub Flavored Markdown tables are supported.

Sections that require richer UI are defined with container blocks using the `:::davi:<type>` format. Inside each block, use `[key] value` fields so the renderer in `src/app/home/page.tsx` can map data into components. The parser still supports legacy JSON blocks, but `:::davi:*` is recommended for readability and easier maintenance.

## Basic markdown

````md
# Main title

## Section title

This is a normal paragraph.

- Item one
- Item two

```ts
const message = "hello";
```
````

## davi:hero

Used for the home page intro section: name, role, avatar stack, and social links.

````md
:::davi:hero
[title] Tran Huu Dang
[description] Fullstack developer
[srTitle] Trần Hữu Đang – Fullstack Developer
[social] github | https://github.com/2hjaito | GitHub
[social] linkedin | https://www.linkedin.com/in/tranhuudang | LinkedIn
:::
````

Schema:

```ts
type HeroBlock = {
  title: string;
  description: string;
  srTitle?: string;
  socials: Array<{
    icon: "github" | "leetcode" | "hackerrank" | "linkedin" | "youtube" | "facebook" | "tiktok";
    link: string;
    label: string;
  }>;
};
```

## davi:skills

Used for the skills icon row.

````md
:::davi:skills
[label] Core skills:
[items] angular, nextjs, springboot, nodejs, mssql, postgresql, mongodb, redis, dockerfile
:::
````

Schema:

```ts
type SkillsBlock = {
  label: string;
  items: Array<"angular" | "nextjs" | "springboot" | "nodejs" | "mssql" | "postgresql" | "mongodb" | "redis" | "dockerfile">;
};
```

## davi:expand-list

Used for expandable sections such as Experience, Education, and Awards.

````md
:::davi:expand-list Experience
[title] Fullstack Development
[subtitle] Web Applications & Internal Platforms
[meta] 2023 – Present
[content] Built and maintained web-based systems used by hundreds of users.

[title] Can Tho University
[subtitle] Information Technology
[meta] Sep 2025 – Jan 2027
[logo] /images/education/ctu.png
[content] Studying programming, databases, system analysis, and software engineering.
:::
````

The text after `:::davi:expand-list` is an optional section title. If you do not want the renderer to auto-create a heading, omit that title and write a normal markdown `##` heading above.

Schema:

```ts
type ExpandItemBlock = {
  title: string;
  subtitle: string;
  meta: string;
  logo?: string;
  content: string;
};
```

## davi:github-contributions

Used to embed the GitHub contributions component.

````md
:::davi:github-contributions Github Contributions
:::
````

This block currently does not require configuration fields. The trailing title is optional.

## davi:certifications

Used for a simple certification list with images in `public/images/cert`.

````md
:::davi:certifications Certifications
[title] Master Microservices with Spring Boot & Spring Cloud
[img] udemy.png
[org] Udemy
[date] Feb 08, 2024
:::
````

Schema:

```ts
type CertificationBlock = {
  img: string;
  title: string;
  org: string;
  date: string;
};
```

## davi:cert-groups

Used for the full certification page when grouping many certificates by organization.

````md
:::davi:cert-groups Certification Gallery
[org] Udemy
[logo] /images/cert/udemy/udemy.png
[cert] AWS Cert Cloud Practitioner (CLF-02) | /images/cert/udemy/example.jpg | Certification
[cert] Master Microservices with Spring Boot & Spring Cloud | /images/cert/udemy/microservices.jpg | Intermediate

[org] Data Camp
[logo] /images/cert/datacamp/datacamp-logo.png
[cert] Intermediate SQL Queries | /images/cert/datacamp/sql.png | Intermediate
:::
````

Schema:

```ts
type CertGroupBlock = {
  org: string;
  logo: string;
  certs: Array<{
    title: string;
    image: string;
    level?: string;
  }>;
};
```

Each `[cert]` line uses the `title | image | level` format. The `level` field is currently parsed for future UI use.

## davi:github-repositories

Used on the project page to render GitHub repositories by configured topic.

````md
:::davi:github-repositories Projects
[sort] updated-desc
:::
````

Schema:

```ts
type GithubRepositoriesBlock = {
  username?: string;
  topic?: string;
  sort?: "updated-desc" | "updated-asc" | "stars-desc" | "stars-asc" | "name-asc" | "name-desc";
};
```

If `username` or `topic` is omitted, defaults in `src/config/config.ts` are used.
Supported `sort` values: `updated-desc`, `updated-asc`, `stars-desc`, `stars-asc`, `name-asc`, `name-desc`.

## davi:tools

Used for the tools list on the project page. The `icon` field is mapped by the renderer to a React icon.

````md
:::davi:tools Tools
[title] Photoshop 2023
[icon] photoshop
[description] Design software
[href] https://example.com/photoshop

[title] MS Office 2016
[icon] windows
[description] Microsoft office software.
[href] https://example.com/office
:::
````

Schema:

```ts
type ToolBlock = {
  title: string;
  icon: "photoshop" | "illustrator" | "aftereffects" | "premierepro" | "lightroom" | "audition" | "adobe" | "antivirus" | "windows";
  description: string;
  href?: string;
};
```

## How to add a new block

1. Add a new type to `PageBlock` in `src/lib/content/page.ts`.
2. Add parsing cases in `parseDaviBlock` and `getPage`.
3. Add a render component in the target page, for example `src/app/home/page.tsx`.
4. Write the new block in a markdown file under `docs/pages` using `:::davi:<type>`.

Block names should be short, descriptive, and kebab-case, for example `davi:feature-grid` or `davi:timeline`.
