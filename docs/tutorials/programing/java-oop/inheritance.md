
# Bài 3. Tính kế thừa

**Kế thừa *(Inheritance)*** là một trong 4 tính chất của lập trình hướng đối tượng. [Tính đóng gói](), [Tính đa hình](/java-oop/session2.html), [Tính kế thừa](/java-oop/session3.html), [Tính trừu tượng]().


**Inheritance** (tính kế thừa) được hiểu như sau:

**Định nghĩa :** Là thừa hưởng các đặc trưng và hành động của một lớp khác


Làm sao nhận biết được trong code có sử dụng tính kế thừa hay không? 
*Ta sẽ tìm hiểu qua biểu hiện của Tính kế thừa nhé!*

**Biểu hiện :**
Gồm ba thành phần: lớp con *(subclass)*, lớp cha *(superclass)*, Giao diện *(interface)* 


## Các thành phần

### Lớp cơ sở (Lớp cha)

Các lớp được tạo ra trước và cho phép kế thừa được gọi là lớp cha (superclass)

Lớp cha sẽ cho những lớp kế thừa nó sử dụng lại các code đã xây dựng.

Ví dụ ta có lớp `Animal.java` và phương thức `sleep()` như sau:

```java
public class Animal {
    public void sleep(){
        System.out.println("Sleeping... !!!");
    }
}
```

Với trường hợp ta cần tạo các lớp khác và không muốn khởi tạo phương thức `sleep()` cho từng lớp, ta có thể sử dụng từ khóa `extends` để kế thừa lại lớp `Animal.java`

### Lớp kế thừa (lớp con)

Lớp con là lớp kế thừa lại [lớp cơ sở]() bằng từ khóa `extends`, còn được gọi là [supclass]()

Giờ ta xây dựng thêm lớp `Cat.java` và phương thức `sleep()`

```java
public class Cat extends Animal{
    
    public static void main(String[] args) {
        Cat cat = new Cat();
        cat.sleep();
    }
}
/**
 * Sleeping... !!!
 */
```

Như ta thấy, ta có thể kế thừa lại phương thức `sleep()` từ lớp `Animal.java` mà không cần phải định nghĩa lại !!!

### Lớp đa kế thừa

Các ngôn ngữ lập trình như Java, C Sharp chỉ hỗ trợ [đơn kế thừa]().


> [!tip] Đơn kế thừa
> Đơn kế thừa nghĩa là một lớp con (supclass) chỉ được kế thừa từ một lớp cha (superclass)


Hiểu đơn giản thì mỗi đứa con chỉ có duy nhất một cha =)))

Với ví dụ trên, nếu ta cố tình cho kế thừa từ 2 lớp trở lên thì code sẽ lỗi.


```java
public class Cat extends Animal, Dog{ // Lỗi hiển thị ở đây
    
    public static void main(String[] args) {
        Cat cat = new Cat();
        cat.sleep();
    }
}
```

Nhưng trên thực tế vẫn có nhiều trường hợp cần đến [đa kế thừa]().

Các bạn còn nhớ bài viết [các frameworks front-end]() chứ, mình đã nói như sau:

> VueJS được ra đời sau được xem là sự kế hợp giữa Angular và ReactJS

Như vậy VueJS là một dạng đa kế thừa từ Angular và ReactJS đúng chứ ???

Để triển khai [đa kế thừa]() trong Java, ta sẽ sử dụng `interface` kết hợp với từ khóa `implements` để triển khai các phương thức.

```java
public class Animal {
    public void sleep(){
        System.out.println("Sleeping... !!!");
    }
}
```

Ta muốn tạo một đối tượng mới vừa thừa hưởng từ `Animal.java` vừa thừa hưởng một tính chất khác thì làm thế nào??

```java
interface Human{
    public void coding();
}
```

Xây dựng giao diện (interface) `Human.java` với phương thức `coding()`

Ta xây dựng thêm lớp `FrogDev.java` thừa hưởng lại `sleep()` từ `Animal.java` và `coding()` từ `Human.java`

```java
public class FrogDev extends Animal implements Human{

    @Override
    public void coding() {
        System.out.println("Coding with Java...");
    }
    
    // thừa hưởng lại sleep() từ Animal.java 
}
```

Vậy là ta đã sử dụng được đa kế thừa trong Java bằng cách triển khai (implements) các phương thức của một giao diện (interface).

### Một số lưu ý

Khi sử dụng đa kế thừa, ta phải khai báo lớp cha trước rồi mới triển khai các giao diện
|True ✅|False ❌|
|---|----|
|  `class FrogDev extends Animal implements Human` | `class FrogDev implements Human extends Animal` |




## Tổng kết

1. Thế nào là kế thừa?
- Kế thừa là cho phép một lớp thừa hưởng đặc trưng và hành động của một lớp khác.

2. Lợi ích của kế thừa?
- Kế thừa giúp ta tái sử dụng lại các code đã triển khai nhưng vẫn đảm bảo duy trì một hệ thống phân cấp. 

3. Có những loại kế thừa nào? 
- Có hai loại kế thừa là:
  - Đơn kế thừa: nhận biết thông qua từ khóa `extends`
  - Đa kế thừa: nhận biết thông qua từ khóa `implements`

4. Các thành phần?
- Lớp cha có trước đơn giản và tổng quát
- Lớp con có sau (thừa hưởng từ lớp cha) cụ thể và đa dạng hơn lớp cha
