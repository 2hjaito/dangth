---
layout: Post
title: "Bài 13. Các pattern thực tế với Redis"
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
- Rate limiting, distributed lock.
- Session store, leaderboard, đếm unique.
- Job queue và tìm kiếm theo vị trí. -->

<!-- more -->

Đây là những bài toán bạn sẽ gặp đi gặp lại trong thực tế (và trong phỏng vấn), cùng cách giải bằng Redis.

## 1. Rate Limiting

**Fixed Window** — đơn giản nhất:

```python
def is_allowed(user_id, limit=100, window=60):
    key = f"rate:{user_id}:{int(time.time() // window)}"
    count = r.incr(key)
    if count == 1:
        r.expire(key, window)
    return count <= limit
```

- Dễ làm, nhưng có thể bị **burst gấp đôi** ở ranh giới hai cửa sổ.

**Sliding Window** — chính xác hơn, dùng Sorted Set với score là timestamp:

```bash
ZREMRANGEBYSCORE rate:42 0 <now - window>   # bỏ request cũ
ZADD rate:42 <now> <request-id>             # ghi request mới
ZCARD rate:42                               # đếm request trong cửa sổ
EXPIRE rate:42 <window>
```

> [!TIP]
> Gói các lệnh trên vào **Lua script** để chúng chạy atomic. **Token Bucket** là lựa chọn linh hoạt hơn khi muốn cho phép burst có kiểm soát.

## 2. Distributed Lock

Đảm bảo chỉ **một worker** xử lý một việc tại một thời điểm.

```bash
# Lấy lock: chỉ set nếu chưa có, tự hết hạn sau 30 giây
SET lock:order:123 <random-token> NX EX 30
```

```lua
-- Nhả lock: chỉ xóa nếu đúng token của mình (chạy bằng EVAL)
if redis.call('GET', KEYS[1]) == ARGV[1] then
    return redis.call('DEL', KEYS[1])
end
return 0
```

> [!WARNING]
> - Luôn có **TTL** để lock không bị giữ mãi khi worker chết.
> - Dùng **token ngẫu nhiên** và kiểm tra trước khi xóa — nếu không, bạn có thể xóa nhầm lock của worker khác sau khi lock của mình đã hết hạn.
> - Lock trên một instance Redis **không tuyệt đối an toàn** khi có failover. Với việc cực kỳ quan trọng, hãy kết hợp thêm cơ chế idempotent hoặc fencing token ở tầng dữ liệu.

## 3. Session Store

```bash
HSET session:abc123 user_id 42 role "admin"
EXPIRE session:abc123 1800        # 30 phút
```

- Mỗi request: đọc session và **gia hạn TTL** (sliding expiration).
- Đăng xuất: `DEL session:abc123` — thu hồi **ngay lập tức**.
- Nhiều server ứng dụng dùng chung một Redis → không cần sticky session.

## 4. Leaderboard

```bash
ZINCRBY game:leaderboard 50 "alice"          # cộng điểm
ZREVRANGE game:leaderboard 0 9 WITHSCORES    # top 10
ZREVRANK game:leaderboard "alice"            # hạng của alice (từ 0)
ZSCORE game:leaderboard "alice"
```

🏆 Mọi thao tác chỉ **O(log N)** — leaderboard hàng triệu người vẫn real-time.

## 5. Đếm lượt xem và unique visitor

```bash
INCR article:99:views                 # tổng lượt xem
PFADD article:99:uv "user:42"         # unique visitor (HyperLogLog)
PFCOUNT article:99:uv
SETBIT online:2026-10-19 42 1         # user 42 có hoạt động hôm nay
BITCOUNT online:2026-10-19            # DAU
```

## 6. Job Queue đơn giản

```bash
# Producer
LPUSH queue:email '{"to":"a@b.com"}'

# Worker: chờ job, đồng thời chuyển sang danh sách đang xử lý
BLMOVE queue:email queue:email:processing RIGHT LEFT 5
# Xử lý xong thì xóa khỏi danh sách đang xử lý
LREM queue:email:processing 1 '{"to":"a@b.com"}'
```

> [!NOTE]
> `BLMOVE` (thay cho `BRPOPLPUSH` cũ) giúp job **không mất** nếu worker chết giữa chừng. Cần retry, consumer group, theo dõi pending đầy đủ thì hãy dùng **Streams**.

## 7. Tìm kiếm theo vị trí

```bash
GEOADD drivers 106.70 10.77 "driver:1" 106.68 10.76 "driver:2"
GEOSEARCH drivers FROMLONLAT 106.69 10.77 BYRADIUS 2 km ASC COUNT 5 WITHDIST
```

📍 Tìm tài xế gần nhất, cửa hàng gần nhất, giao đồ ăn...

## Tổng kết

> [!NOTE]
> Với một ít lệnh và đúng cấu trúc dữ liệu, Redis giải được rất nhiều bài toán hệ thống: **rate limit**, **lock**, **session**, **leaderboard**, **counter**, **queue**, **geo**.

Bài tiếp theo: **Best Practices cho production**.

*Tham khảo: Redis Documentation, Redis Series (@p4prateek.tech)*
