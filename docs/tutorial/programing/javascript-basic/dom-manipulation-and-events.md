# Bài 8. DOM Manipulation và xử lý sự kiện

> Bài học này nối tiếp **Bài 7: DOM Fundamentals**. Sau khi đã biết cách tìm, đọc và điều hướng element, chúng ta sẽ thay đổi giao diện, tạo/xóa element và kết nối DOM với sự kiện người dùng.

## 1. Mục tiêu bài học

Sau bài này, bạn cần:

- Thay đổi style bằng JavaScript và quản lý class bằng `classList`.
- Đọc, thiết lập và xóa attribute.
- Phân biệt DOM property với HTML attribute.
- Tạo element bằng `createElement()`.
- Thêm element bằng `appendChild()`, `append()`, `prepend()`, `before()` và `after()`.
- Xóa element bằng `removeChild()` và `remove()`.
- Biết `cloneNode()`, `replaceWith()` và `replaceChildren()`.
- Gắn sự kiện bằng `addEventListener()`.
- Sử dụng event object.
- Tránh inline event handler khi không cần.
- Xây dựng các tương tác DOM nhỏ mà không phụ thuộc vào `innerHTML`.

---

## 2. Thay đổi giao diện và thuộc tính

### 2.1. Style trực tiếp

```javascript
const p = document.querySelector("p");
p.style.backgroundColor = "lightblue";
p.style.fontWeight = "bold";
```

Tuy nhiên, với nhiều style nên dùng class CSS.

---

### 2.2. `classList`

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

### 2.3. Attribute

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

### 2.4. Property và attribute

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


## 3. Tạo và thêm element

### 3.1. `createElement()`

```javascript
const p = document.createElement("p");
```

Element vừa tạo chưa xuất hiện trên trang cho đến khi được chèn vào DOM.

---

### 3.2. `createTextNode()` và `textContent`

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

### 3.3. `appendChild()`

```javascript
const p = document.createElement("p");
p.textContent = "Hello World";

document.body.appendChild(p);
```

`appendChild()` thêm node vào cuối danh sách con của parent.

Nếu node đã nằm ở nơi khác trong DOM, nó sẽ được **di chuyển**, không
clone tự động.

---

### 3.4. `append()`

API hiện đại:

```javascript
const box = document.querySelector("#box");
const strong = document.createElement("strong");
strong.textContent = "Hello";

box.append("Nội dung: ", strong);
```

`append()` có thể nhận nhiều node và string.

---

### 3.5. `prepend()`

```javascript
box.prepend("Đầu: ");
```

Thêm vào đầu element.

---

### 3.6. `before()` và `after()`

```javascript
const item = document.querySelector("#item");
item.before("Trước item");
item.after("Sau item");
```

---

### 3.7. `insertBefore()`

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


## 4. Xóa, clone và thay thế element

### 4.1. `removeChild()`

Slide dùng:

```javascript
const pHi = document.getElementById("pHi");
document.body.removeChild(pHi);
```

Điều kiện: node truyền vào phải là child trực tiếp của parent gọi
`removeChild()`.

---

### 4.2. `remove()`

```javascript
const pHi = document.getElementById("pHi");
pHi?.remove();
```

Không cần tự tìm parent.

---

### 4.3. Xóa tất cả node con

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


### 4.4. `cloneNode()`

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

### 4.5. `replaceWith()`

```javascript
const oldTitle = document.querySelector("h1");
const newTitle = document.createElement("h2");
newTitle.textContent = "Tiêu đề mới";

oldTitle.replaceWith(newTitle);
```

---


## 5. DOM và Event

### 5.1. Inline event trong slide

Slide có dạng:

```html
<button onclick="displayDate()">Display Date</button>
```

Cách này hoạt động, nhưng làm trộn HTML với JavaScript.

---

### 5.2. `addEventListener()`

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

### 5.3. Event object

```javascript
button.addEventListener("click", (event) => {
    console.log(event.type);
    console.log(event.target);
});
```

`event.target` là element nơi event phát sinh.

---


## 6. Cách viết DOM hiện đại

### 6.1. Không dùng inline `onclick` khi không cần

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


## 7. Ví dụ tổng hợp

### 7.1. Thêm sản phẩm vào danh sách

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

### 7.2. Thay đổi ảnh bằng DOM API

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

### 7.3. Tạo card bằng DOM

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

### Demo trực tiếp

