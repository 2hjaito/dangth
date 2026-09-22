<!-- ---
layout: Post
title: Bài 6. Chuỗi trong Java
subtitle:  Lập trình Java căn bản
author: Theanishtar
date: 2023-06-07
useHeaderImage: false
headerImage: https://github.com/dangtranhuu/images/blob/main/angurvad/java-core/session6/banner.png?raw=true
headerMask: rgba(30, 69, 110, 0.61)
permalinkPattern: /ebook/java/java-core/:slug/
tags:
  - Java Core
---

Chuỗi là kiểu dữ liệu được sử dụng nhiều nhất trong lập trình. Mình sẽ cùng tìm hiểu về kiểu dữ liệu thú vị này nhé -->

<!-- more -->


# Bài 6. Chuỗi
## 1. Khái niệm

Chuỗi hay String là một class được xây dựng sẵn trong Java. 
Chuỗi được sử dụng để lưu trữ văn bản.

String có rất nhiều phương thức giúp xử lý chuỗi một cách thuận tiện và hiệu quả.

Một biến chứa một tập hợp các ký tự được bao quanh bởi dấu ngoặc kép ví dụ như: "Tôi là Đang"

## 2. Khai báo chuỗi

Để khai báo một chuỗi, hãy khai báo như một biến có [kiểu dữ liệu nguyên thủy](/post/2023/06/02/java-core-session2/#_1-cac-kieu-du-lieu-nguyen-thuy) :

### Khai báo không khởi tạo giá trị

```java
String myName;	
// Trong trường hợp này giá trị của myName được hiểu là "null"
```

### Khai báo có khởi tạo giá trị


```java
String myName = "Đang Hữu Trần"; 
// Trường hợp này giá trị của myName là: Đang Hữu Trần\n
```

---
## 3. Các tính chất

### Ký tự đặc biệt

Chúng ta có thể kết hợp các ký tự đặc biệt trong câu lệnh print. Chú ý các kỹ tự khác Java sẽ hiểu như một ký tự bình thường trong bảng mã ASCII.

Các ký tự đặc biệt gồm: 
| Ký tự        | Giá trị       | Diễn giải    |
| ------------ | ------------- |------------- |
| \t           | Ký tự tab     | Theo quy ước: 1Tab = 3 khoảng trắng   | 
| \r           | Về đầu dòng   | Trở về đầu dòng     | 
| \n           | Xuống dòng    | Tương tự phím `Enter` hay ký tự `\n`     | 
| \\\           | \             | Để hiện thị các ký tự đặc biệt bạn cần dùng `\\` ở trước|
| \\"           | "             | |

Ví dụ:
```java
System.out.print("\t+ Họ và tên: Đang\r\n\t+ Tuổi: 20");

/* 
		Output: + Họ và tên: Đang
			    + Tuổi: 20
*/			   
```

---

## 4. Các phương thức của Chuỗi 


Java xây dựng cho chuỗi các phương thức có sẵng, bạn hoàn toàn có thê tự xây dựng các chức năng như vậy nhưng vì Java dùng để xây dựng các bài toán lớn nên việc dùng các phương thức dựng sẵng sép giúp tối ưu thời gian lập tình hơn.

Sau đây là các phương thức Java xâu dựng sẵng cho String gọi là String API 
<!-- ⟹ -->
| Phương thức               | Ví dụ                | Sử dụng                              | Kết quả              |
| ------------------------- | -------------------- |------------------------------------- |--------------------- |
| toLowerCase()             | s1 = "aBc"           | s2 = s1.toLowerCase()                | s2 = "abc"           |
| toUpperCase()             | s1 = "aBc"           | s2 = s1.totoUpperCase()              | s2 = "ABC"           | 
| trim()                    | s1 = "  abc  "       | s2 = s1.trim()                       | s2 = "abc"           |
| length()                  | s1 = "abc"           | n  = s1.length()                     | n  = 3	              |
| substring()               | s1 = "abc"           | s2 = s1.substring(1,2)               | s2 = "b"             |
|                           | s1 = "abc"           | s2 = s1.substring(0)                 | s2 = "abc"           |
|                           | s1 = "abc"           | s2 = s1.substring(2)                 | s2 = "c"             |
| charAt (index)            | s1 = "abc"           | c  = s1.charAt(1)                    | c  = 'b'             |
| replaceAll(find, replace) | s1 = "abcada"        | s2 = s1.replaceAll('a','z')          | s2 = "zbczdz"        |
| split(separator)          | s1 = "a.cd.fgh"  | arr = s1.split(".")                   | arr = ["a", "cd", "fgh"]    |

Dài quá mình tách làm 2 nha

| Phương thức         | Ví dụ                   | Sử dụng                              | Kết quả              |
| ------------------- | ----------------------- |------------------------------------- |--------------------- |
| equals()            | s1 = "aBc"; s2 = "abc"  | bl = s1.equals(s2)                   | bl = false          |
| equals()            | s1 = "aBc"; s2 = "aBc"  | bl = s1.equals(s2)                   | bl = true          |
| equalsIgnoreCase()  | s1 = "aBC"; s2 = "abc"  | bl = s1.equalsIgnoreCase(s2)           | bl = true           | 
| equalsIgnoreCase()  | s1 = "aBC"; s2 = "aBC"  | bl = s1.equalsIgnoreCase(s2)           | bl = true           | 
| contains()          | s1 = "abc"              | bl = s1.contains("bc")                 | bl = true          |
| startsWith()        | s1 = "abc"              | bl = s1.startsWith("ab")               | bl = true	              |
| endsWith()          | s1 = "abc"              | bl = s1.endsWith("bc")                    | bl = true            |
| matches()           | [Xem thêm]()             |  [Xem thêm]()                           |    [Xem thêm]()        |
| indexOf()           | s1 = "abc"               | n  = s1.indexOf("b")                    | n  = 1             |
|                     | s1 = "abc"               | n  = s1.indexOf("a")                    | n  = 0             |
|                     | s1 = "abc"               | n  = s1.indexOf("x")                    | n  = -1             |
| lastIndexOf()       | s1 = "abc"               | n  = s1.lastIndexOf("b")                    | n  = 1             |
|                     | s1 = "abc"               | n  = s1.lastIndexOf("a")                    | n  = 0             |
|                     | s1 = "abc"               | n  = s1.lastIndexOf("x")                    | n  = -1             |

> Ở **String** là *length()* còn **Arrays** là *length*

---

## 5. Xuất chuỗi

Bạn có thể xuất từng phần tử bằng cách [Duyệt chuỗi]() hoặc xuất cả chuỗi bằng cách:

```java
String myName = "Tran Huu Dang";
System.out.print("Tên tôi là: " + myName);

// Output: Tên tôi là: Tran Huu Dang
```

## 6. Duyệt chuỗi

Bạn có thể xem Chuỗi là một mảng ký tự, khi này:
- Ký tự đầu của chuỗi cũng như mảng (nằm ở vị trí 0)
- Ký tự cuối với Mảng là length còn chuỗi là length()

Bạn vẫn có thể dùng for hoặc forEach để duyệt chuỗi

### Vòng lặp for

```java
String myName = "Đang";
for(int i = 0 ; i < myName.length(); i++){
   System.out.print(myName.charAt(i) + " ");
	// charAt(i) sẽ trả về ký tự (char) tại vị trí i
}
//output : Đ a n g 
```

### Vòng lặp forEach

```java
String myName = "Đang";
for(char c : myName){
   System.out.print(c + " ");
}
//output : Đ a n g
```

---

## 7. Nối chuỗi

Bạn có thể tạo ra một chuỗi mới với hai chuỗi ban đầu bằng toán tử cộng (+) hay các phương thức bên trên

```java
public class Main {
  public static void main(String[] args) {
    String first = "Đang học ";
    String last = "Java";
    System.out.println(firstName.concat(last));
  }
}

// Output: Đang học Java
```


```java
public class Main {
  public static void main(String[] args) {
    String first = "Đang học ";
    String last = "Java";
    System.out.println(first + last);
  }
}
// Output: Đang học Java
```

## 8. Lưu ý

Chuỗi không thể thay đổi giá trị bằng phép gán như Mảng 

Ví dụ 
```java
String name = "Đang";
name.charAt(0) = 'D';
// LỖI
```
Bạn không thể thực thi như thế được mà phải kết hợp các phương thức lại với nhau


## 9. Bài tập

### 9.1 Xuất tên chuẩn hóa cấp độ 1

Nhập vào họ tên một người, in hoa các ký tự đầu trong mỗi thành phần tên

Ví dụ:    "trần hữu đang" ⟹ "Trần Hữu Đang"
Nâng cấp: "tRầN hữU đAnG" ⟹ "Trần Hữu Đang"


<details>
<summary><b>Bài giải</b></summary> 
- Tự làm đi chòi 😆😆

</details>

### 9.2 Xuất tên chuẩn hóa cấp độ 2

Nhập vào họ tên một người, xóa các khoảng trắng thừa

Ví dụ:    "   trần     hữu    đang" ⟹ "Trần Hữu Đang"
Nâng cấp: "    tRầN   hữU    đAnG  " ⟹ "Trần Hữu Đang"

<summary><b>Bài giải</b></summary> 
- Tự làm đi chòi 😆😆

</details>

### 9.3 Xuất tên chuẩn hóa cấp độ 3

Nhập vào họ tên một người, xóa các ký tự thừa

Ví dụ:    "   trầ35n $^  hữ%^99u  đa498%%ng" ⟹ "Trần Hữu Đang"

<summary><b>Bài giải</b></summary> 
- Tự làm đi chòi 😆😆

</details>

### 9.4 Xuất tên chuẩn hóa cấp độ 4

Nhập vào họ tên một người, chuẩn hóa theo tiếng Việt

Ví dụ:    "   trrrrầnnnn     hhữuuuu    đaaang" ⟹ "Trần Hữu Đang"

<summary><b>Bài giải</b></summary> 
- Tự làm đi chòi 😆😆

</details>
