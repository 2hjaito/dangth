# Bài 2. Biến, kiểu dữ liệu, toán tử và biểu thức

*> Tài liệu học tập được biên soạn lại từ* ****WEB1042 -- Slide 2*****.\*

*> Nội dung giữ kiến thức cốt lõi của bài giảng, chuẩn hóa code block và*

*> bổ sung ghi chú JavaScript hiện đại.*

## 1. Mục tiêu bài học

Sau bài này, bạn cần nắm được:

-   Biến và cách khai báo biến.

-   Các kiểu dữ liệu cơ bản.

-   Kiểu số, chuỗi, Boolean, mảng, `null`, `undefined`.

-   Ép kiểu ngầm định và tường minh.

-   Các nhóm toán tử.

-   Sự khác nhau giữa tiền tố và hậu tố của `++`.

-   Hàm `prompt()`.

-   Cấu trúc điều khiển và câu lệnh `if`.

-   Điều kiện phức tạp.

-   Cách debug JavaScript bằng công cụ trình duyệt.

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

Nên dùng ****camelCase****:

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

| `\\'` | Dấu `'` |

| `\\"` | Dấu `"` |

| `\\\` | Dấu `\` |

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

var animals = **new** Array();

animals[0] = "meo";

animals[1] = "ho";

animals[2] = "voi";

```

Hoặc:

```javascript

var animals = **new** Array("meo", "ho", "voi");

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

`null` thường được dùng để biểu diễn việc ****chủ động không có giá trị****.

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


## 5. Toán tử và biểu thức

### 5.1. Toán tử số học

| Toán tử | Ý nghĩa |

|---|---|

| `+` | Cộng |

| `-` | Trừ |

| `*` | Nhân |

| `/` | Chia |

| `%` | Chia lấy dư |

| `**` | Lũy thừa |

Ví dụ:

```javascript

const a = 10;

const b = 3;

console.log(a + b); // 13

console.log(a - b); // 7

console.log(a * b); // 30

console.log(a / b); // 3.333...

console.log(a % b); // 1

console.log(a ** b); // 1000

```

### Kiểm tra số chẵn

```javascript

const number = 10;

if (number % 2 === 0) {

    console.log("Số chẵn");

}

```

---

### 5.2. Toán tử logic và bitwise

Slide liệt kê:

```text

&

|

^

!

```

Cần phân biệt hai nhóm.

#### Toán tử logic

| Toán tử | Ý nghĩa |

|---|---|

| `&&` | AND |

| `||` | OR |

| `!` | NOT |

Ví dụ:

```javascript

const age = 20;

const hasTicket = true;

if (age >= 18 && hasTicket) {

    console.log("Được vào");

}

```

OR:

```javascript

const role = "admin";

if (role === "admin" || role === "manager") {

    console.log("Có quyền quản lý");

}

```

NOT:

```javascript

const isLoggedIn = false;

if (!isLoggedIn) {

    console.log("Vui lòng đăng nhập");

}

```

### Bitwise

Các toán tử:

```text

&

|

^

```

cũng tồn tại trong JavaScript nhưng là ****bitwise operator****, không nên

nhầm với `&&` và `||`.

---

### 5.3. Toán tử so sánh

| Toán tử | Ý nghĩa |

|---|---|

| `>` | Lớn hơn |

| `<` | Nhỏ hơn |

| `>=` | Lớn hơn hoặc bằng |

| `<=` | Nhỏ hơn hoặc bằng |

| `==` | Bằng sau ép kiểu |

| `!=` | Khác sau ép kiểu |

| `===` | Bằng cả giá trị và kiểu |

| `!==` | Khác giá trị hoặc kiểu |

Ví dụ:

```javascript

console.log(10 > 5);   // true

console.log(10 < 5);   // false

console.log(10 >= 10); // true

```

### `==` và `===`

```javascript

console.log(1 == "1");  // true

console.log(1 === "1"); // false

```

Trong code mới, nên ưu tiên:

```javascript

===

!==

```

---

### 5.4. Toán tử một ngôi

Slide đề cập:

```text

\+

-

++

--

```

Ví dụ:

```javascript

let x = 4;

x++;

console.log(x); // 5

```

Giảm:

```javascript

let x = 4;

x--;

console.log(x); // 3

