# Bài 5. Object và lập trình hướng đối tượng trong JavaScript

## 1. Mục tiêu bài học

Sau bài này, bạn cần:

- Hiểu khái niệm programming paradigm và OOP.
- Phân biệt object, property, method, class và instance.
- Tạo và sử dụng object literal.
- Truy cập thuộc tính bằng dot notation và bracket notation.
- Hiểu `this` trong method.
- Biết constructor function, prototype và cú pháp `class`.
- Tạo instance bằng `new` và kiểm tra bằng `instanceof`.
- Quản lý nhiều object bằng Array hoặc object collection.
- Duyệt object với `for...in`, `Object.values()` và `Object.entries()`.
- Kiểm tra thuộc tính bằng `in` và `Object.hasOwn()`.

---
---


## 2. Từ Programming Paradigm đến OOP

### 2.1. Programming paradigm là gì?

Lập trình dùng để giải quyết nhiều loại vấn đề: tính toán, logic, quản
lý dữ liệu, giao diện người dùng,...

**Programming paradigm** có thể hiểu là một cách tiếp cận/tổ chức chương
trình để giải quyết vấn đề.

Một số paradigm thường gặp:

```text
Lập trình cấu trúc
Lập trình hướng sự kiện
Lập trình hướng đối tượng
Lập trình hàm
...
```

Không có một paradigm duy nhất phù hợp cho mọi bài toán. JavaScript là
ngôn ngữ đa mô hình nên có thể kết hợp nhiều phong cách.

---


### 2.2. OOP là gì?

**Object-Oriented Programming -- OOP** tổ chức chương trình xoay quanh
các **đối tượng**.

Có thể hình dung một đối tượng gồm:

```text
Object
├── Properties → dữ liệu / đặc tính
└── Methods    → hành vi / chức năng
```

Ví dụ một con mèo:

```text
Mèo
├── thuộc tính
│   ├── màu lông
│   ├── cân nặng
│   └── loại móng
└── phương thức
    ├── bắt chuột
    └── liếm lông
```

Trong chương trình, ta mô hình hóa những đặc tính và hành vi cần thiết
của thực thể chứ không nhất thiết mô phỏng mọi chi tiết của thế giới
thật.

---

## 3. Object, Property và Method

### 3.1. Object -- đối tượng

Object là tập hợp các cặp **key--value**.

Ví dụ hiện đại:

```javascript
const cat = {
    furColor: "tam thể",
    weight: 2,
    claws: "sắc",

    catchMouse() {
        console.log("Mèo đang bắt chuột");
    },

    lickFur() {
        console.log("Mèo đang liếm lông");
    }
};
```

Ở đây:

```text
furColor, weight, claws → properties
catchMouse, lickFur    → methods
```

---

### 3.2. Thuộc tính -- Property

Thuộc tính lưu dữ liệu của object.

```javascript
const flower = {};

flower.color = "Hồng";
flower.petals = 5;
```

Truy cập:

```javascript
console.log(flower.color);
console.log(flower.petals);
```

Có hai cú pháp chính:

```javascript
flower.color;
flower["color"];
```

Bracket notation hữu ích khi tên thuộc tính nằm trong biến:

```javascript
const key = "color";
console.log(flower[key]);
```

---

### 3.3. Thêm và thay đổi thuộc tính

```javascript
const user = {};

user.name = "Trần Hữu Đang";
user.age = 20;

user.age = 21;
```

Object khai báo bằng `const` vẫn có thể thay đổi thuộc tính:

```javascript
const user = { name: "Trần Hữu Đang" };
user.name = "Trần Hữu Đang"; // hợp lệ
```

Nhưng không thể gán object mới vào chính biến đó:

```javascript
// user = {}; // TypeError
```

---

### 3.4. Method -- phương thức

Method là function được lưu trong một thuộc tính của object.

```javascript
const flower = {
    color: "Hồng",

    spreadFragrance() {
        console.log("Hoa đang tỏa hương");
    }
};

flower.spreadFragrance();
```

Cú pháp cũ cũng hợp lệ:

```javascript
flower.spreadFragrance = function () {
    console.log("Hoa đang tỏa hương");
};
```

---

### 3.5. `this` trong method

`this` thường dùng để tham chiếu tới object nhận lời gọi method.

```javascript
const flower = {
    color: "Hồng",

    introduce() {
        console.log(`Tôi có màu ${this.color}`);
    }
};

flower.introduce();
```

Kết quả:

```text
Tôi có màu Hồng
```

### Cẩn thận với arrow function

Không nên dùng arrow function làm method nếu cần `this` theo cách trên:

