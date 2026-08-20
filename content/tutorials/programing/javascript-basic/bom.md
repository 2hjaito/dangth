# Bài 4. Lập trình hướng đối tượng và Browser Object Model (BOM)

## 1. Mục tiêu bài học

Sau bài này, bạn cần:

-   Hiểu khái niệm phương thức lập trình (programming paradigm).
-   Hiểu lập trình hướng đối tượng (OOP).
-   Phân biệt **đối tượng**, **thuộc tính**, **phương thức**, **lớp**.
-   Biết tạo và sử dụng object trong JavaScript.
-   Hiểu `this`, constructor function và cú pháp `class` hiện đại.
-   Biết duyệt và kiểm tra thuộc tính của object.
-   Hiểu Browser Object Model (BOM).
-   Sử dụng các đối tượng `window`, `screen`, `navigator`, `location`,
    `history`.

---


## 2. Programming paradigm là gì?

Lập trình dùng để giải quyết nhiều loại vấn đề: tính toán, logic, quản
lý dữ liệu, giao diện người dùng,...

**Programming paradigm** có thể hiểu là một cách tiếp cận/tổ chức chương
trình để giải quyết vấn đề.

Một số paradigm thường gặp:

```text
Lập trình cấu trúc
Lập trình hướng sự kiện
Lập trình hướng đối tượng
Lập trình hàm
...
```

Không có một paradigm duy nhất phù hợp cho mọi bài toán. JavaScript là
ngôn ngữ đa mô hình nên có thể kết hợp nhiều phong cách.

---


## 3. OOP là gì?

**Object-Oriented Programming -- OOP** tổ chức chương trình xoay quanh
các **đối tượng**.

Có thể hình dung một đối tượng gồm:

```text
Object
├── Properties → dữ liệu / đặc tính
└── Methods    → hành vi / chức năng
```

Ví dụ một con mèo:

```text
Mèo
├── thuộc tính
│   ├── màu lông
│   ├── cân nặng
│   └── loại móng
└── phương thức
    ├── bắt chuột
    └── liếm lông
```

Trong chương trình, ta mô hình hóa những đặc tính và hành vi cần thiết
của thực thể chứ không nhất thiết mô phỏng mọi chi tiết của thế giới
thật.

---

## 4. Object -- đối tượng

Object là tập hợp các cặp **key--value**.

Ví dụ hiện đại:

```javascript
const cat = {
    furColor: "tam thể",
    weight: 2,
    claws: "sắc",

    catchMouse() {
        console.log("Mèo đang bắt chuột");
    },

    lickFur() {
        console.log("Mèo đang liếm lông");
    }
};
```

Ở đây:

```text
furColor, weight, claws → properties
catchMouse, lickFur    → methods
```

---

## 5. Thuộc tính -- Property

Thuộc tính lưu dữ liệu của object.

```javascript
const flower = {};

flower.color = "Hồng";
flower.petals = 5;
```

Truy cập:

```javascript
console.log(flower.color);
console.log(flower.petals);
```

Có hai cú pháp chính:

```javascript
flower.color;
flower["color"];
```

Bracket notation hữu ích khi tên thuộc tính nằm trong biến:

```javascript
const key = "color";
console.log(flower[key]);
```

---

## 6. Thêm và thay đổi thuộc tính

```javascript
const user = {};

user.name = "Trần Hữu Đang";
user.age = 20;

user.age = 21;
```

Object khai báo bằng `const` vẫn có thể thay đổi thuộc tính:

```javascript
const user = { name: "Trần Hữu Đang" };
user.name = "Trần Hữu Đang"; // hợp lệ
```

Nhưng không thể gán object mới vào chính biến đó:

```javascript
// user = {}; // TypeError
```

---

## 7. Method -- phương thức

Method là function được lưu trong một thuộc tính của object.

```javascript
const flower = {
    color: "Hồng",

    spreadFragrance() {
        console.log("Hoa đang tỏa hương");
    }
};

flower.spreadFragrance();
```

Cú pháp cũ cũng hợp lệ:

```javascript
flower.spreadFragrance = function () {
    console.log("Hoa đang tỏa hương");
};
```

---

## 8. `this` trong method

`this` thường dùng để tham chiếu tới object nhận lời gọi method.

```javascript
const flower = {
    color: "Hồng",

    introduce() {
        console.log(`Tôi có màu ${this.color}`);
    }
};

flower.introduce();
```

Kết quả:

```text
Tôi có màu Hồng
```

### Cẩn thận với arrow function

Không nên dùng arrow function làm method nếu cần `this` theo cách trên:

```javascript
const flower = {
    color: "Hồng",
    introduce: () => {
        console.log(this.color);
    }
};
```

Arrow function không tạo `this` riêng; nó lấy `this` từ scope bên ngoài.

---


## 9. `new Object()`

Slide sử dụng:

```javascript
var flower = new Object();
```

Cú pháp này hợp lệ, nhưng object literal thường ngắn và rõ hơn:

```javascript
const flower = {};
```

Hoặc tạo sẵn dữ liệu:

```javascript
const flower = {
    color: "Hồng",
    petals: 5
};
```

---

## 10. Vì sao cần khuôn mẫu?

Nếu tạo nhiều object giống cấu trúc:

```javascript
const peachBlossom = {
    color: "Hồng",
    petals: 5
};

const rose = {
    color: "Đỏ",
    petals: 10
};

const chrysanthemum = {
    color: "Vàng",
    petals: 20
};
```

việc lặp lại code sẽ tăng nhanh.

Ta cần một **khuôn mẫu** để tạo nhiều object cùng cấu trúc.

---


## 11. Constructor function

Cách JavaScript truyền thống:

```javascript
function Flower(color, petals) {
    this.color = color;
    this.petals = petals;
}
```

Tạo object:

```javascript
const peachBlossom = new Flower("Hồng", 5);
const rose = new Flower("Đỏ", 10);
const chrysanthemum = new Flower("Vàng", 20);
```

Truy cập:

```javascript
console.log(rose.color);  // Đỏ
console.log(rose.petals); // 10
```

Quy ước: tên constructor viết hoa chữ cái đầu.

---

## 12. Constructor có method

Có thể viết:

```javascript
function Flower(color, petals) {
    this.color = color;
    this.petals = petals;

    this.spreadFragrance = function () {
        console.log(`Tôi có màu ${this.color}, tôi đang tỏa hương`);
    };
}
```

Nhưng cách này tạo một function `spreadFragrance` mới cho mỗi instance.

Tốt hơn với prototype:

```javascript
function Flower(color, petals) {
    this.color = color;
    this.petals = petals;
}

Flower.prototype.spreadFragrance = function () {
    console.log(`Tôi có màu ${this.color}, tôi đang tỏa hương`);
};
```

Các instance có thể dùng chung method qua prototype.

---


## 13. Khai báo class

ES2015 bổ sung cú pháp `class`:

```javascript
class Flower {
    constructor(color, petals) {
        this.color = color;
        this.petals = petals;
    }

    spreadFragrance() {
        console.log(`Tôi có màu ${this.color}, tôi đang tỏa hương`);
    }
}
```

Tạo instance:

```javascript
const peachBlossom = new Flower("Hồng", 5);
const rose = new Flower("Đỏ", 10);
```

Gọi method:

```javascript
peachBlossom.spreadFragrance();
rose.spreadFragrance();
```

---

## 14. Class và object khác nhau thế nào?

Có thể hình dung:

```text
Class = khuôn mẫu
Object/instance = sản phẩm được tạo từ khuôn mẫu
```

Ví dụ:

```text
Flower
├── peachBlossom
├── rose
└── chrysanthemum
```

Trong JavaScript, `class` là cú pháp được xây dựng trên cơ chế prototype
của ngôn ngữ; hiểu object và prototype vẫn rất quan trọng.

---

## 15. Kiểm tra instance

```javascript
const rose = new Flower("Đỏ", 10);

console.log(rose instanceof Flower); // true
```

---


## 16. Không nên gắn instance vào constructor như một "kho chứa"

Slide có cách dạng:

```javascript
Hoa["Dao"] = new Hoa(...);
Hoa["Hong"] = new Hoa(...);
```

JavaScript cho phép function có property, nhưng cách này dễ làm lẫn lộn
giữa **constructor** và **collection**.

Nên dùng object riêng:

```javascript
const flowers = {
    dao: new Flower("Hồng", 5),
    hong: new Flower("Đỏ", 10),
    cuc: new Flower("Vàng", 20),
    lan: new Flower("Tím", 3)
};
```

---

## 17. Duyệt object với `for...in`

```javascript
for (const key in flowers) {
    flowers[key].spreadFragrance();
}
```

Nếu chỉ muốn own enumerable properties, cách rõ ràng hơn:

```javascript
for (const flower of Object.values(flowers)) {
    flower.spreadFragrance();
}
```

Hoặc cả key và value:

```javascript
for (const [name, flower] of Object.entries(flowers)) {
    console.log(name, flower.color);
}
```

---

