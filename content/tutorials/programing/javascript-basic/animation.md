# Bài 6. Tạo hiệu ứng và Validate Form

## 1. Mục tiêu bài học

Sau bài này, bạn cần:

- Biết truy cập và thay đổi style của element bằng JavaScript.
- Hiểu cách kết hợp JavaScript với CSS.
- Tạo hiệu ứng Image Rollover.
- Hiểu kỹ thuật preload ảnh.
- Tạo slideshow ảnh với Previous/Next và có thể mở rộng autoplay.
- Hiểu HTML image map (`map`, `area`, `usemap`).
- Phân biệt `id` và `name`.
- Thao tác với Select Box, Checkbox, Radio Button và Form.
- Hiểu sự kiện `submit` của form.
- Validate dữ liệu phía client.
- Hiểu vì sao validation phía server vẫn bắt buộc.
- Biết tận dụng HTML5 Constraint Validation (`required`, `minlength`,
    `pattern`, `type="email"`, ...).

---


## 2. Nhắc lại CSS

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

## 3. JavaScript có thể thay đổi CSS

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

## 4. CSS property có dấu `-` trong JavaScript

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

## 5. Thiết lập style bằng ID

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

## 6. Demo đổi màu

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

## 7. Thay đổi style cho nhiều element

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

## 8. Tốt hơn: thay class thay vì thay nhiều style

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

## 9. `classList`

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


## 10. Image Rollover là gì?

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

## 11. Cách cũ trong slide

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

## 12. Cách hiện đại

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

## 13. `mouseover` / `mouseout` và `mouseenter` / `mouseleave`

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


## 14. Vấn đề khi rollover

Nếu ảnh hover chưa được tải, lần hover đầu tiên có thể có độ trễ.

Slide giải quyết bằng cách tạo trước `Image` object:

```javascript
const hoverImage = new Image();
hoverImage.src = "hoaover.jpg";
```

Browser có thể tải/cache tài nguyên trước khi cần hiển thị.

---

## 15. Preload hai ảnh

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

## 16. Không cần chờ `window.onload` mới preload

Slide đặt preload trong `body onload`.

Nếu URL ảnh đã biết, có thể khởi tạo preload ngay trong script:

```javascript
const image = new Image();
image.src = "hoaover.jpg";
```

Nếu script cần truy cập DOM, dùng `defer` hoặc `DOMContentLoaded` như
Bài 5.

---

## 17. Preload không phải lúc nào cũng miễn phí

Slide nói preload không làm chậm load trang. Cần hiểu chính xác hơn:
preload ảnh vẫn dùng network/bandwidth và có thể cạnh tranh với tài
nguyên quan trọng.

Chỉ preload tài nguyên có khả năng sắp được dùng.

---


## 18. Slideshow là gì?

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

## 19. Mô hình dữ liệu cho slideshow

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

## 20. Hiển thị ảnh hiện tại

```javascript
const slide = document.querySelector("#slide");

function showCurrentImage() {
    slide.src = images[currentIndex];
}
```

---

## 21. Nút Next

Slide giới hạn index bằng `if`. Một cách linh hoạt hơn là quay vòng:

```javascript
function next() {
    currentIndex = (currentIndex + 1) % images.length;
    showCurrentImage();
}
```

Khi đang ở ảnh cuối, Next quay về ảnh đầu.

---

## 22. Nút Previous

```javascript
function previous() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showCurrentImage();
}
```

---

## 23. HTML slideshow

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

## 24. Preload slideshow

```javascript
images.forEach((src) => {
    const image = new Image();
    image.src = src;
});
```

Với rất nhiều ảnh lớn, không nhất thiết preload toàn bộ.

---

## 25. Autoplay slideshow

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

## 26. Cẩn thận khi gọi `setInterval()` nhiều lần

Nếu click Play nhiều lần mà không kiểm tra, nhiều timer chạy đồng thời.

```javascript
if (timerId === null) {
    timerId = setInterval(next, 3000);
}
```

