---
title: "Triển khai mã hóa đầu-cuối với Diffie-Hellman và AES bằng Java"
subtitle: "Xây dựng cơ chế trao đổi khóa và mã hóa tin nhắn cho dự án mạng xã hội Destiny"
author: Trần Hữu Đang
date: 2025-07-14
image: /images/post/2025-07-18-diffie-hellman/0.png
tags:
  - Bảo mật
  - Mật mã học
  - Diffie-Hellman
  - AES
  - End-to-End Encryption
  - Java
  - Destiny
description: "Bài viết trình bày nguyên lý hoạt động của thuật toán Diffie-Hellman và AES, đồng thời minh họa cách kết hợp hai thuật toán để xây dựng cơ chế mã hóa đầu-cuối cho chức năng nhắn tin trong dự án mạng xã hội Destiny bằng Java."
published: true
---
	

**I. GIỚI THIỆU**

Trong kỷ nguyên số, thông tin là một tài sản vô cùng quý giá và đồng thời cũng rất dễ bị xâm phạm. Mỗi ngày, hàng tỷ tin nhắn, email, giao dịch tài chính và dữ liệu cá nhân được truyền qua Internet. Chính vì vậy, bảo mật thông tin đã trở thành một vấn đề sống còn đối với các hệ thống công nghệ thông tin. Việc không đảm bảo an toàn dữ liệu có thể dẫn đến những hậu quả nghiêm trọng như mất quyền riêng tư, thất thoát tài chính, hoặc bị tấn công bởi các phần tử độc hại.

Trước thực trạng đó, nhiều mô hình và kỹ thuật bảo mật đã được đề xuất và ứng dụng rộng rãi, trong đó mã hóa thông tin là một trong những giải pháp cốt lõi và phổ biến nhất. Mã hóa giúp biến đổi dữ liệu từ dạng dễ đọc sang dạng không thể hiểu được nếu không có "chìa khóa" tương ứng để giải mã. Nhờ đó, dù dữ liệu có bị đánh cắp hay chặn lại trong quá trình truyền, kẻ tấn công vẫn không thể đọc được nội dung nếu không có khóa giải mã hợp lệ.

Một mô hình nổi bật trong bảo mật hiện đại là mã hóa đầu-cuối (End-to-End Encryption - E2EE). Mô hình này đảm bảo rằng dữ liệu được mã hóa ngay từ thiết bị của người gửi và chỉ được giải mã tại thiết bị của người nhận. Tất cả các nút trung gian như máy chủ, nhà cung cấp dịch vụ, hoặc hệ thống lưu trữ đám mây đều không thể truy cập vào nội dung thực của thông điệp. Chính vì vậy, E2EE ngày càng trở thành tiêu chuẩn trong các nền tảng truyền thông lớn như Signal, WhatsApp, Telegram hay Messenger, và được người dùng đặc biệt tin tưởng về mức độ bảo mật.

Tuy nhiên, để triển khai mã hóa đầu-cuối hiệu quả, cần có sự kết hợp giữa hai loại thuật toán chính:

1.  Thuật toán trao đổi khóa công khai -- dùng để hai bên tạo ra và chia sẻ một khóa bí mật chung trên một kênh không an toàn.

2.  Thuật toán mã hóa đối xứng -- dùng khóa chung đó để mã hóa và giải mã nội dung thực tế của tin nhắn.

Triển khai mô hình kết hợp giữa:

- Thuật toán trao đổi khóa Diffie-Hellman, được xem là nền tảng của mật mã khóa công khai, giúp hai bên tạo ra khóa chung một cách an toàn mà không cần trao đổi khóa bí mật.

- Thuật toán mã hóa AES (Advanced Encryption Standard), là một trong những thuật toán mã hóa đối xứng nhanh và mạnh nhất hiện nay, được sử dụng rộng rãi trong công nghiệp và chuẩn hóa bởi NIST.

Sự kết hợp giữa hai thuật toán này không chỉ đảm bảo an toàn về mặt lý thuyết mà còn đáp ứng được yêu cầu hiệu suất cao trong thực tế. Mô hình này cho phép xây dựng một hệ thống nhắn tin hoặc truyền dữ liệu có khả năng bảo mật đầu-cuối thực thụ, trong đó mỗi thông điệp chỉ có thể được giải mã bởi đúng người nhận, ngay cả khi thông điệp bị rò rỉ hoặc bị đánh chặn giữa đường.

Báo cáo mang đến một góc nhìn sâu sắc về cách thức hoạt động, triển khai kỹ thuật cũng như ứng dụng thực tiễn của mô hình mã hóa đầu-cuối này. Đồng thời, việc cài đặt và thử nghiệm trên môi trường lập trình Java cũng giúp làm rõ quy trình kỹ thuật và tính khả thi trong thực tế.

