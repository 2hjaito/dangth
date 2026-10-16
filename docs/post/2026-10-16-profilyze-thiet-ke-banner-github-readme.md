---
layout: Post
title: "Profilyze: Thiết kế banner GitHub README bằng kéo thả, có số liệu GitHub trực tiếp"
slug: profilyze-thiet-ke-banner-github-readme
subtitle: "Kéo thả banner trên canvas, lấy streak, contributions và lượt xem từ GitHub, nhúng vào profile bằng một dòng Markdown"
author: "Trần Hữu Đang"
date: "2026-10-16"
image: /images/post/2026-10-16-profilyze-thiet-ke-banner-github-readme/banner.webp
tags:
  - GitHub
  - README
  - Profile
  - Open Source
  - Next.js
  - SVG
published: true
---

![](/images/post/2026-10-16-profilyze-thiet-ke-banner-github-readme/banner.webp)

Chào anh em,

Trang profile GitHub là thứ đầu tiên nhà tuyển dụng hay đồng nghiệp nhìn thấy khi bấm vào username của bạn. Một file `README.md` đẹp, có banner riêng, có streak và biểu đồ hoạt động sẽ tạo ấn tượng tốt hơn nhiều so với một trang trống chỉ có danh sách repository.

Vấn đề là tự làm thì khá cực: mở Photoshop thiết kế banner, xuất ảnh, upload lên repo, rồi đi tìm vài dịch vụ thống kê khác nhau, mỗi cái một kiểu. Khi muốn sửa một dòng chữ thì lại phải làm lại từ đầu.