```

Unary plus:

```javascript

const value = +"123";

console.log(value);        // 123

console.log(typeof value); // number

```

Unary minus:

```javascript

const x = 10;

const y = -x;

console.log(y); // -10

```

---

### 5.5. Prefix và Postfix: `++x` và `x++`

Đây là phần rất dễ nhầm.

### Prefix: `++x`

```javascript

let x = 4;

let y = ++x;

console.log(x);

console.log(y);

```

Kết quả:

```text

x = 5

y = 5

```

Vì:

```text

1\. tăng x

2\. lấy giá trị mới của x

3\. gán vào y

```

### Postfix: `x++`

```javascript

let x = 4;

let y = x++;

console.log(x);

console.log(y);

```

Kết quả:

```text

x = 5

y = 4

```

Vì:

```text

1\. lấy giá trị hiện tại của x để gán cho y

2\. sau đó mới tăng x

```

Bảng nhớ nhanh:

| Biểu thức | `x` sau lệnh | Giá trị biểu thức |

|---|---:|---:|

| `++x` với `x = 4` | 5 | 5 |

| `x++` với `x = 4` | 5 | 4 |

---


## 6. Nhập dữ liệu và cấu trúc điều khiển

### 6.1. Hàm `prompt()`

`prompt()` mở hộp thoại cho người dùng nhập dữ liệu.

```javascript

const x = prompt();

alert(x);

```

Có thể thêm lời nhắc:

```javascript

const name = prompt("Nhập tên của bạn:");

alert("Xin chào " + name);

```

### Quan trọng: `prompt()` trả về chuỗi

Ví dụ:

```javascript

const age = prompt("Nhập tuổi:");

console.log(typeof age); // string

```

Nếu cần số:

```javascript

const age = Number(prompt("Nhập tuổi:"));

```

Ví dụ tính tổng:

```javascript

const a = Number(prompt("Nhập a:"));

const b = Number(prompt("Nhập b:"));

const total = a + b;

alert(total);

```

Nếu không dùng `Number()`:

```javascript

const a = prompt("Nhập a:");

const b = prompt("Nhập b:");

alert(a + b);

```

Nhập `10` và `20` có thể cho:

```text

1020

```

thay vì:

```text

30

```

---


### 6.2. Ba cấu trúc điều khiển

Slide chia thành:

1\.  Cấu trúc tuần tự.

2\.  Cấu trúc lựa chọn.

3\.  Cấu trúc lặp.

### Tuần tự

Các câu lệnh chạy từ trên xuống:

```javascript

const a = 10;

const b = 20;

const total = a + b;

console.log(total);

```

### Lựa chọn

Chỉ chạy một đoạn code khi điều kiện phù hợp:

```javascript

if (condition) {

    // code

}

```

### Lặp

Thực hiện một đoạn code nhiều lần.

Ví dụ:

```javascript

for (let i = 1; i <= 5; i++) {

    console.log(i);

}

```

Phần trọng tâm của slide này là cấu trúc lựa chọn `if`.

---

### 6.3. Các dạng lệnh lựa chọn

Slide nêu:

-   Lựa chọn đơn.

-   Lựa chọn kép.

-   Đa lựa chọn.

### Lựa chọn đơn

```javascript

if (condition) {

    // code

}

```

### Lựa chọn kép

```javascript

if (condition) {

    // condition đúng

} else {

    // condition sai

}

```

### Đa lựa chọn

```javascript

if (condition1) {

    // ...

} else if (condition2) {

    // ...

} else {

    // ...

}

```

---

### 6.4. Lệnh `if`

Cú pháp:

```javascript

if (condition) {

    // Thực hiện khi condition là true

}

```

Ví dụ:

```javascript

const x = 100;

if (x < 350) {

    console.log("x nhỏ hơn 350");

}

```

Phủ định:

```javascript

if (!condition) {

    // thực hiện khi condition là false

}

```

Ví dụ:

```javascript

const isLoggedIn = false;

if (!isLoggedIn) {

    console.log("Bạn chưa đăng nhập");

}

```

---

#### Ví dụ: kiểm tra số nhỏ hơn 100

Ý tưởng từ slide:

```javascript

const x = Number(prompt("Hãy nhập vào số bé hơn 100:"));

