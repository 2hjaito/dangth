---
layout: Post
title: "Bài 8. Docker Compose"
subtitle: "Docker từ cơ bản đến thực tế"
author: "Trần Hữu Đang"
date: "2026-10-19"
useHeaderImage: false
headerMask: "rgba(39, 77, 61, 0.61)"
permalinkPattern: /ebook/docker/:slug/
tags:
  - Docker
  - Docker Compose
---

<!-- Nội dung:
- Docker Compose là gì, cấu trúc file compose.
- Lệnh thường dùng, ví dụ thực tế.
- depends_on, biến môi trường, volume, network. -->

<!-- more -->

**Docker Compose** cho phép định nghĩa và chạy **ứng dụng nhiều container** chỉ bằng **một file YAML**. Không còn những lệnh `docker run` dài dằng dặc nữa!

## 1. Docker Compose là gì?

Là công cụ để định nghĩa và chạy ứng dụng Docker nhiều container thông qua file `docker-compose.yml`.

```
docker-compose.yml
services:
  app:   → App Container
  db:    → DB Container
  redis: → Redis Container
```

Định nghĩa một lần. Chạy tất cả.

> [!TIP]
> Rất phù hợp cho **dev local**, **testing** và **deploy đơn giản**.

---

## 2. Cấu trúc file Compose

```yaml
services:
  app:
    build: .
    ports:
      - "8080:8080"
    depends_on:
      - db
    environment:
      - DB_HOST=db
  db:
    image: postgres:15
    environment:
      - POSTGRES_DB=myapp
      - POSTGRES_PASSWORD=secret
    volumes:
      - db_data:/var/lib/postgresql/data
volumes:
  db_data:
```

> [!INFO]
> Các bản Compose cũ yêu cầu dòng `version: '3.8'` ở đầu file. Với **Docker Compose v2** hiện nay, trường `version` đã **không còn cần thiết**.

---

## 3. Các lệnh thường dùng

```bash
docker compose up               # Khởi động tất cả service
docker compose up -d            # Chạy ở chế độ nền
docker compose down             # Dừng và xoá container
docker compose ps               # Liệt kê container đang chạy
docker compose logs -f app      # Xem log (theo dõi liên tục)
docker compose build            # Build/rebuild image
docker compose restart app      # Restart một service
docker compose exec app sh      # Mở shell trong container
```

---

## 4. Ví dụ thực tế

Một web app đơn giản gồm **database** và **Redis**:

```yaml
services:
  app:
    build: ./app
    ports:
      - "8080:8080"
    environment:
      - DB_HOST=db
      - REDIS_HOST=redis
    depends_on:
      - db
      - redis
  db:
    image: postgres:15
    volumes:
      - db_data:/var/lib/postgresql/data
  redis:
    image: redis:7-alpine
volumes:
  db_data:
```

Nhiều service, chỉ cần **một lệnh** `docker compose up -d` là chạy!

---

## 5. Thứ tự khởi động service

Dùng `depends_on` để điều khiển **thứ tự khởi động**.

`app` → depends_on → `db`, `redis`

- Service được khởi động **theo thứ tự**
- **Không chờ** service phụ thuộc "sẵn sàng"
- Dùng **healthcheck** nếu cần đảm bảo sẵn sàng

> [!WARNING]
> `depends_on` chỉ kiểm soát **thứ tự**, không kiểm soát **tình trạng sẵn sàng**! Kết hợp với `healthcheck` và `condition: service_healthy` nếu cần.

```yaml
services:
  app:
    depends_on:
      db:
        condition: service_healthy
  db:
    image: postgres:15
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 5s
      retries: 5
```

---

## 6. Biến môi trường

Tách cấu hình ra file `.env` đặt cùng thư mục với `docker-compose.yml`:

```
# .env
DB_HOST=db
DB_USER=postgres
DB_PASSWORD=secret
REDIS_HOST=redis
APP_PORT=8080
```

```yaml
# docker-compose.yml
services:
  app:
    environment:
      - DB_HOST=${DB_HOST}
      - REDIS_HOST=${REDIS_HOST}
```

> [!TIP]
> Dùng `.env` giúp cấu hình gọn gàng và an toàn hơn. Nhớ thêm `.env` vào `.gitignore` nhé!

---

## 7. Volume trong Compose

```yaml
services:
  db:
    image: postgres:15
    volumes:
      - db_data:/var/lib/postgresql/data
volumes:
  db_data:
```

- Dữ liệu vẫn còn sau khi container dừng
- Dùng **named volume** (không dùng anonymous)
- Rất hợp cho **database** và **file upload**

---

## 8. Network trong Compose

Các service gọi nhau bằng **tên service**.

`app` ⇄ `db` · `app` ⇄ `redis`

- Mỗi service có một **network alias**
- Dùng tên service làm hostname (ví dụ `db`)
- Compose **tự động tạo network** mặc định

> [!NOTE]
> Không cần map port giữa các service với nhau — chỉ map những port cần mở ra ngoài host.

---

## 9. Tips & Best Practices

- Dùng Docker Compose cho **dev local**
- Giữ dữ liệu nhạy cảm trong file **.env**
- Dùng **named volume** để lưu dữ liệu
- Dùng **healthcheck** cho các service quan trọng
- Tách thành nhiều file compose cho dự án lớn (ví dụ `docker-compose.dev.yml`)
- Dùng **profiles** để bật/tắt service
- Giữ image **nhẹ**
- Dùng `docker compose logs` để debug

---

## Tổng kết

> [!NOTE]
> Một file. Nhiều container. Một ứng dụng hoàn chỉnh! Docker Compose giúp việc phát triển **đơn giản**, **nhanh** và **dễ chịu** hơn rất nhiều.
