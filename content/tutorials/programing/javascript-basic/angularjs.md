# Bài 7. Giới thiệu JavaScript Framework (AngularJS)

> Tài liệu học tập được biên soạn lại từ slide môn **Lập trình
> JavaScript -- Bài 7**.\
> Nội dung gốc sử dụng **AngularJS 1.x** và **Firebase API đời cũ**, vì
> vậy phần code dưới đây ưu tiên bám sát bài học để ôn tập; một số API
> hiện đã lỗi thời.

---


## 1. Mục tiêu bài học

Sau bài này, cần nắm được:

-   Một số JavaScript framework/thư viện mã nguồn mở.
-   Khái niệm và vai trò của AngularJS.
-   Cách xây dựng ứng dụng AngularJS cơ bản.
-   `ng-app`, `ng-controller`, `ng-model`, `$scope`.
-   AngularJS expression với cú pháp `{{ ... }}`.
-   Controller, Model, View và Two-Way Data Binding.
-   Khái niệm Firebase Realtime Database.
-   Cách ghi/đọc dữ liệu Firebase theo API được sử dụng trong slide.

---

## 2. Ôn tập bài cũ

Các nội dung JavaScript đã học trước đó:

-   Hiệu ứng Image Rollover.
-   SlideShow.
-   Làm việc với `select`.
-   Checkbox.
-   Radio button.
-   Form.
-   Kiểm tra tính hợp lệ của form.
-   Thay đổi CSS bằng JavaScript.

---

## 3. Các JavaScript framework/thư viện mã nguồn mở

### 3.1 Backbone.js

Backbone.js là thư viện JavaScript giúp tổ chức ứng dụng và biểu diễn dữ
liệu dưới dạng các **Model**.

### 3.2 Bootstrap

Bootstrap là framework hỗ trợ xây dựng giao diện web. Trong bối cảnh tài
liệu cũ, Bootstrap thường được sử dụng cùng jQuery.

### 3.3 Enyo

Enyo là framework JavaScript hướng đối tượng, từng được sử dụng để xây
dựng ứng dụng HTML5/CSS.

### 3.4 D3.js

D3 (Data-Driven Documents) là thư viện JavaScript mạnh về trực quan hóa
dữ liệu và đồ họa vector trực tiếp trong trình duyệt.

### 3.5 Ember.js

Ember.js là framework JavaScript hỗ trợ xây dựng ứng dụng theo kiến trúc
MVC.

### 3.6 Emscripten

Emscripten là trình biên dịch cho phép chuyển mã C/C++ sang mã có thể
chạy trên nền web. Slide đề cập đến `asm.js`.

### 3.7 Node.js

Node.js là môi trường chạy JavaScript ngoài trình duyệt. Các ưu điểm
được slide nhấn mạnh:

-   JavaScript là ngôn ngữ phổ biến.
-   Tốc độ nhanh nhờ V8.
-   Mô hình I/O non-blocking.
-   Hệ sinh thái thư viện lớn, dễ cài đặt thông qua npm.

> [!NOTE]
> 💡 **Ghi chú:** Một số tên trong slide được gọi chung là "framework", nhưng về kỹ thuật chúng có thể là framework, library, runtime hoặc compiler.

---

## 4. Giới thiệu AngularJS

AngularJS là framework JavaScript dành cho ứng dụng web.

Theo nội dung slide:

-   Dự án bắt đầu khoảng năm 2009.
-   Gắn với lập trình viên Misko Hevery tại Google.
-   Mục tiêu là giúp lập trình viên xây dựng ứng dụng web có cấu trúc và
    có hệ thống.
-   AngularJS hỗ trợ cách tổ chức ứng dụng theo mô hình MVC/MV\*.
-   Một đặc điểm nổi bật là **data binding**, đặc biệt là Two-Way Data
    Binding.

> [!WARNING]
> 🚀 **Lưu ý:** Bài học này nói về **AngularJS 1.x**, không phải Angular hiện đại (Angular 2+).

---

## 5. Hello World với AngularJS

### 5.1 Cấu trúc thư mục

```text
helloworld/
├── index.html
└── scripts/
    └── controllers.js
```

### 5.2 `index.html`

Ví dụ được chuẩn hóa lại từ slide:

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">

    <!-- AngularJS 1.x -->
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.0.7/angular.min.js"></script>

    <!-- Controller của ứng dụng -->
    <script src="scripts/controllers.js"></script>

    <style>
        h1 {
            color: red;
        }

        #author {
            color: blue;
        }
    </style>
</head>

