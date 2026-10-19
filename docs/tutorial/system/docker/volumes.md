---
layout: Post
title: "Bài 7. Storage & Volumes"
subtitle: "Docker từ cơ bản đến thực tế"
author: "Trần Hữu Đang"
date: "2026-10-19"
useHeaderImage: false
headerMask: "rgba(39, 77, 61, 0.61)"
permalinkPattern: /ebook/docker/:slug/
tags:
  - Docker
  - Volumes
  - Storage
---

<!-- Nội dung:
- Filesystem của container.
- Volume, bind mount, tmpfs.
- Quản lý volume và best practices. -->

<!-- more -->

Container thì **tạm thời (ephemeral)**, nhưng dữ liệu của bạn thì rất quan trọng! **Docker Volume** giúp lưu trữ dữ liệu **bên ngoài** writable layer của container, để dữ liệu vẫn còn sau khi restart, rebuild hay nâng cấp container.

## 1. Filesystem của Container

Mỗi container có một filesystem gồm nhiều layer:

| Layer | Mô tả |
|---|---|
| Writable Layer | Các thay đổi của container — **mất khi xoá container** |
| Image Layers (read-only) | Lấy từ Docker image |

> [!WARNING]
> Nếu bạn lưu dữ liệu bên trong container mà **không dùng volume**, dữ liệu sẽ **mất** khi container bị xoá!

## 2. Các loại Storage

| Loại | Chi tiết |
|---|---|
| **Volumes** | Do Docker quản lý, lưu tại `/var/lib/docker/volumes`, phù hợp nhất cho dữ liệu lâu dài |
| **Bind Mounts** | Map một thư mục trên host, bạn tự chọn vị trí, phù hợp cho môi trường dev |
| **tmpfs** | Lưu trên RAM, không lưu lâu dài, phù hợp cho dữ liệu tạm / nhạy cảm |

> [!TIP]
> **Volume** cho production, **bind mount** cho development, **tmpfs** cho dữ liệu tạm thời.

## 3. Ví dụ Docker Volume

```bash
# Tạo volume
docker volume create mydata

# Chạy container với volume
docker run -d \
  --name myapp \
  -v mydata:/app/data \
  nginx
```

Dữ liệu ghi vào `/app/data` sẽ được lưu trong volume và **tồn tại qua các lần restart**.

> [!NOTE]
> Stop, xoá hay tạo lại container — dữ liệu vẫn an toàn trong volume!

## 4. Ví dụ Bind Mount

```bash
# Trên máy host
mkdir -p /home/user/appdata

# Chạy container với bind mount
docker run -d \
  --name myapp \
  -v /home/user/appdata:/app/data \
  nginx
```

Host `/home/user/appdata` ⇄ Bind mount ⇄ Container `/app/data`

> [!INFO]
> Thay đổi trên thư mục host sẽ **ngay lập tức** hiện trong container (và ngược lại).

## 5. Kiểm chứng dữ liệu được giữ lại

```bash
# Chạy container và ghi một file
docker run -it --name demo \
  -v mydata:/data alpine sh

/ # echo "Hello Docker!" > /data/hello.txt
/ # exit

# Xoá container
docker rm demo

# Chạy container mới với cùng volume
docker run --rm -v mydata:/data alpine \
  cat /data/hello.txt

Hello Docker!
```

Dữ liệu vẫn còn nguyên dù container ban đầu đã bị xoá!

## 6. Quản lý Volume

```bash
# Liệt kê volume
docker volume ls

# Xem chi tiết volume
docker volume inspect mydata

# Xoá volume
docker volume rm mydata

# Xoá các volume không dùng
docker volume prune
```

```
$ docker volume ls
DRIVER    VOLUME NAME
local     mydata
local     otherdata
```

> [!WARNING]
> `docker volume prune` sẽ xoá **vĩnh viễn** các volume không được container nào dùng. Kiểm tra kỹ trước khi chạy!

## 7. Ứng dụng thực tế

| Trường hợp | Mục đích |
|---|---|
| **Database** (MySQL, Postgres) | Lưu data file, tồn tại qua restart |
| **Log ứng dụng** | Log lâu dài, dễ debug |
| **File cấu hình** | Tách config ra ngoài, theo từng môi trường |
| **File người dùng upload** | Lưu media/file an toàn |

> [!TIP]
> Bất kỳ dữ liệu nào **không được phép mất** đều phải lưu trong volume.

## 8. Volume vs Bind Mount

| Tiêu chí | Volume | Bind Mount |
|---|---|---|
| Docker quản lý | ✅ | ❌ |
| Vị trí | `/var/lib/docker/volumes` | Bất kỳ thư mục nào trên host |
| Phù hợp | Production | Development |
| Tính di động | Cao | Thấp (phụ thuộc host) |
| Hiệu năng | Tốt | Tốt |
| Use case | Database, dữ liệu app | Source code, config |

> [!NOTE]
> Volume thường là lựa chọn **an toàn** và **di động** hơn.

## 9. Best Practices

- Dùng **volume** cho dữ liệu lâu dài
- Không lưu dữ liệu quan trọng trong **writable layer** của container
- Dùng **bind mount** khi dev local
- Dùng `.dockerignore` để tránh copy file lớn
- Thiết lập **quyền truy cập** đúng (đặc biệt với database)
- Dùng **named volume** (không dùng anonymous volume)
- **Dọn dẹp** volume không dùng định kỳ
- Với dữ liệu nhạy cảm, cân nhắc **tmpfs** hoặc **secrets**

## Tổng kết

> [!NOTE]
> Dữ liệu bền vững = ứng dụng đáng tin cậy. Hãy dùng đúng loại storage cho đúng việc!
