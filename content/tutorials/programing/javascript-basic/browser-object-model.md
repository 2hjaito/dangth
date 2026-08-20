# Bài 6. Browser Object Model (BOM)

> Bài học này nối tiếp **Bài 5: Object và lập trình hướng đối tượng trong JavaScript**. Ở bài trước, chúng ta tự tạo object. Trong bài này, chúng ta làm việc với các object/API do môi trường trình duyệt cung cấp.

## 1. Mục tiêu bài học

Sau bài này, bạn cần:

- Hiểu Browser Object Model (BOM).
- Phân biệt BOM với DOM.
- Hiểu vai trò của `window`.
- Sử dụng được `screen`, `navigator`, `location` và `history`.
- Phân biệt `screen.width` với `window.innerWidth`.
- Biết điều hướng bằng `location.assign()`, `location.replace()` và `location.reload()`.
- Biết sử dụng `history.back()`, `history.forward()` và `history.go()`.
- Hiểu giới hạn của popup, frame và một số API trình duyệt.
- Nhận biết các API legacy trong slide.
- Ưu tiên feature detection và Web Standards khi viết code hiện đại.

---

## 2. Tổng quan về BOM

### 2.1. BOM là gì?

**Browser Object Model (BOM)** là tập các API/đối tượng do môi trường
trình duyệt cung cấp để JavaScript tương tác với trình duyệt ngoài nội
dung DOM của trang.

Mô hình đơn giản theo slide:

```text
window
├── document
├── frames
├── history
├── location
├── navigator
└── screen
```

Lưu ý: đây là sơ đồ khái niệm để học. Không nên hiểu rằng mọi quan hệ
API của nền tảng Web đều là một cây object đơn giản đúng tuyệt đối.

---

### 2.2. BOM và DOM

Dễ nhầm:

```text
BOM → môi trường/cửa sổ trình duyệt
DOM → nội dung tài liệu HTML
```

Ví dụ BOM:

```javascript
window.innerWidth;
location.href;
history.back();
navigator.userAgent;
screen.width;
```

Ví dụ DOM:

```javascript
document.querySelector("#title");
document.createElement("div");
```

`document` được truy cập từ `window.document` trong trình duyệt, nhưng
DOM và BOM là hai nhóm khái niệm khác nhau.

---


## 3. Đối tượng `window`

### 3.1. `window` là gì?

Trong browser script truyền thống, `window` đại diện cho browsing
context/cửa sổ hiện tại và là global object của môi trường trang.

Ví dụ:

```javascript
window.alert("Hello");
```

Thường có thể viết:

```javascript
alert("Hello");
```

Tương tự:

```javascript
window.confirm("Tiếp tục?");
confirm("Tiếp tục?");
```

---

### 3.2. Thuộc tính `window`

Các thuộc tính hữu ích:

```javascript
window.innerWidth;
window.innerHeight;
window.document;
window.location;
window.history;
window.navigator;
```

Ví dụ:

```javascript
console.log(window.innerWidth);
console.log(window.innerHeight);
```

Các thuộc tính cũ như `window.status`/`defaultStatus` không còn nên được
dùng để xây dựng chức năng giao diện hiện đại vì trình duyệt có thể bỏ
qua hoặc hạn chế chúng.

---

### 3.3. Phương thức `window`

```javascript
window.alert();
window.confirm();
window.prompt();
window.open();
window.close();
window.print();
window.focus();
window.blur();
```

Ngoài ra còn có timer:

```javascript
setTimeout();
setInterval();
```

đã học ở Bài 3.

---

### 3.4. `window.open()`

Cú pháp:

```javascript
const newWindow = window.open(url, target, features);
```

Ví dụ:

```javascript
const newWindow = window.open(
    "https://example.com",
    "exampleWindow",
    "width=800,height=600"
);
```

Trình duyệt hiện đại có cơ chế chặn popup. `window.open()` thường đáng
tin cậy hơn khi được gọi trực tiếp từ thao tác người dùng như click.

Nếu mục đích chỉ là liên kết sang trang khác, thường dùng HTML:

```html
<a href="https://example.com" target="_blank" rel="noopener">
    Mở trang
</a>
```

---

### 3.5. `window.close()`

```javascript
const popup = window.open("https://example.com");

// Sau đó, nếu có quyền kiểm soát cửa sổ đó:
popup?.close();
```

