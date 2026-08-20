# Bài 3. Cấu trúc điều khiển, hàm và xử lý sự kiện

## 1. Mục tiêu bài học

Sau bài này, bạn cần nắm được:

-   `if...else` và `switch`.
-   Vòng lặp `while`, `do...while`, `for`.
-   Duyệt mảng bằng vòng lặp.
-   Khai báo, gọi hàm, tham số và `return`.
-   Hàm `confirm()`.
-   Phạm vi biến: global, function scope và block scope.
-   Các sự kiện thường gặp trên trang web.
-   Cách tổ chức hàm xử lý sự kiện.
-   `setTimeout()`, `clearTimeout()`, `setInterval()`,
    `clearInterval()`.

---


## 2. Ba cấu trúc điều khiển

JavaScript có ba nhóm cấu trúc điều khiển cơ bản:

```text
Tuần tự
Lựa chọn
Lặp
```

Trong bài trước đã học lựa chọn đơn:

```javascript
if (condition) {
    // code
}
```

Bài này tiếp tục với:

```text
if...else
switch
while
do...while
for
```

---

## 3. Lệnh lựa chọn kép `if...else`

Cú pháp:

```javascript
if (condition) {
    // chạy khi condition là true
} else {
    // chạy khi condition là false
}
```

Ví dụ theo ý tưởng của slide:

```javascript
const x = Number(prompt("Hãy nhập một số:"));

if (x > 50) {
    alert(`${x} lớn hơn 50`);
} else {
    alert(`${x} không lớn hơn 50`);
}
```

Nên kiểm tra dữ liệu nhập:

```javascript
const x = Number(prompt("Hãy nhập một số:"));

if (Number.isNaN(x)) {
    alert("Dữ liệu không hợp lệ.");
} else if (x > 50) {
    alert("Số lớn hơn 50.");
} else {
    alert("Số nhỏ hơn hoặc bằng 50.");
}
```

---

## 4. Lệnh đa lựa chọn `switch`

Cú pháp:

```javascript
switch (value) {
    case value1:
        // code
        break;

    case value2:
        // code
        break;

    default:
        // code
}
```

`switch` phù hợp khi cần so sánh **một biểu thức với nhiều giá trị cụ
thể**.

Ví dụ:

```javascript
const grade = prompt("Nhập điểm chữ:");

switch (grade) {
    case "A":
        alert("Tuyệt vời!");
        break;

    case "B":
    case "C":
        alert("Khá!");
        break;

    case "D":
    case "E":
    case "F":
        alert("Bạn cần cố gắng hơn!");
        break;

    default:
        alert("Giá trị không hợp lệ.");
}
```

### Nhiều `case` dùng chung một xử lý

```javascript
case "B":
case "C":
    alert("Khá!");
    break;
```

Có nghĩa là cả `"B"` và `"C"` đều chạy cùng đoạn code.

---

## 5. Vai trò của `break` trong `switch`

`break` kết thúc `switch`.

```javascript
switch (value) {
    case 1:
        console.log("Một");
        break;

    case 2:
        console.log("Hai");
        break;
}
```

Nếu bỏ `break`, JavaScript có thể tiếp tục chạy xuống các `case` sau.
Hiện tượng này gọi là **fall-through**.

Ví dụ:

```javascript
const value = "A";

switch (value) {
    case "A":
        console.log("A");

    case "B":
        console.log("B");

    default:
        console.log("Default");
}
```

Kết quả:

```text
A
B
Default
```

Fall-through đôi khi được dùng có chủ đích, nhưng khi mới học nên đặt
`break` rõ ràng nếu không muốn chạy tiếp.

---

## 6. `switch` và so sánh nghiêm ngặt

Có thể hiểu `switch` là so khớp giá trị theo cách gần với `===`.

Ví dụ:

```javascript
const value = 1;

switch (value) {
    case "1":
        console.log("String");
        break;

    case 1:
        console.log("Number");
        break;
}
```

Kết quả:

```text
Number
```

Vì:

```javascript
1 !== "1"
```

---


## 7. Các loại vòng lặp trong bài

Slide chia thành:

```text
Không biết trước số lần lặp:
- while
- do...while

Biết trước hoặc dễ biểu diễn số lần lặp:
- for
```

Đây là cách phân loại hữu ích khi mới học, dù trong thực tế cả ba đều có
thể dùng linh hoạt hơn.

---

## 8. Vòng lặp `while`

Cú pháp:

```javascript
while (condition) {
    // code
}
```

Quy trình:

```text
Kiểm tra điều kiện
       ↓
    true?
   /     \
 yes      no
  ↓        ↓
code     kết thúc
  ↓
quay lại kiểm tra
```

