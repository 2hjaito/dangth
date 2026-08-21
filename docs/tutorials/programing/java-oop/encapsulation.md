
# Bài 4. Tính đóng gói


**Đóng gói *(encapsulation)*** là một trong 4 tính chất của lập trình hướng đối tượng. [Tính đóng gói](), [Tính đa hình](/java-oop/session2.html), [Tính kế thừa](/java-oop/session3.html), [Tính trừu tượng]().


## Khái niệm

**Encapsulation** (tính đóng gói) được hiểu như sau:

:::info Định nghĩa
Các dữ liệu (biến) và hành động (phương thức) liên quan đến dữ liệu của lớp nào thì gói gọn bên trong lớp đó 
:::

> Làm sao nhận biết được trong code có sử dụng tính đóng gói hay không? 

Ta sẽ tìm hiểu qua biểu hiện của Tính đóng gói nhé!


## Biểu hiện

:::tip Biểu hiện
Khi các thuộc tính của lớp được đặt là ==private==
:::

## Phạm vi truy cập

Như ở bài viết [Các Câu Hỏi Phỏng Vấn Java Thường Gặp P.1](/post/interview/java-core-interview/#cac-loai-pham-vi-truy-cap-trong-java)
mình đã trình bày về 4 phạm vi truy cập dữ liệu

Hôm nay mình sẽ nói cụ thể hơn nhé


Trong tất cả mọi bài trước, bạn đã rất quen thuộc với `public` trong ví dụ sau : 

```java
public class Main
```

> 🔥 Là một từ khoá `access modifier` (*Phạm vi truy cập*), sử dụng để đặt các mức độ sử dụng cho `classes`, `attributes`, `methods` và `constructors`...

Có 2 loại `Modifiers` : 

- `Access Modifiers` : *kiểm soát mức độ truy cập*
- `Non-Access Modifiers` : *không kiểm soát nhưng cung cấp các chức năng khác*

---

### 1. Access Modifiers

🧚‍♂️ **Đối với** `classes`, bạn có thể sử dụng `public` và `default`

| Modifier | Mô tả                                                    | Lưu ý                                                                                                                                        |
| -------- | -------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| public   | `class` có thể được truy cập bởi bất kỳ `class` nào khác |                                                                                                                                              |
| default  | `class` chỉ được truy cập bởi `class` chung `package`    | 💡 Tìm hiểu `package` tại bài [Package và Tính đóng gói](https://github.com/Zenfection/Java/blob/master/Java%20OOP/3.Pkg%26Encapsulation.md) |

🧚‍♂️ **Đối với** `attributes`, `methods`, `constructors` bạn có thể sử dụng như sau: 

| Modifier  | Mô tả                                                                      | Lưu ý                                                                                                                                               |
| --------- | -------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| public    | `code` có thể truy cập cho tất cả `classes`                                |                                                                                                                                                     |
| private   | `code` chỉ có thể truy cập trong `class` đã khai báo (*xem bài*)           |                                                                                                                                                     |
| default   | `code` chỉ có thể truy cập trong cùng `package` (*xem package tại*)        | 💡Tìm hiểu `package` tại bài [Package và Tính đóng gói](https://github.com/Zenfection/Java/blob/master/Java%20OOP/3.Pkg%26Encapsulation.md)         |
| protected | `code` có thể truy cập trong cùng `package` và `subclasses` (*class con*). | 💡 Tìm hiểu về kế thừa tại bài [Tính kế thừa và Đa hình](https://github.com/Zenfection/Java/blob/master/Java%20OOP/4.Inheritance%26Polymorphism.md) |

 <br>
 
:::details Cách hiểu đơn giản như sau:


 - `public` là công khai truy cập được mọi nơi,
 
 - `private` là riêng tư chỉ truy cập được trong khu vực nó khai báo
 
 - `default` chỉ truy cập trong `package` 
 
 - `protected` chỉ truy cập trong `package` và `class` con.
 
 ==> `public` > `protected` > `default` > `private`
 
:::

---

### 2. Non-Access Modifiers

🧚‍♂️ **Đối với** `classes`, bạn có thể sử dụng `final` và `abstract`

| Modifier | Mô tả                                            | Lưu ý                                                                                                                                               |
| -------- | ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| final    | `class` không thể thừa kế bởi các `classes` khác | 💡 Tìm hiểu về kế thừa tại bài [Tính kế thừa và Đa hình](https://github.com/Zenfection/Java/blob/master/Java%20OOP/4.Inheritance%26Polymorphism.md) |
| abstract | `class` không thể sử dụng để tạo `objects`       | ⚠️ để truy cập một `class` `abstract` , nó phải kế thừa thì `class` khác                                                                            |

🧚‍♂️ **Đối với** `attributes`, `methods`, `constructors` bạn có thể sử dụng như sau:

| Modifier     | Mô tả                                                                                       | Lưu ý                                                                                                     |
| ------------ | ------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| final        | `Atrributes` và `methods` không để sửa đổi                                                  |                                                                                                           |
| static       | `Attributes` và `methods` thuộc về `class` chứ không phải `objects`                         |                                                                                                           |
| abstract     | chỉ có thể sử dụng trên một `abstract class` và `methods`.                                  | ⚠️ `methods` không có body, như `abstact void run();`<br>body được cung cấp bởi `subclass` (được kế thừa) |
| transient    | `Attributes` và `Methods` có thể bỏ qua khi tuần tự hoá `object` chứa chúng                 |                                                                                                           |
| synchronized | `Methods` chỉ có thể truy cập mỗi lần một `thread`                                          |                                                                                                           |
| volatile     | Giá trị của `attribute` không được lưu trong `thread-locally`, và luôn đọc từ `main memory` |                                                                                                           |

### Giải thích cụ thể từng modifier

:::details Final

  Nếu bạn không muốn bất kỳ chỉnh sửa nào thì khai báo `final` 
  
  ![Ảnh chụp Màn hình 2021-02-02 lúc 14.33.22.png](https://raw.githubusercontent.com/Zenfection/Image/master/2021/02/02-14-33-28-A%CC%89nh%20chu%CC%A3p%20Ma%CC%80n%20hi%CC%80nh%202021-02-02%20lu%CC%81c%2014.33.22.png)
  
  > 💡 Sẽ gặp lỗi ngay nếu bạn cố thay đổi nó.
  
:::

::: details Static

  Nó có truy cập mà không cần tạo một `Object` của `class`, không như `public`
  
  ```java
  public class Demo {
    static void myStatic(){ // tạo một method static
        System.out.println("Đây là static");
    }
    public void myPublic(){ // tạo một method public
        System.out.println("Đây là Public");
    }
    public static void main(String[] args) {
        myStatic();
        Demo myObj = new Demo();
        myObj.myPublic();
    }
  }
  /*Đây là static
    Đây là Public */
  ```
  
  > 🔥 Như bạn đã thấy thì khi khai báo `static` không cần thông qua `Object`
:::

:::details Abstract

  Một phương thức trừu tượng (`abstract`) của một lớp trừu tượng và nó không có phần body, body được cung cấp từ `subclasses` như sau: 
:::


## Tại sao lại sử dụng tính đóng gói

Tính đóng gói giúp chương trình: 

- Kiểm soát tốt hơn `Attributes` và `Methods` của `Class`
- `Attributes` của `Class` có thể đặt ở chế độ `read-only` hay `write-only` (nếu bạn sử dụng set & get)
- Linh hoạt hơn, có thể thay đổi thành phần mã mà không ảnh hưởng các phần khác.
- Tăng độ bảo mật

Như trình bày ở trên, những dữ liệu `private` sẽ không thể truy cập và sửa đổi trực tiếp từ lớp khác, vậy làm sao để thay đổi nó?

Chúng ta sẽ cần phải dùng `Getter` & `Setter` hay còn được gọi là Mutator và Accessor

## Mutator & Accessor  

Các Getter(Mutator) và Setter(Accessor) giúp người truy cập vào các dữ liệu `private` của lớp từ bên ngoài mà vẫn đảm bảo được Tính đóng gói

### Getter
`Getter` (Phương thức đọc): Là một phương thức được sử dụng để trả về giá trị của một thuộc tính từ đối tượng. Thường được đặt tên theo quy ước "getPropertyName".


### Setter
`Setter` (Phương thức ghi): Là một phương thức được sử dụng để thiết lập giá trị của một thuộc tính cho đối tượng. Thường được đặt tên theo quy ước "setPropertyName".

### Ví dụ 

```java
public class Person {
    private String name;

    // Getter
    public String getName() {
        return name;
    }

    // Setter
    public void setName(String newName) {
        this.name = newName;
    }
}
```

## Tổng kết

- Tính đóng gói là gì?
  - Các dữ liệu (biến) và hành động (phương thức) liên quan đến dữ liệu của lớp nào thì gói gọn bên trong lớp đó 

- Biểu hiện của tính đóng gói là gì?
  - Các thuộc tính trong lớp được để là `private`

- Tác dụng của Tính đóng gói?
  - Bảo mật, Bảo vệ dữ liệu không bị truy cập trái phép

- Thuộc tính `private` được truy cập khi nào?
  - Thuộc tính `private` được truy cập từ bên trong lớp chứa nó

- Có thể truy cập tới thuộc tính `private` không và truy cập thế nào?
  - Có thể truy cập trung gian thông qua `Setter` và `Getter`


Hãy để lại bình luận bên dưới
