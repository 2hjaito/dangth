# Bài 8. Sử dụng AngularJS

---

## 1. Mục tiêu bài học

Sau bài này cần nắm được:

-   Interpolation và data binding.
-   Directives.
-   Filter để định dạng/lọc dữ liệu.
-   AngularJS Form.
-   `ngModel` và Two-Way Data Binding.
-   Các trạng thái validation của form.
-   Cách hiển thị thông báo lỗi.
-   Các validator HTML5 như `required`, `pattern`, `minlength`,
    `maxlength`, `min`, `max`.

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

## 3. Directives

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

## 4. Các nhóm directive thường dùng

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

## 5. Tự định nghĩa Directive

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

## 6. Filter

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

## 7. Filter với mảng

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

## 9. Form và ngModel

AngularJS hỗ trợ các form control như:

``` text
input
select
textarea
```

`ng-model` tạo binding hai chiều giữa:

``` text
Model ↔ View
```

Ví dụ:

``` html
<div ng-app>

    <input
        type="text"
        ng-model="user.name"
    >

    <p>
        {{ user.name }}
    </p>

</div>
```

Khi nhập vào input:

``` text
View thay đổi
    ↓
user.name thay đổi
    ↓
{{ user.name }} cập nhật
```

---

## 10. Form Save / Reset

Slide minh họa form với:

-   `user`: dữ liệu đang nhập.
-   `master`: dữ liệu đã lưu.
-   `update(user)`: lưu bản copy.
-   `reset()`: khôi phục dữ liệu.

### 10.1 HTML

``` html
<body ng-app="formExample">

    <div ng-controller="ExampleController">

        <form novalidate class="simple-form">

            <label>
                Name:

                <input
                    type="text"
                    ng-model="user.name"
                >
            </label>

            <br>

            <label>
                E-mail:

                <input
                    type="email"
                    ng-model="user.email"
                >
            </label>

            <br>

            <input
                type="button"
                ng-click="reset()"
                value="Reset"
            >

            <input
                type="submit"
                ng-click="update(user)"
                value="Save"
            >

        </form>

        <pre>
user = {{ user | json }}
        </pre>

        <pre>
master = {{ master | json }}
        </pre>

    </div>

</body>
```

---

### 10.2 Controller

Code trong slide được chuẩn hóa lại:

``` javascript
angular
    .module("formExample", [])

    .controller(
        "ExampleController",
        [
            "$scope",

            function ($scope) {

                $scope.master = {};

                $scope.update = function (user) {

                    $scope.master =
                        angular.copy(user);
                };

                $scope.reset = function () {

                    $scope.user =
                        angular.copy(
                            $scope.master
                        );
                };

                $scope.reset();
            }
        ]
    );
```

---

### 10.3 Vì sao dùng `angular.copy()`?

Không nên viết đơn giản:

``` javascript
$scope.master = user;
```

vì hai biến có thể cùng tham chiếu đến một object.

Slide dùng:

``` javascript
$scope.master = angular.copy(user);
```

để tạo bản sao độc lập.

Reset:

``` javascript
$scope.user =
    angular.copy(
        $scope.master
    );
```

---

## 11. CSS State của AngularJS Form

AngularJS tự thêm các CSS class dựa trên trạng thái control/form.

Các class trong slide:

``` text
ng-valid
ng-invalid

ng-valid-[key]
ng-invalid-[key]

ng-pristine
ng-dirty

ng-touched
ng-untouched

ng-pending
```

---

### 11.1 `ng-valid`

Control hợp lệ.

``` text
ng-valid
```

---

### 11.2 `ng-invalid`

Control không hợp lệ.

``` text
ng-invalid
```

Ví dụ input email:

``` html
<input
    type="email"
    ng-model="user.email"
    required
>
```

Nếu giá trị sai định dạng email, AngularJS có thể thêm:

``` text
ng-invalid
ng-invalid-email
```

---

### 11.3 `ng-pristine`

Người dùng chưa thay đổi control.

``` text
ng-pristine
```

---

### 11.4 `ng-dirty`

