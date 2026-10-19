---
layout: Post
title: "Bài 5. Container hoạt động bên trong như thế nào?"
subtitle: "Docker từ cơ bản đến thực tế"
author: "Trần Hữu Đang"
date: "2026-10-19"
useHeaderImage: false
headerMask: "rgba(39, 77, 61, 0.61)"
permalinkPattern: /ebook/docker/:slug/
tags:
  - Docker
  - Linux
  - Namespaces
  - Cgroups
---

<!-- Nội dung:
- Linux namespaces và cgroups.
- Cô lập process, filesystem, network.
- Lưu ý bảo mật. -->

<!-- more -->

Container không phải phép màu! Nó chỉ là **tiến trình Linux bình thường**, được cô lập bằng **namespaces** và giới hạn tài nguyên bằng **cgroups**.

## 1. Bức tranh tổng thể

Container là một tiến trình (hoặc nhóm tiến trình) chạy trên host, được **cô lập** bằng Linux **namespaces** và **giới hạn** bằng **cgroups**.

| Host OS | Container 1 | Container 2 |
|---|---|---|
| Applications | App A | App B |
| Docker Engine | Namespaced View | Namespaced View |
| Linux Kernel | cgroups Limits | cgroups Limits |

> [!NOTE]
> Các container **dùng chung kernel** với host, nhưng mỗi container nhìn thấy một **góc nhìn hệ thống riêng**.

---

## 2. Linux Namespaces

Namespaces cô lập các tài nguyên hệ thống để mỗi container có góc nhìn riêng.

| Namespace | Cô lập |
|---|---|
| `PID` | Process ID (container có PID 1 của riêng nó) |
| `NET` | Network interface, IP, port, bảng routing |
| `MNT` | Mount point (góc nhìn filesystem) |
| `UTS` | Hostname và domain name |
| `IPC` | Giao tiếp liên tiến trình (shared memory...) |
| `USER` | User ID và group ID (map root trong container) |
| `CGROUP` | Góc nhìn cgroup, phối hợp với cgroups để giới hạn tài nguyên |

> [!TIP]
> Cùng một kernel, khác góc nhìn — *"container của bạn tưởng rằng nó đang ở một mình!"*

Thử kiểm tra ngay:

```bash
# Chạy một container
docker run -it --name demo alpine sh

# Bên trong container
ps -ef          # thấy PID 1 khác hoàn toàn host
hostname        # hostname khác
ip a            # network riêng của container
mount | grep /  # filesystem được cô lập
```

---

## 3. Cgroups (Control Groups)

Cgroups **giới hạn** và **theo dõi** lượng tài nguyên (CPU, memory, I/O...) mà container được dùng.

| Tài nguyên | Giới hạn |
|---|---|
| CPU | Số core, CPU shares |
| Memory | Lượng RAM, tránh OOM (Out of Memory) |
| Block I/O | Tốc độ đọc/ghi đĩa |
| Network | Băng thông mạng |
| PIDs | Số lượng tiến trình |

```bash
# Giới hạn RAM 512MB
docker run -it --memory=512m alpine

# Giới hạn 1 core CPU
docker run -it --cpus="1.0" alpine

# Kết hợp cả hai
docker run -d \
  --name myapp \
  --cpus="0.5" \
  --memory="512m" \
  nginx
```

> [!WARNING]
> Nếu không có cgroups, một container có thể **ngốn hết tài nguyên** của host và kéo sập các container khác!

---

## 4. Container được khởi chạy thế nào?

`docker run nginx` → Docker daemon (`dockerd`) → Tạo **namespaces** → Thiết lập **cgroups** → Mount **filesystem** (từ image) → Khởi động tiến trình chính (ví dụ `nginx`)

> [!INFO]
> Không có phép màu nào cả, chỉ là các tính năng của Linux được dùng một cách thông minh!

---

## 5. Cô lập tiến trình (Process Isolation)

Mỗi container có **cây tiến trình riêng** trong PID namespace của nó.

**Trên Host**

```
$ ps aux | grep nginx
root  1234  0.0  nginx
root  1250  0.0  nginx
```

**Bên trong Container**

```
$ ps aux
PID 1   nginx
PID 7   sh
```

> [!WARNING]
> PID 1 trong container **không phải** PID 1 của host. PID 1 trong container rất đặc biệt: nó phải xử lý signal đúng cách (có thể dùng `tini` hoặc `dumb-init`).

---

## 6. Cô lập Filesystem

Mỗi container có góc nhìn filesystem riêng nhờ **mount namespace** và **Union File System** (như OverlayFS):

| Layer | Mô tả |
|---|---|
| Writable Layer | Các thay đổi của container |
| Read-only Layers | Các layer từ image |
| Base Image | Ví dụ Alpine |

> [!TIP]
> Thay đổi bên trong container **không ảnh hưởng** tới image gốc hay host (trừ khi bạn dùng volume).

---

## 7. Cô lập Network

Mỗi container có **network namespace** riêng với interface ảo (**veth pair**).

```
Container 1 (172.17.0.2) ⇄ veth ⇄ Container 2 (172.17.0.3)
                     │
           Docker Bridge docker0 (172.17.0.1)
                     │
                Host Network (eth0)
```

- Mỗi container có **IP riêng**
- Giao tiếp qua mạng ảo (**bridge**)
- Cô lập với mạng host (mặc định)

---

## 8. Container ≠ Virtual Machine

| Tiêu chí | Container | Virtual Machine |
|---|---|---|
| Kernel | Dùng chung với host | Kernel riêng |
| Cô lập | Mức tiến trình (namespaces) | Mức toàn bộ OS |
| Kích thước | Vài MB | Vài GB |
| Khởi động | Vài giây | Vài phút |
| Overhead | Thấp | Cao |
| OS | Cùng loại với host | Có thể khác host |
| Use case | Microservices, cloud-native | Full OS, ứng dụng legacy |

> [!NOTE]
> Container **được cô lập**, chứ **không được ảo hoá**.

---

## 9. Lưu ý bảo mật

- Dùng **user không phải root** trong container
- Áp dụng **giới hạn tài nguyên** (cgroups)
- Không chạy container **privileged**
- Dùng **read-only root filesystem** khi có thể
- Thường xuyên **cập nhật base image**
- **Scan** image để tìm lỗ hổng
- Dùng **seccomp**, **AppArmor** hoặc **SELinux**
- Giới hạn **capabilities** (ví dụ `--cap-drop`)

> [!WARNING]
> Tránh dùng `--privileged` — nó gần như trao toàn quyền truy cập host cho container.

---

## Tổng kết

> [!NOTE]
> - Container là **tiến trình**, không phải VM.
> - **Namespaces** cung cấp sự cô lập, **cgroups** kiểm soát tài nguyên.
> - Container dùng chung kernel với host, có filesystem (UnionFS) và network riêng.
> - **Isolation + Control** = deploy nhanh hơn, đơn giản hơn, tốt hơn!
