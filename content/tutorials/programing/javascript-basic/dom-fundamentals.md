# Bài 7. DOM Fundamentals: Cấu trúc, Node và truy cập phần tử

> Tài liệu học tập biên soạn lại từ **WEB1042 -- Slide 5**. Giữ kiến
> thức cốt lõi của slide và cập nhật cách viết JavaScript/DOM hiện đại.

## 1. Mục tiêu bài học

Sau bài này, bạn cần:

- Hiểu DOM, HTML DOM và DOM tree.
- Phân biệt JavaScript với DOM API.
- Nhận biết document, element, text và comment node.
- Hiểu quan hệ parent, child và sibling.
- Phân biệt Node navigation với Element navigation.
- Biết `nodeName`, `nodeType`, `nodeValue`, `childNodes` và `children`.
- Phân biệt `textContent`, `innerText` và `innerHTML`.
- Truy cập element bằng `getElementById()`, `getElementsByTagName()`, `getElementsByName()`, `querySelector()` và `querySelectorAll()`.
- Hiểu DOM ready, `defer` và `DOMContentLoaded`.
- Tránh các lỗi phổ biến do whitespace text node hoặc script chạy quá sớm.

---
---


## 2. Tổng quan về DOM

### 2.1. Document Object Model

DOM là mô hình đối tượng biểu diễn tài liệu có cấu trúc để chương trình
có thể truy cập và thay đổi nội dung, cấu trúc và style.

Với trang HTML, browser parse HTML rồi tạo ra một cây đối tượng mà
JavaScript có thể thao tác.

```text
HTML source
    ↓ browser parse
DOM tree
    ↓ JavaScript
đọc / sửa / thêm / xóa / xử lý sự kiện
```

Ví dụ:

```html
<h1 id="title">Xin chào</h1>
```

JavaScript:

```javascript
const title = document.getElementById("title");
title.textContent = "Chào WEB1042";
```

---

### 2.2. HTML DOM

HTML DOM cung cấp các object, property và method để thao tác tài liệu
HTML.

Các thao tác chính:

```text
GET    → lấy element/nội dung
CHANGE → thay đổi nội dung, thuộc tính, style
ADD    → thêm element
REMOVE → xóa element
EVENT  → phản ứng với hành động người dùng
```

---

### 2.3. DOM và JavaScript không phải một thứ

```text
JavaScript → ngôn ngữ lập trình
DOM        → Web API/mô hình đối tượng do môi trường browser cung cấp
```

JavaScript có thể chạy ngoài browser, ví dụ Node.js, nơi không mặc định
có `document` DOM của trang web.

---


### 2.4. Từ HTML source đến DOM tree

```html
<html>
<head>
    <title>Hi</title>
</head>
<body>
    <p>Hello</p>
    <a href="https://google.com">Link</a>
</body>
</html>
```

Có thể hình dung cây:

```text
html
├── head
│   └── title
│       └── "Hi"
└── body
    ├── p
    │   └── "Hello"
    └── a
        └── "Link"
```

`href` là attribute của element `a`.

---

## 3. Node trong DOM

### 3.1. Các loại node quan trọng

Slide giới thiệu:

```text
document node
 element node
 text node
 attribute node
 comment node
```

Trong DOM API hiện đại, các loại node vẫn tồn tại trong mô hình Node.
Tuy nhiên, khi lập trình HTML thông thường, attribute chủ yếu được thao
tác qua API của `Element` như:

```javascript
element.getAttribute("href");
element.setAttribute("href", "...");
element.removeAttribute("href");
```

thay vì điều hướng attribute như child node.

---

### 3.2. Document node

```javascript
console.log(document.nodeType); // 9
console.log(document.nodeName); // #document
```

`document` là điểm vào chính để truy cập DOM.

---

### 3.3. Element node

Ví dụ:

```html
<p id="message">Hello</p>
```

```javascript
const p = document.getElementById("message");
console.log(p.nodeType); // 1
console.log(p.nodeName); // P
```