---


## 27. Image Map là gì?

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

## 28. `usemap`, `map`, `area`

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

## 29. `shape` và `coords`

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

## 30. Lưu ý responsive với image map

Tọa độ `coords` là tọa độ pixel gắn với kích thước ảnh. Nếu ảnh resize
responsive, vùng click có thể không còn khớp.

Với giao diện hiện đại, cân nhắc SVG nếu cần bản đồ tương tác
responsive/phức tạp.

---


## 31. Các control trong bài

Slide tập trung vào:

```text
Select Box
Checkbox
Radio Button
Form
```

Ngoài ra HTML hiện đại còn có:

```text
text
email
password
number
date
file
range
color
textarea
button
...
```

---


## 32. `id`

`id` dùng để nhận diện duy nhất một element trong document.

```html
<input id="email">
```

```javascript
const email = document.getElementById("email");
```

Trong một document, không nên có nhiều element cùng `id`.

---

## 33. `name`

`name` đặc biệt quan trọng với form controls.

```html
<input type="checkbox" name="hobby" value="music">
<input type="checkbox" name="hobby" value="game">
```

Nhiều control có thể cùng `name`.

```javascript
const hobbies = document.getElementsByName("hobby");
```

---

## 34. Phân biệt `id` và `name`

```text
id
→ định danh element trong DOM
→ nên duy nhất
→ dùng selector #id

name
→ tên control khi form gửi dữ liệu
→ có thể lặp
→ dùng để tạo nhóm checkbox/radio
```

---

## 35. `getElementsByName()`

Slide gọi kết quả là "mảng". Chính xác hơn, method này trả về
`NodeList`, không phải JavaScript Array thực sự.

```javascript
const controls = document.getElementsByName("test");

for (const control of controls) {
    console.log(control.value);
}
```

---


## 36. Tạo Select

```html
<select id="country" name="country">
    <option value="vn">Việt Nam</option>
    <option value="uk">Anh</option>
    <option value="us">Mỹ</option>
</select>
```

---

## 37. Lấy giá trị đang chọn

```javascript
const country = document.querySelector("#country");
console.log(country.value);
```

Đây là Web Standard hiện đại, không còn là vấn đề riêng của Firefox như
slide cũ mô tả.

---

## 38. Thiết lập giá trị được chọn

```javascript
country.value = "us";
```

Điều kiện: phải có option có `value="us"`.

---

## 39. `selectedIndex`

```javascript
console.log(country.selectedIndex);
```

Lấy option:

```javascript
const selectedOption = country.options[country.selectedIndex];
console.log(selectedOption.value);
console.log(selectedOption.textContent);
```

---

## 40. Event `change`

Không cần button "Chọn quốc gia" nếu muốn phản ứng ngay khi lựa chọn
thay đổi:

```javascript
country.addEventListener("change", () => {
    console.log(country.value);
});
```

---


## 41. Checkbox có hai trạng thái

```html
<input type="checkbox" id="agree" name="agree">
```

```javascript
const agree = document.querySelector("#agree");
console.log(agree.checked);
```

```text
true  → được chọn
false → không được chọn
```

---

## 42. Thiết lập trạng thái checkbox

```javascript
agree.checked = true;
```

Bỏ chọn:

```javascript
agree.checked = false;
```

---

## 43. Lấy nhiều checkbox được chọn

HTML:

```html
<label><input type="checkbox" name="iceCream" value="que"> Kem que</label>
<label><input type="checkbox" name="iceCream" value="dau"> Kem dâu</label>
<label><input type="checkbox" name="iceCream" value="bo"> Kem bơ</label>
<label><input type="checkbox" name="iceCream" value="vani"> Kem vani</label>
```

JavaScript hiện đại:

```javascript
const selected = document.querySelectorAll(
    'input[name="iceCream"]:checked'
);

const values = Array.from(selected, (checkbox) => checkbox.value);
console.log(values);
```

---

## 44. Không cần nối HTML bằng `innerHTML`

