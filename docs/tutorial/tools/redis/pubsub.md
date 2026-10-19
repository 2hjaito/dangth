---
layout: Post
title: "Bài 6. Redis Pub/Sub"
subtitle: "Redis từ cơ bản đến thực tế"
author: "Trần Hữu Đang"
date: "2026-10-19"
useHeaderImage: false
headerMask: "rgba(39, 77, 61, 0.61)"
permalinkPattern: /ebook/redis/:slug/
tags:
  - Redis
  - Pub/Sub
---

<!-- Nội dung:
- Pub/Sub là gì, cách hoạt động bên trong.
- SUBSCRIBE, PUBLISH, PSUBSCRIBE.
- Đặc điểm, use case và giới hạn. -->

<!-- more -->

Redis Pub/Sub cho phép client **publish** tin nhắn vào một **channel**, và tất cả client đang **subscribe** channel đó nhận được tin **ngay lập tức**.

```text
Publishers                                        Subscribers
App 1  ── PUBLISH events "OrderCreated"   ──►            ──► Subscriber 1 (Web App)
Server ── PUBLISH events "UserSignedUp"   ──►  Redis     ──► Subscriber 2 (Worker)
Mobile ── PUBLISH events "ProductUpdated" ──►  "events"  ──► Subscriber 3 (Mobile App)
```

## 1. Pub/Sub là gì?

> [!NOTE]
> - Một **mô hình nhắn tin**: client **publish** tin vào channel, hoặc **subscribe** channel để nhận tin.
> - Mọi subscriber đang kết nối đều nhận tin theo thời gian thực.
> - Là **fire-and-forget**: không lưu trữ, không có acknowledgment.

> [!TIP]
> Hãy hình dung nó như **loa phát thanh** — ai đang nghe thì nhận được, ai không có mặt thì lỡ mất! 📢

## 2. Ví dụ lệnh

```bash
# Terminal 1 - Subscriber
127.0.0.1:6379> SUBSCRIBE events
Reading messages... (press Ctrl-C to quit)
1) "subscribe"
2) "events"
3) (integer) 1
```

```bash
# Terminal 2 - Publisher
127.0.0.1:6379> PUBLISH events "OrderCreated:123"
(integer) 1
```

`(integer) 1` là số subscriber đã nhận được tin. Ở Terminal 1:

```bash
1) "message"
2) "events"
3) "OrderCreated:123"
```

## 3. Bên trong Redis diễn ra gì?

Redis giữ một **bảng ánh xạ in-memory** từ channel tới các kết nối đang subscribe:

```text
Channels
  events -> [client1, client2, client3]
  orders -> [client4]
```

1. Client gửi `PUBLISH`.
2. Redis tra danh sách subscriber của channel.
3. Redis ghi tin vào buffer kết nối của từng subscriber.
4. Subscriber nhận tin qua kết nối TCP đang mở.
5. Sau khi gửi, tin **không được lưu lại** ở đâu cả.

Độ phức tạp là **O(N + M)** với N là số subscriber của channel và M là số pattern đang được subscribe.

## 4. Subscribe nhiều channel và theo pattern

```bash
# Nhiều channel trên cùng một kết nối
SUBSCRIBE events orders

# Theo pattern (wildcard)
127.0.0.1:6379> PSUBSCRIBE news.*
1) "psubscribe"
2) "news.*"
3) (integer) 1

1) "pmessage"
2) "news.*"
3) "news.sports"
4) "Match started!"
```

`PSUBSCRIBE` hữu ích khi có nhiều **channel động** (theo user, theo topic...).

> [!NOTE]
> Khi đã vào chế độ subscribe, kết nối đó (với RESP2) chỉ được dùng các lệnh subscribe/unsubscribe/ping. Ứng dụng thường dùng **một kết nối riêng** cho Pub/Sub.

## 5. Use case phổ biến

- 💬 Chat real-time, typing indicator
- 🔔 Thông báo trong ứng dụng
- 📊 Dashboard trực tiếp, giá cổ phiếu, tỉ số
- 👥 Presence (online/offline)
- 🧹 **Invalidate cache** đồng loạt trên nhiều instance ứng dụng
- 🔌 Đồng bộ WebSocket giữa nhiều server (mỗi server subscribe, nhận tin rồi đẩy xuống client của mình)

## 6. Giới hạn quan trọng

- ❌ **Không lưu** tin — subscriber mất kết nối là **mất tin** trong khoảng đó
- ❌ Không có acknowledgment, không retry
- ❌ Không phù hợp cho workflow quan trọng cần độ bền
- ❌ Subscriber chậm làm buffer phình to — Redis sẽ **ngắt kết nối** nếu vượt `client-output-buffer-limit`

> [!TIP]
> Cần **lưu trữ**, **replay** hoặc **xử lý tin cậy**? Hãy dùng **Redis Streams** — chủ đề của bài tiếp theo.

## Tổng kết

> [!NOTE]
> Pub/Sub **nhanh, đơn giản, real-time** — nhưng giống một buổi hòa nhạc trực tiếp: **không có mặt là bỏ lỡ**.

Bài tiếp theo: **Redis Streams cơ bản**.

*Tham khảo: Redis Series — Pub/Sub & Streams (@p4prateek.tech)*