## II. CƠ SỞ LÝ THUYẾT

Trong lĩnh vực bảo mật thông tin, việc lựa chọn và kết hợp các thuật toán mã hóa phải dựa trên hiểu biết sâu sắc về nguyên lý hoạt động, khả năng đảm bảo tính bảo mật, hiệu năng xử lý và tính khả thi khi triển khai thực tế. Mô hình mã hóa đầu-cuối sử dụng kết hợp giữa Diffie-Hellman và AES được xây dựng trên hai nguyên tắc cốt lõi: trao đổi khóa an toàn và mã hóa nội dung hiệu quả. Để hiểu rõ vai trò của từng thuật toán, cần đi sâu vào phân tích nguyên lý và cơ chế hoạt động của chúng.

### **2.1. Thuật toán trao đổi khóa Diffie-Hellman** 

#### a) Giới thiệu

Thuật toán Diffie-Hellman, được đề xuất vào năm 1976 bởi Whitfield Diffie và Martin Hellman, là một bước đột phá trong ngành mật mã. Trước đó, các hệ thống mã hóa chủ yếu dựa vào mã hóa đối xứng, đòi hỏi các bên liên lạc phải chia sẻ trước một khóa bí mật. Vấn đề nan giải là làm thế nào để trao đổi khóa bí mật an toàn qua một kênh không an toàn? Diffie-Hellman giải quyết trực tiếp bài toán này, mở ra nền tảng cho mật mã khóa công khai hiện đại.

#### b) Nguyên lý hoạt động

Diffie-Hellman cho phép hai bên (ví dụ: Alice và Bob) đồng thuận một khóa bí mật chung, ngay cả khi giao tiếp qua kênh công khai và không tin cậy. Thuật toán dựa trên độ khó của bài toán logarit rời rạc, tức là: nếu biết $g$, $p$, và $A\  = \ g^{a}\ mod\ \ p$, thì việc tìm lại $a$ là cực kỳ khó khi $p$ đủ lớn.

Quy trình thực hiện cụ thể như sau:

1.  Thống nhất các thông số công khai:

    - $p$: một số nguyên tố lớn (thường dài từ 2048 bit trở lên)

    - $g$: một căn nguyên thủy modulo $p$

2.  Mỗi bên chọn một số bí mật:

    - Alice chọn $a$, Bob chọn $b$

3.  Tính khóa công khai:

    - Alice: $A\  = \ g^{a}\ mod\,\, p$

    - Bob: $B\  = \ g^{b}\ mod\ p\,$ 

![Trao đổi khóa Diffie-Hellman -- Wikipedia tiếng Việt](/images/post/2025-07-18-diffie-hellman/1.png)

4.  Trao đổi khóa công khai A và B

5.  Tính khóa chung:

    - Alice tính $K\  = \ B^{a}\ mod\,\, p = \ g^{ba}\ mod\ p$

    - Bob tính $K\  = \ A^{b}\ mod\,\, p = \ g^{ab}\ mode\ p$

Do tính chất toán học:

$$B^{a}\ mod\ p = \left( g^{b} \right)^{a}\ mod\ p = g^{ba}\ mod\ p = g^{ab}\ mod\ p = \left( g^{a} \right)^{b}\ mod\ p = A^{b}\ mod\ p\ $$

- Hai bên cùng có khóa KKK mà không cần gửi khóa bí mật cho nhau.

#### c) Tính bảo mật

Diffie-Hellman được xem là an toàn khi:

- $p$ đủ lớn (2048 bit hoặc hơn)

- $g$ được chọn phù hợp (ví dụ, có bậc lớn trong nhóm modulo ppp)

- Không sử dụng lại khóa bí mật quá nhiều lần (tránh các tấn công lặp)

Một điểm cần lưu ý là Diffie-Hellman không cung cấp xác thực, nên trong thực tế nó thường được dùng kết hợp với các kỹ thuật xác thực như chữ ký số hoặc chứng chỉ số để phòng ngừa tấn công "man-in-the-middle".

### **2.2. Thuật toán mã hóa đối xứng AES (Advanced Encryption Standard)** 

#### a) Lịch sử và chuẩn hóa

AES (Advanced Encryption Standard) được phát triển nhằm thay thế thuật toán DES vốn đã trở nên lỗi thời. Sau một quá trình cạnh tranh quốc tế, thuật toán Rijndael do hai nhà mật mã học người Bỉ phát triển đã được NIST chọn làm chuẩn mã hóa chính thức vào năm 2001.

