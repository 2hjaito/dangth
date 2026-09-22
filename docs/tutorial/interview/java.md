Là một lập trình viên Java, chắc hẳn bạn đã học rất nhiều kiến thức vô cùng quan trọng để có thể thực hiện các dự án của mình và chuẩn bị cho công việc sau này. Tuy nhiên, liệu những câu hỏi phỏng vấn tại các công ty có giống với những gì bạn đã học.

Hãy cùng đọc bài viết sau của Frog và tìm hiểu **các câu hỏi phỏng vấn Java thường gặp** để chuẩn bị tốt nhất cho buổi phỏng vấn trong tương lai nhé!



## I. Các câu hỏi Java core


### JDK, JRE và JVM là gì?

`JDK` là viết tắt của `Java Development Kit` – Bộ công cụ phát triển Java. `JDK` là một bộ công cụ phát triển phần mềm được dùng để phát triển ứng dụng trong Java. 

`JRE` là viết tắt của `Java Runtime Environment` – Môi trường thực thi Java. 

`JRE` bao gồm `JVM`, thư viện và các thành phần bổ sung để chạy các ứng dụng viết bằng ngôn ngữ Java. 

`JVM` là viết tắt của `Java Virtual Machine` – *Máy ảo Java*. 

`JVM` là máy ảo được sử dụng để chạy các chương trình Java.

**Cách hoạt động của JVM**: Khi chương trình Java được chạy, trình biên dịch sẽ dịch Java code thành bytecode và sau đó `JVM` sẽ thực hiện nhiệm vụ của mình: thông dịch bytecode thành mã máy cho máy tính thực hiện lệnh.  


### Đặc điểm nổi bật của Java 8

