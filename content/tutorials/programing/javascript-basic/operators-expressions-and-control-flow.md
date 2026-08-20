# Toán tử, biểu thức và điều khiển chương trình trong JavaScript

> Bài học này nối tiếp **Bài 1: Biến, kiểu dữ liệu và ép kiểu trong JavaScript**. Sau khi đã biết cách lưu trữ và chuyển đổi dữ liệu, chúng ta sẽ sử dụng dữ liệu để tính toán, so sánh, xây dựng điều kiện và điều khiển luồng chương trình.

## 1. Mục tiêu bài học

Sau bài này, bạn cần:

- Sử dụng được các toán tử số học, logic, so sánh và toán tử một ngôi.
- Phân biệt `==` với `===`, `&&` với `&`, `||` với `|`.
- Hiểu sự khác nhau giữa prefix và postfix.
- Biết lấy dữ liệu bằng `prompt()` và chuyển dữ liệu sang kiểu phù hợp.
- Hiểu cấu trúc tuần tự, lựa chọn và lặp.
- Viết được `if`, `if...else` và `if...else if...else`.
- Kết hợp nhiều điều kiện bằng `&&`, `||`, `!`.
- Biết debug JavaScript bằng Console, breakpoint và `debugger`.


---


## 2. Toán tử và biểu thức

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
| `<code>||</code>` | OR |
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

cũng tồn tại trong JavaScript nhưng là **bitwise operator**, không nên

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

+
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

1. tăng x

2. lấy giá trị mới của x

3. gán vào y

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

1. lấy giá trị hiện tại của x để gán cho y

2. sau đó mới tăng x

```

Bảng nhớ nhanh:

| Biểu thức | `x` sau lệnh | Giá trị biểu thức |

|---|---:|---:|

| `++x` với `x = 4` | 5 | 5 |

| `x++` với `x = 4` | 5 | 4 |


---



## 3. Nhập dữ liệu và cấu trúc điều khiển

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

1. Cấu trúc tuần tự.

2. Cấu trúc lựa chọn.

3. Cấu trúc lặp.

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



## 4. Debug JavaScript

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



## 5. Ví dụ tổng hợp

### 8.1. Kiểm tra điểm

Yêu cầu:

1. Người dùng nhập điểm.

2. Chuyển dữ liệu sang số.

3. Kiểm tra dữ liệu hợp lệ.

4. Phân loại kết quả.

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

> [!WARNING]
> Đây chỉ là ví dụ học điều kiện. Không dùng cách lưu mật khẩu trực tiếp như trên trong ứng dụng thực tế.


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



### Demo trực tiếp

<div class="tutorial-live-demo">
    <label for="js-score-input">Nhập điểm từ 0 đến 10:</label>
    <input id="js-score-input" type="number" min="0" max="10" step="0.1" placeholder="Ví dụ: 7.5">
    <button type="button" id="js-score-button">Phân loại</button>
    <p id="js-score-result">Chưa có kết quả.</p>

    <script>
        const scoreInput = document.getElementById('js-score-input');
        const scoreButton = document.getElementById('js-score-button');
        const scoreResult = document.getElementById('js-score-result');

        scoreButton.addEventListener('click', () => {
            const score = Number(scoreInput.value);

            if (Number.isNaN(score)) {
                scoreResult.textContent = 'Bạn cần nhập một số hợp lệ.';
            } else if (score < 0 || score > 10) {
                scoreResult.textContent = 'Điểm phải nằm trong khoảng từ 0 đến 10.';
            } else if (score >= 8) {
                scoreResult.textContent = 'Kết quả: Giỏi';
            } else if (score >= 6.5) {
                scoreResult.textContent = 'Kết quả: Khá';
            } else if (score >= 5) {
                scoreResult.textContent = 'Kết quả: Trung bình';
            } else {
                scoreResult.textContent = 'Kết quả: Chưa đạt';
            }
        });
    </script>
</div>

## 6. Lưu ý và lỗi thường gặp

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


## 7. Ôn tập nhanh

### Nhóm toán tử cần nhớ

```text
Số học:     +  -  *  /  %  **
So sánh:    >  <  >=  <=  ===  !==
Logic:      &&  ||  !
Tăng/giảm:  ++  --
Gán:        =  +=  -=  *=  /=  %=
```

### Luồng xử lý dữ liệu nhập

```text
prompt()
   ↓