Trình duyệt thường giới hạn việc script đóng những tab/cửa sổ không do
script mở.

---

### 3.6. `moveTo()` và `resizeTo()`

Slide giới thiệu:

```javascript
window.moveTo(x, y);
window.resizeTo(width, height);
```

Các API này hiện bị hạn chế mạnh trong nhiều browser/tab thông thường và
không nên dùng làm nền tảng cho layout responsive.

Responsive layout nên dùng CSS:

```css
.container {
    width: min(100%, 1200px);
}
```

---


## 4. Đối tượng `screen`

### 4.1. Thông tin màn hình

Cung cấp thông tin về màn hình:

```javascript
screen.width;
screen.height;
screen.availWidth;
screen.availHeight;
screen.colorDepth;
screen.pixelDepth;
```

Ví dụ:

```javascript
console.log(`Width: ${screen.width}`);
console.log(`Height: ${screen.height}`);
console.log(`Available: ${screen.availWidth} x ${screen.availHeight}`);
```

### Sửa lỗi trong slide

Slide ghi `with`; thuộc tính đúng là:

```javascript
screen.width
```

---

### 4.2. `screen` và responsive design

Không nên chọn layout chỉ bằng:

```javascript
if (screen.width < 600) {
    // ...
}
```

Đối với giao diện, CSS media query phù hợp hơn:

```css
@media (max-width: 600px) {
    /* mobile layout */
}
```

`screen.width` mô tả màn hình, không nhất thiết là kích thước viewport
hiện tại.

---


## 5. Đối tượng `navigator`

### 5.1. Thông tin môi trường trình duyệt

`navigator` cung cấp thông tin và API liên quan tới môi trường trình
duyệt.

Một số property/API:

```javascript
navigator.language;
navigator.languages;
navigator.cookieEnabled;
navigator.onLine;
navigator.userAgent;
navigator.platform;
```

Ví dụ:

```javascript
console.log(navigator.language);
console.log(navigator.cookieEnabled);
console.log(navigator.onLine);
```

---

### 5.2. Feature detection thay cho browser detection

Slide dùng các thuộc tính lịch sử như:

```javascript
navigator.appCodeName;
navigator.appName;
navigator.appVersion;
```

Các thuộc tính này tồn tại chủ yếu vì tương thích cũ và không đáng tin
để xác định browser hiện đại.

Thay vì hỏi:

```text
Người dùng đang dùng Chrome hay Firefox?
```

thường nên hỏi:

```text
Browser có hỗ trợ tính năng mình cần không?
```

Ví dụ feature detection:

```javascript
if ("geolocation" in navigator) {
    console.log("Có hỗ trợ Geolocation API");
}
```

---

### 5.3. API lịch sử `javaEnabled()`

Slide giới thiệu:

```javascript
navigator.javaEnabled();
```

Đây là API lịch sử gắn với Java applet. Java applet đã không còn là công
nghệ web thực tế trong browser hiện đại, nên không nên xây dựng ứng dụng
mới dựa trên API này.

---


## 6. Đối tượng `location`

### 6.1. Cấu trúc URL

`location` mô tả URL hiện tại.

Một số thuộc tính:

```javascript
location.href;
location.protocol;
location.host;
location.hostname;
location.port;
location.pathname;
location.search;
location.hash;
```

Ví dụ URL:

```text
https://example.com:8080/products?id=10#detail
```

Ta có thể hình dung:

```text
protocol → https:
host     → example.com:8080
hostname → example.com
port     → 8080
pathname → /products
search   → ?id=10
hash     → #detail
```

---

### 6.2. Xem URL hiện tại

```javascript
console.log(location.href);
console.log(location.hostname);
console.log(location.pathname);
```

Không cần `document.write()` như ví dụ cũ trong slide. Khi debug, dùng
`console.log()`.

---

### 6.3. Điều hướng với `assign()` và `href`

```javascript
location.assign("https://example.com");
```

Hoặc:

```javascript
location.href = "https://example.com";
```

`assign()` tạo navigation và thông thường cho phép quay lại bằng
history.

---

### 6.4. `location.replace()`

```javascript
location.replace("https://example.com");
```

Khác với `assign()`, `replace()` thay entry hiện tại trong session
history, nên người dùng thường không quay lại entry cũ bằng nút Back.