<body ng-app>
    <h1>AngularJS 101</h1>

    <h3>
        by <span id="author">Trần Hữu Đang</span>
    </h3>

    <div ng-controller="HelloCtrl">
        Bạn tên là:
        <input type="text" ng-model="name">

        <p>
            Xin chào bạn <b>{{ name }}</b><br>
            Fpoly luôn vững mạnh
        </p>
    </div>
</body>
</html>
```

### 5.3 `scripts/controllers.js`

```javascript
function HelloCtrl($scope) {
    $scope.name = "Polytechnic";
}
```

### 5.4 Ý nghĩa

Khi trang được tải:

1.  AngularJS tìm vùng có `ng-app`.
2.  `ng-controller="HelloCtrl"` liên kết vùng giao diện với controller.
3.  AngularJS inject `$scope` vào `HelloCtrl`.
4.  Controller gán:

```javascript
$scope.name = "Polytechnic";
```

5.  Input có:

```html
ng-model="name"
```

nên nó liên kết với `name` trên scope.

6.  View hiển thị:

```html
{{ name }}
```

Khi người dùng sửa nội dung input, phần `{{ name }}` được cập nhật mà
không cần reload trang.

---

## 6. Các thành phần cơ bản của AngularJS

### 6.1 `ng-app`

`ng-app` đánh dấu nơi AngularJS bắt đầu quản lý ứng dụng.

Ví dụ:

```html
<body ng-app>
    ...
</body>
```

Hoặc:

```html
<div ng-app>
    ...
</div>
```

Với module có tên:

```html
<body ng-app="myApp">
    ...
</body>
```

```javascript
var app = angular.module("myApp", []);
```

---

### 6.2 `ng-controller`

Controller quản lý dữ liệu và hành vi của một vùng giao diện.

```html
<div ng-controller="StudentController">
    {{ student.name }}
</div>
```

```javascript
function StudentController($scope) {
    $scope.student = {
        name: "Trần Hữu Đang"
    };
}
```

---

### 6.3 `$scope`

`$scope` là đối tượng đóng vai trò cầu nối giữa **Controller** và
**View** trong cách viết AngularJS 1.x truyền thống.

```javascript
function MyController($scope) {
    $scope.message = "Hello AngularJS";
}
```

View:

```html
<p>{{ message }}</p>
```

AngularJS cung cấp `$scope` cho controller thông qua **Dependency
Injection**.

---

### 6.4 Tiền tố `ng-`

Các directive tích hợp sẵn của AngularJS thường có tiền tố `ng-`.

Ví dụ:

```html
ng-app
ng-controller
ng-model
ng-submit
ng-repeat
ng-click
ng-show
ng-hide
```

Có thể gặp dạng `data-ng-*`:

```html
<input data-ng-model="username">
```

---

### 6.5 `ng-model`

`ng-model` liên kết giá trị của form control với dữ liệu AngularJS.

```html
<input type="text" ng-model="userName">

<p>Hello {{ userName }}!</p>
```

Đây là ví dụ cơ bản của Two-Way Data Binding.

---

## 7. Biểu thức AngularJS

### 7.1 Interpolation

AngularJS sử dụng:

```text
{{ expression }}
```

để đưa giá trị vào DOM.

Ví dụ:

```html
<p>{{ 10 + 20 }}</p>
```

Kết quả:

```text
30
```

Biến:

```html
<input ng-model="userName">
<p>Hello {{ userName }}!</p>
```

Object:

```html
<p>{{ student.name }}</p>
```

---

### 7.2 AngularJS expression và JavaScript

Cú pháp expression của AngularJS khá giống JavaScript nhưng không hoàn
toàn giống.

Trong AngularJS expression:

-   Ngữ cảnh thường dựa trên scope.
-   `undefined`/`null` thường được xử lý mềm hơn JavaScript thuần trong
    template.
-   Có thể sử dụng **filter**.
-   Không nên xem expression như một khối JavaScript đầy đủ.

Theo slide, expression AngularJS không hỗ trợ trực tiếp một số cấu trúc
như:

-   Điều khiển dòng lệnh đầy đủ.
-   Khai báo function.
-   Tạo `RegExp` tùy ý.
-   `new`.
-   Một số toán tử bit.
-   `void`.

---

### 7.3 Filter

Filter dùng để định dạng dữ liệu trước khi hiển thị.

```html
<p>{{ name | uppercase }}</p>
```

```html
<p>{{ price | currency }}</p>
```

```html
<p>{{ birthday | date:'dd/MM/yyyy' }}</p>
```

Ví dụ:

```html
<div ng-app ng-init="price = 150000">
    Giá: {{ price | number }} VNĐ
