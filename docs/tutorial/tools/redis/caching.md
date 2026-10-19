---
layout: Post
title: "Bài 3. Caching, TTL và Eviction"
subtitle: "Redis từ cơ bản đến thực tế"
author: "Trần Hữu Đang"
date: "2026-10-19"
useHeaderImage: false
headerMask: "rgba(39, 77, 61, 0.61)"
permalinkPattern: /ebook/redis/:slug/
tags:
  - Redis
  - Cache
---

<!-- Nội dung:
- TTL và cách Redis xóa key hết hạn.
- Eviction policy khi đầy bộ nhớ.
- Caching patterns và các sự cố cache thường gặp. -->

<!-- more -->

Cache là use case phổ biến nhất của Redis. Nhưng cache đúng cách thì không chỉ là `SET` rồi `GET` — bạn cần hiểu **TTL**, **eviction** và những sự cố kinh điển như **cache stampede**.

## 1. TTL — cho key tự hết hạn

```bash
SET product:1 "{...}" EX 300    # hết hạn sau 300 giây
EXPIRE product:1 600            # đặt lại TTL
TTL product:1                   # còn bao nhiêu giây (-1: không hết hạn, -2: không tồn tại)
PERSIST product:1               # bỏ TTL
```

Redis xóa key hết hạn theo **hai cách**:

- **Passive** — khi client truy cập một key đã hết hạn, Redis xóa nó và trả về như không tồn tại.
- **Active** — định kỳ, Redis lấy mẫu ngẫu nhiên một nhóm key có TTL và xóa những key đã hết hạn.

> [!NOTE]
> Vì vậy key hết hạn **không biến mất đúng từng mili giây**, nhưng client sẽ không bao giờ đọc được nó nữa.

## 2. Eviction — khi RAM đầy

Đặt giới hạn bộ nhớ và chính sách xử lý khi đầy:

```bash
# redis.conf
maxmemory 2gb
maxmemory-policy allkeys-lru
```

| Policy | Hành vi |
|---|---|
| `noeviction` | (Mặc định) Từ chối lệnh ghi mới khi đầy |
| `allkeys-lru` | Xóa key **ít được dùng gần đây nhất** trong tất cả key |
| `allkeys-lfu` | Xóa key **ít được dùng nhất** (theo tần suất) |
| `volatile-lru` | Như LRU nhưng chỉ xét key **có TTL** |
| `volatile-lfu` | Như LFU nhưng chỉ xét key có TTL |
| `allkeys-random` / `volatile-random` | Xóa ngẫu nhiên |
| `volatile-ttl` | Xóa key có TTL **sắp hết hạn nhất** |

> [!TIP]
> Redis dùng làm **cache thuần** → `allkeys-lru` hoặc `allkeys-lfu`. Redis vừa cache vừa lưu dữ liệu quan trọng (queue, session) → cân nhắc `volatile-*` hoặc tách instance riêng.

## 3. Caching patterns

| Pattern | Cách làm | Đặc điểm |
|---|---|---|
| **Cache-Aside** (Lazy Loading) | Đọc Redis → miss thì đọc DB → ghi vào Redis kèm TTL | Phổ biến nhất, đơn giản |
| **Write-Through** | Ghi DB và cập nhật Redis cùng lúc | Nhất quán hơn, ghi chậm hơn |
| **Write-Back** (Write-Behind) | Ghi vào Redis trước, đẩy xuống DB bất đồng bộ | Ghi rất nhanh, có rủi ro mất dữ liệu |
| **Refresh-Ahead** | Làm mới cache trước khi hết hạn bằng background job | Tránh độ trễ khi miss với key nóng |

Ví dụ Cache-Aside (Python):

```python
def get_product(product_id):
    key = f"product:{product_id}"
    cached = r.get(key)
    if cached:
        return json.loads(cached)

    product = db.find_product(product_id)
    r.set(key, json.dumps(product), ex=300)
    return product

def update_product(product_id, data):
    db.update_product(product_id, data)
    r.delete(f"product:{product_id}")   # invalidate, lần đọc sau sẽ nạp lại
```

> [!TIP]
> Khi cập nhật, **xóa cache** (invalidate) thường an toàn hơn là ghi đè giá trị mới, vì tránh được race condition giữa hai lần ghi.

## 4. Các sự cố cache kinh điển

| Sự cố | Chuyện gì xảy ra | Cách xử lý |
|---|---|---|
| **Cache Stampede** (Thundering Herd) | Một key nóng hết hạn, hàng nghìn request cùng miss và cùng đánh vào DB | Lock khi rebuild (`SET ... NX`), refresh-ahead, hoặc trả dữ liệu cũ trong lúc làm mới |
| **Cache Penetration** | Request liên tục hỏi key **không tồn tại** (cả cache lẫn DB), DB bị đánh mãi | Cache cả kết quả rỗng với TTL ngắn, dùng **Bloom filter** chặn trước |
| **Cache Avalanche** | Rất nhiều key **hết hạn cùng lúc** (hoặc Redis sập), DB bị dồn tải | Thêm **jitter** ngẫu nhiên vào TTL, dùng HA cho Redis, có circuit breaker |
| **Hot Key** | Một key bị đọc quá nhiều, dồn tải lên một node | Cache thêm ở tầng ứng dụng (local cache), nhân bản key ra nhiều bản |

```python
# Thêm jitter để các key không hết hạn cùng lúc
ttl = 300 + random.randint(0, 60)
r.set(key, value, ex=ttl)
```

> [!WARNING]
> Cache là **bản sao**, không phải nguồn sự thật. Luôn thiết kế để hệ thống **vẫn chạy được** (dù chậm hơn) khi cache trống hoặc Redis tạm thời không có.

## Tổng kết

> [!NOTE]
> - Luôn đặt **TTL** cho dữ liệu cache.
> - Đặt `maxmemory` và chọn **eviction policy** phù hợp.
> - **Cache-Aside + invalidate khi ghi** là lựa chọn mặc định an toàn.
> - Chuẩn bị trước cho stampede, penetration và avalanche.

Bài tiếp theo: **Persistence — Redis làm sao không mất dữ liệu?**

*Tham khảo: Redis Documentation*
