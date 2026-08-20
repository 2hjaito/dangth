# Bài 14. AngularJS Forms và Validation

> Bài học này nối tiếp **Bài 13: AngularJS Directives, Data Binding và Filters**. Sau khi đã sử dụng `ng-model` để liên kết dữ liệu, bài này tập trung vào cách AngularJS quản lý form, trạng thái control và validation.

## 1. Mục tiêu bài học

Sau bài này, bạn cần:

- Hiểu `ngModel` trong AngularJS Form.
- Sử dụng Two-Way Data Binding với `input`, `select` và `textarea`.
- Biết lưu và reset dữ liệu bằng `angular.copy()`.
- Hiểu các trạng thái `$valid`, `$invalid`, `$pristine`, `$dirty`, `$touched`, `$untouched` và `$error`.
- Biết đặt `name` cho form/control để truy cập trạng thái.
- Hiển thị lỗi dựa trên `$touched` hoặc `$submitted`.
- Sử dụng `required`, `pattern`, `minlength`, `maxlength`, `min` và `max`.
- Làm việc với Radio và Checkbox.
- Hiểu `ngModelController`.
- Tạo custom validator bằng `$validators`.
- Hiểu vai trò của `$setValidity()`.

---

## 2. Form và `ngModel`

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

## 3. Form Save / Reset

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

## 4. Trạng thái của AngularJS Form

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

## 5. Form Validation

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

## 6. Radio và Checkbox

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

## 7. Validation Rules

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

## 8. `ngModelController` và Custom Validation

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

## 9. Ví dụ tổng hợp: Student Form

```html
<form
    name="studentForm"
    ng-submit="save()"
    novalidate
>
    <input
        type="text"
        name="name"
        ng-model="student.name"
        required
        ng-minlength="3"
    >

    <span
        ng-show="
            (studentForm.$submitted ||
             studentForm.name.$touched) &&
            studentForm.name.$error.required
        "
    >
        Họ tên bắt buộc.
    </span>

    <input
        type="email"
        name="email"
        ng-model="student.email"
        required
    >

    <span
        ng-show="
            studentForm.email.$touched &&
            studentForm.email.$error.email
        "
    >
        Email không hợp lệ.
    </span>

    <button
        type="submit"
        ng-disabled="studentForm.$invalid"
    >
        Save
    </button>
</form>
```

```javascript
$scope.save = function () {
    if ($scope.studentForm.$invalid) {
        return;
    }

    $scope.master =
        angular.copy($scope.student);
};
```

Luồng validation:

```text
Người dùng nhập
      ↓
ngModel
      ↓
Validator
      ↓
$valid / $invalid
      ↓
$error
      ↓
$touched / $submitted
      ↓
Thông báo lỗi
```

---

## 10. Bài tập

### Bài 1. Form cơ bản

Tạo form gồm Họ tên và Email. Hiển thị object đang nhập bằng:

```html
<pre>{{ user | json }}</pre>
```

### Bài 2. Save / Reset

Tạo `user` và `master`, sau đó sử dụng `angular.copy()` để Save và Reset.

### Bài 3. Validation State

Hiển thị trực tiếp:

```text
$valid
$invalid
$pristine
$dirty
$touched
$untouched
```

của một input để quan sát sự thay đổi.

### Bài 4. Validation Message

Email phải:

- bắt buộc nhập;
- đúng định dạng email.

Chỉ hiển thị lỗi khi control `$touched` hoặc form `$submitted`.

### Bài 5. Student Form

Tạo:

```text
Name: required, minlength=3
Email: required, email
Age: min=18, max=100
Gender: radio
Agree: checkbox required
```

Disable nút Save khi form `$invalid`.

### Bài 6. Custom Validator

Tạo directive `even-number` sử dụng:

```javascript
ngModelController.$validators
```

để chỉ chấp nhận số chẵn.

### Câu hỏi tự kiểm tra

1. `ng-model` có vai trò gì trong form?
2. Vì sao Save/Reset dùng `angular.copy()`?
3. `$valid` và `$invalid` khác nhau thế nào?
4. `$pristine` và `$dirty` khác nhau thế nào?
5. `$touched` có ý nghĩa gì?
6. `$error` chứa gì?
7. Vì sao form và input cần `name`?
8. `$submitted` thuộc form hay control?
9. Làm sao kiểm tra lỗi `required`?
10. Làm sao kiểm tra lỗi email?
11. `ng-minlength` và `ng-maxlength` dùng làm gì?
12. Radio cùng nhóm liên kết vào model như thế nào?
13. Checkbox `required` hợp lệ khi nào?
14. `ngModelController.$validators` dùng để làm gì?
15. `$setValidity()` có tác dụng gì?

### Checklist kiến thức cần thuộc

- [ ] Hiểu `ngModel`.
- [ ] Biết Save/Reset với `angular.copy()`.
- [ ] Biết `$valid` / `$invalid`.
- [ ] Biết `$pristine` / `$dirty`.
- [ ] Biết `$touched` / `$untouched`.
- [ ] Biết `$error`.
- [ ] Biết `$submitted`.
- [ ] Biết các validation rule chính.
- [ ] Biết Radio và Checkbox.
- [ ] Biết `ngModelController`.
- [ ] Biết `$validators`.
- [ ] Hiểu `$setValidity()`.

---

## 11. Tổng kết

```text
AngularJS Form
      ↓
   ng-model
      ↓
ngModelController
      ↓
Validation Rules
├── required
├── pattern
├── minlength / maxlength
└── min / max
      ↓
Form State
├── $valid / $invalid
├── $pristine / $dirty
├── $touched / $untouched
├── $submitted
└── $error
      ↓
Validation Message
```

Hai bài nối tiếp nhau theo đúng mạch:

```text
Data Binding
    ↓
Directives
    ↓
Filters
    ↓
ngModel
    ↓
AngularJS Form
    ↓
Validation
```
