---
title: Tìm hiểu về Session, Cookie trong Xác thực người dùng
slug: tim-hieu-ve-session-cookie-trong-xac-thuc-nguoi-dung
subtitle: Session, Cookie là gì?
author: Trần Hữu Đang
date: "2023-09-03"
image: /images/post/2023-09-03-session-cookie-authentication/1.png
tags:
  - Backend
  - Authentication
  - Authoriztion
---
	

Trong mô hình [CSR]() hay Client-Side-Rendering việc lưu thông tin người dùng thường được xác định thông qua giá trị của Session...

<!-- more -->
Vậy Session là gì và Cookie là thế nào? Sao lại phải cần đến tận hai khái niệm cho một công việc


![](/images/post/2023-09-03-session-cookie-authentication/1.png)
## Khái niệm

Trước hết chúng ta sẽ tìm hiểu về các khái niệm trước và sẽ đi qua từng trường hợp cụ thể nhé!
### Session

**Session** là một khái niệm quan trọng được sử dụng để theo dõi và quản lý trạng thái của một người dùng trong suốt thời gian họ tương tác với ứng dụng web. 

**Session** cho phép lưu trữ thông tin tạm thời liên quan đến một người dùng cụ thể giữa các yêu cầu HTTP (các lần truy cập trang web).

<!-- <div style="border-left: 4px solid #00cc88; padding-left: 1rem; background:rgba(240, 255, 248, 0);">
<strong>💡 TÓM LẠI</strong><br/>
Nói rõ hơn thì **Session** chính là một vùng nhớ của [Server]() và vùng nhớ này chỉ mất đi khi chạy lại Server hoặc bị xóa đi do hết hạn.
</div> -->

> [!TIP] **TÓM LẠI**
> Nói rõ hơn thì **Session** chính là một vùng nhớ của [Server]() và vùng nhớ này chỉ mất đi khi chạy lại Server hoặc bị xóa đi do hết hạn.

Sau đây là một số thuộc tính của Session. Chỉ một số thôi nhé (vì nó khá nhiều và bạn hoàn toàn có thể tìm hiểu thêm).

|Session ID (Session Identifier)|Thời Gian Tồn Tại (Session Timeout)|Path|Domain|Session Cluster|
|-|-|-|-|-|
|Đây là một giá trị duy nhất được sử dụng để xác định session cụ thể. Session ID thường được tạo ngẫu nhiên và được gắn vào mỗi session để máy chủ có thể nhận biết session của người dùng. Session ID thường được lưu trữ trong cookie hoặc trong URL.|Đây là khoảng thời gian mà một session sẽ tồn tại sau khi người dùng cuối cùng tương tác với trang web. Khi thời gian này hết, session sẽ bị hủy và thông tin trong session bị xóa.|Path xác định đường dẫn trên trang web mà session cookie áp dụng. Chỉ các yêu cầu đến các đường dẫn này mới gửi cookie session đi cùng.|Domain xác định tên miền mà session cookie áp dụng. Nếu không xác định, cookie session chỉ áp dụng cho tên miền của trang web hiện tại.|Nếu ứng dụng của bạn hoạt động trên một môi trường có nhiều máy chủ, session cluster cho phép bạn chia sẻ session data giữa các máy chủ, đảm bảo tính nhất quán trong trạng thái của người dùng.|



### Cookie
**Cookie** là một vùng nhớ được lưu trong **Browser** (*Chorme, Cốc Cốc, Edge,...*). **Cookie** cũng giống như *local storage* hay *ssession storage* điều khác biệt lớn nhất là **Cookie** có thể tự xóa đi nếu vượt quá thời hạn cho phép của nó.

Ví dụ: Mình tạo một **Cookie** có tên là `dangdepzai` và *set* thời gian tồn tại của nó là `20m`. Thì sau đúng 20 phút nó sẽ bị xóa khỏi trình duyệt. 

Sau đây là một số thuộc tính của **Cookie**. Chỉ một số thôi nhé (vì nó khá nhiều và bạn hoàn toàn có thể tìm hiểu thêm).
|Tên (Name)|Giá Trị (Value)|Thời Gian Tồn Tại (Expires hoặc Max-Age)|Path|Domain|
|----------|---------------|----------------------------------------|----|------|
|-ây là tên của cookie, được sử dụng để xác định cookie khi nó được gửi giữa máy chủ và trình duyệt. Tên cookie phải là duy nhất trong mỗi tên miền.|Đây là dữ liệu được lưu trữ bên trong cookie. Giá trị này có thể là bất kỳ dữ liệu nào bạn muốn lưu trữ, ví dụ: thông tin đăng nhập, giỏ hàng mua sắm, hoặc cài đặt ngôn ngữ.|Thuộc tính này xác định thời gian mà cookie sẽ tồn tại trên máy tính của người dùng. Cookie có thể được đặt để tồn tại trong một khoảng thời gian cố định (Expires) hoặc tồn tại trong một số giây tính từ thời điểm tạo (Max-Age). Khi thời gian này hết, cookie sẽ bị xóa.|Path xác định đường dẫn trên trang web mà cookie áp dụng. Cookie chỉ được gửi trong các yêu cầu đến các đường dẫn này.|Domain xác định tên miền mà cookie áp dụng. Nếu không xác định, cookie áp dụng cho tên miền của trang web hiện tại.|

## Ví dụ về Web mua thịt

