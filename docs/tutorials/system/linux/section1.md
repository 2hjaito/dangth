# Bước 1: Nắm Vững Kiến Thức Cơ Bản Về Linux

---
## Giới thiệu
Linux là một trong những hệ điều hành phổ biến nhất hiện nay, đặc biệt trong lĩnh vực máy chủ, lập trình và bảo mật.  
Học Linux giúp bạn:
- Hiểu cách hệ thống máy tính hoạt động ở mức thấp.
- Sử dụng các công cụ mạnh mẽ cho lập trình và quản trị hệ thống.
- Tự do tùy chỉnh và tối ưu hóa môi trường làm việc.

---
## 1. Linux là gì?
Linux là **hệ điều hành mã nguồn mở** dựa trên nhân (kernel) Linux, được phát triển lần đầu bởi **Linus Torvalds** năm 1991.

### 1.1. Đặc điểm của Linux:
- **Mã nguồn mở**: Mọi người đều có thể xem, sửa và phân phối lại mã nguồn.
- **Đa người dùng**: Hỗ trợ nhiều tài khoản truy cập cùng lúc.
- **Đa nhiệm**: Chạy nhiều tiến trình đồng thời.
- **Tính bảo mật cao**: Quản lý quyền truy cập nghiêm ngặt.
- **Tính ổn định**: Hoạt động bền bỉ, ít bị crash.

### 1.2. Cấu trúc cơ bản của Linux:
1. **Kernel (Nhân hệ điều hành)**: Giao tiếp giữa phần cứng và phần mềm.
2. **Shell**: Giao diện dòng lệnh cho người dùng.
3. **File System**: Quản lý dữ liệu và thư mục.
4. **Ứng dụng**: Chạy trên nền tảng Linux.

---
## 2. Ưu điểm của Linux so với Windows
| Tiêu chí          | Linux | Windows |
|-------------------|-------|---------|
| Chi phí           | Miễn phí | Có phí bản quyền |
| Bảo mật           | Cao | Dễ bị virus |
| Hiệu năng         | Ổn định trên phần cứng yếu | Cần cấu hình mạnh |
| Tùy biến          | Linh hoạt | Giới hạn |
| Hệ sinh thái      | Nhiều bản phân phối | Một phiên bản chính |
| Cộng đồng hỗ trợ  | Mạnh mẽ | Có hỗ trợ chính thức |

**Kết luận:** Linux phù hợp cho lập trình viên, quản trị viên hệ thống, còn Windows phổ biến với người dùng phổ thông.

---
## 3. Các bản phân phối Linux phổ biến
Linux không chỉ có một phiên bản duy nhất mà được chia thành nhiều **bản phân phối** (distro) khác nhau.

### 3.1. Ubuntu
- Thân thiện cho người mới bắt đầu.
- Hệ sinh thái phần mềm phong phú.
- Phát triển dựa trên Debian.

### 3.2. Debian
- Nổi tiếng ổn định.
- Dùng nhiều trong máy chủ.
- Chu kỳ phát hành dài.

### 3.3. CentOS
- Phiên bản cộng đồng của Red Hat Enterprise Linux.
- Thích hợp cho doanh nghiệp.

### 3.4. Arch Linux
- Dành cho người dùng nâng cao.
- Triết lý **"Do It Yourself"**.

---
## 4. Cài đặt và sử dụng máy ảo

Máy ảo giúp bạn chạy Linux mà không ảnh hưởng đến hệ điều hành hiện tại.

### 4.1. Sử dụng VirtualBox
**Bước 1:** Cài đặt VirtualBox
```bash
# Ubuntu/Debian
sudo apt update && sudo apt install virtualbox -y

# CentOS/RHEL
sudo yum install epel-release -y
sudo yum install virtualbox -y
```
**Bước 2:** Tải file ISO của Linux (VD: Ubuntu ISO từ ubuntu.com).  
**Bước 3:** Tạo máy ảo mới, chọn ISO và tiến hành cài đặt.

### 4.2. Sử dụng VMware Workstation
1. Tải VMware từ [vmware.com](https://www.vmware.com/).
2. Cài đặt và mở VMware Workstation.
3. Tạo máy ảo mới → chọn file ISO → cài đặt Linux.

### 4.3. Khởi động và cài đặt gói phần mềm
Sau khi cài xong Linux trên máy ảo, cập nhật hệ thống:
```bash
sudo apt update && sudo apt upgrade -y  # Ubuntu/Debian
sudo yum update -y                      # CentOS/RHEL
```

---
## 5. Lệnh cơ bản trong Linux

| Lệnh | Mô tả |
|------|-------|
| `pwd` | Hiển thị thư mục hiện tại |
| `ls` | Liệt kê file/thư mục |
| `cd` | Chuyển thư mục |
| `cp` | Sao chép file/thư mục |
| `mv` | Di chuyển hoặc đổi tên |
| `rm` | Xóa file/thư mục |
| `chmod` | Thay đổi quyền truy cập |
| `chown` | Thay đổi chủ sở hữu |
| `sudo` | Chạy lệnh với quyền admin |

Ví dụ:
```bash
# Di chuyển vào thư mục /home
cd /home

# Liệt kê tất cả file, bao gồm file ẩn
ls -la

# Tạo thư mục mới
mkdir myfolder

# Sao chép file
cp file.txt /home/user/Documents/
```

---
## 6. Tài nguyên học tập
- [Linux Official](https://www.kernel.org/)
- [Ubuntu Docs](https://help.ubuntu.com/)
- [Arch Wiki](https://wiki.archlinux.org/)
- [DigitalOcean Tutorials](https://www.digitalocean.com/community/tutorials)