---

### 6.5. Reload trang

```javascript
location.reload();
```

Dùng khi thực sự cần tải lại document hiện tại.

---


## 7. Đối tượng `history`

### 7.1. Session history

`history` cho phép tương tác với session history của tab/frame hiện tại.

```javascript
history.length;
history.back();
history.forward();
history.go();
```

---

### 7.2. Back và Forward

```javascript
history.back();
```

Tương đương ý tưởng nhấn nút Back.

```javascript
history.forward();
```

Đi tới entry tiếp theo nếu có.

---

### 7.3. `history.go()`

```javascript
history.go(-1); // lùi 1
history.go(1);  // tiến 1
history.go(-2); // lùi 2
```

Không nên hiểu `history` là danh sách URL mà JavaScript có thể đọc tự
do. Vì lý do riêng tư/bảo mật, script không được lấy toàn bộ URL trong
lịch sử duyệt web của người dùng.

---

### 7.4. Ví dụ Back/Forward

```html
<button id="backButton">Back</button>
<button id="forwardButton">Forward</button>

<script>
    document.querySelector("#backButton")
        .addEventListener("click", () => history.back());

    document.querySelector("#forwardButton")
        .addEventListener("click", () => history.forward());
</script>
```

So với slide, ví dụ này tránh inline `onclick`.

---


## 8. `document`, `frames` và mối liên hệ với DOM

### 8.1. `window.document`

```javascript
window.document === document;
```

`document` đại diện cho tài liệu HTML hiện tại và là điểm vào chính của
DOM.

Ví dụ:

```javascript
const title = document.querySelector("h1");
title.textContent = "Hello";
```

DOM sẽ được học/ứng dụng sâu hơn khi thao tác nội dung HTML.

---

### 8.2. `frames`

Trong trang có frame/iframe, `window.frames` cung cấp truy cập tới các
browsing context con:

```javascript
console.log(window.frames.length);
```

Tuy nhiên, **same-origin policy** hạn chế việc đọc/thao tác nội dung
frame từ origin khác.

---


## 9. Thực hành hiện đại và API legacy

### 9.1. Không dùng `document.write()` để render ứng dụng

Slide có ví dụ:

```javascript
document.write(location.href);
```

Nên dùng:

```javascript
console.log(location.href);
```

hoặc DOM:

```javascript
document.querySelector("#url").textContent = location.href;
```

---

### 9.2. Browser sniffing → feature detection

Không nên dựa vào:

```javascript
navigator.appName
```

để quyết định code.

Ưu tiên:

```javascript
if ("someFeature" in someObject) {
    // dùng feature
}
```

---

### 9.3. API BOM cũ có thể bị giới hạn

Những nội dung như:

```text
defaultStatus
status
moveTo
resizeTo
javaEnabled
```

cần được xem trong bối cảnh lịch sử của slide. Browser hiện đại có thể
bỏ qua, hạn chế hoặc coi chúng là legacy.

---

### 9.4. Popup có thể bị chặn

Không nên giả định:

```javascript
window.open(...)
```

luôn thành công.

Có thể kiểm tra:

```javascript
const popup = window.open("https://example.com");

if (popup === null) {
    console.log("Popup có thể đã bị chặn");
}
```

---


## 10. Ví dụ tổng hợp

### 10.1. Hiển thị thông tin BOM

```html
<ul id="browserInfo"></ul>

<script>
    const info = [
        `Viewport: ${window.innerWidth} x ${window.innerHeight}`,
        `Screen: ${screen.width} x ${screen.height}`,
        `Language: ${navigator.language}`,
        `Cookies enabled: ${navigator.cookieEnabled}`,
        `URL: ${location.href}`,
        `History length: ${history.length}`
    ];

    const list = document.querySelector("#browserInfo");

    for (const text of info) {
        const item = document.createElement("li");
        item.textContent = text;
        list.append(item);
    }
</script>
```

Ví dụ kết hợp:

```text
Object / Array
DOM
window
screen
navigator
location
history
```

---

### 10.2. Điều hướng có xác nhận

```html
<button id="docsButton">Mở tài liệu</button>

<script>
    document.querySelector("#docsButton")
        .addEventListener("click", () => {
            const ok = confirm("Bạn muốn chuyển trang?");

            if (ok) {
                location.assign("https://example.com");
            }
        });
</script>
```

