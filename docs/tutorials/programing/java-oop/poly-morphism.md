
# Bài 2. Tính đa hình

**Đa hình *(Poly morphism)*** là một trong 4 tính chất của lập trình hướng đối tượng. [Tính đóng gói](), [Tính đa hình](), [Tính kế thừa](), [Tính trừu tượng]().

Tính đa hình cho phép các đối tượng khác nhau sử dụng chung một `interface` (giao diện).

**Poly morphism** (tính đa hình) được hiểu như sau:


> [!TIP] <b>THÔNG TIN</b>
> - Một đối tượng có nhiều hình dạng khác nhau tùy vào từng ngữ cảnh
> - Biểu hiện thông qua: **nạp chồng** và **ghi đè**


## Nạp chồng phương thức

**Nạp chồng *(Overloading)*** là một cách biểu hiện của tính đa hình

> Hiểu một cách đơn giản nhất thì mỗi **class** sẽ có nhiều phương thức **cùng tên nhưng khác nhau về các tham số!**

Nạp chồng thể hiện tính đa hình tại thời điểm biên [dịch chương trình]() (compile time polymorphism).

Ví dụ: Mình sẽ xây dựng lớp `Cat.java` và xây dựng hai phương thức cùng tên là `speak()`

```java
public class Cat {
    // phương thức không có tham số
    public void speak(){
        System.out.println("Meow meow !!!");
    }
    
    // phương thức có 1 tham số "Human"
    public void speak(String human){
        System.out.println(human);
    }

    // Bạn có thể thêm các phương thức "speak(...)"
}
```

Như bạn thấy các phương thức `speak()` là cùng tên nhưng lại khác nhau về tham số truyền vào. Điều này thể hiện **tính đa hình** trong **Lập trình hướng đối tượng**



```java
public class Cat {
    public void speak(){
        System.out.println("Meow meow !!!");
    }
    
    public void speak(String voice){
        System.out.println(voice);
    }
}
public class PolyMorphism {
    public static void main(String[] args) {
        Cat cat = new Cat();
        cat.speak();
        cat.speak("Mèo méo meo mèo meooo !!!");
    }
}
/* Output: 
**
** Meow meow !!!
** Mèo méo meo mèo meooo !!!
*/
```

> [!question]
> Nếu ta xây dựng thêm các phương thức `speak()` khác nhưng truyền vào các kiểu dữ liệu khác `String` thì có được xem là nạp chồng không?


<details>
  <summary>👉 Trả lời ...</summary>
    
Đó vẫn là nạp chồng
```java 
public void speak(){
    System.out.println("Meow meow !!!");
}
public void speak(String voice){
    System.out.println(voice);
}
public void speak(float old){
    System.out.println(old);
}
public int speak(int old){
    return old;
}

```
</details>

## Ghi đè phương thức

**Ghi đè *(Overriding)*** là một cách biểu hiện của tính đa hình

> Hiểu một cách đơn giản nhất thì một lớp con có thể định nghĩa lại một phương thức của lớp cha

Ghi đè thể hiện tính đa hình tại thời điểm [chạy chương trình]() (runtime polymorphism).

Với ví dụ trên mình sẽ thêm một lớp mới có tên `Animal.java`

```java
public class Animal {
    public void eat(){
        System.out.println("Eating candy !!!");
    }
}
```

Và cho lớp `Cat.java` [kế thừa]() lại lớp `Animal.java`. 


```java
public class Cat extends Animal{

    // các phương thức speak()
    
}
```

`Cat.java` là lớp con của `Animal.java`. Lúc này `Cat.java` sẽ được thừa hưởng phương thức `eat()` của `Animal.java`.


```java
public class PolyMorphism {
    public static void main(String[] args) {
        Cat cat = new Cat();
        cat.eat();
    }
}
/* Output: 
**
** Eating candy !!!
*/
```

> [!WARNING] <b>CÓ VẤN ĐỀ !!!</b>
> Ta thấy có một vấn đề là **Mèo nhưng lại ăn Kẹo 😰**
>
> Và đây chính là lúc ta dùng đến **Ghi đè**


Chúng ta có thể định nghĩa lại phương thức `eat()` trong lớp `Cat.java`


```java
public class Cat extends Animal{

    // các phương thức speak()
    
    public void eat(){
        System.out.println("Eating fish !!!");
    }
}
public class PolyMorphism {
    public static void main(String[] args) {
        Cat cat = new Cat();
        cat.eat();
    }
}
/* Output: 
**
** Eating fish !!!
*/

```

Như ta thấy chương trình xuất ra dòng chữ `Eadting fish !!!` thay vì `Eadting candy !!!` như lúc đầu.

Điều này có nghĩa `public class Cat extends Animal{ eat() }` đã ghi đè lên `public class Animal{ eat() }`.

## Tổng kết

Vậy là chúng ta đã cùng nhau tìm hiểu về tính chất Đa hình trong lập trình hướng đối tượng.

Có những nội dung sau mà mình muốn các bạn note lại để sau này phỏng vấn còn cần đến:

#### Tính kế thừa là gì ?

- Trả lời: Là một trong 4 tính chất của **OOP *(lập trình hướng đối tượng)*** được hiểu là đối tượng có nhiều hình dạng tùy thuộc vào vai trò và ngữ cảnh khác nhau.

#### Đặc điểm của tính đa hình là gì?
- Trả lời: Tính đa hình cho phép các đối tượng khác nhau sử dụng chung một `interface` (giao diện).

#### Tính kế thừa được biểu hiện như thế nào?
- Trả lời: Được biểu hiện thông qua **Nạp chồng *(Overloading)*** và **Ghi đè *(Overriding)***

#### Tính nạp chồng là gì?
- Trả lời: 
    - Một đối tượng có thể có những phương thức trùng tên nhau, nhưng khác nhau về số lượng tham số, kiểu tham số
    - Nạp chồng thể hiện tính đa hình tại thời điểm biên [dịch chương trình]() (compile time polymorphism).

#### Tính ghi đè là gì?
- Trả lời: 
    - Một đối tượng được kế thừa từ đối tượng khác có thể định nghĩa lại các phương thức kế thừa nếu cần thiết
    - Ghi đè thể hiện tính đa hình tại thời điểm [chạy chương trình]() (runtime polymorphism).
