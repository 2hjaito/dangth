Redis Từ Zero Tới Hero
===========================================

**1\. Redis Là Cái Quái Gì Vậy?**
---------------------------------

###  Kiến thức xịn xò:

*   Redis là NoSQL dạng **key-value**, hoạt động chủ yếu trên **RAM** => nhanh kinh hoàng.
*   Đơn luồng (single-threaded) => dễ predict nhưng không scale theo CPU core.
*   Có khả năng **persistence**, **replication**, **pub/sub**, **Lua scripting**, **stream**, **transactions**, **cluster**, đủ cả bộ combo.

###  Khi nào không nên dùng Redis?

*   Khi dữ liệu **quá lớn** (RAM mắc hơn vợ bạn shopping cuối tháng)
*   Cần **ACID mạnh** (Redis chỉ có A và phần nào I)
*   Cần truy vấn phức tạp (join, filter, aggregation → không ai dùng Redis làm BI)

### ✅ Bài tập lý thuyết:

So sánh Redis vs Memcached vs MongoDB (ghi 3 dòng thôi, kẻ bảng nếu thích).

###  Phỏng vấn:

**Q**: Tại sao Redis nhanh vậy?
**A**: Vì:

1.  Chạy trên RAM
2.  Đơn luồng nên không có lock, không context switch
3.  Cấu trúc dữ liệu được tối ưu ở mức C-level
4.  Command cực kỳ đơn giản và native

**2\. Redis Lưu Gì Và Lưu Kiểu Gì?**
------------------------------------

###  6 món ăn đặc sản của Redis:

| Kiểu   | Dùng để làm gì?            | Ví dụ                  |
| ------ | -------------------------- | ---------------------- |
| String | Cache, counter, token      | `SET a 1`, `INCR a`    |
| List   | Queue, log                 | `LPUSH`, `RPOP`        |
| Set    | Unique tag, friend list    | `SADD`, `SISMEMBER`    |
| Hash   | Lưu object kiểu JSON       | `HSET user:1 name "A"` |
| ZSet   | Ranking, score             | `ZADD rank 100 "A"`    |
| Stream | Real-time feed, log system | `XADD`, `XREAD`        |


🧠 Ghi nhớ:

*   ZSET là vũ khí bí mật → làm leaderboard cực xịn
*   HASH nhỏ hơn 512 entries được Redis lưu như **ziplist** (tốn ít RAM hơn)

###  Bài tập:

Lưu thông tin user với HSET, sau đó tăng điểm nếu điểm mới cao hơn:

```
HSET user:1 name "Dang" score 100
EVAL "
local current = tonumber(redis.call('HGET', KEYS[1], 'score'))
local incoming = tonumber(ARGV[1])
if incoming > current then
  return redis.call('HSET', KEYS[1], 'score', incoming)
end
return current
" 1 user:1 120
```

###  Phỏng vấn:

**Q**: Dùng Set, List, ZSet khác nhau thế nào?

**A**:

*   **Set**: unique, không thứ tự
*   **List**: có thứ tự, trùng lặp ok
*   **ZSet**: có thứ tự + score => xếp hạng

**3\. Redis Làm Sao Không Mất Dữ Liệu Khi Tắt Server?**
-------------------------------------------------------

###  Các chế độ lưu trữ:

| Tên    | Đặc điểm         | Ưu              | Nhược                       |
| ------ | ---------------- | --------------- | --------------------------- |
| `RDB`    | Snapshot định kỳ | Nhẹ, load nhanh | Có thể mất vài phút dữ liệu |
| `AOF`    | Ghi từng lệnh    | Ít mất dữ liệu  | File lớn, chậm              |
| `Hybrid` | Kết hợp          | Linh hoạt       | Phức tạp hơn                |


🔍 Redis 7.0 trở lên mặc định dùng hybrid để tối ưu hiệu năng + an toàn.

###  Bài tập:

Cấu hình file redis.conf để bật AOF:

```
appendonly yes
appendfsync everysec
```

###  Phỏng vấn:

**Q**: Khi nào nên dùng RDB, khi nào dùng AOF?

**A**:

*   `RDB`: thích hợp cho backup định kỳ
*   `AOF`: dùng khi không được phép mất dữ liệu, ví dụ giao dịch tài chính
*   Kết hợp cả hai = best practice

**4\. Redis Trong Thế Giới Thực Tế (Có Drama)**
-----------------------------------------------

###  Ứng dụng thực tế:


| Tình huống            | Redis làm gì                    |
| --------------------- | ------------------------------- |
| Đăng nhập user        | Lưu session với TTL             |
| Gọi API tốn thời gian | Cache kết quả                   |
| Người dùng spam login | Rate limit bằng `INCR + EXPIRE` |
| Xếp hạng game         | Dùng ZSET                       |
| Hệ thống chat         | Dùng Stream hoặc Pub/Sub        |


📌 **Lưu ý**: Pub/Sub không lưu lại message nếu client disconnect. Dùng Stream nếu cần durability.

###  Bài tập:

Viết rate limit login: tối đa 5 lần/phút

```py
def login(ip):
    key = f"login:{ip}"
    count = redis.incr(key)
    if count == 1:
        redis.expire(key, 60)
    if count > 5:
        return "Chặn rồi nha bạn!"
    return "Login OK"
```

---

📢 **Bài viết hay không thể bỏ lỡ**  
👉 [Cách giới hạn số request theo IP bằng Redis - cực thực chiến](/post/2023-12-22-limit-requests-per-ip)

![Rate limit Redis](https://dangth.dev/api/og?title=Limit%20Requests%20Per%20IP%20Using%20Redis&subtitle=Practical%20rate%20limiting%20in%20Python%20or%20Node.js)

> Tìm hiểu cách chống spam login, chống DDoS nhẹ nhàng, hiệu quả bằng cách sử dụng `INCR`, `EXPIRE`, và `Redis` đơn giản như ăn bánh.

---


###  Phỏng vấn:

**Q**: Pub/Sub khác gì Stream?

**A**:

| Tính năng             | Pub/Sub              | Stream           |
| --------------------- | -------------------- | ---------------- |
| Có lưu lại tin?       | Không                | Có               |
| Có replay được không? | Không                | Có               |
| Dùng khi nào?         | Chat nhanh, realtime | Log, event queue |


**5\. Redis Cluster & High Availability (Không Down Phát Là Xong Game)**
------------------------------------------------------------------------

###  Redis HA kiểu gì?

*   **Redis Sentinel**: tự động failover (master/slave)
*   **Redis Cluster**: phân mảnh dữ liệu → scale ngang

Redis Cluster chia key theo slot (16,384 slot) → map từng node

###  Bài tập:

Giải thích bằng hình vẽ hoặc câu chữ:

"3 Redis node, 1 master, 2 replica. Khi master chết thì sao?"

**Gợi ý**: Sentinel sẽ promote 1 trong 2 slave → master mới → client tự động reconnect

### Phỏng vấn:

**Q**: Redis có phân tán không?

**A**: Redis Cluster hỗ trợ sharding. Key được hash và map vào slot. Nếu không dùng Cluster thì Redis chỉ chạy đơn lẻ hoặc master-slave failover.

✅ Tổng kết (và checklist để đi phỏng vấn Redis)
-----------------------------------------------

| Cần biết                     | Biết chưa? |
| ---------------------------- | ---------- |
| Redis hoạt động như thế nào? | ✅          |
| Các kiểu dữ liệu chính       | ✅          |
| TTL, EXPIRE, INCR, DECR      | ✅          |
| Lua script và transaction    | ✅          |
| RDB vs AOF                   | ✅          |
| Khi nào dùng Stream?         | ✅          |
| Redis Cluster và Sentinel    | ✅          |