Tên element HTML thường được trả về dạng chữ hoa qua `nodeName` trong
HTML document.

---

### 3.4. Text node

Trong:

```html
<p>Hello</p>
```

`<p>` là element node, còn `Hello` nằm trong một text node.

```javascript
const p = document.querySelector("p");
const text = p.firstChild;

console.log(text.nodeType);  // 3
console.log(text.nodeName);  // #text
console.log(text.nodeValue); // Hello
```

---

### 3.5. Comment node

```html
<!-- Ghi chú -->
```

Comment node có:

```text
nodeType = 8
nodeName = #comment
```

---


## 4. Quan hệ và điều hướng trong DOM

### 4.1. Parent, child, sibling

```text
parent   → cha
child    → con
sibling  → anh/chị/em cùng cha
```

Ví dụ:

```html
<ul id="menu">
    <li>Trang chủ</li>
    <li>Sản phẩm</li>
    <li>Liên hệ</li>
</ul>
```

`ul` là parent của các `li`; ba `li` là siblings.

---

### 4.2. Node navigation

```javascript
node.parentNode;
node.childNodes;
node.firstChild;
node.lastChild;
node.previousSibling;
node.nextSibling;
```

Điểm rất quan trọng: các property trên làm việc với **mọi node**, kể cả
text node do khoảng trắng/xuống dòng trong HTML.

---

### 4.3. Element navigation

Khi muốn điều hướng **element**, ưu tiên:

```javascript
element.parentElement;
element.children;
element.firstElementChild;
element.lastElementChild;
element.previousElementSibling;
element.nextElementSibling;
```

Ví dụ:

```javascript
const menu = document.querySelector("#menu");

console.log(menu.firstElementChild.textContent);
console.log(menu.lastElementChild.textContent);
```

---

### 4.4. `firstChild` và whitespace text node

HTML:

```html
<div id="flowers">
    <p>Hoa Hồng</p>
    <p>Hoa Lan</p>
</div>
```

Ta có thể nghĩ:

```javascript
flowers.firstChild
```

là `<p>Hoa Hồng</p>`, nhưng nó có thể là text node chứa newline/spaces.

Nếu muốn element đầu tiên:

```javascript
const flowers = document.querySelector("#flowers");
console.log(flowers.firstElementChild.textContent);
```

Đây là cách ổn định hơn so với dựa vào số lượng whitespace text node.

---


## 5. Các thuộc tính quan trọng của Node

### 5.1. `nodeName`

```javascript
const title = document.querySelector("h1");
console.log(title.nodeName); // H1
```

Với text node:

```text
#text
```

Với document:

```text
#document
```

---

### 5.2. `nodeType`

Các giá trị cần nhớ trong bài:

| Node | Giá trị |
|---|---:|
| Element | 1 |
| Text | 3 |
| Comment | 8 |
| Document | 9 |

Slide còn nêu Attribute = 2. `ATTRIBUTE_NODE` là khái niệm legacy trong
DOM; khi code HTML hiện đại, thường thao tác attribute qua `Element`
API.

---

### 5.3. `nodeValue`

Với element:

```javascript
const p = document.querySelector("p");
console.log(p.nodeValue); // null
```

Với text node:

```javascript
console.log(p.firstChild.nodeValue);
```

Trong ứng dụng thông thường, để đọc/sửa text của element nên ưu tiên:

```javascript
p.textContent = "Nội dung mới";
```

---

### 5.4. `childNodes` và `children`

```javascript
const box = document.querySelector("#box");

console.log(box.childNodes); // mọi node
console.log(box.children);   // chỉ element
```

Đây là khác biệt rất quan trọng.

---

### 5.5. `attributes`

```javascript
const link = document.querySelector("a");
console.log(link.attributes);
```

Thông thường, lấy một attribute cụ thể:

```javascript
console.log(link.getAttribute("href"));
```

---


## 6. Nội dung của element

