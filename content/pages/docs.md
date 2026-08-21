---
title: Block Docs
subtitle: Markdown blocks used by this site
---

# Block Docs

Trang này ghi lại cách viết nội dung trong `content/pages`. Những đoạn markdown thường sẽ được convert sang HTML như post/tutorial: `#` thành `h1`, `##` thành `h2`, paragraph thành `p`, list thành `ul/ol`, code fence thành `pre > code`, bảng GitHub Flavored Markdown vẫn dùng được.

Các phần cần UI hiện đại được viết bằng container block có dạng `:::davi:<type>`. Bên trong block dùng field `[key] value` để renderer trong `app/home/page.tsx` chuyển thành component. Parser vẫn giữ tương thích với cú pháp JSON cũ, nhưng nên dùng `:::davi:*` cho dễ đọc và dễ sửa.

## Markdown cơ bản

````md
# Tiêu đề chính

## Tiêu đề section

Đây là một đoạn văn bình thường.

- Item một
- Item hai

```ts
const message = "hello";
```
````

## davi:hero

Dùng cho phần mở đầu trang home: tên, vai trò, avatar stack và social links.

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

Dùng cho hàng icon kỹ năng.

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

Dùng cho các danh sách có thể mở ra như Experience, Education, Awards.

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

Phần sau `:::davi:expand-list` là tiêu đề section tuỳ chọn. Nếu không muốn renderer tự tạo heading, bỏ phần tiêu đề đó và viết `##` bằng markdown thường ở phía trên.

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

Dùng để nhúng component GitHub contributions.

````md
:::davi:github-contributions Github Contributions
:::
````

Block này hiện chưa cần field cấu hình. Tiêu đề sau tên block là tuỳ chọn.

## davi:certifications

Dùng cho danh sách chứng chỉ có ảnh trong `public/images/cert`.

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

## Cách thêm block mới

1. Thêm type mới vào `PageBlock` trong `lib/content/page.ts`.
2. Thêm case parse field trong `parseDaviBlock` và `getPage`.
3. Thêm component render trong trang cần dùng, ví dụ `app/home/page.tsx`.
4. Viết block mới trong file markdown dưới `content/pages` bằng `:::davi:<type>`.

Tên block nên ngắn, rõ nghĩa, viết bằng kebab-case, ví dụ `davi:feature-grid` hoặc `davi:timeline`.
