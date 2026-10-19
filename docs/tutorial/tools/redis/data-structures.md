---
layout: Post
title: "Bài 2. Các cấu trúc dữ liệu trong Redis"
subtitle: "Redis từ cơ bản đến thực tế"
author: "Trần Hữu Đang"
date: "2026-10-19"
useHeaderImage: false
headerMask: "rgba(39, 77, 61, 0.61)"
permalinkPattern: /ebook/redis/:slug/
tags:
  - Redis
  - Data Structures
---

<!-- Nội dung:
- String, Hash, List, Set, Sorted Set.
- Bitmap, HyperLogLog, Geo.
- Chọn cấu trúc nào cho bài toán nào. -->

<!-- more -->

Sức mạnh thật sự của Redis không nằm ở tốc độ, mà ở chỗ nó cho bạn **đúng cấu trúc dữ liệu** để giải bài toán chỉ bằng một hai lệnh.

## 1. Tổng quan

| Kiểu | Ví dụ | Use case |
|---|---|---|
| String | `SET key "value"` | Cache, counter, token |
| Hash | `HSET user:1 name "Đang"` | Object, profile |
| List | `LPUSH tasks "job1"` | Queue, timeline gần đây |
| Set | `SADD tags "redis"` | Phần tử duy nhất, tag |
| Sorted Set | `ZADD board 100 "u1"` | Bảng xếp hạng, hàng đợi ưu tiên |
| Stream | `XADD orders * item "laptop"` | Event log (xem bài Streams) |
| Bitmap | `SETBIT active 100 1` | Cờ trạng thái, điểm danh |
| HyperLogLog | `PFADD views "u1"` | Đếm unique (xấp xỉ) |
| Geo | `GEOADD stores 106.7 10.77 "HCM"` | Tìm theo vị trí |

## 2. String

Kiểu cơ bản nhất, lưu được chuỗi, số, hay cả dữ liệu nhị phân (tối đa 512MB).

```bash
SET user:42:name "Đang"
GET user:42:name

INCR page:home:views          # tăng counter (atomic)
INCRBY cart:42:total 150000
SET session:abc "..." EX 3600 # kèm TTL
SET lock:job:1 "token" NX EX 30  # chỉ set nếu chưa tồn tại
MSET a 1 b 2                  # set nhiều key một lần
```

> [!TIP]
> `INCR` là **atomic**, nên dùng làm counter an toàn khi có nhiều client cùng tăng.

## 3. Hash

Một key chứa nhiều cặp **field-value** — giống một object.

```bash
HSET user:42 name "Đang" email "dang@example.com" age 25
HGET user:42 name
HINCRBY user:42 age 1
HGETALL user:42
HDEL user:42 email
```

> [!NOTE]
> Dùng Hash thay vì serialize cả object thành JSON trong String khi bạn hay **đọc/sửa từng field** riêng lẻ.

## 4. List

Danh sách có thứ tự, thêm/bớt ở **hai đầu** với O(1).

```bash
LPUSH notifications:42 "Có bình luận mới"
LRANGE notifications:42 0 9      # 10 phần tử mới nhất
LTRIM notifications:42 0 99      # chỉ giữ 100 phần tử

RPUSH queue:email "job1"
BLPOP queue:email 5              # worker chờ job tối đa 5 giây
```

> [!WARNING]
> `LINDEX`, `LRANGE` ở giữa list dài là **O(N)**. List hợp với "đầu và cuối", không hợp với truy cập ngẫu nhiên.

## 5. Set

Tập hợp **không trùng lặp**, không có thứ tự.

```bash
SADD post:1:likes "u1" "u2" "u3"
SISMEMBER post:1:likes "u2"      # đã like chưa?
SCARD post:1:likes               # bao nhiêu lượt like
SINTER user:1:friends user:2:friends   # bạn chung
SRANDMEMBER giveaway 3           # bốc thăm 3 người
```

## 6. Sorted Set (ZSet)

Giống Set nhưng mỗi phần tử có một **score**, luôn được sắp xếp theo score.

```bash
ZADD leaderboard 250 "alice" 180 "bob" 300 "charlie"
ZREVRANGE leaderboard 0 2 WITHSCORES   # top 3
ZINCRBY leaderboard 50 "bob"
ZREVRANK leaderboard "bob"             # thứ hạng từ cao xuống (bắt đầu từ 0)
ZRANGEBYSCORE leaderboard 200 +inf     # điểm từ 200 trở lên
```

> [!TIP]
> Dùng **timestamp làm score** để có hàng đợi theo thời gian (delayed job, sliding window rate limit).

## 7. Bitmap, HyperLogLog, Geo

**Bitmap** — mỗi bit là một cờ, cực kỳ tiết kiệm bộ nhớ:

```bash
SETBIT checkin:2026-10-19 42 1     # user 42 điểm danh hôm nay
GETBIT checkin:2026-10-19 42
BITCOUNT checkin:2026-10-19        # bao nhiêu người điểm danh
```

**HyperLogLog** — đếm số phần tử **duy nhất** với sai số ~0.81%, chỉ tốn tối đa **12KB** dù có hàng tỷ phần tử:

```bash
PFADD page:home:uv "u1" "u2" "u1"
PFCOUNT page:home:uv               # ≈ 2
```

**Geo** — lưu tọa độ và tìm theo bán kính:

```bash
GEOADD stores 106.70 10.77 "HCM" 105.85 21.03 "HN"   # kinh độ trước, vĩ độ sau
GEOSEARCH stores FROMLONLAT 106.66 10.76 BYRADIUS 5 km WITHDIST
```

## 8. Chọn cấu trúc nào?

| Bài toán | Nên dùng |
|---|---|
| Cache một giá trị, counter | String |
| Object có nhiều field | Hash |
| Queue đơn giản, N item gần nhất | List |
| Danh sách không trùng, tính giao/hợp | Set |
| Xếp hạng, sắp xếp theo điểm/thời gian | Sorted Set |
| Đếm unique số lượng lớn | HyperLogLog |
| Cờ true/false cho hàng triệu ID | Bitmap |
| Event log bền vững, nhiều consumer | Stream |

## Tổng kết

> [!NOTE]
> Chọn đúng cấu trúc dữ liệu thì logic ứng dụng ngắn đi rất nhiều — và Redis làm phần việc nặng cho bạn **một cách atomic**.

Bài tiếp theo: **Caching, TTL và Eviction**.

*Tham khảo: Redis Documentation*