```javascript
const flower = {
    color: "Hồng",
    introduce: () => {
        console.log(this.color);
    }
};
```

Arrow function không tạo `this` riêng; nó lấy `this` từ scope bên ngoài.

---


### 3.6. `new Object()` và object literal

Slide sử dụng:

```javascript
var flower = new Object();
```

Cú pháp này hợp lệ, nhưng object literal thường ngắn và rõ hơn:

```javascript
const flower = {};
```

Hoặc tạo sẵn dữ liệu:

```javascript
const flower = {
    color: "Hồng",
    petals: 5
};
```

---

## 4. Tạo nhiều object từ khuôn mẫu

### 4.1. Vì sao cần khuôn mẫu?

Nếu tạo nhiều object giống cấu trúc:

```javascript
const peachBlossom = {
    color: "Hồng",
    petals: 5
};

const rose = {
    color: "Đỏ",
    petals: 10
};

const chrysanthemum = {
    color: "Vàng",
    petals: 20
};
```

việc lặp lại code sẽ tăng nhanh.

Ta cần một **khuôn mẫu** để tạo nhiều object cùng cấu trúc.

---


### 4.2. Constructor function

Cách JavaScript truyền thống:

```javascript
function Flower(color, petals) {
    this.color = color;
    this.petals = petals;
}
```

Tạo object:

```javascript
const peachBlossom = new Flower("Hồng", 5);
const rose = new Flower("Đỏ", 10);
const chrysanthemum = new Flower("Vàng", 20);
```

Truy cập:

```javascript
console.log(rose.color);  // Đỏ
console.log(rose.petals); // 10
```

Quy ước: tên constructor viết hoa chữ cái đầu.

---

### 4.3. Constructor, method và prototype

Có thể viết:

```javascript
function Flower(color, petals) {
    this.color = color;
    this.petals = petals;

    this.spreadFragrance = function () {
        console.log(`Tôi có màu ${this.color}, tôi đang tỏa hương`);
    };
}
```

Nhưng cách này tạo một function `spreadFragrance` mới cho mỗi instance.

Tốt hơn với prototype:

```javascript
function Flower(color, petals) {
    this.color = color;
    this.petals = petals;
}

Flower.prototype.spreadFragrance = function () {
    console.log(`Tôi có màu ${this.color}, tôi đang tỏa hương`);
};
```

Các instance có thể dùng chung method qua prototype.

---


### 4.4. Khai báo class

ES2015 bổ sung cú pháp `class`:

```javascript
class Flower {
    constructor(color, petals) {
        this.color = color;
        this.petals = petals;
    }

    spreadFragrance() {
        console.log(`Tôi có màu ${this.color}, tôi đang tỏa hương`);
    }
}
```

Tạo instance:

```javascript
const peachBlossom = new Flower("Hồng", 5);
const rose = new Flower("Đỏ", 10);
```

Gọi method:

```javascript
peachBlossom.spreadFragrance();
rose.spreadFragrance();
```

---

### 4.5. Class và object khác nhau thế nào?

Có thể hình dung:

```text
Class = khuôn mẫu
Object/instance = sản phẩm được tạo từ khuôn mẫu
```

Ví dụ:

```text
Flower
├── peachBlossom
├── rose
└── chrysanthemum
```

Trong JavaScript, `class` là cú pháp được xây dựng trên cơ chế prototype
của ngôn ngữ; hiểu object và prototype vẫn rất quan trọng.

---

### 4.6. Kiểm tra instance

```javascript
const rose = new Flower("Đỏ", 10);

console.log(rose instanceof Flower); // true
```

---


## 5. Quản lý và duyệt nhiều object

### 5.1. Không dùng constructor như một collection

Slide có cách dạng:

```javascript
Hoa["Dao"] = new Hoa(...);
Hoa["Hong"] = new Hoa(...);
```

JavaScript cho phép function có property, nhưng cách này dễ làm lẫn lộn
giữa **constructor** và **collection**.

Nên dùng object riêng:

```javascript
const flowers = {
    dao: new Flower("Hồng", 5),
    hong: new Flower("Đỏ", 10),
    cuc: new Flower("Vàng", 20),
    lan: new Flower("Tím", 3)
};
```

---

### 5.2. Duyệt object

```javascript
for (const key in flowers) {
    flowers[key].spreadFragrance();
}
```

Nếu chỉ muốn own enumerable properties, cách rõ ràng hơn:

```javascript
for (const flower of Object.values(flowers)) {
    flower.spreadFragrance();
}
```

Hoặc cả key và value:

```javascript
for (const [name, flower] of Object.entries(flowers)) {
    console.log(name, flower.color);
}
```