Mình làm **[Profilyze](https://profilyze.vercel.app)** để giải quyết chuyện đó. Bài viết này giới thiệu Profilyze và hướng dẫn anh em dùng nó để có một trang profile hoàn chỉnh trong khoảng 5 phút.

> [!TIP]
> **Mọi banner và widget trong bài này đều là ảnh live**, được render trực tiếp từ Profilyze với dữ liệu thật của tài khoản [@2hjaito](https://github.com/2hjaito). Bấm vào banner bất kỳ để mở nó trong editor và chỉnh thử.

---

## 1. Profilyze là gì?

Profilyze là một **trình chỉnh sửa trực quan** cho banner ở đầu trang GitHub profile, kèm theo bộ **widget live** cho streak, biểu đồ đóng góp, thống kê và ngôn ngữ lập trình.

Ví dụ banner dưới đây được làm bằng Profilyze. Các con số streak, lượt xem và contributions được cập nhật tự động:

[![Banner demo](https://profilyze.vercel.app/api/banner?c=nZNLb9swEIT_ijC-MoUetmrzVjQuCtRAizbNJchhLVEyLZlUSfqhGvnvBSW_2wBFdFlIGM58u0vtsQGPGNZWGHDEiyVJp8GwqcDRGF3Iuv0t7oygfCXAMC_B96ikysFRGsqlUA4MhdErcAzCeRTGIRic7l6LuEgIDKTKWoBHyeiFIZcr8JDBgEcpg6gt-NMe0nvShhwZMOzAhyFDCz4cMVgvDRlc24hLlZGq9EHjRMyLCC_sYKOow92Bx_G4dxl2LsP0ZOLEzqN3hePBkAo-r9fBPanSd6SV_2wbysRdabQTtgLDFvx9GDJkutZ-ZIOie87JRtfH5KTnj8I-Ohq_Ev3p52z24-HDxy_B_fRxOvv6bfr9DCCVE6YPTq-CDy0z-PGF76ITga1kXdsbBj9LC56cZygzrbyqr_wJxJe08cvyApsZ2XhGIyjzlbjSuVj6E7nOqo6p0daVRthfNZ4ZSmp8s2cOZwRVNxyT9LDME4d15P27cnHIY_lN80IaP9Ca5qIGR05tcBL9PaN_LoeBskx00kFRTNJheN7XRortYVjJJP4_yOOZE6NdkL-JpC5Aj6I3MN7e5tJQs-gZ0-HVdY7iE-JRtBWisuDxZUYyyZNRcjbMtHJGzu21Z5SOe9PRK31fHDu2njm5ka696PsgWjuplQ3cQtqgFd3P-oZJHMGfX_4A)](https://profilyze.vercel.app/?c=nZNLb9swEIT_ijC-MoUetmrzVjQuCtRAizbNJchhLVEyLZlUSfqhGvnvBSW_2wBFdFlIGM58u0vtsQGPGNZWGHDEiyVJp8GwqcDRGF3Iuv0t7oygfCXAMC_B96ikysFRGsqlUA4MhdErcAzCeRTGIRic7l6LuEgIDKTKWoBHyeiFIZcr8JDBgEcpg6gt-NMe0nvShhwZMOzAhyFDCz4cMVgvDRlc24hLlZGq9EHjRMyLCC_sYKOow92Bx_G4dxl2LsP0ZOLEzqN3hePBkAo-r9fBPanSd6SV_2wbysRdabQTtgLDFvx9GDJkutZ-ZIOie87JRtfH5KTnj8I-Ohq_Ev3p52z24-HDxy_B_fRxOvv6bfr9DCCVE6YPTq-CDy0z-PGF76ITga1kXdsbBj9LC56cZygzrbyqr_wJxJe08cvyApsZ2XhGIyjzlbjSuVj6E7nOqo6p0daVRthfNZ4ZSmp8s2cOZwRVNxyT9LDME4d15P27cnHIY_lN80IaP9Ca5qIGR05tcBL9PaN_LoeBskx00kFRTNJheN7XRortYVjJJP4_yOOZE6NdkL-JpC5Aj6I3MN7e5tJQs-gZ0-HVdY7iE-JRtBWisuDxZUYyyZNRcjbMtHJGzu21Z5SOe9PRK31fHDu2njm5ka696PsgWjuplQ3cQtqgFd3P-oZJHMGfX_4A)

Những điểm mình thấy đáng giá nhất:

* **Kéo thả trên canvas**: chọn template, kéo, đổi kích thước, đổi màu, đổi font mọi thành phần.
* **Số liệu GitHub live**: streak, contributions, commits, stars, followers, biểu đồ hoạt động và avatar.
* **Đếm lượt xem profile**: tăng mỗi lần có người mở profile của bạn (có cả icon Sharingan 👀).
* **Sắc nét ở mọi kích thước**: chữ, biểu đồ và logo đều là vector SVG, font được nhúng sẵn nên **tiếng Việt hiển thị chuẩn**.
* **Không cần tài khoản**: toàn bộ layout nằm trong URL, không lưu gì trên server.
* **Sửa lại bất cứ lúc nào**: bấm vào banner trên GitHub là mở lại đúng thiết kế đó trong editor.
* **Mã nguồn mở**: [github.com/2hjaito/profilyze](https://github.com/2hjaito/profilyze).

---

## 2. Thiết kế banner trong 3 bước

Truy cập [profilyze.vercel.app](https://profilyze.vercel.app), anh em sẽ thấy ngay giao diện editor:

![](/images/post/2026-10-16-profilyze-thiet-ke-banner-github-readme/editor.webp)

### Bước 1: Thiết kế

Chọn một trong 3 template ở thanh trên cùng (**Classic**, **Minimal**, **Stats**), sau đó chỉnh theo ý mình:

* **Kéo** để di chuyển, **kéo góc** để đổi kích thước.
* **Bấm vào nền** để di chuyển hoặc zoom ảnh nền.
* Phím mũi tên để nhích từng chút (giữ `Shift` để nhích x10), giữ `Option/Alt` để tắt snapping.
* `⌘Z` / `Ctrl+Z` để hoàn tác.
* Nút **Add element** để thêm chữ, icon, thống kê, biểu đồ hoặc avatar.

Ba template mặc định trông như sau (đều là ảnh live, bấm vào để mở trong editor):

| Template | Xem trước |
| --- | --- |
| **Classic**: giao diện gốc, có icon động | [![Classic template](https://profilyze.vercel.app/api/banner?c=rZNRb9owFIX_Cjp99SYnpFl231BLN2mom7qyl6kPl8QBQ0iQbVIY4r9XTkKgEn1bXq4VX9_vnOPkgBoUCGytMiCEiyVrV0FgNgcdsNJlBsLGKKscBEpeKxC043ShAxwFMr0GSQEDCkIBVVjQ3wO0P9Z0C7j9xh9yaudHNIXw_DR6HHyfTgf3o8dvENiBglgK7EFJImBBcSSQV6Vv1qVTBgKvoERKgbQqKi_3Jm8eHEVHNFXxIfFhOpn8fh7d_Rjcj_-MJz9_jZ9O3KjhBnELDq-C43fgZKhmeQAB71d-DsJeglPp4ixBp1UJ0RYC05JrbqnJbevWm7agIJL9CLvSRWHfD7HdFB8vmLicbwv20pjqrVraZmUUp65bl1XmX780sNtIdhZb2jASmPMGFFxQnVG8OlOtY59eUy52eyu5Nj7rgmeqACHj_aBvukh12BJDeS3UL9duU4DTVDWtN3n-NY7k-YJrrV7tRxpPm71Eu2CjyzmXFzpPTTufgvwPErtP4fgiUK-an6XKdbH_pz4Zxdla4fgG)](https://profilyze.vercel.app/?c=rZNRb9owFIX_Cjp99SYnpFl231BLN2mom7qyl6kPl8QBQ0iQbVIY4r9XTkKgEn1bXq4VX9_vnOPkgBoUCGytMiCEiyVrV0FgNgcdsNJlBsLGKKscBEpeKxC043ShAxwFMr0GSQEDCkIBVVjQ3wO0P9Z0C7j9xh9yaudHNIXw_DR6HHyfTgf3o8dvENiBglgK7EFJImBBcSSQV6Vv1qVTBgKvoERKgbQqKi_3Jm8eHEVHNFXxIfFhOpn8fh7d_Rjcj_-MJz9_jZ9O3KjhBnELDq-C43fgZKhmeQAB71d-DsJeglPp4ixBp1UJ0RYC05JrbqnJbevWm7agIJL9CLvSRWHfD7HdFB8vmLicbwv20pjqrVraZmUUp65bl1XmX780sNtIdhZb2jASmPMGFFxQnVG8OlOtY59eUy52eyu5Nj7rgmeqACHj_aBvukh12BJDeS3UL9duU4DTVDWtN3n-NY7k-YJrrV7tRxpPm71Eu2CjyzmXFzpPTTufgvwPErtP4fgiUK-an6XKdbH_pz4Zxdla4fgG) |
| **Minimal**: avatar, tên và tech stack trên nền gradient | [![Minimal template](https://profilyze.vercel.app/api/banner?c=dZFdT8IwFIb_Cnm9raYbY5DemTg_bjRREi8IF2U7m3Wjne1AkPDfzRkKcmFvTk5z-jxv2x3WUJHAooLaoTa2gELldWHIdhAovVtC4UIuIhlLCHSO2zgZynQBAW2rhqCiWO4FCrOEkgIeKkoFqAlQsx0MM_Vad9ozYNvS334DlUwEtlDJSCDwUUYYW7FoQjouS-zFD8bqJZ0gHW04ZF8Upl7bwf1qNbjRtjqQ4yTp0Wnco0epQOksDxvbEes_oSZSCuSucZ6NZb9ORu-af40vT7fT1-vnbJA93j08Ztnzr3XcW6Nh2mtjedSGVud0WXnXUagP-tGZXo8WSZlDgB9PXkXJMUioTdOEUxSTO8vtoapZvx9yb1pO6EnnXK0r6J3HCpfX_Y1bF7rKU_hoMD-POz7EHUqBSrf8q_u5wCoQJ4vf3rXpHATWNRRa70rTbL_o0pMuloT9Nw)](https://profilyze.vercel.app/?c=dZFdT8IwFIb_Cnm9raYbY5DemTg_bjRREi8IF2U7m3Wjne1AkPDfzRkKcmFvTk5z-jxv2x3WUJHAooLaoTa2gELldWHIdhAovVtC4UIuIhlLCHSO2zgZynQBAW2rhqCiWO4FCrOEkgIeKkoFqAlQsx0MM_Vad9ozYNvS334DlUwEtlDJSCDwUUYYW7FoQjouS-zFD8bqJZ0gHW04ZF8Upl7bwf1qNbjRtjqQ4yTp0Wnco0epQOksDxvbEes_oSZSCuSucZ6NZb9ORu-af40vT7fT1-vnbJA93j08Ztnzr3XcW6Nh2mtjedSGVud0WXnXUagP-tGZXo8WSZlDgB9PXkXJMUioTdOEUxSTO8vtoapZvx9yb1pO6EnnXK0r6J3HCpfX_Y1bF7rKU_hoMD-POz7EHUqBSrf8q_u5wCoQJ4vf3rXpHATWNRRa70rTbL_o0pMuloT9Nw) |
| **Stats**: streak, contributions và biểu đồ hoạt động | [![Stats template](https://profilyze.vercel.app/api/banner?c=pdDPbtwgEAbwV7G-XImEvV6ny7HqIQ-QW9XD2B7bxCysgP3jrvbdK-wk3khNL-UyAob5fuKKE1QuUPdQV4zatlDoPbWabYRA590eCg-yzfP8CQLRpW0ui21OECDbG4bKK3kTaPUeSgr4dCDAJkD9vEKnmZb2nJ5PB4ZC5EuaPheFF082ez4esx9kewhcoMpSYFpKgCorgc7Z1BsO1PBj713kMELgDPUkpUDjjPOJ1s0LN_EW7J35Mvj7UZtW2z6Lg7Z9yDrnszhwdub6jVHNjFwujkJ-OLSN7Jf88lP-rqslVWt-iJ5pXAUhUhLM5e5WN85CoTPLPxmq2UChpSn76LkDVd_-AfrrhwhQ0_Dc-tB1u6qUqzG6SOYrYuNs9LoOK5KaqE86TnfOOOiQTUz-E7OQxf8wN7t2s92szN7TYViZ79sL1LaSc-B2yctLgTPzmKI3dxnvA38JHAOno2J4JR0dBE4jFA7eddpMv_nRM7V7xu0P)](https://profilyze.vercel.app/?c=pdDPbtwgEAbwV7G-XImEvV6ny7HqIQ-QW9XD2B7bxCysgP3jrvbdK-wk3khNL-UyAob5fuKKE1QuUPdQV4zatlDoPbWabYRA590eCg-yzfP8CQLRpW0ui21OECDbG4bKK3kTaPUeSgr4dCDAJkD9vEKnmZb2nJ5PB4ZC5EuaPheFF082ez4esx9kewhcoMpSYFpKgCorgc7Z1BsO1PBj713kMELgDPUkpUDjjPOJ1s0LN_EW7J35Mvj7UZtW2z6Lg7Z9yDrnszhwdub6jVHNjFwujkJ-OLSN7Jf88lP-rqslVWt-iJ5pXAUhUhLM5e5WN85CoTPLPxmq2UChpSn76LkDVd_-AfrrhwhQ0_Dc-tB1u6qUqzG6SOYrYuNs9LoOK5KaqE86TnfOOOiQTUz-E7OQxf8wN7t2s92szN7TYViZ79sL1LaSc-B2yctLgTPzmKI3dxnvA38JHAOno2J4JR0dBE4jFA7eddpMv_nRM7V7xu0P) |

Ở panel **Canvas**, anh em có thể chọn:

* **Tỉ lệ khung hình**: `4:1`, `3:1`, `2:1` hoặc `16:9`.
* **Nền**: ảnh có sẵn (rất nhiều nền động như Itachi, Pixel City, Aurora...), gradient hoặc URL ảnh của riêng bạn.
* Độ tối nền và bo góc.

### Bước 2: Kết nối GitHub

Nhập **GitHub username** vào ô ở góc phải phía trên. Profilyze sẽ tự điền streak, contributions, biểu đồ hoạt động và avatar bằng dữ liệu thật của bạn ngay trong lúc thiết kế.

### Bước 3: Nhúng vào profile

Panel **Embed** có sẵn 3 định dạng: **Markdown**, **HTML** và **URL**. Bấm **Copy** và dán vào `README.md` của profile là xong.

```md
[![TRAN HUU DANG banner](https://profilyze.vercel.app/api/banner?c=...)](https://profilyze.vercel.app/?c=...)
```

> [!NOTE]
> Tham số `c` chứa toàn bộ layout của banner (JSON được nén rồi mã hoá base64url). Vì vậy link vừa là ảnh, vừa là "file thiết kế": bấm vào banner trên GitHub sẽ mở lại đúng thiết kế đó để sửa tiếp. Nếu làm mất link, dán URL banner vào ô **Edit an existing banner** cũng được, kể cả link từ API cũ.

---

## 3. Các thành phần của banner

| Thành phần | Chức năng |
| --- | --- |
| **Text** | 6 font nhúng sẵn (Inter, Space Grotesk, JetBrains Mono, Bebas Neue, Allerta, AR One Sans). Font được cắt theo đúng ký tự dùng nên tiếng Việt hoạt động tốt. |
| **Icon / Icon row** | 13 icon động từ phiên bản gốc, cộng thêm 66 logo công nghệ dạng vector (Devicon). |
| **GitHub stat** | Streak hiện tại hoặc dài nhất, contributions (năm qua hoặc toàn bộ), commits, stars, followers, repositories, pull requests hoặc **lượt xem profile**. |
| **Contribution graph** | Biểu đồ hoạt động 4 đến 53 tuần gần nhất, đổi màu tuỳ ý. |
| **Avatar** | Avatar GitHub, có thể thêm viền. |

---

## 4. Tạo nguyên một README chỉ trong vài phút

Nếu anh em lười viết README từ đầu, trang [README generator](https://profilyze.vercel.app/readme) sẽ ráp sẵn mọi thứ:

![](/images/post/2026-10-16-profilyze-thiet-ke-banner-github-readme/readme.webp)

* Banner vừa thiết kế ở editor (bấm **Edit design** để quay lại chỉnh).
* Lời chào và phần giới thiệu bản thân, mỗi dòng là một gạch đầu dòng.
* Tech stack chọn từ 66 logo vector.
* Các widget streak, graph, stats và languages dùng chung một theme.
* Badge liên kết tới các mạng xã hội.

Bên phải là phần **Preview** hiển thị giống hệt trên GitHub. Xong thì bấm **Copy Markdown** hoặc **Download** để tải file `README.md`. Mọi thứ anh em nhập đều được lưu lại trong trình duyệt, lần sau quay lại không bị mất.

---

## 5. Widget thống kê GitHub

Nếu chỉ cần vài thẻ thống kê riêng lẻ, vào trang [Widgets](https://profilyze.vercel.app/widgets), nhập username, chọn theme rồi **Copy Markdown** cho từng thẻ:

![](/images/post/2026-10-16-profilyze-thiet-ke-banner-github-readme/widgets.webp)

Dưới đây là các widget live:

**Streak**

![Streak card](https://profilyze.vercel.app/api/github/streak?user=2hjaito&theme=github-dark)

**Contribution graph**

![Contribution graph](https://profilyze.vercel.app/api/github/graph?user=2hjaito&theme=midnight)

**Stats**

![Stats card](https://profilyze.vercel.app/api/github/stats?user=2hjaito&theme=tokyonight)

**Top languages**

![Top languages card](https://profilyze.vercel.app/api/github/languages?user=2hjaito&theme=dracula)

Cách dùng rất đơn giản, chỉ cần thay `user` thành username của bạn:

```md
![Streak](https://profilyze.vercel.app/api/github/streak?user=<username>&theme=github-dark)
![Graph](https://profilyze.vercel.app/api/github/graph?user=<username>&theme=midnight)
![Stats](https://profilyze.vercel.app/api/github/stats?user=<username>&theme=tokyonight)
![Languages](https://profilyze.vercel.app/api/github/languages?user=<username>&theme=dracula)
```

### Theme

Thêm `&theme=<tên>` vào bất kỳ thẻ nào. Có thể thêm `hide_border=true` để bỏ viền hoặc `transparent=true` để nền trong suốt.

| Theme | Xem trước |
| --- | --- |
| `github-dark` | <img src="https://profilyze.vercel.app/api/github/streak?user=2hjaito&theme=github-dark" width="380" alt="github-dark" /> |
| `github-light` | <img src="https://profilyze.vercel.app/api/github/streak?user=2hjaito&theme=github-light" width="380" alt="github-light" /> |
| `midnight` | <img src="https://profilyze.vercel.app/api/github/streak?user=2hjaito&theme=midnight" width="380" alt="midnight" /> |
| `tokyonight` | <img src="https://profilyze.vercel.app/api/github/streak?user=2hjaito&theme=tokyonight" width="380" alt="tokyonight" /> |
| `dracula` | <img src="https://profilyze.vercel.app/api/github/streak?user=2hjaito&theme=dracula" width="380" alt="dracula" /> |
| `sunset` | <img src="https://profilyze.vercel.app/api/github/streak?user=2hjaito&theme=sunset" width="380" alt="sunset" /> |

---

## 6. Đếm lượt xem profile

Thêm thành phần **GitHub stat** và chọn loại **Profile views**, banner sẽ hiển thị số lượt xem và tăng mỗi khi có người mở profile của bạn.

Một vài chi tiết kỹ thuật:

* Lượt xem lặp lại từ cùng một người (nhận diện bằng hash ẩn danh của IP và user agent, **không lưu IP gốc**) chỉ được tính một lần trong 30 phút.
* Riêng GitHub tải ảnh qua proxy *camo* nên không thấy được người xem thật. Vì vậy lượt xem từ GitHub được tính mỗi lần tải, giống mọi bộ đếm view khác trên GitHub.
* Nếu database chậm, banner vẫn được trả về sau tối đa 2,5 giây với số đếm gần nhất, profile của bạn không bao giờ bị "treo ảnh".

> [!TIP]
> Muốn xem trước banner mà không làm tăng lượt xem, thêm `&preview=1` vào cuối URL banner.

---

## 7. Cộng đồng

Trang [Community](https://profilyze.vercel.app/community) hiển thị banner mới nhất của những tài khoản GitHub đang dùng Profilyze. Thấy thiết kế nào ưng ý thì bấm **Use this design** để mở nó trong editor và chỉnh lại thành của mình.

![](/images/post/2026-10-16-profilyze-thiet-ke-banner-github-readme/community.webp)

Banner chỉ được ghi nhận khi nó thực sự được hiển thị (ví dụ GitHub tải nó trong README) và chỉ với tài khoản GitHub có thật. Anh em có thể khoe số người dùng bằng badge:

[![Profilyze users](https://profilyze.vercel.app/api/stats/users)](https://profilyze.vercel.app/community)

```md
[![Profilyze users](https://profilyze.vercel.app/api/stats/users)](https://profilyze.vercel.app/community)
```

---

## 8. Đưa lên GitHub profile

Nếu anh em chưa có profile README, làm như sau:

1. Tạo một repository **trùng tên với username** của bạn. Ví dụ username là `2hjaito` thì tạo repo `2hjaito/2hjaito`.
2. Chọn **Public** và tick **Add a README file**.
3. Mở `README.md`, dán đoạn Markdown copy từ Profilyze vào.
4. Commit và mở trang `github.com/<username>` để xem kết quả.

> [!WARNING]
> Repository phải ở chế độ **Public** thì README mới hiển thị trên trang profile.

<details>
<summary>Ví dụ một README hoàn chỉnh</summary>

```md
<div align="center">

[![Banner](https://profilyze.vercel.app/api/banner?c=...)](https://profilyze.vercel.app/?c=...)

### Hi there 👋, I'm Tran Huu Dang

</div>

- 🔭 I'm currently working on ...
- 🌱 I'm learning ...
- 💬 Ask me about ...

<div align="center">

![Streak](https://profilyze.vercel.app/api/github/streak?user=2hjaito&theme=github-dark)
![Graph](https://profilyze.vercel.app/api/github/graph?user=2hjaito&theme=github-dark)

</div>
```

</details>

---

## 9. Hiệu năng

Banner được thiết kế để tải nhanh qua proxy ảnh của GitHub:

* Một banner thường chỉ **20 đến 100 KB**. Font được cắt theo ký tự sử dụng, ảnh nền được tối ưu sẵn ở dạng WebP.
* Banner không có dữ liệu live được cache ở edge của Vercel **30 ngày**. Banner có số liệu GitHub được làm mới **mỗi 4 giờ**.
* Chữ, icon, biểu đồ và logo đều là vector nên luôn sắc nét trên mọi màn hình, kể cả Retina.
* Ảnh GIF/WebP động vẫn chạy được trên Safari.

---

## 10. Tự triển khai (self-host)

Profilyze được viết bằng **Next.js** và deploy trên **Vercel**. Nếu muốn tự chạy, anh em clone repo về và cấu hình hai biến môi trường:

| Biến | Dùng cho |
| --- | --- |
| `TOKEN_GITHUB` (hoặc `GITHUB_TOKEN`) | Stars, commits, PRs, issues, ngôn ngữ và streak toàn thời gian. Một classic token không cần scope nào là đủ. Thiếu token thì streak, contributions và graph vẫn chạy nhờ trang contributions công khai của GitHub. |
| `MONGODB_URI` | Đếm lượt xem, trang Community và badge số người dùng. |

```bash
git clone https://github.com/2hjaito/profilyze.git
cd profilyze
npm install
npm run dev   # http://localhost:3000
```

---

## Kết luận

Với Profilyze, anh em có thể:

* Thiết kế banner profile bằng kéo thả, không cần Photoshop.
* Hiển thị số liệu GitHub thật, tự cập nhật.
* Tạo nguyên một README đẹp trong vài phút.
* Sửa lại thiết kế bất cứ lúc nào chỉ bằng một cú click vào banner.

Anh em vào thử [profilyze.vercel.app](https://profilyze.vercel.app) nhé. Nếu thấy hữu ích, cho mình xin một ⭐ trên [GitHub](https://github.com/2hjaito/profilyze). Mọi góp ý, báo lỗi hay pull request đều rất đáng quý.

Hẹn gặp lại anh em ở bài viết sau!
