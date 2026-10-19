---
layout: Post
title: "Bài 15. Tổng kết & bước tiếp theo"
subtitle: "Redis từ cơ bản đến thực tế"
author: "Trần Hữu Đang"
date: "2026-10-19"
useHeaderImage: false
headerMask: "rgba(39, 77, 61, 0.61)"
permalinkPattern: /ebook/redis/:slug/
tags:
  - Redis
  - Pub/Sub
  - Streams
---

<!-- Nội dung:
- Bức tranh tổng thể về cả series.
- Tóm tắt Pub/Sub vs Streams.
- Code mẫu và hướng đi tiếp theo. -->

<!-- more -->

Chúng ta đã đi qua cấu trúc dữ liệu, caching, persistence, transaction, Pub/Sub, Streams, high availability, các pattern thực tế và best practice. Giờ là lúc **tổng kết** và xem tiếp theo nên làm gì!

## 1. Bức tranh tổng thể

| Thành phần | Mục đích |
|---|---|
| Data Structures | String, Hash, List, Set, Sorted Set, Bitmap, HyperLogLog, Geo |
| Caching | TTL, eviction policy, Cache-Aside, chống stampede/avalanche |
| Persistence | RDB snapshot + AOF log |
| Atomic nhiều lệnh | `MULTI/EXEC`, `WATCH`, Lua script, Functions |
| Pub/Sub | Real-time, fire and forget (broadcast) |
| Streams | Bền vững, tin cậy (event log, consumer group) |
| High Availability | Replication, Sentinel, Cluster (16384 hash slot) |
| Pattern thực tế | Rate limit, distributed lock, session, leaderboard, queue |

## 2. Pub/Sub vs Streams – tóm tắt nhanh

| Tiêu chí | Pub/Sub | Streams |
|---|---|---|
| Gửi tin | Broadcast tới subscriber đang hoạt động | Lưu vào log |
| Lịch sử | Không | Có |
| Acknowledgment | Không | Có (`XACK`) |
| Retry khi lỗi | Không (mất tin) | Có (`XPENDING` + `XCLAIM`) |
| Nhiều consumer | Có (cùng tin cho tất cả) | Có (cạnh tranh/song song) |
| Thứ tự | Best effort | Theo ID (trong mỗi stream) |
| Use case | Thông báo, chat, live update | Xử lý tin cậy, background job, audit |

## 3. Kiến trúc thực tế

```text
Producers                                 Consumers
- Web App     ──►  Redis Pub/Sub  ──►     - Notification Service
- Mobile App                              - Worker Service
- Services    ──►  Redis Streams  ──►     - Analytics Pipeline
- IoT Devices                             - Audit / Monitoring
```

> [!TIP]
> Nhiều hệ thống dùng **cả hai**: Pub/Sub cho trải nghiệm real-time, Streams cho xử lý bền vững.

## 4. Code mẫu (Python – redis-py)

```python
import redis

r = redis.Redis()

# Pub/Sub: publish
r.publish("chat:room1", "Hello, Redis!")

# Pub/Sub: subscribe
p = r.pubsub()
p.subscribe("chat:room1")
for message in p.listen():
    print(message)
```

```python
# Streams: thêm tin
r.xadd("orders", {"orderId": "123", "item": "laptop"})

# Streams: đọc với consumer group
messages = r.xreadgroup(
    groupname="workers",
    consumername="worker-1",
    streams={"orders": ">"},
    count=10,
)
```

## 5. Những điều cần nhớ

- Redis **nhanh** vì chạy trên RAM và thực thi lệnh trên một luồng — đừng chặn nó bằng lệnh chậm
- Chọn **đúng cấu trúc dữ liệu** là một nửa lời giải
- Cache luôn có **TTL**, đặt `maxmemory` và eviction policy phù hợp
- Production thường bật **RDB + AOF**, kèm backup và replica
- Transaction **không rollback**; cần atomic có điều kiện thì dùng **Lua**
- Pub/Sub = real-time, **không lưu trữ**
- Streams = **bền vững, tin cậy, mở rộng được**
- Dùng consumer group để xử lý song song
- Xử lý lỗi bằng `XPENDING`, `XCLAIM`, `XAUTOCLAIM`
- Đặt retention phù hợp (`XTRIM`)
- Thiết kế **idempotent**
- Monitor sức khỏe stream và consumer lag
- Chọn đúng công cụ cho đúng bài toán
- Tuân thủ các best practice về bảo mật

## 6. Tiếp theo làm gì?

- Xây một **app chat real-time** (Pub/Sub)
- Xây một **background job processor** (Streams)
- Viết một **rate limiter** và **distributed lock** có test kịch bản lỗi
- Dựng thử **Sentinel** và **Cluster** bằng Docker Compose, rồi kill master xem chuyện gì xảy ra
- Khám phá **Redis modules** (JSON, Search, Bloom filter)
- Tích hợp Redis vào dự án của bạn

> [!NOTE]
> Đừng chỉ học — hãy **build**. Đó là cách kiến thức ở lại lâu nhất! 🚀

## Tổng kết

Redis chỉ là một mảnh ghép, nhưng là một mảnh ghép **rất mạnh**. Hiểu rõ điểm mạnh và giới hạn của nó giúp bạn thiết kế hệ thống tốt hơn, bền vững hơn và dễ mở rộng hơn.

> [!TIP]
> Công cụ không tạo nên hệ thống tốt. **Con người** làm điều đó — với kiến thức đúng.

*Tham khảo: Redis Documentation, Redis Series (@p4prateek.tech)*
