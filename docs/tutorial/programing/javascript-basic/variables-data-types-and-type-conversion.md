
# Biến, kiểu dữ liệu và ép kiểu trong JavaScript

## 1. Mục tiêu bài học

Sau bài này, bạn cần:

- Hiểu biến và cách khai báo biến trong JavaScript.
- Phân biệt `let`, `const` và `var` ở mức cơ bản.
- Nhận biết các kiểu dữ liệu thường gặp: Number, String, Boolean, Array, `null`, `undefined`.
- Sử dụng một số thuộc tính và phương thức cơ bản của Number, String và Array.
- Hiểu sự khác nhau giữa ép kiểu ngầm định và ép kiểu tường minh.
- Biết sử dụng `Number()`, `String()` và `Boolean()` để chuyển đổi dữ liệu.
- Nhận biết các trường hợp ép kiểu dễ tạo kết quả ngoài ý muốn.


---

---


## 2. Biến trong JavaScript

### 2.1. Biến là gì?

Biến dùng để lưu trữ dữ liệu trong chương trình.

Cú pháp truyền thống trong slide:

```javascript

var tenBien;

```

Ví dụ:

```javascript

var x;

var name;

var age;

```

Có thể khai báo nhiều biến trên một dòng:

```javascript

var x, y, zeta;

```

Có thể vừa khai báo vừa khởi tạo:

```javascript

var x = 1;

var y = "hello";

```

Hoặc:

```javascript

var x = 1, y = "hello";

```

### JavaScript hiện đại

Trong code mới, nên ưu tiên:

```javascript

let age = 18;

const name = "Trần Hữu Đang";

```

Quy tắc đơn giản:

-   `const`: dùng khi không cần gán lại biến.

-   `let`: dùng khi giá trị sẽ thay đổi.

-   `var`: cần biết để đọc code cũ.

Ví dụ:

```javascript

const fullName = "Trần Hữu Đang";

let score = 8;

score = 9;

```


---


### 2.2. Quy tắc đặt tên biến

Tên biến có thể chứa chữ cái, chữ số, `_` và `$`, nhưng không được bắt

đầu bằng chữ số.

Đúng:

```javascript

let name;

let studentName;

let student1;

let _count;

let $price;

```

Sai:

```javascript

// let 1student;

// let student name;

```

Nên dùng **camelCase**:

```javascript

let studentName;

let totalScore;

let productPrice;

```

Không nên:

```javascript

let a;

let abc;

let x1;

```

nếu tên đó không diễn đạt ý nghĩa của dữ liệu.


---


## 3. Kiểu dữ liệu

### 3.1. Tổng quan kiểu dữ liệu

Slide giới thiệu:

-   Kiểu số.

-   Chuỗi ký tự.

-   Boolean.

-   Mảng.

-   Object.

-   `null`.

-   `undefined`.

Trong JavaScript hiện đại, các primitive type quan trọng gồm:

```text

number

string

boolean

undefined

null

bigint

symbol

```

Ngoài ra còn có:

```text

object

```

Mảng trong JavaScript là một dạng object đặc biệt.

Có thể kiểm tra kiểu bằng:

```javascript

console.log(typeof 10);        // "number"

console.log(typeof "Hello");   // "string"

console.log(typeof true);      // "boolean"

console.log(typeof undefined); // "undefined"

```


---


### 3.2. Number

JavaScript truyền thống không tách `Integer`, `Float`, `Double` thành

các kiểu số riêng như nhiều ngôn ngữ khác. Phần lớn giá trị số thông

thường thuộc kiểu `number`.

Ví dụ:

```javascript

const a = 20;

const b = 1.5;

const c = 0xD;

```

`0xD` là số hexadecimal:

```text

0xD = 13

```

### Demo số hexadecimal

```html

<!DOCTYPE html>

<html lang="vi">

<head>

    <meta charset="UTF-8">

    <title>Hexadecimal Numbers</title>

</head>

<body>

    <p>Demo hexadecimal</p>

    <script>

        const h = 0xE;

        const i = 0x2;

        const j = h * i;

        alert(j);

    </script>

</body>

</html>

```

Ta có:

```text

0xE = 14

0x2 = 2

14 × 2 = 28

```

Kết quả:

```text

28

```


---


#### `NaN` và `Number.isNaN()`

`NaN` có nghĩa là:

```text

Not-a-Number

```

Slide sử dụng:

```javascript

alert(isNaN("4"));

alert(isNaN("four"));

```

Kết quả:

```javascript

isNaN("4");    // false

isNaN("four"); // true

```

Điểm cần chú ý: hàm `isNaN()` toàn cục có thực hiện ép kiểu.

Ví dụ:

```javascript

console.log(isNaN("4")); // false

```

Chuỗi `"4"` được chuyển thành số `4` trước khi kiểm tra.

Trong code hiện đại, khi muốn kiểm tra chính xác một giá trị có phải

`NaN` hay không, có thể dùng:

```javascript

Number.isNaN(value);

```

Ví dụ:

```javascript

console.log(Number.isNaN(NaN));     // true

console.log(Number.isNaN("hello")); // false

```


---


#### Đối tượng `Math`

JavaScript cung cấp đối tượng `Math` với nhiều hàm toán học.

| Phương thức | Ý nghĩa | Ví dụ | Kết quả |
|---|---|---|---|
| `Math.random()` | Số ngẫu nhiên từ 0 đến nhỏ hơn 1 | `Math.random()` | Thay đổi |
| `Math.abs(x)` | Giá trị tuyệt đối | `Math.abs(-2)` | `2` |
| `Math.pow(x, y)` | x mũ y | `Math.pow(2, 3)` | `8` |
| `Math.round(x)` | Làm tròn | `Math.round(2.6)` | `3` |

Ví dụ:

```javascript

console.log(Math.abs(-10));

console.log(Math.pow(2, 3));

console.log(Math.round(2.6));

console.log(Math.random());

```

JavaScript hiện đại cũng hỗ trợ toán tử lũy thừa:

```javascript

console.log(2 ** 3); // 8

```

### Sinh số nguyên ngẫu nhiên từ 1 đến 10

```javascript

const randomNumber = Math.floor(Math.random() * 10) + 1;

console.log(randomNumber);

```


---



### 3.3. String

String dùng để biểu diễn văn bản.

Có thể dùng:

```javascript

const a = "Hello world";

const b = 'Hello world';

const c = `Hello world`;

```

Dấu backtick cho phép template literal:

```javascript

const name = "Trần Hữu Đang";

console.log(`Xin chào ${name}!`);

```


---


#### Escape sequence

Một số escape sequence:

| Ký tự | Ý nghĩa |

|---|---|
| `\'` | Dấu `'` |
| `\"` | Dấu `"` |
| `\\` | Dấu `\` |
| `\t` | Tab |
| `\n` | Xuống dòng |
| `\b` | Backspace |

Ví dụ từ slide:

```javascript

alert("Hello\t'hi'\ngoodbye!");

```

Có thể hình dung kết quả:

```text

Hello    'hi'

goodbye!

```


---


#### Thuộc tính `length`

`length` cho biết độ dài chuỗi.

```javascript

const x = "Toi la String.";

alert(x.length);

```

Có thể kiểm tra bằng console:

```javascript

const message = "Hello";

console.log(message.length); // 5

```


---


#### `substring()`

Slide ghi `subString`, nhưng tên phương thức JavaScript đúng là:

```javascript

substring()

```

Ví dụ:

```javascript

const x = "Toi la String.";

alert(x.substring(0, 3));

```

Kết quả:

```text

Toi

```

Quy tắc:

```javascript

string.substring(start, end);

```

Ký tự tại `start` được lấy, ký tự tại `end` không được lấy.

Ví dụ:

```javascript

const text = "JavaScript";

console.log(text.substring(0, 4)); // Java

```


---


#### Nối chuỗi với `concat()` và template literal

Dùng để nối chuỗi:

```javascript

const firstString = "Day la mot xau ky tu";

const finalString = firstString.concat(" Them mot xau ky tu nua");

alert(finalString);

```

Tuy nhiên, code hiện đại thường dùng:

```javascript

const firstString = "Hello";

const secondString = "World";

const result = firstString + " " + secondString;

console.log(result);

```

Hoặc template literal:

```javascript

const firstName = "Trần Hữu";

const lastName = "Đang";

const fullName = `${firstName} ${lastName}`;

console.log(fullName);

```


---


#### `toUpperCase()` và `toLowerCase()`

Chuyển thành chữ hoa:

```javascript

const text = "Day la mot xau ky tu";

const result = text.toUpperCase();

console.log(result);

```

Kết quả:

```text

