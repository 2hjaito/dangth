---
title: Block 文档
subtitle: 本站使用的 Markdown 内容块说明
---

# Block 文档

本页说明如何在 `docs/pages` 中编写内容。普通 markdown 会像 post/tutorial 一样转换为 HTML：`#` 转为 `h1`，`##` 转为 `h2`，段落转为 `p`，列表转为 `ul/ol`，代码块转为 `pre > code`，并支持 GitHub Flavored Markdown 表格。

需要更丰富 UI 的区域可使用 `:::davi:<type>` 容器块。块内使用 `[key] value` 字段，供 `src/app/home/page.tsx` 中的渲染器转换为组件。解析器仍兼容旧的 JSON 语法，但建议优先使用 `:::davi:*`，可读性与维护性更好。

## 基础 Markdown

````md
# 主标题

## 小节标题

这是一段普通文字。

- 项目一
- 项目二

```ts
const message = "hello";
```
````

## davi:hero

用于首页开场区：姓名、角色、头像堆叠和社交链接。

````md
:::davi:hero
title: Tran Huu Dang
description: Fullstack developer
srTitle: Trần Hữu Đang – Fullstack Developer
social: github | https://github.com/2hjaito | GitHub
social: linkedin | https://www.linkedin.com/in/tranhuudang | LinkedIn
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

用于技能图标行。

````md
:::davi:skills
label: 核心技能：
items: angular, nextjs, springboot, nodejs, mssql, postgresql, mongodb, redis, dockerfile
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

用于可展开列表，如 Experience、Education、Awards。

````md
:::davi:expand-list Experience
title: Fullstack Development
subtitle: Web Applications & Internal Platforms
meta: 2023 – Present
content: Built and maintained web-based systems used by hundreds of users.

title: Can Tho University
subtitle: Information Technology
meta: Sep 2025 – Jan 2027
logo: /images/education/ctu.png
content: Studying programming, databases, system analysis, and software engineering.
:::
````

`:::davi:expand-list` 后面的文本是可选的小节标题。如果你不希望渲染器自动创建标题，可以省略该标题，并在上方用普通 markdown 写 `##` 标题。

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

用于嵌入 GitHub contributions 组件。

````md
:::davi:github-contributions Github Contributions
:::
````

此 block 目前不需要额外字段。block 名后的标题可选。

## davi:certifications

用于简洁证书列表，图片位于 `public/images/cert`。

````md
:::davi:certifications Certifications
title: Master Microservices with Spring Boot & Spring Cloud
img: udemy.png
org: Udemy
date: Feb 08, 2024
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

用于完整证书页面，可按机构分组展示多项证书。

````md
:::davi:cert-groups Certification Gallery
org: Udemy
logo: /images/cert/udemy/udemy.png
cert: AWS Cert Cloud Practitioner (CLF-02) | /images/cert/udemy/example.jpg | Certification
cert: Master Microservices with Spring Boot & Spring Cloud | /images/cert/udemy/microservices.jpg | Intermediate

org: Data Camp
logo: /images/cert/datacamp/datacamp-logo.png
cert: Intermediate SQL Queries | /images/cert/datacamp/sql.png | Intermediate
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

每行 `[cert]` 使用 `title | image | level` 格式。`level` 字段当前已被解析，可供后续 UI 使用。

## davi:github-repositories

用于 project 页面，根据配置 topic 渲染 GitHub 仓库列表。

````md
:::davi:github-repositories Projects
sort: updated-desc
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

如果未声明 `username` 或 `topic`，将使用 `src/config/config.ts` 中的默认值。
支持的 `sort`：`updated-desc`、`updated-asc`、`stars-desc`、`stars-asc`、`name-asc`、`name-desc`。

## davi:tools

用于 project 页面工具列表。`icon` 字段会被 renderer 映射为 React 图标。

````md
:::davi:tools Tools
title: Photoshop 2023
icon: photoshop
description: 设计软件
href: https://example.com/photoshop

title: MS Office 2016
icon: windows
description: Microsoft 办公软件。
href: https://example.com/office
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

## 如何新增 block

1. 在 `src/lib/content/page.ts` 的 `PageBlock` 中新增 type。
2. 在 `parseDaviBlock` 和 `getPage` 中新增解析分支。
3. 在需要的页面里新增渲染组件，例如 `src/app/home/page.tsx`。
4. 在 `docs/pages` 下的 markdown 中使用 `:::davi:<type>` 编写新 block。

block 名建议简短明确，使用 kebab-case，例如 `davi:feature-grid` 或 `davi:timeline`。