</div>
```

---

## 8. Controller và thao tác dữ liệu

### 8.1 Demo thêm người dùng

HTML:

```html
<div ng-app>
    <div ng-controller="myController">
        <form ng-submit="addNewUser()">
            <input type="text" ng-model="NewUser">
            <input type="submit" value="Thêm">
        </form>

        <p>Hello {{ NewUser }}!</p>

        <p>User Array: {{ userList }}</p>
    </div>
</div>
```

JavaScript:

```javascript
var myController = function ($scope) {
    $scope.userList = ["davi"];

    $scope.addNewUser = function () {
        $scope.userList.push($scope.NewUser);
    };
};
```

### 8.2 Phiên bản an toàn hơn

```javascript
var myController = function ($scope) {
    $scope.userList = ["davi"];
    $scope.NewUser = "";

    $scope.addNewUser = function () {
        if (!$scope.NewUser) {
            return;
        }

        $scope.userList.push($scope.NewUser);
        $scope.NewUser = "";
    };
};
```

Hiển thị danh sách bằng `ng-repeat`:

```html
<ul>
    <li ng-repeat="user in userList">
        {{ user }}
    </li>
</ul>
```

---

## 9. MVC và Two-Way Data Binding

### 9.1 Model

Model chứa dữ liệu:

```javascript
$scope.student = {
    name: "Trần Hữu Đang",
    age: 20
};
```

### 9.2 View

View là HTML mà người dùng nhìn thấy:

```html
<p>{{ student.name }}</p>
<p>{{ student.age }}</p>
```

### 9.3 Controller

Controller chuẩn bị dữ liệu và xử lý hành vi:

```javascript
function StudentController($scope) {
    $scope.student = {
        name: "Trần Hữu Đang",
        age: 20
    };
}
```

### 9.4 Two-Way Data Binding

Ví dụ:

```html
<input ng-model="student.name">
<p>{{ student.name }}</p>
```

Luồng ý tưởng:

```text
Người dùng thay đổi View
        ↓
Model được cập nhật
        ↓
View khác sử dụng Model cũng được cập nhật
```

Và khi controller thay đổi model:

```text
Controller thay đổi Model
        ↓
AngularJS cập nhật View
```

Đây là ý chính của sơ đồ Two-Way Data Binding trong slide.

---

## 10. Template trong AngularJS

Slide trình bày các cách AngularJS đưa dữ liệu vào template, gồm:

-   Làm việc với DOM.
-   Interpolation `{{ data }}`.
-   Filter.
-   Các form control/directive nhận dữ liệu người dùng.

Ví dụ tổng hợp:

```html
<div ng-app ng-init="student = {name: 'Trần Hữu Đang', score: 8.5}">
    <label>Tên:</label>
    <input ng-model="student.name">

    <p>
        Sinh viên:
        {{ student.name | uppercase }}
    </p>

    <p>
        Điểm: {{ student.score }}
    </p>
</div>
```

---

## 11. AngularJS kết hợp WebSocket

Ý tưởng của slide:

-   Server có dữ liệu mới.
-   Dữ liệu được đẩy tới client gần như tức thời.
-   Ứng dụng cập nhật Model.
-   AngularJS cập nhật View theo Model.

Luồng khái niệm:

```text
Server
  ↓
WebSocket message
  ↓
JavaScript/AngularJS
  ↓
Model
  ↓
View
```

Ví dụ minh họa:

```javascript
var socket = new WebSocket("ws://example.com/socket");

socket.onmessage = function (event) {
    var data = JSON.parse(event.data);

    // Nếu callback chạy ngoài AngularJS digest,
    // cần đưa thay đổi trở lại AngularJS.
    $scope.$apply(function () {
        $scope.message = data.message;
    });
};
```

> Đây là ví dụ khái niệm. URL WebSocket phải được thay bằng server thực
> tế.

---

## 12. Firebase

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

## 13. Ví dụ Firebase Chat hoàn chỉnh

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

## 14. AngularJS kết hợp Firebase

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

## 15. Tổng kết

### JavaScript ecosystem

Các công nghệ được slide nhắc tới:

```text
Backbone.js
Bootstrap
Enyo
D3.js
Ember.js
Emscripten
Node.js
AngularJS
```

### AngularJS

Các khái niệm quan trọng nhất:

```text
ng-app
    ↓
Điểm bắt đầu AngularJS

ng-controller
    ↓
Controller quản lý dữ liệu/hành vi

$scope
    ↓
Cầu nối Controller ↔ View

