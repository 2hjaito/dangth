---
layout: Post
title: "Bài 1. Redis là gì? Vì sao nó nhanh?"
subtitle: "Redis từ cơ bản đến thực tế"
author: "Trần Hữu Đang"
date: "2026-10-19"
useHeaderImage: false
headerMask: "rgba(39, 77, 61, 0.61)"
permalinkPattern: /ebook/redis/:slug/
tags:
  - Redis
  - NoSQL
  - Cache
---

<!-- Nội dung:
- Redis là gì, dùng để làm gì.
- Vì sao Redis nhanh, mô hình single-thread.
- Khi nào không nên dùng Redis, cài đặt và lệnh đầu tiên. -->

<!-- more -->

## 1. Đôi nét về Redis

> [!NOTE]
> - **Redis** (REmote DIctionary Server) là một **in-memory data store** dạng **key-value**.
> - Dữ liệu nằm chủ yếu trên **RAM**, nên đọc/ghi chỉ mất cỡ **dưới 1 mili giây**.
> - Không chỉ lưu chuỗi, Redis hỗ trợ nhiều **cấu trúc dữ liệu**: String, Hash, List, Set, Sorted Set, Stream, Bitmap, HyperLogLog, Geo...

Redis thường được biết đến như một **cache**, nhưng thực tế nó còn được dùng làm:

| Vai trò | Ví dụ |
|---|---|
| Cache | Cache kết quả query DB, response API |
| Session store | Lưu session đăng nhập của user |
| Message broker | Pub/Sub, Streams, job queue |
| Rate limiter | Giới hạn số request mỗi user |
| Leaderboard | Bảng xếp hạng game theo thời gian thực |
| Distributed lock | Đảm bảo chỉ một worker xử lý một task |
| Real-time analytics | Đếm lượt xem, user online, unique visitor |

## 2. Vì sao Redis nhanh?

1. **Chạy trên RAM** — truy cập RAM nhanh hơn ổ đĩa hàng nghìn lần.
2. **Thực thi lệnh trên một luồng** — không cần lock, không tốn chi phí context switch giữa các thread.
3. **I/O multiplexing** (epoll/kqueue) — một luồng vẫn phục vụ được hàng chục nghìn kết nối cùng lúc.
4. **Cấu trúc dữ liệu được tối ưu** ở mức C — phần lớn thao tác có độ phức tạp **O(1)** hoặc **O(log N)**.
5. **Giao thức đơn giản** (RESP) — parse rất nhẹ.

> [!TIP]
> "Single-thread" ở đây là **việc thực thi lệnh**. Từ Redis 6, có thể bật **I/O threads** để đọc/ghi socket song song, nhưng các lệnh vẫn được chạy tuần tự. Nhờ vậy mỗi lệnh là **atomic** — không có hai lệnh nào chạy chen vào nhau.

> [!WARNING]
> Mặt trái của single-thread: **một lệnh chậm sẽ chặn tất cả** các client khác. Tránh `KEYS *`, `FLUSHALL`, hay `SMEMBERS`/`HGETALL` trên key khổng lồ trong production.

## 3. Khi nào không nên dùng Redis?

- Dữ liệu **quá lớn** so với RAM (RAM đắt hơn ổ đĩa rất nhiều).
- Cần **ACID đầy đủ** và transaction phức tạp có rollback.
- Cần **truy vấn phức tạp**: JOIN, filter nhiều điều kiện, aggregation — đó là việc của SQL hoặc search engine.
- Dữ liệu là **nguồn sự thật duy nhất** mà không thể chấp nhận mất dù chỉ một giây.

> [!NOTE]
> Redis thường đứng **bên cạnh** database chính (PostgreSQL, MySQL, MongoDB...), không thay thế nó.

## 4. Redis vs Memcached vs MongoDB

| | Redis | Memcached | MongoDB |
|---|---|---|---|
| Lưu ở đâu | RAM (có persistence) | RAM (không persistence) | Ổ đĩa (có cache trên RAM) |
| Kiểu dữ liệu | Rất nhiều cấu trúc | Chỉ string | Document (JSON/BSON) |
| Persistence | RDB, AOF | Không | Có |
| Replication / Cluster | Có | Không có sẵn | Có |
| Dùng cho | Cache, queue, real-time | Cache đơn giản | Database chính |

## 5. Chạy Redis và lệnh đầu tiên

Cách nhanh nhất là dùng Docker:

```bash
docker run -d --name redis -p 6379:6379 redis:7
docker exec -it redis redis-cli
```

Thử vài lệnh cơ bản:

```bash
127.0.0.1:6379> PING
PONG
127.0.0.1:6379> SET greeting "Xin chào Redis"
OK
127.0.0.1:6379> GET greeting
"Xin chào Redis"
127.0.0.1:6379> SET otp:42 "123456" EX 60   # tự hết hạn sau 60 giây
OK
127.0.0.1:6379> TTL otp:42
(integer) 58
```

> [!TIP]
> Đặt tên key theo kiểu `object:id:field` (ví dụ `user:42:profile`) để dễ đọc, dễ quản lý và dễ debug.

## Tổng kết

> [!NOTE]
> Redis **nhanh** vì chạy trên RAM và thực thi lệnh trên một luồng, **linh hoạt** nhờ nhiều cấu trúc dữ liệu, và là **mảnh ghép quen thuộc** trong hầu hết hệ thống backend hiện đại.

Trong series này, chúng ta sẽ lần lượt đi qua: **Cấu trúc dữ liệu → Caching → Persistence → Transaction & Lua → Pub/Sub → Streams → Consumer Groups → Pub/Sub vs Streams → Kiến trúc thực tế → Xử lý lỗi → High Availability → Pattern thực tế → Best Practices**.

*Tham khảo: Redis Documentation, Redis Series (@p4prateek.tech)*
