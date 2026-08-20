# Bài 2. Bắt đầu lập trình JavaScript

> Bài học này nối tiếp **Bài 1: Tổng quan về JavaScript**. Sau khi đã hiểu JavaScript là gì và vai trò của nó trên web, chúng ta sẽ bắt đầu viết mã, nhúng JavaScript vào HTML và tổ chức project cơ bản.

## 1. Mục tiêu bài học

Sau bài này, bạn cần:

- Viết và chạy được chương trình JavaScript đầu tiên.
- Hiểu cấu trúc cơ bản của một câu lệnh JavaScript.
- Biết sử dụng `alert()` và `console.log()`.
- Biết đặt JavaScript trong trang HTML bằng `<script>`.
- Biết gắn file JavaScript bên ngoài bằng `src`.
- Hiểu mục đích cơ bản của `defer`.
- Nắm các quy tắc cú pháp như case-sensitive, comment và dấu chấm phẩy.
- Làm quen với `let`, `const`, câu lệnh điều kiện và hàm.
- Biết tổ chức project HTML/CSS/JavaScript đơn giản.
- Nhận biết và sửa một số lỗi thường gặp khi mới học.

---

## 2. Chương trình JavaScript đầu tiên

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

## 3. Cú pháp JavaScript cơ bản

### 3.1. Một chương trình JavaScript gồm những gì?

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

## 4. Đặt JavaScript trong trang HTML

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

## 5. Công cụ lập trình

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

## 6. Quy tắc cú pháp cơ bản

### 6.1. Phân biệt chữ hoa và chữ thường

JavaScript là ngôn ngữ **case-sensitive**.

```javascript
let name = "Trần Hữu Đang";
let Name = "Trần Hữu Đang";

console.log(name); // An
console.log(Name); // Bình
```

`name` và `Name` là hai biến khác nhau.

### 6.2. Khoảng trắng

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

### 6.3. Chú thích một dòng

```javascript
// Đây là chú thích một dòng
const age = 18;
```

### 6.4. Chú thích nhiều dòng

```javascript
/*
Đây là chú thích nhiều dòng.
Có thể viết nội dung trên nhiều dòng.
*/
const score = 10;
```

### 6.5. Dấu chấm phẩy

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

### 6.6. Câu lệnh và khối lệnh

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

### 6.7. Từ khóa

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

## 7. Làm quen với hàm

JavaScript có các hàm/API dựng sẵn và cho phép lập trình viên tự định
nghĩa hàm.

Ví dụ trong slide:

```javascript
alert("Hello");
```

### 7.1. Tự định nghĩa hàm

```javascript
function sayHello() {
    alert("Xin chào!");
}
```

Gọi hàm:

```javascript
sayHello();
```

### 7.2. Hàm có tham số

```javascript
function greet(name) {
    console.log("Xin chào " + name);
}

greet("Trần Hữu Đang");
greet("Trần Hữu Đang");
```

### 7.3. Hàm có giá trị trả về

```javascript
function sum(a, b) {
    return a + b;
}

const result = sum(4, 6);
console.log(result); // 10
```

---

### 7.4. Ví dụ tổng hợp về hàm

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

## 8. JavaScript trong file bên ngoài

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

### 8.1. File `myscript.js`

```javascript
function ham(x) {
    if (x > 0) {
        alert("Hi");
    } else {
        alert("hello");
    }
}
```

### 8.2. File `index.html`

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

### 8.3. Đường dẫn file JavaScript

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

## 9. Tổ chức project

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

## 10. Ví dụ tổng hợp

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

## 11. Lỗi thường gặp

### 11.1. Sai chữ hoa/chữ thường

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

### 11.2. Quên dấu nháy cho chuỗi

Sai:

```javascript
const name = An;
```

Đúng:

```javascript
const name = "Trần Hữu Đang";
```

### 11.3. Nhầm `=` với phép so sánh

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

### 11.4. Sai đường dẫn file `.js`

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

### 11.5. Truy cập HTML trước khi phần tử tồn tại

Code sau có thể gây lỗi nếu script chạy quá sớm:

```javascript
const title = document.getElementById("title");
```

Một giải pháp:

```html
<script src="app.js" defer></script>
```

---

## 12. Bảng ghi nhớ nhanh

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

## 13. Bài tập

### Câu hỏi tự kiểm tra

1. `alert()` dùng để làm gì?
2. JavaScript có phân biệt chữ hoa và chữ thường không?
3. `let`, `const` và `var` khác nhau cơ bản như thế nào?
4. JavaScript có thể được đặt ở đâu trong HTML?
5. Vì sao nên tách JavaScript ra file `.js`?
6. `defer` có tác dụng gì?
7. `=` và `===` khác nhau như thế nào?
8. Comment một dòng và nhiều dòng được viết ra sao?
9. Hàm là gì?
10. `return` có tác dụng gì?
11. File `.js` có cần chứa thẻ `<script>` không?
12. Đường dẫn `js/app.js` có ý nghĩa gì?

### Bài tập thực hành

#### Bài 1. Hello World

Tạo file HTML và hiển thị:

```javascript
alert("Hello World");
```

#### Bài 2. Biến

Khai báo tên và tuổi, sau đó in ra Console.

```javascript
const name = "Nguyễn Văn A";
const age = 18;

console.log(name);
console.log(age);
```

#### Bài 3. Điều kiện

Cho một số nguyên và kiểm tra số đó dương, âm hay bằng 0.

#### Bài 4. Hàm

Viết hàm tính tổng hai số và trả kết quả bằng `return`.

#### Bài 5. Tách file JavaScript

Tạo cấu trúc:

```text
project/
├── index.html
└── app.js
```

Gắn file bằng:

```html
<script src="app.js" defer></script>
```

#### Bài 6. Project có thư mục `js`

Tạo:

```text
project/
├── index.html
└── js/
    └── app.js
```

Sau đó xác định đúng giá trị của thuộc tính `src`.

### Checklist kiến thức cần thuộc

- [ ] Viết được `alert()` và `console.log()`.
- [ ] Biết JavaScript phân biệt hoa/thường.
- [ ] Khai báo được biến bằng `let` và `const`.
- [ ] Biết comment một dòng và nhiều dòng.
- [ ] Biết dùng `<script>`.
- [ ] Biết gắn file `.js` bằng `src`.
- [ ] Hiểu ý nghĩa cơ bản của `defer`.
- [ ] Làm quen với `if...else`.
- [ ] Viết và gọi được hàm đơn giản.
- [ ] Biết tổ chức project HTML/CSS/JS.
- [ ] Biết kiểm tra lỗi đường dẫn file JavaScript.

---

## 14. Tổng kết

```text
JavaScript đầu tiên
       ↓
Câu lệnh và cú pháp
       ↓
<script>
       ↓
File .js bên ngoài
       ↓
defer + đường dẫn
       ↓
Tổ chức project
```

Sau bài này, người học đã có môi trường và cú pháp nền tảng để chuyển sang các bài về **biến, kiểu dữ liệu và ép kiểu**.
