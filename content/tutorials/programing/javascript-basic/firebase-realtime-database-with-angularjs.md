# Bài 12. Firebase Realtime Database với AngularJS

> Bài học này nối tiếp **Bài 11: AngularJS Fundamentals**. Sau khi đã hiểu `$scope`, data binding và cách AngularJS cập nhật View, bài này tập trung vào Firebase Realtime Database theo **API lịch sử được sử dụng trong slide**, sau đó kết hợp Firebase với AngularJS.

> [!WARNING]
> **Lưu ý phiên bản:** Cú pháp `new Firebase(...)` trong bài thuộc Firebase SDK đời cũ. Nội dung được giữ để ôn đúng WEB1042, không nên dùng nguyên mẫu cho dự án Firebase mới.

## 1. Mục tiêu bài học

Sau bài này, bạn cần:

- Hiểu Firebase Realtime Database theo bối cảnh của slide.
- Nhận biết cú pháp Firebase API đời cũ.
- Hiểu reference và URL dữ liệu trong ví dụ.
- Phân biệt `set()` và `push()`.
- Đọc dữ liệu bằng `on("child_added", ...)` và `on("value", ...)`.
- Hiểu `snapshot.val()`.
- Theo dõi được luồng hoạt động của ứng dụng chat realtime.
- Hiểu cách Firebase callback cập nhật `$scope`.
- Giải thích được vai trò của `$scope.$apply()` trong ví dụ AngularJS + Firebase.
- Phân biệt kiến thức lịch sử trong môn học với Firebase SDK hiện đại.

---

## 2. Firebase Realtime Database

### 12.1 Khái niệm

Theo slide, Firebase là cơ sở dữ liệu online, realtime, hỗ trợ đọc và
ghi dữ liệu trực tuyến.

Slide sử dụng Firebase API rất cũ:

```html
<script src="https://cdn.firebase.com/v0/firebase.js"></script>
```

và:

```javascript
var myDataRef = new Firebase("https://example.firebaseio-demo.com/");
```

> [!WARNING]
> 🚀 **Lưu ý về phiên bản:** Cú pháp `new Firebase(...)` thuộc Firebase đời cũ. Không nên dùng nguyên mẫu này cho dự án Firebase mới hiện nay. Phần dưới giữ lại để học đúng nội dung bài.

---

### 12.2 Khởi tạo Firebase theo slide

```html
<!DOCTYPE html>
<html>
<head>
    <script src="https://cdn.firebase.com/v0/firebase.js"></script>
</head>

<body>
    <script>
        var myDataRef =
            new Firebase("https://tkz5am1ctvs.firebaseio-demo.com/");
    </script>
</body>
</html>
```

---

### 12.3 Ghi một giá trị bằng `set()`

Ví dụ chat message:

```javascript
myDataRef.set("User " + name + " says " + text);
```

`set()` ghi giá trị vào vị trí tham chiếu hiện tại và có thể ghi đè dữ
liệu cũ tại vị trí đó.

---

### 12.4 Ghi Object

```javascript
myDataRef.set({
    name: name,
    text: text
});
```

Dữ liệu có dạng khái niệm:

```json
{
  "name": "Trần Hữu Đang",
  "text": "Hello"
}
```

---

### 12.5 Ghi List bằng `push()`

Khi muốn lưu nhiều message:

```javascript
myDataRef.push({
    name: name,
    text: text
});
```

Ý tưởng:

```text
messages
├── id_1
│   ├── name: "Trần Hữu Đang"
│   └── text: "Hello"
├── id_2
│   ├── name: "Trần Hữu Đang"
│   └── text: "Hi"
└── ...
```

Khác biệt cần nhớ:

```javascript
myDataRef.set(data);
```

thường ghi/thay giá trị tại vị trí hiện tại.

Trong khi:

```javascript
myDataRef.push(data);
```

tạo thêm một phần tử con mới, phù hợp với danh sách message.

---

### 12.6 Đọc dữ liệu realtime

Slide sử dụng event `child_added`:

```javascript
myDataRef.on("child_added", function (snapshot) {
    var message = snapshot.val();

    displayChatMessage(
        message.name,
        message.text
    );
});
```

Hàm hiển thị:

```javascript
function displayChatMessage(name, text) {
    $("<div/>")
        .text(text)
        .prepend(
            $("<em/>").text(name + ": ")
        )
        .appendTo($("#messagesDiv"));

    $("#messagesDiv")[0].scrollTop =
        $("#messagesDiv")[0].scrollHeight;
}
```

---

## 3. Ví dụ Firebase Chat