## 18. Kiểm tra thuộc tính

Slide sử dụng toán tử `in`:

```javascript
if ("dao" in flowers) {
    console.log("Đã có hoa đào");
}
```

`in` kiểm tra cả property được kế thừa qua prototype chain.

Nếu chỉ muốn own property:

```javascript
if (Object.hasOwn(flowers, "dao")) {
    console.log("Đã có hoa đào");
}
```

---

## 19. Thêm thuộc tính động

```javascript
if (Object.hasOwn(flowers, "dao")) {
    flowers.dao.symbol = "Mùa xuân";
}

console.log(flowers.dao.symbol);
```

JavaScript object có tính động: có thể thêm/xóa property trong thời gian
chạy.

Xóa:

```javascript
delete flowers.dao.symbol;
```

---


## 20. BOM là gì?

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

## 21. BOM và DOM

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


## 22. `window`

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

## 23. Một số thuộc tính `window`

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

## 24. Một số phương thức `window`

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

## 25. `window.open()`

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

## 26. `window.close()`

```javascript
const popup = window.open("https://example.com");

// Sau đó, nếu có quyền kiểm soát cửa sổ đó:
popup?.close();
```

Trình duyệt thường giới hạn việc script đóng những tab/cửa sổ không do
script mở.

---

## 27. `moveTo()` và `resizeTo()`

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


## 28. Đối tượng `screen`

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

## 29. `screen` không thay thế responsive design

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


## 30. Đối tượng `navigator`

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

## 31. Không nên browser detection bằng `appName`

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

## 32. `navigator.javaEnabled()`

Slide giới thiệu:

```javascript
navigator.javaEnabled();
```

Đây là API lịch sử gắn với Java applet. Java applet đã không còn là công
nghệ web thực tế trong browser hiện đại, nên không nên xây dựng ứng dụng
mới dựa trên API này.

---


## 33. Đối tượng `location`

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

## 34. Xem URL hiện tại

```javascript
console.log(location.href);
console.log(location.hostname);
console.log(location.pathname);
```

Không cần `document.write()` như ví dụ cũ trong slide. Khi debug, dùng
`console.log()`.

---

## 35. Chuyển sang URL khác

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

## 36. `location.replace()`

```javascript
location.replace("https://example.com");
```

Khác với `assign()`, `replace()` thay entry hiện tại trong session
history, nên người dùng thường không quay lại entry cũ bằng nút Back.

---

## 37. Reload trang

```javascript
location.reload();
```

Dùng khi thực sự cần tải lại document hiện tại.

---


## 38. Đối tượng `history`

`history` cho phép tương tác với session history của tab/frame hiện tại.

```javascript
history.length;
history.back();
history.forward();
history.go();
```

---

## 39. Quay lại và đi tới

```javascript
history.back();
```

Tương đương ý tưởng nhấn nút Back.

```javascript
history.forward();
```

Đi tới entry tiếp theo nếu có.

---

## 40. `history.go()`

```javascript
history.go(-1); // lùi 1
history.go(1);  // tiến 1
history.go(-2); // lùi 2
```

Không nên hiểu `history` là danh sách URL mà JavaScript có thể đọc tự
do. Vì lý do riêng tư/bảo mật, script không được lấy toàn bộ URL trong
lịch sử duyệt web của người dùng.

---

## 41. Ví dụ nút Back/Forward hiện đại

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


## 42. `window.document`

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

## 43. `frames`

Trong trang có frame/iframe, `window.frames` cung cấp truy cập tới các
browsing context con:

```javascript
console.log(window.frames.length);
```

Tuy nhiên, **same-origin policy** hạn chế việc đọc/thao tác nội dung
frame từ origin khác.

---


## 44. `var` → ưu tiên `const` / `let`

Slide:

```javascript
var hoa = new Object();
```

Hiện đại:

```javascript
const flower = {};
```

Dùng `let` khi biến cần được gán lại.

---

## 45. `new Object()` → object literal

Thay vì:

```javascript
const flower = new Object();
flower.color = "Hồng";
flower.petals = 5;
```

thường viết:

```javascript
const flower = {
    color: "Hồng",
    petals: 5
};
```

---

## 46. Constructor function → biết cả `class`

Cần hiểu constructor function vì code JavaScript cũ sử dụng nhiều:

```javascript
function Flower(color) {
    this.color = color;
}
```

Nhưng code ứng dụng hiện đại thường dễ đọc hơn với:

```javascript
class Flower {
    constructor(color) {
        this.color = color;
    }
}
```

---

## 47. Không dùng `document.write()` để render ứng dụng

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