### 6.1. `textContent`

Đọc text:

```javascript
const title = document.querySelector("#title");
console.log(title.textContent);
```

Thay text:

```javascript
title.textContent = "Tiêu đề mới";
```

Nếu dữ liệu chỉ là text, đây thường là lựa chọn an toàn và rõ ràng.

---

### 6.2. `innerHTML`

`innerHTML` đọc/ghi markup HTML bên trong element.

```javascript
const box = document.querySelector("#box");
box.innerHTML = "<strong>Hello</strong>";
```

Browser sẽ parse chuỗi thành element `<strong>`.

> [!WARNING]
> 🚀 **Cảnh báo:** Không đưa trực tiếp dữ liệu không tin cậy từ người dùng/server vào `innerHTML` vì có thể tạo lỗ hổng XSS.

Ví dụ không nên dùng:

```javascript
// Không nên nếu userInput không đáng tin:
box.innerHTML = userInput;
```

Điều này có thể tạo lỗ hổng XSS.

Nếu chỉ cần text:

```javascript
box.textContent = userInput;
```

---

### 6.3. `innerText`

`innerText` phản ánh text được render và chịu ảnh hưởng của layout/CSS.

```javascript
console.log(element.innerText);
```

Trong nhiều thao tác dữ liệu thuần, `textContent` đơn giản và phù hợp
hơn.

---


## 7. Tìm và truy cập element

### 7.1. `getElementById()`

```html
<a id="link" href="https://google.com">Google</a>
```

```javascript
const link = document.getElementById("link");
console.log(link.href);
```

Không tìm thấy thì trả về:

```javascript
null
```

Nên kiểm tra khi element có thể không tồn tại:

```javascript
const link = document.getElementById("link");

if (link) {
    console.log(link.href);
}
```

---

### 7.2. `getElementsByTagName()`

```javascript
const paragraphs = document.getElementsByTagName("p");

for (const p of paragraphs) {
    console.log(p.textContent);
}
```

Nó trả về `HTMLCollection`, không phải Array thực sự.

---

### 7.3. `getElementsByName()`

Thường dùng với form control:

```html
<input type="radio" name="gender" value="male">
<input type="radio" name="gender" value="female">
```

```javascript
const genderInputs = document.getElementsByName("gender");
```

---

### 7.4. `querySelector()`

Trả về element đầu tiên khớp CSS selector:

```javascript
document.querySelector("#title");
document.querySelector(".card");
document.querySelector("nav a.active");
```

Không tìm thấy:

```text
null
```

---

### 7.5. `querySelectorAll()`

```javascript
const cards = document.querySelectorAll(".card");

for (const card of cards) {
    console.log(card.textContent);
}
```

Trả về `NodeList` tĩnh cho kết quả selector tại thời điểm gọi.

---

### 7.6. So sánh nhanh

```text
getElementById("x")        → 1 element hoặc null
getElementsByTagName("p") → HTMLCollection
getElementsByName("x")    → NodeList
querySelector(".x")       → element đầu tiên hoặc null
querySelectorAll(".x")    → static NodeList
```

---


## 8. DOM Ready

### 8.1. Vì sao script có thể không tìm thấy element?

Ví dụ:

```html
<script>
    const link = document.getElementById("link");
    console.log(link.href);
</script>

<a id="link" href="https://google.com">Link</a>
```

Khi script chạy, parser chưa tạo element `#link`, nên:

```javascript
link === null
```

và truy cập `link.href` gây lỗi.

---

### 8.2. Đặt script cuối `body`

```html
<a id="link" href="https://google.com">Link</a>

<script src="app.js"></script>
</body>
```

Đây là cách đơn giản.

---

### 8.3. Dùng `defer`

```html
<head>
    <script src="app.js" defer></script>
</head>
```

`defer` cho phép tải script song song với HTML và thực thi sau khi HTML
được parse xong, trước `DOMContentLoaded`.