DAY LA MOT XAU KY TU

```

Chuyển thành chữ thường:

```javascript

const text = "HELLO JAVASCRIPT";

const result = text.toLowerCase();

console.log(result);

```

Kết quả:

```text

hello javascript

```


---



### 3.4. Boolean

Boolean chỉ có hai giá trị:

```javascript

true

false

```

Ví dụ:

```javascript

const isStudent = true;

const isAdmin = false;

```

Boolean thường xuất hiện trong điều kiện:

```javascript

const age = 20;

if (age > 18) {

    alert("Hi");

}

```

Biểu thức:

```javascript

age > 18

```

sẽ trả về `true` hoặc `false`.


---


### 3.5. Array

Slide mô tả mảng là nơi lưu tập dữ liệu.

Cách cũ:

```javascript

var animals = new Array();

animals[0] = "meo";

animals[1] = "ho";

animals[2] = "voi";

```

Hoặc:

```javascript

var animals = new Array("meo", "ho", "voi");

```

### Cách nên dùng hiện nay

Array literal ngắn và dễ đọc hơn:

```javascript

const animals = ["meo", "ho", "voi"];

```

Truy cập phần tử:

```javascript

console.log(animals[0]); // meo

console.log(animals[1]); // ho

console.log(animals[2]); // voi

```

Chỉ số mảng bắt đầu từ:

```text

0

```

Độ dài:

```javascript

console.log(animals.length); // 3

```

Thêm phần tử:

```javascript

animals.push("cho");

```

Mảng JavaScript thực tế có thể chứa nhiều kiểu dữ liệu khác nhau:

```javascript

const values = [10, "Hello", true, null];

```

Dù vậy, trong nhiều bài toán, giữ các phần tử cùng loại giúp code dễ

hiểu hơn.


---


### 3.6. `null` và `undefined`

#### `null`

`null` thường được dùng để biểu diễn việc **chủ động không có giá trị**.

```javascript

let selectedUser = null;

```

`null` khác chuỗi rỗng:

```javascript

const a = null;

const b = "";

```

Hai giá trị này không giống nhau.


---


#### `undefined`

Một biến được khai báo nhưng chưa gán giá trị có giá trị `undefined`.

```javascript

let x;

console.log(x);

```

Kết quả:

```text

undefined

```

So sánh:

```javascript

let a;

let b = null;

let c = "";

console.log(a); // undefined

console.log(b); // null

console.log(c); // ""

```

Có thể hiểu cơ bản:

```text

undefined → chưa có/chưa được gán giá trị

null      → lập trình viên chủ động đặt là không có giá trị

""        → có giá trị, nhưng là chuỗi rỗng

```


---



## 4. Ép kiểu dữ liệu

### 4.1. Ép kiểu ngầm định

JavaScript đôi khi tự động chuyển kiểu.

Ví dụ từ slide:

```javascript

const x = 100;

alert("Hello" + x);

```

Kết quả:

```text

Hello100

```

Ở đây số `100` được chuyển thành chuỗi để nối với `"Hello"`.

Một ví dụ cần đặc biệt chú ý:

```javascript

console.log("5" + 2); // "52"

console.log("5" - 2); // 3

```

Vì vậy, ép kiểu ngầm định có thể tạo ra kết quả khó đoán nếu không hiểu

quy tắc.


---


### 4.2. Ép kiểu tường minh

Lập trình viên chủ động yêu cầu chuyển kiểu.

### Number → String

```javascript

const x = String(100);

console.log(x);

console.log(typeof x);

```

Kết quả:

```text

100

string

```

### String → Number

```javascript

const x = "100";

const y = Number(x);

console.log(y);

console.log(typeof y);

```

Kết quả:

```text

100

number

```

Nếu không thể chuyển thành số:

```javascript

const value = Number("hello");

console.log(value); // NaN

```

### Chuyển sang Boolean

```javascript

console.log(Boolean(1));     // true

console.log(Boolean(0));     // false

console.log(Boolean(""));    // false

console.log(Boolean("abc")); // true

```


---



## 5. Ví dụ tổng hợp: từ dữ liệu nhập đến kiểu dữ liệu

Ví dụ sau minh họa cách dữ liệu dạng chuỗi được chuyển thành số trước khi sử dụng:

```javascript
const input = "18";
const age = Number(input);