Người dùng đã thay đổi giá trị.

``` text
ng-dirty
```

---

### 11.5 `ng-touched`

Control đã được focus rồi blur.

``` text
ng-touched
```

---

### 11.6 `ng-untouched`

Control chưa bị người dùng chạm/focus rồi rời khỏi.

``` text
ng-untouched
```

---

### 11.7 Ví dụ CSS Validation

HTML:

``` html
<div ng-controller="ExampleController">

    <form
        novalidate
        class="css-form"
    >

        <label>
            Name:

            <input
                type="text"
                ng-model="user.name"
                required
            >
        </label>

        <br>

        <label>
            E-mail:

            <input
                type="email"
                ng-model="user.email"
                required
            >
        </label>

    </form>

</div>
```

CSS theo slide:

``` css
.css-form input.ng-invalid.ng-touched {
    background-color: #FA787E;
}

.css-form input.ng-valid.ng-touched {
    background-color: #78FA89;
}
```

Ý nghĩa:

``` text
Touched + Invalid
        ↓
Hiển thị trạng thái lỗi

Touched + Valid
        ↓
Hiển thị trạng thái hợp lệ
```

---

## 12. Form Validation

### 12.1 Đặt tên cho form và input

Để truy cập trạng thái AngularJS, form và control nên có `name`.

``` html
<form name="form" novalidate>

    <input
        type="email"
        name="uEmail"
        ng-model="user.email"
        required
    >

</form>
```

Ta có thể truy cập:

``` javascript
form.uEmail
```

---

### 12.2 Kiểm tra `$touched`

``` html
<div ng-show="form.uEmail.$touched">
    Input đã được touched.
</div>
```

---

### 12.3 Kiểm tra form đã submit

``` html
<div ng-show="form.$submitted">
    Form đã submit.
</div>
```

Kết hợp:

``` html
<div
    ng-show="
        form.$submitted ||
        form.uEmail.$touched
    "
>
    ...
</div>
```

---

### 12.4 `$error.required`

``` html
<span
    ng-show="
        form.uEmail.$error.required
    "
>
    Tell us your email.
</span>
```

---

### 12.5 `$error.email`

``` html
<span
    ng-show="
        form.uEmail.$error.email
    "
>
    This is not a valid email.
</span>
```

---

### 12.6 Ví dụ hoàn chỉnh

``` html
<form
    name="form"
    novalidate
>

    <label>
        E-mail:

        <input
            type="email"
            ng-model="user.email"
            name="uEmail"
            required
        >
    </label>

    <br>

    <div
        ng-show="
            form.$submitted ||
            form.uEmail.$touched
        "
    >

        <span
            ng-show="
                form.uEmail.$error.required
            "
        >
            Tell us your email.
        </span>

        <span
            ng-show="
                form.uEmail.$error.email
            "
        >
            This is not a valid email.
        </span>

    </div>

    <button type="submit">
        Submit
    </button>

</form>
```

---

## 13. Radio và Checkbox

### 13.1 Radio

Ví dụ trong slide:

``` html
Gender:

<label>
    <input
        type="radio"
        ng-model="user.gender"
        value="male"
    >
    male
</label>

<label>
    <input
        type="radio"
        ng-model="user.gender"
        value="female"
    >
    female
</label>
```

Nếu chọn `male`:

``` javascript
user.gender === "male"
```

Nếu chọn `female`:

``` javascript
user.gender === "female"
```

---

### 13.2 Checkbox

``` html
<label>

    <input
        type="checkbox"
        ng-model="user.agree"
        name="userAgree"
        required
    >

    I agree

</label>
```

Nếu được chọn:

``` javascript
user.agree === true
```

Nếu checkbox có `required`, người dùng phải chọn để control hợp lệ.

---

## 14. Validation HTML5

Slide liệt kê các loại control HTML5:

``` text
text
number
url
email
date
radio
checkbox
```

và các validation phổ biến:

``` text
required
pattern
minlength
maxlength
min
max
```

---

### 14.1 `required`

``` html
<input
    type="text"
    ng-model="user.name"
    required
>
```

---