if (x >= 100) {

    alert(

        "Bạn vừa nhập giá trị là: " +

        x +

        ", giá trị này không bé hơn 100"

    );

}

```

Phiên bản đầy đủ hơn:

```javascript

const x = Number(prompt("Hãy nhập một số bé hơn 100:"));

if (Number.isNaN(x)) {

    alert("Dữ liệu không phải là số.");

} else if (x >= 100) {

    alert(`${x} không bé hơn 100.`);

} else {

    alert(`${x} hợp lệ.`);

}

```

---

### 6.5. Điều kiện phức tạp

Có thể kết hợp nhiều điều kiện bằng:

```javascript

&&

||

!

```

Ví dụ yêu cầu số nằm trong khoảng lớn hơn 50 và nhỏ hơn 100:

```javascript

const x = Number(

    prompt("Hãy nhập số lớn hơn 50 và nhỏ hơn 100:")

);

if (x > 50 && x < 100) {

    console.log("Giá trị hợp lệ");

}

```

Kiểm tra giá trị nằm ngoài khoảng:

```javascript

if (x <= 50 || x >= 100) {

    console.log("Giá trị không hợp lệ");

}

```

### De Morgan đơn giản

Hai cách sau biểu diễn cùng ý tưởng:

```javascript

!(x > 50 && x < 100)

```

và:

```javascript

x <= 50 || x >= 100

```

---


## 7. Debug JavaScript

### 7.1. Debug là gì?

Debug là quá trình:

```text

phát hiện lỗi

    ↓

xác định nguyên nhân

    ↓

sửa lỗi

    ↓

kiểm tra lại

```

Có thể gặp:

-   Syntax error.

-   Runtime error.

-   Logic error.

### Syntax error

```javascript

// const x = ;

```

### Runtime error

```javascript

const user = null;

// console.log(user.name);

```

### Logic error

```javascript

const a = 10;

const b = 20;

// Sai ý định nếu muốn tính tổng

const result = a - b;

```

Code chạy được nhưng kết quả không đúng yêu cầu.

---

### 7.2. Công cụ debug

Slide cũ đề cập:

-   Microsoft Script Debugger.

-   Visual Studio + Internet Explorer.

-   Firebug + Firefox.

Các công cụ này phản ánh môi trường web ở thời điểm slide được biên

soạn. **Firebug đã ngừng phát triển và Internet Explorer cũng không còn

là môi trường nên dùng cho việc học JavaScript hiện đại.**

Hiện nay, trình duyệt phổ biến có DevTools tích hợp sẵn:

-   Chrome DevTools.

-   Firefox Developer Tools.

-   Microsoft Edge DevTools.

---

### 7.3. Mở DevTools

Trên Chrome/Edge, thường có thể dùng:

```text

F12

```

hoặc:

```text

Ctrl + Shift + I

```

Các tab quan trọng:

```text

Console

Sources

Elements

Network

```

Đối với JavaScript cơ bản, tập trung trước vào:

```text

Console

Sources

```

---

### 7.4. Debug bằng `console.log()`

Ví dụ:

```javascript

const a = 10;

const b = 20;

console.log("a =", a);

console.log("b =", b);

const total = a + b;

console.log("total =", total);

```

Có thể theo dõi luồng chạy:

```javascript

console.log("Bắt đầu");

const age = 20;

if (age >= 18) {

    console.log("Đi vào nhánh >= 18");

}

console.log("Kết thúc");

```

---

### 7.5. Breakpoint

Breakpoint cho phép chương trình tạm dừng tại một dòng.

Ví dụ:

```javascript

function calculateTotal(a, b) {

    const total = a + b;

    return total;

}

const result = calculateTotal(10, 20);

console.log(result);

```

Có thể đặt breakpoint tại:

```javascript

const total = a + b;

```

Sau đó xem:

```text

a

b

total

```

và chạy từng bước.

---

### 7.6. Câu lệnh `debugger`

JavaScript có câu lệnh:

```javascript

debugger;

```

Ví dụ:

```javascript

const a = 10;

const b = 20;

debugger;

const total = a + b;

console.log(total);