AES nhanh chóng trở thành thuật toán mã hóa khối phổ biến nhất thế giới và được áp dụng rộng rãi trong chính phủ, tài chính, thương mại điện tử, và nhiều lĩnh vực khác.

#### b) Cấu trúc và hoạt động

AES là một thuật toán mã hóa đối xứng -- tức là cùng một khóa được dùng để mã hóa và giải mã dữ liệu.

Đặc điểm chính:

- Khối dữ liệu: 128-bit

- Độ dài khóa: 128, 192, hoặc 256-bit

- Số vòng (rounds): 10 (AES-128), 12 (AES-192), 14 (AES-256)

Dữ liệu được xử lý trong dạng ma trận 4x4 byte, gọi là "State", và trải qua nhiều vòng biến đổi. Mỗi vòng gồm 4 bước:

- SubBytes: thay thế từng byte bằng giá trị trong bảng S-box (phi tuyến, bảo mật cao).

- ShiftRows: hoán vị byte trong từng dòng của ma trận.

- MixColumns: trộn các byte theo từng cột bằng phép toán trên trường Galois.

- AddRoundKey: XOR ma trận dữ liệu với khóa con của vòng hiện tại.

> Ở vòng cuối cùng, bỏ qua bước MixColumns để thuận tiện cho giải mã.
>
> Quá trình giải mã là đảo ngược toàn bộ chuỗi biến đổi trên, với cùng khóa gốc.

#### c) Ưu điểm và vai trò trong mô hình mã hóa đầu-cuối

- Tốc độ cao: AES được tối ưu cho cả phần mềm và phần cứng, hỗ trợ mã hóa hàng triệu khối dữ liệu mỗi giây.

- Độ bảo mật cao: Không có tấn công thực tiễn nào bẻ được AES-128 (cho đến nay).

![AES hoat dong](/images/post/2025-07-18-diffie-hellman/2.jpg)

- Dễ triển khai: Có mặt trong mọi thư viện mật mã tiêu chuẩn (Java, Python, OpenSSL\...).

Trong mô hình mã hóa đầu-cuối, AES đóng vai trò mã hóa thực tế dữ liệu. Sau khi Diffie-Hellman tạo ra khóa chung, khóa này được chuyển sang dạng phù hợp (ví dụ: băm SHA-256 và cắt 128 bit đầu) để sử dụng làm khóa AES. Khi đó, nội dung tin nhắn sẽ được mã hóa bằng AES, và chỉ có bên có khóa mới giải mã được.

### **2.3. Kết hợp Diffie-Hellman và AES** 

Diffie-Hellman không dùng để mã hóa dữ liệu vì hiệu suất thấp; nó chỉ nên dùng để trao đổi khóa.

AES nhanh nhưng cần một khóa bí mật đã biết -- không thể tự sinh ra hoặc trao đổi an toàn qua mạng nếu không có một thuật toán trao đổi khóa.

Kết hợp hai thuật toán sẽ tối ưu cả hiệu suất và tính bảo mật, đồng thời đáp ứng yêu cầu mã hóa đầu-cuối trong các hệ thống nhắn tin và truyền dữ liệu hiện đại.

## III. CÀI ĐẶT BẰNG JAVA

Trong phần này, mô hình mã hóa đầu-cuối bằng ngôn ngữ lập trình Java, với hai phần chính:

- Cài đặt thuật toán Diffie-Hellman để trao đổi khóa bí mật.

- Cài đặt thuật toán AES để mã hóa và giải mã tin nhắn văn bản.

Việc sử dụng Java mang lại lợi thế về độ phổ biến, thư viện hỗ trợ mạnh mẽ, dễ kiểm thử và dễ mở rộng cho các ứng dụng bảo mật thực tế như hệ thống chat hoặc truyền dữ liệu qua mạng.

### **3.1. Cấu trúc tổng thể của chương trình**

Hệ thống bao gồm các lớp chính sau:

- DiffieHellman: thực hiện trao đổi khóa công khai.

- AES: thực hiện mã hóa và giải mã dữ liệu bằng khóa đối xứng.

- Main: mô phỏng quá trình trao đổi khóa, mã hóa và giải mã tin nhắn giữa hai bên (Alice và Bob).

Mỗi lớp được thiết kế để đảm nhiệm rõ ràng một chức năng trong hệ thống bảo mật.

### **3.2. Cài đặt thuật toán Diffie-Hellman** 

#### a) Ý tưởng triển khai

Lớp DiffieHellman được xây dựng để mô phỏng mỗi bên trong giao thức: bên gửi (Alice) và bên nhận (Bob). Mỗi đối tượng có thể:

- Tạo khóa công khai từ khóa bí mật.

- Nhận khóa công khai từ bên kia và tính ra khóa chung.

Java cung cấp lớp BigInteger rất phù hợp để xử lý các số nguyên lớn và phép toán modulo, do đó được sử dụng làm kiểu dữ liệu chính.

#### b) Mã nguồn Java: DiffieHellman.java 

```java
import java.math.BigInteger;

public class DiffieHellman {

    // Số nguyên tố lớn
    private final BigInteger p;

    // Căn nguyên thủy modulo p
    private final BigInteger g;

    // Khóa bí mật riêng
    private final BigInteger privateKey;

    // Khóa công khai (g^a mod p)
    private BigInteger publicKey;

    // Khóa chung tính từ khóa công khai của đối tác
    private BigInteger sharedKey;

    public DiffieHellman(
            BigInteger p,
            BigInteger g,
            BigInteger privateKey
    ) {
        this.p = p;
        this.g = g;
        this.privateKey = privateKey;

        // Tính khóa công khai: g^a mod p
        this.publicKey = g.modPow(privateKey, p);
    }

    /**
     * Lấy khóa công khai.
     *
     * @return Public Key
     */
    public BigInteger getPublicKey() {
        return publicKey;
    }

    /**
     * Tính khóa chung từ khóa công khai của đối tác.
     *
     * @param otherPublicKey Khóa công khai của bên còn lại
     */
    public void computeSharedKey(BigInteger otherPublicKey) {
        // (B)^a mod p
        this.sharedKey = otherPublicKey.modPow(privateKey, p);
    }

    /**
     * Lấy khóa chung đã tính.
     *
     * @return Shared Key
     */
    public BigInteger getSharedKey() {
        return sharedKey;
    }
}
```

#### c) Ví dụ sử dụng

```java
public class Main {
    public static void main(String[] args) {
        BigInteger p = new BigInteger("23");
        BigInteger g = new BigInteger("5");

        // Khóa riêng Alice
        BigInteger a = new BigInteger("6");

        // Khóa riêng Bob
        BigInteger b = new BigInteger("15");

        DiffieHellman alice = new DiffieHellman(p, g, a);
        DiffieHellman bob = new DiffieHellman(p, g, b);

        alice.computeSharedKey(bob.getPublicKey());
        bob.computeSharedKey(alice.getPublicKey());

        System.out.println("Khóa chung (Alice): " + alice.getSharedKey());
        System.out.println("Khóa chung (Bob): " + bob.getSharedKey());
    }
}
```

Cả hai khóa chung sẽ giống nhau nếu triển khai đúng, ví dụ: $2^6 \bmod 23 = 8,\quad 8^{15} \bmod 23 = 2.$

### **3.3. Cài đặt mã hóa và giải mã AES** 

#### a) Ý tưởng triển khai

Thuật toán AES cần một khóa đối xứng (128, 192 hoặc 256 bit). Trong chương trình này:

- Sử dụng SHA-256 để băm khóa chung từ Diffie-Hellman.

- Cắt 128 bit đầu tiên để dùng làm khóa AES (độ dài 16 byte).

Việc sử dụng thư viện javax.crypto giúp mã hóa AES trở nên đơn giản và an toàn.

#### b) Mã nguồn Java: AES.java 

```java
import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;

public class AES {

    private static final String ALGORITHM = "AES";

    public static SecretKey getAESKey(byte[] keyBytes) {
        return new SecretKeySpec(keyBytes, ALGORITHM);
    }

    public static byte[] encrypt(String data, SecretKey key) throws Exception {
        Cipher cipher = Cipher.getInstance(ALGORITHM);
        cipher.init(Cipher.ENCRYPT_MODE, key);

        return cipher.doFinal(data.getBytes(StandardCharsets.UTF_8));
    }

    public static String decrypt(byte[] cipherText, SecretKey key) throws Exception {
        Cipher cipher = Cipher.getInstance(ALGORITHM);
        cipher.init(Cipher.DECRYPT_MODE, key);

        byte[] decrypted = cipher.doFinal(cipherText);

        return new String(decrypted, StandardCharsets.UTF_8);
    }
}
```

#### c) Chuyển đổi khóa chung sang khóa AES

