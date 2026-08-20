# Bài 13. AngularJS Directives, Data Binding và Filters

---

## 1. Mục tiêu bài học

Sau bài này, bạn cần:

- Hiểu Interpolation và Data Binding trong AngularJS.
- Biết xử lý binding với một số thuộc tính boolean.
- Hiểu directive là gì và cách AngularJS chuẩn hóa tên directive.
- Sử dụng các directive phổ biến như `ng-bind`, `ng-model`, `ng-click`, `ng-show`, `ng-if` và `ng-repeat`.
- Nhận biết các nhóm directive thường dùng.
- Tạo được custom directive đơn giản bằng `.directive()`.
- Hiểu filter và cú pháp pipe `|`.
- Sử dụng các filter thông dụng như `currency`, `date`, `filter`, `json`, `limitTo`, `number`, `orderBy`, `uppercase`.
- Biết dùng filter trong controller.
- Tạo và inject custom filter.

---
---

## 2. Interpolation và Data Binding

### 2.1 Interpolation là gì?

Interpolation là cơ chế AngularJS đưa dữ liệu/expression vào HTML.

Cú pháp:

``` html
{{ expression }}
```

Ví dụ:

``` html
<div ng-app>
    <p>{{ 10 + 20 }}</p>
</div>
```

Kết quả:

``` text
30
```

Ví dụ với dữ liệu:

``` html
<div ng-app ng-init="name='FPT Polytechnic'">
    <h1>{{ name }}</h1>
</div>
```

---

### 2.2 `undefined` và `null`

Trong template AngularJS, giá trị `undefined` hoặc `null` thường được
render thành chuỗi rỗng thay vì hiển thị chữ `undefined`/`null`.

Ví dụ:

``` html
<div ng-app>
    <p>{{ notExists }}</p>
</div>
```

Nếu `notExists` chưa có giá trị, phần hiển thị thường trống.

---

### 2.3 Object và `toString()`

Khi interpolation xử lý object, AngularJS có cơ chế chuyển giá trị thành
chuỗi.

Ví dụ JavaScript:

``` javascript
var student = {
    name: "FPT",
    toString: function () {
        return this.name;
    }
};
```

Ý tưởng trong slide liên quan tới việc kiểm tra:

``` javascript
myObject.toString !== Object.prototype.toString
```

---

### 2.4 Binding thuộc tính boolean

Với các thuộc tính HTML như:

``` text
disabled
required
selected
checked
readonly
open
```

AngularJS cung cấp các directive tương ứng như `ng-disabled`,
`ng-required`, `ng-checked`, `ng-selected`.

Ví dụ:

``` html
<div ng-app>
    <input
        type="checkbox"
        ng-model="isDisabled"
    >

    <button ng-disabled="isDisabled">
        Disabled
    </button>
</div>
```

Khi checkbox được chọn:

``` text
isDisabled = true
```

AngularJS làm button bị disable.

---

## 3. Directives trong AngularJS

### 3.1 Directive là gì?

Directive là thành phần mở rộng HTML do AngularJS định nghĩa.

Directive có thể xuất hiện dưới dạng:

-   Attribute.
-   Element.
-   CSS class.
-   Comment (tùy cách khai báo directive).

AngularJS sử dụng `$compile` để phân tích DOM và xử lý directive.

---

### 3.2 Quy tắc đặt tên

AngularJS chuẩn hóa nhiều cách viết directive.

Ví dụ directive:

``` text
ngBind
```

có thể xuất hiện dưới các dạng:

``` html
ng-bind
ng:bind
ng_bind
data-ng-bind
x-ng-bind
```

Ví dụ từ bài:

``` html
<body ng-app="docsBindExample">
    <div ng-controller="Controller">

        Hello
        <input ng-model="name">

        <span ng-bind="name"></span>

        <span ng:bind="name"></span>

        <span ng_bind="name"></span>

        <span data-ng-bind="name"></span>

        <span x-ng-bind="name"></span>

    </div>
</body>
```

> Trong code thực tế nên ưu tiên cú pháp chuẩn, dễ đọc:

``` html
ng-bind="name"
```

hoặc:

``` html
data-ng-bind="name"
```

---

### 3.3 Các directive chính

### `ng-app`

Khởi tạo ứng dụng AngularJS.

``` html
<body ng-app="myApp">
</body>
```

JavaScript:

``` javascript
var app = angular.module("myApp", []);
```