ng-model
    ↓
Liên kết dữ liệu form

{{ expression }}
    ↓
Hiển thị dữ liệu

Two-Way Data Binding
    ↓
Model ↔ View
```

### Firebase

Các thao tác chính theo API trong slide:

```javascript
var ref = new Firebase("FIREBASE_URL");
```

Ghi/thay dữ liệu:

```javascript
ref.set(data);
```

Thêm dữ liệu vào danh sách:

```javascript
ref.push(data);
```

Lắng nghe phần tử mới:

```javascript
ref.on("child_added", function (snapshot) {
    var data = snapshot.val();
});
```

Lắng nghe giá trị:

```javascript
ref.on("value", function (snapshot) {
    var data = snapshot.val();
});
```

---

## Bài tập

### Bài 1. Vai trò của `ng-app`

`ng-app` có nhiệm vụ gì?

<details>
<summary><b>Bài giải</b></summary>

Đánh dấu vùng AngularJS quản lý và điểm bootstrap của
ứng dụng.

</details>

### Bài 2. Vai trò của `ng-model`

`ng-model` dùng để làm gì?

<details>
<summary><b>Bài giải</b></summary>

Liên kết dữ liệu giữa form control và model/scope.

</details>

### Bài 3. Phân tích Two-Way Data Binding

Đoạn sau có tác dụng gì?

```html
<input ng-model="name">
<p>Hello {{ name }}</p>
```

<details>
<summary><b>Bài giải</b></summary>

Giá trị nhập vào input được gán vào `name`; `{{ name }}`
hiển thị giá trị đó và cập nhật theo dữ liệu.

</details>

### Bài 4. Vai trò của `$scope`

`$scope` có vai trò gì?

<details>
<summary><b>Bài giải</b></summary>

Chứa dữ liệu/hàm được chia sẻ giữa controller và view
trong AngularJS 1.x kiểu truyền thống.

</details>

### Bài 5. Phân biệt `set()` và `push()`

Khác nhau cơ bản giữa `set()` và `push()` trong ví dụ Firebase?

```javascript
ref.set(data);
ref.push(data);
```

<details>
<summary><b>Bài giải</b></summary>

`set()` ghi tại vị trí hiện tại; `push()` thêm một
child mới, phù hợp với danh sách.

</details>

### Bài 6. Event `child_added`

`child_added` dùng để làm gì?

```javascript
ref.on("child_added", function (snapshot) {
    ...
});
```

<details>
<summary><b>Bài giải</b></summary>

Nhận callback khi một child được thêm vào dữ liệu được
theo dõi.

</details>

### Bài 7. `$scope.$apply()` trong AngularJS + Firebase

Vì sao ví dụ AngularJS + Firebase gọi:

```javascript
$scope.$apply();
```

<details>
<summary><b>Bài giải</b></summary>

Để báo AngularJS cập nhật View khi dữ liệu được thay
đổi từ callback nằm ngoài chu trình cập nhật của AngularJS.

</details>

---

## Cheat Sheet

```html
<!-- Khởi động AngularJS -->
<body ng-app>

<!-- Controller -->
<div ng-controller="MyController">

<!-- Two-way binding -->
<input ng-model="name">

<!-- Interpolation -->
{{ name }}

<!-- Submit -->
<form ng-submit="save()">

<!-- Loop -->
<div ng-repeat="item in items">
    {{ item }}
</div>
```

```javascript
function MyController($scope) {
    $scope.name = "FPT Polytechnic";

    $scope.items = [
        "JavaScript",
        "AngularJS",
        "Firebase"
    ];

    $scope.save = function () {
        console.log($scope.name);
    };
}
```

Firebase API theo slide:

```javascript
var ref = new Firebase("FIREBASE_URL");

ref.set({
    name: "Trần Hữu Đang",
    text: "Hello"
});

ref.push({
    name: "Trần Hữu Đang",
    text: "Hi"
});

ref.on("child_added", function (snapshot) {
    console.log(snapshot.val());
});
```

---

## Lưu ý khi học

Tài liệu gốc là tài liệu lịch sử về AngularJS/Firebase, vì vậy nên phân
biệt:

```text
AngularJS 1.x  ≠  Angular 2+
Firebase API trong slide  ≠  Firebase SDK hiện đại
```

Nếu mục tiêu là **thi/ôn đúng môn WEB1042**, hãy nhớ cú pháp và tư duy
trong slide.

Nếu mục tiêu là **làm dự án mới**, cần học thêm Angular/React/Vue hiện
đại và Firebase SDK hiện hành.
