---
layout: Post
title: "Bài 2. Docker hoạt động như thế nào?"
subtitle: "Docker từ cơ bản đến thực tế"
author: "Trần Hữu Đang"
date: "2026-10-19"
useHeaderImage: false
headerMask: "rgba(39, 77, 61, 0.61)"
permalinkPattern: /ebook/docker/:slug/
tags:
  - Docker
  - Docker Engine
  - Container Runtime
---

<!-- Nội dung:
- Kiến trúc Client - Daemon - Registry.
- Điều gì xảy ra khi chạy docker run.
- containerd, runc và Registry. -->

<!-- more -->

Từ một lệnh `docker run` đơn giản cho đến khi container chạy lên, phía sau có rất nhiều thứ diễn ra. Cùng mình "mở nắp capo" xem Docker hoạt động thế nào nhé!

## 1. Kiến trúc tổng quan

```
Docker Client (CLI / API)
      │  REST API (HTTP)
      ▼
┌──────────── Docker Host ────────────┐
│        Docker Daemon (dockerd)      │ ⇄  Docker Registry
│     ┌───────────┼───────────┐       │    (Docker Hub hoặc private)
│   Images     Containers   Networks  │
│ (local cache) (running)   & Volumes │
└─────────────────────────────────────┘
```

> [!NOTE]
> - **Docker Client**: công cụ bạn gõ lệnh (`docker ...`).
> - **Docker Daemon**: tiến trình chạy nền, làm mọi việc thực sự.
> - **Docker Registry**: nơi lưu trữ image (Docker Hub, registry riêng...).

## 2. Luồng xử lý

1. Bạn chạy một lệnh, ví dụ `docker run nginx`
2. **Docker client** gửi request tới **Docker daemon** (qua REST API)
3. Daemon kiểm tra image đã có sẵn ở local chưa
4. Nếu chưa, daemon **pull** image từ registry (ví dụ Docker Hub)
5. Daemon tạo container từ image (thông qua container runtime)
6. Container được khởi động với **namespaces** và **cgroups** riêng
7. Container của bạn đã chạy!

## 3. Docker CLI thực tế

```bash
$ docker run -d -p 8080:80 nginx
```

| Thành phần | Ý nghĩa |
|---|---|
| `run` | Tạo và khởi động container |
| `-d` | Chạy ở chế độ nền (detached) |
| `-p 8080:80` | Map port `8080` của host vào port `80` của container |
| `nginx` | Tên image (tự động pull nếu chưa có) |

> [!TIP]
> Chỉ một lệnh nhưng kích hoạt cả chuỗi: pull image, tạo container, cấu hình network và cô lập tiến trình!

## 4. Luồng pull image

`docker run nginx` → Kiểm tra local cache

- ✅ **Có image ở local** → dùng luôn
- ❌ **Không có** → Pull từ registry (Docker Hub) → Lưu vào local cache

## 5. Luồng tạo container

**Image** → Tạo container (từ các layer của image) → Thiết lập **namespaces** (process, network, mount...) → Áp dụng **cgroups** (giới hạn tài nguyên) → ▶ **Khởi động** tiến trình chính (ví dụ `nginx`)

## 6. Docker Daemon (dockerd)

- Chạy nền trên máy host.
- Cung cấp **REST API** (được CLI và các tool khác sử dụng).
- Quản lý **images, containers, networks, volumes**.
- Giao tiếp với container runtime (`containerd`, `runc`).
- Xử lý việc pull/push image với registry.
- Quản lý vòng đời (lifecycle) của container.

> [!INFO]
> Thường bạn sẽ không làm việc trực tiếp với `dockerd` — Docker CLI đã làm thay bạn rồi!

## 7. Container Runtime

Bên dưới, Docker dùng **containerd** (và **runc**) để thực sự chạy container.

| Thành phần | Vai trò |
|---|---|
| `dockerd` | Quản lý cấp cao (images, containers...) |
| ↓ `containerd` | Quản lý vòng đời container |
| ↓ `runc` | Tạo và chạy tiến trình container (dùng tính năng của Linux) |
| ↓ Linux Kernel | Cung cấp namespaces, cgroups... |

## 8. Registry

- **Docker Hub** (public)
- **Private registry**: ECR, GCR, ACR, Harbor...
- Lưu trữ image theo **phiên bản**
- Dùng `docker pull` và `docker push`
- Image được định danh theo dạng `name:tag` (ví dụ `nginx:latest`)

```bash
docker pull nginx:latest
docker push myrepo/myapp:v1
```

> [!TIP]
> Bạn hoàn toàn có thể tự dựng một **private registry** để dùng nội bộ trong công ty.

## Tổng kết

> [!NOTE]
> - **Client** gửi lệnh → **Daemon** xử lý → **Registry** cung cấp image.
> - Daemon nhờ **containerd** và **runc** để tạo container dựa trên **namespaces** và **cgroups** của Linux kernel.
> - Cùng một lệnh, rất nhiều thứ diễn ra phía sau — đó chính là "phép màu" của Docker!