---

### `ng-init`

Khởi tạo dữ liệu trực tiếp trong View.

``` html
<div ng-app ng-init="name='FPT Polytechnic'">
    {{ name }}
</div>
```

> Với ứng dụng thực tế, dữ liệu lớn nên được khởi tạo trong
> controller/service thay vì lạm dụng `ng-init`.

---

### `ng-model`

Gắn dữ liệu ứng dụng với các form control như:

``` text
input
select
textarea
```

Ví dụ:

``` html
<input type="text" ng-model="student.name">

<p>{{ student.name }}</p>
```

---

## 4. Các nhóm Directive thường dùng

Slide chia directive thành các nhóm chính.

### 4.1 Application

``` text
ng-app
ng-controller
```

Ví dụ:

``` html
<body ng-app="myApp">
    <div ng-controller="MainController">
        ...
    </div>
</body>
```

---

### 4.2 Binding

``` text
ng-bind
ng-model
ng-init
ng-src
ng-style
```

Ví dụ:

``` html
<p ng-bind="name"></p>

<input ng-model="name">

<img ng-src="{{ imageUrl }}">

<div ng-style="myStyle">
    Hello
</div>
```

---

### 4.3 Operation

``` text
ng-change
ng-checked
ng-click
ng-href
ng-selected
```

Ví dụ:

``` html
<button ng-click="save()">
    Save
</button>
```

``` html
<input
    ng-model="keyword"
    ng-change="search()"
>
```

---

### 4.4 Template

Các directive được slide liệt kê:

``` text
ng-csp
ng-disabled
ng-hide
ng-show
ng-if
ng-mouse*
ng-repeat
ng-switch
ng-transclude
ng-view
ng-include
```

Ví dụ `ng-show`:

``` html
<p ng-show="isLoggedIn">
    Welcome!
</p>
```

Ví dụ `ng-if`:

``` html
<div ng-if="age >= 18">
    Người dùng đủ 18 tuổi.
</div>
```

Ví dụ `ng-repeat`:

``` html
<ul>
    <li ng-repeat="student in students">
        {{ student.name }}
    </li>
</ul>
```

---

### 4.5 Form

Các directive liên quan form:

``` text
ng-pattern
ng-minlength
ng-maxlength
ng-required
ng-list
ng-true-value
ng-false-value
ng-options
ng-submit
```

Ví dụ:

``` html
<form ng-submit="save()">
    <input
        type="text"
        ng-model="user.name"
        ng-required="true"
        ng-minlength="3"
        ng-maxlength="30"
    >

    <button type="submit">
        Save
    </button>
</form>
```

---

## 5. Custom Directive

AngularJS cho phép tạo directive bằng:

``` javascript
.directive()
```

Ví dụ cơ bản từ slide, được hoàn chỉnh thành module chạy được:

``` javascript
var app = angular.module("myApp", []);

app.directive("myDirective", function () {
    return {
        template:
            "<h1>Chào mừng các bạn đến với FPT</h1>"
    };
});
```

HTML:

``` html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">

    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.8.2/angular.min.js"></script>
</head>

<body ng-app="myApp">

    <my-directive></my-directive>

    <script>
        var app = angular.module("myApp", []);

        app.directive("myDirective", function () {
            return {
                template:
                    "<h1>Chào mừng các bạn đến với FPT</h1>"
            };
        });
    </script>

</body>
</html>
```

### Vì sao khai báo `myDirective` nhưng HTML là `my-directive`?

AngularJS chuẩn hóa tên directive.

JavaScript:

``` javascript
myDirective
```

HTML:

``` html
<my-directive></my-directive>
```

---

## 6. Filters trong AngularJS

### 6.1 Khái niệm

Filter dùng để:

-   Định dạng dữ liệu.
-   Biến đổi dữ liệu trước khi hiển thị.
-   Lọc tập dữ liệu.

Filter có thể được sử dụng:

-   Trong template.
-   Trong controller.
-   Trong service.

---

### 6.2 Cú pháp

Một filter:

``` html
{{ expression | filter }}
```

Nhiều filter:

``` html
{{ expression | filter1 | filter2 }}
```

Filter có tham số:

``` html
{{ expression | filter:argument1:argument2 }}
```

---

### 6.3 Các filter thông dụng

### `currency`

Định dạng tiền tệ.

``` html
{{ price | currency }}
```

Ví dụ:

``` html
<div ng-app ng-init="price=100">
    Price: {{ price | currency }}
</div>
```

---

### `date`

Định dạng ngày tháng.

``` html
{{ birthday | date:'dd/MM/yyyy' }}
```

---

### `filter`

Lọc phần tử từ mảng.

``` html
<div
    ng-repeat="student in students | filter:keyword"
>
    {{ student.name }}
</div>
```

---

### `json`

Hiển thị object theo dạng JSON.

``` html
<pre>{{ user | json }}</pre>
```

---

### `limitTo`

Giới hạn số phần tử hoặc ký tự.

``` html
{{ name | limitTo:5 }}
```

Mảng:

``` html
<li ng-repeat="item in items | limitTo:3">
    {{ item }}
</li>
```

---

### `lowercase`

``` html
{{ name | lowercase }}
```

---

### `number`

Định dạng số.

``` html
{{ price | number }}
```

Số chữ số thập phân:

``` html
{{ score | number:2 }}
```

---

### `orderBy`

Sắp xếp mảng.

``` html
<li ng-repeat="student in students | orderBy:'name'">
    {{ student.name }}
</li>
```

Giảm dần:

``` html
<li ng-repeat="student in students | orderBy:'-score'">
    {{ student.name }} - {{ student.score }}
</li>
```

---

### `uppercase`

``` html
{{ name | uppercase }}
```

Ví dụ trong slide:

``` html
<p>
    Cao đẳng {{ 'fpt' | uppercase }}
</p>
```

Kết quả:

``` text
Cao đẳng FPT
```

Ví dụ:

``` html
<h1>
    Price: {{ price | currency }}
</h1>
```

---

## 7. Sử dụng Filter với Collection

Slide sử dụng `filterFilter` trực tiếp trong controller.

### 7.1 JavaScript

``` javascript
(function (angular) {
    "use strict";

    angular
        .module("FilterInControllerModule", [])
        .controller(
            "FilterController",
            [
                "filterFilter",

                function FilterController(filterFilter) {

                    this.array = [
                        { name: "Cao đẳng" },
                        { name: "FPT" },
                        { name: "Polytechnic" }
                    ];

                    this.filteredArray =
                        filterFilter(
                            this.array,
                            "a"
                        );
                }
            ]
        );

})(window.angular);
```

Ở đây:

``` javascript
filterFilter(this.array, "a")
```

lọc các phần tử phù hợp với chuỗi `"a"`.

---

### 7.2 HTML

``` html
<body ng-app="FilterInControllerModule">

    <div ng-controller="FilterController as ctrl">

        <div>
            All entries:

            <span
                ng-repeat="entry in ctrl.array"
            >
                {{ entry.name }}
            </span>
        </div>

        <div>
            Entries that contain an "a":

            <span
                ng-repeat="entry in ctrl.filteredArray"
            >
                {{ entry.name }}
            </span>
        </div>

    </div>

</body>
```

---

### 7.3 Ví dụ hoàn chỉnh

``` html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">

    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.8.2/angular.min.js"></script>
</head>

<body ng-app="FilterInControllerModule">

    <div ng-controller="FilterController as ctrl">

        <h3>All entries</h3>

        <ul>
            <li ng-repeat="entry in ctrl.array">
                {{ entry.name }}
            </li>
        </ul>

        <h3>Entries that contain "a"</h3>

        <ul>
            <li ng-repeat="entry in ctrl.filteredArray">
                {{ entry.name }}
            </li>
        </ul>

    </div>

    <script>
        (function (angular) {
            "use strict";

            angular
                .module(
                    "FilterInControllerModule",
                    []
                )
                .controller(
                    "FilterController",
                    [
                        "filterFilter",

                        function (filterFilter) {
                            this.array = [
                                { name: "Cao đẳng" },
                                { name: "FPT" },
                                { name: "Polytechnic" }
                            ];

                            this.filteredArray =
                                filterFilter(
                                    this.array,
                                    "a"
                                );
                        }
                    ]
                );

        })(window.angular);
    </script>

</body>
</html>
```

---

## 8. Custom Filter

Slide giới thiệu cấu trúc:

``` javascript
angular
    .module("myReverseFilterApp", [])
    .filter("reverse", function () {
        // custom filter
    });
```

Ta có thể hoàn chỉnh filter đảo chuỗi như sau.

### 8.1 Tạo filter