```

Nếu DevTools đang mở, trình duyệt có thể dừng tại dòng `debugger`.

Không nên để `debugger` không cần thiết trong code production.

---


## 8. Ví dụ tổng hợp

### 8.1. Kiểm tra điểm

Yêu cầu:

1\.  Người dùng nhập điểm.

2\.  Chuyển dữ liệu sang số.

3\.  Kiểm tra dữ liệu hợp lệ.

4\.  Phân loại kết quả.

```javascript

const score = Number(prompt("Nhập điểm từ 0 đến 10:"));

if (Number.isNaN(score)) {

    alert("Bạn phải nhập một số.");

} else if (score < 0 || score > 10) {

    alert("Điểm phải nằm trong khoảng 0 đến 10.");

} else if (score >= 8) {

    alert("Giỏi");

} else if (score >= 6.5) {

    alert("Khá");

} else if (score >= 5) {

    alert("Trung bình");

} else {

    alert("Chưa đạt");

}

```

Kiến thức sử dụng:

-   Biến.

-   `Number()`.

-   `prompt()`.

-   `Number.isNaN()`.

-   Toán tử so sánh.

-   `||`.

-   `if / else if / else`.

---

### 8.2. Kiểm tra số chẵn/lẻ

```javascript

const number = Number(prompt("Nhập một số nguyên:"));

if (Number.isNaN(number)) {

    alert("Dữ liệu không hợp lệ.");

} else if (number % 2 === 0) {

    alert(`${number} là số chẵn.`);

} else {

    alert(`${number} là số lẻ.`);

}

```

---

### 8.3. Đăng nhập đơn giản

```javascript

const username = prompt("Username:");

const password = prompt("Password:");

const correctUsername = "admin";

const correctPassword = "123456";

if (

    username === correctUsername &&

    password === correctPassword

) {

    alert("Đăng nhập thành công.");

} else {

    alert("Sai tài khoản hoặc mật khẩu.");

}

```

*> Đây chỉ là ví dụ học điều kiện. Không dùng cách lưu mật khẩu trực tiếp*

*> như trên trong ứng dụng thực tế.*

---

### 8.4. Xử lý chuỗi

```javascript

const fullName = prompt("Nhập họ tên:");

if (fullName === null || fullName.trim() === "") {

    alert("Bạn chưa nhập họ tên.");

} else {

    const cleanedName = fullName.trim();

    console.log("Tên:", cleanedName);

    console.log("Độ dài:", cleanedName.length);

    console.log("Chữ hoa:", cleanedName.toUpperCase());

    console.log("Chữ thường:", cleanedName.toLowerCase());

}

```

---


## 9. Lưu ý và lỗi thường gặp

### `var` không còn là lựa chọn mặc định

Slide:

```javascript

var x = 10;

```

Code mới thường dùng:

```javascript

const x = 10;

```

hoặc:

```javascript

let x = 10;

```

---

### `subString()` là sai chính tả API

Không dùng:

```javascript

// text.subString(0, 3);

```

Dùng:

```javascript

text.substring(0, 3);

```

JavaScript phân biệt hoa/thường nên đây là lỗi quan trọng.

---

### `&` và `|` không phải toán tử logic thông thường

Slide đặt:

```text

&

|

^

!

```

trong nhóm logic.

Trong JavaScript cần phân biệt:

```javascript

&& // logical AND

|| // logical OR |

!  // logical NOT

```

với:

```javascript

& // bitwise AND

| // bitwise OR |

^ // bitwise XOR

```

---

### Ưu tiên `===` hơn `==`

Slide dùng:

```javascript

if (x == y) {

    // ...

}

```

Khi mới học nên dùng:

```javascript

if (x === y) {

    // ...

}

```

để tránh ép kiểu ngoài ý muốn.

---

### Firebug và IE debugger đã lỗi thời

Không cần cài Firebug để học debug hiện nay.

Thay vào đó:

```text

Chrome/Edge/Firefox

        ↓

Developer Tools

        ↓

Console + Sources

```

---


## 10. Ôn tập nhanh

### Kiểu dữ liệu

| Dữ liệu | Ví dụ | `typeof` |

|---|---|---|

| Number | `10` | `"number"` |

| String | `"Hello"` | `"string"` |

| Boolean | `true` | `"boolean"` |

| Undefined | `undefined` | `"undefined"` |

| Object | `{}` | `"object"` |

| Array | `[]` | `"object"` |

Lưu ý đặc biệt:

```javascript

console.log(typeof null); // "object"

