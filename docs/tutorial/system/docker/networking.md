---
layout: Post
title: "Bài 6. Docker Networking"
subtitle: "Docker từ cơ bản đến thực tế"
author: "Trần Hữu Đang"
date: "2026-10-19"
useHeaderImage: false
headerMask: "rgba(39, 77, 61, 0.61)"
permalinkPattern: /ebook/docker/:slug/
tags:
  - Docker
  - Networking
---

<!-- Nội dung:
- Các network driver của Docker.
- Bridge, host, overlay network.
- Port mapping, DNS và các lệnh thường dùng. -->

<!-- more -->

Docker cung cấp hệ thống networking để container có thể giao tiếp **với nhau**, **với host** và **với thế giới bên ngoài** thông qua nhiều loại network driver khác nhau.

## 1. Kiến thức cơ bản

Mỗi container được cấp một **network interface ảo** và một **địa chỉ IP** từ Docker network.

Container A (`172.18.0.2`) ⇄ Docker Network (bridge) `172.18.0.0/16` ⇄ Container B (`172.18.0.3`)

- Container giao tiếp với nhau bằng **IP** hoặc **tên**
- Mặc định **cô lập** với host
- Có **nhiều network driver** cho các nhu cầu khác nhau

> [!TIP]
> Hãy hình dung mỗi Docker network như một **switch ảo**.

## 2. Network Drivers

| Driver | Khi nào dùng |
|---|---|
| `bridge` | Mặc định, cho các container trên cùng một host |
| `host` | Container dùng chung network stack với host |
| `none` | Không có network (cô lập hoàn toàn) |
| `overlay` | Network nhiều host (Swarm / Kubernetes) |
| `macvlan` | Gán MAC address, container hiện như một thiết bị vật lý |
| `ipvlan` | Network Layer 3 cho các trường hợp nâng cao |

> [!NOTE]
> Chọn driver phù hợp với nhu cầu triển khai của bạn.

## 3. Bridge Network (mặc định)

Tạo một **mạng nội bộ riêng** trên host.

Container A (`172.17.0.2`) ⇄ `docker0` (bridge) `172.17.0.1` ⇄ Container B (`172.17.0.3`)

- Tự động **cấp IP**
- Các container **nói chuyện được** với nhau
- Cô lập với mạng bên ngoài (trừ khi map port)

> [!TIP]
> Phù hợp cho môi trường **dev local** và ứng dụng chạy trên **một host**.

## 4. Port Mapping

Mở port của container ra máy host.

Host `localhost:8080` ⇄ Container `0.0.0.0:80`

```bash
# Chạy nginx và map port 80 của container ra 8080 của host
docker run -d -p 8080:80 nginx
```

- Cú pháp: `-p <host_port>:<container_port>`
- Truy cập qua `localhost:8080`
- Có thể map **nhiều port**
- Port host **không cần trùng** port container

## 5. Container giao tiếp với Container

Các container trong cùng network có thể gọi nhau **bằng tên**.

`app` (`172.18.0.2`) ⇄ `db` (`172.18.0.3`) — `app` gọi tới `db` qua hostname `db`

```bash
# Tạo network
docker network create mynet

# Chạy các container trong cùng network
docker run -d --name db --network mynet mysql
docker run -d --name app --network mynet myapp
```

> [!TIP]
> Dùng **tên container** thay vì IP — Docker tự động phân giải DNS.

## 6. DNS & Service Discovery

Docker có sẵn **DNS server nội bộ** để phân giải tên container.

```bash
# Bên trong container, gọi tới container khác
ping db

# Tên "db" tự động được phân giải ra IP của container
```

- Mỗi container có một **DNS entry** (theo tên)
- Hoạt động trên mọi **user-defined network**
- Không cần sửa `/etc/hosts`
- Hỗ trợ **alias**

> [!WARNING]
> DNS theo tên **không hoạt động** trên network `bridge` mặc định (`docker0`). Hãy tự tạo network bằng `docker network create`.

## 7. Host Network

Container dùng chung network stack với host.

Host (`8080`) ⇄ Container (`8080`)

```bash
docker run --network host myapp
```

- **Không cần** map port
- **Hiệu năng tốt hơn** (không qua NAT)
- Chỉ hoạt động đầy đủ trên **Linux**
- **Không cô lập** (dùng cẩn thận)

> [!INFO]
> Hữu ích cho các ứng dụng cần hiệu năng cao (monitoring, load testing...).

## 8. Overlay Network (nhiều host)

Dùng trong **Docker Swarm** hoặc **Kubernetes** để kết nối container trên **nhiều host khác nhau**.

Host 1: Container A (`10.0.0.2`) ⇄ **Overlay Network** (mạng ảo xuyên host) ⇄ Host 2: Container B (`10.0.1.2`)

- Cho phép giao tiếp **giữa nhiều host**
- Dùng trong Docker Swarm / Kubernetes
- Hỗ trợ **mã hoá** traffic (trong Swarm)

> [!NOTE]
> Cùng một network, khác máy chủ.

## 9. Các lệnh thường dùng

```bash
docker network ls                             # Liệt kê network
docker network inspect mynet                  # Xem chi tiết network
docker network create mynet                   # Tạo network
docker network rm mynet                       # Xoá network
docker run --network mynet ...                # Chạy container trong network
docker network connect mynet container        # Gắn container vào network
docker network disconnect mynet container     # Gỡ container khỏi network
```

> [!TIP]
> Dùng `docker network inspect` để debug các vấn đề về DNS, kết nối và cấp phát IP.

## Tổng kết

> [!NOTE]
> - **bridge** cho một host, **host** cho hiệu năng, **overlay** cho nhiều host.
> - Dùng **port mapping** để mở container ra ngoài.
> - Dùng **tên container** thay vì IP trong user-defined network.
