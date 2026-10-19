---
layout: Post
title: "Bài 5. Transaction, Pipelining và Lua Script"
subtitle: "Redis từ cơ bản đến thực tế"
author: "Trần Hữu Đang"
date: "2026-10-19"
useHeaderImage: false
headerMask: "rgba(39, 77, 61, 0.61)"
permalinkPattern: /ebook/redis/:slug/
tags:
  - Redis
  - Transaction
  - Lua
---

<!-- Nội dung:
- MULTI/EXEC và WATCH.
- Pipelining để giảm round-trip.
- Lua script và Redis Functions. -->

<!-- more -->

Mỗi lệnh Redis đã là atomic. Nhưng khi cần **nhiều lệnh chạy cùng nhau**, bạn có ba công cụ: **Transaction**, **Pipelining** và **Lua Script**. Chúng giải quyết những vấn đề khác nhau.

## 1. Transaction — `MULTI` / `EXEC`

```bash
127.0.0.1:6379> MULTI
OK
127.0.0.1:6379> DECRBY account:A 100
QUEUED
127.0.0.1:6379> INCRBY account:B 100
QUEUED
127.0.0.1:6379> EXEC
1) (integer) 900
2) (integer) 1100
```

- Các lệnh được **xếp hàng** (`QUEUED`) và chạy **liền một mạch** khi `EXEC` — không client nào chen vào giữa.
- `DISCARD` để hủy transaction.

> [!WARNING]
> Redis transaction **không có rollback**. Nếu một lệnh lỗi lúc chạy (ví dụ `INCR` trên một Hash), các lệnh khác **vẫn được thực thi**. Chỉ lỗi cú pháp lúc xếp hàng mới khiến cả transaction bị hủy.

## 2. Optimistic locking — `WATCH`

`WATCH` theo dõi key; nếu key bị client khác sửa trước khi `EXEC`, transaction sẽ **bị hủy** (`EXEC` trả về `nil`) và bạn thử lại.

```bash
WATCH stock:item:1
GET stock:item:1            # giả sử còn 5
MULTI
DECR stock:item:1
EXEC                        # trả về nil nếu stock:item:1 đã bị đổi → thử lại
```

> [!TIP]
> Đây là **check-and-set** (CAS): đọc → quyết định → ghi, an toàn khi có nhiều client cùng sửa.

## 3. Pipelining — giảm round-trip

Bình thường mỗi lệnh tốn một vòng **request → response** qua mạng. Pipelining gửi **nhiều lệnh một lúc** rồi nhận tất cả kết quả.

```python
pipe = r.pipeline(transaction=False)
for i in range(1000):
    pipe.set(f"key:{i}", i)
pipe.execute()   # 1 round-trip thay vì 1000
```

> [!NOTE]
> Pipelining là tối ưu **mạng**, **không** đảm bảo atomic — lệnh của client khác vẫn có thể chen vào giữa. Muốn atomic, dùng `MULTI/EXEC` (trong redis-py, `pipeline()` mặc định đã bọc `MULTI/EXEC`).

## 4. Lua Script — logic atomic phía server

Lua script chạy **trọn vẹn và atomic** trên Redis, cho phép bạn đọc rồi quyết định rồi ghi trong **một bước**.

```bash
# Nhả lock chỉ khi đúng token
EVAL "if redis.call('GET', KEYS[1]) == ARGV[1] then return redis.call('DEL', KEYS[1]) else return 0 end" 1 lock:order:1 my-token
```

Trong code:

```python
release_lock = r.register_script("""
if redis.call('GET', KEYS[1]) == ARGV[1] then
    return redis.call('DEL', KEYS[1])
end
return 0
""")
release_lock(keys=["lock:order:1"], args=["my-token"])
```

- `register_script` tự dùng `EVALSHA` (gửi hash thay vì cả script) để tiết kiệm băng thông.
- Luôn truyền key qua `KEYS[]` — Redis Cluster cần biết script đụng tới key nào.

> [!WARNING]
> Script chạy trên luồng chính, nên **script chậm sẽ chặn cả Redis**. Giữ script ngắn, không lặp qua dữ liệu lớn.

> [!TIP]
> Từ Redis 7 có **Redis Functions** (`FUNCTION LOAD`, `FCALL`): giống Lua script nhưng được lưu trên server như một thư viện, sống sót qua restart và được replicate.

## 5. Chọn công cụ nào?

| Nhu cầu | Dùng |
|---|---|
| Gửi nhiều lệnh độc lập cho nhanh | Pipelining |
| Nhiều lệnh ghi phải chạy liền nhau | `MULTI` / `EXEC` |
| Đọc → kiểm tra → ghi, có client khác tranh chấp | `WATCH` + `MULTI` hoặc Lua |
| Logic có điều kiện, cần atomic tuyệt đối | Lua script / Functions |

## Tổng kết

> [!NOTE]
> - **Transaction**: chạy liền mạch, nhưng **không rollback**.
> - **WATCH**: optimistic locking cho check-and-set.
> - **Pipelining**: giảm round-trip, không atomic.
> - **Lua**: logic atomic phía server — mạnh nhưng phải giữ ngắn.

Bài tiếp theo: **Redis Pub/Sub**.

*Tham khảo: Redis Documentation*
