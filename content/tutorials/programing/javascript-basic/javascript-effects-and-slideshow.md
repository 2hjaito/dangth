# Bài 9. JavaScript Effects: Style, Rollover và Slideshow

> Tài liệu học tập biên soạn lại từ **WEB1042 -- Slide 6**. Nội dung giữ
> các chủ đề của slide, đồng thời cập nhật cách viết JavaScript hiện
> đại, dễ áp dụng hơn trên trình duyệt hiện nay.

## 1. Mục tiêu bài học

Sau bài này, bạn cần:

- Biết thay đổi style của element bằng JavaScript.
- Hiểu khi nào nên dùng `style` và khi nào nên dùng `classList`.
- Tạo hiệu ứng Image Rollover bằng event hiện đại.
- Hiểu kỹ thuật preload ảnh và giới hạn của preload.
- Xây dựng slideshow Previous/Next có khả năng quay vòng.
- Mở rộng slideshow với Play/Stop bằng `setInterval()` và `clearInterval()`.
- Hiểu HTML Image Map và các thành phần `usemap`, `map`, `area`.
- Nhận biết các kỹ thuật cũ trong slide và cách viết tương ứng hiện đại.

---
---


## 2. JavaScript và CSS

### 2.1. Nhắc lại CSS

CSS định nghĩa cách trình bày của trang web như:

```text
màu sắc
font chữ
kích thước
khoảng cách
layout
border
background
animation
...
```

Cú pháp:

```css
selector {
    property: value;
}
```

Ví dụ:

```css
h1 {
    font-family: Arial, sans-serif;
    color: blue;
}
```

Các selector cơ bản:

```css
h1 { }       /* theo tên thẻ */
.title { }   /* theo class */
#title { }   /* theo id */
```

> [!NOTE]
> 💡 **Ghi chú:** Selector ID dùng dấu `#`, không phải dấu `.`.

---

### 2.2. JavaScript thay đổi CSS

Mỗi DOM element có property `style` để thao tác **inline style**.

```html
<h1 id="title">WEB1042</h1>
```

```javascript
const title = document.getElementById("title");
title.style.color = "blue";
title.style.fontFamily = "Arial";
```

---

### 2.3. CSS property và camelCase

CSS:

```css
font-family: Arial;
background-color: yellow;
font-size: 20px;
```

JavaScript dùng camelCase:

```javascript
element.style.fontFamily = "Arial";
element.style.backgroundColor = "yellow";
element.style.fontSize = "20px";
```

Quy tắc:

```text
font-family      → fontFamily
background-color → backgroundColor
border-radius    → borderRadius
margin-top       → marginTop
```

---

### 2.4. Thiết lập style bằng ID

Cách trong slide:

```javascript
var hTieuDe = document.getElementById("hTieuDe");
hTieuDe.style.fontFamily = "arial";
```

Cập nhật:

```javascript
const heading = document.getElementById("hTieuDe");

if (heading) {
    heading.style.fontFamily = "Arial, sans-serif";
}
```

---

### 2.5. Ví dụ đổi màu

HTML:

```html
<p id="text">Thiết lập style bằng ID</p>
<button id="blueButton">Xanh</button>
<button id="redButton">Đỏ</button>
```

JavaScript:

```javascript
const text = document.querySelector("#text");
const blueButton = document.querySelector("#blueButton");
const redButton = document.querySelector("#redButton");

blueButton.addEventListener("click", () => {
    text.style.color = "blue";
});

redButton.addEventListener("click", () => {
    text.style.color = "red";
});
```

Slide sử dụng inline `onclick`; `addEventListener()` giúp tách HTML và
JavaScript rõ ràng hơn.

---

### 2.6. Thay đổi style cho nhiều element

Slide dùng:

```javascript
var pAr = document.getElementsByTagName("p");
for (var i = 0; i < pAr.length; i++) {
    pAr[i].style.color = "blue";
}
```

Hiện đại:

```javascript
document.querySelectorAll("p").forEach((p) => {
    p.style.color = "blue";
});
```

---

### 2.7. Ưu tiên class khi có nhiều style

