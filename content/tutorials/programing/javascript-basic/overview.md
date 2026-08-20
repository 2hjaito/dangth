# Bài 1. Tổng quan về JavaScript


![](/tutorials/programing/javascript-basic/Para-que-e-usado-o-JavaScript.webp)


## 1. Mục tiêu bài học

Sau bài này, bạn cần nắm được:

-   JavaScript là gì và vai trò của JavaScript trong một trang web.
-   Lịch sử hình thành và mối quan hệ giữa JavaScript với ECMAScript.
-   JavaScript có thể làm những gì trên trình duyệt.
-   Cấu trúc cơ bản của một chương trình JavaScript.
-   Cách đặt JavaScript trong trang HTML.
-   Cách tách JavaScript ra file `.js` riêng.
-   Một số quy tắc cú pháp, từ khóa và hàm cơ bản.
-   Cách tổ chức file HTML/JavaScript để học và thực hành.

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

## 7. Chương trình JavaScript đầu tiên

Slide minh họa:

```javascript
alert("Hello World");
```

Lệnh `alert()` yêu cầu trình duyệt hiển thị một hộp thoại.

Ví dụ đầy đủ:

```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Hello JavaScript</title>
</head>
<body>
    <script>
        alert("Hello World");
    </script>
</body>
</html>
```

JavaScript trên trình duyệt được JavaScript engine của trình duyệt phân
tích và thực thi.

Kết quả:
![](/tutorials/programing/javascript-basic/hello-world-alert.jpeg)

---

## 8. Một chương trình JavaScript gồm những gì?

Một chương trình JavaScript gồm nhiều câu lệnh.

Ví dụ trong slide:

```javascript
var x = 4;
```

Ý nghĩa:

1.  `var` là từ khóa khai báo biến theo cú pháp JavaScript truyền thống.
2.  `x` là tên biến.
3.  `=` là toán tử gán.
4.  `4` là giá trị được gán cho biến.
5.  `;` đánh dấu kết thúc câu lệnh.

### Cách viết hiện đại

Trong JavaScript hiện đại, thường ưu tiên `let` hoặc `const`:

```javascript
let x = 4;
```

Nếu giá trị không cần gán lại:

```javascript
const x = 4;
```

Quy tắc đơn giản khi mới học:

```text
const → dùng mặc định khi biến không cần gán lại.
let   → dùng khi cần thay đổi giá trị.
var   → cần biết để đọc code cũ, nhưng thường không ưu tiên trong code mới.
```

---

## 9. Đặt JavaScript trong trang HTML

JavaScript có thể được viết trong thẻ `<script>`.

### 9.1. JavaScript trong `<head>`

```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>JavaScript trong head</title>

    <script>
        function sayHello() {
            alert("Xin chào!");
        }
    </script>
</head>
<body>
    <button onclick="sayHello()">Chào</button>
</body>
</html>
```

### 9.2. JavaScript trong `<body>`

```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>JavaScript trong body</title>
</head>
<body>
    <h1>Hello</h1>

    <script>
        console.log("JavaScript đang chạy.");
    </script>
</body>
</html>
```

### 9.3. Đặt `<script>` cuối `<body>`

Một cách truyền thống là đặt script ngay trước `</body>`:

```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Script cuối body</title>
</head>
<body>
    <h1 id="title">JavaScript</h1>

    <script>
        const title = document.getElementById("title");
        console.log(title.textContent);
    </script>
</body>
</html>
```

Lúc này các phần tử HTML phía trên đã được trình duyệt phân tích trước
khi JavaScript truy cập chúng.

### 9.4. Cách hiện đại với `defer`

Khi dùng file JavaScript bên ngoài, có thể đặt trong `<head>` và thêm
`defer`:

```html
<head>
    <script src="app.js" defer></script>
</head>
```

`defer` cho phép tải script mà không chặn việc phân tích HTML và thực
thi script sau khi HTML đã được phân tích.

