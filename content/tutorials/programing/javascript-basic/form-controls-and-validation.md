# Bài 10. Form Controls và Form Validation

> Bài học này nối tiếp **Bài 9: JavaScript Effects**. Trọng tâm chuyển từ hiệu ứng giao diện sang việc đọc dữ liệu người dùng, xử lý các form control và kiểm tra dữ liệu trước khi gửi.

## 1. Mục tiêu bài học

Sau bài này, bạn cần:

- Phân biệt `id` và `name` trong form.
- Thao tác với Select Box, Checkbox và Radio Button.
- Hiểu `value`, `checked`, `selectedIndex` và `options`.
- Hiểu form, GET, POST và event `submit`.
- Thu thập dữ liệu bằng `form.elements` và `FormData`.
- Validate dữ liệu phía client.
- Sử dụng HTML Constraint Validation như `required`, `type`, `min`, `max`, `minlength` và `pattern`.
- Biết `checkValidity()`, `reportValidity()` và `setCustomValidity()`.
- Hiểu giới hạn của client-side validation và vai trò bắt buộc của server-side validation.
- Xây dựng form có thông báo lỗi rõ ràng, an toàn và dễ sử dụng.

---

## 2. Tổng quan về Form Controls

### 2.1. Các control trong bài

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


### 2.2. `id`

`id` dùng để nhận diện duy nhất một element trong document.

```html
<input id="email">
```

```javascript
const email = document.getElementById("email");
```

Trong một document, không nên có nhiều element cùng `id`.

---

### 2.3. `name`

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

### 2.4. Phân biệt `id` và `name`

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

### 2.5. `getElementsByName()`

Slide gọi kết quả là "mảng". Chính xác hơn, method này trả về
`NodeList`, không phải JavaScript Array thực sự.

```javascript
const controls = document.getElementsByName("test");

for (const control of controls) {
    console.log(control.value);
}
```

---


## 3. Select Box

### 3.1. Tạo Select

```html
<select id="country" name="country">
    <option value="vn">Việt Nam</option>
    <option value="uk">Anh</option>
    <option value="us">Mỹ</option>
</select>
```

---

### 3.2. Lấy giá trị đang chọn

```javascript
const country = document.querySelector("#country");
console.log(country.value);
```

Đây là Web Standard hiện đại, không còn là vấn đề riêng của Firefox như
slide cũ mô tả.

---

### 3.3. Thiết lập giá trị

```javascript
country.value = "us";
```

Điều kiện: phải có option có `value="us"`.

---

### 3.4. `selectedIndex` và `options`

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

### 3.5. Event `change`

Không cần button "Chọn quốc gia" nếu muốn phản ứng ngay khi lựa chọn
thay đổi:

```javascript
country.addEventListener("change", () => {
    console.log(country.value);
});
```

---


## 4. Checkbox

### 4.1. Property `checked`

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

### 4.2. Thiết lập trạng thái

```javascript
agree.checked = true;
```

Bỏ chọn:

```javascript
agree.checked = false;
```

---

### 4.3. Lấy nhiều checkbox được chọn

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

### 4.4. Hiển thị kết quả an toàn

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


## 5. Radio Button

### 5.1. Radio hoạt động theo nhóm

Các radio cùng `name` thuộc cùng nhóm:

```html
<label><input type="radio" name="size" value="large"> Lớn</label>
<label><input type="radio" name="size" value="medium"> Vừa</label>
<label><input type="radio" name="size" value="small"> Nhỏ</label>
```

Browser chỉ cho một radio trong nhóm được chọn tại một thời điểm.

---

### 5.2. Lấy radio đang chọn

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

### 5.3. Thiết lập radio mặc định

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


## 6. Form và quá trình Submit

### 6.1. Form dùng để làm gì?

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

### 6.2. GET và POST

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

### 6.3. Submit button

```html
<button type="submit">Gửi</button>
```

Khi form submit, browser phát event `submit` trên form.

Không chỉ click button mới có thể submit; ví dụ nhấn Enter trong một số
form cũng có thể kích hoạt submit.

