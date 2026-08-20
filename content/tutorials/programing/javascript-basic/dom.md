# Bài 5. Mô hình DOM

> Tài liệu học tập biên soạn lại từ **WEB1042 -- Slide 5**. Giữ kiến
> thức cốt lõi của slide và cập nhật cách viết JavaScript/DOM hiện đại.

## 1. Mục tiêu bài học

Sau bài này, bạn cần:

-   Hiểu Document Object Model (DOM) và HTML DOM.
-   Hiểu cấu trúc cây DOM.
-   Phân biệt document node, element node, text node, comment node và
    cách nhìn hiện đại về attribute.
-   Hiểu quan hệ parent / child / sibling.
-   Biết các thuộc tính quan trọng của Node.
-   Biết truy cập element bằng `getElementById()`,
    `getElementsByTagName()`, `getElementsByName()` và selector hiện
    đại.
-   Biết tạo, thêm, thay đổi và xóa node/element.
-   Hiểu thời điểm DOM sẵn sàng để JavaScript truy cập.
-   Biết feature detection và cách viết DOM code tương thích trình duyệt
    tốt hơn.

---


## 2. Document Object Model

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

## 3. HTML DOM

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

## 4. DOM và JavaScript không phải một thứ

```text
JavaScript → ngôn ngữ lập trình
DOM        → Web API/mô hình đối tượng do môi trường browser cung cấp
```

JavaScript có thể chạy ngoài browser, ví dụ Node.js, nơi không mặc định
có `document` DOM của trang web.

---


## 5. Ví dụ HTML

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

## 6. Các loại node quan trọng

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

## 7. Document node

```javascript
console.log(document.nodeType); // 9
console.log(document.nodeName); // #document
```

`document` là điểm vào chính để truy cập DOM.

---

## 8. Element node

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

## 9. Text node

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

## 10. Comment node

```html
<!-- Ghi chú -->
```

Comment node có:

```text
nodeType = 8
nodeName = #comment
```

---


## 11. Parent, child, sibling

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

## 12. Các property điều hướng node

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

## 13. Element navigation -- thường dễ dùng hơn

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

## 14. Vì sao `firstChild` dễ gây nhầm?

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


## 15. `nodeName`

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

## 16. `nodeType`

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

## 17. `nodeValue`

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

## 18. `childNodes` và `children`

```javascript
const box = document.querySelector("#box");

console.log(box.childNodes); // mọi node
console.log(box.children);   // chỉ element
```

Đây là khác biệt rất quan trọng.

---

## 19. `attributes`

```javascript
const link = document.querySelector("a");
console.log(link.attributes);
```

Thông thường, lấy một attribute cụ thể:

```javascript
console.log(link.getAttribute("href"));
```

---


## 20. `textContent`

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

## 21. `innerHTML`

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

## 22. `innerText`

`innerText` phản ánh text được render và chịu ảnh hưởng của layout/CSS.

```javascript
console.log(element.innerText);
```

Trong nhiều thao tác dữ liệu thuần, `textContent` đơn giản và phù hợp
hơn.

---


## 23. `getElementById()`

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

## 24. `getElementsByTagName()`

```javascript
const paragraphs = document.getElementsByTagName("p");

for (const p of paragraphs) {
    console.log(p.textContent);
}
```

Nó trả về `HTMLCollection`, không phải Array thực sự.

---

## 25. `getElementsByName()`

Thường dùng với form control:

```html
<input type="radio" name="gender" value="male">
<input type="radio" name="gender" value="female">
```

```javascript
const genderInputs = document.getElementsByName("gender");
```

---

## 26. `querySelector()` -- cách hiện đại rất quan trọng

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

## 27. `querySelectorAll()`

```javascript
const cards = document.querySelectorAll(".card");

for (const card of cards) {
    console.log(card.textContent);
}
```

Trả về `NodeList` tĩnh cho kết quả selector tại thời điểm gọi.

---

## 28. So sánh nhanh

```text
getElementById("x")        → 1 element hoặc null
getElementsByTagName("p") → HTMLCollection
getElementsByName("x")    → NodeList
querySelector(".x")       → element đầu tiên hoặc null
querySelectorAll(".x")    → static NodeList
```

---


## 29. Vì sao code trong slide có lúc không tìm thấy element?

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

## 30. Cách 1 -- đặt script cuối `body`

