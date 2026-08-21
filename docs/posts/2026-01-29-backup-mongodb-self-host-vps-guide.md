---
layout: Post
title: "Backup MongoDB Self-host & Media trên VPS Linux bằng Cronjob"
subtitle: "Hướng dẫn backup tự động MongoDB và file upload bằng Shell Script, Cronjob an toàn và hiệu quả"
author: "Trần Hữu Đang"
date: 2026-01-29
image: /images/post/2026-01-29-backup-mongodb-self-host-vps-guide/banner.png
tags:
  - DevOps
  - Linux
  - MongoDB
  - VPS
  - Backup
published: true
---


![](/images/post/2026-01-29-backup-mongodb-self-host-vps-guide/banner.png)

Trong quá trình vận hành các dự án sử dụng Nodejs (Express) và MongoDB tự triển khai (self-host) trên VPS, việc thiết lập một quy trình sao lưu (backup) dữ liệu là cực kỳ quan trọng. Sai lầm phổ biến của nhiều người là chỉ sử dụng MongoDB Compass để xuất dữ liệu thủ công hoặc viết logic backup ngay trong code ứng dụng.

Bài viết này sẽ hướng dẫn bạn thiết lập hệ thống backup tự động bằng Shell Script và Cronjob, giúp sao lưu cả cơ sở dữ liệu lẫn các tệp tin media (upload) một cách khoa học.

## 1. Cấu trúc lưu trữ backup

Để quản lý dễ dàng, chúng ta sẽ tổ chức thư mục backup tại `/root/backup` với cấu trúc như sau:

* **mongodb/**: Chứa các bản dump dữ liệu từ MongoDB.
* **files/**: Chứa các bản nén của thư mục upload (ví dụ: `/root/data`).
* **logs/**: Lưu nhật ký quá trình thực hiện để theo dõi lỗi nếu có.

```text
/root/backup
├─ backup.sh
├─ mongodb/
│   └─ mongo_YYYY-MM-DD_HH-MM/
├─ files/
│   └─ files_YYYY-MM-DD_HH-MM.tar.gz
└─ logs/
    ├─ backup.log
    └─ cron.log

```

## 2. Thiết lập môi trường

Đầu tiên, bạn cần SSH vào VPS và khởi tạo cấu trúc thư mục:

```bash
mkdir -p /root/backup/{mongodb,files,logs}
cd /root/backup

```

![](/images/post/2026-01-29-backup-mongodb-self-host-vps-guide/1.png)

## 3. Xây dựng Script Backup (backup.sh)

Chúng ta sẽ sử dụng công cụ `mongodump` để sao lưu database và `tar` để nén thư mục chứa file.

Tạo file script:

```bash
nano /root/backup/backup.sh

```

![](/images/post/2026-01-29-backup-mongodb-self-host-vps-guide/2.png)

Dán nội dung dưới đây vào file:

```bash
#!/bin/bash

DATE=$(date +%F_%H-%M)

# Cấu hình thông số
MONGO_URI="mongodb://user:password@localhost:27017/dbname"
UPLOAD_DIR="/root/data"

BACKUP_ROOT="/root/backup"
DB_DIR="$BACKUP_ROOT/mongodb"
FILE_DIR="$BACKUP_ROOT/files"
LOG_FILE="$BACKUP_ROOT/logs/backup.log"

echo "[$(date)] START BACKUP" >> "$LOG_FILE"

# Backup MongoDB
mongodump \
  --uri="$MONGO_URI" \
  --gzip \
  --out="$DB_DIR/mongo_$DATE"

# Backup File Upload
tar -czf "$FILE_DIR/files_$DATE.tar.gz" "$UPLOAD_DIR"

echo "[$(date)] END BACKUP" >> "$LOG_FILE"
echo "--------------------------" >> "$LOG_FILE"

```

*Lưu ý: Hãy thay đổi `MONGO_URI` và `UPLOAD_DIR` đúng với thực tế dự án của bạn.*


![](/images/post/2026-01-29-backup-mongodb-self-host-vps-guide/3.png)

Sau khi lưu file (`Ctrl + O`, `Enter`, `Ctrl + X`), hãy cấp quyền thực thi cho script:

```bash
chmod +x /root/backup/backup.sh

```

![](/images/post/2026-01-29-backup-mongodb-self-host-vps-guide/4.png)

## 4. Kiểm tra vận hành

Trước khi đưa vào chạy tự động, bạn nên chạy thử script để đảm bảo mọi thứ hoạt động đúng:

```bash
/root/backup/backup.sh

```

Kiểm tra thư mục `mongodb` và `files` xem đã xuất hiện các bản backup mới chưa. Nếu log trong `/root/backup/logs/backup.log` không báo lỗi, bạn đã thành công bước đầu.


![](/images/post/2026-01-29-backup-mongodb-self-host-vps-guide/9.png)

## 5. Tự động hóa với Cronjob

Để hệ thống tự động backup vào lúc 02:00 sáng mỗi ngày, chúng ta sử dụng công cụ Cron của Linux.

Mở bảng quản lý Cron:

```bash
crontab -e
```

Thêm dòng sau vào cuối file:

```cron
0 2 * * * /root/backup/backup.sh >> /root/backup/logs/cron.log 2>&1
```

Cấu hình này sẽ thực thi script vào 2 giờ sáng và ghi toàn bộ kết quả xuất ra vào file `cron.log`.

![](/images/post/2026-01-29-backup-mongodb-self-host-vps-guide/11.png)

## 6. Tải bản sao lưu về máy cá nhân (Windows/MacOS)

Đừng bao giờ để bản backup duy nhất nằm trên cùng một server với dữ liệu gốc. Bạn nên định kỳ tải chúng về máy tính cá nhân.

Mở Command Prompt hoặc PowerShell trên máy tính của bạn và chạy lệnh sau:

```powershell
# Tải toàn bộ thư mục backup về thư mục hiện hành
scp -r "root@IP_VPS:/root/backup" .
```

![](/images/post/2026-01-29-backup-mongodb-self-host-vps-guide/9.png)

![](/images/post/2026-01-29-backup-mongodb-self-host-vps-guide/10.png)

## 7. Quy trình khôi phục dữ liệu (Restore)

Khi có sự cố xảy ra, bạn có thể khôi phục dữ liệu bằng các lệnh sau:

**Đối với MongoDB:**

```bash
mongorestore --gzip /root/backup/mongodb/mongo_YYYY-MM-DD_HH-MM
```

**Đối với File Upload:**

```bash
tar -xzf /root/backup/files/files_YYYY-MM-DD_HH-MM.tar.gz -C /

```

## Một số lưu ý quan trọng

1. **Tính toàn vẹn**: Luôn thử giải nén và kiểm tra file backup định kỳ để đảm bảo dữ liệu không bị hỏng.
2. **Lưu trữ ngoại vi**: Bài viết này hướng dẫn backup tại chỗ, nhưng trong thực tế, bạn nên cân nhắc đẩy các file này lên S3, Google Drive hoặc một Server khác để tối ưu độ an toàn.
3. **Dọn dẹp**: Theo thời gian, các bản backup sẽ làm đầy ổ cứng. Bạn nên bổ sung logic xóa các bản backup cũ hơn 30 ngày trong script.

Hy vọng hướng dẫn này giúp bạn quản lý dữ liệu dự án của mình an toàn hơn. Nếu bạn muốn nâng cấp script để gửi thông báo qua Telegram khi backup xong, hãy cho mình biết nhé.

---

Tiếp theo, bạn có muốn tôi bổ sung thêm đoạn code tự động xóa các bản backup cũ (rotation) sau một khoảng thời gian nhất định để tránh đầy ổ cứng không?