Ví dụ:

```javascript
let x = 0;

while (x < 10) {
    console.log(x);
    x++;
}
```

Kết quả:

```text
0
1
2
3
4
5
6
7
8
9
```

---

## 9. Lỗi lặp vô hạn

Ví dụ nguy hiểm:

```javascript
let x = 0;

while (x < 10) {
    console.log(x);
}
```

`x` luôn bằng `0`, nên:

```javascript
x < 10
```

luôn là `true`.

Cần cập nhật biến điều khiển:

```javascript
let x = 0;

while (x < 10) {
    console.log(x);
    x++;
}
```

Khi viết `while`, hãy tự hỏi:

```text
Điều kiện nào làm vòng lặp dừng?
Giá trị nào đang thay đổi để tiến tới điều kiện dừng?
```

---

## 10. Vòng lặp `do...while`

Cú pháp:

```javascript
do {
    // code
} while (condition);
```

Ví dụ:

```javascript
let count = 0;

do {
    console.log(`Đếm đến ${count}`);
    count++;
} while (count < 5);
```

Kết quả:

```text
Đếm đến 0
Đếm đến 1
Đếm đến 2
Đếm đến 3
Đếm đến 4
```

### Điểm quan trọng

`do...while` **chạy thân vòng lặp ít nhất một lần**.

```javascript
let x = 100;

do {
    console.log(x);
} while (x < 10);
```

Dù điều kiện sai ngay từ đầu, `100` vẫn được in một lần.

---

## 11. So sánh `while` và `do...while`

`while`:

```javascript
while (condition) {
    // code
}
```

Kiểm tra điều kiện **trước** khi chạy.

`do...while`:

```javascript
do {
    // code
} while (condition);
```

Chạy **trước**, kiểm tra điều kiện **sau**.

| Đặc điểm | `while` | `do...while` |
|---|---|---|
| Kiểm tra điều kiện | Trước | Sau |
| Có thể chạy 0 lần | Có | Không |
| Chạy tối thiểu | 0 lần | 1 lần |

---

## 12. Vòng lặp `for`

Cú pháp:

```javascript
for (initialization; condition; update) {
    // code
}
```

Ví dụ:

```javascript
for (let x = 0; x < 10; x++) {
    console.log(x);
}
```

Ba phần:

```javascript
let x = 0   // khởi tạo
x < 10      // điều kiện
x++         // bước tăng
```

Quy trình:

```text
khởi tạo
   ↓
điều kiện
   ↓ true
 thân lặp
   ↓
bước tăng
   ↓
quay lại điều kiện
```

---

## 13. Ví dụ vòng `for`

In từ 1 đến 10:

```javascript
for (let i = 1; i <= 10; i++) {
    console.log(i);
}
```

In số chẵn:

```javascript
for (let i = 0; i <= 10; i += 2) {
    console.log(i);
}
```

Đếm ngược:

```javascript
for (let i = 10; i >= 1; i--) {
    console.log(i);
}
```

Tính tổng từ 1 đến 100:

```javascript
let total = 0;

for (let i = 1; i <= 100; i++) {
    total += i;
}

console.log(total); // 5050
```

---

## 14. Duyệt mảng bằng `for`

Slide sử dụng:

```javascript
var convat = new Array("meo", "ho", "voi");

for (var i = 0; i < convat.length; i++) {
    document.write(convat[i] + "</br>");
}
```

Phiên bản hiện đại:

```javascript
const animals = ["mèo", "hổ", "voi"];

for (let i = 0; i < animals.length; i++) {
    console.log(animals[i]);
}
```

Kết quả:

```text
mèo
hổ
voi
```

Điều kiện:

```javascript
i < animals.length
```

rất quan trọng vì index cuối cùng là:

```javascript
animals.length - 1
```

---

## 15. `for...of` -- cách hiện đại để duyệt giá trị mảng

Khi chỉ cần giá trị:

```javascript
const animals = ["mèo", "hổ", "voi"];

for (const animal of animals) {
    console.log(animal);
}
```

Nếu cần cả index:

```javascript
for (let i = 0; i < animals.length; i++) {
    console.log(i, animals[i]);
}
```

---

## 16. `break` và `continue` trong vòng lặp

`break` thoát khỏi vòng lặp:

```javascript
for (let i = 1; i <= 10; i++) {
    if (i === 5) {
        break;
    }

    console.log(i);
}
```

Kết quả:

```text
1
2
3
4
```

`continue` bỏ qua lần lặp hiện tại:

```javascript
for (let i = 1; i <= 5; i++) {
    if (i === 3) {
        continue;
    }

    console.log(i);
}
```

