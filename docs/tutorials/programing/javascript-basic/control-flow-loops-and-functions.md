# Bài 3. Cấu trúc điều khiển, vòng lặp và hàm trong JavaScript

*> Tài liệu học tập được biên soạn lại từ* **WEB1042 -- Slide 3\*\****.\\*

*> Nội dung giữ kiến thức cốt lõi của slide, đồng thời chuẩn hóa cú pháp*

*> và bổ sung cách viết JavaScript hiện đại.*

## 1. Mục tiêu bài học

Sau bài này, bạn cần:

- Sử dụng được `if...else` và `switch`.
- Hiểu vai trò của `case`, `break`, `default` và fall-through.
- Sử dụng được `while`, `do...while` và `for`.
- Biết duyệt Array bằng vòng lặp.
- Biết sử dụng `break` và `continue`.
- Định nghĩa và gọi hàm.
- Phân biệt tham số và đối số.
- Biết sử dụng `return`.
- Hiểu phạm vi biến: global, function scope và block scope.
- Biết kết hợp cấu trúc điều khiển, vòng lặp và hàm để giải quyết bài toán.

---
---


## 2. Cấu trúc lựa chọn

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

### Lệnh lựa chọn kép `if...else`

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

### Lệnh đa lựa chọn `switch`

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

`switch` phù hợp khi cần so sánh \*\*một biểu thức với nhiều giá trị cụ

thể\*\*.

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

### Vai trò của `break` trong `switch`

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

Hiện tượng này gọi là **fall-through\*\***.

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

### `switch` và so sánh nghiêm ngặt

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


## 3. Vòng lặp trong JavaScript

### 3.1. Các loại vòng lặp

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

### Vòng lặp `while`

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

   /     \\

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

### Lỗi lặp vô hạn

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

### Vòng lặp `do...while`

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

`do...while` **chạy thân vòng lặp ít nhất một lần\*\***.

```javascript

let x = 100;

do {

    console.log(x);

} while (x < 10);

```

Dù điều kiện sai ngay từ đầu, `100` vẫn được in một lần.

---

### So sánh `while` và `do...while`

`while`:

```javascript

while (condition) {

    // code

}

```

Kiểm tra điều kiện **trước\*\*** khi chạy.

`do...while`:

```javascript

do {

    // code

} while (condition);

```

Chạy **trước\*\***, kiểm tra điều kiện **sau\*\***.

| Đặc điểm | `while` | `do...while` |

|---|---|---|

| Kiểm tra điều kiện | Trước | Sau |

| Có thể chạy 0 lần | Có | Không |

| Chạy tối thiểu | 0 lần | 1 lần |

---

### Vòng lặp `for`

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

### Ví dụ vòng `for`

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

### Duyệt mảng bằng `for`

Slide sử dụng:

```javascript

var convat = **new** Array("meo", "ho", "voi");

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

### `for...of` -- cách hiện đại để duyệt giá trị mảng

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

### `break` và `continue` trong vòng lặp

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


## 4. Hàm trong JavaScript

### 4.1. Hàm là gì?

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

### Hàm có tham số

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

### Hàm trả về giá trị

Dùng `return`:

```javascript

function multiply(x, y) {

    return x \* y;

}

```

Gọi hàm:

```javascript

const product = multiply(3, 4);

console.log(product); // 12

```

`return` có hai tác dụng quan trọng:

```text

1\. Trả giá trị ra ngoài hàm.

2\. Kết thúc việc thực thi hàm tại vị trí return.

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

### Hàm không trả về giá trị

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

### Function declaration và arrow function

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


## 5. Hộp thoại xác nhận `confirm()`

### 5.1. `confirm()` là gì?

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

### Dùng `confirm()` với `if`

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

### Ví dụ hàm xác nhận

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


## 6. Phạm vi biến

### 6.1. Biến toàn cục

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

### Biến cục bộ trong hàm

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

### Function scope và block scope

Đây là điểm cần bổ sung so với slide cũ.

`var` có **function scope\*\***:

```javascript

function demo() {

    if (true) {

        var x = 10;

    }

    console.log(x); // 10

}

```

`let` và `const` có **block scope\*\***:

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

### Tránh tạo biến global ngoài ý muốn

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


## 7. Ví dụ tổng hợp

### 7.1. Menu bằng `switch`

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

`prompt()` trả về String nên các `case` sử dụng `"1"`, `"2"` và `"3"`.

### 7.2. Nhập cho đến khi hợp lệ

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