---

## 10. Công cụ để lập trình JavaScript

Về nguyên tắc, chỉ cần:

-   Một trình soạn thảo văn bản.
-   Một trình duyệt.

Có thể viết JavaScript bằng Notepad, nhưng khi học và làm dự án nên dùng
editor/IDE có hỗ trợ:

-   Syntax highlighting.
-   Auto-completion.
-   Format code.
-   Debugging.
-   Quản lý project.

Slide sử dụng Visual Studio/Visual Web Developer phiên bản cũ. Với môi
trường hiện đại, có thể dùng editor hoặc IDE phù hợp với môn học và máy
tính của bạn.

---

## 11. Quy tắc cơ bản của JavaScript

### 11.1. Phân biệt chữ hoa và chữ thường

JavaScript là ngôn ngữ **case-sensitive**.

```javascript
let name = "Trần Hữu Đang";
let Name = "Trần Hữu Đang";

console.log(name); // An
console.log(Name); // Bình
```

`name` và `Name` là hai biến khác nhau.

### 11.2. Khoảng trắng

JavaScript thường bỏ qua các khoảng trắng không ảnh hưởng đến cú pháp.

Hai đoạn sau về cơ bản tương đương:

```javascript
let x = 10;
let y = 20;
let total = x + y;
```

```javascript
let x=10;let y=20;let total=x+y;
```

Đoạn đầu dễ đọc hơn và nên được ưu tiên.

### 11.3. Chú thích một dòng

```javascript
// Đây là chú thích một dòng
const age = 18;
```

### 11.4. Chú thích nhiều dòng

```javascript
/*
Đây là chú thích nhiều dòng.
Có thể viết nội dung trên nhiều dòng.
*/
const score = 10;
```

### 11.5. Dấu chấm phẩy

Slide ghi dấu `;` là bắt buộc. JavaScript hiện đại có cơ chế **Automatic
Semicolon Insertion (ASI)** nên dấu chấm phẩy không phải lúc nào cũng
bắt buộc.

Tuy nhiên, để code rõ ràng và tránh một số trường hợp khó đoán, người
mới học có thể thống nhất viết:

```javascript
const x = 10;
const y = 20;
console.log(x + y);
```

---

## 12. Câu lệnh JavaScript

Slide chia ví dụ thành câu lệnh đơn và khối lệnh.

### Câu lệnh đơn

```javascript
let x = 4;
```

### Câu lệnh điều kiện

```javascript
let x = 1;

if (x === 1) {
    console.log("x bằng 1");
} else {
    console.log("x không bằng 1");
}
```

> Nên ưu tiên `===` thay vì `==` khi mới học vì `===` so sánh cả giá trị
> và kiểu dữ liệu.

Ví dụ:

```javascript
console.log(1 == "1");  // true
console.log(1 === "1"); // false
```

---

## 13. Từ khóa trong JavaScript

Slide liệt kê nhiều từ khóa, ví dụ:

```text
break      delete      if          this        while
case       do          in          throw       with
catch      else        instanceof  try
continue   finally     new         typeof
debugger   for         return      var
default    function    switch      void
```

Ngoài ra JavaScript hiện đại còn có các từ khóa/cú pháp quan trọng như:

```text
let
const
class
extends
import
export
async
await
yield
```

Không được dùng từ khóa làm tên biến theo cách gây xung đột cú pháp.

Sai:

```javascript
// let if = 10;
```

Đúng:

```javascript
let condition = 10;
```

---

## 14. Hàm trong JavaScript

JavaScript có các hàm/API dựng sẵn và cho phép lập trình viên tự định
nghĩa hàm.

Ví dụ trong slide:

```javascript
alert("Hello");
```

### 14.1. Tự định nghĩa hàm

```javascript
function sayHello() {
    alert("Xin chào!");
}
```

Gọi hàm:

```javascript
sayHello();
```