Kết quả:

```text
1
2
4
5
```

---


## 17. Hàm là gì?

Hàm là một khối code thực hiện một chức năng cụ thể.

Lợi ích:

-   Tái sử dụng code.
-   Chia chương trình thành các phần nhỏ.
-   Dễ đọc.
-   Dễ kiểm thử.
-   Dễ sửa lỗi.

Ví dụ:

```javascript
function sayHello() {
    console.log("Hello");
}
```

Gọi hàm:

```javascript
sayHello();
```

---

## 18. Hàm có tham số

Cú pháp:

```javascript
function functionName(parameter1, parameter2) {
    // code
}
```

Ví dụ:

```javascript
function greet(firstGreeting, secondGreeting) {
    alert(`Biến thứ nhất là: ${firstGreeting}`);
    alert(`Biến thứ hai là: ${secondGreeting}`);
}
```

Gọi:

```javascript
greet("Hi", "Hello");
```

Ở đây:

```text
firstGreeting, secondGreeting → tham số (parameters)
"Hi", "Hello"                → đối số (arguments)
```

---

## 19. Hàm trả về giá trị

Dùng `return`:

```javascript
function multiply(x, y) {
    return x * y;
}
```

Gọi hàm:

```javascript
const product = multiply(3, 4);

console.log(product); // 12
```

`return` có hai tác dụng quan trọng:

```text
1. Trả giá trị ra ngoài hàm.
2. Kết thúc việc thực thi hàm tại vị trí return.
```

Ví dụ:

```javascript
function checkAge(age) {
    if (age < 18) {
        return "Chưa đủ tuổi";
    }

    return "Đủ tuổi";
}
```

---

## 20. Hàm không trả về giá trị

Ví dụ:

```javascript
function showMessage(message) {
    console.log(message);
}
```

Gọi:

```javascript
showMessage("Hello");
```

Nếu kiểm tra kết quả:

```javascript
const result = showMessage("Hello");

console.log(result);
```

thì `result` sẽ là:

```text
undefined
```

vì hàm không `return` giá trị cụ thể.

---

## 21. Function declaration và arrow function

Slide tập trung vào function declaration:

```javascript
function add(a, b) {
    return a + b;
}
```

JavaScript hiện đại còn thường dùng arrow function:

```javascript
const add = (a, b) => {
    return a + b;
};
```

Có thể viết ngắn:

```javascript
const add = (a, b) => a + b;
```

Khi mới học, nên hiểu chắc `function` trước rồi mới dùng arrow function
nhiều.

---


## 22. `confirm()` là gì?

`confirm()` hiển thị hộp thoại có hai lựa chọn thường là:

```text
OK
Cancel
```

Ví dụ:

```javascript
const answer = confirm("Bạn có chắc muốn xóa?");
```

Kết quả:

```text
OK     → true
Cancel → false
```

---

## 23. Dùng `confirm()` với `if`

```javascript
const ok = confirm("Bạn có chắc muốn xóa?");

if (ok) {
    console.log("Người dùng đồng ý.");
} else {
    console.log("Người dùng hủy.");
}
```

Không cần viết:

```javascript
if (ok === true)
```

khi `ok` vốn đã là Boolean.

---

## 24. Ví dụ hàm xác nhận

```javascript
function getGameMessage(answer) {
    if (answer) {
        return "Tuyệt vời. Chúc bạn chiến thắng!";
    }

    return "Hẹn gặp lại bạn nhé!";
}

const answer = confirm("Bạn sẽ chơi game chứ?");
const message = getGameMessage(answer);

alert(message);
```

Kiến thức kết hợp:

-   Hàm.
-   Tham số.
-   `if...else`.
-   `return`.
-   Boolean.
-   `confirm()`.
-   `alert()`.

---


## 25. Biến toàn cục

Biến khai báo bên ngoài hàm có thể được truy cập từ nhiều vị trí trong
chương trình.

```javascript
const message = "Tôi là biến toàn cục";

function showMessage() {
    console.log(message);
}

showMessage();
console.log(message);
```

Tuy nhiên, không nên lạm dụng biến global vì chúng làm code khó kiểm
soát khi chương trình lớn.

---

## 26. Biến cục bộ trong hàm

```javascript
function demo() {
    const message = "Tôi là biến cục bộ";

    console.log(message);
}

demo();
```

Bên ngoài hàm:

```javascript
// console.log(message);
```

sẽ không truy cập được `message`.

---

## 27. Function scope và block scope

Đây là điểm cần bổ sung so với slide cũ.

`var` có **function scope**:

```javascript
function demo() {
    if (true) {
        var x = 10;
    }

    console.log(x); // 10
}
```

