---
layout: Post
title: "Bài 4. Persistence: RDB và AOF"
subtitle: "Redis từ cơ bản đến thực tế"
author: "Trần Hữu Đang"
date: "2026-10-19"
useHeaderImage: false
headerMask: "rgba(39, 77, 61, 0.61)"
permalinkPattern: /ebook/redis/:slug/
tags:
  - Redis
  - Persistence
---

<!-- Nội dung:
- RDB snapshot hoạt động thế nào.
- AOF và các chế độ fsync.
- So sánh và cách chọn cấu hình. -->

<!-- more -->

Redis lưu dữ liệu trên RAM — vậy tắt server thì sao? Redis có hai cơ chế để ghi dữ liệu xuống đĩa: **RDB** và **AOF**.

## 1. RDB — Snapshot

RDB chụp **toàn bộ dữ liệu** tại một thời điểm và ghi ra file `dump.rdb`.

```bash
# redis.conf — tạo snapshot nếu thỏa một trong các điều kiện
save 3600 1      # sau 3600 giây nếu có ít nhất 1 thay đổi
save 300 100     # sau 300 giây nếu có ít nhất 100 thay đổi
save 60 10000    # sau 60 giây nếu có ít nhất 10000 thay đổi
```

```bash
BGSAVE           # tạo snapshot thủ công ở background
LASTSAVE         # thời điểm snapshot gần nhất
```

**Cách hoạt động:** Redis `fork()` ra một tiến trình con. Tiến trình con ghi snapshot xuống đĩa, tiến trình cha vẫn phục vụ client bình thường. Nhờ cơ chế **copy-on-write**, hai tiến trình dùng chung bộ nhớ, chỉ trang nào bị sửa mới được sao chép.

- ✅ File gọn, khôi phục **rất nhanh**, dễ backup
- ❌ Có thể **mất dữ liệu** giữa hai lần snapshot (vài phút)
- ❌ `fork()` trên dataset lớn có thể gây giật ngắn

## 2. AOF — Append Only File

AOF ghi lại **mọi lệnh ghi** vào file log. Khi khởi động, Redis chạy lại các lệnh đó để dựng lại dữ liệu.

```bash
# redis.conf
appendonly yes
appendfsync everysec
```

| `appendfsync` | Hành vi | Mất tối đa |
|---|---|---|
| `always` | fsync sau **mỗi lệnh** | Gần như không mất, nhưng chậm |
| `everysec` | fsync **mỗi giây** (mặc định) | ~1 giây dữ liệu |
| `no` | Để hệ điều hành tự quyết | Vài chục giây |

AOF sẽ phình to theo thời gian, nên Redis có **AOF rewrite**: viết lại file với số lệnh tối thiểu để ra cùng trạng thái (ví dụ 100 lệnh `INCR` gộp thành một `SET`).

```bash
BGREWRITEAOF     # rewrite thủ công
```

- ✅ Bền hơn RDB, mất tối đa ~1 giây với `everysec`
- ❌ File lớn hơn, khôi phục chậm hơn

## 3. So sánh RDB và AOF

| | RDB | AOF |
|---|---|---|
| Lưu gì | Snapshot toàn bộ dữ liệu | Log các lệnh ghi |
| Độ bền | Mất vài phút dữ liệu | Mất tối đa ~1 giây (`everysec`) |
| Kích thước file | Nhỏ | Lớn hơn |
| Tốc độ khởi động lại | Nhanh | Chậm hơn |
| Dùng cho | Backup, khôi phục nhanh | Dữ liệu cần độ bền cao |

## 4. Nên chọn cấu hình nào?

| Tình huống | Cấu hình |
|---|---|
| Chỉ làm cache, mất cũng không sao | Tắt cả hai (hoặc chỉ RDB để khởi động "ấm") |
| Cần cân bằng giữa an toàn và hiệu năng | **RDB + AOF** (`everysec`) |
| Không chấp nhận mất dữ liệu | AOF `always` — và cân nhắc lại có nên dùng Redis làm nguồn sự thật không |

> [!TIP]
> Bật cả hai là lựa chọn phổ biến trong production. Với `aof-use-rdb-preamble yes` (mặc định từ Redis 5), file AOF sau khi rewrite có phần đầu là snapshot RDB — vừa khôi phục nhanh vừa bền.

> [!WARNING]
> Persistence **không thay thế** backup và replication. Hãy định kỳ copy file RDB ra nơi khác (S3...) và dùng replica để chống mất máy.

## Tổng kết

> [!NOTE]
> - **RDB** = chụp ảnh định kỳ: nhanh, gọn, có thể mất vài phút.
> - **AOF** = ghi nhật ký từng lệnh: bền hơn, file lớn hơn.
> - Production thường **bật cả hai**.

Bài tiếp theo: **Transaction, Pipelining và Lua Script**.

*Tham khảo: Redis Documentation*