Đây là phiên bản được dựng lại từ các slide Firebase.

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">

    <script src="https://cdn.firebase.com/v0/firebase.js"></script>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js"></script>
</head>

<body>
    <div id="messagesDiv"></div>

    <input
        type="text"
        id="nameInput"
        placeholder="Name"
    >

    <input
        type="text"
        id="messageInput"
        placeholder="Message"
    >

    <script>
        var myDataRef =
            new Firebase(
                "https://tkz5am1ctvs.firebaseio-demo.com/"
            );

        $("#messageInput").keypress(function (e) {
            if (e.keyCode === 13) {
                var name = $("#nameInput").val();
                var text = $("#messageInput").val();

                myDataRef.push({
                    name: name,
                    text: text
                });

                $("#messageInput").val("");
            }
        });

        myDataRef.on(
            "child_added",
            function (snapshot) {
                var message = snapshot.val();

                displayChatMessage(
                    message.name,
                    message.text
                );
            }
        );

        function displayChatMessage(name, text) {
            $("<div/>")
                .text(text)
                .prepend(
                    $("<em/>").text(name + ": ")
                )
                .appendTo($("#messagesDiv"));

            $("#messagesDiv")[0].scrollTop =
                $("#messagesDiv")[0].scrollHeight;
        }
    </script>
</body>
</html>
```

### Luồng hoạt động

```text
Người dùng nhập tên + message
          ↓
Nhấn Enter
          ↓
keypress
          ↓
myDataRef.push(...)
          ↓
Firebase lưu dữ liệu
          ↓
child_added được kích hoạt
          ↓
snapshot.val()
          ↓
displayChatMessage(...)
          ↓
Message xuất hiện trên giao diện
```

---

## 4. Kết hợp AngularJS với Firebase

Slide cuối có demo AngularJS đọc/ghi một message từ Firebase.

### 14.1 HTML

```html
<div class="container" ng-app>
    <div ng-controller="myController">

        <div>
            <div>Current message is:</div>
            <br>

            <p class="well well-small">
                {{ msg }}
            </p>
        </div>

        <hr>

        <form ng-submit="updateMsg()">
            <input
                type="text"
                ng-model="newMsg"
                placeholder="Type your message"
            >

            <input
                type="submit"
                class="btn btn-primary pull-right"
            >
        </form>
    </div>
</div>
```

### 14.2 JavaScript

```javascript
var myController = function ($scope) {
    $scope.msg = "Loading...";

    var messageRef = new Firebase(
        "https://davi.firebaseio.com/AngularDemoDb/message/"
    );

    messageRef.on("value", function (snapshot) {
        $scope.msg = snapshot.val();

        $scope.$apply();
    });

    $scope.updateMsg = function () {
        messageRef.set($scope.newMsg);
    };
};
```

### 14.3 Vì sao có `$scope.$apply()`?

Callback của Firebase đời cũ có thể chạy bên ngoài cơ chế cập nhật của
AngularJS.

Ta thay đổi:

```javascript
$scope.msg = snapshot.val();
```

nhưng AngularJS có thể chưa biết cần render lại View.

Do đó slide dùng:

```javascript
$scope.$apply();
```

để AngularJS chạy chu trình cập nhật và phản ánh `msg` lên giao diện.

> Trong code thực tế cần tránh gọi `$apply()` khi AngularJS đang ở trong
> digest cycle; ví dụ này nhằm giải thích nguyên lý của bài học.

---

## 5. So sánh các thao tác Firebase trong bài

| Thao tác | Ý nghĩa trong API của slide | Trường hợp điển hình |
|---|---|---|
| `ref.set(data)` | Ghi/thay giá trị tại reference hiện tại | Lưu một giá trị hoặc object |
| `ref.push(data)` | Tạo thêm một child mới | Danh sách message |
| `ref.on("child_added", callback)` | Theo dõi child được thêm | Chat/list realtime |
| `ref.on("value", callback)` | Theo dõi giá trị tại reference | Một message/trạng thái |
| `snapshot.val()` | Lấy dữ liệu từ snapshot | Đọc dữ liệu trong callback |

Điểm quan trọng:

```text
set()
→ ghi tại vị trí hiện tại

push()
→ tạo phần tử con mới
→ phù hợp với collection/list
```

---

## 6. Luồng dữ liệu AngularJS + Firebase

Ví dụ cuối bài có thể hiểu theo luồng:

```text
Firebase
   ↓
callback "value"
   ↓
snapshot.val()
   ↓
$scope.msg
   ↓
$scope.$apply()
   ↓
