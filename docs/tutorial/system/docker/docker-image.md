---
layout: Post
title: "Bài 3. Tìm hiểu Docker Image"
subtitle: "Docker từ cơ bản đến thực tế"
author: "Trần Hữu Đang"
date: "2026-10-19"
useHeaderImage: false
headerMask: "rgba(39, 77, 61, 0.61)"
permalinkPattern: /ebook/docker/:slug/
tags:
  - Docker
  - Docker Image
---

<!-- Nội dung:
- Image là gì, khác gì container.
- Layer, Union Filesystem và layer caching.
- Tag, version và registry. -->

<!-- more -->

## 1. Docker Image là gì?

**Docker Image** là một **template chỉ đọc (read-only)** dùng để tạo container. Nó đóng gói ứng dụng, các dependency và cấu hình.

- Là template **read-only**
- Chứa code ứng dụng, thư viện, dependency và cấu hình
- Dùng để **tạo container**
- Được build từ **Dockerfile**
- Lưu trữ trên **registry** (ví dụ Docker Hub)
- **Bất biến** (immutable) — không thay đổi sau khi build
- Có thể đánh **phiên bản** bằng tag

> [!TIP]
> Hãy hình dung image như một **bản chụp (snapshot)** của filesystem, chứa đầy đủ mọi thứ ứng dụng cần để chạy.

## 2. Image vs Container

| Docker Image | Docker Container |
|---|---|
| Read-only | Read-write layer nằm trên image |
| Là template | Là một instance đang chạy |
| Build từ Dockerfile | Có tiến trình riêng (ví dụ `nginx`) |
| Có thể đánh phiên bản | Có filesystem, network riêng |
| Lưu trên registry | Có thể stop, start, xoá |
| Ví dụ: `nginx:latest` | Ví dụ: container `web-1` |

> [!NOTE]
> **Image = bản thiết kế**, **Container = ngôi nhà đã xây**.

## 3. Image Layers

Một image được tạo thành từ nhiều **layer**:

| Layer | Nội dung |
|---|---|
| Layer 4 | App code |
| Layer 3 | Dependencies |
| Layer 2 | Runtime (ví dụ Node.js) |
| Layer 1 | Base OS (ví dụ Alpine) |

> [!INFO]
> Các layer **read-only** được xếp chồng lên nhau thông qua **Union File System**.

## 4. Union Filesystem

Docker dùng **Union Filesystem** để gộp nhiều layer read-only thành **một góc nhìn filesystem duy nhất**.

Layer 3 + Layer 2 + Layer 1 (read-only) → **Union Filesystem** → Merged View

> [!WARNING]
> Các layer **không bị gộp vật lý** với nhau, chúng chỉ được xếp chồng và mount lên.

## 5. Layer Caching

Docker **cache** từng layer khi build. Nếu layer không đổi, Docker dùng lại cache, giúp build nhanh hơn rất nhiều.

```
$ docker build .
Step 1/5 : FROM node:20
 ---> Using cache
Step 2/5 : WORKDIR /app
 ---> Using cache
Step 3/5 : COPY package*.json ./
 ---> Using cache
Step 4/5 : RUN npm install
 ---> Running in a1b2c3d4...
```

> [!TIP]
> Sắp xếp các lệnh trong Dockerfile theo thứ tự **từ ít thay đổi đến hay thay đổi** để tận dụng cache tối đa.

## 6. Tính bất biến của Image

Một khi image đã build xong thì **không nên chỉnh sửa**. Cần thay đổi? Build image mới với tag mới.

`app:v1` → ❌ Không sửa image cũ → `app:v2`

- Đảm bảo **tính nhất quán**
- Hỗ trợ **versioning** và **rollback**
- Deploy **dễ đoán trước**
- Build có thể **tái tạo lại** (reproducible)

> [!NOTE]
> Hãy coi image như một **artifact bất biến**.

## 7. Vì sao image nhỏ lại quan trọng?

- Build và pull **nhanh hơn**
- Tốn **ít dung lượng** lưu trữ
- **Bề mặt tấn công nhỏ** hơn (an toàn hơn)
- Container **khởi động nhanh** hơn
- Dễ **phân phối**

So sánh kích thước:

| Image | Kích thước |
|---|---|
| `node:20` | ~ 1.1 GB |
| `node:20-slim` | ~ 200 MB |
| `node:20-alpine` | ~ 50 MB |

> [!TIP]
> Ưu tiên dùng **base image tối giản** (ví dụ Alpine) cho production.

## 8. Image Registry

Image được lưu trên **container registry** để chia sẻ và deploy.

- **Docker Hub** (public)
- **Amazon ECR** (private)
- **Google GCR / Artifact Registry** (private)
- Ngoài ra: Azure ACR, GitHub Container Registry, Harbor...

```bash
docker push myapp:v1   # Đẩy image lên registry
docker pull myapp:v1   # Kéo image về
```

## 9. Tag và Version

Image được gắn **tag** để quản lý phiên bản.

| Tag | Ý nghĩa |
|---|---|
| `nginx:latest` | Tag mặc định |
| `node:20` | Phiên bản cụ thể |
| `myapp:v1` | Tag tự đặt |
| `myapp:1.0.0` | Semantic versioning |
| `myapp:prod` | Tag theo môi trường |

> [!WARNING]
> Đừng chỉ dùng mỗi `latest`. Tag có ý nghĩa giúp bạn **rollback** và **truy vết** dễ dàng hơn.

## Tổng kết

> [!NOTE]
> - Image là **template read-only**, container là **instance đang chạy** của image.
> - Image gồm nhiều **layer** xếp chồng nhờ Union Filesystem, và được **cache** khi build.
> - Giữ image **nhỏ**, **bất biến** và **gắn tag rõ ràng**.
