---
layout: Post
title: "Backing up a self-hosted MongoDB & Media files on a Linux VPS with Cronjob"
slug: backup-mongodb-self-host-media-tren-vps-linux-bang-cronjob
subtitle: "Automatically backing up MongoDB and uploaded files with a safe, effective Shell Script and Cronjob"
author: "Trần Hữu Đang"
date: 2026-01-29
image: /images/post/2026-01-29-backup-mongodb-self-host-vps-guide/banner.webp
tags:
  - DevOps
  - Linux
  - MongoDB
  - VPS
  - Backup
published: true
---


![](/images/post/2026-01-29-backup-mongodb-self-host-vps-guide/banner.webp)

While running projects that use Node.js (Express) and a self-hosted MongoDB on a VPS, setting up a data backup process is extremely important. A common mistake many people make is only using MongoDB Compass to export data manually, or writing backup logic directly inside the application code.

This article will walk you through setting up an automated backup system using a Shell Script and Cronjob, letting you back up both the database and the media (upload) files in a systematic way.

## 1. Backup storage structure

To keep things easy to manage, we'll organize the backup directory at `/root/backup` with the following structure:

* **mongodb/**: Holds the data dumps from MongoDB.
* **files/**: Holds the compressed archives of the upload folder (e.g., `/root/data`).
* **logs/**: Stores logs of the process, so you can track errors if any occur.

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

## 2. Setting up the environment

First, SSH into the VPS and initialize the folder structure:

```bash
mkdir -p /root/backup/{mongodb,files,logs}
cd /root/backup

```

![](/images/post/2026-01-29-backup-mongodb-self-host-vps-guide/1.webp)

## 3. Building the Backup Script (backup.sh)

We'll use the `mongodump` tool to back up the database and `tar` to compress the folder containing the files.

Create the script file:

```bash
nano /root/backup/backup.sh

```

![](/images/post/2026-01-29-backup-mongodb-self-host-vps-guide/2.webp)

Paste the following content into the file:

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

*Note: Make sure to update `MONGO_URI` and `UPLOAD_DIR` to match your actual project setup.*


![](/images/post/2026-01-29-backup-mongodb-self-host-vps-guide/3.webp)

After saving the file (`Ctrl + O`, `Enter`, `Ctrl + X`), grant execute permission to the script:

```bash
chmod +x /root/backup/backup.sh

```

![](/images/post/2026-01-29-backup-mongodb-self-host-vps-guide/4.webp)

## 4. Verifying it works

Before setting it up to run automatically, you should run the script manually to make sure everything works correctly:

```bash
/root/backup/backup.sh

```

Check the `mongodb` and `files` folders to see whether new backups have appeared. If the log at `/root/backup/logs/backup.log` shows no errors, you've succeeded at this first step.


![](/images/post/2026-01-29-backup-mongodb-self-host-vps-guide/9.webp)

## 5. Automating with Cronjob

To have the system automatically back up at 2:00 AM every day, we'll use Linux's Cron tool.

Open the Cron editor:

```bash
crontab -e
```

Add the following line to the end of the file:

```cron
0 2 * * * /root/backup/backup.sh >> /root/backup/logs/cron.log 2>&1
```

This configuration will run the script at 2 AM and write all output to the `cron.log` file.

![](/images/post/2026-01-29-backup-mongodb-self-host-vps-guide/11.webp)

## 6. Downloading the backup to your personal machine (Windows/macOS)

Never let the only copy of your backup sit on the same server as the original data. You should periodically download it to your personal computer.

Open Command Prompt or PowerShell on your computer and run the following command:

```powershell
# Download the entire backup folder to the current directory
scp -r "root@IP_VPS:/root/backup" .
```

![](/images/post/2026-01-29-backup-mongodb-self-host-vps-guide/9.webp)

![](/images/post/2026-01-29-backup-mongodb-self-host-vps-guide/10.webp)

## 7. Data recovery (Restore) process

If something goes wrong, you can restore your data using the following commands:

**For MongoDB:**

```bash
mongorestore --gzip /root/backup/mongodb/mongo_YYYY-MM-DD_HH-MM
```

**For uploaded files:**

```bash
tar -xzf /root/backup/files/files_YYYY-MM-DD_HH-MM.tar.gz -C /

```

## A few important notes

1. **Integrity**: Always try extracting and checking your backup files periodically to make sure the data isn't corrupted.
2. **Off-site storage**: This article covers local backups, but in practice you should consider pushing these files to S3, Google Drive, or another server for better safety.
3. **Cleanup**: Over time, backups will fill up your disk. You should add logic to delete backups older than 30 days in the script.

I hope this guide helps you manage your project's data more safely. If you'd like to upgrade the script to send a Telegram notification when the backup finishes, let me know.

---

Tiếp theo, bạn có muốn tôi bổ sung thêm đoạn code tự động xóa các bản backup cũ (rotation) sau một khoảng thời gian nhất định để tránh đầy ổ cứng không?