`let` và `const` có **block scope**:

```javascript
function demo() {
    if (true) {
        let x = 10;
        const y = 20;

        console.log(x, y);
    }

    // console.log(x); // ReferenceError
    // console.log(y); // ReferenceError
}
```

Vì vậy code hiện đại thường ưu tiên:

```text
const
let
```

thay cho `var`.

---

## 28. Tránh tạo biến global ngoài ý muốn

Trong JavaScript hiện đại, luôn khai báo biến rõ ràng:

```javascript
let x = 10;
const y = 20;
```

Không nên:

```javascript
// x = 10;
```

Đặc biệt nên dùng strict mode hoặc JavaScript module để tránh nhiều lỗi
liên quan đến scope.

---


## 29. Sự kiện là gì?

Trang web có thể phản ứng với hành động của người dùng hoặc thay đổi của
trình duyệt.

Ví dụ:

```text
click
load
focus
blur
change
mouseover
```

Một element có thể có nhiều loại sự kiện.

---

## 30. Một số sự kiện thường gặp

| Sự kiện | Ý nghĩa |
|---|---|
| `click` | Người dùng click |
| `load` | Tài nguyên/trang được tải |
| `beforeunload` / `unload` | Liên quan quá trình rời trang |
| `focus` | Element nhận focus |
| `blur` | Element mất focus |
| `change` | Giá trị được thay đổi/xác nhận |
| `mouseover` | Con trỏ đi vào element hoặc phần tử con |

Trong HTML inline, slide dùng dạng:

```html
onclick="..."
```

Tên event trong JavaScript khi dùng `addEventListener()` là:

```javascript
"click"
"focus"
"blur"
"change"
"mouseover"
```

---

## 31. Inline event handler

Ví dụ theo slide:

```html
<body onclick="alert('Hi')">
</body>
```

Có thể chạy nhiều lệnh:

```html
<body onclick="alert('Hi'); alert('Hello');">
</body>
```

Cách này giúp minh họa event dễ hiểu nhưng không phải cách tổ chức tốt
cho ứng dụng lớn.

---

## 32. Dùng hàm để xử lý sự kiện

Tốt hơn việc nhét nhiều lệnh vào thuộc tính `onclick`:

```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Event Demo</title>
</head>
<body>
    <button type="button" onclick="showGreeting()">
        Hiển thị lời chào
    </button>

    <script>
        function showGreeting() {
            alert("Hi");
            alert("Hello");
        }
    </script>
</body>
</html>
```

Lợi ích:

```text
HTML dễ đọc hơn
Code dễ tái sử dụng
Logic phức tạp dễ quản lý hơn
```

---

## 33. `addEventListener()` -- cách nên ưu tiên hiện nay

Thay vì:

```html
<button onclick="showGreeting()">Click</button>
```

có thể dùng:

```html
<button id="greetingButton">Click</button>

<script>
    const button = document.querySelector("#greetingButton");

    button.addEventListener("click", showGreeting);

    function showGreeting() {
        alert("Hello");
    }
</script>
```

Ưu điểm:

-   Tách HTML và JavaScript.
-   Có thể gắn nhiều listener.
-   Dễ bảo trì.
-   Dễ xóa listener khi cần.

---

## 34. Ví dụ chọn đồ vật

Ý tưởng trong slide: người dùng click nút **Mũ** hoặc **Giầy**, sau đó
hiển thị ảnh tương ứng.

Không nên dùng `document.write()` để thay đổi trang sau khi trang đã
tải, vì nó có thể ghi đè nội dung hiện tại.

Cách hiện đại:

```html
<p>Hãy chọn đồ vật mà bạn thích:</p>

<button id="hatButton">Mũ</button>
<button id="shoeButton">Giầy</button>

<div id="result"></div>

<script>
    const result = document.querySelector("#result");

    document
        .querySelector("#hatButton")
        .addEventListener("click", () => {
            result.innerHTML = '<img src="mu.jpg" alt="Mũ">';
        });

    document
        .querySelector("#shoeButton")
        .addEventListener("click", () => {
            result.innerHTML = '<img src="giay.jpg" alt="Giầy">';
        });
</script>
```

Nếu nội dung đến từ người dùng, không nên đưa trực tiếp vào `innerHTML`;
ưu tiên API DOM an toàn như `textContent` hoặc tạo element.

---

## 35. Đối tượng sự kiện `event`

Khi sự kiện xảy ra, handler có thể nhận một event object:

```javascript
button.addEventListener("click", (event) => {
    console.log(event);
});
```

Một số thuộc tính hữu ích:

```javascript
event.target;
event.type;
```

