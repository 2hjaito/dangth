---
layout: Post
title: Bài 1. Setup môi trường
subtitle: Cài đặt Git & tạo tài khoản GitHub
author: "Trần Hữu Đang"
date: "2023-07-10"
headerImage: https://github.com/theanishtar/images/blob/main/angurvad/github/session1/downloadgit.png?raw=true
headerMask: rgba(39, 77, 61, 0.61)
permalinkPattern: /ebook/git/:slug/
tags:
  - Git
  - GitHub
  - Cài đặt môi trường
  - Hướng dẫn cơ bản
---

<!-- # Bài 1. Setup môi trường -->

## Git là gì?

Git là một trong những Hệ thống Quản lý Phiên bản Phân tán, vốn được phát triển nhằm quản lý mã nguồn (source code) của Linux.

Trên Git, ta có thể lưu trạng thái của file dưới dạng lịch sử cập nhật. Vì thế, có thể đưa file đã chỉnh sửa về trạng thái cũ hay có thể biết được file đã được chỉnh sửa chỗ nào do ai đã chỉnh sửa.

## GitHub là gì?

Là máy chủ cung cấp dịch vụ lưu trữ mã nguồn lớn nhất thế giới.

- Cho phép xây dựng chung mã nguồn với 
bất kì người nào có tài khoản Github.

- Các chức năng thêm vào của Github: UI, Document, bug tracking, feature request, pull request… và nhiều hơn!

>[!INFO]
>Tóm lại :
>- **Git** là phần mềm quản lí mã nguồn
>- **GitHub** là website để mọi người sử dụng trên nền tảng của **Git**


## Cài đặt Git và Tạo tài khoản GitHub


**Bước 1: Truy cập [Git](https://git-scm.com/downloads) để cài đặt phiên bản tương thích với máy bạn**

![Tải Git](https://github.com/theanishtar/images/blob/main/angurvad/github/session1/downloadgit.png?raw=true)

**Bước 2: Cài đặt phần mềm vào máy**

![Cài Git](https://github.com/theanishtar/images/blob/main/angurvad/github/session1/caidat.png?raw=true)

Khi nào *click chuột phải* và thấy 2 dòng này thì đã cài **Git** thành công


 <!-- <img src="https://github.com/theanishtar/images/blob/main/angurvad/github/session1/09d15404acfc79a220ed.jpg?raw=true" title="" alt="Professor Male.png" width="300"> -->

## Tạo tài khoản GitHub

Tạo tài khoản GitHub [tại đây](https://github.com/signup?source=login)

Khi tạo xong tiến hành đăng nhập vào GitHub luôn nhé

## Đăng nhập vào Git

**Bước 1: Click chuột phải vào màn hình và chọn `Git Bash Here`** 

![Bash Git](https://github.com/theanishtar/images/blob/main/angurvad/github/session1/ab23d3822f7afa24a36b.jpg?raw=true)

**Bước 2: Tiến hành gõ lần lượt các lệnh sau**

```bash
$ git config --global user.name myname	
$ git config --global user.email myemail@example.com
$ git config --global user.password mypassword
```

>[!WARNING]
>Thay thế các từ sau:
>- **myname** -> Username đã đăng ký GitHub
>
>- **myemail@example.com** -> Địa chỉ email đã đăng ký tài khoản
>
>- **mypassword** -> Mật khẩu tài khoản GitHub của bạn

![Bash Git](https://github.com/theanishtar/images/blob/main/angurvad/github/session1/dangnhap.png?raw=true)

**Bước 3: Kiểm tra đã đăng nhập thành công hay chưa**

Gõ lệnh sau và **enter**:

```bash
$ git config --list
```

Nếu dữ liệu hiện ra như sau (và đúng với thông tin tài khoản GitHub của bạn) thì đã đăng nhập thành công!

![Bash Git](https://github.com/theanishtar/images/blob/main/angurvad/github/session1/list.png?raw=true)


<iframe width="100%" height="450" src="https://www.youtube.com/embed/RV_jojt_2bo?si=KhYiTBJdNeHYFfMa" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
