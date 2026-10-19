---
layout: Post
title: "Bài 7. Redis Streams cơ bản"
subtitle: "Redis từ cơ bản đến thực tế"
author: "Trần Hữu Đang"
date: "2026-10-19"
useHeaderImage: false
headerMask: "rgba(39, 77, 61, 0.61)"
permalinkPattern: /ebook/redis/:slug/
tags:
  - Redis
  - Streams
---

<!-- Nội dung:
- Streams là gì, cấu trúc dữ liệu.
- XADD, XREAD, XRANGE, XLEN, XINFO.
- Xóa và trim stream. -->

<!-- more -->

Redis Streams là cấu trúc dữ liệu dạng **append-only log**, lưu tin nhắn trong bộ nhớ (và có thể persist xuống đĩa). Mỗi tin có một **ID duy nhất** và có thể được đọc bởi **nhiều consumer**, kể cả **sau khi** đã được publish.

> [!NOTE]
> Khác với Pub/Sub, Streams **giữ lại** tin nhắn, nên bạn có thể đọc lại sau!

## 1. Streams là gì?

- Một **log chỉ ghi thêm** (append-only)
- Mỗi tin có một **ID duy nhất**
- Tin được **lưu lại**, có thể đọc sau
- Hỗ trợ **nhiều consumer**
- Thiết kế cho xử lý sự kiện **tin cậy** và **mở rộng được**
- Lý tưởng cho background job, event sourcing, activity feed...

> [!TIP]
> Hãy coi nó như **một message queue bền vững** nằm ngay trong Redis!

## 2. Cấu trúc dữ liệu

Stream `orders`:

| 1725350000000-0 | 1725350001000-0 | 1725350002000-0 | … |
|---|---|---|---|
| user: 1 | user: 2 | user: 3 | |
| action: signup | action: purchase | action: logout | |

- Tin được lưu **theo thứ tự ID**.
- Mỗi tin có ID dạng `timestamp-sequence` và một tập **field-value**.

## 3. Thêm tin – `XADD`

```bash
# Thêm tin vào stream "orders"
127.0.0.1:6379> XADD orders * user 1 action signup
"1725350000000-0"

# Thêm tin khác
127.0.0.1:6379> XADD orders * user 2 action purchase
"1725350001000-0"
```

Dùng `*` để Redis tự sinh ID dựa trên timestamp hiện tại.

## 4. Đọc tin – `XREAD`

```bash
# Đọc tất cả tin từ đầu
127.0.0.1:6379> XREAD STREAMS orders 0

# Chỉ đọc tin mới (chờ tối đa 5 giây)
127.0.0.1:6379> XREAD BLOCK 5000 STREAMS orders $
```

Dùng `0` để đọc từ đầu, `$` để chỉ đọc tin mới.

Kết quả ví dụ:

```text
1) 1) "orders"
   2) 1) 1) "1725350000000-0"
         2) 1) "user"
            2) "1"
            3) "action"
            4) "signup"
```

> [!TIP]
> `XREAD` có thể **block** và chờ tin mới!

## 5. Đọc theo khoảng – `XRANGE` / `XREVRANGE`

```bash
# Đọc từ đầu đến cuối
127.0.0.1:6379> XRANGE orders - +

# Đọc 2 tin mới nhất (thứ tự ngược)
127.0.0.1:6379> XREVRANGE orders + - COUNT 2
```

`XRANGE` đi **xuôi** theo thời gian, `XREVRANGE` để lấy các tin **mới nhất**.

## 6. Độ dài & thông tin stream

```bash
# Số lượng tin
127.0.0.1:6379> XLEN orders
(integer) 3

# Thông tin stream
127.0.0.1:6379> XINFO STREAM orders
1) "length"
2) (integer) 3
3) "first-entry"
4) 1) "1725350000000-0"
   2) 1) "user"
      2) "1"
      3) "action"
      4) "signup"
5) "last-entry"
6) 1) "1725350002000-0"
   2) 1) "user"
      2) "3"
      3) "action"
      4) "logout"
...
```

`XINFO` cho biết số lượng tin, tin đầu/cuối và nhiều thông tin khác — rất hữu ích để **monitor** và **debug**.

## 7. Xóa tin – `XDEL`

```bash
# Xóa một tin theo ID
127.0.0.1:6379> XDEL orders 1725350000000-0
(integer) 1
```

> [!NOTE]
> Thường thì bạn **không xóa tay** từng tin. Hãy dùng **trimming** (`XTRIM`) thay thế.

## 8. Cắt bớt stream – `XTRIM`

Giữ lại các tin gần đây để kiểm soát bộ nhớ:

```bash
# Chỉ giữ 100 tin mới nhất
127.0.0.1:6379> XTRIM orders MAXLEN 100
(integer) 0
```

> [!WARNING]
> Với hệ thống chạy lâu dài, đây là bước **bắt buộc** để tránh stream phình to không giới hạn.

## Tổng kết

> [!NOTE]
> Streams biến sự kiện thành cơ hội — vì **không có gì bị mất**.

Bài tiếp theo: **Consumer Groups** — nhiều consumer cùng xử lý một stream.

*Tham khảo: Redis Series — Pub/Sub & Streams (@p4prateek.tech)*