Ví dụ:

```javascript
button.addEventListener("click", (event) => {
    console.log(event.type);   // click
    console.log(event.target); // element được click
});
```

---


## 36. Các hàm timer

JavaScript cung cấp:

| Hàm | Ý nghĩa |
|---|---|
| `setTimeout()` | Chạy một lần sau một khoảng thời gian |
| `clearTimeout()` | Hủy timeout |
| `setInterval()` | Chạy lặp lại theo chu kỳ |
| `clearInterval()` | Hủy interval |

Trong trình duyệt, các hàm này gắn với môi trường `window`, nhưng thường
gọi trực tiếp:

```javascript
setTimeout(...);
setInterval(...);
```

---

## 37. `setTimeout()`

Slide cũ dùng chuỗi:

```javascript
setTimeout("alert('Hi');", 1000);
```

Không nên dùng chuỗi code.

Nên truyền function:

```javascript
setTimeout(() => {
    alert("Hi");
}, 1000);
```

`1000` milliseconds:

```text
1000 ms = 1 giây
```

---

## 38. Hủy `setTimeout()`

`setTimeout()` trả về một timer ID.

```javascript
const timeoutId = setTimeout(() => {
    console.log("Hello");
}, 5000);
```

Hủy trước khi chạy:

```javascript
clearTimeout(timeoutId);
```

Ví dụ:

```javascript
const timeoutId = setTimeout(() => {
    alert("Đã hết thời gian");
}, 3000);

const shouldCancel = confirm("Bạn có muốn hủy timer?");

if (shouldCancel) {
    clearTimeout(timeoutId);
}
```

---

## 39. `setInterval()`

Chạy lặp lại:

```javascript
const intervalId = setInterval(() => {
    console.log("Hi");
}, 1000);
```

Có thể hình dung:

```text
1 giây → Hi
2 giây → Hi
3 giây → Hi
4 giây → Hi
...
```

Interval tiếp tục cho đến khi bị hủy hoặc môi trường thực thi kết thúc.

---

## 40. Hủy `setInterval()`

```javascript
const intervalId = setInterval(() => {
    console.log("Hello");
}, 1000);

setTimeout(() => {
    clearInterval(intervalId);
}, 5000);
```

Ý tưởng:

```text
setInterval bắt đầu
       ↓
chạy lặp mỗi 1 giây
       ↓
sau khoảng 5 giây
       ↓
clearInterval
       ↓
dừng
```

---

## 41. `setTimeout()` và `setInterval()`

| Đặc điểm | `setTimeout()` | `setInterval()` |
|---|---|---|
| Số lần | Một lần | Lặp lại |
| Hủy bằng | `clearTimeout()` | `clearInterval()` |
| Dùng cho | Trì hoãn một công việc | Công việc định kỳ |

Ví dụ `setTimeout()`:

```javascript
setTimeout(() => {
    console.log("Chạy một lần");
}, 1000);
```

Ví dụ `setInterval()`:

```javascript
const id = setInterval(() => {
    console.log("Chạy lặp");
}, 1000);
```

---

## 42. Timer không đảm bảo chạy đúng tuyệt đối từng millisecond

Khoảng thời gian trong timer là thời gian **tối thiểu trước khi callback
có thể được đưa vào hàng chờ**, không phải cam kết chạy chính xác tại
đúng thời điểm đó.

Ví dụ:

```javascript
setTimeout(() => {
    console.log("Khoảng 1 giây hoặc muộn hơn");
}, 1000);
```

Điều này quan trọng khi xây dựng đồng hồ, animation hoặc tác vụ cần độ
chính xác cao.

---


## 43. `var` → ưu tiên `let` và `const`

Slide:

```javascript
var x = 0;
```

Code mới:

```javascript
let x = 0;
```

Nếu không gán lại:

```javascript
const animals = ["mèo", "hổ", "voi"];
```

---

## 44. `document.write()` không phù hợp cho cập nhật giao diện hiện đại

Slide dùng:

```javascript
document.write(x + "</br>");
```

Có hai vấn đề:

1.  Thẻ xuống dòng đúng là `<br>`, không phải `</br>`.
2.  `document.write()` có thể gây vấn đề nếu gọi sau khi trang đã tải.

Khi học thuật toán:

```javascript
console.log(x);
```

Khi cập nhật giao diện:

```javascript
element.textContent = value;
```

hoặc thao tác DOM phù hợp.

---

## 45. Không truyền chuỗi vào timer

Slide:

```javascript
setTimeout("alert('Hi');", 1000);
```

Nên viết:

```javascript
setTimeout(() => {
    alert("Hi");
}, 1000);
```

Tương tự:

```javascript
setInterval(() => {
    alert("Hi");
}, 1000);
```

---

## 46. Inline `onclick` vẫn chạy nhưng không nên là mặc định

Slide:

```html
<button onclick="showGreeting()">Click</button>
```

Nên biết cú pháp này vì thường gặp trong bài học.

Trong code hiện đại, ưu tiên:

```javascript
button.addEventListener("click", showGreeting);
```

---

## 47. Tên sự kiện

Slide ghi:

```text
onClick
onLoad
onUnload
onFocus
onBlur
onChange
onMouseOver
```

Trong thuộc tính HTML, thường viết:

```html
onclick
onload
onfocus
onblur
onchange
onmouseover
```

Với `addEventListener()`:

```javascript
"click"
"load"
"focus"
"blur"
"change"
"mouseover"
```

---

## 48. So sánh Boolean

Slide có dạng:

```javascript
if (ok == true) {
    // ...
}
```

Có thể viết gọn và rõ hơn:

```javascript
if (ok) {
    // ...
}
```

Nếu cần so sánh, ưu tiên:

```javascript
ok === true
```

thay vì `==`.

---

## 49. Ví dụ scope trong slide cần hiểu theo JavaScript hiện đại

Không nên chỉ học:

```text
trong hàm = local
ngoài hàm = global
```

Cần nhớ thêm:

```text
var       → function-scoped
let/const → block-scoped
```

Ví dụ:

```javascript
if (true) {
    const x = 10;
}

// x không tồn tại ở đây
```

---


## 50. Chương trình đếm bằng nút

```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Counter</title>
</head>
<body>
    <button id="increaseButton">Tăng</button>
    <p id="result">0</p>

    <script>
        let count = 0;

        const button = document.querySelector("#increaseButton");
        const result = document.querySelector("#result");

        button.addEventListener("click", () => {
            count++;
            result.textContent = count;
        });
    </script>
</body>
</html>
```

Kiến thức:

```text
biến
event
DOM
function
++
```

---

## 51. Đồng hồ đếm giây đơn giản

```html
<p id="timer">0</p>
<button id="startButton">Start</button>
<button id="stopButton">Stop</button>

<script>
    const timer = document.querySelector("#timer");
    const startButton = document.querySelector("#startButton");
    const stopButton = document.querySelector("#stopButton");

    let seconds = 0;
    let intervalId = null;

    startButton.addEventListener("click", () => {
        if (intervalId !== null) {
            return;
        }

        intervalId = setInterval(() => {
            seconds++;
            timer.textContent = seconds;
        }, 1000);
    });

    stopButton.addEventListener("click", () => {
        clearInterval(intervalId);
        intervalId = null;
    });
</script>
```

Kiến thức kết hợp:

-   Scope.
-   Event.
-   `if`.
-   `setInterval()`.
-   `clearInterval()`.
-   DOM.

---

## 52. Menu bằng `switch`

```javascript
const choice = prompt(`
1. Xem sản phẩm
2. Thêm sản phẩm
3. Xóa sản phẩm
`);

switch (choice) {
    case "1":
        alert("Xem sản phẩm");
        break;

    case "2":
        alert("Thêm sản phẩm");
        break;

    case "3":
        alert("Xóa sản phẩm");
        break;

    default:
        alert("Lựa chọn không hợp lệ");
}
```

`prompt()` trả về String nên `case` dùng:

```javascript
"1"
"2"
"3"
```

---

## 53. Nhập cho đến khi hợp lệ

```javascript
let number;

do {
    number = Number(prompt("Nhập số từ 1 đến 10:"));
} while (
    Number.isNaN(number) ||
    number < 1 ||
    number > 10
);

alert(`Bạn đã nhập ${number}`);
```

`do...while` phù hợp vì người dùng phải được hỏi **ít nhất một lần**.

---

## 54. Tìm phần tử trong mảng

```javascript
const numbers = [3, 8, 12, 20, 25];
const target = 12;

let found = false;

for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] === target) {
        found = true;
        break;
    }
}

console.log(found);
```

---


## 55. Quên `break` trong `switch`

```javascript
switch (value) {
    case 1:
        console.log("One");
        // quên break

    case 2:
        console.log("Two");
}
```

Nếu không muốn fall-through:

```javascript
case 1:
    console.log("One");
    break;
```

---

## 56. Vòng lặp vô hạn

Sai:

```javascript
let i = 0;

while (i < 10) {
    console.log(i);
}
```

Đúng:

```javascript
let i = 0;

while (i < 10) {
    console.log(i);
    i++;
}
```

---

## 57. Sai điều kiện `for`

Sai:

```javascript
const arr = [1, 2, 3];

for (let i = 0; i <= arr.length; i++) {
    console.log(arr[i]);
}
```

Lần cuối sẽ truy cập:

```javascript
arr[3]
```

và nhận:

```text
undefined
```

Đúng:

```javascript
for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
}
```

---

## 58. Nhầm tham số và đối số

Định nghĩa:

```javascript
function add(a, b) {
    return a + b;
}
```

`a`, `b` là:

```text
tham số
```

Gọi:

```javascript
add(10, 20);
```

`10`, `20` là:

```text
đối số
```

---

## 59. Quên `return`

Sai ý định:

```javascript
function multiply(a, b) {
    a * b;
}

const result = multiply(3, 4);

console.log(result); // undefined
```

Đúng:

```javascript
function multiply(a, b) {
    return a * b;
}
```

---

## 60. Truy cập biến ngoài scope

```javascript
function demo() {
    const x = 10;
}

// console.log(x); // ReferenceError
```

`x` chỉ tồn tại trong hàm.

---

## 61. Tạo nhiều interval khi click nhiều lần

Dễ gặp:

```javascript
button.addEventListener("click", () => {
    setInterval(() => {
        console.log("Tick");
    }, 1000);
});
```

Mỗi lần click lại tạo một interval mới.

Nên lưu ID và kiểm soát:

```javascript
let intervalId = null;

button.addEventListener("click", () => {
    if (intervalId !== null) {
        return;
    }

    intervalId = setInterval(() => {
        console.log("Tick");
    }, 1000);
});
```

---


## 62. Lựa chọn

```javascript
if (condition) {
    // ...
} else {
    // ...
}
```

```javascript
switch (value) {
    case value1:
        // ...
        break;

    default:
        // ...
}
```

---

## 63. Vòng lặp

```javascript
while (condition) {
    // ...
}
```

```javascript
do {
    // ...
} while (condition);
```

```javascript
for (let i = 0; i < 10; i++) {
    // ...
}
```

---

## 64. Hàm

```javascript
function functionName(parameter) {
    return value;
}
```

Gọi:

```javascript
functionName(argument);
```

---

## 65. Event

Inline:

```html
<button onclick="handleClick()">Click</button>
```

Hiện đại:

```javascript
button.addEventListener("click", handleClick);
```

---

## 66. Timer

```javascript
const timeoutId = setTimeout(callback, delay);
clearTimeout(timeoutId);
```

```javascript
const intervalId = setInterval(callback, delay);
clearInterval(intervalId);
```

---


## Bài tập

### Bài 1. Xếp loại bằng `switch`

Nhập điểm chữ:

```text
A, B, C, D, F
```

Yêu cầu:

```text
A → Xuất sắc
B → Tốt
C → Khá
D → Cần cố gắng
F → Không đạt
```

Các giá trị khác báo không hợp lệ.

---

### Bài 2. In từ 1 đến 100

Viết bằng:

1.  `while`
2.  `do...while`
3.  `for`

So sánh ba cách.

---

### Bài 3. Tổng số chẵn

Tính:

```text
2 + 4 + 6 + ... + 100
```

<details>
<summary><b>Gợi ý</b></summary>

```javascript
let total = 0;

for (let i = 2; i <= 100; i += 2) {
    total += i;
}
```

</details>

---

### Bài 4. Duyệt mảng

Cho:

```javascript
const students = ["Trần Hữu Đang", "davi", "david", "tina"];
```

In:

```text
1. Trần Hữu Đang
2. davi
3. david
4. tina
```

---

### Bài 5. Viết hàm tính diện tích

Viết:

```javascript
function rectangleArea(width, height) {
    // ...
}
```

Hàm trả về diện tích hình chữ nhật.

---

### Bài 6. Hàm kiểm tra số chẵn

```javascript
function isEven(number) {
    // ...
}
```

Kết quả phải là Boolean:

```text
true / false
```

---

### Bài 7. Confirm xóa dữ liệu

Khi người dùng click nút:

```text
Xóa
```

hiển thị:

```javascript
confirm("Bạn có chắc muốn xóa?");
```

Nếu OK:

```text
Đã xóa
```

Nếu Cancel:

```text
Đã hủy
```

---

### Bài 8. Event click

Tạo HTML:

```html
<button id="button">Đổi nội dung</button>
<p id="message">Nội dung ban đầu</p>
```

Khi click, đổi paragraph thành:

```text
Bạn vừa click nút!
```

Yêu cầu dùng:

```javascript
addEventListener()
```

---

### Bài 9. Timer

Tạo nút:

```text
Bắt đầu
Dừng
```

Khi bắt đầu:

```text
mỗi 1 giây tăng biến count
```

Khi dừng:

```javascript
clearInterval()
```

---

### Bài 10. Tìm lỗi

```javascript
let i = 0;

while (i < 5) {
    console.log(i);
}
```

Hãy giải thích:

-   Lỗi gì?
-   Vì sao?
-   Sửa thế nào?

---


### Câu hỏi tự kiểm tra

1. `if...else` dùng khi nào?
2.  `switch` phù hợp với loại bài toán nào?
3.  `break` có tác dụng gì trong `switch`?
4.  Fall-through là gì?
5.  `while` kiểm tra điều kiện trước hay sau?
6.  `do...while` chạy tối thiểu bao nhiêu lần?
7.  Ba thành phần của `for` là gì?
8.  Vì sao duyệt mảng thường dùng `i < array.length`?
9.  `break` trong vòng lặp làm gì?
10. `continue` làm gì?
11. Hàm giúp ích gì?
12. Tham số và đối số khác nhau thế nào?
13. `return` có tác dụng gì?
14. Hàm không `return` giá trị cụ thể trả về gì?
15. `confirm()` trả về kiểu dữ liệu gì?
16. Nhấn OK trong `confirm()` trả về gì?
17. Biến global và local khác nhau thế nào?
18. `var` và `let` khác nhau về scope như thế nào?
19. Event là gì?
20. `onclick` và `addEventListener("click", ...)` khác nhau thế nào?
21. `setTimeout()` chạy bao nhiêu lần?
22. `setInterval()` chạy như thế nào?
23. Dùng hàm nào để hủy timeout?
24. Dùng hàm nào để hủy interval?
25. Vì sao không nên truyền chuỗi code vào `setTimeout()`?

---


### Checklist kiến thức cần thuộc

- [ ] Biết viết `if...else`.
- [ ] Biết viết `switch`.
- [ ] Hiểu `case`, `break`, `default`.
- [ ] Hiểu fall-through.
- [ ] Biết viết `while`.
- [ ] Biết viết `do...while`.
- [ ] Biết viết `for`.
- [ ] Biết tránh vòng lặp vô hạn.
- [ ] Biết duyệt Array.
- [ ] Biết dùng `break` và `continue`.
- [ ] Biết định nghĩa và gọi hàm.
- [ ] Phân biệt parameter và argument.
- [ ] Biết dùng `return`.
- [ ] Biết dùng `confirm()`.
- [ ] Hiểu local/global scope.
- [ ] Hiểu block scope của `let`/`const`.
- [ ] Biết các event cơ bản.
- [ ] Biết dùng `addEventListener()`.
- [ ] Biết `setTimeout()` và `clearTimeout()`.
- [ ] Biết `setInterval()` và `clearInterval()`.

---

## Tổng kết

Sơ đồ kiến thức:

```text
Cấu trúc điều khiển
├── Lựa chọn
│   ├── if
│   ├── if...else
│   └── switch
│
└── Lặp
    ├── while
    ├── do...while
    └── for

Hàm
├── tham số
├── đối số
├── return
└── scope

Sự kiện
├── click
├── focus / blur
├── change
└── mouse events

Timer
├── setTimeout
├── clearTimeout
├── setInterval
└── clearInterval
```

Một ví dụ tổng hợp:

```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>WEB1042 - Bài 3</title>
</head>
<body>
    <button id="startButton">Bắt đầu</button>
    <button id="stopButton">Dừng</button>
    <p id="output">0</p>

    <script>
        const startButton = document.querySelector("#startButton");
        const stopButton = document.querySelector("#stopButton");
        const output = document.querySelector("#output");

        let count = 0;
        let intervalId = null;

        function updateOutput() {
            count++;
            output.textContent = count;
        }

        startButton.addEventListener("click", () => {
            if (intervalId !== null) {
                return;
            }

            const ok = confirm("Bắt đầu đếm?");

            if (ok) {
                intervalId = setInterval(updateOutput, 1000);
            }
        });

        stopButton.addEventListener("click", () => {
            clearInterval(intervalId);
            intervalId = null;
        });
    </script>
</body>
</html>
```

Đoạn code này kết hợp:

-   Biến và scope.
-   Hàm.
-   `if`.
-   Boolean.
-   `confirm()`.
-   Event.
-   DOM.
-   `setInterval()`.
-   `clearInterval()`.

> [!WARNING]
> 🚀 **Lưu ý:** Slide 3 sử dụng một số cú pháp JavaScript/HTML cũ như `var`, `document.write()`, inline `onclick` và truyền chuỗi vào timer. Cần nhận biết các cú pháp này theo đúng ngữ cảnh bài giảng.