```java
import java.math.BigInteger;
import java.security.MessageDigest;
import java.util.Arrays;

import javax.crypto.SecretKey;

public class Main {
    public static void main(String[] args) throws Exception {
        BigInteger p = new BigInteger("23");
        BigInteger g = new BigInteger("5");

        BigInteger a = new BigInteger("6");   // Khóa riêng Alice
        BigInteger b = new BigInteger("15");  // Khóa riêng Bob

        DiffieHellman alice = new DiffieHellman(p, g, a);
        DiffieHellman bob = new DiffieHellman(p, g, b);

        alice.computeSharedKey(bob.getPublicKey());
        bob.computeSharedKey(alice.getPublicKey());

        BigInteger sharedKey = alice.getSharedKey();

        MessageDigest sha = MessageDigest.getInstance("SHA-256");
        byte[] hash = sha.digest(sharedKey.toByteArray());

        // Lấy 16 byte đầu để tạo khóa AES-128
        byte[] aesKeyBytes = Arrays.copyOf(hash, 16);

        SecretKey aesKey = AES.getAESKey(aesKeyBytes);

        System.out.println("Khóa chung: " + sharedKey);
        System.out.println("AES Key đã tạo thành công!");
    }
}
```

### **3.4. Mã hóa và giải mã tin nhắn** 

```java
String message = "Hello Bob!";

byte[] encrypted = AES.encrypt(message, aesKey);
String decrypted = AES.decrypt(encrypted, aesKey);

System.out.println("Thông điệp ban đầu: " + message);
System.out.println("Thông điệp sau khi mã hóa: " + Arrays.toString(encrypted));
System.out.println("Thông điệp sau khi giải mã: " + decrypted);
```

**Kết quả:**

- Nếu khóa AES đúng, thông điệp sẽ được giải mã chính xác.

- Nếu dùng sai khóa, sẽ sinh lỗi hoặc kết quả sai hoàn toàn.

### **3.5. Nhận xét** {#nhận-xét}

Thông qua việc triển khai kết hợp `Diffie-Hellman` và AES bằng Java:

- Thực hiện trao đổi khóa an toàn giữa hai bên qua mạng không bảo mật.

- Mã hóa và giải mã dữ liệu một cách hiệu quả.

- Kiểm tra và xác minh tính đúng đắn bằng cách so sánh thông điệp trước và sau giải mã.

Việc tách biệt rõ ràng giữa các chức năng giúp chương trình dễ mở rộng, kiểm thử và ứng dụng vào các hệ thống thực tế như chat bảo mật, truyền dữ liệu IoT.

## IV. ỨNG DỤNG THỰC TẾ 

### **4.1. Mô hình bảo mật trong thế giới thực**

Mô hình mã hóa đầu-cuối (End-to-End Encryption -- E2EE) không chỉ là một khái niệm lý thuyết, mà đã trở thành một yêu cầu tiêu chuẩn trong rất nhiều hệ thống truyền thông số hiện đại. Trong thời đại mà việc trao đổi thông tin diễn ra liên tục, trên nhiều nền tảng như ứng dụng nhắn tin, giao dịch tài chính, thiết bị IoT, và dịch vụ đám mây, bảo mật dữ liệu không còn là lựa chọn, mà là nghĩa vụ đối với nhà phát triển và là quyền lợi tối thiểu của người dùng.

Hai thuật toán được sử dụng trong mô hình này `Diffie-Hellman` và `AES` chính là nền tảng của nhiều hệ thống bảo mật thành công trong thực tiễn.

### **4.2. Các ứng dụng tiêu biểu** 

#### a) Ứng dụng nhắn tin bảo mật (Signal, WhatsApp, Telegram, Messenger)

Hầu hết các ứng dụng nhắn tin phổ biến hiện nay đều triển khai mô hình mã hóa đầu-cuối, trong đó:

- Diffie-Hellman (hoặc phiên bản nâng cao như X3DH -- Extended Triple Diffie-Hellman) được dùng để trao đổi khóa phiên giữa các thiết bị.

- AES hoặc ChaCha20 được sử dụng để mã hóa nội dung tin nhắn.

Ví dụ, trong giao thức Signal Protocol (nền tảng cho WhatsApp và Signal), khi hai người bắt đầu cuộc trò chuyện, ứng dụng sẽ tạo khóa tạm thời dựa trên Diffie-Hellman và dùng khóa này để mã hóa từng tin nhắn bằng AES hoặc ChaCha20. Tin nhắn đã mã hóa chỉ có thể được giải mã tại thiết bị nhận tương ứng. Ngay cả máy chủ của WhatsApp cũng không thể đọc được nội dung tin nhắn.

#### b) Truyền dữ liệu an toàn qua Internet (HTTPS, TLS, VPN)

Trong các giao thức như HTTPS hoặc VPN (Virtual Private Network), Diffie-Hellman được sử dụng trong quá trình bắt tay (handshake) để thiết lập khóa phiên bảo mật. Sau đó, các thuật toán mã hóa đối xứng như AES sẽ được sử dụng để mã hóa toàn bộ nội dung truyền tải.