![](https://github.com/danqth/images/blob/main/frogcyber/post/interview/java-8-new-feature.png?raw=true)

#### 1. Lambda Expression
`Lambda Expression` là [feature]() nổi bật nhất của `Java 8`, giúp cho cú pháp của Java trở nên đơn giản, rút gọn đi rất nhiều
<details>
  <summary><b>Ví dụ không dùng Lambda</b></summary>
  <pre><code class="language-java">
package vn.viettuts.java8;
 
interface Drawable {
    public void draw();
}
 
public class LambdaExpressionExample1 {
    public static void main(String[] args) {
        int width = 10;
 
        // không sử dụng biểu thức lambda, 
        // phải sử dụng lớp nặc danh để cài đặt phương thức draw() cho Drawable
        Drawable d = new Drawable() {
            public void draw() {
                System.out.println("Drawing " + width);
            }
        };
        d.draw();
    }
}
// Kết quả: Drawing 10
  </code></pre>
</details>

<details>
  <summary><b>Ví dụ Áp dụng Lambda</b></summary>
  <pre><code class="language-java">
package vn.viettuts.java8;
 
//tùy chọn, nó đánh dấu lớp Drawable chỉ được có 1 method trừu tượng
@FunctionalInterface
interface Drawable {
    public void draw();
}
 
public class LambdaExpressionExample2 {
    public static void main(String[] args) {
        int width = 10;
 
        // sử dụng biểu thức lambda
        Drawable d2 = () -> {
            System.out.println("Drawing " + width);
        };
        d2.draw();
    }
}

// Kết quả: Drawing 10
  </code></pre>
</details>

#### 2. Default method in Interface
Java 8 cho phép thêm các _method_ không trừu tượng bằng cách thêm từ khóa `default`:

Ví dụ:
```java
public interface Calculate {
  default int sum(int a, int b) {
    return a + b;
  }
}
class Calculator implements Calculate {
  public static void main(String[] args) {
    Calculator calculator = new Calculator();
    calculator.sum(1, 2); // return 3
  }
}
```
#### 3. Optional Class
Tính năng  `Optional Class` giúp giải quyết các vấn đề chủ yếu về `nullpointer`

- **Optional Class** là 1 tính năng mới trong được bổ sung trong [Java 8]()
- **Optional** là 1 đối tượng generic, bản chất của **Optional** là một container (bao chứa) chứa đối tượng mà nó reference tới. Nó có thể rỗng hoặc chứa giá trị `NULL` (trường hợp đối tượng mà nó reference tới bị `null`). 
- Cấu trúc này đảm bảo các biến được sử dụng thông qua Optional Class sẽ tránh được lỗi `NullPointerException`.

<table>
<thead>
<tr>
<th  >No.</th>
<th >Phương thức &amp; mô tả</th>
</tr>
</thead>
<tbody>
<tr>
<td  >1</td>
<td ><b>static &lt;T&gt; Optional&lt;T&gt; empty()</b><br>
Trả về một Optional instance rỗng.</td>
</tr>
<tr>
<td  >2</td>
<td ><b>Optional&lt;T&gt; filter(Predicate&lt;? super &lt;T&gt; predicate)</b><br>
Nếu như có giá trị hiện diện trong đối tượng Optional này và giá trị của nó khớp với Predicate truyền vào, nó sẽ trả về một Optional chứa giá trị đó, mặc khác sẽ trả về một Optional rỗng.</td>
</tr>
<tr>
<td  >3</td>
<td ><b>T get()</b><br>
Nếu như có giá trị trong Optional này, nó sẽ trả về giá trị đó, ngược lại sẽ ném ra NoSuchElementException nếu như đối tượng rỗng.</td>
</tr>
<tr>
<td  >4</td>
<td ><b>void ifPresent(Consumer&lt;? super T&gt; consumer)&nbsp;</b><br>
Nếu như đối tượng Optional đang chứa giá trị, nó sẽ áp dụng consumer được truyền vào cho giá trị của nó. Ngược lại thì không làm gì cả.</td>
</tr>
<tr>
<td  >5</td>
<td ><b>boolean isPresent()</b><br>
Phương thức này được sử dụng để kiểm tra xem trong đối tượng Optional có đang chứa giá trị hay không. Giá trị trả về là True nếu có giá trị và ngược lại trả về false.</td>
</tr>
<tr>
<td  >8</td>
<td ><b>static &lt;T&gt; Optional&lt;T&gt; of(T value)</b><br>
Trả về đối tượng Optional kiểu T chứa giá trị của value.</td>
</tr>
<tr>
<td  >7</td>
<td ><b>static &lt;T&gt; Optional&lt;T&gt; ofNullable(T value)</b><br>
Trả về một Optional chứa giá trị được truyền vào nếu khác null, ngược lại sẽ trả về một Optional rỗng.</td>
</tr>
<tr>
<td  >8</td>
<td ><b>T orElse(T other)</b><br>
Trả về giá trị của đối tượng Optional nếu có, ngược lại nó sẽ trả về đối tượng&nbsp;<b>other</b>&nbsp;mà bạn đã truyền vào phương thức này.</td>
</tr>
<tr>
<td  >9</td>
<td ><b>T orElseGet(Supplier&lt;? extends T&gt; other)</b><br>
Trả về giá trị nếu tồn tại, ngược lại nó sẽ gọi&nbsp;<b>other</b>&nbsp;mà bạn đã truyền vào sau đó trả về kết quả của Supplier.</td>
</tr>
<tr>
<td  >10</td>
<td ><b>&lt;X extends Throwable&gt; T orElseThrow(Supplier&lt;? extends X&gt; exceptionSupplier)</b><br>
Nếu như đối tượng Optional có giá trị tồn tại thì nó sẽ trả về giá trị đó, ngược lại sẽ ném ra một Exception do chúng ta định nghĩa bởi Supplier đã truyền vào.</td>
</tr>
</tbody>
</table>

#### 4. Java Stream API
`Stream` là 1 lớp trừu tượng mới được giới thiệu trong Java 8 giúp ta giải quyết các bài toán về `collections`, `array` 1 cách tự nhiên hơn như thêm, sửa, xóa, lọc object…

- Stream là 1 lớp trừu tượng mới được giới thiệu trong Java 8. Sử dụng Stream, bạn có thể xử lý dữ liệu 1 cách tự nhiên giống như các câu lệnh SQL. Ví dụ ta có câu SQL sau:

```sql
SELECT SUM(salary) FROM Employee
```

Câu lệnh trên tự động trả về tổng lương của tất cả `Employee` mà không cần phải thực hiện bất kì tính toán gì ở phía đầu cuối developer *(bình thường thì sẽ SELECT tất cả các Employeesau đó dùng code Java để duyệt và tính tổng của tất cả Employee).*

Tương tự vấn đề trên, khi sử dụng `Collections` trong Java, chúng ta thực hiện các vòng lặp và thực hiện lại các đoạn kiểm tra.

Giả sử muốn tính tổng lương của các employee có `role = ‘Developer’`  từ 1 danh sách chúng ta phải thực hiện lặp tất cả các phần tử, kiểm tra phần tử đó có `role = ‘Developer’` rồi cộng lại. Trong khi nếu muốn xử lý chúng song song lại dễ gặp lỗi.

```java
public static final String ROLE_DEVELOPER = "Developer";
public double sumSalaryOfDeveloper(List<Employee> listEmployee) {
  double sumSalary = 0;
  for (Employee emp : listEmployee) {
    if (emp.getRole().equals(ROLE_DEVELOPER)) {
      sumSalary += emp.getSalary();
    }
  }
  return sumSalary;
}
```

Để giải quyết vấn đề đó, Java 8 giới thiệu Stream API giúp developer xử lý dữ liệu khai báo và tận dụng kiến trúc đa lõi (multicore) mà không cần viết mã cụ thể cho nó.
```java
public static final String ROLE_DEVELOPER = "Developer";
public double sumSalaryOfDeveloper(List<Employee> listEmployee) {
  return listEmployee
  			.stream()
			.filter(p -> p.getRole().equals(ROLE_DEVELOPER))
			.mapToDouble(p -> p.getSalary()).sum();
}
```
Như vậy, bạn có thể hiểu stream đại diện cho một `collection` được xử lý tuần tự và hỗ trợ rất nhiều loại `operation` để tính toán dựa trên những element của `collection` đó (tính tổng, convert sang `map`, …)


#### 5. Functional Interface
Phần này sẽ giải thích rõ tại sao cú pháp Lambda Expression lại được viết như thế.

_Sẽ bổ sung sau_
<!-- Chi tiết: https://stackjava.com/java8/functional-interface-la-gi-functional-interface-trong-java-8.html -->

#### 6. Java Date Time API
_Sẽ bổ sung sau_

### Giải thích phương thức main() trong chương trình Java

Phương thức `main()` trong chương trình Java chính là điểm thực thi của chương trình, hay còn là điểm vào (entry point) khi thực hiện một xử lý trong chương trình Java. 

Phương thức `main()` kết thúc là khi chương trình kết thúc và phương thức `main()` là điều kiện để cho các phương thức khác có thể thực thi. 

### **Tại sao không sử dụng con trỏ trong Java?**

**Con trỏ** `pointer` không được sử dụng trong Java vì `con trỏ` khá phức tạp và không an toàn. 

### **Tại sao Java lại độc lập nền tảng?**

Java độc lập nền tảng là do Java sử dụng `JVM`, máy ảo Java cung cấp cách thực thi mã Java độc lập với nền tảng. 


### **Package trong Java là gì? Liệt kê những ưu điểm của các package**

`Package` trong Java là một nhóm các lớp (class), giao diện (interface) và các `package` con tương tự. 

`Package` thường được chia thành 2 loại:

*   Package được dựng sẵn
*   Package do người dùng định nghĩa 

Ưu điểm của các `package`:

*   Tổ chức file *(class, interface)* theo một hệ thống để dễ dàng phân loại file.
*   Phân quyền truy cập giúp xem các `class` thuộc `package` nào khi được gọi ở phần `access modifier`.
*   Dễ dàng chọn lọc khi `import`. 
	- Dùng lệnh `import java.sql` khi *import* tất cả các **class**. 
	- Dùng lệnh `import.util.regex` khi sử dụng **class** nằm trong `package regex`. 

### **Khác biệt giữa bộ nhớ Stack và Heap**

#### Về kích thước vùng nhớ

*   Bộ nhớ `Stack`: có kích thước cố định tùy thuộc vào hệ điều hành
*   Bộ nhớ `Heap`: có kích thước không cố định, có thể **tăng giảm tùy thuộc vào nhu cầu**

#### Về đặc điểm vùng nhớ

*   Bộ nhớ `Stack`: Vùng nhớ được quản lý bằng **hệ điều hành**, dữ liệu được lưu sẽ **tự động hủy** sau khi hàm thực hiện xong nhiệm vụ của mình.
*   Bộ nhớ `Heap`: Vùng nhớ được quản lý bằng **lập trình viên** và các dữ liệu sẽ **không bị hủy** sau khi hàm thực hiện xong và <b style="color:#4D779C;">lập trình viên phải tự hủy vùng nhớ</b>. 

#### Lỗi xảy ra với vùng nhớ

*   Bộ nhớ `Stack`: Có khả năng vượt quá dung lượng lưu trữ vì dung lượng bộ nhớ `Stack` chỉ có hạn.
*   Bộ nhớ `Heap`: Cũng có khả năng tràn vùng nhớ nếu bạn liên tục cấp phát vùng nhớ mà **không giải phóng thường xuyên**. 


### **Hãy nêu sự khác biệt giữa biến local và biến instance**

#### Biến local

*   Được khai báo trong hàm `contructor`, trong `block` hoặc trong các phương thức
*   Được tạo trong các phương thức, `contructor` và `block`. Bị phá hủy khi kết thúc phương thức, `contructor` và `block`.
*   Được lưu trên vùng nhớ stack
*   Không được sử dụng access modifier khi khai báo
*   Cần khởi tạo giá trị mặc định trước khi sử dụng 

#### Biến instance

*   Được khai báo trong một lớp, ngoài phương thức, `contructor` và `block`
*   Được lưu trong bộ nhớ `heap`
*   Được tạo khi tạo đối tượng bằng nút `new` và bị phá hủy khi đối tượng bị phá hủy
*   Được sử dụng bởi phương thức, `contructor`, `block`, tuy nhiên phải được sử dụng qua một đối tượng cụ thể
*   Giá trị mặc định phụ thuộc vào kiểu dữ liệu
*   Có thể gọi trực tiếp bằng tên khi sử dụng trong `class`


### **Từ khóa final trong Java là gì?**

Từ khóa `final` trong Java là từ khóa được dùng để hạn chế số lượng người dùng. 

Lập trình viên có thể sử dụng ở nhiều ngữ cảnh: phương thức `method`, biến `variable`, lớp `class`.

`Final` là thuộc tính mà chúng sẽ không thể thay đổi giá trị. Các phương thức `final` không thể `overide` ở lớp con và các `class final` không thể kế thừa. 

### **Từ khóa static trong Java là gì?**

`Static` trong Java là từ khóa dùng để quản lý bộ nhớ và truy cập trực tiếp thông qua lớp khi không cần khởi tạo. 

### **Từ khóa super trong Java**

`Super` trong Java là một biến tham chiếu, dùng để tham chiếu đến đối tượng của lớp cha gần nhất một cách trực tiếp. 


### **Mô tả sự khác biệt giữa String, StringBuilder và StringBuffer**

*   `String` không thể thay đổi và không thể có class con
*   `StringBuffer` và `StringBuilder` có thể thay đổi được
*   `StringBuffer` và `StringBuilder` giống nhau, chỉ có điểm khác biệt khi sử dụng đa luồng
*   Về tốc độ xử lý: `StringBuilder` là tốt nhất sau đó đến `StringBuffer` và String. 


### **Constructors trong Java là gì?**

`Constructors` (Hàm ảo) trong Java là một phương thức được sử dụng để khởi tạo, trả về các đối tượng của lớp. 

Thông thường, một `Constructors` sẽ trùng tên với lớp mà nó được định nghĩa. 

### **Các lớp wrapper trong Java là gì?**

Lớp `wrapper` trong Java là lớp đóng gói các kiểu, cung cấp cơ chế chuyển đổi dữ liệu nguyên thủy trở thành kiểu đối tượng, và ngược lại. .

> [Đọc bài viết sau để rõ hơn về các kiểu dữ liệu](/java-core/session2.html#_1-cac-kieu-du-lieu-nguyen-thuy)

### **Có bắt buộc phải khai báo constructor trong lớp?**

Không bắt buộc phải khai báo `constructor` trong lớp. Nếu không khai báo, lớp sẽ dùng `default constructor`. 


### **Các loại phạm vi truy cập trong Java**

Có 4 phạm vi truy cập trong Java là public, private, default và protected. 

*   `Public`: Có thể truy cập mọi lúc mọi nơi
*   `Private`: Chỉ có thể truy cập bên trong lớp
*   `Default`: Có thể truy cập từ trong lớp khai báo, các lớp cùng một gói với lớp khai báo
*   `Protected`: Có thể truy cập trong lớp khai báo, các lớp con của lớp khai báo, các lớp cùng một gói với lớp khai báo

### **Trình biên dịch JIT trong Java**

Trình biên dịch `JIT` trong Java hay còn được biết đến với tên gọi `Just-In-Time` – là một kỹ thuật biên dịch các phần mã byte có các chức năng tương tự trong cùng một thời gian, qua đó giảm thời gian biên dịch cần thiết. 


### **Mô tả khác biệt giữa constructor và phương thức trong Java**


|`Constructor`|`Method`|
|-------------|-----------|
|Được sử dụng để khởi tạo trạng thái của đối tượng.|Được sử dụng để thể hiện hành động của đối tượng.|
|Không có kiểu trả về.|Có kiểu trả về.|
|Constructor được gọi ngầm.|Phương thức được gọi tường minh.|
| `JIT` tạo ra constructor mặc định nếu bạn không có constructor nào.|Phương thức không được tạo ra bởi `JIT`.|
|Tên của constructor phải giống tên lớp.|Tên phương thức có thể giống hoặc khác tên lớp.|



### **Sự khác biệt giữa từ khóa break và continue**

Từ khóa `break` dùng để thoát ra khỏi vòng lặp ngay lập tức và chuyển sang câu lệnh tiếp theo, ở ngoài vòng lặp vừa kết thúc.

Từ khóa `continue` được dùng để chỉ việc vòng lặp kế tiếp sẽ được thực hiện. 


### **Lập trình hướng đối tượng là gì?**

Lập trình hướng đối tượng (OOP) là một phương pháp lập trình máy tính tổ chức thiết kế phần mềm xung quanh dữ liệu hoặc đối tượng thao tác, thay vì chức năng và logic để thao tác chúng. 

### **Các nguyên lý cơ bản của lập trình hướng đối tượng**

Lập trình hướng đối tượng dựa trên các nguyên lý sau:

*   Encapsulation – Tính đóng gói: Nguyên lý này nói rằng tất cả các thông tin quan trọng được chứa bên trong một đối tượng và chỉ những thông tin được chọn mới được hiển thị. Việc triển khai và trạng thái của từng đối tượng được giữ riêng bên trong một lớp đã xác định. Các đối tượng khác không có quyền truy cập vào lớp này hoặc quyền thực hiện các thay đổi. Họ chỉ có thể gọi một danh sách các hàm hoặc phương thức công khai. Đặc tính ẩn dữ liệu này giúp bảo mật chương trình tốt hơn và tránh làm hỏng dữ liệu ngoài ý muốn.
*   Abstraction – Tính trừu tượng: Các đối tượng chỉ tiết lộ các cơ chế bên trong có liên quan đến việc sử dụng các đối tượng khác, ẩn mọi mã triển khai không cần thiết. Lớp dẫn xuất có thể mở rộng chức năng của nó. Khái niệm này có thể giúp các nhà phát triển dễ dàng thực hiện các thay đổi hoặc bổ sung bổ sung theo thời gian.
*   Inheritance – Tính kế thừa: Các lớp có thể sử dụng lại mã từ các lớp khác. Mối quan hệ và các lớp con giữa các đối tượng có thể được chỉ định, cho phép các nhà phát triển sử dụng lại logic chung trong khi vẫn duy trì một hệ thống phân cấp duy nhất. Thuộc tính này của OOP buộc phải phân tích dữ liệu kỹ lưỡng hơn, giảm thời gian phát triển và đảm bảo mức độ chính xác cao hơn.
*   Polymorphism – Tính đa hình. Các đối tượng được thiết kế để chia sẻ các hành vi và chúng có thể có nhiều dạng. Chương trình sẽ xác định ý nghĩa hoặc cách sử dụng nào là cần thiết cho mỗi lần thực thi đối tượng đó từ lớp cha, giúp giảm nhu cầu sao chép mã. Sau đó, một lớp con được tạo ra để mở rộng chức năng của lớp cha. Tính đa hình cho phép các loại đối tượng khác nhau đi qua cùng một giao diện.

### **Tại sao Java không phải là hướng đối tượng 100%?**

Java không phải là ngôn ngữ hướng đối tượng hoàn toàn vì Java có sử dụng cả các loại dữ liệu khác như byte, char, float, v.v. 

Những câu hỏi phỏng vấn Java thường gặp.


### **So sánh ArrayList và Vector trong Java**

Giống nhau:

| **Cơ sở so sánh**                    | **HashTable**                                                  | **HashMap**                                                    |
|-------------------------------------|----------------------------------------------------------------|----------------------------------------------------------------|
| Cài đặt interface                   | Đều cài đặt interface `List` *(thực tế là `Map`, không phải `List`)* | Đều cài đặt interface `List` *(thực tế là `Map`, không phải `List`)* |
| Thứ tự phần tử                      | Duy trì theo thứ tự chèn các phần tử                           | Duy trì theo thứ tự chèn các phần tử                           |


Khác nhau:


| **Cơ sở so sánh**               | **Vector**                                                                 | **ArrayList**                                                                 |
|--------------------------------|-----------------------------------------------------------------------------|-------------------------------------------------------------------------------|
| Căn bản                        | Lớp Vector sẽ được đồng bộ hóa.                                            | Lớp ArrayList sẽ không được đồng bộ hóa.                                     |
| Lớp kế thừa                    | Vector là một lớp kế thừa, được thiết kế lại để hỗ trợ lớp Collection.     | ArrayList là một lớp Collection tiêu chuẩn.                                  |
| Tuyên bố lớp                   | Vector                                                                      | ArrayList                                                                     |
| Tái phân bổ                    | Khi không được chỉ định, Vector tăng lên gấp đôi kích thước.              | Khi không được chỉ định, ArrayList tăng thêm một nửa kích thước.            |
| Hiệu suất                      | Khi Vector được đồng bộ hóa, Vector hoạt động chậm hơn ArrayList.         | Vì ArrayList không được đồng bộ hóa, ArrayList hoạt động nhanh hơn Vector.  |
| Bảng liệt kê / lặp             | Vector sử dụng Enumeration và giao diện Iterator để duyệt các phần tử.    | ArrayList sử dụng giao diện Iterator để duyệt các phần tử.                   |



### **Khác biệt giữa `equals()` và `==` trong Java**

*   `Equals()` là một phương thức so sánh 2 object tuy nhiên chỉ so sánh về mặt giá trị của chúng. Trong phép so sánh `equals()`, nếu đúng sẽ trả về `true`, sai sẽ trả về `false`.
*   `==` là phép so sánh 2 object có đang cùng trỏ vào một ô nhớ hay không. Trong phép `==`, kết quả đúng sẽ trả về true, sai về `false`. 

### **Nêu định nghĩa một class**

Class đại diện cho các thuộc tính và phương thức chung cho các đối tượng của lớp. Trong Java, class là kiểu dữ liệu do lập trình viên tự tạo ra. 

Học cách trả lời câu hỏi phỏng vấn Java để phỏng vấn hiệu quả.

### **Sự khác biệt giữa mảng và ArrayList**

| **Cơ sở so sánh**       | **Array (Mảng)**                                              | **ArrayList**                                                |
|-------------------------|---------------------------------------------------------------|--------------------------------------------------------------|
| Kích thước              | Có kích thước cố định – không thể thay đổi sau khi khai báo. | Có thể thay đổi kích thước động khi thêm hoặc xóa phần tử.  |
| Thuộc loại              | Cấu trúc dữ liệu cơ bản.                                      | Lớp trong Java Collection Framework.                         |


### **Collection trong Java là gì, liệt kê các interface và class của nó**

Collection trong Java là khuôn khổ cung cấp kiến trúc lưu trữ và thao tác tới nhóm đối tượng. Bạn có thể thực hiện tất cả các hoạt động như tìm kiếm, chèn, phân loại, v.v, trên một dữ liệu nhờ Java Collection. 

Các interface của Java Collection: Set, List, Queue, Deque, v.v.

Các class của Java Collection: ArrayList, Vector, LinkedList, HashSet, PriorityQueue, v.v. 

### **Có mấy loại access modifier? Phân biệt sự khác nhau giữa chúng?**

Có 4 loại access modifier là: private, default, protected, public. Trong đó:

*   Public: Có thể truy cập ở bất cứ đâu.
*   Private: Chỉ có thể truy cập trong cùng class.
*   Default: Có thể truy cập trong cùng class và cùng package.
*   Protected: Có thể truy cập trong cùng class, package và ngoài package bởi lớp con.

### **Tính đa hình là gì?**

Polymorphism – Tính đa hình. Các đối tượng được thiết kế để chia sẻ các hành vi và chúng có thể có nhiều dạng. Chương trình sẽ xác định ý nghĩa hoặc cách sử dụng nào là cần thiết cho mỗi lần thực thi đối tượng đó từ lớp cha, giúp giảm nhu cầu sao chép mã.

Sau đó, một lớp con được tạo ra để mở rộng chức năng của lớp cha. Tính đa hình cho phép các loại đối tượng khác nhau đi qua cùng một giao diện.


Cách trả lời những câu hỏi phỏng vấn Java.


**Lời kết** 
------------

Trên đây chúng ta đã cùng tìm hiểu về những **câu hỏi phỏng vấn Java** thường gặp trong các buổi phỏng vấn. Bạn hãy tham khảo những câu hỏi này để có thể tự tin hơn khi đối diện với nhà tuyển dụng nhé. 

### Tác Giả

## Liên kết

- [glints.com/vn/blog/cau-hoi-phong-van-java](https://glints.com/vn/blog/cau-hoi-phong-van-java/?gidzl=mWgb8JygBqZ15ACWD3mcJSmUh24kEYWUX1oj9IixSaw37wqdUpnpI8SVh2KgDdTArXN_Tc7C4BrUF2CXHm#cac_cau_hoi_phong_van_java_core_va_cau_tra_loi)