---

### 5.3. Kiểm tra thuộc tính

Slide sử dụng toán tử `in`:

```javascript
if ("dao" in flowers) {
    console.log("Đã có hoa đào");
}
```

`in` kiểm tra cả property được kế thừa qua prototype chain.

Nếu chỉ muốn own property:

```javascript
if (Object.hasOwn(flowers, "dao")) {
    console.log("Đã có hoa đào");
}
```

---

### 5.4. Thêm và xóa thuộc tính động

```javascript
if (Object.hasOwn(flowers, "dao")) {
    flowers.dao.symbol = "Mùa xuân";
}

console.log(flowers.dao.symbol);
```

JavaScript object có tính động: có thể thêm/xóa property trong thời gian
chạy.

Xóa:

```javascript
delete flowers.dao.symbol;
```

---


## 6. Ví dụ tổng hợp: Class `Student`

```javascript
class Student {
    constructor(name, score) {
        this.name = name;
        this.score = score;
    }

    getResult() {
        return this.score >= 5 ? "Đạt" : "Chưa đạt";
    }

    introduce() {
        return `${this.name}: ${this.score} - ${this.getResult()}`;
    }
}

const students = [
    new Student("Nguyễn Văn A", 8),
    new Student("Trần Thị B", 4),
    new Student("Lê Văn C", 7)
];

for (const student of students) {
    console.log(student.introduce());
}
```

Ví dụ kết hợp:

```text
class
  ↓
constructor
  ↓
new
  ↓
object / instance
  ↓
property + method
  ↓
Array chứa nhiều object
  ↓
for...of
```

---

## 7. Lỗi thường gặp

### Nhầm property với method

```javascript
flower.color;              // property
flower.spreadFragrance();  // method
```

Quên `()` nghĩa là lấy function chứ chưa gọi function.

### Quên `new`

```javascript
const flower = new Flower("Đỏ");
```

Constructor function truyền thống cần `new`. `class` cũng phải được gọi bằng `new`.

### Dùng arrow function khi cần `this`

Arrow function không tạo `this` riêng, vì vậy cần cẩn thận khi dùng làm object method.

### Dùng constructor như một collection

Nên tách khuôn mẫu tạo object và nơi lưu các instance thành hai trách nhiệm riêng.

---

## 8. Bài tập

### Bài 1. Object sinh viên

Tạo object `student` có:

```text
name
age
score
introduce()
```

### Bài 2. Class `Product`

Tạo class có:

```text
name
price
quantity
```

và method `getTotal()` trả về `price * quantity`.

### Bài 3. Danh sách sản phẩm

Tạo 3 `Product`, lưu vào Array và dùng `for...of` để in tổng tiền từng sản phẩm.

### Bài 4. Class `Flower`

Tạo class `Flower` gồm `name`, `color`, `petals` và method `introduce()`.

### Bài 5. Kiểm tra property

Cho:

```javascript
const user = {
    name: "Nguyễn Văn A",
    age: 20
};
```

Kiểm tra `email` có phải own property bằng `Object.hasOwn()`.

### Câu hỏi tự kiểm tra

1. Programming paradigm là gì?
2. OOP tổ chức chương trình quanh khái niệm nào?
3. Property và method khác nhau thế nào?
4. Dot notation và bracket notation khác nhau khi nào?
5. `this` trong method thường tham chiếu đến gì?
6. Constructor function là gì?
7. Prototype giúp ích gì cho method của nhiều instance?
8. `class` và instance khác nhau thế nào?
9. `new` có vai trò gì?
10. `instanceof` dùng làm gì?
11. `for...in`, `Object.values()` và `Object.entries()` khác nhau thế nào?
12. `in` và `Object.hasOwn()` khác nhau ở điểm nào?

### Checklist kiến thức cần thuộc

- [ ] Hiểu OOP.
- [ ] Phân biệt object/property/method/class/instance.
- [ ] Biết object literal.
- [ ] Biết dot notation và bracket notation.
- [ ] Hiểu `this`.
- [ ] Biết constructor function và prototype.
- [ ] Biết `class`, `constructor`, `new`.
- [ ] Biết `instanceof`.
- [ ] Biết quản lý nhiều object.
- [ ] Biết duyệt và kiểm tra property.

---

## 9. Tổng kết

```text
OOP trong JavaScript
├── Object
│   ├── Property
│   └── Method
├── this
├── Constructor function
│   └── prototype
└── class
    ├── constructor
    └── instance
```

Bài tiếp theo chuyển từ **object do lập trình viên tạo** sang các **object/API do trình duyệt cung cấp**, tức Browser Object Model (BOM).
