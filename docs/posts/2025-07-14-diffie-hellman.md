---
title: "Tìm hiểu về thuật toán Diffie-Hellman"
subtitle: "Mã hóa đầu cuối trong dự án mạng xã hội Destiny"
author: Trần Hữu Đang
date: 2025-07-14
image: /images/post/2025-07-14-diffie-hellman/1.png
tags:
  - Bảo mật
  - Diffie-Hellman
  - Mã hóa
  - Java
  - Dự án Destiny
description: "Ứng dụng thuật toán Diffie-Hellman để mã hóa đầu cuối trong chức năng nhắn tin của mạng xã hội Destiny. Bài viết giải thích cơ chế trao đổi khóa và cách triển khai bằng Java."
published: false
---
	


Dự án tốt nghiệp **mạng xã hội Destiny**, mình đã áp dụng thuật toán **Diffie-Hellman** vào chức năng **nhắn tin mã hóa đầu cuối** và nhận được sự đánh giá rất cao từ hội đồng coi thi 🎓. Bài viết này mình chia sẻ lại cách triển khai một cách **đơn giản và dễ áp dụng nhất**, để bất kỳ ai cũng có thể hiểu và sử dụng được.

📌 **Link demo mã nguồn**: [DiffieHellman.java trên GitHub](https://github.com/dangtranhuu/destiny/blob/main/BE_Destiny/src/main/java/com/davisy/encrypt/DiffieHellman.java)  
🔧 **Giao diện demo sẽ được cập nhật sau**

<!-- more -->

## 1. Diffie-Hellman là gì?

Thuật toán **Diffie-Hellman** là một giao thức trao đổi khóa, giúp hai bên tạo ra một **khóa chung bí mật** mà **không cần chia sẻ trực tiếp qua mạng**.

### Nguyên lý

1. Chọn số nguyên tố **p** và **g** (g là số sinh - *generator*)
2. Mỗi bên chọn một khóa riêng **a** hoặc **b**
3. Tính khóa công khai:
   $$
   A = g^a \mod p \quad , \quad B = g^b \mod p
   $$
4. Mỗi bên tính khóa chung:
   $$
   s = B^a \mod p = A^b \mod p
   $$

---

## 2. Cài đặt thuật toán Diffie-Hellman bằng Java

```java
public static final int DIFFINE_HELLMAN_GROUP1 = 3; // G
public static final int DIFFINE_HELLMAN_GROUP2 = 17; // P
```

### 2.1 Hàm kiểm tra số nguyên tố

```java
public static boolean isPrime(int num) {
    if (num < 2) return false;
    for (int i = 2; i <= Math.sqrt(num); i++) {
        if (num % i == 0) return false;
    }
    return true;
}
```

### 2.2 Sinh khóa riêng (private key)

$$
\text{Tìm số nguyên tố gần nhất lớn hơn hoặc bằng } n
$$

```java
public static int genPrivateKey(int n) {
    if (n < 2) return 2;
    if (isPrime(n)) return n;
    int prime = n + 1;
    while (true) {
        if (isPrime(prime)) return prime;
        prime++;
    }
}
```

### 2.3 Sinh khóa công khai

$$
\text{PublicKey} = g^a \mod p
$$

```java
public static int genPublicKey(int id){
    BigInteger G = BigInteger.valueOf(DIFFINE_HELLMAN_GROUP1);
    BigInteger P = BigInteger.valueOf(DIFFINE_HELLMAN_GROUP2);
    BigInteger privateK = BigInteger.valueOf(genPrivateKey(id));
    return G.modPow(privateK, P).intValue();
}
```

### 2.4 Tính khóa chung (Shared Secret)

$$
\text{SharedKey} = B^a \mod p
$$

```java
public static int genSecretKey(int id, int resId){
    BigInteger P = BigInteger.valueOf(DIFFINE_HELLMAN_GROUP2);
    BigInteger privateK = BigInteger.valueOf(genPrivateKey(id));
    BigInteger publicK = BigInteger.valueOf(genPublicKey(resId));
    return publicK.modPow(privateK, P).intValue();
}
```

---

## 3. Demo mã hóa - giải mã với AES

```java
int u1 = 18;
int u2 = 26;
String message = "Hello bạn, khỏe chứ?";

int keyU1 = genSecretKey(u1, u2);
int keyU2 = genSecretKey(u2, u1); // keyU1 == keyU2

String encrypted = aes.encrypt(message, keyU1);
String decrypted = aes.decrypt(encrypted, keyU2);

System.out.println(encrypted);
System.out.println(decrypted);
```

---

## 4. Kết luận

Sử dụng thuật toán **Diffie-Hellman** là một trong những cách đơn giản và hiệu quả để xây dựng cơ chế mã hóa đầu cuối. Hy vọng bài viết sẽ giúp bạn có thể áp dụng ngay vào ứng dụng thực tế của mình.

> 💡 Đừng quên ghé qua link GitHub để xem toàn bộ mã nguồn nhé:  
> 🔗 [DiffieHellman.java](https://github.com/dangtranhuu/destiny/blob/main/BE_Destiny/src/main/java/com/davisy/encrypt/DiffieHellman.java)

