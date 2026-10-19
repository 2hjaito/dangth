---
layout: Post
title: "Bài 14. Best Practices cho production"
subtitle: "Redis từ cơ bản đến thực tế"
author: "Trần Hữu Đang"
date: "2026-10-19"
useHeaderImage: false
headerMask: "rgba(39, 77, 61, 0.61)"
permalinkPattern: /ebook/redis/:slug/
tags:
  - Redis
  - Best Practices
---

<!-- Nội dung:
- Chọn đúng công cụ, đặt tên key, retention.
- Monitoring, idempotency, scaling.
- Bảo mật và các lỗi thường gặp. -->

<!-- more -->

Redis dễ dùng, nhưng hệ thống production cần thiết kế cẩn thận. Dưới đây là các best practice khi dùng **Pub/Sub** và **Streams** ở quy mô lớn.

> [!NOTE]
> Thiết kế tốt không phải là dùng nhiều tính năng, mà là **dùng chúng đúng chỗ**.

## 1. Chọn đúng công cụ

| Dùng Pub/Sub khi | Dùng Streams khi |
|---|---|
| Cập nhật real-time, độ trễ thấp | Cần lưu trữ tin nhắn |
| Không cần lịch sử | Xử lý tin cậy, có retry |
| Thông báo trực tiếp (chat, presence) | Background job, event pipeline |
| Fan-out tới nhiều subscriber | Nhiều consumer (worker group) |
| Chấp nhận thỉnh thoảng mất tin | Audit log, activity feed — **không được mất tin** |

📢 Pub/Sub: *"Fire and forget."* — 🗄️ Streams: *"Lưu, xử lý và không bao giờ mất sự kiện."*

## 2. Chiến lược đặt tên stream key

```text
orders                    # một stream duy nhất
orders:events             # theo domain
orders:{region}:events    # có hash tag (cho cluster)
user-activity
notifications
```

> [!TIP]
> Dùng **hash tag** (ví dụ `{region}`) khi chạy **Redis Cluster** để các key liên quan nằm cùng một shard.

- ❌ Tránh quá nhiều stream nhỏ (khó quản lý).
- ❌ Tránh để stream tăng không giới hạn.

## 3. Đặt chính sách retention

```bash
# Chỉ giữ 100,000 tin mới nhất
XTRIM orders MAXLEN 100000

# Trim xấp xỉ (nhanh hơn)
XTRIM orders MAXLEN ~ 100000

# Hoặc trim theo thời gian (giữ 7 ngày gần nhất)
XTRIM orders MINID ~ 1693440000000
```

Chọn retention dựa trên: use case, bộ nhớ có sẵn, yêu cầu tuân thủ và khoảng thời gian cần xử lý lại.

> [!TIP]
> Có thể trim ngay khi ghi: `XADD orders MAXLEN ~ 100000 * field value`.

## 4. Monitor stream & consumer

```bash
XLEN orders                          # độ dài stream
XPENDING orders orders-group         # tổng quan pending
XPENDING orders orders-group - + 10  # chi tiết pending
XINFO GROUPS orders                  # thông tin consumer group
XINFO STREAM orders                  # thông tin stream
```

Cần để ý:
- PEL tăng dần (consumer chậm)
- Tin bị kẹt (không ack)
- Consumer lag
- Độ dài stream (bộ nhớ)
- Consumer bị lỗi
- Số lần retry bất thường

> [!WARNING]
> Đặt **cảnh báo** trước khi mọi chuyện trở thành sự cố.

## 5. Đảm bảo Idempotency

Một tin **có thể được xử lý nhiều lần**, vì:
- Retry có thể gây trùng lặp
- `XAUTOCLAIM` có thể giao lại tin chưa xử lý xong
- Lỗi mạng dẫn tới xử lý lại

> [!TIP]
> Dùng **business key duy nhất** (ví dụ `orderId`) và đảm bảo logic xử lý là idempotent. Khi đó, delivery kiểu "at-least-once" không còn là vấn đề.

## 6. Scaling

**Scale dọc:**
- Bắt đầu với một Redis instance đủ mạnh
- Đủ bộ nhớ cho dữ liệu
- Theo dõi CPU và memory

**Scale ngang (Redis Cluster):**
- Dùng cluster để tăng throughput
- Dùng hash tag cho các key liên quan
- Phân bố stream key đều giữa các shard

**Throughput cao:**
- Nhiều consumer group, nhiều consumer
- Xử lý theo **batch**
- Giữ tin **nhỏ**
- Dùng **pipelining**
- Không xử lý nặng trong Redis (để worker làm)

> [!NOTE]
> Redis rất nhanh, nhưng **đừng block nó**. Hãy để phần việc nặng cho ứng dụng.

## 7. Bảo mật & phân quyền

```bash
# Bắt buộc xác thực
AUTH <password>

# Dùng ACL (Redis 6+)
ACL SETUSER app on >password +xadd +xread +xack ~orders:*

# Dùng TLS để mã hóa đường truyền
rediss://...
```

- Bật xác thực
- Dùng ACL với **quyền tối thiểu**
- Dùng TLS trong production
- Giới hạn truy cập mạng (VPC, firewall)
- Theo dõi access log
- Tách biệt môi trường dev/staging/prod

## 8. Những sai lầm thường gặp

- ❌ Dùng Pub/Sub cho sự kiện quan trọng (có thể mất tin)
- ❌ Không đặt retention (stream phình mãi)
- ❌ Không xử lý retry và lỗi
- ❌ Bỏ qua tin pending
- ❌ Chỉ dùng một consumer cho tải lớn
- ❌ Lưu tin quá lớn (nên < 10KB)
- ❌ Xử lý nặng trong Redis
- ❌ Không monitor sức khỏe stream
- ❌ Quên idempotency (xử lý trùng)
- ❌ Không có cảnh báo khi consumer lỗi hoặc PEL cao

> [!WARNING]
> Chạy ngon ở môi trường dev… nhưng **lên scale thì sao**? 💀

## Tổng kết

> [!NOTE]
> Hệ thống tin cậy không đến từ may mắn, mà từ **thói quen tốt**: lên kế hoạch, monitor, scale.

Bài tiếp theo: **Tổng kết series**.

*Tham khảo: Redis Series — Pub/Sub & Streams (@p4prateek.tech)*
