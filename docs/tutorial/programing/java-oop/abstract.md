<!-- ---
layout: Post
title: Giới thiệu về lập trình hướng đối tượng trong Java
subtitle: Lập trình hướng đối tượng với Java
author: Theanishtar
date: 2023-06-09
useHeaderImage: false
headerImage: /img/in-post/2020-10-07https://github.com/dangtranhuu/images/blob/main/angurvad/java-oop/session5/abstraction-javaoop/1.png?raw=true
headerMask: rgba(30, 69, 110, 0.61)
permalinkPattern: /ebook/java/java-oop/:slug/
tags:
  - Java OOP
---

Hướng đối tượng là phương pháp lập trình phổ biến nhất hiện nay!!! Cùng mình tìm hiểu về OOP trog bài viết này nhé  -->
<!-- more -->

# Bài 5. Tính trừu tượng

Lập trình hướng đối tượng gồm 4 tính chất chính: [Tính đóng gói](), [Tính đa hình](), [Tính kế thừa](), [Tính trừu tượng]().

![](https://github.com/danqth/images/blob/main/angurvad/java-oop/session5/abstraction-javaoop/1.png?raw=true)


## 1. Abstract

`Data Abstact` (*trừu tượng dữ liệu*) có nghĩa là ẩn một số chi tiết nhất định và hiển thị những thứ cần thiết cho người dùng.

> 💡 Hiểu đơn giản thì bạn gọi một món ăn thì bạn không cần phải biết quy trình nấu ăn, công thức nấu... chỉ cần ăn thôi. 

Từ khoá `abstract` là một `non-access modifier`, sử dụng cho `classes` và `methods` : 

- `Abstract class` : đây là một `class` không được sử dụng để tạo `Object` (*nó chỉ dùng để kế thừa*).
- `Abstact method` : có thể sử dụng trong `Abstract class` và không có phần `body` (*phần `body` được cung cấp bởi `subclass` hoặc kế thừa từ nó*).

### Lớp trừu tượng

```java
abstract class Animal { //lớp trừu tượng
    public abstract void animalSound(); //phương thức trừu tượng
    public void sleep() {
        System.out.println("Zzz");
    }
}
```

#### Thực thi

⚠️ Không thể tạo `Object` từ một lớp `Abstract` như sau : 

> 
> ```java
> Animal myObj = new Animal(); // sẽ lỗi
> ```

:::tip
- Lớp trừu tượng không thể khởi tạo bằng từ khóa `new`
- Để sử dụng được lớp trừu tượng, ta cần tạo một lớp thỏa mãn hai yêu cầu sau:
  - Lớp này không phải là lớp trừu tượng (Abstract Class)
  - Lớp này sẽ kế thừa và trở thành lớp con của lớp trừu tượng
:::

```java
//khai báo lớp abstract
abstract class Animal{
    public abstract void animalSound();
    public void sleep(){
        System.out.println("Zzz");
    }
}
//khai báo subclass (kế thừa từ lớp Animal)
class Cat extends Animal{
    public void animalSound(){
        System.out.println("mèo méo meo mèo meo");
    }
}

class Main{
    public static void main(String[] args){
        Cat myCat = new Cat();
        myCat.animalSound();
        myCat.sleep();
    }
}
/* mèo méo meo
   Zzz  */
```

> 💡 Như bạn đã thấy, `abstract class` chỉ cho phép kế thừa nó, và ta sử dụng thôi, dễ mà !!!


> 🚀 Ta sử dụng tính `Abstract` (*trừu tượng*) để : 
> 
> - Bảo đảm tính **bảo mật** (*ẩn các chi tiết quan trọng và chỉ hiển thị thứ cần thiết*) 

---


## 2. Interface

`Interfect` là một bản thiết kế cho `abstract class`, được sử dụng để nhóm các `methods` với phần `body` trống : 

```java
//interface
interface Animal{
    public void animalSound();//không có body => gọi là interface methods =
    public void run();//không có body => gọi là interface method, cũng được xem là phương thức trừu tượng
}
```

Để truy cập vào `Interface Methods` ta phải dùng từ khoá `implements` (*thay vì sử dụng `extends`*) như sau : 

```java
interface Animal{
    public void animalSound();
    public void run();
}

class Cat implements Animal{
    public void animalSound(){
        System.out.println("Con mèo kêu : mèo méo meo");
    }
}

class Main{
    public static void main(String[] args){
        Cat myCat = new Cat();
        myCat.animalSound();
        myCat.sleep();
    }
}
/* Con mèo kêu mèo méo meo
   Zzz, khò khò  */
```

### Tính chất của `Interface`
> 
> - Các `Interface methods` không có phần `body`, được cung cấp bởi lớp `implement`
> - Về việc dùng `Interface`, bạn phải ghi đè lại tất cả `methods`
> - Mặc định thì `Interface methods` là `abstract` và `public`
> - Mặc định thì `Interface attributes` là `public`, `static`, `final`
> 

### Các lưu ý

- Giống như `abstract class`, `interface` không sử dụng để tạo `Object`
- Một `Interface` không thể chứa `constructor`

### Tại sao ta phải sử dụng `Interface` ?


<br>

- Để được sử bảo mật an toàn.
- `Java` không hỗ trợ `multiple inheritance` (*đa kế thừa*), tức là một `class` có thể kế thừa từ một `subclass` ==> Tuy nhiên ta có thể làm được điều đó bằng cách sử dụng `Interface` (Xem lại bài [Tính kế thừa](/java-oop/session3.html))

> 💭 Đơn giản hơn là khi bạn vào nhà hàng, người ta sẽ đưa cho bạn cái menu chọn món, chứ không ai lại dẫn bạn vào nhà bếp coi món nào để chọn ==> `Interface` là cái menu đó.


## So sánh Interface và Absctract

### Các phương thức 

- Tất cả phương thức trong Interface đều là phương thức trừu tượng (không có phần thân). Từ Java8 có thêm các phương thức `default`, `static`
- Abstract Class thì có cả các loại phương thức khác

### Các biến
- Trong Interface, các biến là `final` (constant) và `static`
- Abstract Class có thể `final` hoặc không, `static` hoặc không

### Thực thi

- Để triển khai một Interface ta sẽ dừng từ khóa implements
- Abstract Class thì dùng extends

### Kế thừa
- Interface có thể extends từ các Interfaces khác
- Abstract Class thể thể extends một lớp khác và implements nhiều interfaces 

### Trừu tượng

- Interface đạt được trừu tượng toàn phần (chứa các `non-abstract method`)
- Abstract Class chỉ đath trừu tượng một phần

### Khả năng truy cập 
- Interface mặc định các methods, attribute là `public`
- Abstract Class có thể tất cả như `private`, `protected` 