``` javascript
angular
    .module("myReverseFilterApp", [])
    .filter("reverse", function () {

        return function (input) {

            if (!input) {
                return "";
            }

            return input
                .split("")
                .reverse()
                .join("");
        };

    });
```

HTML:

``` html
<div ng-app="myReverseFilterApp">
    {{ "AngularJS" | reverse }}
</div>
```

Kết quả:

``` text
SJralugnA
```

---

### 8.2 Inject filter vào Controller

AngularJS cho phép inject filter bằng tên:

``` text
<tên-filter>Filter
```

Nếu filter tên:

``` javascript
reverse
```

thì dependency là:

``` javascript
reverseFilter
```

Ví dụ:

``` javascript
(function (angular) {
    "use strict";

    angular
        .module("myReverseFilterApp", [])

        .filter("reverse", function () {

            return function (input) {

                if (!input) {
                    return "";
                }

                return input
                    .split("")
                    .reverse()
                    .join("");
            };

        })

        .controller(
            "MyController",
            [
                "$scope",
                "reverseFilter",

                function (
                    $scope,
                    reverseFilter
                ) {

                    $scope.name = "FPT";

                    $scope.reversed =
                        reverseFilter(
                            $scope.name
                        );
                }
            ]
        );

})(window.angular);
```

---


## 9. Ví dụ tổng hợp

```html
<body ng-app="studentApp">
    <div ng-controller="StudentController">
        <input
            ng-model="keyword"
            placeholder="Tìm sinh viên"
        >

        <ul>
            <li
                ng-repeat="
                    student in students
                    | filter:keyword
                    | orderBy:'name'
                "
            >
                {{ student.name | uppercase }}
                -
                {{ student.score | number:1 }}
            </li>
        </ul>
    </div>
</body>
```

```javascript
var app = angular.module("studentApp", []);

app.controller(
    "StudentController",
    function ($scope) {
        $scope.students = [
            { name: "An", score: 8.5 },
            { name: "Bình", score: 7 },
            { name: "Chi", score: 9 }
        ];
    }
);
```

Luồng kiến thức:

```text
ng-model
   ↓
keyword
   ↓
filter
   ↓
orderBy
   ↓
ng-repeat
   ↓
uppercase / number
   ↓
View
```

---

## 10. Bài tập

### Bài 1. Binding

Tạo input dùng `ng-model="name"` và hiển thị cùng dữ liệu bằng cả:

```html
{{ name }}
```

và:

```html
<span ng-bind="name"></span>
```

### Bài 2. `ng-show` và `ng-if`

Tạo checkbox điều khiển việc hiển thị một đoạn nội dung. Thử lần lượt `ng-show` và `ng-if`.

### Bài 3. Danh sách sinh viên

Tạo Array sinh viên và hiển thị bằng `ng-repeat`.

### Bài 4. Search và Sort

Thêm input tìm kiếm bằng `filter:keyword` và sắp xếp bằng `orderBy:'name'`.

### Bài 5. Custom Directive

Tạo directive:

```text
student-header
```

hiển thị tiêu đề của danh sách sinh viên.

### Bài 6. Custom Filter

Tạo filter `reverse` để đảo chuỗi và sử dụng cả trong template lẫn controller.

### Câu hỏi tự kiểm tra

1. Interpolation dùng cú pháp nào?
2. `ng-bind` và interpolation có cùng mục tiêu gì?
3. `ng-model` tạo loại binding nào?
4. Vì sao AngularJS có `ng-disabled`, `ng-required`, `ng-checked`?
5. Directive là gì?
6. `myDirective` được viết thế nào trong HTML?
7. `ng-repeat` dùng để làm gì?
8. `ng-show` và `ng-if` có cùng mục đích hiển thị nhưng khác nhau về DOM như thế nào?
9. Filter dùng để làm gì?
10. Cú pháp truyền tham số cho filter là gì?
11. `filter` và `orderBy` thường được dùng với loại dữ liệu nào?
12. Custom filter được đăng ký bằng method nào?

---

## 11. Tổng kết

```text
AngularJS View
├── Interpolation
│   └── {{ expression }}
├── Directive
│   ├── ng-bind
│   ├── ng-model
│   ├── ng-click
│   ├── ng-show / ng-if
│   └── ng-repeat
└── Filter
    ├── uppercase
    ├── currency
    ├── filter
    └── orderBy
```

Bài tiếp theo sẽ tập trung riêng vào **AngularJS Form, ngModel và Validation**.
