---
layout: Post
title: "Bài 9. Pub/Sub vs Streams"
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
- So sánh Pub/Sub và Streams.
- Khi nào dùng Pub/Sub, khi nào dùng Streams.
- Ví dụ đời thường. -->

<!-- more -->

Cả Pub/Sub và Streams đều hữu ích, nhưng chúng giải quyết **những bài toán khác nhau**. Hãy đặt chúng cạnh nhau để so sánh.

> [!NOTE]
> Đừng học thuộc lòng — hãy **hiểu sự khác biệt**.

## 1. Pub/Sub — phát sóng real-time

```text
Publisher ── PUBLISH (channel, message) ──► Redis (Pub/Sub) ──► Subscriber 1
                                                            ──► Subscriber 2
                                                            ──► Subscriber 3
```

Tin được đẩy ngay tới mọi subscriber đang hoạt động. Subscriber nào không kết nối thì tin **bị mất**.

## 2. Streams — log bền vững

```text
Producer ── XADD (stream, data) ──► Redis (Streams) ──► Consumer Group: Consumer 1
                                                                        Consumer 2
                                                                        Consumer 3
```

Tin được lưu vào **log**. Consumer đọc theo tốc độ của mình, có **ack**, **retry** và **lịch sử**.

## 3. Bảng so sánh

| Tiêu chí | Pub/Sub | Streams |
|---|---|---|
| Lưu trữ tin | ❌ Không (fire and forget) | ✅ Có (trong bộ nhớ, có thể persist) |
| Lịch sử tin | ❌ Không | ✅ Có (đọc lại tin cũ) |
| Mô hình gửi | Broadcast tới mọi subscriber | Phân phối (qua consumer group) |
| Acknowledgment | ❌ Không | ✅ Có (`XACK`) |
| Retry khi lỗi | ❌ Không (mất tin) | ✅ Có (PEL, `XCLAIM`) |
| Nhiều consumer | ✅ Tất cả nhận cùng tin | ✅ Cạnh tranh hoặc song song qua group |
| Thứ tự | Best effort (theo kết nối) | Theo ID (trong mỗi stream) |
| Use case | Thông báo, chat, live update | Xử lý sự kiện tin cậy, background job, activity feed |
| Bộ nhớ | Thấp (không lưu) | Cao hơn (lưu tin, có thể trim) |
| Cấu trúc | Channel (in-memory) | Stream (append-only log) |

## 4. Khi nào dùng Pub/Sub?

- Thông báo real-time (live chat, typing indicator)
- Cập nhật trực tiếp (giá cổ phiếu)
- Trạng thái online/offline
- Fan-out tới nhiều service
- Khi **chấp nhận được** việc thỉnh thoảng mất tin
- Giao tiếp đơn giản, độ trễ thấp

> [!TIP]
> Dùng Pub/Sub khi bạn chỉ quan tâm đến **gửi tức thì**, không cần độ bền.

## 5. Khi nào dùng Streams?

- Cần **lưu trữ** tin nhắn
- Xử lý **background job**
- Xử lý sự kiện **tin cậy**
- Activity feed, audit log
- Chịu tải đột biến với nhiều worker
- Cần **retry** và khôi phục khi lỗi
- Xây hệ thống mở rộng với consumer group

> [!TIP]
> Dùng Streams khi bạn **không thể để mất tin** và cần xử lý tin cậy, mở rộng được.

## 6. Ví dụ đời thường

📢 **Pub/Sub = Loa thông báo ở sân vận động**
- Ai có mặt lúc đó thì nghe được.
- Không có mặt là lỡ mất.

📦 **Streams = Hộp thư / To-do list**
- Tin nằm trong hộp thư cho đến khi bạn đọc.
- Bạn có thể lấy sau.
- Có thể xác nhận, retry và đảm bảo không mất gì.

## Tổng kết

> [!NOTE]
> Real-time thì tuyệt. **Tin cậy** còn tuyệt hơn.

Bài tiếp theo: **Các kiến trúc thực tế** với Pub/Sub và Streams.

*Tham khảo: Redis Series — Pub/Sub & Streams (@p4prateek.tech)*