<div class="tutorial-live-demo">
    <button type="button" id="js-dom-add">Thêm item</button>
    <button type="button" id="js-dom-remove">Xóa item cuối</button>
    <ul id="js-dom-list">
        <li>HTML</li>
        <li>CSS</li>
    </ul>

    <script>
        const list = document.getElementById('js-dom-list');

        document.getElementById('js-dom-add').addEventListener('click', () => {
            const item = document.createElement('li');
            item.textContent = `JavaScript ${list.children.length + 1}`;
            list.appendChild(item);
        });

        document.getElementById('js-dom-remove').addEventListener('click', () => {
            if (list.lastElementChild) {
                list.lastElementChild.remove();
            }
        });
    </script>
</div>

## 8. Lỗi thường gặp và an toàn

### Đưa dữ liệu người dùng vào `innerHTML`

Không nên:

```javascript
output.innerHTML = userInput;
```

Nếu chỉ cần text:

```javascript
output.textContent = userInput;
```

### Dùng `document.write()` để render ứng dụng

Ưu tiên DOM API:

```javascript
const output = document.querySelector("#output");
output.textContent = "Kết quả";
```

### Dựa vào global variable tạo từ `id`

Không nên dựa vào việc browser tự tạo global variable từ `id`. Hãy tìm element rõ ràng bằng selector API.

### Clone element có `id`

`cloneNode(true)` có thể tạo `id` trùng nếu bản sao được chèn vào cùng document. Cần kiểm tra và sửa `id`.

---

## 9. Bài tập

### Bài 1. Toggle class

Tạo một `<p>` và button. Mỗi lần click dùng:

```javascript
classList.toggle("highlight");
```

### Bài 2. Danh sách môn học

Cho:

```javascript
const subjects = ["JavaScript", "HTML", "CSS"];
```

Dùng `createElement()` và `append()` để tạo danh sách. Không dùng `innerHTML`.

### Bài 3. Xóa item

Mỗi `<li>` có nút **Xóa**. Click nút thì xóa đúng `<li>` bằng `remove()`.

### Bài 4. Attribute

Cho:

```html
<a id="website">Website</a>
```

Thiết lập:

```text
href=https://example.com
target=_blank
rel=noopener
```

bằng DOM API.

### Bài 5. Thêm sinh viên

Tạo form gồm Tên, Điểm và button Thêm. Khi thêm, tạo row/table item mới bằng DOM API. Nếu điểm `>= 5`, thêm class `pass`; ngược lại `fail`.

### Bài 6. Mini Todo

Tạo Todo List:

```text
input
button Add
ul
```

Yêu cầu:

- Không thêm chuỗi rỗng.
- Mỗi item có nút Xóa.
- Click item để toggle class `completed`.
- Không dùng inline `onclick`.
- Không đưa input trực tiếp vào `innerHTML`.

### Câu hỏi tự kiểm tra

1. Khi nào nên dùng `classList` thay vì sửa nhiều inline style?
2. `getAttribute()` và `setAttribute()` dùng làm gì?
3. Property và attribute có luôn giống nhau không?
4. `createElement()` làm gì?
5. `append()` tiện hơn `appendChild()` ở điểm nào?
6. `remove()` khác `removeChild()` thế nào?
7. `cloneNode(true)` có ý nghĩa gì?
8. `replaceWith()` dùng làm gì?
9. Vì sao `addEventListener()` thường tốt hơn inline `onclick`?
10. Event object chứa thông tin gì?
11. Vì sao không nên đưa dữ liệu không tin cậy vào `innerHTML`?
12. Vì sao cần cẩn thận khi clone element có `id`?

### Checklist kiến thức cần thuộc

- [ ] Biết `style` và `classList`.
- [ ] Biết attribute API.
- [ ] Phân biệt property và attribute.
- [ ] Biết `createElement()`.
- [ ] Biết các API thêm element.
- [ ] Biết các API xóa/thay thế element.
- [ ] Biết `cloneNode()`.
- [ ] Biết `addEventListener()`.
- [ ] Biết event object.
- [ ] Biết tránh `innerHTML` khi chỉ cần text.
- [ ] Biết xây dựng tương tác DOM đơn giản.

---

## 10. Tổng kết

```text
Tìm element
     ↓
Đọc dữ liệu
     ↓
Thay đổi class / attribute / content
     ↓
Tạo hoặc xóa element
     ↓
addEventListener()
     ↓
Phản ứng với người dùng
```

Sau hai bài DOM, người học đã đi từ **hiểu DOM tree → tìm element → điều hướng → thay đổi → tạo/xóa → xử lý event**, đủ nền tảng để xây dựng các giao diện JavaScript tương tác.