Slide nối chuỗi `<br/>` rồi gán vào `innerHTML`.

Nếu dữ liệu chỉ là text:

```javascript
output.textContent = values.join(", ");
```

Nếu muốn danh sách HTML, nên tạo element:

```javascript
output.replaceChildren();

values.forEach((value) => {
    const item = document.createElement("li");
    item.textContent = value;
    output.append(item);
});
```

---


## 45. Radio hoạt động theo nhóm

Các radio cùng `name` thuộc cùng nhóm:

```html
<label><input type="radio" name="size" value="large"> Lớn</label>
<label><input type="radio" name="size" value="medium"> Vừa</label>
<label><input type="radio" name="size" value="small"> Nhỏ</label>
```

Browser chỉ cho một radio trong nhóm được chọn tại một thời điểm.

---

## 46. Lấy radio đang chọn

Thay vì loop thủ công:

```javascript
const selectedSize = document.querySelector(
    'input[name="size"]:checked'
);

if (selectedSize) {
    console.log(selectedSize.value);
}
```

Nếu chưa chọn radio nào, kết quả là `null`.

---

## 47. Thiết lập radio mặc định

HTML:

```html
<input type="radio" name="size" value="large" checked>
```

Hoặc JavaScript:

```javascript
const large = document.querySelector(
    'input[name="size"][value="large"]'
);

large.checked = true;
```

---


## 48. Form dùng để làm gì?

Form thu thập và gửi dữ liệu.

```html
<form action="/register" method="post">
    <!-- controls -->
    <button type="submit">Đăng ký</button>
</form>
```

Slide giới thiệu hai HTTP method phổ biến:

```text
GET
POST
```

---

## 49. GET và POST -- hiểu cơ bản

```text
GET
→ dữ liệu thường được encode vào URL/query string
→ phù hợp cho thao tác đọc/tìm kiếm

POST
→ dữ liệu được gửi trong request body
→ thường dùng khi tạo/gửi dữ liệu
```

Không được hiểu POST là tự động "bảo mật". Dữ liệu nhạy cảm vẫn cần
HTTPS và xử lý server an toàn.

---

## 50. Submit button

```html
<button type="submit">Gửi</button>
```

Khi form submit, browser phát event `submit` trên form.

Không chỉ click button mới có thể submit; ví dụ nhấn Enter trong một số
form cũng có thể kích hoạt submit.

---


## 51. `document.forms`

Slide giới thiệu:

```javascript
document.forms[0];
document.forms["formName"];
```

Cách này vẫn tồn tại.

---

## 52. Nên dùng selector rõ ràng

```html
<form id="registerForm">
```

```javascript
const form = document.querySelector("#registerForm");
```

Cách này rõ ràng và nhất quán với DOM code khác.

---

## 53. `form.elements`

```html
<form id="registerForm">
    <input name="username">
    <input name="email">
</form>
```

```javascript
const form = document.querySelector("#registerForm");

console.log(form.elements.username.value);
console.log(form.elements.email.value);
```

---

## 54. `FormData`

Cách hiện đại để thu thập dữ liệu form:

```javascript
const data = new FormData(form);

console.log(data.get("username"));
console.log(data.get("email"));
```

Nhiều giá trị cùng name:

```javascript
console.log(data.getAll("hobby"));
```

---


## 55. Validation là gì?

Validation kiểm tra:

```text
Thông tin bắt buộc đã được nhập chưa?
Dữ liệu có đúng định dạng không?
Giá trị có nằm trong phạm vi hợp lệ không?
Các trường có phù hợp với nhau không?
```

Ví dụ:

```text
Tên không rỗng
Email đúng định dạng
Tuổi >= 18
Password đủ dài
Confirm password khớp password
```

---

## 56. Client-side và server-side validation

### Client-side

Chạy trên browser.

Ưu điểm:

```text
Phản hồi nhanh
UX tốt
Giảm request không cần thiết
```

### Server-side

Chạy trên server.