---


## 11. Lỗi thường gặp

### 11.1. Nhầm `screen.width` và `window.innerWidth`

```text
screen.width      → chiều rộng màn hình
window.innerWidth → chiều rộng viewport của cửa sổ/tab
```

Responsive UI thường quan tâm viewport hơn.

---

### 11.2. Nhầm `location` với `history`

```text
location → URL/document hiện tại và điều hướng
history  → di chuyển trong session history
```

---

### 11.3. Nhầm BOM với DOM

```text
window.location → BOM/Web platform environment
window.screen   → BOM
window.history  → BOM

document.querySelector() → DOM
document.createElement()  → DOM
```

---

### 11.4. Dựa vào thông tin browser quá mức

Không nên viết logic kiểu:

```javascript
if (navigator.appName === "...") {
    // browser A
} else {
    // browser B
}
```

Ưu tiên feature detection và standards-based APIs.

---


## 12. Ghi nhớ nhanh

```javascript
window.innerWidth;
screen.width;
navigator.language;
location.href;
history.back();
```

---

## 13. Bài tập

### Bài 1. Thông tin màn hình

Hiển thị lên HTML:

```text
screen.width
screen.height
screen.availWidth
screen.availHeight
window.innerWidth
window.innerHeight
```

Sau đó giải thích sự khác nhau giữa screen và viewport.

### Bài 2. Thông tin trình duyệt

Hiển thị:

```text
navigator.language
navigator.cookieEnabled
navigator.onLine
```

### Bài 3. Thông tin URL

Hiển thị:

```text
href
protocol
hostname
pathname
search
hash
```

của trang hiện tại.

### Bài 4. Back/Forward

Tạo hai button **Back** và **Forward**, gắn sự kiện bằng `addEventListener()` và sử dụng `history.back()` / `history.forward()`.

### Bài 5. Popup

Tạo button mở trang bằng `window.open()`. Kiểm tra `popup === null` để nhận biết khả năng popup bị chặn.

### Bài 6. Phân biệt BOM và DOM

Phân loại:

```text
location.href
screen.width
document.querySelector
history.back
navigator.language
document.createElement
window.innerHeight
```

vào hai nhóm:

```text
BOM / môi trường trình duyệt
DOM
```

### Câu hỏi tự kiểm tra

1. BOM là gì?
2. BOM và DOM khác nhau thế nào?
3. `window` đại diện cho gì?
4. `window.innerWidth` và `screen.width` khác nhau thế nào?
5. `navigator` cung cấp loại thông tin nào?
6. Vì sao không nên dựa vào `navigator.appName`?
7. `location.href` là gì?
8. `location.assign()` và `location.replace()` khác nhau ở điểm nào?
9. `location.reload()` dùng làm gì?
10. `history.back()` và `history.forward()` làm gì?
11. `history.go(-2)` có ý nghĩa gì?
12. Vì sao JavaScript không thể đọc tự do toàn bộ URL trong lịch sử duyệt web?
13. Vì sao `window.open()` có thể không mở được popup?
14. Feature detection là gì?
15. Vì sao `screen.width` không nên được dùng thay CSS media query?

### Checklist kiến thức cần thuộc

- [ ] Hiểu BOM và DOM.
- [ ] Biết `window`.
- [ ] Biết `screen`.
- [ ] Biết `navigator`.
- [ ] Biết `location`.
- [ ] Biết `history`.
- [ ] Phân biệt screen và viewport.
- [ ] Biết điều hướng và reload.
- [ ] Biết Back/Forward/Go.
- [ ] Biết popup có thể bị chặn.
- [ ] Hiểu feature detection.
- [ ] Nhận biết API legacy.

---

## 14. Tổng kết

```text
window
├── document  → DOM
├── frames
├── history   → lịch sử phiên
├── location  → URL và điều hướng
├── navigator → môi trường trình duyệt
└── screen    → thông tin màn hình
```

Mạch kiến thức:

```text
Object do lập trình viên tạo
          ↓
Object/API có sẵn của Browser
          ↓
window
          ↓
screen / navigator / location / history
          ↓
Tương tác với môi trường trình duyệt
```

Sau bài này, người học đã phân biệt được **đối tượng JavaScript**, **BOM** và **DOM**, tạo nền tảng cho bài học thao tác sâu với Document Object Model.