`do...while` phù hợp vì người dùng phải được hỏi ít nhất một lần.

### 7.3. Tìm phần tử trong mảng

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

### Demo trực tiếp

<div class="tutorial-live-demo">
    <label for="js-loop-input">Nhập số lượng:</label>
    <input id="js-loop-input" type="number" min="1" max="10" value="5">
    <button type="button" id="js-loop-button">Chạy vòng lặp</button>
    <pre id="js-loop-result">Kết quả sẽ hiển thị ở đây.</pre>

    <script>
        function generateSequence(limit) {
            const numbers = [];
            for (let index = 1; index <= limit; index++) {
                numbers.push(index);
            }
            return numbers.join(' - ');
        }

        document.getElementById('js-loop-button').addEventListener('click', () => {
            const limit = Number(document.getElementById('js-loop-input').value);
            document.getElementById('js-loop-result').textContent =
                `Xin chào! Dãy số là: ${generateSequence(limit)}`;
        });
    </script>
</div>

## 8. Lỗi thường gặp

### Quên `break` trong `switch`

Nếu không chủ đích sử dụng fall-through, cần đặt `break` sau từng `case`.

### Vòng lặp vô hạn

```javascript
let i = 0;

while (i < 10) {
    console.log(i);
    i++;
}
```

Biến điều khiển phải thay đổi để vòng lặp tiến tới điều kiện dừng.

### Sai điều kiện khi duyệt Array

Không nên:

```javascript
for (let i = 0; i <= arr.length; i++) {
    // ...
}
```

Nên dùng:

```javascript
for (let i = 0; i < arr.length; i++) {
    // ...
}
```

### Quên `return`

```javascript
function multiply(a, b) {
    return a * b;
}
```

Nếu không `return`, hàm trả về `undefined`.

### Truy cập biến ngoài scope

```javascript
function demo() {
    const x = 10;
}

// console.log(x); // ReferenceError
```

---

## 9. Bài tập

### Bài 1. Xếp loại bằng `switch`

Nhập điểm chữ `A`, `B`, `C`, `D`, `F` và hiển thị xếp loại tương ứng. Các giá trị khác phải báo không hợp lệ.

### Bài 2. In từ 1 đến 100

Thực hiện lần lượt bằng:

1. `while`
2. `do...while`
3. `for`

Sau đó so sánh ba cách.

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

### Bài 4. Duyệt mảng

Cho:

```javascript
const students = ["Trần Hữu Đang", "davi", "david", "tina"];
```

In danh sách kèm số thứ tự.

### Bài 5. Viết hàm tính diện tích

Viết hàm `rectangleArea(width, height)` trả về diện tích hình chữ nhật.

### Bài 6. Hàm kiểm tra số chẵn

Viết hàm:

```javascript
function isEven(number) {
    // ...
}
```

Hàm phải trả về Boolean.

### Câu hỏi tự kiểm tra

1. `switch` phù hợp với loại bài toán nào?
2. `break` có tác dụng gì?
3. Fall-through là gì?
4. `while` và `do...while` khác nhau thế nào?
5. Ba thành phần của `for` là gì?
6. Vì sao duyệt mảng thường dùng `i < array.length`?
7. `break` và `continue` khác nhau thế nào?
8. Tham số và đối số khác nhau thế nào?
9. `return` có tác dụng gì?
10. `var` và `let` khác nhau về scope như thế nào?

### Checklist kiến thức cần thuộc

- [ ] Biết viết `if...else` và `switch`.
- [ ] Hiểu `case`, `break`, `default`.
- [ ] Biết `while`, `do...while`, `for`.
- [ ] Biết tránh vòng lặp vô hạn.
- [ ] Biết duyệt Array.
- [ ] Biết `break` và `continue`.
- [ ] Biết định nghĩa và gọi hàm.
- [ ] Phân biệt parameter và argument.
- [ ] Biết dùng `return`.
- [ ] Hiểu global, function scope và block scope.

---

## 10. Tổng kết

```text
Cấu trúc điều khiển
├── if...else
└── switch

Vòng lặp
├── while
├── do...while
└── for

Hàm
├── parameter
├── argument
├── return
└── scope
```

Bài này xây dựng nền tảng về **luồng chương trình và tổ chức logic bằng hàm**. Bài tiếp theo sẽ sử dụng các hàm này để phản ứng với **sự kiện của người dùng** và thực hiện công việc theo **thời gian**.
