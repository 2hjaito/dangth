# Bài 1. Tổng quan về JavaScript


![](/tutorials/programing/javascript-basic/Para-que-e-usado-o-JavaScript.webp)


## 1. Mục tiêu bài học

Sau bài này, bạn cần:

- Hiểu JavaScript là gì và vai trò của JavaScript trong một trang web.
- Phân biệt vai trò của HTML, CSS và JavaScript.
- Nắm được các mốc chính trong lịch sử hình thành JavaScript.
- Hiểu mối quan hệ giữa JavaScript và ECMAScript.
- Biết JavaScript có thể làm gì trên trình duyệt.
- Nhận biết một số công nghệ cũ và bối cảnh phát triển của JavaScript.
- Có hình dung tổng thể trước khi bắt đầu viết chương trình JavaScript.

---
---

## 2. JavaScript là gì?

Một trang web thường có ba lớp chính:

| Công nghệ | Vai trò |
|---|---|
| HTML | Nội dung và cấu trúc |
| CSS | Cách trình bày, giao diện |
| JavaScript | Hành vi và tương tác |

Có thể hiểu ngắn gọn:

-   **HTML** tạo ra nội dung.
-   **CSS** làm nội dung đẹp và có bố cục.
-   **JavaScript** làm trang web có khả năng phản hồi và thay đổi theo
    hành động của người dùng.

Ví dụ JavaScript có thể phản hồi khi:

-   Người dùng nhấn chuột.
-   Người dùng chọn một menu.
-   Người dùng nhập dữ liệu.
-   Người dùng gửi form.
-   Trang web cần thay đổi nội dung mà không tải lại toàn bộ trang.

### Ví dụ đơn giản

```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>JavaScript cơ bản</title>
</head>
<body>
    <button onclick="alert('Xin chào!')">Nhấn vào đây</button>
</body>
</html>
```

Khi người dùng nhấn nút, JavaScript thực hiện hành động hiển thị hộp
thoại.

---

## 3. Lịch sử JavaScript


![](/tutorials/programing/javascript-basic/javascript_is_created_by_brendan_eich.webp)

JavaScript được phát triển bởi **Brendan Eich** tại Netscape vào khoảng
năm **1995**.

Ban đầu ngôn ngữ này từng được gọi là **LiveScript**, sau đó được đổi
tên thành **JavaScript**.

Điểm cần nhớ:

-   JavaScript và Java là **hai ngôn ngữ khác nhau**.
-   Tên gọi JavaScript có liên quan đến bối cảnh Java đang rất nổi tiếng
    thời đó.
-   JavaScript ban đầu tập trung vào việc xử lý phía trình duyệt
    (client-side).

### Mục đích ban đầu

JavaScript được dùng để tăng khả năng tương tác của trang web, ví dụ:

-   Kiểm tra dữ liệu form trước khi gửi lên server.
-   Thay đổi hình ảnh.
-   Tạo hiệu ứng.
-   Phản hồi ngay với thao tác của người dùng.

Ví dụ kiểm tra form ở phía client:

```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Validate Form</title>
</head>
<body>
    <form id="registerForm">
        <input id="username" type="text" placeholder="Tên người dùng">
        <button type="submit">Đăng ký</button>
    </form>

    <script>
        document.getElementById("registerForm").addEventListener("submit", function (event) {
            const username = document.getElementById("username").value.trim();

            if (username === "") {
                event.preventDefault();
                alert("Vui lòng nhập tên người dùng.");
            }
        });
    </script>
</body>
</html>
```

Kiểm tra ngay trên client giúp người dùng nhận phản hồi nhanh. Tuy
nhiên, **validation phía client không thay thế validation phía server**.

---

## 4. ECMAScript là gì?

**ECMAScript** là tiêu chuẩn đặc tả ngôn ngữ mà JavaScript triển khai.

Slide đề cập các mốc lịch sử như:

-   Năm 1997: đặc tả ECMAScript/ECMA-262 xuất hiện.
-   Năm 1999: ECMAScript 3.
-   Năm 2009: ECMAScript 5.

> [!NOTE]
> 💡 **Ghi chú:** ECMAScript 5 không còn là phiên bản mới nhất. JavaScript tiếp tục được chuẩn hóa và ECMAScript hiện được cập nhật thường xuyên.

Có thể hình dung:

```text
ECMAScript = bản đặc tả/tiêu chuẩn
JavaScript = một triển khai phổ biến của tiêu chuẩn đó
```

Các trình duyệt cung cấp JavaScript engine để đọc và thực thi mã
JavaScript.

---

## 5. Xu hướng phát triển của JavaScript

JavaScript ngày càng mạnh hơn nhờ:

-   ECMAScript liên tục được cải tiến.
-   Trình duyệt ngày càng hỗ trợ tiêu chuẩn tốt hơn.
-   HTML5 và CSS3 mở rộng khả năng xây dựng ứng dụng web.
-   Hệ sinh thái thư viện và framework rất lớn.
-   JavaScript không chỉ chạy trên trình duyệt mà còn có thể chạy ở
    nhiều môi trường khác.