CSS:

```css
.highlight {
    color: blue;
    font-weight: bold;
    background-color: lightyellow;
}
```

JavaScript:

```javascript
document.querySelectorAll("p").forEach((p) => {
    p.classList.add("highlight");
});
```

Lợi ích:

```text
CSS quản lý giao diện
JavaScript quản lý hành vi
Dễ sửa giao diện
Ít code JavaScript
```

---

### 2.8. `classList`

```javascript
element.classList.add("active");
element.classList.remove("active");
element.classList.toggle("active");
element.classList.contains("active");
```

Ví dụ:

```javascript
button.addEventListener("click", () => {
    box.classList.toggle("active");
});
```

---


## 3. Image Rollover

### 3.1. Image Rollover là gì?

Image Rollover là hiệu ứng thay đổi hình ảnh khi con trỏ đi vào/ra vùng
ảnh.

```text
Ảnh A
 ↓ mouse enter
Ảnh B
 ↓ mouse leave
Ảnh A
```

Slide dùng `onmouseover` và `onmouseout`.

---

### 3.2. Cách cũ trong slide

```html
<img
    name="img_hoa"
    src="hoaout.jpg"
    onmouseover="onMouseOverEvent()"
    onmouseout="onMouseOutEvent()"
>
```

```javascript
function onMouseOverEvent() {
    document.img_hoa.src = "hoaover.jpg";
}

function onMouseOutEvent() {
    document.img_hoa.src = "hoaout.jpg";
}
```

Cách này dựa vào named property của `document`; không nên dùng trong
code mới.

---

### 3.3. Cách hiện đại

```html
<img id="flower" src="hoaout.jpg" alt="Hoa sen">
```

```javascript
const flower = document.querySelector("#flower");

flower.addEventListener("mouseenter", () => {
    flower.src = "hoaover.jpg";
});

flower.addEventListener("mouseleave", () => {
    flower.src = "hoaout.jpg";
});
```

---

### 3.4. Chọn mouse event phù hợp

```text
mouseover / mouseout
→ có bubbling
→ có thể kích hoạt khi di chuyển giữa descendants

mouseenter / mouseleave
→ không bubble theo cách tương tự
→ thường tiện cho rollover đơn giản
```

Có thể dùng `pointerenter`/`pointerleave` nếu muốn hỗ trợ nhiều loại
thiết bị trỏ hơn.

---


## 4. Preload ảnh

### 4.1. Vì sao cần preload?

Nếu ảnh hover chưa được tải, lần hover đầu tiên có thể có độ trễ.

Slide giải quyết bằng cách tạo trước `Image` object:

```javascript
const hoverImage = new Image();
hoverImage.src = "hoaover.jpg";
```

Browser có thể tải/cache tài nguyên trước khi cần hiển thị.

---

### 4.2. Preload hai ảnh

```javascript
const normalImage = new Image();
const hoverImage = new Image();

normalImage.src = "hoaout.jpg";
hoverImage.src = "hoaover.jpg";
```

Sau đó:

```javascript
flower.addEventListener("mouseenter", () => {
    flower.src = hoverImage.src;
});

flower.addEventListener("mouseleave", () => {
    flower.src = normalImage.src;
});
```

---

### 4.3. Thời điểm preload

Slide đặt preload trong `body onload`.

Nếu URL ảnh đã biết, có thể khởi tạo preload ngay trong script:

```javascript
const image = new Image();
image.src = "hoaover.jpg";
```

Nếu script cần truy cập DOM, dùng `defer` hoặc `DOMContentLoaded` như
Bài 5.

---

### 4.4. Giới hạn của preload

Slide nói preload không làm chậm load trang. Cần hiểu chính xác hơn:
preload ảnh vẫn dùng network/bandwidth và có thể cạnh tranh với tài
nguyên quan trọng.

Chỉ preload tài nguyên có khả năng sắp được dùng.

---


## 5. Xây dựng Slideshow

### 5.1. Slideshow là gì?

Slideshow hiển thị lần lượt các ảnh, mỗi ảnh thay thế ảnh trước.

Có thể có:

```text
Previous
Next
Play
Stop
Indicators
Caption
```

---

### 5.2. Mô hình dữ liệu

```javascript
const images = [
    "anh0.jpg",
    "anh1.jpg",
    "anh2.jpg",
    "anh3.jpg",
    "anh4.jpg"
];

let currentIndex = 0;
```

---

### 5.3. Hiển thị ảnh hiện tại

```javascript
const slide = document.querySelector("#slide");

function showCurrentImage() {
    slide.src = images[currentIndex];
}
```

---

### 5.4. Nút Next

Slide giới hạn index bằng `if`. Một cách linh hoạt hơn là quay vòng:

```javascript
function next() {
    currentIndex = (currentIndex + 1) % images.length;
    showCurrentImage();
}
```

Khi đang ở ảnh cuối, Next quay về ảnh đầu.

---

### 5.5. Nút Previous

```javascript
function previous() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showCurrentImage();
}
```

---

### 5.6. Kết nối HTML và JavaScript

```html
<img id="slide" src="anh0.jpg" alt="Ảnh slideshow">

<button id="previousButton" type="button">Previous</button>
<button id="nextButton" type="button">Next</button>
```

```javascript
const previousButton = document.querySelector("#previousButton");
const nextButton = document.querySelector("#nextButton");

previousButton.addEventListener("click", previous);
nextButton.addEventListener("click", next);
```

---

### 5.7. Preload slideshow

```javascript
images.forEach((src) => {
    const image = new Image();
    image.src = src;
});
```

Với rất nhiều ảnh lớn, không nhất thiết preload toàn bộ.

---

## 6. Slideshow tự động

### 6.1. Play và Stop

```javascript
let timerId = null;

function play() {
    if (timerId !== null) {
        return;
    }

    timerId = setInterval(next, 3000);
}

function stop() {
    clearInterval(timerId);
    timerId = null;
}
```

---

### 6.2. Tránh tạo nhiều interval

Nếu click Play nhiều lần mà không kiểm tra, nhiều timer chạy đồng thời.

```javascript
if (timerId === null) {
    timerId = setInterval(next, 3000);
}
```

---


## 7. HTML Image Map

### 7.1. Image Map là gì?

Bản đồ ảnh là một ảnh có nhiều vùng có thể tương tác riêng.

Slide nêu ví dụ:

```text
chọn khu vực/quốc gia
menu trực quan
chọn vùng trên bản đồ
```

HTML dùng:

```text
<img usemap>
<map>
<area>
```

---

### 7.2. `usemap`, `map`, `area`

```html
<img src="map.jpg" alt="Bản đồ" usemap="#worldMap">

<map name="worldMap">
    <area
        shape="rect"
        coords="0,0,200,200"
        href="asia.html"
        alt="Châu Á"
    >
</map>
```

`usemap="#worldMap"` liên kết ảnh với:

```html
<map name="worldMap">
```

---

### 7.3. `shape` và `coords`

Các shape phổ biến:

```text
rect   → hình chữ nhật
circle → hình tròn
poly   → đa giác
```

Ví dụ:

```html
<area shape="circle" coords="100,100,50" href="#" alt="Vùng tròn">
```

---

### 7.4. Image Map và responsive

Tọa độ `coords` là tọa độ pixel gắn với kích thước ảnh. Nếu ảnh resize
responsive, vùng click có thể không còn khớp.

Với giao diện hiện đại, cân nhắc SVG nếu cần bản đồ tương tác
responsive/phức tạp.

---


## 8. Ví dụ tổng hợp: Slideshow có Play/Stop

```javascript
const images = [
    "anh0.jpg",
    "anh1.jpg",
    "anh2.jpg",
    "anh3.jpg",
    "anh4.jpg"
];

const slide = document.querySelector("#slide");
let currentIndex = 0;
let timerId = null;

function showImage() {
    slide.src = images[currentIndex];
    slide.alt = `Ảnh ${currentIndex + 1}`;
}

function next() {
    currentIndex = (currentIndex + 1) % images.length;
    showImage();
}

function previous() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage();
}

function play() {
    if (timerId === null) {
        timerId = setInterval(next, 3000);
    }
}

function stop() {
    if (timerId !== null) {
        clearInterval(timerId);
        timerId = null;
    }
}
```

