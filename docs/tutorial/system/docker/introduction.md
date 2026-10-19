---
layout: Post
title: "Bài 1. Docker giải quyết vấn đề gì?"
subtitle: "Docker từ cơ bản đến thực tế"
author: "Trần Hữu Đang"
date: "2026-10-19"
useHeaderImage: false
headerMask: "rgba(39, 77, 61, 0.61)"
permalinkPattern: /ebook/docker/:slug/
tags:
  - Docker
  - Container
  - DevOps
---

<!-- Nội dung:
- Vấn đề "works on my machine".
- Container là gì, khác gì máy ảo.
- Lợi ích khi dùng Docker. -->

<!-- more -->

## 1. Đôi nét về Docker

> [!NOTE]
> - **Docker** là nền tảng giúp đóng gói ứng dụng cùng toàn bộ thư viện, cấu hình của nó vào một **container**.
> - Container chạy **giống hệt nhau** ở mọi nơi: máy dev, server staging, production hay cloud.
> - Khẩu hiệu quen thuộc: **Build once. Run anywhere.**

Quy trình làm việc với Docker gói gọn trong 4 bước:

**Build → Package → Ship → Run Anywhere**

```dockerfile
FROM node:20
WORKDIR /app
COPY . .
RUN npm install
CMD ["node", "index.js"]
```

Chỉ với một file `Dockerfile` như trên, ứng dụng của bạn có thể được đóng gói thành **image** và chạy trên Laptop, Server, AWS, Google Cloud hay Azure mà không cần cài đặt lại môi trường.

## 2. Vấn đề "Works on my machine"

Chắc hẳn bạn đã từng nghe (hoặc từng nói) câu: *"Trên máy em chạy được mà!"* 😅

Nguyên nhân thường đến từ:

- Khác **phiên bản** ngôn ngữ, thư viện
- **Thiếu dependency** trên máy khác
- Khác **hệ điều hành** (Windows / Mac / Linux)
- Khác **file cấu hình**
- Khác **hạ tầng** triển khai

> [!WARNING]
> Những khác biệt này dẫn đến lỗi khi deploy, ứng dụng chạy không nhất quán và tốn rất nhiều thời gian để debug.

## 3. Giải pháp: Container

Docker gom tất cả vào một gói duy nhất:

**App Code + Dependencies (Libraries) + Config Files → 📦 Container**

> [!TIP]
> Cùng một container → cùng một hành vi → ở mọi nơi.

## 4. Container vs Virtual Machine

| Virtual Machine | Container |
|---|---|
| App A / App B | App A / App B |
| Bins/Libs | Bins/Libs |
| Guest OS (mỗi VM một OS) | — |
| Hypervisor | Docker Engine |
| Host OS | Host OS |
| Physical Server | Physical Server |

- **VM:** Nặng (vài GB), mỗi VM có OS riêng, khởi động chậm, mật độ thấp.
- **Container:** Nhẹ (vài MB), dùng chung kernel với host, khởi động nhanh, mật độ cao.

> [!INFO]
> Container **không phải** là máy ảo thu nhỏ. Container dùng chung kernel của host nhưng được cô lập ở mức **tiến trình (process)**.

## 5. Ví dụ thực tế

Giả sử bạn có một ứng dụng **Node.js** với các dependency cụ thể.

**Không dùng Docker ☹**

1. Cài Node.js
2. Cài đúng phiên bản của từng dependency
3. Thiết lập biến môi trường
4. Cấu hình riêng cho từng hệ điều hành
5. Cầu nguyện cho nó chạy được...

**Dùng Docker ☺**

```bash
$ docker build -t myapp .
$ docker run myapp
```

Ứng dụng chạy giống hệt nhau trên mọi máy (dev, staging, prod).

> [!TIP]
> Docker loại bỏ sự phức tạp khi setup môi trường và giúp ứng dụng của bạn trở nên **portable**.

## 6. Docker chạy ở đâu?

- **Laptop** của bạn (môi trường Dev)
- **Server nội bộ** (On-Prem – Staging/Prod)
- **Cloud VM** (AWS, GCP, Azure)
- **Kubernetes** (Container Orchestration)
- **Thiết bị Edge** (ARM, IoT, Raspberry Pi)

Cùng một image chạy được ở tất cả những nơi trên!

## 7. Lợi ích chính

- Môi trường **nhất quán** giữa các nơi chạy
- Phát triển và deploy **nhanh hơn**
- **Cô lập** giữa các ứng dụng
- Tận dụng **tài nguyên** tốt hơn
- Dễ dàng **scale** và di chuyển
- Quản lý dependency **đơn giản hơn**
- Nền tảng cho kiến trúc hiện đại (**Microservices**, **Kubernetes**)

> [!WARNING]
> Docker rất mạnh nhưng không phải "viên đạn bạc". Với hệ thống production, bạn vẫn phải tự lo về **networking**, **storage**, **security** và **orchestration**.

## Tổng kết

> [!NOTE]
> Docker đóng gói ứng dụng **cùng môi trường** của nó, giúp ứng dụng chạy ổn định, nhất quán và di động — **ở bất kỳ đâu**.
>
> Tập trung vào việc build tính năng, đừng mất thời gian "đánh nhau" với môi trường nữa nhé!

Trong series này, chúng ta sẽ lần lượt đi qua: **Kiến trúc Docker → Image → Dockerfile → Container Internals → Networking → Volumes → Compose → Best Practices**.

*Tham khảo: Docker Series — From Basics to Real-World (@p4prateek.tech)*
