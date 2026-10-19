---
layout: Post
title: "Bài 11. Xử lý lỗi & Retry"
subtitle: "Redis từ cơ bản đến thực tế"
author: "Trần Hữu Đang"
date: "2026-10-19"
useHeaderImage: false
headerMask: "rgba(39, 77, 61, 0.61)"
permalinkPattern: /ebook/redis/:slug/
tags:
  - Redis
  - Streams
  - Reliability
---

<!-- Nội dung:
- Chuyện gì xảy ra khi subscriber/consumer gặp sự cố.
- XPENDING, XCLAIM, XAUTOCLAIM.
- Retry pattern và Dead Letter Stream. -->

<!-- more -->

Trong hệ thống thật, lỗi mạng, consumer chết hay tải đột biến là chuyện thường ngày. Hãy xem **Pub/Sub** và **Streams** phản ứng ra sao, và cách xử lý lỗi, **retry**.

## 1. Pub/Sub – subscriber mất kết nối

```text
Publisher ── PUBLISH "order.created" ──► Redis (Pub/Sub) ──✗ Subscriber 1 (mất kết nối)
                                                         ──► Subscriber 2 (đang kết nối)
```

- ❌ Không buffer tin
- ❌ Không có lịch sử
- ❌ Không retry
- ❌ Tin **mất vĩnh viễn**

> [!WARNING]
> Chỉ dùng Pub/Sub cho cập nhật real-time **không quan trọng**, nơi việc thỉnh thoảng mất tin là chấp nhận được.

## 2. Streams – consumer bị crash

Nếu consumer không ack, tin vẫn nằm trong **Pending Entries List (PEL)**.

```text
Producer ── XADD orders {...} ──► Redis (Streams) ──► Consumer Group (order-workers)
                                                       - Worker 1 (crashed) ✗
                                                       - Worker 2 (healthy)
PEL: ID 1725350000000-0 | consumer: worker-1 | status: pending
```

> [!NOTE]
> Tin **không bị mất**! Nó nằm trong PEL cho đến khi được ack hoặc được **consumer khác claim**.

## 3. Kiểm tra tin pending – `XPENDING`

```bash
127.0.0.1:6379> XPENDING orders order-group
1) (integer) 3              # tổng số pending
2) "1725350000000-0"        # ID nhỏ nhất
3) "1725350001000-0"        # ID lớn nhất
4) 1) 1) "worker-1"         # theo từng consumer
      2) "3"
```

Cho biết tổng số pending, khoảng ID và số tin mỗi consumer chưa ack.

## 4. Claim tin pending – `XCLAIM`

```bash
127.0.0.1:6379> XCLAIM orders order-group worker-2 60000 1725350000000-0
1) 1) "1725350000000-0"
   2) 1) "user"
      2) "1"
      3) "action"
      4) "signup"
```

Claim tin đã idle hơn 60 giây của `worker-1` và giao cho `worker-2`.

## 5. Auto-claim – `XAUTOCLAIM`

```bash
# Redis 6.2+
127.0.0.1:6379> XAUTOCLAIM orders order-group worker-2 60000 0 COUNT 10
1) "1725350001000-0"           # ID bắt đầu lần quét tiếp theo
2) 1) 1) "1725350000000-0"
      2) 1) "user"
         2) "1"
         3) "action"
         4) "signup"
   2) 1) "1725350000100-0"
      2) 1) "user"
         2) "2"
         3) "action"
         4) "purchase"
3) (empty array)
```

Tự động claim các tin idle và tiếp tục quét từ ID cuối cùng.

> [!TIP]
> Dùng `XAUTOCLAIM` trong production để đơn giản hóa logic retry.

## 6. Retry pattern trong worker

```text
XREADGROUP (đọc tin mới)
        ↓
Xử lý tin (business logic)
        ↓
   Thành công? ── Có ──► XACK
        │
       Không
        ↓
Để nguyên trong PEL ──► Retry sau (qua XAUTOCLAIM)
```

- Xử lý **idempotent**
- Retry với **backoff**
- Theo dõi kích thước PEL (`XPENDING`)
- Cảnh báo khi pending cao
- Dùng dead-letter stream cho poison message

## 7. Dead Letter Stream (DLQ)

Với những tin **lỗi lặp đi lặp lại**, chuyển chúng sang DLQ:

```bash
# Sau N lần thất bại, chuyển sang DLQ
127.0.0.1:6379> XADD orders-dlq * original_id 1725350000000-0 error "Invalid data" payload "{...}"
```

Giữ stream chính sạch sẽ và cho phép kiểm tra, xử lý tin lỗi riêng.

> [!NOTE]
> Để biết một tin đã bị giao bao nhiêu lần, xem cột **delivery count** trong kết quả `XPENDING <stream> <group> - + <count>`.

## Tổng kết

> [!NOTE]
> - Pub/Sub **không retry** — subscriber chết là mất tin.
> - Streams giữ tin chưa ack trong **PEL**.
> - `XPENDING` để theo dõi, `XCLAIM` / `XAUTOCLAIM` để retry.
> - Consumer phải **idempotent**, có **DLQ** cho poison message.
> - Xử lý lỗi không phải việc làm sau — nó là **một phần cốt lõi** của thiết kế.

Bài tiếp theo: **Replication, Sentinel và Cluster**.

*Tham khảo: Redis Series — Pub/Sub & Streams (@p4prateek.tech)*