### 14.2 `pattern`

HTML:

``` html
<input
    type="text"
    ng-model="user.code"
    pattern="[A-Z]{3}"
>
```

AngularJS:

``` html
<input
    type="text"
    ng-model="user.code"
    ng-pattern="/^[A-Z]{3}$/"
>
```

---

### 14.3 `minlength`

``` html
<input
    type="text"
    ng-model="user.username"
    ng-minlength="3"
>
```

---

### 14.4 `maxlength`

``` html
<input
    type="text"
    ng-model="user.username"
    ng-maxlength="20"
>
```

---

### 14.5 `min`

``` html
<input
    type="number"
    ng-model="user.age"
    min="18"
>
```

---

### 14.6 `max`

``` html
<input
    type="number"
    ng-model="user.age"
    max="100"
>
```

---

### 14.7 Ví dụ tổng hợp

``` html
<form
    name="studentForm"
    novalidate
>

    <label>
        Username

        <input
            type="text"
            name="username"
            ng-model="student.username"
            required
            ng-minlength="3"
            ng-maxlength="20"
        >
    </label>

    <br>

    <label>
        Email

        <input
            type="email"
            name="email"
            ng-model="student.email"
            required
        >
    </label>

    <br>

    <label>
        Age

        <input
            type="number"
            name="age"
            ng-model="student.age"
            min="18"
            max="100"
        >
    </label>

</form>
```

Kiểm tra lỗi:

``` html
<p
    ng-show="
        studentForm.username.$error.required
    "
>
    Username is required.
</p>

<p
    ng-show="
        studentForm.username.$error.minlength
    "
>
    Username quá ngắn.
</p>

<p
    ng-show="
        studentForm.email.$error.email
    "
>
    Email không hợp lệ.
</p>

<p
    ng-show="
        studentForm.age.$error.min
    "
>
    Tuổi phải từ 18.
</p>
```

---

## 15. ngModelController và custom validation

Slide giới thiệu:

``` text
ngModelController
ngModelController.$error
$validators(modelValue, viewValue)
$setValidity(...)
```

### 15.1 `$error`

Một control có thể chứa các trạng thái lỗi:

``` javascript
form.email.$error
```

Ví dụ:

``` javascript
{
    required: true,
    email: true
}
```

Tùy trạng thái thực tế.

---

### 15.2 `$validators`

AngularJS cho phép thêm validator tùy chỉnh thông qua
`ngModelController.$validators`.

Ví dụ directive kiểm tra số chẵn:

``` javascript
app.directive(
    "evenNumber",
    function () {

        return {
            require: "ngModel",

            link: function (
                scope,
                element,
                attrs,
                ngModelController
            ) {

                ngModelController
                    .$validators
                    .evenNumber =
                    function (
                        modelValue,
                        viewValue
                    ) {

                        var value =
                            modelValue ||
                            viewValue;

                        if (
                            ngModelController
                                .$isEmpty(value)
                        ) {
                            return true;
                        }

                        return value % 2 === 0;
                    };
            }
        };
    }
);
```

HTML:

``` html
<form name="myForm">

    <input
        type="number"
        name="number"
        ng-model="number"
        even-number
    >

    <span
        ng-show="
            myForm.number.$error.evenNumber
        "
    >
        Vui lòng nhập số chẵn.
    </span>

</form>
```

---

### 15.3 `$setValidity()`

Có thể chủ động đặt trạng thái validation:

``` javascript
ngModelController.$setValidity(
    "myValidator",
    true
);
```

Hợp lệ:

``` javascript
$setValidity("myValidator", true);
```

Không hợp lệ:

``` javascript
$setValidity("myValidator", false);
```

Tuy nhiên với AngularJS hỗ trợ `$validators`, cách khai báo validator
bằng:

``` javascript
ngModelController.$validators
```

thường rõ ràng hơn.

---

## 16. Cheat Sheet

## AngularJS App

``` html
<body ng-app="myApp">
```

``` javascript
var app = angular.module(
    "myApp",
    []
);
```

---

## Controller

``` html
<div ng-controller="MainController">
    {{ name }}
</div>
```