```text
BẮT BUỘC
```

Client-side validation có thể bị bỏ qua hoặc sửa bởi người dùng. Server
không được tin dữ liệu từ client.

---

## 57. Event `submit`

Slide dùng:

```html
<form onsubmit="return validateForm()">
```

Trong đó:

```text
return true  → cho submit tiếp
return false → ngăn submit
```

Cách này vẫn hoạt động nhưng là inline event handler.

---

## 58. Cách hiện đại: `addEventListener("submit")`

```javascript
const form = document.querySelector("#registerForm");

form.addEventListener("submit", (event) => {
    if (!isValid()) {
        event.preventDefault();
    }
});
```

`event.preventDefault()` ngăn hành vi submit mặc định.

---

## 59. Validate tên không rỗng

```html
<form id="registerForm">
    <label>
        Tên
        <input id="name" name="name">
    </label>

    <button type="submit">Submit</button>
</form>

<p id="error" role="alert"></p>
```

```javascript
const form = document.querySelector("#registerForm");
const nameInput = document.querySelector("#name");
const error = document.querySelector("#error");

form.addEventListener("submit", (event) => {
    const name = nameInput.value.trim();

    if (!name) {
        event.preventDefault();
        error.textContent = "Hãy nhập tên.";
        nameInput.focus();
        return;
    }

    error.textContent = "";
});
```

---


## 60. `required`

Không phải mọi validation đều cần tự viết JavaScript.

```html
<input name="name" required>
```

Browser sẽ kiểm tra trường bắt buộc.

---

## 61. `type="email"`

```html
<input type="email" name="email" required>
```

Browser kiểm tra cấu trúc email cơ bản.

---

## 62. `minlength` / `maxlength`

```html
<input
    type="password"
    name="password"
    minlength="8"
    maxlength="100"
    required
>
```

---

## 63. `min`, `max`, `step`

```html
<input
    type="number"
    name="age"
    min="18"
    max="120"
    required
>
```

---

## 64. `pattern`

```html
<input
    name="studentCode"
    pattern="PS[0-9]{5}"
    title="Mã sinh viên phải có dạng PS12345"
>
```

`pattern` dùng regular expression theo quy tắc của HTML.

---

## 65. Constraint Validation API

```javascript
const form = document.querySelector("#registerForm");

console.log(form.checkValidity());
```

Nếu muốn browser hiển thị validation UI:

```javascript
form.reportValidity();
```

---

## 66. `setCustomValidity()`

Ví dụ password confirmation:

```javascript
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirmPassword");

function validatePasswordMatch() {
    if (confirmPassword.value !== password.value) {
        confirmPassword.setCustomValidity("Mật khẩu không khớp.");
    } else {
        confirmPassword.setCustomValidity("");
    }
}

password.addEventListener("input", validatePasswordMatch);
confirmPassword.addEventListener("input", validatePasswordMatch);
```

---


## 67. Form đăng ký

```html
<form id="registerForm">
    <label>
        Họ tên
        <input id="fullName" name="fullName" required>
    </label>

    <label>
        Email
        <input id="email" type="email" name="email" required>
    </label>

    <label>
        Tuổi
        <input id="age" type="number" name="age" min="18" required>
    </label>

    <button type="submit">Đăng ký</button>
</form>
```

JavaScript chỉ thêm rule nghiệp vụ khi cần:

```javascript
const form = document.querySelector("#registerForm");
const fullName = document.querySelector("#fullName");

form.addEventListener("submit", (event) => {
    if (fullName.value.trim().length < 2) {
        event.preventDefault();
        fullName.setCustomValidity("Họ tên phải có ít nhất 2 ký tự.");
        fullName.reportValidity();
        return;
    }

    fullName.setCustomValidity("");
});

fullName.addEventListener("input", () => {
    fullName.setCustomValidity("");
});
```

---

## 68. Không dùng `alert()` cho mọi lỗi

Slide sử dụng `alert()`.

