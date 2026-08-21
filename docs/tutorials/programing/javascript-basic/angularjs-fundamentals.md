# Bài 11. AngularJS Fundamentals

> Tài liệu học tập được biên soạn lại từ slide môn **Lập trình
> JavaScript -- Bài 7**.\
> Nội dung gốc sử dụng **AngularJS 1.x** và **Firebase API đời cũ**, vì
> vậy phần code dưới đây ưu tiên bám sát bài học để ôn tập; một số API
> hiện đã lỗi thời.

---


## 1. Mục tiêu bài học

Sau bài này, bạn cần:

- Có cái nhìn tổng quan về JavaScript framework/library trong bối cảnh bài học.
- Hiểu AngularJS 1.x là gì và phân biệt với Angular hiện đại.
- Xây dựng được ứng dụng AngularJS cơ bản.
- Hiểu `ng-app`, `ng-controller`, `ng-model` và `$scope`.
- Sử dụng AngularJS expression với `{{ ... }}`.
- Hiểu filter và một số directive cơ bản.
- Hiểu vai trò của Model, View và Controller.
- Giải thích được Two-Way Data Binding.
- Biết sử dụng `ng-submit` và `ng-repeat` trong ví dụ đơn giản.
- Có nền tảng để học cách AngularJS nhận dữ liệu từ nguồn realtime ở bài tiếp theo.

---
---

## 2. Bối cảnh trước khi học AngularJS

### 2.1. Ôn tập kiến thức JavaScript

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

### 2.2. JavaScript framework/library trong slide

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

## 3. Giới thiệu AngularJS

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

## 4. Ứng dụng AngularJS đầu tiên

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

## 5. Các thành phần cốt lõi

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

## 6. Expression và Filter

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

## 7. Controller và thao tác dữ liệu

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

## 8. MVC và Two-Way Data Binding

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

## 9. Template và Directive

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

## 10. AngularJS và dữ liệu realtime

### 10.1. Ý tưởng kết hợp WebSocket

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


### 10.2. Khi callback chạy ngoài AngularJS

Ví dụ trong bài cho thấy dữ liệu từ WebSocket có thể được nhận trong callback bên ngoài cơ chế cập nhật của AngularJS:

```javascript
socket.onmessage = function (event) {
    var data = JSON.parse(event.data);

    $scope.$apply(function () {
        $scope.message = data.message;
    });
};
```

Điểm cần nhớ ở đây là **nguồn dữ liệu bên ngoài có thể thay đổi Model**, sau đó AngularJS cần biết để cập nhật View.

Bài tiếp theo sẽ áp dụng đúng ý tưởng này với Firebase Realtime Database.

---

### Demo trực tiếp

<div class="tutorial-live-demo">
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.8.2/angular.min.js"></script>

    <div ng-app>
        <label for="ng-basic-name">Bạn tên là:</label>
        <input id="ng-basic-name" type="text" ng-model="name" placeholder="Nhập tên của bạn">
        <p>Xin chào <strong>{{ name || 'bạn' }}</strong></p>
    </div>
</div>

## 11. Bài tập

### Bài 1. Hello AngularJS

Tạo input:

```html
<input ng-model="name">
```

và hiển thị:

```html
<p>Hello {{ name }}</p>
```

Giải thích vì sao nội dung cập nhật khi người dùng gõ.

### Bài 2. Student Controller

Tạo controller chứa:

```text
student.name
student.score
```

Hiển thị hai giá trị trong View.

### Bài 3. Filter

Cho biến `name` và hiển thị tên bằng filter `uppercase`.

### Bài 4. Danh sách môn học

Trong `$scope`, tạo:

```javascript
$scope.subjects = [
    "JavaScript",
    "AngularJS",
    "HTML"
];
```

Hiển thị bằng `ng-repeat`.

### Bài 5. Thêm phần tử

Tạo form có `ng-model` và `ng-submit`. Khi submit, thêm dữ liệu vào Array và xóa nội dung input.

### Câu hỏi tự kiểm tra

1. AngularJS trong bài là phiên bản nào?
2. `ng-app` có nhiệm vụ gì?
3. `ng-controller` dùng để làm gì?
4. `$scope` có vai trò gì?
5. `ng-model` dùng để làm gì?
6. `{{ expression }}` có tác dụng gì?
7. Filter dùng để làm gì?
8. `ng-repeat` phù hợp với bài toán nào?
9. `ng-submit` được dùng ở đâu?
10. Model, View và Controller khác nhau thế nào?
11. Two-Way Data Binding là gì?
12. Vì sao callback từ nguồn dữ liệu bên ngoài có thể liên quan đến `$scope.$apply()`?

### Checklist kiến thức cần thuộc

- [ ] Phân biệt AngularJS 1.x với Angular 2+.
- [ ] Biết `ng-app`.
- [ ] Biết `ng-controller`.
- [ ] Hiểu `$scope`.
- [ ] Biết `ng-model`.
- [ ] Biết interpolation `{{ ... }}`.
- [ ] Biết filter.
- [ ] Biết `ng-repeat`.
- [ ] Biết `ng-submit`.
- [ ] Hiểu MVC/MV* trong ngữ cảnh bài.
- [ ] Hiểu Two-Way Data Binding.
- [ ] Hiểu ý tưởng AngularJS nhận dữ liệu realtime.

---

## 12. Tổng kết

```text
AngularJS Application
        ↓
      ng-app
        ↓
   ng-controller
        ↓
      $scope
    ↙       ↘
 Model     Function
    ↘       ↙
       View
        ↕
    ng-model
        ↕
Two-Way Data Binding
```

Bài tiếp theo sẽ nối từ **AngularJS + dữ liệu realtime** sang **Firebase Realtime Database**, sau đó kết hợp hai công nghệ trong cùng một ví dụ.