```html
<a id="link" href="https://google.com">Link</a>

<script src="app.js"></script>
</body>
```

Đây là cách đơn giản.

---

## 31. Cách 2 -- dùng `defer`

```html
<head>
    <script src="app.js" defer></script>
</head>
```

`defer` cho phép tải script song song với HTML và thực thi sau khi HTML
được parse xong, trước `DOMContentLoaded`.

Đây thường là lựa chọn tốt cho script ngoài phụ thuộc DOM.

---

## 32. Cách 3 -- `DOMContentLoaded`

```javascript
document.addEventListener("DOMContentLoaded", () => {
    const link = document.getElementById("link");
    console.log(link.href);
});
```

---

## 33. `window.onload` khác gì?

Slide dùng:

```html
<body onload="checkHref()">
```

`load` xảy ra muộn hơn `DOMContentLoaded`, thường sau khi các tài nguyên
phụ như ảnh đã tải xong.

Nếu chỉ cần DOM, không nhất thiết chờ `load`.

---


## 34. Style trực tiếp

```javascript
const p = document.querySelector("p");
p.style.backgroundColor = "lightblue";
p.style.fontWeight = "bold";
```

Tuy nhiên, với nhiều style nên dùng class CSS.

---

## 35. `classList`

CSS:

```css
.highlight {
    background: yellow;
    font-weight: bold;
}
```

JavaScript:

```javascript
const p = document.querySelector("p");
p.classList.add("highlight");
p.classList.remove("highlight");
p.classList.toggle("highlight");
```

Kiểm tra:

```javascript
p.classList.contains("highlight");
```

---

## 36. Attribute

```javascript
const link = document.querySelector("a");

link.setAttribute("href", "https://example.com");
console.log(link.getAttribute("href"));
link.removeAttribute("target");
```

Kiểm tra:

```javascript
link.hasAttribute("href");
```

---

## 37. Property và attribute

Ví dụ:

```html
<input id="name" value="Trần Hữu Đang">
```

```javascript
const input = document.querySelector("#name");

console.log(input.getAttribute("value"));
console.log(input.value);
```

Attribute thường phản ánh markup/giá trị ban đầu; DOM property có thể
phản ánh trạng thái hiện tại của object. Hai khái niệm có liên hệ nhưng
không phải lúc nào cũng giống nhau.

---


## 38. `createElement()`

```javascript
const p = document.createElement("p");
```

Element vừa tạo chưa xuất hiện trên trang cho đến khi được chèn vào DOM.

---

## 39. `createTextNode()`

Theo slide:

```javascript
const text = document.createTextNode("Hello World");
p.appendChild(text);
```

Cách này vẫn hợp lệ.

Nhưng nếu chỉ cần text:

```javascript
p.textContent = "Hello World";
```

thường đơn giản hơn.

---

## 40. `appendChild()`

```javascript
const p = document.createElement("p");
p.textContent = "Hello World";

document.body.appendChild(p);
```

`appendChild()` thêm node vào cuối danh sách con của parent.

Nếu node đã nằm ở nơi khác trong DOM, nó sẽ được **di chuyển**, không
clone tự động.

---

## 41. `append()`

API hiện đại:

```javascript
const box = document.querySelector("#box");
const strong = document.createElement("strong");
strong.textContent = "Hello";

box.append("Nội dung: ", strong);
```

`append()` có thể nhận nhiều node và string.

---

## 42. `prepend()`

```javascript
box.prepend("Đầu: ");
```

Thêm vào đầu element.

---

## 43. `before()` và `after()`

```javascript
const item = document.querySelector("#item");
item.before("Trước item");
item.after("Sau item");
```

---

## 44. `insertBefore()`

API Node truyền thống:

```javascript
parent.insertBefore(newNode, referenceNode);
```

Ví dụ:

```javascript
const list = document.querySelector("ul");
const item = document.createElement("li");
item.textContent = "Mới";

list.insertBefore(item, list.firstElementChild);
```

---


## 45. `removeChild()`

Slide dùng:

```javascript
const pHi = document.getElementById("pHi");
document.body.removeChild(pHi);
```

Điều kiện: node truyền vào phải là child trực tiếp của parent gọi
`removeChild()`.

---

## 46. `remove()` -- cách hiện đại

```javascript
const pHi = document.getElementById("pHi");
pHi?.remove();
```

