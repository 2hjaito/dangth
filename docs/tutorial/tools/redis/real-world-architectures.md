---
layout: Post
title: "Bài 10. Kiến trúc thực tế"
subtitle: "Redis từ cơ bản đến thực tế"
author: "Trần Hữu Đang"
date: "2026-10-19"
useHeaderImage: false
headerMask: "rgba(39, 77, 61, 0.61)"
permalinkPattern: /ebook/redis/:slug/
tags:
  - Redis
  - System Design
---

<!-- Nội dung:
- Live chat, notification với Pub/Sub.
- Background job, activity feed, event pipeline với Streams.
- Kiến trúc hybrid và lưu ý khi scale. -->

<!-- more -->

Cùng xem Pub/Sub và Streams được dùng trong hệ thống thật như thế nào, và cách thiết kế chúng cho **scale**, **độ tin cậy** và **production**.

## 1. Live Chat (Pub/Sub)

Gửi tin real-time, độ trễ thấp.

```text
Web App (user 1)    ── PUBLISH chat:room1 "Hello!" ──►            ──► User 1
Mobile App (user 2) ─────────────────────────────────► Redis      ──► User 2   Các client
Web App (user 3)    ── PUBLISH chat:room1 "Hello!" ──► (Pub/Sub)  ──► User 3   đang subscribe room1
```

- Phù hợp cho live chat, typing indicator, presence.
- User offline sẽ **mất tin** (cần lịch sử thì dùng Streams).

## 2. Notifications (Pub/Sub)

Broadcast sự kiện real-time tới nhiều service.

```text
Event Producers                                          Service quan tâm
- Order Service                                          - Email Service
- Payment Service  ── PUBLISH notifications ──► Redis ──► - SMS Service
- User Service        "order.created"         (Pub/Sub)  - Push Service
- Inventory Service                                      - Analytics
```

> [!TIP]
> Dùng Pub/Sub cho fan-out real-time khi độ bền **không quá quan trọng**: thông báo UI, invalidate cache, dashboard trực tiếp.

## 3. Background Job (Streams)

Xử lý tin cậy, mở rộng được và có thể retry.

```text
Producers (Web App, Services)                       Consumer Group (workers)
- New Signup                                        - Worker 1
- Image Processing  ── XADD jobs {...} ──► Redis ──► - Worker 2
- Report Generation                      (Streams)  - Worker 3
```

- Tin được lưu lại và xử lý bởi các worker.
- Worker lỗi thì worker khác có thể **claim** tin (`XCLAIM`).

## 4. Activity Feed (Streams)

Lưu hoạt động người dùng và cho phép replay.

```text
User Actions                                                   Consumers
- Post created                                                 - Feed Service
- Comment added  ── XADD activity (userId, type, ...) ──► Redis ──► - Recommendation
- User followed                                     (Streams)  - Analytics
- Like on post                                                 - Notification
```

> [!TIP]
> Streams giữ lịch sử, nên bạn có thể **replay** để dựng dữ liệu phái sinh: tạo feed, chạy analytics, xử lý lại.

## 5. Event Pipeline giữa các Microservice (Streams)

```text
Services                                                          Consumer Groups
- Order Service                                                   - Inventory Service
- Payment Service   ── XADD domain-events (eventType, data) ──► Redis ──► - Notification Service
- Warehouse Service                                      (Streams)        - Audit Service
                                                                          - Search Indexer
```

- Dùng Streams cho sự kiện liên service khi **độ bền** và **retry** quan trọng.
- Mỗi service xử lý sự kiện **độc lập**, theo tốc độ riêng.

## 6. Kiến trúc Hybrid (Pub/Sub + Streams)

```text
Event Source (Order Created) ──► Redis (Pub/Sub)  ──► Cập nhật UI real-time (user đang online)
                             └─► Redis (Streams)  ──► Xử lý nền tin cậy (worker, analytics)
```

> [!NOTE]
> Pattern phổ biến: **Pub/Sub** cho trải nghiệm real-time, **Streams** cho xử lý bền vững.

## 7. Lưu ý khi scale

- Dùng **Redis Cluster** để scale ngang
- Giữ **kích thước tin nhỏ**
- Dùng nhiều consumer group để scale worker
- Theo dõi pending entries (`XPENDING`)
- Đặt chính sách retention (`XTRIM`)
- Dùng **connection pooling**
- Xử lý **backpressure** (consumer chậm)

## 8. Mẹo cho production

- Đặt retention phù hợp (theo thời gian/kích thước)
- Theo dõi consumer lag (`XPENDING`)
- Dùng `XAUTOCLAIM` cho consumer bị lỗi
- Xử lý **idempotent**
- Dùng **dead-letter stream** cho poison message
- Đặt cảnh báo khi pending tăng cao
- **Test kịch bản lỗi** (kill worker, lỗi mạng)

> [!WARNING]
> Hãy thiết kế cho **lúc lỗi**, không chỉ cho happy path.

## Tổng kết

> [!NOTE]
> Từ live update đến pipeline bền vững — Redis đều phù hợp, **nếu bạn thiết kế đúng**.

Bài tiếp theo: **Xử lý lỗi & Retry**.

*Tham khảo: Redis Series — Pub/Sub & Streams (@p4prateek.tech)*