String
   ↓
Number() nếu cần tính toán
   ↓
Kiểm tra dữ liệu
   ↓
Biểu thức / điều kiện
   ↓
if / else
```


---


## 8. Bài tập

### Bài 1. Toán học

Cho:

```javascript
const a = 10;
const b = 3;
```

Tính `a + b`, `a - b`, `a * b`, `a / b`, `a % b` và `a ** b`.

### Bài 2. Kiểm tra số chẵn/lẻ

Nhập một số bằng `prompt()`, chuyển sang Number và xác định số đó là chẵn hay lẻ.

### Bài 3. So sánh hai số

Nhập `a` và `b`. Hiển thị một trong ba kết quả:

```text
a lớn hơn b
a nhỏ hơn b
a bằng b
```

### Bài 4. Kiểm tra tuổi

Nhập tuổi. Nếu `age >= 18`, hiển thị `Đủ 18 tuổi`; ngược lại hiển thị `Chưa đủ 18 tuổi`.

### Bài 5. Kiểm tra khoảng

Nhập một số và kiểm tra số đó có nằm trong khoảng:

```text
50 < x < 100
```

<details>
<summary><b>Gợi ý</b></summary>

```javascript
if (x > 50 && x < 100) {
    // ...
}
```

</details>

### Bài 6. Phân loại điểm

Quy ước:

```text
8.0 – 10    → Giỏi
6.5 – < 8   → Khá
5.0 – < 6.5 → Trung bình
< 5         → Chưa đạt
```

Cần kiểm tra điểm nằm trong khoảng từ 0 đến 10.

### Bài 7. Debug

Tìm lỗi:

```javascript
const name = prompt("Nhập tên");

if (name = "admin") {
    console.log("Hello admin");
}
```

<details>
<summary><b>Bài giải</b></summary>

```javascript
const name = prompt("Nhập tên");

if (name === "admin") {
    console.log("Hello admin");
}
```

</details>

### Câu hỏi tự kiểm tra

1. `%` dùng để làm gì?
2. `&&`, `||`, `!` có ý nghĩa gì?
3. `==` và `===` khác nhau thế nào?
4. `++x` và `x++` khác nhau thế nào?
5. `prompt()` trả về kiểu dữ liệu gì?
6. Ba cấu trúc điều khiển cơ bản là gì?
7. Khi nào sử dụng `if...else if...else`?
8. Breakpoint có tác dụng gì?
9. `debugger` dùng để làm gì?

### Checklist kiến thức cần thuộc

- [ ] Biết toán tử số học.
- [ ] Biết toán tử so sánh.
- [ ] Biết `&&`, `||`, `!`.
- [ ] Phân biệt `==` và `===`.
- [ ] Phân biệt `++x` và `x++`.
- [ ] Biết lấy dữ liệu bằng `prompt()`.
- [ ] Biết chuyển dữ liệu nhập sang Number khi cần.
- [ ] Biết viết `if / else if / else`.
- [ ] Biết kết hợp điều kiện phức tạp.
- [ ] Biết sử dụng Console và breakpoint để debug.


---


## 9. Tổng kết

Bài học nối tiếp trực tiếp từ dữ liệu của Bài 1:

```text
Biến + kiểu dữ liệu
        ↓
     Toán tử
        ↓
     Biểu thức
        ↓
  true / false
        ↓
    if / else
        ↓
Điều khiển chương trình
        ↓
      Debug
```

Sau hai bài, người học đã đi trọn một mạch kiến thức: **lưu dữ liệu → hiểu kiểu dữ liệu → ép kiểu → tính toán/so sánh → xây dựng điều kiện → điều khiển chương trình → kiểm tra lỗi**.
