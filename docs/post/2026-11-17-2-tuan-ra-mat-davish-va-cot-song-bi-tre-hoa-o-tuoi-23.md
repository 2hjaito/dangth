---
layout: Post
title: "2 tuần ra mắt Davish và cái cột sống bị \"tre hoá\" ở tuổi 23"
slug: 2-tuan-ra-mat-davish-va-cot-song-bi-tre-hoa-o-tuoi-23
subtitle: "Từ một đêm OT đến app quản trị VPS qua SSH viết bằng Go, chuyện vibe-code, phản hồi từ cộng đồng và căn bệnh viêm cột sống dính khớp"
author: "Trần Hữu Đang"
date: "2026-11-17"
image: /images/post/2026-11-17-2-tuan-ra-mat-davish-va-cot-song-bi-tre-hoa-o-tuoi-23/hoi-an.webp
tags:
  - Davish
  - Go
  - Wails
  - Svelte
  - SSH
  - VPS
  - AI
  - Open Source
published: true
---

![Phố cổ Hội An](/images/post/2026-11-17-2-tuan-ra-mat-davish-va-cot-song-bi-tre-hoa-o-tuoi-23/hoi-an.webp)

<p align="center"><em>Phố cổ Hội An</em></p>

## 1. Bạn quản lý VPS bằng cách nào?

Trước kia, việc quản trị VPS của tôi khá nhàm chán. Nhờ có chút kiến thức Docker và CI/CD cơ bản nên việc vận hành các service không quá vất vả, có điều đồ tôi xài khá cùi, nên lúc nào cũng phải canh chừng ổ đĩa, CPU, RAM thật chặt.

Tôi viết kha khá script giám sát và dùng Zalo bot để nhận thông báo khi có sự cố. Nhưng việc phải gõ quá nhiều lệnh khiến một người không chuyên hệ thống như tôi khá mệt mỏi...

Một buổi tối OT cùng Tech Lead — tôi giữ phần CI/CD và quản trị VPS, nên có vấn đề gì tôi sẽ vào xử lý trước rồi báo kết quả — tôi nhận ra mình cần một phần mềm quản trị đầy đủ cho con VPS đó (à thật ra là nhiều con khác nữa!). Tôi chán cảnh mở cả chục cửa sổ Terminal chỉ để quản lý vài con server. Tôi muốn một app giúp mình đỡ đau mắt hơn, thậm chí là click thay vì gõ.

Ngay trong đêm, tôi nhờ người bạn thân nhất của mình là Claude dựng bản UI/UX cho con app, kèm bộ branding đầy đủ, toàn bộ rules vibe-code và plan thiết kế. Cũng ngay trong đêm đó, commit đầu tiên được đẩy lên với một app hoàn thành khoảng 5 chức năng quản trị nhiều VPS. Tên nó là **Davish** (Davi + SH).

![Bộ nhận diện thương hiệu và bản thiết kế Davish do Claude dựng ngay trong đêm](/images/post/2026-11-17-2-tuan-ra-mat-davish-va-cot-song-bi-tre-hoa-o-tuoi-23/claude-design.webp)

<p align="center"><em>Bộ nhận diện thương hiệu và bản thiết kế Davish do Claude dựng ngay trong đêm</em></p>

Nói đơn giản thì với dân xài tech nghèo như tôi, cài aaPanel quá phiền phức, lại còn phải mở thêm một port để đăng nhập... Tôi cần một app kết nối thẳng qua SSH, không phải cài gì lên VPS cả. Davish làm được điều đó, giao diện còn khá giống macOS.

---

## 2. Lần đầu dùng Go — khép lại kỷ nguyên Java Swing của riêng mình

Xuất thân là dev Java, một kẻ tôn sùng Java chính hiệu (bạn nào theo dõi tôi đủ lâu chắc biết), Go với tôi không xa lạ — nó hay đi chung với Java trong mấy bài toán microservices. Nhưng lần đầu tiên tôi học Go cũng chính là lúc code luôn con app này. Nghe khá đáng sợ, nhưng AI bây giờ đủ mạnh để xoá đi nỗi lo đó.

Vì sao tôi chọn **Go + Wails + Svelte** thay vì Electron hay Swing, trong khi chúng mới là sở trường của tôi?

Rất đơn giản: tôi cần một app nhẹ, mượt và bảo mật. Electron thì nặng, Swing thì đã đến lúc nghỉ hưu. Còn Go có hệ sinh thái SSH được dùng rộng rãi và đã qua thử thách, và tôi tin nó sẽ giữ cho kết nối của mình an toàn. (Niềm tin này sau đó bị thử thách khá gắt — để phần cuối kể.)

