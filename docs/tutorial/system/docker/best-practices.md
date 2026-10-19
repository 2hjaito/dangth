---
layout: Post
title: "Bài 9. Best Practices & Tổng kết"
subtitle: "Docker từ cơ bản đến thực tế"
author: "Trần Hữu Đang"
date: "2026-10-19"
useHeaderImage: false
headerMask: "rgba(39, 77, 61, 0.61)"
permalinkPattern: /ebook/docker/:slug/
tags:
  - Docker
  - Best Practices
  - Security
---

<!-- Nội dung:
- Image tối giản, Dockerfile tốt, user không phải root.
- Secrets, healthcheck, logging, giới hạn tài nguyên.
- Cập nhật và scan image. -->

<!-- more -->

**Build nhỏ hơn. Chạy an toàn hơn. Đi xa hơn.** Bài cuối của series tổng hợp các best practices giúp bạn có container **an toàn**, **hiệu quả** và **sẵn sàng cho production**.

## 1. Dùng image chính thức & tối giản

Dùng image chính thức từ nguồn tin cậy và ưu tiên base image nhỏ (ví dụ `alpine`).

| ❌ `FROM ubuntu:latest` | ✅ `FROM alpine:3.19` |
|---|---|
| Kích thước lớn | Kích thước nhỏ |
| Nhiều package thừa | Package tối thiểu |
| Rủi ro bảo mật | Nhanh và an toàn hơn |

> [!TIP]
> Image nhỏ hơn = build nhanh hơn, bề mặt tấn công nhỏ hơn!

## 2. Viết Dockerfile tốt hơn

Giữ Dockerfile gọn gàng, hiệu quả và tận dụng cache.

```dockerfile
# syntax=docker/dockerfile:1
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
```

- Dùng `.dockerignore`
- Chỉ copy những gì cần thiết
- Tận dụng build cache (copy dependency trước)
- Dùng multi-stage build để image nhỏ hơn

## 3. Dùng .dockerignore

Loại bỏ file không cần thiết khỏi build context.

```
node_modules
.git
*.log
.env
Dockerfile
docker-compose.yml
dist
coverage
```

> [!NOTE]
> Build context nhỏ hơn = build nhanh hơn và image nhỏ hơn.

## 4. Chạy bằng user không phải root

Đừng chạy container bằng `root`. Hãy dùng user thường để tăng bảo mật.

```dockerfile
FROM node:20-alpine
RUN addgroup -S app && adduser -S app -G app
USER app
WORKDIR /app
COPY --chown=app:app . .
CMD ["node", "server.js"]
```

> [!TIP]
> Luôn tuân thủ nguyên tắc **đặc quyền tối thiểu** (Principle of Least Privilege)!

## 5. Quản lý Secrets an toàn

Không bao giờ hardcode secret trong image hay code.

> [!WARNING]
> ❌ `ENV DB_PASSWORD=secret123` — mật khẩu sẽ nằm vĩnh viễn trong image!

✅ Dùng biến môi trường hoặc **Docker secrets**. Với Docker Compose:

```yaml
services:
  app:
    environment:
      - DB_PASSWORD=${DB_PASSWORD}
```

> [!NOTE]
> Giữ secret **ngoài image**, đặt ở nơi an toàn (env, secret manager...).

## 6. Healthcheck

Dùng healthcheck để hệ thống phát hiện và tự phục hồi container lỗi.

```dockerfile
HEALTHCHECK --interval=30s \
  --timeout=5s --retries=3 \
  CMD curl -f http://localhost:3000/health \
  || exit 1
```

- Giúp phát hiện container **unhealthy**
- Hữu ích trong orchestration (Swarm / K8s)
- Giữ healthcheck **nhẹ nhàng**

> [!WARNING]
> Image `alpine` mặc định không có `curl`. Hãy cài thêm (`apk add --no-cache curl`) hoặc dùng `wget` / script của chính ứng dụng.

## 7. Logging & Monitoring

Ghi log ra **stdout/stderr** và dùng công cụ giám sát.

```js
// Nên
console.log("App started")

// Tránh
fs.writeFileSync("app.log", "...")
```

- Dùng **logging tập trung** (ELK, Loki...)
- Giám sát **metrics** container (CPU, Memory...)
- Thiết lập **cảnh báo** khi có lỗi

> [!TIP]
> Log giúp bạn debug. Monitoring giúp bạn đi trước vấn đề!

## 8. Giới hạn tài nguyên

Đặt giới hạn CPU và memory để tránh "hàng xóm ồn ào" (noisy neighbors).

```yaml
services:
  app:
    image: myapp
    deploy:
      resources:
        limits:
          cpus: "1.0"
          memory: 512M
```

- Ngăn một container **ngốn hết** tài nguyên
- Đặc biệt quan trọng với môi trường **dùng chung**

## 9. Cập nhật image thường xuyên

Luôn giữ base image và dependency được cập nhật.

- Dùng **tag cụ thể** (tránh `:latest` trên production)
- **Rebuild** image định kỳ
- **Scan** lỗ hổng bảo mật bằng các công cụ:

| Công cụ | Loại |
|---|---|
| `docker scout` | Docker (thay thế cho `docker scan` cũ) |
| `trivy` | Open Source |
| `snyk` | Nền tảng bảo mật |

> [!NOTE]
> Luôn cập nhật. Luôn an toàn!

## Tổng kết series

> [!NOTE]
> - Container đóng gói ứng dụng **cùng toàn bộ dependency**.
> - Dùng image **tối giản**, **an toàn** và có **cấu trúc tốt**.
> - Quản lý dữ liệu bằng **volume** (không lưu trong container).
> - Dùng **Docker Compose** cho ứng dụng nhiều container.
> - Tuân thủ **best practices** khi lên production.

🎉 Chúc mừng bạn đã hoàn thành **Docker Series**! Từ cơ bản đến thực tế — hãy tiếp tục build và học hỏi nhé.

**Chặng tiếp theo:** Docker → Kubernetes → CI/CD