Đây thường là lựa chọn tốt cho script ngoài phụ thuộc DOM.

---

### 8.4. `DOMContentLoaded`

```javascript
document.addEventListener("DOMContentLoaded", () => {
    const link = document.getElementById("link");
    console.log(link.href);
});
```

---

### 8.5. `window.onload` khác gì?

Slide dùng:

```html
<body onload="checkHref()">
```

`load` xảy ra muộn hơn `DOMContentLoaded`, thường sau khi các tài nguyên
phụ như ảnh đã tải xong.

Nếu chỉ cần DOM, không nhất thiết chờ `load`.

---


## 9. Lỗi thường gặp

### `Cannot read properties of null`

Nguyên nhân thường gặp:

```text
Sai selector
Script chạy trước element
Element không tồn tại trên trang
```

### Dùng `childNodes[0]` nhưng nhận text node

Nếu cần element, ưu tiên:

```javascript
container.children[0];
container.firstElementChild;
```

### Nhầm NodeList hoặc HTMLCollection với Array

Không nên mặc định mọi method của Array đều tồn tại trên collection DOM.

### Nhầm cú pháp selector

```javascript
document.querySelector("title");  // thẻ
document.querySelector("#title"); // id
document.querySelector(".title"); // class
```

---

## 10. Bài tập

### Bài 1. Đổi tiêu đề

Tìm `<h1 id="title">` bằng `getElementById()` hoặc `querySelector()` và đổi nội dung bằng `textContent`.

### Bài 2. Điều hướng DOM

Cho một `<ul>` có ba `<li>`. In:

```text
firstElementChild
lastElementChild
children.length
```

### Bài 3. `childNodes` và `children`

Tạo HTML có xuống dòng/khoảng trắng, sau đó so sánh:

```javascript
container.childNodes.length;
container.children.length;
```

Giải thích kết quả.

### Bài 4. So sánh selector API

Tìm cùng một element bằng:

```text
getElementById()
querySelector()
```

Sau đó tìm nhiều element bằng:

```text
getElementsByTagName()
querySelectorAll()
```

### Bài 5. DOM Ready

Đặt script trong `<head>` rồi sử dụng một trong hai cách:

```text
defer
DOMContentLoaded
```

để đảm bảo JavaScript truy cập được element.

### Câu hỏi tự kiểm tra

1. DOM là gì?
2. JavaScript và DOM khác nhau thế nào?
3. Document, Element, Text và Comment có `nodeType` bao nhiêu?
4. `childNodes` khác `children` thế nào?
5. `firstChild` khác `firstElementChild` thế nào?
6. `nodeValue` của element thường là gì?
7. `textContent`, `innerText` và `innerHTML` khác nhau thế nào?
8. `querySelector()` nhận cú pháp gì?
9. `querySelectorAll()` trả về gì?
10. Vì sao script chạy quá sớm có thể nhận `null`?
11. `defer` có tác dụng gì?
12. `DOMContentLoaded` xảy ra khi nào?

### Checklist kiến thức cần thuộc

- [ ] Hiểu DOM và DOM tree.
- [ ] Phân biệt JavaScript với DOM API.
- [ ] Phân biệt các loại Node.
- [ ] Hiểu parent/child/sibling.
- [ ] Phân biệt Node navigation và Element navigation.
- [ ] Biết `nodeName`, `nodeType`, `nodeValue`.
- [ ] Phân biệt `childNodes` và `children`.
- [ ] Biết `textContent`, `innerText`, `innerHTML`.
- [ ] Biết các API tìm element.
- [ ] Hiểu `defer` và `DOMContentLoaded`.

---

## 11. Tổng kết

```text
HTML source
    ↓
DOM tree
    ↓
Node
├── Document
├── Element
├── Text
└── Comment
    ↓
Tìm / đọc / điều hướng element
```

Bài tiếp theo sẽ dùng các element đã tìm được để **thay đổi style/attribute, tạo thêm element, xóa element và xử lý event**.