Không cần tự tìm parent.

---

## 47. Xóa tất cả node con

Cách hiện đại:

```javascript
const box = document.querySelector("#box");
box.replaceChildren();
```

Hoặc vòng lặp:

```javascript
while (box.firstChild) {
    box.removeChild(box.firstChild);
}
```

---


## 48. `cloneNode()`

```javascript
const card = document.querySelector(".card");
const copy = card.cloneNode(true);
document.body.append(copy);
```

```text
false → chỉ clone node
true  → clone cả descendants
```

Lưu ý: clone element có `id` có thể tạo ID trùng; cần sửa nếu chèn vào
cùng document.

---

## 49. `replaceWith()`

```javascript
const oldTitle = document.querySelector("h1");
const newTitle = document.createElement("h2");
newTitle.textContent = "Tiêu đề mới";

oldTitle.replaceWith(newTitle);
```

---


## 50. Inline event trong slide

Slide có dạng:

```html
<button onclick="displayDate()">Display Date</button>
```

Cách này hoạt động, nhưng làm trộn HTML với JavaScript.

---

## 51. `addEventListener()`

Ưu tiên:

```html
<button id="displayButton">Display Date</button>
<h1 id="demo">My First Web Page</h1>
```

```javascript
const button = document.querySelector("#displayButton");
const demo = document.querySelector("#demo");

button.addEventListener("click", () => {
    demo.textContent = new Date().toLocaleString();
});
```

---

## 52. Event object

```javascript
button.addEventListener("click", (event) => {
    console.log(event.type);
    console.log(event.target);
});
```

`event.target` là element nơi event phát sinh.

---


## 53. Vấn đề lịch sử trong slide

Slide minh họa IE và Firefox cũ có thể tạo số lượng `childNodes` khác
nhau do xử lý whitespace/text node khác nhau.

Bài học quan trọng hiện nay không phải là viết nhánh code riêng cho
IE/Firefox, mà là:

```text
1. Dùng Web Standards.
2. Tránh phụ thuộc vào whitespace text node.
3. Dùng element navigation khi muốn element.
4. Feature detection khi cần kiểm tra API.
5. Test trên tập browser thực tế mà dự án hỗ trợ.
```

---

## 54. Không nên browser sniffing bằng `userAgent`

Slide đề cập:

```javascript
navigator.userAgent
```

User-Agent có thể phức tạp, thay đổi hoặc giảm độ chi tiết. Không nên
dùng nó làm cách chính để quyết định browser có hỗ trợ một API hay
không.

---

## 55. Feature detection

Thay vì:

```javascript
if (browser === "...") {
    // ...
}
```

hãy kiểm tra tính năng:

```javascript
if ("querySelector" in document) {
    // API tồn tại
}
```

Hoặc:

```javascript
if ("firstElementChild" in document.body) {
    console.log("Có hỗ trợ firstElementChild");
}
```

---

## 56. `<noscript>`

Có thể cung cấp thông báo khi JavaScript bị tắt/không khả dụng:

```html
<noscript>
    Trang này cần JavaScript để sử dụng đầy đủ chức năng.
</noscript>
```

Nên thiết kế progressive enhancement khi phù hợp, thay vì giả định toàn
bộ nội dung trang bắt buộc phải được JavaScript tạo ra.

---


## 57. `var` → `const` / `let`

Slide:

```javascript
var linkNode = document.getElementById("link");
```

Hiện đại:

```javascript
const linkNode = document.getElementById("link");
```

---

## 58. Không dựa vào global variable tạo từ `id`

Code cũ có thể viết:

```javascript
document.body.removeChild(pHi);
```

mà không khai báo `pHi`, dựa vào browser biến `id="pHi"` thành global
property.

Không nên làm vậy.

Viết rõ:

```javascript
const pHi = document.getElementById("pHi");
pHi?.remove();
```

---

## 59. `firstChild` → `firstElementChild` khi muốn element

```javascript
container.firstChild;
```

có thể là text node.

```javascript
container.firstElementChild;
```

là element đầu tiên.

---

## 60. `childNodes` → `children` khi chỉ cần element

```javascript
container.childNodes; // mọi Node
container.children;   // Element
```

---

## 61. `innerHTML` không phải "giá trị văn bản"

Slide mô tả `innerHTML` khá đơn giản. Chính xác hơn:

```text
innerHTML → chuỗi markup HTML bên trong element
textContent → nội dung text
```

Ví dụ:

```html
<p id="demo">Hello <strong>World</strong></p>
```

```javascript
const demo = document.querySelector("#demo");

console.log(demo.innerHTML);
// Hello <strong>World</strong>

console.log(demo.textContent);
// Hello World
```

---

## 62. Tránh `document.write()`

Slide cũ dùng `document.write()` để demo.

Trong ứng dụng hiện đại, dùng DOM:

```javascript
const output = document.querySelector("#output");
output.textContent = "Kết quả";
```

`document.write()` có hành vi nguy hiểm nếu chạy sau khi document đã tải
và không phù hợp với kiến trúc ứng dụng hiện đại.

---

## 63. Không dùng inline `onclick` khi không cần

Thay:

```html
<button onclick="showImage()">Hiển thị</button>
```

bằng:

```javascript
button.addEventListener("click", showImage);
```

HTML và JavaScript tách biệt hơn.

---


## 64. Thêm sản phẩm vào danh sách

```html
<input id="productName" placeholder="Tên sản phẩm">
<button id="addButton">Thêm</button>
<ul id="productList"></ul>
```

```javascript
const input = document.querySelector("#productName");
const addButton = document.querySelector("#addButton");
const list = document.querySelector("#productList");

addButton.addEventListener("click", () => {
    const name = input.value.trim();

    if (!name) {
        return;
    }

    const item = document.createElement("li");
    item.textContent = name;

    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.textContent = "Xóa";

    removeButton.addEventListener("click", () => {
        item.remove();
    });

    item.append(" ", removeButton);
    list.append(item);

    input.value = "";
    input.focus();
});
```

Kiến thức sử dụng:

```text
querySelector
value
addEventListener
createElement
textContent
append
remove
focus
```

---

## 65. Thay đổi ảnh không cần `innerHTML`

Slide dùng:

```javascript
node.innerHTML = "<img src='mu.jpg'>";
```

Cách DOM rõ ràng hơn:

```html
<button id="showImage">Hiển thị ảnh</button>
<div id="imageContainer"></div>
```

```javascript
const button = document.querySelector("#showImage");
const container = document.querySelector("#imageContainer");

button.addEventListener("click", () => {
    const image = document.createElement("img");
    image.src = "mu.jpg";
    image.alt = "Chiếc mũ";

    container.replaceChildren(image);
});
```

---

## 66. Tạo card bằng DOM

```javascript
function createProductCard(product) {
    const article = document.createElement("article");
    article.classList.add("product-card");

    const title = document.createElement("h2");
    title.textContent = product.name;

    const price = document.createElement("p");
    price.textContent = `${product.price.toLocaleString("vi-VN")} đ`;

    article.append(title, price);
    return article;
}

const product = {
    name: "Bàn phím",
    price: 500000
};

document.body.append(createProductCard(product));
```

Kết hợp kiến thức Bài 4 và Bài 5:

```text
Object + Function + DOM
```

---


## 67. `Cannot read properties of null`

```javascript
const button = document.querySelector("#button");
button.addEventListener("click", handler);
```

Nếu `#button` không tồn tại, `button` là `null`.

Nguyên nhân thường gặp:

```text
Sai selector
Script chạy trước element
Element chỉ tồn tại ở một số trang
```

---

## 68. Dùng `childNodes[0]` và gặp text node

Không nên giả định:

```javascript
container.childNodes[0]
```

là element.

Nếu cần element:

```javascript
container.children[0]
```

hoặc:

```javascript
container.firstElementChild
```

---

## 69. Gán dữ liệu người dùng vào `innerHTML`

Không nên:

```javascript
output.innerHTML = userInput;
```

Nếu chỉ cần hiển thị text:

```javascript
output.textContent = userInput;
```

---

## 70. Nhầm `NodeList`/`HTMLCollection` với Array

Không nên mặc định mọi method Array đều có sẵn.

Có thể chuyển:

```javascript
const elements = Array.from(document.getElementsByTagName("p"));
```

Hoặc với `querySelectorAll()` có thể dùng trực tiếp `forEach()` trong
browser hiện đại:

```javascript
document.querySelectorAll("p").forEach((p) => {
    console.log(p.textContent);
});
```

---

## 71. Quên rằng selector CSS có cú pháp riêng

