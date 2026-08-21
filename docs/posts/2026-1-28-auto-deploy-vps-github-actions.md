---
layout: Post
title: "Auto Deploy VPS với GitHub Actions: Từ gõ lệnh tay đến rảnh tay"
subtitle: "Hướng dẫn chi tiết cách setup CI/CD tự động build Docker và xử lý xung đột Port thông minh"
author: "Trần Hữu Đang"
date: 2026-01-28
image: /images/post/2026-1-28-auto-deploy-vps-github-actions/main.png
tags:
  - DevOps
  - Docker
  - GitHub Actions
  - VPS
published: true
---


![HotJava Trình Diễn](/images/post/2026-1-28-auto-deploy-vps-github-actions/main.png)

Chào anh em, chắc hẳn ai làm Web cũng từng trải qua cái cảnh: Code xong tính năng mới, hì hục `git push`, rồi lại phải mở Terminal lên, SSH vào VPS, gõ một loạt lệnh `git pull`, `docker-compose down`, `up`...

Nhưng đời không như mơ, đôi khi bạn quên `stop` container cũ, hoặc một service nào đó đang "chiếm xác" cái Port khiến lần deploy sau thất bại ê chề. Nghĩ nó chán! Hôm nay mình sẽ hướng dẫn anh em cách biến quy trình này thành tự động hoàn toàn, thông minh đến mức tự biết dọn dẹp lỗi trùng Port luôn.

---

## Tại sao bạn cần quy trình này?

* **Tiết kiệm thời gian:** Không còn cảnh gõ lệnh thủ công.
* **Tránh sai sót:** CI/CD chạy theo script, không có chuyện "quên" hay "gõ nhầm".
* **Xử lý lỗi Port thông minh:** Tự phát hiện và "trảm" các container đang chiếm dụng tài nguyên.
* **Đúng chuẩn Production:** Chia tách môi trường rõ ràng, bảo mật tối đa.

**Quy trình hoạt động (Workflow)**
Trước khi bắt tay vào cấu hình, hãy cùng nhìn qua cái "sơ đồ bay" của hệ thống này. Hiểu rõ luồng đi sẽ giúp bạn không bị rối ở các bước sau:

1. **Local**: Bạn chỉ việc code, sau đó `git push` lên nhánh `release`.
2. **GitHub Actions**: Đóng vai trò "người điều phối". Nó nhận tín hiệu, khởi tạo một môi trường tạm thời để kết nối tới VPS của bạn thông qua SSH.
3. **VPS (Đích đến)**: Nhận lệnh từ GitHub để thực hiện chuỗi hành động: **Fetch code mới** -> **Dọn dẹp Port 1210** -> **Build & Up container**.
---

## Bước 1: Chuẩn bị môi trường trên VPS

Trước tiên, hãy SSH vào VPS và đảm bảo hệ thống đang ở trạng thái tốt nhất.

```bash
# SSH vào root
ssh root@<IP_VPS_CUA_BAN>

# Cập nhật hệ thống
apt update -y && apt upgrade -y

```

![HotJava Trình Diễn](/images/post/2026-1-28-auto-deploy-vps-github-actions/1.png)

---

## Bước 2: Tạo SSH Key – "Chìa khóa" cho GitHub Actions

Để GitHub có thể thay mặt bạn thực hiện lệnh trên VPS, nó cần một chìa khóa riêng.

1. **Tạo cặp khóa:**
```bash
ssh-keygen -t ed25519 -C "github-actions-dangth-prod" -f /root/.ssh/github_actions_dangth_prod

```


2. **Cấp quyền:** Đưa Public Key vào danh sách tin cậy.
```bash
cat /root/.ssh/github_actions_dangth_prod.pub >> /root/.ssh/authorized_keys
chmod 600 /root/.ssh/authorized_keys

```


![HotJava Trình Diễn](/images/post/2026-1-28-auto-deploy-vps-github-actions/2.png)


> [!WARNING]
> **Lưu ý cực quan trọng:**
> File /root/.ssh/github_actions_dangth_prod (Private Key) là "sinh mạng" của server bạn. Tuyệt đối không được push file này lên GitHub hay để lộ cho bất kỳ ai. Chúng ta chỉ copy nội dung của nó để dán vào GitHub Secrets ở bước sau thôi nhé!

---

## Bước 3: File Docker Compose chuẩn "hàng hiệu"

Chúng ta sẽ tạo file `docker-compose.prod.yml`. Điểm khác biệt ở đây là mình bỏ tag `image` cố định để Docker luôn build bản mới nhất từ source code vừa fetch về.

```yaml
services:
  dangth:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: dangth-prod
    environment:
      - NODE_ENV=production
      - PORT=1210
    ports:
      - "1210:1210"
    restart: unless-stopped
    networks:
      - webnet

networks:
  webnet:

```