---

## 3. AI tha hoá — hay tôi tha hoá?

Thật lòng mà nói, nếu quay về những năm chưa có AI, một nửa con app này thôi cũng đủ ngốn 6 tháng code của tôi. Không có AI, Davish có lẽ chỉ nằm trên giấy và trong đầu tôi.

Nhưng code xong, tôi lại hoài nghi về chính mình nhiều hơn.

Ý tưởng là của tôi. Kiến trúc tôi duyệt. Nhưng phần lớn dòng code lại được vibe-code ra. Vai trò của tôi dần chuyển từ người viết sang người review. Và câu hỏi khó chịu nhất là: một người mới học Go thì review code Go được đến đâu?

Tôi đọc được logic, hiểu được luồng chạy, bắt được lỗi hiển nhiên. Nhưng với những phần nhạy cảm như xử lý SSH key, kết nối, lưu thông tin đăng nhập, tôi phải thừa nhận rằng mình đang tin nhiều hơn là hiểu. Ngày trước, muốn làm một thứ như vậy, tôi buộc phải đào sâu tận gốc. Giờ thì AI đưa đáp án trước khi tôi kịp đặt câu hỏi.

AI không làm tôi kém đi, nhưng nó làm tôi lười đào sâu. Và đó mới là thứ đáng sợ: năng suất tăng vọt, còn chiều sâu thì lặng lẽ mỏng đi mà mình không hề hay biết.

> [!TIP]
> **Bài học tôi rút ra:** AI là đòn bẩy tuyệt vời để ship, nhưng với những phần chạm tới bảo mật, mình vẫn phải tự hiểu nó, không thể chỉ "review là chính".

---

## 4. Hai tuần công tác và nằm dưỡng bệnh

Davish được phát hành ngày 30/10, và ngay hôm sau (31/10) tôi có chuyến công tác ở Đà Nẵng. Thế là gần như cả chuyến đi tôi bỏ mặc con app.

<img
  src="/images/post/2026-11-17-2-tuan-ra-mat-davish-va-cot-song-bi-tre-hoa-o-tuoi-23/checkin.webp"
  width="50%"
  alt="Check-in chuyến công tác"
/>

<p align="center"><em>Check-in chuyến công tác</em></p>

<img
  src="/images/post/2026-11-17-2-tuan-ra-mat-davish-va-cot-song-bi-tre-hoa-o-tuoi-23/da-nang.webp"
  width="50%"
  alt="Đà Nẵng"
/>

<p align="center"><em>Đà Nẵng</em></p>

<img
  src="/images/post/2026-11-17-2-tuan-ra-mat-davish-va-cot-song-bi-tre-hoa-o-tuoi-23/hoi-an.webp"
  width="50%"
  alt="Hội An"
/>

<p align="center"><em>Hội An</em></p>

Vậy mà Davish vẫn tự khởi động khá tích cực. Vừa đáp sân bay, tôi bất ngờ đọc được vài bài viết và phản hồi rất thiện cảm về nó:

<img
  src="/images/post/2026-11-17-2-tuan-ra-mat-davish-va-cot-song-bi-tre-hoa-o-tuoi-23/greeklite.webp"
  width="50%"
  alt="Bài giới thiệu Davish của Geek Lite (@QingQ77) trên X, hơn 3.400 lượt xem"
/>

<p align="center"><em>Bài giới thiệu Davish của Geek Lite (@QingQ77) trên X, hơn 3.400 lượt xem</em></p>

Cộng đồng Trung Quốc có vẻ khá thích thú, nên bản tiếng Trung được phát hành ngay sau đó.

Một ngày sau, một người dùng Reddit chia sẻ tích cực và mong có bản tiếng Tây Ban Nha. Như lần trước, tôi làm và phát hành luôn.

Tiếp theo là những báo lỗi cụ thể, phần lớn trên Windows và Linux — hai hệ điều hành tôi chưa thể test kỹ lúc đó.

Rồi đến phần "hay" nhất: vòng lặp fix → feat → fix cứ thế xoay vòng, và căn bệnh dai dẳng nhất của tôi ập đến — **viêm cột sống dính khớp**.

Bệnh này khiến các đốt sống dần dính lại với nhau như một khúc tre nhiều mắt. Nó theo tôi từ khoảng cuối năm 2024, nhưng phải đến đầu năm 2026 tôi mới đi xét nghiệm và biết được sự tồn tại của nó. Bruhhhhh. Bác sĩ dặn không nên ngồi lâu — và nó chọn đúng lúc tôi ngồi lì nhất để phát tác, haha.