Với form hiện đại, thường nên hiển thị lỗi gần input:

```html
<p id="emailError" class="error" role="alert"></p>
```

```javascript
emailError.textContent = "Email không hợp lệ.";
```

UX tốt hơn vì người dùng nhìn thấy lỗi trong ngữ cảnh.

---

## 69. `trim()` rất quan trọng

```javascript
if (nameInput.value === "") {
```

không bắt được chuỗi chỉ có khoảng trắng.

Nên:

```javascript
if (nameInput.value.trim() === "") {
```

---


## 70. Checkbox bắt buộc đồng ý

```html
<label>
    <input id="terms" type="checkbox" required>
    Tôi đồng ý điều khoản
</label>
```

Hoặc JS:

```javascript
if (!terms.checked) {
    // chưa đồng ý
}
```

---

## 71. Bắt buộc chọn ít nhất một checkbox

```javascript
const selectedHobbies = document.querySelectorAll(
    'input[name="hobby"]:checked'
);

if (selectedHobbies.length === 0) {
    console.log("Hãy chọn ít nhất một sở thích");
}
```

---

## 72. Radio bắt buộc

HTML có thể dùng `required` trên một radio trong group:

```html
<label><input type="radio" name="gender" value="male" required> Nam</label>
<label><input type="radio" name="gender" value="female"> Nữ</label>
```

JS:

```javascript
const gender = document.querySelector(
    'input[name="gender"]:checked'
);

if (!gender) {
    console.log("Chưa chọn giới tính");
}
```

---

## 73. Select bắt buộc

```html
<select id="province" name="province" required>
    <option value="">-- Chọn tỉnh/thành --</option>
    <option value="hn">Hà Nội</option>
    <option value="hcm">TP.HCM</option>
</select>
```

Nếu người dùng chưa chọn:

```javascript
province.value === ""
```

---


## 74. `var` → `const` / `let`

Slide:

```javascript
var name = document.getElementById("country").value;
```

Hiện đại:

```javascript
const name = document.querySelector("#country").value;
```

Dùng `let` nếu biến cần gán lại.

---

## 75. Inline event → `addEventListener()`

Slide:

```html
<button onclick="chonKem()">Chọn kem</button>
```

Hiện đại:

```javascript
button.addEventListener("click", chonKem);
```

---

## 76. `document.img_hoa` → selector

Không nên:

```javascript
document.img_hoa.src = "hoaover.jpg";
```

Nên:

```javascript
const flower = document.querySelector("#flower");
flower.src = "hoaover.jpg";
```

---

## 77. Không viết code riêng IE/Firefox

Slide có các bài tập phân biệt Internet Explorer và Firefox.

Hiện nay nên:

```text
Dùng Web Standards
Feature detection khi cần
Kiểm tra browser support cho API mới
Không browser sniffing nếu không thật sự cần
```

---

## 78. `getElementsByName()` không trả về Array

Slide gọi là "mảng". Chính xác:

```javascript
const controls = document.getElementsByName("test");
```

trả về `NodeList`.

Có thể chuyển thành Array:

```javascript
const array = Array.from(controls);
```

---

## 79. Client validation không phải security boundary

Không được tin rằng:

```text
Đã validate bằng JavaScript
→ dữ liệu chắc chắn an toàn
```

Người dùng có thể gửi HTTP request trực tiếp, sửa JavaScript hoặc bỏ qua
UI.

Server phải validate lại toàn bộ dữ liệu.

---

## 80. Không dùng POST như một cơ chế bảo mật

POST không tự mã hóa dữ liệu. HTTPS mới bảo vệ dữ liệu trên đường
truyền.

Server vẫn cần:

```text
validation
sanitization/escaping phù hợp ngữ cảnh
authentication
authorization
CSRF protection khi phù hợp
HTTPS
```

---


## 81. Form đặt kem

HTML:

```html
<form id="orderForm">
    <label>
        Tên khách hàng
        <input id="customerName" name="customerName" required>
    </label>

    <fieldset>
        <legend>Loại kem</legend>

        <label>
            <input type="checkbox" name="iceCream" value="Kem que">
            Kem que
        </label>

        <label>
            <input type="checkbox" name="iceCream" value="Kem dâu">
            Kem dâu
        </label>
    </fieldset>

    <fieldset>
        <legend>Kích thước</legend>

        <label>
            <input type="radio" name="size" value="Lớn" required>
            Lớn
        </label>

        <label>
            <input type="radio" name="size" value="Vừa">
            Vừa
        </label>

        <label>
            <input type="radio" name="size" value="Nhỏ">
            Nhỏ
        </label>
    </fieldset>

    <label>
        Quốc gia
        <select id="country" name="country" required>
            <option value="">-- Chọn --</option>
            <option value="Việt Nam">Việt Nam</option>
            <option value="Anh">Anh</option>
            <option value="Mỹ">Mỹ</option>
        </select>
    </label>

    <button type="submit">Đặt hàng</button>
</form>

<div id="result"></div>
```

JavaScript:

```javascript
const form = document.querySelector("#orderForm");
const result = document.querySelector("#result");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    const iceCreams = Array.from(
        document.querySelectorAll('input[name="iceCream"]:checked'),
        (item) => item.value
    );

    if (iceCreams.length === 0) {
        result.textContent = "Hãy chọn ít nhất một loại kem.";
        return;
    }

    const data = new FormData(form);

    const summary = document.createElement("p");
    summary.textContent =
        `Khách: ${data.get("customerName")} | ` +
        `Kem: ${iceCreams.join(", ")} | ` +
        `Size: ${data.get("size")} | ` +
        `Quốc gia: ${data.get("country")}`;

    result.replaceChildren(summary);
});
```

Ví dụ này kết hợp:

```text
Form
Select
Checkbox
Radio
Validation
FormData
DOM
Event
```

---


## 82. HTML

```html
<div class="slideshow">
    <img id="slide" src="anh0.jpg" alt="Ảnh 1">

    <div>
        <button id="previous" type="button">Previous</button>
        <button id="play" type="button">Play</button>
        <button id="stop" type="button">Stop</button>
        <button id="next" type="button">Next</button>
    </div>
</div>
```

## 83. JavaScript

```javascript
const images = [
    "anh0.jpg",
    "anh1.jpg",
    "anh2.jpg",
    "anh3.jpg",
    "anh4.jpg"
];

const slide = document.querySelector("#slide");
const previousButton = document.querySelector("#previous");
const playButton = document.querySelector("#play");
const stopButton = document.querySelector("#stop");
const nextButton = document.querySelector("#next");

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
    if (timerId !== null) {
        return;
    }

    timerId = setInterval(next, 3000);
}

function stop() {
    if (timerId === null) {
        return;
    }

    clearInterval(timerId);
    timerId = null;
}

previousButton.addEventListener("click", previous);
nextButton.addEventListener("click", next);
playButton.addEventListener("click", play);
stopButton.addEventListener("click", stop);

images.forEach((src) => {
    const image = new Image();
    image.src = src;
});
```

---


## 84. Sai camelCase của CSS property

Sai:

```javascript
element.style.background-color = "red";
```

Đúng:

```javascript
element.style.backgroundColor = "red";
```

---

## 85. Dùng `id` trùng nhau

Không nên:

```html
<input id="size">
<input id="size">
```

Dùng `name` cho group:

```html
<input type="radio" name="size">
<input type="radio" name="size">
```

---

## 86. Radio selector có thể trả `null`

```javascript
const size = document.querySelector('input[name="size"]:checked');
console.log(size.value);
```

Nếu chưa chọn → lỗi.

Đúng:

```javascript
if (size) {
    console.log(size.value);
}
```

---

## 87. Chỉ kiểm tra `value === ""`

```javascript
"   " !== ""
```

Nên:

```javascript
value.trim() === ""
```

---

## 88. Validate chỉ ở client