### 14.2. Hàm có tham số

```javascript
function greet(name) {
    console.log("Xin chào " + name);
}

greet("Trần Hữu Đang");
greet("Trần Hữu Đang");
```

### 14.3. Hàm có giá trị trả về

```javascript
function sum(a, b) {
    return a + b;
}

const result = sum(4, 6);
console.log(result); // 10
```

---

## 15. Demo hàm từ slide

Ví dụ gốc có ý tưởng:

-   Nhận biến `x`.
-   Nếu `x > 0`, hiển thị `"Hi"`.
-   Ngược lại, hiển thị `"hello"`.

Phiên bản được định dạng lại:

```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Demo hàm</title>

    <script>
        function ham(x) {
            if (x > 0) {
                alert("Hi");
            } else {
                alert("hello");
            }
        }
    </script>
</head>
<body>
    <p>Hiển thị lời chào</p>

    <script>
        const x = 1;
        ham(x);
    </script>
</body>
</html>
```

Luồng thực thi:

```text
x = 1
  ↓
ham(x)
  ↓
x > 0 ?
  ↓ Có
alert("Hi")
```

---

## 16. Lưu JavaScript vào file bên ngoài

Khi website có nhiều trang, việc tách JavaScript thành file riêng giúp:

-   Tái sử dụng code.
-   Tách nội dung HTML khỏi logic JavaScript.
-   Dễ đọc.
-   Dễ bảo trì.
-   Dễ quản lý project.

Cấu trúc đơn giản:

```text
project/
├── index.html
└── myscript.js
```

### 16.1. File `myscript.js`

```javascript
function ham(x) {
    if (x > 0) {
        alert("Hi");
    } else {
        alert("hello");
    }
}
```

### 16.2. File `index.html`

```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>External JavaScript</title>
    <script src="myscript.js" defer></script>
</head>
<body>
    <p>Hiển thị lời chào</p>

    <script>
        const x = 1;
        ham(x);
    </script>
</body>
</html>
```

Một cách tổ chức tốt hơn là đưa cả phần gọi hàm vào file JavaScript.

### `myscript.js`

```javascript
function ham(x) {
    if (x > 0) {
        alert("Hi");
    } else {
        alert("hello");
    }
}

const x = 1;
ham(x);
```

### `index.html`

```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>External JavaScript</title>
    <script src="myscript.js" defer></script>
</head>
<body>
    <p>Hiển thị lời chào</p>
</body>
</html>
```

> Không viết thẻ `<script>` bên trong file `.js`. File `.js` chỉ chứa
> JavaScript.

---

## 17. Đường dẫn file JavaScript

Nếu HTML và JavaScript cùng thư mục:

```html
<script src="myscript.js"></script>
```

Nếu JavaScript nằm trong thư mục `js`:

```text
project/
├── index.html
└── js/
    └── myscript.js
```

thì dùng:

```html
<script src="js/myscript.js"></script>
```

Nếu file HTML nằm trong thư mục con, cần xác định đường dẫn tương đối
phù hợp.

---

## 18. Tạo project để quản lý file

Slide hướng dẫn tạo project bằng Visual Studio phiên bản cũ. Ý tưởng
quan trọng cần giữ lại là: **website có nhiều file nên được tổ chức
thành project/thư mục rõ ràng**.

Ví dụ:

```text
my-website/
├── index.html
├── about.html
├── css/
│   └── style.css
├── js/
│   └── app.js
└── images/
    └── logo.png
```

Trong `index.html`:

```html
<link rel="stylesheet" href="css/style.css">
<script src="js/app.js" defer></script>
```

---

## 19. Ví dụ tổng hợp

### Cấu trúc

```text
lesson-1/
├── index.html
└── app.js
```

### `index.html`