## 48. Browser sniffing → feature detection

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

## 49. Các API BOM cũ có thể bị giới hạn

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

## 50. Popup có thể bị chặn

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


## 51. Class `Student`

```javascript
class Student {
    constructor(name, score) {
        this.name = name;
        this.score = score;
    }

    getResult() {
        return this.score >= 5 ? "Đạt" : "Chưa đạt";
    }

    introduce() {
        return `${this.name}: ${this.score} - ${this.getResult()}`;
    }
}

const student = new Student("Trần Hữu Đang", 8);
console.log(student.introduce());
```

---

## 52. Danh sách object

Khi chỉ cần danh sách, Array thường tự nhiên hơn object collection:

```javascript
const students = [
    new Student("Trần Hữu Đang", 8),
    new Student("davi", 4),
    new Student("david", 7)
];

for (const student of students) {
    console.log(student.introduce());
}
```

---

## 53. Hiển thị thông tin BOM

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

## 54. Điều hướng có xác nhận

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


## 55. Quên `new` với constructor function

```javascript
function Flower(color) {
    this.color = color;
}

const flower = new Flower("Đỏ");
```

Với constructor function truyền thống, cần dùng `new`. Với `class`, gọi
không có `new` sẽ ném lỗi.

---

## 56. Nhầm property với method

Property:

```javascript
flower.color
```

Method:

```javascript
flower.spreadFragrance()
```

Quên `()` nghĩa là lấy function thay vì gọi function:

```javascript
console.log(flower.spreadFragrance);
```

---

## 57. Nhầm `screen.width` và `window.innerWidth`

```text
screen.width      → chiều rộng màn hình
window.innerWidth → chiều rộng viewport của cửa sổ/tab
```

Responsive UI thường quan tâm viewport hơn.

---

## 58. Nhầm `location` với `history`

```text
location → URL/document hiện tại và điều hướng
history  → di chuyển trong session history
```

---

## 59. Nhầm BOM với DOM

```text
window.location → BOM/Web platform environment
window.screen   → BOM
window.history  → BOM

document.querySelector() → DOM
document.createElement()  → DOM
```

---

## 60. Dựa vào thông tin browser quá mức

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


## 61. Object literal

```javascript
const object = {
    property: value,

    method() {
        // ...
    }
};
```

## 62. Class

```javascript
class ClassName {
    constructor(value) {
        this.property = value;
    }

    method() {
        // ...
    }
}

const object = new ClassName(value);
```

## 63. BOM

```javascript
window.innerWidth;
screen.width;
navigator.language;
location.href;
history.back();
```

---


## Bài tập

### Bài 1. Object sinh viên

Tạo object:

```javascript
student
```

có:

```text
name
age
score
```

và method:

```text
introduce()
```

---

### Bài 2. Class `Product`

Tạo class:

```javascript
Product
```

có:

```text
name
price
quantity
```

Method:

```javascript
getTotal()
```

trả về:

```text
price * quantity
```

---

### Bài 3. Danh sách sản phẩm

Tạo 3 `Product`, lưu vào Array và dùng `for...of` để in tổng tiền từng
sản phẩm.

---

### Bài 4. Object hoa

Tạo class `Flower` gồm:

```text
name
color
petals
```

Method:

```text
introduce()
```

Sau đó tạo:

```text
Hoa đào
Hoa hồng
Hoa cúc
Hoa lan
```

---

### Bài 5. Kiểm tra property

Cho:

```javascript
const user = {
    name: "Trần Hữu Đang",
    age: 20
};
```

Kiểm tra `email` có phải own property hay không bằng:

```javascript
Object.hasOwn()
```

---

### Bài 6. Thông tin màn hình

Hiển thị lên HTML:

```text
screen.width
screen.height
screen.availWidth
screen.availHeight
```

Không dùng `document.write()`.

---

### Bài 7. Thông tin URL

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

---

### Bài 8. Back/Forward

Tạo hai button:

```text
Back
Forward
```

và dùng:

```javascript
history.back();
history.forward();
```

Gắn sự kiện bằng `addEventListener()`.

---

### Bài 9. Popup

Tạo button mở một trang bằng `window.open()`.

Kiểm tra:

```javascript
popup === null
```

để phát hiện khả năng popup bị chặn.

---

### Bài 10. Phân biệt API

Phân loại các API sau vào nhóm phù hợp:

```text
location.href
screen.width
document.querySelector
history.back
navigator.language
document.createElement
window.innerHeight
```

Nhóm:

```text
BOM / môi trường trình duyệt
DOM
```