![HotJava Trình Diễn](/images/post/2026-1-28-auto-deploy-vps-github-actions/3.png)
---

## Bước 4: Giải quyết "nỗi đau" trùng Port 1210

Đây là phần quan trọng nhất. Thông thường, nếu một container khác đang chạy ở port 1210, lệnh `up` của bạn sẽ chết đứng.

Thay vì phải SSH vào tìm PID để kill, mình sẽ tích hợp một đoạn script "thám tử" vào GitHub Actions. Nó sẽ:

1. Quét xem có container nào đang dùng port 1210 không.
2. Nếu có, "trảm" (stop & rm) ngay lập tức.
3. Sau đó mới tiến hành deploy bản mới.

---

## Bước 5: Thiết lập GitHub Actions Workflow

Trước khi dán đoạn code dưới đây vào project, bạn cần khai báo các "biến số" bí mật để GitHub có quyền truy cập VPS.
Vào Repository trên `GitHub` -> `Settings` -> `Secrets and variables` -> `Actions`.

Bấm New repository secret và thêm các biến:
- `PROD_HOST`: IP của VPS.
- `PROD_USER`: Thường là root.
- `PROD_KEY`: Nội dung file Private Key bạn vừa tạo ở Bước 2.

Sau khi xong, hãy tạo file `.github/workflows/deploy-prod.yml` với nội dung sau:

```yaml
name: Deploy Production - dangth

on:
  push:
    branches:
      - release

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to Production Server
        uses: appleboy/ssh-action@v1.0.3
        with:
          host: ${{ secrets.PROD_HOST }}
          username: ${{ secrets.PROD_USER }}
          key: ${{ secrets.PROD_KEY }}
          script: |
            set -e
            cd /root/projects/dangth

            echo "👉 Pulling latest code..."
            git fetch origin release
            git reset --hard origin/release

            echo "👉 Checking for containers using port 1210..."
            # Lệnh tìm container ID dựa trên port đang publish
            OLD_CONTAINER_ID=$(docker ps -q --filter "publish=1210")
            if [ -n "$OLD_CONTAINER_ID" ]; then
              echo "⚠️ Found old container $OLD_CONTAINER_ID occupying port 1210. Removing..."
              docker stop $OLD_CONTAINER_ID
              docker rm $OLD_CONTAINER_ID
            fi

            echo "👉 Deploying new version with Docker Compose..."
            docker compose -p dangth-prod -f docker-compose.prod.yml up -d --build

            echo "✅ Deploy Finished Successfully!"
            docker ps

```

![HotJava Trình Diễn](/images/post/2026-1-28-auto-deploy-vps-github-actions/4.png)

Bây giờ là lúc tận hưởng thành quả. Bạn chỉ cần thực hiện thao tác quen thuộc: Commit những dòng code tâm huyết và đẩy chúng lên nhánh release. Đây chính là "ngòi nổ" để kích hoạt toàn bộ hệ thống tự động mà chúng ta vừa thiết lập.

![HotJava Trình Diễn](/images/post/2026-1-28-auto-deploy-vps-github-actions/5.png)

Ngay lập tức, tab Actions trên GitHub sẽ bừng sáng. Bạn có thể nhìn thấy quy trình đang chạy từng bước một: từ việc SSH vào server, kiểm tra Port, cho đến build lại Docker image. Cảm giác ngồi xem máy tự làm việc thay mình thực sự rất "phê"!
![HotJava Trình Diễn](/images/post/2026-1-28-auto-deploy-vps-github-actions/6.png)


Và đây là kết quả cuối cùng: Một màu xanh hy vọng! Mọi dòng lệnh đều thực thi trơn tru, Port 1210 đã được bàn giao cho phiên bản code mới nhất mà không gặp bất kỳ sự cố xung đột nào.

![HotJava Trình Diễn](/images/post/2026-1-28-auto-deploy-vps-github-actions/7.png)
---

## Tổng kết

Vậy là xong! Từ nay, mỗi khi bạn `git push origin release`, hệ thống sẽ tự động vận hành. Bạn không còn phải lo lắng về việc quên tắt container cũ hay xung đột port nữa. Mọi thứ đều được tự động hóa và dọn dẹp sạch sẽ.

Việc tối ưu CI/CD không chỉ giúp bạn rảnh tay hơn mà còn hạn chế tối đa downtime cho ứng dụng của mình.

**Bạn có đang gặp khó khăn ở bước cấu hình SSH hay bị lỗi quyền (permission) trên VPS không? Hãy để lại comment bên dưới hoặc chia sẻ kinh nghiệm deploy của bạn, mình sẽ hỗ trợ giải đáp ngay nhé! 👇**