console.log(age);        // 18
console.log(typeof age); // "number"
```

Nếu dữ liệu không thể chuyển thành số:

```javascript
const value = Number("hello");

console.log(value);               // NaN
console.log(Number.isNaN(value)); // true
```

Luồng cần ghi nhớ:

```text
Dữ liệu ban đầu
      ↓
Xác định kiểu dữ liệu
      ↓
Chuyển kiểu khi cần
      ↓
Sử dụng dữ liệu đúng mục đích
```


---


### Demo trực tiếp

<div class="tutorial-live-demo">
    <label for="js-type-input">Nhập một giá trị:</label>
    <input id="js-type-input" type="text" placeholder="Ví dụ: 123 hoặc true">
    <button type="button" id="js-type-button">Xem kiểu dữ liệu</button>
    <pre id="js-type-result">Kết quả sẽ hiển thị ở đây.</pre>

    <script>
        const typeInput = document.getElementById('js-type-input');
        const typeButton = document.getElementById('js-type-button');
        const typeResult = document.getElementById('js-type-result');

        typeButton.addEventListener('click', () => {
            const rawValue = typeInput.value;
            const numberValue = Number(rawValue);

            typeResult.textContent = [
                `Giá trị gốc: ${rawValue || '(rỗng)'}`,
                `typeof giá trị gốc: ${typeof rawValue}`,
                `Number(value): ${numberValue}`,
                `Boolean(value): ${Boolean(rawValue)}`,
            ].join('\n');
        });
    </script>
</div>

## 6. Bài tập

### Bài 1. Khai báo biến

Khai báo các thông tin:

- Họ tên.
- Tuổi.
- Điểm trung bình.
- Trạng thái sinh viên.

Yêu cầu sử dụng `const` hoặc `let` phù hợp và in kết quả ra Console.

### Bài 2. Kiểm tra kiểu dữ liệu

Cho các giá trị:

```javascript
const a = 10;
const b = "10";
const c = true;
let d;
const e = null;
```

Dùng `typeof` để kiểm tra từng giá trị và giải thích kết quả.

### Bài 3. Xử lý chuỗi

Cho:

```javascript
const text = "JavaScript";
```

Hãy in:

- Độ dài chuỗi.
- 4 ký tự đầu.
- Chuỗi viết hoa.
- Chuỗi viết thường.

<details>
<summary><b>Gợi ý</b></summary>

```javascript
console.log(text.length);
console.log(text.substring(0, 4));
console.log(text.toUpperCase());
console.log(text.toLowerCase());
```

</details>

### Bài 4. Ép kiểu

Dự đoán kết quả trước khi chạy:

```javascript
console.log("5" + 2);
console.log("5" - 2);
console.log(Number("100"));
console.log(String(100));
console.log(Boolean(""));
console.log(Boolean("JavaScript"));
```

Sau đó chạy bằng Console và đối chiếu kết quả.

### Câu hỏi tự kiểm tra

1. Khi nào nên dùng `const` và khi nào dùng `let`?
2. JavaScript có kiểu `Integer` riêng không?
3. `NaN` có ý nghĩa gì?
4. `null` và `undefined` khác nhau ở điểm nào?
5. `Number()` dùng để làm gì?
6. Vì sao `"5" + 2` và `"5" - 2` cho kết quả khác nhau?
7. `typeof []` trả về gì? Cách nào phù hợp để kiểm tra một giá trị có phải Array?

### Checklist kiến thức cần thuộc

- [ ] Biết khai báo biến bằng `let` và `const`.
- [ ] Biết quy tắc đặt tên biến.
- [ ] Hiểu Number, String và Boolean.
- [ ] Hiểu Array, `null` và `undefined`.
- [ ] Biết sử dụng `typeof`.
- [ ] Biết một số phương thức cơ bản của String và Math.
- [ ] Phân biệt ép kiểu ngầm định và tường minh.
- [ ] Biết dùng `Number()`, `String()` và `Boolean()`.


---


## 7. Tổng kết

Bài học đi theo luồng:

```text
Biến
 ↓
Kiểu dữ liệu
 ↓
Number / String / Boolean / Array
 ↓
null / undefined
 ↓
Ép kiểu
```

Sau khi nắm chắc phần này, bạn đã có nền tảng để chuyển sang **Bài 2: Toán tử, biểu thức và điều khiển chương trình**, nơi các giá trị sẽ được đưa vào phép tính, phép so sánh và điều kiện.