``` javascript
app.controller(
    "MainController",
    function ($scope) {
        $scope.name =
            "FPT Polytechnic";
    }
);
```

---

## Two-Way Binding

``` html
<input ng-model="name">

<p>{{ name }}</p>
```

---

## `ng-bind`

``` html
<span ng-bind="name"></span>
```

Tương tự về mục tiêu hiển thị:

``` html
<span>{{ name }}</span>
```

---

## `ng-click`

``` html
<button ng-click="save()">
    Save
</button>
```

---

## `ng-repeat`

``` html
<li ng-repeat="item in items">
    {{ item }}
</li>
```

---

## `ng-show`

``` html
<p ng-show="isVisible">
    Hello
</p>
```

---

## `ng-if`

``` html
<p ng-if="age >= 18">
    Adult
</p>
```

---

## Filter

``` html
{{ name | uppercase }}
```

``` html
{{ price | currency }}
```

``` html
{{ birthday | date:'dd/MM/yyyy' }}
```

``` html
{{ object | json }}
```

---

## Search bằng filter

``` html
<input ng-model="keyword">

<li
    ng-repeat="
        student in students
        | filter:keyword
    "
>
    {{ student.name }}
</li>
```

---

## Sort

``` html
<li
    ng-repeat="
        student in students
        | orderBy:'name'
    "
>
    {{ student.name }}
</li>
```

---

## Form

``` html
<form
    name="myForm"
    novalidate
>

    <input
        type="email"
        name="email"
        ng-model="user.email"
        required
    >

</form>
```

---

## Validation

``` html
myForm.email.$valid
myForm.email.$invalid
myForm.email.$touched
myForm.email.$dirty
myForm.email.$error
```

Trong expression:

``` html
<p>
    Valid:
    {{ myForm.email.$valid }}
</p>
```

---

## Required Error

``` html
<span
    ng-show="
        myForm.email.$error.required
    "
>
    Email bắt buộc.
</span>
```

---

## Email Error

``` html
<span
    ng-show="
        myForm.email.$error.email
    "
>
    Email không hợp lệ.
</span>
```

---

## 17. Câu hỏi tự ôn tập

## Câu 1

Interpolation sử dụng cú pháp nào?

**Đáp án:**

``` html
{{ expression }}
```

---

## Câu 2

`ng-model` dùng để làm gì?

**Đáp án:** Liên kết dữ liệu giữa model và form control/View, thường tạo
Two-Way Data Binding.

---

## Câu 3

Directive nào khởi tạo AngularJS application?

**Đáp án:**

``` html
ng-app
```

---

## Câu 4

Directive nào dùng để lặp danh sách?

**Đáp án:**

``` html
ng-repeat
```

---

## Câu 5

Viết filter chuyển chuỗi thành chữ hoa.

``` html
{{ name | uppercase }}
```

---

## Câu 6

Filter nào dùng để sắp xếp?

``` text
orderBy
```

Ví dụ:

``` html
<div
    ng-repeat="
        student in students
        | orderBy:'name'
    "
>
    {{ student.name }}
</div>
```

---

## Câu 7

`ng-valid` và `ng-invalid` khác nhau thế nào?

``` text
ng-valid
→ control hợp lệ

ng-invalid
→ control không hợp lệ
```

---

## Câu 8

`ng-pristine` và `ng-dirty` khác nhau thế nào?

``` text
ng-pristine
→ chưa bị thay đổi

ng-dirty
→ đã bị người dùng thay đổi
```

---

## Câu 9

`ng-touched` nghĩa là gì?

Control đã được focus rồi mất focus.

---

## Câu 10

Làm sao kiểm tra lỗi `required`?

``` html
form.fieldName.$error.required
```

Ví dụ:

``` html
<span
    ng-show="
        form.email.$error.required
    "
>
    Email bắt buộc.
</span>
```

---

## Câu 11

Làm sao kiểm tra email sai định dạng?

``` html
form.email.$error.email
```

---

## Câu 12

Các validator HTML5 chính trong bài?