```javascript
document.querySelector("title");  // thẻ title
document.querySelector("#title"); // id="title"
document.querySelector(".title"); // class="title"
```

---


## 72. Tìm element

```javascript
const one = document.getElementById("id");
const first = document.querySelector(".class");
const all = document.querySelectorAll(".class");
```

## 73. Nội dung

```javascript
element.textContent;
element.innerHTML;
element.innerText;
```

## 74. Điều hướng

```javascript
element.parentElement;
element.children;
element.firstElementChild;
element.lastElementChild;
element.nextElementSibling;
element.previousElementSibling;
```

## 75. Tạo/thêm

```javascript
const element = document.createElement("div");
element.textContent = "Hello";
parent.append(element);
```

## 76. Attribute/class

```javascript
element.setAttribute("data-id", "1");
element.getAttribute("data-id");
element.classList.add("active");
```

## 77. Xóa

```javascript
element.remove();
```

## 78. Event

```javascript
element.addEventListener("click", () => {
    // xử lý
});
```

---


## Bài tập

### Bài 1. Đổi tiêu đề

HTML:

```html
<h1 id="title">Tiêu đề cũ</h1>
<button id="changeButton">Đổi</button>
```

Yêu cầu: click button đổi nội dung thành `WEB1042 - DOM` bằng
`textContent`.

---

### Bài 2. Đổi class

Tạo một `<p>` và button. Mỗi lần click dùng:

```javascript
classList.toggle()
```

để bật/tắt class `highlight`.

---

### Bài 3. Danh sách môn học

Cho Array:

```javascript
const subjects = ["JavaScript", "HTML", "CSS"];
```

Dùng `createElement()` và `append()` tạo `<li>` tương ứng trong `<ul>`.

Không dùng `innerHTML`.

---

### Bài 4. Xóa item

Mỗi `<li>` có button `Xóa`. Click button thì xóa đúng `<li>` đó bằng:

```javascript
element.remove()
```

---

### Bài 5. Thêm sinh viên

Tạo form gồm:

```text
Tên
Điểm
Button Thêm
```

Click `Thêm` tạo một row/table item mới bằng DOM API.

Nếu điểm \>= 5, thêm class `pass`; ngược lại `fail`.

---

### Bài 6. Điều hướng DOM

HTML:

```html
<ul id="menu">
    <li>Home</li>
    <li>Products</li>
    <li>Contact</li>
</ul>
```

In ra console:

```text
firstElementChild
lastElementChild
children.length
```

---

### Bài 7. Attribute

Cho:

```html
<a id="website">Website</a>
```

Dùng JavaScript để thiết lập:

```text
href=https://example.com
target=_blank
rel=noopener
```

bằng DOM API.

---

### Bài 8. DOM ready

Đặt script trong `<head>` rồi sửa để code vẫn tìm được button bằng một
trong hai cách:

```text
defer
DOMContentLoaded
```

---

### Bài 9. `childNodes` vs `children`

Tạo HTML có xuống dòng/khoảng trắng. In:

```javascript
container.childNodes.length;
container.children.length;
```

Giải thích vì sao hai số có thể khác nhau.

---

### Bài 10. Mini Todo

Tạo Todo List gồm:

```text
input
button Add
ul
```

Yêu cầu:

```text
Không cho thêm chuỗi rỗng
Mỗi item có nút Xóa
Click item để toggle class completed
Không dùng inline onclick
Không đưa input trực tiếp vào innerHTML
```

---


### Câu hỏi tự kiểm tra

1. DOM là gì?
2.  HTML DOM dùng để làm gì?
3.  DOM tree là gì?
4.  Document node có `nodeType` bao nhiêu?
5.  Element node có `nodeType` bao nhiêu?
6.  Text node có `nodeType` bao nhiêu?
7.  Comment node có `nodeType` bao nhiêu?
8.  Parent, child và sibling nghĩa là gì?
9.  `childNodes` khác `children` thế nào?
10. `firstChild` khác `firstElementChild` thế nào?
11. `nodeName` của element `<p>` thường là gì?
12. Vì sao `nodeValue` của element thường là `null`?
13. `textContent` dùng để làm gì?
14. `innerHTML` khác `textContent` thế nào?
15. Khi nào `innerHTML` có nguy cơ bảo mật?
16. `getElementById()` trả về gì khi không tìm thấy?
17. `getElementsByTagName()` trả về loại collection nào?
18. `querySelector()` nhận cú pháp gì?
19. `querySelectorAll()` trả về gì?
20. Vì sao script đặt trước element có thể nhận `null`?
21. `defer` có ích gì?
22. `DOMContentLoaded` xảy ra khi nào?
23. `createElement()` làm gì?
24. `appendChild()` làm gì?
25. `append()` khác `appendChild()` ở điểm tiện lợi nào?
26. `setAttribute()` dùng làm gì?
27. `classList.add()` dùng làm gì?
28. `removeChild()` yêu cầu quan hệ gì giữa parent và node?
29. `remove()` có ưu điểm gì?
30. Vì sao feature detection thường tốt hơn browser sniffing?