---


### Câu hỏi tự kiểm tra

1. Programming paradigm là gì?
2.  OOP tổ chức chương trình quanh khái niệm nào?
3.  Property là gì?
4.  Method là gì?
5.  Object literal được viết thế nào?
6.  `this` trong method thường dùng để làm gì?
7.  Vì sao không nên tùy tiện dùng arrow function làm method cần `this`?
8.  Constructor function là gì?
9.  `new` có vai trò gì khi tạo instance?
10. `class` và object/instance khác nhau thế nào?
11. `instanceof` dùng làm gì?
12. `for...in` duyệt cái gì?
13. `Object.values()` trả về gì?
14. `Object.entries()` trả về gì?
15. `in` và `Object.hasOwn()` khác nhau ở điểm nào?
16. BOM là gì?
17. BOM và DOM khác nhau thế nào?
18. `window` đại diện cho gì trong browser?
19. `window.innerWidth` và `screen.width` khác nhau thế nào?
20. `window.open()` có thể bị browser xử lý thế nào?
21. `screen` cung cấp loại thông tin gì?
22. `navigator` cung cấp loại thông tin/API gì?
23. Vì sao không nên dựa vào `navigator.appName` để phát hiện browser?
24. `location.href` là gì?
25. `location.assign()` dùng làm gì?
26. `location.replace()` khác `assign()` ở điểm chính nào?
27. `location.reload()` dùng làm gì?
28. `history.back()` làm gì?
29. `history.go(-2)` có ý nghĩa gì?
30. JavaScript có thể đọc toàn bộ URL trong lịch sử duyệt web của người
    dùng không?

---


### Checklist kiến thức cần thuộc

- [ ] Hiểu programming paradigm.
- [ ] Hiểu OOP.
- [ ] Phân biệt object/property/method/class.
- [ ] Biết tạo object literal.
- [ ] Biết dot notation và bracket notation.
- [ ] Hiểu `this`.
- [ ] Biết constructor function.
- [ ] Biết cú pháp `class` và `constructor`.
- [ ] Biết tạo instance bằng `new`.
- [ ] Biết `instanceof`.
- [ ] Biết quản lý nhiều object bằng Array/Object.
- [ ] Biết `for...in`, `Object.values()`, `Object.entries()`.
- [ ] Biết `in` và `Object.hasOwn()`.
- [ ] Hiểu BOM và DOM.
- [ ] Biết đối tượng `window`.
- [ ] Biết `screen`.
- [ ] Biết `navigator`.
- [ ] Biết `location`.
- [ ] Biết `history`.
- [ ] Biết các API legacy trong slide không nên áp dụng máy móc vào
    code hiện đại.

---

## Tổng kết

```text
JavaScript OOP
├── Object
│   ├── Property
│   └── Method
│
├── Tạo object
│   ├── Object literal {}
│   ├── Constructor function
│   └── class
│
├── this
├── new
└── prototype / class methods

Browser APIs (BOM theo cách gọi trong bài)
└── window
    ├── document → DOM
    ├── frames
    ├── history
    ├── location
    ├── navigator
    └── screen
```

Ví dụ tổng hợp:

```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WEB1042 - Bài 4</title>
</head>
<body>
    <button id="showButton">Hiển thị thông tin</button>
    <ul id="output"></ul>

    <script>
        class BrowserInfo {
            getItems() {
                return [
                    `Viewport: ${window.innerWidth} x ${window.innerHeight}`,
                    `Screen: ${screen.width} x ${screen.height}`,
                    `Language: ${navigator.language}`,
                    `URL: ${location.href}`,
                    `History length: ${history.length}`
                ];
            }
        }

        const browserInfo = new BrowserInfo();
        const button = document.querySelector("#showButton");
        const output = document.querySelector("#output");

        button.addEventListener("click", () => {
            output.replaceChildren();

            for (const text of browserInfo.getItems()) {
                const item = document.createElement("li");
                item.textContent = text;
                output.append(item);
            }
        });
    </script>
</body>
</html>
```

Đoạn code kết hợp kiến thức của bài:

```text
class
object / instance
method
DOM event
window
screen
navigator
location
history
```

> [!WARNING]
> 🚀 **Lưu ý:** Slide 4 được xây dựng trong bối cảnh trình duyệt cũ nên có các API/cú pháp legacy như `var`, `new Object()`, `document.write()`, `navigator.appName`, `javaEnabled()`, `defaultStatus`, `moveTo()` và `resizeTo()`. Cần nhận biết đúng ngữ cảnh khi đọc tài liệu.
