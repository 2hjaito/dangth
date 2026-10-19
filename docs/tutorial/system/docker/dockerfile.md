---
layout: Post
title: "Bài 4. Dockerfile - Cách build một Image"
subtitle: "Docker từ cơ bản đến thực tế"
author: "Trần Hữu Đang"
date: "2026-10-19"
useHeaderImage: false
headerMask: "rgba(39, 77, 61, 0.61)"
permalinkPattern: /ebook/docker/:slug/
tags:
  - Docker
  - Dockerfile
---

<!-- Nội dung:
- Cấu trúc và các lệnh thường dùng trong Dockerfile.
- Build context, .dockerignore, multi-stage build.
- Build, tag, run và best practices. -->

<!-- more -->

**Dockerfile** là một file text chứa các chỉ dẫn để build Docker image. Nó định nghĩa image chứa gì và được cấu hình ra sao.

## 1. Cấu trúc một Dockerfile

```dockerfile
# Base image
FROM node:20-alpine

# Thư mục làm việc
WORKDIR /app

# Copy file package
COPY package*.json ./

# Cài dependencies (chạy lúc build)
RUN npm install

# Copy phần code còn lại
COPY . .

# Khai báo port
EXPOSE 3000

# Lệnh mặc định khi container khởi động
CMD ["node", "index.js"]
```

## 2. Các lệnh thường dùng

| Lệnh | Mô tả |
|---|---|
| `FROM` | Chọn base image |
| `WORKDIR` | Thiết lập thư mục làm việc |
| `COPY` | Copy file từ host vào image |
| `ADD` | Giống `COPY` nhưng có thêm tính năng (URL, giải nén tar) |
| `RUN` | Chạy lệnh trong lúc build |
| `CMD` | Lệnh mặc định khi chạy container (có thể bị ghi đè) |
| `ENTRYPOINT` | Chương trình chính của container (không bị ghi đè bởi tham số `docker run`) |
| `EXPOSE` | Khai báo port mà container sử dụng |
| `ENV` | Thiết lập biến môi trường |
| `ARG` | Biến chỉ dùng lúc build |
| `USER` | Thiết lập user chạy trong container |
| `LABEL` | Thêm metadata |

## 3. Build Context

Build context là thư mục bạn truyền cho lệnh `docker build`:

```
./
├── Dockerfile
├── package.json
├── src/
│   ├── app.js
│   └── utils.js
├── .dockerignore
└── README.md
```

```bash
$ docker build .
```

> [!WARNING]
> Chỉ những file nằm trong build context mới được gửi tới Docker daemon. Hãy dùng `.dockerignore` để loại bỏ những file không cần thiết (ví dụ `node_modules`).

## 4. File .dockerignore

```
node_modules
.git
.env
*.log
dist
coverage
```

Giúp image **nhỏ hơn**, build **nhanh hơn** và tránh **lộ file nhạy cảm**.

> [!TIP]
> `.dockerignore` hoạt động giống `.gitignore`, nhưng dành cho build context của Docker.

## 5. Multi-stage Build

Dùng nhiều **stage** để tạo ra image nhỏ và an toàn hơn.

```dockerfile
# Build stage
FROM node:20 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
```

> [!INFO]
> Build tools và dependency chỉ nằm ở stage `builder`, image cuối cùng chỉ chứa kết quả build → **nhỏ gọn** và **an toàn** hơn.

## 6. Ví dụ thực tế (Node.js App)

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
USER node
EXPOSE 3000
HEALTHCHECK --interval=30s \
  --timeout=5s --retries=3 \
  CMD node healthcheck.js
CMD ["node", "index.js"]
```

> [!TIP]
> Dùng **base image chính thức**, **user không phải root**, **healthcheck** và chỉ cài **dependency production** để có image an toàn và hiệu quả.

## 7. Build, Tag và Run

```bash
# Build image
docker build -t myapp:1.0 .

# Chạy container
docker run -p 3000:3000 myapp:1.0

# Gắn thêm tag
docker tag myapp:1.0 myapp:latest

# Đẩy lên registry
docker push myapp:latest
```

> [!NOTE]
> Cùng một image có thể push lên bất kỳ registry nào (Docker Hub, ECR, GCR...).

## 8. Best Practices

- Dùng **base image chính thức** (ví dụ Alpine)
- Giữ image **nhỏ** (multi-stage build)
- Luôn có **.dockerignore**
- Không cài **package thừa**
- Dùng **phiên bản cụ thể** (không dùng `latest`)
- Chạy bằng **user không phải root**
- Thêm **healthcheck**
- Dùng **biến môi trường** để cấu hình
- **Scan** image để tìm lỗ hổng
- Giữ Dockerfile **đơn giản, dễ đọc**

## 9. Những lỗi thường gặp

> [!WARNING]
> - Dùng tag `latest` cho base image
> - Không dùng `.dockerignore`
> - Copy toàn bộ project (kể cả `node_modules`)
> - Chạy container bằng user `root`
> - Image quá lớn vì chứa tool không cần thiết
> - **Hardcode secret** trong Dockerfile
> - Không dùng multi-stage build
> - Bỏ qua vấn đề bảo mật (lỗ hổng trong image)

## Tổng kết

> [!NOTE]
> Một Dockerfile tốt là bước quan trọng để có hệ thống production **ổn định** và **an toàn**. Image nhỏ hơn, an toàn hơn, build nhanh hơn → deploy tốt hơn!
