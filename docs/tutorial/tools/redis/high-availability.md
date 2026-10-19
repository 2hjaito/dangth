---
layout: Post
title: "Bài 12. Replication, Sentinel và Cluster"
subtitle: "Redis từ cơ bản đến thực tế"
author: "Trần Hữu Đang"
date: "2026-10-19"
useHeaderImage: false
headerMask: "rgba(39, 77, 61, 0.61)"
permalinkPattern: /ebook/redis/:slug/
tags:
  - Redis
  - High Availability
  - Cluster
---

<!-- Nội dung:
- Replication master-replica.
- Sentinel và automatic failover.
- Redis Cluster, hash slot và sharding. -->

<!-- more -->

Một instance Redis đơn lẻ là **single point of failure**: máy sập là cả hệ thống mất cache, mất session, mất queue. Redis có ba cấp độ để giải quyết: **Replication**, **Sentinel** và **Cluster**.

## 1. Replication — master và replica

```text
             ┌──► Replica 1 (chỉ đọc)
Master ──────┤
(đọc + ghi)  └──► Replica 2 (chỉ đọc)
```

```bash
# Trên replica
REPLICAOF 10.0.0.1 6379
INFO replication
```

- Mọi lệnh ghi đi vào **master**, rồi được gửi **bất đồng bộ** sang replica.
- Replica dùng để **scale đọc** và làm **bản dự phòng**.
- Khi replica mất kết nối ngắn, nó **đồng bộ một phần** (partial resync) qua replication backlog thay vì copy lại toàn bộ.

> [!WARNING]
> Vì replication là **bất đồng bộ**, master sập có thể làm **mất vài lệnh ghi** chưa kịp sang replica. Lệnh `WAIT <numreplicas> <timeout>` giúp chờ replica xác nhận, nhưng vẫn không biến Redis thành hệ thống strong consistency.

## 2. Sentinel — tự động failover

Replication thôi thì khi master sập, bạn phải **tự tay** chuyển replica lên master. **Sentinel** làm việc đó tự động.

```text
Sentinel 1   Sentinel 2   Sentinel 3      (giám sát, bỏ phiếu)
     │            │            │
     ▼            ▼            ▼
   Master ──► Replica 1, Replica 2
```

1. Các Sentinel liên tục **ping** master.
2. Khi đủ **quorum** Sentinel đồng ý master đã chết, chúng bầu một Sentinel đứng ra failover.
3. Một replica được **promote** thành master mới, các replica còn lại trỏ sang nó.
4. Client hỏi Sentinel địa chỉ master mới và tự **kết nối lại**.

> [!TIP]
> Chạy **ít nhất 3 Sentinel** trên các máy khác nhau để tránh split-brain và để bỏ phiếu được khi một máy chết.

## 3. Redis Cluster — sharding

Khi dữ liệu hoặc lượng ghi **vượt quá một máy**, bạn cần chia dữ liệu ra nhiều master: **Redis Cluster**.

- Keyspace được chia thành **16384 hash slot**.
- Mỗi key thuộc slot `CRC16(key) mod 16384`.
- Mỗi master giữ một phần slot, mỗi master có replica riêng để failover.

```text
Master A: slot 0 – 5460       ──► Replica A1
Master B: slot 5461 – 10922   ──► Replica B1
Master C: slot 10923 – 16383  ──► Replica C1
```

Client gửi lệnh tới sai node sẽ nhận lỗi `MOVED`, kèm địa chỉ node đúng — các client library hỗ trợ cluster tự xử lý việc này.

```bash
CLUSTER KEYSLOT user:42
CLUSTER NODES
```

### Hash tag

Lệnh nhiều key (`MGET`, `SINTER`, transaction, Lua...) chỉ chạy được khi các key **cùng một slot**. Dùng **hash tag** `{...}` để ép điều đó:

```bash
# Chỉ phần trong {} được hash → cùng slot
SET user:{42}:profile "..."
SET user:{42}:cart "..."
```

> [!WARNING]
> Đừng lạm dụng hash tag — dồn quá nhiều key vào một tag sẽ tạo **hot slot** và mất cân bằng giữa các node.

## 4. Chọn mô hình nào?

| Nhu cầu | Mô hình |
|---|---|
| Dev, cache nhỏ, chấp nhận downtime | Một instance |
| Scale đọc, có bản dự phòng | Master + Replica |
| Tự động failover, dữ liệu vừa một máy | **Sentinel** |
| Dữ liệu/lượng ghi vượt một máy | **Cluster** |

> [!NOTE]
> Nếu dùng dịch vụ managed (AWS ElastiCache, Azure Cache, Redis Cloud...), phần lớn việc này đã được lo sẵn — nhưng bạn vẫn cần hiểu để chọn cấu hình và xử lý lỗi `MOVED`, failover phía client.

## Tổng kết

> [!NOTE]
> - **Replication**: sao chép dữ liệu, scale đọc — bất đồng bộ.
> - **Sentinel**: giám sát và **tự động failover**.
> - **Cluster**: chia dữ liệu theo **16384 hash slot** để scale ngang.

Bài tiếp theo: **Các pattern thực tế với Redis**.

*Tham khảo: Redis Documentation*