```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Bài 1 - JavaScript</title>

    <script src="app.js" defer></script>
</head>
<body>
    <h1 id="title">Học JavaScript</h1>

    <input id="nameInput" type="text" placeholder="Nhập tên của bạn">
    <button id="helloButton">Chào tôi</button>

    <p id="message"></p>
</body>
</html>
```

### `app.js`

```javascript
const nameInput = document.getElementById("nameInput");
const helloButton = document.getElementById("helloButton");
const message = document.getElementById("message");

function greet(name) {
    if (name === "") {
        return "Bạn chưa nhập tên.";
    }

    return `Xin chào, ${name}!`;
}

helloButton.addEventListener("click", function () {
    const name = nameInput.value.trim();
    message.textContent = greet(name);
});
```

Kiến thức được sử dụng:

-   Biến với `const`.
-   Hàm.
-   `if`.
-   `return`.
-   DOM.
-   Event `click`.
-   Đọc dữ liệu từ input.
-   Thay đổi nội dung HTML.
-   JavaScript file bên ngoài.

---

## 20. Các lỗi người mới thường gặp

### 20.1. Sai chữ hoa/chữ thường

Sai:

```javascript
const userName = "Trần Hữu Đang";
console.log(username);
```

Đúng:

```javascript
const userName = "Trần Hữu Đang";
console.log(userName);
```

### 20.2. Quên dấu nháy cho chuỗi

Sai:

```javascript
const name = An;
```

Đúng:

```javascript
const name = "Trần Hữu Đang";
```

### 20.3. Nhầm `=` với phép so sánh

`=` dùng để gán:

```javascript
let x = 5;
```

`===` dùng để so sánh:

```javascript
if (x === 5) {
    console.log("Đúng");
}
```

### 20.4. Sai đường dẫn file `.js`

Nếu cấu trúc:

```text
project/
├── index.html
└── js/
    └── app.js
```

thì phải dùng:

```html
<script src="js/app.js" defer></script>
```

### 20.5. Truy cập HTML trước khi phần tử tồn tại

Code sau có thể gây lỗi nếu script chạy quá sớm:

```javascript
const title = document.getElementById("title");
```

Một giải pháp:

```html
<script src="app.js" defer></script>
```

---

## 21. Bảng ghi nhớ nhanh

| Khái niệm | Ghi nhớ |
|---|---|
| HTML | Nội dung/cấu trúc |
| CSS | Trình bày |
| JavaScript | Hành vi/tương tác |
| ECMAScript | Tiêu chuẩn của ngôn ngữ |
| `<script>` | Thẻ dùng để nhúng/gắn JavaScript vào HTML |
| `.js` | Phần mở rộng file JavaScript |
| `const` | Biến không cần gán lại |
| `let` | Biến có thể gán lại |
| `var` | Cú pháp khai báo biến cũ |
| `if...else` | Rẽ nhánh |
| `function` | Định nghĩa hàm |
| `return` | Trả kết quả khỏi hàm |
| `//` | Chú thích một dòng |
| `/* ... */` | Chú thích nhiều dòng |
| `alert()` | Hiển thị hộp thoại |
| `console.log()` | In dữ liệu ra console |
| `defer` | Trì hoãn thực thi script đến khi HTML được phân tích |

---

## Bài tập

### Câu hỏi tự kiểm tra

1.  HTML, CSS và JavaScript có vai trò khác nhau như thế nào?
2.  JavaScript được phát triển bởi ai?
3.  ECMAScript là gì?
4.  JavaScript có phân biệt chữ hoa và chữ thường không?
5.  Sự khác nhau cơ bản giữa `let`, `const` và `var` là gì?
6.  JavaScript có thể được đặt ở đâu trong HTML?
7.  Vì sao nên tách JavaScript ra file `.js`?
8.  `=` và `===` khác nhau như thế nào?
9.  Hàm là gì?
10. `return` có tác dụng gì?
11. `defer` giúp ích gì khi gắn file JavaScript?
12. Tại sao validation phía client vẫn cần validation phía server?

---