AngularJS cập nhật View
   ↓
{{ msg }}
```

Chiều ghi dữ liệu:

```text
Người dùng nhập newMsg
        ↓
ng-model="newMsg"
        ↓
ng-submit="updateMsg()"
        ↓
messageRef.set($scope.newMsg)
        ↓
Firebase
```

Như vậy bài này nối trực tiếp kiến thức **Two-Way Data Binding** của bài trước với một nguồn dữ liệu realtime.

---

## 7. Lưu ý khi học tài liệu cũ

### AngularJS 1.x không phải Angular hiện đại

```text
AngularJS 1.x ≠ Angular 2+
```

### Firebase API trong slide là API lịch sử

Ví dụ:

```javascript
var ref = new Firebase("FIREBASE_URL");
```

được giữ để học đúng slide, không đại diện cho cách khởi tạo Firebase SDK hiện hành.

### jQuery xuất hiện trong ví dụ chat

Ví dụ Firebase Chat của slide sử dụng jQuery để:

- đọc input,
- bắt `keypress`,
- tạo element,
- thêm message vào DOM.

Điều này phản ánh bối cảnh công nghệ của tài liệu gốc.

### `$scope.$apply()` cần hiểu đúng ngữ cảnh

Bài dùng `$scope.$apply()` khi callback Firebase thay đổi dữ liệu bên ngoài chu trình cập nhật AngularJS. Không nên hiểu rằng mọi callback đều phải gọi `$apply()` một cách máy móc.

---

## 8. Bài tập

### Bài 1. Phân biệt `set()` và `push()`

Giải thích sự khác nhau:

```javascript
ref.set(data);
ref.push(data);
```

và chọn method phù hợp để lưu danh sách tin nhắn.

### Bài 2. Đọc child mới

Hoàn thiện:

```javascript
ref.on("child_added", function (snapshot) {
    const data = __________;
    console.log(data);
});
```

### Bài 3. Phân tích Firebase Chat

Vẽ lại luồng:

```text
Nhập message
→ push
→ Firebase
→ child_added
→ snapshot
→ DOM
```

### Bài 4. AngularJS + Firebase

Cho:

```javascript
messageRef.on("value", function (snapshot) {
    $scope.msg = snapshot.val();
    $scope.$apply();
});
```

Giải thích từng dòng.

### Bài 5. Chiều ghi dữ liệu

Giải thích luồng từ:

```html
<input ng-model="newMsg">
<form ng-submit="updateMsg()">
```

đến:

```javascript
messageRef.set($scope.newMsg);
```

### Câu hỏi tự kiểm tra

1. Firebase trong slide cung cấp loại cơ sở dữ liệu nào?
2. `new Firebase(...)` thuộc API hiện đại hay API lịch sử?
3. `set()` có tác dụng gì?
4. `push()` khác `set()` thế nào?
5. `child_added` phù hợp với loại dữ liệu nào?
6. `value` event dùng để theo dõi gì?
7. `snapshot.val()` trả về gì?
8. Chat example sử dụng thư viện nào để thao tác DOM?
9. Firebase callback thay đổi `$scope.msg` như thế nào?
10. Vì sao ví dụ gọi `$scope.$apply()`?
11. `ng-model="newMsg"` đóng vai trò gì trong ví dụ?
12. Vì sao không nên dùng nguyên code Firebase của slide cho dự án mới?

### Checklist kiến thức cần thuộc

- [ ] Hiểu Firebase Realtime Database trong bối cảnh slide.
- [ ] Nhận biết Firebase API đời cũ.
- [ ] Biết `set()`.
- [ ] Biết `push()`.
- [ ] Biết `child_added`.
- [ ] Biết event `value`.
- [ ] Biết `snapshot.val()`.
- [ ] Hiểu luồng Firebase Chat.
- [ ] Hiểu AngularJS + Firebase.
- [ ] Hiểu `$scope.$apply()` trong ví dụ.
- [ ] Phân biệt code ôn môn với code dự án hiện đại.

---

## 9. Tổng kết

```text
Firebase Reference
       ↓
  set() / push()
       ↓
Realtime Database
       ↓
child_added / value
       ↓
   snapshot.val()
       ↓
JavaScript / AngularJS
       ↓
      View
```

Kết nối với bài trước:

```text
AngularJS
$scope + ng-model + View
          ↕
     Firebase callback
          ↕
Realtime Database
```

Hai bài vì vậy tạo thành một chuỗi rõ ràng:

```text
AngularJS Fundamentals
        ↓
Data Binding + Controller
        ↓
Nguồn dữ liệu realtime
        ↓
Firebase
        ↓
AngularJS + Firebase
```