---


### Checklist kiến thức cần thuộc

- [ ] Hiểu DOM và HTML DOM.
- [ ] Hiểu DOM tree.
- [ ] Phân biệt document/element/text/comment node.
- [ ] Hiểu parent/child/sibling.
- [ ] Biết `nodeName`, `nodeValue`, `nodeType`.
- [ ] Biết `parentNode`, `childNodes`.
- [ ] Biết `children` và các Element navigation properties.
- [ ] Biết `textContent`, `innerText`, `innerHTML`.
- [ ] Biết rủi ro XSS khi dùng `innerHTML` với dữ liệu không tin cậy.
- [ ] Biết `getElementById()`.
- [ ] Biết `getElementsByTagName()` và `getElementsByName()`.
- [ ] Biết `querySelector()` / `querySelectorAll()`.
- [ ] Hiểu DOM ready, `defer`, `DOMContentLoaded`.
- [ ] Biết `style` và `classList`.
- [ ] Biết `getAttribute()` / `setAttribute()` / `removeAttribute()`.
- [ ] Biết `createElement()`.
- [ ] Biết `appendChild()` và `append()`.
- [ ] Biết `removeChild()` và `remove()`.
- [ ] Biết `addEventListener()`.
- [ ] Biết feature detection.

---

## Tổng kết

```text
DOM
├── document
│
├── Node
│   ├── Element
│   ├── Text
│   └── Comment
│
├── Quan hệ
│   ├── parent
│   ├── children
│   └── siblings
│
├── Truy cập
│   ├── getElementById
│   ├── getElementsByTagName
│   ├── getElementsByName
│   ├── querySelector
│   └── querySelectorAll
│
├── Nội dung
│   ├── textContent
│   ├── innerText
│   └── innerHTML
│
├── Thay đổi
│   ├── style
│   ├── classList
│   └── attributes
│
├── Tạo/thêm
│   ├── createElement
│   ├── createTextNode
│   ├── appendChild
│   └── append
│
├── Xóa
│   ├── removeChild
│   └── remove
│
└── Event
    └── addEventListener
```

Ví dụ tổng hợp:

```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WEB1042 - Bài 5</title>
    <script src="app.js" defer></script>
</head>
<body>
    <input id="itemInput" placeholder="Nhập nội dung">
    <button id="addButton" type="button">Thêm</button>
    <ul id="itemList"></ul>
</body>
</html>
```

```javascript
const input = document.querySelector("#itemInput");
const addButton = document.querySelector("#addButton");
const list = document.querySelector("#itemList");

addButton.addEventListener("click", () => {
    const value = input.value.trim();

    if (!value) {
        return;
    }

    const item = document.createElement("li");
    const text = document.createElement("span");
    const removeButton = document.createElement("button");

    text.textContent = value;
    removeButton.type = "button";
    removeButton.textContent = "Xóa";

    removeButton.addEventListener("click", () => {
        item.remove();
    });

    item.append(text, " ", removeButton);
    list.append(item);

    input.value = "";
    input.focus();
});
```

Đây là luồng DOM cốt lõi:

```text
Tìm element
→ lắng nghe event
→ đọc dữ liệu
→ tạo element
→ thiết lập nội dung/attribute
→ thêm vào DOM
→ có thể sửa/xóa sau đó
```

> [!WARNING]
> 🚀 **Lưu ý:** Slide 5 có nhiều ví dụ từ thời Internet Explorer/Firefox cũ. Khi học cần nhận biết đúng ngữ cảnh của các kỹ thuật như whitespace text node, implicit global từ `id`, `document.write()` và browser sniffing bằng `userAgent`.