**Ví dụ:**

- Trình duyệt và máy chủ web trao đổi khóa bằng ECDHE (Elliptic Curve Diffie-Hellman Ephemeral).

- Một khóa phiên được tạo ra và sử dụng để mã hóa các gói dữ liệu tiếp theo bằng AES-GCM hoặc AES-CBC.

#### c) Thiết bị IoT và cảm biến thông minh

Các thiết bị IoT, như camera, cảm biến nhiệt độ, đồng hồ thông minh,... thường có nguồn lực phần cứng hạn chế, nên không thể chạy các thuật toán phức tạp. Tuy nhiên, chúng vẫn cần trao đổi dữ liệu an toàn với hệ thống trung tâm hoặc với nhau.

Trong trường hợp này:

- Diffie-Hellman giúp thiết lập khóa giữa thiết bị và hệ thống (qua mạng không dây).

- AES được sử dụng để mã hóa dữ liệu đo lường trước khi gửi đi.

Với mô hình này, thiết bị không cần lưu khóa lâu dài, giúp giảm rủi ro bị trích xuất khóa từ phần cứng khi bị tấn công vật lý.

#### d) Bảo mật dữ liệu trên dịch vụ đám mây

Dù lưu trữ dữ liệu trên đám mây (cloud) rất tiện lợi, nhưng nếu dữ liệu được mã hóa bởi người dùng trước khi gửi lên (và chỉ họ giữ khóa), thì ngay cả nhà cung cấp dịch vụ cũng không thể truy cập nội dung.

Một số hệ thống lưu trữ đám mây như Mega.nz đã áp dụng mô hình này:

- Dữ liệu được mã hóa bằng AES tại máy người dùng.

- Khóa AES được mã hóa bằng khóa công khai (có thể trao đổi qua Diffie-Hellman hoặc RSA).

- Chỉ người nhận hợp lệ mới có thể giải mã và đọc dữ liệu.

### **4.3. Ưu điểm khi ứng dụng mô hình kết hợp Diffie-Hellman + AES** 

| **Đặc điểm** | **Diffie-Hellman** | **AES** |
|:---|:---|:---|
| Mục đích | Trao đổi khóa | Mã hóa nội dung |
| Bảo mật dựa vào | Logarit rời rạc | Phép biến đổi khối + vòng lặp |
| Tốc độ xử lý | Trung bình/chậm | Nhanh (tối ưu phần cứng) |
| Tính thực tiễn | Rất cao (trong TLS, E2EE) | Rất cao (trong VPN, chat, IoT) |
| Triển khai trong hệ thống thực tế | Giao thức bắt tay | Mã hóa toàn bộ dữ liệu truyền |

Sự kết hợp giữa hai thuật toán này là một giải pháp lý tưởng cho mọi hệ thống cần bảo mật, từ quy mô nhỏ (ứng dụng chat đơn giản) đến quy mô lớn (hạ tầng mạng, doanh nghiệp, hệ thống phân tán).

### **4.4. Hạn chế và hướng phát triển** 

Dù rất mạnh mẽ, mô hình này vẫn có một số điểm hạn chế:

- Diffie-Hellman cần xác thực kèm theo để tránh tấn công trung gian (man-in-the-middle). Do đó, trong thực tế thường cần dùng kết hợp với chữ ký số hoặc chứng chỉ số.

- Khóa AES cần được quản lý cẩn thận để tránh bị lộ hoặc bị dùng lại sai mục đích.

Các hướng phát triển hiện nay tập trung vào:

- Sử dụng Diffie-Hellman trên đường cong elliptic (ECDH) để tăng độ an toàn với độ dài khóa nhỏ hơn.

- Áp dụng mã hóa đồng bộ nhiều thiết bị (multi-device E2EE) như trong Signal để người dùng có thể truy cập dữ liệu từ nhiều thiết bị một cách an toàn.

## V. DEMO CHƯƠNG TRÌNH

Mô hình mã hóa đầu-cuối đã được hiện thực bằng Java thông qua một chương trình mẫu. Mục tiêu của demo là:

- Mô phỏng quá trình trao đổi khóa giữa hai bên (Alice và Bob)

- Tạo khóa chung và mã hóa nội dung tin nhắn bằng AES

- Kiểm tra kết quả mã hóa -- giải mã để xác thực tính đúng đắn của hệ thống

### **5.1. Mô hình tương tác giữa hai bên** 

