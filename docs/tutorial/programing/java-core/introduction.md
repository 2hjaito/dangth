
# Bài 1. Giới thiệu về Java
## 1. Đôi nét về Java

> [!INFO]
> - **Java** là một ngôn ngữ lập trình có từ **1995** bởi **Sun Microsystems**, hiện thuộc sở hữu của [Oracle Corporation](https://vi.wikipedia.org/wiki/Oracle_Corporation).
> - **Java** được phát triển từ **C** và **C++** là chủ yếu
> - **Java** từng được Microsoft rất thích, nhưng vì vấn đề bản quyền, và Microsoft đã tạo ra **C#** có cấu trúc tương đướng với **Java**


> [!TIP]
> **Java** có thể làm được mọi thứ như : **Web, Mobilde App, Desktop App, AI, Server, Database** ... và đặt trưng của **Java là OOP** ([*Object-oriented Programing*](https://vi.wikipedia.org/wiki/L%E1%BA%ADp_tr%C3%ACnh_h%C6%B0%E1%BB%9Bng_%C4%91%E1%BB%91i_t%C6%B0%E1%BB%A3ng))



> [!WARNING]
> **Java** và **Javascript** hoàn toàn không giống nhau và có quan hệ nhau một tý gì. (**JavaScript** ra đời sau, lúc đó **Java** đang là ngôn ngữ phổ biến nhất và có lẻ nói tới đây bạn đã hiểu vì sao **JavaScript** có từ **Java** trong tên rồi đó)



---

## 2. Điểm mạnh của Java

- Được sử dụng nhiều nhất thế giới, khoảng **3 tỷ** thiết bị.
- Cộng đồng đủ lớn để giải quyết các vấn đề bạn gặp phải
- Khái niệm **đơn giản** và **tương đối** dễ cho việc sử dụng
- Nó là **Statically Typed** tức là code không thể **build** khi đang có lỗi, với một kiến trúc chặt chẽ.
- Có thể chạy ở bất kỳ thiết bị nào, gọi là **WORA** (*Write once, run anywhere*).

> 💭 Java có thể chạy trên mọi hệ điều hành, nó làm đều đó bằng cách nào ? trong khi kiến trúc quản lí của mọi hệ điều hành là khác nhau ??? 

Tất cả nhờ vào **JVM** (*Java Vitural Machine*): tức là **Máy ảo Java**

Quá trình của Java như sau : 

![04-19-39-12-Ảnh chụp Màn hình 2020-08-04 lúc 19.39.02.png](https://raw.githubusercontent.com/Zenfection/Image/master/2021/01/30-16-03-57-04-19-39-12-A%CC%89nh%20chu%CC%A3p%20Ma%CC%80n%20hi%CC%80nh%202020-08-04%20lu%CC%81c%2019.39.02.png)

> 1. Code **Java** của bạn sẽ **biên dịch** ra số **nhị phân**
> 2. **Mã trung gian** đó sẽ được cung cấp cho **Máy ảo Java** (JVM)
> 3. Sau đó **Máy ảo Java** xử lý xác định hệ điều hành và chuyển **Mã trung gian** sang **native code**


## 3. Cài đặt JDK 

Để cài đặt Java, tôi sẽ hướng dẫn bạn cách thức dễ nhất, hãy truy cập link [sau đây](https://www.oracle.com/java/technologies/javase-downloads.html)

![Ảnh chụp Màn hình 2021-01-29 lúc 09.11.29.png](https://raw.githubusercontent.com/Zenfection/Image/master/2021/01/29-09-12-00-A%CC%89nh%20chu%CC%A3p%20Ma%CC%80n%20hi%CC%80nh%202021-01-29%20lu%CC%81c%2009.11.29.png)

🦈 Như bạn đã thấy đây là trang chủ **Oracle**, bạn có thể thấy Java SE 15 là phiên bản mới nhất, hãy nhấn **JDK Download** và tải nó về 

![Ảnh chụp Màn hình 2021-01-29 lúc 09.12.45.png](https://raw.githubusercontent.com/Zenfection/Image/master/2021/01/29-09-12-53-A%CC%89nh%20chu%CC%A3p%20Ma%CC%80n%20hi%CC%80nh%202021-01-29%20lu%CC%81c%2009.12.45.png)

 🐍 Bạn hãy download file dựa trên hệ điều hành bạn đang xài :

- **Window** : Cài file có đuôi **.exe**
- **Linux**  : Cài file có đuôi **.deb** nếu thuộc nhánh **Debian**, cài đuôi **.rpm** nếu thuộc nhánh **RedHat**
- **MacOS** : Cài file có đuôi **.dmg**

Để kiểm tra cài đặt thành công, bạn hãy mở : 

- Mở **CMD**  nếu bạn xài **Window**
- Mở **Terminal** nếu bạn sử dụng **Linux** hoặc **MacOS**

Và hãy gõ : 

```bash
java --version
```

![Ảnh chụp Màn hình 2021-01-29 lúc 09.18.33.png](https://raw.githubusercontent.com/Zenfection/Image/master/2021/01/29-09-20-59-A%CC%89nh%20chu%CC%A3p%20Ma%CC%80n%20hi%CC%80nh%202021-01-29%20lu%CC%81c%2009.18.33.png)

> 🔥 Nó hiện ra phiên bản **15.0.2** (*có thể phiên bản khác*) như trên thì bạn đã thành công rồi đấy.

---

## 4. Cài đặt Công cụ lập trình


>[!TIP]
>Bạn có thể cài đặt cái [IDE](https://topdev.vn/blog/ide-la-gi/#ide-la-gi) dành cho **Java** như **Netbeans**, **Eclipse**,... hoặc các  [Code Editor](https://www.dictionary4it.com/term/code-editor-2424/) như **Visual Studio Code**, **Sublime Text**,...


Ở các bài viết sau về Java mình sẽ sử dụng [Netbeans](https://netbeans.apache.org/) nhé, các bạn tải và cài đặt phần mềm tại [đây](https://netbeans.apache.org/)

---

## 5. Tạo một chương tình Java đơn giản

>[!WARNING]
> Hãy đảm bảo rằng máy bạn đã được cài JDK và một IDE có thể viết được code Java nhé !!!


- **B1** : Hãy tạo mới một dự án bằng cách thực hiện 
	- `New` -> `New Project` -> (Tab bên trái chọn Java with Ant, bên phải chọn `Java Application`) -> `Next` và đặt tên tại **project name** và nhấn `Finish`
<video 

---
<iframe width="100%" height="450" src="https://www.youtube.com/embed/HRTQUU18qYw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

- **B2** : Netbeans sẽ tự tạo cho bạn package có tên **project_demo**, bên trong sẽ có file **Project_demo** như hình dưới đây
  ![2021-01-29 09.43.09.gif](https://github.com/danqth/images/blob/main/angurvad/java-core/project-java.png?raw=true)

- **B3** : Gõ đoạn code sau đây vào dòng chữ *// TODO code application logic here* 
  
``` java
System.out.println("Hello World");
```
- **B4** : Chạy chương trình bằng cách nhấn chuột phải chọn **Run file**

![Ảnh chụp Màn hình 2021-01-29 lúc 09.49.32.png](https://github.com/danqth/images/blob/main/angurvad/java-core/result-java.png?raw=true)

---


## 6. Phương thức **main**

Đây là **phương thức** bắt buộc mà bạn thấy trong mọi chương trình **Java** : 

```java
public static void main(String[] args)
```

🧨 Bất kỳ code nào trong **main** đều được thực thi, bạn không cần phải hiểu **String[] args** nghĩa là gì, hay **static** là sao, bạn chỉ cần nhớ :

- **main** là hàm chính trong chương trình.
- Tên **class** phải trùng với tên **file.java** của bạn.

> [!WARNING] Hãy luôn nhớ kết thúc mỗi lệnh phải có dấu `;` nhé

---

## 7. Hàm in ra màn hình

- **System.out.print** : in ra màn hình 
- **System.out.println** : in ra màn hình + xuống dòng

```java
public class Demo {
    public static void main(String[] args) {
        System.out.println("In xuống dòng nè");
        System.out.print("Này là in không xuống dòng");
        System.out.print("Kết quả");
    }
}
```


```bash
In xuống dòng nè
Này là in không xuống dòngKết quả
```

<!-- <img src="https://raw.githubusercontent.com/Zenfection/Image/master/2021/01/30-16-56-46-java-oop_4.png" title="" alt="java-oop_4.png" width="356"> -->

> 🚀 Hãy bật **UTF-8** nếu bạn không gõ được **Tiếng Việt**, nhưng **Vscode** của mình không cần đâu !!!

---

## 8. Chú thích

Chú thích là những dòng *comment* trong code sẽ không được thực thi, mà nó chỉ dành cho người dùng đọc và hiểu.

- `//` : chủ thích một dòng
- `/**/` : chú thích nhiều dòng

```java
public class Project_demo {
    public static void main(String[] args) {
        // Chú thích một dòng
        
        /*
         * Chú thích
         * nhiều dòng
        */
    }
}
```

---

## 9. Compile file **.class**


![30-16-03-57-04-19-39-12-Ảnh chụp Màn hình 2020-08-04 lúc 19.39.02.png](https://raw.githubusercontent.com/Zenfection/Image/master/2021/01/30-17-05-05-30-16-03-57-04-19-39-12-A%CC%89nh%20chu%CC%A3p%20Ma%CC%80n%20hi%CC%80nh%202020-08-04%20lu%CC%81c%2019.39.02.png)

> 🤔 Như bạn thấy thì **Java Code** ==> **Mã trung gian** ==> **Native code** (*tức là nhị phân*). 
> 
> Vậy mã trung gian đó gọi là **bytecode**  có đuôi **.class**, khó hiểu đúng không, hãy làm thủ công từng bước nhé.

Cho file **Demo.java** như sau : 

```java
public class Demo {
    public static void main(String[] args) {
        System.out.println("Đang đẹp trai");
    }
}
```

- **B1** : Mở **CMD** hoặc **Terminal** và gõ **javac + đường dẫn đến file.java**
  
  ![2021-01-30 17.14.34.gif](https://raw.githubusercontent.com/Zenfection/Image/master/2021/01/30-17-16-10-2021-01-30%2017.14.34.gif)
  
  > Và nó sẽ tạo cho bạn một file **Demo.class** trùng tên với tên **file** của bạn : 
  > 
  > ![Ảnh chụp Màn hình 2021-01-30 lúc 17.16.52.png](https://raw.githubusercontent.com/Zenfection/Image/master/2021/01/30-17-17-04-A%CC%89nh%20chu%CC%A3p%20Ma%CC%80n%20hi%CC%80nh%202021-01-30%20lu%CC%81c%2017.16.52.png)

- **B2** : gõ **java + đường dẫn file**
  
  ![2021-01-30 17.14.34.gif](https://raw.githubusercontent.com/Zenfection/Image/master/2021/01/30-17-18-16-2021-01-30%2017.14.34.gif)
  
  > 🤪 Vậy là bạn đã chạy code một cách **thủ công**.

Bạn hiểu chứ, ta vậy thì ta chỉ cần lấy file `Demo.class` đem qua bất kỳ hệ điều hành nào chỉ cần chạy **java Demo** là chạy được.