``` text
required
pattern
minlength
maxlength
min
max
```

---

## Bài thực hành tổng hợp

Ví dụ dưới đây kết hợp phần lớn kiến thức của Bài 8.

``` html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">

    <title>
        AngularJS Form Demo
    </title>

    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.8.2/angular.min.js"></script>

    <style>
        input.ng-invalid.ng-touched {
            border: 2px solid red;
        }

        input.ng-valid.ng-touched {
            border: 2px solid green;
        }
    </style>
</head>

<body ng-app="studentApp">

    <div ng-controller="StudentController">

        <h1>
            {{ title | uppercase }}
        </h1>

        <form
            name="studentForm"
            ng-submit="save()"
            novalidate
        >

            <div>
                <label>
                    Họ tên
                </label>

                <input
                    type="text"
                    name="name"
                    ng-model="student.name"
                    required
                    ng-minlength="3"
                >

                <span
                    ng-show="
                        studentForm.name.$touched &&
                        studentForm.name.$error.required
                    "
                >
                    Họ tên bắt buộc.
                </span>

                <span
                    ng-show="
                        studentForm.name.$touched &&
                        studentForm.name.$error.minlength
                    "
                >
                    Họ tên phải có ít nhất 3 ký tự.
                </span>
            </div>

            <div>
                <label>
                    Email
                </label>

                <input
                    type="email"
                    name="email"
                    ng-model="student.email"
                    required
                >

                <span
                    ng-show="
                        studentForm.email.$touched &&
                        studentForm.email.$error.required
                    "
                >
                    Email bắt buộc.
                </span>

                <span
                    ng-show="
                        studentForm.email.$touched &&
                        studentForm.email.$error.email
                    "
                >
                    Email không hợp lệ.
                </span>
            </div>

            <div>
                <label>
                    Tuổi
                </label>

                <input
                    type="number"
                    name="age"
                    ng-model="student.age"
                    min="18"
                    max="100"
                >
            </div>

            <div>
                Gender:

                <label>
                    <input
                        type="radio"
                        ng-model="student.gender"
                        value="male"
                    >
                    Male
                </label>

                <label>
                    <input
                        type="radio"
                        ng-model="student.gender"
                        value="female"
                    >
                    Female
                </label>
            </div>

            <div>
                <label>

                    <input
                        type="checkbox"
                        name="agree"
                        ng-model="student.agree"
                        required
                    >

                    Tôi đồng ý điều khoản

                </label>
            </div>

            <button
                type="submit"
                ng-disabled="studentForm.$invalid"
            >
                Save
            </button>

        </form>

        <h2>Preview</h2>

        <pre>{{ student | json }}</pre>

        <h2>Saved Data</h2>

        <pre>{{ master | json }}</pre>

    </div>

    <script>
        var app =
            angular.module(
                "studentApp",
                []
            );

        app.controller(
            "StudentController",
            function ($scope) {

                $scope.title =
                    "Student Form";

                $scope.student = {};

                $scope.master = {};

                $scope.save =
                    function () {

                        if (
                            $scope.studentForm
                                .$invalid
                        ) {
                            return;
                        }

                        $scope.master =
                            angular.copy(
                                $scope.student
                            );
                    };
            }
        );
    </script>

</body>
</html>
```

---

## Ghi nhớ nhanh

``` text
Interpolation
{{ expression }}

        ↓

Directive
ng-app
ng-model
ng-bind
ng-click
ng-repeat
ng-show
ng-if

        ↓

Filter
uppercase
lowercase
currency
date
filter
json
limitTo
number
orderBy

        ↓

Form
input
select
textarea
ng-model

        ↓

Validation State
$valid
$invalid
$pristine
$dirty
$touched
$untouched
$error

        ↓

Validation Rules
required
pattern
minlength
maxlength
min
max
```

> **Lưu ý phiên bản:** Nội dung môn học sử dụng **AngularJS 1.x**, một
> framework cũ khác với Angular hiện đại (Angular 2+). Tài liệu này giữ
> cú pháp AngularJS để phục vụ việc học và ôn tập WEB1042.