Chương trình mô phỏng quá trình gửi tin nhắn giữa hai người dùng: Alice (người gửi) và Bob (người nhận). Cả hai người dùng này:

- Tự sinh khóa bí mật cá nhân

- Trao đổi khóa công khai với nhau

- Tính toán khóa bí mật chung

- Sử dụng khóa chung để mã hóa và giải mã tin nhắn

Mọi thao tác được thực hiện trên môi trường Java console với đầu vào được giả lập.

### **5.2. Các bước thực hiện chi tiết** 

![C:\Users\ADMIN\Desktop\1.jpg](/images/post/2025-07-18-diffie-hellman/3.jpg)

#### Bước 1: Khởi tạo giá trị công khai

> Người dùng nhập giá trị:
> - $p$ -- số nguyên tố lớn (ví dụ: 23, 104729,\...)
> - $g$ -- căn nguyên thủy $modulo$ $p$ (ví dụ: 3, 17, 456,..)

#### Bước 2: Mỗi bên chọn khóa riêng

Alice và Bob tự chọn khóa bí mật (private key), ví dụ:

- Alice: $a = 6$

- Bob: $b = 15$

#### Bước 3: Tính khóa công khai

- Alice tính $A\  = \ g^{a}\ mod\,\, p$

- Bob tính $B\  = \ g^{b}\ mod\,\, p$

> Sau đó họ trao đổi khóa công khai.

#### Bước 4: Tính khóa chung

- Alice tính $K\  = \ B^{a}\ mod\,\, p\$

- Bob tính $K = A^{b}\ mod\,\, p$

Cả hai sẽ nhận được cùng một khóa chung, ví dụ: sharedKey = 2.

#### Bước 5: Sinh khóa AES từ khóa chung

Khóa sharedKey được chuyển thành chuỗi byte, sau đó băm bằng SHA-256. Kết quả là một mảng 256 bit. Ta lấy 128 bit đầu tiên (16 byte) để tạo SecretKey cho AES.

#### Bước 6: Mã hóa tin nhắn

Alice nhập tin nhắn, ví dụ:

`"Xin chào Bob, đây là tin nhắn bí mật."`

Sau đó sử dụng lớp AES để mã hóa chuỗi này thành mảng byte không thể đọc được.

#### Bước 7: Bob giải mã tin nhắn

Bob dùng cùng khóa AES để giải mã tin nhắn đã được mã hóa. Nếu mọi bước đều chính xác, Bob sẽ nhận được chính xác thông điệp gốc.

### **5.3. Kết quả minh họa** 

Ví dụ đầu vào:

- $p = 16729$, $g = 456$

- Alice chọn $a = 13$, Bob chọn $b = 19$

- Khóa công khai Alice: $456^{13}\ mod\ 16729 = 9778$

- Khóa công khai Bob: $456^{19}\ mod\ 16729\  = \ 14526$

- Khóa chung:

  - Alice: $K\  = \ B^{a}\ mod\ p\  = \ 14526^{13}\ mod\ 16729$

  - Bob $K\  = \ A^{b}\ mod\ p\  = \ 9778^{19}\ mod\ 16729$

<!-- -->

- $K\  = \ 6576$

Kết quả mã hóa:

Thông điệp ban đầu: Hi, Are you ok?

Dữ liệu mã hóa: Trả về một chuỗi Base64

- `\[ 120, 210, 33, 0, \... \]` dạng bytes
- `\"Sy3jW2SFD8be/Yj5nBct/\...\"` base64

Thông điệp sau giải mã: Hi, Are you ok?

### **5.4. Giao diện chương trình** {#giao-diện-chương-trình}

Chương trình hiện tại chạy trên dòng lệnh (Command Line Interface -- CLI) với luồng xử lý tuần tự:


1\. Nhập giá trị $p$, $g$

2\. Nhập khóa bí mật của Alice và Bob

3\. Hiển thị khóa công khai

4\. Tính và hiển thị khóa chung

5\. Nhập nội dung tin nhắn

6\. Mã hóa và giải mã tin nhắn

![C:\Users\ADMIN\Desktop\2.jpg](/images/post/2025-07-18-diffie-hellman/4.jpg)

![C:\Users\ADMIN\Desktop\3.jpg](/images/post/2025-07-18-diffie-hellman/5.jpg)

### **5.4. Giao diện chương trình** 

Chương trình hiện tại chạy trên dòng lệnh (Command Line Interface -- CLI) với luồng xử lý tuần tự:

1\. Nhập giá trị p, g

2\. Nhập khóa bí mật của Alice và Bob

3\. Hiển thị khóa công khai

4\. Tính và hiển thị khóa chung

5\. Nhập nội dung tin nhắn