---


### 6.4. `document.forms`

Slide giới thiệu:

```javascript
document.forms[0];
document.forms["formName"];
```

Cách này vẫn tồn tại.

---

### 6.5. Selector rõ ràng

```html
<form id="registerForm">
```

```javascript
const form = document.querySelector("#registerForm");
```

Cách này rõ ràng và nhất quán với DOM code khác.

---

### 6.6. `form.elements`

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

### 6.7. `FormData`

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


## 7. Form Validation

### 7.1. Validation là gì?

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

### 7.2. Client-side và server-side validation

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

### 7.3. Event `submit`

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

### 7.4. Xử lý `submit` hiện đại

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

### 7.5. Validate dữ liệu bằng JavaScript

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


## 8. HTML Constraint Validation

### 8.1. `required`

Không phải mọi validation đều cần tự viết JavaScript.

```html
<input name="name" required>
```

Browser sẽ kiểm tra trường bắt buộc.

---

### 8.2. `type="email"`

```html
<input type="email" name="email" required>
```

Browser kiểm tra cấu trúc email cơ bản.

---

### 8.3. `minlength` / `maxlength`

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

### 8.4. `min`, `max`, `step`

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

### 8.5. `pattern`

```html
<input
    name="studentCode"
    pattern="PS[0-9]{5}"
    title="Mã sinh viên phải có dạng PS12345"
>
```

`pattern` dùng regular expression theo quy tắc của HTML.

---

### 8.6. Constraint Validation API

```javascript
const form = document.querySelector("#registerForm");

console.log(form.checkValidity());
```

Nếu muốn browser hiển thị validation UI:

```javascript
form.reportValidity();
```

---

### 8.7. `setCustomValidity()`

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


## 9. Xây dựng validation thân thiện

### 9.1. Form đăng ký

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

### 9.2. Hiển thị lỗi gần input

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

### 9.3. Dùng `trim()`

```javascript
if (nameInput.value === "") {
```

không bắt được chuỗi chỉ có khoảng trắng.

Nên:

```javascript
if (nameInput.value.trim() === "") {
```

---


### 9.4. Checkbox bắt buộc

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

### 9.5. Ít nhất một checkbox

```javascript
const selectedHobbies = document.querySelectorAll(
    'input[name="hobby"]:checked'
);

if (selectedHobbies.length === 0) {
    console.log("Hãy chọn ít nhất một sở thích");
}
```

---

### 9.6. Radio bắt buộc

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

### 9.7. Select bắt buộc

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


## 10. Cập nhật cách viết hiện đại

### 10.1. `var` → `const` / `let`

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

### 10.2. Inline event → `addEventListener()`

Slide:

```html
<button onclick="chonKem()">Chọn kem</button>
```

Hiện đại:

```javascript
button.addEventListener("click", chonKem);
```

---

### 10.3. Named property → selector

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

### 10.4. Dùng Web Standards

Slide có các bài tập phân biệt Internet Explorer và Firefox.

Hiện nay nên:

```text
Dùng Web Standards
Feature detection khi cần
Kiểm tra browser support cho API mới
Không browser sniffing nếu không thật sự cần
```

---

### 10.5. NodeList không phải Array

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

### 10.6. Client validation không phải security boundary

Không được tin rằng:

```text
Đã validate bằng JavaScript
→ dữ liệu chắc chắn an toàn
```

Người dùng có thể gửi HTTP request trực tiếp, sửa JavaScript hoặc bỏ qua
UI.

Server phải validate lại toàn bộ dữ liệu.

---

### 10.7. POST không phải cơ chế bảo mật

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


## 11. Ví dụ tổng hợp: Form đặt hàng

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


## 12. Lỗi thường gặp

### 12.1. Dùng `id` trùng nhau

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

### 12.2. Radio selector có thể trả `null`

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

### 12.3. Quên `trim()`

```javascript
"   " !== ""
```

Nên:

```javascript
value.trim() === ""
```

---

### 12.4. Chỉ validate ở client

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

### 12.5. Button UI vô tình submit form

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