```

Đây là hành vi lịch sử của JavaScript; `null` vẫn được xem là một

primitive value.

Kiểm tra mảng:

```javascript

Array.isArray([]);

```

Kết quả:

```text

true

```

---

### Ép kiểu

| Mục đích | Cách làm |

|---|---|

| Thành số | `Number(value)` |

| Thành chuỗi | `String(value)` |

| Thành Boolean | `Boolean(value)` |

Ví dụ:

```javascript

Number("123");

String(123);

Boolean(1);

```

---

## Toán tử

```text

Số học:

\+ - * / % **

So sánh:

> < >= <= === !==

Logic:

&& || !

Tăng/giảm:

++ --

Gán:

= += -= *= /= %=

```

Ví dụ toán tử gán:

```javascript

let x = 10;

x += 5;

console.log(x); // 15

```

---

### Điều kiện

```javascript

if (condition) {

    // ...

}

```

```javascript

if (condition) {

    // ...

} else {

    // ...

}

```

```javascript

if (condition1) {

    // ...

} else if (condition2) {

    // ...

} else {

    // ...

}

```

---


### `prompt()` trả về String

Sai ý định:

```javascript

const a = prompt("a:");

const b = prompt("b:");

console.log(a + b);

```

Nếu nhập:

```text

10

20

```

có thể nhận:

```text

1020

```

Sửa:

```javascript

const a = Number(prompt("a:"));

const b = Number(prompt("b:"));

console.log(a + b);

```

---

### Nhầm `=` và `===`

Gán:

```javascript

let x = 10;

```

So sánh:

```javascript

x === 10;

```

---

### Nhầm `&&` và `&`

Logic:

```javascript

if (age >= 18 && hasTicket) {

    // ...

}

```

Không thay bằng:

```javascript

// if (age >= 18 & hasTicket) { ... }

```

---

### Nhầm `||` và `|`

Logic OR:

```javascript

if (role === "admin" || role === "manager") {

    // ...

}

```

---

### Nhầm prefix/postfix

```javascript

let x = 4;

let a = ++x;

```

khác:

```javascript

let x = 4;

let a = x++;

```

Hãy nhớ:

```text

++x → tăng trước, lấy sau

x++ → lấy trước, tăng sau

```

---


## 11. Bài tập

### Bài 1. Khai báo biến

Khai báo:

-   Họ tên.

-   Tuổi.

-   Điểm trung bình.

-   Trạng thái sinh viên.

Ví dụ:

```javascript

const fullName = "Trần Hữu Đang";

let age = 18;

let averageScore = 8.5;

const isStudent = true;

```

In tất cả ra console.

---

### Bài 2. Toán học

Cho:

```javascript

const a = 10;

const b = 3;

```

Tính:

```text

a + b

a - b

a * b

a / b

a % b

a ** b

```

---

### Bài 3. Chuỗi

Cho:

```javascript

const text = "JavaScript";

```

In:

-   Độ dài.

-   4 ký tự đầu.

-   Chữ hoa.

-   Chữ thường.

<details>

<summary><b>Gợi ý</b></summary>

```javascript

console.log(text.length);

console.log(text.substring(0, 4));

console.log(text.toUpperCase());

console.log(text.toLowerCase());

```

</details>

---

### Bài 4. Số chẵn/lẻ

Nhập một số bằng `prompt()` và kiểm tra chẵn/lẻ.

---

### Bài 5. So sánh hai số

Nhập `a` và `b`.

Hiển thị:

```text

a lớn hơn b

```

hoặc:

```text

a nhỏ hơn b

```

hoặc:

```text

a bằng b

```

---

### Bài 6. Kiểm tra tuổi

Nhập tuổi.

Nếu:

```text

age >= 18

```

hiển thị:

```text

Đủ 18 tuổi

```

ngược lại:

```text

Chưa đủ 18 tuổi

```

---

### Bài 7. Kiểm tra khoảng

Nhập một số và kiểm tra số đó có nằm trong:

```text

50 < x < 100

```

hay không.

<details>

<summary><b>Gợi ý</b></summary>

```javascript

if (x > 50 && x < 100) {

    // ...

}

```

</details>

---

### Bài 8. Phân loại điểm

Quy ước:

```text

8.0 – 10  → Giỏi