6\. Mã hóa và giải mã tin nhắn

Ngoài ra, chương trình có thể dễ dàng mở rộng với giao diện đồ họa (Java Swing hoặc JavaFX) để người dùng có thể thực hiện thao tác thông qua nút bấm và textbox.

### **5.5. Kiểm thử và độ ổn định** 

Kiểm thử chương trình với nhiều bộ khóa khác nhau (p, g, a, b) và nhận thấy:

- Hệ thống tính toán đúng khóa chung trong mọi trường hợp hợp lệ.

- Dữ liệu được mã hóa và giải mã chính xác.

- AES hoạt động ổn định với nhiều độ dài chuỗi khác nhau.

Trong thực tế, p và g nên được sinh ngẫu nhiên từ các thư viện an toàn (như BouncyCastle hoặc Java Security API) và có độ dài ít nhất 2048 bit để tránh rủi ro bảo mật.

## VI. KẾT LUẬN

Chuyên đề nghiên cứu, phân tích và triển khai mô hình mã hóa tin nhắn đầu-cuối dựa trên thuật toán Diffie-Hellman kết hợp với thuật toán mã hóa đối xứng AES. Mô hình được xây dựng theo hướng đảm bảo sự tách biệt giữa quá trình thiết lập khóa và mã hóa nội dung, một chiến lược bảo mật được áp dụng trong hầu hết các hệ thống truyền thông an toàn hiện nay.

Thông qua việc cài đặt và demo bằng ngôn ngữ lập trình Java:

- Tái hiện đầy đủ quy trình trao đổi khóa bí mật giữa hai bên thông qua giao thức Diffie-Hellman.

- Sinh khóa AES từ khóa chung, đảm bảo định dạng và độ dài phù hợp.

- Mã hóa và giải mã nội dung tin nhắn với tốc độ nhanh, độ chính xác cao.

- Kiểm thử tính đúng đắn của hệ thống bằng cách so sánh dữ liệu đầu vào và đầu ra.

- Từ mô hình này, có thể rút ra một số điểm quan trọng:

- Tính bảo mật: Khóa chung không bao giờ bị trao đổi trực tiếp. Ngay cả khi kẻ tấn công giám sát toàn bộ giao tiếp công khai, họ vẫn không thể tính ra khóa nếu không biết khóa riêng.

- Tính hiệu quả: Quá trình mã hóa AES có hiệu suất rất cao, phù hợp với các ứng dụng thời gian thực như tin nhắn, IoT.

- Tính mở rộng: Chương trình dễ tích hợp thêm giao diện người dùng, hoặc kết nối mạng để truyền tin nhắn thật giữa hai máy.

Tuy nhiên, để ứng dụng trong thực tế ở mức quy mô lớn và môi trường mạng mở, hệ thống cần được:

- Kết hợp với các cơ chế xác thực (như chứng chỉ số, chữ ký điện tử) để phòng ngừa tấn công trung gian (Man-in-the-Middle).

- Nâng cấp thuật toán Diffie-Hellman sang biến thể sử dụng đường cong elliptic (ECDH) để đạt bảo mật tương đương với khóa ngắn hơn, phù hợp với thiết bị di động hoặc IoT.

- Triển khai bảo vệ khóa AES trong bộ nhớ để chống các kỹ thuật phân tích bộ nhớ.

Nhìn chung, mô hình kết hợp Diffie-Hellman + AES là một cách tiếp cận rất hợp lý cho các hệ thống cần bảo mật toàn vẹn, hiệu suất cao và khả năng triển khai linh hoạt.


### **Tài liệu tham khảo**

1.  Diffie, W., & Hellman, M. (1976). New Directions in Cryptography. IEEE Transactions on Information Theory.

2.  National Institute of Standards and Technology (NIST). (2001). FIPS PUB 197 -- Advanced Encryption Standard (AES).

3.  Bruce Schneier. (1996). Applied Cryptography: Protocols, Algorithms, and Source Code in C. John Wiley & Sons.

4.  Java Platform SE API Specification, javax.crypto & java.math.BigInteger -- Oracle Corporation.

5.  Wikipedia: [Diffie--Hellman key exchange](https://en.wikipedia.org/wiki/Diffie%E2%80%93Hellman_key_exchange), [Advanced Encryption Standard](https://en.wikipedia.org/wiki/Advanced_Encryption_Standard).

6.  Signal Protocol Documentation -- Open Whisper Systems.

7.  ECDH -- Elliptic Curve Diffie--Hellman, Cryptography StackExchange.

8.  \"End-to-End Encryption in Practice\", Journal of Cybersecurity, 2020.