Slide cũ đề cập jQuery, JSON, YUI, Flash và ActiveX. Khi học hiện nay
cần lưu ý:

-   **jQuery** vẫn tồn tại nhưng nhiều chức năng phổ biến đã có API
    JavaScript chuẩn thay thế.
-   **JSON** là định dạng dữ liệu, không phải thư viện JavaScript.
-   **YUI** đã lỗi thời/ngừng phát triển.
-   **Flash** và **ActiveX** không còn là công nghệ web hiện đại nên
    không nên dùng cho dự án mới.

---

## 6. JavaScript có thể làm gì?

JavaScript phía client có thể:

-   Tạo menu tương tác.
-   Thay đổi nội dung trên trang.
-   Thêm/xóa phần tử HTML.
-   Thay đổi CSS.
-   Kiểm tra form.
-   Xử lý sự kiện chuột và bàn phím.
-   Tạo animation.
-   Gửi/nhận dữ liệu từ server.
-   Xây dựng game trên web.
-   Xây dựng ứng dụng web hoàn chỉnh.

### Ví dụ thay đổi nội dung

```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Thay đổi nội dung</title>
</head>
<body>
    <h1 id="title">Nội dung ban đầu</h1>
    <button id="changeButton">Thay đổi</button>

    <script>
        const title = document.getElementById("title");
        const button = document.getElementById("changeButton");

        button.addEventListener("click", function () {
            title.textContent = "Nội dung đã được JavaScript thay đổi!";
        });
    </script>
</body>
</html>
```

<h1 id="title">Nội dung ban đầu</h1>

<button id="changeButton">
    Thay đổi
</button>

<script>
    const title = document.getElementById("title");
    const button = document.getElementById("changeButton");

    button.addEventListener("click", function () {
        title.textContent =
            "Nội dung đã được JavaScript thay đổi!";
    });
</script>

---


### Demo trực tiếp

<div class="tutorial-live-demo">
    <p id="js-overview-status">Nội dung ban đầu.</p>
    <button type="button" id="js-overview-button">Thử thay đổi nội dung</button>

    <script>
        const overviewButton = document.getElementById('js-overview-button');
        const overviewStatus = document.getElementById('js-overview-status');

        overviewButton.addEventListener('click', () => {
            overviewStatus.textContent = 'JavaScript vừa thay đổi nội dung ngay trên trang.';
        });
    </script>
</div>

## 7. Bài tập

### Câu hỏi tự kiểm tra

1. HTML, CSS và JavaScript có vai trò khác nhau như thế nào?
2. JavaScript được phát triển bởi ai?
3. JavaScript và Java có phải cùng một ngôn ngữ không?
4. ECMAScript là gì?
5. JavaScript ban đầu được tạo ra nhằm mục đích gì?
6. JavaScript phía client có thể thực hiện những công việc nào?
7. Vì sao Flash và ActiveX không còn được xem là công nghệ web hiện đại?
8. JSON có phải là thư viện JavaScript không?

### Bài tập thực hành

#### Bài 1. Nhận diện vai trò

Cho các nhiệm vụ sau và xác định nhiệm vụ thuộc HTML, CSS hay JavaScript:

- Tạo một tiêu đề.
- Đổi màu tiêu đề.
- Khi click nút thì đổi nội dung tiêu đề.
- Tạo một ô nhập dữ liệu.
- Căn giữa một button.
- Kiểm tra dữ liệu trước khi gửi form.

#### Bài 2. Khảo sát một trang web

Chọn một trang web quen thuộc và ghi lại ít nhất 5 tương tác mà bạn cho rằng JavaScript tham gia xử lý.

### Checklist kiến thức cần thuộc

- [ ] Phân biệt được HTML, CSS và JavaScript.
- [ ] Biết JavaScript được tạo ra trong bối cảnh nào.
- [ ] Biết JavaScript và Java là hai ngôn ngữ khác nhau.
- [ ] Hiểu ECMAScript là tiêu chuẩn đặc tả ngôn ngữ.
- [ ] Biết một số khả năng của JavaScript phía client.
- [ ] Phân biệt được nội dung lịch sử với cách phát triển web hiện đại.

---

## 8. Tổng kết

```text
Trang web
├── HTML       → Nội dung và cấu trúc
├── CSS        → Trình bày và giao diện
└── JavaScript → Hành vi và tương tác
```

JavaScript được phát triển để làm cho trang web có khả năng phản hồi với người dùng. ECMAScript là tiêu chuẩn đặc tả mà JavaScript triển khai.

Sau khi đã có bức tranh tổng quan, bài tiếp theo sẽ chuyển sang phần thực hành: **viết chương trình JavaScript đầu tiên, nhúng JavaScript vào HTML và tổ chức file `.js` trong project**.
