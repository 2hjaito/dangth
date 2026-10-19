---
layout: Post
title: "Bài 8. Redis Streams Consumer Groups"
subtitle: "Redis từ cơ bản đến thực tế"
author: "Trần Hữu Đang"
date: "2026-10-19"
useHeaderImage: false
headerMask: "rgba(39, 77, 61, 0.61)"
permalinkPattern: /ebook/redis/:slug/
tags:
  - Redis
  - Streams
  - Consumer Group
---

<!-- Nội dung:
- Consumer Group là gì, cách hoạt động.
- XGROUP, XREADGROUP, XACK, XPENDING.
- Claim tin bị kẹt với XCLAIM / XAUTOCLAIM. -->

<!-- more -->

Consumer Group cho phép **nhiều consumer làm việc cùng nhau**, trong đó **mỗi tin chỉ được giao cho một consumer** trong nhóm, kèm hỗ trợ **acknowledgment** và **retry**.

> [!NOTE]
> Nhiều worker. Một đội. Không mất tin nào!

## 1. Consumer Group là gì?

- **Phân phối** tin cho nhiều consumer
- Mỗi tin chỉ được giao cho **đúng một** consumer trong nhóm
- **Theo dõi** các tin đang chờ (chưa được ack)
- Hỗ trợ **retry** khi consumer gặp lỗi
- Lý tưởng để xây dựng hệ thống xử lý nền **tin cậy và mở rộng được**

> [!TIP]
> Giống như một team: mỗi task được **một thành viên** nhận, được theo dõi và hoàn thành.

## 2. Cách hoạt động

```text
Producer ── XADD ──► Redis Stream (orders)
                     [ID:1][ID:2][ID:3][ID:4][ID:5]
                        │ ID:1 → Consumer 1  ┐
                        │ ID:2 → Consumer 2  ├ Consumer Group
                        │ ID:3 → Consumer 3  ┘ (order-processors)
```

Mỗi tin chỉ được giao cho **một consumer** trong nhóm (không phải tất cả).

## 3. Tạo Consumer Group – `XGROUP`

```bash
127.0.0.1:6379> XGROUP CREATE orders order-group 0
OK
```

`0` nghĩa là **đọc từ đầu stream**. Dùng `$` để chỉ đọc tin mới.

## 4. Đọc tin với tư cách consumer – `XREADGROUP`

```bash
127.0.0.1:6379> XREADGROUP GROUP order-group consumer-1 COUNT 2 STREAMS orders >
```

`>` nghĩa là chỉ đọc tin **mới** (chưa giao cho consumer nào khác).

## 5. Xác nhận đã xử lý – `XACK`

```bash
127.0.0.1:6379> XACK orders order-group 1725350000000-0
(integer) 1
```

Sau khi được ack, tin sẽ bị xóa khỏi **Pending Entries List (PEL)**.

## 6. Pending Entries List (PEL)

Theo dõi các tin chưa được ack:

```bash
127.0.0.1:6379> XPENDING orders order-group
1) (integer) 2              # tổng số tin pending
2) "1725350000000-0"        # ID nhỏ nhất
3) "1725350001000-0"        # ID lớn nhất
4) 1) 1) "consumer-1"       # theo từng consumer
      2) "2"
```

Tin nằm trong PEL cho đến khi được ack. Nếu một consumer bị crash, consumer khác có thể **claim** chúng.

## 7. Claim tin bị kẹt – `XCLAIM`

```bash
# Claim tin đã idle hơn 60 giây
127.0.0.1:6379> XCLAIM orders order-group consumer-2 60000 1725350000000-0
1) 1) "1725350000000-0"
   2) 1) "user"
      2) "1"
      3) "action"
      4) "signup"
```

`60000` = 60 giây (thời gian idle tối thiểu).

## 8. `XAUTOCLAIM` – retry đơn giản hơn

Từ Redis 6.2+, `XAUTOCLAIM` tự động claim và trả về các tin pending:

```bash
127.0.0.1:6379> XAUTOCLAIM orders order-group consumer-2 60000 0 COUNT 10
1) "1725350001000-0"          # ID bắt đầu cho lần quét tiếp theo
2) 1) 1) "1725350000000-0"
      2) 1) "user"
         2) "1"
         3) "action"
         4) "signup"
3) (empty array)              # không có ID nào bị xóa
```

## 9. Nhiều consumer cùng chạy

```bash
# Terminal 1
XREADGROUP GROUP order-group consumer-1 COUNT 1 STREAMS orders >

# Terminal 2
XREADGROUP GROUP order-group consumer-2 COUNT 1 STREAMS orders >
```

Các tin được **chia đều** cho các consumer — mỗi tin chỉ tới **một** consumer.

## Tổng kết

> [!NOTE]
> - Consumer Group giúp xử lý **mở rộng được** và **tin cậy**.
> - Mỗi tin chỉ giao cho **một** consumer.
> - `XACK` để xác nhận, `XPENDING` để theo dõi, `XCLAIM` / `XAUTOCLAIM` để retry.
> - Luôn xử lý lỗi và đảm bảo **idempotent**.

Lỗi luôn xảy ra — hệ thống tốt là hệ thống **tiếp tục được từ chỗ đã dừng**.

Bài tiếp theo: **So sánh Pub/Sub và Streams**.

*Tham khảo: Redis Series — Pub/Sub & Streams (@p4prateek.tech)*