### Bài tập thực hành

#### Bài 1. Hello World

Tạo file HTML và hiển thị:

```javascript
alert("Hello World");
```

#### Bài 2. Biến

Khai báo tên và tuổi, sau đó in ra console.

<details>
<summary><b>Gợi ý</b></summary>

```javascript
const name = "Trần Hữu Đang";
const age = 18;

console.log(name);
console.log(age);
```

</details>

#### Bài 3. Điều kiện

Cho một số nguyên và kiểm tra số đó dương, âm hay bằng 0.

<details>
<summary><b>Gợi ý</b></summary>

```javascript
const number = 10;

if (number > 0) {
    console.log("Số dương");
} else if (number < 0) {
    console.log("Số âm");
} else {
    console.log("Bằng 0");
}
```

</details>

#### Bài 4. Hàm

Viết hàm tính tổng hai số.

<details>
<summary><b>Bài giải</b></summary>

```javascript
function sum(a, b) {
    return a + b;
}

console.log(sum(5, 7));
```

</details>

#### Bài 5. HTML + JavaScript

Tạo:

-   Một ô nhập tên.
-   Một nút `Xin chào`.
-   Một thẻ `<p>`.

Khi nhấn nút, hiển thị:

```text
Xin chào, <tên người dùng>!
```

#### Bài 6. Tách file JavaScript

Tách code của Bài 5 thành:

```text
index.html
app.js
```

và gắn file bằng:

```html
<script src="app.js" defer></script>
```

---

### Checklist kiến thức cần thuộc

-   [ ] Phân biệt được HTML, CSS và JavaScript.
-   [ ] Biết JavaScript là ngôn ngữ phân biệt hoa/thường.
-   [ ] Biết ECMAScript là tiêu chuẩn của JavaScript.
-   [ ] Viết được `alert()` và `console.log()`.
-   [ ] Khai báo được biến bằng `let` và `const`.
-   [ ] Viết được `if...else`.
-   [ ] Viết và gọi được hàm.
-   [ ] Biết dùng `<script>`.
-   [ ] Biết gắn file `.js` bằng `src`.
-   [ ] Biết ý nghĩa cơ bản của `defer`.
-   [ ] Biết viết comment một dòng và nhiều dòng.
-   [ ] Biết tổ chức project HTML/CSS/JS đơn giản.

---

## Tổng kết

JavaScript là lớp hành vi của trang web. Trong bài đầu tiên, các kiến
thức quan trọng nhất là:

1.  **HTML = nội dung, CSS = trình bày, JavaScript = hành vi.**
2.  JavaScript được tạo ra để giúp trang web tương tác với người dùng.
3.  ECMAScript là tiêu chuẩn đặc tả JavaScript.
4.  Chương trình JavaScript được tạo bởi các câu lệnh, biến, toán tử, từ
    khóa và hàm.
5.  JavaScript có thể nằm trong `<script>` hoặc được tách ra file `.js`.
6.  Với project thực tế, nên tách JavaScript khỏi HTML để dễ quản lý.
7.  Khi viết code mới, ưu tiên các thực hành hiện đại như `const`,
    `let`, `===` và file JavaScript dùng `defer`.

### Mẫu tối thiểu nên nhớ

```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>JavaScript</title>

    <script src="app.js" defer></script>
</head>
<body>
    <h1 id="title">Hello JavaScript</h1>
</body>
</html>
```

```javascript
const title = document.getElementById("title");

function changeTitle() {
    title.textContent = "JavaScript đang hoạt động!";
}

changeTitle();
```

---

> [!WARNING]
> 🚀 **Lưu ý:** Một số thông tin về phiên bản ECMAScript, IDE, Flash/ActiveX và quy tắc dấu chấm phẩy phản ánh thời điểm slide được biên soạn. Khi ôn theo môn học, cần phân biệt nội dung lịch sử với cách viết JavaScript hiện đại.