Ngày 19 tôi có lịch tái khám, nhưng chẳng hiểu sao đợt này nặng hơn hẳn, ảnh hưởng lớn đến vận động: đi lại khó khăn, chỉ có thể ngồi và đi chậm chạp...

Nhưng không sao. Kết quả xét nghiệm cho thấy bệnh đến từ gen, tự phát và mạn tính — tức là tự nhiên xuất hiện và không chữa khỏi hẳn được. Chỉ biết cảm ơn vì nó không quá nặng, chịu khó tập luyện thì vẫn kiểm soát được.

<img
  src="/images/post/2026-11-17-2-tuan-ra-mat-davish-va-cot-song-bi-tre-hoa-o-tuoi-23/xn.webp"
  width="50%"
  alt="Kết quả xét nghiệm: dương tính với gen HLA-B27, dấu hiệu thường gặp của viêm cột sống dính khớp"
/>

<p align="center"><em>Kết quả xét nghiệm: dương tính với gen HLA-B27, dấu hiệu thường gặp của viêm cột sống dính khớp</em></p>

> [!WARNING]
> **Lời cảnh tỉnh cho mấy ông GenZ tầm tuổi tôi:** bệnh này đa phần khởi phát trước 40 tuổi. Hãy giữ thói quen vận động thường xuyên, đừng ngồi code xuyên đêm như tôi.

---

## 5. Khi dân Linux Admin nói "100% No"

Davish tiếp cận được kha khá người dùng, nhưng đa số là dân self-host, không phải sysadmin — giới mà Terminal và Ansible là chân ái, nơi các ông anh gõ shell còn nhanh hơn một đứa vibe-coder đang hoảng loạn vì bị tấn công hệ thống.

Cộng đồng đó khá khó tính, và họ không chấp nhận việc giao SSH key cho một app "ngoại lai", phụ thuộc nhiều thư viện như Davish.

Tôi từng hỏi thẳng:

> "I built an agentless GUI for managing Linux servers over SSH. Would you trust something like this on production boxes?"

— và có rất nhiều ông ông trả lời gọn lỏn, đại khái là: **"100% No"** =)))

Nghe thì đau, nhưng họ đúng. Và nó chạm đúng vào điều tôi tự thú ở phần 3: chính tôi còn đang tin nhiều hơn hiểu ở mấy phần bảo mật, thì làm sao đòi người khác tin? Niềm tin vào Go là chưa đủ — người dùng cần được thấy rõ key được lưu ở đâu, có đi ra ngoài máy không, và app phụ thuộc vào những gì.

Nên tôi làm rõ luôn ở đây: Davish chạy hoàn toàn trên máy bạn và kết nối thẳng qua SSH, không cài gì lên server. Mật khẩu và passphrase chỉ được lưu trong keychain của hệ điều hành. Mật khẩu sudo không bao giờ được lưu: app hỏi một lần mỗi phiên, giữ trong bộ nhớ và tự quên sau 15 phút không dùng. Với `~/.ssh/config` và Ansible inventory, Davish chỉ đọc chứ không ghi. Bản cập nhật được kiểm tra chữ ký trước khi cài. Chi tiết xem tại [SECURITY.md](https://github.com/2hjaito/davish/blob/main/SECURITY.md).

Tôi nhận ra Davish chưa phù hợp cho những con prod quan trọng — nó hợp hơn với homelab và các dự án cá nhân. Nhưng biết đâu, nếu cộng đồng quanh Davish đủ lớn và mã nguồn được soi kỹ đủ nhiều, một ngày nào đó nó sẽ xứng đáng có mặt trên prod.

---

## Kết

Lâu rồi mới viết blog, và phải nói 2 tuần vừa qua dài thật. Giờ thì vừa tập cho cái lưng bớt "tre", vừa nằm chờ lịch khám nghĩa vụ quân sự sắp tới. Trong lúc đó, Davish vẫn sẽ tiếp tục được cập nhật — fix lỗi Windows/Linux và làm rõ phần bảo mật là hai việc tôi ưu tiên trước.

Davish sau ~2 tuần ra mắt:

| Chỉ số | Con số |
| --- | --- |
| Star / Fork | 120 / 20 |
| Lượt tải bản cài | 542 (macOS 227, Windows 221, Linux 94) |
| Bản phát hành | 41 (từ v0.3 tới 1.14.2) |
| Commit / PR đã merge | 554 / 161 |

Đọc tới đây mà bạn nào chưa star cho Davish thì ủng hộ tôi 1 sao và 1 lượt trải nghiệm nhé: [https://github.com/2hjaito/davish](https://github.com/2hjaito/davish)