Sai tư duy:

```text
JavaScript đã validate → server khỏi kiểm tra
```

Đúng:

```text
Client validation → UX
Server validation → tính toàn vẹn và an toàn
```

---

## 89. Button trong form mặc định có thể submit

Trong form:

```html
<button>Next</button>
```

mặc định thường là submit button.

Nếu chỉ là button UI:

```html
<button type="button">Next</button>
```

---

## 90. Gọi `preventDefault()` quá sớm

Nếu ứng dụng thực sự muốn submit form lên server, không nên luôn gọi:

```javascript
event.preventDefault();
```

Chỉ ngăn submit khi validation thất bại hoặc khi chính JavaScript sẽ xử
lý request.

---


## Bài tập

### Bài 1. Đổi style

Tạo đoạn văn và ba button:

```text
Đỏ
Xanh
Reset
```

Không dùng inline `onclick`.

---

### Bài 2. Toggle class

Click một button để bật/tắt class `highlight` cho tất cả `<p>`.

Yêu cầu dùng:

```javascript
querySelectorAll()
classList.toggle()
```

---

### Bài 3. Rollover

Có hai ảnh:

```text
normal.jpg
hover.jpg
```

Hover thì đổi ảnh; rời chuột thì trở về. Preload ảnh hover.

---

### Bài 4. Slideshow

Cho 5 ảnh. Tạo:

```text
Previous
Next
```

Yêu cầu quay vòng từ ảnh cuối về ảnh đầu và ngược lại.

---

### Bài 5. Autoplay slideshow

Mở rộng bài 4:

```text
Play
Stop
```

Ảnh tự đổi sau mỗi 3 giây. Không cho tạo nhiều interval cùng lúc.

---

### Bài 6. Select

Tạo select tỉnh/thành. Khi `change`, hiển thị `value` và text của option
đang chọn.

---

### Bài 7. Checkbox

Danh sách 5 sở thích. Click `Xem kết quả` để hiển thị các sở thích được
chọn.

Không dùng `innerHTML` với dữ liệu người dùng.

---

### Bài 8. Radio

Tạo group lựa chọn phương thức thanh toán:

```text
Tiền mặt
Chuyển khoản
Thẻ
```

Hiển thị lựa chọn hiện tại.

---

### Bài 9. Validate đăng ký

Form gồm:

```text
Họ tên: required
Email: type=email, required
Tuổi: min=18
Password: minlength=8
Confirm Password: phải khớp
```

Ưu tiên HTML validation, JavaScript chỉ xử lý rule confirm password.

---

### Bài 10. Form đặt hàng tổng hợp

Form gồm:

```text
Tên khách hàng
Select sản phẩm
Checkbox topping
Radio size
Số lượng
Submit
```

Yêu cầu:

```text
Validate đầy đủ
Dùng FormData
Hiển thị summary bằng DOM
Không dùng inline event
Không dùng alert cho validation chính
```

---


### Câu hỏi tự kiểm tra

1. JavaScript thay đổi inline style của element qua property nào?
2.  `font-family` trong JavaScript viết thế nào?
3.  Vì sao thường nên dùng `classList` thay vì gán nhiều style trực
    tiếp?