6.5 – < 8 → Khá

5.0 – <6.5 → Trung bình

< 5       → Chưa đạt

```

Nhớ kiểm tra:

```text

0 <= score <= 10

```

---

### Bài 9. Debug

Tìm lỗi trong đoạn sau:

```javascript

const name = prompt("Nhập tên");

if (name = "admin") {

    console.log("Hello admin");

}

```

Gợi ý: xem lại toán tử gán và toán tử so sánh.

<details>

<summary><b>Bài giải</b></summary>

```javascript

const name = prompt("Nhập tên");

if (name === "admin") {

    console.log("Hello admin");

}

```

</details>

---


### Câu hỏi tự kiểm tra

1\. Biến dùng để làm gì?

2\.  `let`, `const`, `var` khác nhau cơ bản như thế nào?

3\.  JavaScript có kiểu `Integer` riêng không?

4\.  `NaN` nghĩa là gì?

5\.  `Math.random()` trả về giá trị trong khoảng nào?

6\.  `length` dùng để làm gì?

7\.  Tên chính xác là `substring()` hay `subString()`?

8\.  Boolean có những giá trị nào?

9\.  `null` và `undefined` khác nhau thế nào?

10\. `prompt()` trả về kiểu dữ liệu gì?

11\. `Number()` dùng để làm gì?

12\. `"5" + 2` cho kết quả gì?

13\. `"5" - 2` cho kết quả gì?

14\. `%` dùng để làm gì?

15\. `&&`, `||`, `!` có ý nghĩa gì?

16\. `==` và `===` khác nhau như thế nào?

17\. `++x` và `x++` khác nhau thế nào?

18\. Ba loại cấu trúc điều khiển là gì?

19\. `if` dùng khi nào?

20\. DevTools giúp ích gì khi debug?

---


### Checklist kiến thức cần thuộc

- [ ] Biết khai báo biến bằng `let` và `const`.

- [ ] Biết quy tắc đặt tên biến.

- [ ] Hiểu `number`, `string`, `boolean`.

- [ ] Hiểu `null` và `undefined`.

- [ ] Biết tạo và truy cập Array.

- [ ] Biết dùng `typeof`.

- [ ] Biết dùng `Number()`, `String()`, `Boolean()`.

- [ ] Biết `Math.abs()`, `Math.round()`, `Math.random()`.

- [ ] Biết `length`, `substring()`, `toUpperCase()`, `toLowerCase()`.

- [ ] Biết toán tử số học.

- [ ] Biết toán tử so sánh.

- [ ] Biết `&&`, `||`, `!`.

- [ ] Phân biệt `==` và `===`.

- [ ] Phân biệt `++x` và `x++`.

- [ ] Biết lấy dữ liệu bằng `prompt()`.

- [ ] Biết viết `if / else if / else`.

- [ ] Biết kiểm tra điều kiện phức tạp.

- [ ] Biết mở Console và debug cơ bản.

---

## 12. Tổng kết

Các kiến thức trọng tâm:

```text

Biến

 ↓

Kiểu dữ liệu

 ↓

Ép kiểu

 ↓

Toán tử

 ↓

Biểu thức Boolean

 ↓

if / else

 ↓

Điều khiển luồng chương trình

 ↓

Debug

```

Mẫu tổng hợp nên hiểu:

```javascript

const input = prompt("Nhập một số:");

const number = Number(input);

if (Number.isNaN(number)) {

    alert("Dữ liệu không hợp lệ.");

} else if (number > 0) {

    alert(`${number} là số dương.`);

} else if (number < 0) {

    alert(`${number} là số âm.`);

} else {

    alert("Số bằng 0.");

}

```

Đoạn code trên kết hợp gần như toàn bộ kiến thức cốt lõi của bài:

-   Biến.

-   String.

-   Number.

-   Ép kiểu.

-   `NaN`.

-   So sánh.

-   `if / else if / else`.

-   Template literal.

-   Nhập và xuất dữ liệu.

*> [!WARNING]*

*> 🚀* ****Lưu ý:**** *Slide sử dụng môi trường JavaScript cũ. Khi học cần nhận biết các cú pháp như `var`, `==`, Firebug và Internet Explorer theo ngữ cảnh tài liệu; không thay đổi bản chất kiến thức của bài.*