> OK Vậy là chúng ta đã hiểu về Session và Cookie bây giờ mình sẽ cùng nhau giải quyết các vấn đề sau nhé!

---

**Bước 1**. Mình truy cập vào một website mua thịt lợn, có tên là [webconlon.com]() và tiến hành đăng nhập với thông tin như sau:

|Họ và tên | Username | Password|
|---------|-----------|---------|
|Trần Hữu Đang| **dangdepzai**|*vodichvutru*|


**Bước 2**. Khi đăng nhập xong mình mua 2kg thịt vai lợn và tiến hành thanh toán như bình thường.

|Tên sản phẩm | Số lượng | Thành tiền|
|---------|-----------|---------|
|Vai lon *(thịt vai lợn)*| **2kg**|*200.000 VNĐ*|
|Ma lon *(thịt má lợn)*| **1kg**|*90.000 VNĐ*|

**Bước 3**. Khi mua hàng xong, mình bấm vào nút ***Đăng xuất***

---

> Nếu bạn là một lập trình viên, bạn sẽ làm thế nào để biết là ai đang đăng nhập ở bước số 1 và ai đặt hàng ở bước số 2 ?


<!-- <div style="border-left: 4px solid #00cc88; padding-left: 1rem; background:rgba(240, 255, 248, 0);">
<strong>💡 TIP</strong><br/>
Nếu bạn hiểu về Session thì có lẻ bạn trả lời được ngay rằng `Ta sẽ lưu dữ liệu User vào Session` và các **Request** sau đó *(mua hàng, đăng xuất)* ta cứ việc lấy Session đó ra.
</div> -->

> [!TIP]
> Nếu bạn hiểu về Session thì có lẻ bạn trả lời được ngay rằng `Ta sẽ lưu dữ liệu User vào Session` và các **Request** sau đó *(mua hàng, đăng xuất)* ta cứ việc lấy Session đó ra.

Đúng! rất đúng, nhưng có bao giờ bạn tự hỏi rằng vì sao Server có thể biết được Session nào sẽ lưu dữ liệu của User nào hay chưa ? 

Bạn hiểu như này nhé, khi hệ thống chúng ta được đưa ra cho mọi người sử dụng sẽ có rất nhiều người mua sắm cùng lúc:
|Họ và tên | Username | Password|
|---------|-----------|---------|
|Trần Hữu Đang| **dangdepzai**|*vodichvutru*|
|Đỗ Đạt Cao| **datcao123**|*passwordxyz*|
|Mai Thanh Toán| **thanhtoancc**|*password12*|

Bạn thấy đấy, nếu cùng một lúc tất cả các người dùng trên thực hiện mua hàng, thì Server làm sao có thể biết được ai đang mua?


<details>
<summary><strong>🤔 Vậy rốt cuộc làm sao Server có thể biết được ai đang đăng nhập và dùng chức năng ?</strong></summary>


- Đó là nhờ vào **Cookie** và cơ chế *response* `SESSIONID` tự động của mọi Server.
- Điều này được thực thi một các tự động nên nếu không tìm hiểu bạn sẽ không thể nhận ra. *(Cơ chế này hoàn toàn có thể tắt đi bởi các cấu hình phía server)*
</details>

## Quá trình thực thi

Cơ chế trên được thự thi tự động hết sức đơn giản như sau:

### Đăng nhập và lưu thông tin
- Ở bước 1 client sẽ gửi thông tin gồm (Username và Password) lên Server
	- Server tiến hành kiểm tra trong DB. Nếu có sẽ trả về thông báo *đăng nhập thành công!* cùng lúc đó sẽ tiến hành lưu thông tin User vào một **Session** *(có thông tin như bảng bên dưới)*. 

|SESSIONID|Name|Value|Expires|
|---------|---|------|-------|
|527735892654|CurrentUser|là một Object hoặc Json chứa thông tin User vừa đăng nhập|10h|

-
	- Lúc này Server sẽ tự động gửi một **Response** về cho **Browser** chứa thông tin về SESSIONID của Session vừa tạo.  

- Browser sẽ lưu SESSIONID đó vào trong **Cookie** *(có thông tin như bảng bên dưới)*. và các Request sau cứ việc gửi kèm SESSIONID thì Server sẽ biết được User đó là ai.

|Name|Value|Expires|
|---------|---|-------|
|SESSIONID|527735892654|10h|

### Xác định User thông qua SESSIONID

- Ở bước số 2 ta sẽ cần lấy ra **Session** đó *(Server sẽ lấy SESSIONID có trong phần Header của Request)* và so sánh với dữ liệu được lưu trên **Server**.

> Việc này sẽ xảy ra tự động, việc bạn cần làm là lấy Session từ Request là được!

### Xóa thông tin User khỏi Server

- Và tương tự như vậy ở bước số 3 việc chúng ta cần làm là Xóa Session đó khỏi **Server**

> Lưu ý: Các dữ liệu trên là mình mô phỏng thôi, trên thực tế sẽ còn nhiều dữ liệu hơn

Nếu vẫn chưa hiểu thì tham khảo ảnh sau đây:

![](/images/post/2023-09-03-session-cookie-authentication/2.png)

## Tổng kết

Đó là toàn bộ nội dung mình muốn chia sẽ, các bạn có thể để lại bình luận phía dưới 👇. Và hoàn toàn có thể góp ý nếu bài viết mình còn chưa đúng.

Cảm ơn các bạn! Chúc các bạn một ngày tốt lành!