Luồng xử lý:

```text
Array URL ảnh
      ↓
currentIndex
      ↓
showImage()
   ↙      ↘
Previous  Next
      ↓
Play → setInterval()
Stop → clearInterval()
```

---

## 9. Lỗi thường gặp

### Sai camelCase của CSS property

Sai:

```javascript
element.style.background-color = "red";
```

Đúng:

```javascript
element.style.backgroundColor = "red";
```

### Dùng inline event khi không cần

Ưu tiên:

```javascript
button.addEventListener("click", handler);
```

thay vì đặt `onclick` trực tiếp trong HTML.

### Dùng `document.img_hoa`

Không nên phụ thuộc named property:

```javascript
document.img_hoa.src = "hoaover.jpg";
```

Nên tìm element rõ ràng:

```javascript
const flower = document.querySelector("#flower");
```

### Tạo nhiều interval cùng lúc

Luôn lưu `timerId` và kiểm tra trước khi gọi `setInterval()` lần nữa.

### Button điều khiển nằm trong form

Nếu button chỉ điều khiển slideshow:

```html
<button type="button">Next</button>
```

để tránh submit form ngoài ý muốn.

---

## 10. Bài tập

### Bài 1. Đổi style

Tạo đoạn văn và ba button: **Đỏ**, **Xanh**, **Reset**. Không dùng inline `onclick`.

### Bài 2. Toggle class

Click button để bật/tắt class `highlight` cho tất cả `<p>` bằng:

```javascript
querySelectorAll()
classList.toggle()
```

### Bài 3. Rollover

Dùng hai ảnh `normal.jpg` và `hover.jpg`. Hover đổi ảnh, rời chuột trở về ảnh cũ. Preload ảnh hover.

### Bài 4. Slideshow

Cho 5 ảnh. Tạo Previous/Next và cho phép quay vòng.

### Bài 5. Autoplay

Mở rộng slideshow với Play/Stop. Ảnh đổi sau mỗi 3 giây và không tạo nhiều interval đồng thời.

### Bài 6. Image Map

Tạo một image map đơn giản có ít nhất hai vùng click và giải thích ý nghĩa của `usemap`, `map`, `area`, `shape`, `coords`.

### Câu hỏi tự kiểm tra

1. JavaScript thay đổi inline style qua property nào?
2. `background-color` viết thế nào trong JavaScript?
3. Vì sao nên dùng `classList` khi thay đổi nhiều style?
4. Image Rollover là gì?
5. `mouseenter` và `mouseleave` dùng để làm gì?
6. Preload ảnh giải quyết vấn đề gì?
7. Preload có sử dụng network không?
8. Slideshow cần những trạng thái cơ bản nào?
9. Công thức nào giúp Next quay vòng?
10. Vì sao cần lưu timer ID?
11. `clearInterval()` dùng làm gì?
12. `usemap` liên kết ảnh với thành phần nào?
13. Vì sao image map pixel-based có thể khó responsive?

### Checklist kiến thức cần thuộc

- [ ] Biết `style` và camelCase CSS property.
- [ ] Biết `classList`.
- [ ] Tạo được Image Rollover.
- [ ] Biết preload bằng `new Image()`.
- [ ] Hiểu giới hạn của preload.
- [ ] Tạo được slideshow Previous/Next.
- [ ] Biết `setInterval()` và `clearInterval()`.
- [ ] Biết tránh nhiều interval.
- [ ] Hiểu `usemap`, `map`, `area`.
- [ ] Nhận biết cách viết event hiện đại.

---

## 11. Tổng kết

```text
JavaScript + CSS
├── style
└── classList
      ↓
Image Rollover
      ↓
Preload
      ↓
Slideshow
├── Previous / Next
└── Play / Stop
      ↓
Image Map
```

Bài tiếp theo chuyển từ **hiệu ứng giao diện** sang **Form Controls, thu thập dữ liệu và Validation**.