4.  Image Rollover là gì?
5.  `mouseenter` và `mouseleave` dùng để làm gì?
6.  Preload ảnh giải quyết vấn đề gì?
7.  Preload có sử dụng network không?
8.  Slideshow cần những dữ liệu/trạng thái cơ bản nào?
9.  Công thức nào giúp Next quay vòng?
10. `setInterval()` dùng làm gì?
11. Vì sao phải lưu timer ID?
12. `usemap` liên kết với element nào?
13. `area` dùng làm gì?
14. `id` và `name` khác nhau thế nào?
15. `getElementsByName()` trả về Array không?
16. Lấy value của `<select>` thế nào?
17. `selectedIndex` là gì?
18. Checkbox được chọn được xác định qua property nào?
19. Selector nào tìm các checkbox đang checked?
20. Vì sao radio cùng group phải có cùng `name`?
21. Selector nào lấy radio đang chọn?
22. Form dùng GET và POST để làm gì?
23. Event nào xảy ra khi form submit?
24. `preventDefault()` làm gì?
25. Client-side validation có thay thế server-side validation không?
26. `required` dùng làm gì?
27. `type="email"` hỗ trợ validation gì?
28. `minlength` dùng làm gì?
29. `checkValidity()` trả về gì?
30. `setCustomValidity()` dùng khi nào?
31. Vì sao nên dùng `trim()` khi kiểm tra chuỗi rỗng?
32. `FormData` có ích gì?
33. Vì sao button UI trong form nên ghi `type="button"`?
34. Vì sao không nên dựa vào `document.img_hoa`?
35. POST có tự làm dữ liệu an toàn không?

---


### Checklist kiến thức cần thuộc

- [ ] Biết thay đổi style bằng JavaScript.
- [ ] Biết camelCase CSS properties.
- [ ] Biết dùng `classList`.
- [ ] Hiểu Image Rollover.
- [ ] Biết `mouseenter` / `mouseleave`.
- [ ] Biết preload ảnh bằng `new Image()`.
- [ ] Hiểu giới hạn của preload.
- [ ] Tạo được slideshow Previous/Next.
- [ ] Biết `setInterval()` / `clearInterval()`.
- [ ] Hiểu image map.
- [ ] Phân biệt `id` và `name`.
- [ ] Biết `getElementsByName()`.
- [ ] Biết thao tác Select Box.
- [ ] Biết `value`, `selectedIndex`, `options`.
- [ ] Biết thao tác Checkbox bằng `checked`.
- [ ] Biết thao tác Radio theo group.
- [ ] Hiểu Form, GET và POST.
- [ ] Biết event `submit`.
- [ ] Biết `preventDefault()`.
- [ ] Biết client-side validation.
- [ ] Hiểu server-side validation vẫn bắt buộc.
- [ ] Biết HTML5 Constraint Validation.
- [ ] Biết `required`, `type`, `min`, `max`, `minlength`, `pattern`.
- [ ] Biết `checkValidity()` / `reportValidity()`.
- [ ] Biết `setCustomValidity()`.
- [ ] Biết `FormData`.

---

## Tổng kết

```text
BÀI 6
│
├── JavaScript + CSS
│   ├── style
│   └── classList
│
├── Hiệu ứng
│   ├── Image Rollover
│   ├── Preload
│   └── SlideShow
│       ├── Previous
│       ├── Next
│       ├── Play
│       └── Stop
│
├── Image Map
│   ├── usemap
│   ├── map
│   └── area
│
├── Form Controls
│   ├── Select
│   ├── Checkbox
│   └── Radio
│
├── Form
│   ├── GET / POST
│   ├── submit
│   ├── form.elements
│   └── FormData
│
└── Validation
    ├── required
    ├── type
    ├── minlength
    ├── pattern
    ├── checkValidity
    ├── setCustomValidity
    ├── client-side
    └── server-side
```

Luồng xử lý form nên nhớ:

```text
Người dùng nhập dữ liệu
        ↓
HTML validation
        ↓
JavaScript validation/rule nghiệp vụ
        ↓
Nếu sai → hiển thị lỗi, không gửi
        ↓
Nếu đúng → gửi request
        ↓
Server validate LẠI
        ↓
Xử lý dữ liệu
```

Luồng slideshow:

```text
Array URL ảnh
      ↓
currentIndex
      ↓
showImage()
   ↙      ↘
Previous  Next
      ↓
setInterval() nếu autoplay
```

> [!WARNING]
> 🚀 **Lưu ý:** Slide 6 có nhiều ví dụ từ thời Internet Explorer/Firefox cũ. Khi học cần nhận biết đúng ngữ cảnh của inline event handler, named properties như `document.img_hoa`, code riêng theo browser và giới hạn của client-side validation.