### 12.6. Gọi `preventDefault()` không đúng mục đích

Nếu ứng dụng thực sự muốn submit form lên server, không nên luôn gọi:

```javascript
event.preventDefault();
```

Chỉ ngăn submit khi validation thất bại hoặc khi chính JavaScript sẽ xử
lý request.

---

## 13. Bài tập

### Bài 1. Select

Tạo select tỉnh/thành. Khi `change`, hiển thị `value` và text của option đang chọn.

### Bài 2. Checkbox

Tạo 5 sở thích. Click **Xem kết quả** để hiển thị các sở thích được chọn. Không dùng `innerHTML` với dữ liệu người dùng.

### Bài 3. Radio

Tạo group phương thức thanh toán:

```text
Tiền mặt
Chuyển khoản
Thẻ
```

Hiển thị lựa chọn hiện tại.

### Bài 4. Validate đăng ký

Form gồm:

```text
Họ tên: required
Email: type=email, required
Tuổi: min=18
Password: minlength=8
Confirm Password: phải khớp
```

Ưu tiên HTML validation; JavaScript xử lý rule confirm password.

### Bài 5. Checkbox bắt buộc

Tạo checkbox **Tôi đồng ý điều khoản** và yêu cầu người dùng phải chọn trước khi submit.

### Bài 6. Form đặt hàng tổng hợp

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

- Validate đầy đủ.
- Dùng `FormData`.
- Hiển thị summary bằng DOM.
- Không dùng inline event.
- Không dùng `alert()` làm validation chính.

### Câu hỏi tự kiểm tra

1. `id` và `name` khác nhau thế nào?
2. `getElementsByName()` trả về Array không?
3. Lấy value của `<select>` thế nào?
4. `selectedIndex` là gì?
5. Checkbox dùng property nào để biết trạng thái chọn?
6. Radio cùng group cần có điểm gì chung?
7. Selector nào lấy radio đang chọn?
8. Event nào xảy ra khi form submit?
9. `preventDefault()` làm gì?
10. `FormData` dùng để làm gì?
11. Client-side validation có thay thế server-side validation không?
12. `required` dùng làm gì?
13. `type="email"` hỗ trợ validation gì?
14. `minlength` dùng làm gì?
15. `checkValidity()` và `reportValidity()` khác nhau thế nào?
16. `setCustomValidity()` dùng khi nào?
17. Vì sao nên dùng `trim()`?
18. Vì sao POST không đồng nghĩa với dữ liệu được bảo mật?
19. Vì sao button UI trong form nên ghi `type="button"`?
20. Server cần làm gì với dữ liệu nhận từ client?

### Checklist kiến thức cần thuộc

- [ ] Phân biệt `id` và `name`.
- [ ] Biết Select Box.
- [ ] Biết Checkbox.
- [ ] Biết Radio Button.
- [ ] Hiểu Form và submit.
- [ ] Hiểu GET và POST ở mức cơ bản.
- [ ] Biết `form.elements`.
- [ ] Biết `FormData`.
- [ ] Biết `preventDefault()`.
- [ ] Biết HTML Constraint Validation.
- [ ] Biết `checkValidity()` / `reportValidity()`.
- [ ] Biết `setCustomValidity()`.
- [ ] Biết validation rule nghiệp vụ.
- [ ] Hiểu client validation chỉ hỗ trợ UX.
- [ ] Hiểu server phải validate lại dữ liệu.

---

## 14. Tổng kết

```text
Form Controls
├── Select
├── Checkbox
└── Radio
      ↓
Form
├── submit
├── form.elements
└── FormData
      ↓
Validation
├── HTML constraints
├── JavaScript rules
└── Server validation
```

Luồng xử lý nên nhớ:

```text
Người dùng nhập dữ liệu
        ↓
HTML validation
        ↓
JavaScript validation / rule nghiệp vụ
        ↓
Sai → hiển thị lỗi
        ↓
Đúng → gửi request
        ↓
Server validate LẠI
        ↓
Xử lý dữ liệu
```
