# Bài 4. Xử lý sự kiện và Timer trong JavaScript

> Bài học này nối tiếp **Bài 3: Cấu trúc điều khiển, vòng lặp và hàm**. Ở bài trước, hàm được dùng để tổ chức logic. Trong bài này, các hàm sẽ trở thành **event handler** và **callback**, giúp trang web phản ứng với người dùng và thực hiện tác vụ theo thời gian.

## 1. Mục tiêu bài học

Sau bài này, bạn cần:

- Hiểu event là gì.
- Nhận biết các event thường gặp như `click`, `focus`, `blur`, `change`, `mouseover`.
- Hiểu cách xử lý sự kiện bằng hàm.
- Biết sự khác nhau giữa inline event handler và `addEventListener()`.
- Biết sử dụng event object.
- Sử dụng được `setTimeout()` và `clearTimeout()`.
- Sử dụng được `setInterval()` và `clearInterval()`.
- Biết lưu và quản lý timer ID.
- Tránh tạo nhiều interval ngoài ý muốn.
- Kết hợp event, function, DOM và timer trong một chương trình đơn giản.

---

## 2. Xử lý sự kiện

### 2.1. Sự kiện là gì?

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

### Một số sự kiện thường gặp

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

### Inline event handler

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

### Dùng hàm để xử lý sự kiện

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

### `addEventListener()` -- cách nên ưu tiên hiện nay

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

### Ví dụ chọn đồ vật

Ý tưởng trong slide: người dùng click nút **Mũ\*\*** hoặc **Giầy\*\***, sau đó

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

### Đối tượng sự kiện `event`

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


## 3. Timer trong JavaScript

### 3.1. Các hàm timer

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

### `setTimeout()`

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

### Hủy `setTimeout()`

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

### `setInterval()`

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

### Hủy `setInterval()`

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

### `setTimeout()` và `setInterval()`

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

### Timer không đảm bảo chạy đúng tuyệt đối từng millisecond

Khoảng thời gian trong timer là thời gian \*\*tối thiểu trước khi callback

có thể được đưa vào hàng chờ\*\*, không phải cam kết chạy chính xác tại

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


## 4. Cách viết hiện đại và lưu ý

### 4.1. `var` → ưu tiên `let` và `const`

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

### `document.write()` không phù hợp cho cập nhật giao diện hiện đại

Slide dùng:

```javascript

document.write(x + "</br>");

```

Có hai vấn đề:

1\.  Thẻ xuống dòng đúng là `<br>`, không phải `</br>`.

2\.  `document.write()` có thể gây vấn đề nếu gọi sau khi trang đã tải.

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

### Không truyền chuỗi vào timer

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

### Inline `onclick` vẫn chạy nhưng không nên là mặc định

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

### Tên sự kiện

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

### So sánh Boolean

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

### Ví dụ scope trong slide cần hiểu theo JavaScript hiện đại

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


## 5. Ví dụ tổng hợp

### 5.1. Chương trình đếm bằng nút

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

### 5.2. Đồng hồ đếm giây đơn giản

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

### Demo trực tiếp

<div class="tutorial-live-demo">
    <p id="js-timer-value">Đếm: 0</p>
    <button type="button" id="js-timer-start">Bắt đầu</button>
    <button type="button" id="js-timer-stop">Dừng</button>

    <script>
        const timerLabel = document.getElementById('js-timer-value');
        const startButton = document.getElementById('js-timer-start');
        const stopButton = document.getElementById('js-timer-stop');
        let timerCount = 0;
        let timerId = null;

        startButton.addEventListener('click', () => {
            if (timerId) return;
            timerId = setInterval(() => {
                timerCount += 1;
                timerLabel.textContent = `Đếm: ${timerCount}`;
            }, 1000);
        });

        stopButton.addEventListener('click', () => {
            clearInterval(timerId);
            timerId = null;
        });
    </script>
</div>

## 6. Lỗi thường gặp

### Tạo nhiều interval khi click nhiều lần

Đoạn sau tạo một interval mới sau mỗi lần click:

```javascript
button.addEventListener("click", () => {
    setInterval(() => {
        console.log("Tick");
    }, 1000);
});
```

Nên lưu ID và kiểm soát trạng thái:

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

### Không lưu timer ID

Muốn hủy timer, cần giữ ID:

```javascript
const timeoutId = setTimeout(callback, 1000);
clearTimeout(timeoutId);
```

```javascript
const intervalId = setInterval(callback, 1000);
clearInterval(intervalId);
```

### Nhầm `setTimeout()` với `setInterval()`

```text
setTimeout()  → chạy một lần
setInterval() → chạy lặp lại
```

### Truyền chuỗi code vào timer

Không nên:

```javascript
setTimeout("alert('Hi')", 1000);
```

Nên truyền function:

```javascript
setTimeout(() => {
    alert("Hi");
}, 1000);
```

---

## 7. Bài tập

### Bài 1. Confirm xóa dữ liệu

Khi người dùng click nút **Xóa**, hiển thị:

```javascript
confirm("Bạn có chắc muốn xóa?");
```

Nếu OK, hiển thị `Đã xóa`; nếu Cancel, hiển thị `Đã hủy`.

### Bài 2. Event click

Tạo:

```html
<button id="button">Đổi nội dung</button>
<p id="message">Nội dung ban đầu</p>
```

Khi click, đổi nội dung paragraph thành:

```text
Bạn vừa click nút!
```

Yêu cầu dùng `addEventListener()`.

### Bài 3. Event object

Tạo một button và khi click, in ra:

```javascript
event.type;
event.target;
```

Giải thích hai giá trị nhận được.

### Bài 4. `setTimeout()`

Sau 3 giây, hiển thị:

```text
Đã hết thời gian!
```

Sau đó bổ sung nút **Hủy** để gọi `clearTimeout()`.

### Bài 5. Timer Start/Stop

Tạo hai nút:

```text
Bắt đầu
Dừng
```

Khi bắt đầu, mỗi giây tăng `count`. Khi dừng, sử dụng `clearInterval()`.

### Bài 6. Chống tạo nhiều interval

Điều chỉnh bài 5 để người dùng click **Bắt đầu** nhiều lần nhưng chương trình chỉ có một interval đang hoạt động.

### Câu hỏi tự kiểm tra

1. Event là gì?
2. `click`, `focus`, `blur` và `change` xảy ra khi nào?
3. Inline `onclick` và `addEventListener()` khác nhau thế nào?
4. Event object chứa thông tin gì?
5. `event.target` có ý nghĩa gì?
6. `setTimeout()` chạy bao nhiêu lần?
7. `setInterval()` hoạt động như thế nào?
8. Dùng hàm nào để hủy timeout?
9. Dùng hàm nào để hủy interval?
10. Vì sao cần lưu timer ID?
11. Vì sao không nên truyền chuỗi code vào timer?
12. Vì sao cần kiểm soát việc tạo nhiều interval?

### Checklist kiến thức cần thuộc

- [ ] Hiểu event và event handler.
- [ ] Biết các event cơ bản.
- [ ] Biết dùng `addEventListener()`.
- [ ] Biết sử dụng event object.
- [ ] Biết `setTimeout()` và `clearTimeout()`.
- [ ] Biết `setInterval()` và `clearInterval()`.
- [ ] Biết lưu timer ID.
- [ ] Biết tránh tạo nhiều interval.
- [ ] Biết kết hợp event, DOM, function và timer.

---

## 8. Tổng kết

```text
Người dùng / Trình duyệt
          ↓
        Event
          ↓
   Event handler
          ↓
       Function
          ↓
  Cập nhật DOM / Timer

Timer
├── setTimeout()
│   └── clearTimeout()
└── setInterval()
    └── clearInterval()
```

Mạch kiến thức nối tiếp từ bài trước:

```text
Function
   ↓
Callback / Event handler
   ↓
Event
   ↓
DOM thay đổi

Function
   ↓
Callback
   ↓
Timer
   ↓
Tác vụ theo thời gian
```

Sau bài này, người học đã có nền tảng để xây dựng các tương tác động trên trang web và chuyển sang các nội dung DOM/giao diện nâng cao.
